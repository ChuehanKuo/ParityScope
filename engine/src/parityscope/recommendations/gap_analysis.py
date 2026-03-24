"""Compliance gap analysis.

Evaluates audit results against regulatory requirements and produces
a remediation plan with prioritized action items.
"""

from __future__ import annotations

from dataclasses import dataclass, field

from parityscope.audit.result import AuditResult, FairnessLevel
from parityscope.regulations.mapping import (
    get_compliance_requirements,
    get_jurisdiction_profile,
)


@dataclass
class RemediationItem:
    """A single remediation action item."""

    requirement: str
    article: str
    current_status: str  # PASS, FAIL, PARTIAL, NOT_ASSESSED
    gap_description: str
    needed_action: str
    estimated_effort: str
    priority: int
    deadline_risk: str


@dataclass
class ComplianceGapReport:
    """Complete compliance gap analysis."""

    jurisdiction: str
    jurisdiction_name: str
    enforcement_date: str | None
    penalty_description: str
    passing: list[RemediationItem]
    failing: list[RemediationItem]
    partial: list[RemediationItem]
    not_assessed: list[RemediationItem]
    overall_compliance_score: float
    remediation_timeline: list[RemediationItem]
    summary: str

    def to_dict(self) -> dict:
        """Serialize to JSON-compatible dict."""
        def _item_to_dict(item: RemediationItem) -> dict:
            return {
                "requirement": item.requirement,
                "article": item.article,
                "current_status": item.current_status,
                "gap_description": item.gap_description,
                "needed_action": item.needed_action,
                "estimated_effort": item.estimated_effort,
                "priority": item.priority,
                "deadline_risk": item.deadline_risk,
            }

        return {
            "jurisdiction": self.jurisdiction,
            "jurisdiction_name": self.jurisdiction_name,
            "enforcement_date": self.enforcement_date,
            "penalty_description": self.penalty_description,
            "overall_compliance_score": self.overall_compliance_score,
            "summary": self.summary,
            "passing": [_item_to_dict(i) for i in self.passing],
            "failing": [_item_to_dict(i) for i in self.failing],
            "partial": [_item_to_dict(i) for i in self.partial],
            "not_assessed": [_item_to_dict(i) for i in self.not_assessed],
            "remediation_timeline": [_item_to_dict(i) for i in self.remediation_timeline],
        }


def analyze_compliance_gaps(result: AuditResult) -> ComplianceGapReport:
    """Analyze compliance gaps based on audit results.

    Maps audit findings to regulatory requirements and determines
    which are met, which fail, and what remediation is needed.

    Args:
        result: The completed audit result.

    Returns:
        ComplianceGapReport with status for each requirement.
    """
    jurisdiction = result.jurisdiction
    if not jurisdiction:
        return _empty_report()

    try:
        profile = get_jurisdiction_profile(jurisdiction)
        requirements = get_compliance_requirements(jurisdiction)
    except ValueError:
        return _empty_report()

    passing: list[RemediationItem] = []
    failing: list[RemediationItem] = []
    partial: list[RemediationItem] = []
    not_assessed: list[RemediationItem] = []

    n_unfair = len(result.unfair_metrics)
    n_marginal = len(result.marginal_metrics)
    n_total = len(result.metric_results)

    for req in requirements:
        article_lower = req.article.lower()
        req_lower = req.requirement.lower()

        # Assess status based on article and audit results
        status, gap, action, effort, priority = _assess_requirement(
            req.article, req.requirement, req.description,
            result, n_unfair, n_marginal, n_total,
        )

        deadline_risk = ""
        if profile.enforcement_date:
            deadline_risk = (
                f"Must be resolved before {profile.name} enforcement "
                f"({profile.enforcement_date})"
            )

        item = RemediationItem(
            requirement=req.requirement,
            article=req.article,
            current_status=status,
            gap_description=gap,
            needed_action=action,
            estimated_effort=effort,
            priority=priority,
            deadline_risk=deadline_risk,
        )

        if status == "PASS":
            passing.append(item)
        elif status == "FAIL":
            failing.append(item)
        elif status == "PARTIAL":
            partial.append(item)
        else:
            not_assessed.append(item)

    # Calculate compliance score
    total_items = len(passing) + len(failing) + len(partial) + len(not_assessed)
    if total_items > 0:
        score = (len(passing) + 0.5 * len(partial)) / total_items * 100
    else:
        score = 0.0

    # Build remediation timeline (failing first, then partial)
    timeline = sorted(failing + partial, key=lambda i: i.priority)

    # Summary
    summary = _build_summary(
        profile, passing, failing, partial, not_assessed, n_unfair, score
    )

    return ComplianceGapReport(
        jurisdiction=jurisdiction,
        jurisdiction_name=profile.name,
        enforcement_date=profile.enforcement_date,
        penalty_description=profile.penalty_description,
        passing=passing,
        failing=failing,
        partial=partial,
        not_assessed=not_assessed,
        overall_compliance_score=round(score, 1),
        remediation_timeline=timeline,
        summary=summary,
    )


def _assess_requirement(
    article: str,
    requirement: str,
    description: str,
    result: AuditResult,
    n_unfair: int,
    n_marginal: int,
    n_total: int,
) -> tuple[str, str, str, str, int]:
    """Assess a single requirement's status."""
    article_lower = article.lower()
    req_lower = requirement.lower()

    # Risk management (Article 9 or similar)
    if "risk" in req_lower and "management" in req_lower:
        if n_unfair == 0:
            return (
                "PASS",
                "Risk assessment completed with no unfair metrics.",
                "None required.",
                "0 weeks",
                5,
            )
        else:
            return (
                "PARTIAL",
                f"Risk assessment completed but {n_unfair} unfair metrics identified.",
                "Document risk mitigation plan for identified fairness failures.",
                "2-4 weeks",
                2,
            )

    # Data governance (Article 10 or similar)
    if "data" in req_lower and "governance" in req_lower:
        small_groups = sum(
            1 for k, v in result.group_counts.items() if v < 30
        )
        if small_groups > 0:
            return (
                "PARTIAL",
                f"{small_groups} demographic group(s) have insufficient sample sizes.",
                "Improve data collection for underrepresented groups and document data governance procedures.",
                "4-8 weeks",
                2,
            )
        return (
            "PASS",
            "Adequate sample sizes across all demographic groups.",
            "None required.",
            "0 weeks",
            5,
        )

    # Accuracy and robustness (Article 15 or similar)
    if "accuracy" in req_lower or "robustness" in req_lower:
        if result.overall_fairness == FairnessLevel.FAIR:
            return (
                "PASS",
                "All fairness metrics within acceptable thresholds.",
                "None required.",
                "0 weeks",
                5,
            )
        elif result.overall_fairness == FairnessLevel.MARGINAL:
            return (
                "PARTIAL",
                f"{n_marginal} metrics in marginal range.",
                "Review marginal metrics and implement monitoring.",
                "2-4 weeks",
                3,
            )
        else:
            return (
                "FAIL",
                f"{n_unfair} of {n_total} fairness metrics exceed unfairness threshold.",
                "Implement bias mitigation (threshold adjustment, retraining, or data improvement).",
                "4-8 weeks",
                1,
            )

    # Transparency (Article 13 or similar)
    if "transparency" in req_lower:
        return (
            "PASS",
            "Fairness audit report provides transparent documentation of model behavior.",
            "None required — this audit satisfies transparency requirements.",
            "0 weeks",
            5,
        )

    # Post-market monitoring (Article 61 or similar)
    if "monitor" in req_lower or "post-market" in req_lower:
        return (
            "NOT_ASSESSED",
            "Continuous monitoring not yet established — this audit is a point-in-time assessment.",
            "Implement continuous fairness monitoring with automated drift detection.",
            "6-12 weeks",
            3,
        )

    # Impact assessment
    if "impact" in req_lower and "assessment" in req_lower:
        if n_unfair == 0:
            return ("PASS", "Impact assessment completed.", "None required.", "0 weeks", 5)
        return (
            "PARTIAL",
            "Impact assessment reveals fairness concerns.",
            "Complete remediation of identified disparities.",
            "4-8 weeks",
            2,
        )

    # Non-discrimination / disparate impact
    if "discrimination" in req_lower or "disparate" in req_lower:
        if result.overall_fairness == FairnessLevel.FAIR:
            return ("PASS", "No discriminatory outcomes detected.", "None required.", "0 weeks", 5)
        return (
            "FAIL",
            f"Disparate impact detected: {n_unfair} metrics show unfair outcomes.",
            "Address identified disparities and document justification for any remaining differences.",
            "4-8 weeks",
            1,
        )

    # Default
    return (
        "NOT_ASSESSED",
        "This requirement could not be automatically assessed from audit results.",
        "Manual review required.",
        "TBD",
        4,
    )


def _build_summary(
    profile, passing, failing, partial, not_assessed, n_unfair, score,
) -> str:
    """Build human-readable summary."""
    total = len(passing) + len(failing) + len(partial) + len(not_assessed)

    summary = (
        f"Under {profile.name}, {len(passing)} of {total} requirements are met. "
    )

    if failing:
        fail_articles = ", ".join(f.article for f in failing)
        summary += (
            f"{len(failing)} requirement(s) FAIL ({fail_articles}) "
            f"due to {n_unfair} unfair fairness metrics. "
        )

    if partial:
        summary += f"{len(partial)} requirement(s) are PARTIALLY met. "

    if not_assessed:
        summary += f"{len(not_assessed)} requirement(s) require manual assessment. "

    # Effort estimate
    efforts = []
    for item in failing + partial:
        if "week" in item.estimated_effort:
            try:
                nums = [int(s) for s in item.estimated_effort.split() if s.isdigit()]
                efforts.extend(nums)
            except ValueError:
                pass

    if efforts:
        summary += f"Estimated total remediation: {min(efforts)}-{max(efforts)} weeks. "

    if profile.enforcement_date:
        summary += f"Enforcement deadline: {profile.enforcement_date}."

    return summary


def _empty_report() -> ComplianceGapReport:
    """Return an empty report when no jurisdiction is specified."""
    return ComplianceGapReport(
        jurisdiction="none",
        jurisdiction_name="No jurisdiction specified",
        enforcement_date=None,
        penalty_description="N/A",
        passing=[],
        failing=[],
        partial=[],
        not_assessed=[],
        overall_compliance_score=0.0,
        remediation_timeline=[],
        summary="No jurisdiction specified. Run audit with --jurisdiction to get compliance analysis.",
    )
