"""Audit engine — orchestrates fairness evaluation across metrics and groups."""

from parityscope.audit.engine import FairnessAudit
from parityscope.audit.result import AuditResult, MetricResult, GroupResult

__all__ = ["FairnessAudit", "AuditResult", "MetricResult", "GroupResult"]
