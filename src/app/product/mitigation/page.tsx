import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";
import { Accordion } from "@/components/ui/accordion";
import { FeatureCard } from "@/components/ui/feature-card";

export const metadata: Metadata = {
  title: "Bias Mitigation — Actionable AI Fairness Fixes",
  description:
    "Automated recommendations and SDK-powered strategies to remediate identified AI biases in healthcare applications. Threshold adjustment, resampling, feature selection, and what-if simulation.",
};

const mitigationStrategies = [
  {
    icon: <span className="text-xl">🎯</span>,
    title: "Threshold Adjustment",
    description:
      "Optimize decision thresholds independently for each demographic group to equalize outcome rates without retraining the model. ParityScope finds the threshold configuration that maximizes fairness while minimizing accuracy trade-offs using Pareto-optimal search.",
  },
  {
    icon: <span className="text-xl">🔄</span>,
    title: "Training Data Resampling",
    description:
      "Generate resampling strategies that correct representation imbalances in your training data. Supports oversampling of underrepresented groups, undersampling of overrepresented groups, and synthetic minority oversampling (SMOTE) adapted for clinical data distributions.",
  },
  {
    icon: <span className="text-xl">🔍</span>,
    title: "Feature Selection & Engineering",
    description:
      "Identify features that serve as proxies for protected attributes and contribute disproportionately to disparate outcomes. ParityScope recommends feature removal, decorrelation, or replacement strategies that reduce bias while preserving clinical predictive power.",
  },
  {
    icon: <span className="text-xl">⚖️</span>,
    title: "Fairness-Constrained Retraining",
    description:
      "Apply fairness constraints directly to the model training objective. ParityScope generates configuration files for popular ML frameworks (scikit-learn, XGBoost, PyTorch) that incorporate fairness penalties into the loss function during retraining.",
  },
  {
    icon: <span className="text-xl">📊</span>,
    title: "Calibration Correction",
    description:
      "Apply post-hoc calibration techniques (Platt scaling, isotonic regression) independently per demographic group to ensure that predicted probabilities are equally reliable across populations. Particularly important for risk stratification tools.",
  },
  {
    icon: <span className="text-xl">🧪</span>,
    title: "Ensemble Debiasing",
    description:
      "Combine multiple model variants with complementary bias profiles into a debiased ensemble. ParityScope identifies which model combinations minimize aggregate bias while maintaining or improving overall clinical accuracy.",
  },
];

const mitigationSteps = [
  {
    step: "01",
    title: "Diagnose Root Causes",
    description:
      "Starting from Fairness Audit results, ParityScope traces each identified disparity back to its source: biased training data, proxy features, model architecture, or decision threshold configuration. Root cause attribution focuses remediation efforts where they will have the greatest impact.",
  },
  {
    step: "02",
    title: "Generate Recommendations",
    description:
      "The recommendation engine produces a prioritized list of mitigation strategies tailored to each identified bias. Each recommendation includes the expected fairness improvement, the predicted accuracy trade-off, and an implementation difficulty rating.",
  },
  {
    step: "03",
    title: "Simulate and Compare",
    description:
      "Before applying any fix to production, use the what-if simulator to preview the impact of each mitigation strategy on all fairness metrics simultaneously. Compare multiple strategies side by side to find the optimal balance for your clinical context.",
  },
  {
    step: "04",
    title: "Apply and Verify",
    description:
      "Implement the selected strategy using SDK-provided utilities (threshold configs, resampling scripts, feature masks). Then re-run the Fairness Audit to verify that the mitigation achieved the expected improvement and did not introduce new disparities.",
  },
];

const beforeAfterMetrics = [
  { metric: "Demographic Parity", before: 0.72, after: 0.94, threshold: 0.80 },
  { metric: "Equal Opportunity", before: 0.68, after: 0.91, threshold: 0.80 },
  { metric: "Equalized Odds", before: 0.65, after: 0.89, threshold: 0.80 },
  { metric: "Calibration", before: 0.74, after: 0.96, threshold: 0.85 },
  { metric: "Predictive Parity", before: 0.71, after: 0.92, threshold: 0.80 },
  { metric: "Min-Max Ratio", before: 0.61, after: 0.88, threshold: 0.80 },
];

const recommendationFeatures = [
  {
    icon: <span className="text-xl">📋</span>,
    title: "Prioritized Action Items",
    description:
      "Each recommendation is ranked by expected impact, implementation effort, and urgency. High-impact, low-effort strategies are surfaced first so your team can make meaningful progress quickly.",
  },
  {
    icon: <span className="text-xl">📈</span>,
    title: "Impact Projections",
    description:
      "Every recommendation includes a quantitative projection of the expected improvement for each fairness metric, along with the estimated accuracy trade-off. Projections are computed using held-out validation data.",
  },
  {
    icon: <span className="text-xl">🔗</span>,
    title: "Implementation Guides",
    description:
      "Recommendations come with step-by-step implementation instructions, including SDK code snippets, configuration templates, and links to relevant clinical fairness literature.",
  },
  {
    icon: <span className="text-xl">⚠️</span>,
    title: "Trade-off Transparency",
    description:
      "Fairness improvements sometimes involve trade-offs with overall accuracy or between competing fairness metrics. ParityScope makes these trade-offs explicit so clinical and compliance teams can make informed decisions.",
  },
];

const simulationCapabilities = [
  {
    title: "Threshold Sweep Analysis",
    description:
      "Sweep decision thresholds across the full range and visualize the fairness-accuracy frontier for every demographic group simultaneously. Identify the threshold configuration that satisfies all regulatory requirements with minimal accuracy loss. The SDK generates interactive Pareto plots showing the complete trade-off landscape.",
  },
  {
    title: "Feature Ablation Studies",
    description:
      "Systematically remove individual features or feature groups and observe the impact on every fairness metric. Identify proxy features whose removal improves fairness with negligible accuracy impact. ParityScope reports the marginal fairness contribution of each feature to guide feature engineering decisions.",
  },
  {
    title: "Resampling Strategy Comparison",
    description:
      "Compare the projected impact of different resampling approaches — random oversampling, SMOTE, Borderline-SMOTE, ADASYN, and random undersampling — on both fairness and accuracy. Each strategy is evaluated using cross-validated estimates to account for sampling variability.",
  },
  {
    title: "Counterfactual Scenario Modeling",
    description:
      "Ask what-if questions: What would fairness metrics look like if the training data had equal representation? If a specific proxy feature were removed? If the model used different architecture? Counterfactual modeling helps your team understand the fundamental drivers of bias in your clinical AI system.",
  },
];

const faqItems = [
  {
    question: "Will mitigation reduce overall model accuracy?",
    answer:
      "Most mitigation strategies involve some trade-off between fairness and overall accuracy, but the magnitude is often smaller than expected. Threshold adjustment typically costs less than 1-2% in overall accuracy. Resampling and feature selection can sometimes improve both fairness and accuracy simultaneously by removing noise or redundancy. ParityScope always reports the exact trade-off before you apply any change so you can make an informed decision.",
  },
  {
    question: "How do I choose between mitigation strategies?",
    answer:
      "ParityScope's recommendation engine ranks strategies by expected impact, implementation effort, and compatibility with your regulatory requirements. As a general rule: threshold adjustment is fastest (no retraining needed), resampling is most effective for representation-driven bias, and feature selection is best for proxy-variable-driven bias. The what-if simulator lets you compare strategies quantitatively before committing.",
  },
  {
    question: "Can I apply multiple mitigation strategies simultaneously?",
    answer:
      "Yes, and this is often the most effective approach. For example, you might apply resampling to address training data imbalance and then use threshold adjustment to fine-tune outcome rates. The what-if simulator supports stacked strategies so you can preview the combined effect before implementation.",
  },
  {
    question: "Does mitigation require retraining the model?",
    answer:
      "Not always. Threshold adjustment and calibration correction are post-hoc techniques that modify the model's decision boundaries without changing the model itself. These can be deployed immediately. Resampling, feature selection, and fairness-constrained retraining do require retraining the model, but ParityScope generates the exact configuration needed to make retraining straightforward.",
  },
  {
    question: "How do I verify that mitigation worked?",
    answer:
      "After applying a mitigation strategy, re-run the Fairness Audit on a held-out validation set to verify improvement. ParityScope generates a before/after comparison report that shows exactly how each metric changed. We recommend running the audit on a completely independent test set to avoid overfitting the mitigation to training data artifacts.",
  },
  {
    question: "Can mitigation introduce new biases for other groups?",
    answer:
      "This is a real risk, which is why ParityScope always evaluates all fairness metrics across all groups after mitigation — not just the targeted metric and group. The what-if simulator highlights cases where improving fairness for one group might worsen it for another, enabling your team to find solutions that improve equity broadly rather than shifting disparities between populations.",
  },
];

export default function MitigationPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-wider text-teal">
            Bias Mitigation
          </p>
          <h1 className="mt-3 text-h1 font-bold text-navy">
            Move From Detection to Remediation
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-medium-gray">
            Identifying bias is only half the problem. ParityScope Bias
            Mitigation provides actionable strategies, what-if simulation,
            and SDK-powered tools to fix the disparities your audit uncovered
            — while preserving the clinical accuracy your models need.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Request a Demo
            </a>
            <a
              href="/product/fairness-audit"
              className="rounded-full border border-navy px-8 py-3 text-center text-base font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Start With an Audit
            </a>
          </div>
        </div>
      </section>

      {/* Mitigation Strategies */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Mitigation Strategies"
            title="Six Proven Approaches to Reducing AI Bias"
            description="ParityScope supports a comprehensive toolkit of pre-processing, in-processing, and post-processing mitigation strategies — each tailored for healthcare AI constraints."
            align="center"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mitigationStrategies.map((strategy) => (
              <FeatureCard
                key={strategy.title}
                icon={strategy.icon}
                title={strategy.title}
                description={strategy.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How Mitigation Works */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="How It Works"
            title="From Root Cause to Verified Fix"
            description="A structured four-step workflow that traces disparities to their source, generates targeted recommendations, and verifies improvement before anything reaches production."
            align="center"
          />
          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {mitigationSteps.map((step) => (
              <div key={step.step} className="relative">
                <span className="text-5xl font-bold text-teal/20">
                  {step.step}
                </span>
                <h3 className="mt-2 text-h4 font-semibold text-navy">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-medium-gray">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Impact Visualization"
            title="Before and After Mitigation"
            description="Real results from applying threshold adjustment to a sepsis prediction model. Every metric moved from failing to passing regulatory thresholds."
            align="center"
            theme="dark"
          />
          <div className="mt-12 mx-auto max-w-4xl space-y-6">
            {beforeAfterMetrics.map((item) => (
              <div
                key={item.metric}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">
                    {item.metric}
                  </h3>
                  <span className="text-xs text-white/50">
                    Threshold: {item.threshold.toFixed(2)}
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {/* Before */}
                  <div className="flex items-center gap-4">
                    <span className="w-16 text-xs font-medium text-white/60">
                      Before
                    </span>
                    <div className="flex-1 h-4 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-red-400/80 transition-all duration-700"
                        style={{ width: `${item.before * 100}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-sm font-semibold text-red-400">
                      {item.before.toFixed(2)}
                    </span>
                  </div>
                  {/* After */}
                  <div className="flex items-center gap-4">
                    <span className="w-16 text-xs font-medium text-white/60">
                      After
                    </span>
                    <div className="flex-1 h-4 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-teal/80 transition-all duration-700"
                        style={{ width: `${item.after * 100}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-sm font-semibold text-teal">
                      {item.after.toFixed(2)}
                    </span>
                  </div>
                  {/* Threshold marker */}
                  <div className="relative h-0">
                    <div
                      className="absolute -top-[3.25rem] h-[3.25rem] border-l border-dashed border-yellow-400/50"
                      style={{ left: `calc(4rem + ${item.threshold * 100}% * (100% - 7rem) / 100%)` }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-8 rounded-full bg-red-400/80" />
                <span className="text-xs text-white/60">Before mitigation</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-8 rounded-full bg-teal/80" />
                <span className="text-xs text-white/60">After mitigation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendation Engine */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Recommendation Engine"
            title="Actionable, Prioritized Guidance"
            description="ParityScope does not just flag problems — it tells you exactly what to do about them, ranked by impact and effort, with full transparency into expected trade-offs."
            align="center"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {recommendationFeatures.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What-If Simulation */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="What-If Simulation"
            title="Preview Every Fix Before You Ship It"
            description="The what-if simulator lets you model the impact of any mitigation strategy on all fairness metrics, accuracy, and subgroup outcomes — before a single line of production code changes."
            align="center"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {simulationCapabilities.map((cap) => (
              <div
                key={cap.title}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <h3 className="text-h4 font-semibold text-navy">
                  {cap.title}
                </h3>
                <p className="mt-3 text-sm text-medium-gray">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration With Audit Flow */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Closed-Loop Workflow"
            title="Audit, Mitigate, Verify — All in One Platform"
            description="Mitigation is not a standalone step. It connects directly to the Fairness Audit and Continuous Monitoring modules to form a closed compliance loop."
            align="left"
          />
          <div className="mt-12 mx-auto max-w-4xl">
            <div className="relative">
              {/* Workflow Steps */}
              <div className="space-y-0">
                {[
                  {
                    label: "Fairness Audit",
                    description: "Run a comprehensive bias assessment across 15+ metrics and all protected attributes. The audit identifies which metrics fail, which groups are most affected, and the severity of each disparity.",
                    link: "/product/fairness-audit",
                    linkLabel: "Learn about Fairness Audit",
                  },
                  {
                    label: "Bias Mitigation",
                    description: "Receive prioritized recommendations, simulate strategies with the what-if engine, and apply fixes using SDK-provided utilities. The mitigation module traces each disparity to its root cause and targets the intervention accordingly.",
                    link: "/product/mitigation",
                    linkLabel: "You are here",
                  },
                  {
                    label: "Verification Audit",
                    description: "Re-run the Fairness Audit on held-out data to verify that the mitigation achieved the projected improvement without introducing new disparities. Generate a before/after comparison report for compliance documentation.",
                    link: "/product/fairness-audit",
                    linkLabel: "Learn about Fairness Audit",
                  },
                  {
                    label: "Continuous Monitoring",
                    description: "Deploy the mitigated model with ongoing fairness monitoring to catch post-deployment drift. If monitoring detects new disparities, the cycle restarts automatically with a targeted audit.",
                    link: "/product/monitoring",
                    linkLabel: "Learn about Monitoring",
                  },
                ].map((item, index) => (
                  <div key={item.label} className="flex gap-6">
                    {/* Vertical line and dot */}
                    <div className="flex flex-col items-center">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-sm ${index === 1 ? "bg-teal text-white" : "bg-teal/10 text-teal"}`}>
                        {index + 1}
                      </div>
                      {index < 3 && (
                        <div className="w-px flex-1 bg-light-gray" />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pb-12">
                      <h3 className="text-h4 font-semibold text-navy">
                        {item.label}
                      </h3>
                      <p className="mt-2 text-sm text-medium-gray">
                        {item.description}
                      </p>
                      <a
                        href={item.link}
                        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-teal hover:underline"
                      >
                        {item.linkLabel}
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDK Code Example */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="SDK Integration"
            title="Mitigate Bias Programmatically"
            description="The mitigation SDK provides programmatic access to all strategies, the what-if simulator, and the recommendation engine — directly from your ML pipeline."
            align="center"
          />
          <div className="mt-12 mx-auto max-w-4xl overflow-hidden rounded-xl border border-light-gray bg-navy shadow-card">
            <div className="flex items-center gap-2 border-b border-white/10 px-6 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-4 text-xs text-white/50">mitigation_pipeline.py</span>
            </div>
            <pre className="overflow-x-auto p-6 text-sm leading-relaxed text-white/90">
              <code>{`import parityscope as ps

# Load audit results from a previous run
audit = ps.FairnessAudit.load("fairness_report_Q1_2026.json")

# Get prioritized mitigation recommendations
recommendations = ps.Mitigator.recommend(
    audit_results=audit,
    strategies=["threshold_adjustment", "resampling",
                "feature_selection", "calibration"],
    max_accuracy_loss=0.02  # 2% accuracy budget
)

# Preview the top recommendation with what-if simulation
simulation = recommendations[0].simulate(
    y_true=val_labels,
    y_pred=model.predict(val_features),
    sensitive_features=val_demographics
)
print(simulation.summary())  # Before/after for all metrics

# Apply threshold adjustment (no retraining needed)
adjusted_thresholds = recommendations[0].apply()
# Returns: {"group_A": 0.48, "group_B": 0.52, "group_C": 0.50}

# Verify with a fresh audit on held-out test data
verification = ps.FairnessAudit(
    metrics=audit.config.metrics,
    protected_attributes=audit.config.attributes,
    thresholds=audit.config.thresholds
).run(
    y_true=test_labels,
    y_pred=(model.predict_proba(test_features) > adjusted_thresholds),
    sensitive_features=test_demographics
)

verification.export_pdf("mitigation_verification_Q1_2026.pdf")`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            label="FAQ"
            title="Frequently Asked Questions"
            description="Common questions about ParityScope Bias Mitigation and how to move from detection to remediation effectively."
            align="center"
          />
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Fix the Bias Your Audit Found"
        description="ParityScope Bias Mitigation gives your team the strategies, simulations, and SDK tools to remediate disparities and ship fair clinical AI."
        primaryCTA={{ label: "Request a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Run an Audit First", href: "/product/fairness-audit" }}
        theme="navy"
      />
    </>
  );
}
