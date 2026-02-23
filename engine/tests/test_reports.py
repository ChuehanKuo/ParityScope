"""Tests for report generation."""

import json

from parityscope.audit.engine import FairnessAudit
from parityscope.reports.generator import generate_json_report, generate_summary


class TestReportGeneration:
    def test_json_report(self, binary_dataset):
        audit = FairnessAudit(
            model_name="test_model",
            protected_attributes=["race"],
            jurisdiction="eu-ai-act",
        )
        result = audit.run(
            y_true=binary_dataset["y_true"],
            y_pred=binary_dataset["y_pred"],
            demographics=binary_dataset["demographics"],
        )

        report_json = generate_json_report(result)
        parsed = json.loads(report_json)

        assert parsed["model_name"] == "test_model"
        assert "compliance" in parsed
        assert len(parsed["compliance"]["requirements"]) > 0

    def test_summary_report(self, binary_dataset):
        audit = FairnessAudit(
            model_name="sepsis_risk_v2",
            protected_attributes=["race"],
            jurisdiction="eu-ai-act",
            clinical_domain="risk_stratification",
        )
        result = audit.run(
            y_true=binary_dataset["y_true"],
            y_pred=binary_dataset["y_pred"],
            demographics=binary_dataset["demographics"],
        )

        summary = generate_summary(result)

        assert "PARITYSCOPE FAIRNESS AUDIT REPORT" in summary
        assert "sepsis_risk_v2" in summary
        assert "OVERALL ASSESSMENT" in summary
        assert "race:A" in summary
        assert "race:B" in summary

    def test_json_report_without_jurisdiction(self, binary_dataset):
        audit = FairnessAudit(
            model_name="test_model",
            protected_attributes=["race"],
        )
        result = audit.run(
            y_true=binary_dataset["y_true"],
            y_pred=binary_dataset["y_pred"],
            demographics=binary_dataset["demographics"],
        )

        report_json = generate_json_report(result)
        parsed = json.loads(report_json)

        assert "compliance" not in parsed
