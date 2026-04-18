"""Optional Claude API integration for narrative generation.

This module wraps the Anthropic SDK to produce rich, contextual narratives
from structured audit results. It is gated behind the ``[llm]`` optional
dependency so the core engine works fully offline.

Critical privacy boundary: only structured metric summaries (disparity
values, strategy names, regulatory article references) are sent to the
API. Raw patient data, demographic columns, and model predictions never
leave the host environment.

Functions:

* :func:`is_available` reports whether the ``anthropic`` package can be
  imported at runtime.
* :func:`generate_narrative` produces an audience-tuned executive summary.
* :func:`interpret_root_cause` turns root-cause findings into a causal
  explanation paragraph.
* :func:`draft_compliance_narrative` writes regulatory-submission prose
  from a compliance gap report.

All functions accept an optional ``api_key`` argument. When omitted, the
SDK reads ``ANTHROPIC_API_KEY`` from the environment.
"""

from __future__ import annotations

import json
import os
from dataclasses import dataclass

from parityscope.audit.result import AuditResult

# ---------------------------------------------------------------------------
# Defaults
# ---------------------------------------------------------------------------

DEFAULT_MODEL = "claude-opus-4-7"
DEFAULT_MAX_TOKENS = 4096


@dataclass(frozen=True)
class LLMResponse:
    """Container for a Claude API call result."""

    text: str
    model: str
    input_tokens: int
    output_tokens: int


# ---------------------------------------------------------------------------
# Availability check
# ---------------------------------------------------------------------------


def is_available() -> bool:
    """Return True if the ``anthropic`` package is importable."""
    try:
        import anthropic  # noqa: F401

        return True
    except ImportError:
        return False


def _get_client(api_key: str | None = None):
    """Construct an Anthropic client, raising a helpful error if unavailable."""
    try:
        import anthropic
    except ImportError as exc:
        raise ImportError(
            "Claude API integration requires the [llm] extra. "
            "Install with: pip install 'parityscope[llm]'"
        ) from exc

    key = api_key or os.environ.get("ANTHROPIC_API_KEY")
    if not key:
        raise ValueError(
            "Anthropic API key required. Set ANTHROPIC_API_KEY env var "
            "or pass api_key=... to the function."
        )

    return anthropic.Anthropic(api_key=key)


def _call_claude(
    system: str,
    user: str,
    api_key: str | None = None,
    model: str = DEFAULT_MODEL,
    max_tokens: int = DEFAULT_MAX_TOKENS,
) -> LLMResponse:
    """Send a single message to Claude and return the text response."""
    client = _get_client(api_key)

    response = client.messages.create(
        model=model,
        max_tokens=max_tokens,
        thinking={"type": "adaptive"},
        system=system,
        messages=[{"role": "user", "content": user}],
    )

    text_parts = [b.text for b in response.content if b.type == "text"]
    return LLMResponse(
        text="\n\n".join(text_parts),
        model=response.model,
        input_tokens=response.usage.input_tokens,
        output_tokens=response.usage.output_tokens,
    )


# ---------------------------------------------------------------------------
# Audit result serialization (privacy-safe summaries only)
# ---------------------------------------------------------------------------


def _audit_to_summary(audit: AuditResult) -> dict:
    """Strip an AuditResult down to the privacy-safe metric summary."""
    return {
        "model_name": audit.model_name,
        "jurisdiction": audit.jurisdiction,
        "clinical_domain": audit.clinical_domain,
        "overall_fairness": audit.overall_fairness.value,
        "total_samples": audit.total_samples,
        "n_unfair": len(audit.unfair_metrics),
        "n_marginal": len(audit.marginal_metrics),
        "n_fair": len(audit.fair_metrics),
        "metrics": [
            {
                "name": m.metric_name,
                "display_name": m.display_name,
                "disparity": round(m.disparity, 4),
                "fairness_level": m.fairness_level.value,
                "threshold": m.threshold,
            }
            for m in audit.metric_results
        ],
    }


# ---------------------------------------------------------------------------
# 1. Executive summary narrative
# ---------------------------------------------------------------------------


def generate_narrative(
    audit: AuditResult,
    root_cause: object | None = None,
    plan: object | None = None,
    audience: str = "executive",
    api_key: str | None = None,
    model: str = DEFAULT_MODEL,
) -> str:
    """Produce a rich executive narrative from an audit result.

    Args:
        audit: The fairness audit to summarize.
        root_cause: Optional :class:`RootCauseReport` for context.
        plan: Optional :class:`RemediationPlan` to reference.
        audience: ``"executive"``, ``"technical"``, or ``"regulatory"``.
        api_key: Anthropic API key (falls back to env var).
        model: Claude model ID (defaults to Opus 4.7).

    Returns:
        Markdown-formatted narrative text.
    """
    audit_summary = _audit_to_summary(audit)

    rc_summary = None
    if root_cause is not None:
        rc_dict = root_cause.to_dict() if hasattr(root_cause, "to_dict") else {}
        rc_summary = {
            "n_proxies": len(rc_dict.get("proxy_variables", [])),
            "n_label_findings": len(rc_dict.get("label_bias_findings", [])),
            "critical_findings": rc_dict.get("critical_findings", []),
            "summary": rc_dict.get("summary", ""),
        }

    plan_summary = None
    if plan is not None and hasattr(plan, "steps"):
        plan_summary = {
            "n_steps": len(plan.steps),
            "total_weeks": getattr(plan, "total_estimated_weeks", 0),
            "current_score": getattr(plan, "current_compliance_score", 0.0),
            "expected_score": getattr(plan, "expected_final_compliance_score", 0.0),
            "top_strategies": [
                {
                    "id": s.strategy.id,
                    "name": s.strategy.strategy,
                    "rationale": s.rationale,
                }
                for s in plan.steps[:5]
            ],
        }

    system_prompts = {
        "executive": (
            "You are a healthcare AI fairness expert writing for hospital "
            "executives and compliance officers. Write clearly and directly. "
            "Focus on patient safety, regulatory risk, and business impact. "
            "Avoid jargon. Use plain English. Lead with the bottom line. "
            "Do not use marketing language or hedging."
        ),
        "technical": (
            "You are a healthcare AI fairness expert writing for ML engineers "
            "and data scientists. Reference specific metrics by name, cite "
            "disparity values, and discuss root causes in technical terms. "
            "Be precise. Avoid hand-waving."
        ),
        "regulatory": (
            "You are a healthcare AI fairness expert writing for regulatory "
            "submission. Use formal, neutral language. Reference applicable "
            "regulations by article number where known. Frame findings as "
            "compliance gaps with specific remediation requirements. Avoid "
            "marketing language."
        ),
    }

    system = system_prompts.get(audience, system_prompts["executive"])

    user_payload = {
        "audit": audit_summary,
        "root_cause": rc_summary,
        "remediation_plan": plan_summary,
        "audience": audience,
    }

    user = (
        "Write a structured narrative report from this fairness audit data. "
        "Use the following sections (markdown headings):\n\n"
        "## Overview\n"
        "## Key Findings\n"
        "## Risk Assessment\n"
        "## Recommended Actions\n"
        "## Timeline\n\n"
        f"Audit data:\n```json\n{json.dumps(user_payload, indent=2)}\n```"
    )

    response = _call_claude(
        system=system,
        user=user,
        api_key=api_key,
        model=model,
        max_tokens=DEFAULT_MAX_TOKENS,
    )
    return response.text


# ---------------------------------------------------------------------------
# 2. Root cause interpretation
# ---------------------------------------------------------------------------


def interpret_root_cause(
    root_cause: object,
    audit: AuditResult | None = None,
    api_key: str | None = None,
    model: str = DEFAULT_MODEL,
) -> str:
    """Generate a causal explanation narrative from root-cause findings."""
    rc_dict = root_cause.to_dict() if hasattr(root_cause, "to_dict") else {}

    payload = {
        "root_cause": {
            "proxies": rc_dict.get("proxy_variables", [])[:5],
            "label_bias": rc_dict.get("label_bias_findings", []),
            "feature_importance": rc_dict.get("feature_importance", [])[:5],
            "representation": rc_dict.get("representation", {}),
            "critical_findings": rc_dict.get("critical_findings", []),
        }
    }

    if audit is not None:
        payload["audit_context"] = {
            "model_name": audit.model_name,
            "n_unfair": len(audit.unfair_metrics),
            "unfair_metric_names": [m.metric_name for m in audit.unfair_metrics],
        }

    system = (
        "You are a healthcare AI fairness expert. Explain WHY the model is "
        "unfair based on root-cause analysis. Connect proxy variables, label "
        "bias, feature importance, and representation gaps into a coherent "
        "causal narrative. Be specific. Reference findings by name. Avoid "
        "generic statements."
    )
    user = (
        "Synthesize these root-cause findings into a single causal "
        "explanation paragraph (3-5 sentences) for a clinical audience. "
        "End with the most important contributing factor.\n\n"
        f"```json\n{json.dumps(payload, indent=2)}\n```"
    )

    response = _call_claude(
        system=system,
        user=user,
        api_key=api_key,
        model=model,
        max_tokens=1024,
    )
    return response.text


# ---------------------------------------------------------------------------
# 3. Compliance narrative
# ---------------------------------------------------------------------------


def draft_compliance_narrative(
    gap_report: object,
    jurisdiction: str | None = None,
    api_key: str | None = None,
    model: str = DEFAULT_MODEL,
) -> str:
    """Draft regulatory-submission prose from a compliance gap report."""
    gap_dict = gap_report.to_dict() if hasattr(gap_report, "to_dict") else {}

    payload = {
        "jurisdiction": jurisdiction or gap_dict.get("jurisdiction_name", "Unknown"),
        "compliance_score": gap_dict.get("overall_compliance_score", 0.0),
        "enforcement_date": gap_dict.get("enforcement_date"),
        "penalty_description": gap_dict.get("penalty_description", ""),
        "passing": [
            {"requirement": r.get("requirement"), "article": r.get("article")}
            for r in gap_dict.get("passing", [])
        ],
        "failing": [
            {
                "requirement": r.get("requirement"),
                "article": r.get("article"),
                "gap": r.get("gap_description"),
                "action": r.get("needed_action"),
            }
            for r in gap_dict.get("failing", [])
        ],
        "partial": [
            {
                "requirement": r.get("requirement"),
                "article": r.get("article"),
                "gap": r.get("gap_description"),
            }
            for r in gap_dict.get("partial", [])
        ],
    }

    system = (
        "You are a healthcare AI compliance officer drafting a regulatory "
        "submission. Use formal, neutral language. Cite regulations by "
        "article number. Frame each gap as a specific remediation "
        "requirement with a defined action. Do not use marketing language, "
        "hedging, or speculation. Write in third person."
    )
    user = (
        "Draft a compliance narrative for this regulatory gap report. "
        "Structure: opening summary, requirements satisfied, gaps "
        "identified (with article references), and committed remediation "
        "actions. Use markdown headings.\n\n"
        f"```json\n{json.dumps(payload, indent=2)}\n```"
    )

    response = _call_claude(
        system=system,
        user=user,
        api_key=api_key,
        model=model,
        max_tokens=2048,
    )
    return response.text


__all__ = [
    "DEFAULT_MODEL",
    "LLMResponse",
    "is_available",
    "generate_narrative",
    "interpret_root_cause",
    "draft_compliance_narrative",
]
