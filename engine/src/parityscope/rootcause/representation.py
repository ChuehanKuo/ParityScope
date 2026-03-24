"""Data representation analysis.

Evaluates demographic representation in the dataset, comparing
against optional reference populations and flagging underrepresented groups.
"""

from __future__ import annotations

from dataclasses import dataclass, field

import numpy as np
import pandas as pd

# Built-in reference populations
US_CENSUS_RACE = {
    "White": 0.578, "Black": 0.121, "Hispanic": 0.190,
    "Asian": 0.060, "Other": 0.051,
}
US_CENSUS_SEX = {"Male": 0.494, "Female": 0.506}


@dataclass
class RepresentationReport:
    """Analysis of demographic representation."""

    group_proportions: dict[str, dict[str, float]]
    imbalance_ratios: dict[str, float]
    underrepresented_groups: list[dict]
    feature_coverage: dict[str, dict] | None
    reference_comparison: dict | None
    warnings: list[str]
    recommendations: list[str]


def analyze_representation(
    demographics: pd.DataFrame,
    protected_attributes: list[str],
    X: pd.DataFrame | None = None,
    reference_population: dict[str, dict[str, float]] | None = None,
) -> RepresentationReport:
    """Analyze demographic representation in the dataset.

    Args:
        demographics: DataFrame with demographic columns.
        protected_attributes: Attributes to analyze.
        X: Optional feature DataFrame (for coverage analysis).
        reference_population: Optional reference proportions keyed by attribute.
            E.g., {"race": {"White": 0.578, "Black": 0.121, ...}}

    Returns:
        RepresentationReport with proportions, imbalance, and recommendations.
    """
    n_total = len(demographics)
    group_proportions: dict[str, dict[str, float]] = {}
    imbalance_ratios: dict[str, float] = {}
    underrepresented: list[dict] = []
    warnings: list[str] = []
    recommendations: list[str] = []
    reference_comparison: dict | None = None

    for attr in protected_attributes:
        if attr not in demographics.columns:
            continue

        vc = demographics[attr].value_counts()
        proportions = {str(k): round(float(v / n_total), 4) for k, v in vc.items()}
        group_proportions[attr] = proportions

        # Imbalance ratio
        max_count = int(vc.iloc[0]) if len(vc) > 0 else 0
        min_count = int(vc.iloc[-1]) if len(vc) > 0 else 0
        imbalance = max_count / min_count if min_count > 0 else float("inf")
        imbalance_ratios[attr] = round(imbalance, 1)

        # Flag small groups
        for group_name, count in vc.items():
            count = int(count)
            pct = count / n_total * 100
            if count < 30:
                underrepresented.append({
                    "attribute": attr,
                    "group": str(group_name),
                    "count": count,
                    "percentage": round(pct, 1),
                    "reason": "below_minimum_sample_size",
                })
                warnings.append(
                    f"Group '{group_name}' in '{attr}' has only {count} samples "
                    f"({pct:.1f}%). Results should be interpreted with caution."
                )

        if imbalance > 10:
            warnings.append(
                f"Attribute '{attr}' has {imbalance:.1f}:1 imbalance ratio. "
                f"Largest group: {vc.index[0]} ({vc.iloc[0]}), "
                f"Smallest: {vc.index[-1]} ({vc.iloc[-1]})."
            )
            recommendations.append(
                f"Consider augmenting data for underrepresented groups in '{attr}' "
                f"or using weighted sampling during model training."
            )

    # Reference population comparison
    if reference_population:
        reference_comparison = {}
        for attr, ref_props in reference_population.items():
            if attr not in group_proportions:
                continue
            actual = group_proportions[attr]
            comparison: dict[str, dict] = {}
            for group, ref_pct in ref_props.items():
                actual_pct = actual.get(group, 0.0)
                ratio = actual_pct / ref_pct if ref_pct > 0 else 0.0
                comparison[group] = {
                    "reference": round(ref_pct, 4),
                    "actual": round(actual_pct, 4),
                    "representation_ratio": round(ratio, 2),
                }
                if ratio < 0.5:
                    warnings.append(
                        f"Group '{group}' in '{attr}' is underrepresented "
                        f"({actual_pct * 100:.1f}% vs {ref_pct * 100:.1f}% reference)."
                    )
                elif ratio > 2.0:
                    warnings.append(
                        f"Group '{group}' in '{attr}' is overrepresented "
                        f"({actual_pct * 100:.1f}% vs {ref_pct * 100:.1f}% reference)."
                    )
            reference_comparison[attr] = comparison

    # Feature coverage analysis
    feature_coverage = None
    if X is not None:
        feature_coverage = {}
        for attr in protected_attributes:
            if attr not in demographics.columns:
                continue
            groups = demographics[attr]
            coverage: dict[str, dict] = {}
            for feat in X.columns:
                missing_by_group: dict[str, float] = {}
                for g in groups.unique():
                    mask = groups == g
                    missing_pct = float(X.loc[mask, feat].isnull().mean() * 100)
                    missing_by_group[str(g)] = round(missing_pct, 1)

                values = list(missing_by_group.values())
                if max(values) - min(values) > 10:
                    coverage[feat] = missing_by_group
                    warnings.append(
                        f"Feature '{feat}' has differential missing rates across "
                        f"'{attr}' groups (range: {min(values):.1f}% - {max(values):.1f}%)."
                    )

            if coverage:
                feature_coverage[attr] = coverage

    if not recommendations and warnings:
        recommendations.append(
            "Review the warnings above and consider data collection strategies "
            "to improve representation before deploying this model."
        )

    return RepresentationReport(
        group_proportions=group_proportions,
        imbalance_ratios=imbalance_ratios,
        underrepresented_groups=underrepresented,
        feature_coverage=feature_coverage,
        reference_comparison=reference_comparison,
        warnings=warnings,
        recommendations=recommendations,
    )
