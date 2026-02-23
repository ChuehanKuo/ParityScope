"""Shared test fixtures for the ParityScope test suite."""

import numpy as np
import pandas as pd
import pytest


@pytest.fixture
def binary_dataset():
    """A synthetic binary classification dataset with known bias.

    Group A (majority): higher TPR, lower FPR
    Group B (minority): lower TPR, higher FPR — simulating bias
    """
    rng = np.random.default_rng(42)
    n = 1000

    # Demographics
    groups = np.array(["A"] * 600 + ["B"] * 400)

    # Ground truth: balanced-ish base rates
    y_true = np.zeros(n, dtype=int)
    y_true[:300] = 1  # 300 positives in group A (50%)
    y_true[600:780] = 1  # 180 positives in group B (45%)

    # Predictions: Group A is better predicted than Group B
    y_pred = np.copy(y_true)

    # Group A: 5% FN, 3% FP
    a_pos = np.where((groups == "A") & (y_true == 1))[0]
    a_neg = np.where((groups == "A") & (y_true == 0))[0]
    fn_a = rng.choice(a_pos, size=15, replace=False)
    fp_a = rng.choice(a_neg, size=9, replace=False)
    y_pred[fn_a] = 0
    y_pred[fp_a] = 1

    # Group B: 15% FN, 10% FP (more errors — biased)
    b_pos = np.where((groups == "B") & (y_true == 1))[0]
    b_neg = np.where((groups == "B") & (y_true == 0))[0]
    fn_b = rng.choice(b_pos, size=27, replace=False)
    fp_b = rng.choice(b_neg, size=22, replace=False)
    y_pred[fn_b] = 0
    y_pred[fp_b] = 1

    # Probability scores
    y_score = np.clip(
        y_true.astype(float) + rng.normal(0, 0.2, n),
        0, 1,
    )
    # Make Group B scores noisier
    y_score[600:] = np.clip(
        y_true[600:].astype(float) + rng.normal(0, 0.35, 400),
        0, 1,
    )

    demographics = pd.DataFrame({"race": groups})

    return {
        "y_true": y_true,
        "y_pred": y_pred,
        "y_score": y_score,
        "groups": groups,
        "demographics": demographics,
    }


@pytest.fixture
def fair_dataset():
    """A synthetic dataset with no bias — both groups perform equally."""
    rng = np.random.default_rng(123)
    n = 800

    groups = np.array(["X"] * 400 + ["Y"] * 400)
    y_true = rng.integers(0, 2, size=n)

    # Both groups: same error rate (~5%)
    y_pred = np.copy(y_true)
    errors = rng.choice(n, size=40, replace=False)
    y_pred[errors] = 1 - y_pred[errors]

    demographics = pd.DataFrame({"group": groups})

    return {
        "y_true": y_true,
        "y_pred": y_pred,
        "groups": groups,
        "demographics": demographics,
    }
