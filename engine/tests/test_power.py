"""Tests for parityscope.metrics.power — statistical power analysis."""

import pandas as pd
import pytest

from parityscope.metrics.power import (
    PowerAnalysisResult,
    SampleAdequacy,
    analyze_sample_adequacy,
    compute_minimum_detectable_effect,
    compute_required_sample_size,
)


class TestComputeMinimumDetectableEffect:
    """Tests for compute_minimum_detectable_effect."""

    def test_basic_computation(self):
        mde = compute_minimum_detectable_effect(100, 100)
        assert 0 < mde < 1.0

    def test_larger_sample_smaller_mde(self):
        mde_small = compute_minimum_detectable_effect(50, 50)
        mde_large = compute_minimum_detectable_effect(500, 500)
        assert mde_large < mde_small

    def test_symmetric(self):
        mde1 = compute_minimum_detectable_effect(100, 200)
        mde2 = compute_minimum_detectable_effect(200, 100)
        assert mde1 == pytest.approx(mde2, abs=1e-10)

    def test_capped_at_one(self):
        mde = compute_minimum_detectable_effect(1, 1)
        assert mde <= 1.0


class TestComputeRequiredSampleSize:
    """Tests for compute_required_sample_size."""

    def test_basic_computation(self):
        n = compute_required_sample_size(0.05)
        assert n > 0
        assert isinstance(n, int)

    def test_smaller_effect_needs_more_samples(self):
        n_big = compute_required_sample_size(0.10)
        n_small = compute_required_sample_size(0.01)
        assert n_small > n_big

    def test_zero_effect_returns_zero(self):
        n = compute_required_sample_size(0.0)
        assert n == 0

    def test_negative_effect_returns_zero(self):
        n = compute_required_sample_size(-0.05)
        assert n == 0


class TestAnalyzeSampleAdequacy:
    """Tests for analyze_sample_adequacy."""

    def test_basic_analysis(self):
        demographics = pd.DataFrame({
            "race": ["White"] * 500 + ["Black"] * 300 + ["Hispanic"] * 200,
        })
        results = analyze_sample_adequacy(demographics, ["race"])
        assert len(results) == 1
        assert isinstance(results[0], PowerAnalysisResult)
        assert results[0].attribute == "race"
        assert len(results[0].group_results) == 3

    def test_adequate_sample(self):
        demographics = pd.DataFrame({
            "group": ["A"] * 2000 + ["B"] * 2000,
        })
        results = analyze_sample_adequacy(demographics, ["group"], target_effect=0.10)
        assert results[0].overall_adequate is True

    def test_inadequate_sample(self):
        demographics = pd.DataFrame({
            "group": ["A"] * 10 + ["B"] * 10,
        })
        results = analyze_sample_adequacy(demographics, ["group"], target_effect=0.01)
        assert results[0].overall_adequate is False
        # Should recommend larger n
        inadequate = [g for g in results[0].group_results if not g.is_adequate]
        assert len(inadequate) > 0
        assert inadequate[0].recommended_n is not None

    def test_missing_attribute(self):
        demographics = pd.DataFrame({"age": [25, 30, 35]})
        results = analyze_sample_adequacy(demographics, ["nonexistent"])
        assert results == []

    def test_multiple_attributes(self):
        demographics = pd.DataFrame({
            "race": ["A"] * 100 + ["B"] * 100,
            "sex": ["M"] * 100 + ["F"] * 100,
        })
        results = analyze_sample_adequacy(demographics, ["race", "sex"])
        assert len(results) == 2

    def test_summary_contains_adequate_info(self):
        demographics = pd.DataFrame({
            "group": ["A"] * 1000 + ["B"] * 1000,
        })
        results = analyze_sample_adequacy(demographics, ["group"])
        assert "group" in results[0].summary
