"""Rich terminal output formatting for ParityScope CLI.

Provides styled console output including tables, panels, progress bars,
and coloured status messages for audit results and data profiles.
"""

from __future__ import annotations

from contextlib import contextmanager
from typing import Any

from rich.console import Console
from rich.panel import Panel
from rich.progress import Progress, SpinnerColumn, TextColumn, BarColumn, TimeElapsedColumn
from rich.table import Table
from rich.text import Text

# ---------------------------------------------------------------------------
# Module-level console singleton
# ---------------------------------------------------------------------------

console = Console()

# ---------------------------------------------------------------------------
# Colour helpers
# ---------------------------------------------------------------------------

_LEVEL_COLOURS = {
    "fair": "green",
    "marginal": "yellow",
    "unfair": "red",
}

_LEVEL_ICONS = {
    "fair": "[green]FAIR[/green]",
    "marginal": "[yellow]MARGINAL[/yellow]",
    "unfair": "[red]UNFAIR[/red]",
}


def _fairness_colour(level: str) -> str:
    """Return a Rich colour name for the given fairness level string."""
    return _LEVEL_COLOURS.get(level, "white")


def _fairness_label(level: str) -> str:
    """Return a Rich-styled label for the given fairness level string."""
    return _LEVEL_ICONS.get(level, level)


# ---------------------------------------------------------------------------
# Display functions
# ---------------------------------------------------------------------------


def display_audit_result(result: Any) -> None:
    """Display a complete audit result in the terminal.

    Renders:
    - Overall verdict panel (green/yellow/red)
    - Summary table with fair/marginal/unfair counts
    - Metrics table with disparity, threshold, and status
    - Group demographics table

    Args:
        result: An ``AuditResult`` instance (from ``parityscope.audit.result``).
    """
    # --- Overall verdict panel ---
    level_str = result.overall_fairness.value if hasattr(result.overall_fairness, "value") else str(result.overall_fairness)
    colour = _fairness_colour(level_str)
    verdict_text = Text(f"Overall Assessment: {level_str.upper()}", style=f"bold {colour}")

    console.print()
    console.print(
        Panel(
            verdict_text,
            title="[bold]Audit Verdict[/bold]",
            border_style=colour,
            padding=(1, 4),
        )
    )

    # --- Summary table ---
    n_fair = len(result.fair_metrics)
    n_marginal = len(result.marginal_metrics)
    n_unfair = len(result.unfair_metrics)
    total = len(result.metric_results)

    summary_table = Table(title="Metric Summary", show_header=True, header_style="bold")
    summary_table.add_column("Fair", style="green", justify="center")
    summary_table.add_column("Marginal", style="yellow", justify="center")
    summary_table.add_column("Unfair", style="red", justify="center")
    summary_table.add_column("Total", justify="center")
    summary_table.add_row(str(n_fair), str(n_marginal), str(n_unfair), str(total))
    console.print(summary_table)
    console.print()

    # --- Metrics detail table ---
    metrics_table = Table(title="Metric Results", show_header=True, header_style="bold")
    metrics_table.add_column("Metric", style="bold", min_width=30)
    metrics_table.add_column("Disparity", justify="right")
    metrics_table.add_column("Threshold", justify="right")
    metrics_table.add_column("Status", justify="center")

    for m in result.metric_results:
        m_level = m.fairness_level.value if hasattr(m.fairness_level, "value") else str(m.fairness_level)
        status = _fairness_label(m_level)
        metrics_table.add_row(
            m.display_name,
            f"{m.disparity:.4f}",
            f"{m.threshold:.4f}",
            status,
        )

    console.print(metrics_table)
    console.print()

    # --- Group demographics table ---
    if result.group_counts:
        demo_table = Table(title="Group Demographics", show_header=True, header_style="bold")
        demo_table.add_column("Group", style="bold")
        demo_table.add_column("Count", justify="right")
        demo_table.add_column("Percentage", justify="right")

        for group_key, count in sorted(result.group_counts.items()):
            pct = count / result.total_samples * 100 if result.total_samples else 0
            demo_table.add_row(group_key, f"{count:,}", f"{pct:.1f}%")

        console.print(demo_table)
        console.print()


def display_profile(profile: Any) -> None:
    """Display a dataset profile summary.

    Renders:
    - Data quality summary panel
    - Demographic breakdown tables
    - Warnings in yellow

    Args:
        profile: A profile dictionary or object with dataset statistics.
    """
    if isinstance(profile, dict):
        # --- Quality summary ---
        quality_lines = []
        quality_lines.append(f"Total rows: {profile.get('total_rows', 'N/A'):,}" if isinstance(profile.get('total_rows'), int) else f"Total rows: {profile.get('total_rows', 'N/A')}")
        quality_lines.append(f"Total columns: {profile.get('total_columns', 'N/A')}")
        quality_lines.append(f"Missing values: {profile.get('missing_values', 'N/A')}")

        console.print(
            Panel(
                "\n".join(quality_lines),
                title="[bold]Data Quality Summary[/bold]",
                border_style="blue",
            )
        )

        # --- Demographic breakdowns ---
        demographics = profile.get("demographics", {})
        for attr_name, groups in demographics.items():
            table = Table(title=f"Demographic: {attr_name}", show_header=True, header_style="bold")
            table.add_column("Group", style="bold")
            table.add_column("Count", justify="right")
            table.add_column("Percentage", justify="right")

            total = sum(groups.values()) if isinstance(groups, dict) else 0
            if isinstance(groups, dict):
                for group, count in sorted(groups.items(), key=lambda x: -x[1]):
                    pct = count / total * 100 if total else 0
                    table.add_row(str(group), f"{count:,}", f"{pct:.1f}%")

            console.print(table)
            console.print()

        # --- Warnings ---
        warnings = profile.get("warnings", [])
        for w in warnings:
            display_warning(w)
    else:
        console.print(str(profile))


def display_recommendations(issues: Any) -> None:
    """Display prioritised recommendations.

    Renders:
    - Priority-sorted table with severity colours
    - Top issues in detail panels

    Args:
        issues: A list of recommendation/issue dictionaries or objects.
    """
    if not issues:
        console.print("[dim]No recommendations generated.[/dim]")
        return

    # Sort by priority/severity if available
    if isinstance(issues, list) and len(issues) > 0 and isinstance(issues[0], dict):
        severity_order = {"critical": 0, "high": 1, "medium": 2, "low": 3}
        issues = sorted(
            issues,
            key=lambda x: severity_order.get(str(x.get("severity", "low")).lower(), 99),
        )

    table = Table(title="Recommendations", show_header=True, header_style="bold")
    table.add_column("#", justify="right", width=4)
    table.add_column("Severity", justify="center", width=10)
    table.add_column("Issue", min_width=30)
    table.add_column("Recommendation", min_width=30)

    for i, issue in enumerate(issues, 1):
        if isinstance(issue, dict):
            severity = str(issue.get("severity", "medium")).upper()
            sev_colour = {"CRITICAL": "red bold", "HIGH": "red", "MEDIUM": "yellow", "LOW": "green"}.get(severity, "white")
            table.add_row(
                str(i),
                f"[{sev_colour}]{severity}[/{sev_colour}]",
                str(issue.get("issue", "")),
                str(issue.get("recommendation", "")),
            )
        else:
            table.add_row(str(i), "", str(issue), "")

    console.print(table)
    console.print()

    # Detail panels for top issues (up to 3)
    top_issues = issues[:3] if isinstance(issues, list) else []
    for issue in top_issues:
        if isinstance(issue, dict) and issue.get("details"):
            severity = str(issue.get("severity", "medium")).lower()
            colour = {"critical": "red", "high": "red", "medium": "yellow", "low": "green"}.get(severity, "white")
            console.print(
                Panel(
                    str(issue["details"]),
                    title=f"[bold]{issue.get('issue', 'Issue')}[/bold]",
                    border_style=colour,
                )
            )


def display_simulation(results: Any) -> None:
    """Display simulation/intervention comparison results.

    Renders a comparison table showing each intervention's baseline and
    optimised disparity, along with accuracy impact.

    Args:
        results: A list of intervention result dictionaries.
    """
    if not results:
        console.print("[dim]No simulation results to display.[/dim]")
        return

    table = Table(title="Intervention Comparison", show_header=True, header_style="bold")
    table.add_column("Intervention", style="bold")
    table.add_column("Target Metric")
    table.add_column("Baseline Disparity", justify="right")
    table.add_column("Optimised Disparity", justify="right")
    table.add_column("Disparity Reduction", justify="right")
    table.add_column("Accuracy Impact", justify="right")

    for r in results:
        if isinstance(r, dict):
            intervention = r.get("intervention", "N/A")
            target = r.get("target_metric", "N/A")

            baseline_disp = r.get("baseline", {}).get("disparity",
                            r.get("baseline_disparity", "N/A"))
            optimised_disp = r.get("optimized", {}).get("disparity",
                             r.get("estimated_disparity", {}).get("mean", "N/A"))
            improvement = r.get("improvement", {})
            disp_reduction = improvement.get("disparity_reduction", "N/A")
            acc_change = improvement.get("accuracy_change", "N/A")

            def _fmt(v: Any) -> str:
                if isinstance(v, float):
                    return f"{v:.4f}"
                return str(v)

            table.add_row(
                intervention,
                target,
                _fmt(baseline_disp),
                _fmt(optimised_disp),
                _fmt(disp_reduction),
                _fmt(acc_change),
            )

    console.print(table)
    console.print()


@contextmanager
def display_progress():
    """Context manager for a Rich progress bar during long operations.

    Usage::

        with display_progress() as progress:
            task = progress.add_task("Auditing...", total=100)
            for i in range(100):
                progress.update(task, advance=1)
    """
    progress = Progress(
        SpinnerColumn(),
        TextColumn("[bold blue]{task.description}"),
        BarColumn(),
        TextColumn("[progress.percentage]{task.percentage:>3.0f}%"),
        TimeElapsedColumn(),
        console=console,
    )
    with progress:
        yield progress


def display_welcome() -> None:
    """Display the ParityScope branding banner."""
    banner = Text()
    banner.append("ParityScope", style="bold cyan")
    banner.append(" - Healthcare AI Fairness Compliance Toolkit\n", style="dim")
    banner.append("Audit, monitor, and mitigate bias in clinical AI systems.", style="dim")

    console.print()
    console.print(
        Panel(
            banner,
            border_style="cyan",
            padding=(1, 2),
        )
    )
    console.print()


def display_error(msg: str) -> None:
    """Display an error message in red."""
    console.print(f"[bold red]Error:[/bold red] {msg}")


def display_warning(msg: str) -> None:
    """Display a warning message in yellow."""
    console.print(f"[bold yellow]Warning:[/bold yellow] {msg}")


def display_success(msg: str) -> None:
    """Display a success message in green."""
    console.print(f"[bold green]Success:[/bold green] {msg}")
