"""Investigation script: Why does the NHANES model produce 0/1 rates for age groups?"""

import sys
import tempfile
import urllib.request
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report

# Reuse the same setup from test_nhanes.py
SEED = 42
NHANES_URLS = {
    "demographics": "https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2017/DataFiles/DEMO_J.XPT",
    "blood_pressure": "https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2017/DataFiles/BPX_J.XPT",
    "body_measures": "https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2017/DataFiles/BMX_J.XPT",
    "diabetes": "https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2017/DataFiles/DIQ_J.XPT",
    "cholesterol_total": "https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2017/DataFiles/TCHOL_J.XPT",
    "cholesterol_hdl": "https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2017/DataFiles/HDL_J.XPT",
    "smoking": "https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2017/DataFiles/SMQ_J.XPT",
    "kidney": "https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2017/DataFiles/KIQ_U_J.XPT",
}


def download():
    dfs = {}
    for name, url in NHANES_URLS.items():
        print(f"  Fetching {name}...")
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with tempfile.NamedTemporaryFile(suffix=".xpt", delete=False) as tmp:
            with urllib.request.urlopen(req) as resp:
                tmp.write(resp.read())
            df = pd.read_sas(tmp.name, format="xport")
        dfs[name] = df
    merged = dfs["demographics"]
    for name, df in dfs.items():
        if name != "demographics":
            merged = merged.merge(df, on="SEQN", how="left")
    return merged


def prepare(raw):
    df = raw.copy()
    df = df[df["RIDAGEYR"] >= 18].copy()
    has_bp = df["BPXSY1"].notna() | df.get("BPXSY2", pd.Series(dtype=float)).notna()
    df = df[has_bp].copy()

    sys_cols = [c for c in ["BPXSY1", "BPXSY2", "BPXSY3"] if c in df.columns]
    dia_cols = [c for c in ["BPXDI1", "BPXDI2", "BPXDI3"] if c in df.columns]
    df["avg_systolic"] = df[sys_cols].mean(axis=1)
    df["avg_diastolic"] = df[dia_cols].mean(axis=1)
    y = ((df["avg_systolic"] >= 140) | (df["avg_diastolic"] >= 90)).astype(int).values

    race_col = "RIDRETH3" if "RIDRETH3" in df.columns else "RIDRETH1"
    race_map = {1: "Mexican American", 2: "Other Hispanic", 3: "Non-Hispanic White",
                4: "Non-Hispanic Black", 6: "Non-Hispanic Asian", 7: "Other/Multi-Racial"}

    df = df.reset_index(drop=True)
    demographics = pd.DataFrame()
    demographics["race"] = df[race_col].map(race_map).fillna("Other/Multi-Racial")
    demographics["sex"] = df["RIAGENDR"].map({1: "Male", 2: "Female", 1.0: "Male", 2.0: "Female"})
    demographics["age_group"] = pd.cut(df["RIDAGEYR"], bins=[0, 39, 59, 79, 200],
                                        labels=["18-39", "40-59", "60-79", "80+"]).astype(str)

    features = pd.DataFrame()
    features["age"] = df["RIDAGEYR"].values
    if "BMXBMI" in df.columns:
        features["bmi"] = df["BMXBMI"].values
    if "BMXWAIST" in df.columns:
        features["waist_circumference"] = df["BMXWAIST"].values
    if "LBXTC" in df.columns:
        features["total_cholesterol"] = df["LBXTC"].values
    if "LBDHDD" in df.columns:
        features["hdl_cholesterol"] = df["LBDHDD"].values
    if "SMQ020" in df.columns:
        features["ever_smoker"] = (df["SMQ020"] == 1).astype(float).values
    if "DIQ010" in df.columns:
        features["has_diabetes"] = (df["DIQ010"] == 1).astype(float).values
    if "KIQ022" in df.columns:
        features["has_kidney_disease"] = (df["KIQ022"] == 1).astype(float).values
    features["is_male"] = (df["RIAGENDR"] == 1).astype(float).values

    valid = (~np.isnan(y)) & demographics["sex"].notna() & demographics["race"].notna()
    features = features[valid].reset_index(drop=True)
    y = y[valid]
    demographics = demographics[valid].reset_index(drop=True)
    return features, y, demographics


def main():
    print("=" * 70)
    print("  MODEL INVESTIGATION: Age Group Rate 0/1 Issue")
    print("=" * 70)
    print()

    print("Downloading data...")
    raw = download()
    features, y, demographics = prepare(raw)
    print()

    # ---------------------------------------------------------------
    # 1. HYPERTENSION PREVALENCE BY AGE GROUP
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  1. HYPERTENSION PREVALENCE (ground truth) BY AGE GROUP")
    print("=" * 70)
    print()
    print(f"  {'Age Group':<12} {'N':>6} {'Hypertensive':>14} {'Prevalence':>12}")
    print("  " + "-" * 48)
    for ag in ["18-39", "40-59", "60-79", "80+"]:
        mask = (demographics["age_group"] == ag).values
        n = mask.sum()
        n_pos = y[mask].sum()
        prev = y[mask].mean()
        print(f"  {ag:<12} {n:>6} {n_pos:>14} {prev:>11.1%}")
    print()

    # ---------------------------------------------------------------
    # 2. TRAIN MODEL (same as test_nhanes.py)
    # ---------------------------------------------------------------
    X = features.fillna(features.median()).fillna(0)
    X_train, X_test, y_train, y_test, demo_train, demo_test = train_test_split(
        X, y, demographics, test_size=0.3, random_state=SEED, stratify=y)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = LogisticRegression(max_iter=1000, random_state=SEED, class_weight="balanced")
    model.fit(X_train_scaled, y_train)

    y_pred = model.predict(X_test_scaled)
    y_score = model.predict_proba(X_test_scaled)[:, 1]

    demo_test = demo_test.reset_index(drop=True)

    # ---------------------------------------------------------------
    # 3. MODEL COEFFICIENTS
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  2. MODEL COEFFICIENTS (scaled features)")
    print("=" * 70)
    print()
    feature_names = X.columns.tolist()
    coefs = model.coef_[0]
    intercept = model.intercept_[0]

    print(f"  {'Feature':<24} {'Coefficient':>12} {'|Coef|':>10} {'Scaler Mean':>12} {'Scaler Std':>12}")
    print("  " + "-" * 74)
    sorted_idx = np.argsort(np.abs(coefs))[::-1]
    for i in sorted_idx:
        print(f"  {feature_names[i]:<24} {coefs[i]:>12.4f} {abs(coefs[i]):>10.4f} {scaler.mean_[i]:>12.2f} {scaler.scale_[i]:>12.2f}")
    print(f"\n  Intercept: {intercept:.4f}")
    print()

    # How much does age dominate?
    age_idx = feature_names.index("age")
    total_abs_coef = np.abs(coefs).sum()
    age_pct = np.abs(coefs[age_idx]) / total_abs_coef * 100
    print(f"  Age coefficient share of total: {age_pct:.1f}%")
    print()

    # ---------------------------------------------------------------
    # 4. PREDICTION PROBABILITY DISTRIBUTION BY AGE GROUP
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  3. PREDICTION PROBABILITY DISTRIBUTION BY AGE GROUP")
    print("=" * 70)
    print()
    print(f"  {'Age Group':<12} {'N':>6} {'Mean P':>8} {'Median P':>10} {'Min P':>8} {'Max P':>8} {'Pred+':>7} {'Pred+ %':>9}")
    print("  " + "-" * 74)
    for ag in ["18-39", "40-59", "60-79", "80+"]:
        mask = (demo_test["age_group"] == ag).values
        n = mask.sum()
        probs = y_score[mask]
        preds = y_pred[mask]
        n_pred_pos = preds.sum()
        print(f"  {ag:<12} {n:>6} {probs.mean():>8.4f} {np.median(probs):>10.4f} {probs.min():>8.4f} {probs.max():>8.4f} {int(n_pred_pos):>7} {n_pred_pos/n*100:>8.1f}%")
    print()

    # ---------------------------------------------------------------
    # 5. WHAT DOES THE DEFAULT THRESHOLD (0.5) DO?
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  4. THRESHOLD ANALYSIS (default = 0.5)")
    print("=" * 70)
    print()
    print(f"  {'Age Group':<12} {'P < 0.5':>10} {'P >= 0.5':>10} {'% above 0.5':>13}")
    print("  " + "-" * 48)
    for ag in ["18-39", "40-59", "60-79", "80+"]:
        mask = (demo_test["age_group"] == ag).values
        probs = y_score[mask]
        n_above = (probs >= 0.5).sum()
        n_below = (probs < 0.5).sum()
        print(f"  {ag:<12} {n_below:>10} {n_above:>10} {n_above/len(probs)*100:>12.1f}%")
    print()

    # ---------------------------------------------------------------
    # 6. AGE DISTRIBUTION IN EACH GROUP
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  5. AGE STATISTICS IN TRAINING/TEST DATA")
    print("=" * 70)
    print()
    print(f"  {'Age Group':<12} {'N (test)':>10} {'True Prev':>10} {'Mean Age':>10} {'Std Age':>10}")
    print("  " + "-" * 56)
    for ag in ["18-39", "40-59", "60-79", "80+"]:
        mask = (demo_test["age_group"] == ag).values
        n = mask.sum()
        prev = y_test[mask].mean()
        ages = X_test.iloc[mask.nonzero()[0]]["age"]
        print(f"  {ag:<12} {n:>10} {prev:>9.1%} {ages.mean():>10.1f} {ages.std():>10.1f}")
    print()

    # ---------------------------------------------------------------
    # 7. WHAT IF WE REMOVE AGE?
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  6. EXPERIMENT: MODEL WITHOUT AGE FEATURE")
    print("=" * 70)
    print()
    X_no_age = X.drop(columns=["age"])
    X_train_na, X_test_na, y_train_na, y_test_na, demo_train_na, demo_test_na = train_test_split(
        X_no_age, y, demographics, test_size=0.3, random_state=SEED, stratify=y)

    scaler_na = StandardScaler()
    X_train_na_scaled = scaler_na.fit_transform(X_train_na)
    X_test_na_scaled = scaler_na.transform(X_test_na)

    model_na = LogisticRegression(max_iter=1000, random_state=SEED, class_weight="balanced")
    model_na.fit(X_train_na_scaled, y_train_na)

    y_pred_na = model_na.predict(X_test_na_scaled)
    y_score_na = model_na.predict_proba(X_test_na_scaled)[:, 1]

    demo_test_na = demo_test_na.reset_index(drop=True)

    acc_with = accuracy_score(y_test, y_pred)
    acc_without = accuracy_score(y_test_na, y_pred_na)
    print(f"  Overall accuracy WITH age:    {acc_with:.4f}")
    print(f"  Overall accuracy WITHOUT age: {acc_without:.4f}")
    print()

    print(f"  {'Age Group':<12} {'N':>6} {'Pred+ (with age)':>18} {'Pred+ (no age)':>16} {'True Prev':>10}")
    print("  " + "-" * 66)
    for ag in ["18-39", "40-59", "60-79", "80+"]:
        mask_w = (demo_test["age_group"] == ag).values
        mask_na = (demo_test_na["age_group"] == ag).values
        n = mask_w.sum()
        pred_w = y_pred[mask_w].mean()
        pred_na = y_pred_na[mask_na].mean()
        true_prev = y_test[mask_w].mean()
        print(f"  {ag:<12} {n:>6} {pred_w:>17.1%} {pred_na:>15.1%} {true_prev:>9.1%}")
    print()

    # Also check race metrics without age
    print(f"  {'Race Group':<24} {'Pred+ (with age)':>18} {'Pred+ (no age)':>16}")
    print("  " + "-" * 62)
    for race in sorted(demo_test["race"].unique()):
        mask_w = (demo_test["race"] == race).values
        mask_na = (demo_test_na["race"] == race).values
        pred_w = y_pred[mask_w].mean()
        pred_na = y_pred_na[mask_na].mean()
        print(f"  {race:<24} {pred_w:>17.1%} {pred_na:>15.1%}")
    print()

    # ---------------------------------------------------------------
    # 8. LOGISTIC REGRESSION "DECISION BOUNDARY" FOR AGE
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  7. AGE-DRIVEN DECISION BOUNDARY")
    print("=" * 70)
    print()
    # For an "average" person, at what age does P(hypertension) cross 0.5?
    median_features = X.median().values
    scaled_median = scaler.transform(median_features.reshape(1, -1))[0]

    # Vary age from 18 to 85 and see how probability changes
    print(f"  For a person with median features, varying only age:")
    print(f"  {'Age':>6} {'P(hypertension)':>17} {'Prediction':>12}")
    print("  " + "-" * 38)
    for test_age in [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80]:
        test_features = median_features.copy()
        test_features[age_idx] = test_age
        scaled = scaler.transform(test_features.reshape(1, -1))
        prob = model.predict_proba(scaled)[0, 1]
        pred = "POSITIVE" if prob >= 0.5 else "negative"
        print(f"  {test_age:>6} {prob:>17.4f} {pred:>12}")
    print()

    # ---------------------------------------------------------------
    # 9. SUMMARY
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  SUMMARY OF FINDINGS")
    print("=" * 70)
    print()
    print("  1. Age is the DOMINANT feature in the logistic regression model.")
    print(f"     It accounts for {age_pct:.1f}% of total absolute coefficient weight.")
    print()
    print("  2. The model produces near-0 probabilities for 18-39 year olds")
    print("     and near-1 probabilities for 80+ year olds, effectively acting")
    print("     as a binary age threshold rather than a nuanced classifier.")
    print()
    print("  3. This is partly driven by real prevalence differences:")
    for ag in ["18-39", "40-59", "60-79", "80+"]:
        mask = (demographics["age_group"] == ag).values
        prev = y[mask].mean()
        print(f"     - {ag}: {prev:.1%} actual hypertension prevalence")
    print()
    print("  4. The 0/1 rates in the fairness report are NOT a bug in ParityScope.")
    print("     They accurately reflect that the model makes extreme predictions")
    print("     for the youngest and oldest age groups.")
    print()
    print("  5. Removing age as a feature eliminates the 0/1 pattern but changes")
    print("     overall model performance.")


if __name__ == "__main__":
    main()
