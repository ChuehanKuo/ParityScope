"""AI/ML-powered detection of bias subgroups, proxy variables, and bias patterns.

Uses tree-based models, mutual information, and clustering to discover
fairness issues that rule-based approaches may miss.
"""

from __future__ import annotations

from dataclasses import dataclass

import numpy as np
import pandas as pd
from sklearn.cluster import DBSCAN, KMeans
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.feature_selection import mutual_info_classif
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, StandardScaler
from sklearn.tree import DecisionTreeClassifier

from parityscope.audit.subgroup_discovery import SubgroupFinding
from parityscope.rootcause.proxy_detection import ProxyVariable

# ---------------------------------------------------------------------------
# Subgroup discovery via decision-tree error modelling
# ---------------------------------------------------------------------------


def discover_subgroups_ml(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    demographics: pd.DataFrame,
    protected_attributes: list[str],
    features: pd.DataFrame | None = None,
    min_group_size: int = 30,
    max_depth: int = 4,
    top_k: int = 10,
) -> list[SubgroupFinding]:
    """Discover underperforming subgroups using a decision-tree error model.

    Trains a tree to predict misclassification from demographic (and optional
    feature) columns, then extracts leaf nodes whose error rate exceeds the
    population baseline.

    Args:
        y_true: Ground-truth binary labels.
        y_pred: Predicted binary labels.
        demographics: DataFrame with demographic columns.
        protected_attributes: Columns in *demographics* to include.
        features: Optional extra feature columns to include.
        min_group_size: Minimum samples per leaf.
        max_depth: Maximum tree depth.
        top_k: Number of worst subgroups to return.

    Returns:
        List of ``SubgroupFinding`` sorted by absolute deviation descending.
    """
    y_true = np.asarray(y_true).ravel()
    y_pred = np.asarray(y_pred).ravel()
    errors = (y_pred != y_true).astype(int)
    population_error_rate = float(errors.mean())

    # --- build input matrix ---------------------------------------------------
    demo_subset = demographics[protected_attributes].copy()
    input_parts: list[pd.DataFrame] = [demo_subset]
    if features is not None:
        input_parts.append(features.copy())
    raw_input = pd.concat(input_parts, axis=1)

    # One-hot encode categorical columns
    cat_cols = raw_input.select_dtypes(include=["object", "category"]).columns.tolist()
    num_cols = [c for c in raw_input.columns if c not in cat_cols]

    encoder: OneHotEncoder | None = None
    if cat_cols:
        encoder = OneHotEncoder(sparse_output=False, handle_unknown="infrequent_if_exist")
        encoded = encoder.fit_transform(raw_input[cat_cols])
        ohe_names = list(encoder.get_feature_names_out(cat_cols))
        encoded_df = pd.DataFrame(encoded, columns=ohe_names, index=raw_input.index)
        X = pd.concat([raw_input[num_cols].reset_index(drop=True),
                        encoded_df.reset_index(drop=True)], axis=1)
    else:
        X = raw_input[num_cols].copy()
        ohe_names = []

    X = X.fillna(0)

    # --- train tree ------------------------------------------------------------
    tree = DecisionTreeClassifier(
        max_depth=max_depth,
        min_samples_leaf=min_group_size,
        class_weight="balanced",
        random_state=42,
    )
    tree.fit(X, errors)

    # --- population-level stats for baseline -----------------------------------
    pop_stats = _classification_stats(y_true, y_pred)

    # --- extract leaves --------------------------------------------------------
    tree_obj = tree.tree_
    feature_names = list(X.columns)
    n_nodes = tree_obj.node_count
    children_left = tree_obj.children_left
    children_right = tree_obj.children_right

    findings: list[SubgroupFinding] = []

    for node_id in range(n_nodes):
        # only leaves
        if children_left[node_id] != children_right[node_id]:
            continue

        # samples reaching this leaf
        mask = tree.apply(X) == node_id
        n_leaf = int(mask.sum())
        if n_leaf < min_group_size:
            continue

        leaf_error_rate = float(errors[mask].mean())
        if leaf_error_rate <= population_error_rate:
            continue

        # reconstruct decision path
        subgroup_def = _extract_decision_path(
            tree_obj, node_id, feature_names, ohe_names, cat_cols, encoder
        )
        if not subgroup_def:
            continue

        # group metrics
        grp_stats = _classification_stats(y_true[mask], y_pred[mask])
        deviation = grp_stats["accuracy"] - pop_stats["accuracy"]

        worst_metric, worst_val = _find_worst_metric(grp_stats, pop_stats)
        severity = _severity_from_deviation(abs(deviation))

        label = " AND ".join(f"{k}={v}" for k, v in subgroup_def.items())

        findings.append(SubgroupFinding(
            subgroup_definition=subgroup_def,
            subgroup_label=label,
            sample_size=n_leaf,
            sample_pct=round(n_leaf / len(y_true), 4),
            overall_accuracy=round(grp_stats["accuracy"], 4),
            true_positive_rate=round(grp_stats["tpr"], 4),
            false_positive_rate=round(grp_stats["fpr"], 4),
            positive_prediction_rate=round(grp_stats["positive_rate"], 4),
            worst_metric=worst_metric,
            worst_metric_value=round(worst_val, 4),
            population_baseline=round(pop_stats["accuracy"], 4),
            deviation=round(deviation, 4),
            severity=severity,
        ))

    findings.sort(key=lambda f: abs(f.deviation), reverse=True)
    return findings[:top_k]


# ---------------------------------------------------------------------------
# Proxy detection via mutual information + gradient boosting
# ---------------------------------------------------------------------------


def detect_proxies_ml(
    X: pd.DataFrame,
    demographics: pd.DataFrame,
    protected_attributes: list[str],
    threshold: float = 0.3,
    n_estimators: int = 100,
    max_depth: int = 5,
) -> list[ProxyVariable]:
    """Detect proxy variables using mutual information and gradient boosting.

    For each protected attribute, computes a composite proxy score combining
    normalised mutual information (weight 0.4) and gradient-boosting feature
    importance (weight 0.6).

    Args:
        X: Feature matrix (may contain numeric and categorical columns).
        demographics: DataFrame with protected-attribute columns.
        protected_attributes: Columns to test for proxy relationships.
        threshold: Minimum proxy score to include.
        n_estimators: Number of boosting iterations.
        max_depth: Maximum tree depth for the gradient booster.

    Returns:
        List of ``ProxyVariable`` sorted by proxy score descending.
    """
    X_numeric = _encode_for_ml(X)
    results: list[ProxyVariable] = []

    for attr in protected_attributes:
        target = demographics[attr]
        if target.nunique() < 2:
            continue

        le = LabelEncoder()
        encoded_target = le.fit_transform(target.astype(str))

        # --- mutual information -----------------------------------------------
        mi = mutual_info_classif(X_numeric, encoded_target, random_state=42)
        mi_max = mi.max()
        norm_mi = mi / mi_max if mi_max > 0 else mi

        # --- gradient boosting importance -------------------------------------
        gb = GradientBoostingClassifier(
            n_estimators=n_estimators,
            max_depth=max_depth,
            random_state=42,
        )
        gb.fit(X_numeric, encoded_target)
        importances = gb.feature_importances_
        imp_max = importances.max()
        norm_imp = importances / imp_max if imp_max > 0 else importances

        # --- composite score --------------------------------------------------
        proxy_scores = 0.4 * norm_mi + 0.6 * norm_imp

        for idx, feat in enumerate(X.columns):
            score = float(proxy_scores[idx])
            if score < threshold:
                continue

            severity = (
                "high" if score >= 0.7
                else "medium" if score >= 0.5
                else "low"
            )
            recommendation = (
                f"Feature '{feat}' acts as a proxy for '{attr}' "
                f"(score={score:.2f}). "
                f"Consider removing or decorrelating this feature."
            )
            results.append(ProxyVariable(
                feature=feat,
                protected_attribute=attr,
                correlation=round(score, 4),
                correlation_type="ml_proxy_score",
                severity=severity,
                recommendation=recommendation,
            ))

    results.sort(key=lambda p: p.correlation, reverse=True)
    return results


# ---------------------------------------------------------------------------
# Bias-pattern clustering
# ---------------------------------------------------------------------------


@dataclass(frozen=True)
class BiasPattern:
    """A cluster of audits sharing similar disparity profiles."""

    pattern_id: str
    cluster_label: int
    n_audits: int
    dominant_metrics: tuple[str, ...]
    mean_disparities: dict[str, float]
    description: str
    audit_ids: tuple[str, ...]


def cluster_bias_patterns(
    metric_history: list[dict[str, float]],
    audit_ids: list[str],
    min_audits: int = 5,
    n_clusters: int | None = None,
) -> list[BiasPattern]:
    """Cluster audit results to find recurring bias patterns.

    Builds a matrix of disparity values across audits, standardises it, and
    applies either DBSCAN or KMeans to group similar disparity profiles.

    Args:
        metric_history: Each element maps metric names to disparity values
            for a single audit.
        audit_ids: Identifiers corresponding to each entry in *metric_history*.
        min_audits: Minimum number of audits required to run clustering.
        n_clusters: If provided, use KMeans with this many clusters;
            otherwise use DBSCAN.

    Returns:
        List of ``BiasPattern``, one per cluster (noise excluded for DBSCAN).
    """
    if len(metric_history) < min_audits:
        return []

    # --- build matrix ---------------------------------------------------------
    all_metrics = sorted({m for row in metric_history for m in row})
    matrix = np.array([
        [row.get(m, 0.0) for m in all_metrics]
        for row in metric_history
    ])

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(matrix)

    # --- cluster --------------------------------------------------------------
    if n_clusters is None:
        model = DBSCAN(eps=0.5, min_samples=2)
    else:
        model = KMeans(n_clusters=n_clusters, random_state=42, n_init="auto")

    labels = model.fit_predict(X_scaled)

    # --- build patterns -------------------------------------------------------
    patterns: list[BiasPattern] = []
    unique_labels = sorted(set(labels))

    for label in unique_labels:
        if label == -1:  # DBSCAN noise
            continue

        mask = labels == label
        cluster_ids = tuple(aid for aid, m in zip(audit_ids, mask) if m)
        cluster_matrix = matrix[mask]

        mean_disp = {
            m: round(float(cluster_matrix[:, i].mean()), 4)
            for i, m in enumerate(all_metrics)
        }

        # dominant = top 3 by mean absolute disparity
        sorted_metrics = sorted(
            all_metrics,
            key=lambda m: abs(mean_disp[m]),
            reverse=True,
        )
        dominant = tuple(sorted_metrics[:3])

        top_str = ", ".join(
            f"{m} ({mean_disp[m]:+.3f})" for m in dominant
        )
        description = (
            f"Cluster {label}: {int(mask.sum())} audits dominated by {top_str}."
        )

        patterns.append(BiasPattern(
            pattern_id=f"pattern_{label}",
            cluster_label=label,
            n_audits=int(mask.sum()),
            dominant_metrics=dominant,
            mean_disparities=mean_disp,
            description=description,
            audit_ids=cluster_ids,
        ))

    return patterns


# ---------------------------------------------------------------------------
# Private helpers
# ---------------------------------------------------------------------------


def _classification_stats(
    y_true: np.ndarray, y_pred: np.ndarray
) -> dict[str, float]:
    """Compute accuracy, TPR, FPR, and positive prediction rate."""
    n = len(y_true)
    if n == 0:
        return {"accuracy": 0.0, "tpr": 0.0, "fpr": 0.0, "positive_rate": 0.0}

    tp = int(np.sum((y_pred == 1) & (y_true == 1)))
    fp = int(np.sum((y_pred == 1) & (y_true == 0)))
    fn = int(np.sum((y_pred == 0) & (y_true == 1)))
    tn = int(np.sum((y_pred == 0) & (y_true == 0)))

    accuracy = (tp + tn) / n
    tpr = tp / (tp + fn) if (tp + fn) > 0 else 0.0
    fpr = fp / (fp + tn) if (fp + tn) > 0 else 0.0
    positive_rate = (tp + fp) / n

    return {"accuracy": accuracy, "tpr": tpr, "fpr": fpr, "positive_rate": positive_rate}


def _find_worst_metric(
    group_stats: dict[str, float], pop_stats: dict[str, float]
) -> tuple[str, float]:
    """Return the metric with the largest deviation from the population."""
    worst_metric = "accuracy"
    worst_dev = 0.0
    for metric in group_stats:
        dev = abs(group_stats[metric] - pop_stats[metric])
        if dev > worst_dev:
            worst_dev = dev
            worst_metric = metric
    return worst_metric, group_stats[worst_metric]


def _severity_from_deviation(abs_deviation: float) -> str:
    """Map absolute deviation to a severity label."""
    if abs_deviation >= 0.30:
        return "critical"
    if abs_deviation >= 0.15:
        return "high"
    if abs_deviation >= 0.05:
        return "medium"
    return "low"


def _extract_decision_path(
    tree: object,
    leaf_id: int,
    feature_names: list[str],
    ohe_names: list[str],
    cat_cols: list[str],
    encoder: OneHotEncoder | None,
) -> dict[str, str]:
    """Walk from root to *leaf_id* and reconstruct the subgroup definition."""
    children_left = tree.children_left  # type: ignore[union-attr]
    children_right = tree.children_right  # type: ignore[union-attr]
    feature_idx = tree.feature  # type: ignore[union-attr]
    threshold = tree.threshold  # type: ignore[union-attr]

    # Build parent map
    n_nodes = tree.node_count  # type: ignore[union-attr]
    parent: dict[int, tuple[int, str]] = {}
    for nid in range(n_nodes):
        left = children_left[nid]
        right = children_right[nid]
        if left != right:  # not a leaf
            parent[left] = (nid, "left")
            parent[right] = (nid, "right")

    # Walk up from leaf to root
    path: list[tuple[int, str]] = []
    current = leaf_id
    while current in parent:
        par_id, direction = parent[current]
        path.append((par_id, direction))
        current = par_id
    path.reverse()

    subgroup: dict[str, str] = {}
    for node_id, direction in path:
        feat_i = feature_idx[node_id]
        if feat_i < 0:
            continue
        fname = feature_names[feat_i]
        thr = threshold[node_id]

        # Check if this is a one-hot encoded column
        original_attr = _map_ohe_to_original(fname, ohe_names, cat_cols, encoder)
        if original_attr is not None:
            attr_name, attr_value = original_attr
            if direction == "right":  # value == 1 → belongs to this category
                subgroup[attr_name] = attr_value
        else:
            # Numeric split
            if direction == "left":
                subgroup[fname] = f"<={thr:.2f}"
            else:
                subgroup[fname] = f">{thr:.2f}"

    return subgroup


def _map_ohe_to_original(
    col_name: str,
    ohe_names: list[str],
    cat_cols: list[str],
    encoder: OneHotEncoder | None,
) -> tuple[str, str] | None:
    """Map a one-hot column name back to (original_attribute, category_value)."""
    if encoder is None or col_name not in ohe_names:
        return None
    # sklearn names are like "attr_value"
    for cat in cat_cols:
        prefix = f"{cat}_"
        if col_name.startswith(prefix):
            return cat, col_name[len(prefix):]
    return None


def _encode_for_ml(X: pd.DataFrame) -> np.ndarray:
    """Encode a mixed-type DataFrame to a numeric array for ML models.

    Categorical columns are label-encoded; all-NaN columns are zeroed out.
    """
    result = pd.DataFrame(index=X.index)
    for col in X.columns:
        series = X[col]
        if series.isna().all():
            result[col] = 0.0
            continue
        if series.dtype == "object" or hasattr(series, "cat"):
            le = LabelEncoder()
            non_null = series.fillna("__missing__")
            result[col] = le.fit_transform(non_null.astype(str)).astype(float)
        else:
            result[col] = series.fillna(0).astype(float)
    return result.values
