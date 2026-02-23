"""Regulatory mapping — jurisdiction + clinical domain -> metrics + requirements.

This is ParityScope's proprietary knowledge base. Each regulation has different
emphasis areas and the "impossibility theorem" of fairness means you can't
satisfy all metrics simultaneously. This module makes that an explicit,
structured decision rather than an arbitrary one.
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class ComplianceRequirement:
    """A specific compliance requirement from a regulation."""

    regulation: str
    article: str
    requirement: str
    description: str
    evidence_needed: str


@dataclass(frozen=True)
class JurisdictionProfile:
    """Complete profile of a regulatory jurisdiction's fairness requirements."""

    id: str
    name: str
    description: str
    effective_date: str
    enforcement_date: str | None
    penalty_description: str
    # Metrics recommended for this jurisdiction
    recommended_metrics: tuple[str, ...]
    # Additional metrics by clinical domain
    domain_metrics: dict[str, tuple[str, ...]] = field(default_factory=dict)
    # Compliance requirements
    requirements: tuple[ComplianceRequirement, ...] = field(default_factory=tuple)
    # Protected attributes specifically mentioned
    protected_attributes: tuple[str, ...] = field(default_factory=tuple)


# ---------------------------------------------------------------------------
# Jurisdiction Profiles
# ---------------------------------------------------------------------------

_JURISDICTIONS: dict[str, JurisdictionProfile] = {
    "eu-ai-act": JurisdictionProfile(
        id="eu-ai-act",
        name="EU AI Act",
        description="European Union Artificial Intelligence Act — healthcare AI classified as high-risk",
        effective_date="2024-08-01",
        enforcement_date="2027-08-01",
        penalty_description="Up to EUR 35 million or 7% of global annual turnover",
        recommended_metrics=(
            "demographic_parity",
            "equal_opportunity",
            "equalized_odds",
            "predictive_parity",
            "false_positive_rate_parity",
            "false_negative_rate_parity",
            "accuracy_parity",
        ),
        domain_metrics={
            "diagnosis": (
                "equal_opportunity",
                "false_negative_rate_parity",
                "predictive_parity",
                "calibration_difference",
            ),
            "risk_stratification": (
                "calibration_difference",
                "well_calibration",
                "score_distribution_difference",
                "demographic_parity",
                "equal_opportunity",
            ),
            "treatment_recommendation": (
                "equalized_odds",
                "treatment_equality",
                "predictive_parity",
                "false_discovery_rate_parity",
            ),
            "resource_allocation": (
                "demographic_parity",
                "equalized_odds",
                "false_positive_rate_parity",
                "false_negative_rate_parity",
            ),
            "triage": (
                "equal_opportunity",
                "false_negative_rate_parity",
                "demographic_parity",
                "accuracy_parity",
            ),
        },
        requirements=(
            ComplianceRequirement(
                regulation="EU AI Act",
                article="Article 9",
                requirement="Risk management system",
                description="Establish and maintain a risk management system throughout the AI system lifecycle, including identification and analysis of known and foreseeable risks of bias",
                evidence_needed="Risk management documentation with bias risk analysis",
            ),
            ComplianceRequirement(
                regulation="EU AI Act",
                article="Article 10",
                requirement="Data governance",
                description="Training, validation, and testing datasets shall be subject to data governance practices including examination for possible biases",
                evidence_needed="Data governance report with bias examination results",
            ),
            ComplianceRequirement(
                regulation="EU AI Act",
                article="Article 15",
                requirement="Accuracy, robustness, cybersecurity",
                description="High-risk AI systems shall be designed to achieve appropriate levels of accuracy and shall perform consistently across groups",
                evidence_needed="Fairness audit report with per-group performance metrics",
            ),
            ComplianceRequirement(
                regulation="EU AI Act",
                article="Article 13",
                requirement="Transparency",
                description="High-risk AI systems shall be designed to enable users to interpret the output and use it appropriately",
                evidence_needed="Model documentation with fairness metric explanations",
            ),
            ComplianceRequirement(
                regulation="EU AI Act",
                article="Article 61",
                requirement="Post-market monitoring",
                description="Providers shall establish a post-market monitoring system to continuously evaluate fairness throughout the system lifecycle",
                evidence_needed="Continuous monitoring dashboard with fairness drift alerts",
            ),
        ),
        protected_attributes=(
            "race_ethnicity",
            "sex_gender",
            "age",
            "disability",
            "religion",
            "nationality",
            "socioeconomic_status",
        ),
    ),
    "south-korea": JurisdictionProfile(
        id="south-korea",
        name="South Korea AI Framework Act",
        description="South Korea's AI regulatory framework with emphasis on high-impact AI",
        effective_date="2026-01-01",
        enforcement_date=None,
        penalty_description="Regulatory enforcement under development",
        recommended_metrics=(
            "demographic_parity",
            "equal_opportunity",
            "equalized_odds",
            "accuracy_parity",
            "false_negative_rate_parity",
        ),
        domain_metrics={
            "diagnosis": (
                "equal_opportunity",
                "false_negative_rate_parity",
                "calibration_difference",
            ),
            "risk_stratification": (
                "calibration_difference",
                "demographic_parity",
                "equal_opportunity",
            ),
        },
        requirements=(
            ComplianceRequirement(
                regulation="South Korea AI Framework Act",
                article="Impact Assessment",
                requirement="AI impact assessment",
                description="Conduct impact assessments for high-impact AI systems including evaluation of fairness and bias",
                evidence_needed="Impact assessment report with fairness evaluation",
            ),
        ),
        protected_attributes=("sex_gender", "age", "disability", "nationality"),
    ),
    "taiwan": JurisdictionProfile(
        id="taiwan",
        name="Taiwan AI Basic Act",
        description="Taiwan's AI Basic Act establishing governance requirements for AI systems",
        effective_date="2025-12-01",
        enforcement_date=None,
        penalty_description="Regulatory framework under development",
        recommended_metrics=(
            "demographic_parity",
            "equal_opportunity",
            "accuracy_parity",
            "predictive_parity",
        ),
        domain_metrics={
            "diagnosis": (
                "equal_opportunity",
                "false_negative_rate_parity",
            ),
        },
        requirements=(
            ComplianceRequirement(
                regulation="Taiwan AI Basic Act",
                article="Fairness Principle",
                requirement="Non-discrimination in AI outcomes",
                description="AI systems shall not produce discriminatory outcomes based on protected characteristics",
                evidence_needed="Fairness audit report demonstrating non-discrimination",
            ),
        ),
        protected_attributes=("sex_gender", "age", "ethnicity", "disability"),
    ),
    "section-1557": JurisdictionProfile(
        id="section-1557",
        name="Section 1557 (ACA)",
        description="Section 1557 of the Affordable Care Act — prohibits discrimination in healthcare programs receiving federal funding, including AI systems",
        effective_date="2010-03-23",
        enforcement_date="2010-03-23",
        penalty_description="Loss of federal funding, civil penalties, private right of action",
        recommended_metrics=(
            "demographic_parity",
            "equal_opportunity",
            "equalized_odds",
            "false_positive_rate_parity",
            "false_negative_rate_parity",
            "treatment_equality",
        ),
        domain_metrics={
            "diagnosis": (
                "equal_opportunity",
                "false_negative_rate_parity",
                "predictive_parity",
            ),
            "risk_stratification": (
                "demographic_parity",
                "calibration_difference",
                "equal_opportunity",
            ),
            "treatment_recommendation": (
                "equalized_odds",
                "treatment_equality",
                "false_discovery_rate_parity",
            ),
            "resource_allocation": (
                "demographic_parity",
                "equalized_odds",
                "false_positive_rate_parity",
            ),
        },
        requirements=(
            ComplianceRequirement(
                regulation="Section 1557",
                article="42 USC 18116",
                requirement="Non-discrimination",
                description="No individual shall be excluded from participation, denied benefits, or subjected to discrimination under any health program on the basis of race, color, national origin, sex, age, or disability",
                evidence_needed="Fairness audit demonstrating non-discriminatory outcomes across protected classes",
            ),
            ComplianceRequirement(
                regulation="Section 1557",
                article="Disparate Impact",
                requirement="Disparate impact analysis",
                description="Even facially neutral AI systems must not have unjustified disparate impact on protected groups",
                evidence_needed="Statistical analysis of outcomes by protected group with justification for any identified disparities",
            ),
        ),
        protected_attributes=(
            "race_ethnicity",
            "sex_gender",
            "age",
            "disability",
            "national_origin",
        ),
    ),
}


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------


def get_recommended_metrics(
    jurisdiction: str,
    clinical_domain: str | None = None,
) -> list[str]:
    """Get recommended fairness metrics for a jurisdiction and clinical domain.

    Args:
        jurisdiction: Regulatory jurisdiction ID (e.g., "eu-ai-act").
        clinical_domain: Optional clinical use case (e.g., "diagnosis",
            "risk_stratification", "treatment_recommendation").

    Returns:
        Ordered list of recommended metric names.
    """
    profile = _JURISDICTIONS.get(jurisdiction)
    if profile is None:
        available = ", ".join(sorted(_JURISDICTIONS.keys()))
        raise ValueError(f"Unknown jurisdiction '{jurisdiction}'. Available: {available}")

    if clinical_domain and clinical_domain in profile.domain_metrics:
        # Domain-specific metrics take priority, then add general ones
        domain = list(profile.domain_metrics[clinical_domain])
        general = [m for m in profile.recommended_metrics if m not in domain]
        return domain + general

    return list(profile.recommended_metrics)


def get_compliance_requirements(jurisdiction: str) -> list[ComplianceRequirement]:
    """Get compliance requirements for a jurisdiction."""
    profile = _JURISDICTIONS.get(jurisdiction)
    if profile is None:
        available = ", ".join(sorted(_JURISDICTIONS.keys()))
        raise ValueError(f"Unknown jurisdiction '{jurisdiction}'. Available: {available}")
    return list(profile.requirements)


def get_jurisdiction_profile(jurisdiction: str) -> JurisdictionProfile:
    """Get the full jurisdiction profile."""
    profile = _JURISDICTIONS.get(jurisdiction)
    if profile is None:
        available = ", ".join(sorted(_JURISDICTIONS.keys()))
        raise ValueError(f"Unknown jurisdiction '{jurisdiction}'. Available: {available}")
    return profile


def list_jurisdictions() -> list[str]:
    """List all available jurisdiction IDs."""
    return sorted(_JURISDICTIONS.keys())
