"""Tests for data validation."""

import numpy as np
import pandas as pd
import pytest

from parityscope.data.validation import ValidationError, validate_audit_inputs


class TestValidation:
    def test_valid_inputs(self, binary_dataset):
        # Should not raise
        validate_audit_inputs(
            y_true=binary_dataset["y_true"],
            y_pred=binary_dataset["y_pred"],
            demographics=binary_dataset["demographics"],
            protected_attributes=["race"],
        )

    def test_empty_inputs_raise(self):
        with pytest.raises(ValidationError, match="must not be empty"):
            validate_audit_inputs(
                y_true=np.array([]),
                y_pred=np.array([]),
                demographics=pd.DataFrame({"race": []}),
                protected_attributes=["race"],
            )

    def test_mismatched_lengths_raise(self):
        with pytest.raises(ValidationError, match="y_pred length"):
            validate_audit_inputs(
                y_true=np.array([0, 1, 0]),
                y_pred=np.array([0, 1]),
                demographics=pd.DataFrame({"race": ["A", "B", "A"]}),
                protected_attributes=["race"],
            )

    def test_non_binary_labels_raise(self):
        with pytest.raises(ValidationError, match="only 0 and 1"):
            validate_audit_inputs(
                y_true=np.array([0, 1, 2]),
                y_pred=np.array([0, 1, 0]),
                demographics=pd.DataFrame({"race": ["A", "B", "A"]}),
                protected_attributes=["race"],
            )

    def test_missing_attribute_raises(self):
        with pytest.raises(ValidationError, match="Missing protected attributes"):
            validate_audit_inputs(
                y_true=np.array([0, 1]),
                y_pred=np.array([0, 1]),
                demographics=pd.DataFrame({"race": ["A", "B"]}),
                protected_attributes=["gender"],  # Not in demographics
            )

    def test_single_group_raises(self):
        with pytest.raises(ValidationError, match="only 1 group"):
            validate_audit_inputs(
                y_true=np.array([0, 1, 0, 1]),
                y_pred=np.array([0, 1, 0, 1]),
                demographics=pd.DataFrame({"race": ["A", "A", "A", "A"]}),
                protected_attributes=["race"],
            )

    def test_small_group_warns(self):
        """Groups with < 30 samples should raise a validation error."""
        y = np.zeros(50, dtype=int)
        y[:25] = 1
        with pytest.raises(ValidationError, match="only 10 samples"):
            validate_audit_inputs(
                y_true=y,
                y_pred=y,
                demographics=pd.DataFrame(
                    {"race": ["A"] * 40 + ["B"] * 10}
                ),
                protected_attributes=["race"],
            )

    def test_score_out_of_range_raises(self):
        with pytest.raises(ValidationError, match="y_score must be in"):
            validate_audit_inputs(
                y_true=np.array([0, 1, 0, 1] * 20),
                y_pred=np.array([0, 1, 0, 1] * 20),
                demographics=pd.DataFrame(
                    {"race": ["A"] * 40 + ["B"] * 40}
                ),
                protected_attributes=["race"],
                y_score=np.array([-0.5] * 40 + [0.5] * 40),
            )
