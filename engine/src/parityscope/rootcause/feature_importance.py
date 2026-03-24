"""Feature importance and bias attribution analysis.

Identifies which features drive model predictions and contribute
to demographic disparities — like the NHANES finding where age
accounted for 56.7% of model coefficients.
"""

from __future__ import annotations

from dataclasses import dataclass

import numpy as np
import pandas as pd


@dataclass(frozen=True)
class FeatureImportance:
    """Importance analysis for a single feature."""

    feature: str
    importance_score: float
    importance_pct: float
    bias_contribution: float
    direction: str  # increases_disparity, decreases_disparity, neutral
    per_group_importance: dict[str, float] | None


def analyze_feature_importance(
    X: pd.DataFrame,
    y_true: np.ndarray,
    y_pred: np.ndarray,
    demographics: pd.DataFrame,
    protected_attributes: list[str],
    model: object | None = None,
) -> list[FeatureImportance]:
    """Analyze which features drive predictions and bias.

    Strategy:
    1. If model has coef_ (linear): use absolute coefficients
    2. If model has feature_importances_ (trees): use directly
    3. If model available: use permutation importance
    4. If no model: use correlation with prediction errors

    Args:
        X: Feature DataFrame.
        y_true: Ground truth labels.
        y_pred: Model predictions.
        demographics: Demographic data.
        protected_attributes: Attributes to analyze against.
        model: Optional model object.

    Returns:
        List of FeatureImportance sorted by importance descending.
    """
    features = list(X.columns)
    importances: dict[str, float] = {}

    # Try model-based importance first
    if model is not None:
        if hasattr(model, "coef_"):
            coefs = np.asarray(model.coef_).flatten()
            if len(coefs) == len(features):
                abs_coefs = np.abs(coefs)
                for i, feat in enumerate(features):
                    importances[feat] = float(abs_coefs[i])

        elif hasattr(model, "feature_importances_"):
            fi = np.asarray(model.feature_importances_).flatten()
            if len(fi) == len(features):
                for i, feat in enumerate(features):
                    importances[feat] = float(fi[i])

        elif hasattr(model, "predict"):
            try:
                from sklearn.inspection import permutation_importance
                result = permutation_importance(
                    model, X, y_true, n_repeats=10, random_state=42, n_jobs=-1,
                )
                for i, feat in enumerate(features):
                    importances[feat] = float(result.importances_mean[i])
            except Exception:
                pass

    # Fallback: correlation-based importance
    if not importances:
        errors = np.abs(y_pred - y_true).astype(float)
        for feat in features:
            if not pd.api.types.is_numeric_dtype(X[feat]):
                continue
            valid = X[feat].notna()
            if valid.sum() < 10:
                continue
            try:
                corr = abs(float(np.corrcoef(
                    X[feat][valid].values.astype(float),
                    errors[valid.values],
                )[0, 1]))
                importances[feat] = corr if np.isfinite(corr) else 0.0
            except (ValueError, TypeError):
                importances[feat] = 0.0

    if not importances:
        return []

    # Normalize to percentages
    total = sum(importances.values())
    if total <= 0:
        return []

    # Compute bias contribution for each feature
    results: list[FeatureImportance] = []

    for feat in features:
        imp = importances.get(feat, 0.0)
        imp_pct = (imp / total) * 100

        # Bias contribution: how much does this feature correlate with
        # differential prediction errors across groups
        bias_contrib = 0.0
        direction = "neutral"

        if pd.api.types.is_numeric_dtype(X[feat]):
            for attr in protected_attributes:
                if attr not in demographics.columns:
                    continue
                groups = demographics[attr]
                errors = (y_pred - y_true).astype(float)

                # Per-group error correlation with feature
                group_corrs: list[float] = []
                for g in groups.unique():
                    mask = (groups == g).values
                    if mask.sum() < 10:
                        continue
                    valid = X[feat].notna().values & mask
                    if valid.sum() < 10:
                        continue
                    try:
                        c = float(np.corrcoef(
                            X[feat].values[valid].astype(float),
                            errors[valid],
                        )[0, 1])
                        if np.isfinite(c):
                            group_corrs.append(c)
                    except (ValueError, TypeError):
                        continue

                if len(group_corrs) >= 2:
                    # Variance of correlations across groups indicates bias contribution
                    corr_var = float(np.std(group_corrs))
                    bias_contrib = max(bias_contrib, corr_var)

        if bias_contrib > 0.1:
            direction = "increases_disparity"
        elif bias_contrib < -0.1:
            direction = "decreases_disparity"

        results.append(FeatureImportance(
            feature=feat,
            importance_score=round(imp, 4),
            importance_pct=round(imp_pct, 1),
            bias_contribution=round(bias_contrib, 4),
            direction=direction,
            per_group_importance=None,
        ))

    results.sort(key=lambda r: r.importance_score, reverse=True)
    return results
