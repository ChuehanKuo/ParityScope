"""Helper utilities for the ParityScope REST API.

Includes reconstruction of AuditResult from JSON dicts, demographic
parsing, and shared error handling.
"""

from __future__ import annotations

import math
from typing import Any

import numpy as np
import pandas as pd

from parityscope.audit.result import (
    AuditResult,
    FairnessLevel,
    GroupResult,
    MetricResult,
)


def reconstruct_audit_result(data: dict[str, Any]) -> AuditResult:
    """Rebuild an AuditResult from a JSON-serializable dict.

    This is the inverse of ``AuditResult.to_dict()`` — it takes the plain
    dict returned by that method and produces a frozen dataclass instance
    suitable for PDF generation, recommendations, etc.
    """
    metric_results: list[MetricResult] = []
    for m in data.get("metric_results", []):
        group_results = tuple(
            GroupResult(
                group_label=g["group"],
                rate=g["rate"],
                sample_size=g["sample_size"],
            )
            for g in m.get("group_results", [])
        )
        details: dict[str, object] = {}
        if "ci_lower" in m:
            details["ci_lower"] = m["ci_lower"]
            details["ci_upper"] = m["ci_upper"]
        if "effect_sizes" in m:
            details["effect_sizes"] = m["effect_sizes"]

        metric_results.append(
            MetricResult(
                metric_name=m["metric_name"],
                display_name=m["display_name"],
                disparity=m["disparity"],
                fairness_level=FairnessLevel(m["fairness_level"]),
                group_results=group_results,
                threshold=m["threshold"],
                details=details,
            )
        )

    # Intersectional results
    intersectional_results = None
    if "intersectional_results" in data and data["intersectional_results"]:
        inter: list[MetricResult] = []
        for m in data["intersectional_results"]:
            grs = tuple(
                GroupResult(g["group"], g["rate"], g["sample_size"])
                for g in m.get("group_results", [])
            )
            inter.append(
                MetricResult(
                    metric_name=m["metric_name"],
                    display_name=m["display_name"],
                    disparity=m["disparity"],
                    fairness_level=FairnessLevel(m["fairness_level"]),
                    group_results=grs,
                    threshold=m["threshold"],
                )
            )
        intersectional_results = tuple(inter)

    worst_subgroups = None
    if "worst_subgroups" in data and data["worst_subgroups"]:
        worst_subgroups = tuple(data["worst_subgroups"])

    return AuditResult(
        audit_id=data["audit_id"],
        model_name=data["model_name"],
        timestamp=data["timestamp"],
        protected_attributes=tuple(data.get("protected_attributes", [])),
        metrics_evaluated=tuple(data.get("metrics_evaluated", [])),
        jurisdiction=data.get("jurisdiction"),
        clinical_domain=data.get("clinical_domain"),
        thresholds=data.get("thresholds", {}),
        metric_results=tuple(metric_results),
        overall_fairness=FairnessLevel(data["overall_fairness"]),
        total_samples=data["total_samples"],
        group_counts=data.get("group_counts", {}),
        intersectional_results=intersectional_results,
        worst_subgroups=worst_subgroups,
        sample_adequacy=data.get("sample_adequacy"),
        confidence_intervals=data.get("confidence_intervals"),
    )


def parse_demographics(data: dict[str, list[str]]) -> pd.DataFrame:
    """Convert a demographics dict to a pandas DataFrame."""
    return pd.DataFrame(data)


def sanitize_for_json(obj: Any) -> Any:
    """Recursively convert numpy/pandas types to JSON-safe Python types."""
    if isinstance(obj, dict):
        return {sanitize_for_json(k): sanitize_for_json(v) for k, v in obj.items()}
    if isinstance(obj, (list, tuple)):
        return [sanitize_for_json(v) for v in obj]
    if isinstance(obj, (np.integer,)):
        return int(obj)
    if isinstance(obj, (np.floating,)):
        v = float(obj)
        if math.isnan(v) or math.isinf(v):
            return None
        return v
    if isinstance(obj, np.bool_):
        return bool(obj)
    if isinstance(obj, np.ndarray):
        return sanitize_for_json(obj.tolist())
    if isinstance(obj, float):
        if math.isnan(obj) or math.isinf(obj):
            return None
    return obj


def error_response(status_code: int, detail: str) -> dict:
    """Build a standard error payload."""
    return {"error": {"status_code": status_code, "detail": detail}}
