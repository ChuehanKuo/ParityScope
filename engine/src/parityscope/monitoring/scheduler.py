"""Monitoring scheduler — periodic fairness audits with alerting.

Provides a simple scheduler that can run audits at regular intervals,
detect drift, and trigger alerts. Designed for integration into
existing monitoring infrastructure.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Callable

import numpy as np
import pandas as pd

from parityscope.audit.engine import FairnessAudit
from parityscope.audit.result import AuditResult, FairnessLevel
from parityscope.db import AuditStore
from parityscope.monitoring.drift import DriftSeverity, FairnessDriftDetector

logger = logging.getLogger("parityscope.monitoring")


@dataclass
class AlertConfig:
    """Configuration for monitoring alerts."""

    on_unfair: bool = True
    on_marginal: bool = False
    on_drift_severe: bool = True
    on_drift_moderate: bool = True
    callback: Callable[[dict], None] | None = None  # Alert callback function


@dataclass
class MonitoredModel:
    """Configuration for a single monitored model."""

    model_name: str
    protected_attributes: list[str]
    jurisdiction: str | None = None
    clinical_domain: str | None = None
    metrics: list[str] | None = None
    data_provider: Callable[[], tuple[np.ndarray, np.ndarray, pd.DataFrame, np.ndarray | None]] | None = None
    baseline_result: AuditResult | None = None


class MonitoringScheduler:
    """Orchestrates periodic fairness monitoring across a model portfolio.

    Usage:
        scheduler = MonitoringScheduler(store=AuditStore())

        # Register a model
        scheduler.register_model(MonitoredModel(
            model_name="sepsis_v2",
            protected_attributes=["race", "sex"],
            jurisdiction="eu-ai-act",
            clinical_domain="diagnosis",
            data_provider=lambda: get_latest_predictions(),
        ))

        # Run monitoring check
        results = scheduler.run_check()
    """

    def __init__(
        self,
        store: AuditStore | None = None,
        alert_config: AlertConfig | None = None,
        drift_detector: FairnessDriftDetector | None = None,
    ):
        self.store = store or AuditStore()
        self.alert_config = alert_config or AlertConfig()
        self.drift_detector = drift_detector or FairnessDriftDetector()
        self._models: dict[str, MonitoredModel] = {}

    def register_model(self, model: MonitoredModel) -> None:
        """Register a model for monitoring."""
        self._models[model.model_name] = model
        logger.info(f"Registered model '{model.model_name}' for monitoring")

    def unregister_model(self, model_name: str) -> None:
        """Remove a model from monitoring."""
        self._models.pop(model_name, None)
        logger.info(f"Unregistered model '{model_name}'")

    def list_models(self) -> list[str]:
        """List all registered models."""
        return list(self._models.keys())

    def run_check(self, model_name: str | None = None) -> list[dict]:
        """Run monitoring check on one or all registered models.

        Args:
            model_name: Specific model to check. If None, checks all models.

        Returns:
            List of check results with audit outcomes and any drift/alerts.
        """
        models = (
            [self._models[model_name]] if model_name else list(self._models.values())
        )

        results = []
        for model in models:
            if model.data_provider is None:
                logger.warning(f"No data provider for '{model.model_name}', skipping")
                continue

            try:
                result = self._check_model(model)
                results.append(result)
            except Exception as e:
                logger.error(f"Error checking '{model.model_name}': {e}")
                results.append({
                    "model_name": model.model_name,
                    "status": "error",
                    "error": str(e),
                })

        return results

    def _check_model(self, model: MonitoredModel) -> dict:
        """Run a single model check."""
        # Get latest data
        data = model.data_provider()
        if len(data) == 4:
            y_true, y_pred, demographics, y_score = data
        else:
            y_true, y_pred, demographics = data[:3]
            y_score = None

        # Run audit
        audit = FairnessAudit(
            model_name=model.model_name,
            protected_attributes=model.protected_attributes,
            jurisdiction=model.jurisdiction,
            clinical_domain=model.clinical_domain,
            metrics=model.metrics,
        )

        result = audit.run(
            y_true=y_true,
            y_pred=y_pred,
            demographics=demographics,
            y_score=y_score,
        )

        # Persist
        self.store.save(result)
        self.store.save_alerts(result)

        check_result = {
            "model_name": model.model_name,
            "status": "completed",
            "timestamp": result.timestamp,
            "audit_id": result.audit_id,
            "overall_fairness": result.overall_fairness.value,
            "unfair_count": len(result.unfair_metrics),
            "marginal_count": len(result.marginal_metrics),
            "drift": None,
            "alerts_triggered": [],
        }

        # Drift detection
        if model.baseline_result is not None:
            drift_report = self.drift_detector.compare(model.baseline_result, result)
            check_result["drift"] = {
                "severity": drift_report.overall_severity.value,
                "degrading": drift_report.degrading_count,
                "improving": drift_report.improving_count,
                "stable": drift_report.stable_count,
            }

            # Alert on drift
            if drift_report.overall_severity == DriftSeverity.SEVERE and self.alert_config.on_drift_severe:
                alert = {
                    "type": "drift",
                    "severity": "severe",
                    "model": model.model_name,
                    "message": f"Severe fairness drift detected in {model.model_name}: "
                               f"{drift_report.degrading_count} metrics degrading",
                }
                check_result["alerts_triggered"].append(alert)
                self._fire_alert(alert)

        # Alert on unfair
        if result.overall_fairness == FairnessLevel.UNFAIR and self.alert_config.on_unfair:
            alert = {
                "type": "fairness",
                "severity": "unfair",
                "model": model.model_name,
                "message": f"Model '{model.model_name}' assessed as UNFAIR: "
                           f"{len(result.unfair_metrics)} metrics failed",
            }
            check_result["alerts_triggered"].append(alert)
            self._fire_alert(alert)

        return check_result

    def _fire_alert(self, alert: dict) -> None:
        """Fire an alert through the configured callback."""
        logger.warning(f"ALERT: {alert['message']}")
        if self.alert_config.callback:
            try:
                self.alert_config.callback(alert)
            except Exception as e:
                logger.error(f"Alert callback failed: {e}")
