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

import hashlib
import uuid
from datetime import datetime, timezone

import numpy as np
import pandas as pd

import parityscope
from parityscope.audit.result import (
    AuditResult,
    FairnessLevel,
    GroupResult,
    MetricResult,
)
from parityscope.data.validation import validate_audit_inputs
from parityscope.metrics.registry import InputType, get_metric, list_metrics
from parityscope.regulations.mapping import get_recommended_metrics

# Bumped manually when any jurisdiction profile in
# parityscope.regulations.mapping changes in a way that affects compliance
# conclusions (article citations, penalty tiers, enforcement dates, etc.).
REGULATION_PROFILE_VERSION = "2026-04-01"


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
        intersectional: If True, also run metrics on intersectional groups.
        max_intersection_depth: Max attributes to combine for intersections (default 2).
        bootstrap: If True, compute bootstrap confidence intervals for all metrics.
        n_bootstrap: Number of bootstrap iterations.
        bootstrap_ci: Confidence interval level (default 0.95).
    """

    def __init__(
        self,
        model_name: str,
        protected_attributes: list[str],
        jurisdiction: str | None = None,
        clinical_domain: str | None = None,
        metrics: list[str] | None = None,
        thresholds: dict[str, float] | None = None,
        intersectional: bool = False,
        max_intersection_depth: int = 2,
        bootstrap: bool = False,
        n_bootstrap: int = 1000,
        bootstrap_ci: float = 0.95,
        use_ai: bool = False,
    ):
        self.model_name = model_name
        self.protected_attributes = protected_attributes
        self.jurisdiction = jurisdiction
        self.clinical_domain = clinical_domain
        self.thresholds = {**DEFAULT_THRESHOLDS, **(thresholds or {})}
        self.intersectional = intersectional
        self.max_intersection_depth = max_intersection_depth
        self.bootstrap = bootstrap
        self.n_bootstrap = n_bootstrap
        self.bootstrap_ci = bootstrap_ci
        self.use_ai = use_ai

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

        # Canonical input hash for reproducibility / audit provenance.
        try:
            h = hashlib.sha256()
            h.update(np.ascontiguousarray(y_true_arr).tobytes())
            h.update(np.ascontiguousarray(y_pred_arr).tobytes())
            h.update(demographics.to_csv(index=False).encode("utf-8"))
            if y_score_arr is not None:
                h.update(np.ascontiguousarray(y_score_arr).tobytes())
            input_hash: str | None = h.hexdigest()
        except Exception:
            input_hash = None

        all_metric_results: list[MetricResult] = []
        ci_data: dict[str, dict] = {}

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

                # Build details dict
                details = {k: v for k, v in raw_result.items() if k != "disparity"}

                # Bootstrap confidence intervals
                if self.bootstrap:
                    try:
                        from parityscope.metrics.bootstrap import bootstrap_metric
                        input_arr = (
                            y_score_arr if metric_info.input_type == InputType.SCORE
                            else y_pred_arr
                        )
                        boot_result = bootstrap_metric(
                            metric_info.compute_fn, y_true_arr, input_arr, groups,
                            n_bootstrap=self.n_bootstrap, ci_level=self.bootstrap_ci,
                        )
                        details["ci_lower"] = boot_result.ci_lower
                        details["ci_upper"] = boot_result.ci_upper
                        details["standard_error"] = boot_result.standard_error
                        ci_key = f"{attr}:{metric_name}"
                        ci_data[ci_key] = {
                            "ci_lower": boot_result.ci_lower,
                            "ci_upper": boot_result.ci_upper,
                            "se": boot_result.standard_error,
                        }
                    except ImportError:
                        pass

                # Effect sizes
                if group_results:
                    try:
                        from parityscope.metrics.effect_size import compute_effect_sizes
                        rates = {g.group_label: g.rate for g in group_results}
                        sizes = {g.group_label: g.sample_size for g in group_results}
                        effect = compute_effect_sizes(rates, sizes)
                        details["effect_sizes"] = {
                            "cohens_d": effect.cohens_d,
                            "odds_ratio": effect.odds_ratio,
                            "risk_ratio": effect.risk_ratio,
                            "risk_difference": effect.risk_difference,
                            "interpretation": effect.interpretation,
                        }
                    except ImportError:
                        pass

                result = MetricResult(
                    metric_name=f"{attr}:{metric_name}",
                    display_name=f"{metric_info.display_name} ({attr})",
                    disparity=disparity,
                    fairness_level=level,
                    group_results=tuple(group_results),
                    threshold=self.thresholds["marginal"],
                    details=details,
                )
                all_metric_results.append(result)

        # Intersectional analysis
        intersectional_results = None
        if self.intersectional and len(self.protected_attributes) >= 2:
            try:
                from parityscope.audit.intersectional import run_intersectional_metrics
                metric_fns = []
                for mn in self._metric_names:
                    mi = get_metric(mn)
                    metric_fns.append((mn, mi.display_name, mi.compute_fn))

                inter_results = run_intersectional_metrics(
                    y_true=y_true_arr,
                    y_pred=y_pred_arr,
                    demographics=demographics,
                    attributes=self.protected_attributes,
                    metric_fns=metric_fns,
                    thresholds=self.thresholds,
                    y_score=y_score_arr,
                    max_depth=self.max_intersection_depth,
                )
                if inter_results:
                    intersectional_results = tuple(inter_results)
            except ImportError:
                pass

        # Subgroup discovery
        worst_subgroups = None
        try:
            from parityscope.audit.subgroup_discovery import (
                discover_worst_subgroups,
                subgroup_findings_to_dicts,
            )
            findings = discover_worst_subgroups(
                y_true=y_true_arr,
                y_pred=y_pred_arr,
                demographics=demographics,
                protected_attributes=self.protected_attributes,
            )
            if findings:
                worst_subgroups = tuple(subgroup_findings_to_dicts(findings))
        except ImportError:
            pass

        # AI-powered subgroup discovery (optional)
        if self.use_ai:
            try:
                from parityscope.ai.detection import discover_subgroups_ml
                from parityscope.audit.subgroup_discovery import (
                    subgroup_findings_to_dicts,
                )
                ai_findings = discover_subgroups_ml(
                    y_true_arr,
                    y_pred_arr,
                    demographics,
                    self.protected_attributes,
                )
                if ai_findings:
                    ai_dicts = subgroup_findings_to_dicts(ai_findings)
                    existing = list(worst_subgroups) if worst_subgroups else []
                    seen_labels = {
                        d.get("subgroup_label") for d in existing
                    }
                    for d in ai_dicts:
                        label = d.get("subgroup_label")
                        if label not in seen_labels:
                            existing.append(d)
                            seen_labels.add(label)
                    existing.sort(
                        key=lambda d: abs(d.get("deviation", 0.0)),
                        reverse=True,
                    )
                    worst_subgroups = tuple(existing) if existing else None
            except ImportError:
                pass

        # Sample adequacy
        sample_adequacy_data = None
        try:
            from parityscope.metrics.power import analyze_sample_adequacy
            power_results = analyze_sample_adequacy(
                demographics=demographics,
                protected_attributes=self.protected_attributes,
            )
            sample_adequacy_data = {
                pr.attribute: {
                    "overall_adequate": pr.overall_adequate,
                    "summary": pr.summary,
                    "groups": [
                        {
                            "group": sa.group_label,
                            "n": sa.sample_size,
                            "adequate": sa.is_adequate,
                            "min_detectable_effect": round(sa.minimum_detectable_effect, 4),
                        }
                        for sa in pr.group_results
                    ],
                }
                for pr in power_results
            }
        except ImportError:
            pass

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
            intersectional_results=intersectional_results,
            worst_subgroups=worst_subgroups,
            sample_adequacy=sample_adequacy_data,
            confidence_intervals=ci_data if ci_data else None,
            engine_version=getattr(parityscope, "__version__", ""),
            regulation_profile_version=REGULATION_PROFILE_VERSION,
            input_hash=input_hash,
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
