"""ParityScope — NHANES Hypertension Prediction Fairness Audit.

Tests the fairness engine against a hypertension risk prediction model
trained on the CDC's National Health and Nutrition Examination Survey (NHANES).

NHANES is fully open data with rich demographics: race/ethnicity, sex, age,
income, and education — making it ideal for testing fairness across multiple
protected attributes including race.

Setup:
    1. Install dependencies:
        pip install scikit-learn

    2. Run (data downloads automatically from CDC):
        python test_nhanes.py

    No manual download needed — the script fetches the data directly from the
    CDC website (https://wwwn.cdc.gov/nchs/nhanes/).

Demographics available: Race/Ethnicity, Sex, Age Group
"""

import io
import sys
import tempfile
import urllib.request
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, roc_auc_score
from sklearn.preprocessing import StandardScaler

from parityscope import FairnessAudit
from parityscope.reports.generator import generate_json_report, generate_summary
from parityscope.reports.pdf_report import generate_pdf_report
from parityscope.simulation.interventions import compare_interventions


# ---------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------
NHANES_YEAR = "2017-2018"
SEED = 42

# NHANES XPT file URLs for 2017-2018
NHANES_URLS = {
    "demographics": "https://wwwn.cdc.gov/Nchs/Nhanes/2017-2018/DEMO_J.XPT",
    "blood_pressure": "https://wwwn.cdc.gov/Nchs/Nhanes/2017-2018/BPX_J.XPT",
    "body_measures": "https://wwwn.cdc.gov/Nchs/Nhanes/2017-2018/BMX_J.XPT",
    "diabetes": "https://wwwn.cdc.gov/Nchs/Nhanes/2017-2018/DIQ_J.XPT",
    "cholesterol_total": "https://wwwn.cdc.gov/Nchs/Nhanes/2017-2018/TCHOL_J.XPT",
    "cholesterol_hdl": "https://wwwn.cdc.gov/Nchs/Nhanes/2017-2018/HDL_J.XPT",
    "smoking": "https://wwwn.cdc.gov/Nchs/Nhanes/2017-2018/SMQ_J.XPT",
    "kidney": "https://wwwn.cdc.gov/Nchs/Nhanes/2017-2018/KIQ_U_J.XPT",
}


def download_nhanes_data() -> pd.DataFrame:
    """Download and merge NHANES 2017-2018 datasets from the CDC.

    Returns a merged DataFrame with demographics, blood pressure, BMI,
    cholesterol, smoking status, and other clinical variables.
    """
    print("  Downloading NHANES 2017-2018 data from CDC...")

    dfs = {}
    for name, url in NHANES_URLS.items():
        print(f"    Fetching {name}...")
        try:
            # Download to a temp file first, then read with pandas
            with tempfile.NamedTemporaryFile(suffix=".xpt", delete=False) as tmp:
                urllib.request.urlretrieve(url, tmp.name)
                df = pd.read_sas(tmp.name, format="xport")
            dfs[name] = df
            print(f"      -> {len(df)} records, {len(df.columns)} columns")
        except Exception as e:
            print(f"      WARNING: Could not load {name}: {e}")
            continue

    if "demographics" not in dfs:
        print("ERROR: Could not download demographics data.")
        sys.exit(1)

    # Start with demographics and merge others on SEQN
    merged = dfs["demographics"]
    for name, df in dfs.items():
        if name == "demographics":
            continue
        merged = merged.merge(df, on="SEQN", how="left")

    print(f"  Merged dataset: {len(merged)} records, {len(merged.columns)} columns")
    return merged


def prepare_dataset(raw: pd.DataFrame) -> tuple[pd.DataFrame, np.ndarray, pd.DataFrame]:
    """Prepare features, labels, and demographics from raw NHANES data.

    Target: Hypertension (systolic BP >= 140 or diastolic BP >= 90,
    or currently taking blood pressure medication)

    Returns:
        features: DataFrame of predictor variables
        y: Binary hypertension labels
        demographics: DataFrame with race, sex, age_group columns
    """
    df = raw.copy()

    # Filter to adults 18+ with blood pressure measurements
    df = df[df["RIDAGEYR"] >= 18].copy()

    # Need at least one BP reading
    has_bp = df["BPXSY1"].notna() | df.get("BPXSY2", pd.Series(dtype=float)).notna()
    df = df[has_bp].copy()

    # ---------------------------------------------------------------
    # Target: Hypertension
    # ---------------------------------------------------------------
    # Average systolic and diastolic from available readings
    sys_cols = [c for c in ["BPXSY1", "BPXSY2", "BPXSY3"] if c in df.columns]
    dia_cols = [c for c in ["BPXDI1", "BPXDI2", "BPXDI3"] if c in df.columns]

    df["avg_systolic"] = df[sys_cols].mean(axis=1)
    df["avg_diastolic"] = df[dia_cols].mean(axis=1)

    # Hypertension: SBP >= 140 or DBP >= 90
    y = ((df["avg_systolic"] >= 140) | (df["avg_diastolic"] >= 90)).astype(int).values

    # ---------------------------------------------------------------
    # Demographics
    # ---------------------------------------------------------------
    # Race/Ethnicity (RIDRETH3 has separate Asian category)
    race_col = "RIDRETH3" if "RIDRETH3" in df.columns else "RIDRETH1"
    race_map = {
        1: "Mexican American",
        2: "Other Hispanic",
        3: "Non-Hispanic White",
        4: "Non-Hispanic Black",
        6: "Non-Hispanic Asian",
        7: "Other/Multi-Racial",
    }
    if race_col == "RIDRETH1":
        race_map = {
            1: "Mexican American",
            2: "Other Hispanic",
            3: "Non-Hispanic White",
            4: "Non-Hispanic Black",
            5: "Other/Multi-Racial",
        }

    demographics = pd.DataFrame()
    demographics["race"] = df[race_col].map(race_map).fillna("Other/Multi-Racial")

    # Sex (RIAGENDR: 1=Male, 2=Female)
    demographics["sex"] = df["RIAGENDR"].map({1: "Male", 2: "Female", 1.0: "Male", 2.0: "Female"})

    # Age groups
    demographics["age_group"] = pd.cut(
        df["RIDAGEYR"],
        bins=[0, 39, 59, 79, 200],
        labels=["18-39", "40-59", "60-79", "80+"],
    ).astype(str)

    # ---------------------------------------------------------------
    # Features
    # ---------------------------------------------------------------
    features = pd.DataFrame()

    # Age (continuous)
    features["age"] = df["RIDAGEYR"].values

    # BMI
    if "BMXBMI" in df.columns:
        features["bmi"] = df["BMXBMI"].values

    # Waist circumference
    if "BMXWAIST" in df.columns:
        features["waist_circumference"] = df["BMXWAIST"].values

    # Total cholesterol
    if "LBXTC" in df.columns:
        features["total_cholesterol"] = df["LBXTC"].values

    # HDL cholesterol
    if "LBDHDD" in df.columns:
        features["hdl_cholesterol"] = df["LBDHDD"].values

    # Smoking status (SMQ020: smoked at least 100 cigarettes in life)
    if "SMQ020" in df.columns:
        features["ever_smoker"] = (df["SMQ020"] == 1).astype(float).values

    # Diabetes (DIQ010: doctor told you have diabetes)
    if "DIQ010" in df.columns:
        features["has_diabetes"] = (df["DIQ010"] == 1).astype(float).values

    # Kidney condition (KIQ022: ever told you have weak/failing kidneys)
    if "KIQ022" in df.columns:
        features["has_kidney_disease"] = (df["KIQ022"] == 1).astype(float).values

    # Gender as numeric feature for model
    features["is_male"] = (df["RIAGENDR"] == 1).astype(float).values

    # Drop rows with NaN target or missing demographics
    valid = (~np.isnan(y)) & demographics["sex"].notna() & demographics["race"].notna()
    features = features[valid].reset_index(drop=True)
    y = y[valid]
    demographics = demographics[valid].reset_index(drop=True)

    return features, y, demographics


def main():
    print("=" * 70)
    print("  PARITYSCOPE — NHANES Hypertension Prediction Fairness Audit")
    print("=" * 70)
    print()

    # ---------------------------------------------------------------
    # Step 1: Download and load data
    # ---------------------------------------------------------------
    print("Step 1: Loading NHANES 2017-2018 data...")
    raw = download_nhanes_data()
    print()

    # ---------------------------------------------------------------
    # Step 2: Prepare dataset
    # ---------------------------------------------------------------
    print("Step 2: Preparing features and labels...")
    features, y, demographics = prepare_dataset(raw)

    n_pos = y.sum()
    print(f"  Total adults with BP data: {len(y)}")
    print(f"  Hypertensive:  {n_pos} ({n_pos / len(y) * 100:.1f}%)")
    print()

    # Per-group prevalence
    print("  Hypertension prevalence by group:")
    print(f"  {'Group':<24} {'N':>6} {'Prevalence':>11}")
    print("  " + "-" * 44)
    for col in ["race", "sex", "age_group"]:
        for val in sorted(demographics[col].unique()):
            mask = (demographics[col] == val).values
            n_g = mask.sum()
            prev = y[mask].mean()
            print(f"  {val:<24} {n_g:>6} {prev:>10.1%}")
        print()

    # ---------------------------------------------------------------
    # Step 3: Train model
    # ---------------------------------------------------------------
    print("Step 3: Training hypertension prediction model...")

    # Fill missing values
    X = features.fillna(features.median())
    X = X.fillna(0)

    X_train, X_test, y_train, y_test, demo_train, demo_test = train_test_split(
        X, y, demographics, test_size=0.3, random_state=SEED, stratify=y,
    )

    # Scale features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = LogisticRegression(max_iter=1000, random_state=SEED, class_weight="balanced")
    model.fit(X_train_scaled, y_train)

    y_pred = model.predict(X_test_scaled)
    y_score = model.predict_proba(X_test_scaled)[:, 1]

    acc = accuracy_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_score)
    n_pos_test = y_test.sum()
    print(f"  Test set:      {len(y_test)} patients")
    print(f"  Hypertensive:  {n_pos_test} ({n_pos_test / len(y_test) * 100:.1f}%)")
    print(f"  Accuracy:      {acc:.1%}")
    print(f"  AUC:           {auc:.3f}")
    print()

    # Per-group performance on test set
    demo_test = demo_test.reset_index(drop=True)
    print("  Per-group test performance:")
    print(f"  {'Group':<24} {'N':>6} {'Prev':>7} {'Pred+':>7} {'Acc':>7}")
    print("  " + "-" * 54)
    for col in ["race", "sex", "age_group"]:
        for val in sorted(demo_test[col].unique()):
            mask = (demo_test[col] == val).values
            n_g = mask.sum()
            if n_g == 0:
                continue
            prev = y_test[mask].mean()
            pred_pos = y_pred[mask].mean()
            acc_g = accuracy_score(y_test[mask], y_pred[mask])
            print(f"  {val:<24} {n_g:>6} {prev:>6.1%} {pred_pos:>6.1%} {acc_g:>6.1%}")
        print()

    # ---------------------------------------------------------------
    # Step 4: Fairness Audit — Race
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  AUDIT 1: EU AI Act Compliance — Race/Ethnicity")
    print("=" * 70)
    print()

    audit_race = FairnessAudit(
        model_name="nhanes_hypertension_logreg",
        protected_attributes=["race"],
        jurisdiction="eu-ai-act",
        clinical_domain="diagnosis",
    )
    result_race = audit_race.run(
        y_true=y_test,
        y_pred=y_pred,
        demographics=demo_test,
        y_score=y_score,
    )
    print(generate_summary(result_race))
    print()

    # ---------------------------------------------------------------
    # Step 5: Fairness Audit — Sex
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  AUDIT 2: Section 1557 Compliance — Sex")
    print("=" * 70)
    print()

    audit_sex = FairnessAudit(
        model_name="nhanes_hypertension_logreg",
        protected_attributes=["sex"],
        jurisdiction="section-1557",
        clinical_domain="diagnosis",
    )
    result_sex = audit_sex.run(
        y_true=y_test,
        y_pred=y_pred,
        demographics=demo_test,
        y_score=y_score,
    )
    print(generate_summary(result_sex))
    print()

    # ---------------------------------------------------------------
    # Step 6: Comprehensive audit (race + sex + age)
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  AUDIT 3: Comprehensive Multi-Attribute Audit")
    print("=" * 70)
    print()

    audit_full = FairnessAudit(
        model_name="nhanes_hypertension_logreg",
        protected_attributes=["race", "sex", "age_group"],
        jurisdiction="eu-ai-act",
        clinical_domain="diagnosis",
    )
    result_full = audit_full.run(
        y_true=y_test,
        y_pred=y_pred,
        demographics=demo_test,
        y_score=y_score,
    )
    print(generate_summary(result_full))
    print()

    # ---------------------------------------------------------------
    # Step 7: Simulate interventions (race)
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  SIMULATION: What-If Interventions (Race)")
    print("=" * 70)
    print()

    interventions = compare_interventions(
        y_true=y_test,
        y_pred=y_pred,
        y_score=y_score,
        groups=np.array(demo_test["race"]),
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
    # Save the race audit (most interesting for NHANES)
    json_path = "nhanes_audit_report.json"
    with open(json_path, "w") as f:
        f.write(generate_json_report(result_race))
    print(f"JSON report saved to: {json_path}")

    pdf_path = "nhanes_audit_report.pdf"
    generate_pdf_report(result_race, output_path=pdf_path)
    print(f"PDF report saved to:  {pdf_path}")

    # Also save the full multi-attribute report
    pdf_full_path = "nhanes_audit_full_report.pdf"
    generate_pdf_report(result_full, output_path=pdf_full_path)
    print(f"Full PDF report:      {pdf_full_path}")
    print()
    print("Done! This audit was run on REAL population health data from the")
    print("CDC's National Health and Nutrition Examination Survey (NHANES 2017-2018).")
    print()
    print("Key insight: Unlike the synthetic demo, any bias found here reflects")
    print("genuine disparities in how the model performs across demographic groups.")


if __name__ == "__main__":
    main()
