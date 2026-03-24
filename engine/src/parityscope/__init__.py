"""ParityScope — Healthcare AI Fairness Compliance Toolkit.

A statistical evaluation engine that computes fairness metrics, applies
regulatory rules, and runs simulations for clinical AI systems.

Patient data never leaves your infrastructure.
"""

from parityscope.audit.engine import FairnessAudit
from parityscope.audit.result import AuditResult, FairnessLevel
from parityscope.reports.pdf_report import generate_pdf_report

__version__ = "0.2.0"
__all__ = [
    "FairnessAudit",
    "AuditResult",
    "FairnessLevel",
    "generate_pdf_report",
    "__version__",
]
