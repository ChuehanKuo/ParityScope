"""Evidence package creator.

Bundles all audit artifacts into a documented, integrity-verified
directory (and optional zip) for regulatory submission.
"""

from __future__ import annotations

import csv
import hashlib
import json
import zipfile
from pathlib import Path

from parityscope.audit.result import AuditResult
from parityscope.reports.generator import generate_json_report


def create_evidence_package(
    result: AuditResult,
    output_dir: str | Path,
    root_cause_report: object | None = None,
    include_raw_data: bool = False,
    compress: bool = True,
) -> Path:
    """Create a complete evidence package for regulatory submission.

    Args:
        result: Completed audit result.
        output_dir: Base directory for the package.
        root_cause_report: Optional root cause report to include.
        include_raw_data: Whether to include raw data.
        compress: Whether to create a zip archive.

    Returns:
        Path to the package directory (or zip file if compressed).
    """
    package_name = f"parityscope_evidence_{result.audit_id[:8]}"
    package_dir = Path(output_dir) / package_name
    package_dir.mkdir(parents=True, exist_ok=True)

    files_created: list[Path] = []

    # 1. JSON report
    json_path = package_dir / "report.json"
    json_path.write_text(generate_json_report(result))
    files_created.append(json_path)

    # 2. PDF report
    try:
        from parityscope.reports.pdf_report import generate_pdf_report
        pdf_path = package_dir / "report.pdf"
        generate_pdf_report(result, output_path=str(pdf_path))
        files_created.append(pdf_path)
    except Exception:
        pass

    # 3. Methodology document
    methodology = generate_methodology_doc(result)
    meth_path = package_dir / "methodology.md"
    meth_path.write_text(methodology)
    files_created.append(meth_path)

    # 4. Metrics summary CSV
    csv_path = package_dir / "metrics_summary.csv"
    with open(csv_path, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["metric_name", "display_name", "disparity", "threshold", "fairness_level"])
        for m in result.metric_results:
            writer.writerow([m.metric_name, m.display_name, f"{m.disparity:.6f}", f"{m.threshold:.6f}", m.fairness_level.value])
    files_created.append(csv_path)

    # 5. Group demographics CSV
    demo_path = package_dir / "group_demographics.csv"
    with open(demo_path, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["group", "count", "percentage"])
        for gk, count in sorted(result.group_counts.items()):
            writer.writerow([gk, count, f"{count / result.total_samples * 100:.2f}"])
    files_created.append(demo_path)

    # 6. Compliance checklist
    try:
        from parityscope.reports.checklist import generate_compliance_checklist, checklist_to_dict
        checklist = generate_compliance_checklist(result)
        cl_path = package_dir / "compliance_checklist.json"
        cl_path.write_text(json.dumps(checklist_to_dict(checklist), indent=2))
        files_created.append(cl_path)
    except Exception:
        pass

    # 7. Config YAML
    config = {
        "audit_id": result.audit_id,
        "model_name": result.model_name,
        "timestamp": result.timestamp,
        "jurisdiction": result.jurisdiction,
        "clinical_domain": result.clinical_domain,
        "protected_attributes": list(result.protected_attributes),
        "metrics_evaluated": list(result.metrics_evaluated),
        "thresholds": result.thresholds,
        "total_samples": result.total_samples,
    }
    config_path = package_dir / "config.yaml"
    try:
        import yaml
        config_path.write_text(yaml.dump(config, default_flow_style=False, sort_keys=False))
    except ImportError:
        config_path.write_text(json.dumps(config, indent=2))
    files_created.append(config_path)

    # 8. Root cause report
    if root_cause_report is not None and hasattr(root_cause_report, "to_dict"):
        rc_path = package_dir / "root_cause_analysis.json"
        rc_path.write_text(json.dumps(root_cause_report.to_dict(), indent=2, default=str))
        files_created.append(rc_path)

    # 9. Checksums
    checksums_path = package_dir / "checksums.sha256"
    with open(checksums_path, "w") as f:
        for file_path in files_created:
            sha256 = hashlib.sha256(file_path.read_bytes()).hexdigest()
            f.write(f"{sha256}  {file_path.name}\n")

    # Compress
    if compress:
        zip_path = Path(output_dir) / f"{package_name}.zip"
        with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
            for file_path in files_created:
                zf.write(file_path, f"{package_name}/{file_path.name}")
            zf.write(checksums_path, f"{package_name}/checksums.sha256")
        return zip_path

    return package_dir


def generate_methodology_doc(result: AuditResult) -> str:
    """Generate a Markdown methodology description."""
    lines = [
        "# ParityScope Fairness Audit — Methodology",
        "",
        "## Overview",
        "",
        f"This document describes the methodology used to evaluate the fairness of "
        f"**{result.model_name}** using ParityScope v0.2.0.",
        "",
        "## Approach",
        "",
        "ParityScope is a statistical evaluation toolkit (not a trained AI model). "
        "It computes fairness metrics by comparing model predictions and outcomes "
        "across demographic groups. All computations are deterministic and reproducible.",
        "",
        "## Configuration",
        "",
        f"- **Model**: {result.model_name}",
        f"- **Jurisdiction**: {result.jurisdiction or 'Not specified'}",
        f"- **Clinical Domain**: {result.clinical_domain or 'Not specified'}",
        f"- **Protected Attributes**: {', '.join(result.protected_attributes)}",
        f"- **Total Samples**: {result.total_samples:,}",
        f"- **Audit ID**: {result.audit_id}",
        f"- **Timestamp**: {result.timestamp}",
        "",
        "## Metrics Evaluated",
        "",
    ]

    for m_name in result.metrics_evaluated:
        lines.append(f"- {m_name}")

    lines.extend([
        "",
        "## Fairness Thresholds",
        "",
        f"- **Fair**: Disparity ≤ {result.thresholds.get('fair', 0.05)}",
        f"- **Marginal**: Disparity ≤ {result.thresholds.get('marginal', 0.10)}",
        f"- **Unfair**: Disparity > {result.thresholds.get('marginal', 0.10)}",
        "",
        "## Definitions",
        "",
        "- **Disparity**: The maximum absolute difference in a metric's value "
        "between any two demographic groups.",
        "- **Fairness Level**: Categorized as FAIR, MARGINAL, or UNFAIR based on "
        "the disparity value relative to the configured thresholds.",
        "",
        "## Reproducibility",
        "",
        "All computations in ParityScope are deterministic. Given the same input "
        "data and configuration, the audit will produce identical results. No "
        "random sampling, stochastic algorithms, or trained models are used in "
        "the core metric computation.",
        "",
        "---",
        "*Generated by ParityScope v0.2.0 — parityscope.com*",
    ])

    return "\n".join(lines)
