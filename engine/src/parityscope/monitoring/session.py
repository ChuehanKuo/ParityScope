"""Monitoring session — the main orchestrator.

Wraps FairnessAudit, stores results, detects drift, evaluates
alerts, and analyzes trends in a single call.
"""

from __future__ import annotations

from dataclasses import dataclass

import numpy as np
import pandas as pd

from parityscope.audit.engine import FairnessAudit
from parityscope.audit.result import AuditResult
from parityscope.monitoring.alerts import Alert, AlertEngine, AlertRule, AlertSeverity
from parityscope.monitoring.config import MonitoringConfig
from parityscope.monitoring.drift import DriftDetector, DriftResult
from parityscope.monitoring.store import AuditSummary, MonitoringStore
from parityscope.monitoring.trends import TrendAnalyzer, TrendResult


@dataclass(frozen=True)
class MonitoringResult:
    """Complete result from a monitoring run."""

    audit_result: AuditResult
    drift_results: tuple[DriftResult, ...] | None
    alerts: tuple[Alert, ...]
    trend_results: tuple[TrendResult, ...] | None
    baseline_audit_id: str | None
    is_first_run: bool


class MonitoringSession:
    """Orchestrates continuous monitoring for a model."""

    def __init__(
        self,
        config: MonitoringConfig,
        store: MonitoringStore | None = None,
    ):
        self.config = config
        self.store = store or MonitoringStore(config.db_path)

        # Build the audit engine from config
        self._audit = FairnessAudit(
            model_name=config.model_name,
            protected_attributes=config.protected_attributes,
            jurisdiction=config.jurisdiction,
            clinical_domain=config.clinical_domain,
            metrics=config.metrics,
            thresholds=config.thresholds,
        )

        # Drift detector
        self._drift = DriftDetector(
            method=config.drift_method,
            threshold=config.drift_threshold,
        )
        if config.use_ai:
            try:
                from parityscope.ai.monitoring import StatisticalDriftDetector
                self._drift = StatisticalDriftDetector()
            except ImportError:
                pass

        # Alert engine
        rules = [AlertRule.from_dict(r) for r in config.alert_rules]
        self._alerts = AlertEngine(rules)

        # Trend analyzer
        self._trends = TrendAnalyzer(min_points=3)

    def run_audit(
        self,
        y_true: np.ndarray | list,
        y_pred: np.ndarray | list,
        demographics: pd.DataFrame | dict,
        y_score: np.ndarray | list | None = None,
        tags: dict | None = None,
    ) -> MonitoringResult:
        """Run a monitoring audit: audit + store + drift + alerts + trends.

        Args:
            y_true: Ground truth labels.
            y_pred: Model predictions.
            demographics: Demographic data.
            y_score: Optional probability scores.
            tags: Optional metadata tags (e.g., {"env": "production"}).

        Returns:
            MonitoringResult with audit, drift, alerts, and trends.
        """
        # 1. Run the audit
        result = self._audit.run(y_true, y_pred, demographics, y_score)

        # 2. Check if this is the first run
        existing_count = self.store.get_audit_count(self.config.model_name)
        is_first = existing_count == 0

        # 3. Store the result
        self.store.store_audit(result, tags)

        # 4. Get baseline for drift comparison
        baseline_id = self.store.get_baseline_id(self.config.model_name)
        baseline_json = self.store.get_audit_json(baseline_id) if baseline_id else None

        # 5. Drift detection
        drift_results = None
        baseline_result = None
        if baseline_json and baseline_id != result.audit_id:
            baseline_result = self._reconstruct_audit_for_comparison(baseline_json)
            if baseline_result:
                drifts = self._drift.detect(baseline_result, result)
                drift_results = tuple(drifts) if drifts else None

        # 6. Alert evaluation
        alerts = self._alerts.evaluate(
            current=result,
            baseline=baseline_result,
            drift_results=list(drift_results) if drift_results else None,
        )

        # AI-powered anomaly detection (optional)
        if self.config.use_ai:
            try:
                import uuid as _uuid
                from datetime import datetime as _dt
                from datetime import timezone as _tz

                from parityscope.ai.monitoring import detect_anomalies
                anomaly = detect_anomalies(
                    self.store, self.config.model_name, result
                )
                if anomaly.is_anomaly:
                    alerts = list(alerts)
                    alerts.append(Alert(
                        alert_id=str(_uuid.uuid4())[:8],
                        model_name=self.config.model_name,
                        audit_id=result.audit_id,
                        severity=AlertSeverity.WARNING,
                        rule_name="ai_anomaly_detection",
                        metric_name=",".join(anomaly.anomalous_metrics)
                            if anomaly.anomalous_metrics else "*",
                        message=anomaly.description,
                        created_at=_dt.now(_tz.utc).isoformat(),
                    ))
            except ImportError:
                pass

        # Store alerts
        for alert in alerts:
            self.store.store_alert(alert.to_dict())

        # 7. Trend analysis
        trend_results = None
        if existing_count >= 2:
            trends = self._trends.analyze_all(
                self.store, self.config.model_name,
                limit=self.config.trend_window,
            )
            trend_results = tuple(trends) if trends else None

        return MonitoringResult(
            audit_result=result,
            drift_results=drift_results,
            alerts=tuple(alerts),
            trend_results=trend_results,
            baseline_audit_id=baseline_id,
            is_first_run=is_first,
        )

    def get_status(self) -> dict:
        """Get current monitoring status."""
        model = self.config.model_name
        latest = self.store.get_latest_audit(model)
        total = self.store.get_audit_count(model)
        active_alerts = self.store.get_alerts(model, resolved=False)
        baseline_id = self.store.get_baseline_id(model)

        return {
            "model_name": model,
            "total_audits": total,
            "latest_audit": {
                "audit_id": latest.audit_id,
                "timestamp": latest.timestamp,
                "overall_fairness": latest.overall_fairness,
                "fair": latest.n_fair,
                "marginal": latest.n_marginal,
                "unfair": latest.n_unfair,
            } if latest else None,
            "baseline_audit_id": baseline_id,
            "active_alerts": len(active_alerts),
            "recent_alerts": active_alerts[:5],
        }

    def get_history(self, limit: int = 50) -> list[AuditSummary]:
        """Get audit history."""
        return self.store.list_audits(self.config.model_name, limit=limit)

    def _reconstruct_audit_for_comparison(self, audit_json: dict) -> AuditResult | None:
        """Reconstruct minimal AuditResult from stored JSON for drift comparison."""
        from parityscope.audit.result import FairnessLevel, GroupResult, MetricResult

        try:
            metrics = []
            for m in audit_json.get("metric_results", []):
                group_results = tuple(
                    GroupResult(
                        group_label=g["group"],
                        rate=g["rate"],
                        sample_size=g["sample_size"],
                    )
                    for g in m.get("group_results", [])
                )
                metrics.append(MetricResult(
                    metric_name=m["metric_name"],
                    display_name=m["display_name"],
                    disparity=m["disparity"],
                    fairness_level=FairnessLevel(m["fairness_level"]),
                    group_results=group_results,
                    threshold=m["threshold"],
                ))

            return AuditResult(
                audit_id=audit_json["audit_id"],
                model_name=audit_json["model_name"],
                timestamp=audit_json["timestamp"],
                protected_attributes=tuple(audit_json.get("protected_attributes", [])),
                metrics_evaluated=tuple(audit_json.get("metrics_evaluated", [])),
                jurisdiction=audit_json.get("jurisdiction"),
                clinical_domain=audit_json.get("clinical_domain"),
                thresholds=audit_json.get("thresholds", {}),
                metric_results=tuple(metrics),
                overall_fairness=FairnessLevel(audit_json["overall_fairness"]),
                total_samples=audit_json["total_samples"],
                group_counts=audit_json.get("group_counts", {}),
            )
        except (KeyError, ValueError):
            return None
