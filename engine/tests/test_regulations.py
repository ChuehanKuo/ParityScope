"""Tests for regulation mapping."""

import pytest

from parityscope.regulations.mapping import (
    get_recommended_metrics,
    get_compliance_requirements,
    get_jurisdiction_profile,
    list_jurisdictions,
)


class TestJurisdictions:
    def test_list_jurisdictions(self):
        jurisdictions = list_jurisdictions()
        assert "eu-ai-act" in jurisdictions
        assert "south-korea" in jurisdictions
        assert "taiwan" in jurisdictions
        assert "section-1557" in jurisdictions
        assert "fda" in jurisdictions
        assert "nist-ai-rmf" in jurisdictions

    def test_unknown_jurisdiction_raises(self):
        with pytest.raises(ValueError, match="Unknown jurisdiction"):
            get_recommended_metrics("nonexistent")


class TestEuAiAct:
    def test_default_metrics(self):
        metrics = get_recommended_metrics("eu-ai-act")
        assert "demographic_parity" in metrics
        assert "equal_opportunity" in metrics
        assert len(metrics) >= 5

    def test_diagnosis_domain_metrics(self):
        metrics = get_recommended_metrics("eu-ai-act", clinical_domain="diagnosis")
        # Diagnosis should prioritize sensitivity-related metrics
        assert "equal_opportunity" in metrics
        assert "false_negative_rate_parity" in metrics

    def test_risk_stratification_includes_calibration(self):
        metrics = get_recommended_metrics(
            "eu-ai-act", clinical_domain="risk_stratification"
        )
        assert "calibration_difference" in metrics

    def test_compliance_requirements(self):
        reqs = get_compliance_requirements("eu-ai-act")
        assert len(reqs) > 0
        articles = [r.article for r in reqs]
        assert "Article 9" in articles  # Risk management
        # Article 10 citation is now specific to bias-related sub-provisions
        assert any(a.startswith("Article 10") for a in articles)  # Data governance
        assert "Article 15" in articles  # Accuracy
        # Post-market monitoring is Article 72 in Regulation 2024/1689
        # (formerly Article 61 in the 2021 proposal — commonly miscited).
        assert "Article 72" in articles
        assert "Article 61" not in articles
        # Penalty citation must reference the high-risk tier (Art. 99(4), 3%),
        # not the prohibited-AI tier (Art. 99(3), 7%).
        assert "Article 99(4)" in articles

    def test_profile_has_protected_attributes(self):
        profile = get_jurisdiction_profile("eu-ai-act")
        assert "race_ethnicity" in profile.protected_attributes
        assert "sex_gender" in profile.protected_attributes


class TestSection1557:
    def test_default_metrics(self):
        metrics = get_recommended_metrics("section-1557")
        assert "treatment_equality" in metrics  # Unique to 1557

    def test_disparate_impact_requirement(self):
        reqs = get_compliance_requirements("section-1557")
        assert any("disparate impact" in r.requirement.lower() for r in reqs)


class TestFda:
    def test_profile_loads(self):
        profile = get_jurisdiction_profile("fda")
        assert profile.name.startswith("FDA")
        assert profile.enforcement_date is None

    def test_references_gmlp_principles(self):
        reqs = get_compliance_requirements("fda")
        articles = [r.article for r in reqs]
        assert any("Guiding Principle" in a for a in articles)
        assert any("21 CFR 820" in a for a in articles)

    def test_diagnosis_domain_metrics(self):
        metrics = get_recommended_metrics("fda", clinical_domain="diagnosis")
        assert "equal_opportunity" in metrics
        assert "false_negative_rate_parity" in metrics
        assert "calibration_difference" in metrics


class TestNistAiRmf:
    def test_profile_loads(self):
        profile = get_jurisdiction_profile("nist-ai-rmf")
        assert "NIST" in profile.name
        assert profile.enforcement_date is None  # voluntary framework

    def test_references_nist_functions(self):
        reqs = get_compliance_requirements("nist-ai-rmf")
        articles = [r.article for r in reqs]
        assert any(a.startswith("GOVERN") for a in articles)
        assert any(a.startswith("MAP") for a in articles)
        assert any(a.startswith("MEASURE") for a in articles)
        assert any(a.startswith("MANAGE") for a in articles)


class TestDomainSpecificMetrics:
    def test_treatment_recommendation_domain(self):
        metrics = get_recommended_metrics(
            "eu-ai-act", clinical_domain="treatment_recommendation"
        )
        assert "equalized_odds" in metrics
        assert "treatment_equality" in metrics

    def test_unknown_domain_uses_defaults(self):
        metrics = get_recommended_metrics("eu-ai-act", clinical_domain="unknown_domain")
        default_metrics = get_recommended_metrics("eu-ai-act")
        assert metrics == default_metrics
