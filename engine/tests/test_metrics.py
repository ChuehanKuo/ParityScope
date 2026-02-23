"""Tests for fairness metrics."""

import numpy as np
import pytest

from parityscope.metrics.classification import (
    accuracy_parity,
    demographic_parity,
    equal_opportunity,
    equalized_odds,
    false_negative_rate_parity,
    false_positive_rate_parity,
    predictive_parity,
    treatment_equality,
)
from parityscope.metrics.calibration import (
    calibration_difference,
    score_distribution_difference,
    well_calibration,
)
from parityscope.metrics.registry import (
    MetricCategory,
    InputType,
    get_metric,
    list_metrics,
)


class TestDemographicParity:
    def test_perfect_parity(self):
        y_true = np.array([1, 0, 1, 0, 1, 0, 1, 0])
        y_pred = np.array([1, 0, 1, 0, 1, 0, 1, 0])
        groups = np.array(["A", "A", "A", "A", "B", "B", "B", "B"])

        result = demographic_parity(y_true, y_pred, groups)
        assert result["disparity"] == 0.0
        assert result["group_rates"]["A"] == 0.5
        assert result["group_rates"]["B"] == 0.5

    def test_biased_predictions(self, binary_dataset):
        result = demographic_parity(
            binary_dataset["y_true"],
            binary_dataset["y_pred"],
            binary_dataset["groups"],
        )
        assert result["disparity"] > 0
        assert "A" in result["group_rates"]
        assert "B" in result["group_rates"]

    def test_empty_input_raises(self):
        with pytest.raises(ValueError, match="must not be empty"):
            demographic_parity([], [], [])

    def test_mismatched_shapes_raises(self):
        with pytest.raises(ValueError, match="same shape"):
            demographic_parity([1, 0], [1], ["A", "B"])


class TestEqualOpportunity:
    def test_equal_tpr(self):
        # Both groups: TPR = 1.0
        y_true = np.array([1, 1, 0, 0, 1, 1, 0, 0])
        y_pred = np.array([1, 1, 0, 0, 1, 1, 0, 0])
        groups = np.array(["A", "A", "A", "A", "B", "B", "B", "B"])

        result = equal_opportunity(y_true, y_pred, groups)
        assert result["disparity"] == 0.0

    def test_unequal_tpr(self, binary_dataset):
        result = equal_opportunity(
            binary_dataset["y_true"],
            binary_dataset["y_pred"],
            binary_dataset["groups"],
        )
        # Group B has worse TPR due to higher FN rate
        assert result["disparity"] > 0
        assert result["group_rates"]["A"] > result["group_rates"]["B"]


class TestEqualizedOdds:
    def test_returns_tpr_and_fpr(self, binary_dataset):
        result = equalized_odds(
            binary_dataset["y_true"],
            binary_dataset["y_pred"],
            binary_dataset["groups"],
        )
        assert "tpr_rates" in result
        assert "fpr_rates" in result
        assert result["disparity"] >= 0


class TestFalseRates:
    def test_fpr_parity(self, binary_dataset):
        result = false_positive_rate_parity(
            binary_dataset["y_true"],
            binary_dataset["y_pred"],
            binary_dataset["groups"],
        )
        assert result["disparity"] > 0  # Group B has higher FPR

    def test_fnr_parity(self, binary_dataset):
        result = false_negative_rate_parity(
            binary_dataset["y_true"],
            binary_dataset["y_pred"],
            binary_dataset["groups"],
        )
        assert result["disparity"] > 0  # Group B has higher FNR


class TestAccuracyParity:
    def test_equal_accuracy(self, fair_dataset):
        result = accuracy_parity(
            fair_dataset["y_true"],
            fair_dataset["y_pred"],
            fair_dataset["groups"],
        )
        # Fair dataset should have low disparity
        assert result["disparity"] < 0.1


class TestTreatmentEquality:
    def test_returns_ratios(self, binary_dataset):
        result = treatment_equality(
            binary_dataset["y_true"],
            binary_dataset["y_pred"],
            binary_dataset["groups"],
        )
        assert "group_ratios" in result


class TestCalibrationMetrics:
    def test_calibration_difference(self, binary_dataset):
        result = calibration_difference(
            binary_dataset["y_true"],
            binary_dataset["y_score"],
            binary_dataset["groups"],
        )
        assert "disparity" in result
        assert "group_calibration_errors" in result
        assert result["disparity"] >= 0

    def test_well_calibration(self, binary_dataset):
        result = well_calibration(
            binary_dataset["y_true"],
            binary_dataset["y_score"],
            binary_dataset["groups"],
        )
        assert "group_brier_scores" in result
        assert result["disparity"] >= 0

    def test_score_distribution(self, binary_dataset):
        result = score_distribution_difference(
            binary_dataset["y_true"],
            binary_dataset["y_score"],
            binary_dataset["groups"],
        )
        assert "pairwise_ks" in result
        assert result["disparity"] >= 0


class TestMetricRegistry:
    def test_get_metric(self):
        info = get_metric("demographic_parity")
        assert info.name == "demographic_parity"
        assert info.category == MetricCategory.CLASSIFICATION
        assert info.input_type == InputType.BINARY

    def test_get_unknown_metric_raises(self):
        with pytest.raises(KeyError, match="Unknown metric"):
            get_metric("nonexistent_metric")

    def test_list_all_metrics(self):
        all_metrics = list_metrics()
        assert len(all_metrics) == 15  # 12 classification + 3 calibration

    def test_filter_by_category(self):
        cal_metrics = list_metrics(category=MetricCategory.CALIBRATION)
        assert len(cal_metrics) == 3
        assert all(m.category == MetricCategory.CALIBRATION for m in cal_metrics)

    def test_filter_by_input_type(self):
        binary_metrics = list_metrics(input_type=InputType.BINARY)
        assert all(m.input_type == InputType.BINARY for m in binary_metrics)

    def test_filter_by_tag(self):
        separation = list_metrics(tag="separation")
        assert len(separation) > 0
        assert all("separation" in m.tags for m in separation)
