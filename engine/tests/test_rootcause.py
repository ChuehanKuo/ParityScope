"""Tests for parityscope.rootcause — root cause analysis modules."""

import numpy as np
import pandas as pd
import pytest

from parityscope.rootcause.proxy_detection import ProxyVariable, detect_proxies, cramers_v
from parityscope.rootcause.label_bias import LabelBiasFinding, detect_label_bias
from parityscope.rootcause.feature_importance import FeatureImportance, analyze_feature_importance
from parityscope.rootcause.representation import RepresentationReport, analyze_representation
from parityscope.rootcause.analysis import RootCauseAnalysis, RootCauseReport


@pytest.fixture
def rootcause_data():
    """Generate data for root cause analysis testing."""
    rng = np.random.default_rng(42)
    n = 300
    race = np.array(["White"] * 150 + ["Black"] * 100 + ["Hispanic"] * 50)
    # Create a proxy feature correlated with race
    # zip_code: correlated with race
    zip_code = np.where(race == "White", "10001", np.where(race == "Black", "20001", "30001"))
    zip_code = np.array(zip_code)

    y_true = rng.integers(0, 2, n)
    y_pred = y_true.copy()
    # Make Black group have more errors
    black_idx = np.where(race == "Black")[0]
    flip = rng.choice(black_idx, size=30, replace=False)
    y_pred[flip] = 1 - y_pred[flip]

    age = rng.normal(50, 15, n).astype(float)
    income = np.where(race == "White", rng.normal(70000, 15000, n),
                      np.where(race == "Black", rng.normal(45000, 12000, n),
                               rng.normal(50000, 13000, n)))

    X = pd.DataFrame({"age": age, "income": income, "zip_code": zip_code})
    demographics = pd.DataFrame({"race": race})

    return X, y_true, y_pred, demographics


class TestProxyDetection:
    """Tests for proxy_detection module."""

    def test_detects_correlated_feature(self, rootcause_data):
        X, y_true, y_pred, demographics = rootcause_data
        proxies = detect_proxies(X, demographics, ["race"], threshold=0.2)
        # income or zip_code should be detected as proxy
        features_found = [p.feature for p in proxies]
        assert len(proxies) > 0

    def test_severity_levels(self, rootcause_data):
        X, y_true, y_pred, demographics = rootcause_data
        proxies = detect_proxies(X, demographics, ["race"], threshold=0.1)
        valid_severities = {"low", "medium", "high"}
        for p in proxies:
            assert p.severity in valid_severities

    def test_sorted_by_correlation(self, rootcause_data):
        X, y_true, y_pred, demographics = rootcause_data
        proxies = detect_proxies(X, demographics, ["race"], threshold=0.1)
        if len(proxies) > 1:
            corrs = [abs(p.correlation) for p in proxies]
            assert corrs == sorted(corrs, reverse=True)

    def test_cramers_v_basic(self):
        x = pd.Series(["A", "A", "B", "B", "A", "B"] * 10)
        y = pd.Series(["X", "X", "Y", "Y", "X", "Y"] * 10)
        v = cramers_v(x, y)
        assert 0 <= v <= 1
        assert v > 0.5  # Should be highly correlated

    def test_no_proxies_with_high_threshold(self, rootcause_data):
        X, y_true, y_pred, demographics = rootcause_data
        # Use only numeric features (exclude zip_code which perfectly correlates)
        X_numeric = X.select_dtypes(include=["number"])
        proxies = detect_proxies(X_numeric, demographics, ["race"], threshold=0.99)
        assert len(proxies) == 0


class TestLabelBias:
    """Tests for label_bias module."""

    def test_detects_large_disparity(self):
        rng = np.random.default_rng(42)
        n = 500
        race = np.array(["White"] * 250 + ["Black"] * 250)
        # White: 70% positive, Black: 30% positive
        y_true = np.zeros(n, dtype=int)
        y_true[:175] = 1  # 70% of White
        y_true[250:325] = 1  # 30% of Black
        demographics = pd.DataFrame({"race": race})

        findings = detect_label_bias(y_true, demographics, ["race"])
        assert len(findings) > 0
        assert findings[0].disparity > 0.1

    def test_no_findings_for_equal_rates(self):
        n = 400
        race = np.array(["A"] * 200 + ["B"] * 200)
        y_true = np.array([0, 1] * 200)  # 50/50 in both groups
        demographics = pd.DataFrame({"race": race})
        findings = detect_label_bias(y_true, demographics, ["race"])
        assert len(findings) == 0

    def test_chi_squared_test_included(self):
        rng = np.random.default_rng(42)
        n = 600
        race = np.array(["X"] * 300 + ["Y"] * 300)
        y_true = np.zeros(n, dtype=int)
        y_true[:210] = 1  # 70% X
        y_true[300:390] = 1  # 30% Y
        demographics = pd.DataFrame({"race": race})

        findings = detect_label_bias(y_true, demographics, ["race"])
        assert len(findings) > 0
        assert "chi_squared" in findings[0].statistical_test.get("test_name", "")

    def test_severity_levels(self):
        rng = np.random.default_rng(42)
        n = 600
        race = np.array(["A"] * 300 + ["B"] * 300)
        y_true = np.zeros(n, dtype=int)
        y_true[:240] = 1  # 80% of A
        y_true[300:360] = 1  # 20% of B
        demographics = pd.DataFrame({"race": race})

        findings = detect_label_bias(y_true, demographics, ["race"])
        valid_severities = {"low", "medium", "high"}
        for f in findings:
            assert f.severity in valid_severities


class TestFeatureImportance:
    """Tests for feature_importance module."""

    def test_correlation_based(self, rootcause_data):
        X, y_true, y_pred, demographics = rootcause_data
        result = analyze_feature_importance(
            X, y_true, y_pred, demographics, ["race"],
        )
        assert len(result) > 0
        assert all(isinstance(fi, FeatureImportance) for fi in result)

    def test_sorted_by_importance(self, rootcause_data):
        X, y_true, y_pred, demographics = rootcause_data
        result = analyze_feature_importance(
            X, y_true, y_pred, demographics, ["race"],
        )
        scores = [fi.importance_score for fi in result]
        assert scores == sorted(scores, reverse=True)

    def test_importance_pct_sums_close_to_100(self, rootcause_data):
        X, y_true, y_pred, demographics = rootcause_data
        result = analyze_feature_importance(
            X, y_true, y_pred, demographics, ["race"],
        )
        # Only numeric features get importance, but sum should be ~100
        total_pct = sum(fi.importance_pct for fi in result)
        assert total_pct == pytest.approx(100.0, abs=1.0)

    def test_empty_features(self):
        X = pd.DataFrame()
        y_true = np.array([0, 1, 0, 1])
        y_pred = np.array([0, 1, 1, 1])
        demographics = pd.DataFrame({"race": ["A", "B", "A", "B"]})
        result = analyze_feature_importance(X, y_true, y_pred, demographics, ["race"])
        assert result == []


class TestRepresentation:
    """Tests for representation module."""

    def test_basic_representation(self):
        demographics = pd.DataFrame({
            "race": ["White"] * 60 + ["Black"] * 30 + ["Hispanic"] * 10,
        })
        report = analyze_representation(demographics, ["race"])
        assert isinstance(report, RepresentationReport)
        assert "race" in report.group_proportions
        assert "race" in report.imbalance_ratios

    def test_underrepresented_groups_flagged(self):
        demographics = pd.DataFrame({
            "race": ["White"] * 100 + ["Rare"] * 5,
        })
        report = analyze_representation(demographics, ["race"])
        assert len(report.underrepresented_groups) > 0
        rare_findings = [u for u in report.underrepresented_groups if u["group"] == "Rare"]
        assert len(rare_findings) > 0

    def test_reference_comparison(self):
        demographics = pd.DataFrame({
            "race": ["White"] * 80 + ["Black"] * 20,
        })
        ref = {"race": {"White": 0.578, "Black": 0.121}}
        report = analyze_representation(demographics, ["race"], reference_population=ref)
        assert report.reference_comparison is not None
        assert "race" in report.reference_comparison

    def test_feature_coverage_analysis(self):
        demographics = pd.DataFrame({
            "race": ["A"] * 50 + ["B"] * 50,
        })
        X = pd.DataFrame({
            "feat1": [1.0] * 50 + [np.nan] * 50,  # 100% missing for group B
        })
        report = analyze_representation(demographics, ["race"], X=X)
        assert report.feature_coverage is not None


class TestRootCauseAnalysisEndToEnd:
    """Tests for RootCauseAnalysis.run()."""

    def test_end_to_end(self, rootcause_data):
        X, y_true, y_pred, demographics = rootcause_data
        rca = RootCauseAnalysis(protected_attributes=["race"])
        # Only pass numeric columns
        X_numeric = X.select_dtypes(include=["number"])
        report = rca.run(X_numeric, y_true, y_pred, demographics)
        assert isinstance(report, RootCauseReport)
        assert isinstance(report.summary, str)
        assert len(report.summary) > 0

    def test_to_dict(self, rootcause_data):
        X, y_true, y_pred, demographics = rootcause_data
        rca = RootCauseAnalysis(protected_attributes=["race"])
        X_numeric = X.select_dtypes(include=["number"])
        report = rca.run(X_numeric, y_true, y_pred, demographics)
        d = report.to_dict()
        assert "proxy_variables" in d
        assert "label_bias_findings" in d
        assert "feature_importance" in d
        assert "representation" in d
        assert "summary" in d
        assert "critical_findings" in d
