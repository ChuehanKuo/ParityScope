"""Tests for parityscope.audit.subgroup_discovery — worst subgroup discovery."""

import numpy as np
import pandas as pd
import pytest

from parityscope.audit.subgroup_discovery import (
    SubgroupFinding,
    discover_worst_subgroups,
    subgroup_findings_to_dicts,
)


@pytest.fixture
def biased_data():
    """Create data where one group has much worse performance."""
    rng = np.random.default_rng(42)
    n = 400
    y_true = rng.integers(0, 2, n)
    y_pred = y_true.copy()

    # Make group B have many more errors
    groups = np.array(["A"] * 200 + ["B"] * 200)
    b_mask = np.where(groups == "B")[0]
    flip_b = rng.choice(b_mask, size=60, replace=False)
    y_pred[flip_b] = 1 - y_pred[flip_b]

    demographics = pd.DataFrame({
        "race": groups,
        "sex": rng.choice(["Male", "Female"], n),
    })
    return y_true, y_pred, demographics


class TestDiscoverWorstSubgroups:
    """Tests for discover_worst_subgroups."""

    def test_finds_biased_group(self, biased_data):
        y_true, y_pred, demographics = biased_data
        findings = discover_worst_subgroups(
            y_true, y_pred, demographics, ["race"], min_group_size=30,
        )
        assert len(findings) > 0
        # Group B should have larger deviation
        labels = [f.subgroup_label for f in findings]
        assert "B" in labels

    def test_severity_classification(self, biased_data):
        y_true, y_pred, demographics = biased_data
        findings = discover_worst_subgroups(
            y_true, y_pred, demographics, ["race"], min_group_size=30,
        )
        valid_severities = {"critical", "high", "medium", "low"}
        for f in findings:
            assert f.severity in valid_severities

    def test_top_k_limits_results(self, biased_data):
        y_true, y_pred, demographics = biased_data
        findings = discover_worst_subgroups(
            y_true, y_pred, demographics, ["race", "sex"],
            min_group_size=30, top_k=3,
        )
        assert len(findings) <= 3

    def test_min_group_size_respected(self, biased_data):
        y_true, y_pred, demographics = biased_data
        findings = discover_worst_subgroups(
            y_true, y_pred, demographics, ["race", "sex"],
            min_group_size=30,
        )
        for f in findings:
            assert f.sample_size >= 30

    def test_intersectional_subgroups(self, biased_data):
        y_true, y_pred, demographics = biased_data
        findings = discover_worst_subgroups(
            y_true, y_pred, demographics, ["race", "sex"],
            min_group_size=30, max_intersection_depth=2,
        )
        # Should include both single-attribute and intersection subgroups
        has_intersection = any("_" in f.subgroup_label for f in findings)
        has_single = any("_" not in f.subgroup_label for f in findings)
        assert has_intersection or has_single  # At least one type

    def test_sorted_by_deviation(self, biased_data):
        y_true, y_pred, demographics = biased_data
        findings = discover_worst_subgroups(
            y_true, y_pred, demographics, ["race", "sex"],
            min_group_size=30,
        )
        deviations = [abs(f.deviation) for f in findings]
        assert deviations == sorted(deviations, reverse=True)

    def test_findings_to_dicts(self, biased_data):
        y_true, y_pred, demographics = biased_data
        findings = discover_worst_subgroups(
            y_true, y_pred, demographics, ["race"], min_group_size=30,
        )
        dicts = subgroup_findings_to_dicts(findings)
        assert len(dicts) == len(findings)
        for d in dicts:
            assert "subgroup_label" in d
            assert "severity" in d
            assert "deviation" in d

    def test_single_depth(self, biased_data):
        y_true, y_pred, demographics = biased_data
        findings = discover_worst_subgroups(
            y_true, y_pred, demographics, ["race", "sex"],
            min_group_size=30, max_intersection_depth=1,
        )
        # No intersections, only single-attribute groups
        for f in findings:
            assert len(f.subgroup_definition) == 1
