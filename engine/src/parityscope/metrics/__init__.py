"""Fairness metrics for evaluating clinical AI systems.

All metrics operate on numpy arrays and return deterministic, reproducible results.
Each metric function returns a float score and accepts predictions, ground truth,
and group membership arrays.
"""

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
    positive_predictive_value_parity,
    predictive_parity,
    specificity_parity,
    treatment_equality,
)
from parityscope.metrics.calibration import (
    calibration_difference,
    score_distribution_difference,
    well_calibration,
)
from parityscope.metrics.registry import METRIC_REGISTRY, MetricInfo, get_metric, list_metrics

__all__ = [
    # Classification metrics
    "demographic_parity",
    "equal_opportunity",
    "equalized_odds",
    "predictive_parity",
    "false_positive_rate_parity",
    "false_negative_rate_parity",
    "false_discovery_rate_parity",
    "false_omission_rate_parity",
    "accuracy_parity",
    "treatment_equality",
    "positive_predictive_value_parity",
    "negative_predictive_value_parity",
    "specificity_parity",
    # Calibration metrics
    "calibration_difference",
    "well_calibration",
    "score_distribution_difference",
    # Registry
    "METRIC_REGISTRY",
    "MetricInfo",
    "get_metric",
    "list_metrics",
]
