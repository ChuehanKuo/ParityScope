"""FDA Premarket Bias Documentation.

Generates a PDF report following CDRH guidance for documenting AI/ML
model performance across demographic subgroups.
"""

from __future__ import annotations

from io import BytesIO
from pathlib import Path

from reportlab.platypus import HRFlowable, PageBreak, Paragraph, Spacer

from parityscope.audit.result import AuditResult, FairnessLevel
from parityscope.reports.pdf_common import (
    GREY_BORDER, build_styles, create_document, level_label,
    metadata_table, styled_table, verdict_box,
)


def generate_fda_report(
    result: AuditResult,
    device_info: dict | None = None,
    output_path: str | Path | None = None,
) -> bytes:
    """Generate FDA premarket bias documentation PDF."""
    styles = build_styles()
    buf = BytesIO()
    doc = create_document(buf)
    story: list = []
    device_info = device_info or {}

    # Cover
    story.append(Spacer(1, 40))
    story.append(Paragraph("FDA Premarket Submission", styles["title"]))
    story.append(Paragraph("Algorithmic Bias Assessment", styles["h1"]))
    story.append(HRFlowable(width="100%", thickness=2, color=GREY_BORDER, spaceAfter=16))

    # Device description
    story.append(Paragraph("1. Device Description", styles["h1"]))
    device_data = [
        ("Device Name", device_info.get("device_name", result.model_name)),
        ("Device Class", device_info.get("device_class", "Class II")),
        ("Submission Type", device_info.get("submission_type", "510(k)")),
        ("Intended Use", device_info.get("intended_use", result.clinical_domain or "Clinical decision support")),
        ("Predicate Device", device_info.get("predicate_device", "N/A")),
    ]
    rows = [[Paragraph(f"<b>{k}</b>", styles["cell"]), Paragraph(v, styles["cell"])] for k, v in device_data]
    story.append(styled_table(rows))
    story.append(Spacer(1, 20))

    # Study population
    story.append(Paragraph("2. Study Population Demographics", styles["h1"]))
    story.append(Paragraph(f"Total study population: <b>{result.total_samples:,}</b> patients.", styles["body"]))
    story.append(Spacer(1, 8))

    demo_header = [
        Paragraph("<b>Group</b>", styles["cell_header"]),
        Paragraph("<b>N</b>", styles["cell_header"]),
        Paragraph("<b>Percentage</b>", styles["cell_header"]),
    ]
    demo_rows = [demo_header]
    for gk, count in sorted(result.group_counts.items()):
        pct = count / result.total_samples * 100
        demo_rows.append([
            Paragraph(gk, styles["cell"]),
            Paragraph(f"{count:,}", styles["cell"]),
            Paragraph(f"{pct:.1f}%", styles["cell"]),
        ])
    story.append(styled_table(demo_rows))

    # Performance by subgroup
    story.append(PageBreak())
    story.append(Paragraph("3. Performance by Demographic Subgroup", styles["h1"]))
    story.append(Paragraph(
        "Per-group performance metrics as required by CDRH guidance on AI/ML-enabled devices.",
        styles["body"],
    ))
    story.append(Spacer(1, 10))

    metrics_header = [
        Paragraph("<b>Metric</b>", styles["cell_header"]),
        Paragraph("<b>Disparity</b>", styles["cell_header"]),
        Paragraph("<b>Threshold</b>", styles["cell_header"]),
        Paragraph("<b>Assessment</b>", styles["cell_header"]),
    ]
    metrics_rows = [metrics_header]
    for m in result.metric_results:
        metrics_rows.append([
            Paragraph(m.display_name, styles["cell"]),
            Paragraph(f"{m.disparity:.4f}", styles["cell"]),
            Paragraph(f"{m.threshold:.4f}", styles["cell"]),
            Paragraph(f"<b>{level_label(m.fairness_level)}</b>", styles["cell_bold"]),
        ])
    story.append(styled_table(metrics_rows))

    # Per-metric group breakdown
    for m in result.metric_results:
        if m.fairness_level != FairnessLevel.FAIR and m.group_results:
            story.append(Spacer(1, 12))
            story.append(Paragraph(f"{m.display_name} — Group Breakdown", styles["h2"]))
            grp_header = [
                Paragraph("<b>Group</b>", styles["cell_header"]),
                Paragraph("<b>Rate</b>", styles["cell_header"]),
                Paragraph("<b>N</b>", styles["cell_header"]),
            ]
            grp_rows = [grp_header]
            for g in m.group_results:
                grp_rows.append([
                    Paragraph(g.group_label, styles["cell"]),
                    Paragraph(f"{g.rate:.4f}", styles["cell"]),
                    Paragraph(f"{g.sample_size:,}", styles["cell"]),
                ])
            story.append(styled_table(grp_rows))

    # Bias risk assessment
    story.append(PageBreak())
    story.append(Paragraph("4. Bias Risk Assessment", styles["h1"]))

    if result.unfair_metrics:
        story.append(Paragraph(
            f"<b>{len(result.unfair_metrics)} metric(s) exceed fairness thresholds</b>, "
            "indicating potential bias risk that requires mitigation.",
            styles["body"],
        ))
        story.append(Spacer(1, 8))
        for m in result.unfair_metrics:
            affected = ", ".join(g.group_label for g in m.group_results)
            story.append(Paragraph(
                f"&bull; <b>{m.display_name}</b>: disparity {m.disparity:.4f}. "
                f"Affected groups: {affected}",
                styles["body"],
            ))
    else:
        story.append(Paragraph(
            "No metrics exceed fairness thresholds. Bias risk is within acceptable limits.",
            styles["body"],
        ))

    # Mitigation plan template
    story.append(Spacer(1, 20))
    story.append(Paragraph("5. Mitigation Plan", styles["h1"]))
    story.append(Paragraph(
        "For each identified bias risk, document the planned mitigation strategy, "
        "timeline, and validation approach.",
        styles["body"],
    ))
    story.append(Spacer(1, 8))
    mit_header = [
        Paragraph("<b>Risk</b>", styles["cell_header"]),
        Paragraph("<b>Mitigation</b>", styles["cell_header"]),
        Paragraph("<b>Timeline</b>", styles["cell_header"]),
        Paragraph("<b>Validation</b>", styles["cell_header"]),
    ]
    mit_rows = [mit_header]
    for m in result.unfair_metrics[:5]:
        mit_rows.append([
            Paragraph(m.display_name, styles["cell"]),
            Paragraph("[To be completed]", styles["cell"]),
            Paragraph("[To be completed]", styles["cell"]),
            Paragraph("[To be completed]", styles["cell"]),
        ])
    if len(mit_rows) > 1:
        story.append(styled_table(mit_rows))
    else:
        story.append(Paragraph("No mitigation required — all metrics within acceptable thresholds.", styles["body"]))

    doc.build(story)
    pdf_bytes = buf.getvalue()
    buf.close()
    if output_path:
        Path(output_path).write_bytes(pdf_bytes)
    return pdf_bytes
