"""Trade-off analysis between fairness interventions.

Analyzes and compares the impact of different fairness mitigation
strategies on accuracy and other fairness metrics.
"""

from __future__ import annotations

from dataclasses import dataclass, field

from parityscope.audit.result import AuditResult, FairnessLevel


@dataclass
class TradeoffAnalysis:
    """Analysis of a single intervention's trade-offs."""

    intervention: str
    target_metric: str
    improvement: float
    accuracy_impact: float
    other_metrics_impact: dict[str, float]
    net_benefit_score: float
    recommendation: str
    warnings: list[str]


def analyze_tradeoffs(
    result: AuditResult,
    simulation_results: list[dict] | None = None,
) -> list[TradeoffAnalysis]:
    """Analyze trade-offs between fairness interventions.

    If simulation results are provided (from simulation.interventions),
    uses actual data. Otherwise generates estimates based on fairness
    impossibility theorem relationships.

    Args:
        result: Audit result to analyze.
        simulation_results: Optional simulation output dicts.

    Returns:
        List of TradeoffAnalysis sorted by net benefit.
    """
    analyses: list[TradeoffAnalysis] = []

    if simulation_results:
        for sim in simulation_results:
            intervention = sim.get("intervention", "unknown")
            target = sim.get("target_metric", "unknown")

            if intervention == "threshold_adjustment":
                baseline = sim.get("baseline", {})
                optimized = sim.get("optimized", {})
                improvement_data = sim.get("improvement", {})

                disp_reduction = float(improvement_data.get("disparity_reduction", 0))
                acc_change = float(improvement_data.get("accuracy_change", 0))
                net_benefit = disp_reduction * 2.0 + acc_change

                warnings_list: list[str] = []
                if acc_change < -0.03:
                    warnings_list.append(
                        f"Accuracy drops by {abs(acc_change) * 100:.1f}% — "
                        f"may be clinically significant"
                    )

                rec = (
                    f"Threshold adjustment reduces {target} disparity by "
                    f"{disp_reduction:.4f} with {acc_change * 100:+.1f}% accuracy impact."
                )
                if net_benefit > 0:
                    rec += " Recommended."
                else:
                    rec += " Trade-off may not be favorable."

                analyses.append(TradeoffAnalysis(
                    intervention="Threshold Adjustment",
                    target_metric=target,
                    improvement=disp_reduction,
                    accuracy_impact=acc_change,
                    other_metrics_impact={},
                    net_benefit_score=round(net_benefit, 4),
                    recommendation=rec,
                    warnings=warnings_list,
                ))

            elif intervention == "balanced_resampling":
                baseline_disp = float(sim.get("baseline_disparity", 0))
                est = sim.get("estimated_disparity", {})
                est_mean = float(est.get("mean", baseline_disp))
                improvement = baseline_disp - est_mean

                net_benefit = improvement * 2.0  # No direct accuracy cost

                analyses.append(TradeoffAnalysis(
                    intervention="Balanced Resampling",
                    target_metric=target,
                    improvement=improvement,
                    accuracy_impact=0.0,
                    other_metrics_impact={},
                    net_benefit_score=round(net_benefit, 4),
                    recommendation=(
                        f"Resampling estimated to reduce {target} disparity by "
                        f"{improvement:.4f}. Requires model retraining."
                    ),
                    warnings=[],
                ))

    # Generate synthetic estimates for unfair metrics
    if not simulation_results:
        for metric in result.unfair_metrics:
            parts = metric.metric_name.split(":")
            metric_base = parts[-1]

            # Threshold adjustment estimate
            est_improvement = min(metric.disparity * 0.6, 0.15)
            est_acc_loss = -est_improvement * 0.2

            analyses.append(TradeoffAnalysis(
                intervention="Threshold Adjustment (estimated)",
                target_metric=metric.metric_name,
                improvement=round(est_improvement, 4),
                accuracy_impact=round(est_acc_loss, 4),
                other_metrics_impact={},
                net_benefit_score=round(est_improvement * 2.0 + est_acc_loss, 4),
                recommendation=(
                    f"Estimated: threshold adjustment could reduce {metric.display_name} "
                    f"disparity by ~{est_improvement:.2f} with ~{abs(est_acc_loss) * 100:.1f}% "
                    f"accuracy cost. Run `parityscope simulate` for precise numbers."
                ),
                warnings=["Estimates based on typical ranges — run simulation for precision"],
            ))

            # Resampling estimate
            est_resample = min(metric.disparity * 0.3, 0.08)
            analyses.append(TradeoffAnalysis(
                intervention="Balanced Resampling (estimated)",
                target_metric=metric.metric_name,
                improvement=round(est_resample, 4),
                accuracy_impact=0.0,
                other_metrics_impact={},
                net_benefit_score=round(est_resample * 2.0, 4),
                recommendation=(
                    f"Estimated: resampling could reduce disparity by ~{est_resample:.2f}. "
                    f"Requires retraining."
                ),
                warnings=["Estimates based on typical ranges — run simulation for precision"],
            ))

    analyses.sort(key=lambda a: a.net_benefit_score, reverse=True)
    return analyses
