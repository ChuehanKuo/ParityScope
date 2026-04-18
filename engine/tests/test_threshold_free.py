"""Tests for threshold-free fairness metrics (AUROC, calibration slope, AUPRC)."""

from __future__ import annotations

import numpy as np
import pytest

from parityscope.metrics.registry import (
    METRIC_REGISTRY,
    InputType,
    MetricCategory,
    get_metric,
)
from parityscope.metrics.threshold_free import (
    auprc_parity,
    auroc_parity,
    calibration_slope_parity,
)

# ---------------------------------------------------------------------------
# Synthetic data helpers
# ---------------------------------------------------------------------------


def _fair_score_dataset(seed: int = 0, n_per_group: int = 500):
    """Two groups with identical signal-to-noise ratio — low disparity expected."""
    rng = np.random.default_rng(seed)
    groups = np.array(["A"] * n_per_group + ["B"] * n_per_group)
    y_true = rng.integers(0, 2, size=2 * n_per_group)
    # Same Gaussian noise per group → identical AUROC in expectation.
    noise = rng.normal(0, 0.3, size=2 * n_per_group)
    y_score = np.clip(y_true.astype(float) + noise, 0, 1)
    return y_true, y_score, groups


def _biased_score_dataset(seed: int = 0, n_per_group: int = 500):
    """Group B has much noisier scores than group A — high disparity expected."""
    rng = np.random.default_rng(seed)
    groups = np.array(["A"] * n_per_group + ["B"] * n_per_group)
    y_true = rng.integers(0, 2, size=2 * n_per_group)
    y_score = np.empty(2 * n_per_group, dtype=float)

    # Group A: high-quality scores (tight noise).
    y_score[:n_per_group] = np.clip(
        y_true[:n_per_group].astype(float) + rng.normal(0, 0.15, n_per_group),
        0, 1,
    )
    # Group B: essentially random scores (decoupled from y_true).
    y_score[n_per_group:] = rng.uniform(0, 1, size=n_per_group)
    return y_true, y_score, groups


def _miscalibrated_dataset(seed: int = 0, n_per_group: int = 600):
    """Group A is well-calibrated; group B is systematically over-confident."""
    rng = np.random.default_rng(seed)
    groups = np.array(["A"] * n_per_group + ["B"] * n_per_group)

    # Group A: y_score is the true probability, sample labels from it.
    p_a = rng.uniform(0.05, 0.95, n_per_group)
    y_a = (rng.uniform(0, 1, n_per_group) < p_a).astype(int)

    # Group B: same latent risk, but scores are pushed toward extremes
    # (over-confidence) → calibration slope << 1.
    p_b_latent = rng.uniform(0.05, 0.95, n_per_group)
    y_b = (rng.uniform(0, 1, n_per_group) < p_b_latent).astype(int)
    # Squash/stretch: scores become 0.5 + 2 * (p - 0.5), clipped.
    p_b_score = np.clip(0.5 + 2.0 * (p_b_latent - 0.5), 0.01, 0.99)

    y_true = np.concatenate([y_a, y_b])
    y_score = np.concatenate([p_a, p_b_score])
    return y_true, y_score, groups


# ---------------------------------------------------------------------------
# AUROC parity
# ---------------------------------------------------------------------------


def test_auroc_parity_fair_data_low_disparity():
    y_true, y_score, groups = _fair_score_dataset(seed=1)
    result = auroc_parity(y_true, y_score, groups)
    assert set(result) == {"disparity", "group_aucs"}
    assert set(result["group_aucs"]) == {"A", "B"}
    # Both groups should have comparable AUROC.
    assert result["disparity"] < 0.1


def test_auroc_parity_biased_data_high_disparity():
    y_true, y_score, groups = _biased_score_dataset(seed=2)
    result = auroc_parity(y_true, y_score, groups)
    # Group A ~0.95 AUROC, group B ~0.5 AUROC → large gap.
    assert result["disparity"] > 0.2
    assert result["group_aucs"]["A"] > result["group_aucs"]["B"]


def test_auroc_parity_skips_single_class_group():
    # Group B has only positives → AUROC undefined, must be skipped.
    y_true = np.array([0, 1, 0, 1, 1, 1, 1, 1])
    y_score = np.array([0.1, 0.9, 0.2, 0.8, 0.7, 0.6, 0.5, 0.4])
    groups = np.array(["A", "A", "A", "A", "B", "B", "B", "B"])
    result = auroc_parity(y_true, y_score, groups)
    assert "A" in result["group_aucs"]
    assert "B" not in result["group_aucs"]
    # Only one valid group → disparity collapses to 0.
    assert result["disparity"] == 0.0


def test_auroc_parity_shape_validation():
    with pytest.raises(ValueError):
        auroc_parity(np.array([0, 1]), np.array([0.5]), np.array(["A", "B"]))


# ---------------------------------------------------------------------------
# Calibration slope parity
# ---------------------------------------------------------------------------


def test_calibration_slope_parity_fair_data_slopes_near_one():
    # Both groups well-calibrated by construction.
    rng = np.random.default_rng(7)
    n_per_group = 800
    groups = np.array(["A"] * n_per_group + ["B"] * n_per_group)
    p = rng.uniform(0.05, 0.95, 2 * n_per_group)
    y_true = (rng.uniform(0, 1, 2 * n_per_group) < p).astype(int)
    y_score = p

    result = calibration_slope_parity(y_true, y_score, groups)
    assert set(result) == {"disparity", "group_slopes", "group_intercepts"}
    assert set(result["group_slopes"]) == {"A", "B"}
    # Both slopes should be near 1 → disparity small.
    assert result["disparity"] < 0.3
    for slope in result["group_slopes"].values():
        assert 0.7 < slope < 1.3


def test_calibration_slope_parity_miscalibrated_data_high_disparity():
    y_true, y_score, groups = _miscalibrated_dataset(seed=3)
    result = calibration_slope_parity(y_true, y_score, groups)
    slopes = result["group_slopes"]
    # Group A slope ~1; group B slope significantly below 1 (over-confident).
    assert abs(slopes["A"] - 1.0) < 0.3
    assert slopes["B"] < slopes["A"]
    assert result["disparity"] > 0.1


def test_calibration_slope_parity_clips_extreme_scores():
    # Scores exactly at 0 / 1 would blow up logit — ensure they're clipped.
    rng = np.random.default_rng(11)
    n = 400
    groups = np.array(["A"] * (n // 2) + ["B"] * (n // 2))
    y_true = rng.integers(0, 2, size=n)
    y_score = np.where(y_true == 1, 1.0, 0.0)  # perfect separation → logit blows up
    # Should not raise even though scores are exactly 0/1.
    result = calibration_slope_parity(y_true, y_score, groups)
    assert "disparity" in result


def test_calibration_slope_parity_skips_small_groups():
    # Group B has fewer than 10 samples → must be skipped.
    y_true = np.concatenate([np.array([0, 1] * 25), np.array([0, 1, 0, 1])])
    y_score = np.concatenate([np.linspace(0.1, 0.9, 50), np.array([0.2, 0.8, 0.3, 0.7])])
    groups = np.array(["A"] * 50 + ["B"] * 4)
    result = calibration_slope_parity(y_true, y_score, groups)
    assert "A" in result["group_slopes"]
    assert "B" not in result["group_slopes"]
    assert result["disparity"] == 0.0


def test_calibration_slope_parity_skips_single_class_group():
    rng = np.random.default_rng(13)
    y_true_a = rng.integers(0, 2, size=50)
    y_score_a = np.clip(y_true_a + rng.normal(0, 0.2, 50), 0.01, 0.99)
    y_true_b = np.ones(50, dtype=int)  # single class
    y_score_b = rng.uniform(0.3, 0.9, 50)
    y_true = np.concatenate([y_true_a, y_true_b])
    y_score = np.concatenate([y_score_a, y_score_b])
    groups = np.array(["A"] * 50 + ["B"] * 50)
    result = calibration_slope_parity(y_true, y_score, groups)
    assert "B" not in result["group_slopes"]


# ---------------------------------------------------------------------------
# AUPRC parity
# ---------------------------------------------------------------------------


def test_auprc_parity_fair_data_low_disparity():
    y_true, y_score, groups = _fair_score_dataset(seed=4)
    result = auprc_parity(y_true, y_score, groups)
    assert set(result) == {"disparity", "group_auprcs"}
    assert set(result["group_auprcs"]) == {"A", "B"}
    assert result["disparity"] < 0.1


def test_auprc_parity_biased_data_high_disparity():
    y_true, y_score, groups = _biased_score_dataset(seed=5)
    result = auprc_parity(y_true, y_score, groups)
    assert result["disparity"] > 0.2
    assert result["group_auprcs"]["A"] > result["group_auprcs"]["B"]


def test_auprc_parity_handles_imbalanced_class():
    # Very imbalanced positive class per group — AUPRC should still be defined.
    rng = np.random.default_rng(6)
    n_per_group = 1000
    groups = np.array(["A"] * n_per_group + ["B"] * n_per_group)
    # 2% positive in each group.
    y_true = np.zeros(2 * n_per_group, dtype=int)
    pos_idx = rng.choice(2 * n_per_group, size=40, replace=False)
    y_true[pos_idx] = 1
    y_score = np.clip(y_true + rng.normal(0, 0.3, 2 * n_per_group), 0, 1)
    result = auprc_parity(y_true, y_score, groups)
    assert 0.0 <= result["disparity"] <= 1.0
    for auprc in result["group_auprcs"].values():
        assert 0.0 <= auprc <= 1.0


def test_auprc_parity_skips_single_class_group():
    y_true = np.array([0, 1, 0, 1, 1, 1, 1, 1])
    y_score = np.array([0.1, 0.9, 0.2, 0.8, 0.7, 0.6, 0.5, 0.4])
    groups = np.array(["A", "A", "A", "A", "B", "B", "B", "B"])
    result = auprc_parity(y_true, y_score, groups)
    assert "A" in result["group_auprcs"]
    assert "B" not in result["group_auprcs"]
    assert result["disparity"] == 0.0


# ---------------------------------------------------------------------------
# Registry integration
# ---------------------------------------------------------------------------


@pytest.mark.parametrize(
    "name,expected_category",
    [
        ("auroc_parity", MetricCategory.CLASSIFICATION),
        ("calibration_slope_parity", MetricCategory.CALIBRATION),
        ("auprc_parity", MetricCategory.CLASSIFICATION),
    ],
)
def test_metric_registered(name: str, expected_category: MetricCategory):
    assert name in METRIC_REGISTRY
    info = get_metric(name)
    assert info.name == name
    assert info.category == expected_category
    assert info.input_type == InputType.SCORE
    assert "threshold_free" in info.tags
    assert callable(info.compute_fn)


def test_registered_compute_fns_produce_expected_output():
    y_true, y_score, groups = _fair_score_dataset(seed=99)
    for name in ("auroc_parity", "calibration_slope_parity", "auprc_parity"):
        info = get_metric(name)
        result = info.compute_fn(y_true, y_score, groups)
        assert "disparity" in result
        assert isinstance(result["disparity"], float)


def test_auprc_parity_tagged_for_imbalanced_class():
    info = get_metric("auprc_parity")
    assert "imbalanced_class" in info.tags
