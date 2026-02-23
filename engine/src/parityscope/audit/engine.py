"""FairnessAudit — the main orchestrator for running fairness evaluations.

Usage:
    from parityscope import FairnessAudit

    audit = FairnessAudit(
        model_name="sepsis_risk_v2",
        protected_attributes=["race", "sex"],
        jurisdiction="eu-ai-act",
        clinical_domain="risk_stratification",
    )
    result = audit.run(
        y_true=labels,
        y_pred=predictions,
        demographics=demographics_df,
    )
"""

from __future__ import annotations

import uuid
from datetime import datetime, timezone

import numpy as np
import pandas as pd

from parityscope.audit.result import (
    AuditResult,
    FairnessLevel,
    GroupResult,
    MetricResult,
)
from parityscope.data.validation import validate_audit_inputs
from parityscope.metrics.registry import InputType, get_metric, list_metrics
from parityscope.regulations.mapping import get_recommended_metrics


# Default thresholds for fairness assessment
DEFAULT_THRESHOLDS = {
    "fair": 0.05,  # Disparity <= 5%  -> FAIR
    "marginal": 0.10,  # Disparity <= 10% -> MARGINAL
    # Above marginal -> UNFAIR
}


class FairnessAudit:
    """Orchestrates a complete fairness audit for a clinical AI model.

    Args:
        model_name: Identifier for the model being audited.
        protected_attributes: List of demographic attributes to evaluate
            (e.g., ["race", "sex", "age_group"]).
        jurisdiction: Regulatory jurisdiction for metric selection
            (e.g., "eu-ai-act", "south-korea", "taiwan", "section-1557").
        clinical_domain: Clinical use case for metric relevance
            (e.g., "diagnosis", "risk_stratification", "treatment_recommendation").
        metrics: Explicit list of metric names to compute. If None, uses
            regulation-aware defaults.
        thresholds: Custom thresholds for fairness levels. Keys: "fair", "marginal".
    """

    def __init__(
        self,
        model_name: str,
        protected_attributes: list[str],
        jurisdiction: str | None = None,
        clinical_domain: str | None = None,
        metrics: list[str] | None = None,
        thresholds: dict[str, float] | None = None,
    ):
        self.model_name = model_name
        self.protected_attributes = protected_attributes
        self.jurisdiction = jurisdiction
        self.clinical_domain = clinical_domain
        self.thresholds = {**DEFAULT_THRESHOLDS, **(thresholds or {})}

        if metrics is not None:
            self._metric_names = metrics
        elif jurisdiction is not None:
            self._metric_names = get_recommended_metrics(
                jurisdiction=jurisdiction,
                clinical_domain=clinical_domain,
            )
        else:
            # Default: all binary classification metrics
            self._metric_names = [m.name for m in list_metrics(input_type=InputType.BINARY)]

    def run(
        self,
        y_true: np.ndarray | list,
        y_pred: np.ndarray | list,
        demographics: pd.DataFrame | dict[str, np.ndarray | list],
        y_score: np.ndarray | list | None = None,
    ) -> AuditResult:
        """Execute the fairness audit.

        Args:
            y_true: Ground truth binary labels (0/1).
            y_pred: Model binary predictions (0/1).
            demographics: DataFrame or dict mapping attribute names to group arrays.
                Must contain columns/keys for each protected_attribute.
            y_score: Optional continuous probability scores for calibration metrics.

        Returns:
            AuditResult with all metric evaluations.
        """
        y_true_arr = np.asarray(y_true, dtype=int)
        y_pred_arr = np.asarray(y_pred, dtype=int)
        y_score_arr = np.asarray(y_score, dtype=float) if y_score is not None else None

        if isinstance(demographics, dict):
            demographics = pd.DataFrame(demographics)

        validate_audit_inputs(
            y_true=y_true_arr,
            y_pred=y_pred_arr,
            demographics=demographics,
            protected_attributes=self.protected_attributes,
            y_score=y_score_arr,
        )

        all_metric_results: list[MetricResult] = []

        for attr in self.protected_attributes:
            groups = np.asarray(demographics[attr])

            for metric_name in self._metric_names:
                metric_info = get_metric(metric_name)

                # Skip score-based metrics if no scores provided
                if metric_info.input_type == InputType.SCORE and y_score_arr is None:
                    continue

                # Compute metric
                if metric_info.input_type == InputType.SCORE:
                    raw_result = metric_info.compute_fn(y_true_arr, y_score_arr, groups)
                else:
                    raw_result = metric_info.compute_fn(y_true_arr, y_pred_arr, groups)

                disparity = float(raw_result["disparity"])

                # Determine fairness level
                if disparity <= self.thresholds["fair"]:
                    level = FairnessLevel.FAIR
                elif disparity <= self.thresholds["marginal"]:
                    level = FairnessLevel.MARGINAL
                else:
                    level = FairnessLevel.UNFAIR

                # Build group results
                group_results = self._extract_group_results(raw_result, groups)

                result = MetricResult(
                    metric_name=f"{attr}:{metric_name}",
                    display_name=f"{metric_info.display_name} ({attr})",
                    disparity=disparity,
                    fairness_level=level,
                    group_results=tuple(group_results),
                    threshold=self.thresholds["marginal"],
                    details={k: v for k, v in raw_result.items() if k != "disparity"},
                )
                all_metric_results.append(result)

        # Overall fairness: worst across all metrics
        if any(m.fairness_level == FairnessLevel.UNFAIR for m in all_metric_results):
            overall = FairnessLevel.UNFAIR
        elif any(m.fairness_level == FairnessLevel.MARGINAL for m in all_metric_results):
            overall = FairnessLevel.MARGINAL
        else:
            overall = FairnessLevel.FAIR

        # Group counts per attribute
        group_counts: dict[str, int] = {}
        for attr in self.protected_attributes:
            unique, counts = np.unique(demographics[attr], return_counts=True)
            for g, c in zip(unique, counts):
                group_counts[f"{attr}:{g}"] = int(c)

        return AuditResult(
            audit_id=str(uuid.uuid4()),
            model_name=self.model_name,
            timestamp=datetime.now(timezone.utc).isoformat(),
            protected_attributes=tuple(self.protected_attributes),
            metrics_evaluated=tuple(self._metric_names),
            jurisdiction=self.jurisdiction,
            clinical_domain=self.clinical_domain,
            thresholds=dict(self.thresholds),
            metric_results=tuple(all_metric_results),
            overall_fairness=overall,
            total_samples=len(y_true_arr),
            group_counts=group_counts,
        )

    @staticmethod
    def _extract_group_results(
        raw_result: dict[str, object], groups: np.ndarray
    ) -> list[GroupResult]:
        """Extract per-group results from a metric computation."""
        # Look for group_rates, tpr_rates, group_ratios, etc.
        group_data = None
        for key in ("group_rates", "tpr_rates", "group_ratios", "group_calibration_errors",
                     "group_brier_scores"):
            if key in raw_result:
                group_data = raw_result[key]
                break

        if group_data is None or not isinstance(group_data, dict):
            return []

        unique_groups, counts = np.unique(groups, return_counts=True)
        count_map = {str(g): int(c) for g, c in zip(unique_groups, counts)}

        return [
            GroupResult(
                group_label=str(g),
                rate=float(r) if np.isfinite(r) else float(r),
                sample_size=count_map.get(str(g), 0),
            )
            for g, r in group_data.items()
        ]
