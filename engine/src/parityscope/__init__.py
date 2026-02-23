"""ParityScope — Healthcare AI Fairness Compliance Toolkit.

A statistical evaluation engine that computes fairness metrics, applies
regulatory rules, and runs simulations for clinical AI systems.

Patient data never leaves your infrastructure.
"""

from parityscope.audit.engine import FairnessAudit
from parityscope.audit.result import AuditResult

__version__ = "0.1.0"
__all__ = ["FairnessAudit", "AuditResult", "__version__"]
