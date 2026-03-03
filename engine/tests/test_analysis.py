"""Tests for analysis modules (intersectional + feature importance)."""

import numpy as np
import pandas as pd
import pytest

from parityscope.analysis.intersectional import intersectional_audit
from parityscope.analysis.feature_importance import bias_feature_importance


class TestIntersectionalAudit:
    def test_basic_intersectional(self, binary_dataset):
        # Need multi-attribute demographics
        n = len(binary_dataset["y_true"])
        rng = np.random.default_rng(42)
        demographics = pd.DataFrame({
            "race": binary_dataset["demographics"]["race"],
            "sex": rng.choice(["M", "F"], size=n),
        })

        result = intersectional_audit(
            y_true=binary_dataset["y_true"],
            y_pred=binary_dataset["y_pred"],
            demographics=demographics,
            attributes=["race", "sex"],
            model_name="test_model",
            metrics=["demographic_parity", "equal_opportunity"],
            min_group_size=10,
        )

        assert "individual_audits" in result
        assert "intersectional_audits" in result
        assert "summary" in result
        assert len(result["individual_audits"]) == 2  # race, sex
        assert "race x sex" in result["intersectional_audits"]

    def test_summary_contains_counts(self, binary_dataset):
        n = len(binary_dataset["y_true"])
        rng = np.random.default_rng(42)
        demographics = pd.DataFrame({
            "race": binary_dataset["demographics"]["race"],
            "sex": rng.choice(["M", "F"], size=n),
        })

        result = intersectional_audit(
            y_true=binary_dataset["y_true"],
            y_pred=binary_dataset["y_pred"],
            demographics=demographics,
            attributes=["race", "sex"],
            metrics=["demographic_parity"],
            min_group_size=10,
        )

        summary = result["summary"]
        assert summary["individual_analyses"] == 2
        assert summary["attributes_analyzed"] == ["race", "sex"]


class TestFeatureImportance:
    def test_basic_feature_importance(self):
        rng = np.random.default_rng(42)
        n = 500

        # Create features where age is highly correlated with predictions
        age = rng.normal(50, 15, n)
        bmi = rng.normal(28, 5, n)
        feature_noise = rng.normal(0, 1, n)

        # Predictions driven mostly by age
        y_pred = (age > 55).astype(int)
        demographics = pd.DataFrame({
            "race": rng.choice(["A", "B"], size=n),
        })

        X = pd.DataFrame({
            "age": age,
            "bmi": bmi,
            "noise": feature_noise,
        })

        result = bias_feature_importance(
            X=X,
            y_pred=y_pred,
            demographics=demographics,
            protected_attributes=["race"],
        )

        assert "feature_weights" in result
        assert "proxy_scores" in result
        assert "bias_attribution" in result
        assert "summary" in result

        # Age should be the top feature
        weights = result["feature_weights"]
        top_feature = next(iter(weights))
        assert top_feature == "age"
        assert weights["age"]["weight_pct"] > weights["noise"]["weight_pct"]

    def test_proxy_detection(self):
        rng = np.random.default_rng(42)
        n = 500

        # Create a feature that's a proxy for race
        race = rng.choice(["A", "B"], size=n)
        proxy_feature = np.array([1.0 if r == "A" else 0.0 for r in race]) + rng.normal(0, 0.1, n)
        other_feature = rng.normal(0, 1, n)

        y_pred = (proxy_feature > 0.5).astype(int)
        demographics = pd.DataFrame({"race": race})
        X = pd.DataFrame({"proxy": proxy_feature, "other": other_feature})

        result = bias_feature_importance(
            X=X,
            y_pred=y_pred,
            demographics=demographics,
            protected_attributes=["race"],
        )

        # Proxy feature should have high correlation with race
        race_proxies = result["proxy_scores"]["race"]
        assert race_proxies["proxy"]["abs_correlation"] > race_proxies["other"]["abs_correlation"]
