"""Tests for parityscope.ai.detection — ML subgroup discovery, proxy detection, clustering."""

from __future__ import annotations

import numpy as np
import pandas as pd
import pytest

from parityscope.ai.detection import (
    BiasPattern,
    cluster_bias_patterns,
    detect_proxies_ml,
    discover_subgroups_ml,
)
from parityscope.audit.subgroup_discovery import SubgroupFinding
from parityscope.rootcause.proxy_detection import ProxyVariable


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _make_proxy_data(n: int = 200):
    """Build a small dataset with one strong proxy feature for ``race``."""
    rng = np.random.default_rng(42)
    race = rng.choice(["A", "B"], size=n)
    # Strong proxy: zip code derived from race
    zip_code = np.where(
        race == "A",
        rng.integers(10000, 20000, n),
        rng.integers(80000, 90000, n),
    )
    age = rng.integers(20, 80, n)  # not a proxy
    X = pd.DataFrame({"zip_code": zip_code, "age": age})
    demographics = pd.DataFrame({"race": race})
    return X, demographics


def _make_metric_history(
    n_in_cluster_a: int = 8,
    n_in_cluster_b: int = 8,
    rng_seed: int = 42,
) -> tuple[list[dict[str, float]], list[str]]:
    """Build two clearly separable clusters of audits."""
    rng = np.random.default_rng(rng_seed)
    history: list[dict[str, float]] = []
    audit_ids: list[str] = []

    # Cluster A: high disparity on metric_x, low on metric_y
    for i in range(n_in_cluster_a):
        history.append({
            "metric_x": float(0.20 + rng.normal(0, 0.005)),
            "metric_y": float(0.02 + rng.normal(0, 0.005)),
        })
        audit_ids.append(f"a_audit_{i}")

    # Cluster B: low disparity on metric_x, high on metric_y
    for i in range(n_in_cluster_b):
        history.append({
            "metric_x": float(0.02 + rng.normal(0, 0.005)),
            "metric_y": float(0.20 + rng.normal(0, 0.005)),
        })
        audit_ids.append(f"b_audit_{i}")

    return history, audit_ids


# ---------------------------------------------------------------------------
# discover_subgroups_ml
# ---------------------------------------------------------------------------


class TestMLSubgroupDiscovery:
    def test_returns_subgroup_finding_type(self, binary_dataset):
        findings = discover_subgroups_ml(
            y_true=binary_dataset["y_true"],
            y_pred=binary_dataset["y_pred"],
            demographics=binary_dataset["demographics"],
            protected_attributes=["race"],
        )
        assert isinstance(findings, list)
        for f in findings:
            assert isinstance(f, SubgroupFinding)

    def test_discovers_biased_subgroup(self, binary_dataset):
        # Inject a strongly biased synthetic feature so the tree has something
        # discriminating to split on; the OHE-to-direction mapping in
        # ``_extract_decision_path`` only surfaces one branch per binary attribute.
        rng = np.random.default_rng(0)
        n = len(binary_dataset["y_true"])
        # bias_signal is highly correlated with the biased group B
        bias_signal = (binary_dataset["demographics"]["race"] == "B").astype(int).to_numpy()
        bias_signal = bias_signal + rng.normal(0, 0.05, n)
        features = pd.DataFrame({"bias_signal": bias_signal})

        findings = discover_subgroups_ml(
            y_true=binary_dataset["y_true"],
            y_pred=binary_dataset["y_pred"],
            demographics=binary_dataset["demographics"],
            protected_attributes=["race"],
            features=features,
            min_group_size=20,
        )
        # binary_dataset is intentionally biased — at least one elevated-error
        # subgroup should surface.
        assert len(findings) >= 1
        # All findings exceed the population error rate (positive deviation in
        # error space → negative accuracy deviation).
        assert all(f.deviation < 0 for f in findings)

    def test_respects_min_group_size(self, sample_data):
        y_true, y_pred, _, demographics = sample_data
        findings = discover_subgroups_ml(
            y_true=y_true,
            y_pred=y_pred,
            demographics=demographics,
            protected_attributes=["race", "sex"],
            min_group_size=40,
        )
        for f in findings:
            assert f.sample_size >= 40

    def test_respects_top_k(self, sample_data):
        y_true, y_pred, _, demographics = sample_data
        findings = discover_subgroups_ml(
            y_true=y_true,
            y_pred=y_pred,
            demographics=demographics,
            protected_attributes=["race", "sex"],
            min_group_size=20,
            top_k=2,
        )
        assert len(findings) <= 2

    def test_low_severity_on_fair_data(self, fair_dataset):
        findings = discover_subgroups_ml(
            y_true=fair_dataset["y_true"],
            y_pred=fair_dataset["y_pred"],
            demographics=fair_dataset["demographics"],
            protected_attributes=["group"],
        )
        # Findings on truly fair data should not be critical
        for f in findings:
            assert f.severity in {"low", "medium", "high"}
            assert f.severity != "critical"

    def test_with_optional_features(self, sample_data):
        y_true, y_pred, _, demographics = sample_data
        rng = np.random.default_rng(42)
        extra = pd.DataFrame({
            "income": rng.normal(50000, 10000, len(y_true)),
            "age": rng.integers(18, 80, len(y_true)),
        })
        findings = discover_subgroups_ml(
            y_true=y_true,
            y_pred=y_pred,
            demographics=demographics,
            protected_attributes=["race", "sex"],
            features=extra,
            min_group_size=20,
        )
        assert isinstance(findings, list)
        for f in findings:
            assert isinstance(f, SubgroupFinding)


# ---------------------------------------------------------------------------
# detect_proxies_ml
# ---------------------------------------------------------------------------


class TestMLProxyDetection:
    def test_returns_proxy_variable_type(self):
        X, demographics = _make_proxy_data(n=200)
        proxies = detect_proxies_ml(
            X=X,
            demographics=demographics,
            protected_attributes=["race"],
            threshold=0.1,
        )
        assert isinstance(proxies, list)
        for p in proxies:
            assert isinstance(p, ProxyVariable)

    def test_detects_strong_proxy(self):
        X, demographics = _make_proxy_data(n=400)
        proxies = detect_proxies_ml(
            X=X,
            demographics=demographics,
            protected_attributes=["race"],
            threshold=0.1,
        )
        # zip_code is a near-perfect proxy for race
        zip_proxies = [p for p in proxies if p.feature == "zip_code"]
        assert len(zip_proxies) >= 1
        assert zip_proxies[0].severity in {"medium", "high"}
        assert zip_proxies[0].correlation >= 0.5

    def test_no_proxies_with_high_threshold(self):
        X, demographics = _make_proxy_data(n=200)
        proxies = detect_proxies_ml(
            X=X,
            demographics=demographics,
            protected_attributes=["race"],
            threshold=0.99,
        )
        # With a near-impossible threshold, expect very few/no proxies
        assert len(proxies) <= 1

    def test_sorted_by_score_desc(self):
        X, demographics = _make_proxy_data(n=300)
        proxies = detect_proxies_ml(
            X=X,
            demographics=demographics,
            protected_attributes=["race"],
            threshold=0.0,
        )
        # Result should be non-increasing by correlation
        scores = [p.correlation for p in proxies]
        assert scores == sorted(scores, reverse=True)

    def test_handles_categorical_features(self):
        rng = np.random.default_rng(42)
        n = 200
        race = rng.choice(["A", "B"], size=n)
        # categorical feature partly correlated with race
        region = np.where(
            race == "A",
            rng.choice(["North", "East"], size=n),
            rng.choice(["South", "West"], size=n),
        )
        age = rng.integers(20, 80, n)
        # Use category dtype to ensure _encode_for_ml's hasattr(series, 'cat')
        # branch fires regardless of the underlying string-storage kind.
        X = pd.DataFrame({
            "region": pd.Series(region).astype("category"),
            "age": age,
        })
        demographics = pd.DataFrame({"race": race})

        proxies = detect_proxies_ml(
            X=X,
            demographics=demographics,
            protected_attributes=["race"],
            threshold=0.1,
        )
        assert isinstance(proxies, list)
        for p in proxies:
            assert isinstance(p, ProxyVariable)


# ---------------------------------------------------------------------------
# cluster_bias_patterns
# ---------------------------------------------------------------------------


class TestBiasPatternClustering:
    def test_returns_bias_pattern_type(self):
        history, audit_ids = _make_metric_history()
        patterns = cluster_bias_patterns(
            metric_history=history,
            audit_ids=audit_ids,
            min_audits=5,
            n_clusters=2,
        )
        assert isinstance(patterns, list)
        for p in patterns:
            assert isinstance(p, BiasPattern)

    def test_finds_distinct_clusters(self):
        history, audit_ids = _make_metric_history(
            n_in_cluster_a=10, n_in_cluster_b=10
        )
        patterns = cluster_bias_patterns(
            metric_history=history,
            audit_ids=audit_ids,
            min_audits=5,
            n_clusters=2,
        )
        assert len(patterns) == 2
        total = sum(p.n_audits for p in patterns)
        assert total == 20

    def test_insufficient_data_returns_empty(self):
        history = [{"metric_x": 0.1}, {"metric_x": 0.2}]
        audit_ids = ["a", "b"]
        patterns = cluster_bias_patterns(
            metric_history=history,
            audit_ids=audit_ids,
            min_audits=5,
        )
        assert patterns == []

    def test_kmeans_with_n_clusters(self):
        rng = np.random.default_rng(7)
        history: list[dict[str, float]] = []
        audit_ids: list[str] = []
        # Three clear clusters along metric_x
        for cluster_idx, mean in enumerate([0.05, 0.15, 0.30]):
            for j in range(6):
                history.append({
                    "metric_x": float(mean + rng.normal(0, 0.005)),
                    "metric_y": float(0.10 + rng.normal(0, 0.005)),
                })
                audit_ids.append(f"c{cluster_idx}_a{j}")

        patterns = cluster_bias_patterns(
            metric_history=history,
            audit_ids=audit_ids,
            min_audits=5,
            n_clusters=3,
        )
        assert len(patterns) == 3


# ---------------------------------------------------------------------------
# Backward-compat aliases
# ---------------------------------------------------------------------------


class TestBackwardCompatAliases:
    """Renamed functions must keep the old public names as aliases."""

    def test_backward_compat_aliases_exist(self):
        # Import both the new and legacy names from the submodule and
        # through the ``parityscope.ai`` package surface.
        from parityscope import ai as ai_pkg
        from parityscope.ai import detection, recommendations

        # detection.py: discover_subgroups_ml → discover_subgroups_tree
        assert detection.discover_subgroups_ml is detection.discover_subgroups_tree
        assert ai_pkg.discover_subgroups_ml is ai_pkg.discover_subgroups_tree

        # detection.py: detect_proxies_ml → detect_proxies_nonlinear
        assert detection.detect_proxies_ml is detection.detect_proxies_nonlinear
        assert ai_pkg.detect_proxies_ml is ai_pkg.detect_proxies_nonlinear

        # recommendations.py: rank_strategies_ml → rank_strategies_scored
        assert recommendations.rank_strategies_ml is recommendations.rank_strategies_scored
        assert ai_pkg.rank_strategies_ml is ai_pkg.rank_strategies_scored

        # And all six names are in the public __all__ so * imports keep working.
        for name in (
            "discover_subgroups_ml",
            "discover_subgroups_tree",
            "detect_proxies_ml",
            "detect_proxies_nonlinear",
            "rank_strategies_ml",
            "rank_strategies_scored",
        ):
            assert name in ai_pkg.__all__, f"{name} missing from parityscope.ai.__all__"
