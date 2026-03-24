"""SQLite persistence layer for monitoring data.

Stores audit history, baselines, alerts, and metric snapshots.
Patient data is never stored — only audit result summaries.
"""

from __future__ import annotations

import json
import sqlite3
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

from parityscope.audit.result import AuditResult, FairnessLevel


@dataclass(frozen=True)
class AuditSummary:
    """Lightweight summary of a stored audit."""

    audit_id: str
    model_name: str
    timestamp: str
    overall_fairness: str
    total_samples: int
    n_fair: int
    n_marginal: int
    n_unfair: int


@dataclass(frozen=True)
class MetricSnapshot:
    """A single metric value at a point in time."""

    audit_id: str
    timestamp: str
    metric_name: str
    disparity: float
    fairness_level: str
    threshold: float


class MonitoringStore:
    """SQLite-backed storage for monitoring audit history."""

    def __init__(self, db_path: str | Path):
        self.db_path = Path(db_path)
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self._conn = sqlite3.connect(str(self.db_path))
        self._conn.row_factory = sqlite3.Row
        self._init_schema()

    def _init_schema(self) -> None:
        with self._conn:
            self._conn.executescript("""
                CREATE TABLE IF NOT EXISTS audits (
                    audit_id TEXT PRIMARY KEY,
                    model_name TEXT NOT NULL,
                    timestamp TEXT NOT NULL,
                    overall_fairness TEXT NOT NULL,
                    total_samples INTEGER NOT NULL,
                    n_fair INTEGER NOT NULL,
                    n_marginal INTEGER NOT NULL,
                    n_unfair INTEGER NOT NULL,
                    result_json TEXT NOT NULL
                );
                CREATE INDEX IF NOT EXISTS idx_audits_model ON audits(model_name, timestamp);

                CREATE TABLE IF NOT EXISTS metric_snapshots (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    audit_id TEXT NOT NULL REFERENCES audits(audit_id),
                    metric_name TEXT NOT NULL,
                    disparity REAL NOT NULL,
                    fairness_level TEXT NOT NULL,
                    threshold REAL NOT NULL,
                    group_results_json TEXT
                );
                CREATE INDEX IF NOT EXISTS idx_snapshots_metric ON metric_snapshots(audit_id, metric_name);

                CREATE TABLE IF NOT EXISTS baselines (
                    model_name TEXT PRIMARY KEY,
                    audit_id TEXT NOT NULL REFERENCES audits(audit_id),
                    set_at TEXT NOT NULL
                );

                CREATE TABLE IF NOT EXISTS alerts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    alert_id TEXT NOT NULL,
                    model_name TEXT NOT NULL,
                    audit_id TEXT NOT NULL,
                    severity TEXT NOT NULL,
                    rule_name TEXT NOT NULL,
                    metric_name TEXT NOT NULL,
                    message TEXT NOT NULL,
                    created_at TEXT NOT NULL,
                    resolved_at TEXT
                );
                CREATE INDEX IF NOT EXISTS idx_alerts_model ON alerts(model_name, created_at);

                CREATE TABLE IF NOT EXISTS tags (
                    audit_id TEXT NOT NULL REFERENCES audits(audit_id),
                    key TEXT NOT NULL,
                    value TEXT NOT NULL
                );
            """)

    def store_audit(self, result: AuditResult, tags: dict | None = None) -> str:
        """Store an audit result. Returns the audit_id."""
        result_dict = result.to_dict()
        n_fair = len(result.fair_metrics)
        n_marginal = len(result.marginal_metrics)
        n_unfair = len(result.unfair_metrics)

        with self._conn:
            self._conn.execute(
                "INSERT OR REPLACE INTO audits VALUES (?,?,?,?,?,?,?,?,?)",
                (
                    result.audit_id, result.model_name, result.timestamp,
                    result.overall_fairness.value, result.total_samples,
                    n_fair, n_marginal, n_unfair,
                    json.dumps(result_dict, default=str),
                ),
            )

            for m in result.metric_results:
                group_json = json.dumps([
                    {"group": g.group_label, "rate": g.rate, "sample_size": g.sample_size}
                    for g in m.group_results
                ])
                self._conn.execute(
                    "INSERT INTO metric_snapshots (audit_id, metric_name, disparity, fairness_level, threshold, group_results_json) VALUES (?,?,?,?,?,?)",
                    (result.audit_id, m.metric_name, m.disparity, m.fairness_level.value, m.threshold, group_json),
                )

            if tags:
                for key, value in tags.items():
                    self._conn.execute(
                        "INSERT INTO tags (audit_id, key, value) VALUES (?,?,?)",
                        (result.audit_id, key, str(value)),
                    )

        # Auto-set baseline if this is the first audit for this model
        existing_baseline = self._conn.execute(
            "SELECT audit_id FROM baselines WHERE model_name = ?",
            (result.model_name,),
        ).fetchone()
        if not existing_baseline:
            self.set_baseline(result.model_name, result.audit_id)

        return result.audit_id

    def get_audit_json(self, audit_id: str) -> dict | None:
        """Get the full audit result as a dict."""
        row = self._conn.execute(
            "SELECT result_json FROM audits WHERE audit_id = ?", (audit_id,)
        ).fetchone()
        if row is None:
            return None
        return json.loads(row["result_json"])

    def list_audits(
        self, model_name: str, limit: int = 100, offset: int = 0
    ) -> list[AuditSummary]:
        """List audit summaries for a model, newest first."""
        rows = self._conn.execute(
            "SELECT audit_id, model_name, timestamp, overall_fairness, total_samples, n_fair, n_marginal, n_unfair "
            "FROM audits WHERE model_name = ? ORDER BY timestamp DESC LIMIT ? OFFSET ?",
            (model_name, limit, offset),
        ).fetchall()
        return [
            AuditSummary(
                audit_id=r["audit_id"], model_name=r["model_name"],
                timestamp=r["timestamp"], overall_fairness=r["overall_fairness"],
                total_samples=r["total_samples"], n_fair=r["n_fair"],
                n_marginal=r["n_marginal"], n_unfair=r["n_unfair"],
            )
            for r in rows
        ]

    def get_metric_history(
        self, model_name: str, metric_name: str, limit: int = 100
    ) -> list[MetricSnapshot]:
        """Get time series for a specific metric."""
        rows = self._conn.execute(
            "SELECT ms.audit_id, a.timestamp, ms.metric_name, ms.disparity, ms.fairness_level, ms.threshold "
            "FROM metric_snapshots ms JOIN audits a ON ms.audit_id = a.audit_id "
            "WHERE a.model_name = ? AND ms.metric_name = ? "
            "ORDER BY a.timestamp ASC LIMIT ?",
            (model_name, metric_name, limit),
        ).fetchall()
        return [
            MetricSnapshot(
                audit_id=r["audit_id"], timestamp=r["timestamp"],
                metric_name=r["metric_name"], disparity=r["disparity"],
                fairness_level=r["fairness_level"], threshold=r["threshold"],
            )
            for r in rows
        ]

    def get_all_metric_names(self, model_name: str) -> list[str]:
        """Get all unique metric names for a model."""
        rows = self._conn.execute(
            "SELECT DISTINCT ms.metric_name FROM metric_snapshots ms "
            "JOIN audits a ON ms.audit_id = a.audit_id WHERE a.model_name = ?",
            (model_name,),
        ).fetchall()
        return [r["metric_name"] for r in rows]

    def get_baseline_id(self, model_name: str) -> str | None:
        """Get the baseline audit ID for a model."""
        row = self._conn.execute(
            "SELECT audit_id FROM baselines WHERE model_name = ?", (model_name,)
        ).fetchone()
        return row["audit_id"] if row else None

    def set_baseline(self, model_name: str, audit_id: str) -> None:
        """Set the baseline audit for drift comparison."""
        now = datetime.now(timezone.utc).isoformat()
        with self._conn:
            self._conn.execute(
                "INSERT OR REPLACE INTO baselines (model_name, audit_id, set_at) VALUES (?,?,?)",
                (model_name, audit_id, now),
            )

    def store_alert(self, alert: dict) -> None:
        """Store an alert."""
        with self._conn:
            self._conn.execute(
                "INSERT INTO alerts (alert_id, model_name, audit_id, severity, rule_name, metric_name, message, created_at, resolved_at) "
                "VALUES (?,?,?,?,?,?,?,?,?)",
                (
                    alert["alert_id"], alert["model_name"], alert["audit_id"],
                    alert["severity"], alert["rule_name"], alert["metric_name"],
                    alert["message"], alert["created_at"], alert.get("resolved_at"),
                ),
            )

    def get_alerts(
        self, model_name: str, resolved: bool | None = None, limit: int = 50
    ) -> list[dict]:
        """Get alerts for a model."""
        query = "SELECT * FROM alerts WHERE model_name = ?"
        params: list = [model_name]
        if resolved is True:
            query += " AND resolved_at IS NOT NULL"
        elif resolved is False:
            query += " AND resolved_at IS NULL"
        query += " ORDER BY created_at DESC LIMIT ?"
        params.append(limit)

        rows = self._conn.execute(query, params).fetchall()
        return [dict(r) for r in rows]

    def get_audit_count(self, model_name: str) -> int:
        """Count total audits for a model."""
        row = self._conn.execute(
            "SELECT COUNT(*) as cnt FROM audits WHERE model_name = ?", (model_name,)
        ).fetchone()
        return row["cnt"]

    def get_latest_audit(self, model_name: str) -> AuditSummary | None:
        """Get the most recent audit summary."""
        audits = self.list_audits(model_name, limit=1)
        return audits[0] if audits else None

    def close(self) -> None:
        """Close the database connection."""
        self._conn.close()
