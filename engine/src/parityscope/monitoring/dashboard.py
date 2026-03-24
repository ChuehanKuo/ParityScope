"""Dashboard data API.

Produces structured JSON for consumption by a future web dashboard
or visualization tool. No patient data is ever included.
"""

from __future__ import annotations

from datetime import datetime, timezone

from parityscope.monitoring.drift import DriftDetector
from parityscope.monitoring.store import MonitoringStore
from parityscope.monitoring.trends import TrendAnalyzer


class DashboardAPI:
    """Produces structured dashboard data from monitoring history."""

    def __init__(self, store: MonitoringStore):
        self.store = store

    def summary(self, model_name: str) -> dict:
        """Get high-level monitoring summary."""
        latest = self.store.get_latest_audit(model_name)
        total = self.store.get_audit_count(model_name)
        active_alerts = self.store.get_alerts(model_name, resolved=False)
        baseline_id = self.store.get_baseline_id(model_name)

        return {
            "model_name": model_name,
            "total_audits": total,
            "baseline_audit_id": baseline_id,
            "active_alert_count": len(active_alerts),
            "latest": {
                "audit_id": latest.audit_id,
                "timestamp": latest.timestamp,
                "overall_fairness": latest.overall_fairness,
                "n_fair": latest.n_fair,
                "n_marginal": latest.n_marginal,
                "n_unfair": latest.n_unfair,
                "total_samples": latest.total_samples,
            } if latest else None,
        }

    def metric_timeseries(
        self, model_name: str, metric_name: str, limit: int = 100
    ) -> dict:
        """Get time series data for a specific metric."""
        snapshots = self.store.get_metric_history(model_name, metric_name, limit)
        return {
            "metric_name": metric_name,
            "n_points": len(snapshots),
            "data": [
                {
                    "timestamp": s.timestamp,
                    "disparity": s.disparity,
                    "fairness_level": s.fairness_level,
                    "threshold": s.threshold,
                }
                for s in snapshots
            ],
        }

    def all_metrics_latest(self, model_name: str) -> dict:
        """Get the latest value for all metrics."""
        metric_names = self.store.get_all_metric_names(model_name)
        metrics = {}
        for mn in metric_names:
            history = self.store.get_metric_history(model_name, mn, limit=1)
            if history:
                s = history[-1]
                metrics[mn] = {
                    "disparity": s.disparity,
                    "fairness_level": s.fairness_level,
                    "threshold": s.threshold,
                    "timestamp": s.timestamp,
                }
        return {"model_name": model_name, "metrics": metrics}

    def alert_summary(self, model_name: str) -> dict:
        """Get alert summary."""
        active = self.store.get_alerts(model_name, resolved=False)
        resolved = self.store.get_alerts(model_name, resolved=True, limit=10)
        return {
            "active_count": len(active),
            "resolved_count": len(resolved),
            "active": active[:20],
            "recently_resolved": resolved[:10],
        }

    def drift_summary(self, model_name: str) -> dict:
        """Get drift summary comparing latest to baseline."""
        baseline_id = self.store.get_baseline_id(model_name)
        if not baseline_id:
            return {"status": "no_baseline", "drifted_metrics": []}

        baseline_json = self.store.get_audit_json(baseline_id)
        latest = self.store.get_latest_audit(model_name)
        if not latest or not baseline_json:
            return {"status": "insufficient_data", "drifted_metrics": []}

        latest_json = self.store.get_audit_json(latest.audit_id)
        if not latest_json:
            return {"status": "error", "drifted_metrics": []}

        # Compare metric snapshots
        baseline_metrics = {m["metric_name"]: m["disparity"] for m in baseline_json.get("metric_results", [])}
        current_metrics = {m["metric_name"]: m["disparity"] for m in latest_json.get("metric_results", [])}

        drifted = []
        for mn in current_metrics:
            if mn in baseline_metrics:
                change = current_metrics[mn] - baseline_metrics[mn]
                if abs(change) > 0.03:
                    drifted.append({
                        "metric": mn,
                        "baseline": round(baseline_metrics[mn], 4),
                        "current": round(current_metrics[mn], 4),
                        "change": round(change, 4),
                        "direction": "degraded" if change > 0 else "improved",
                    })

        return {
            "status": "monitored",
            "baseline_id": baseline_id,
            "drifted_count": len(drifted),
            "drifted_metrics": drifted,
        }

    def trend_summary(self, model_name: str) -> dict:
        """Get trend analysis for all metrics."""
        analyzer = TrendAnalyzer(min_points=3)
        trends = analyzer.analyze_all(self.store, model_name)
        return {
            "n_metrics": len(trends),
            "trends": [
                {
                    "metric": t.metric_name,
                    "direction": t.direction,
                    "slope": t.slope,
                    "p_value": t.p_value,
                    "n_points": t.n_points,
                    "forecast_next": t.forecast_next,
                }
                for t in trends
            ],
        }

    def full_dashboard(self, model_name: str) -> dict:
        """Get all dashboard data in a single call."""
        return {
            "model_name": model_name,
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "summary": self.summary(model_name),
            "metrics_latest": self.all_metrics_latest(model_name),
            "alerts": self.alert_summary(model_name),
            "drift": self.drift_summary(model_name),
            "trends": self.trend_summary(model_name),
        }
