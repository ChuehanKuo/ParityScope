"""Fairness drift detection.

Detects when a model's fairness metrics degrade over time by comparing
current audit results against a baseline or historical trend.
"""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum

import numpy as np

from parityscope.audit.result import AuditResult, FairnessLevel


class DriftSeverity(str, Enum):
    NONE = "none"
    MINOR = "minor"
    MODERATE = "moderate"
    SEVERE = "severe"


@dataclass(frozen=True)
class DriftResult:
    """Result of a drift detection analysis for a single metric."""

    metric_name: str
    baseline_disparity: float
    current_disparity: float
    absolute_change: float
    relative_change: float
    severity: DriftSeverity
    direction: str  # "improving" or "degrading"


@dataclass(frozen=True)
class DriftReport:
    """Complete drift detection report comparing baseline to current."""

    model_name: str
    baseline_audit_id: str
    current_audit_id: str
    metric_drifts: tuple[DriftResult, ...]
    overall_severity: DriftSeverity
    degrading_count: int
    improving_count: int
    stable_count: int


class FairnessDriftDetector:
    """Detects fairness drift between a baseline and current audit.

    Usage:
        detector = FairnessDriftDetector(
            minor_threshold=0.02,
            moderate_threshold=0.05,
            severe_threshold=0.10,
        )
        report = detector.compare(baseline_result, current_result)
    """

    def __init__(
        self,
        minor_threshold: float = 0.02,
        moderate_threshold: float = 0.05,
        severe_threshold: float = 0.10,
    ):
        self.minor_threshold = minor_threshold
        self.moderate_threshold = moderate_threshold
        self.severe_threshold = severe_threshold

    def compare(
        self,
        baseline: AuditResult,
        current: AuditResult,
    ) -> DriftReport:
        """Compare two audit results to detect fairness drift.

        Args:
            baseline: The reference audit result (e.g., from deployment time).
            current: The latest audit result.

        Returns:
            DriftReport with per-metric drift analysis.
        """
        # Build lookup for baseline metrics
        baseline_metrics = {m.metric_name: m for m in baseline.metric_results}

        drifts = []
        for current_metric in current.metric_results:
            baseline_metric = baseline_metrics.get(current_metric.metric_name)
            if baseline_metric is None:
                continue

            abs_change = current_metric.disparity - baseline_metric.disparity
            rel_change = (
                abs_change / baseline_metric.disparity
                if baseline_metric.disparity > 0
                else float("inf") if abs_change > 0 else 0.0
            )

            direction = "degrading" if abs_change > 0 else "improving"

            abs_abs_change = abs(abs_change)
            if abs_abs_change >= self.severe_threshold:
                severity = DriftSeverity.SEVERE
            elif abs_abs_change >= self.moderate_threshold:
                severity = DriftSeverity.MODERATE
            elif abs_abs_change >= self.minor_threshold:
                severity = DriftSeverity.MINOR
            else:
                severity = DriftSeverity.NONE

            drifts.append(DriftResult(
                metric_name=current_metric.metric_name,
                baseline_disparity=baseline_metric.disparity,
                current_disparity=current_metric.disparity,
                absolute_change=abs_change,
                relative_change=rel_change if np.isfinite(rel_change) else 0.0,
                severity=severity,
                direction=direction if severity != DriftSeverity.NONE else "stable",
            ))

        # Overall severity = worst across all metrics
        severities = [d.severity for d in drifts]
        if DriftSeverity.SEVERE in severities:
            overall = DriftSeverity.SEVERE
        elif DriftSeverity.MODERATE in severities:
            overall = DriftSeverity.MODERATE
        elif DriftSeverity.MINOR in severities:
            overall = DriftSeverity.MINOR
        else:
            overall = DriftSeverity.NONE

        degrading = sum(1 for d in drifts if d.direction == "degrading" and d.severity != DriftSeverity.NONE)
        improving = sum(1 for d in drifts if d.direction == "improving" and d.severity != DriftSeverity.NONE)
        stable = sum(1 for d in drifts if d.severity == DriftSeverity.NONE)

        return DriftReport(
            model_name=current.model_name,
            baseline_audit_id=baseline.audit_id,
            current_audit_id=current.audit_id,
            metric_drifts=tuple(drifts),
            overall_severity=overall,
            degrading_count=degrading,
            improving_count=improving,
            stable_count=stable,
        )
