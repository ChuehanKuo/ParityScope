"""Tests for parityscope.audit.intersectional — intersectional fairness analysis."""

import numpy as np
import pandas as pd
import pytest

from parityscope.audit.intersectional import generate_intersectional_groups


class TestGenerateIntersectionalGroups:
    """Tests for generate_intersectional_groups."""

    def test_basic_generation(self):
        demographics = pd.DataFrame({
            "race": ["White"] * 100 + ["Black"] * 100,
            "sex": ["Male"] * 100 + ["Female"] * 100,
        })
        results = generate_intersectional_groups(
            demographics, ["race", "sex"], max_depth=2, min_group_size=30,
        )
        assert len(results) >= 1
        attrs, series = results[0]
        assert "race" in attrs
        assert "sex" in attrs

    def test_small_groups_filtered_out(self):
        demographics = pd.DataFrame({
            "race": ["White"] * 200 + ["Black"] * 200 + ["Rare"] * 5,
            "sex": ["Male"] * 200 + ["Female"] * 200 + ["Male"] * 5,
        })
        results = generate_intersectional_groups(
            demographics, ["race", "sex"], max_depth=2, min_group_size=30,
        )
        for attrs, series in results:
            # Groups with < 30 samples should be NaN
            counts = series.dropna().value_counts()
            for count in counts.values:
                assert count >= 30

    def test_insufficient_groups_skipped(self):
        """If combining creates only 1 valid group, skip that combination."""
        demographics = pd.DataFrame({
            "race": ["White"] * 100 + ["Rare"] * 5,
            "sex": ["Male"] * 100 + ["Female"] * 5,
        })
        results = generate_intersectional_groups(
            demographics, ["race", "sex"], max_depth=2, min_group_size=30,
        )
        # Only White_Male has >= 30, so combination should be skipped (need >= 2)
        # The actual result depends on data distribution
        for attrs, series in results:
            valid = series.dropna().value_counts()
            assert len(valid) >= 2

    def test_single_attribute_no_results(self):
        """With only 1 attribute, no pairwise intersections are possible."""
        demographics = pd.DataFrame({
            "race": ["White"] * 100 + ["Black"] * 100,
        })
        results = generate_intersectional_groups(
            demographics, ["race"], max_depth=2, min_group_size=30,
        )
        assert results == []

    def test_max_depth_respected(self):
        demographics = pd.DataFrame({
            "race": ["A"] * 60 + ["B"] * 60,
            "sex": ["M"] * 60 + ["F"] * 60,
            "age_group": ["Young"] * 60 + ["Old"] * 60,
        })
        results_d2 = generate_intersectional_groups(
            demographics, ["race", "sex", "age_group"], max_depth=2, min_group_size=5,
        )
        # depth=2 means only pairwise
        for attrs, series in results_d2:
            assert len(attrs) == 2

    def test_combined_labels_format(self):
        demographics = pd.DataFrame({
            "race": ["White"] * 50 + ["Black"] * 50,
            "sex": ["Male"] * 50 + ["Female"] * 50,
        })
        results = generate_intersectional_groups(
            demographics, ["race", "sex"], max_depth=2, min_group_size=10,
        )
        if results:
            _, series = results[0]
            for val in series.dropna().unique():
                assert "_" in val  # e.g. "White_Male"
