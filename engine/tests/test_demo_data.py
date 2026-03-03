"""Tests for demo data generators."""

import numpy as np
import pytest

from parityscope.demo_data import generate_biased_sepsis_model, generate_hypertension_model


class TestSepsisModel:
    def test_correct_size(self):
        y_true, y_pred, y_score, demo = generate_biased_sepsis_model(n=1000)
        assert len(y_true) == 1000
        assert len(y_pred) == 1000
        assert len(y_score) == 1000
        assert len(demo) == 1000

    def test_binary_labels(self):
        y_true, y_pred, _, _ = generate_biased_sepsis_model(n=500)
        assert set(np.unique(y_true)).issubset({0, 1})
        assert set(np.unique(y_pred)).issubset({0, 1})

    def test_score_range(self):
        _, _, y_score, _ = generate_biased_sepsis_model(n=500)
        assert np.all(y_score >= 0) and np.all(y_score <= 1)

    def test_demographics_columns(self):
        _, _, _, demo = generate_biased_sepsis_model(n=500)
        assert "race" in demo.columns
        assert "sex" in demo.columns
        assert "age_group" in demo.columns

    def test_reproducible(self):
        y1, _, _, _ = generate_biased_sepsis_model(n=100, seed=42)
        y2, _, _, _ = generate_biased_sepsis_model(n=100, seed=42)
        np.testing.assert_array_equal(y1, y2)


class TestHypertensionModel:
    def test_correct_size(self):
        y_true, y_pred, y_score, demo, features = generate_hypertension_model(n=1000)
        assert len(y_true) == 1000
        assert len(features) == 1000

    def test_has_features(self):
        _, _, _, _, features = generate_hypertension_model(n=500)
        assert "age_numeric" in features.columns
        assert "bmi" in features.columns
        assert "systolic_bp" in features.columns

    def test_demographics_columns(self):
        _, _, _, demo, _ = generate_hypertension_model(n=500)
        assert "race" in demo.columns
        assert "sex" in demo.columns
        assert "age_group" in demo.columns
        assert "insurance" in demo.columns
