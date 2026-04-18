"""AI/ML-powered fairness detection, monitoring, and recommendation enhancements."""

from __future__ import annotations

__all__: list[str] = []

try:
    from parityscope.ai.detection import (
        BiasPattern,
        cluster_bias_patterns,
        detect_proxies_ml,
        discover_subgroups_ml,
    )

    __all__ += [
        "BiasPattern",
        "cluster_bias_patterns",
        "detect_proxies_ml",
        "discover_subgroups_ml",
    ]
except ImportError:  # pragma: no cover
    pass

try:
    from parityscope.ai.monitoring import (
        AnomalyResult,
        ChangePointResult,
        ForecastResult,
        StatisticalDriftDetector,
        detect_anomalies,
        detect_changepoints,
        forecast_metric,
    )

    __all__ += [
        "AnomalyResult",
        "ChangePointResult",
        "ForecastResult",
        "StatisticalDriftDetector",
        "detect_anomalies",
        "detect_changepoints",
        "forecast_metric",
    ]
except ImportError:  # pragma: no cover
    pass

try:
    from parityscope.ai.recommendations import (
        EffectivenessRecord,
        ExecutiveSummary,
        RemediationPlan,
        RemediationStep,
        generate_executive_summary,
        generate_remediation_plan,
        rank_strategies_ml,
        track_mitigation_effectiveness,
    )

    __all__ += [
        "EffectivenessRecord",
        "ExecutiveSummary",
        "RemediationPlan",
        "RemediationStep",
        "generate_executive_summary",
        "generate_remediation_plan",
        "rank_strategies_ml",
        "track_mitigation_effectiveness",
    ]
except ImportError:  # pragma: no cover
    pass

try:
    from parityscope.ai.llm import (
        draft_compliance_narrative,
        generate_narrative,
        interpret_root_cause,
    )
    from parityscope.ai.llm import (
        is_available as llm_is_available,
    )

    __all__ += [
        "draft_compliance_narrative",
        "generate_narrative",
        "interpret_root_cause",
        "llm_is_available",
    ]
except ImportError:  # pragma: no cover
    pass
