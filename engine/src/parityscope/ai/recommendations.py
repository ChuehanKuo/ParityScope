"""AI/ML-powered fairness recommendation enhancements.

Heuristic, context-aware models that augment ParityScope's rule-based
recommendation pipeline:

* :func:`rank_strategies_ml` re-orders mitigation strategies for a single
  prioritized issue using disparity match, effort, root-cause alignment,
  quick-win bonus, and (when available) historical effectiveness.
* :func:`track_mitigation_effectiveness` compares two audits to compute
  before/after disparity changes for a strategy that was applied.
* :func:`generate_remediation_plan` sequences strategies across issues into
  a dependency-aware multi-step plan with effort and compliance estimates.
* :func:`generate_executive_summary` renders the audit and plan into a
  template-driven narrative tuned to executive, technical, or regulatory
  audiences.

This module deliberately avoids any LLM dependencies. It uses only
``numpy``, ``pandas``, and ``sklearn`` building blocks (and standard
library); the LLM-powered narrative layer lives elsewhere.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from datetime import datetime, timezone

from parityscope.audit.result import AuditResult, FairnessLevel, MetricResult
from parityscope.monitoring.store import MonitoringStore
from parityscope.recommendations.gap_analysis import ComplianceGapReport
from parityscope.recommendations.mitigations import (
    MitigationStrategy,
    get_mitigation_strategies,
)
from parityscope.recommendations.prioritizer import PrioritizedIssue, Severity
from parityscope.rootcause.analysis import RootCauseReport

# ---------------------------------------------------------------------------
# Strategy IDs grouped by category for dependency reasoning
# ---------------------------------------------------------------------------

_PROXY_STRATEGY_IDS = {"MIT-006", "MIT-007"}
_LABEL_STRATEGY_IDS = {"MIT-008"}
_DATA_STRATEGY_IDS = {"MIT-003", "MIT-004", "MIT-012"}
_CALIBRATION_STRATEGY_IDS = {"MIT-002"}
_POSTHOC_STRATEGY_IDS = {"MIT-001", "MIT-002", "MIT-009", "MIT-010"}


# ---------------------------------------------------------------------------
# 1. ML-augmented strategy re-ranking
# ---------------------------------------------------------------------------


def _now_iso() -> str:
    """UTC timestamp in ISO-8601 format."""
    return datetime.now(timezone.utc).isoformat()


def _strip_attr_prefix(metric_name: str) -> str:
    """Return the bare metric name, dropping any ``attribute:`` prefix."""
    return metric_name.split(":")[-1] if ":" in metric_name else metric_name


def _historical_effectiveness_score(
    store: MonitoringStore,
    model_name: str,
    strategy_id: str,
) -> float:
    """Look up average improvement for ``strategy_id`` and bucket it 0-15.

    Returns 0 when no records are present or the table does not exist yet.
    """
    try:
        cur = store._conn.execute(  # type: ignore[attr-defined]
            "SELECT improvement FROM mitigation_effectiveness "
            "WHERE model_name = ? AND strategy_id = ?",
            (model_name, strategy_id),
        )
        rows = cur.fetchall()
    except Exception:
        return 0.0

    if not rows:
        return 0.0

    improvements = [float(r[0]) for r in rows if r[0] is not None]
    if not improvements:
        return 0.0

    avg = sum(improvements) / len(improvements)
    if avg > 0.05:
        return 15.0
    if avg > 0.02:
        return 10.0
    if avg > 0:
        return 5.0
    return 0.0


def _score_strategy(
    strategy: MitigationStrategy,
    issue: PrioritizedIssue,
    root_cause: RootCauseReport | None,
    store: MonitoringStore | None,
    model_name: str | None,
) -> float:
    """Compute a 0-100 context-aware score for a single strategy."""
    score = 0.0

    # 1. Disparity match (0-25)
    metric_base = _strip_attr_prefix(issue.affected_metric)
    if metric_base in strategy.applicable_metrics:
        score += 25.0
    else:
        score += 10.0

    # 2. Effort score (0-25)
    effort_map = {"low": 25.0, "medium": 15.0, "high": 5.0}
    score += effort_map.get(strategy.difficulty, 10.0)

    # 3. Root-cause alignment (0-25)
    if root_cause is not None:
        has_proxies = bool(root_cause.proxy_variables)
        has_label_bias = bool(root_cause.label_bias_findings)
        has_underrep = bool(
            root_cause.representation.underrepresented_groups
        )

        aligned = False
        if has_proxies and strategy.id in _PROXY_STRATEGY_IDS:
            score += 25.0
            aligned = True
        elif has_label_bias and strategy.id in _LABEL_STRATEGY_IDS:
            score += 25.0
            aligned = True
        elif has_underrep and strategy.id in _DATA_STRATEGY_IDS:
            score += 25.0
            aligned = True

        if not aligned:
            score += 5.0

    # 4. Quick-win bonus (0-10)
    if not strategy.requires_retraining:
        score += 10.0

    # 5. Historical effectiveness (0-15) -- only when both store + model_name
    if store is not None and model_name is not None:
        score += _historical_effectiveness_score(store, model_name, strategy.id)

    return score


def rank_strategies_ml(
    issue: PrioritizedIssue,
    root_cause: RootCauseReport | None = None,
    store: MonitoringStore | None = None,
    model_name: str | None = None,
) -> list[MitigationStrategy]:
    """Re-rank an issue's mitigation strategies using a heuristic ML scorer.

    Each strategy is scored 0-100 across five components: disparity match,
    effort, root-cause alignment, quick-win bonus, and (when a monitoring
    store is provided) historical effectiveness.

    Args:
        issue: The prioritized issue whose ``mitigation_strategies`` are
            re-ranked.
        root_cause: Optional root-cause report to align strategies with the
            underlying bias mechanism (proxies / labels / representation).
        store: Optional monitoring store; effectiveness records improve
            ranking when present.
        model_name: Required alongside ``store`` to scope the lookup.

    Returns:
        Strategies sorted by descending score. If the issue has no
        strategies, the empty list is returned.
    """
    strategies = list(issue.mitigation_strategies)
    if not strategies:
        return []

    scored = [
        (s, _score_strategy(s, issue, root_cause, store, model_name))
        for s in strategies
    ]
    scored.sort(key=lambda pair: pair[1], reverse=True)
    return [s for s, _ in scored]


# ---------------------------------------------------------------------------
# 2. Mitigation effectiveness tracking
# ---------------------------------------------------------------------------


@dataclass(frozen=True)
class EffectivenessRecord:
    """A before/after disparity comparison for an applied strategy."""

    strategy_id: str
    strategy_name: str
    metric_name: str
    disparity_before: float
    disparity_after: float
    improvement: float
    audit_id_before: str
    audit_id_after: str
    timestamp: str


def _find_metric(audit: AuditResult, metric_name: str) -> MetricResult | None:
    """Return the metric whose name matches exactly or by base name."""
    base = _strip_attr_prefix(metric_name)
    for m in audit.metric_results:
        if m.metric_name == metric_name:
            return m
    for m in audit.metric_results:
        if _strip_attr_prefix(m.metric_name) == base:
            return m
    return None


def track_mitigation_effectiveness(
    before: AuditResult,
    after: AuditResult,
    applied_strategy: MitigationStrategy,
    metric_name: str | None = None,
) -> list[EffectivenessRecord]:
    """Compute before/after improvement records for an applied strategy.

    For each metric in ``applied_strategy.applicable_metrics`` (or just the
    explicit ``metric_name`` if supplied), look up the corresponding metric
    in both audits and emit an :class:`EffectivenessRecord`. Improvement is
    defined as ``before.disparity - after.disparity``; positive values mean
    the disparity shrank.

    Args:
        before: Audit result captured before the strategy was applied.
        after: Audit result captured after the strategy was applied.
        applied_strategy: The mitigation strategy being evaluated.
        metric_name: Optional restriction to a single metric.

    Returns:
        One :class:`EffectivenessRecord` per metric that was found in both
        audits. Metrics missing from either audit are skipped.
    """
    if metric_name is not None:
        metric_names = [metric_name]
    else:
        metric_names = list(applied_strategy.applicable_metrics)

    records: list[EffectivenessRecord] = []
    timestamp = _now_iso()

    for name in metric_names:
        m_before = _find_metric(before, name)
        m_after = _find_metric(after, name)
        if m_before is None or m_after is None:
            continue

        improvement = m_before.disparity - m_after.disparity
        records.append(
            EffectivenessRecord(
                strategy_id=applied_strategy.id,
                strategy_name=applied_strategy.strategy,
                metric_name=name,
                disparity_before=float(m_before.disparity),
                disparity_after=float(m_after.disparity),
                improvement=float(improvement),
                audit_id_before=before.audit_id,
                audit_id_after=after.audit_id,
                timestamp=timestamp,
            )
        )

    return records


# ---------------------------------------------------------------------------
# 3. Remediation plan generation
# ---------------------------------------------------------------------------


@dataclass(frozen=True)
class RemediationStep:
    """A single, dependency-aware step in a remediation plan."""

    step_number: int
    issue_id: str
    strategy: MitigationStrategy
    estimated_weeks: int
    depends_on: tuple[int, ...]
    expected_compliance_lift: float
    rationale: str


@dataclass(frozen=True)
class RemediationPlan:
    """An ordered, dependency-respecting bias-remediation plan."""

    steps: tuple[RemediationStep, ...]
    total_estimated_weeks: int
    expected_final_compliance_score: float
    current_compliance_score: float
    summary: str


_EFFORT_RE = re.compile(r"(\d+)\s*(?:-\s*(\d+))?\s*(week|weeks|month|months)")


def _parse_effort_to_weeks(effort: str) -> int:
    """Parse strings like ``'1-2 weeks'`` or ``'3-12 months'`` to weeks.

    Uses the upper bound when a range is given; treats ``months`` as
    ``months * 4``. Returns ``2`` as a sane fallback when the string can't
    be parsed.
    """
    if not effort:
        return 2
    match = _EFFORT_RE.search(effort.lower())
    if not match:
        return 2
    low = int(match.group(1))
    high = int(match.group(2)) if match.group(2) else low
    unit = match.group(3)
    weeks = high if "week" in unit else high * 4
    return max(1, weeks)


def _compute_lift(issue: PrioritizedIssue, strategy_score: float) -> float:
    """Estimate compliance-score lift for an issue/strategy pair."""
    if issue.severity == Severity.CRITICAL and strategy_score >= 60:
        return 15.0
    if issue.severity == Severity.HIGH and strategy_score >= 50:
        return 10.0
    if issue.severity == Severity.MEDIUM:
        return 5.0
    if issue.severity == Severity.LOW:
        return 2.0
    # Fallback for severity/score combos that didn't match above.
    if issue.severity == Severity.CRITICAL:
        return 10.0
    if issue.severity == Severity.HIGH:
        return 7.0
    return 3.0


def _build_dependency_edges(
    selections: list[tuple[PrioritizedIssue, MitigationStrategy]],
) -> dict[int, set[int]]:
    """Build dependency edges between step indices.

    Rules:
      * Calibration strategies depend on a label-fix step if one exists.
      * Post-hoc strategies addressing the same metric depend on any
        proxy-removal step that targets that metric.
      * Data-collection / augmentation steps are foundational (no deps).
    """
    n = len(selections)
    deps: dict[int, set[int]] = {i: set() for i in range(n)}

    label_indices = [
        i for i, (_, s) in enumerate(selections) if s.id in _LABEL_STRATEGY_IDS
    ]
    proxy_indices = [
        i for i, (_, s) in enumerate(selections) if s.id in _PROXY_STRATEGY_IDS
    ]

    for i, (issue, strat) in enumerate(selections):
        # Foundational data steps: leave deps empty.
        if strat.id in _DATA_STRATEGY_IDS:
            continue

        # Calibration depends on label fix (if any), regardless of metric.
        if strat.id in _CALIBRATION_STRATEGY_IDS:
            for j in label_indices:
                if j != i:
                    deps[i].add(j)

        # Post-hoc depends on proxy removal targeting the same metric.
        if strat.id in _POSTHOC_STRATEGY_IDS:
            issue_metric = _strip_attr_prefix(issue.affected_metric)
            for j in proxy_indices:
                if j == i:
                    continue
                proxy_issue, _ = selections[j]
                if _strip_attr_prefix(proxy_issue.affected_metric) == issue_metric:
                    deps[i].add(j)

    return deps


def _topological_order(deps: dict[int, set[int]]) -> list[int]:
    """Kahn's algorithm. Falls back to insertion order on cycles."""
    n = len(deps)
    indeg = {i: 0 for i in range(n)}
    for i, ds in deps.items():
        for _ in ds:
            indeg[i] += 1

    ready = sorted(i for i, d in indeg.items() if d == 0)
    order: list[int] = []
    while ready:
        node = ready.pop(0)
        order.append(node)
        for i, ds in deps.items():
            if node in ds:
                indeg[i] -= 1
                if indeg[i] == 0:
                    ready.append(i)
        ready.sort()

    if len(order) < n:
        # Cycle detected -- append leftovers in original order.
        seen = set(order)
        for i in range(n):
            if i not in seen:
                order.append(i)
    return order


def generate_remediation_plan(
    issues: list[PrioritizedIssue],
    gap_report: ComplianceGapReport | None = None,
    root_cause: RootCauseReport | None = None,
    store: MonitoringStore | None = None,
    model_name: str | None = None,
) -> RemediationPlan:
    """Generate a sequenced, dependency-aware remediation plan.

    For each issue (highest priority first) the best ML-ranked strategy is
    selected. Strategies are then ordered by topological sort so that, e.g.,
    calibration steps follow label-fix steps and post-hoc tweaks follow
    proxy removal on the same metric.

    Args:
        issues: Prioritized issues from
            :func:`parityscope.recommendations.prioritizer.prioritize_findings`.
        gap_report: Optional compliance report; its
            ``overall_compliance_score`` becomes the baseline.
        root_cause: Optional root-cause report passed through to ranking.
        store: Optional monitoring store for historical effectiveness.
        model_name: Model name to scope ``store`` lookups.

    Returns:
        A :class:`RemediationPlan` with sequenced steps and compliance
        projections. An empty issues list yields a plan of zero steps that
        keeps the current compliance score unchanged.
    """
    current = (
        gap_report.overall_compliance_score
        if gap_report is not None
        else 50.0
    )

    if not issues:
        return RemediationPlan(
            steps=(),
            total_estimated_weeks=0,
            expected_final_compliance_score=current,
            current_compliance_score=current,
            summary=(
                "No fairness issues detected — no remediation steps required. "
                f"Current compliance score: {current:.1f}%."
            ),
        )

    sorted_issues = sorted(issues, key=lambda i: i.priority_score, reverse=True)

    # Pick the best strategy per issue (skipping issues with no strategies).
    selections: list[tuple[PrioritizedIssue, MitigationStrategy]] = []
    selection_scores: list[float] = []
    for issue in sorted_issues:
        ranked = rank_strategies_ml(issue, root_cause, store, model_name)
        if not ranked:
            continue
        best = ranked[0]
        selections.append((issue, best))
        selection_scores.append(
            _score_strategy(best, issue, root_cause, store, model_name)
        )

    if not selections:
        return RemediationPlan(
            steps=(),
            total_estimated_weeks=0,
            expected_final_compliance_score=current,
            current_compliance_score=current,
            summary=(
                f"{len(issues)} issue(s) detected but no mitigation strategies "
                "were available. Manual review recommended."
            ),
        )

    deps = _build_dependency_edges(selections)
    order = _topological_order(deps)
    # Map original index -> resulting step number (1-indexed).
    step_number_for: dict[int, int] = {
        idx: pos + 1 for pos, idx in enumerate(order)
    }

    steps: list[RemediationStep] = []
    total_weeks = 0
    total_lift = 0.0

    for pos, idx in enumerate(order, start=1):
        issue, strat = selections[idx]
        score = selection_scores[idx]
        weeks = _parse_effort_to_weeks(strat.estimated_effort)
        lift = _compute_lift(issue, score)
        depends_on = tuple(
            sorted(step_number_for[j] for j in deps[idx])
        )
        rationale = (
            f"Addresses {issue.severity.value} {strat.strategy.lower()} for "
            f"'{issue.affected_metric}' (priority {issue.priority_score:.1f}, "
            f"strategy score {score:.0f}/100)."
        )
        steps.append(
            RemediationStep(
                step_number=pos,
                issue_id=issue.id,
                strategy=strat,
                estimated_weeks=weeks,
                depends_on=depends_on,
                expected_compliance_lift=lift,
                rationale=rationale,
            )
        )
        total_weeks += weeks
        total_lift += lift

    final_score = min(100.0, current + total_lift)
    summary = (
        f"Remediation plan with {len(steps)} step(s) over {total_weeks} weeks. "
        f"Expected to lift compliance from {current:.1f}% to {final_score:.1f}%."
    )

    return RemediationPlan(
        steps=tuple(steps),
        total_estimated_weeks=total_weeks,
        expected_final_compliance_score=round(final_score, 1),
        current_compliance_score=round(current, 1),
        summary=summary,
    )


# ---------------------------------------------------------------------------
# 4. Executive summary generation
# ---------------------------------------------------------------------------


@dataclass(frozen=True)
class ExecutiveSummary:
    """Audience-tuned narrative summary of an audit + remediation plan."""

    audience: str
    overview: str
    key_findings: tuple[str, ...]
    risk_assessment: str
    recommended_actions: tuple[str, ...]
    timeline: str
    full_text: str


_VALID_AUDIENCES = {"executive", "technical", "regulatory"}


def _format_jurisdiction(jurisdiction: str | None) -> str:
    """Return a human label for a jurisdiction code."""
    if not jurisdiction:
        return "no jurisdiction specified"
    labels = {
        "eu-ai-act": "the EU AI Act",
        "section-1557": "Section 1557 of the ACA",
        "fda": "FDA premarket review",
        "south-korea": "the South Korea AI Framework Act",
        "taiwan": "the Taiwan AI Basic Act",
    }
    return labels.get(jurisdiction, jurisdiction)


def _build_overview(
    audit: AuditResult,
    audience: str,
    n_unfair: int,
    n_attrs: int,
) -> str:
    """Audience-specific opening paragraph."""
    if audience == "technical":
        if n_unfair == 0:
            return (
                f"Audit {audit.audit_id} of model '{audit.model_name}' evaluated "
                f"{len(audit.metric_results)} metric(s) across "
                f"{n_attrs} protected attribute(s); no metrics exceeded their "
                "configured fairness thresholds."
            )
        worst = max(
            audit.unfair_metrics, key=lambda m: m.disparity, default=None
        )
        worst_clause = (
            f" Worst observed disparity: {worst.disparity:.4f} on "
            f"'{worst.metric_name}' (threshold {worst.threshold:.4f})."
            if worst is not None
            else ""
        )
        return (
            f"Audit {audit.audit_id} of model '{audit.model_name}' produced "
            f"{n_unfair} unfair metric(s) across {n_attrs} protected "
            f"attribute(s) over {audit.total_samples} samples.{worst_clause}"
        )

    if audience == "regulatory":
        jur = _format_jurisdiction(audit.jurisdiction)
        if n_unfair == 0:
            return (
                f"Under {jur}, the fairness audit of '{audit.model_name}' "
                f"identified no metric failures across {n_attrs} protected "
                "attribute(s). The model meets the fairness criteria evaluated."
            )
        return (
            f"Under {jur}, the fairness audit of '{audit.model_name}' "
            f"identified {n_unfair} compliance gap(s) across {n_attrs} "
            "protected attribute(s) that warrant documented remediation."
        )

    # executive (default)
    if n_unfair == 0:
        return (
            f"Our fairness audit of {audit.model_name} found no unfair metrics "
            f"across {n_attrs} protected attributes — the model is operating "
            "within acceptable parity bounds today."
        )
    return (
        f"Our fairness audit of {audit.model_name} found {n_unfair} unfair "
        f"metric(s) across {n_attrs} protected attribute(s). Remediation is "
        "recommended to reduce business, regulatory, and patient-safety risk."
    )


def _build_findings(
    audit: AuditResult,
    root_cause: RootCauseReport | None,
    audience: str,
) -> list[str]:
    """Up to five audience-tuned bullet sentences."""
    findings: list[str] = []
    unfair = audit.unfair_metrics

    if not unfair:
        findings.append("No metrics exceeded fairness thresholds in this audit.")
    else:
        # Top 3 worst by disparity.
        worst = sorted(unfair, key=lambda m: m.disparity, reverse=True)[:3]
        for m in worst:
            if audience == "technical":
                findings.append(
                    f"{m.metric_name}: disparity {m.disparity:.4f} exceeds "
                    f"threshold {m.threshold:.4f} "
                    f"({m.fairness_level.value})."
                )
            elif audience == "regulatory":
                findings.append(
                    f"Compliance gap on {m.display_name} "
                    f"(disparity {m.disparity:.2%}) violates the configured "
                    "parity threshold."
                )
            else:  # executive
                findings.append(
                    f"{m.display_name} shows a {m.disparity:.1%} disparity, "
                    "which can translate into uneven patient outcomes."
                )

    if root_cause is not None:
        # Up to 2 root-cause-derived findings.
        if root_cause.critical_findings:
            for crit in root_cause.critical_findings[:2]:
                if audience == "technical":
                    findings.append(f"Root cause: {crit}")
                elif audience == "regulatory":
                    findings.append(f"Causal driver identified: {crit}")
                else:
                    findings.append(f"Underlying driver: {crit}")
        else:
            if root_cause.proxy_variables:
                findings.append(
                    f"{len(root_cause.proxy_variables)} proxy variable(s) "
                    "identified as potential indirect-discrimination pathways."
                )
            if root_cause.label_bias_findings:
                findings.append(
                    f"{len(root_cause.label_bias_findings)} label-bias "
                    "finding(s) detected in the training labels."
                )

    return findings[:5]


def _build_risk(
    audit: AuditResult,
    n_unfair: int,
    audience: str,
) -> str:
    """One-paragraph risk assessment."""
    jur_label = _format_jurisdiction(audit.jurisdiction)

    if n_unfair == 0:
        if audience == "regulatory":
            return (
                f"Regulatory exposure under {jur_label} is currently low; "
                "continuous monitoring is still recommended to maintain compliance."
            )
        if audience == "technical":
            return (
                "No metrics exceed configured thresholds. Residual risk relates "
                "to drift, sample-adequacy gaps, and unmeasured subgroups."
            )
        return (
            "Regulatory and clinical risk are currently low. Continuous "
            "monitoring is recommended to detect future drift."
        )

    if audience == "regulatory":
        return (
            f"With {n_unfair} unfair metric(s), there is material exposure "
            f"under {jur_label}. Documented remediation is required to maintain "
            "or restore compliance, particularly for high-risk healthcare uses."
        )
    if audience == "technical":
        return (
            f"{n_unfair} metric(s) exceed thresholds, indicating measurable "
            "differential model behavior across protected groups. Risk includes "
            f"regulatory exposure under {jur_label}, downstream clinical-outcome "
            "disparities, and reputational impact."
        )
    return (
        f"With {n_unfair} unfair metric(s) detected, the model carries meaningful "
        f"regulatory risk under {jur_label} and clinical risk of unequal patient "
        "outcomes. Remediation should be prioritized."
    )


def _build_actions(
    plan: RemediationPlan | None,
    audience: str,
    n_unfair: int,
) -> list[str]:
    """Top 3-5 audience-tuned recommended actions."""
    if plan is not None and plan.steps:
        actions: list[str] = []
        for step in plan.steps[:5]:
            strat = step.strategy
            if audience == "technical":
                actions.append(
                    f"Step {step.step_number} ({strat.id}): {strat.strategy} — "
                    f"{step.estimated_weeks} week(s); "
                    f"expected lift {step.expected_compliance_lift:.0f} pp."
                )
            elif audience == "regulatory":
                actions.append(
                    f"Step {step.step_number}: implement {strat.strategy} to "
                    f"address {step.issue_id}; estimated {step.estimated_weeks} "
                    "week(s) to remediation."
                )
            else:  # executive
                actions.append(
                    f"Priority {step.step_number}: {strat.strategy} "
                    f"(~{step.estimated_weeks} week(s))."
                )
        return actions

    # Generic fallbacks when no plan was provided.
    if n_unfair == 0:
        return [
            "Maintain continuous fairness monitoring with periodic re-audits.",
            "Document this audit for regulatory record-keeping.",
        ]
    return [
        "Triage unfair metrics by clinical and regulatory severity.",
        "Apply post-hoc threshold adjustment for quick wins where applicable.",
        "Plan retraining or data-collection work for structural disparities.",
    ]


def _build_timeline(plan: RemediationPlan | None, audience: str) -> str:
    """Timeline sentence."""
    if plan is not None and plan.steps:
        weeks = plan.total_estimated_weeks
        if audience == "regulatory":
            return (
                f"Estimated remediation timeline: {weeks} week(s) "
                f"({len(plan.steps)} step(s)) before re-audit."
            )
        if audience == "technical":
            return (
                f"Total estimated effort: {weeks} week(s) across "
                f"{len(plan.steps)} sequenced step(s)."
            )
        return (
            f"Recommended remediation window: roughly {weeks} week(s) across "
            f"{len(plan.steps)} priority step(s)."
        )
    return "Recommend assessment within 30 days."


def generate_executive_summary(
    audit: AuditResult,
    root_cause: RootCauseReport | None = None,
    plan: RemediationPlan | None = None,
    audience: str = "executive",
    provider: str | None = None,
    api_key: str | None = None,
) -> ExecutiveSummary:
    """Render an audience-tuned executive summary of an audit.

    Two generation modes:

    * ``provider=None`` (default) -- fully template-driven (no LLM, offline).
    * ``provider="anthropic"`` -- uses Claude via the optional ``[llm]``
      extra to produce a richer, contextual narrative. Falls back to the
      template path on import or API errors.

    The ``audience`` parameter switches vocabulary, depth, and framing:

    * ``"executive"`` -- business and patient-safety framing.
    * ``"technical"`` -- includes metric names, disparity values, strategy IDs.
    * ``"regulatory"`` -- references jurisdiction and compliance language.

    Args:
        audit: The completed audit result.
        root_cause: Optional root-cause report enriching the findings.
        plan: Optional remediation plan supplying recommended actions and
            timeline.
        audience: One of ``"executive"``, ``"technical"``, or
            ``"regulatory"``. Unknown values fall back to ``"executive"``.
        provider: ``None`` for template generation; ``"anthropic"`` to
            request a Claude-generated narrative.
        api_key: Anthropic API key (falls back to ``ANTHROPIC_API_KEY``).

    Returns:
        An :class:`ExecutiveSummary` with separated sections and a combined
        ``full_text`` narrative.
    """
    if audience not in _VALID_AUDIENCES:
        audience = "executive"

    n_unfair = len(audit.unfair_metrics)
    n_attrs = len(audit.protected_attributes)

    overview = _build_overview(audit, audience, n_unfair, n_attrs)
    findings = _build_findings(audit, root_cause, audience)
    risk = _build_risk(audit, n_unfair, audience)
    actions = _build_actions(plan, audience, n_unfair)
    timeline = _build_timeline(plan, audience)

    # Optional LLM-generated full_text (privacy-safe summary only)
    if provider == "anthropic":
        try:
            from parityscope.ai.llm import generate_narrative

            llm_text = generate_narrative(
                audit=audit,
                root_cause=root_cause,
                plan=plan,
                audience=audience,
                api_key=api_key,
            )
            return ExecutiveSummary(
                audience=audience,
                overview=overview,
                key_findings=tuple(findings),
                risk_assessment=risk,
                recommended_actions=tuple(actions),
                timeline=timeline,
                full_text=llm_text,
            )
        except (ImportError, ValueError):
            # Fall through to template path
            pass

    sections: list[str] = [
        "Overview:",
        overview,
        "",
        "Key Findings:",
    ]
    if findings:
        sections.extend(f"- {f}" for f in findings)
    else:
        sections.append("- No notable findings.")
    sections.extend([
        "",
        "Risk Assessment:",
        risk,
        "",
        "Recommended Actions:",
    ])
    if actions:
        sections.extend(f"- {a}" for a in actions)
    else:
        sections.append("- No actions required at this time.")
    sections.extend(["", "Timeline:", timeline])

    full_text = "\n".join(sections)

    return ExecutiveSummary(
        audience=audience,
        overview=overview,
        key_findings=tuple(findings),
        risk_assessment=risk,
        recommended_actions=tuple(actions),
        timeline=timeline,
        full_text=full_text,
    )


# Re-exports for callers that want a single import surface.
__all__ = [
    "AuditResult",
    "ComplianceGapReport",
    "EffectivenessRecord",
    "ExecutiveSummary",
    "FairnessLevel",
    "MetricResult",
    "MitigationStrategy",
    "MonitoringStore",
    "PrioritizedIssue",
    "RemediationPlan",
    "RemediationStep",
    "RootCauseReport",
    "Severity",
    "generate_executive_summary",
    "generate_remediation_plan",
    "get_mitigation_strategies",
    "rank_strategies_ml",
    "track_mitigation_effectiveness",
]
