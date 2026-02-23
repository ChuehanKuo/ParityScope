"""What-if simulation for fairness interventions.

Simulates the impact of common fairness interventions on model predictions
without modifying the underlying model. Helps stakeholders understand
trade-offs between fairness and performance before committing to changes.
"""

from __future__ import annotations

import numpy as np
import pandas as pd

from parityscope.metrics.classification import (
    demographic_parity,
    equal_opportunity,
    equalized_odds,
)


def simulate_threshold_adjustment(
    y_true: np.ndarray,
    y_score: np.ndarray,
    groups: np.ndarray,
    target_metric: str = "demographic_parity",
    n_thresholds: int = 50,
) -> dict[str, object]:
    """Simulate group-specific threshold adjustments to improve fairness.

    Finds per-group decision thresholds that minimize the target metric's
    disparity while tracking the accuracy trade-off.

    Args:
        y_true: Binary ground truth labels.
        y_score: Continuous prediction scores in [0, 1].
        groups: Group membership labels.
        target_metric: Metric to optimize ("demographic_parity", "equal_opportunity",
            "equalized_odds").
        n_thresholds: Number of threshold candidates to evaluate per group.

    Returns:
        Dictionary with optimal thresholds, resulting disparity, and accuracy impact.
    """
    y_true = np.asarray(y_true, dtype=int)
    y_score = np.asarray(y_score, dtype=float)
    groups = np.asarray(groups)

    metric_fn = {
        "demographic_parity": demographic_parity,
        "equal_opportunity": equal_opportunity,
        "equalized_odds": equalized_odds,
    }.get(target_metric)

    if metric_fn is None:
        raise ValueError(
            f"Unsupported target metric '{target_metric}'. "
            "Use 'demographic_parity', 'equal_opportunity', or 'equalized_odds'."
        )

    unique_groups = np.unique(groups)
    thresholds = np.linspace(0.01, 0.99, n_thresholds)

    # Baseline with uniform 0.5 threshold
    baseline_pred = (y_score >= 0.5).astype(int)
    baseline_result = metric_fn(y_true, baseline_pred, groups)
    baseline_disparity = baseline_result["disparity"]
    baseline_accuracy = float(np.mean(y_true == baseline_pred))

    # Search for optimal per-group thresholds
    best_disparity = baseline_disparity
    best_thresholds = {str(g): 0.5 for g in unique_groups}
    best_accuracy = baseline_accuracy

    # Grid search: try different thresholds for each group
    # For efficiency, optimize one group at a time
    current_thresholds = {str(g): 0.5 for g in unique_groups}

    for g in unique_groups:
        g_key = str(g)
        best_t = 0.5
        best_d = float("inf")

        for t in thresholds:
            test_thresholds = dict(current_thresholds)
            test_thresholds[g_key] = float(t)

            # Apply per-group thresholds
            y_pred_sim = np.zeros_like(y_true)
            for grp, thresh in test_thresholds.items():
                mask = groups.astype(str) == grp
                y_pred_sim[mask] = (y_score[mask] >= thresh).astype(int)

            result = metric_fn(y_true, y_pred_sim, groups)
            d = result["disparity"]

            if d < best_d:
                best_d = d
                best_t = float(t)

        current_thresholds[g_key] = best_t

    # Compute final results with optimized thresholds
    y_pred_optimized = np.zeros_like(y_true)
    for grp, thresh in current_thresholds.items():
        mask = groups.astype(str) == grp
        y_pred_optimized[mask] = (y_score[mask] >= thresh).astype(int)

    final_result = metric_fn(y_true, y_pred_optimized, groups)
    optimized_accuracy = float(np.mean(y_true == y_pred_optimized))

    return {
        "intervention": "threshold_adjustment",
        "target_metric": target_metric,
        "baseline": {
            "threshold": 0.5,
            "disparity": baseline_disparity,
            "accuracy": baseline_accuracy,
        },
        "optimized": {
            "group_thresholds": current_thresholds,
            "disparity": final_result["disparity"],
            "accuracy": optimized_accuracy,
        },
        "improvement": {
            "disparity_reduction": baseline_disparity - final_result["disparity"],
            "accuracy_change": optimized_accuracy - baseline_accuracy,
        },
    }


def simulate_resampling(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    groups: np.ndarray,
    target_metric: str = "demographic_parity",
    n_iterations: int = 100,
    random_seed: int = 42,
) -> dict[str, object]:
    """Simulate the effect of balanced resampling on fairness metrics.

    Estimates what fairness metrics would look like if the dataset were
    resampled to have equal group sizes (simulating what retraining on
    balanced data might achieve).

    Args:
        y_true: Binary ground truth labels.
        y_pred: Binary predictions.
        groups: Group membership labels.
        target_metric: Metric to evaluate.
        n_iterations: Number of bootstrap iterations.
        random_seed: Random seed for reproducibility.

    Returns:
        Dictionary with baseline and estimated post-resampling disparity.
    """
    y_true = np.asarray(y_true, dtype=int)
    y_pred = np.asarray(y_pred, dtype=int)
    groups = np.asarray(groups)

    metric_fn = {
        "demographic_parity": demographic_parity,
        "equal_opportunity": equal_opportunity,
        "equalized_odds": equalized_odds,
    }.get(target_metric)

    if metric_fn is None:
        raise ValueError(f"Unsupported target metric '{target_metric}'")

    # Baseline
    baseline_result = metric_fn(y_true, y_pred, groups)

    # Balanced resampling simulation
    rng = np.random.default_rng(random_seed)
    unique_groups = np.unique(groups)
    min_size = min(np.sum(groups == g) for g in unique_groups)

    disparities = []
    for _ in range(n_iterations):
        indices = []
        for g in unique_groups:
            g_indices = np.where(groups == g)[0]
            sampled = rng.choice(g_indices, size=min_size, replace=True)
            indices.extend(sampled)

        indices = np.array(indices)
        result = metric_fn(y_true[indices], y_pred[indices], groups[indices])
        disparities.append(result["disparity"])

    return {
        "intervention": "balanced_resampling",
        "target_metric": target_metric,
        "baseline_disparity": baseline_result["disparity"],
        "estimated_disparity": {
            "mean": float(np.mean(disparities)),
            "std": float(np.std(disparities)),
            "p5": float(np.percentile(disparities, 5)),
            "p95": float(np.percentile(disparities, 95)),
        },
        "n_iterations": n_iterations,
        "balanced_group_size": int(min_size),
    }


def compare_interventions(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    y_score: np.ndarray | None,
    groups: np.ndarray,
    target_metric: str = "demographic_parity",
) -> list[dict[str, object]]:
    """Compare multiple fairness interventions side by side.

    Returns a list of intervention results for comparison.
    """
    results = []

    # Resampling simulation (always available)
    resample_result = simulate_resampling(y_true, y_pred, groups, target_metric)
    results.append(resample_result)

    # Threshold adjustment (requires probability scores)
    if y_score is not None:
        threshold_result = simulate_threshold_adjustment(
            y_true, y_score, groups, target_metric
        )
        results.append(threshold_result)

    return results
