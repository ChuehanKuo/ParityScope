"""Alert engine for monitoring.

Evaluates configurable rules against audit results and drift data
to produce alerts when fairness metrics degrade.
"""

from __future__ import annotations

import fnmatch
import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from enum import Enum

from parityscope.audit.result import AuditResult, FairnessLevel
from parityscope.monitoring.drift import DriftResult


class AlertSeverity(str, Enum):
    INFO = "info"
    WARNING = "warning"
    CRITICAL = "critical"


@dataclass(frozen=True)
class AlertRule:
    """A rule that triggers alerts when conditions are met."""

    name: str
    metric_pattern: str  # glob pattern, e.g. "*:equal_opportunity" or "*"
    condition: str  # drift | threshold_exceeded | degraded_level
    severity: AlertSeverity
    params: dict = field(default_factory=dict)

    @classmethod
    def from_dict(cls, d: dict) -> AlertRule:
        return cls(
            name=d["name"],
            metric_pattern=d.get("metric_pattern", "*"),
            condition=d["condition"],
            severity=AlertSeverity(d.get("severity", "warning")),
            params=d.get("params", {}),
        )


@dataclass(frozen=True)
class Alert:
    """A triggered alert."""

    alert_id: str
    model_name: str
    audit_id: str
    severity: AlertSeverity
    rule_name: str
    metric_name: str
    message: str
    created_at: str
    resolved_at: str | None = None

    def to_dict(self) -> dict:
        return {
            "alert_id": self.alert_id,
            "model_name": self.model_name,
            "audit_id": self.audit_id,
            "severity": self.severity.value,
            "rule_name": self.rule_name,
            "metric_name": self.metric_name,
            "message": self.message,
            "created_at": self.created_at,
            "resolved_at": self.resolved_at,
        }


class AlertEngine:
    """Evaluates alert rules against audit results."""

    def __init__(self, rules: list[AlertRule]):
        self.rules = rules

    def evaluate(
        self,
        current: AuditResult,
        baseline: AuditResult | None = None,
        drift_results: list[DriftResult] | None = None,
    ) -> list[Alert]:
        """Evaluate all rules and return triggered alerts."""
        alerts: list[Alert] = []
        now = datetime.now(timezone.utc).isoformat()

        baseline_map = {}
        if baseline:
            baseline_map = {m.metric_name: m for m in baseline.metric_results}

        drift_map = {}
        if drift_results:
            drift_map = {d.metric_name: d for d in drift_results}

        for rule in self.rules:
            for metric in current.metric_results:
                if not fnmatch.fnmatch(metric.metric_name, rule.metric_pattern):
                    continue

                alert = self._check_rule(
                    rule, metric, current,
                    baseline_map.get(metric.metric_name),
                    drift_map.get(metric.metric_name),
                    now,
                )
                if alert:
                    alerts.append(alert)

        return alerts

    def _check_rule(
        self,
        rule: AlertRule,
        metric,
        current: AuditResult,
        baseline_metric=None,
        drift_result: DriftResult | None = None,
        now: str = "",
    ) -> Alert | None:
        """Check a single rule against a single metric."""

        if rule.condition == "drift":
            if drift_result is None or not drift_result.is_drifted:
                return None
            if drift_result.direction != "degraded":
                return None
            return Alert(
                alert_id=str(uuid.uuid4())[:8],
                model_name=current.model_name,
                audit_id=current.audit_id,
                severity=rule.severity,
                rule_name=rule.name,
                metric_name=metric.metric_name,
                message=(
                    f"Drift detected in {metric.display_name}: "
                    f"disparity changed from {drift_result.baseline_disparity:.4f} "
                    f"to {drift_result.current_disparity:.4f} "
                    f"(+{drift_result.absolute_change:.4f})"
                ),
                created_at=now,
            )

        elif rule.condition == "threshold_exceeded":
            max_disp = rule.params.get("max_disparity", 0.15)
            if metric.disparity <= max_disp:
                return None
            return Alert(
                alert_id=str(uuid.uuid4())[:8],
                model_name=current.model_name,
                audit_id=current.audit_id,
                severity=rule.severity,
                rule_name=rule.name,
                metric_name=metric.metric_name,
                message=(
                    f"{metric.display_name} disparity ({metric.disparity:.4f}) "
                    f"exceeds threshold ({max_disp:.4f})"
                ),
                created_at=now,
            )

        elif rule.condition == "degraded_level":
            if baseline_metric is None:
                return None
            level_order = {FairnessLevel.FAIR: 0, FairnessLevel.MARGINAL: 1, FairnessLevel.UNFAIR: 2}
            current_level = level_order.get(metric.fairness_level, 0)
            baseline_level = level_order.get(baseline_metric.fairness_level, 0)
            if current_level <= baseline_level:
                return None
            return Alert(
                alert_id=str(uuid.uuid4())[:8],
                model_name=current.model_name,
                audit_id=current.audit_id,
                severity=rule.severity,
                rule_name=rule.name,
                metric_name=metric.metric_name,
                message=(
                    f"{metric.display_name} degraded from "
                    f"{baseline_metric.fairness_level.value.upper()} to "
                    f"{metric.fairness_level.value.upper()}"
                ),
                created_at=now,
            )

        return None
