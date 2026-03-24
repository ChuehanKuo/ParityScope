"""Section 1557 Disparate Impact Analysis Report.

Generates a PDF report evaluating AI system outcomes under Section 1557
of the Affordable Care Act, including four-fifths rule analysis.
"""

from __future__ import annotations

from io import BytesIO
from pathlib import Path

import numpy as np
from reportlab.platypus import HRFlowable, PageBreak, Paragraph, Spacer

from parityscope.audit.result import AuditResult, FairnessLevel
from parityscope.reports.pdf_common import (
    GREY_BORDER, RED, build_styles, create_document, level_label,
    metadata_table, styled_table, verdict_box,
)


def generate_section_1557_report(
    result: AuditResult,
    output_path: str | Path | None = None,
) -> bytes:
    """Generate a Section 1557 disparate impact analysis PDF."""
    styles = build_styles()
    buf = BytesIO()
    doc = create_document(buf)
    story: list = []

    # Cover
    story.append(Spacer(1, 40))
    story.append(Paragraph("Section 1557 Analysis", styles["title"]))
    story.append(Paragraph("Disparate Impact Assessment — Affordable Care Act", styles["h1"]))
    story.append(HRFlowable(width="100%", thickness=2, color=GREY_BORDER, spaceAfter=16))
    story.extend(verdict_box(result, doc, styles))
    story.append(metadata_table(result, doc, styles))

    # Introduction
    story.append(PageBreak())
    story.append(Paragraph("1. Introduction", styles["h1"]))
    story.append(Paragraph(
        "Section 1557 of the Affordable Care Act (42 USC 18116) prohibits discrimination "
        "on the basis of race, color, national origin, sex, age, or disability in any health "
        "program or activity receiving federal financial assistance. This includes AI and "
        "algorithmic decision-support systems used in healthcare settings.",
        styles["body"],
    ))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Even facially neutral AI systems must not produce unjustified disparate impact "
        "on protected groups. This report evaluates the AI system for potential disparate "
        "impact across all protected classes.",
        styles["body"],
    ))

    # Four-Fifths Rule Analysis
    story.append(Spacer(1, 16))
    story.append(Paragraph("2. Four-Fifths Rule Analysis", styles["h1"]))
    story.append(Paragraph(
        "The four-fifths (80%) rule is a guideline used to determine adverse impact. "
        "If the selection rate for any group is less than 80% of the rate for the group "
        "with the highest rate, adverse impact may be indicated.",
        styles["body"],
    ))
    story.append(Spacer(1, 10))

    four_fifths_header = [
        Paragraph("<b>Metric</b>", styles["cell_header"]),
        Paragraph("<b>Max Group Rate</b>", styles["cell_header"]),
        Paragraph("<b>Min Group Rate</b>", styles["cell_header"]),
        Paragraph("<b>4/5ths Ratio</b>", styles["cell_header"]),
        Paragraph("<b>Impact</b>", styles["cell_header"]),
    ]
    four_fifths_rows = [four_fifths_header]

    for m in result.metric_results:
        if not m.group_results:
            continue
        rates = [g.rate for g in m.group_results]
        max_rate = max(rates)
        min_rate = min(rates)
        max_group = next(g.group_label for g in m.group_results if g.rate == max_rate)
        min_group = next(g.group_label for g in m.group_results if g.rate == min_rate)

        ratio = min_rate / max_rate if max_rate > 0 else 0.0
        has_impact = ratio < 0.8

        four_fifths_rows.append([
            Paragraph(m.display_name, styles["cell"]),
            Paragraph(f"{max_group}: {max_rate:.4f}", styles["cell"]),
            Paragraph(f"{min_group}: {min_rate:.4f}", styles["cell"]),
            Paragraph(f"{ratio:.3f}", styles["cell_bold"] if has_impact else styles["cell"]),
            Paragraph(
                "<b>ADVERSE IMPACT</b>" if has_impact else "No Impact",
                styles["cell_bold"] if has_impact else styles["cell"],
            ),
        ])

    story.append(styled_table(four_fifths_rows))

    # Protected class analysis
    story.append(PageBreak())
    story.append(Paragraph("3. Protected Class Analysis", styles["h1"]))

    for attr in result.protected_attributes:
        story.append(Paragraph(f"3.{list(result.protected_attributes).index(attr) + 1}. {attr.replace('_', ' ').title()}", styles["h2"]))
        attr_metrics = [m for m in result.metric_results if m.metric_name.startswith(f"{attr}:")]

        if not attr_metrics:
            story.append(Paragraph("No metrics evaluated for this attribute.", styles["body"]))
            continue

        unfair_count = sum(1 for m in attr_metrics if m.fairness_level == FairnessLevel.UNFAIR)
        total = len(attr_metrics)
        story.append(Paragraph(
            f"{unfair_count} of {total} metrics show unfair outcomes for this attribute.",
            styles["body"],
        ))
        story.append(Spacer(1, 8))

        for m in attr_metrics:
            if m.fairness_level == FairnessLevel.FAIR:
                continue
            story.append(Paragraph(
                f"&bull; <b>{m.display_name}</b>: disparity {m.disparity:.4f} ({level_label(m.fairness_level)})",
                styles["body"],
            ))
            if m.group_results:
                for g in m.group_results:
                    story.append(Paragraph(f"  — {g.group_label}: {g.rate:.4f} (n={g.sample_size:,})", styles["small"]))
        story.append(Spacer(1, 12))

    # Summary
    story.append(PageBreak())
    story.append(Paragraph("4. Disparate Impact Summary", styles["h1"]))

    n_adverse = sum(
        1 for m in result.metric_results
        if m.group_results and min(g.rate for g in m.group_results) / max(g.rate for g in m.group_results) < 0.8
        if max(g.rate for g in m.group_results) > 0
    )
    story.append(Paragraph(
        f"Of {len(result.metric_results)} metrics evaluated, "
        f"<b>{n_adverse}</b> show potential adverse impact under the four-fifths rule.",
        styles["body"],
    ))

    # Business necessity template
    story.append(Spacer(1, 16))
    story.append(Paragraph("5. Business Necessity Defense", styles["h1"]))
    story.append(Paragraph(
        "If disparate impact is identified, the covered entity may justify the practice "
        "by demonstrating that it is necessary to achieve a substantial, legitimate, "
        "nondiscriminatory interest and that there are no less discriminatory alternatives.",
        styles["body"],
    ))
    story.append(Spacer(1, 8))
    story.append(Paragraph("<b>Justification:</b> [To be completed by the covered entity]", styles["body"]))
    story.append(Paragraph("<b>Alternatives Considered:</b> [To be completed]", styles["body"]))
    story.append(Paragraph("<b>Less Discriminatory Alternative Available:</b> [Yes/No — explain]", styles["body"]))

    doc.build(story)
    pdf_bytes = buf.getvalue()
    buf.close()
    if output_path:
        Path(output_path).write_bytes(pdf_bytes)
    return pdf_bytes
