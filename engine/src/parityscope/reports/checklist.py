"""Compliance checklist generator.

Produces structured compliance checklists mapping audit results
to regulatory requirements with pass/fail status for each item.
"""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from io import BytesIO
from pathlib import Path

from parityscope.audit.result import AuditResult, FairnessLevel
from parityscope.regulations.mapping import get_compliance_requirements, get_jurisdiction_profile


@dataclass
class ChecklistItem:
    """A single compliance checklist item."""

    requirement: str
    article: str
    status: str  # PASS, FAIL, PARTIAL, NOT_ASSESSED
    evidence: str
    notes: str


@dataclass
class ComplianceChecklist:
    """Complete compliance checklist."""

    jurisdiction: str
    model_name: str
    timestamp: str
    items: list[ChecklistItem]
    pass_count: int
    fail_count: int
    partial_count: int


def generate_compliance_checklist(result: AuditResult) -> ComplianceChecklist:
    """Generate a compliance checklist from audit results.

    Maps each regulatory requirement to audit findings and determines
    pass/fail status.
    """
    jurisdiction = result.jurisdiction
    if not jurisdiction:
        return ComplianceChecklist(
            jurisdiction="none", model_name=result.model_name,
            timestamp=result.timestamp, items=[], pass_count=0,
            fail_count=0, partial_count=0,
        )

    requirements = get_compliance_requirements(jurisdiction)
    items: list[ChecklistItem] = []

    for req in requirements:
        status, evidence, notes = _assess_item(req.article, req.requirement, result)
        items.append(ChecklistItem(
            requirement=req.requirement,
            article=req.article,
            status=status,
            evidence=evidence,
            notes=notes,
        ))

    return ComplianceChecklist(
        jurisdiction=jurisdiction,
        model_name=result.model_name,
        timestamp=result.timestamp,
        items=items,
        pass_count=sum(1 for i in items if i.status == "PASS"),
        fail_count=sum(1 for i in items if i.status == "FAIL"),
        partial_count=sum(1 for i in items if i.status == "PARTIAL"),
    )


def checklist_to_dict(checklist: ComplianceChecklist) -> dict:
    """Serialize checklist to JSON-compatible dict."""
    return {
        "jurisdiction": checklist.jurisdiction,
        "model_name": checklist.model_name,
        "timestamp": checklist.timestamp,
        "pass_count": checklist.pass_count,
        "fail_count": checklist.fail_count,
        "partial_count": checklist.partial_count,
        "items": [
            {
                "requirement": i.requirement,
                "article": i.article,
                "status": i.status,
                "evidence": i.evidence,
                "notes": i.notes,
            }
            for i in checklist.items
        ],
    }


def checklist_to_pdf(
    checklist: ComplianceChecklist,
    output_path: str | Path | None = None,
) -> bytes:
    """Render checklist as PDF."""
    from reportlab.platypus import Paragraph, Spacer
    from parityscope.reports.pdf_common import build_styles, create_document, styled_table, GREY_BORDER

    styles = build_styles()
    buf = BytesIO()
    doc = create_document(buf)
    story: list = []

    story.append(Spacer(1, 20))
    story.append(Paragraph("Compliance Checklist", styles["title"]))
    story.append(Paragraph(
        f"Model: {checklist.model_name} | Jurisdiction: {checklist.jurisdiction} | "
        f"Date: {checklist.timestamp[:10]}",
        styles["subtitle"],
    ))

    summary = (
        f"<b>{checklist.pass_count}</b> PASS | "
        f"<b>{checklist.partial_count}</b> PARTIAL | "
        f"<b>{checklist.fail_count}</b> FAIL"
    )
    story.append(Paragraph(summary, styles["body"]))
    story.append(Spacer(1, 16))

    header = [
        Paragraph("<b>Article</b>", styles["cell_header"]),
        Paragraph("<b>Requirement</b>", styles["cell_header"]),
        Paragraph("<b>Status</b>", styles["cell_header"]),
        Paragraph("<b>Evidence</b>", styles["cell_header"]),
    ]
    rows = [header]
    for item in checklist.items:
        rows.append([
            Paragraph(item.article, styles["cell"]),
            Paragraph(item.requirement, styles["cell"]),
            Paragraph(f"<b>{item.status}</b>", styles["cell_bold"]),
            Paragraph(item.evidence, styles["cell"]),
        ])
    story.append(styled_table(rows))

    doc.build(story)
    pdf_bytes = buf.getvalue()
    buf.close()
    if output_path:
        Path(output_path).write_bytes(pdf_bytes)
    return pdf_bytes


def _assess_item(
    article: str, requirement: str, result: AuditResult
) -> tuple[str, str, str]:
    """Assess a single requirement, returning (status, evidence, notes)."""
    req_lower = requirement.lower()

    if "risk management" in req_lower or "risk" in req_lower and "management" in req_lower:
        if result.unfair_metrics:
            return (
                "PARTIAL",
                f"Audit identified {len(result.unfair_metrics)} unfair metrics.",
                "Risk assessment complete. Mitigation plan required.",
            )
        return ("PASS", "Fairness audit completed with no unfair metrics.", "")

    if "data" in req_lower and "governance" in req_lower:
        small = sum(1 for v in result.group_counts.values() if v < 30)
        if small > 0:
            return ("PARTIAL", f"{small} group(s) below minimum sample size.", "Data collection improvement recommended.")
        return ("PASS", "All groups have adequate sample sizes.", "")

    if "transparency" in req_lower:
        return ("PASS", "This audit report serves as transparency documentation.", "")

    if "accuracy" in req_lower:
        if result.overall_fairness == FairnessLevel.FAIR:
            return ("PASS", "All metrics within acceptable thresholds.", "")
        elif result.overall_fairness == FairnessLevel.UNFAIR:
            return ("FAIL", f"{len(result.unfair_metrics)} metrics exceed thresholds.", "Bias mitigation required.")
        return ("PARTIAL", f"{len(result.marginal_metrics)} metrics in marginal range.", "Monitoring recommended.")

    if "monitor" in req_lower or "post-market" in req_lower:
        return ("NOT_ASSESSED", "Continuous monitoring not yet implemented.", "Setup required.")

    if "impact" in req_lower:
        return ("PARTIAL" if result.unfair_metrics else "PASS", "Audit serves as impact assessment.", "")

    if "discrimination" in req_lower or "disparate" in req_lower:
        if result.overall_fairness == FairnessLevel.UNFAIR:
            return ("FAIL", f"Disparate impact detected in {len(result.unfair_metrics)} metrics.", "Remediation required.")
        return ("PASS", "No discriminatory outcomes detected.", "")

    return ("NOT_ASSESSED", "Requires manual review.", "")
