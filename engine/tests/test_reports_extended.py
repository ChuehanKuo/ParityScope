"""Tests for new report generators — EU AI Act, FDA, Section 1557, checklist, evidence, executive summary."""

import pytest

from parityscope.audit.result import FairnessLevel
from parityscope.reports.eu_ai_act import generate_eu_ai_act_report
from parityscope.reports.fda_premarket import generate_fda_report
from parityscope.reports.section_1557 import generate_section_1557_report
from parityscope.reports.checklist import (
    ComplianceChecklist,
    generate_compliance_checklist,
    checklist_to_dict,
    checklist_to_pdf,
)
from parityscope.reports.evidence_package import create_evidence_package
from parityscope.reports.executive_summary import (
    generate_executive_summary,
    generate_executive_summary_pdf,
)


class TestEuAiActReport:
    """Tests for EU AI Act report generation."""

    def test_generates_pdf_bytes(self, sample_audit_result):
        pdf_bytes = generate_eu_ai_act_report(sample_audit_result)
        assert isinstance(pdf_bytes, bytes)
        assert len(pdf_bytes) > 100
        assert pdf_bytes[:5] == b"%PDF-"

    def test_saves_to_file(self, sample_audit_result, tmp_path):
        out = tmp_path / "eu_report.pdf"
        pdf_bytes = generate_eu_ai_act_report(sample_audit_result, output_path=str(out))
        assert out.exists()
        assert out.read_bytes() == pdf_bytes


class TestFdaReport:
    """Tests for FDA premarket report."""

    def test_generates_pdf_bytes(self, sample_audit_result):
        pdf_bytes = generate_fda_report(sample_audit_result)
        assert isinstance(pdf_bytes, bytes)
        assert len(pdf_bytes) > 100
        assert pdf_bytes[:5] == b"%PDF-"

    def test_with_device_info(self, sample_audit_result):
        device_info = {
            "device_name": "TestDevice",
            "device_class": "Class III",
            "submission_type": "PMA",
        }
        pdf_bytes = generate_fda_report(sample_audit_result, device_info=device_info)
        assert isinstance(pdf_bytes, bytes)
        assert len(pdf_bytes) > 100

    def test_saves_to_file(self, sample_audit_result, tmp_path):
        out = tmp_path / "fda_report.pdf"
        generate_fda_report(sample_audit_result, output_path=str(out))
        assert out.exists()


class TestSection1557Report:
    """Tests for Section 1557 report."""

    def test_generates_pdf_bytes(self, sample_audit_result):
        pdf_bytes = generate_section_1557_report(sample_audit_result)
        assert isinstance(pdf_bytes, bytes)
        assert len(pdf_bytes) > 100
        assert pdf_bytes[:5] == b"%PDF-"

    def test_saves_to_file(self, sample_audit_result, tmp_path):
        out = tmp_path / "1557_report.pdf"
        generate_section_1557_report(sample_audit_result, output_path=str(out))
        assert out.exists()


class TestChecklist:
    """Tests for compliance checklist generation."""

    def test_generates_checklist(self, sample_audit_result):
        checklist = generate_compliance_checklist(sample_audit_result)
        assert isinstance(checklist, ComplianceChecklist)
        assert checklist.jurisdiction == "eu-ai-act"
        assert len(checklist.items) > 0
        total = checklist.pass_count + checklist.fail_count + checklist.partial_count
        assert total <= len(checklist.items)

    def test_checklist_to_dict(self, sample_audit_result):
        checklist = generate_compliance_checklist(sample_audit_result)
        d = checklist_to_dict(checklist)
        assert "items" in d
        assert "pass_count" in d
        assert "jurisdiction" in d

    def test_checklist_to_pdf(self, sample_audit_result):
        checklist = generate_compliance_checklist(sample_audit_result)
        pdf_bytes = checklist_to_pdf(checklist)
        assert isinstance(pdf_bytes, bytes)
        assert pdf_bytes[:5] == b"%PDF-"

    def test_no_jurisdiction_returns_empty_checklist(self):
        from parityscope.audit.result import AuditResult, FairnessLevel
        result = AuditResult(
            audit_id="x",
            model_name="m",
            timestamp="2025-01-01",
            protected_attributes=(),
            metrics_evaluated=(),
            jurisdiction=None,
            clinical_domain=None,
            thresholds={},
            metric_results=(),
            overall_fairness=FairnessLevel.FAIR,
            total_samples=0,
            group_counts={},
        )
        checklist = generate_compliance_checklist(result)
        assert checklist.jurisdiction == "none"
        assert len(checklist.items) == 0


class TestEvidencePackage:
    """Tests for evidence package creation."""

    def test_creates_package(self, sample_audit_result, tmp_path):
        result_path = create_evidence_package(
            sample_audit_result, output_dir=str(tmp_path), compress=False,
        )
        assert result_path.exists()
        assert result_path.is_dir()
        # Should contain key files
        files = [f.name for f in result_path.iterdir()]
        assert "report.json" in files
        assert "methodology.md" in files
        assert "metrics_summary.csv" in files

    def test_creates_zip(self, sample_audit_result, tmp_path):
        result_path = create_evidence_package(
            sample_audit_result, output_dir=str(tmp_path), compress=True,
        )
        assert result_path.suffix == ".zip"
        assert result_path.exists()

    def test_checksums_file(self, sample_audit_result, tmp_path):
        result_path = create_evidence_package(
            sample_audit_result, output_dir=str(tmp_path), compress=False,
        )
        checksums = result_path / "checksums.sha256"
        assert checksums.exists()
        content = checksums.read_text()
        assert "report.json" in content


class TestExecutiveSummary:
    """Tests for executive summary generation."""

    def test_text_summary(self, sample_audit_result):
        text = generate_executive_summary(sample_audit_result)
        assert isinstance(text, str)
        assert "EXECUTIVE SUMMARY" in text
        assert sample_audit_result.model_name in text
        assert "KEY NUMBERS" in text

    def test_verdict_fair(self):
        from parityscope.audit.result import AuditResult, FairnessLevel
        result = AuditResult(
            audit_id="x",
            model_name="fair_model",
            timestamp="2025-01-01",
            protected_attributes=("race",),
            metrics_evaluated=("demographic_parity",),
            jurisdiction="eu-ai-act",
            clinical_domain=None,
            thresholds={"fair": 0.05, "marginal": 0.10},
            metric_results=(),
            overall_fairness=FairnessLevel.FAIR,
            total_samples=100,
            group_counts={"A": 50, "B": 50},
        )
        text = generate_executive_summary(result)
        assert "PASSES" in text

    def test_verdict_unfair(self, sample_audit_result):
        text = generate_executive_summary(sample_audit_result)
        if sample_audit_result.overall_fairness == FairnessLevel.UNFAIR:
            assert "FAILS" in text or "REVIEW" in text

    def test_pdf_summary(self, sample_audit_result):
        pdf_bytes = generate_executive_summary_pdf(sample_audit_result)
        assert isinstance(pdf_bytes, bytes)
        assert pdf_bytes[:5] == b"%PDF-"

    def test_pdf_saves_to_file(self, sample_audit_result, tmp_path):
        out = tmp_path / "exec_summary.pdf"
        generate_executive_summary_pdf(sample_audit_result, output_path=str(out))
        assert out.exists()
