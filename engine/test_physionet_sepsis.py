"""ParityScope — PhysioNet 2019 Sepsis Challenge Integration.

Tests the fairness engine against a real sepsis prediction model trained on
the PhysioNet/Computing in Cardiology Challenge 2019 dataset.

The dataset contains ~40,000 ICU patients with hourly vitals, labs, and
demographics (age, sex). Each patient file is a pipe-delimited .psv file.

Setup:
    1. Download the training data (no credentialing required):
        wget https://archive.physionet.org/users/shared/challenge-2019/training_setA.zip
        wget https://archive.physionet.org/users/shared/challenge-2019/training_setB.zip

    2. Unzip into a data/ folder:
        mkdir -p data/physionet2019
        unzip training_setA.zip -d data/physionet2019/
        unzip training_setB.zip -d data/physionet2019/

    3. Install dependencies (in addition to parityscope):
        pip install scikit-learn

    4. Run:
        python test_physionet_sepsis.py

What this script does:
    - Loads and aggregates patient-level data from the .psv files
    - Extracts summary features (mean vitals/labs per patient)
    - Trains a simple XGBoost or logistic regression model
    - Runs the ParityScope fairness audit on the model's predictions
    - Generates a PDF report

Demographics available: Age (years), Gender (0=Female, 1=Male)
    NOTE: This dataset does NOT include race/ethnicity.
"""

import os
import sys
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, roc_auc_score

from parityscope import FairnessAudit
from parityscope.reports.generator import generate_json_report, generate_summary
from parityscope.reports.pdf_report import generate_pdf_report
from parityscope.simulation.interventions import compare_interventions


# ---------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------
DATA_DIR = Path("data/physionet2019")
MAX_PATIENTS = 10000  # Limit for faster processing (set to None for all)
SEED = 42


def find_psv_files(data_dir: Path) -> list[Path]:
    """Find all .psv patient files in the data directory."""
    psv_files = []
    for subdir in ["training_setA", "training_setB", "training"]:
        candidate = data_dir / subdir
        if candidate.exists():
            psv_files.extend(sorted(candidate.glob("*.psv")))
    if not psv_files:
        # Maybe files are directly in data_dir
        psv_files = sorted(data_dir.glob("*.psv"))
    return psv_files


def load_patient(filepath: Path) -> dict | None:
    """Load a single patient .psv file and extract summary features.

    Returns a dict with aggregated features, demographics, and sepsis label,
    or None if the file can't be parsed.
    """
    try:
        df = pd.read_csv(filepath, sep="|")
    except Exception:
        return None

    if df.empty or "SepsisLabel" not in df.columns:
        return None

    # Patient-level sepsis label: 1 if sepsis at any point
    sepsis = int(df["SepsisLabel"].max())

    # Demographics (constant per patient)
    age = df["Age"].iloc[0] if "Age" in df.columns else np.nan
    gender = df["Gender"].iloc[0] if "Gender" in df.columns else np.nan

    # Vital signs — aggregate across the stay
    vital_cols = ["HR", "O2Sat", "Temp", "SBP", "MAP", "DBP", "Resp"]
    lab_cols = [
        "BaseExcess", "HCO3", "FiO2", "pH", "PaCO2", "SaO2", "AST", "BUN",
        "Alkalinephos", "Calcium", "Chloride", "Creatinine", "Glucose",
        "Lactate", "Magnesium", "Phosphate", "Potassium", "Bilirubin_total",
        "Hct", "Hgb", "PTT", "WBC", "Fibrinogen", "Platelets",
    ]

    features = {}
    for col in vital_cols + lab_cols:
        if col in df.columns:
            series = df[col].dropna()
            features[f"{col}_mean"] = series.mean() if len(series) > 0 else np.nan
            features[f"{col}_std"] = series.std() if len(series) > 1 else 0.0
            features[f"{col}_last"] = series.iloc[-1] if len(series) > 0 else np.nan
        else:
            features[f"{col}_mean"] = np.nan
            features[f"{col}_std"] = 0.0
            features[f"{col}_last"] = np.nan

    # ICU length of stay
    features["icu_los_hours"] = len(df)

    return {
        "sepsis": sepsis,
        "age": age,
        "gender": gender,
        **features,
    }


def load_dataset(data_dir: Path, max_patients: int | None = None) -> pd.DataFrame:
    """Load all patient files into a single DataFrame."""
    psv_files = find_psv_files(data_dir)
    if not psv_files:
        print(f"ERROR: No .psv files found in {data_dir}")
        print()
        print("Please download the data first:")
        print("  wget https://archive.physionet.org/users/shared/challenge-2019/training_setA.zip")
        print("  wget https://archive.physionet.org/users/shared/challenge-2019/training_setB.zip")
        print()
        print("Then unzip:")
        print(f"  mkdir -p {data_dir}")
        print(f"  unzip training_setA.zip -d {data_dir}/")
        print(f"  unzip training_setB.zip -d {data_dir}/")
        sys.exit(1)

    if max_patients:
        psv_files = psv_files[:max_patients]

    print(f"  Loading {len(psv_files)} patient files...")
    records = []
    for i, f in enumerate(psv_files):
        if (i + 1) % 2000 == 0:
            print(f"    Processed {i + 1}/{len(psv_files)} files...")
        record = load_patient(f)
        if record is not None:
            records.append(record)

    df = pd.DataFrame(records)
    print(f"  Loaded {len(df)} patients successfully.")
    return df


def build_demographics(df: pd.DataFrame) -> pd.DataFrame:
    """Build demographics DataFrame with readable labels."""
    demographics = pd.DataFrame()

    # Gender: 0=Female, 1=Male
    demographics["sex"] = df["gender"].map({0: "Female", 1: "Male", 0.0: "Female", 1.0: "Male"})

    # Age groups
    demographics["age_group"] = pd.cut(
        df["age"],
        bins=[0, 39, 59, 79, 200],
        labels=["18-39", "40-59", "60-79", "80+"],
    ).astype(str)

    return demographics


def main():
    print("=" * 70)
    print("  PARITYSCOPE — PhysioNet 2019 Sepsis Challenge Audit")
    print("=" * 70)
    print()

    # ---------------------------------------------------------------
    # Step 1: Load data
    # ---------------------------------------------------------------
    print("Step 1: Loading PhysioNet 2019 data...")
    df = load_dataset(DATA_DIR, max_patients=MAX_PATIENTS)
    print()

    # ---------------------------------------------------------------
    # Step 2: Prepare features and labels
    # ---------------------------------------------------------------
    print("Step 2: Preparing features and training model...")

    y = df["sepsis"].values
    demographics = build_demographics(df)

    # Feature columns (everything except sepsis, age, gender)
    feature_cols = [c for c in df.columns if c not in ("sepsis", "age", "gender")]
    X = df[feature_cols].copy()

    # Fill missing values with column medians
    X = X.fillna(X.median())
    # Fill any remaining NaNs (columns that are entirely NaN)
    X = X.fillna(0)

    # Train/test split
    X_train, X_test, y_train, y_test, demo_train, demo_test = train_test_split(
        X, y, demographics, test_size=0.3, random_state=SEED, stratify=y,
    )

    # ---------------------------------------------------------------
    # Step 3: Train a simple model
    # ---------------------------------------------------------------
    print("  Training logistic regression model...")
    model = LogisticRegression(max_iter=1000, random_state=SEED, class_weight="balanced")
    model.fit(X_train, y_train)

    # Predictions on test set
    y_pred = model.predict(X_test)
    y_score = model.predict_proba(X_test)[:, 1]

    # Basic performance
    acc = accuracy_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_score)
    n_pos = y_test.sum()
    print(f"  Test set:  {len(y_test)} patients")
    print(f"  Sepsis+:   {n_pos} ({n_pos / len(y_test) * 100:.1f}%)")
    print(f"  Accuracy:  {acc:.1%}")
    print(f"  AUC:       {auc:.3f}")
    print()

    # Per-group stats
    print("  Per-group breakdown:")
    print(f"  {'Group':<12} {'N':>6} {'Sepsis%':>8} {'Pred+%':>8} {'Accuracy':>9}")
    print("  " + "-" * 46)
    for col in ["sex", "age_group"]:
        for val in sorted(demo_test[col].unique()):
            mask = (demo_test[col] == val).values
            n_g = mask.sum()
            prev = y_test[mask].mean()
            pred_pos = y_pred[mask].mean()
            acc_g = accuracy_score(y_test[mask], y_pred[mask])
            print(f"  {val:<12} {n_g:>6} {prev:>7.1%} {pred_pos:>7.1%} {acc_g:>8.1%}")
    print()

    # ---------------------------------------------------------------
    # Step 4: Run fairness audit — Sex
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  AUDIT 1: EU AI Act Compliance — Sex")
    print("=" * 70)
    print()

    audit_sex = FairnessAudit(
        model_name="physionet2019_sepsis_logreg",
        protected_attributes=["sex"],
        jurisdiction="eu-ai-act",
        clinical_domain="diagnosis",
    )
    result_sex = audit_sex.run(
        y_true=y_test,
        y_pred=y_pred,
        demographics=demo_test.reset_index(drop=True),
        y_score=y_score,
    )
    print(generate_summary(result_sex))
    print()

    # ---------------------------------------------------------------
    # Step 5: Run fairness audit — Age
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  AUDIT 2: EU AI Act Compliance — Age Group")
    print("=" * 70)
    print()

    audit_age = FairnessAudit(
        model_name="physionet2019_sepsis_logreg",
        protected_attributes=["age_group"],
        jurisdiction="eu-ai-act",
        clinical_domain="diagnosis",
    )
    result_age = audit_age.run(
        y_true=y_test,
        y_pred=y_pred,
        demographics=demo_test.reset_index(drop=True),
        y_score=y_score,
    )
    print(generate_summary(result_age))
    print()

    # ---------------------------------------------------------------
    # Step 6: Combined audit (sex + age)
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  AUDIT 3: Comprehensive Multi-Attribute Audit (Sex + Age)")
    print("=" * 70)
    print()

    audit_full = FairnessAudit(
        model_name="physionet2019_sepsis_logreg",
        protected_attributes=["sex", "age_group"],
        jurisdiction="eu-ai-act",
        clinical_domain="diagnosis",
    )
    result_full = audit_full.run(
        y_true=y_test,
        y_pred=y_pred,
        demographics=demo_test.reset_index(drop=True),
        y_score=y_score,
    )
    print(generate_summary(result_full))
    print()

    # ---------------------------------------------------------------
    # Step 7: Simulate interventions
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  SIMULATION: What-If Interventions (Sex)")
    print("=" * 70)
    print()

    interventions = compare_interventions(
        y_true=y_test,
        y_pred=y_pred,
        y_score=y_score,
        groups=np.array(demo_test.reset_index(drop=True)["sex"]),
        target_metric="equal_opportunity",
    )

    for intervention in interventions:
        name = intervention["intervention"]
        print(f"  Intervention: {name}")
        if name == "threshold_adjustment":
            print(f"    Baseline disparity:  {intervention['baseline']['disparity']:.4f}")
            print(f"    Optimized disparity: {intervention['optimized']['disparity']:.4f}")
            print(f"    Disparity reduction: {intervention['improvement']['disparity_reduction']:.4f}")
            print(f"    Accuracy change:     {intervention['improvement']['accuracy_change']:+.4f}")
            print(f"    Per-group thresholds:")
            for group, thresh in intervention["optimized"]["group_thresholds"].items():
                print(f"      {group}: {thresh:.3f}")
        elif name == "balanced_resampling":
            est = intervention["estimated_disparity"]
            print(f"    Baseline disparity:  {intervention['baseline_disparity']:.4f}")
            print(f"    Estimated after resampling: {est['mean']:.4f} +/- {est['std']:.4f}")
            print(f"    95% CI: [{est['p5']:.4f}, {est['p95']:.4f}]")
        print()

    # ---------------------------------------------------------------
    # Step 8: Export reports
    # ---------------------------------------------------------------
    json_path = "physionet_audit_report.json"
    with open(json_path, "w") as f:
        f.write(generate_json_report(result_full))
    print(f"JSON report saved to: {json_path}")

    pdf_path = "physionet_audit_report.pdf"
    generate_pdf_report(result_full, output_path=pdf_path)
    print(f"PDF report saved to:  {pdf_path}")
    print()
    print("Done! This audit was run on REAL clinical data from the")
    print("PhysioNet/Computing in Cardiology Challenge 2019.")


if __name__ == "__main__":
    main()
