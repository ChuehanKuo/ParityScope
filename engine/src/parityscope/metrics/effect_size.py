"""Effect size measures for fairness disparities.

Goes beyond raw disparity numbers to provide clinically meaningful
effect sizes: Cohen's d, odds ratios, and risk ratios.
"""

from __future__ import annotations

import math
from dataclasses import dataclass

import numpy as np


@dataclass(frozen=True)
class EffectSizeResult:
    """Effect size analysis for a fairness metric."""

    cohens_d: float | None
    odds_ratio: float | None
    risk_ratio: float | None
    risk_difference: float
    max_group: str
    min_group: str
    interpretation: str


def compute_effect_sizes(
    group_rates: dict[str, float],
    group_sizes: dict[str, int],
) -> EffectSizeResult:
    """Compute effect sizes from per-group metric rates.

    Args:
        group_rates: Dict mapping group label to metric rate.
        group_sizes: Dict mapping group label to sample size.

    Returns:
        EffectSizeResult with all applicable effect sizes.
    """
    if len(group_rates) < 2:
        return EffectSizeResult(
            cohens_d=None, odds_ratio=None, risk_ratio=None,
            risk_difference=0.0, max_group="", min_group="",
            interpretation="Insufficient groups for comparison.",
        )

    # Find max and min groups
    max_group = max(group_rates, key=group_rates.get)  # type: ignore[arg-type]
    min_group = min(group_rates, key=group_rates.get)  # type: ignore[arg-type]
    max_rate = group_rates[max_group]
    min_rate = group_rates[min_group]
    risk_diff = max_rate - min_rate

    # Cohen's d using pooled SD from binomial proportions
    cohens_d = None
    try:
        n_max = group_sizes.get(max_group, 0)
        n_min = group_sizes.get(min_group, 0)
        if n_max > 0 and n_min > 0:
            var_max = max_rate * (1 - max_rate)
            var_min = min_rate * (1 - min_rate)
            pooled_var = (
                (n_max - 1) * var_max + (n_min - 1) * var_min
            ) / (n_max + n_min - 2)
            pooled_sd = math.sqrt(pooled_var) if pooled_var > 0 else 0.0
            if pooled_sd > 0:
                cohens_d = risk_diff / pooled_sd
    except (ValueError, ZeroDivisionError):
        pass

    # Odds ratio
    odds_ratio = None
    try:
        if 0 < max_rate < 1 and 0 < min_rate < 1:
            odds_max = max_rate / (1 - max_rate)
            odds_min = min_rate / (1 - min_rate)
            odds_ratio = odds_max / odds_min
    except ZeroDivisionError:
        pass

    # Risk ratio
    risk_ratio = None
    try:
        if min_rate > 0:
            risk_ratio = max_rate / min_rate
    except ZeroDivisionError:
        pass

    # Interpretation
    interpretation = _interpret_effect(
        cohens_d, odds_ratio, risk_ratio, risk_diff,
        max_group, min_group, max_rate, min_rate,
    )

    return EffectSizeResult(
        cohens_d=round(cohens_d, 4) if cohens_d is not None else None,
        odds_ratio=round(odds_ratio, 4) if odds_ratio is not None else None,
        risk_ratio=round(risk_ratio, 4) if risk_ratio is not None else None,
        risk_difference=round(risk_diff, 4),
        max_group=max_group,
        min_group=min_group,
        interpretation=interpretation,
    )


def _interpret_effect(
    cohens_d: float | None,
    odds_ratio: float | None,
    risk_ratio: float | None,
    risk_diff: float,
    max_group: str,
    min_group: str,
    max_rate: float,
    min_rate: float,
) -> str:
    """Generate human-readable interpretation of effect sizes."""
    parts: list[str] = []

    # Cohen's d interpretation
    if cohens_d is not None:
        abs_d = abs(cohens_d)
        if abs_d < 0.2:
            size = "Negligible"
        elif abs_d < 0.5:
            size = "Small"
        elif abs_d < 0.8:
            size = "Medium"
        else:
            size = "Large"
        parts.append(f"{size} effect size (Cohen's d = {cohens_d:.2f})")

    # Odds ratio
    if odds_ratio is not None and odds_ratio > 1.5:
        parts.append(
            f"{max_group} ({max_rate:.2f}) has {odds_ratio:.1f}x the odds "
            f"compared to {min_group} ({min_rate:.2f})"
        )

    # Risk difference in percentage points
    if risk_diff > 0.01:
        parts.append(
            f"{risk_diff * 100:.1f} percentage-point gap between "
            f"{max_group} and {min_group}"
        )

    if not parts:
        return "Minimal disparity detected."

    return ". ".join(parts) + "."
