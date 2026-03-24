"""The ``parityscope simulate`` command — what-if fairness simulations.

Usage example::

    parityscope simulate --data patient_data.csv --attributes race \
        --metric equal_opportunity
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import click
import pandas as pd

from parityscope.cli.display import (
    console,
    display_error,
    display_simulation,
    display_success,
    display_welcome,
)


@click.command()
@click.option(
    "--data",
    required=True,
    type=click.Path(exists=True),
    help="Path to CSV or Excel data file.",
)
@click.option(
    "--attributes",
    required=True,
    multiple=True,
    help="Protected attributes to simulate over (can be specified multiple times).",
)
@click.option(
    "--metric",
    type=click.Choice(
        ["demographic_parity", "equal_opportunity", "equalized_odds"],
        case_sensitive=False,
    ),
    default="demographic_parity",
    show_default=True,
    help="Target fairness metric for optimisation.",
)
@click.option(
    "--output",
    type=click.Path(),
    default=None,
    help="Save simulation results as JSON.",
)
@click.option(
    "--predictions-col",
    default="predictions",
    show_default=True,
    help="Column name for binary predictions.",
)
@click.option(
    "--labels-col",
    default="labels",
    show_default=True,
    help="Column name for ground-truth labels.",
)
@click.option(
    "--scores-col",
    default="scores",
    show_default=True,
    help="Column name for probability scores (optional).",
)
def simulate(
    data: str,
    attributes: tuple[str, ...],
    metric: str,
    output: str | None,
    predictions_col: str,
    labels_col: str,
    scores_col: str,
) -> None:
    """Run what-if fairness simulations to compare interventions.

    Loads the dataset and simulates the effect of different fairness
    interventions (threshold adjustment, balanced resampling) on the
    target metric. Displays a comparison table.
    """
    try:
        display_welcome()

        console.print(f"[bold]Loading data from:[/bold] {data}")
        df = _load_data(data)
        console.print(f"  Loaded {len(df):,} rows, {len(df.columns)} columns")
        console.print()

        # Validate required columns
        if predictions_col not in df.columns:
            display_error(
                f"Predictions column '{predictions_col}' not found. "
                f"Available columns: {list(df.columns)}"
            )
            sys.exit(1)
        if labels_col not in df.columns:
            display_error(
                f"Labels column '{labels_col}' not found. "
                f"Available columns: {list(df.columns)}"
            )
            sys.exit(1)

        missing_attrs = [a for a in attributes if a not in df.columns]
        if missing_attrs:
            display_error(
                f"Protected attribute columns not found: {missing_attrs}. "
                f"Available columns: {list(df.columns)}"
            )
            sys.exit(1)

        y_true = df[labels_col].values
        y_pred = df[predictions_col].values
        y_score = df[scores_col].values if scores_col in df.columns else None

        from parityscope.simulation.interventions import compare_interventions

        all_results = []

        for attr in attributes:
            console.print(f"[bold]Simulating interventions for attribute:[/bold] {attr}")
            groups = df[attr].values

            results = compare_interventions(
                y_true=y_true,
                y_pred=y_pred,
                y_score=y_score,
                groups=groups,
                target_metric=metric,
            )

            # Tag results with the attribute name
            for r in results:
                r["attribute"] = attr

            all_results.extend(results)

        # Display comparison
        display_simulation(all_results)

        # Save if requested
        if output:
            out_path = Path(output)
            out_path.parent.mkdir(parents=True, exist_ok=True)
            out_path.write_text(
                json.dumps(all_results, indent=2, default=str),
                encoding="utf-8",
            )
            display_success(f"Simulation results saved to {output}")

    except Exception as exc:
        display_error(str(exc))
        sys.exit(1)


def _load_data(path: str) -> pd.DataFrame:
    """Load a dataset from CSV or Excel."""
    p = Path(path)
    suffix = p.suffix.lower()
    try:
        if suffix == ".csv":
            return pd.read_csv(p)
        elif suffix in (".xls", ".xlsx"):
            return pd.read_excel(p)
        elif suffix == ".parquet":
            return pd.read_parquet(p)
        else:
            return pd.read_csv(p)
    except Exception as exc:
        raise click.BadParameter(f"Could not load data from '{path}': {exc}") from exc
