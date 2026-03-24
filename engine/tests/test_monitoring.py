"""Tests for parityscope.monitoring — store, drift, alerts, trends, session, dashboard."""

import numpy as np
import pandas as pd
import pytest

from parityscope.audit.engine import FairnessAudit
from parityscope.audit.result import AuditResult, FairnessLevel, GroupResult, MetricResult
from parityscope.monitoring.store import MonitoringStore, AuditSummary, MetricSnapshot
from parityscope.monitoring.drift import DriftDetector, DriftResult
from parityscope.monitoring.alerts import AlertEngine, AlertRule, AlertSeverity, Alert
from parityscope.monitoring.trends import TrendAnalyzer, TrendResult
from parityscope.monitoring.config import MonitoringConfig
from parityscope.monitoring.session import MonitoringSession, MonitoringResult
from parityscope.monitoring.dashboard import DashboardAPI


def _make_audit_result(
    audit_id="test-001",
    model_name="test_model",
    disparity=0.08,
    level=FairnessLevel.MARGINAL,
):
    """Helper to create a minimal AuditResult."""
    return AuditResult(
        audit_id=audit_id,
        model_name=model_name,
        timestamp="2025-01-01T00:00:00",
        protected_attributes=("race",),
        metrics_evaluated=("equal_opportunity",),
        jurisdiction="eu-ai-act",
        clinical_domain="diagnosis",
        thresholds={"fair": 0.05, "marginal": 0.10},
        metric_results=(
            MetricResult(
                metric_name="race:equal_opportunity",
                display_name="Equal Opportunity (race)",
                disparity=disparity,
                fairness_level=level,
                group_results=(
                    GroupResult("White", 0.90, 100),
                    GroupResult("Black", 0.90 - disparity, 100),
                ),
                threshold=0.10,
            ),
        ),
        overall_fairness=level,
        total_samples=200,
        group_counts={"White": 100, "Black": 100},
    )


class TestMonitoringStore:
    """Tests for MonitoringStore."""

    def test_create_and_store(self, tmp_path):
        db_path = tmp_path / "test.db"
        store = MonitoringStore(db_path)
        result = _make_audit_result()
        audit_id = store.store_audit(result)
        assert audit_id == "test-001"
        store.close()

    def test_retrieve_audit(self, tmp_path):
        db_path = tmp_path / "test.db"
        store = MonitoringStore(db_path)
        result = _make_audit_result()
        store.store_audit(result)
        retrieved = store.get_audit_json("test-001")
        assert retrieved is not None
        assert retrieved["audit_id"] == "test-001"
        store.close()

    def test_list_audits(self, tmp_path):
        db_path = tmp_path / "test.db"
        store = MonitoringStore(db_path)
        store.store_audit(_make_audit_result(audit_id="a1"))
        store.store_audit(_make_audit_result(audit_id="a2"))
        audits = store.list_audits("test_model")
        assert len(audits) == 2
        assert all(isinstance(a, AuditSummary) for a in audits)
        store.close()

    def test_auto_baseline_on_first_audit(self, tmp_path):
        db_path = tmp_path / "test.db"
        store = MonitoringStore(db_path)
        store.store_audit(_make_audit_result(audit_id="first"))
        baseline_id = store.get_baseline_id("test_model")
        assert baseline_id == "first"
        store.close()

    def test_set_baseline(self, tmp_path):
        db_path = tmp_path / "test.db"
        store = MonitoringStore(db_path)
        store.store_audit(_make_audit_result(audit_id="a1"))
        store.store_audit(_make_audit_result(audit_id="a2"))
        store.set_baseline("test_model", "a2")
        assert store.get_baseline_id("test_model") == "a2"
        store.close()

    def test_metric_history(self, tmp_path):
        db_path = tmp_path / "test.db"
        store = MonitoringStore(db_path)
        store.store_audit(_make_audit_result(audit_id="a1", disparity=0.05))
        store.store_audit(_make_audit_result(audit_id="a2", disparity=0.08))
        history = store.get_metric_history("test_model", "race:equal_opportunity")
        assert len(history) == 2
        assert all(isinstance(s, MetricSnapshot) for s in history)
        store.close()

    def test_get_audit_count(self, tmp_path):
        db_path = tmp_path / "test.db"
        store = MonitoringStore(db_path)
        assert store.get_audit_count("test_model") == 0
        store.store_audit(_make_audit_result(audit_id="a1"))
        assert store.get_audit_count("test_model") == 1
        store.close()

    def test_store_and_get_alerts(self, tmp_path):
        db_path = tmp_path / "test.db"
        store = MonitoringStore(db_path)
        store.store_audit(_make_audit_result())
        alert_dict = {
            "alert_id": "alert-001",
            "model_name": "test_model",
            "audit_id": "test-001",
            "severity": "warning",
            "rule_name": "test_rule",
            "metric_name": "race:equal_opportunity",
            "message": "Test alert message",
            "created_at": "2025-01-01T00:00:00",
            "resolved_at": None,
        }
        store.store_alert(alert_dict)
        alerts = store.get_alerts("test_model", resolved=False)
        assert len(alerts) == 1
        assert alerts[0]["alert_id"] == "alert-001"
        store.close()


class TestDriftDetector:
    """Tests for DriftDetector."""

    def test_detect_drift(self):
        baseline = _make_audit_result(audit_id="baseline", disparity=0.05)
        current = _make_audit_result(audit_id="current", disparity=0.12)
        detector = DriftDetector(method="absolute", threshold=0.03)
        results = detector.detect(baseline, current)
        assert len(results) == 1
        assert results[0].is_drifted is True
        assert results[0].direction == "degraded"

    def test_no_drift(self):
        baseline = _make_audit_result(audit_id="baseline", disparity=0.05)
        current = _make_audit_result(audit_id="current", disparity=0.055)
        detector = DriftDetector(method="absolute", threshold=0.03)
        results = detector.detect(baseline, current)
        assert results[0].is_drifted is False

    def test_improvement(self):
        baseline = _make_audit_result(audit_id="baseline", disparity=0.15)
        current = _make_audit_result(audit_id="current", disparity=0.05)
        detector = DriftDetector(method="absolute", threshold=0.03)
        results = detector.detect(baseline, current)
        assert results[0].is_drifted is True
        assert results[0].direction == "improved"

    def test_relative_method(self):
        baseline = _make_audit_result(audit_id="baseline", disparity=0.10)
        current = _make_audit_result(audit_id="current", disparity=0.15)
        detector = DriftDetector(method="relative", threshold=0.20)
        results = detector.detect(baseline, current)
        assert results[0].is_drifted is True

    def test_invalid_method(self):
        with pytest.raises(ValueError, match="Unknown method"):
            DriftDetector(method="invalid_method")


class TestAlertEngine:
    """Tests for AlertEngine with each condition type."""

    def test_drift_condition(self):
        rules = [AlertRule(
            name="drift_alert", metric_pattern="*",
            condition="drift", severity=AlertSeverity.CRITICAL,
        )]
        engine = AlertEngine(rules)
        current = _make_audit_result(disparity=0.12)
        drift = [DriftResult(
            metric_name="race:equal_opportunity",
            baseline_disparity=0.05, current_disparity=0.12,
            absolute_change=0.07, relative_change=1.4,
            is_drifted=True, direction="degraded",
        )]
        alerts = engine.evaluate(current, drift_results=drift)
        assert len(alerts) > 0
        assert alerts[0].severity == AlertSeverity.CRITICAL

    def test_threshold_exceeded_condition(self):
        rules = [AlertRule(
            name="threshold_alert", metric_pattern="*",
            condition="threshold_exceeded", severity=AlertSeverity.WARNING,
            params={"max_disparity": 0.10},
        )]
        engine = AlertEngine(rules)
        current = _make_audit_result(disparity=0.15, level=FairnessLevel.UNFAIR)
        alerts = engine.evaluate(current)
        assert len(alerts) > 0

    def test_threshold_not_exceeded(self):
        rules = [AlertRule(
            name="threshold_alert", metric_pattern="*",
            condition="threshold_exceeded", severity=AlertSeverity.WARNING,
            params={"max_disparity": 0.20},
        )]
        engine = AlertEngine(rules)
        current = _make_audit_result(disparity=0.08)
        alerts = engine.evaluate(current)
        assert len(alerts) == 0

    def test_degraded_level_condition(self):
        rules = [AlertRule(
            name="level_alert", metric_pattern="*",
            condition="degraded_level", severity=AlertSeverity.WARNING,
        )]
        engine = AlertEngine(rules)
        baseline = _make_audit_result(audit_id="base", disparity=0.03, level=FairnessLevel.FAIR)
        current = _make_audit_result(audit_id="curr", disparity=0.12, level=FairnessLevel.UNFAIR)
        alerts = engine.evaluate(current, baseline=baseline)
        assert len(alerts) > 0

    def test_metric_pattern_filtering(self):
        rules = [AlertRule(
            name="specific_alert", metric_pattern="*:demographic_parity",
            condition="threshold_exceeded", severity=AlertSeverity.WARNING,
            params={"max_disparity": 0.01},
        )]
        engine = AlertEngine(rules)
        current = _make_audit_result(disparity=0.15, level=FairnessLevel.UNFAIR)
        # Current metric is race:equal_opportunity, not demographic_parity
        alerts = engine.evaluate(current)
        assert len(alerts) == 0


class TestTrendAnalyzer:
    """Tests for TrendAnalyzer."""

    def test_linear_increasing_trend(self):
        analyzer = TrendAnalyzer(min_points=3, significance=0.10)
        snapshots = [
            MetricSnapshot("a1", f"2025-01-0{i}", "metric_a", disparity=0.01 * i, fairness_level="fair", threshold=0.10)
            for i in range(1, 8)
        ]
        result = analyzer.analyze(snapshots)
        assert isinstance(result, TrendResult)
        assert result.direction == "increasing"
        assert result.slope > 0
        assert result.n_points == 7

    def test_stable_trend(self):
        analyzer = TrendAnalyzer(min_points=3)
        snapshots = [
            MetricSnapshot("a1", f"2025-01-0{i}", "metric_a", disparity=0.05, fairness_level="fair", threshold=0.10)
            for i in range(1, 6)
        ]
        result = analyzer.analyze(snapshots)
        assert result.direction == "stable"
        assert result.slope == pytest.approx(0.0, abs=0.001)

    def test_insufficient_data(self):
        analyzer = TrendAnalyzer(min_points=5)
        snapshots = [
            MetricSnapshot("a1", "2025-01-01", "metric_a", disparity=0.05, fairness_level="fair", threshold=0.10),
            MetricSnapshot("a2", "2025-01-02", "metric_a", disparity=0.06, fairness_level="fair", threshold=0.10),
        ]
        result = analyzer.analyze(snapshots)
        assert result.direction == "insufficient_data"

    def test_forecast_next(self):
        analyzer = TrendAnalyzer(min_points=3)
        snapshots = [
            MetricSnapshot("a1", f"2025-01-0{i}", "metric_a", disparity=0.01 * i, fairness_level="fair", threshold=0.10)
            for i in range(1, 6)
        ]
        result = analyzer.analyze(snapshots)
        assert result.forecast_next is not None
        assert result.forecast_next >= 0


class TestMonitoringSession:
    """Tests for MonitoringSession.run_audit end-to-end."""

    def test_run_audit(self, sample_data, tmp_path):
        y_true, y_pred, y_score, demographics = sample_data
        db_path = str(tmp_path / "monitor.db")
        config = MonitoringConfig(
            model_name="test_model",
            db_path=db_path,
            protected_attributes=["race", "sex"],
            jurisdiction="eu-ai-act",
            clinical_domain="diagnosis",
        )
        session = MonitoringSession(config)
        result = session.run_audit(y_true, y_pred, demographics, y_score)
        assert isinstance(result, MonitoringResult)
        assert result.is_first_run is True
        assert result.audit_result is not None

    def test_second_run_not_first(self, sample_data, tmp_path):
        y_true, y_pred, y_score, demographics = sample_data
        db_path = str(tmp_path / "monitor.db")
        config = MonitoringConfig(
            model_name="test_model",
            db_path=db_path,
            protected_attributes=["race", "sex"],
            jurisdiction="eu-ai-act",
            clinical_domain="diagnosis",
        )
        session = MonitoringSession(config)
        session.run_audit(y_true, y_pred, demographics, y_score)
        result2 = session.run_audit(y_true, y_pred, demographics, y_score)
        assert result2.is_first_run is False

    def test_get_status(self, sample_data, tmp_path):
        y_true, y_pred, y_score, demographics = sample_data
        db_path = str(tmp_path / "monitor.db")
        config = MonitoringConfig(
            model_name="test_model",
            db_path=db_path,
            protected_attributes=["race", "sex"],
            jurisdiction="eu-ai-act",
            clinical_domain="diagnosis",
        )
        session = MonitoringSession(config)
        session.run_audit(y_true, y_pred, demographics, y_score)
        status = session.get_status()
        assert status["model_name"] == "test_model"
        assert status["total_audits"] == 1


class TestDashboardAPI:
    """Tests for DashboardAPI.full_dashboard."""

    def test_full_dashboard_structure(self, sample_data, tmp_path):
        y_true, y_pred, y_score, demographics = sample_data
        db_path = str(tmp_path / "dashboard.db")
        config = MonitoringConfig(
            model_name="test_model",
            db_path=db_path,
            protected_attributes=["race", "sex"],
            jurisdiction="eu-ai-act",
            clinical_domain="diagnosis",
        )
        session = MonitoringSession(config)
        session.run_audit(y_true, y_pred, demographics, y_score)

        api = DashboardAPI(session.store)
        dashboard = api.full_dashboard("test_model")
        assert "model_name" in dashboard
        assert "summary" in dashboard
        assert "metrics_latest" in dashboard
        assert "alerts" in dashboard
        assert "drift" in dashboard
        assert "trends" in dashboard

    def test_summary_endpoint(self, sample_data, tmp_path):
        y_true, y_pred, y_score, demographics = sample_data
        db_path = str(tmp_path / "dashboard.db")
        config = MonitoringConfig(
            model_name="test_model",
            db_path=db_path,
            protected_attributes=["race", "sex"],
            jurisdiction="eu-ai-act",
            clinical_domain="diagnosis",
        )
        session = MonitoringSession(config)
        session.run_audit(y_true, y_pred, demographics, y_score)

        api = DashboardAPI(session.store)
        summary = api.summary("test_model")
        assert summary["total_audits"] == 1
        assert summary["latest"] is not None
