"""Tests for parityscope.recommendations — prioritization, mitigations, tradeoffs, compliance."""

import pytest

from parityscope.audit.result import AuditResult, FairnessLevel, GroupResult, MetricResult
from parityscope.recommendations.prioritizer import (
    PrioritizedIssue,
    Severity,
    prioritize_findings,
)
from parityscope.recommendations.mitigations import (
    MitigationStrategy,
    get_mitigation_strategies,
)
from parityscope.recommendations.tradeoffs import TradeoffAnalysis, analyze_tradeoffs
from parityscope.recommendations.gap_analysis import (
    ComplianceGapReport,
    analyze_compliance_gaps,
)


class TestPrioritizeFindings:
    """Tests for prioritize_findings."""

    def test_returns_prioritized_issues(self, sample_audit_result):
        issues = prioritize_findings(sample_audit_result)
        assert isinstance(issues, list)
        for issue in issues:
            assert isinstance(issue, PrioritizedIssue)
            assert issue.priority_score > 0

    def test_sorted_by_priority(self, sample_audit_result):
        issues = prioritize_findings(sample_audit_result)
        if len(issues) > 1:
            scores = [i.priority_score for i in issues]
            assert scores == sorted(scores, reverse=True)

    def test_severity_levels_valid(self, sample_audit_result):
        issues = prioritize_findings(sample_audit_result)
        for issue in issues:
            assert issue.severity in (Severity.CRITICAL, Severity.HIGH, Severity.MEDIUM, Severity.LOW)

    def test_fair_result_no_issues(self):
        """A fully fair result should produce no prioritized issues."""
        result = AuditResult(
            audit_id="test-001",
            model_name="fair_model",
            timestamp="2025-01-01T00:00:00",
            protected_attributes=("race",),
            metrics_evaluated=("demographic_parity",),
            jurisdiction="eu-ai-act",
            clinical_domain="diagnosis",
            thresholds={"fair": 0.05, "marginal": 0.10},
            metric_results=(
                MetricResult(
                    metric_name="race:demographic_parity",
                    display_name="Demographic Parity (race)",
                    disparity=0.02,
                    fairness_level=FairnessLevel.FAIR,
                    group_results=(
                        GroupResult("A", 0.50, 100),
                        GroupResult("B", 0.52, 100),
                    ),
                    threshold=0.10,
                ),
            ),
            overall_fairness=FairnessLevel.FAIR,
            total_samples=200,
            group_counts={"A": 100, "B": 100},
        )
        issues = prioritize_findings(result)
        assert len(issues) == 0

    def test_regulatory_risk_description(self, sample_audit_result):
        issues = prioritize_findings(sample_audit_result)
        for issue in issues:
            assert len(issue.regulatory_risk) > 0

    def test_mitigation_strategies_included(self, sample_audit_result):
        issues = prioritize_findings(sample_audit_result)
        for issue in issues:
            assert isinstance(issue.mitigation_strategies, list)


class TestGetMitigationStrategies:
    """Tests for get_mitigation_strategies."""

    def test_returns_strategies_for_equal_opportunity(self):
        strategies = get_mitigation_strategies("equal_opportunity", 0.15)
        assert len(strategies) > 0
        assert all(isinstance(s, MitigationStrategy) for s in strategies)

    def test_returns_strategies_for_calibration(self):
        strategies = get_mitigation_strategies("calibration_difference", 0.10)
        assert len(strategies) > 0

    def test_strips_attribute_prefix(self):
        s1 = get_mitigation_strategies("race:equal_opportunity", 0.15)
        s2 = get_mitigation_strategies("equal_opportunity", 0.15)
        assert len(s1) == len(s2)

    def test_sorted_by_difficulty(self):
        strategies = get_mitigation_strategies("demographic_parity")
        difficulty_order = {"low": 0, "medium": 1, "high": 2}
        diffs = [difficulty_order[s.difficulty] for s in strategies]
        assert diffs == sorted(diffs)

    def test_unknown_metric_returns_empty(self):
        strategies = get_mitigation_strategies("nonexistent_metric_xyz")
        assert strategies == []

    def test_root_cause_prioritization(self):
        strategies = get_mitigation_strategies(
            "equal_opportunity", 0.15,
            root_cause_findings={"has_proxy_variables": True},
        )
        assert len(strategies) > 0


class TestAnalyzeTradeoffs:
    """Tests for analyze_tradeoffs."""

    def test_generates_estimates_without_simulation(self, sample_audit_result):
        analyses = analyze_tradeoffs(sample_audit_result)
        assert isinstance(analyses, list)
        for a in analyses:
            assert isinstance(a, TradeoffAnalysis)
            assert a.net_benefit_score is not None

    def test_sorted_by_net_benefit(self, sample_audit_result):
        analyses = analyze_tradeoffs(sample_audit_result)
        if len(analyses) > 1:
            scores = [a.net_benefit_score for a in analyses]
            assert scores == sorted(scores, reverse=True)

    def test_with_simulation_results(self, sample_audit_result):
        sim_results = [
            {
                "intervention": "threshold_adjustment",
                "target_metric": "race:equal_opportunity",
                "baseline": {"disparity": 0.15},
                "optimized": {"disparity": 0.05},
                "improvement": {
                    "disparity_reduction": 0.10,
                    "accuracy_change": -0.02,
                },
            },
        ]
        analyses = analyze_tradeoffs(sample_audit_result, simulation_results=sim_results)
        assert len(analyses) > 0
        assert analyses[0].intervention == "Threshold Adjustment"


class TestAnalyzeComplianceGaps:
    """Tests for analyze_compliance_gaps."""

    def test_eu_ai_act_compliance(self, sample_audit_result):
        report = analyze_compliance_gaps(sample_audit_result)
        assert isinstance(report, ComplianceGapReport)
        assert report.jurisdiction == "eu-ai-act"
        assert 0 <= report.overall_compliance_score <= 100

    def test_has_all_categories(self, sample_audit_result):
        report = analyze_compliance_gaps(sample_audit_result)
        # Should have at least some items categorized
        total = len(report.passing) + len(report.failing) + len(report.partial) + len(report.not_assessed)
        assert total > 0

    def test_remediation_timeline(self, sample_audit_result):
        report = analyze_compliance_gaps(sample_audit_result)
        assert isinstance(report.remediation_timeline, list)

    def test_to_dict(self, sample_audit_result):
        report = analyze_compliance_gaps(sample_audit_result)
        d = report.to_dict()
        assert "jurisdiction" in d
        assert "overall_compliance_score" in d
        assert "passing" in d
        assert "failing" in d

    def test_no_jurisdiction_returns_empty(self):
        result = AuditResult(
            audit_id="test-001",
            model_name="model",
            timestamp="2025-01-01T00:00:00",
            protected_attributes=("race",),
            metrics_evaluated=("demographic_parity",),
            jurisdiction=None,
            clinical_domain=None,
            thresholds={"fair": 0.05, "marginal": 0.10},
            metric_results=(),
            overall_fairness=FairnessLevel.FAIR,
            total_samples=100,
            group_counts={},
        )
        report = analyze_compliance_gaps(result)
        assert report.jurisdiction == "none"
        assert report.overall_compliance_score == 0.0
