"""Drift detection for fairness metrics.

Compares current audit results against a baseline to detect
when fairness metrics have changed significantly.
"""

from __future__ import annotations

from dataclasses import dataclass

import numpy as np

from parityscope.audit.result import AuditResult, MetricResult
from parityscope.monitoring.store import MetricSnapshot


@dataclass(frozen=True)
class DriftResult:
    """Result of drift detection for a single metric."""

    metric_name: str
    baseline_disparity: float
    current_disparity: float
    absolute_change: float
    relative_change: float | None
    is_drifted: bool
    direction: str  # improved, degraded, stable


class DriftDetector:
    """Detects drift in fairness metrics between audits."""

    def __init__(self, method: str = "absolute", threshold: float = 0.03):
        if method not in ("absolute", "relative", "statistical"):
            raise ValueError(f"Unknown method '{method}'. Use absolute, relative, or statistical.")
        self.method = method
        self.threshold = threshold

    def detect(
        self, baseline: AuditResult, current: AuditResult
    ) -> list[DriftResult]:
        """Compare current audit against baseline.

        Matches metrics by metric_name and computes drift for each.
        """
        baseline_map = {m.metric_name: m for m in baseline.metric_results}
        results: list[DriftResult] = []

        for current_metric in current.metric_results:
            baseline_metric = baseline_map.get(current_metric.metric_name)
            if baseline_metric is None:
                continue

            result = self._compare(
                current_metric.metric_name,
                baseline_metric.disparity,
                current_metric.disparity,
            )
            results.append(result)

        return results

    def detect_from_snapshots(
        self, baseline_snapshot: MetricSnapshot, current_snapshot: MetricSnapshot
    ) -> DriftResult:
        """Compare two metric snapshots."""
        return self._compare(
            current_snapshot.metric_name,
            baseline_snapshot.disparity,
            current_snapshot.disparity,
        )

    def _compare(
        self, metric_name: str, baseline_disp: float, current_disp: float
    ) -> DriftResult:
        """Core comparison logic."""
        abs_change = current_disp - baseline_disp
        rel_change = (
            abs_change / baseline_disp if baseline_disp > 0 else None
        )

        # Determine if drifted based on method
        if self.method == "absolute":
            is_drifted = abs(abs_change) > self.threshold
        elif self.method == "relative":
            is_drifted = (
                rel_change is not None and abs(rel_change) > self.threshold
            )
        else:  # statistical — simplified, use absolute as proxy
            is_drifted = abs(abs_change) > self.threshold

        # Direction
        if abs(abs_change) < 0.005:
            direction = "stable"
        elif abs_change > 0:
            direction = "degraded"
        else:
            direction = "improved"

        return DriftResult(
            metric_name=metric_name,
            baseline_disparity=round(baseline_disp, 6),
            current_disparity=round(current_disp, 6),
            absolute_change=round(abs_change, 6),
            relative_change=round(rel_change, 4) if rel_change is not None else None,
            is_drifted=is_drifted,
            direction=direction,
        )
