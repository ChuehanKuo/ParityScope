"""Data loading with intelligent column mapping.

Loads CSV/Excel files and maps columns to the expected schema
(predictions, labels, scores, demographics) either via explicit
mapping or heuristic auto-detection.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

import numpy as np
import pandas as pd


# Column name patterns for auto-detection
_PREDICTION_PATTERNS = {
    "prediction", "predicted", "y_pred", "output", "pred", "model_output",
    "model_prediction", "risk_prediction",
}
_LABEL_PATTERNS = {
    "label", "outcome", "y_true", "ground_truth", "target", "actual",
    "diagnosis", "confirmed", "true_label",
}
_SCORE_PATTERNS = {
    "score", "probability", "prob", "risk_score", "y_score", "confidence",
    "risk", "predicted_probability", "proba",
}
_DEMOGRAPHIC_PATTERNS = {
    "race", "sex", "gender", "age_group", "ethnicity", "race_ethnicity",
    "language", "insurance", "income", "zip", "marital_status",
}


@dataclass
class ColumnMap:
    """Mapping from dataset columns to expected schema."""

    predictions: str = ""
    labels: str = ""
    scores: str | None = None
    demographics: list[str] = field(default_factory=list)
    patient_id: str | None = None


def auto_detect_columns(df: pd.DataFrame) -> ColumnMap:
    """Heuristically detect column roles from a DataFrame.

    Detection strategy:
    1. Name matching: columns whose names match known patterns
    2. Type analysis: binary columns → predictions/labels, float [0,1] → scores
    3. Cardinality: low-cardinality string columns → demographics
    """
    col_map = ColumnMap()
    cols_lower = {c: c.lower().replace(" ", "_").replace("-", "_") for c in df.columns}

    candidates_pred: list[str] = []
    candidates_label: list[str] = []
    candidates_score: list[str] = []
    candidates_demo: list[str] = []

    for col, col_lower in cols_lower.items():
        # Name-based detection
        if col_lower in _PREDICTION_PATTERNS or any(p in col_lower for p in _PREDICTION_PATTERNS):
            candidates_pred.append(col)
        elif col_lower in _LABEL_PATTERNS or any(p in col_lower for p in _LABEL_PATTERNS):
            candidates_label.append(col)
        elif col_lower in _SCORE_PATTERNS or any(p in col_lower for p in _SCORE_PATTERNS):
            candidates_score.append(col)
        elif col_lower in _DEMOGRAPHIC_PATTERNS or any(p in col_lower for p in _DEMOGRAPHIC_PATTERNS):
            candidates_demo.append(col)

    # Type-based fallback for binary columns
    if not candidates_pred or not candidates_label:
        for col in df.columns:
            if col in candidates_pred or col in candidates_label or col in candidates_demo:
                continue
            if df[col].dtype in ("int64", "int32", "float64"):
                unique_vals = set(df[col].dropna().unique())
                if unique_vals.issubset({0, 1, 0.0, 1.0}):
                    if not candidates_label:
                        candidates_label.append(col)
                    elif not candidates_pred:
                        candidates_pred.append(col)

    # Type-based fallback for score columns
    if not candidates_score:
        for col in df.columns:
            if col in candidates_pred or col in candidates_label or col in candidates_demo:
                continue
            if df[col].dtype == "float64":
                vals = df[col].dropna()
                if len(vals) > 0 and vals.min() >= 0 and vals.max() <= 1:
                    unique_count = vals.nunique()
                    if unique_count > 2:
                        candidates_score.append(col)

    # Cardinality-based detection for demographics
    for col in df.columns:
        if col in candidates_pred or col in candidates_label or col in candidates_score:
            continue
        if col in candidates_demo:
            continue
        if df[col].dtype == "object" or df[col].dtype.name == "category" or pd.api.types.is_string_dtype(df[col]):
            n_unique = df[col].nunique()
            if 2 <= n_unique <= 20:
                candidates_demo.append(col)

    # Assign best candidates
    if candidates_pred:
        col_map.predictions = candidates_pred[0]
    if candidates_label:
        col_map.labels = candidates_label[0]
    if candidates_score:
        col_map.scores = candidates_score[0]
    col_map.demographics = candidates_demo

    return col_map


def load_dataset(
    path: str | Path,
    column_map: ColumnMap | None = None,
) -> tuple[np.ndarray, np.ndarray, np.ndarray | None, pd.DataFrame]:
    """Load a dataset and return arrays ready for audit.

    Args:
        path: Path to CSV or Excel file.
        column_map: Explicit column mapping. If None, auto-detect.

    Returns:
        Tuple of (y_true, y_pred, y_score_or_None, demographics_df).

    Raises:
        FileNotFoundError: If the file doesn't exist.
        ValueError: If required columns can't be found.
    """
    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(f"Data file not found: {path}")

    # Load data
    suffix = path.suffix.lower()
    if suffix in (".xlsx", ".xls"):
        df = pd.read_excel(path)
    elif suffix == ".csv":
        df = pd.read_csv(path)
    elif suffix == ".tsv":
        df = pd.read_csv(path, sep="\t")
    else:
        raise ValueError(f"Unsupported file format: {suffix}. Use .csv, .tsv, .xlsx, or .xls")

    # Auto-detect if no mapping provided
    if column_map is None:
        column_map = auto_detect_columns(df)

    # Validate required columns
    errors: list[str] = []
    if not column_map.labels:
        errors.append(
            "Could not identify a labels/outcome column. "
            "Provide a ColumnMap with the 'labels' field set."
        )
    if not column_map.predictions:
        errors.append(
            "Could not identify a predictions column. "
            "Provide a ColumnMap with the 'predictions' field set."
        )
    if not column_map.demographics:
        errors.append(
            "Could not identify any demographic columns. "
            "Provide a ColumnMap with the 'demographics' field set."
        )

    if column_map.labels and column_map.labels not in df.columns:
        errors.append(f"Labels column '{column_map.labels}' not found in data.")
    if column_map.predictions and column_map.predictions not in df.columns:
        errors.append(f"Predictions column '{column_map.predictions}' not found in data.")
    if column_map.scores and column_map.scores not in df.columns:
        errors.append(f"Scores column '{column_map.scores}' not found in data.")
    for demo_col in column_map.demographics:
        if demo_col not in df.columns:
            errors.append(f"Demographic column '{demo_col}' not found in data.")

    if errors:
        available = ", ".join(df.columns.tolist())
        raise ValueError(
            "Column mapping errors:\n"
            + "\n".join(f"  - {e}" for e in errors)
            + f"\n\nAvailable columns: {available}"
        )

    # Extract arrays
    y_true = df[column_map.labels].values.astype(int)
    y_pred = df[column_map.predictions].values.astype(int)
    y_score = (
        df[column_map.scores].values.astype(float)
        if column_map.scores
        else None
    )
    demographics = df[column_map.demographics].copy()

    return y_true, y_pred, y_score, demographics
