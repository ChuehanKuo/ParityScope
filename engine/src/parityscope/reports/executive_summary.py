"""Executive summary for non-technical stakeholders.

Generates plain-English reports for board members, legal counsel,
and executives who need to understand fairness audit outcomes
without technical expertise.
"""

from __future__ import annotations

from io import BytesIO
from pathlib import Path

from parityscope.audit.result import AuditResult, FairnessLevel


def generate_executive_summary(result: AuditResult) -> str:
    """Generate a plain-text executive summary.

    Written for board members, legal counsel, and non-technical executives.
    """
    lines: list[str] = []

    # Verdict
    jurisdiction_name = (result.jurisdiction or "applicable regulations").upper().replace("-", " ")
    if result.overall_fairness == FairnessLevel.FAIR:
        verdict = f"This model PASSES fairness requirements under {jurisdiction_name}."
    elif result.overall_fairness == FairnessLevel.MARGINAL:
        verdict = f"This model requires REVIEW — some metrics are in the warning zone under {jurisdiction_name}."
    else:
        verdict = f"This model FAILS fairness requirements under {jurisdiction_name}. Action is required."

    lines.append("=" * 60)
    lines.append("EXECUTIVE SUMMARY — FAIRNESS AUDIT")
    lines.append("=" * 60)
    lines.append("")
    lines.append(verdict)
    lines.append("")

    # Key numbers
    n_total = len(result.metric_results)
    n_fair = len(result.fair_metrics)
    n_marginal = len(result.marginal_metrics)
    n_unfair = len(result.unfair_metrics)

    lines.append("KEY NUMBERS")
    lines.append("-" * 40)
    lines.append(f"  Model:              {result.model_name}")
    lines.append(f"  Patients evaluated: {result.total_samples:,}")
    lines.append(f"  Metrics tested:     {n_total}")
    lines.append(f"  Passing:            {n_fair}")
    lines.append(f"  Warning:            {n_marginal}")
    lines.append(f"  Failing:            {n_unfair}")
    lines.append("")

    # Top risk areas
    if result.unfair_metrics:
        lines.append("TOP RISK AREAS")
        lines.append("-" * 40)
        for i, m in enumerate(result.unfair_metrics[:3], 1):
            groups = ", ".join(f"{g.group_label} ({g.rate:.0%})" for g in m.group_results)
            lines.append(f"  {i}. {m.display_name}")
            lines.append(f"     Gap: {m.disparity:.1%} between groups")
            if groups:
                lines.append(f"     Groups: {groups}")
            lines.append("")

    # Affected populations
    lines.append("AFFECTED POPULATIONS")
    lines.append("-" * 40)
    for gk, count in sorted(result.group_counts.items()):
        pct = count / result.total_samples * 100
        lines.append(f"  {gk}: {count:,} patients ({pct:.1f}%)")
    lines.append("")

    # Recommended actions
    lines.append("RECOMMENDED ACTIONS")
    lines.append("-" * 40)
    if result.overall_fairness == FairnessLevel.FAIR:
        lines.append("  1. Continue monitoring fairness metrics quarterly")
        lines.append("  2. Re-audit after any model update")
        lines.append("  3. Archive this report for compliance documentation")
    elif result.overall_fairness == FairnessLevel.MARGINAL:
        lines.append("  1. IMMEDIATE: Review marginal metrics with clinical team")
        lines.append("  2. 30 DAYS: Implement enhanced monitoring for at-risk groups")
        lines.append("  3. 90 DAYS: Evaluate model improvements to address marginal metrics")
        lines.append("  4. ONGOING: Quarterly re-audits until all metrics pass")
    else:
        lines.append("  1. IMMEDIATE: Flag this model for clinical review")
        lines.append("  2. IMMEDIATE: Consider threshold adjustments for affected groups")
        lines.append("  3. 30 DAYS: Develop and begin executing mitigation plan")
        lines.append("  4. 60 DAYS: Re-audit after mitigations are applied")
        lines.append("  5. 90 DAYS: Verify mitigations resolved identified issues")
    lines.append("")

    # Regulatory context
    lines.append("REGULATORY CONTEXT")
    lines.append("-" * 40)
    if result.jurisdiction == "eu-ai-act":
        lines.append("  EU AI Act enforcement begins August 2027.")
        lines.append("  Healthcare AI is classified as HIGH-RISK.")
        lines.append("  Penalties: Up to EUR 35 million or 7% of global annual turnover.")
    elif result.jurisdiction == "section-1557":
        lines.append("  Section 1557 of the ACA is currently in force.")
        lines.append("  Covers all healthcare programs receiving federal funding.")
        lines.append("  Penalties: Loss of federal funding, civil penalties, private right of action.")
    elif result.jurisdiction == "south-korea":
        lines.append("  South Korea AI Framework Act effective January 2026.")
        lines.append("  Impact assessments required for high-impact AI.")
    elif result.jurisdiction == "taiwan":
        lines.append("  Taiwan AI Basic Act establishing governance requirements.")
        lines.append("  Non-discrimination in AI outcomes is a core principle.")
    else:
        lines.append("  No specific jurisdiction selected. Industry best practices apply.")
    lines.append("")

    lines.append("=" * 60)
    lines.append("Generated by ParityScope v0.2.0 — parityscope.com")
    lines.append("=" * 60)

    return "\n".join(lines)


def generate_executive_summary_pdf(
    result: AuditResult,
    output_path: str | Path | None = None,
) -> bytes:
    """Generate a PDF executive summary."""
    from reportlab.platypus import Paragraph, Spacer, HRFlowable
    from parityscope.reports.pdf_common import (
        GREY_BORDER, build_styles, create_document, verdict_box,
    )

    styles = build_styles()
    buf = BytesIO()
    doc = create_document(buf)
    story: list = []

    story.append(Spacer(1, 30))
    story.append(Paragraph("Executive Summary", styles["title"]))
    story.append(Paragraph("Fairness Audit Results", styles["subtitle"]))
    story.append(HRFlowable(width="100%", thickness=2, color=GREY_BORDER, spaceAfter=16))

    # Verdict
    story.extend(verdict_box(result, doc, styles))

    # Render text summary as paragraphs
    text = generate_executive_summary(result)
    for line in text.split("\n"):
        line = line.strip()
        if not line:
            story.append(Spacer(1, 6))
        elif line.startswith("="):
            continue
        elif line.startswith("-"):
            continue
        elif line.startswith("EXECUTIVE"):
            continue
        elif line.isupper() and len(line) > 5:
            story.append(Spacer(1, 10))
            story.append(Paragraph(f"<b>{line}</b>", styles["h2"]))
        elif line.startswith("  "):
            story.append(Paragraph(line.strip(), styles["body"]))
        else:
            story.append(Paragraph(line, styles["body"]))

    doc.build(story)
    pdf_bytes = buf.getvalue()
    buf.close()
    if output_path:
        Path(output_path).write_bytes(pdf_bytes)
    return pdf_bytes
