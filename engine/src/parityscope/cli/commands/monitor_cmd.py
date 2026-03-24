"""The ``parityscope monitor`` command group — continuous monitoring."""

from __future__ import annotations

import json
import sys
from pathlib import Path

import click
import pandas as pd

from parityscope.cli.display import (
    console, display_error, display_success, display_warning, display_welcome,
)


@click.group()
def monitor():
    """Continuous fairness monitoring for deployed models."""
    pass


@monitor.command()
@click.option("--data", type=click.Path(exists=True), required=True, help="Path to CSV/Excel data file.")
@click.option("--config", "config_path", type=click.Path(exists=True), help="Monitoring config YAML/JSON.")
@click.option("--db", default="./parityscope_monitoring.db", show_default=True, help="SQLite database path.")
@click.option("--model-name", default=None, help="Model identifier.")
@click.option("--attributes", multiple=True, help="Protected attributes.")
@click.option("--jurisdiction", default=None, help="Regulatory jurisdiction.")
@click.option("--tag", multiple=True, help="Key=value metadata tags.")
def run(data, config_path, db, model_name, attributes, jurisdiction, tag):
    """Run a monitoring audit and store results."""
    try:
        display_welcome()

        from parityscope.monitoring.config import MonitoringConfig, load_monitoring_config
        from parityscope.monitoring.session import MonitoringSession

        # Build config
        if config_path:
            cfg = load_monitoring_config(config_path)
        else:
            cfg = MonitoringConfig()

        # CLI overrides
        if model_name:
            cfg.model_name = model_name
        if attributes:
            cfg.protected_attributes = list(attributes)
        if jurisdiction:
            cfg.jurisdiction = jurisdiction
        if db:
            cfg.db_path = db

        if not cfg.model_name:
            display_error("--model-name is required.")
            sys.exit(1)
        if not cfg.protected_attributes:
            display_error("--attributes is required.")
            sys.exit(1)

        # Load data
        console.print(f"[bold]Loading data:[/bold] {data}")
        suffix = Path(data).suffix.lower()
        if suffix in (".xlsx", ".xls"):
            df = pd.read_excel(data)
        else:
            df = pd.read_csv(data)
        console.print(f"  {len(df):,} rows, {len(df.columns)} columns")

        # Extract arrays
        col_map = cfg.column_map or {}
        pred_col = col_map.get("predictions", "predictions")
        label_col = col_map.get("labels", "labels")
        score_col = col_map.get("scores", "scores")

        if pred_col not in df.columns or label_col not in df.columns:
            display_error(
                f"Column mapping error. Need '{pred_col}' and '{label_col}'. "
                f"Available: {list(df.columns)}. Use a config file with column_map."
            )
            sys.exit(1)

        y_pred = df[pred_col].values
        y_true = df[label_col].values
        y_score = df[score_col].values if score_col in df.columns else None
        demographics = df[list(cfg.protected_attributes)]

        # Parse tags
        tags = {}
        for t in tag:
            if "=" in t:
                k, v = t.split("=", 1)
                tags[k.strip()] = v.strip()

        # Run monitoring
        console.print("[bold]Running monitoring audit...[/bold]")
        session = MonitoringSession(cfg)
        result = session.run_audit(y_true, y_pred, demographics, y_score, tags)

        # Display results
        audit = result.audit_result
        console.print()

        if result.is_first_run:
            console.print("[yellow]First monitoring run — this audit is now the baseline.[/yellow]")

        console.print(f"Overall: [bold]{audit.overall_fairness.value.upper()}[/bold]")
        console.print(
            f"Metrics: {len(audit.fair_metrics)} fair, "
            f"{len(audit.marginal_metrics)} marginal, "
            f"{len(audit.unfair_metrics)} unfair"
        )

        # Drift
        if result.drift_results:
            drifted = [d for d in result.drift_results if d.is_drifted]
            if drifted:
                console.print(f"\n[red bold]Drift detected in {len(drifted)} metric(s):[/red bold]")
                for d in drifted:
                    console.print(f"  {d.metric_name}: {d.baseline_disparity:.4f} → {d.current_disparity:.4f} ({d.direction})")
            else:
                console.print("\n[green]No drift detected from baseline.[/green]")

        # Alerts
        if result.alerts:
            console.print(f"\n[red bold]{len(result.alerts)} alert(s) triggered:[/red bold]")
            for a in result.alerts[:5]:
                console.print(f"  [{a.severity.value.upper()}] {a.message}")

        # Trends
        if result.trend_results:
            concerning = [t for t in result.trend_results if t.direction == "increasing"]
            if concerning:
                console.print(f"\n[yellow]Concerning trends in {len(concerning)} metric(s):[/yellow]")
                for t in concerning:
                    console.print(f"  {t.metric_name}: increasing (slope={t.slope:.6f}, p={t.p_value:.4f})")

        status = session.get_status()
        console.print(f"\nTotal audits stored: {status['total_audits']}")
        console.print(f"Database: {cfg.db_path}")
        display_success("Monitoring audit complete.")

    except Exception as e:
        display_error(str(e))
        console.print_exception()
        sys.exit(1)


@monitor.command()
@click.option("--db", default="./parityscope_monitoring.db", help="SQLite database path.")
@click.option("--model-name", required=True, help="Model identifier.")
def status(db, model_name):
    """Show current monitoring status for a model."""
    from parityscope.monitoring.store import MonitoringStore

    store = MonitoringStore(db)
    latest = store.get_latest_audit(model_name)
    total = store.get_audit_count(model_name)
    active_alerts = store.get_alerts(model_name, resolved=False)
    baseline_id = store.get_baseline_id(model_name)

    console.print(f"[bold]Model:[/bold] {model_name}")
    console.print(f"[bold]Database:[/bold] {db}")
    console.print(f"[bold]Total audits:[/bold] {total}")
    console.print(f"[bold]Baseline:[/bold] {baseline_id or 'not set'}")

    if latest:
        console.print(f"\n[bold]Latest audit:[/bold]")
        console.print(f"  ID: {latest.audit_id}")
        console.print(f"  Date: {latest.timestamp}")
        console.print(f"  Status: {latest.overall_fairness.upper()}")
        console.print(f"  Fair: {latest.n_fair} | Marginal: {latest.n_marginal} | Unfair: {latest.n_unfair}")

    if active_alerts:
        console.print(f"\n[red bold]{len(active_alerts)} active alert(s):[/red bold]")
        for a in active_alerts[:5]:
            console.print(f"  [{a['severity'].upper()}] {a['message']}")
    else:
        console.print("\n[green]No active alerts.[/green]")

    store.close()


@monitor.command()
@click.option("--db", default="./parityscope_monitoring.db", help="SQLite database path.")
@click.option("--model-name", required=True, help="Model identifier.")
@click.option("--limit", default=20, help="Number of audits to show.")
def history(db, model_name, limit):
    """Show audit history for a model."""
    from rich.table import Table
    from parityscope.monitoring.store import MonitoringStore

    store = MonitoringStore(db)
    audits = store.list_audits(model_name, limit=limit)

    if not audits:
        console.print(f"No audits found for model '{model_name}'.")
        store.close()
        return

    table = Table(title=f"Audit History — {model_name}")
    table.add_column("Date", style="cyan")
    table.add_column("Status")
    table.add_column("Fair", justify="right")
    table.add_column("Marginal", justify="right")
    table.add_column("Unfair", justify="right")
    table.add_column("Samples", justify="right")

    for a in audits:
        status_style = {"fair": "green", "marginal": "yellow", "unfair": "red"}.get(a.overall_fairness, "")
        table.add_row(
            a.timestamp[:10],
            f"[{status_style}]{a.overall_fairness.upper()}[/{status_style}]",
            str(a.n_fair), str(a.n_marginal), str(a.n_unfair),
            f"{a.total_samples:,}",
        )

    console.print(table)
    store.close()


@monitor.command()
@click.option("--db", default="./parityscope_monitoring.db", help="SQLite database path.")
@click.option("--model-name", required=True, help="Model identifier.")
@click.option("--format", "fmt", type=click.Choice(["json", "pdf", "both"]), default="both")
@click.option("--output-dir", default=".", help="Output directory.")
def report(db, model_name, fmt, output_dir):
    """Generate a monitoring report with trends and drift analysis."""
    from parityscope.monitoring.store import MonitoringStore
    from parityscope.monitoring.report import (
        generate_monitoring_json_report, generate_monitoring_pdf_report,
    )

    store = MonitoringStore(db)
    Path(output_dir).mkdir(parents=True, exist_ok=True)

    if fmt in ("json", "both"):
        json_report = generate_monitoring_json_report(store, model_name)
        json_path = Path(output_dir) / f"{model_name}_monitoring_report.json"
        json_path.write_text(json_report)
        console.print(f"JSON report: {json_path}")

    if fmt in ("pdf", "both"):
        pdf_path = Path(output_dir) / f"{model_name}_monitoring_report.pdf"
        generate_monitoring_pdf_report(store, model_name, output_path=str(pdf_path))
        console.print(f"PDF report: {pdf_path}")

    store.close()
    display_success("Monitoring report generated.")


@monitor.command(name="set-baseline")
@click.option("--db", default="./parityscope_monitoring.db", help="SQLite database path.")
@click.option("--model-name", required=True, help="Model identifier.")
@click.option("--audit-id", default=None, help="Specific audit ID to use as baseline (default: latest).")
def set_baseline(db, model_name, audit_id):
    """Set the baseline audit for drift detection."""
    from parityscope.monitoring.store import MonitoringStore

    store = MonitoringStore(db)
    if audit_id is None:
        latest = store.get_latest_audit(model_name)
        if not latest:
            display_error(f"No audits found for model '{model_name}'.")
            store.close()
            sys.exit(1)
        audit_id = latest.audit_id

    store.set_baseline(model_name, audit_id)
    console.print(f"Baseline set to audit [bold]{audit_id}[/bold] for model [bold]{model_name}[/bold].")
    store.close()


@monitor.command()
@click.option("--db", default="./parityscope_monitoring.db", help="SQLite database path.")
@click.option("--model-name", required=True, help="Model identifier.")
def alerts(db, model_name):
    """Show active alerts for a model."""
    from parityscope.monitoring.store import MonitoringStore

    store = MonitoringStore(db)
    active = store.get_alerts(model_name, resolved=False)

    if not active:
        console.print(f"[green]No active alerts for model '{model_name}'.[/green]")
    else:
        console.print(f"[red bold]{len(active)} active alert(s):[/red bold]")
        for a in active:
            console.print(f"  [{a['severity'].upper()}] {a['rule_name']}: {a['message']}")

    store.close()


@monitor.command()
@click.option("--db", default="./parityscope_monitoring.db", help="SQLite database path.")
@click.option("--model-name", required=True, help="Model identifier.")
@click.option("--output", default=None, help="Save to JSON file.")
def dashboard(db, model_name, output):
    """Get full dashboard data as JSON."""
    from parityscope.monitoring.store import MonitoringStore
    from parityscope.monitoring.dashboard import DashboardAPI

    store = MonitoringStore(db)
    api = DashboardAPI(store)
    data = api.full_dashboard(model_name)
    store.close()

    json_str = json.dumps(data, indent=2, default=str)
    if output:
        Path(output).write_text(json_str)
        console.print(f"Dashboard data saved to {output}")
    else:
        console.print(json_str)
