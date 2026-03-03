"""Tests for model connectors."""

import numpy as np
import pandas as pd
import pytest
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC

from parityscope.connectors.sklearn_connector import SklearnConnector


class TestSklearnConnector:
    def test_logistic_regression(self):
        rng = np.random.default_rng(42)
        n = 200
        X = rng.normal(0, 1, (n, 3))
        y = (X[:, 0] > 0).astype(int)
        demographics = pd.DataFrame({"group": rng.choice(["A", "B"], size=n)})

        model = LogisticRegression(random_state=42)
        model.fit(X, y)

        connector = SklearnConnector(model)

        # Test predict
        preds = connector.predict(X)
        assert preds.shape == (n,)
        assert set(np.unique(preds)).issubset({0, 1})

        # Test predict_proba
        proba = connector.predict_proba(X)
        assert proba is not None
        assert proba.shape == (n,)
        assert np.all(proba >= 0) and np.all(proba <= 1)

        # Test audit
        result = connector.audit(
            X=X,
            y_true=y,
            demographics=demographics,
            model_name="test_lr",
            protected_attributes=["group"],
        )
        assert result.model_name == "test_lr"
        assert len(result.metric_results) > 0

    def test_svm_with_decision_function(self):
        rng = np.random.default_rng(42)
        n = 200
        X = rng.normal(0, 1, (n, 2))
        y = (X[:, 0] > 0).astype(int)
        demographics = pd.DataFrame({"group": rng.choice(["A", "B"], size=n)})

        model = SVC(random_state=42)
        model.fit(X, y)

        connector = SklearnConnector(model)

        # SVC has decision_function but not predict_proba
        proba = connector.predict_proba(X)
        assert proba is not None
        assert np.all(proba >= 0) and np.all(proba <= 1)

    def test_auto_detect_attributes(self):
        rng = np.random.default_rng(42)
        n = 200
        X = rng.normal(0, 1, (n, 3))
        y = (X[:, 0] > 0).astype(int)
        demographics = pd.DataFrame({
            "race": rng.choice(["A", "B"], size=n),
            "sex": rng.choice(["M", "F"], size=n),
        })

        model = LogisticRegression(random_state=42)
        model.fit(X, y)

        connector = SklearnConnector(model)

        # Should auto-detect both attributes
        result = connector.audit(
            X=X,
            y_true=y,
            demographics=demographics,
            model_name="auto_detect",
        )
        assert "race" in result.protected_attributes
        assert "sex" in result.protected_attributes
