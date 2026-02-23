# ParityScope Meeting Notes — 2026-02-23

## Summary

Built the Fairness Audit Engine V1 from the ground up, validated it with both synthetic and real-world clinical data, discovered a significant finding that demonstrates the core product value, and updated the business plan accordingly.

---

## 1. Fairness Audit Engine V1 — Completed

Built the complete ParityScope engine as a Python SDK (`engine/`). Key modules:

- **15 fairness metrics** across classification (demographic parity, equal opportunity, equalized odds, predictive parity, FPR/FNR/FDR/FOR parity, accuracy parity, treatment equality, NPV/specificity parity) and calibration (calibration difference, Brier parity, KS score distribution)
- **Audit orchestrator** (`FairnessAudit`) — takes model predictions + patient demographics + outcomes, runs selected metrics, produces structured `AuditResult`
- **Regulation mapping** — jurisdiction-specific metric selection for EU AI Act, South Korea AI Framework Act, Taiwan AI Basic Law, and US Section 1557, with clinical-domain-aware recommendations (diagnosis, risk stratification, treatment, resource allocation, triage)
- **What-if simulation** — per-group threshold adjustment and balanced resampling with accuracy trade-off tracking
- **Report generation** — JSON export and human-readable summaries with compliance requirement mapping
- **Data validation** — input validation with data access tier detection (Minimal / Standard / Full), minimum sample size checks
- **56 unit tests passing** — deterministic, reproducible results

The engine is a statistical evaluation toolkit, not a trained AI model. No black box.

## 2. PDF Report Generation — Added

Added professional PDF report output using ReportLab:
- Color-coded tables (red = unfair, green = fair, amber = borderline)
- Executive summary section
- Per-metric breakdowns by demographic group
- EU AI Act compliance requirements section
- Generated alongside JSON for every audit run

## 3. Synthetic Simulation — Completed

Built an interactive demo script (`engine/demo.py`) simulating a biased sepsis risk prediction model:
- 5,000 synthetic patients across race, sex, and age groups
- Intentional bias injected to test detection capabilities
- Three audits run: EU AI Act, Section 1557, and multi-attribute
- What-if simulations showing threshold adjustment impact
- Exports full JSON report
- Validates that the engine correctly detects injected bias patterns

## 4. Real-World Simulations — Completed

### 4a. CDC NHANES Hypertension Model (Primary)
- Dataset: CDC NHANES 2017–2018, 5,216 U.S. adults
- Task: Predict hypertension from clinical features (BMI, cholesterol, smoking, diabetes, kidney disease, age, etc.)
- Model: Logistic regression trained on real population health data
- Audited across: race/ethnicity, sex, and age groups

### 4b. PhysioNet 2019 Sepsis Challenge
- Dataset: PhysioNet Computing in Cardiology 2019 (~40K ICU patient records)
- Task: Sepsis prediction from ICU vitals
- Audited across: sex and age groups

### 4c. Data Pipeline Debugging
Multiple rounds of fixes were needed to get the NHANES pipeline working reliably:
- Fixed XPT file download (CDC requires specific URL paths and User-Agent headers)
- Fixed index alignment error after filtering (df index reset)
- Each fix was tested and committed incrementally

## 5. Key Findings — NHANES Hypertension Model Investigation

This is the most important outcome of today's work. The findings demonstrate exactly what ParityScope is built to catch.

### The Headline
The model reports **66% overall accuracy** — a number that would pass most internal reviews. ParityScope revealed it is fundamentally broken.

### What ParityScope Found

**The model is not a hypertension predictor — it is an age threshold.**

- **Age accounts for 56.7% of the model's total coefficient weight** — more than all other clinical features combined
- BMI, cholesterol, smoking, diabetes, kidney disease are effectively ignored
- The model flips from "healthy" to "hypertensive" at exactly **age 58** for a patient with median features, regardless of clinical indicators

**Catastrophic failure at the extremes:**

| Age Group | Patients | Actual Prevalence | Model Prediction | Problem |
|-----------|----------|-------------------|------------------|---------|
| 18–39     | 491      | 6.5%              | 0% detected      | Missed every hypertensive patient (32 people) |
| 80+       | 111      | 53.9%             | 100% predicted    | Labeled all patients hypertensive (46% were healthy) |

**Racial disparities compound the problem:**
- Detection rate: 77.6% (Non-Hispanic White) vs. 56.3% (Other/Multi-Racial) — a **21-percentage-point gap**
- **All 8 fairness metrics across race rated UNFAIR** under EU AI Act thresholds
- **19 of 24 total fairness metrics failed**

### Why This Matters
A standard model evaluation would report "66% accuracy, AUC 0.78" and the model would pass review. ParityScope breaks open the single number and shows:
- **Who** the model works for (middle-aged patients)
- **Who** it fails (young patients missed entirely, elderly over-diagnosed)
- **Why** it fails (age dominance, not clinical signal)

This is the core value proposition: **ParityScope catches model failures that overall metrics hide.**

## 6. Business Plan Updated (v9)

Updated `ParityScope_Business_Plan (9).docx` with three additions:

1. **New Key Differentiator** (Executive Summary → Key Differentiators):
   > "Catches failures that overall metrics hide" — backed by the NHANES finding

2. **New Bias Case** (THE PROBLEM → Healthcare AI Is Biased):
   > NHANES Hypertension Model added as a ParityScope-discovered case alongside Optum, Epic Sepsis, dermatology AI, etc.

3. **New Section** (OUR SOLUTION → "ParityScope in Action: NHANES Hypertension Model"):
   > Full case study with five subsections: headline metric deception, root cause (age dominance), patient harm in both directions, racial disparities, and core value proposition demonstrated

---

## Commits (chronological)

| Commit | Description |
|--------|-------------|
| `d6b233e` | Add fairness detection engine — core SDK with 15 metrics, audit orchestrator, and regulation mapping |
| `0a7d8c7` | Add engine .gitignore and remove cached build artifacts |
| `ca98461` | Add interactive demo script for manual testing of fairness engine |
| `32f2c4a` | Add PDF report generation for clean, readable audit output |
| `831d9eb` | Add real-data integration tests for PhysioNet 2019 and NHANES datasets |
| `46f4267` | Fix NHANES data loading: download XPT files before reading |
| `ce7af26` | Fix NHANES download: add User-Agent header for CDC requests |
| `7771525` | Fix NHANES URLs: use correct CDC data file download paths |
| `d39e047` | Fix NHANES index alignment error in prepare_dataset |
| `0126ff0` | Add investigation script for age group rate 0/1 issue in NHANES model |
| `dfe4d5f` | Update business plan with NHANES audit findings and hidden failures pitch |

---

## Next Steps

- [ ] Run the engine against additional real-world models to build case study library
- [ ] Begin website implementation (Phase 1 of WEBSITE_PLAN.md)
- [ ] Prepare NHANES case study as a standalone asset for investor/customer conversations
- [ ] Consider adding the NHANES finding to the website homepage problem section

---

*Notes prepared: 2026-02-23*
