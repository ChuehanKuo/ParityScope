"""Audit result data structures.

Immutable, serializable containers for audit outputs. Designed for
deterministic reproducibility and regulatory documentation.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum


class FairnessLevel(str, Enum):
    """Fairness assessment level based on disparity thresholds."""

    FAIR = "fair"  # Disparity below acceptable threshold
    MARGINAL = "marginal"  # Disparity in warning zone
    UNFAIR = "unfair"  # Disparity exceeds threshold


@dataclass(frozen=True)
class GroupResult:
    """Result for a single demographic group within a metric."""

    group_label: str
    rate: float
    sample_size: int


@dataclass(frozen=True)
class MetricResult:
    """Result for a single fairness metric across all groups."""

    metric_name: str
    display_name: str
    disparity: float
    fairness_level: FairnessLevel
    group_results: tuple[GroupResult, ...]
    threshold: float
    details: dict[str, object] = field(default_factory=dict)


@dataclass(frozen=True)
class AuditResult:
    """Complete fairness audit result."""

    # Identification
    audit_id: str
    model_name: str
    timestamp: str

    # Configuration
    protected_attributes: tuple[str, ...]
    metrics_evaluated: tuple[str, ...]
    jurisdiction: str | None
    clinical_domain: str | None
    thresholds: dict[str, float]

    # Results
    metric_results: tuple[MetricResult, ...]
    overall_fairness: FairnessLevel

    # Summary statistics
    total_samples: int
    group_counts: dict[str, int]

    # Extended results (v0.2.0)
    intersectional_results: tuple[MetricResult, ...] | None = None
    worst_subgroups: tuple[dict, ...] | None = None
    sample_adequacy: dict | None = None
    confidence_intervals: dict | None = None

    # Provenance (v0.2.1+) — kept optional for backward compatibility with
    # older serialized results.
    engine_version: str = ""
    regulation_profile_version: str = ""
    input_hash: str | None = None

    @property
    def unfair_metrics(self) -> list[MetricResult]:
        """Return metrics flagged as unfair."""
        return [m for m in self.metric_results if m.fairness_level == FairnessLevel.UNFAIR]

    @property
    def marginal_metrics(self) -> list[MetricResult]:
        """Return metrics flagged as marginal."""
        return [m for m in self.metric_results if m.fairness_level == FairnessLevel.MARGINAL]

    @property
    def fair_metrics(self) -> list[MetricResult]:
        """Return metrics assessed as fair."""
        return [m for m in self.metric_results if m.fairness_level == FairnessLevel.FAIR]

    def to_dict(self) -> dict:
        """Serialize to a plain dictionary for JSON export."""
        result = {
            "audit_id": self.audit_id,
            "model_name": self.model_name,
            "timestamp": self.timestamp,
            "protected_attributes": list(self.protected_attributes),
            "metrics_evaluated": list(self.metrics_evaluated),
            "jurisdiction": self.jurisdiction,
            "clinical_domain": self.clinical_domain,
            "thresholds": self.thresholds,
            "overall_fairness": self.overall_fairness.value,
            "total_samples": self.total_samples,
            "group_counts": self.group_counts,
            "summary": {
                "total_metrics": len(self.metric_results),
                "fair": len(self.fair_metrics),
                "marginal": len(self.marginal_metrics),
                "unfair": len(self.unfair_metrics),
            },
            "metric_results": [
                {
                    "metric_name": m.metric_name,
                    "display_name": m.display_name,
                    "disparity": m.disparity,
                    "fairness_level": m.fairness_level.value,
                    "threshold": m.threshold,
                    "group_results": [
                        {
                            "group": g.group_label,
                            "rate": g.rate,
                            "sample_size": g.sample_size,
                        }
                        for g in m.group_results
                    ],
                    **({"ci_lower": m.details["ci_lower"],
                        "ci_upper": m.details["ci_upper"]}
                       if "ci_lower" in m.details else {}),
                    **({"effect_sizes": m.details["effect_sizes"]}
                       if "effect_sizes" in m.details else {}),
                }
                for m in self.metric_results
            ],
        }
        # Add extended results if present
        if self.intersectional_results is not None:
            result["intersectional_results"] = [
                {
                    "metric_name": m.metric_name,
                    "display_name": m.display_name,
                    "disparity": m.disparity,
                    "fairness_level": m.fairness_level.value,
                    "threshold": m.threshold,
                    "group_results": [
                        {"group": g.group_label, "rate": g.rate, "sample_size": g.sample_size}
                        for g in m.group_results
                    ],
                }
                for m in self.intersectional_results
            ]
        if self.worst_subgroups is not None:
            result["worst_subgroups"] = list(self.worst_subgroups)
        if self.sample_adequacy is not None:
            result["sample_adequacy"] = self.sample_adequacy
        if self.confidence_intervals is not None:
            result["confidence_intervals"] = self.confidence_intervals
        # Provenance fields (always emitted; empty strings if unset)
        result["engine_version"] = self.engine_version
        result["regulation_profile_version"] = self.regulation_profile_version
        result["input_hash"] = self.input_hash
        return result

    @staticmethod
    def _now_iso() -> str:
        return datetime.now(timezone.utc).isoformat()
