"""Tests for simulation / what-if analysis."""

import numpy as np
import pytest

from parityscope.simulation.interventions import (
    simulate_threshold_adjustment,
    simulate_resampling,
    compare_interventions,
)


class TestThresholdAdjustment:
    def test_basic_simulation(self, binary_dataset):
        result = simulate_threshold_adjustment(
            y_true=binary_dataset["y_true"],
            y_score=binary_dataset["y_score"],
            groups=binary_dataset["groups"],
            target_metric="demographic_parity",
        )

        assert result["intervention"] == "threshold_adjustment"
        assert "baseline" in result
        assert "optimized" in result
        assert "improvement" in result
        assert result["optimized"]["disparity"] <= result["baseline"]["disparity"]

    def test_invalid_metric_raises(self, binary_dataset):
        with pytest.raises(ValueError, match="Unsupported"):
            simulate_threshold_adjustment(
                binary_dataset["y_true"],
                binary_dataset["y_score"],
                binary_dataset["groups"],
                target_metric="nonexistent",
            )


class TestResampling:
    def test_basic_simulation(self, binary_dataset):
        result = simulate_resampling(
            y_true=binary_dataset["y_true"],
            y_pred=binary_dataset["y_pred"],
            groups=binary_dataset["groups"],
        )

        assert result["intervention"] == "balanced_resampling"
        assert "baseline_disparity" in result
        assert "estimated_disparity" in result
        assert result["estimated_disparity"]["mean"] >= 0

    def test_reproducible_with_seed(self, binary_dataset):
        r1 = simulate_resampling(
            binary_dataset["y_true"],
            binary_dataset["y_pred"],
            binary_dataset["groups"],
            random_seed=42,
        )
        r2 = simulate_resampling(
            binary_dataset["y_true"],
            binary_dataset["y_pred"],
            binary_dataset["groups"],
            random_seed=42,
        )
        assert r1["estimated_disparity"]["mean"] == r2["estimated_disparity"]["mean"]


class TestCompareInterventions:
    def test_returns_multiple_interventions(self, binary_dataset):
        results = compare_interventions(
            y_true=binary_dataset["y_true"],
            y_pred=binary_dataset["y_pred"],
            y_score=binary_dataset["y_score"],
            groups=binary_dataset["groups"],
        )

        assert len(results) == 2  # resampling + threshold adjustment
        interventions = [r["intervention"] for r in results]
        assert "balanced_resampling" in interventions
        assert "threshold_adjustment" in interventions

    def test_without_scores(self, binary_dataset):
        results = compare_interventions(
            y_true=binary_dataset["y_true"],
            y_pred=binary_dataset["y_pred"],
            y_score=None,
            groups=binary_dataset["groups"],
        )

        assert len(results) == 1  # Only resampling (no scores for threshold)
