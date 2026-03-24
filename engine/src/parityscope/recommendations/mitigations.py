"""Mitigation strategy knowledge base.

Maps fairness metric failures to actionable mitigation strategies
with difficulty estimates and trade-off warnings.
"""

from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class MitigationStrategy:
    """A fairness mitigation strategy."""

    id: str
    strategy: str
    description: str
    difficulty: str  # low, medium, high
    expected_impact: str
    trade_offs: list[str]
    applicable_metrics: list[str]
    requires_retraining: bool
    estimated_effort: str


# Knowledge base of mitigation strategies
_STRATEGIES: list[MitigationStrategy] = [
    MitigationStrategy(
        id="MIT-001",
        strategy="Per-group threshold adjustment",
        description=(
            "Set different classification thresholds for each demographic group to "
            "equalize the target fairness metric. Does not require model retraining."
        ),
        difficulty="low",
        expected_impact="Can significantly reduce disparity in prediction rates and TPR/FPR",
        trade_offs=["May reduce overall accuracy by 1-3%", "Requires maintaining group-specific thresholds"],
        applicable_metrics=[
            "demographic_parity", "equal_opportunity", "equalized_odds",
            "false_positive_rate_parity", "false_negative_rate_parity",
        ],
        requires_retraining=False,
        estimated_effort="1-2 weeks",
    ),
    MitigationStrategy(
        id="MIT-002",
        strategy="Post-hoc calibration (per-group Platt scaling)",
        description=(
            "Apply group-specific Platt scaling or isotonic regression to calibrate "
            "predicted probabilities for each demographic group separately."
        ),
        difficulty="medium",
        expected_impact="Equalizes calibration quality across groups",
        trade_offs=["Requires a held-out calibration set", "May not fix classification disparities"],
        applicable_metrics=[
            "calibration_difference", "well_calibration", "score_distribution_difference",
        ],
        requires_retraining=False,
        estimated_effort="1-2 weeks",
    ),
    MitigationStrategy(
        id="MIT-003",
        strategy="Training data augmentation",
        description=(
            "Augment training data with additional samples from underrepresented "
            "groups through oversampling, synthetic generation (SMOTE), or targeted collection."
        ),
        difficulty="medium",
        expected_impact="Improves model performance for underrepresented groups",
        trade_offs=["Synthetic data may not capture real patterns", "Additional data collection costs"],
        applicable_metrics=[
            "equal_opportunity", "false_negative_rate_parity", "accuracy_parity",
            "predictive_parity",
        ],
        requires_retraining=True,
        estimated_effort="2-4 weeks",
    ),
    MitigationStrategy(
        id="MIT-004",
        strategy="Balanced resampling",
        description=(
            "Resample training data to equalize group sizes before training. "
            "Options: undersample majority, oversample minority, or hybrid (SMOTE-ENN)."
        ),
        difficulty="low",
        expected_impact="Reduces bias from class/group imbalance",
        trade_offs=["Undersampling loses data", "Oversampling may overfit"],
        applicable_metrics=[
            "demographic_parity", "equal_opportunity", "equalized_odds",
            "accuracy_parity",
        ],
        requires_retraining=True,
        estimated_effort="1-2 weeks",
    ),
    MitigationStrategy(
        id="MIT-005",
        strategy="Fairness-constrained optimization",
        description=(
            "Add fairness constraints directly to the training objective function. "
            "Use techniques like constrained optimization or Lagrangian relaxation "
            "to enforce fairness during training."
        ),
        difficulty="high",
        expected_impact="Directly optimizes for fairness-accuracy trade-off",
        trade_offs=[
            "Complex implementation", "May significantly reduce accuracy",
            "Requires choosing which fairness metric to optimize (impossibility theorem)",
        ],
        applicable_metrics=[
            "demographic_parity", "equal_opportunity", "equalized_odds",
            "predictive_parity", "treatment_equality",
        ],
        requires_retraining=True,
        estimated_effort="4-8 weeks",
    ),
    MitigationStrategy(
        id="MIT-006",
        strategy="Proxy variable removal / decorrelation",
        description=(
            "Remove features that act as proxies for protected attributes, or apply "
            "decorrelation techniques (adversarial training, orthogonal projection) to "
            "reduce their influence."
        ),
        difficulty="medium",
        expected_impact="Reduces indirect discrimination pathways",
        trade_offs=["May lose predictive signal", "Proxies may be clinically necessary"],
        applicable_metrics=[
            "demographic_parity", "equal_opportunity", "equalized_odds",
            "false_positive_rate_parity", "false_negative_rate_parity",
        ],
        requires_retraining=True,
        estimated_effort="2-4 weeks",
    ),
    MitigationStrategy(
        id="MIT-007",
        strategy="Adversarial debiasing",
        description=(
            "Train an adversarial network that tries to predict group membership from "
            "model representations. Penalize the main model for leaking group information."
        ),
        difficulty="high",
        expected_impact="Removes group information from learned representations",
        trade_offs=["Complex training procedure", "May reduce overall performance", "Hard to tune"],
        applicable_metrics=[
            "demographic_parity", "equalized_odds", "score_distribution_difference",
        ],
        requires_retraining=True,
        estimated_effort="4-8 weeks",
    ),
    MitigationStrategy(
        id="MIT-008",
        strategy="Label review and correction",
        description=(
            "Conduct clinical review of ground truth labels, focusing on cases where "
            "labeling criteria may differ across demographic groups (ascertainment bias)."
        ),
        difficulty="high",
        expected_impact="Addresses root cause of label bias",
        trade_offs=["Labor-intensive", "Requires clinical expertise", "May reduce dataset size"],
        applicable_metrics=[
            "equal_opportunity", "false_negative_rate_parity",
            "predictive_parity", "accuracy_parity",
        ],
        requires_retraining=True,
        estimated_effort="4-12 weeks",
    ),
    MitigationStrategy(
        id="MIT-009",
        strategy="Reject option classification",
        description=(
            "Add an 'uncertain' category for predictions near the decision boundary. "
            "Route uncertain cases to human review instead of automated decisions."
        ),
        difficulty="medium",
        expected_impact="Reduces harmful errors by deferring uncertain cases",
        trade_offs=["Increases human workload", "Not suitable for all clinical workflows"],
        applicable_metrics=[
            "false_positive_rate_parity", "false_negative_rate_parity",
            "false_discovery_rate_parity", "false_omission_rate_parity",
        ],
        requires_retraining=False,
        estimated_effort="2-3 weeks",
    ),
    MitigationStrategy(
        id="MIT-010",
        strategy="Equalized odds post-processing",
        description=(
            "Apply the Hardt et al. (2016) equalized odds post-processing: "
            "solve a linear program to find group-specific randomized thresholds "
            "that satisfy equalized odds constraints."
        ),
        difficulty="medium",
        expected_impact="Directly achieves equalized odds",
        trade_offs=["Introduces randomness", "May reduce accuracy", "Requires group labels at inference"],
        applicable_metrics=[
            "equalized_odds", "equal_opportunity",
            "false_positive_rate_parity", "false_negative_rate_parity",
        ],
        requires_retraining=False,
        estimated_effort="1-2 weeks",
    ),
    MitigationStrategy(
        id="MIT-011",
        strategy="Pre-processing: disparate impact remover",
        description=(
            "Transform feature distributions to remove disparate impact while "
            "preserving rank-ordering within groups."
        ),
        difficulty="medium",
        expected_impact="Reduces disparate impact in features before training",
        trade_offs=["May reduce predictive power", "Requires careful validation"],
        applicable_metrics=["demographic_parity", "score_distribution_difference"],
        requires_retraining=True,
        estimated_effort="2-4 weeks",
    ),
    MitigationStrategy(
        id="MIT-012",
        strategy="Data collection improvement",
        description=(
            "Design and implement targeted data collection to improve representation "
            "of underrepresented groups. Include stratified sampling requirements "
            "in study protocols."
        ),
        difficulty="high",
        expected_impact="Addresses fundamental data representation issues",
        trade_offs=["Long timeline", "Expensive", "May require IRB approval"],
        applicable_metrics=[
            "equal_opportunity", "accuracy_parity", "false_negative_rate_parity",
            "demographic_parity",
        ],
        requires_retraining=True,
        estimated_effort="3-12 months",
    ),
    MitigationStrategy(
        id="MIT-013",
        strategy="Clinical workflow changes",
        description=(
            "Implement human-in-the-loop review for AI predictions affecting "
            "demographic groups identified as at-risk. Add clinical decision "
            "support warnings for flagged populations."
        ),
        difficulty="medium",
        expected_impact="Mitigates harm without changing the model",
        trade_offs=["Increases clinical burden", "Requires workflow integration"],
        applicable_metrics=[
            "false_negative_rate_parity", "false_positive_rate_parity",
            "treatment_equality",
        ],
        requires_retraining=False,
        estimated_effort="4-8 weeks",
    ),
    MitigationStrategy(
        id="MIT-014",
        strategy="Ensemble with fairness-aware selection",
        description=(
            "Train multiple models and select or weight them based on fairness "
            "criteria. Use Pareto-optimal model selection to balance accuracy "
            "and fairness."
        ),
        difficulty="high",
        expected_impact="Better accuracy-fairness trade-off than single model",
        trade_offs=["Increased complexity", "Higher compute cost", "Harder to interpret"],
        applicable_metrics=[
            "equalized_odds", "equal_opportunity", "accuracy_parity",
            "predictive_parity",
        ],
        requires_retraining=True,
        estimated_effort="4-8 weeks",
    ),
    MitigationStrategy(
        id="MIT-015",
        strategy="Separate models per population",
        description=(
            "Train separate models for different demographic groups, optimizing "
            "performance within each group independently."
        ),
        difficulty="high",
        expected_impact="Maximizes per-group performance",
        trade_offs=[
            "Requires sufficient data per group", "Maintenance burden",
            "Regulatory concerns about differential treatment",
        ],
        applicable_metrics=[
            "accuracy_parity", "equal_opportunity", "calibration_difference",
        ],
        requires_retraining=True,
        estimated_effort="6-12 weeks",
    ),
]


def get_mitigation_strategies(
    metric_name: str,
    disparity: float = 0.0,
    root_cause_findings: dict | None = None,
) -> list[MitigationStrategy]:
    """Get applicable mitigation strategies for a metric failure.

    Args:
        metric_name: The failing metric (e.g., "equal_opportunity").
        disparity: The observed disparity value.
        root_cause_findings: Optional root cause info to prioritize strategies.

    Returns:
        List of applicable MitigationStrategy sorted by difficulty (easiest first).
    """
    # Strip attribute prefix if present (e.g., "race:equal_opportunity" -> "equal_opportunity")
    if ":" in metric_name:
        metric_name = metric_name.split(":")[-1]

    applicable = [
        s for s in _STRATEGIES
        if metric_name in s.applicable_metrics
    ]

    # Prioritize based on root cause findings
    if root_cause_findings:
        has_proxies = root_cause_findings.get("has_proxy_variables", False)
        has_label_bias = root_cause_findings.get("has_label_bias", False)
        has_underrepresentation = root_cause_findings.get("has_underrepresentation", False)

        def _priority(s: MitigationStrategy) -> int:
            score = 0
            if has_proxies and "proxy" in s.strategy.lower():
                score -= 10
            if has_label_bias and "label" in s.strategy.lower():
                score -= 10
            if has_underrepresentation and ("data collection" in s.strategy.lower() or "augment" in s.strategy.lower()):
                score -= 10
            # Prefer non-retraining for quick wins
            if not s.requires_retraining:
                score -= 5
            difficulty_map = {"low": 0, "medium": 1, "high": 2}
            score += difficulty_map.get(s.difficulty, 1)
            return score

        applicable.sort(key=_priority)
    else:
        # Default: sort by difficulty
        difficulty_order = {"low": 0, "medium": 1, "high": 2}
        applicable.sort(key=lambda s: difficulty_order.get(s.difficulty, 1))

    return applicable
