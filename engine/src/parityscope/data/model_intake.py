"""Model loading and prediction running.

Supports sklearn (pickle/joblib) and ONNX models. Wraps them in
a uniform interface for running predictions on test datasets.
"""

from __future__ import annotations

import warnings
from pathlib import Path
from typing import Protocol, runtime_checkable

import numpy as np
import pandas as pd


@runtime_checkable
class ModelWrapper(Protocol):
    """Protocol for wrapped models."""

    def predict(self, X: pd.DataFrame) -> np.ndarray: ...
    def predict_proba(self, X: pd.DataFrame) -> np.ndarray | None: ...


class SklearnModelWrapper:
    """Wraps a scikit-learn model."""

    def __init__(self, model: object):
        self._model = model

    def predict(self, X: pd.DataFrame) -> np.ndarray:
        return np.asarray(self._model.predict(X), dtype=int)  # type: ignore[union-attr]

    def predict_proba(self, X: pd.DataFrame) -> np.ndarray | None:
        if hasattr(self._model, "predict_proba"):
            proba = self._model.predict_proba(X)  # type: ignore[union-attr]
            # Return probability of positive class
            if proba.ndim == 2 and proba.shape[1] == 2:
                return proba[:, 1]
            return proba
        if hasattr(self._model, "decision_function"):
            return self._model.decision_function(X)  # type: ignore[union-attr]
        return None


class OnnxModelWrapper:
    """Wraps an ONNX model via onnxruntime."""

    def __init__(self, session: object):
        self._session = session

    def predict(self, X: pd.DataFrame) -> np.ndarray:
        try:
            import onnxruntime  # noqa: F401
        except ImportError:
            raise ImportError(
                "onnxruntime is required for ONNX models. "
                "Install with: pip install parityscope[onnx]"
            )
        input_name = self._session.get_inputs()[0].name  # type: ignore[union-attr]
        result = self._session.run(None, {input_name: X.values.astype(np.float32)})  # type: ignore[union-attr]
        return np.asarray(result[0]).flatten().astype(int)

    def predict_proba(self, X: pd.DataFrame) -> np.ndarray | None:
        try:
            import onnxruntime  # noqa: F401
        except ImportError:
            return None
        input_name = self._session.get_inputs()[0].name  # type: ignore[union-attr]
        outputs = self._session.get_outputs()  # type: ignore[union-attr]
        if len(outputs) > 1:
            result = self._session.run(None, {input_name: X.values.astype(np.float32)})  # type: ignore[union-attr]
            proba = np.asarray(result[1])
            if proba.ndim == 2 and proba.shape[1] == 2:
                return proba[:, 1]
            return proba.flatten()
        return None


def load_model(path: str | Path, format: str = "auto") -> ModelWrapper:
    """Load a model from disk.

    Args:
        path: Path to the model file.
        format: "auto" (detect from extension), "sklearn", or "onnx".

    Returns:
        A ModelWrapper instance.

    Supported formats:
        - .pkl, .pickle, .joblib → sklearn (via pickle/joblib)
        - .onnx → ONNX (via onnxruntime)
    """
    path = Path(path)
    if not path.exists():
        raise FileNotFoundError(f"Model file not found: {path}")

    if format == "auto":
        suffix = path.suffix.lower()
        if suffix in (".pkl", ".pickle"):
            format = "sklearn"
        elif suffix == ".joblib":
            format = "sklearn_joblib"
        elif suffix == ".onnx":
            format = "onnx"
        else:
            raise ValueError(
                f"Cannot auto-detect model format from extension '{suffix}'. "
                "Supported: .pkl, .pickle, .joblib, .onnx"
            )

    if format in ("sklearn", "sklearn_joblib"):
        warnings.warn(
            "Loading a pickle/joblib model executes arbitrary code. "
            "Only load models from trusted sources.",
            stacklevel=2,
        )
        if format == "sklearn_joblib" or path.suffix == ".joblib":
            import joblib
            model = joblib.load(path)
        else:
            import pickle
            with open(path, "rb") as f:
                model = pickle.load(f)  # noqa: S301
        return SklearnModelWrapper(model)

    if format == "onnx":
        try:
            import onnxruntime as ort
        except ImportError:
            raise ImportError(
                "onnxruntime is required for ONNX models. "
                "Install with: pip install parityscope[onnx]"
            )
        session = ort.InferenceSession(str(path))
        return OnnxModelWrapper(session)

    raise ValueError(f"Unknown model format: {format}")


def run_predictions(
    model: ModelWrapper,
    X: pd.DataFrame,
    threshold: float = 0.5,
) -> tuple[np.ndarray, np.ndarray | None]:
    """Run model predictions on a dataset.

    Args:
        model: A loaded ModelWrapper.
        X: Feature DataFrame.
        threshold: Decision threshold for converting scores to binary predictions.

    Returns:
        Tuple of (y_pred, y_score_or_None).
    """
    y_score = model.predict_proba(X)

    if y_score is not None:
        y_pred = (np.asarray(y_score) >= threshold).astype(int)
    else:
        y_pred = model.predict(X)

    return y_pred, y_score
