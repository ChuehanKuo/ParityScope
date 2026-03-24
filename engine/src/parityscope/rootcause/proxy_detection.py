"""Proxy variable detection.

Identifies features that correlate with protected attributes and
may be driving bias through indirect pathways.
"""

from __future__ import annotations

from dataclasses import dataclass

import numpy as np
import pandas as pd


@dataclass(frozen=True)
class ProxyVariable:
    """A feature identified as a proxy for a protected attribute."""

    feature: str
    protected_attribute: str
    correlation: float
    correlation_type: str  # pearson, cramers_v, point_biserial
    severity: str  # low, medium, high
    recommendation: str


def cramers_v(x: pd.Series, y: pd.Series) -> float:
    """Compute Cramer's V statistic for two categorical variables."""
    contingency = pd.crosstab(x, y)
    n = contingency.sum().sum()
    if n == 0:
        return 0.0

    chi2 = 0.0
    row_sums = contingency.sum(axis=1)
    col_sums = contingency.sum(axis=0)

    for i in range(contingency.shape[0]):
        for j in range(contingency.shape[1]):
            expected = row_sums.iloc[i] * col_sums.iloc[j] / n
            if expected > 0:
                chi2 += (contingency.iloc[i, j] - expected) ** 2 / expected

    k = min(contingency.shape[0], contingency.shape[1])
    if k <= 1 or n <= 1:
        return 0.0

    return float(np.sqrt(chi2 / (n * (k - 1))))


def detect_proxies(
    X: pd.DataFrame,
    demographics: pd.DataFrame,
    protected_attributes: list[str],
    threshold: float = 0.3,
) -> list[ProxyVariable]:
    """Detect features that act as proxies for protected attributes.

    Computes correlations between each feature in X and each protected
    attribute, flagging features above the threshold.

    Args:
        X: Feature DataFrame.
        demographics: Demographic DataFrame.
        protected_attributes: Attributes to check against.
        threshold: Minimum correlation to flag (default 0.3).

    Returns:
        List of ProxyVariable findings, sorted by correlation descending.
    """
    proxies: list[ProxyVariable] = []

    for attr in protected_attributes:
        if attr not in demographics.columns:
            continue
        demo_col = demographics[attr]
        demo_is_numeric = pd.api.types.is_numeric_dtype(demo_col)

        for feature in X.columns:
            feat_col = X[feature]
            feat_is_numeric = pd.api.types.is_numeric_dtype(feat_col)

            try:
                if feat_is_numeric and demo_is_numeric:
                    # Pearson correlation
                    valid = feat_col.notna() & demo_col.notna()
                    if valid.sum() < 10:
                        continue
                    corr = float(np.corrcoef(
                        feat_col[valid].values.astype(float),
                        demo_col[valid].values.astype(float),
                    )[0, 1])
                    corr_type = "pearson"

                elif feat_is_numeric and not demo_is_numeric:
                    # Point-biserial / eta-squared approximation via ANOVA F
                    valid = feat_col.notna() & demo_col.notna()
                    if valid.sum() < 10:
                        continue
                    groups_vals = demo_col[valid]
                    feat_vals = feat_col[valid].values.astype(float)
                    grand_mean = np.mean(feat_vals)
                    ss_between = 0.0
                    ss_total = np.sum((feat_vals - grand_mean) ** 2)
                    for g in groups_vals.unique():
                        mask = groups_vals == g
                        g_mean = np.mean(feat_vals[mask.values])
                        ss_between += mask.sum() * (g_mean - grand_mean) ** 2
                    eta_sq = ss_between / ss_total if ss_total > 0 else 0.0
                    corr = float(np.sqrt(eta_sq))
                    corr_type = "point_biserial"

                elif not feat_is_numeric and not demo_is_numeric:
                    # Cramer's V
                    valid = feat_col.notna() & demo_col.notna()
                    if valid.sum() < 10:
                        continue
                    corr = cramers_v(feat_col[valid], demo_col[valid])
                    corr_type = "cramers_v"

                else:
                    # Categorical feature, numeric demo
                    valid = feat_col.notna() & demo_col.notna()
                    if valid.sum() < 10:
                        continue
                    corr = cramers_v(
                        feat_col[valid].astype(str),
                        pd.cut(demo_col[valid], bins=5).astype(str),
                    )
                    corr_type = "cramers_v"

            except (ValueError, TypeError):
                continue

            abs_corr = abs(corr)
            if abs_corr < threshold:
                continue

            # Determine severity
            if abs_corr >= 0.7:
                severity = "high"
            elif abs_corr >= 0.5:
                severity = "medium"
            else:
                severity = "low"

            # Generate recommendation
            recommendation = _generate_recommendation(
                feature, attr, abs_corr, severity
            )

            proxies.append(ProxyVariable(
                feature=feature,
                protected_attribute=attr,
                correlation=round(corr, 4),
                correlation_type=corr_type,
                severity=severity,
                recommendation=recommendation,
            ))

    proxies.sort(key=lambda p: abs(p.correlation), reverse=True)
    return proxies


def _generate_recommendation(
    feature: str, attribute: str, corr: float, severity: str
) -> str:
    """Generate actionable recommendation for a proxy finding."""
    if severity == "high":
        return (
            f"Feature '{feature}' has high correlation ({corr:.2f}) with '{attribute}'. "
            f"Consider removing this feature or applying decorrelation techniques "
            f"before training. If this is a clinically necessary feature, document "
            f"the justification and monitor its impact on fairness metrics."
        )
    elif severity == "medium":
        return (
            f"Feature '{feature}' has moderate correlation ({corr:.2f}) with '{attribute}'. "
            f"Investigate whether this feature contributes to observed disparities. "
            f"Consider fairness-aware feature selection."
        )
    else:
        return (
            f"Feature '{feature}' has mild correlation ({corr:.2f}) with '{attribute}'. "
            f"Monitor during model updates."
        )
