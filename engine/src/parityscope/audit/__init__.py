"""Audit engine — orchestrates fairness evaluation across metrics and groups."""

from parityscope.audit.engine import FairnessAudit
from parityscope.audit.result import AuditResult, FairnessLevel, MetricResult, GroupResult

__all__ = [
    "FairnessAudit",
    "AuditResult",
    "FairnessLevel",
    "MetricResult",
    "GroupResult",
]
