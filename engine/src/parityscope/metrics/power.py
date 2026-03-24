"""Statistical power analysis for fairness metrics.

Computes minimum detectable effects and sample adequacy to help
users understand the statistical limitations of their audit.
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field
from itertools import combinations

import numpy as np
import pandas as pd
from scipy.stats import norm


@dataclass(frozen=True)
class SampleAdequacy:
    """Sample adequacy assessment for a single group."""

    group_label: str
    sample_size: int
    is_adequate: bool
    minimum_detectable_effect: float
    recommended_n: int | None
    power_at_threshold: float


@dataclass(frozen=True)
class PowerAnalysisResult:
    """Power analysis for a protected attribute."""

    attribute: str
    group_results: list[SampleAdequacy]
    overall_adequate: bool
    weakest_comparison: str
    summary: str


def compute_minimum_detectable_effect(
    n1: int, n2: int, alpha: float = 0.05, power: float = 0.80
) -> float:
    """Compute the minimum detectable effect for a two-proportion comparison.

    Uses conservative p=0.5 assumption for the base rate.

    Args:
        n1: Sample size of group 1.
        n2: Sample size of group 2.
        alpha: Significance level.
        power: Desired power.

    Returns:
        Minimum detectable absolute difference in proportions.
    """
    z_alpha = norm.ppf(1 - alpha / 2)
    z_beta = norm.ppf(power)
    p = 0.5  # Most conservative assumption

    se = math.sqrt(p * (1 - p) * (1 / n1 + 1 / n2))
    mde = (z_alpha + z_beta) * se

    return min(mde, 1.0)  # Cap at 1.0


def compute_required_sample_size(
    effect_size: float, alpha: float = 0.05, power: float = 0.80
) -> int:
    """Compute required per-group sample size to detect a given effect.

    Args:
        effect_size: Target detectable difference in proportions.
        alpha: Significance level.
        power: Desired power.

    Returns:
        Required sample size per group.
    """
    if effect_size <= 0:
        return 0

    z_alpha = norm.ppf(1 - alpha / 2)
    z_beta = norm.ppf(power)
    p = 0.5

    n = (z_alpha + z_beta) ** 2 * p * (1 - p) * 2 / (effect_size ** 2)
    return int(math.ceil(n))


def compute_power_at_effect(
    n1: int, n2: int, effect_size: float, alpha: float = 0.05
) -> float:
    """Compute statistical power for a given effect size and sample sizes.

    Args:
        n1: Sample size of group 1.
        n2: Sample size of group 2.
        effect_size: Expected difference in proportions.
        alpha: Significance level.

    Returns:
        Power (probability of detecting the effect).
    """
    if effect_size <= 0 or n1 <= 0 or n2 <= 0:
        return 0.0

    p = 0.5
    se = math.sqrt(p * (1 - p) * (1 / n1 + 1 / n2))

    if se <= 0:
        return 0.0

    z_alpha = norm.ppf(1 - alpha / 2)
    z_stat = effect_size / se - z_alpha

    return float(norm.cdf(z_stat))


def analyze_sample_adequacy(
    demographics: pd.DataFrame,
    protected_attributes: list[str],
    target_effect: float = 0.05,
    alpha: float = 0.05,
    power: float = 0.80,
) -> list[PowerAnalysisResult]:
    """Analyze sample adequacy for all protected attributes.

    Args:
        demographics: DataFrame with demographic columns.
        protected_attributes: List of attribute names.
        target_effect: Target detectable disparity (default 5%).
        alpha: Significance level.
        power: Desired power.

    Returns:
        List of PowerAnalysisResult, one per attribute.
    """
    results: list[PowerAnalysisResult] = []

    for attr in protected_attributes:
        if attr not in demographics.columns:
            continue

        vc = demographics[attr].value_counts()
        group_sizes = {str(k): int(v) for k, v in vc.items()}

        group_results: list[SampleAdequacy] = []
        weakest_mde = 0.0
        weakest_pair = ""

        # For each pair of groups, compute MDE
        groups_list = list(group_sizes.keys())
        for g in groups_list:
            n_g = group_sizes[g]

            # Find the comparison partner with smallest combined n
            worst_mde_for_group = 0.0
            for other_g in groups_list:
                if other_g == g:
                    continue
                n_other = group_sizes[other_g]
                mde = compute_minimum_detectable_effect(n_g, n_other, alpha, power)
                worst_mde_for_group = max(worst_mde_for_group, mde)

                if mde > weakest_mde:
                    weakest_mde = mde
                    weakest_pair = f"{g} vs {other_g}"

            is_adequate = worst_mde_for_group <= target_effect
            recommended_n = None
            if not is_adequate:
                recommended_n = compute_required_sample_size(target_effect, alpha, power)

            # Power at target effect against smallest other group
            other_sizes = [group_sizes[o] for o in groups_list if o != g]
            min_other = min(other_sizes) if other_sizes else 0
            pwr = compute_power_at_effect(n_g, min_other, target_effect, alpha)

            group_results.append(SampleAdequacy(
                group_label=g,
                sample_size=n_g,
                is_adequate=is_adequate,
                minimum_detectable_effect=round(worst_mde_for_group, 4),
                recommended_n=recommended_n,
                power_at_threshold=round(pwr, 4),
            ))

        overall_adequate = all(gr.is_adequate for gr in group_results)
        adequate_count = sum(1 for gr in group_results if gr.is_adequate)

        # Summary
        inadequate_groups = [
            gr for gr in group_results if not gr.is_adequate
        ]
        if overall_adequate:
            summary = (
                f"{attr}: All {len(group_results)} groups have adequate sample size "
                f"to detect a {target_effect * 100:.0f}% disparity at {power * 100:.0f}% power."
            )
        else:
            weak_desc = ", ".join(
                f"{gr.group_label} (n={gr.sample_size}, MDE={gr.minimum_detectable_effect * 100:.1f}%)"
                for gr in inadequate_groups
            )
            summary = (
                f"{attr}: {adequate_count} of {len(group_results)} groups have adequate sample size. "
                f"Insufficient: {weak_desc}."
            )

        results.append(PowerAnalysisResult(
            attribute=attr,
            group_results=group_results,
            overall_adequate=overall_adequate,
            weakest_comparison=weakest_pair,
            summary=summary,
        ))

    return results
