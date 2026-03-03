"""Model connectors — adapters for common ML frameworks.

Provides a unified interface for extracting predictions from different
model types (sklearn, PyTorch, TensorFlow) to feed into the fairness engine.
"""

from parityscope.connectors.sklearn_connector import SklearnConnector
from parityscope.connectors.base import ModelConnector

__all__ = ["ModelConnector", "SklearnConnector"]
