"""Scikit-learn model connector.

Wraps any sklearn estimator that implements predict() and optionally
predict_proba() for use with the ParityScope fairness engine.
"""

from __future__ import annotations

import numpy as np
import pandas as pd

from parityscope.connectors.base import ModelConnector


class SklearnConnector(ModelConnector):
    """Connector for scikit-learn models.

    Usage:
        from sklearn.ensemble import RandomForestClassifier
        from parityscope.connectors import SklearnConnector

        model = RandomForestClassifier()
        model.fit(X_train, y_train)

        connector = SklearnConnector(model)
        result = connector.audit(
            X=X_test,
            y_true=y_test,
            demographics=demo_df,
            model_name="my_rf_model",
            protected_attributes=["race", "sex"],
        )
    """

    def __init__(self, model, threshold: float = 0.5):
        """Initialize with a fitted sklearn estimator.

        Args:
            model: Fitted sklearn estimator with predict() method.
            threshold: Classification threshold for predict_proba output.
        """
        self.model = model
        self.threshold = threshold

    def predict(self, X: np.ndarray | pd.DataFrame) -> np.ndarray:
        """Get binary predictions from the sklearn model."""
        return self.model.predict(X).astype(int)

    def predict_proba(self, X: np.ndarray | pd.DataFrame) -> np.ndarray | None:
        """Get probability scores if the model supports predict_proba."""
        if hasattr(self.model, "predict_proba"):
            proba = self.model.predict_proba(X)
            # Return probability of positive class
            if proba.ndim == 2:
                return proba[:, 1]
            return proba
        if hasattr(self.model, "decision_function"):
            # Normalize decision function to [0, 1] using sigmoid
            decisions = self.model.decision_function(X)
            return 1 / (1 + np.exp(-decisions))
        return None
