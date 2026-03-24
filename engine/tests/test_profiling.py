"""Tests for parityscope.data.profiling — dataset profiling."""

import numpy as np
import pandas as pd
import pytest

from parityscope.data.profiling import DatasetProfile, profile_dataset


class TestProfileDataset:
    """Tests for profile_dataset."""

    def test_basic_profile(self):
        df = pd.DataFrame({
            "label": [0, 1, 0, 1, 0, 1] * 20,
            "prediction": [0, 1, 1, 1, 0, 0] * 20,
            "race": (["White"] * 60 + ["Black"] * 40 + ["Hispanic"] * 20),
        })
        profile = profile_dataset(df, label_column="label", demographic_columns=["race"])
        assert isinstance(profile, DatasetProfile)
        assert profile.total_rows == 120
        assert profile.total_columns == 3
        assert len(profile.demographic_summaries) == 1
        assert profile.demographic_summaries[0].attribute == "race"

    def test_auto_detection_of_demographics(self):
        df = pd.DataFrame({
            "label": [0, 1] * 50,
            "prediction": [0, 1] * 50,
            "gender": (["Male"] * 50 + ["Female"] * 50),
        })
        profile = profile_dataset(df)
        assert "gender" in profile.detected_demographics

    def test_small_group_warning(self):
        df = pd.DataFrame({
            "label": [0, 1] * 50,
            "prediction": [1, 0] * 50,
            "race": ["White"] * 90 + ["Rare"] * 10,
        })
        profile = profile_dataset(df, label_column="label", demographic_columns=["race"])
        small_warnings = [w for w in profile.warnings if "Rare" in w and "only" in w]
        assert len(small_warnings) > 0

    def test_class_imbalance_warning(self):
        df = pd.DataFrame({
            "label": [0] * 90 + [1] * 10,
            "prediction": [0] * 95 + [1] * 5,
            "sex": ["Male"] * 50 + ["Female"] * 50,
        })
        profile = profile_dataset(df, label_column="label", demographic_columns=["sex"])
        imbalance_warnings = [
            w for w in profile.data_quality.warnings if "imbalance" in w.lower()
        ]
        assert len(imbalance_warnings) > 0

    def test_missing_values_warning(self):
        rng = np.random.default_rng(42)
        data = {
            "label": [0, 1] * 50,
            "prediction": [1, 0] * 50,
            "sex": ["M", "F"] * 50,
        }
        df = pd.DataFrame(data)
        # Inject >5% missing in label
        df.loc[rng.choice(100, 10, replace=False), "label"] = np.nan
        profile = profile_dataset(df, label_column="label", demographic_columns=["sex"])
        missing_warnings = [
            w for w in profile.data_quality.warnings if "missing" in w.lower()
        ]
        assert len(missing_warnings) > 0

    def test_label_distribution(self):
        df = pd.DataFrame({
            "label": [0] * 70 + [1] * 30,
            "race": ["A"] * 50 + ["B"] * 50,
        })
        profile = profile_dataset(df, label_column="label", demographic_columns=["race"])
        assert "0" in profile.label_distribution or "1" in profile.label_distribution
        assert len(profile.label_distribution) == 2

    def test_imbalance_ratio_warning(self):
        df = pd.DataFrame({
            "label": [0, 1] * 55,
            "race": ["White"] * 100 + ["Rare"] * 10,
        })
        profile = profile_dataset(df, label_column="label", demographic_columns=["race"])
        ratio_warnings = [w for w in profile.warnings if "imbalance ratio" in w.lower()]
        assert len(ratio_warnings) > 0

    def test_recommendations_for_small_groups(self):
        df = pd.DataFrame({
            "label": [0, 1] * 30,
            "race": ["Majority"] * 50 + ["Tiny"] * 10,
        })
        profile = profile_dataset(df, label_column="label", demographic_columns=["race"])
        assert len(profile.recommendations) > 0
