"""Dataset profiling before audit.

Generates quality reports, demographic summaries, and actionable warnings
to help users understand their data before running a fairness audit.
"""

from __future__ import annotations

from dataclasses import dataclass, field

import numpy as np
import pandas as pd

_MIN_GROUP_SIZE = 30
_MAX_IMBALANCE_RATIO = 10.0
_MAX_MISSING_PCT = 5.0
_MAX_CLASS_MAJORITY_PCT = 80.0


@dataclass
class DataQualityReport:
    """Summary of basic data quality issues."""

    missing_values: dict[str, int]
    missing_pct: dict[str, float]
    class_balance: dict[str, float]
    duplicate_rows: int
    total_rows: int
    warnings: list[str]


@dataclass
class DemographicSummary:
    """Summary of a single demographic attribute."""

    attribute: str
    groups: dict[str, int]
    proportions: dict[str, float]
    smallest_group: str
    smallest_group_size: int
    imbalance_ratio: float


@dataclass
class DatasetProfile:
    """Complete dataset profile."""

    total_rows: int
    total_columns: int
    data_quality: DataQualityReport
    demographic_summaries: list[DemographicSummary]
    detected_demographics: list[str]
    label_distribution: dict[str, float]
    warnings: list[str]
    recommendations: list[str]


def profile_dataset(
    df: pd.DataFrame,
    label_column: str | None = None,
    demographic_columns: list[str] | None = None,
) -> DatasetProfile:
    """Profile a dataset for audit readiness.

    Args:
        df: The full dataset.
        label_column: Name of the label/outcome column.
        demographic_columns: List of demographic column names.
            If None, auto-detect.

    Returns:
        DatasetProfile with quality analysis and recommendations.
    """
    warnings: list[str] = []
    recommendations: list[str] = []

    # Auto-detect demographics if not provided
    if demographic_columns is None:
        from parityscope.data.loaders import auto_detect_columns
        col_map = auto_detect_columns(df)
        demographic_columns = col_map.demographics
        if label_column is None:
            label_column = col_map.labels or None

    # Data quality
    missing_vals = {col: int(df[col].isnull().sum()) for col in df.columns}
    missing_pct = {
        col: round(count / len(df) * 100, 2) for col, count in missing_vals.items()
    }

    # Class balance
    class_balance: dict[str, float] = {}
    if label_column and label_column in df.columns:
        vc = df[label_column].value_counts(normalize=True)
        class_balance = {str(k): round(float(v) * 100, 1) for k, v in vc.items()}

    duplicate_rows = int(df.duplicated().sum())

    quality_warnings: list[str] = []
    for col, pct in missing_pct.items():
        if pct > _MAX_MISSING_PCT:
            quality_warnings.append(
                f"Column '{col}' has {pct:.1f}% missing values (threshold: {_MAX_MISSING_PCT}%)"
            )

    if class_balance:
        max_class_pct = max(class_balance.values())
        if max_class_pct > _MAX_CLASS_MAJORITY_PCT:
            quality_warnings.append(
                f"Class imbalance detected: majority class is {max_class_pct:.1f}% "
                f"(threshold: {_MAX_CLASS_MAJORITY_PCT}%)"
            )

    if duplicate_rows > 0:
        quality_warnings.append(
            f"Found {duplicate_rows} duplicate rows ({duplicate_rows / len(df) * 100:.1f}%)"
        )

    data_quality = DataQualityReport(
        missing_values=missing_vals,
        missing_pct=missing_pct,
        class_balance=class_balance,
        duplicate_rows=duplicate_rows,
        total_rows=len(df),
        warnings=quality_warnings,
    )

    # Demographic summaries
    demo_summaries: list[DemographicSummary] = []
    for attr in demographic_columns:
        if attr not in df.columns:
            continue
        vc = df[attr].value_counts()
        groups = {str(k): int(v) for k, v in vc.items()}
        proportions = {str(k): round(float(v / len(df)) * 100, 1) for k, v in vc.items()}

        smallest_group = vc.index[-1] if len(vc) > 0 else ""
        smallest_size = int(vc.iloc[-1]) if len(vc) > 0 else 0
        largest_size = int(vc.iloc[0]) if len(vc) > 0 else 0
        imbalance = largest_size / smallest_size if smallest_size > 0 else float("inf")

        demo_summaries.append(DemographicSummary(
            attribute=attr,
            groups=groups,
            proportions=proportions,
            smallest_group=str(smallest_group),
            smallest_group_size=smallest_size,
            imbalance_ratio=round(imbalance, 1),
        ))

        # Warnings
        if smallest_size < _MIN_GROUP_SIZE:
            warnings.append(
                f"Group '{smallest_group}' in '{attr}' has only {smallest_size} samples "
                f"(minimum {_MIN_GROUP_SIZE} recommended)"
            )
            recommendations.append(
                f"Consider collecting more data for '{smallest_group}' in '{attr}' "
                f"or acknowledge limited statistical power for this group."
            )

        if imbalance >= _MAX_IMBALANCE_RATIO:
            warnings.append(
                f"Attribute '{attr}' has {imbalance:.1f}:1 imbalance ratio "
                f"(threshold: {_MAX_IMBALANCE_RATIO}:1)"
            )

    warnings.extend(quality_warnings)

    label_dist: dict[str, float] = {}
    if label_column and label_column in df.columns:
        vc = df[label_column].value_counts(normalize=True)
        label_dist = {str(k): round(float(v), 4) for k, v in vc.items()}

    return DatasetProfile(
        total_rows=len(df),
        total_columns=len(df.columns),
        data_quality=data_quality,
        demographic_summaries=demo_summaries,
        detected_demographics=list(demographic_columns),
        label_distribution=label_dist,
        warnings=warnings,
        recommendations=recommendations,
    )
