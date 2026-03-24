"""Automatic subgroup discovery — find the worst-performing demographic slices.

Enumerates single-attribute groups and pairwise intersections, computes
key metrics, and surfaces the subgroups with the largest disparities
relative to the overall population.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from itertools import combinations

import numpy as np
import pandas as pd


@dataclass(frozen=True)
class SubgroupFinding:
    """A discovered subgroup with notably different model performance."""

    subgroup_definition: dict[str, str]
    subgroup_label: str
    sample_size: int
    sample_pct: float
    overall_accuracy: float
    true_positive_rate: float
    false_positive_rate: float
    positive_prediction_rate: float
    worst_metric: str
    worst_metric_value: float
    population_baseline: float
    deviation: float
    severity: str  # critical, high, medium, low


def _compute_group_stats(
    y_true: np.ndarray, y_pred: np.ndarray
) -> dict[str, float]:
    """Compute basic classification stats for a subgroup."""
    n = len(y_true)
    if n == 0:
        return {
            "accuracy": 0.0, "tpr": 0.0, "fpr": 0.0,
            "positive_rate": 0.0, "prevalence": 0.0,
        }

    tp = np.sum((y_pred == 1) & (y_true == 1))
    fp = np.sum((y_pred == 1) & (y_true == 0))
    fn = np.sum((y_pred == 0) & (y_true == 1))
    tn = np.sum((y_pred == 0) & (y_true == 0))

    accuracy = float((tp + tn) / n) if n > 0 else 0.0
    tpr = float(tp / (tp + fn)) if (tp + fn) > 0 else 0.0
    fpr = float(fp / (fp + tn)) if (fp + tn) > 0 else 0.0
    positive_rate = float(np.mean(y_pred == 1))
    prevalence = float(np.mean(y_true == 1))

    return {
        "accuracy": accuracy,
        "tpr": tpr,
        "fpr": fpr,
        "positive_rate": positive_rate,
        "prevalence": prevalence,
    }


def discover_worst_subgroups(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    demographics: pd.DataFrame,
    protected_attributes: list[str],
    min_group_size: int = 30,
    max_intersection_depth: int = 2,
    top_k: int = 10,
) -> list[SubgroupFinding]:
    """Discover the worst-performing demographic subgroups.

    Enumerates all single-attribute groups and pairwise intersections,
    computes classification metrics for each, and returns the top-k
    subgroups with the largest deviation from the population baseline.

    Args:
        y_true: Ground truth labels.
        y_pred: Model predictions.
        demographics: Demographic DataFrame.
        protected_attributes: Attributes to consider.
        min_group_size: Minimum samples to consider a subgroup.
        max_intersection_depth: Max attributes to combine (1=singles only, 2=pairs too).
        top_k: Number of worst subgroups to return.

    Returns:
        List of SubgroupFinding sorted by severity (worst first).
    """
    y_true = np.asarray(y_true, dtype=int)
    y_pred = np.asarray(y_pred, dtype=int)
    n_total = len(y_true)

    # Population baseline
    baseline = _compute_group_stats(y_true, y_pred)

    findings: list[SubgroupFinding] = []

    # Generate candidate subgroups
    for depth in range(1, max_intersection_depth + 1):
        for combo in combinations(protected_attributes, depth):
            combo_list = list(combo)

            # Create combined group column
            if len(combo_list) == 1:
                group_col = demographics[combo_list[0]].astype(str)
            else:
                group_col = demographics[combo_list[0]].astype(str)
                for attr in combo_list[1:]:
                    group_col = group_col + "_" + demographics[attr].astype(str)

            for group_val in group_col.unique():
                mask = (group_col == group_val).values
                n_group = int(np.sum(mask))

                if n_group < min_group_size:
                    continue

                stats = _compute_group_stats(y_true[mask], y_pred[mask])

                # Find the metric with the largest deviation from baseline
                deviations = {
                    "accuracy": baseline["accuracy"] - stats["accuracy"],
                    "true_positive_rate": baseline["tpr"] - stats["tpr"],
                    "false_positive_rate": stats["fpr"] - baseline["fpr"],
                    "positive_prediction_rate": abs(
                        stats["positive_rate"] - baseline["positive_rate"]
                    ),
                }

                worst_metric = max(deviations, key=lambda k: abs(deviations[k]))
                deviation = deviations[worst_metric]

                # Determine severity
                abs_dev = abs(deviation)
                if abs_dev >= 0.30:
                    severity = "critical"
                elif abs_dev >= 0.15:
                    severity = "high"
                elif abs_dev >= 0.05:
                    severity = "medium"
                else:
                    severity = "low"

                # Build subgroup definition
                if len(combo_list) == 1:
                    subgroup_def = {combo_list[0]: group_val}
                else:
                    parts = group_val.split("_", len(combo_list) - 1)
                    subgroup_def = dict(zip(combo_list, parts))

                findings.append(SubgroupFinding(
                    subgroup_definition=subgroup_def,
                    subgroup_label=group_val,
                    sample_size=n_group,
                    sample_pct=round(n_group / n_total * 100, 1),
                    overall_accuracy=round(stats["accuracy"], 4),
                    true_positive_rate=round(stats["tpr"], 4),
                    false_positive_rate=round(stats["fpr"], 4),
                    positive_prediction_rate=round(stats["positive_rate"], 4),
                    worst_metric=worst_metric,
                    worst_metric_value=round(stats.get(
                        worst_metric.replace("true_positive_rate", "tpr")
                        .replace("false_positive_rate", "fpr")
                        .replace("positive_prediction_rate", "positive_rate"),
                        0.0
                    ), 4),
                    population_baseline=round(baseline.get(
                        worst_metric.replace("true_positive_rate", "tpr")
                        .replace("false_positive_rate", "fpr")
                        .replace("positive_prediction_rate", "positive_rate"),
                        0.0
                    ), 4),
                    deviation=round(deviation, 4),
                    severity=severity,
                ))

    # Sort by absolute deviation descending, take top_k
    findings.sort(key=lambda f: abs(f.deviation), reverse=True)
    return findings[:top_k]


def subgroup_findings_to_dicts(findings: list[SubgroupFinding]) -> list[dict]:
    """Convert SubgroupFinding objects to JSON-serializable dicts."""
    return [
        {
            "subgroup_definition": f.subgroup_definition,
            "subgroup_label": f.subgroup_label,
            "sample_size": f.sample_size,
            "sample_pct": f.sample_pct,
            "overall_accuracy": f.overall_accuracy,
            "true_positive_rate": f.true_positive_rate,
            "false_positive_rate": f.false_positive_rate,
            "positive_prediction_rate": f.positive_prediction_rate,
            "worst_metric": f.worst_metric,
            "worst_metric_value": f.worst_metric_value,
            "population_baseline": f.population_baseline,
            "deviation": f.deviation,
            "severity": f.severity,
        }
        for f in findings
    ]
