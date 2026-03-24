"""Bootstrap confidence intervals for fairness metrics.

Uses stratified resampling to preserve group proportions and BCa
(bias-corrected and accelerated) bootstrap for CI estimation.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Callable

import numpy as np
from scipy.stats import norm


@dataclass(frozen=True)
class BootstrapResult:
    """Result of bootstrap confidence interval estimation."""

    point_estimate: float
    ci_lower: float
    ci_upper: float
    standard_error: float
    n_bootstrap: int
    ci_level: float


def bootstrap_metric(
    metric_fn: Callable,
    y_true: np.ndarray,
    y_pred_or_score: np.ndarray,
    groups: np.ndarray,
    n_bootstrap: int = 1000,
    ci_level: float = 0.95,
    seed: int = 42,
) -> BootstrapResult:
    """Compute bootstrap confidence interval for a fairness metric.

    Uses stratified resampling (preserving group proportions) and BCa
    bootstrap for confidence interval estimation.

    Args:
        metric_fn: Fairness metric function with signature (y_true, y_pred, groups) -> dict.
        y_true: Ground truth labels.
        y_pred_or_score: Predictions or scores.
        groups: Group membership labels.
        n_bootstrap: Number of bootstrap iterations.
        ci_level: Confidence interval level (e.g., 0.95 for 95% CI).
        seed: Random seed for reproducibility.

    Returns:
        BootstrapResult with point estimate, CI bounds, and standard error.
    """
    rng = np.random.default_rng(seed)
    n = len(y_true)

    # Point estimate
    point_result = metric_fn(y_true, y_pred_or_score, groups)
    point_estimate = float(point_result["disparity"])

    # Stratified bootstrap: resample within each group
    unique_groups = np.unique(groups)
    group_indices = {str(g): np.where(groups == g)[0] for g in unique_groups}

    boot_disparities = np.zeros(n_bootstrap)

    for b in range(n_bootstrap):
        # Stratified resample
        indices = []
        for g_indices in group_indices.values():
            sampled = rng.choice(g_indices, size=len(g_indices), replace=True)
            indices.extend(sampled)
        indices = np.array(indices)

        boot_result = metric_fn(y_true[indices], y_pred_or_score[indices], groups[indices])
        boot_disparities[b] = float(boot_result["disparity"])

    se = float(np.std(boot_disparities, ddof=1))

    # BCa confidence interval
    try:
        ci_lower, ci_upper = _bca_ci(
            boot_disparities, point_estimate, y_true, y_pred_or_score,
            groups, metric_fn, group_indices, ci_level,
        )
    except (ValueError, ZeroDivisionError):
        # Fallback to percentile method
        alpha = 1 - ci_level
        ci_lower = float(np.percentile(boot_disparities, alpha / 2 * 100))
        ci_upper = float(np.percentile(boot_disparities, (1 - alpha / 2) * 100))

    return BootstrapResult(
        point_estimate=point_estimate,
        ci_lower=ci_lower,
        ci_upper=ci_upper,
        standard_error=se,
        n_bootstrap=n_bootstrap,
        ci_level=ci_level,
    )


def _bca_ci(
    boot_disparities: np.ndarray,
    point_estimate: float,
    y_true: np.ndarray,
    y_pred_or_score: np.ndarray,
    groups: np.ndarray,
    metric_fn: Callable,
    group_indices: dict[str, np.ndarray],
    ci_level: float,
) -> tuple[float, float]:
    """Compute BCa (bias-corrected and accelerated) confidence interval."""
    n = len(y_true)
    alpha = 1 - ci_level

    # Bias correction factor
    z0 = norm.ppf(np.mean(boot_disparities < point_estimate))

    # Acceleration factor from jackknife
    jack_estimates = np.zeros(n)
    for i in range(n):
        mask = np.ones(n, dtype=bool)
        mask[i] = False
        jack_result = metric_fn(y_true[mask], y_pred_or_score[mask], groups[mask])
        jack_estimates[i] = float(jack_result["disparity"])

    jack_mean = np.mean(jack_estimates)
    diffs = jack_mean - jack_estimates
    acc = np.sum(diffs ** 3) / (6.0 * (np.sum(diffs ** 2) ** 1.5))

    # Adjusted percentiles
    z_alpha_lower = norm.ppf(alpha / 2)
    z_alpha_upper = norm.ppf(1 - alpha / 2)

    def _adjusted_percentile(z_alpha: float) -> float:
        num = z0 + z_alpha
        denom = 1 - acc * num
        if abs(denom) < 1e-10:
            return norm.cdf(z_alpha)
        return norm.cdf(z0 + num / denom)

    p_lower = _adjusted_percentile(z_alpha_lower) * 100
    p_upper = _adjusted_percentile(z_alpha_upper) * 100

    # Clamp percentiles
    p_lower = max(0.0, min(100.0, p_lower))
    p_upper = max(0.0, min(100.0, p_upper))

    ci_lower = float(np.percentile(boot_disparities, p_lower))
    ci_upper = float(np.percentile(boot_disparities, p_upper))

    return ci_lower, ci_upper
