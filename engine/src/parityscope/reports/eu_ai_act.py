"""EU AI Act Conformity Assessment Report.

Generates a structured PDF report mapping audit findings to EU AI Act
Articles 9, 10, 13, 15, and 61 requirements for high-risk AI systems.
"""

from __future__ import annotations

from io import BytesIO
from pathlib import Path

from reportlab.platypus import HRFlowable, PageBreak, Paragraph, Spacer

from parityscope.audit.result import AuditResult, FairnessLevel
from parityscope.regulations.mapping import get_compliance_requirements
from parityscope.reports.pdf_common import (
    GREY_BORDER, build_styles, create_document, level_bg, level_color,
    level_label, metadata_table, styled_table, verdict_box,
)


def generate_eu_ai_act_report(
    result: AuditResult,
    root_cause_report: object | None = None,
    output_path: str | Path | None = None,
) -> bytes:
    """Generate an EU AI Act conformity assessment PDF report."""
    styles = build_styles()
    buf = BytesIO()
    doc = create_document(buf)
    story: list = []

    # Cover page
    story.append(Spacer(1, 40))
    story.append(Paragraph("EU AI Act", styles["title"]))
    story.append(Paragraph("Conformity Assessment — Fairness Evaluation", styles["h1"]))
    story.append(HRFlowable(width="100%", thickness=2, color=GREY_BORDER, spaceAfter=16))
    story.append(Paragraph(
        f"Model: <b>{result.model_name}</b><br/>"
        f"Classification: <b>High-Risk AI System</b> (Annex III, Section 5(b))<br/>"
        f"Assessment Date: <b>{result.timestamp[:10]}</b>",
        styles["body"],
    ))
    story.append(Spacer(1, 20))
    story.extend(verdict_box(result, doc, styles))
    story.append(metadata_table(result, doc, styles))

    # Executive Summary
    story.append(PageBreak())
    story.append(Paragraph("1. Executive Summary", styles["h1"]))
    n_fair = len(result.fair_metrics)
    n_marginal = len(result.marginal_metrics)
    n_unfair = len(result.unfair_metrics)
    n_total = len(result.metric_results)

    if result.overall_fairness == FairnessLevel.FAIR:
        summary = f"This AI system <b>PASSES</b> fairness evaluation. All {n_total} metrics are within acceptable thresholds."
    elif result.overall_fairness == FairnessLevel.MARGINAL:
        summary = f"This AI system requires <b>REVIEW</b>. {n_marginal} of {n_total} metrics are in the marginal range."
    else:
        summary = f"This AI system <b>FAILS</b> fairness evaluation. {n_unfair} of {n_total} metrics exceed unfairness thresholds."

    story.append(Paragraph(summary, styles["body"]))
    story.append(Spacer(1, 10))

    # Summary counts table
    summary_data = [
        [Paragraph("<b>Fair</b>", styles["cell_header"]),
         Paragraph("<b>Marginal</b>", styles["cell_header"]),
         Paragraph("<b>Unfair</b>", styles["cell_header"]),
         Paragraph("<b>Total</b>", styles["cell_header"])],
        [Paragraph(str(n_fair), styles["cell"]),
         Paragraph(str(n_marginal), styles["cell"]),
         Paragraph(str(n_unfair), styles["cell"]),
         Paragraph(str(n_total), styles["cell"])],
    ]
    story.append(styled_table(summary_data, col_widths=[doc.width / 4] * 4))
    story.append(Spacer(1, 20))

    # Article 9 — Risk Management
    story.append(Paragraph("2. Article 9 — Risk Management System", styles["h1"]))
    story.append(Paragraph(
        "Article 9 requires a risk management system throughout the AI system lifecycle, "
        "including identification and analysis of known and foreseeable risks of bias.",
        styles["body"],
    ))
    story.append(Spacer(1, 8))

    if n_unfair > 0:
        story.append(Paragraph("<b>Identified Risks:</b>", styles["body"]))
        for m in result.unfair_metrics:
            story.append(Paragraph(
                f"&bull; {m.display_name}: disparity {m.disparity:.4f} (threshold {m.threshold:.4f})",
                styles["body"],
            ))
        story.append(Spacer(1, 8))
        story.append(Paragraph(
            "<b>Status: ACTION REQUIRED</b> — Bias risks have been identified. "
            "A mitigation plan must be developed and documented.", styles["body"],
        ))
    else:
        story.append(Paragraph(
            "<b>Status: COMPLIANT</b> — No fairness risks above threshold detected.", styles["body"],
        ))

    # Root cause findings
    if root_cause_report is not None and hasattr(root_cause_report, "critical_findings"):
        if root_cause_report.critical_findings:
            story.append(Spacer(1, 8))
            story.append(Paragraph("<b>Root Cause Findings:</b>", styles["body"]))
            for finding in root_cause_report.critical_findings:
                story.append(Paragraph(f"&bull; {finding}", styles["body"]))

    # Article 10 — Data Governance
    story.append(PageBreak())
    story.append(Paragraph("3. Article 10 — Data Governance", styles["h1"]))
    story.append(Paragraph(
        "Article 10 requires training, validation, and testing datasets to be subject to "
        "data governance practices including examination for possible biases.",
        styles["body"],
    ))
    story.append(Spacer(1, 8))

    # Demographics table
    story.append(Paragraph("<b>Dataset Demographics:</b>", styles["h2"]))
    demo_header = [
        Paragraph("<b>Group</b>", styles["cell_header"]),
        Paragraph("<b>Count</b>", styles["cell_header"]),
        Paragraph("<b>Percentage</b>", styles["cell_header"]),
    ]
    demo_rows = [demo_header]
    for group_key, count in sorted(result.group_counts.items()):
        pct = count / result.total_samples * 100
        demo_rows.append([
            Paragraph(group_key, styles["cell"]),
            Paragraph(f"{count:,}", styles["cell"]),
            Paragraph(f"{pct:.1f}%", styles["cell"]),
        ])
    story.append(styled_table(demo_rows))
    story.append(Spacer(1, 10))

    small_groups = sum(1 for v in result.group_counts.values() if v < 30)
    if small_groups > 0:
        story.append(Paragraph(
            f"<b>Warning:</b> {small_groups} group(s) have fewer than 30 samples. "
            "Statistical power may be insufficient for reliable fairness assessment.",
            styles["body"],
        ))
    else:
        story.append(Paragraph(
            "<b>Status: COMPLIANT</b> — All demographic groups have adequate sample sizes.",
            styles["body"],
        ))

    # Article 13 — Transparency
    story.append(PageBreak())
    story.append(Paragraph("4. Article 13 — Transparency", styles["h1"]))
    story.append(Paragraph(
        "Article 13 requires high-risk AI systems to be designed to enable users to "
        "interpret the output and use it appropriately.",
        styles["body"],
    ))
    story.append(Spacer(1, 8))
    story.append(Paragraph("<b>Methodology:</b>", styles["h2"]))
    story.append(Paragraph(
        f"This assessment evaluated {n_total} fairness metrics across "
        f"{len(result.protected_attributes)} protected attribute(s): "
        f"{', '.join(result.protected_attributes)}. "
        f"Metrics were selected based on EU AI Act requirements for the "
        f"clinical domain: {result.clinical_domain or 'general'}.",
        styles["body"],
    ))
    story.append(Spacer(1, 8))
    story.append(Paragraph("<b>Metrics Evaluated:</b>", styles["body"]))
    for m_name in result.metrics_evaluated:
        story.append(Paragraph(f"&bull; {m_name}", styles["body"]))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        f"<b>Fairness Thresholds:</b> Fair ≤ {result.thresholds.get('fair', 0.05)}, "
        f"Marginal ≤ {result.thresholds.get('marginal', 0.10)}, "
        f"Unfair &gt; {result.thresholds.get('marginal', 0.10)}",
        styles["body"],
    ))
    story.append(Spacer(1, 8))
    story.append(Paragraph("<b>Status: COMPLIANT</b> — This report provides transparent documentation.", styles["body"]))

    # Article 15 — Accuracy & Robustness
    story.append(PageBreak())
    story.append(Paragraph("5. Article 15 — Accuracy, Robustness, and Cybersecurity", styles["h1"]))
    story.append(Paragraph(
        "Article 15 requires high-risk AI systems to achieve appropriate levels of "
        "accuracy and perform consistently across groups.",
        styles["body"],
    ))
    story.append(Spacer(1, 10))

    # Full metrics table
    metrics_header = [
        Paragraph("<b>Metric</b>", styles["cell_header"]),
        Paragraph("<b>Attribute</b>", styles["cell_header"]),
        Paragraph("<b>Disparity</b>", styles["cell_header"]),
        Paragraph("<b>Status</b>", styles["cell_header"]),
    ]
    metrics_rows = [metrics_header]
    for m in result.metric_results:
        parts = m.metric_name.split(":")
        attr = parts[0] if len(parts) > 1 else ""
        metrics_rows.append([
            Paragraph(m.display_name, styles["cell"]),
            Paragraph(attr, styles["cell"]),
            Paragraph(f"{m.disparity:.4f}", styles["cell"]),
            Paragraph(f"<b>{level_label(m.fairness_level)}</b>", styles["cell_bold"]),
        ])
    story.append(styled_table(metrics_rows))

    # Article 61 — Post-Market Monitoring
    story.append(PageBreak())
    story.append(Paragraph("6. Article 61 — Post-Market Monitoring", styles["h1"]))
    story.append(Paragraph(
        "Article 61 requires providers to establish a post-market monitoring system "
        "to continuously evaluate fairness throughout the system lifecycle.",
        styles["body"],
    ))
    story.append(Spacer(1, 10))
    story.append(Paragraph("<b>Recommended Monitoring Plan:</b>", styles["h2"]))
    monitoring_items = [
        ("Frequency", "Quarterly fairness audits, with triggered re-audits on model updates"),
        ("Metrics", ", ".join(result.metrics_evaluated)),
        ("Drift Threshold", "Alert if any metric disparity increases by >0.05 from baseline"),
        ("Reporting", "Automated report generation with compliance team notification"),
        ("Documentation", "All audit results archived for minimum 10 years per EU AI Act"),
    ]
    for label, value in monitoring_items:
        story.append(Paragraph(f"<b>{label}:</b> {value}", styles["body"]))
        story.append(Spacer(1, 4))
    story.append(Spacer(1, 8))
    story.append(Paragraph("<b>Status: NOT YET IMPLEMENTED</b> — Continuous monitoring requires setup.", styles["body"]))

    # Compliance checklist
    story.append(PageBreak())
    story.append(Paragraph("7. Compliance Checklist", styles["h1"]))
    requirements = get_compliance_requirements(result.jurisdiction or "eu-ai-act")
    checklist_header = [
        Paragraph("<b>Article</b>", styles["cell_header"]),
        Paragraph("<b>Requirement</b>", styles["cell_header"]),
        Paragraph("<b>Status</b>", styles["cell_header"]),
    ]
    checklist_rows = [checklist_header]
    for req in requirements:
        status = _assess_status(req.article, result)
        checklist_rows.append([
            Paragraph(req.article, styles["cell"]),
            Paragraph(req.requirement, styles["cell"]),
            Paragraph(f"<b>{status}</b>", styles["cell_bold"]),
        ])
    story.append(styled_table(checklist_rows))

    # Build
    doc.build(story)
    pdf_bytes = buf.getvalue()
    buf.close()
    if output_path:
        Path(output_path).write_bytes(pdf_bytes)
    return pdf_bytes


def _assess_status(article: str, result: AuditResult) -> str:
    """Assess compliance status for a specific article."""
    article_lower = article.lower()
    if "9" in article and "risk" in article_lower:
        return "PARTIAL" if result.unfair_metrics else "PASS"
    if "10" in article:
        small = sum(1 for v in result.group_counts.values() if v < 30)
        return "PARTIAL" if small > 0 else "PASS"
    if "13" in article:
        return "PASS"
    if "15" in article:
        if result.overall_fairness == FairnessLevel.FAIR:
            return "PASS"
        return "FAIL" if result.overall_fairness == FairnessLevel.UNFAIR else "PARTIAL"
    if "61" in article:
        return "NOT ASSESSED"
    return "NOT ASSESSED"
