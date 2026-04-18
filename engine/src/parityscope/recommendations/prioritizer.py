"""Issue prioritization engine.

Scores and ranks fairness findings by severity, regulatory risk,
and clinical impact to help teams focus on what matters most.
"""

from __future__ import annotations

import dataclasses
from dataclasses import dataclass, field
from enum import Enum
from typing import TYPE_CHECKING

from parityscope.audit.result import AuditResult, FairnessLevel, MetricResult
from parityscope.recommendations.mitigations import MitigationStrategy, get_mitigation_strategies

if TYPE_CHECKING:
    from parityscope.monitoring.store import MonitoringStore


class Severity(str, Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


@dataclass
class PrioritizedIssue:
    """A prioritized fairness finding with context and recommendations."""

    id: str
    severity: Severity
    title: str
    description: str
    affected_groups: list[str]
    affected_metric: str
    disparity: float
    regulatory_risk: str
    clinical_impact: str
    mitigation_strategies: list[MitigationStrategy]
    priority_score: float


# Regulatory risk scores by jurisdiction
_REGULATORY_WEIGHT = {
    "eu-ai-act": 25,
    "section-1557": 20,
    "south-korea": 15,
    "taiwan": 10,
}

# Clinical impact scores by metric type
_CLINICAL_WEIGHT = {
    "equal_opportunity": 25,
    "false_negative_rate_parity": 25,
    "false_positive_rate_parity": 20,
    "false_omission_rate_parity": 20,
    "equalized_odds": 20,
    "treatment_equality": 20,
    "predictive_parity": 15,
    "false_discovery_rate_parity": 15,
    "demographic_parity": 15,
    "accuracy_parity": 10,
    "negative_predictive_value_parity": 10,
    "specificity_parity": 10,
    "calibration_difference": 10,
    "well_calibration": 10,
    "score_distribution_difference": 5,
}

# Clinical impact descriptions
_CLINICAL_DESCRIPTIONS = {
    "equal_opportunity": "patients in group {min_group} are {pct:.0f}% less likely to be correctly identified when they have the condition",
    "false_negative_rate_parity": "patients in group {max_group} are {pct:.0f}% more likely to have their condition missed",
    "false_positive_rate_parity": "patients in group {max_group} are {pct:.0f}% more likely to receive unnecessary interventions",
    "equalized_odds": "both missed diagnoses and false alarms differ significantly across groups",
    "demographic_parity": "positive prediction rates differ by {pct:.0f} percentage points across groups",
    "predictive_parity": "a positive prediction is {pct:.0f}% less reliable for group {min_group}",
    "accuracy_parity": "overall accuracy differs by {pct:.0f} percentage points across groups",
    "treatment_equality": "the balance of errors (missed vs. false) differs across groups",
    "false_discovery_rate_parity": "false alarm burden is unevenly distributed across groups",
    "false_omission_rate_parity": "negative predictions are less trustworthy for certain groups",
    "calibration_difference": "predicted risk probabilities are less accurate for certain groups",
}


def prioritize_findings(
    result: AuditResult,
    root_cause_report: object | None = None,
    use_ai: bool = False,
    store: "MonitoringStore | None" = None,
    model_name: str | None = None,
) -> list[PrioritizedIssue]:
    """Prioritize fairness findings by severity and impact.

    Args:
        result: Audit result with metric evaluations.
        root_cause_report: Optional root cause report for additional context.

    Returns:
        List of PrioritizedIssue sorted by priority_score descending.
    """
    issues: list[PrioritizedIssue] = []
    issue_counter = 0

    # Score unfair and marginal metrics
    for metric in result.metric_results:
        if metric.fairness_level == FairnessLevel.FAIR:
            continue

        issue_counter += 1

        # Extract metric base name (strip attribute prefix)
        parts = metric.metric_name.split(":")
        attr = parts[0] if len(parts) > 1 else ""
        metric_base = parts[-1]

        # 1. Disparity magnitude (0-30 points)
        disp_score = min(30.0, metric.disparity * 60)

        # 2. Regulatory weight (0-25 points)
        reg_score = float(_REGULATORY_WEIGHT.get(result.jurisdiction or "", 5))

        # 3. Clinical impact (0-25 points)
        clinical_score = float(_CLINICAL_WEIGHT.get(metric_base, 10))

        # 4. Number of affected groups (0-10 points)
        n_groups = len(metric.group_results)
        group_score = 10.0 if n_groups >= 3 else 5.0

        # 5. Root cause severity (0-10 points)
        rc_score = 0.0
        if root_cause_report is not None and hasattr(root_cause_report, "critical_findings"):
            if root_cause_report.critical_findings:
                rc_score = 10.0

        priority = disp_score + reg_score + clinical_score + group_score + rc_score

        # Determine severity
        if priority >= 75:
            severity = Severity.CRITICAL
        elif priority >= 50:
            severity = Severity.HIGH
        elif priority >= 25:
            severity = Severity.MEDIUM
        else:
            severity = Severity.LOW

        # Build affected groups list
        affected = [g.group_label for g in metric.group_results]
        min_group = min(metric.group_results, key=lambda g: g.rate).group_label if metric.group_results else ""
        max_group = max(metric.group_results, key=lambda g: g.rate).group_label if metric.group_results else ""

        # Generate title
        title = f"{severity.value.capitalize()} {attr} disparity in {metric.display_name}"

        # Generate clinical impact description
        pct = metric.disparity * 100
        template = _CLINICAL_DESCRIPTIONS.get(
            metric_base,
            "disparity of {pct:.0f} percentage points detected across groups"
        )
        clinical_impact = template.format(
            min_group=min_group, max_group=max_group, pct=pct,
        )

        # Regulatory risk description
        if result.jurisdiction == "eu-ai-act":
            regulatory_risk = (
                f"EU AI Act Article 15 violation — potential penalty up to "
                f"EUR 35 million or 7% of global annual turnover"
            )
        elif result.jurisdiction == "section-1557":
            regulatory_risk = (
                "Section 1557 disparate impact — risk of federal funding loss "
                "and civil penalties"
            )
        elif result.jurisdiction == "south-korea":
            regulatory_risk = "South Korea AI Framework Act — regulatory enforcement"
        elif result.jurisdiction == "taiwan":
            regulatory_risk = "Taiwan AI Basic Act — non-discrimination requirement"
        else:
            regulatory_risk = "Unregulated — but industry best practice recommends remediation"

        # Get mitigation strategies
        strategies = get_mitigation_strategies(metric_base, metric.disparity)

        # Build description
        rates_desc = ", ".join(
            f"{g.group_label}: {g.rate:.2f}" for g in metric.group_results
        )
        description = (
            f"Disparity of {metric.disparity:.4f} detected in "
            f"{metric.display_name} (threshold: {metric.threshold:.4f}). "
            f"Per-group rates: {rates_desc}."
        )

        issues.append(PrioritizedIssue(
            id=f"ISSUE-{issue_counter:03d}",
            severity=severity,
            title=title,
            description=description,
            affected_groups=affected,
            affected_metric=metric.metric_name,
            disparity=metric.disparity,
            regulatory_risk=regulatory_risk,
            clinical_impact=clinical_impact,
            mitigation_strategies=strategies[:5],
            priority_score=round(priority, 1),
        ))

    # AI-powered re-ranking of mitigation strategies (optional)
    if use_ai:
        try:
            from parityscope.ai.recommendations import rank_strategies_ml
            reranked: list[PrioritizedIssue] = []
            for issue in issues:
                ranked = rank_strategies_ml(
                    issue, root_cause_report, store, model_name
                )
                reranked.append(
                    dataclasses.replace(issue, mitigation_strategies=ranked)
                )
            issues = reranked
        except ImportError:
            pass

    issues.sort(key=lambda i: i.priority_score, reverse=True)
    return issues
