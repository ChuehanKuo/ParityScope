"""Tests for the optional Claude API integration layer.

These tests focus on:
* Privacy-safe payload construction (no patient data leaks)
* Graceful fallback when the [llm] extra is not installed
* Module surface and dataclass correctness

We do not exercise actual API calls (no network, no API key required).
"""

from __future__ import annotations

import json
from unittest.mock import MagicMock, patch

import pytest

from parityscope.ai.llm import (
    DEFAULT_MODEL,
    LLMResponse,
    _audit_to_summary,
    is_available,
)


class TestAvailability:
    def test_is_available_returns_bool(self):
        result = is_available()
        assert isinstance(result, bool)


class TestAuditSummarization:
    def test_summary_excludes_raw_data(self, sample_audit_result):
        """Privacy check: serialized summary must not contain raw arrays."""
        summary = _audit_to_summary(sample_audit_result)
        serialized = json.dumps(summary)

        # Should NOT contain any patient-level data
        assert "y_true" not in serialized
        assert "y_pred" not in serialized
        assert "demographics" not in serialized
        assert "raw" not in serialized

    def test_summary_contains_metric_metadata(self, sample_audit_result):
        summary = _audit_to_summary(sample_audit_result)
        assert "model_name" in summary
        assert "jurisdiction" in summary
        assert "overall_fairness" in summary
        assert "metrics" in summary
        assert isinstance(summary["metrics"], list)

    def test_summary_metric_structure(self, sample_audit_result):
        summary = _audit_to_summary(sample_audit_result)
        if summary["metrics"]:
            metric = summary["metrics"][0]
            assert "name" in metric
            assert "disparity" in metric
            assert "fairness_level" in metric
            assert "threshold" in metric


class TestGenerateNarrativeMocked:
    def test_calls_anthropic_with_correct_params(self, sample_audit_result):
        """Verify generate_narrative builds the right call shape."""
        from parityscope.ai import llm

        mock_response = MagicMock()
        mock_response.content = [MagicMock(type="text", text="narrative output")]
        mock_response.model = DEFAULT_MODEL
        mock_response.usage = MagicMock(input_tokens=100, output_tokens=200)

        mock_client = MagicMock()
        mock_client.messages.create.return_value = mock_response

        with patch.object(llm, "_get_client", return_value=mock_client):
            result = llm.generate_narrative(
                audit=sample_audit_result,
                audience="executive",
                api_key="test-key",
            )

        assert result == "narrative output"
        call_kwargs = mock_client.messages.create.call_args.kwargs
        assert call_kwargs["model"] == DEFAULT_MODEL
        assert call_kwargs["thinking"] == {"type": "adaptive"}

        # System prompt must be a list of typed blocks with cache_control set
        # so Anthropic's prompt cache can short-circuit repeated calls.
        system_blocks = call_kwargs["system"]
        assert isinstance(system_blocks, list)
        assert len(system_blocks) >= 1
        first_block = system_blocks[0]
        assert first_block["type"] == "text"
        assert first_block.get("cache_control") == {"type": "ephemeral"}
        # And the executive-audience text should be in the cached system block.
        assert "executive" in first_block["text"].lower()

    def test_audience_changes_system_prompt(self, sample_audit_result):
        from parityscope.ai import llm

        mock_response = MagicMock()
        mock_response.content = [MagicMock(type="text", text="output")]
        mock_response.model = DEFAULT_MODEL
        mock_response.usage = MagicMock(input_tokens=10, output_tokens=20)

        mock_client = MagicMock()
        mock_client.messages.create.return_value = mock_response

        with patch.object(llm, "_get_client", return_value=mock_client):
            for audience in ["executive", "technical", "regulatory"]:
                llm.generate_narrative(
                    audit=sample_audit_result,
                    audience=audience,
                    api_key="test-key",
                )

        # All three audiences should have been called
        assert mock_client.messages.create.call_count == 3


class TestExecutiveSummaryWithAnthropicProvider:
    def test_falls_back_to_template_on_import_error(self, sample_audit_result):
        from parityscope.ai.recommendations import generate_executive_summary

        # When ImportError is raised, function should fall back to template path
        with patch(
            "parityscope.ai.llm.generate_narrative",
            side_effect=ImportError("anthropic not installed"),
        ):
            result = generate_executive_summary(
                audit=sample_audit_result,
                provider="anthropic",
                api_key=None,
            )

        # Should still produce a valid summary via template
        assert result.full_text is not None
        assert len(result.full_text) > 0
        # Template path includes "Overview:" header marker
        assert "Overview" in result.full_text

    def test_falls_back_on_value_error(self, sample_audit_result):
        from parityscope.ai.recommendations import generate_executive_summary

        with patch(
            "parityscope.ai.llm.generate_narrative",
            side_effect=ValueError("missing api key"),
        ):
            result = generate_executive_summary(
                audit=sample_audit_result,
                provider="anthropic",
            )

        assert result.full_text is not None
        assert "Overview" in result.full_text

    def test_uses_llm_text_when_available(self, sample_audit_result):
        from parityscope.ai.recommendations import generate_executive_summary

        with patch(
            "parityscope.ai.llm.generate_narrative",
            return_value="# Custom LLM Narrative\n\nThis came from Claude.",
        ):
            result = generate_executive_summary(
                audit=sample_audit_result,
                provider="anthropic",
                api_key="test-key",
            )

        assert "Custom LLM Narrative" in result.full_text
        # Template-derived sections should still be populated separately
        assert result.overview is not None
        assert result.risk_assessment is not None

    def test_no_provider_uses_template_only(self, sample_audit_result):
        """Without provider param, no LLM call is made."""
        from parityscope.ai.recommendations import generate_executive_summary

        with patch("parityscope.ai.llm.generate_narrative") as mock_narrative:
            result = generate_executive_summary(
                audit=sample_audit_result,
                # provider defaults to None
            )

        mock_narrative.assert_not_called()
        assert "Overview" in result.full_text


class TestLLMResponseDataclass:
    def test_llm_response_is_frozen(self):
        response = LLMResponse(
            text="hello",
            model="claude-opus-4-7",
            input_tokens=10,
            output_tokens=20,
        )
        with pytest.raises(Exception):
            response.text = "modified"  # type: ignore[misc]

    def test_llm_response_fields(self):
        response = LLMResponse(
            text="output",
            model="claude-opus-4-7",
            input_tokens=100,
            output_tokens=200,
        )
        assert response.text == "output"
        assert response.input_tokens == 100
        assert response.output_tokens == 200
