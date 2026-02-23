"""Simulation — what-if analysis for fairness interventions."""

from parityscope.simulation.interventions import (
    simulate_threshold_adjustment,
    simulate_resampling,
    compare_interventions,
)

__all__ = ["simulate_threshold_adjustment", "simulate_resampling", "compare_interventions"]
