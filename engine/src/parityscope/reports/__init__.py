"""Report generation for audit results."""

from parityscope.reports.generator import generate_json_report, generate_summary
from parityscope.reports.executive_summary import generate_executive_summary

__all__ = [
    "generate_json_report",
    "generate_summary",
    "generate_executive_summary",
]
