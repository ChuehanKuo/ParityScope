"""Trend analysis for fairness metrics over time.

Detects whether metrics are improving, degrading, or stable
using linear regression on audit history.
"""

from __future__ import annotations

from dataclasses import dataclass

import numpy as np
from scipy.stats import linregress

from parityscope.monitoring.store import MetricSnapshot, MonitoringStore


@dataclass(frozen=True)
class TrendResult:
    """Trend analysis for a single metric."""

    metric_name: str
    slope: float  # disparity change per audit
    direction: str  # increasing, decreasing, stable, insufficient_data
    p_value: float
    r_squared: float
    n_points: int
    forecast_next: float | None
    recent_values: tuple[float, ...]


class TrendAnalyzer:
    """Analyzes trends in metric histories."""

    def __init__(self, min_points: int = 3, significance: float = 0.05):
        self.min_points = min_points
        self.significance = significance

    def analyze(self, snapshots: list[MetricSnapshot]) -> TrendResult:
        """Analyze trend for a list of metric snapshots (time-ordered)."""
        metric_name = snapshots[0].metric_name if snapshots else "unknown"
        n = len(snapshots)

        if n < self.min_points:
            return TrendResult(
                metric_name=metric_name,
                slope=0.0, direction="insufficient_data",
                p_value=1.0, r_squared=0.0, n_points=n,
                forecast_next=None,
                recent_values=tuple(s.disparity for s in snapshots),
            )

        x = np.arange(n, dtype=float)
        y = np.array([s.disparity for s in snapshots])

        result = linregress(x, y)
        slope = float(result.slope)
        p_value = float(result.pvalue)
        r_sq = float(result.rvalue ** 2)

        # Determine direction
        if p_value > self.significance:
            direction = "stable"
        elif slope > 0.001:
            direction = "increasing"
        elif slope < -0.001:
            direction = "decreasing"
        else:
            direction = "stable"

        # Forecast next value
        forecast = float(result.intercept + result.slope * n)
        forecast = max(0.0, forecast)

        return TrendResult(
            metric_name=metric_name,
            slope=round(slope, 6),
            direction=direction,
            p_value=round(p_value, 6),
            r_squared=round(r_sq, 4),
            n_points=n,
            forecast_next=round(forecast, 6),
            recent_values=tuple(round(v, 6) for v in y[-5:]),
        )

    def analyze_all(
        self, store: MonitoringStore, model_name: str, limit: int = 50
    ) -> list[TrendResult]:
        """Analyze trends for all metrics of a model."""
        metric_names = store.get_all_metric_names(model_name)
        results: list[TrendResult] = []

        for metric_name in metric_names:
            snapshots = store.get_metric_history(model_name, metric_name, limit=limit)
            if snapshots:
                results.append(self.analyze(snapshots))

        return results
