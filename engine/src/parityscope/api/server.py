"""FastAPI server for the ParityScope platform.

Provides REST endpoints for:
- Running fairness audits
- Retrieving audit history and results
- Monitoring models over time
- Running what-if simulations
- Managing alerts
- Generating reports
"""

from __future__ import annotations

import os
from datetime import datetime, timezone
from typing import Annotated

import numpy as np
import pandas as pd
from fastapi import Depends, FastAPI, Header, HTTPException, Response
from pydantic import BaseModel, Field

from parityscope import __version__
from parityscope.api.schemas import (
    AlertResponse,
    AuditRequest,
    AuditResponse,
    DriftSeriesResponse,
    HealthResponse,
    ModelListResponse,
    SimulationRequest,
    SimulationResponse,
)
from parityscope.audit.engine import FairnessAudit
from parityscope.db import AuditStore
from parityscope.regulations.mapping import list_jurisdictions
from parityscope.reports.generator import generate_json_report, generate_summary
from parityscope.reports.pdf_report import generate_pdf_report
from parityscope.simulation.interventions import compare_interventions

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------

app = FastAPI(
    title="ParityScope API",
    description="Healthcare AI Fairness Compliance Platform — audit, monitor, and mitigate bias in clinical AI systems.",
    version=__version__,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Database store (configurable via env var)
_DB_URL = os.environ.get("PARITYSCOPE_DB_URL", "sqlite:///parityscope.db")
_store = AuditStore(_DB_URL)

# API key auth (optional — set PARITYSCOPE_API_KEY env var to enable)
_API_KEY = os.environ.get("PARITYSCOPE_API_KEY")


def _check_api_key(x_api_key: str | None = Header(None)) -> None:
    """Verify API key if one is configured."""
    if _API_KEY and x_api_key != _API_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing API key")


# ---------------------------------------------------------------------------
# Health
# ---------------------------------------------------------------------------


@app.get("/health", response_model=HealthResponse, tags=["system"])
def health():
    """Health check endpoint."""
    return HealthResponse(
        status="healthy",
        version=__version__,
        timestamp=datetime.now(timezone.utc).isoformat(),
    )


@app.get("/jurisdictions", tags=["system"])
def get_jurisdictions():
    """List available regulatory jurisdictions."""
    return {"jurisdictions": list_jurisdictions()}


# ---------------------------------------------------------------------------
# Audit endpoints
# ---------------------------------------------------------------------------


@app.post("/audit", response_model=AuditResponse, tags=["audit"],
          dependencies=[Depends(_check_api_key)])
def run_audit(request: AuditRequest):
    """Run a fairness audit on provided predictions and demographics.

    Accepts model predictions, ground truth labels, and demographic data.
    Returns a complete fairness assessment with per-metric results and
    regulatory compliance mapping.
    """
    y_true = np.array(request.y_true, dtype=int)
    y_pred = np.array(request.y_pred, dtype=int)
    y_score = np.array(request.y_score, dtype=float) if request.y_score else None

    demographics = pd.DataFrame(request.demographics)

    audit = FairnessAudit(
        model_name=request.model_name,
        protected_attributes=request.protected_attributes,
        jurisdiction=request.jurisdiction,
        clinical_domain=request.clinical_domain,
        metrics=request.metrics,
        thresholds=(
            {"fair": request.fair_threshold, "marginal": request.marginal_threshold}
            if request.fair_threshold is not None
            else None
        ),
    )

    try:
        result = audit.run(
            y_true=y_true,
            y_pred=y_pred,
            demographics=demographics,
            y_score=y_score,
        )
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))

    # Persist to database
    _store.save(result)
    _store.save_alerts(result)

    result_dict = result.to_dict()
    return AuditResponse(
        audit_id=result.audit_id,
        model_name=result.model_name,
        timestamp=result.timestamp,
        overall_fairness=result.overall_fairness.value,
        total_metrics=len(result.metric_results),
        fair_count=len(result.fair_metrics),
        marginal_count=len(result.marginal_metrics),
        unfair_count=len(result.unfair_metrics),
        metric_results=result_dict["metric_results"],
        summary=result_dict["summary"],
        group_counts=result.group_counts,
    )


@app.get("/audit/{audit_id}", tags=["audit"], dependencies=[Depends(_check_api_key)])
def get_audit(audit_id: str):
    """Retrieve a specific audit result by ID."""
    result = _store.get_result(audit_id)
    if result is None:
        raise HTTPException(status_code=404, detail=f"Audit '{audit_id}' not found")
    return result


@app.get("/audit/{audit_id}/report", tags=["audit"], dependencies=[Depends(_check_api_key)])
def get_audit_report(audit_id: str, format: str = "json"):
    """Generate a report for a specific audit.

    Supports format=json (default) or format=text for human-readable summary.
    """
    result_dict = _store.get_result(audit_id)
    if result_dict is None:
        raise HTTPException(status_code=404, detail=f"Audit '{audit_id}' not found")
    return result_dict


# ---------------------------------------------------------------------------
# Monitoring endpoints
# ---------------------------------------------------------------------------


@app.get("/models", response_model=list[ModelListResponse], tags=["monitoring"],
         dependencies=[Depends(_check_api_key)])
def list_models():
    """List all monitored models with their latest audit status."""
    return _store.list_models()


@app.get("/models/{model_name}/history", tags=["monitoring"],
         dependencies=[Depends(_check_api_key)])
def get_model_history(model_name: str, limit: int = 50):
    """Get audit history for a specific model."""
    history = _store.get_history(model_name, limit=limit)
    if not history:
        raise HTTPException(status_code=404, detail=f"No history for model '{model_name}'")
    return history


@app.get("/models/{model_name}/drift/{metric_name}",
         response_model=list[DriftSeriesResponse],
         tags=["monitoring"], dependencies=[Depends(_check_api_key)])
def get_drift_series(model_name: str, metric_name: str):
    """Get fairness drift time-series for a specific metric on a model.

    Useful for plotting how a metric's disparity changes over time
    across successive audits.
    """
    series = _store.get_drift_series(model_name, metric_name)
    if not series:
        raise HTTPException(
            status_code=404,
            detail=f"No drift data for model '{model_name}' metric '{metric_name}'"
        )
    return series


# ---------------------------------------------------------------------------
# Alert endpoints
# ---------------------------------------------------------------------------


@app.get("/alerts", response_model=list[AlertResponse], tags=["alerts"],
         dependencies=[Depends(_check_api_key)])
def get_alerts(model_name: str | None = None, unresolved_only: bool = True):
    """Get fairness alerts. Optionally filter by model."""
    return _store.get_alerts(model_name=model_name, unresolved_only=unresolved_only)


@app.post("/alerts/{alert_id}/resolve", tags=["alerts"],
          dependencies=[Depends(_check_api_key)])
def resolve_alert(alert_id: str):
    """Mark an alert as resolved."""
    success = _store.resolve_alert(alert_id)
    if not success:
        raise HTTPException(status_code=404, detail=f"Alert '{alert_id}' not found")
    return {"status": "resolved", "alert_id": alert_id}


# ---------------------------------------------------------------------------
# Simulation endpoints
# ---------------------------------------------------------------------------


@app.post("/simulate", response_model=list[SimulationResponse], tags=["simulation"],
          dependencies=[Depends(_check_api_key)])
def run_simulation(request: SimulationRequest):
    """Run what-if fairness simulations.

    Compare threshold adjustment and resampling strategies with
    accuracy trade-off tracking.
    """
    y_true = np.array(request.y_true, dtype=int)
    y_pred = np.array(request.y_pred, dtype=int)
    y_score = np.array(request.y_score, dtype=float) if request.y_score else None
    groups = np.array(request.groups)

    try:
        results = compare_interventions(
            y_true=y_true,
            y_pred=y_pred,
            y_score=y_score,
            groups=groups,
            target_metric=request.target_metric,
        )
    except Exception as e:
        raise HTTPException(status_code=422, detail=str(e))

    return results
