"""The ``parityscope profile`` command — dataset profiling.

Usage example::

    parityscope profile --data patient_data.csv
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
    display_profile,
    display_success,
    display_warning,
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
    "--output",
    type=click.Path(),
    default=None,
    help="Save the profile as a JSON file.",
)
@click.option(
    "--verbose",
    is_flag=True,
    default=False,
    help="Show detailed profiling information.",
)
def profile(data: str, output: str | None, verbose: bool) -> None:
    """Profile a dataset for fairness auditing.

    Loads the data file and displays summary statistics including
    row/column counts, data types, missing values, and demographic
    group breakdowns.
    """
    try:
        display_welcome()

        console.print(f"[bold]Profiling dataset:[/bold] {data}")
        console.print()

        # Load data
        df = _load_data(data)
        console.print(f"  Loaded {len(df):,} rows, {len(df.columns)} columns")
        console.print()

        # Build profile
        profile_data = _build_profile(df, verbose=verbose)

        # Display
        display_profile(profile_data)

        # Save if requested
        if output:
            out_path = Path(output)
            out_path.parent.mkdir(parents=True, exist_ok=True)
            out_path.write_text(
                json.dumps(profile_data, indent=2, default=str),
                encoding="utf-8",
            )
            display_success(f"Profile saved to {output}")

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


def _build_profile(df: pd.DataFrame, *, verbose: bool = False) -> dict:
    """Build a profile dictionary from a DataFrame.

    Args:
        df: The dataset to profile.
        verbose: If True, include additional detail per column.

    Returns:
        A dictionary with profiling statistics.
    """
    total_missing = int(df.isnull().sum().sum())
    total_cells = int(df.shape[0] * df.shape[1])

    profile_data: dict = {
        "total_rows": int(len(df)),
        "total_columns": int(len(df.columns)),
        "missing_values": total_missing,
        "missing_pct": round(total_missing / total_cells * 100, 2) if total_cells else 0.0,
        "columns": {},
        "demographics": {},
        "warnings": [],
    }

    # Per-column summary
    for col in df.columns:
        col_info: dict = {
            "dtype": str(df[col].dtype),
            "missing": int(df[col].isnull().sum()),
            "unique": int(df[col].nunique()),
        }

        if verbose and pd.api.types.is_numeric_dtype(df[col]):
            col_info.update({
                "mean": float(df[col].mean()) if not df[col].isnull().all() else None,
                "std": float(df[col].std()) if not df[col].isnull().all() else None,
                "min": float(df[col].min()) if not df[col].isnull().all() else None,
                "max": float(df[col].max()) if not df[col].isnull().all() else None,
            })

        profile_data["columns"][col] = col_info

        # Detect likely demographic columns (categorical with few unique values)
        if df[col].nunique() <= 20 and df[col].dtype == "object":
            counts = df[col].value_counts().to_dict()
            profile_data["demographics"][col] = {str(k): int(v) for k, v in counts.items()}

    # Generate warnings
    for col, info in profile_data["columns"].items():
        missing_pct = info["missing"] / len(df) * 100 if len(df) else 0
        if missing_pct > 5:
            profile_data["warnings"].append(
                f"Column '{col}' has {missing_pct:.1f}% missing values."
            )
        if info["unique"] == 1:
            profile_data["warnings"].append(
                f"Column '{col}' has only 1 unique value (constant)."
            )

    # Check for small demographic groups
    for attr, groups in profile_data["demographics"].items():
        for group, count in groups.items():
            if count < 30:
                profile_data["warnings"].append(
                    f"Demographic group '{group}' in '{attr}' has only {count} samples "
                    f"(minimum 30 recommended)."
                )

    return profile_data
