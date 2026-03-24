"""Root cause analysis orchestrator.

Coordinates all sub-analyzers (proxy detection, label bias, feature importance,
representation) into a unified report.
"""

from __future__ import annotations

from dataclasses import dataclass, field

import numpy as np
import pandas as pd

from parityscope.rootcause.feature_importance import FeatureImportance, analyze_feature_importance
from parityscope.rootcause.label_bias import LabelBiasFinding, detect_label_bias
from parityscope.rootcause.proxy_detection import ProxyVariable, detect_proxies
from parityscope.rootcause.representation import RepresentationReport, analyze_representation


@dataclass
class RootCauseReport:
    """Complete root cause analysis report."""

    proxy_variables: list[ProxyVariable]
    label_bias_findings: list[LabelBiasFinding]
    feature_importance: list[FeatureImportance]
    representation: RepresentationReport
    summary: str
    critical_findings: list[str]

    def to_dict(self) -> dict:
        """Serialize to JSON-compatible dict."""
        return {
            "proxy_variables": [
                {
                    "feature": p.feature,
                    "protected_attribute": p.protected_attribute,
                    "correlation": p.correlation,
                    "correlation_type": p.correlation_type,
                    "severity": p.severity,
                    "recommendation": p.recommendation,
                }
                for p in self.proxy_variables
            ],
            "label_bias_findings": [
                {
                    "attribute": lb.attribute,
                    "finding": lb.finding,
                    "severity": lb.severity,
                    "base_rates": lb.base_rates,
                    "disparity": lb.disparity,
                    "statistical_test": lb.statistical_test,
                    "recommendation": lb.recommendation,
                }
                for lb in self.label_bias_findings
            ],
            "feature_importance": [
                {
                    "feature": fi.feature,
                    "importance_score": fi.importance_score,
                    "importance_pct": fi.importance_pct,
                    "bias_contribution": fi.bias_contribution,
                    "direction": fi.direction,
                }
                for fi in self.feature_importance
            ],
            "representation": {
                "group_proportions": self.representation.group_proportions,
                "imbalance_ratios": self.representation.imbalance_ratios,
                "underrepresented_groups": self.representation.underrepresented_groups,
                "warnings": self.representation.warnings,
                "recommendations": self.representation.recommendations,
            },
            "summary": self.summary,
            "critical_findings": self.critical_findings,
        }


class RootCauseAnalysis:
    """Orchestrates root cause analysis for fairness disparities."""

    def __init__(self, protected_attributes: list[str]):
        self.protected_attributes = protected_attributes

    def run(
        self,
        X: pd.DataFrame,
        y_true: np.ndarray,
        y_pred: np.ndarray,
        demographics: pd.DataFrame,
        model: object | None = None,
    ) -> RootCauseReport:
        """Run all root cause sub-analyzers.

        Args:
            X: Feature DataFrame.
            y_true: Ground truth labels.
            y_pred: Model predictions.
            demographics: Demographic data.
            model: Optional model object for feature importance.

        Returns:
            RootCauseReport with all findings.
        """
        # Proxy detection
        proxies = detect_proxies(X, demographics, self.protected_attributes)

        # Label bias
        label_findings = detect_label_bias(
            y_true, demographics, self.protected_attributes, X
        )

        # Feature importance
        feat_importance = analyze_feature_importance(
            X, y_true, y_pred, demographics, self.protected_attributes, model
        )

        # Representation analysis
        representation = analyze_representation(
            demographics, self.protected_attributes, X
        )

        # Generate critical findings
        critical: list[str] = []

        for p in proxies:
            if p.severity == "high":
                critical.append(
                    f"High proxy correlation: '{p.feature}' correlates {p.correlation:.2f} "
                    f"with '{p.protected_attribute}'"
                )

        for lb in label_findings:
            if lb.severity == "high":
                critical.append(
                    f"Significant label bias: {lb.disparity * 100:.1f}% base rate "
                    f"disparity across {lb.attribute} groups (p < 0.001)"
                )

        for fi in feat_importance:
            if fi.importance_pct > 40:
                critical.append(
                    f"Feature dominance: '{fi.feature}' accounts for "
                    f"{fi.importance_pct:.1f}% of model behavior — "
                    f"model may be over-relying on a single feature"
                )

        for ug in representation.underrepresented_groups:
            if ug["count"] < 30:
                critical.append(
                    f"Underrepresentation: '{ug['group']}' in '{ug['attribute']}' "
                    f"has only {ug['count']} samples"
                )

        # Generate summary
        summary = self._generate_summary(
            proxies, label_findings, feat_importance, representation, critical
        )

        return RootCauseReport(
            proxy_variables=proxies,
            label_bias_findings=label_findings,
            feature_importance=feat_importance,
            representation=representation,
            summary=summary,
            critical_findings=critical,
        )

    def _generate_summary(
        self,
        proxies: list[ProxyVariable],
        label_findings: list[LabelBiasFinding],
        feat_importance: list[FeatureImportance],
        representation: RepresentationReport,
        critical: list[str],
    ) -> str:
        """Generate narrative summary of all findings."""
        parts: list[str] = []

        if critical:
            parts.append(
                f"ROOT CAUSE ANALYSIS identified {len(critical)} critical finding(s)."
            )
        else:
            parts.append("ROOT CAUSE ANALYSIS found no critical issues.")

        if proxies:
            high = sum(1 for p in proxies if p.severity == "high")
            parts.append(
                f"Proxy Detection: {len(proxies)} proxy variable(s) found "
                f"({high} high severity)."
            )

        if label_findings:
            parts.append(
                f"Label Bias: {len(label_findings)} finding(s) — "
                f"base rate disparities detected across protected attributes."
            )

        if feat_importance:
            top = feat_importance[0]
            parts.append(
                f"Feature Importance: Top feature '{top.feature}' accounts for "
                f"{top.importance_pct:.1f}% of model behavior."
            )

        if representation.warnings:
            parts.append(
                f"Representation: {len(representation.warnings)} warning(s) "
                f"about data balance."
            )

        return " ".join(parts)
