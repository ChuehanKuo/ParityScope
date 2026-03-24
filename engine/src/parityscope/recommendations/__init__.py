"""Actionable recommendations for fairness improvements."""

from parityscope.recommendations.prioritizer import prioritize_findings, PrioritizedIssue, Severity
from parityscope.recommendations.mitigations import get_mitigation_strategies, MitigationStrategy
from parityscope.recommendations.tradeoffs import analyze_tradeoffs, TradeoffAnalysis
from parityscope.recommendations.gap_analysis import (
    analyze_compliance_gaps, ComplianceGapReport, RemediationItem,
)

__all__ = [
    "prioritize_findings", "PrioritizedIssue", "Severity",
    "get_mitigation_strategies", "MitigationStrategy",
    "analyze_tradeoffs", "TradeoffAnalysis",
    "analyze_compliance_gaps", "ComplianceGapReport", "RemediationItem",
]
