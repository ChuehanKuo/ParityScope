"""ParityScope CLI — command-line interface for fairness auditing.

Usage:
    parityscope audit --data data.csv --model my_model --attrs race,sex
    parityscope serve --port 8000
    parityscope report --audit-id <id> --format pdf
    parityscope history --model my_model
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import click
import numpy as np
import pandas as pd


@click.group()
@click.version_option(package_name="parityscope")
def main():
    """ParityScope — Healthcare AI Fairness Compliance Toolkit."""
    pass


@main.command()
@click.option("--data", "-d", required=True, type=click.Path(exists=True),
              help="Path to CSV file with predictions and demographics")
@click.option("--model", "-m", required=True, help="Model name identifier")
@click.option("--y-true", default="y_true", help="Column name for ground truth labels")
@click.option("--y-pred", default="y_pred", help="Column name for predictions")
@click.option("--y-score", default=None, help="Column name for probability scores (optional)")
@click.option("--attrs", "-a", required=True,
              help="Comma-separated protected attributes (e.g., race,sex,age_group)")
@click.option("--jurisdiction", "-j", default=None,
              help="Regulatory jurisdiction (eu-ai-act, section-1557, south-korea, taiwan)")
@click.option("--domain", default=None,
              help="Clinical domain (diagnosis, risk_stratification, treatment_recommendation, triage)")
@click.option("--output", "-o", default=None, help="Output file path (JSON)")
@click.option("--pdf", default=None, help="PDF report output path")
@click.option("--store/--no-store", default=False, help="Persist result to database")
def audit(data, model, y_true, y_pred, y_score, attrs, jurisdiction, domain, output, pdf, store):
    """Run a fairness audit on a CSV dataset."""
    from parityscope import FairnessAudit
    from parityscope.reports.generator import generate_json_report, generate_summary
    from parityscope.reports.pdf_report import generate_pdf_report

    df = pd.read_csv(data)
    protected_attributes = [a.strip() for a in attrs.split(",")]

    # Validate columns exist
    required_cols = [y_true, y_pred] + protected_attributes
    if y_score:
        required_cols.append(y_score)
    missing = [c for c in required_cols if c not in df.columns]
    if missing:
        click.echo(f"Error: Missing columns in data: {missing}", err=True)
        click.echo(f"Available columns: {list(df.columns)}", err=True)
        sys.exit(1)

    audit_engine = FairnessAudit(
        model_name=model,
        protected_attributes=protected_attributes,
        jurisdiction=jurisdiction,
        clinical_domain=domain,
    )

    result = audit_engine.run(
        y_true=df[y_true].values,
        y_pred=df[y_pred].values,
        demographics=df[protected_attributes],
        y_score=df[y_score].values if y_score else None,
    )

    # Print summary
    summary = generate_summary(result)
    click.echo(summary)

    # Save JSON report
    if output:
        report = generate_json_report(result)
        Path(output).write_text(report)
        click.echo(f"\nJSON report saved to: {output}")

    # Save PDF report
    if pdf:
        generate_pdf_report(result, output_path=pdf)
        click.echo(f"PDF report saved to:  {pdf}")

    # Persist to database
    if store:
        from parityscope.db import AuditStore
        db = AuditStore()
        record_id = db.save(result)
        db.save_alerts(result)
        click.echo(f"Result stored (ID: {record_id})")

    # Exit code based on result
    if result.overall_fairness.value == "unfair":
        sys.exit(1)
    elif result.overall_fairness.value == "marginal":
        sys.exit(2)
    sys.exit(0)


@main.command()
@click.option("--port", "-p", default=8000, help="Port to listen on")
@click.option("--host", default="0.0.0.0", help="Host to bind to")
@click.option("--reload", is_flag=True, help="Enable auto-reload for development")
def serve(port, host, reload):
    """Start the ParityScope API server."""
    try:
        import uvicorn
    except ImportError:
        click.echo("Error: Install API dependencies: pip install parityscope[api]", err=True)
        sys.exit(1)

    click.echo(f"Starting ParityScope API server on {host}:{port}")
    click.echo(f"API docs: http://{host}:{port}/docs")
    uvicorn.run("parityscope.api:app", host=host, port=port, reload=reload)


@main.command()
@click.option("--model", "-m", required=True, help="Model name to query")
@click.option("--limit", default=20, help="Number of records to show")
def history(model, limit):
    """Show audit history for a model."""
    from parityscope.db import AuditStore

    store = AuditStore()
    records = store.get_history(model, limit=limit)

    if not records:
        click.echo(f"No audit history for model '{model}'")
        return

    click.echo(f"Audit history for: {model}")
    click.echo(f"{'Timestamp':<26} {'Status':<10} {'Metrics':>8} {'Unfair':>7} {'Max Disp':>9}")
    click.echo("-" * 65)
    for r in records:
        ts = r["timestamp"][:19] if r["timestamp"] else "N/A"
        click.echo(
            f"{ts:<26} {r['overall_fairness']:<10} "
            f"{r['total_metrics']:>8} {r['unfair_count']:>7} "
            f"{r['max_disparity']:>8.4f}"
        )


@main.command()
@click.option("--model", "-m", default=None, help="Filter by model name")
@click.option("--all", "show_all", is_flag=True, help="Include resolved alerts")
def alerts(model, show_all):
    """Show fairness alerts."""
    from parityscope.db import AuditStore

    store = AuditStore()
    records = store.get_alerts(model_name=model, unresolved_only=not show_all)

    if not records:
        click.echo("No alerts found.")
        return

    click.echo(f"{'Timestamp':<20} {'Model':<20} {'Metric':<30} {'Level':<10} {'Disparity':>9}")
    click.echo("-" * 95)
    for r in records:
        ts = r["timestamp"][:19] if r["timestamp"] else "N/A"
        click.echo(
            f"{ts:<20} {r['model_name']:<20} {r['metric_name']:<30} "
            f"{r['fairness_level']:<10} {r['disparity']:>8.4f}"
        )


@main.command()
def demo():
    """Run a demo audit with synthetic data."""
    click.echo("Running ParityScope demo with synthetic sepsis risk data...")
    click.echo()

    # Import and run the demo
    from parityscope.demo_data import generate_biased_sepsis_model
    from parityscope import FairnessAudit
    from parityscope.reports.generator import generate_summary

    y_true, y_pred, y_score, demographics = generate_biased_sepsis_model()

    audit = FairnessAudit(
        model_name="sepsis_risk_demo",
        protected_attributes=["race", "sex"],
        jurisdiction="eu-ai-act",
        clinical_domain="diagnosis",
    )

    result = audit.run(
        y_true=y_true,
        y_pred=y_pred,
        demographics=demographics,
        y_score=y_score,
    )

    click.echo(generate_summary(result))


@main.command()
def jurisdictions():
    """List available regulatory jurisdictions."""
    from parityscope.regulations.mapping import list_jurisdictions, get_jurisdiction_profile

    for jid in list_jurisdictions():
        profile = get_jurisdiction_profile(jid)
        click.echo(f"  {jid:<20} {profile.name}")
        click.echo(f"  {'':20} Penalty: {profile.penalty_description}")
        click.echo(f"  {'':20} Metrics: {len(profile.recommended_metrics)}")
        click.echo()


@main.command()
def metrics():
    """List all available fairness metrics."""
    from parityscope.metrics.registry import list_metrics

    all_metrics = list_metrics()
    click.echo(f"Available metrics ({len(all_metrics)}):\n")
    for m in all_metrics:
        click.echo(f"  {m.name:<40} [{m.input_type.value}]")
        click.echo(f"  {'':40} {m.description}")
        click.echo()


if __name__ == "__main__":
    main()
