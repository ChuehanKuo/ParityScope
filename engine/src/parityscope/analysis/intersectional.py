"""Intersectional fairness analysis.

Evaluates fairness across combinations of protected attributes.
A model may be fair for women overall and fair for Black patients overall,
but discriminate against Black women specifically. This module catches
those compounding disparities.
"""

from __future__ import annotations

from itertools import combinations

import numpy as np
import pandas as pd

from parityscope.audit.engine import FairnessAudit
from parityscope.audit.result import AuditResult, FairnessLevel, GroupResult, MetricResult


def intersectional_audit(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    demographics: pd.DataFrame,
    attributes: list[str],
    model_name: str = "model",
    jurisdiction: str | None = None,
    clinical_domain: str | None = None,
    metrics: list[str] | None = None,
    y_score: np.ndarray | None = None,
    max_combination_size: int = 3,
    min_group_size: int = 30,
) -> dict:
    """Run intersectional fairness analysis across attribute combinations.

    Evaluates fairness for each individual attribute AND for combinations
    of attributes (e.g., race x sex, race x age_group, race x sex x age_group).

    Args:
        y_true: Ground truth binary labels.
        y_pred: Model binary predictions.
        demographics: DataFrame with demographic columns.
        attributes: List of protected attribute column names.
        model_name: Model identifier.
        jurisdiction: Optional regulatory jurisdiction.
        clinical_domain: Optional clinical use case.
        metrics: Optional explicit metric list. If None, uses defaults.
        y_score: Optional probability scores.
        max_combination_size: Maximum number of attributes to combine (2 or 3).
        min_group_size: Minimum samples in a group to include in analysis.

    Returns:
        Dictionary with:
        - individual_audits: Per-attribute audit results
        - intersectional_audits: Combined-attribute audit results
        - worst_groups: Groups with the highest disparities
        - summary: Overall intersectional assessment
    """
    results = {
        "individual_audits": {},
        "intersectional_audits": {},
        "worst_groups": [],
        "summary": {},
    }

    # Individual attribute audits
    for attr in attributes:
        audit = FairnessAudit(
            model_name=model_name,
            protected_attributes=[attr],
            jurisdiction=jurisdiction,
            clinical_domain=clinical_domain,
            metrics=metrics,
        )
        result = audit.run(
            y_true=y_true,
            y_pred=y_pred,
            demographics=demographics,
            y_score=y_score,
        )
        results["individual_audits"][attr] = result.to_dict()

    # Intersectional combinations
    for combo_size in range(2, min(max_combination_size + 1, len(attributes) + 1)):
        for combo in combinations(attributes, combo_size):
            combo_name = " x ".join(combo)

            # Create combined attribute column
            combined = demographics[list(combo)].apply(
                lambda row: " | ".join(str(v) for v in row),
                axis=1,
            )

            # Filter groups below minimum size
            group_counts = combined.value_counts()
            valid_groups = group_counts[group_counts >= min_group_size].index
            mask = combined.isin(valid_groups)

            if mask.sum() < 100 or len(valid_groups) < 2:
                continue

            # Create temp demographics with combined column
            temp_demo = pd.DataFrame({"_intersect": combined[mask]})

            audit = FairnessAudit(
                model_name=model_name,
                protected_attributes=["_intersect"],
                jurisdiction=jurisdiction,
                clinical_domain=clinical_domain,
                metrics=metrics,
            )

            try:
                result = audit.run(
                    y_true=y_true[mask],
                    y_pred=y_pred[mask],
                    demographics=temp_demo,
                    y_score=y_score[mask] if y_score is not None else None,
                )
                results["intersectional_audits"][combo_name] = result.to_dict()
            except Exception:
                # Skip combinations that fail validation
                continue

    # Find worst groups across all analyses
    worst_groups = []
    for audit_name, audit_dict in {
        **results["individual_audits"],
        **results["intersectional_audits"],
    }.items():
        for m in audit_dict.get("metric_results", []):
            if m["fairness_level"] == "unfair":
                group_results = m.get("group_results", [])
                if group_results:
                    rates = [g["rate"] for g in group_results]
                    min_group = min(group_results, key=lambda g: g["rate"])
                    max_group = max(group_results, key=lambda g: g["rate"])
                    worst_groups.append({
                        "analysis": audit_name,
                        "metric": m["display_name"],
                        "disparity": m["disparity"],
                        "worst_group": min_group["group"],
                        "worst_rate": min_group["rate"],
                        "best_group": max_group["group"],
                        "best_rate": max_group["rate"],
                    })

    # Sort by disparity descending
    worst_groups.sort(key=lambda x: x["disparity"], reverse=True)
    results["worst_groups"] = worst_groups[:20]  # Top 20 worst

    # Summary
    total_individual_unfair = sum(
        1 for a in results["individual_audits"].values()
        if a.get("overall_fairness") == "unfair"
    )
    total_intersectional_unfair = sum(
        1 for a in results["intersectional_audits"].values()
        if a.get("overall_fairness") == "unfair"
    )

    results["summary"] = {
        "attributes_analyzed": attributes,
        "individual_analyses": len(results["individual_audits"]),
        "intersectional_analyses": len(results["intersectional_audits"]),
        "individual_unfair": total_individual_unfair,
        "intersectional_unfair": total_intersectional_unfair,
        "intersectional_only_failures": total_intersectional_unfair,
        "worst_disparity": worst_groups[0] if worst_groups else None,
    }

    return results
