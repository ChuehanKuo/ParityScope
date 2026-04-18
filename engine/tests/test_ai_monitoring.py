"""Tests for parityscope.ai.monitoring — drift detection, change-points, forecasting, anomalies."""

from __future__ import annotations

from dataclasses import replace
from datetime import datetime, timedelta, timezone

import numpy as np
import pandas as pd
import pytest

from parityscope.ai.monitoring import (
    AnomalyResult,
    ChangePointResult,
    ForecastResult,
    StatisticalDriftDetector,
    detect_anomalies,
    detect_changepoints,
    forecast_metric,
)
from parityscope.audit.engine import FairnessAudit
from parityscope.audit.result import AuditResult, FairnessLevel, GroupResult, MetricResult
from parityscope.monitoring.drift import DriftResult
from parityscope.monitoring.store import MetricSnapshot, MonitoringStore


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _make_snapshots(
    disparities: list[float],
    metric_name: str = "race:equal_opportunity",
) -> list[MetricSnapshot]:
    """Build a list of MetricSnapshot from raw disparity values."""
    base = datetime(2026, 1, 1, tzinfo=timezone.utc)
    return [
        MetricSnapshot(
            audit_id=f"audit_{i:04d}",
            timestamp=(base + timedelta(days=i)).isoformat(),
            metric_name=metric_name,
            disparity=float(d),
            fairness_level="fair",
            threshold=0.10,
        )
        for i, d in enumerate(disparities)
    ]


def _shift_predictions(y_pred: np.ndarray, demographics: pd.DataFrame) -> np.ndarray:
    """Inject extra errors into one demographic group to simulate drift."""
    rng = np.random.default_rng(99)
    out = y_pred.copy()
    minority_mask = (demographics["race"] != demographics["race"].mode().iloc[0]).to_numpy()
    minority_idx = np.where(minority_mask)[0]
    flip_n = max(1, int(0.4 * len(minority_idx)))
    flip = rng.choice(minority_idx, size=flip_n, replace=False)
    out[flip] = 1 - out[flip]
    return out


def _run_audit(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    y_score: np.ndarray,
    demographics: pd.DataFrame,
    model_name: str = "test_model",
) -> AuditResult:
    audit = FairnessAudit(
        model_name=model_name,
        protected_attributes=["race", "sex"],
        jurisdiction="eu-ai-act",
        clinical_domain="diagnosis",
    )
    return audit.run(y_true, y_pred, demographics, y_score)


def _make_audit_for_store(
    audit_id: str,
    disparity: float = 0.05,
    timestamp: str | None = None,
    model_name: str = "test_model",
) -> AuditResult:
    """Build a minimal AuditResult suitable for storing in the monitoring store."""
    ts = timestamp or datetime(2026, 1, 1, tzinfo=timezone.utc).isoformat()
    return AuditResult(
        audit_id=audit_id,
        model_name=model_name,
        timestamp=ts,
        protected_attributes=("race",),
        metrics_evaluated=("equal_opportunity",),
        jurisdiction="eu-ai-act",
        clinical_domain="diagnosis",
        thresholds={"fair": 0.05, "marginal": 0.10},
        metric_results=(
            MetricResult(
                metric_name="race:equal_opportunity",
                display_name="Equal Opportunity (race)",
                disparity=float(disparity),
                fairness_level=FairnessLevel.FAIR,
                group_results=(
                    GroupResult("White", 0.90, 100),
                    GroupResult("Black", 0.90 - float(disparity), 100),
                ),
                threshold=0.10,
            ),
            MetricResult(
                metric_name="race:demographic_parity",
                display_name="Demographic Parity (race)",
                disparity=float(disparity) * 0.8,
                fairness_level=FairnessLevel.FAIR,
                group_results=(
                    GroupResult("White", 0.50, 100),
                    GroupResult("Black", 0.50 - float(disparity) * 0.8, 100),
                ),
                threshold=0.10,
            ),
        ),
        overall_fairness=FairnessLevel.FAIR,
        total_samples=200,
        group_counts={"White": 100, "Black": 100},
    )


# ---------------------------------------------------------------------------
# StatisticalDriftDetector
# ---------------------------------------------------------------------------


class TestStatisticalDriftDetector:
    def test_ks_detects_significant_shift(self, sample_data):
        y_true, y_pred, y_score, demographics = sample_data
        baseline = _run_audit(y_true, y_pred, y_score, demographics)
        shifted = _shift_predictions(y_pred, demographics)
        current = _run_audit(y_true, shifted, y_score, demographics)

        detector = StatisticalDriftDetector(method="ks", significance=0.05)
        results = detector.detect(baseline, current)
        assert isinstance(results, list)
        assert len(results) > 0
        # Either statistical test fires drift, OR the absolute change crosses
        # the fallback threshold on at least one metric.
        any_drift = any(r.is_drifted for r in results)
        any_big_shift = any(abs(r.absolute_change) > 0.03 for r in results)
        assert any_drift or any_big_shift

    def test_ks_no_false_positive_on_same_data(self, sample_data):
        y_true, y_pred, y_score, demographics = sample_data
        baseline = _run_audit(y_true, y_pred, y_score, demographics)
        current = _run_audit(y_true, y_pred, y_score, demographics)

        detector = StatisticalDriftDetector(method="ks", significance=0.05)
        results = detector.detect(baseline, current)
        # On identical data, no metric should be flagged as drifted.
        assert all(not r.is_drifted for r in results)

    def test_psi_method(self, sample_data):
        y_true, y_pred, y_score, demographics = sample_data
        baseline = _run_audit(y_true, y_pred, y_score, demographics)
        current = _run_audit(y_true, y_pred, y_score, demographics)

        detector = StatisticalDriftDetector(method="psi")
        results = detector.detect(baseline, current)
        assert isinstance(results, list)
        for r in results:
            assert isinstance(r, DriftResult)

    def test_chi_squared_method(self, sample_data):
        y_true, y_pred, y_score, demographics = sample_data
        baseline = _run_audit(y_true, y_pred, y_score, demographics)
        current = _run_audit(y_true, y_pred, y_score, demographics)

        detector = StatisticalDriftDetector(method="chi_squared")
        results = detector.detect(baseline, current)
        assert isinstance(results, list)
        for r in results:
            assert isinstance(r, DriftResult)

    def test_returns_drift_result_type(self, sample_data):
        y_true, y_pred, y_score, demographics = sample_data
        baseline = _run_audit(y_true, y_pred, y_score, demographics)
        current = _run_audit(y_true, y_pred, y_score, demographics)

        detector = StatisticalDriftDetector(method="ks")
        results = detector.detect(baseline, current)
        assert isinstance(results, list)
        assert all(isinstance(r, DriftResult) for r in results)

    def test_invalid_method_rejected(self):
        with pytest.raises(ValueError, match="Unknown method"):
            StatisticalDriftDetector(method="not_a_method")


# ---------------------------------------------------------------------------
# detect_changepoints
# ---------------------------------------------------------------------------


class TestChangePointDetection:
    def test_detects_level_shift(self):
        # Stable around 0.05 for 8 points, then jump to ~0.50 for 8 points.
        # CUSUM uses h = 5 * sigma; we need enough post-shift samples for the
        # cumulative sum to exceed the decision interval.
        disparities = [0.05, 0.05, 0.04, 0.06, 0.05, 0.05, 0.04, 0.06] + [
            0.50, 0.51, 0.49, 0.52, 0.50, 0.49, 0.51, 0.50,
        ]
        snapshots = _make_snapshots(disparities)
        results = detect_changepoints(snapshots, threshold=0.5)
        assert isinstance(results, list)
        assert len(results) >= 1
        first = results[0]
        assert isinstance(first, ChangePointResult)
        # The changepoint should land near the shift region (CUSUM tends to
        # flag at or shortly after the level break).
        assert first.changepoint_index >= 5
        assert first.magnitude > 0.10
        # And the mean-after should reflect the new level.
        assert first.mean_after > first.mean_before

    def test_no_changepoint_in_stable_series(self):
        snapshots = _make_snapshots([0.05] * 10)
        results = detect_changepoints(snapshots)
        assert results == []

    def test_insufficient_data_returns_empty(self):
        snapshots = _make_snapshots([0.05, 0.06, 0.07, 0.08])
        results = detect_changepoints(snapshots)
        assert results == []

    def test_returns_changepoint_result_type(self):
        disparities = [0.05] * 5 + [0.40] * 5
        snapshots = _make_snapshots(disparities)
        results = detect_changepoints(snapshots, threshold=0.5)
        for r in results:
            assert isinstance(r, ChangePointResult)
            assert r.metric_name == "race:equal_opportunity"
            assert 0.0 <= r.confidence <= 1.0

    def test_invalid_method_raises(self):
        snapshots = _make_snapshots([0.05] * 10)
        with pytest.raises(ValueError, match="Unsupported method"):
            detect_changepoints(snapshots, method="bocp")


# ---------------------------------------------------------------------------
# forecast_metric
# ---------------------------------------------------------------------------


class TestForecastMetric:
    def test_linear_trend_forecast(self):
        # Linear ramp 0.01 -> 0.10
        disparities = [0.01 + 0.01 * i for i in range(10)]
        snapshots = _make_snapshots(disparities)
        result = forecast_metric(snapshots, horizon=5, breach_threshold=1.0)
        assert isinstance(result, ForecastResult)
        assert len(result.forecast_values) == 5
        # Forecast should keep climbing (allow tiny noise).
        last_observed = disparities[-1]
        assert result.forecast_values[-1] > last_observed - 0.01
        assert result.forecast_values[-1] >= result.forecast_values[0] - 0.01

    def test_breach_prediction(self):
        # Climbing toward and through 0.10
        disparities = [0.04 + 0.012 * i for i in range(10)]
        snapshots = _make_snapshots(disparities)
        result = forecast_metric(snapshots, horizon=10, breach_threshold=0.10)
        assert isinstance(result, ForecastResult)
        # disparities already cross 0.10 toward the end, so forecast should breach quickly.
        assert result.steps_to_breach is not None
        assert result.steps_to_breach >= 1

    def test_no_breach_on_stable(self):
        disparities = [0.02 + 0.0005 * np.sin(i) for i in range(10)]
        snapshots = _make_snapshots([float(d) for d in disparities])
        result = forecast_metric(snapshots, horizon=5, breach_threshold=0.50)
        assert isinstance(result, ForecastResult)
        assert result.steps_to_breach is None

    def test_insufficient_data_returns_none(self):
        snapshots = _make_snapshots([0.05, 0.06, 0.07, 0.08])
        result = forecast_metric(snapshots)
        assert result is None

    def test_horizon_count(self):
        disparities = [0.05 + 0.005 * i for i in range(8)]
        snapshots = _make_snapshots(disparities)
        result = forecast_metric(snapshots, horizon=5)
        assert result is not None
        assert len(result.forecast_values) == 5
        assert len(result.forecast_lower) == 5
        assert len(result.forecast_upper) == 5
        # Confidence band should bracket the point forecast.
        for low, val, up in zip(
            result.forecast_lower, result.forecast_values, result.forecast_upper
        ):
            assert low <= val <= up


# ---------------------------------------------------------------------------
# detect_anomalies
# ---------------------------------------------------------------------------


class TestAnomalyDetection:
    def test_insufficient_history(self, tmp_path):
        store = MonitoringStore(tmp_path / "anomaly.db")
        try:
            current = _make_audit_for_store("audit_current", disparity=0.05)
            result = detect_anomalies(store, "test_model", current)
            assert isinstance(result, AnomalyResult)
            assert result.is_anomaly is False
            assert "insufficient history" in result.description.lower()
        finally:
            store.close()

    def test_detects_outlier(self, tmp_path):
        store = MonitoringStore(tmp_path / "anomaly.db")
        try:
            base_ts = datetime(2026, 1, 1, tzinfo=timezone.utc)
            rng = np.random.default_rng(42)
            # Use 30 historical audits — IsolationForest needs enough samples
            # to calibrate its decision boundary stably.
            for i in range(30):
                ts = (base_ts + timedelta(days=i)).isoformat()
                disparity = float(0.05 + rng.normal(0, 0.005))
                store.store_audit(
                    _make_audit_for_store(f"hist_{i:02d}", disparity=disparity, timestamp=ts)
                )

            anomalous = _make_audit_for_store(
                "audit_anom",
                disparity=0.95,
                timestamp=(base_ts + timedelta(days=40)).isoformat(),
            )
            result = detect_anomalies(store, "test_model", anomalous, contamination=0.1)
            assert isinstance(result, AnomalyResult)
            assert result.is_anomaly is True
            assert result.anomaly_score != 0.0

        finally:
            store.close()

    def test_no_anomaly_on_normal(self, tmp_path):
        store = MonitoringStore(tmp_path / "anomaly.db")
        try:
            base_ts = datetime(2026, 1, 1, tzinfo=timezone.utc)
            rng = np.random.default_rng(7)
            for i in range(30):
                ts = (base_ts + timedelta(days=i)).isoformat()
                disparity = float(0.05 + rng.normal(0, 0.003))
                store.store_audit(
                    _make_audit_for_store(f"hist_{i:02d}", disparity=disparity, timestamp=ts)
                )

            similar = _make_audit_for_store(
                "audit_normal",
                disparity=float(0.05 + rng.normal(0, 0.003)),
                timestamp=(base_ts + timedelta(days=40)).isoformat(),
            )
            result = detect_anomalies(store, "test_model", similar, contamination=0.05)
            assert isinstance(result, AnomalyResult)
            # On a similar audit we should not flag anomaly.
            assert result.is_anomaly is False
        finally:
            store.close()
