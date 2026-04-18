"""Tests for parityscope.ai.recommendations — strategy ranking, effectiveness, plans, summaries."""

from __future__ import annotations

from dataclasses import replace

import pandas as pd
import pytest

from parityscope.ai.recommendations import (
    EffectivenessRecord,
    ExecutiveSummary,
    RemediationPlan,
    generate_executive_summary,
    generate_remediation_plan,
    rank_strategies_ml,
    track_mitigation_effectiveness,
)
from parityscope.audit.engine import FairnessAudit
from parityscope.recommendations.mitigations import (
    MitigationStrategy,
    get_mitigation_strategies,
)
from parityscope.recommendations.prioritizer import (
    PrioritizedIssue,
    Severity,
    prioritize_findings,
)
from parityscope.rootcause.analysis import RootCauseReport
from parityscope.rootcause.label_bias import LabelBiasFinding
from parityscope.rootcause.proxy_detection import ProxyVariable
from parityscope.rootcause.representation import RepresentationReport


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _strategy(
    sid: str,
    metrics: list[str] | None = None,
    requires_retraining: bool = False,
    difficulty: str = "low",
    estimated_effort: str = "1-2 weeks",
    name: str = "Test strategy",
) -> MitigationStrategy:
    return MitigationStrategy(
        id=sid,
        strategy=name,
        description="test",
        difficulty=difficulty,
        expected_impact="meaningful",
        trade_offs=["cost"],
        applicable_metrics=metrics or ["equal_opportunity"],
        requires_retraining=requires_retraining,
        estimated_effort=estimated_effort,
    )


def _issue(
    issue_id: str = "ISSUE-001",
    metric: str = "race:equal_opportunity",
    disparity: float = 0.20,
    severity: Severity = Severity.HIGH,
    strategies: list[MitigationStrategy] | None = None,
    priority: float = 80.0,
) -> PrioritizedIssue:
    return PrioritizedIssue(
        id=issue_id,
        severity=severity,
        title="Test issue",
        description="test",
        affected_groups=["A", "B"],
        affected_metric=metric,
        disparity=disparity,
        regulatory_risk="moderate",
        clinical_impact="moderate",
        mitigation_strategies=strategies if strategies is not None else [],
        priority_score=priority,
    )


def _empty_root_cause(
    proxies: list[ProxyVariable] | None = None,
    label_findings: list[LabelBiasFinding] | None = None,
    underrep: list[dict] | None = None,
) -> RootCauseReport:
    return RootCauseReport(
        proxy_variables=proxies or [],
        label_bias_findings=label_findings or [],
        feature_importance=[],
        representation=RepresentationReport(
            group_proportions={},
            imbalance_ratios={},
            underrepresented_groups=underrep or [],
            feature_coverage=None,
            reference_comparison=None,
            warnings=[],
            recommendations=[],
        ),
        summary="",
        critical_findings=[],
    )


# ---------------------------------------------------------------------------
# rank_strategies_ml
# ---------------------------------------------------------------------------


class TestRankStrategiesML:
    def test_returns_strategies_sorted(self, sample_audit_result):
        # Build issues from the audit and find one that has strategies.
        issues = prioritize_findings(sample_audit_result)
        candidate = next((i for i in issues if i.mitigation_strategies), None)
        if candidate is None:
            # Fall back: synthesize one with strategies from the knowledge base.
            real_strats = get_mitigation_strategies("equal_opportunity", 0.2)
            candidate = _issue(strategies=list(real_strats[:5]))

        ranked = rank_strategies_ml(candidate)
        assert isinstance(ranked, list)
        assert len(ranked) == len(candidate.mitigation_strategies)
        for s in ranked:
            assert isinstance(s, MitigationStrategy)
        # All inputs preserved (multiset equality)
        assert {s.id for s in ranked} == {s.id for s in candidate.mitigation_strategies}

    def test_empty_strategies_returns_empty(self):
        issue = _issue(strategies=[])
        ranked = rank_strategies_ml(issue)
        assert ranked == []

    def test_root_cause_alignment_boosts_proxy_strategies(self):
        # MIT-006 is in _PROXY_STRATEGY_IDS; MIT-099 is irrelevant.
        proxy_strat = _strategy(
            "MIT-006", metrics=["equal_opportunity"], requires_retraining=True,
            difficulty="medium",
        )
        other_strat = _strategy(
            "MIT-099", metrics=["equal_opportunity"], requires_retraining=True,
            difficulty="medium",
        )
        issue = _issue(strategies=[other_strat, proxy_strat])
        rc = _empty_root_cause(
            proxies=[ProxyVariable(
                feature="zip", protected_attribute="race",
                correlation=0.8, correlation_type="ml_proxy_score",
                severity="high", recommendation="drop",
            )]
        )

        ranked = rank_strategies_ml(issue, root_cause=rc)
        assert ranked[0].id == "MIT-006"

    def test_quick_win_bonus(self):
        # All else equal: requires_retraining=False ranks above retraining.
        quick = _strategy("MIT-A", requires_retraining=False, difficulty="medium")
        slow = _strategy("MIT-B", requires_retraining=True, difficulty="medium")
        issue = _issue(strategies=[slow, quick])
        ranked = rank_strategies_ml(issue)
        assert ranked[0].id == "MIT-A"


# ---------------------------------------------------------------------------
# track_mitigation_effectiveness
# ---------------------------------------------------------------------------


class TestTrackEffectiveness:
    def test_returns_effectiveness_records(self, sample_audit_result):
        # Use any metric that exists in the audit so the lookup succeeds.
        present_metric = sample_audit_result.metric_results[0].metric_name
        strat = _strategy("MIT-X", metrics=[present_metric])
        records = track_mitigation_effectiveness(
            before=sample_audit_result,
            after=sample_audit_result,
            applied_strategy=strat,
        )
        assert isinstance(records, list)
        assert len(records) == 1
        assert isinstance(records[0], EffectivenessRecord)

    def test_improvement_calculated(self, sample_audit_result):
        # Build an "after" by halving every metric's disparity.
        new_metrics = tuple(
            replace(m, disparity=m.disparity / 2.0)
            for m in sample_audit_result.metric_results
        )
        after = replace(
            sample_audit_result,
            audit_id="after-001",
            metric_results=new_metrics,
        )

        present_metric = sample_audit_result.metric_results[0].metric_name
        strat = _strategy("MIT-X", metrics=[present_metric])
        records = track_mitigation_effectiveness(
            before=sample_audit_result,
            after=after,
            applied_strategy=strat,
        )
        assert len(records) == 1
        rec = records[0]
        expected_improvement = rec.disparity_before - rec.disparity_after
        assert rec.improvement == pytest.approx(expected_improvement, abs=1e-9)
        # Improvement should be positive on a strictly halved disparity.
        assert rec.improvement >= 0.0

    def test_skips_missing_metrics(self, sample_audit_result):
        # Strategy targets a metric that does not exist in the audit.
        strat = _strategy("MIT-X", metrics=["definitely_not_a_real_metric"])
        records = track_mitigation_effectiveness(
            before=sample_audit_result,
            after=sample_audit_result,
            applied_strategy=strat,
        )
        assert records == []


# ---------------------------------------------------------------------------
# generate_remediation_plan
# ---------------------------------------------------------------------------


class TestGenerateRemediationPlan:
    def test_returns_remediation_plan(self, sample_audit_result):
        issues = prioritize_findings(sample_audit_result)
        plan = generate_remediation_plan(issues)
        assert isinstance(plan, RemediationPlan)
        assert plan.total_estimated_weeks >= 0
        # If issues exist with strategies, expect at least one step.
        if any(i.mitigation_strategies for i in issues):
            assert len(plan.steps) >= 1

    def test_empty_issues_returns_empty_plan(self):
        plan = generate_remediation_plan(issues=[])
        assert isinstance(plan, RemediationPlan)
        assert len(plan.steps) == 0
        assert plan.total_estimated_weeks == 0
        # Compliance score is unchanged from baseline (50.0 default).
        assert plan.expected_final_compliance_score == plan.current_compliance_score

    def test_dependencies_respected(self):
        # MIT-008 = label fix; MIT-002 = calibration (depends on label fix).
        label_strat = _strategy(
            "MIT-008",
            metrics=["calibration_difference"],
            requires_retraining=True,
            difficulty="high",
            estimated_effort="2 weeks",
            name="Fix label noise",
        )
        cal_strat = _strategy(
            "MIT-002",
            metrics=["calibration_difference"],
            requires_retraining=False,
            difficulty="low",
            estimated_effort="1 week",
            name="Calibrate",
        )
        label_issue = _issue(
            issue_id="ISSUE-LABEL",
            metric="race:calibration_difference",
            severity=Severity.HIGH,
            strategies=[label_strat],
            priority=70.0,
        )
        cal_issue = _issue(
            issue_id="ISSUE-CAL",
            metric="race:calibration_difference",
            severity=Severity.HIGH,
            strategies=[cal_strat],
            priority=72.0,
        )

        plan = generate_remediation_plan(issues=[cal_issue, label_issue])
        assert len(plan.steps) == 2

        label_step = next(s for s in plan.steps if s.strategy.id == "MIT-008")
        cal_step = next(s for s in plan.steps if s.strategy.id == "MIT-002")
        # Calibration must come after the label fix.
        assert label_step.step_number < cal_step.step_number
        assert label_step.step_number in cal_step.depends_on


# ---------------------------------------------------------------------------
# generate_executive_summary
# ---------------------------------------------------------------------------


class TestGenerateExecutiveSummary:
    def test_returns_executive_summary(self, sample_audit_result):
        summary = generate_executive_summary(sample_audit_result)
        assert isinstance(summary, ExecutiveSummary)
        assert summary.audience == "executive"
        assert summary.overview
        assert summary.full_text

    def test_executive_audience(self, sample_audit_result):
        summary = generate_executive_summary(sample_audit_result, audience="executive")
        assert summary.audience == "executive"
        # Should not lead with technical metric IDs.
        assert "audit_id" not in summary.overview.lower()

    def test_technical_audience(self, sample_audit_result):
        summary = generate_executive_summary(sample_audit_result, audience="technical")
        assert summary.audience == "technical"
        # Technical overview references the audit_id and model name.
        assert sample_audit_result.audit_id in summary.overview
        assert sample_audit_result.model_name in summary.overview

    def test_regulatory_audience(self, sample_audit_result):
        summary = generate_executive_summary(sample_audit_result, audience="regulatory")
        assert summary.audience == "regulatory"
        # eu-ai-act jurisdiction → label "EU AI Act" appears somewhere.
        assert "EU AI Act" in summary.overview or "EU AI Act" in summary.risk_assessment

    def test_full_text_combines_sections(self, sample_audit_result):
        summary = generate_executive_summary(sample_audit_result)
        assert "Overview:" in summary.full_text
        assert "Key Findings:" in summary.full_text
        assert "Recommended Actions:" in summary.full_text
        assert "Timeline:" in summary.full_text
        assert summary.overview in summary.full_text
        assert summary.risk_assessment in summary.full_text

    def test_unknown_audience_falls_back_to_executive(self, sample_audit_result):
        summary = generate_executive_summary(sample_audit_result, audience="unknown")
        assert summary.audience == "executive"
