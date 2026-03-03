"""Pydantic schemas for the ParityScope REST API."""

from __future__ import annotations

from pydantic import BaseModel, Field


# ---------------------------------------------------------------------------
# Request schemas
# ---------------------------------------------------------------------------


class AuditRequest(BaseModel):
    """Request body for running a fairness audit."""

    model_name: str = Field(..., description="Identifier for the model being audited")
    y_true: list[int] = Field(..., description="Ground truth binary labels (0/1)")
    y_pred: list[int] = Field(..., description="Model binary predictions (0/1)")
    y_score: list[float] | None = Field(None, description="Optional probability scores [0,1]")
    demographics: dict[str, list] = Field(
        ..., description="Demographics dict: {attribute_name: [values...]}"
    )
    protected_attributes: list[str] = Field(
        ..., description="List of demographic attributes to evaluate"
    )
    jurisdiction: str | None = Field(None, description="Regulatory jurisdiction (e.g., 'eu-ai-act')")
    clinical_domain: str | None = Field(
        None, description="Clinical use case (e.g., 'diagnosis', 'risk_stratification')"
    )
    metrics: list[str] | None = Field(None, description="Explicit metrics to compute (overrides defaults)")
    fair_threshold: float | None = Field(None, ge=0, le=1, description="Custom fair threshold")
    marginal_threshold: float | None = Field(None, ge=0, le=1, description="Custom marginal threshold")

    model_config = {"json_schema_extra": {
        "examples": [{
            "model_name": "sepsis_risk_v2",
            "y_true": [0, 1, 0, 1, 1],
            "y_pred": [0, 1, 0, 0, 1],
            "demographics": {"race": ["White", "Black", "White", "Black", "White"]},
            "protected_attributes": ["race"],
            "jurisdiction": "eu-ai-act",
            "clinical_domain": "diagnosis",
        }]
    }}


class SimulationRequest(BaseModel):
    """Request body for what-if simulations."""

    y_true: list[int] = Field(..., description="Ground truth labels")
    y_pred: list[int] = Field(..., description="Model predictions")
    y_score: list[float] | None = Field(None, description="Optional probability scores")
    groups: list[str] = Field(..., description="Group membership labels")
    target_metric: str = Field(
        "demographic_parity",
        description="Metric to optimize (demographic_parity, equal_opportunity, equalized_odds)",
    )


# ---------------------------------------------------------------------------
# Response schemas
# ---------------------------------------------------------------------------


class HealthResponse(BaseModel):
    status: str
    version: str
    timestamp: str


class AuditResponse(BaseModel):
    audit_id: str
    model_name: str
    timestamp: str
    overall_fairness: str
    total_metrics: int
    fair_count: int
    marginal_count: int
    unfair_count: int
    metric_results: list[dict]
    summary: dict
    group_counts: dict[str, int]


class ModelListResponse(BaseModel):
    model_name: str
    latest_audit: str | None
    overall_fairness: str
    total_metrics: int
    unfair_count: int


class DriftSeriesResponse(BaseModel):
    timestamp: str | None
    audit_id: str
    disparity: float
    fairness_level: str


class AlertResponse(BaseModel):
    id: str
    model_name: str
    audit_id: str
    timestamp: str | None
    metric_name: str
    disparity: float
    threshold: float
    fairness_level: str
    message: str
    resolved: bool


class SimulationResponse(BaseModel):
    intervention: str
    target_metric: str

    model_config = {"extra": "allow"}
