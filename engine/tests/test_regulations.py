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
        assert "Article 10" in articles  # Data governance
        assert "Article 15" in articles  # Accuracy

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
