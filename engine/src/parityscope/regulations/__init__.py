"""Regulation-aware metric selection and compliance mapping.

Maps jurisdictions, clinical domains, and model types to recommended fairness
metrics and compliance requirements. Turns the impossibility theorem
(can't satisfy all fairness definitions simultaneously) into a structured
decision framework grounded in regulatory requirements.
"""

from parityscope.regulations.mapping import (
    get_recommended_metrics,
    get_compliance_requirements,
    list_jurisdictions,
)

__all__ = ["get_recommended_metrics", "get_compliance_requirements", "list_jurisdictions"]
