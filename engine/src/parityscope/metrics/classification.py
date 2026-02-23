"""Classification-based fairness metrics.

These metrics evaluate fairness of binary classification models by comparing
error rates and prediction rates across demographic groups. Each function
returns the maximum absolute difference across all group pairs (0 = perfectly
fair, 1 = maximally unfair).
"""

from __future__ import annotations

import numpy as np
from numpy.typing import ArrayLike


def _validate_inputs(
    y_true: ArrayLike, y_pred: ArrayLike, groups: ArrayLike
) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """Validate and convert inputs to numpy arrays."""
    y_true = np.asarray(y_true, dtype=int)
    y_pred = np.asarray(y_pred, dtype=int)
    groups = np.asarray(groups)

    if y_true.shape != y_pred.shape:
        raise ValueError(
            f"y_true and y_pred must have same shape, got {y_true.shape} and {y_pred.shape}"
        )
    if y_true.shape != groups.shape:
        raise ValueError(
            f"y_true and groups must have same shape, got {y_true.shape} and {groups.shape}"
        )
    if len(y_true) == 0:
        raise ValueError("Input arrays must not be empty")

    return y_true, y_pred, groups


def _group_rate(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    groups: np.ndarray,
    numerator_fn: callable,
    denominator_fn: callable,
) -> dict[str, float]:
    """Compute a rate for each group, returning {group_label: rate}."""
    unique_groups = np.unique(groups)
    rates: dict[str, float] = {}
    for g in unique_groups:
        mask = groups == g
        num = numerator_fn(y_true[mask], y_pred[mask])
        den = denominator_fn(y_true[mask], y_pred[mask])
        rates[str(g)] = float(num / den) if den > 0 else 0.0
    return rates


def _max_disparity(rates: dict[str, float]) -> float:
    """Return the maximum absolute difference between any two group rates."""
    values = list(rates.values())
    if len(values) < 2:
        return 0.0
    return float(max(values) - min(values))


# ---------------------------------------------------------------------------
# Core metrics
# ---------------------------------------------------------------------------


def demographic_parity(
    y_true: ArrayLike, y_pred: ArrayLike, groups: ArrayLike
) -> dict[str, object]:
    """Demographic Parity (Statistical Parity).

    Measures whether the positive prediction rate is equal across groups.
    Disparity = max|P(Y_hat=1|G=a) - P(Y_hat=1|G=b)| for all groups a,b.
    """
    y_true, y_pred, groups = _validate_inputs(y_true, y_pred, groups)
    rates = _group_rate(
        y_true,
        y_pred,
        groups,
        numerator_fn=lambda yt, yp: np.sum(yp == 1),
        denominator_fn=lambda yt, yp: len(yp),
    )
    return {"disparity": _max_disparity(rates), "group_rates": rates}


def equal_opportunity(
    y_true: ArrayLike, y_pred: ArrayLike, groups: ArrayLike
) -> dict[str, object]:
    """Equal Opportunity.

    Measures whether the true positive rate (recall/sensitivity) is equal
    across groups. Disparity = max|TPR_a - TPR_b|.
    """
    y_true, y_pred, groups = _validate_inputs(y_true, y_pred, groups)
    rates = _group_rate(
        y_true,
        y_pred,
        groups,
        numerator_fn=lambda yt, yp: np.sum((yp == 1) & (yt == 1)),
        denominator_fn=lambda yt, yp: np.sum(yt == 1),
    )
    return {"disparity": _max_disparity(rates), "group_rates": rates}


def equalized_odds(
    y_true: ArrayLike, y_pred: ArrayLike, groups: ArrayLike
) -> dict[str, object]:
    """Equalized Odds.

    Requires both TPR and FPR to be equal across groups.
    Disparity = max(TPR_disparity, FPR_disparity).
    """
    y_true, y_pred, groups = _validate_inputs(y_true, y_pred, groups)

    tpr_rates = _group_rate(
        y_true,
        y_pred,
        groups,
        numerator_fn=lambda yt, yp: np.sum((yp == 1) & (yt == 1)),
        denominator_fn=lambda yt, yp: np.sum(yt == 1),
    )
    fpr_rates = _group_rate(
        y_true,
        y_pred,
        groups,
        numerator_fn=lambda yt, yp: np.sum((yp == 1) & (yt == 0)),
        denominator_fn=lambda yt, yp: np.sum(yt == 0),
    )
    return {
        "disparity": max(_max_disparity(tpr_rates), _max_disparity(fpr_rates)),
        "tpr_rates": tpr_rates,
        "fpr_rates": fpr_rates,
    }


def predictive_parity(
    y_true: ArrayLike, y_pred: ArrayLike, groups: ArrayLike
) -> dict[str, object]:
    """Predictive Parity (Positive Predictive Value Parity).

    Measures whether precision is equal across groups.
    Disparity = max|PPV_a - PPV_b|.
    """
    y_true, y_pred, groups = _validate_inputs(y_true, y_pred, groups)
    rates = _group_rate(
        y_true,
        y_pred,
        groups,
        numerator_fn=lambda yt, yp: np.sum((yp == 1) & (yt == 1)),
        denominator_fn=lambda yt, yp: np.sum(yp == 1),
    )
    return {"disparity": _max_disparity(rates), "group_rates": rates}


def false_positive_rate_parity(
    y_true: ArrayLike, y_pred: ArrayLike, groups: ArrayLike
) -> dict[str, object]:
    """False Positive Rate Parity.

    Disparity = max|FPR_a - FPR_b|.
    """
    y_true, y_pred, groups = _validate_inputs(y_true, y_pred, groups)
    rates = _group_rate(
        y_true,
        y_pred,
        groups,
        numerator_fn=lambda yt, yp: np.sum((yp == 1) & (yt == 0)),
        denominator_fn=lambda yt, yp: np.sum(yt == 0),
    )
    return {"disparity": _max_disparity(rates), "group_rates": rates}


def false_negative_rate_parity(
    y_true: ArrayLike, y_pred: ArrayLike, groups: ArrayLike
) -> dict[str, object]:
    """False Negative Rate Parity.

    Disparity = max|FNR_a - FNR_b|.
    """
    y_true, y_pred, groups = _validate_inputs(y_true, y_pred, groups)
    rates = _group_rate(
        y_true,
        y_pred,
        groups,
        numerator_fn=lambda yt, yp: np.sum((yp == 0) & (yt == 1)),
        denominator_fn=lambda yt, yp: np.sum(yt == 1),
    )
    return {"disparity": _max_disparity(rates), "group_rates": rates}


def false_discovery_rate_parity(
    y_true: ArrayLike, y_pred: ArrayLike, groups: ArrayLike
) -> dict[str, object]:
    """False Discovery Rate Parity.

    Disparity = max|FDR_a - FDR_b|.
    """
    y_true, y_pred, groups = _validate_inputs(y_true, y_pred, groups)
    rates = _group_rate(
        y_true,
        y_pred,
        groups,
        numerator_fn=lambda yt, yp: np.sum((yp == 1) & (yt == 0)),
        denominator_fn=lambda yt, yp: np.sum(yp == 1),
    )
    return {"disparity": _max_disparity(rates), "group_rates": rates}


def false_omission_rate_parity(
    y_true: ArrayLike, y_pred: ArrayLike, groups: ArrayLike
) -> dict[str, object]:
    """False Omission Rate Parity.

    Disparity = max|FOR_a - FOR_b|.
    """
    y_true, y_pred, groups = _validate_inputs(y_true, y_pred, groups)
    rates = _group_rate(
        y_true,
        y_pred,
        groups,
        numerator_fn=lambda yt, yp: np.sum((yp == 0) & (yt == 1)),
        denominator_fn=lambda yt, yp: np.sum(yp == 0),
    )
    return {"disparity": _max_disparity(rates), "group_rates": rates}


def accuracy_parity(
    y_true: ArrayLike, y_pred: ArrayLike, groups: ArrayLike
) -> dict[str, object]:
    """Accuracy Parity.

    Measures whether overall accuracy is equal across groups.
    Disparity = max|Acc_a - Acc_b|.
    """
    y_true, y_pred, groups = _validate_inputs(y_true, y_pred, groups)
    rates = _group_rate(
        y_true,
        y_pred,
        groups,
        numerator_fn=lambda yt, yp: np.sum(yt == yp),
        denominator_fn=lambda yt, yp: len(yp),
    )
    return {"disparity": _max_disparity(rates), "group_rates": rates}


def treatment_equality(
    y_true: ArrayLike, y_pred: ArrayLike, groups: ArrayLike
) -> dict[str, object]:
    """Treatment Equality.

    Measures whether the ratio of FN to FP is equal across groups.
    Disparity = max|ratio_a - ratio_b|.
    """
    y_true, y_pred, groups = _validate_inputs(y_true, y_pred, groups)
    unique_groups = np.unique(groups)
    ratios: dict[str, float] = {}
    for g in unique_groups:
        mask = groups == g
        fp = np.sum((y_pred[mask] == 1) & (y_true[mask] == 0))
        fn = np.sum((y_pred[mask] == 0) & (y_true[mask] == 1))
        ratios[str(g)] = float(fn / fp) if fp > 0 else float("inf") if fn > 0 else 0.0
    # Filter out inf values for disparity calculation
    finite_ratios = {k: v for k, v in ratios.items() if np.isfinite(v)}
    return {
        "disparity": _max_disparity(finite_ratios) if len(finite_ratios) >= 2 else float("inf"),
        "group_ratios": ratios,
    }


def positive_predictive_value_parity(
    y_true: ArrayLike, y_pred: ArrayLike, groups: ArrayLike
) -> dict[str, object]:
    """Positive Predictive Value (Precision) Parity. Alias for predictive_parity."""
    return predictive_parity(y_true, y_pred, groups)


def negative_predictive_value_parity(
    y_true: ArrayLike, y_pred: ArrayLike, groups: ArrayLike
) -> dict[str, object]:
    """Negative Predictive Value Parity.

    Disparity = max|NPV_a - NPV_b|.
    """
    y_true, y_pred, groups = _validate_inputs(y_true, y_pred, groups)
    rates = _group_rate(
        y_true,
        y_pred,
        groups,
        numerator_fn=lambda yt, yp: np.sum((yp == 0) & (yt == 0)),
        denominator_fn=lambda yt, yp: np.sum(yp == 0),
    )
    return {"disparity": _max_disparity(rates), "group_rates": rates}


def specificity_parity(
    y_true: ArrayLike, y_pred: ArrayLike, groups: ArrayLike
) -> dict[str, object]:
    """Specificity (True Negative Rate) Parity.

    Disparity = max|TNR_a - TNR_b|.
    """
    y_true, y_pred, groups = _validate_inputs(y_true, y_pred, groups)
    rates = _group_rate(
        y_true,
        y_pred,
        groups,
        numerator_fn=lambda yt, yp: np.sum((yp == 0) & (yt == 0)),
        denominator_fn=lambda yt, yp: np.sum(yt == 0),
    )
    return {"disparity": _max_disparity(rates), "group_rates": rates}
