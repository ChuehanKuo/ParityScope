"""Tests for parityscope.data.loaders — data loading and column auto-detection."""

import numpy as np
import pandas as pd
import pytest

from parityscope.data.loaders import ColumnMap, auto_detect_columns, load_dataset


class TestColumnMap:
    """Tests for the ColumnMap dataclass."""

    def test_defaults(self):
        cm = ColumnMap()
        assert cm.predictions == ""
        assert cm.labels == ""
        assert cm.scores is None
        assert cm.demographics == []
        assert cm.patient_id is None

    def test_custom_values(self):
        cm = ColumnMap(
            predictions="pred",
            labels="label",
            scores="score",
            demographics=["race", "sex"],
            patient_id="id",
        )
        assert cm.predictions == "pred"
        assert cm.labels == "label"
        assert cm.scores == "score"
        assert cm.demographics == ["race", "sex"]
        assert cm.patient_id == "id"


class TestAutoDetectColumns:
    """Tests for auto_detect_columns."""

    def test_detects_named_columns(self):
        df = pd.DataFrame({
            "prediction": [0, 1, 0, 1],
            "label": [0, 1, 1, 1],
            "score": [0.1, 0.9, 0.4, 0.8],
            "race": ["A", "B", "A", "B"],
        })
        cm = auto_detect_columns(df)
        assert cm.predictions == "prediction"
        assert cm.labels == "label"
        assert cm.scores == "score"
        assert "race" in cm.demographics

    def test_detects_alternative_names(self):
        df = pd.DataFrame({
            "y_pred": [0, 1, 0],
            "y_true": [1, 1, 0],
            "probability": [0.3, 0.8, 0.1],
            "gender": ["M", "F", "M"],
        })
        cm = auto_detect_columns(df)
        assert cm.predictions == "y_pred"
        assert cm.labels == "y_true"
        assert cm.scores == "probability"
        assert "gender" in cm.demographics

    def test_type_fallback_for_binary_columns(self):
        """Binary int columns should be detected as label/prediction when names don't match."""
        df = pd.DataFrame({
            "col_a": [0, 1, 0, 1, 0],
            "col_b": [1, 1, 0, 0, 1],
            "ethnicity": ["X", "Y", "X", "Y", "X"],
        })
        cm = auto_detect_columns(df)
        # At least labels or predictions should be detected
        assert cm.labels != "" or cm.predictions != ""

    def test_score_fallback_float_column(self):
        """Float [0,1] columns with >2 unique values should be detected as scores."""
        rng = np.random.default_rng(0)
        df = pd.DataFrame({
            "label": [0, 1] * 20,
            "prediction": [1, 1] * 20,
            "confidence": rng.uniform(0, 1, 40),
            "race": ["A", "B"] * 20,
        })
        cm = auto_detect_columns(df)
        assert cm.scores == "confidence"

    def test_cardinality_demographics(self):
        """Low-cardinality string columns should be auto-detected as demographics."""
        df = pd.DataFrame({
            "prediction": [0, 1, 0, 1, 0],
            "label": [0, 1, 1, 1, 0],
            "group_x": ["alpha", "beta", "alpha", "beta", "alpha"],
        })
        cm = auto_detect_columns(df)
        assert "group_x" in cm.demographics

    def test_empty_dataframe(self):
        df = pd.DataFrame()
        cm = auto_detect_columns(df)
        assert cm.predictions == ""
        assert cm.labels == ""
        assert cm.demographics == []


class TestLoadDataset:
    """Tests for load_dataset."""

    def test_load_csv(self, tmp_path):
        csv_path = tmp_path / "test_data.csv"
        df = pd.DataFrame({
            "prediction": [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            "label": [0, 1, 1, 1, 0, 1, 0, 0, 0, 1],
            "score": [0.1, 0.9, 0.4, 0.8, 0.2, 0.7, 0.15, 0.3, 0.05, 0.85],
            "race": ["A", "B"] * 5,
        })
        df.to_csv(csv_path, index=False)
        y_true, y_pred, y_score, demographics = load_dataset(csv_path)
        assert len(y_true) == 10
        assert len(y_pred) == 10
        assert y_score is not None
        assert len(y_score) == 10
        assert "race" in demographics.columns

    def test_load_with_explicit_column_map(self, tmp_path):
        csv_path = tmp_path / "custom.csv"
        df = pd.DataFrame({
            "my_pred": [0, 1, 0, 1],
            "my_label": [0, 1, 1, 1],
            "my_group": ["X", "Y", "X", "Y"],
        })
        df.to_csv(csv_path, index=False)
        cm = ColumnMap(predictions="my_pred", labels="my_label", demographics=["my_group"])
        y_true, y_pred, y_score, demographics = load_dataset(csv_path, column_map=cm)
        assert len(y_true) == 4
        assert y_score is None
        assert list(demographics.columns) == ["my_group"]

    def test_file_not_found(self):
        with pytest.raises(FileNotFoundError):
            load_dataset("/nonexistent/path/data.csv")

    def test_unsupported_format(self, tmp_path):
        bad_path = tmp_path / "data.xyz"
        bad_path.write_text("hello")
        with pytest.raises(ValueError, match="Unsupported file format"):
            load_dataset(bad_path)

    def test_missing_columns_in_map(self, tmp_path):
        csv_path = tmp_path / "data.csv"
        pd.DataFrame({"a": [1, 2], "b": [0, 1]}).to_csv(csv_path, index=False)
        cm = ColumnMap(predictions="nonexistent", labels="b", demographics=["a"])
        with pytest.raises(ValueError, match="Column mapping errors"):
            load_dataset(csv_path, column_map=cm)

    def test_no_detectable_columns(self, tmp_path):
        csv_path = tmp_path / "nodetect.csv"
        pd.DataFrame({"x": [1.5, 2.5, 3.5], "y": [4.5, 5.5, 6.5]}).to_csv(csv_path, index=False)
        with pytest.raises(ValueError, match="Column mapping errors"):
            load_dataset(csv_path)

    def test_load_tsv(self, tmp_path):
        tsv_path = tmp_path / "data.tsv"
        df = pd.DataFrame({
            "prediction": [0, 1, 0, 1],
            "label": [0, 1, 1, 1],
            "race": ["A", "B", "A", "B"],
        })
        df.to_csv(tsv_path, index=False, sep="\t")
        y_true, y_pred, y_score, demographics = load_dataset(tsv_path)
        assert len(y_true) == 4
