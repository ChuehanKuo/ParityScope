"""Data validation for audit inputs.

Validates data quality, completeness, and structure before running audits.
Implements data access tiers that adapt to different client data capabilities.
"""

from __future__ import annotations

from enum import Enum

import numpy as np
import pandas as pd


class DataAccessTier(str, Enum):
    """Data access tiers adapt to different client capabilities.

    FULL: Complete access — predictions, demographics, outcomes, scores.
          Enables all metrics including calibration and simulation.

    STANDARD: Predictions, demographics, outcomes (no probability scores).
              Enables all classification metrics but not calibration.

    LIMITED: Predictions and demographics only (no ground truth).
             Only demographic parity and score distribution can be computed.
    """

    FULL = "full"
    STANDARD = "standard"
    LIMITED = "limited"


def detect_access_tier(
    y_true: np.ndarray | None,
    y_pred: np.ndarray | None,
    y_score: np.ndarray | None,
) -> DataAccessTier:
    """Auto-detect the data access tier from available inputs."""
    if y_true is not None and y_pred is not None and y_score is not None:
        return DataAccessTier.FULL
    if y_true is not None and y_pred is not None:
        return DataAccessTier.STANDARD
    return DataAccessTier.LIMITED


class ValidationError(Exception):
    """Raised when input data fails validation."""

    def __init__(self, errors: list[str]):
        self.errors = errors
        super().__init__(f"Validation failed with {len(errors)} error(s): {'; '.join(errors)}")


def validate_audit_inputs(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    demographics: pd.DataFrame,
    protected_attributes: list[str],
    y_score: np.ndarray | None = None,
) -> None:
    """Validate all inputs before running an audit.

    Raises ValidationError with descriptive messages if any checks fail.
    """
    errors: list[str] = []

    # Shape checks
    n = len(y_true)
    if n == 0:
        errors.append("Input arrays must not be empty")
    if len(y_pred) != n:
        errors.append(f"y_pred length ({len(y_pred)}) != y_true length ({n})")
    if len(demographics) != n:
        errors.append(f"demographics length ({len(demographics)}) != y_true length ({n})")
    if y_score is not None and len(y_score) != n:
        errors.append(f"y_score length ({len(y_score)}) != y_true length ({n})")

    # Value checks
    if n > 0:
        unique_true = set(np.unique(y_true))
        if not unique_true.issubset({0, 1}):
            errors.append(f"y_true must contain only 0 and 1, found {unique_true}")

        unique_pred = set(np.unique(y_pred))
        if not unique_pred.issubset({0, 1}):
            errors.append(f"y_pred must contain only 0 and 1, found {unique_pred}")

        if y_score is not None:
            if np.any(np.isnan(y_score)):
                errors.append("y_score contains NaN values")
            elif np.min(y_score) < 0 or np.max(y_score) > 1:
                errors.append(
                    f"y_score must be in [0, 1], found range [{np.min(y_score)}, {np.max(y_score)}]"
                )

    # Protected attribute checks
    missing_attrs = [a for a in protected_attributes if a not in demographics.columns]
    if missing_attrs:
        errors.append(
            f"Missing protected attributes in demographics: {missing_attrs}. "
            f"Available columns: {list(demographics.columns)}"
        )

    for attr in protected_attributes:
        if attr in demographics.columns:
            n_groups = demographics[attr].nunique()
            if n_groups < 2:
                errors.append(
                    f"Protected attribute '{attr}' has only {n_groups} group(s); need at least 2"
                )

            # Check for NaN in demographics
            n_null = demographics[attr].isnull().sum()
            if n_null > 0:
                errors.append(
                    f"Protected attribute '{attr}' has {n_null} null value(s)"
                )

    # Minimum sample size check per group
    min_group_size = 30  # Statistical minimum for meaningful comparison
    for attr in protected_attributes:
        if attr in demographics.columns:
            group_counts = demographics[attr].value_counts()
            small_groups = group_counts[group_counts < min_group_size]
            if len(small_groups) > 0:
                for group_name, count in small_groups.items():
                    errors.append(
                        f"Group '{group_name}' in '{attr}' has only {count} samples "
                        f"(minimum {min_group_size} recommended for reliable metrics)"
                    )

    if errors:
        raise ValidationError(errors)
