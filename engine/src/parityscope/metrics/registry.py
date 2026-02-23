"""Metric registry — central catalog of all available fairness metrics.

Provides metadata, lookup, and filtering for metrics. Used by the audit engine
and regulation modules to select appropriate metrics for a given context.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from enum import Enum
from typing import Callable


class MetricCategory(str, Enum):
    CLASSIFICATION = "classification"
    CALIBRATION = "calibration"


class InputType(str, Enum):
    BINARY = "binary"  # Requires binary predictions (0/1)
    SCORE = "score"  # Requires continuous probability scores


@dataclass(frozen=True)
class MetricInfo:
    """Metadata for a fairness metric."""

    name: str
    display_name: str
    description: str
    category: MetricCategory
    input_type: InputType
    compute_fn: Callable
    clinical_relevance: str = ""
    tags: tuple[str, ...] = field(default_factory=tuple)


def _build_registry() -> dict[str, MetricInfo]:
    """Build the metric registry. Imported lazily to avoid circular imports."""
    from parityscope.metrics.calibration import (
        calibration_difference,
        score_distribution_difference,
        well_calibration,
    )
    from parityscope.metrics.classification import (
        accuracy_parity,
        demographic_parity,
        equal_opportunity,
        equalized_odds,
        false_discovery_rate_parity,
        false_negative_rate_parity,
        false_omission_rate_parity,
        false_positive_rate_parity,
        negative_predictive_value_parity,
        predictive_parity,
        specificity_parity,
        treatment_equality,
    )

    metrics = [
        MetricInfo(
            name="demographic_parity",
            display_name="Demographic Parity",
            description="Equal positive prediction rate across groups",
            category=MetricCategory.CLASSIFICATION,
            input_type=InputType.BINARY,
            compute_fn=demographic_parity,
            clinical_relevance="Ensures screening/referral rates don't systematically differ by group",
            tags=("group_fairness", "independence"),
        ),
        MetricInfo(
            name="equal_opportunity",
            display_name="Equal Opportunity",
            description="Equal true positive rate (sensitivity) across groups",
            category=MetricCategory.CLASSIFICATION,
            input_type=InputType.BINARY,
            compute_fn=equal_opportunity,
            clinical_relevance="Critical for diagnostic AI — ensures diseased patients are equally likely to be detected regardless of demographics",
            tags=("group_fairness", "separation"),
        ),
        MetricInfo(
            name="equalized_odds",
            display_name="Equalized Odds",
            description="Equal TPR and FPR across groups",
            category=MetricCategory.CLASSIFICATION,
            input_type=InputType.BINARY,
            compute_fn=equalized_odds,
            clinical_relevance="Balances both missed diagnoses and false alarms across groups",
            tags=("group_fairness", "separation"),
        ),
        MetricInfo(
            name="predictive_parity",
            display_name="Predictive Parity",
            description="Equal positive predictive value (precision) across groups",
            category=MetricCategory.CLASSIFICATION,
            input_type=InputType.BINARY,
            compute_fn=predictive_parity,
            clinical_relevance="Ensures a positive prediction is equally reliable regardless of patient demographics",
            tags=("group_fairness", "sufficiency"),
        ),
        MetricInfo(
            name="false_positive_rate_parity",
            display_name="False Positive Rate Parity",
            description="Equal false positive rate across groups",
            category=MetricCategory.CLASSIFICATION,
            input_type=InputType.BINARY,
            compute_fn=false_positive_rate_parity,
            clinical_relevance="Prevents unnecessary interventions from disproportionately affecting certain groups",
            tags=("group_fairness", "separation"),
        ),
        MetricInfo(
            name="false_negative_rate_parity",
            display_name="False Negative Rate Parity",
            description="Equal false negative rate across groups",
            category=MetricCategory.CLASSIFICATION,
            input_type=InputType.BINARY,
            compute_fn=false_negative_rate_parity,
            clinical_relevance="Ensures missed diagnoses don't disproportionately affect certain groups",
            tags=("group_fairness", "separation"),
        ),
        MetricInfo(
            name="false_discovery_rate_parity",
            display_name="False Discovery Rate Parity",
            description="Equal false discovery rate across groups",
            category=MetricCategory.CLASSIFICATION,
            input_type=InputType.BINARY,
            compute_fn=false_discovery_rate_parity,
            clinical_relevance="Ensures false alarm burden is equitably distributed",
            tags=("group_fairness", "sufficiency"),
        ),
        MetricInfo(
            name="false_omission_rate_parity",
            display_name="False Omission Rate Parity",
            description="Equal false omission rate across groups",
            category=MetricCategory.CLASSIFICATION,
            input_type=InputType.BINARY,
            compute_fn=false_omission_rate_parity,
            clinical_relevance="Ensures negative predictions are equally trustworthy across groups",
            tags=("group_fairness", "sufficiency"),
        ),
        MetricInfo(
            name="accuracy_parity",
            display_name="Accuracy Parity",
            description="Equal overall accuracy across groups",
            category=MetricCategory.CLASSIFICATION,
            input_type=InputType.BINARY,
            compute_fn=accuracy_parity,
            clinical_relevance="Ensures overall model performance doesn't vary by patient demographics",
            tags=("group_fairness",),
        ),
        MetricInfo(
            name="treatment_equality",
            display_name="Treatment Equality",
            description="Equal ratio of false negatives to false positives across groups",
            category=MetricCategory.CLASSIFICATION,
            input_type=InputType.BINARY,
            compute_fn=treatment_equality,
            clinical_relevance="Measures whether the type of errors (missed vs. unnecessary) is balanced across groups",
            tags=("group_fairness",),
        ),
        MetricInfo(
            name="negative_predictive_value_parity",
            display_name="Negative Predictive Value Parity",
            description="Equal NPV across groups",
            category=MetricCategory.CLASSIFICATION,
            input_type=InputType.BINARY,
            compute_fn=negative_predictive_value_parity,
            clinical_relevance="Ensures a negative prediction is equally reliable across groups",
            tags=("group_fairness", "sufficiency"),
        ),
        MetricInfo(
            name="specificity_parity",
            display_name="Specificity Parity",
            description="Equal true negative rate across groups",
            category=MetricCategory.CLASSIFICATION,
            input_type=InputType.BINARY,
            compute_fn=specificity_parity,
            clinical_relevance="Ensures healthy patients are equally likely to be correctly ruled out",
            tags=("group_fairness", "separation"),
        ),
        MetricInfo(
            name="calibration_difference",
            display_name="Calibration Difference",
            description="Equal calibration error across groups",
            category=MetricCategory.CALIBRATION,
            input_type=InputType.SCORE,
            compute_fn=calibration_difference,
            clinical_relevance="Ensures predicted risk probabilities are equally accurate across groups",
            tags=("calibration",),
        ),
        MetricInfo(
            name="well_calibration",
            display_name="Well Calibration (Brier Parity)",
            description="Equal Brier score across groups",
            category=MetricCategory.CALIBRATION,
            input_type=InputType.SCORE,
            compute_fn=well_calibration,
            clinical_relevance="Ensures overall probabilistic prediction quality is equitable",
            tags=("calibration",),
        ),
        MetricInfo(
            name="score_distribution_difference",
            display_name="Score Distribution Difference",
            description="KS statistic measuring score distribution gap between groups",
            category=MetricCategory.CALIBRATION,
            input_type=InputType.SCORE,
            compute_fn=score_distribution_difference,
            clinical_relevance="Detects whether risk scores are distributed differently across groups",
            tags=("distribution",),
        ),
    ]

    return {m.name: m for m in metrics}


# Lazy singleton
_REGISTRY: dict[str, MetricInfo] | None = None


def _get_registry() -> dict[str, MetricInfo]:
    global _REGISTRY
    if _REGISTRY is None:
        _REGISTRY = _build_registry()
    return _REGISTRY


# Public API uses a property-like pattern
class _RegistryProxy:
    """Proxy that behaves like a dict but initializes lazily."""

    def __getitem__(self, key: str) -> MetricInfo:
        return _get_registry()[key]

    def __contains__(self, key: object) -> bool:
        return key in _get_registry()

    def __iter__(self):
        return iter(_get_registry())

    def __len__(self) -> int:
        return len(_get_registry())

    def keys(self):
        return _get_registry().keys()

    def values(self):
        return _get_registry().values()

    def items(self):
        return _get_registry().items()


METRIC_REGISTRY = _RegistryProxy()


def get_metric(name: str) -> MetricInfo:
    """Get a metric by name. Raises KeyError if not found."""
    registry = _get_registry()
    if name not in registry:
        available = ", ".join(sorted(registry.keys()))
        raise KeyError(f"Unknown metric '{name}'. Available: {available}")
    return registry[name]


def list_metrics(
    category: MetricCategory | None = None,
    input_type: InputType | None = None,
    tag: str | None = None,
) -> list[MetricInfo]:
    """List metrics with optional filtering."""
    registry = _get_registry()
    metrics = list(registry.values())

    if category is not None:
        metrics = [m for m in metrics if m.category == category]
    if input_type is not None:
        metrics = [m for m in metrics if m.input_type == input_type]
    if tag is not None:
        metrics = [m for m in metrics if tag in m.tags]

    return metrics
