"""Demo data generators for ParityScope.

Provides synthetic clinical AI datasets with realistic bias patterns
for demonstrations, testing, and documentation.
"""

from __future__ import annotations

import numpy as np
import pandas as pd


def generate_biased_sepsis_model(n: int = 5000, seed: int = 42):
    """Generate a sepsis risk prediction model with realistic demographic bias.

    The model is intentionally biased:
    - White patients: best performance (high TPR, low FPR)
    - Black patients: higher false negative rate (missed sepsis cases)
    - Hispanic patients: higher false positive rate (unnecessary interventions)
    - Male/Female: slight disparity in sensitivity

    Returns:
        Tuple of (y_true, y_pred, y_score, demographics)
    """
    rng = np.random.default_rng(seed)

    race = rng.choice(
        ["White", "Black", "Hispanic", "Asian"],
        size=n,
        p=[0.55, 0.20, 0.15, 0.10],
    )
    sex = rng.choice(["Male", "Female"], size=n, p=[0.48, 0.52])
    age_group = rng.choice(
        ["18-39", "40-59", "60-79", "80+"],
        size=n,
        p=[0.15, 0.30, 0.35, 0.20],
    )

    base_rate = 0.12
    y_true = np.zeros(n, dtype=int)
    for i in range(n):
        rate = base_rate
        if age_group[i] == "80+":
            rate += 0.05
        if age_group[i] == "60-79":
            rate += 0.02
        y_true[i] = rng.random() < rate

    y_score = np.zeros(n, dtype=float)
    for i in range(n):
        if y_true[i] == 1:
            base = 0.75
            if race[i] == "White":
                noise = rng.normal(0, 0.12)
            elif race[i] == "Black":
                noise = rng.normal(-0.15, 0.18)
            elif race[i] == "Hispanic":
                noise = rng.normal(-0.05, 0.15)
            else:
                noise = rng.normal(-0.02, 0.13)
        else:
            base = 0.25
            if race[i] == "White":
                noise = rng.normal(0, 0.10)
            elif race[i] == "Black":
                noise = rng.normal(0.02, 0.12)
            elif race[i] == "Hispanic":
                noise = rng.normal(0.08, 0.14)
            else:
                noise = rng.normal(0.01, 0.11)

        if sex[i] == "Female" and y_true[i] == 1:
            noise -= 0.04

        y_score[i] = np.clip(base + noise, 0, 1)

    y_pred = (y_score >= 0.5).astype(int)

    demographics = pd.DataFrame({
        "race": race,
        "sex": sex,
        "age_group": age_group,
    })

    return y_true, y_pred, y_score, demographics


def generate_hypertension_model(n: int = 3000, seed: int = 123):
    """Generate a hypertension screening model with extreme age bias.

    This model replicates the real finding from NHANES data:
    - 0% detection rate for ages 18-39
    - 21-point racial detection gap
    - Overall accuracy 66% masks severe subgroup failures

    Returns:
        Tuple of (y_true, y_pred, y_score, demographics, features)
        where features is a DataFrame of clinical input features.
    """
    rng = np.random.default_rng(seed)

    # Demographics
    race = rng.choice(
        ["White", "Black", "Hispanic", "Asian", "Other"],
        size=n,
        p=[0.60, 0.13, 0.18, 0.06, 0.03],
    )
    sex = rng.choice(["Male", "Female"], size=n, p=[0.49, 0.51])
    age = rng.choice(
        ["18-39", "40-59", "60+"],
        size=n,
        p=[0.30, 0.35, 0.35],
    )
    insurance = rng.choice(
        ["Private", "Medicare", "Medicaid", "Uninsured"],
        size=n,
        p=[0.55, 0.20, 0.15, 0.10],
    )

    # Ground truth: hypertension prevalence varies by age
    y_true = np.zeros(n, dtype=int)
    for i in range(n):
        base = 0.08
        if age[i] == "40-59":
            base = 0.35
        elif age[i] == "60+":
            base = 0.60
        if race[i] == "Black":
            base += 0.08
        if sex[i] == "Male":
            base += 0.03
        y_true[i] = rng.random() < base

    # Model: heavily biased toward age (simulating the real NHANES finding)
    age_numeric = np.array([25 if a == "18-39" else 50 if a == "40-59" else 70 for a in age])
    bmi = rng.normal(28, 5, n).clip(18, 50)
    systolic_bp = age_numeric * 0.8 + rng.normal(70, 15, n)

    # Model prediction: 56.7% weight on age
    score = (
        0.567 * (age_numeric / 100) +
        0.15 * (bmi / 50) +
        0.20 * (systolic_bp / 200) +
        0.083 * rng.random(n)
    )
    # Racial bias in the model
    for i in range(n):
        if race[i] == "Black":
            score[i] -= 0.05
        elif race[i] == "Hispanic":
            score[i] -= 0.03

    y_score = np.clip(score, 0, 1)
    y_pred = (y_score >= 0.5).astype(int)

    demographics = pd.DataFrame({
        "race": race,
        "sex": sex,
        "age_group": age,
        "insurance": insurance,
    })

    features = pd.DataFrame({
        "age_numeric": age_numeric,
        "bmi": bmi,
        "systolic_bp": systolic_bp,
    })

    return y_true, y_pred, y_score, demographics, features
