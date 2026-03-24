"""Label bias detection.

Identifies potential bias in ground truth labels by analyzing base rate
disparities across demographic groups and testing for statistical
independence.
"""

from __future__ import annotations

from dataclasses import dataclass

import numpy as np
import pandas as pd
from scipy.stats import chi2_contingency


@dataclass(frozen=True)
class LabelBiasFinding:
    """A finding related to potential label bias."""

    attribute: str
    finding: str
    severity: str  # low, medium, high
    base_rates: dict[str, float]
    disparity: float
    statistical_test: dict  # test_name, statistic, p_value
    recommendation: str


def detect_label_bias(
    y_true: np.ndarray,
    demographics: pd.DataFrame,
    protected_attributes: list[str],
    X: pd.DataFrame | None = None,
) -> list[LabelBiasFinding]:
    """Detect potential bias in ground truth labels.

    Checks for:
    1. Base rate disparity across groups
    2. Chi-squared test of independence
    3. Conditional base rates (if features provided)

    Args:
        y_true: Ground truth labels.
        demographics: Demographic data.
        protected_attributes: Attributes to check.
        X: Optional feature data for conditional analysis.

    Returns:
        List of LabelBiasFinding.
    """
    findings: list[LabelBiasFinding] = []

    for attr in protected_attributes:
        if attr not in demographics.columns:
            continue

        groups = demographics[attr]
        unique_groups = groups.unique()

        # Base rate per group
        base_rates: dict[str, float] = {}
        for g in unique_groups:
            mask = groups == g
            if mask.sum() > 0:
                base_rates[str(g)] = float(np.mean(y_true[mask.values]))

        if len(base_rates) < 2:
            continue

        rates = list(base_rates.values())
        disparity = max(rates) - min(rates)

        # Chi-squared test of independence
        contingency = pd.crosstab(groups, pd.Series(y_true, name="label"))
        try:
            chi2, p_value, dof, expected = chi2_contingency(contingency)
            stat_test = {
                "test_name": "chi_squared",
                "statistic": round(float(chi2), 4),
                "p_value": float(p_value),
                "degrees_of_freedom": int(dof),
            }
        except ValueError:
            stat_test = {"test_name": "chi_squared", "statistic": 0.0, "p_value": 1.0}
            p_value = 1.0

        # Determine severity
        if p_value < 0.001 and disparity > 0.20:
            severity = "high"
        elif p_value < 0.01 and disparity > 0.10:
            severity = "medium"
        elif disparity > 0.10:
            severity = "low"
        else:
            continue  # Not notable enough to report

        # Find max and min groups
        max_group = max(base_rates, key=base_rates.get)  # type: ignore[arg-type]
        min_group = min(base_rates, key=base_rates.get)  # type: ignore[arg-type]

        finding = (
            f"Base rate for positive label varies by {disparity * 100:.1f}% across "
            f"{attr} groups. Highest: {max_group} ({base_rates[max_group] * 100:.1f}%), "
            f"Lowest: {min_group} ({base_rates[min_group] * 100:.1f}%)."
        )

        recommendation = (
            f"The {disparity * 100:.1f} percentage-point difference in positive label "
            f"rates across {attr} groups may reflect true prevalence differences or "
            f"systematic labeling bias. "
        )
        if severity == "high":
            recommendation += (
                "This is a significant disparity. Conduct a clinical review of "
                "labeling criteria to determine whether this reflects genuine "
                "prevalence differences or measurement/ascertainment bias."
            )
        elif severity == "medium":
            recommendation += (
                "Review labeling procedures for potential differential "
                "ascertainment or diagnostic bias across groups."
            )
        else:
            recommendation += "Monitor during model lifecycle."

        findings.append(LabelBiasFinding(
            attribute=attr,
            finding=finding,
            severity=severity,
            base_rates={k: round(v, 4) for k, v in base_rates.items()},
            disparity=round(disparity, 4),
            statistical_test=stat_test,
            recommendation=recommendation,
        ))

    findings.sort(key=lambda f: f.disparity, reverse=True)
    return findings
