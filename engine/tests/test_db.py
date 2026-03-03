"""Tests for the database layer."""

import json
import os
import tempfile

import pytest

from parityscope.audit.engine import FairnessAudit
from parityscope.audit.result import FairnessLevel
from parityscope.db import AuditStore


@pytest.fixture
def temp_store():
    """Create a temporary database store for testing."""
    with tempfile.NamedTemporaryFile(suffix=".db", delete=False) as f:
        db_path = f.name
    store = AuditStore(f"sqlite:///{db_path}")
    yield store
    os.unlink(db_path)


@pytest.fixture
def sample_result(binary_dataset):
    """Run an audit to get a real AuditResult."""
    audit = FairnessAudit(
        model_name="test_model",
        protected_attributes=["race"],
        jurisdiction="eu-ai-act",
        clinical_domain="diagnosis",
    )
    return audit.run(
        y_true=binary_dataset["y_true"],
        y_pred=binary_dataset["y_pred"],
        demographics=binary_dataset["demographics"],
        y_score=binary_dataset["y_score"],
    )


class TestAuditStore:
    def test_save_and_retrieve(self, temp_store, sample_result):
        record_id = temp_store.save(sample_result)
        assert record_id is not None

        result = temp_store.get_result(sample_result.audit_id)
        assert result is not None
        assert result["model_name"] == "test_model"
        assert result["audit_id"] == sample_result.audit_id

    def test_get_history(self, temp_store, sample_result):
        temp_store.save(sample_result)
        history = temp_store.get_history("test_model")
        assert len(history) == 1
        assert history[0]["model_name"] == "test_model"

    def test_list_models(self, temp_store, sample_result):
        temp_store.save(sample_result)
        models = temp_store.list_models()
        assert len(models) == 1
        assert models[0]["model_name"] == "test_model"

    def test_save_and_get_alerts(self, temp_store, sample_result):
        temp_store.save(sample_result)
        alert_ids = temp_store.save_alerts(sample_result)
        # Should have alerts for unfair/marginal metrics
        alerts = temp_store.get_alerts(model_name="test_model")
        assert len(alerts) == len(alert_ids)

    def test_resolve_alert(self, temp_store, sample_result):
        temp_store.save(sample_result)
        alert_ids = temp_store.save_alerts(sample_result)
        if alert_ids:
            success = temp_store.resolve_alert(alert_ids[0])
            assert success is True
            # Should have one fewer unresolved alert
            unresolved = temp_store.get_alerts(model_name="test_model", unresolved_only=True)
            assert len(unresolved) == len(alert_ids) - 1

    def test_nonexistent_result(self, temp_store):
        result = temp_store.get_result("nonexistent")
        assert result is None

    def test_empty_history(self, temp_store):
        history = temp_store.get_history("nonexistent_model")
        assert history == []
