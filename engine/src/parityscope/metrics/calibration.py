"""Calibration-based fairness metrics.

These metrics evaluate whether predicted probabilities (scores) are equally
well-calibrated across demographic groups. They require continuous prediction
scores rather than binary predictions.
"""

from __future__ import annotations

import numpy as np
from numpy.typing import ArrayLike


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


def calibration_difference(
    y_true: ArrayLike,
    y_score: ArrayLike,
    groups: ArrayLike,
    n_bins: int = 10,
) -> dict[str, object]:
    """Calibration Difference.

    Measures how well-calibrated predicted probabilities are within each group
    by computing the mean absolute difference between predicted probability and
    observed frequency across bins. Returns the max difference in calibration
    error between any two groups.

    Args:
        y_true: Binary ground truth labels (0 or 1).
        y_score: Predicted probability scores in [0, 1].
        groups: Group membership labels.
        n_bins: Number of calibration bins.

    Returns:
        Dictionary with disparity score and per-group calibration errors.
    """
    y_true, y_score, groups = _validate_score_inputs(y_true, y_score, groups)
    unique_groups = np.unique(groups)
    bin_edges = np.linspace(0, 1, n_bins + 1)

    group_errors: dict[str, float] = {}
    for g in unique_groups:
        mask = groups == g
        yt, ys = y_true[mask], y_score[mask]
        bin_errors = []
        for i in range(n_bins):
            in_bin = (ys >= bin_edges[i]) & (ys < bin_edges[i + 1])
            if i == n_bins - 1:
                in_bin = (ys >= bin_edges[i]) & (ys <= bin_edges[i + 1])
            if np.sum(in_bin) > 0:
                predicted_avg = np.mean(ys[in_bin])
                observed_avg = np.mean(yt[in_bin])
                bin_errors.append(abs(predicted_avg - observed_avg))
        group_errors[str(g)] = float(np.mean(bin_errors)) if bin_errors else 0.0

    values = list(group_errors.values())
    disparity = float(max(values) - min(values)) if len(values) >= 2 else 0.0

    return {"disparity": disparity, "group_calibration_errors": group_errors}


def well_calibration(
    y_true: ArrayLike,
    y_score: ArrayLike,
    groups: ArrayLike,
    n_bins: int = 10,
) -> dict[str, object]:
    """Well Calibration (Brier Score Parity).

    Computes the Brier score for each group and measures the maximum
    disparity. The Brier score measures the mean squared error between
    predicted probabilities and actual outcomes.

    Returns:
        Dictionary with disparity and per-group Brier scores.
    """
    y_true, y_score, groups = _validate_score_inputs(y_true, y_score, groups)
    unique_groups = np.unique(groups)

    group_brier: dict[str, float] = {}
    for g in unique_groups:
        mask = groups == g
        group_brier[str(g)] = float(np.mean((y_score[mask] - y_true[mask]) ** 2))

    values = list(group_brier.values())
    disparity = float(max(values) - min(values)) if len(values) >= 2 else 0.0

    return {"disparity": disparity, "group_brier_scores": group_brier}


def score_distribution_difference(
    y_true: ArrayLike,
    y_score: ArrayLike,
    groups: ArrayLike,
) -> dict[str, object]:
    """Score Distribution Difference (Kolmogorov-Smirnov).

    Measures the maximum difference in cumulative distribution functions of
    predicted scores between groups. Uses the two-sample KS statistic.

    Returns:
        Dictionary with pairwise KS statistics and the maximum disparity.
    """
    y_true, y_score, groups = _validate_score_inputs(y_true, y_score, groups)
    unique_groups = np.unique(groups)

    pairwise: dict[str, float] = {}
    max_ks = 0.0

    for i, g1 in enumerate(unique_groups):
        for g2 in unique_groups[i + 1 :]:
            scores_1 = np.sort(y_score[groups == g1])
            scores_2 = np.sort(y_score[groups == g2])

            # Two-sample KS statistic
            all_scores = np.concatenate([scores_1, scores_2])
            all_scores = np.sort(np.unique(all_scores))

            cdf1 = np.searchsorted(scores_1, all_scores, side="right") / len(scores_1)
            cdf2 = np.searchsorted(scores_2, all_scores, side="right") / len(scores_2)
            ks_stat = float(np.max(np.abs(cdf1 - cdf2)))

            pair_key = f"{g1}_vs_{g2}"
            pairwise[pair_key] = ks_stat
            max_ks = max(max_ks, ks_stat)

    return {"disparity": max_ks, "pairwise_ks": pairwise}
