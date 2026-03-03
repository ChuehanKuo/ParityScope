"""Feature importance analysis for bias attribution.

Identifies which input features are driving bias in a model's predictions.
Quantifies the contribution of each feature to demographic disparities,
helping identify proxy variables that encode demographic information.
"""

from __future__ import annotations

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder, StandardScaler


def bias_feature_importance(
    X: pd.DataFrame | np.ndarray,
    y_pred: np.ndarray,
    demographics: pd.DataFrame,
    protected_attributes: list[str],
    feature_names: list[str] | None = None,
) -> dict:
    """Analyze which features are driving demographic disparities in predictions.

    Uses two approaches:
    1. **Coefficient analysis**: Fits a logistic regression from features to predictions,
       then measures how much of the model's decision weight comes from demographic-correlated features.
    2. **Proxy detection**: Measures correlation between each feature and each protected attribute
       to identify potential proxy variables.

    Args:
        X: Feature matrix (n_samples, n_features). Can be a DataFrame or ndarray.
        y_pred: Model's binary predictions (0/1).
        demographics: DataFrame with protected attribute columns.
        protected_attributes: List of demographic columns to analyze.
        feature_names: Optional feature names if X is an ndarray.

    Returns:
        Dictionary with:
        - feature_weights: Sorted feature importance for model predictions
        - proxy_scores: Feature-to-attribute correlation scores
        - bias_attribution: Per-attribute breakdown of bias-driving features
        - summary: Key findings
    """
    if isinstance(X, pd.DataFrame):
        feature_names = feature_names or list(X.columns)
        X_arr = X.values.astype(float)
    else:
        X_arr = np.asarray(X, dtype=float)
        if feature_names is None:
            feature_names = [f"feature_{i}" for i in range(X_arr.shape[1])]

    y_pred = np.asarray(y_pred, dtype=int)
    n_features = X_arr.shape[1]

    # Handle NaN values
    nan_mask = ~np.any(np.isnan(X_arr), axis=1)
    X_clean = X_arr[nan_mask]
    y_clean = y_pred[nan_mask]

    # 1. Coefficient analysis — fit logistic regression from features to predictions
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X_clean)

    lr = LogisticRegression(max_iter=1000, random_state=42)
    lr.fit(X_scaled, y_clean)

    coef_abs = np.abs(lr.coef_[0])
    coef_total = coef_abs.sum()
    feature_weights = {}
    for i, name in enumerate(feature_names):
        feature_weights[name] = {
            "coefficient": float(lr.coef_[0][i]),
            "abs_coefficient": float(coef_abs[i]),
            "weight_pct": float(coef_abs[i] / coef_total * 100) if coef_total > 0 else 0.0,
        }

    # Sort by absolute coefficient descending
    feature_weights = dict(
        sorted(feature_weights.items(), key=lambda x: x[1]["abs_coefficient"], reverse=True)
    )

    # 2. Proxy detection — correlation between features and demographics
    proxy_scores = {}
    for attr in protected_attributes:
        if attr not in demographics.columns:
            continue

        attr_values = demographics[attr].values[nan_mask]
        le = LabelEncoder()
        attr_encoded = le.fit_transform(attr_values.astype(str))

        correlations = {}
        for i, name in enumerate(feature_names):
            # Point-biserial correlation for binary attrs, Pearson otherwise
            feature_vals = X_clean[:, i]
            if np.std(feature_vals) > 0 and np.std(attr_encoded) > 0:
                corr = float(np.corrcoef(feature_vals, attr_encoded)[0, 1])
            else:
                corr = 0.0
            correlations[name] = {
                "correlation": corr,
                "abs_correlation": abs(corr),
            }

        # Sort by absolute correlation
        proxy_scores[attr] = dict(
            sorted(correlations.items(), key=lambda x: x[1]["abs_correlation"], reverse=True)
        )

    # 3. Bias attribution — features that are both high-weight AND correlated with demographics
    bias_attribution = {}
    for attr in protected_attributes:
        if attr not in proxy_scores:
            continue

        attr_risks = []
        for name in feature_names:
            weight = feature_weights.get(name, {}).get("weight_pct", 0)
            corr = proxy_scores[attr].get(name, {}).get("abs_correlation", 0)
            # Bias risk score = weight × correlation
            risk = weight * corr
            attr_risks.append({
                "feature": name,
                "model_weight_pct": weight,
                "demographic_correlation": corr,
                "bias_risk_score": risk,
            })

        attr_risks.sort(key=lambda x: x["bias_risk_score"], reverse=True)
        bias_attribution[attr] = attr_risks

    # Summary
    top_feature = next(iter(feature_weights)) if feature_weights else None
    top_weight = feature_weights[top_feature]["weight_pct"] if top_feature else 0

    high_risk_features = []
    for attr, risks in bias_attribution.items():
        for r in risks[:3]:  # Top 3 per attribute
            if r["bias_risk_score"] > 5:  # Threshold for significant risk
                high_risk_features.append({
                    "feature": r["feature"],
                    "attribute": attr,
                    "risk_score": r["bias_risk_score"],
                })

    return {
        "feature_weights": feature_weights,
        "proxy_scores": proxy_scores,
        "bias_attribution": bias_attribution,
        "summary": {
            "top_feature": top_feature,
            "top_feature_weight_pct": round(top_weight, 1),
            "high_risk_features": high_risk_features,
            "model_fit_score": float(lr.score(X_scaled, y_clean)),
        },
    }
