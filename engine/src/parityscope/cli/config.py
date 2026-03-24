"""YAML/JSON configuration file loader for ParityScope audits.

Supports loading audit configuration from YAML or JSON files, with
sensible defaults and sample config generation.
"""

from __future__ import annotations

import json
from dataclasses import asdict, dataclass, field
from pathlib import Path

import yaml


@dataclass
class AuditConfig:
    """Complete configuration for a ParityScope fairness audit.

    Attributes:
        model_name: Identifier for the model being audited.
        data_path: Path to the CSV/Excel data file.
        column_map: Mapping of logical column names to actual column names.
            Keys: predictions, labels, scores, demographics.
        protected_attributes: List of demographic attributes to evaluate.
        jurisdiction: Regulatory jurisdiction (e.g., "eu-ai-act", "section-1557").
        clinical_domain: Clinical use case (e.g., "diagnosis", "triage").
        intersectional: Whether to enable intersectional analysis.
        bootstrap: Whether to enable bootstrap confidence intervals.
        n_bootstrap: Number of bootstrap iterations.
        output_dir: Directory for output files.
        output_formats: List of output formats (e.g., ["pdf", "json"]).
        include_root_cause: Whether to include root cause analysis.
        include_recommendations: Whether to include recommendations.
        include_executive_summary: Whether to include an executive summary.
        thresholds: Custom fairness thresholds (keys: metric names, values: floats).
        device_info: Device information for FDA reports.
    """

    model_name: str = ""
    data_path: str = ""
    column_map: dict | None = None
    protected_attributes: list[str] = field(default_factory=list)
    jurisdiction: str | None = None
    clinical_domain: str | None = None
    intersectional: bool = False
    bootstrap: bool = False
    n_bootstrap: int = 1000
    output_dir: str = "./parityscope_output"
    output_formats: list[str] = field(default_factory=lambda: ["pdf", "json"])
    include_root_cause: bool = True
    include_recommendations: bool = True
    include_executive_summary: bool = True
    thresholds: dict[str, float] | None = None
    device_info: dict | None = None


def load_config(path: str | Path) -> AuditConfig:
    """Load an AuditConfig from a YAML or JSON file.

    The file format is detected by extension: .yaml/.yml for YAML, .json for JSON.

    Args:
        path: Path to the configuration file.

    Returns:
        Populated AuditConfig instance.

    Raises:
        FileNotFoundError: If the config file does not exist.
        ValueError: If the file extension is not recognized.
    """
    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(f"Configuration file not found: {path}")

    raw_text = path.read_text(encoding="utf-8")

    if path.suffix in (".yaml", ".yml"):
        data = yaml.safe_load(raw_text) or {}
    elif path.suffix == ".json":
        data = json.loads(raw_text)
    else:
        raise ValueError(
            f"Unsupported config file extension '{path.suffix}'. "
            "Use .yaml, .yml, or .json."
        )

    if not isinstance(data, dict):
        raise ValueError("Configuration file must contain a top-level mapping/object.")

    # Normalise keys: allow both snake_case and kebab-case
    normalised = {k.replace("-", "_"): v for k, v in data.items()}

    return AuditConfig(
        model_name=normalised.get("model_name", ""),
        data_path=normalised.get("data_path", ""),
        column_map=normalised.get("column_map"),
        protected_attributes=normalised.get("protected_attributes", []),
        jurisdiction=normalised.get("jurisdiction"),
        clinical_domain=normalised.get("clinical_domain"),
        intersectional=bool(normalised.get("intersectional", False)),
        bootstrap=bool(normalised.get("bootstrap", False)),
        n_bootstrap=int(normalised.get("n_bootstrap", 1000)),
        output_dir=normalised.get("output_dir", "./parityscope_output"),
        output_formats=normalised.get("output_formats", ["pdf", "json"]),
        include_root_cause=bool(normalised.get("include_root_cause", True)),
        include_recommendations=bool(normalised.get("include_recommendations", True)),
        include_executive_summary=bool(normalised.get("include_executive_summary", True)),
        thresholds=normalised.get("thresholds"),
        device_info=normalised.get("device_info"),
    )


def config_to_dict(config: AuditConfig) -> dict:
    """Serialise an AuditConfig to a plain dictionary.

    Args:
        config: The AuditConfig instance to serialise.

    Returns:
        Dictionary representation suitable for JSON/YAML export.
    """
    return asdict(config)


def generate_sample_config(output_path: str | Path) -> None:
    """Write a well-commented sample YAML configuration file.

    Args:
        output_path: Destination file path for the sample config.
    """
    sample = """\
# ============================================================================
# ParityScope — Fairness Audit Configuration
# ============================================================================
# This file configures a complete fairness audit run. Adjust the values below
# to match your model, dataset, and regulatory requirements.

# ---------- Model & Data ----------------------------------------------------

# Identifier for the model being audited (required)
model_name: "my_clinical_model_v1"

# Path to the dataset file — CSV or Excel (required)
data_path: "./data/patient_data.csv"

# Map logical column names to your actual column names.
# Only specify the columns that differ from the defaults.
column_map:
  predictions: "predicted_label"   # Binary model predictions (0/1)
  labels: "true_label"             # Ground-truth outcomes (0/1)
  scores: "risk_score"             # Continuous probability scores (optional)
  # demographics columns are listed under protected_attributes

# Protected demographic attributes to evaluate (required, at least one)
protected_attributes:
  - race
  - sex
  - age_group

# ---------- Regulatory Context ----------------------------------------------

# Jurisdiction determines which metrics and compliance checks are applied.
# Options: eu-ai-act, section-1557, south-korea, taiwan
jurisdiction: "eu-ai-act"

# Clinical domain refines metric selection for your use case.
# Options: diagnosis, risk_stratification, treatment_recommendation,
#          resource_allocation, triage
clinical_domain: "diagnosis"

# ---------- Analysis Options ------------------------------------------------

# Intersectional analysis evaluates combinations of attributes (e.g., race x sex)
intersectional: false

# Bootstrap confidence intervals for disparity estimates
bootstrap: false
n_bootstrap: 1000

# Include optional analysis components
include_root_cause: true
include_recommendations: true
include_executive_summary: true

# ---------- Output ----------------------------------------------------------

# Directory where reports and evidence packages are saved
output_dir: "./parityscope_output"

# Output formats: pdf, json, or both
output_formats:
  - pdf
  - json

# ---------- Custom Thresholds -----------------------------------------------
# Override default fairness thresholds (disparity values).
# Default: fair <= 0.05, marginal <= 0.10, above = unfair
# thresholds:
#   fair: 0.05
#   marginal: 0.10

# ---------- FDA Device Info (optional) --------------------------------------
# Required only when generating FDA-specific reports.
# device_info:
#   device_name: "MyDevice AI"
#   device_class: "Class II"
#   submission_type: "510(k)"
#   predicate_device: "K123456"
"""
    Path(output_path).write_text(sample, encoding="utf-8")
