"""ParityScope Demo — Test the fairness engine with a synthetic clinical AI model.

This script simulates a hospital sepsis risk prediction model that has
realistic bias: it performs worse for Black and Hispanic patients compared
to White patients, and worse for female patients in certain metrics.

Run:
    python demo.py
"""

import numpy as np
import pandas as pd

from parityscope import FairnessAudit
from parityscope.reports.generator import generate_json_report, generate_summary
from parityscope.simulation.interventions import compare_interventions


def generate_biased_sepsis_model(n=5000, seed=42):
    """Simulate a sepsis risk prediction model with realistic demographic bias.

    The model is intentionally biased:
    - White patients: best performance (high TPR, low FPR)
    - Black patients: higher false negative rate (missed sepsis cases)
    - Hispanic patients: higher false positive rate (unnecessary interventions)
    - Male/Female: slight disparity in sensitivity
    """
    rng = np.random.default_rng(seed)

    # Demographics
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

    # Ground truth: sepsis prevalence ~12%, varies slightly by group
    base_rate = 0.12
    y_true = np.zeros(n, dtype=int)
    for i in range(n):
        rate = base_rate
        if age_group[i] == "80+":
            rate += 0.05
        if age_group[i] == "60-79":
            rate += 0.02
        y_true[i] = rng.random() < rate

    # Generate probability scores with group-dependent noise
    y_score = np.zeros(n, dtype=float)
    for i in range(n):
        if y_true[i] == 1:
            # True positive base score
            base = 0.75
            if race[i] == "White":
                noise = rng.normal(0, 0.12)
            elif race[i] == "Black":
                noise = rng.normal(-0.15, 0.18)  # Lower scores -> more missed
            elif race[i] == "Hispanic":
                noise = rng.normal(-0.05, 0.15)
            else:
                noise = rng.normal(-0.02, 0.13)
        else:
            # True negative base score
            base = 0.25
            if race[i] == "White":
                noise = rng.normal(0, 0.10)
            elif race[i] == "Black":
                noise = rng.normal(0.02, 0.12)
            elif race[i] == "Hispanic":
                noise = rng.normal(0.08, 0.14)  # Higher scores -> more false alarms
            else:
                noise = rng.normal(0.01, 0.11)

        # Sex-based bias (smaller effect)
        if sex[i] == "Female" and y_true[i] == 1:
            noise -= 0.04

        y_score[i] = np.clip(base + noise, 0, 1)

    # Binary predictions at threshold 0.5
    y_pred = (y_score >= 0.5).astype(int)

    demographics = pd.DataFrame({
        "race": race,
        "sex": sex,
        "age_group": age_group,
    })

    return y_true, y_pred, y_score, demographics


def main():
    print("=" * 70)
    print("  PARITYSCOPE DEMO — Sepsis Risk Prediction Fairness Audit")
    print("=" * 70)
    print()

    # Generate synthetic data
    print("Generating synthetic sepsis risk model with 5,000 patients...")
    y_true, y_pred, y_score, demographics = generate_biased_sepsis_model()

    total_pos = y_true.sum()
    total_pred_pos = y_pred.sum()
    accuracy = np.mean(y_true == y_pred)
    print(f"  Patients:    {len(y_true):,}")
    print(f"  Sepsis cases: {total_pos} ({total_pos/len(y_true)*100:.1f}%)")
    print(f"  Predicted+:  {total_pred_pos} ({total_pred_pos/len(y_true)*100:.1f}%)")
    print(f"  Accuracy:    {accuracy:.1%}")
    print()

    # Show per-group stats
    print("Per-group breakdown:")
    print(f"  {'Group':<12} {'N':>6} {'Prevalence':>11} {'Pred+':>8} {'Accuracy':>9}")
    print("  " + "-" * 50)
    for race_val in ["White", "Black", "Hispanic", "Asian"]:
        mask = demographics["race"] == race_val
        n_g = mask.sum()
        prev = y_true[mask].mean()
        pred_pos = y_pred[mask].mean()
        acc = np.mean(y_true[mask] == y_pred[mask])
        print(f"  {race_val:<12} {n_g:>6} {prev:>10.1%} {pred_pos:>8.1%} {acc:>8.1%}")
    print()

    # ---------------------------------------------------------------
    # AUDIT 1: EU AI Act — Diagnosis context, race attribute
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  AUDIT 1: EU AI Act Compliance — Race")
    print("=" * 70)
    print()

    audit_eu = FairnessAudit(
        model_name="sepsis_risk_v2.1",
        protected_attributes=["race"],
        jurisdiction="eu-ai-act",
        clinical_domain="diagnosis",
    )
    result_eu = audit_eu.run(
        y_true=y_true,
        y_pred=y_pred,
        demographics=demographics,
        y_score=y_score,
    )

    print(generate_summary(result_eu))
    print()

    # ---------------------------------------------------------------
    # AUDIT 2: Section 1557 — Sex attribute
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  AUDIT 2: Section 1557 — Sex")
    print("=" * 70)
    print()

    audit_1557 = FairnessAudit(
        model_name="sepsis_risk_v2.1",
        protected_attributes=["sex"],
        jurisdiction="section-1557",
        clinical_domain="diagnosis",
    )
    result_1557 = audit_1557.run(
        y_true=y_true,
        y_pred=y_pred,
        demographics=demographics,
        y_score=y_score,
    )

    print(generate_summary(result_1557))
    print()

    # ---------------------------------------------------------------
    # AUDIT 3: Multi-attribute audit (race + sex + age)
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  AUDIT 3: Comprehensive Multi-Attribute Audit")
    print("=" * 70)
    print()

    audit_full = FairnessAudit(
        model_name="sepsis_risk_v2.1",
        protected_attributes=["race", "sex", "age_group"],
        metrics=["demographic_parity", "equal_opportunity", "equalized_odds"],
    )
    result_full = audit_full.run(
        y_true=y_true,
        y_pred=y_pred,
        demographics=demographics,
    )

    print(generate_summary(result_full))
    print()

    # ---------------------------------------------------------------
    # SIMULATION: What-if interventions
    # ---------------------------------------------------------------
    print("=" * 70)
    print("  SIMULATION: What-If Interventions (Race)")
    print("=" * 70)
    print()

    interventions = compare_interventions(
        y_true=y_true,
        y_pred=y_pred,
        y_score=y_score,
        groups=np.array(demographics["race"]),
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
    # EXPORT: Save JSON report
    # ---------------------------------------------------------------
    report_path = "audit_report.json"
    with open(report_path, "w") as f:
        f.write(generate_json_report(result_eu))
    print(f"Full JSON report saved to: {report_path}")
    print()
    print("Done! Review the audit results above to see how bias manifests")
    print("across demographic groups in this simulated clinical AI model.")


if __name__ == "__main__":
    main()
