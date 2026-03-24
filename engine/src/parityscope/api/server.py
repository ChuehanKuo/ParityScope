"""ParityScope REST API server.

Provides a FastAPI application with endpoints for auditing, reporting,
monitoring, root cause analysis, and recommendations.
"""

from __future__ import annotations

import json
import traceback
from io import BytesIO, StringIO
from typing import Any

import numpy as np
import pandas as pd
from fastapi import FastAPI, File, Form, HTTPException, Query, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response

from parityscope.api.helpers import (
    parse_demographics,
    reconstruct_audit_result,
    sanitize_for_json,
)
from parityscope.api.models import (
    AuditRequest,
    MonitorRunRequest,
    RootCauseRequest,
)


# ---------------------------------------------------------------------------
# App factory
# ---------------------------------------------------------------------------

def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    app = FastAPI(
        title="ParityScope API",
        description=(
            "Healthcare AI fairness compliance toolkit — audit, monitor, "
            "and mitigate bias in clinical AI systems."
        ),
        version="0.2.0",
    )

    # CORS middleware for browser access
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Global exception handler
    @app.exception_handler(Exception)
    async def _global_exc(request: Request, exc: Exception) -> JSONResponse:
        tb = traceback.format_exc()
        return JSONResponse(
            status_code=500,
            content={"detail": str(exc), "traceback": tb},
        )

    # ------------------------------------------------------------------
    # Health
    # ------------------------------------------------------------------

    @app.get("/health")
    async def health():
        """Health check endpoint."""
        return {"status": "ok", "version": "0.2.0"}

    # ------------------------------------------------------------------
    # Audit
    # ------------------------------------------------------------------

    @app.post("/api/v1/audit")
    async def run_audit(body: AuditRequest):
        """Run a fairness audit on provided labels, predictions, and demographics."""
        from parityscope.audit.engine import FairnessAudit

        audit = FairnessAudit(
            model_name=body.model_name,
            protected_attributes=body.protected_attributes,
            jurisdiction=body.jurisdiction,
            clinical_domain=body.clinical_domain,
            intersectional=body.intersectional,
            bootstrap=body.bootstrap,
        )
        demographics_df = parse_demographics(body.demographics)
        result = audit.run(
            y_true=np.array(body.y_true, dtype=int),
            y_pred=np.array(body.y_pred, dtype=int),
            demographics=demographics_df,
            y_score=np.array(body.y_score, dtype=float) if body.y_score else None,
        )
        return JSONResponse(content=sanitize_for_json(result.to_dict()))

    @app.post("/api/v1/audit/csv")
    async def run_audit_csv(
        file: UploadFile = File(..., description="CSV file with labels, predictions, and demographics"),
        model_name: str = Form(...),
        protected_attributes: str = Form(..., description="Comma-separated attribute names"),
        jurisdiction: str | None = Form(None),
        clinical_domain: str | None = Form(None),
        intersectional: bool = Form(False),
        bootstrap: bool = Form(False),
        column_map: str | None = Form(None, description="JSON string mapping column roles to CSV column names"),
    ):
        """Run a fairness audit from an uploaded CSV file.

        The CSV must contain columns for y_true, y_pred, and each protected
        attribute.  Use ``column_map`` (JSON string) to specify custom column
        names, e.g. ``{"y_true": "label", "y_pred": "prediction"}``.
        """
        from parityscope.audit.engine import FairnessAudit

        content = await file.read()
        try:
            df = pd.read_csv(BytesIO(content))
        except Exception as exc:
            raise HTTPException(status_code=422, detail=f"Failed to parse CSV: {exc}")

        # Parse column map
        cmap: dict[str, str] = {}
        if column_map:
            try:
                cmap = json.loads(column_map)
            except json.JSONDecodeError as exc:
                raise HTTPException(status_code=422, detail=f"Invalid column_map JSON: {exc}")

        y_true_col = cmap.get("y_true", "y_true")
        y_pred_col = cmap.get("y_pred", "y_pred")
        y_score_col = cmap.get("y_score", "y_score")

        if y_true_col not in df.columns:
            raise HTTPException(status_code=422, detail=f"Column '{y_true_col}' not found in CSV")
        if y_pred_col not in df.columns:
            raise HTTPException(status_code=422, detail=f"Column '{y_pred_col}' not found in CSV")

        attrs = [a.strip() for a in protected_attributes.split(",")]
        for attr in attrs:
            mapped = cmap.get(attr, attr)
            if mapped not in df.columns:
                raise HTTPException(
                    status_code=422,
                    detail=f"Protected attribute column '{mapped}' not found in CSV",
                )

        demographics_df = pd.DataFrame(
            {attr: df[cmap.get(attr, attr)].astype(str) for attr in attrs}
        )
        y_score = (
            np.array(df[y_score_col], dtype=float)
            if y_score_col in df.columns
            else None
        )

        audit = FairnessAudit(
            model_name=model_name,
            protected_attributes=attrs,
            jurisdiction=jurisdiction,
            clinical_domain=clinical_domain,
            intersectional=intersectional,
            bootstrap=bootstrap,
        )
        result = audit.run(
            y_true=np.array(df[y_true_col], dtype=int),
            y_pred=np.array(df[y_pred_col], dtype=int),
            demographics=demographics_df,
            y_score=y_score,
        )
        return JSONResponse(content=sanitize_for_json(result.to_dict()))

    # ------------------------------------------------------------------
    # Reports
    # ------------------------------------------------------------------

    @app.post("/api/v1/report/pdf")
    async def generate_pdf(body: dict[str, Any]):
        """Generate a PDF audit report from an audit result JSON dict."""
        from parityscope.reports.pdf_report import generate_pdf_report

        audit_result = reconstruct_audit_result(body)
        pdf_bytes = generate_pdf_report(audit_result)
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=audit_report.pdf"},
        )

    @app.post("/api/v1/report/eu-ai-act")
    async def generate_eu_ai_act_report(body: dict[str, Any]):
        """Generate an EU AI Act conformity assessment PDF report."""
        from parityscope.reports.eu_ai_act import generate_eu_ai_act_report as gen_eu

        audit_result = reconstruct_audit_result(body)
        pdf_bytes = gen_eu(audit_result)
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=eu_ai_act_report.pdf"},
        )

    @app.post("/api/v1/report/executive-summary")
    async def generate_exec_summary(request: Request):
        """Generate an executive summary from audit result JSON.

        Returns text/plain by default, or application/pdf if the Accept
        header includes ``application/pdf``.
        """
        body = await request.json()
        audit_result = reconstruct_audit_result(body)

        accept = request.headers.get("accept", "")
        if "application/pdf" in accept:
            from parityscope.reports.executive_summary import (
                generate_executive_summary_pdf,
            )

            pdf_bytes = generate_executive_summary_pdf(audit_result)
            return Response(
                content=pdf_bytes,
                media_type="application/pdf",
                headers={
                    "Content-Disposition": "attachment; filename=executive_summary.pdf"
                },
            )
        else:
            from parityscope.reports.executive_summary import (
                generate_executive_summary,
            )

            text = generate_executive_summary(audit_result)
            return Response(content=text, media_type="text/plain")

    # ------------------------------------------------------------------
    # Monitoring
    # ------------------------------------------------------------------

    @app.post("/api/v1/monitor/run")
    async def monitor_run(body: MonitorRunRequest):
        """Run a monitoring audit — audit + store + drift + alerts + trends.

        Results are persisted to a SQLite database (``db_path`` field,
        defaults to ``./parityscope_monitoring.db``).
        """
        from parityscope.monitoring.config import MonitoringConfig
        from parityscope.monitoring.session import MonitoringSession

        config = MonitoringConfig(
            model_name=body.model_name,
            db_path=body.db_path,
            protected_attributes=body.protected_attributes,
            jurisdiction=body.jurisdiction,
            clinical_domain=body.clinical_domain,
        )
        session = MonitoringSession(config)
        demographics_df = parse_demographics(body.demographics)
        mon_result = session.run_audit(
            y_true=np.array(body.y_true, dtype=int),
            y_pred=np.array(body.y_pred, dtype=int),
            demographics=demographics_df,
            y_score=np.array(body.y_score, dtype=float) if body.y_score else None,
        )

        # Serialize MonitoringResult
        result_dict: dict[str, Any] = {
            "audit_result": mon_result.audit_result.to_dict(),
            "is_first_run": mon_result.is_first_run,
            "baseline_audit_id": mon_result.baseline_audit_id,
            "alerts": [
                {
                    "severity": a.severity.value if hasattr(a.severity, "value") else str(a.severity),
                    "message": a.message,
                    "metric": a.metric,
                    "rule_name": a.rule_name,
                }
                for a in mon_result.alerts
            ],
        }
        if mon_result.drift_results:
            result_dict["drift_results"] = [
                {
                    "metric_name": d.metric_name,
                    "baseline_value": d.baseline_value,
                    "current_value": d.current_value,
                    "change": d.change,
                    "drifted": d.drifted,
                }
                for d in mon_result.drift_results
            ]
        if mon_result.trend_results:
            result_dict["trend_results"] = [
                {
                    "metric_name": t.metric_name,
                    "direction": t.direction,
                    "slope": t.slope,
                    "p_value": t.p_value,
                    "n_points": t.n_points,
                    "forecast_next": t.forecast_next,
                }
                for t in mon_result.trend_results
            ]
        return JSONResponse(content=sanitize_for_json(result_dict))

    @app.get("/api/v1/monitor/status/{model_name}")
    async def monitor_status(
        model_name: str,
        db_path: str = Query("./parityscope_monitoring.db"),
    ):
        """Get the current monitoring status for a model."""
        from parityscope.monitoring.config import MonitoringConfig
        from parityscope.monitoring.session import MonitoringSession

        config = MonitoringConfig(
            model_name=model_name,
            db_path=db_path,
        )
        session = MonitoringSession(config)
        return JSONResponse(content=sanitize_for_json(session.get_status()))

    @app.get("/api/v1/monitor/history/{model_name}")
    async def monitor_history(
        model_name: str,
        db_path: str = Query("./parityscope_monitoring.db"),
        limit: int = Query(50, ge=1, le=500),
    ):
        """Get audit history for a model."""
        from parityscope.monitoring.config import MonitoringConfig
        from parityscope.monitoring.session import MonitoringSession

        config = MonitoringConfig(
            model_name=model_name,
            db_path=db_path,
        )
        session = MonitoringSession(config)
        summaries = session.get_history(limit=limit)
        return JSONResponse(content=sanitize_for_json({
            "model_name": model_name,
            "count": len(summaries),
            "audits": [
                {
                    "audit_id": s.audit_id,
                    "timestamp": s.timestamp,
                    "overall_fairness": s.overall_fairness,
                    "n_fair": s.n_fair,
                    "n_marginal": s.n_marginal,
                    "n_unfair": s.n_unfair,
                    "total_samples": s.total_samples,
                }
                for s in summaries
            ],
        }))

    @app.get("/api/v1/monitor/dashboard/{model_name}")
    async def monitor_dashboard(
        model_name: str,
        db_path: str = Query("./parityscope_monitoring.db"),
    ):
        """Get full dashboard data for a model."""
        from parityscope.monitoring.dashboard import DashboardAPI
        from parityscope.monitoring.store import MonitoringStore

        store = MonitoringStore(db_path)
        dashboard = DashboardAPI(store)
        return JSONResponse(content=sanitize_for_json(dashboard.full_dashboard(model_name)))

    # ------------------------------------------------------------------
    # Root Cause
    # ------------------------------------------------------------------

    @app.post("/api/v1/rootcause")
    async def run_rootcause(body: RootCauseRequest):
        """Run root cause analysis for fairness disparities.

        Requires feature data (X), labels, predictions, and demographics.
        """
        from parityscope.rootcause.analysis import RootCauseAnalysis

        X = pd.DataFrame(body.features)
        demographics_df = parse_demographics(body.demographics)

        rca = RootCauseAnalysis(protected_attributes=body.protected_attributes)
        report = rca.run(
            X=X,
            y_true=np.array(body.y_true, dtype=int),
            y_pred=np.array(body.y_pred, dtype=int),
            demographics=demographics_df,
        )
        return JSONResponse(content=sanitize_for_json(report.to_dict()))

    # ------------------------------------------------------------------
    # Recommendations
    # ------------------------------------------------------------------

    @app.post("/api/v1/recommendations")
    async def get_recommendations(body: dict[str, Any]):
        """Get prioritized recommendations from an audit result.

        Accepts the full audit result JSON (as returned by /api/v1/audit).
        """
        from parityscope.recommendations.prioritizer import prioritize_findings

        audit_result = reconstruct_audit_result(body)
        issues = prioritize_findings(audit_result)
        return JSONResponse(content=sanitize_for_json([
            {
                "id": issue.id,
                "severity": issue.severity.value,
                "title": issue.title,
                "description": issue.description,
                "affected_groups": issue.affected_groups,
                "affected_metric": issue.affected_metric,
                "disparity": issue.disparity,
                "regulatory_risk": issue.regulatory_risk,
                "clinical_impact": issue.clinical_impact,
                "mitigation_strategies": [
                    {
                        "id": s.id,
                        "strategy": s.strategy,
                        "description": s.description,
                        "difficulty": s.difficulty,
                        "expected_impact": s.expected_impact,
                    }
                    for s in issue.mitigation_strategies
                ],
                "priority_score": issue.priority_score,
            }
            for issue in issues
        ]))

    return app


# ---------------------------------------------------------------------------
# Entrypoint
# ---------------------------------------------------------------------------

app = create_app()


def run_server(
    host: str = "0.0.0.0",
    port: int = 8000,
    reload: bool = False,
) -> None:
    """Start the ParityScope API server via uvicorn."""
    import uvicorn

    uvicorn.run(
        "parityscope.api.server:app",
        host=host,
        port=port,
        reload=reload,
    )


if __name__ == "__main__":
    run_server()
