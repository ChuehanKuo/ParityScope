"""The ``parityscope report`` command — standalone report generation.

Generates formatted reports from a previously saved audit JSON file.

Usage example::

    parityscope report --input audit_result.json --format eu-ai-act --output report.pdf
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import click

from parityscope.cli.display import (
    console,
    display_error,
    display_success,
    display_welcome,
)


@click.command()
@click.option(
    "--input",
    "input_path",
    required=True,
    type=click.Path(exists=True),
    help="Path to a saved audit result JSON file.",
)
@click.option(
    "--format",
    "report_format",
    type=click.Choice(
        ["eu-ai-act", "fda", "section-1557", "executive", "evidence-package"],
        case_sensitive=False,
    ),
    default="executive",
    show_default=True,
    help="Report format / template.",
)
@click.option(
    "--output",
    type=click.Path(),
    default=None,
    help="Output file path. If omitted, auto-generated from the input filename.",
)
@click.option(
    "--device-name",
    default=None,
    help="Device name for FDA reports.",
)
@click.option(
    "--device-class",
    default=None,
    help="Device class for FDA reports (e.g., 'Class II').",
)
def report(
    input_path: str,
    report_format: str,
    output: str | None,
    device_name: str | None,
    device_class: str | None,
) -> None:
    """Generate a formatted report from a saved audit JSON.

    Reads a previously exported audit result and produces a report in
    the requested regulatory or executive format.
    """
    try:
        display_welcome()

        console.print(f"[bold]Loading audit result from:[/bold] {input_path}")

        # Load audit JSON
        audit_data = _load_audit_json(input_path)

        # Reconstruct AuditResult
        result = _reconstruct_result(audit_data)

        # Determine output path
        if output is None:
            stem = Path(input_path).stem
            ext = "pdf" if report_format != "evidence-package" else "json"
            output = f"{stem}_{report_format}.{ext}"

        console.print(f"[bold]Generating {report_format} report...[/bold]")

        if report_format == "evidence-package":
            _generate_evidence_package(audit_data, output, device_name, device_class)
        elif report_format in ("eu-ai-act", "section-1557", "fda"):
            _generate_regulatory_report(result, report_format, output, device_name, device_class)
        elif report_format == "executive":
            _generate_executive_report(result, output)
        else:
            display_error(f"Unknown report format: {report_format}")
            sys.exit(1)

        display_success(f"Report saved to {output}")

    except Exception as exc:
        display_error(str(exc))
        sys.exit(1)


def _load_audit_json(path: str) -> dict:
    """Load and parse an audit result JSON file."""
    try:
        text = Path(path).read_text(encoding="utf-8")
        data = json.loads(text)
    except json.JSONDecodeError as exc:
        raise click.BadParameter(f"Invalid JSON in '{path}': {exc}") from exc
    return data


def _reconstruct_result(data: dict):
    """Reconstruct an AuditResult from a serialised dictionary.

    Returns an AuditResult dataclass instance if possible, otherwise returns
    the raw dictionary for template-based report generation.
    """
    try:
        from parityscope.audit.result import (
            AuditResult,
            FairnessLevel,
            GroupResult,
            MetricResult,
        )

        metric_results = []
        for m in data.get("metric_results", []):
            group_results = tuple(
                GroupResult(
                    group_label=g["group"],
                    rate=float(g["rate"]),
                    sample_size=int(g["sample_size"]),
                )
                for g in m.get("group_results", [])
            )
            metric_results.append(
                MetricResult(
                    metric_name=m["metric_name"],
                    display_name=m["display_name"],
                    disparity=float(m["disparity"]),
                    fairness_level=FairnessLevel(m["fairness_level"]),
                    group_results=group_results,
                    threshold=float(m["threshold"]),
                )
            )

        return AuditResult(
            audit_id=data["audit_id"],
            model_name=data["model_name"],
            timestamp=data["timestamp"],
            protected_attributes=tuple(data.get("protected_attributes", [])),
            metrics_evaluated=tuple(data.get("metrics_evaluated", [])),
            jurisdiction=data.get("jurisdiction"),
            clinical_domain=data.get("clinical_domain"),
            thresholds=data.get("thresholds", {}),
            metric_results=tuple(metric_results),
            overall_fairness=FairnessLevel(data["overall_fairness"]),
            total_samples=int(data["total_samples"]),
            group_counts=data.get("group_counts", {}),
        )
    except (KeyError, TypeError, ValueError) as exc:
        console.print(f"[yellow]Warning: Could not fully reconstruct AuditResult: {exc}[/yellow]")
        console.print("[yellow]Falling back to dictionary-based report generation.[/yellow]")
        return data


def _generate_regulatory_report(
    result,
    report_format: str,
    output: str,
    device_name: str | None,
    device_class: str | None,
) -> None:
    """Generate a regulatory-format report (EU AI Act, FDA, Section 1557)."""
    out_path = Path(output)

    if out_path.suffix == ".pdf":
        try:
            from parityscope.reports.pdf_report import generate_pdf_report

            generate_pdf_report(result, output_path=str(out_path))
            return
        except (ImportError, TypeError):
            # Fall back to JSON if PDF not available or result is a dict
            out_path = out_path.with_suffix(".json")

    # JSON report with compliance info
    from parityscope.reports.generator import generate_json_report

    if isinstance(result, dict):
        # If we couldn't reconstruct, just dump with compliance context
        report_data = dict(result)
        report_data["report_format"] = report_format
        if device_name:
            report_data.setdefault("device_info", {})["device_name"] = device_name
        if device_class:
            report_data.setdefault("device_info", {})["device_class"] = device_class
        out_path.write_text(json.dumps(report_data, indent=2, default=str), encoding="utf-8")
    else:
        json_text = generate_json_report(result)
        report_data = json.loads(json_text)
        report_data["report_format"] = report_format
        if device_name:
            report_data.setdefault("device_info", {})["device_name"] = device_name
        if device_class:
            report_data.setdefault("device_info", {})["device_class"] = device_class
        out_path.write_text(json.dumps(report_data, indent=2, default=str), encoding="utf-8")


def _generate_executive_report(result, output: str) -> None:
    """Generate an executive summary report."""
    out_path = Path(output)

    if out_path.suffix == ".pdf":
        try:
            from parityscope.reports.pdf_report import generate_pdf_report

            generate_pdf_report(result, output_path=str(out_path))
            return
        except (ImportError, TypeError):
            out_path = out_path.with_suffix(".txt")

    # Text summary fallback
    if isinstance(result, dict):
        out_path.write_text(json.dumps(result, indent=2, default=str), encoding="utf-8")
    else:
        from parityscope.reports.generator import generate_summary

        summary = generate_summary(result)
        out_path.write_text(summary, encoding="utf-8")


def _generate_evidence_package(
    audit_data: dict,
    output: str,
    device_name: str | None,
    device_class: str | None,
) -> None:
    """Generate an evidence package JSON containing all audit artefacts."""
    package = {
        "evidence_package_version": "1.0",
        "audit_result": audit_data,
    }

    if device_name or device_class:
        package["device_info"] = {}
        if device_name:
            package["device_info"]["device_name"] = device_name
        if device_class:
            package["device_info"]["device_class"] = device_class

    out_path = Path(output)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(package, indent=2, default=str), encoding="utf-8")
