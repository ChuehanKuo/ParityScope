# ParityScope

**Healthcare AI Fairness Compliance Toolkit**

Audit, monitor, and mitigate bias in clinical AI systems. Built for EU AI Act, FDA, and Section 1557 compliance.

```
pip install parityscope
```

## Quick Start

### 1. Run an audit from the CLI

```bash
parityscope audit \
  --data patient_data.csv \
  --model-name "sepsis_risk_v2" \
  --attributes race sex \
  --jurisdiction eu-ai-act \
  --domain diagnosis \
  --output-dir ./reports
```

### 2. Use as a Python SDK

```python
from parityscope import FairnessAudit

audit = FairnessAudit(
    model_name="sepsis_risk_v2",
    protected_attributes=["race", "sex"],
    jurisdiction="eu-ai-act",
    clinical_domain="diagnosis",
)

result = audit.run(
    y_true=labels,
    y_pred=predictions,
    demographics=demographics_df,
    y_score=risk_scores,  # optional
)

# Check results
print(f"Overall: {result.overall_fairness.value}")
for m in result.unfair_metrics:
    print(f"  {m.display_name}: disparity {m.disparity:.4f}")
```

### 3. Generate regulatory reports

```python
from parityscope.reports.eu_ai_act import generate_eu_ai_act_report
from parityscope.reports.executive_summary import generate_executive_summary

# EU AI Act conformity assessment PDF
generate_eu_ai_act_report(result, output_path="eu_ai_act_report.pdf")

# Executive summary for the board
print(generate_executive_summary(result))
```

### 4. Run root cause analysis

```python
from parityscope.rootcause import RootCauseAnalysis

rca = RootCauseAnalysis(protected_attributes=["race", "sex"])
report = rca.run(X=features_df, y_true=labels, y_pred=predictions, demographics=demographics_df)

for finding in report.critical_findings:
    print(f"  {finding}")
```

### 5. Continuous monitoring

```bash
# Run a monitoring audit (stores to SQLite)
parityscope monitor run \
  --data new_patient_data.csv \
  --model-name sepsis_risk_v2 \
  --attributes race sex \
  --jurisdiction eu-ai-act

# Check status
parityscope monitor status --model-name sepsis_risk_v2

# View history
parityscope monitor history --model-name sepsis_risk_v2

# Generate monitoring report
parityscope monitor report --model-name sepsis_risk_v2 --format pdf
```

### 6. REST API

```bash
parityscope serve --host 0.0.0.0 --port 8000
```

Then POST to `http://localhost:8000/api/v1/audit` with JSON body.

---

## What it does

ParityScope computes 15 fairness metrics across demographic groups, maps results to regulatory requirements, identifies root causes of bias, and produces actionable recommendations.

### Metrics (15)
- **Classification**: demographic parity, equal opportunity, equalized odds, predictive parity, FPR/FNR/FDR/FOR parity, accuracy parity, treatment equality, NPV parity, specificity parity
- **Calibration**: calibration difference, Brier score parity, score distribution difference

### Jurisdictions (4)
- EU AI Act (Articles 9, 10, 13, 15, 61)
- US Section 1557 (Affordable Care Act)
- South Korea AI Framework Act
- Taiwan AI Basic Act

### Reports
- EU AI Act conformity assessment PDF
- FDA premarket bias documentation
- Section 1557 disparate impact analysis
- Compliance checklists
- Evidence packages (ZIP with checksums)
- Executive summaries

### Analysis
- Intersectional fairness (e.g., Black+Female)
- Automatic worst-subgroup discovery
- Bootstrap confidence intervals (BCa)
- Effect sizes (Cohen's d, odds ratios)
- Statistical power analysis
- Root cause: proxy detection, label bias, feature dominance, representation

### Monitoring
- SQLite-backed audit history
- Drift detection (absolute, relative, statistical)
- Configurable alert rules
- Trend analysis with forecasting
- Dashboard data API

---

## CLI Reference

```
parityscope audit        Run a fairness audit
parityscope profile      Profile a dataset
parityscope simulate     Run what-if simulations
parityscope report       Generate reports from saved JSON
parityscope monitor      Continuous monitoring commands
parityscope serve        Start the REST API server
parityscope init         Generate sample config file
```

## Configuration

Generate a sample config:
```bash
parityscope init
```

Edit `parityscope.yaml`:
```yaml
model_name: "my_model"
data_path: "./data/patients.csv"
column_map:
  predictions: "model_output"
  labels: "diagnosis_confirmed"
  scores: "risk_score"
protected_attributes:
  - race
  - sex
  - age_group
jurisdiction: "eu-ai-act"
clinical_domain: "diagnosis"
```

Run with config:
```bash
parityscope audit --config parityscope.yaml
```

## Installation

```bash
# Core
pip install parityscope

# With FHIR support
pip install parityscope[fhir]

# With ONNX model loading
pip install parityscope[onnx]

# Everything
pip install parityscope[all]
```

Requires Python 3.10+.

## How it works

ParityScope is a **statistical evaluation toolkit**, not a trained AI model. It takes your model's predictions, patient demographics, and outcomes, then computes fairness metrics deterministically. No black box. No training data needed. Patient data never leaves your infrastructure.

---

*ParityScope v0.2.0 — parityscope.com*
