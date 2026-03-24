"""Intersectional fairness analysis.

Generates combined demographic groups (e.g., Black+Female) and runs
fairness metrics on the intersections. This reveals disparities that
single-attribute analysis can miss.
"""

from __future__ import annotations

from itertools import combinations

import numpy as np
import pandas as pd


def generate_intersectional_groups(
    demographics: pd.DataFrame,
    attributes: list[str],
    max_depth: int = 2,
    min_group_size: int = 30,
) -> list[tuple[list[str], pd.Series]]:
    """Generate intersectional group labels from demographic attributes.

    Args:
        demographics: DataFrame with demographic columns.
        attributes: List of protected attribute column names.
        max_depth: Maximum number of attributes to combine (2 = pairwise, 3 = three-way).
        min_group_size: Minimum samples per intersectional group to include.

    Returns:
        List of (attribute_names, group_series) tuples. Each group_series contains
        combined labels like "Black_Female" with groups below min_group_size removed.
    """
    results: list[tuple[list[str], pd.Series]] = []

    for depth in range(2, min(max_depth + 1, len(attributes) + 1)):
        for combo in combinations(attributes, depth):
            combo_list = list(combo)
            # Create combined group labels
            combined = demographics[combo_list[0]].astype(str)
            for attr in combo_list[1:]:
                combined = combined + "_" + demographics[attr].astype(str)

            # Filter out small groups
            counts = combined.value_counts()
            valid_groups = counts[counts >= min_group_size].index
            if len(valid_groups) < 2:
                continue

            # Replace small groups with NaN (they'll be excluded from analysis)
            filtered = combined.copy()
            filtered[~filtered.isin(valid_groups)] = np.nan

            results.append((combo_list, filtered))

    return results


def run_intersectional_metrics(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    demographics: pd.DataFrame,
    attributes: list[str],
    metric_fns: list[tuple[str, str, callable]],
    thresholds: dict[str, float],
    y_score: np.ndarray | None = None,
    max_depth: int = 2,
    min_group_size: int = 30,
) -> list[dict]:
    """Run fairness metrics on intersectional groups.

    Args:
        y_true: Ground truth labels.
        y_pred: Model predictions.
        demographics: Demographic data.
        attributes: Protected attributes.
        metric_fns: List of (name, display_name, compute_fn) tuples.
        thresholds: Fairness thresholds dict with "fair" and "marginal" keys.
        y_score: Optional probability scores.
        max_depth: Max intersection depth.
        min_group_size: Min group size.

    Returns:
        List of MetricResult-compatible dicts for intersectional groups.
    """
    from parityscope.audit.result import FairnessLevel, GroupResult, MetricResult
    from parityscope.metrics.registry import InputType, get_metric

    intersections = generate_intersectional_groups(
        demographics, attributes, max_depth, min_group_size
    )

    results: list[MetricResult] = []

    for combo_attrs, group_series in intersections:
        # Filter to valid (non-NaN) rows
        valid_mask = group_series.notna()
        if valid_mask.sum() < min_group_size * 2:
            continue

        valid_groups = np.asarray(group_series[valid_mask])
        valid_y_true = y_true[valid_mask]
        valid_y_pred = y_pred[valid_mask]
        valid_y_score = y_score[valid_mask] if y_score is not None else None

        intersection_label = "+".join(combo_attrs)

        for metric_name, display_name, compute_fn in metric_fns:
            metric_info = get_metric(metric_name)

            # Skip score-based metrics if no scores
            if metric_info.input_type == InputType.SCORE and valid_y_score is None:
                continue

            if metric_info.input_type == InputType.SCORE:
                raw_result = compute_fn(valid_y_true, valid_y_score, valid_groups)
            else:
                raw_result = compute_fn(valid_y_true, valid_y_pred, valid_groups)

            disparity = float(raw_result["disparity"])

            if disparity <= thresholds["fair"]:
                level = FairnessLevel.FAIR
            elif disparity <= thresholds["marginal"]:
                level = FairnessLevel.MARGINAL
            else:
                level = FairnessLevel.UNFAIR

            # Extract group results
            group_data = None
            for key in ("group_rates", "tpr_rates", "group_ratios",
                        "group_calibration_errors", "group_brier_scores"):
                if key in raw_result:
                    group_data = raw_result[key]
                    break

            group_results = []
            if group_data and isinstance(group_data, dict):
                unique_groups, counts = np.unique(valid_groups, return_counts=True)
                count_map = {str(g): int(c) for g, c in zip(unique_groups, counts)}
                for g, r in group_data.items():
                    group_results.append(GroupResult(
                        group_label=str(g),
                        rate=float(r) if np.isfinite(r) else float(r),
                        sample_size=count_map.get(str(g), 0),
                    ))

            results.append(MetricResult(
                metric_name=f"intersect:{intersection_label}:{metric_name}",
                display_name=f"{display_name} ({intersection_label})",
                disparity=disparity,
                fairness_level=level,
                group_results=tuple(group_results),
                threshold=thresholds["marginal"],
                details={k: v for k, v in raw_result.items() if k != "disparity"},
            ))

    return results
