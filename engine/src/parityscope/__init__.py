"""ParityScope — Healthcare AI Fairness Compliance Toolkit.

A statistical evaluation engine that computes fairness metrics, applies
regulatory rules, and runs simulations for clinical AI systems.

Patient data never leaves your infrastructure.

Modules:
    audit       - Core fairness audit engine (15+ metrics)
    metrics     - Individual fairness metric implementations
    regulations - Jurisdiction-aware metric selection and compliance mapping
    reports     - JSON, text, and PDF report generation
    simulation  - What-if intervention simulations
    analysis    - Intersectional analysis and feature importance
    monitoring  - Drift detection, alerting, and scheduling
    connectors  - Adapters for sklearn, PyTorch, etc.
    db          - Persistent storage for audit history
    api         - FastAPI REST server
    cli         - Command-line interface
"""

from parityscope.audit.engine import FairnessAudit
from parityscope.audit.result import AuditResult
from parityscope.reports.pdf_report import generate_pdf_report

__version__ = "0.1.0"
__all__ = ["FairnessAudit", "AuditResult", "generate_pdf_report", "__version__"]
