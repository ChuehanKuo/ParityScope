"""Pydantic models for request/response validation.

Provides typed request bodies and response schemas for all API endpoints.
Uses Pydantic v2 syntax.
"""

from __future__ import annotations

from typing import Any

from pydantic import BaseModel, Field, model_validator


# ---------------------------------------------------------------------------
# Audit
# ---------------------------------------------------------------------------

class AuditRequest(BaseModel):
    """Request body for POST /api/v1/audit."""

    model_config = {"extra": "forbid"}

    model_name: str = Field(..., description="Identifier for the model being audited")
    y_true: list[int] = Field(..., description="Ground truth binary labels (0/1)")
    y_pred: list[int] = Field(..., description="Model binary predictions (0/1)")
    y_score: list[float] | None = Field(
        None, description="Optional continuous probability scores"
    )
    demographics: dict[str, list[str]] = Field(
        ..., description="Mapping of attribute name to list of group labels"
    )
    protected_attributes: list[str] = Field(
        ..., description="Attributes to evaluate for fairness"
    )
    jurisdiction: str | None = Field(None, description="Regulatory jurisdiction")
    clinical_domain: str | None = Field(None, description="Clinical use case")
    intersectional: bool = Field(False, description="Run intersectional analysis")
    bootstrap: bool = Field(False, description="Compute bootstrap CIs")

    @model_validator(mode="after")
    def _check_lengths(self) -> "AuditRequest":
        n = len(self.y_true)
        if len(self.y_pred) != n:
            raise ValueError("y_true and y_pred must have the same length")
        if self.y_score is not None and len(self.y_score) != n:
            raise ValueError("y_score must have the same length as y_true")
        for attr, vals in self.demographics.items():
            if len(vals) != n:
                raise ValueError(
                    f"demographics['{attr}'] length {len(vals)} != y_true length {n}"
                )
        for attr in self.protected_attributes:
            if attr not in self.demographics:
                raise ValueError(
                    f"protected_attribute '{attr}' not found in demographics keys"
                )
        return self


class AuditResponse(BaseModel):
    """Wrapper for audit result JSON (pass-through dict)."""

    model_config = {"extra": "allow"}


class CSVAuditRequest(BaseModel):
    """Form fields for POST /api/v1/audit/csv (non-file fields)."""

    model_config = {"extra": "forbid"}

    model_name: str
    protected_attributes: str = Field(
        ..., description="Comma-separated attribute names"
    )
    jurisdiction: str | None = None
    clinical_domain: str | None = None
    intersectional: bool = False
    bootstrap: bool = False
    column_map: str | None = Field(
        None, description="JSON string mapping column roles to CSV column names"
    )


# ---------------------------------------------------------------------------
# Monitoring
# ---------------------------------------------------------------------------

class MonitorRunRequest(BaseModel):
    """Request body for POST /api/v1/monitor/run."""

    model_config = {"extra": "forbid"}

    model_name: str
    y_true: list[int]
    y_pred: list[int]
    y_score: list[float] | None = None
    demographics: dict[str, list[str]]
    protected_attributes: list[str]
    jurisdiction: str | None = None
    clinical_domain: str | None = None
    intersectional: bool = False
    bootstrap: bool = False
    db_path: str = "./parityscope_monitoring.db"


class MonitorStatusResponse(BaseModel):
    """Response for GET /api/v1/monitor/status/{model_name}."""

    model_config = {"extra": "allow"}

    model_name: str
    total_audits: int
    latest_audit: dict[str, Any] | None = None
    baseline_audit_id: str | None = None
    active_alerts: int = 0
    recent_alerts: list[dict[str, Any]] = []


# ---------------------------------------------------------------------------
# Root Cause
# ---------------------------------------------------------------------------

class RootCauseRequest(BaseModel):
    """Request body for POST /api/v1/rootcause."""

    model_config = {"extra": "forbid"}

    features: dict[str, list[Any]] = Field(
        ..., description="Feature columns as {column_name: [values...]}"
    )
    y_true: list[int]
    y_pred: list[int]
    demographics: dict[str, list[str]]
    protected_attributes: list[str]


# ---------------------------------------------------------------------------
# Recommendations
# ---------------------------------------------------------------------------

class RecommendationsRequest(BaseModel):
    """Request body for POST /api/v1/recommendations — accepts audit result dict."""

    model_config = {"extra": "allow"}
