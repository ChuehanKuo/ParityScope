"""Base class for model connectors."""

from __future__ import annotations

from abc import ABC, abstractmethod

import numpy as np
import pandas as pd

from parityscope.audit.engine import FairnessAudit
from parityscope.audit.result import AuditResult


class ModelConnector(ABC):
    """Abstract base class for model connectors.

    Subclasses implement `predict()` and optionally `predict_proba()`.
    The `audit()` method runs a full fairness evaluation.
    """

    @abstractmethod
    def predict(self, X: np.ndarray | pd.DataFrame) -> np.ndarray:
        """Get binary predictions from the model."""
        ...

    def predict_proba(self, X: np.ndarray | pd.DataFrame) -> np.ndarray | None:
        """Get probability scores from the model. Returns None if not supported."""
        return None

    def audit(
        self,
        X: np.ndarray | pd.DataFrame,
        y_true: np.ndarray,
        demographics: pd.DataFrame,
        model_name: str = "model",
        protected_attributes: list[str] | None = None,
        jurisdiction: str | None = None,
        clinical_domain: str | None = None,
        metrics: list[str] | None = None,
    ) -> AuditResult:
        """Run a fairness audit using this connector's model.

        Args:
            X: Feature matrix for prediction.
            y_true: Ground truth labels.
            demographics: Demographic data.
            model_name: Identifier for the model.
            protected_attributes: Attributes to evaluate. If None, uses all
                columns in demographics.
            jurisdiction: Regulatory jurisdiction.
            clinical_domain: Clinical use case.
            metrics: Explicit metrics to compute.

        Returns:
            AuditResult with complete fairness evaluation.
        """
        if protected_attributes is None:
            protected_attributes = list(demographics.columns)

        y_pred = self.predict(X)
        y_score = self.predict_proba(X)

        audit = FairnessAudit(
            model_name=model_name,
            protected_attributes=protected_attributes,
            jurisdiction=jurisdiction,
            clinical_domain=clinical_domain,
            metrics=metrics,
        )

        return audit.run(
            y_true=y_true,
            y_pred=y_pred,
            demographics=demographics,
            y_score=y_score,
        )
