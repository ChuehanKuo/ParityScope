"""Threshold-free fairness metrics.

These metrics evaluate fairness of probabilistic classifiers without
requiring a decision threshold. Critical for risk stratification use
cases (the most common healthcare ML pattern) where the operating
point may be chosen per-case or post-hoc.

Metrics:
    - auroc_parity: Discrimination (AUROC) equivalence across groups.
    - calibration_slope_parity: Calibration slope/intercept equivalence.
    - auprc_parity: Average precision equivalence (robust to imbalance).
"""

from __future__ import annotations

import warnings

import numpy as np
from numpy.typing import ArrayLike
from sklearn.exceptions import ConvergenceWarning
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import average_precision_score, roc_auc_score


def _validate_score_inputs(
    y_true: ArrayLike, y_score: ArrayLike, groups: ArrayLike
) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """Validate inputs for score-based metrics."""
    y_true = np.asarray(y_true, dtype=int)
    y_score = np.asarray(y_score, dtype=float)
    groups = np.asarray(groups)

    if y_true.shape != y_score.shape:
        raise ValueError(
            f"y_true and y_score must have same shape, got {y_true.shape} and {y_score.shape}"
        )
    if y_true.shape != groups.shape:
        raise ValueError(
            f"y_true and groups must have same shape, got {y_true.shape} and {groups.shape}"
        )
    if len(y_true) == 0:
        raise ValueError("Input arrays must not be empty")

    return y_true, y_score, groups


def _max_disparity_from_values(values: list[float]) -> float:
    """Return the maximum absolute difference between any two values."""
    if len(values) < 2:
        return 0.0
    return float(max(values) - min(values))


# ---------------------------------------------------------------------------
# AUROC Parity
# ---------------------------------------------------------------------------


def auroc_parity(
    y_true: ArrayLike,
    y_score: ArrayLike,
    groups: ArrayLike,
) -> dict[str, object]:
    """AUROC Parity.

    Compute AUROC per group and return max pairwise disparity. Threshold-free
    discrimination measure — useful when the model operating point is chosen
    per-case, as in most clinical risk-stratification deployments.

    Skips groups where y_true has only one class (AUROC undefined).

    Returns:
        Dictionary with ``disparity`` (max pairwise AUC gap) and
        ``group_aucs`` (per-group AUROC).
    """
    y_true, y_score, groups = _validate_score_inputs(y_true, y_score, groups)
    unique_groups = np.unique(groups)

    group_aucs: dict[str, float] = {}
    for g in unique_groups:
        mask = groups == g
        yt = y_true[mask]
        ys = y_score[mask]
        if len(np.unique(yt)) < 2:
            # AUROC undefined when y_true has only one class
            continue
        group_aucs[str(g)] = float(roc_auc_score(yt, ys))

    disparity = _max_disparity_from_values(list(group_aucs.values()))

    return {"disparity": disparity, "group_aucs": group_aucs}


# ---------------------------------------------------------------------------
# Calibration Slope / Intercept Parity
# ---------------------------------------------------------------------------


def _logit(p: np.ndarray) -> np.ndarray:
    """Numerically-safe logit function."""
    p = np.clip(p, 1e-6, 1 - 1e-6)
    return np.log(p / (1 - p))


def calibration_slope_parity(
    y_true: ArrayLike,
    y_score: ArrayLike,
    groups: ArrayLike,
) -> dict[str, object]:
    """Calibration Slope/Intercept Parity.

    For each group, fit logistic regression of ``y_true`` on ``logit(y_score)``.
    Perfect calibration has slope=1 and intercept=0. Disparity is the max
    pairwise difference in slope across groups — under-confidence or
    over-confidence that differs by group produces inequitable clinical
    decisions even when AUROC is identical.

    Edge cases:
        - ``y_score`` is clipped to ``[1e-6, 1 - 1e-6]`` before applying logit.
        - Groups with fewer than 10 samples are skipped.
        - Groups where ``y_true`` has only one class are skipped.
        - If fewer than 2 valid groups remain, disparity is 0.

    Returns:
        Dictionary with ``disparity`` (max pairwise slope gap), ``group_slopes``
        (per-group calibration slope), and ``group_intercepts`` (per-group
        intercept on the logit scale).
    """
    y_true, y_score, groups = _validate_score_inputs(y_true, y_score, groups)
    unique_groups = np.unique(groups)

    group_slopes: dict[str, float] = {}
    group_intercepts: dict[str, float] = {}

    for g in unique_groups:
        mask = groups == g
        yt = y_true[mask]
        ys = y_score[mask]

        if len(yt) < 10:
            continue
        if len(np.unique(yt)) < 2:
            continue

        logit_scores = _logit(ys).reshape(-1, 1)

        with warnings.catch_warnings():
            warnings.simplefilter("ignore", ConvergenceWarning)
            warnings.simplefilter("ignore", FutureWarning)
            # Effectively-unpenalized logistic regression (large C) so the
            # fitted slope directly reflects calibration (1.0 = perfectly
            # calibrated). `penalty=None` would be cleaner but is being
            # deprecated in sklearn 1.10, so we use a very large C instead.
            model = LogisticRegression(C=1e12, solver="lbfgs", max_iter=1000)
            try:
                model.fit(logit_scores, yt)
            except (ValueError, np.linalg.LinAlgError):
                continue

        slope = float(model.coef_[0, 0])
        intercept = float(model.intercept_[0])
        group_slopes[str(g)] = slope
        group_intercepts[str(g)] = intercept

    disparity = _max_disparity_from_values(list(group_slopes.values()))

    return {
        "disparity": disparity,
        "group_slopes": group_slopes,
        "group_intercepts": group_intercepts,
    }


# ---------------------------------------------------------------------------
# AUPRC (Average Precision) Parity
# ---------------------------------------------------------------------------


def auprc_parity(
    y_true: ArrayLike,
    y_score: ArrayLike,
    groups: ArrayLike,
) -> dict[str, object]:
    """AUPRC Parity (Average Precision).

    Compute average precision (area under the precision-recall curve) per
    group and return max pairwise disparity. AUPRC is more informative than
    AUROC for highly imbalanced positive classes (e.g., sepsis alerts, rare
    disease screening) because it does not reward true-negative heavy
    baselines.

    Skips groups where y_true has only one class (AUPRC undefined).

    Returns:
        Dictionary with ``disparity`` (max pairwise AUPRC gap) and
        ``group_auprcs`` (per-group average precision).
    """
    y_true, y_score, groups = _validate_score_inputs(y_true, y_score, groups)
    unique_groups = np.unique(groups)

    group_auprcs: dict[str, float] = {}
    for g in unique_groups:
        mask = groups == g
        yt = y_true[mask]
        ys = y_score[mask]
        if len(np.unique(yt)) < 2:
            continue
        group_auprcs[str(g)] = float(average_precision_score(yt, ys))

    disparity = _max_disparity_from_values(list(group_auprcs.values()))

    return {"disparity": disparity, "group_auprcs": group_auprcs}
