"""Tests for parityscope.metrics.bootstrap — bootstrap confidence intervals."""

import numpy as np
import pytest

from parityscope.metrics.bootstrap import BootstrapResult, bootstrap_metric


def _simple_disparity(y_true, y_pred, groups):
    """Simple metric: difference in accuracy between groups."""
    unique = np.unique(groups)
    if len(unique) < 2:
        return {"disparity": 0.0}
    rates = {}
    for g in unique:
        mask = groups == g
        if mask.sum() > 0:
            rates[g] = float(np.mean(y_true[mask] == y_pred[mask]))
    vals = list(rates.values())
    return {"disparity": max(vals) - min(vals), "group_rates": rates}


class TestBootstrapMetric:
    """Tests for bootstrap_metric."""

    def test_produces_valid_result(self):
        rng = np.random.default_rng(42)
        n = 200
        y_true = rng.integers(0, 2, n)
        y_pred = y_true.copy()
        flip = rng.random(n) < 0.15
        y_pred[flip] = 1 - y_pred[flip]
        groups = np.array(["A"] * 100 + ["B"] * 100)

        result = bootstrap_metric(
            _simple_disparity, y_true, y_pred, groups,
            n_bootstrap=100, seed=42,
        )
        assert isinstance(result, BootstrapResult)
        assert result.n_bootstrap == 100
        assert result.ci_level == 0.95
        assert result.ci_lower <= result.ci_upper
        assert result.standard_error >= 0

    def test_ci_contains_point_estimate(self):
        rng = np.random.default_rng(99)
        n = 300
        y_true = rng.integers(0, 2, n)
        y_pred = y_true.copy()
        flip = rng.random(n) < 0.1
        y_pred[flip] = 1 - y_pred[flip]
        groups = np.array(["X"] * 150 + ["Y"] * 150)

        result = bootstrap_metric(
            _simple_disparity, y_true, y_pred, groups,
            n_bootstrap=200, seed=99,
        )
        # CI should contain the point estimate (or be very close)
        assert result.ci_lower <= result.point_estimate + 0.05
        assert result.ci_upper >= result.point_estimate - 0.05

    def test_zero_disparity_data(self):
        """When groups are identical, disparity should be near zero."""
        n = 200
        y_true = np.array([0, 1] * 100)
        y_pred = y_true.copy()
        groups = np.array(["A", "B"] * 100)

        result = bootstrap_metric(
            _simple_disparity, y_true, y_pred, groups,
            n_bootstrap=50, seed=42,
        )
        assert result.point_estimate == pytest.approx(0.0, abs=0.01)

    def test_custom_ci_level(self):
        rng = np.random.default_rng(7)
        n = 100
        y_true = rng.integers(0, 2, n)
        y_pred = y_true.copy()
        groups = np.array(["A"] * 50 + ["B"] * 50)

        result = bootstrap_metric(
            _simple_disparity, y_true, y_pred, groups,
            n_bootstrap=50, ci_level=0.90, seed=7,
        )
        assert result.ci_level == 0.90
