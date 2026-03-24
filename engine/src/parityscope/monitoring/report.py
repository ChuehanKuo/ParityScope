"""Monitoring-specific report generation.

Produces JSON and PDF reports showing metric trends, drift status,
and alert history over time — satisfying EU AI Act Article 61
post-market monitoring requirements.
"""

from __future__ import annotations

import json
from io import BytesIO
from pathlib import Path

from parityscope.monitoring.dashboard import DashboardAPI
from parityscope.monitoring.store import MonitoringStore


def generate_monitoring_json_report(
    store: MonitoringStore,
    model_name: str,
    limit: int = 20,
) -> str:
    """Generate a JSON monitoring report with full history and analysis."""
    api = DashboardAPI(store)
    dashboard = api.full_dashboard(model_name)

    # Add audit history
    audits = store.list_audits(model_name, limit=limit)
    dashboard["audit_history"] = [
        {
            "audit_id": a.audit_id,
            "timestamp": a.timestamp,
            "overall_fairness": a.overall_fairness,
            "total_samples": a.total_samples,
            "fair": a.n_fair,
            "marginal": a.n_marginal,
            "unfair": a.n_unfair,
        }
        for a in audits
    ]

    # Add metric time series for all metrics
    metric_names = store.get_all_metric_names(model_name)
    dashboard["metric_timeseries"] = {}
    for mn in metric_names:
        ts = api.metric_timeseries(model_name, mn, limit=limit)
        dashboard["metric_timeseries"][mn] = ts["data"]

    return json.dumps(dashboard, indent=2, default=str)


def generate_monitoring_pdf_report(
    store: MonitoringStore,
    model_name: str,
    output_path: str | Path | None = None,
    limit: int = 20,
) -> bytes:
    """Generate a PDF monitoring report with trends and drift analysis."""
    from reportlab.platypus import HRFlowable, PageBreak, Paragraph, Spacer

    from parityscope.reports.pdf_common import (
        GREEN, GREY_BORDER, RED, YELLOW, build_styles, create_document,
        styled_table,
    )

    api = DashboardAPI(store)
    dashboard = api.full_dashboard(model_name)
    summary = dashboard["summary"]
    drift = dashboard["drift"]
    trends = dashboard["trends"]
    alerts = dashboard["alerts"]

    styles = build_styles()
    buf = BytesIO()
    doc = create_document(buf)
    story: list = []

    # Cover
    story.append(Spacer(1, 40))
    story.append(Paragraph("Continuous Monitoring Report", styles["title"]))
    story.append(Paragraph(f"Model: {model_name}", styles["subtitle"]))
    story.append(HRFlowable(width="100%", thickness=2, color=GREY_BORDER, spaceAfter=16))

    # Overview
    story.append(Paragraph("1. Monitoring Overview", styles["h1"]))
    latest = summary.get("latest")
    if latest:
        story.append(Paragraph(
            f"Total audits recorded: <b>{summary['total_audits']}</b><br/>"
            f"Latest audit: <b>{latest['timestamp'][:10]}</b><br/>"
            f"Current status: <b>{latest['overall_fairness'].upper()}</b><br/>"
            f"Active alerts: <b>{summary['active_alert_count']}</b>",
            styles["body"],
        ))
    else:
        story.append(Paragraph("No audits recorded yet.", styles["body"]))

    story.append(Spacer(1, 16))

    # Audit history table
    story.append(Paragraph("2. Audit History", styles["h1"]))
    audits = store.list_audits(model_name, limit=limit)
    if audits:
        hist_header = [
            Paragraph("<b>Date</b>", styles["cell_header"]),
            Paragraph("<b>Status</b>", styles["cell_header"]),
            Paragraph("<b>Fair</b>", styles["cell_header"]),
            Paragraph("<b>Marginal</b>", styles["cell_header"]),
            Paragraph("<b>Unfair</b>", styles["cell_header"]),
            Paragraph("<b>Samples</b>", styles["cell_header"]),
        ]
        hist_rows = [hist_header]
        for a in audits:
            hist_rows.append([
                Paragraph(a.timestamp[:10], styles["cell"]),
                Paragraph(a.overall_fairness.upper(), styles["cell_bold"]),
                Paragraph(str(a.n_fair), styles["cell"]),
                Paragraph(str(a.n_marginal), styles["cell"]),
                Paragraph(str(a.n_unfair), styles["cell"]),
                Paragraph(f"{a.total_samples:,}", styles["cell"]),
            ])
        story.append(styled_table(hist_rows))

    # Drift analysis
    story.append(PageBreak())
    story.append(Paragraph("3. Drift Analysis", styles["h1"]))
    if drift.get("drifted_metrics"):
        story.append(Paragraph(
            f"<b>{drift['drifted_count']}</b> metric(s) show significant drift from baseline.",
            styles["body"],
        ))
        story.append(Spacer(1, 8))
        drift_header = [
            Paragraph("<b>Metric</b>", styles["cell_header"]),
            Paragraph("<b>Baseline</b>", styles["cell_header"]),
            Paragraph("<b>Current</b>", styles["cell_header"]),
            Paragraph("<b>Change</b>", styles["cell_header"]),
            Paragraph("<b>Direction</b>", styles["cell_header"]),
        ]
        drift_rows = [drift_header]
        for d in drift["drifted_metrics"]:
            drift_rows.append([
                Paragraph(d["metric"], styles["cell"]),
                Paragraph(f"{d['baseline']:.4f}", styles["cell"]),
                Paragraph(f"{d['current']:.4f}", styles["cell"]),
                Paragraph(f"{d['change']:+.4f}", styles["cell_bold"]),
                Paragraph(d["direction"].upper(), styles["cell_bold"]),
            ])
        story.append(styled_table(drift_rows))
    else:
        story.append(Paragraph("No significant drift detected from baseline.", styles["body"]))

    # Trend analysis
    story.append(Spacer(1, 20))
    story.append(Paragraph("4. Trend Analysis", styles["h1"]))
    if trends.get("trends"):
        trend_header = [
            Paragraph("<b>Metric</b>", styles["cell_header"]),
            Paragraph("<b>Direction</b>", styles["cell_header"]),
            Paragraph("<b>Slope</b>", styles["cell_header"]),
            Paragraph("<b>Significance</b>", styles["cell_header"]),
            Paragraph("<b>Forecast</b>", styles["cell_header"]),
        ]
        trend_rows = [trend_header]
        for t in trends["trends"]:
            sig = "Yes" if t["p_value"] < 0.05 else "No"
            trend_rows.append([
                Paragraph(t["metric"], styles["cell"]),
                Paragraph(t["direction"].upper(), styles["cell_bold"]),
                Paragraph(f"{t['slope']:.6f}", styles["cell"]),
                Paragraph(sig, styles["cell"]),
                Paragraph(f"{t['forecast_next']:.4f}" if t["forecast_next"] else "N/A", styles["cell"]),
            ])
        story.append(styled_table(trend_rows))
    else:
        story.append(Paragraph("Insufficient data for trend analysis (need 3+ audits).", styles["body"]))

    # Alerts
    story.append(PageBreak())
    story.append(Paragraph("5. Alert Log", styles["h1"]))
    story.append(Paragraph(
        f"Active: <b>{alerts['active_count']}</b> | "
        f"Resolved: <b>{alerts['resolved_count']}</b>",
        styles["body"],
    ))
    if alerts.get("active"):
        story.append(Spacer(1, 8))
        alert_header = [
            Paragraph("<b>Severity</b>", styles["cell_header"]),
            Paragraph("<b>Rule</b>", styles["cell_header"]),
            Paragraph("<b>Metric</b>", styles["cell_header"]),
            Paragraph("<b>Message</b>", styles["cell_header"]),
        ]
        alert_rows = [alert_header]
        for a in alerts["active"][:20]:
            alert_rows.append([
                Paragraph(str(a.get("severity", "")).upper(), styles["cell_bold"]),
                Paragraph(str(a.get("rule_name", "")), styles["cell"]),
                Paragraph(str(a.get("metric_name", "")), styles["cell"]),
                Paragraph(str(a.get("message", "")), styles["cell"]),
            ])
        story.append(styled_table(alert_rows))

    # Article 61 compliance note
    story.append(Spacer(1, 20))
    story.append(Paragraph("6. EU AI Act Article 61 — Post-Market Monitoring", styles["h1"]))
    story.append(Paragraph(
        "This continuous monitoring report satisfies the documentation requirements "
        "of EU AI Act Article 61, which mandates post-market monitoring systems for "
        "high-risk AI systems. The monitoring system tracks fairness metrics over time, "
        "detects drift from established baselines, and generates alerts when metrics "
        "degrade beyond acceptable thresholds.",
        styles["body"],
    ))

    doc.build(story)
    pdf_bytes = buf.getvalue()
    buf.close()
    if output_path:
        Path(output_path).write_bytes(pdf_bytes)
    return pdf_bytes
