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
        description="European Union Artificial Intelligence Act (Regulation 2024/1689) — healthcare AI classified as high-risk under Annex III (critical infrastructure / access to essential services) and Annex I (medical devices via sectoral harmonisation)",
        effective_date="2024-08-01",
        enforcement_date="2027-08-01",
        penalty_description=(
            "High-risk AI violations: up to EUR 15 million or 3% of global annual turnover "
            "(Article 99(4)). Note: the EUR 35M / 7% figure applies only to prohibited-AI "
            "breaches under Article 99(3). High-risk obligations were originally targeted "
            "for 2 Aug 2026 but are likely to be delayed to Dec 2027 (Annex III systems) "
            "or 2 Aug 2028 (Annex I / medical devices) per the 2025 Digital Omnibus package; "
            "2027-08-01 is used here as a realistic enforcement floor."
        ),
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
                description="Establish and maintain a risk management system throughout the AI system lifecycle covering all known and foreseeable risks. Note: Article 9 is general — bias-specific obligations live in Article 10(2)(f-h) and Article 15.",
                evidence_needed="Risk management documentation linking identified risks to mitigations across the lifecycle",
            ),
            ComplianceRequirement(
                regulation="EU AI Act",
                article="Article 10(2)(f-h)",
                requirement="Data governance — bias examination and mitigation",
                description="Training, validation, and testing datasets shall be subject to data governance practices including: (f) examination in view of possible biases likely to affect health and safety or lead to prohibited discrimination; (g) appropriate measures to detect, prevent, and mitigate such biases; (h) identification of relevant data gaps or shortcomings.",
                evidence_needed="Data governance report documenting bias examination results, mitigation measures applied, and residual data gaps",
            ),
            ComplianceRequirement(
                regulation="EU AI Act",
                article="Article 13(3)(b)",
                requirement="Transparency — performance metrics by demographic",
                description="Instructions for use shall include the level of accuracy, robustness, and cybersecurity against which the high-risk AI system has been tested and validated, including performance as regards the specific persons or groups of persons on which the system is intended to be used.",
                evidence_needed="Instructions for use documenting per-group performance metrics and known limitations by demographic",
            ),
            ComplianceRequirement(
                regulation="EU AI Act",
                article="Article 14",
                requirement="Human oversight",
                description="High-risk AI systems shall be designed to be effectively overseen by natural persons during their period of use, including the ability to detect and address anomalies, dysfunctions, and unexpected performance.",
                evidence_needed="Human oversight protocol with trigger conditions for intervention and documented operator training",
            ),
            ComplianceRequirement(
                regulation="EU AI Act",
                article="Article 15",
                requirement="Accuracy, robustness, cybersecurity",
                description="High-risk AI systems shall achieve appropriate levels of accuracy, robustness, and cybersecurity and shall perform consistently throughout their lifecycle. Declared accuracy levels and relevant metrics must be documented per Annex IV(2)(g).",
                evidence_needed="Fairness audit report with per-group performance metrics, robustness testing results, and Annex IV(2)(g) technical documentation",
            ),
            ComplianceRequirement(
                regulation="EU AI Act",
                article="Article 72",
                requirement="Post-market monitoring",
                description="Providers shall establish and document a post-market monitoring system proportionate to the nature of the technologies and risks, collecting, documenting, and analysing relevant data on performance throughout the lifetime of the system. (Article 72 in Regulation 2024/1689; formerly Article 61 in the 2021 proposal, renumbered during trilogue.)",
                evidence_needed="Post-market monitoring plan and continuous fairness-drift dashboard with incident-reporting triggers",
            ),
            ComplianceRequirement(
                regulation="EU AI Act",
                article="Article 99(4)",
                requirement="Penalty regime for high-risk AI violations",
                description="Non-compliance with provisions applicable to high-risk AI systems (Articles 8-15, 17, etc.) subjects providers to administrative fines of up to EUR 15 million or 3% of total worldwide annual turnover, whichever is higher. The higher EUR 35M / 7% tier under Article 99(3) applies only to prohibited-AI breaches.",
                evidence_needed="Governance evidence demonstrating compliance with Articles 8-15 to avoid Article 99(4) penalties",
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
    "fda": JurisdictionProfile(
        id="fda",
        name="FDA AI/ML-Enabled Medical Devices",
        description="US Food and Drug Administration regulatory framework for AI-enabled medical device software (SaMD)",
        effective_date="2021-01-01",
        enforcement_date=None,
        penalty_description="Non-approval, market withdrawal, or enforcement action for premarket violations",
        recommended_metrics=(
            "equal_opportunity",
            "false_positive_rate_parity",
            "false_negative_rate_parity",
            "calibration_difference",
            "accuracy_parity",
        ),
        domain_metrics={
            "diagnosis": (
                "equal_opportunity",
                "false_negative_rate_parity",
                "calibration_difference",
            ),
            "risk_stratification": (
                "calibration_difference",
                "predictive_parity",
                "false_positive_rate_parity",
            ),
            "treatment_recommendation": (
                "accuracy_parity",
                "predictive_parity",
            ),
        },
        requirements=(
            ComplianceRequirement(
                regulation="FDA GMLP",
                article="Guiding Principle 1",
                requirement="Multi-disciplinary expertise is leveraged throughout the total product life cycle",
                description="Depth of understanding of clinical workflow, model integration, and patient population is assured through engagement of clinical, data-science, human-factors, and regulatory expertise across the device lifecycle.",
                evidence_needed="Documentation of cross-functional review (clinical, data science, regulatory, human factors) with sign-offs at key lifecycle milestones",
            ),
            ComplianceRequirement(
                regulation="FDA GMLP",
                article="Guiding Principle 4",
                requirement="Model design is suited to the available data and reflects the intended use",
                description="Model design considers the intended use and patient population, incorporates known biases and limitations of the training data, and is aligned to mitigate risks of unfair performance across subgroups.",
                evidence_needed="Model design rationale document linking intended use, population characteristics, and bias-mitigation design choices",
            ),
            ComplianceRequirement(
                regulation="FDA GMLP",
                article="Guiding Principle 5",
                requirement="Training data sets are independent of test sets",
                description="Training, tuning, and test datasets are selected and maintained to be appropriately independent of one another. Data are collected in a manner that addresses relevant issues of bias, generalisability, and the intended patient population.",
                evidence_needed="Data partitioning documentation demonstrating independence and representativeness of training / validation / test splits",
            ),
            ComplianceRequirement(
                regulation="FDA GMLP",
                article="Guiding Principle 8",
                requirement="Testing demonstrates device performance during clinically relevant conditions",
                description="Performance is evaluated on statistically meaningful test datasets representative of the intended patient population, including relevant subpopulations (e.g., race, ethnicity, sex, age, disease severity) to surface performance disparities.",
                evidence_needed="Subpopulation performance report with per-group metrics, confidence intervals, and sample adequacy analysis",
            ),
            ComplianceRequirement(
                regulation="FDA",
                article="21 CFR 820",
                requirement="Quality System Regulation",
                description="Manufacturers of finished medical devices must establish and maintain a quality system that covers design controls, document controls, production and process controls, and corrective / preventive action (CAPA). AI/ML devices inherit these obligations.",
                evidence_needed="QMS documentation covering design controls, CAPA, and change-management procedures for the AI/ML device",
            ),
            ComplianceRequirement(
                regulation="FDA Draft Guidance (Jan 2025)",
                article="AI-Enabled Device Software Functions / PCCP",
                requirement="Predetermined Change Control Plan for AI/ML modifications",
                description="Draft guidance on Marketing Submission Recommendations for a Predetermined Change Control Plan (PCCP) for AI-Enabled Device Software Functions (January 2025) permits pre-specified modifications to AI/ML devices post-authorisation, provided the manufacturer specifies the modification protocol, impact assessment, and performance-monitoring approach.",
                evidence_needed="PCCP specifying allowable modifications, modification protocol, and post-deployment monitoring plan with bias-surveillance triggers",
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
    "nist-ai-rmf": JurisdictionProfile(
        id="nist-ai-rmf",
        name="NIST AI Risk Management Framework 1.0",
        description="Voluntary US federal framework for managing AI risks",
        effective_date="2023-01-26",
        enforcement_date=None,
        penalty_description=(
            "Voluntary framework; increasingly referenced in federal procurement and state "
            "AI laws (Colorado, Texas, California)"
        ),
        recommended_metrics=(
            "equal_opportunity",
            "false_positive_rate_parity",
            "false_negative_rate_parity",
            "calibration_difference",
            "accuracy_parity",
        ),
        domain_metrics={
            "diagnosis": (
                "equal_opportunity",
                "false_negative_rate_parity",
                "calibration_difference",
            ),
            "risk_stratification": (
                "calibration_difference",
                "predictive_parity",
                "false_positive_rate_parity",
            ),
            "treatment_recommendation": (
                "accuracy_parity",
                "predictive_parity",
            ),
        },
        requirements=(
            ComplianceRequirement(
                regulation="NIST AI RMF 1.0",
                article="GOVERN 1.4",
                requirement="Risk management activities are integrated across the AI lifecycle",
                description="The risk management process and its outcomes are established through transparent policies, procedures, and other controls based on organisational risk priorities. Activities are integrated across design, development, deployment, and monitoring.",
                evidence_needed="Organisational AI risk management policy mapping controls to each lifecycle stage",
            ),
            ComplianceRequirement(
                regulation="NIST AI RMF 1.0",
                article="MAP 2.3",
                requirement="Context of use documented",
                description="The scientific integrity and TEVV considerations are identified and documented, including those relating to the sociotechnical context, intended users, purposes, and potential negative impacts.",
                evidence_needed="Context-of-use memo documenting deployment setting, intended users, and foreseeable negative impacts",
            ),
            ComplianceRequirement(
                regulation="NIST AI RMF 1.0",
                article="MEASURE 2.11",
                requirement="Fairness evaluation criteria defined and applied",
                description="Fairness and bias — as identified in the MAP function — are evaluated and results are documented. Metrics, protected attributes, and thresholds are pre-specified and justified for the intended use.",
                evidence_needed="Fairness evaluation plan listing metrics, protected attributes, thresholds, and documented results",
            ),
            ComplianceRequirement(
                regulation="NIST AI RMF 1.0",
                article="MANAGE 2.2",
                requirement="Risk treatment documented",
                description="Mechanisms are in place and applied to sustain the value of deployed AI systems, with risk responses (accept, mitigate, transfer, avoid) documented and reviewed on a defined cadence.",
                evidence_needed="Risk register with documented treatment decisions and review cadence",
            ),
            ComplianceRequirement(
                regulation="NIST AI 600-1 (Jul 2024)",
                article="GenAI Profile",
                requirement="Generative AI risk considerations",
                description="The NIST Generative AI Profile (NIST-AI-600-1, July 2024) extends the AI RMF with GenAI-specific risks including confabulation, data privacy, harmful bias / homogenisation, and value-chain / component integration. Applies when the audited system incorporates generative components.",
                evidence_needed="GenAI risk assessment referencing NIST-AI-600-1 suggested actions where generative components are used",
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
