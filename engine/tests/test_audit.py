"""Tests for the audit engine."""

import json

import numpy as np
import pytest

from parityscope.audit.engine import FairnessAudit
from parityscope.audit.result import AuditResult, FairnessLevel


class TestFairnessAudit:
    def test_basic_audit(self, binary_dataset):
        audit = FairnessAudit(
            model_name="test_model",
            protected_attributes=["race"],
        )
        result = audit.run(
            y_true=binary_dataset["y_true"],
            y_pred=binary_dataset["y_pred"],
            demographics=binary_dataset["demographics"],
        )

        assert isinstance(result, AuditResult)
        assert result.model_name == "test_model"
        assert result.total_samples == 1000
        assert len(result.metric_results) > 0
        assert result.overall_fairness in (
            FairnessLevel.FAIR,
            FairnessLevel.MARGINAL,
            FairnessLevel.UNFAIR,
        )

    def test_audit_with_jurisdiction(self, binary_dataset):
        audit = FairnessAudit(
            model_name="sepsis_model",
            protected_attributes=["race"],
            jurisdiction="eu-ai-act",
            clinical_domain="diagnosis",
        )
        result = audit.run(
            y_true=binary_dataset["y_true"],
            y_pred=binary_dataset["y_pred"],
            demographics=binary_dataset["demographics"],
            y_score=binary_dataset["y_score"],
        )

        assert result.jurisdiction == "eu-ai-act"
        assert result.clinical_domain == "diagnosis"
        assert len(result.metric_results) > 0

    def test_biased_model_detected(self, binary_dataset):
        audit = FairnessAudit(
            model_name="biased_model",
            protected_attributes=["race"],
        )
        result = audit.run(
            y_true=binary_dataset["y_true"],
            y_pred=binary_dataset["y_pred"],
            demographics=binary_dataset["demographics"],
        )

        # The binary_dataset has intentional bias — should detect unfair metrics
        assert len(result.unfair_metrics) > 0 or len(result.marginal_metrics) > 0

    def test_fair_model_passes(self, fair_dataset):
        audit = FairnessAudit(
            model_name="fair_model",
            protected_attributes=["group"],
        )
        result = audit.run(
            y_true=fair_dataset["y_true"],
            y_pred=fair_dataset["y_pred"],
            demographics=fair_dataset["demographics"],
        )

        # Most metrics should be fair on the fair dataset
        assert len(result.fair_metrics) > len(result.unfair_metrics)

    def test_custom_thresholds(self, binary_dataset):
        audit = FairnessAudit(
            model_name="test_model",
            protected_attributes=["race"],
            thresholds={"fair": 0.01, "marginal": 0.02},
        )
        result = audit.run(
            y_true=binary_dataset["y_true"],
            y_pred=binary_dataset["y_pred"],
            demographics=binary_dataset["demographics"],
        )

        # With very strict thresholds, more metrics should be unfair
        assert len(result.unfair_metrics) > 0

    def test_custom_metrics(self, binary_dataset):
        audit = FairnessAudit(
            model_name="test_model",
            protected_attributes=["race"],
            metrics=["demographic_parity", "equal_opportunity"],
        )
        result = audit.run(
            y_true=binary_dataset["y_true"],
            y_pred=binary_dataset["y_pred"],
            demographics=binary_dataset["demographics"],
        )

        metric_names = [m.metric_name for m in result.metric_results]
        assert any("demographic_parity" in n for n in metric_names)
        assert any("equal_opportunity" in n for n in metric_names)

    def test_result_serializable(self, binary_dataset):
        audit = FairnessAudit(
            model_name="test_model",
            protected_attributes=["race"],
        )
        result = audit.run(
            y_true=binary_dataset["y_true"],
            y_pred=binary_dataset["y_pred"],
            demographics=binary_dataset["demographics"],
        )

        d = result.to_dict()
        json_str = json.dumps(d, default=str)
        parsed = json.loads(json_str)

        assert parsed["model_name"] == "test_model"
        assert parsed["total_samples"] == 1000
        assert "metric_results" in parsed

    def test_group_counts(self, binary_dataset):
        audit = FairnessAudit(
            model_name="test_model",
            protected_attributes=["race"],
        )
        result = audit.run(
            y_true=binary_dataset["y_true"],
            y_pred=binary_dataset["y_pred"],
            demographics=binary_dataset["demographics"],
        )

        assert result.group_counts["race:A"] == 600
        assert result.group_counts["race:B"] == 400
