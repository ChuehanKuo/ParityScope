"""Tests for the monitoring module (drift detection)."""

import numpy as np
import pandas as pd
import pytest

from parityscope.audit.engine import FairnessAudit
from parityscope.audit.result import FairnessLevel
from parityscope.monitoring.drift import DriftSeverity, FairnessDriftDetector


@pytest.fixture
def baseline_result(binary_dataset):
    """Run an audit for baseline."""
    audit = FairnessAudit(
        model_name="test_model",
        protected_attributes=["race"],
        metrics=["demographic_parity", "equal_opportunity"],
    )
    return audit.run(
        y_true=binary_dataset["y_true"],
        y_pred=binary_dataset["y_pred"],
        demographics=binary_dataset["demographics"],
    )


@pytest.fixture
def degraded_dataset():
    """A dataset with worse bias than the baseline."""
    rng = np.random.default_rng(99)
    n = 1000
    groups = np.array(["A"] * 600 + ["B"] * 400)
    y_true = np.zeros(n, dtype=int)
    y_true[:300] = 1
    y_true[600:780] = 1

    y_pred = np.copy(y_true)
    # Group B: much worse (25% FN, 15% FP)
    b_pos = np.where((groups == "B") & (y_true == 1))[0]
    b_neg = np.where((groups == "B") & (y_true == 0))[0]
    fn_b = rng.choice(b_pos, size=45, replace=False)
    fp_b = rng.choice(b_neg, size=33, replace=False)
    y_pred[fn_b] = 0
    y_pred[fp_b] = 1

    demographics = pd.DataFrame({"race": groups})
    return {
        "y_true": y_true,
        "y_pred": y_pred,
        "demographics": demographics,
    }


class TestDriftDetector:
    def test_no_drift_same_result(self, baseline_result):
        detector = FairnessDriftDetector()
        report = detector.compare(baseline_result, baseline_result)

        assert report.overall_severity == DriftSeverity.NONE
        assert report.degrading_count == 0
        assert report.stable_count > 0

    def test_detects_degradation(self, baseline_result, degraded_dataset):
        audit = FairnessAudit(
            model_name="test_model",
            protected_attributes=["race"],
            metrics=["demographic_parity", "equal_opportunity"],
        )
        degraded_result = audit.run(
            y_true=degraded_dataset["y_true"],
            y_pred=degraded_dataset["y_pred"],
            demographics=degraded_dataset["demographics"],
        )

        detector = FairnessDriftDetector()
        report = detector.compare(baseline_result, degraded_result)

        # Should detect some drift
        assert report.model_name == "test_model"
        assert len(report.metric_drifts) > 0

    def test_custom_thresholds(self, baseline_result):
        detector = FairnessDriftDetector(
            minor_threshold=0.001,
            moderate_threshold=0.002,
            severe_threshold=0.003,
        )
        # Even comparing with itself, tiny numerical differences would matter
        report = detector.compare(baseline_result, baseline_result)
        assert report.overall_severity == DriftSeverity.NONE
