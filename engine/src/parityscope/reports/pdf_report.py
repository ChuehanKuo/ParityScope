"""PDF report generation — clean, readable audit reports for stakeholders.

Generates professional PDF reports from audit results using ReportLab.
Designed for regulatory documentation, executive review, and clinical teams.
"""

from __future__ import annotations

from io import BytesIO
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

from parityscope.audit.result import AuditResult, FairnessLevel
from parityscope.regulations.mapping import get_compliance_requirements

# -- Colour palette ----------------------------------------------------------

_DARK = colors.HexColor("#1a1a2e")
_PRIMARY = colors.HexColor("#16213e")
_ACCENT = colors.HexColor("#0f3460")
_GREEN = colors.HexColor("#2d6a4f")
_YELLOW = colors.HexColor("#e9c46a")
_RED = colors.HexColor("#e63946")
_LIGHT_GREEN = colors.HexColor("#d8f3dc")
_LIGHT_YELLOW = colors.HexColor("#fff3cd")
_LIGHT_RED = colors.HexColor("#f8d7da")
_GREY_BG = colors.HexColor("#f8f9fa")
_GREY_BORDER = colors.HexColor("#dee2e6")
_WHITE = colors.white


def _level_color(level: FairnessLevel) -> colors.Color:
    return {FairnessLevel.FAIR: _GREEN, FairnessLevel.MARGINAL: _YELLOW, FairnessLevel.UNFAIR: _RED}[level]


def _level_bg(level: FairnessLevel) -> colors.Color:
    return {FairnessLevel.FAIR: _LIGHT_GREEN, FairnessLevel.MARGINAL: _LIGHT_YELLOW, FairnessLevel.UNFAIR: _LIGHT_RED}[level]


def _level_label(level: FairnessLevel) -> str:
    return {
        FairnessLevel.FAIR: "FAIR",
        FairnessLevel.MARGINAL: "MARGINAL",
        FairnessLevel.UNFAIR: "UNFAIR",
    }[level]


# -- Styles ------------------------------------------------------------------

def _build_styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "ReportTitle", parent=base["Title"],
            fontSize=28, leading=34, textColor=_DARK,
            spaceAfter=6,
        ),
        "subtitle": ParagraphStyle(
            "ReportSubtitle", parent=base["Normal"],
            fontSize=12, leading=16, textColor=colors.HexColor("#6c757d"),
            spaceAfter=20,
        ),
        "h1": ParagraphStyle(
            "H1", parent=base["Heading1"],
            fontSize=18, leading=22, textColor=_PRIMARY,
            spaceBefore=20, spaceAfter=10,
        ),
        "h2": ParagraphStyle(
            "H2", parent=base["Heading2"],
            fontSize=14, leading=18, textColor=_ACCENT,
            spaceBefore=14, spaceAfter=8,
        ),
        "body": ParagraphStyle(
            "Body", parent=base["Normal"],
            fontSize=10, leading=14, textColor=_DARK,
        ),
        "small": ParagraphStyle(
            "Small", parent=base["Normal"],
            fontSize=8, leading=10, textColor=colors.HexColor("#6c757d"),
        ),
        "verdict_fair": ParagraphStyle(
            "VerdictFair", parent=base["Normal"],
            fontSize=22, leading=28, textColor=_GREEN,
            alignment=1,
        ),
        "verdict_unfair": ParagraphStyle(
            "VerdictUnfair", parent=base["Normal"],
            fontSize=22, leading=28, textColor=_RED,
            alignment=1,
        ),
        "cell": ParagraphStyle(
            "Cell", parent=base["Normal"],
            fontSize=9, leading=12, textColor=_DARK,
        ),
        "cell_bold": ParagraphStyle(
            "CellBold", parent=base["Normal"],
            fontSize=9, leading=12, textColor=_DARK,
            fontName="Helvetica-Bold",
        ),
        "cell_header": ParagraphStyle(
            "CellHeader", parent=base["Normal"],
            fontSize=9, leading=12, textColor=_WHITE,
            fontName="Helvetica-Bold",
        ),
    }


# -- Table helpers -----------------------------------------------------------

def _styled_table(data: list[list], col_widths: list[float] | None = None,
                  header_bg: colors.Color = _PRIMARY) -> Table:
    """Create a consistently styled table with header row."""
    table = Table(data, colWidths=col_widths, repeatRows=1)
    style_cmds: list = [
        # Header
        ("BACKGROUND", (0, 0), (-1, 0), header_bg),
        ("TEXTCOLOR", (0, 0), (-1, 0), _WHITE),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 9),
        # Body
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 1), (-1, -1), 9),
        # Grid
        ("GRID", (0, 0), (-1, -1), 0.5, _GREY_BORDER),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [_WHITE, _GREY_BG]),
        # Padding
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        # Alignment
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]
    table.setStyle(TableStyle(style_cmds))
    return table


# -- Page template -----------------------------------------------------------

def _header_footer(canvas, doc):
    """Draw page header line and footer with page number."""
    canvas.saveState()
    # Header line
    canvas.setStrokeColor(_PRIMARY)
    canvas.setLineWidth(1.5)
    canvas.line(
        doc.leftMargin, letter[1] - 40,
        letter[0] - doc.rightMargin, letter[1] - 40,
    )
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(colors.HexColor("#6c757d"))
    canvas.drawString(doc.leftMargin, letter[1] - 35, "ParityScope Fairness Audit Report")

    # Footer
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#6c757d"))
    canvas.drawCentredString(letter[0] / 2, 30, f"Page {doc.page}")
    canvas.drawRightString(
        letter[0] - doc.rightMargin, 30,
        "Generated by ParityScope v0.2.0 — parityscope.com",
    )
    canvas.restoreState()


# -- Main generator ----------------------------------------------------------

def generate_pdf_report(result: AuditResult, output_path: str | Path | None = None) -> bytes:
    """Generate a professional PDF audit report.

    Parameters
    ----------
    result : AuditResult
        The completed audit result.
    output_path : str | Path | None
        If provided, write the PDF to this file path. Otherwise only the
        raw bytes are returned.

    Returns
    -------
    bytes
        The PDF file contents.
    """
    styles = _build_styles()
    buf = BytesIO()

    doc = BaseDocTemplate(
        buf, pagesize=letter,
        leftMargin=0.75 * inch, rightMargin=0.75 * inch,
        topMargin=0.75 * inch, bottomMargin=0.75 * inch,
    )
    frame = Frame(
        doc.leftMargin, doc.bottomMargin,
        doc.width, doc.height - 20,
        id="main",
    )
    doc.addPageTemplates([PageTemplate(id="all", frames=frame, onPage=_header_footer)])

    story: list = []

    # ── Cover / Executive Summary ──────────────────────────────────────
    story.append(Spacer(1, 0.5 * inch))
    story.append(Paragraph("Fairness Audit Report", styles["title"]))
    story.append(Paragraph(
        f"Model: <b>{result.model_name}</b> &nbsp;|&nbsp; "
        f"Jurisdiction: <b>{result.jurisdiction or 'Not specified'}</b> &nbsp;|&nbsp; "
        f"Domain: <b>{result.clinical_domain or 'Not specified'}</b>",
        styles["subtitle"],
    ))
    story.append(HRFlowable(width="100%", thickness=1, color=_GREY_BORDER, spaceAfter=16))

    # Overall verdict box
    verdict_style = styles["verdict_fair"] if result.overall_fairness == FairnessLevel.FAIR else styles["verdict_unfair"]
    verdict_bg = _level_bg(result.overall_fairness)
    verdict_data = [[Paragraph(
        f"Overall Assessment: <b>{_level_label(result.overall_fairness)}</b>",
        verdict_style,
    )]]
    verdict_table = Table(verdict_data, colWidths=[doc.width])
    verdict_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), verdict_bg),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("TOPPADDING", (0, 0), (-1, -1), 16),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 16),
        ("BOX", (0, 0), (-1, -1), 1, _level_color(result.overall_fairness)),
    ]))
    story.append(verdict_table)
    story.append(Spacer(1, 16))

    # Summary counts
    n_fair = len(result.fair_metrics)
    n_marginal = len(result.marginal_metrics)
    n_unfair = len(result.unfair_metrics)
    summary_data = [
        [Paragraph("<b>Fair</b>", styles["cell_header"]),
         Paragraph("<b>Marginal</b>", styles["cell_header"]),
         Paragraph("<b>Unfair</b>", styles["cell_header"]),
         Paragraph("<b>Total</b>", styles["cell_header"])],
        [Paragraph(str(n_fair), styles["cell"]),
         Paragraph(str(n_marginal), styles["cell"]),
         Paragraph(str(n_unfair), styles["cell"]),
         Paragraph(str(len(result.metric_results)), styles["cell"])],
    ]
    w = doc.width / 4
    summary_table = Table(summary_data, colWidths=[w] * 4)
    summary_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), _GREEN),
        ("BACKGROUND", (1, 0), (1, 0), colors.HexColor("#e9a820")),
        ("BACKGROUND", (2, 0), (2, 0), _RED),
        ("BACKGROUND", (3, 0), (3, 0), _PRIMARY),
        ("TEXTCOLOR", (0, 0), (-1, 0), _WHITE),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("GRID", (0, 0), (-1, -1), 0.5, _GREY_BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(summary_table)
    story.append(Spacer(1, 20))

    # Audit metadata
    story.append(Paragraph("Audit Details", styles["h2"]))
    meta_pairs = [
        ("Audit ID", result.audit_id),
        ("Timestamp", str(result.timestamp)),
        ("Total Samples", f"{result.total_samples:,}"),
        ("Protected Attributes", ", ".join(result.protected_attributes)),
        ("Fairness Threshold", str(result.thresholds.get("fair", "N/A"))),
        ("Marginal Threshold", str(result.thresholds.get("marginal", "N/A"))),
    ]
    meta_data = [[Paragraph(f"<b>{k}</b>", styles["cell"]), Paragraph(str(v), styles["cell"])] for k, v in meta_pairs]
    meta_table = Table(meta_data, colWidths=[2 * inch, doc.width - 2 * inch])
    meta_table.setStyle(TableStyle([
        ("GRID", (0, 0), (-1, -1), 0.5, _GREY_BORDER),
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [_GREY_BG, _WHITE]),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(meta_table)

    # ── Group Demographics ─────────────────────────────────────────────
    story.append(Spacer(1, 10))
    story.append(Paragraph("Group Demographics", styles["h2"]))

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
    demo_table = _styled_table(demo_rows, col_widths=[2.5 * inch, 2 * inch, 2.5 * inch])
    story.append(demo_table)

    # ── Metrics Overview ───────────────────────────────────────────────
    story.append(PageBreak())
    story.append(Paragraph("Metrics Overview", styles["h1"]))
    story.append(Paragraph(
        "Each metric measures a different dimension of fairness. Disparity values "
        "below the threshold are considered fair.",
        styles["body"],
    ))
    story.append(Spacer(1, 10))

    overview_header = [
        Paragraph("<b>Metric</b>", styles["cell_header"]),
        Paragraph("<b>Disparity</b>", styles["cell_header"]),
        Paragraph("<b>Threshold</b>", styles["cell_header"]),
        Paragraph("<b>Status</b>", styles["cell_header"]),
    ]
    overview_rows = [overview_header]
    row_colors: list[tuple] = []
    for i, m in enumerate(result.metric_results):
        status_label = _level_label(m.fairness_level)
        overview_rows.append([
            Paragraph(m.display_name, styles["cell"]),
            Paragraph(f"{m.disparity:.4f}", styles["cell"]),
            Paragraph(f"{m.threshold:.4f}", styles["cell"]),
            Paragraph(f"<b>{status_label}</b>", styles["cell_bold"]),
        ])
        row_colors.append((_level_bg(m.fairness_level), _level_color(m.fairness_level)))

    w1 = 3.2 * inch
    w_rest = (doc.width - w1) / 3
    overview_table = _styled_table(
        overview_rows, col_widths=[w1, w_rest, w_rest, w_rest],
    )
    # Apply per-row status colors on the Status column
    for i, (bg, fg) in enumerate(row_colors):
        row_idx = i + 1  # skip header
        overview_table.setStyle(TableStyle([
            ("BACKGROUND", (3, row_idx), (3, row_idx), bg),
            ("TEXTCOLOR", (3, row_idx), (3, row_idx), fg),
        ]))
    story.append(overview_table)

    # ── Detailed Metric Results ────────────────────────────────────────
    story.append(Spacer(1, 20))
    story.append(Paragraph("Detailed Results by Metric", styles["h1"]))

    for m in result.metric_results:
        story.append(Spacer(1, 8))
        status_label = _level_label(m.fairness_level)
        color = _level_color(m.fairness_level)
        hex_color = {_GREEN: "#2d6a4f", _RED: "#e63946", _YELLOW: "#e9c46a"}[color]
        story.append(Paragraph(
            f'{m.display_name} — '
            f'<font color="{hex_color}"><b>{status_label}</b></font>',
            styles["h2"],
        ))
        story.append(Paragraph(
            f"Disparity: <b>{m.disparity:.4f}</b> &nbsp;(threshold: {m.threshold:.4f})",
            styles["body"],
        ))
        story.append(Spacer(1, 4))

        if m.group_results:
            grp_header = [
                Paragraph("<b>Group</b>", styles["cell_header"]),
                Paragraph("<b>Rate</b>", styles["cell_header"]),
                Paragraph("<b>Sample Size</b>", styles["cell_header"]),
            ]
            grp_rows = [grp_header]

            # Find min and max rates for highlighting
            rates = [g.rate for g in m.group_results]
            min_rate = min(rates)
            max_rate = max(rates)

            for g in m.group_results:
                grp_rows.append([
                    Paragraph(g.group_label, styles["cell"]),
                    Paragraph(f"{g.rate:.4f}", styles["cell"]),
                    Paragraph(f"{g.sample_size:,}", styles["cell"]),
                ])

            grp_table = _styled_table(
                grp_rows, col_widths=[2.5 * inch, 2.25 * inch, 2.25 * inch],
            )

            # Highlight min/max rate rows
            for j, g in enumerate(m.group_results):
                row_j = j + 1
                if len(m.group_results) > 1 and max_rate != min_rate:
                    if g.rate == min_rate:
                        grp_table.setStyle(TableStyle([
                            ("BACKGROUND", (1, row_j), (1, row_j), _LIGHT_RED),
                        ]))
                    elif g.rate == max_rate:
                        grp_table.setStyle(TableStyle([
                            ("BACKGROUND", (1, row_j), (1, row_j), _LIGHT_GREEN),
                        ]))

            story.append(grp_table)

    # ── Compliance Requirements ────────────────────────────────────────
    if result.jurisdiction:
        requirements = get_compliance_requirements(result.jurisdiction)
        if requirements:
            story.append(PageBreak())
            story.append(Paragraph("Regulatory Compliance", styles["h1"]))
            story.append(Paragraph(
                f"Requirements under <b>{result.jurisdiction.upper().replace('-', ' ')}</b> for "
                f"clinical domain: <b>{result.clinical_domain or 'general'}</b>.",
                styles["body"],
            ))
            story.append(Spacer(1, 10))

            comp_header = [
                Paragraph("<b>Article</b>", styles["cell_header"]),
                Paragraph("<b>Requirement</b>", styles["cell_header"]),
                Paragraph("<b>Description</b>", styles["cell_header"]),
                Paragraph("<b>Evidence Needed</b>", styles["cell_header"]),
            ]
            comp_rows = [comp_header]
            for r in requirements:
                comp_rows.append([
                    Paragraph(r.article, styles["cell"]),
                    Paragraph(r.requirement, styles["cell"]),
                    Paragraph(r.description, styles["cell"]),
                    Paragraph(r.evidence_needed, styles["cell"]),
                ])

            comp_table = _styled_table(
                comp_rows,
                col_widths=[0.9 * inch, 1.3 * inch, 2.8 * inch, 2 * inch],
            )
            story.append(comp_table)

    # ── Build ──────────────────────────────────────────────────────────
    doc.build(story)
    pdf_bytes = buf.getvalue()
    buf.close()

    if output_path is not None:
        Path(output_path).write_bytes(pdf_bytes)

    return pdf_bytes
