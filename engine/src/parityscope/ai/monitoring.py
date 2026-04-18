"""ML-powered monitoring capabilities for ParityScope.

This module enhances the basic threshold-based monitoring with statistical
and machine-learning techniques:

- ``StatisticalDriftDetector``: drop-in replacement for the simple
  threshold-based ``DriftDetector`` that uses KS, PSI, or chi-squared
  tests to detect distributional drift in per-group fairness rates.
- ``detect_changepoints``: CUSUM-based change-point detection on disparity
  time series.
- ``forecast_metric``: Holt's double exponential smoothing forecast with
  confidence intervals and breach prediction.
- ``detect_anomalies``: IsolationForest-based multivariate anomaly detection
  across all fairness metrics for a given model.

Only depends on numpy, pandas, scipy, and scikit-learn.
"""

from __future__ import annotations

import math
from dataclasses import dataclass

import numpy as np
from scipy import stats
from scipy.optimize import minimize
from sklearn.ensemble import IsolationForest

from parityscope.audit.result import AuditResult
from parityscope.monitoring.drift import DriftResult
from parityscope.monitoring.store import MetricSnapshot, MonitoringStore

__all__ = [
    "AnomalyResult",
    "ChangePointResult",
    "ForecastResult",
    "StatisticalDriftDetector",
    "detect_anomalies",
    "detect_changepoints",
    "forecast_metric",
]


# ---------------------------------------------------------------------------
# Result dataclasses
# ---------------------------------------------------------------------------


@dataclass(frozen=True)
class ChangePointResult:
    """A detected change-point in a fairness metric time series."""

    metric_name: str
    changepoint_index: int
    timestamp: str
    mean_before: float
    mean_after: float
    magnitude: float
    confidence: float


@dataclass(frozen=True)
class ForecastResult:
    """Forecast of future disparity values with confidence intervals."""

    metric_name: str
    forecast_values: tuple[float, ...]
    forecast_lower: tuple[float, ...]
    forecast_upper: tuple[float, ...]
    steps_to_breach: int | None
    breach_threshold: float
    method: str


@dataclass(frozen=True)
class AnomalyResult:
    """Result of multivariate anomaly detection on an audit."""

    audit_id: str
    timestamp: str
    anomaly_score: float
    is_anomaly: bool
    anomalous_metrics: tuple[str, ...]
    description: str


# ---------------------------------------------------------------------------
# Statistical drift detector
# ---------------------------------------------------------------------------


class StatisticalDriftDetector:
    """Drift detector backed by formal statistical tests.

    Methods:
        - ``ks``: two-sample Kolmogorov-Smirnov test on per-group rates.
        - ``psi``: Population Stability Index on per-group rate distributions.
        - ``chi_squared``: chi-squared test on per-group rate distributions.

    Falls back to comparing aggregate disparity values when group-level
    rates are unavailable (single group or empty group_results).
    """

    _VALID_METHODS = {"ks", "psi", "chi_squared"}

    def __init__(
        self,
        method: str = "ks",
        significance: float = 0.05,
        psi_threshold: float = 0.2,
    ):
        if method not in self._VALID_METHODS:
            raise ValueError(
                f"Unknown method '{method}'. Use one of {sorted(self._VALID_METHODS)}."
            )
        self.method = method
        self.significance = significance
        self.psi_threshold = psi_threshold

    def detect(
        self, baseline: AuditResult, current: AuditResult
    ) -> list[DriftResult]:
        """Compare the current audit to a baseline and return per-metric drift."""
        baseline_map = {m.metric_name: m for m in baseline.metric_results}
        results: list[DriftResult] = []

        for current_metric in current.metric_results:
            baseline_metric = baseline_map.get(current_metric.metric_name)
            if baseline_metric is None:
                continue

            baseline_rates = np.asarray(
                [g.rate for g in baseline_metric.group_results], dtype=float
            )
            current_rates = np.asarray(
                [g.rate for g in current_metric.group_results], dtype=float
            )

            abs_change = current_metric.disparity - baseline_metric.disparity
            rel_change = (
                abs_change / baseline_metric.disparity
                if baseline_metric.disparity > 0
                else None
            )

            if (
                baseline_rates.size <= 1
                or current_rates.size <= 1
                or baseline_rates.size != current_rates.size
            ):
                # Fall back to comparing scalar disparities directly.
                is_drifted = abs(abs_change) > 0.03
            else:
                is_drifted = self._run_test(baseline_rates, current_rates)

            if abs(abs_change) < 0.005:
                direction = "stable"
            elif abs_change > 0:
                direction = "degraded"
            else:
                direction = "improved"

            results.append(
                DriftResult(
                    metric_name=current_metric.metric_name,
                    baseline_disparity=round(float(baseline_metric.disparity), 4),
                    current_disparity=round(float(current_metric.disparity), 4),
                    absolute_change=round(float(abs_change), 4),
                    relative_change=(
                        round(float(rel_change), 4) if rel_change is not None else None
                    ),
                    is_drifted=bool(is_drifted),
                    direction=direction,
                )
            )

        return results

    def _run_test(self, baseline: np.ndarray, current: np.ndarray) -> bool:
        """Apply the configured statistical test and return whether drift detected."""
        if self.method == "ks":
            try:
                _, p_value = stats.ks_2samp(baseline, current)
            except Exception:
                return False
            return bool(p_value < self.significance)

        if self.method == "psi":
            return self._psi_drift(baseline, current)

        # chi_squared
        try:
            # Build a 2-row contingency table of (rate * scale) frequencies.
            scale = 1000.0
            baseline_counts = np.maximum(np.round(baseline * scale), 1.0)
            current_counts = np.maximum(np.round(current * scale), 1.0)
            table = np.vstack([baseline_counts, current_counts])
            _, p_value, _, _ = stats.chi2_contingency(table)
        except Exception:
            return False
        return bool(p_value < self.significance)

    def _psi_drift(self, baseline: np.ndarray, current: np.ndarray) -> bool:
        """Compute Population Stability Index across 10 bins of rates."""
        eps = 1e-6
        # Bin edges based on the combined range so both distributions are comparable.
        combined = np.concatenate([baseline, current])
        lo, hi = float(np.min(combined)), float(np.max(combined))
        if hi <= lo:
            return False
        edges = np.linspace(lo, hi, 11)

        baseline_hist, _ = np.histogram(baseline, bins=edges)
        current_hist, _ = np.histogram(current, bins=edges)

        baseline_pct = baseline_hist / max(baseline_hist.sum(), 1)
        current_pct = current_hist / max(current_hist.sum(), 1)

        baseline_pct = np.where(baseline_pct == 0, eps, baseline_pct)
        current_pct = np.where(current_pct == 0, eps, current_pct)

        psi = float(np.sum((current_pct - baseline_pct) * np.log(current_pct / baseline_pct)))
        return psi > self.psi_threshold


# ---------------------------------------------------------------------------
# Change-point detection (CUSUM)
# ---------------------------------------------------------------------------


def detect_changepoints(
    snapshots: list[MetricSnapshot],
    method: str = "cusum",
    threshold: float = 1.0,
) -> list[ChangePointResult]:
    """Detect change-points in a fairness metric time series.

    Uses the CUSUM algorithm by default. Requires at least 5 snapshots.

    The baseline ``mu`` and ``sigma`` are estimated from a rolling window of
    pre-changepoint observations rather than the full series — otherwise a
    single large outlier inflates the global sigma and suppresses subsequent
    detections. After each detected changepoint the CUSUM state is reset and
    the baseline is re-estimated from the post-changepoint window.

    Args:
        snapshots: time-ordered list of ``MetricSnapshot`` for a single metric.
        method: change-point method (currently only ``cusum``).
        threshold: multiplier on sigma controlling sensitivity (lower = more
            sensitive). The decision interval h is fixed at ``5 * sigma``.

    Returns:
        A list of ``ChangePointResult`` objects, one per detected change-point.
    """
    if method != "cusum":
        raise ValueError(f"Unsupported method '{method}'. Use 'cusum'.")

    if len(snapshots) < 5:
        return []

    ordered = sorted(snapshots, key=lambda s: s.timestamp)
    metric_name = ordered[0].metric_name
    y = np.asarray([s.disparity for s in ordered], dtype=float)
    n = y.size

    # Rolling baseline window: use the first ``window_size`` points to
    # estimate mu/sigma, so a single outlier does not dominate.
    window_size = min(30, max(5, n // 2))

    def _baseline(start: int) -> tuple[float, float, float, float]:
        """Estimate mu, sigma, h, k from the window starting at ``start``."""
        end = min(n, start + window_size)
        window = y[start:end]
        if window.size == 0:
            window = y[start : start + 1] if start < n else y[:1]
        mu_w = float(np.mean(window))
        sigma_w = float(np.std(window))
        if sigma_w == 0.0:
            sigma_w = 1.0
        h_w = 5.0 * sigma_w
        k_w = threshold * sigma_w / 2.0
        return mu_w, sigma_w, h_w, k_w

    mu, sigma, h, k = _baseline(0)

    s_pos = 0.0
    s_neg = 0.0
    max_cusum = 0.0
    changepoints: list[ChangePointResult] = []
    last_cp = 0  # index of previous changepoint (or 0 at start)

    for i in range(n):
        s_pos = max(0.0, s_pos + (y[i] - mu - k))
        s_neg = max(0.0, s_neg - (y[i] - mu + k))
        max_cusum = max(max_cusum, s_pos, s_neg)

        if s_pos > h or s_neg > h:
            cp_idx = i
            before = y[last_cp:cp_idx] if cp_idx > last_cp else y[cp_idx : cp_idx + 1]
            after = y[cp_idx:]
            mean_before = float(np.mean(before))
            mean_after = float(np.mean(after))
            magnitude = abs(mean_after - mean_before)
            confidence = float(min(1.0, max_cusum / h)) if h > 0 else 0.0

            changepoints.append(
                ChangePointResult(
                    metric_name=metric_name,
                    changepoint_index=int(cp_idx),
                    timestamp=ordered[cp_idx].timestamp,
                    mean_before=round(mean_before, 4),
                    mean_after=round(mean_after, 4),
                    magnitude=round(magnitude, 4),
                    confidence=round(confidence, 4),
                )
            )

            # Reset CUSUM state and re-estimate baseline from the post-cp window.
            s_pos = 0.0
            s_neg = 0.0
            max_cusum = 0.0
            last_cp = cp_idx
            mu, sigma, h, k = _baseline(cp_idx)

    return changepoints


# ---------------------------------------------------------------------------
# Forecasting (Holt's double exponential smoothing)
# ---------------------------------------------------------------------------


def _holt_fit(
    y: np.ndarray, alpha: float, beta: float
) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """Run Holt's double exponential smoothing recurrence.

    Returns level, trend, and one-step-ahead in-sample predictions.
    """
    n = y.size
    level = np.zeros(n)
    trend = np.zeros(n)
    fitted = np.zeros(n)

    level[0] = y[0]
    trend[0] = y[1] - y[0]
    fitted[0] = level[0]

    for t in range(1, n):
        prev = level[t - 1] + trend[t - 1]
        fitted[t] = prev
        level[t] = alpha * y[t] + (1.0 - alpha) * prev
        trend[t] = beta * (level[t] - level[t - 1]) + (1.0 - beta) * trend[t - 1]

    return level, trend, fitted


def forecast_metric(
    snapshots: list[MetricSnapshot],
    horizon: int = 5,
    breach_threshold: float = 0.10,
    confidence: float = 0.95,
) -> ForecastResult | None:
    """Forecast future disparity values using Holt's exponential smoothing.

    Args:
        snapshots: time-ordered list of ``MetricSnapshot`` for one metric.
        horizon: number of future steps to forecast.
        breach_threshold: disparity value considered a breach; ``steps_to_breach``
            reports the first forecast step that exceeds it (or ``None``).
        confidence: confidence level for the forecast intervals (e.g. 0.95).

    Returns:
        A ``ForecastResult``, or ``None`` if fewer than 5 snapshots are
        available.
    """
    if len(snapshots) < 5:
        return None

    ordered = sorted(snapshots, key=lambda s: s.timestamp)
    metric_name = ordered[0].metric_name
    y = np.asarray([s.disparity for s in ordered], dtype=float)

    def _mse(params: np.ndarray) -> float:
        a, b = float(params[0]), float(params[1])
        if not (0.01 <= a <= 0.99 and 0.01 <= b <= 0.99):
            return 1e9
        try:
            _, _, fitted = _holt_fit(y, a, b)
        except Exception:
            return 1e9
        # Skip the seed value at index 0 when scoring.
        residuals = y[1:] - fitted[1:]
        return float(np.mean(residuals**2))

    alpha, beta = 0.3, 0.1
    try:
        result = minimize(
            _mse,
            x0=np.array([alpha, beta]),
            method="L-BFGS-B",
            bounds=[(0.01, 0.99), (0.01, 0.99)],
        )
        if result.success:
            alpha, beta = float(result.x[0]), float(result.x[1])
    except Exception:
        pass

    level, trend, fitted = _holt_fit(y, alpha, beta)
    last_level = float(level[-1])
    last_trend = float(trend[-1])

    forecasts = np.array(
        [last_level + (h + 1) * last_trend for h in range(horizon)], dtype=float
    )

    # Correct variance formula for Holt's linear trend forecast:
    #   Var(y_hat[T+h]) = sigma^2 * (1 + sum_{j=1}^{h-1} (alpha + j*alpha*beta)^2)
    # The previous formulation (z * SE * sqrt(h)) was only valid for simple
    # exponential smoothing / random walks and underestimates variance for
    # Holt with a non-zero trend smoother.
    residuals = y[1:] - fitted[1:]
    sigma_sq = float(np.var(residuals)) if residuals.size > 0 else 0.0

    def _holt_variance(h_step: int) -> float:
        if h_step <= 1:
            return sigma_sq
        total = sigma_sq
        for j in range(1, h_step):
            total += sigma_sq * (alpha + j * alpha * beta) ** 2
        return total

    z = float(stats.norm.ppf(0.5 + confidence / 2.0))
    margins = np.array(
        [z * math.sqrt(_holt_variance(h_step)) for h_step in range(1, horizon + 1)],
        dtype=float,
    )

    lower = forecasts - margins
    upper = forecasts + margins

    steps_to_breach: int | None = None
    for h, f in enumerate(forecasts, start=1):
        if f > breach_threshold:
            steps_to_breach = int(h)
            break

    return ForecastResult(
        metric_name=metric_name,
        forecast_values=tuple(round(float(v), 4) for v in forecasts),
        forecast_lower=tuple(round(float(v), 4) for v in lower),
        forecast_upper=tuple(round(float(v), 4) for v in upper),
        steps_to_breach=steps_to_breach,
        breach_threshold=round(float(breach_threshold), 4),
        method="holt_exponential_smoothing",
    )


# ---------------------------------------------------------------------------
# Multivariate anomaly detection (IsolationForest)
# ---------------------------------------------------------------------------


def detect_anomalies(
    store: MonitoringStore,
    model_name: str,
    current_audit: AuditResult,
    contamination: float = 0.1,
) -> AnomalyResult:
    """Detect whether the current audit is anomalous vs. historical audits.

    Builds a matrix of per-audit, per-metric disparities from the monitoring
    store and fits an ``IsolationForest`` on the historical rows. The current
    audit's disparities form the test row. When fewer than 10 historical audits
    are available, returns a non-anomalous result with a descriptive message.

    Args:
        store: the ``MonitoringStore`` containing audit history.
        model_name: model identifier whose history to query.
        current_audit: the new ``AuditResult`` to score.
        contamination: expected fraction of anomalies (passed to IsolationForest).

    Returns:
        An ``AnomalyResult`` describing the verdict, score, and which metrics
        contributed to the anomaly.
    """
    metric_names = store.get_all_metric_names(model_name)

    # Map: audit_id -> (timestamp, {metric_name: disparity})
    audit_rows: dict[str, dict[str, float]] = {}
    audit_timestamps: dict[str, str] = {}

    for metric_name in metric_names:
        history = store.get_metric_history(model_name, metric_name, limit=10_000)
        for snap in history:
            audit_rows.setdefault(snap.audit_id, {})[metric_name] = float(snap.disparity)
            audit_timestamps.setdefault(snap.audit_id, snap.timestamp)

    sorted_audit_ids = sorted(audit_rows.keys(), key=lambda aid: audit_timestamps[aid])

    # Current audit feature row.
    current_row_map = {m.metric_name: float(m.disparity) for m in current_audit.metric_results}
    feature_metrics = [m for m in metric_names if m in current_row_map]

    if not feature_metrics:
        feature_metrics = list(current_row_map.keys())

    def _row_for(audit_features: dict[str, float]) -> list[float]:
        return [float(audit_features.get(m, 0.0)) for m in feature_metrics]

    historical_matrix = np.asarray(
        [_row_for(audit_rows[aid]) for aid in sorted_audit_ids], dtype=float
    )
    current_row = np.asarray(_row_for(current_row_map), dtype=float).reshape(1, -1)

    if historical_matrix.shape[0] < 10:
        return AnomalyResult(
            audit_id=current_audit.audit_id,
            timestamp=current_audit.timestamp,
            anomaly_score=0.0,
            is_anomaly=False,
            anomalous_metrics=(),
            description="Insufficient history (need >= 10 audits)",
        )

    model = IsolationForest(contamination=contamination, random_state=42)
    model.fit(historical_matrix)

    # decision_function: more negative = more anomalous; flip sign for clarity.
    raw_score = float(model.decision_function(current_row)[0])
    anomaly_score = round(-raw_score, 4)
    prediction = int(model.predict(current_row)[0])
    is_anomaly = prediction == -1

    anomalous_metrics: list[str] = []
    if is_anomaly:
        means = historical_matrix.mean(axis=0)
        stds = historical_matrix.std(axis=0)
        for idx, metric_name in enumerate(feature_metrics):
            std = stds[idx] if stds[idx] > 0 else 1.0
            z = (current_row[0, idx] - means[idx]) / std
            if abs(z) > 2.0 and not math.isnan(z):
                anomalous_metrics.append(metric_name)

    if is_anomaly and anomalous_metrics:
        description = (
            "Anomalous audit detected; "
            f"unusual values in: {', '.join(anomalous_metrics)}"
        )
    elif is_anomaly:
        description = (
            "Anomalous audit detected; pattern across metrics differs from history"
        )
    else:
        description = "Audit is consistent with historical patterns"

    return AnomalyResult(
        audit_id=current_audit.audit_id,
        timestamp=current_audit.timestamp,
        anomaly_score=anomaly_score,
        is_anomaly=bool(is_anomaly),
        anomalous_metrics=tuple(anomalous_metrics),
        description=description,
    )
