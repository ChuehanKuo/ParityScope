"""Tests for parityscope.metrics.effect_size — effect size measures."""

import pytest

from parityscope.metrics.effect_size import EffectSizeResult, compute_effect_sizes


class TestComputeEffectSizes:
    """Tests for compute_effect_sizes."""

    def test_known_rates(self):
        rates = {"A": 0.90, "B": 0.70}
        sizes = {"A": 500, "B": 300}
        result = compute_effect_sizes(rates, sizes)
        assert isinstance(result, EffectSizeResult)
        assert result.max_group == "A"
        assert result.min_group == "B"
        assert result.risk_difference == pytest.approx(0.20, abs=0.001)
        assert result.risk_ratio is not None
        assert result.risk_ratio > 1.0
        assert result.odds_ratio is not None
        assert result.odds_ratio > 1.0
        assert result.cohens_d is not None

    def test_identical_rates(self):
        rates = {"A": 0.80, "B": 0.80}
        sizes = {"A": 100, "B": 100}
        result = compute_effect_sizes(rates, sizes)
        assert result.risk_difference == pytest.approx(0.0, abs=0.001)
        assert "Minimal" in result.interpretation or result.risk_difference == 0.0

    def test_single_group(self):
        rates = {"A": 0.80}
        sizes = {"A": 100}
        result = compute_effect_sizes(rates, sizes)
        assert result.cohens_d is None
        assert result.odds_ratio is None
        assert result.risk_ratio is None
        assert result.risk_difference == 0.0
        assert "Insufficient" in result.interpretation

    def test_zero_min_rate(self):
        rates = {"A": 0.80, "B": 0.0}
        sizes = {"A": 100, "B": 100}
        result = compute_effect_sizes(rates, sizes)
        assert result.risk_ratio is None  # division by zero avoided
        assert result.odds_ratio is None  # min_rate == 0
        assert result.risk_difference == pytest.approx(0.80, abs=0.001)

    def test_interpretation_large_effect(self):
        rates = {"A": 0.95, "B": 0.30}
        sizes = {"A": 200, "B": 200}
        result = compute_effect_sizes(rates, sizes)
        assert "Large" in result.interpretation or "percentage-point" in result.interpretation

    def test_interpretation_negligible_effect(self):
        rates = {"A": 0.50, "B": 0.49}
        sizes = {"A": 100, "B": 100}
        result = compute_effect_sizes(rates, sizes)
        assert "Negligible" in result.interpretation or "Minimal" in result.interpretation

    def test_three_groups(self):
        rates = {"A": 0.90, "B": 0.70, "C": 0.80}
        sizes = {"A": 100, "B": 100, "C": 100}
        result = compute_effect_sizes(rates, sizes)
        assert result.max_group == "A"
        assert result.min_group == "B"
        assert result.risk_difference == pytest.approx(0.20, abs=0.001)
