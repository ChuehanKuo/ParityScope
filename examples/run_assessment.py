#!/usr/bin/env python3
"""ParityScope — Sample Assessment Script

This script demonstrates a complete EUR 25-75K assessment engagement
for a medtech client. It runs the full audit pipeline and generates
all deliverables in a single output directory.

Usage:
    python run_assessment.py

Output:
    assessment_output/
        1_executive_summary.txt         — For the board / legal
        2_audit_report.pdf              — Full technical audit
        3_eu_ai_act_conformity.pdf      — EU AI Act compliance report
        4_fda_premarket.pdf             — FDA bias documentation
        5_section_1557_analysis.pdf     — Disparate impact analysis
        6_compliance_checklist.json     — Regulatory checklist
        7_recommendations.json          — Prioritized remediation plan
        8_root_cause_analysis.json      — Root cause findings
        9_evidence_package.zip          — Complete evidence archive
        audit_result.json               — Raw audit data
"""

import json
import sys
from pathlib import Path

import numpy as np
import pandas as pd

# Add engine to path if running from examples/
engine_path = Path(__file__).parent.parent / "engine"
if engine_path.exists():
    sys.path.insert(0, str(engine_path / "src"))

from parityscope import FairnessAudit
from parityscope.reports.generator import generate_json_report, generate_summary
from parityscope.reports.executive_summary import generate_executive_summary, generate_executive_summary_pdf
from parityscope.reports.eu_ai_act import generate_eu_ai_act_report
from parityscope.reports.fda_premarket import generate_fda_report
from parityscope.reports.section_1557 import generate_section_1557_report
from parityscope.reports.checklist import generate_compliance_checklist, checklist_to_dict
from parityscope.reports.evidence_package import create_evidence_package
from parityscope.rootcause import RootCauseAnalysis
from parityscope.recommendations import prioritize_findings, analyze_compliance_gaps


def generate_sample_data(n: int = 3000, seed: int = 42):
    """Simulate a biased sepsis risk prediction model with realistic demographics."""
    rng = np.random.default_rng(seed)

    race = rng.choice(["White", "Black", "Hispanic", "Asian"], n, p=[0.55, 0.20, 0.15, 0.10])
    sex = rng.choice(["Male", "Female"], n, p=[0.48, 0.52])
    age_group = rng.choice(["18-39", "40-59", "60-79", "80+"], n, p=[0.15, 0.30, 0.35, 0.20])

    # Clinical features
    bmi = rng.normal(28, 5, n).clip(15, 50)
    systolic_bp = rng.normal(130, 20, n).clip(80, 200)
    heart_rate = rng.normal(80, 15, n).clip(40, 160)

    # Ground truth with realistic prevalence
    base_rate = 0.12
    y_true = np.zeros(n, dtype=int)
    for i in range(n):
        rate = base_rate
        if age_group[i] == "80+":
            rate += 0.05
        if age_group[i] == "60-79":
            rate += 0.02
        y_true[i] = rng.random() < rate

    # Biased model predictions
    y_score = np.zeros(n, dtype=float)
    for i in range(n):
        if y_true[i] == 1:
            base = 0.75
            noise = {
                "White": rng.normal(0, 0.12),
                "Black": rng.normal(-0.15, 0.18),
                "Hispanic": rng.normal(-0.05, 0.15),
                "Asian": rng.normal(-0.02, 0.13),
            }[race[i]]
        else:
            base = 0.25
            noise = {
                "White": rng.normal(0, 0.10),
                "Black": rng.normal(0.02, 0.12),
                "Hispanic": rng.normal(0.08, 0.14),
                "Asian": rng.normal(0.01, 0.11),
            }[race[i]]
        if sex[i] == "Female" and y_true[i] == 1:
            noise -= 0.04
        y_score[i] = np.clip(base + noise, 0, 1)

    y_pred = (y_score >= 0.5).astype(int)

    demographics = pd.DataFrame({"race": race, "sex": sex, "age_group": age_group})
    features = pd.DataFrame({"bmi": bmi, "systolic_bp": systolic_bp, "heart_rate": heart_rate})

    return y_true, y_pred, y_score, demographics, features


def main():
    output_dir = Path("assessment_output")
    output_dir.mkdir(exist_ok=True)

    print("=" * 70)
    print("  PARITYSCOPE — Full Assessment Engagement Demo")
    print("  Simulating a EUR 25-75K medtech client assessment")
    print("=" * 70)
    print()

    # Generate data
    print("1. Generating synthetic patient data (3,000 patients)...")
    y_true, y_pred, y_score, demographics, features = generate_sample_data()
    print(f"   Patients: {len(y_true):,}")
    print(f"   Sepsis prevalence: {y_true.mean():.1%}")
    print(f"   Model accuracy: {(y_true == y_pred).mean():.1%}")
    print()

    # Run audit
    print("2. Running fairness audit (EU AI Act, diagnosis context)...")
    audit = FairnessAudit(
        model_name="SepsisRisk-v2.1",
        protected_attributes=["race", "sex", "age_group"],
        jurisdiction="eu-ai-act",
        clinical_domain="diagnosis",
        intersectional=True,
    )
    result = audit.run(y_true=y_true, y_pred=y_pred, demographics=demographics, y_score=y_score)
    print(f"   Overall: {result.overall_fairness.value.upper()}")
    print(f"   Fair: {len(result.fair_metrics)} | Marginal: {len(result.marginal_metrics)} | Unfair: {len(result.unfair_metrics)}")
    print()

    # Root cause analysis
    print("3. Running root cause analysis...")
    rca = RootCauseAnalysis(protected_attributes=["race", "sex", "age_group"])
    rc_report = rca.run(features, y_true, y_pred, demographics)
    print(f"   Critical findings: {len(rc_report.critical_findings)}")
    for f in rc_report.critical_findings:
        print(f"     - {f}")
    print()

    # Recommendations
    print("4. Generating prioritized recommendations...")
    issues = prioritize_findings(result, rc_report)
    print(f"   Issues found: {len(issues)}")
    for issue in issues[:3]:
        print(f"     [{issue.severity.value.upper()}] {issue.title} (score: {issue.priority_score})")
    print()

    # Compliance gap analysis
    print("5. Running compliance gap analysis...")
    gaps = analyze_compliance_gaps(result)
    print(f"   Compliance score: {gaps.overall_compliance_score}%")
    print(f"   Pass: {len(gaps.passing)} | Fail: {len(gaps.failing)} | Partial: {len(gaps.partial)}")
    print()

    # Generate deliverables
    print("6. Generating assessment deliverables...")
    print()

    # 1. Executive summary
    exec_summary = generate_executive_summary(result)
    (output_dir / "1_executive_summary.txt").write_text(exec_summary)
    print(f"   [1] Executive Summary           → 1_executive_summary.txt")

    # 2. Full audit PDF
    from parityscope.reports.pdf_report import generate_pdf_report
    generate_pdf_report(result, output_path=str(output_dir / "2_audit_report.pdf"))
    print(f"   [2] Full Audit Report           → 2_audit_report.pdf")

    # 3. EU AI Act conformity
    generate_eu_ai_act_report(result, root_cause_report=rc_report, output_path=str(output_dir / "3_eu_ai_act_conformity.pdf"))
    print(f"   [3] EU AI Act Conformity        → 3_eu_ai_act_conformity.pdf")

    # 4. FDA premarket
    device_info = {
        "device_name": "SepsisRisk AI v2.1",
        "device_class": "Class II",
        "submission_type": "510(k)",
        "intended_use": "Sepsis risk stratification in adult ICU patients",
    }
    generate_fda_report(result, device_info=device_info, output_path=str(output_dir / "4_fda_premarket.pdf"))
    print(f"   [4] FDA Premarket Documentation → 4_fda_premarket.pdf")

    # 5. Section 1557
    generate_section_1557_report(result, output_path=str(output_dir / "5_section_1557_analysis.pdf"))
    print(f"   [5] Section 1557 Analysis       → 5_section_1557_analysis.pdf")

    # 6. Compliance checklist
    checklist = generate_compliance_checklist(result)
    (output_dir / "6_compliance_checklist.json").write_text(
        json.dumps(checklist_to_dict(checklist), indent=2)
    )
    print(f"   [6] Compliance Checklist        → 6_compliance_checklist.json")

    # 7. Recommendations
    rec_data = [
        {
            "id": r.id,
            "severity": r.severity.value,
            "title": r.title,
            "description": r.description,
            "disparity": r.disparity,
            "regulatory_risk": r.regulatory_risk,
            "clinical_impact": r.clinical_impact,
            "priority_score": r.priority_score,
            "mitigation_strategies": [
                {"strategy": s.strategy, "difficulty": s.difficulty, "effort": s.estimated_effort, "requires_retraining": s.requires_retraining}
                for s in r.mitigation_strategies
            ],
        }
        for r in issues
    ]
    (output_dir / "7_recommendations.json").write_text(json.dumps(rec_data, indent=2))
    print(f"   [7] Recommendations             → 7_recommendations.json")

    # 8. Root cause
    (output_dir / "8_root_cause_analysis.json").write_text(
        json.dumps(rc_report.to_dict(), indent=2, default=str)
    )
    print(f"   [8] Root Cause Analysis         → 8_root_cause_analysis.json")

    # 9. Evidence package
    pkg_path = create_evidence_package(
        result, str(output_dir), root_cause_report=rc_report, compress=True
    )
    print(f"   [9] Evidence Package            → {pkg_path.name}")

    # 10. Raw audit JSON
    (output_dir / "audit_result.json").write_text(generate_json_report(result))
    print(f"   [10] Raw Audit Data             → audit_result.json")

    print()
    print("=" * 70)
    print(f"  Assessment complete. All deliverables in: {output_dir}/")
    print()
    print("  Deliverable summary:")
    print("    - Board/Legal:  1_executive_summary.txt")
    print("    - Technical:    2_audit_report.pdf")
    print("    - EU AI Act:    3_eu_ai_act_conformity.pdf")
    print("    - FDA:          4_fda_premarket.pdf")
    print("    - Section 1557: 5_section_1557_analysis.pdf")
    print("    - Compliance:   6_compliance_checklist.json")
    print("    - Remediation:  7_recommendations.json")
    print("    - Root cause:   8_root_cause_analysis.json")
    print("    - Archive:      9_evidence_package.zip")
    print("=" * 70)


if __name__ == "__main__":
    main()
