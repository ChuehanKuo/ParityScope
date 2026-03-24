"""Monitoring configuration."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

import yaml


@dataclass
class MonitoringConfig:
    """Configuration for continuous monitoring."""

    model_name: str = ""
    db_path: str = "./parityscope_monitoring.db"
    baseline: str = "first"  # "first" | "latest" | specific audit_id
    schedule: str = "weekly"  # daily | weekly | monthly
    drift_method: str = "absolute"  # absolute | relative | statistical
    drift_threshold: float = 0.03
    alert_rules: list[dict] = field(default_factory=lambda: [
        {"name": "fairness_degradation", "metric_pattern": "*", "condition": "degraded_level", "severity": "warning"},
        {"name": "severe_drift", "metric_pattern": "*", "condition": "drift", "severity": "critical", "params": {"drift_threshold": 0.05}},
        {"name": "threshold_breach", "metric_pattern": "*", "condition": "threshold_exceeded", "severity": "critical", "params": {"max_disparity": 0.15}},
    ])
    trend_window: int = 10
    # Audit parameters
    protected_attributes: list[str] = field(default_factory=list)
    jurisdiction: str | None = None
    clinical_domain: str | None = None
    metrics: list[str] | None = None
    thresholds: dict[str, float] | None = None
    column_map: dict | None = None
    data_path: str | None = None


def load_monitoring_config(path: str | Path) -> MonitoringConfig:
    """Load monitoring config from YAML or JSON."""
    path = Path(path)
    with open(path) as f:
        if path.suffix in (".yaml", ".yml"):
            data = yaml.safe_load(f) or {}
        else:
            import json
            data = json.load(f)

    # Normalize keys
    normalized = {k.replace("-", "_"): v for k, v in data.items()}

    return MonitoringConfig(
        model_name=normalized.get("model_name", ""),
        db_path=normalized.get("db_path", "./parityscope_monitoring.db"),
        baseline=normalized.get("baseline", "first"),
        schedule=normalized.get("schedule", "weekly"),
        drift_method=normalized.get("drift_method", "absolute"),
        drift_threshold=float(normalized.get("drift_threshold", 0.03)),
        alert_rules=normalized.get("alert_rules", MonitoringConfig.alert_rules),
        trend_window=int(normalized.get("trend_window", 10)),
        protected_attributes=normalized.get("protected_attributes", []),
        jurisdiction=normalized.get("jurisdiction"),
        clinical_domain=normalized.get("clinical_domain"),
        metrics=normalized.get("metrics"),
        thresholds=normalized.get("thresholds"),
        column_map=normalized.get("column_map"),
        data_path=normalized.get("data_path"),
    )
