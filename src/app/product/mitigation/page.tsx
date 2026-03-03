import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "Bias Mitigation — Actionable AI Fairness Fixes",
  description:
    "Automated recommendations and SDK-powered strategies to remediate identified AI biases in healthcare applications. What-if simulation, threshold adjustment, resampling, and feature analysis.",
};

const strategies = [
  {
    title: "Threshold Adjustment",
    description:
      "Optimize decision thresholds independently for each demographic group to equalize outcome rates without retraining the model. ParityScope finds the threshold configuration that maximizes fairness with minimal accuracy cost.",
    example:
      "A hypertension model used a uniform 0.50 threshold. By adjusting to 0.42 for ages 18-39 and 0.55 for ages 65+, FNR parity improved by 47% while accuracy dropped only 1.8%.",
    impact: "No retraining required. Deploy in minutes.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
  {
    title: "Balanced Resampling",
    description:
      "Generate resampling strategies that correct representation imbalances in your training data. Supports oversampling of underrepresented groups, undersampling of overrepresented groups, and SMOTE adapted for clinical distributions.",
    example:
      "Training data had 72% White patients and 8% Black patients. Balanced resampling with SMOTE brought demographic parity from 0.21 to 0.06, pushing it below the regulatory threshold.",
    impact: "Requires retraining. SDK generates the resampled dataset.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
      </svg>
    ),
  },
  {
    title: "Feature Analysis & Selection",
    description:
      "Identify features that serve as proxies for protected attributes and contribute disproportionately to disparate outcomes. ParityScope recommends feature removal, decorrelation, or replacement to reduce bias while preserving clinical accuracy.",
    example:
      "Age contributed 56.7% of the hypertension model's weight, acting as a proxy for multiple protected attributes. Capping age importance at 20% reduced demographic disparity by 15 percentage points.",
    impact: "Requires retraining. Feature importance report included.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Identify the Disparity",
    description:
      "Start from your Fairness Audit results. ParityScope pinpoints which metrics fail, which demographic groups are most affected, and the severity of each disparity with confidence intervals.",
  },
  {
    step: "02",
    title: "Diagnose Root Causes",
    description:
      "Trace each identified disparity to its source: biased training data, proxy features, or threshold configuration. Root cause analysis focuses remediation where it will have the greatest impact.",
  },
  {
    step: "03",
    title: "Simulate Strategies",
    description:
      "Use the what-if simulation engine to preview the impact of each mitigation strategy on all fairness metrics and accuracy simultaneously. Compare strategies side-by-side before touching production.",
  },
  {
    step: "04",
    title: "Apply & Verify",
    description:
      "Implement the selected strategy using SDK-provided utilities. Re-run the Fairness Audit on held-out data to verify improvement and ensure no new disparities were introduced.",
  },
];

export default function MitigationPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy px-4 pb-20 pt-20 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/product"
            className="inline-flex items-center gap-2 text-body-sm font-medium text-teal-light transition-colors hover:text-teal"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Platform
          </Link>
          <h1 className="mt-6 max-w-3xl text-h1 font-bold leading-tight tracking-tight lg:text-display">
            Bias Mitigation
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-light-gray">
            Move from detection to action. ParityScope provides what-if
            simulations, automated remediation recommendations, and SDK-powered
            tools to fix the disparities your audit uncovered — while preserving
            the clinical accuracy your models need.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book a Demo
            </Link>
            <Link
              href="/product/fairness-audit"
              className="rounded-full border border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Start With an Audit
            </Link>
          </div>
        </div>
      </section>

      {/* Simulate Before You Ship */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-body-sm font-semibold uppercase tracking-wider text-teal">
                Our Philosophy
              </p>
              <h2 className="mt-3 text-h2 font-bold text-navy">
                Simulate Before You Ship
              </h2>
              <p className="mt-4 text-body-lg text-medium-gray">
                Bias mitigation should never be a leap of faith. Every strategy
                involves tradeoffs — between fairness and accuracy, between
                competing fairness metrics, between different demographic groups.
                ParityScope&apos;s what-if simulation engine lets you explore the
                entire tradeoff landscape before a single line of production code
                changes.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Preview impact on all fairness metrics simultaneously",
                  "Track accuracy tradeoffs at every threshold",
                  "Compare multiple strategies side-by-side",
                  "Ensure fixes don't introduce new disparities",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-teal"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-medium-gray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fairness-Accuracy Tradeoff Visual */}
            <div className="rounded-2xl border border-light-gray bg-off-white p-8">
              <div className="flex items-center justify-between border-b border-light-gray pb-4">
                <h3 className="text-body-sm font-semibold text-navy">
                  Fairness-Accuracy Tradeoff
                </h3>
                <span className="text-caption text-medium-gray">
                  What-If Simulator
                </span>
              </div>
              <div className="mt-6">
                {/* Chart axes */}
                <div className="relative ml-8 h-48">
                  {/* Y-axis label */}
                  <span className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-caption text-medium-gray">
                    Fairness
                  </span>
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="border-b border-light-gray" />
                    ))}
                  </div>
                  {/* Data points */}
                  <div className="absolute bottom-[20%] left-[15%] flex h-8 w-8 items-center justify-center rounded-full bg-coral/20 text-caption font-bold text-coral">
                    A
                  </div>
                  <div className="absolute bottom-[55%] left-[40%] flex h-8 w-8 items-center justify-center rounded-full bg-amber/20 text-caption font-bold text-amber">
                    B
                  </div>
                  <div className="absolute bottom-[78%] left-[58%] flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal bg-teal/20 text-caption font-bold text-teal">
                    C
                  </div>
                  <div className="absolute bottom-[85%] left-[35%] flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 text-caption font-bold text-navy">
                    D
                  </div>
                  {/* Pareto frontier (simplified as a curved line) */}
                  <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                      d="M15 80 Q35 30, 58 22 Q75 16, 90 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.8"
                      strokeDasharray="2 2"
                      className="text-teal/40"
                    />
                  </svg>
                </div>
                {/* X-axis label */}
                <p className="mt-2 text-center text-caption text-medium-gray">
                  Accuracy
                </p>
              </div>
              {/* Legend */}
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-light-gray pt-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-coral/20 text-[10px] font-bold text-coral">
                    A
                  </span>
                  <span className="text-caption text-medium-gray">
                    Current model (unfair)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber/20 text-[10px] font-bold text-amber">
                    B
                  </span>
                  <span className="text-caption text-medium-gray">
                    Threshold adjustment
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-teal bg-teal/20 text-[10px] font-bold text-teal">
                    C
                  </span>
                  <span className="text-caption text-medium-gray">
                    Optimal (recommended)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy/10 text-[10px] font-bold text-navy">
                    D
                  </span>
                  <span className="text-caption text-medium-gray">
                    Resampling + threshold
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Mitigation Strategies */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Mitigation Strategies"
            title="Three Proven Approaches to Reducing AI Bias"
            description="Each strategy targets a different root cause of bias. ParityScope recommends the optimal approach based on your audit findings and simulates the impact before you commit."
          />
          <div className="mt-16 space-y-12">
            {strategies.map((strategy, index) => (
              <div
                key={strategy.title}
                className="grid gap-8 lg:grid-cols-5"
              >
                <div className={`lg:col-span-3 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="rounded-xl border border-light-gray bg-white p-8 shadow-card">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal/10 text-teal">
                        {strategy.icon}
                      </div>
                      <div>
                        <h3 className="text-h3 font-bold text-navy">
                          {strategy.title}
                        </h3>
                        <p className="mt-1 text-body-sm text-teal">
                          {strategy.impact}
                        </p>
                      </div>
                    </div>
                    <p className="mt-5 text-medium-gray">
                      {strategy.description}
                    </p>
                  </div>
                </div>
                <div className={`lg:col-span-2 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="h-full rounded-xl border border-teal/20 bg-teal/5 p-6">
                    <div className="flex items-center gap-2">
                      <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                      </svg>
                      <span className="text-body-sm font-semibold text-teal">Real Example</span>
                    </div>
                    <p className="mt-3 text-body-sm text-navy">
                      {strategy.example}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* From Finding to Fix — 4-Step Workflow */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Workflow"
            title="From Finding to Fix"
            description="A structured four-step workflow that traces disparities to their source, generates targeted recommendations, simulates outcomes, and verifies improvement."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map((step, index) => (
              <div key={step.step} className="relative">
                {index < workflowSteps.length - 1 && (
                  <div className="absolute right-0 top-10 hidden h-0.5 w-8 translate-x-full bg-teal/30 lg:block" />
                )}
                <div className="h-full rounded-xl border border-light-gray bg-white p-6 shadow-card">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal text-base font-bold text-white">
                    {step.step}
                  </div>
                  <h3 className="mt-4 text-h4 font-semibold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-body-sm text-medium-gray">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Impact Visual */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            label="Impact"
            title="Before and After Mitigation"
            description="Real results from applying threshold adjustment and balanced resampling to a hypertension prediction model that failed 19 of 24 fairness metrics."
            theme="dark"
          />
          <div className="mt-12 space-y-4">
            {[
              { metric: "Demographic Parity", before: "0.21", after: "0.06", improved: true },
              { metric: "Equal Opportunity", before: "0.34", after: "0.08", improved: true },
              { metric: "FNR Parity", before: "1.00", after: "0.12", improved: true },
              { metric: "Calibration Diff.", before: "0.19", after: "0.05", improved: true },
              { metric: "Predictive Parity", before: "0.15", after: "0.07", improved: true },
              { metric: "Overall Accuracy", before: "66%", after: "64.2%", improved: false },
            ].map((row) => (
              <div
                key={row.metric}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-6 py-4"
              >
                <span className="text-body-sm font-medium text-white">
                  {row.metric}
                </span>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-caption text-medium-gray">Before</span>
                    <p className="text-body-sm font-semibold text-coral-light">
                      {row.before}
                    </p>
                  </div>
                  <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                  <div className="text-left">
                    <span className="text-caption text-medium-gray">After</span>
                    <p className={`text-body-sm font-semibold ${row.improved ? "text-green-light" : "text-amber"}`}>
                      {row.after}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-6 flex items-center justify-between rounded-lg border border-teal/30 bg-teal/10 px-6 py-4">
              <span className="text-body-sm font-medium text-white">
                Metrics Passing
              </span>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-caption text-medium-gray">Before</span>
                  <p className="text-body-sm font-semibold text-coral-light">
                    5 / 24
                  </p>
                </div>
                <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
                <div className="text-left">
                  <span className="text-caption text-medium-gray">After</span>
                  <p className="text-body-sm font-semibold text-green-light">
                    22 / 24
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-body-sm text-light-gray">
              Accuracy trade-off: 1.8 percentage points — from 66.0% to 64.2%
            </p>
          </div>
        </div>
      </section>

      {/* SDK Code Example */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-body-sm font-semibold uppercase tracking-wider text-teal">
                Developer Experience
              </p>
              <h2 className="mt-3 text-h2 font-bold text-navy">
                Mitigate Bias Programmatically
              </h2>
              <p className="mt-4 text-body-lg text-medium-gray">
                The mitigation SDK provides programmatic access to all
                strategies, the what-if simulator, and the recommendation engine
                — directly from your ML pipeline. No GUI required.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Load audit results and get ranked recommendations",
                  "Simulate any strategy before applying",
                  "Generate group-specific threshold configs",
                  "Verify improvements with re-audit",
                  "Export before/after comparison reports",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-teal"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-medium-gray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl border border-light-gray bg-near-black shadow-elevated">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-coral/60" />
                <div className="h-3 w-3 rounded-full bg-amber/60" />
                <div className="h-3 w-3 rounded-full bg-green/60" />
                <span className="ml-2 font-mono text-caption text-medium-gray">
                  mitigate.py
                </span>
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-body-sm leading-relaxed">
                <code>
                  <span className="text-coral-light">from</span>{" "}
                  <span className="text-teal-light">parityscope</span>{" "}
                  <span className="text-coral-light">import</span>{" "}
                  <span className="text-white">Mitigator</span>{"\n\n"}
                  <span className="text-medium-gray"># Load audit results</span>{"\n"}
                  <span className="text-white">mit</span>{" "}
                  <span className="text-coral-light">=</span>{" "}
                  <span className="text-white">Mitigator.from_audit(</span>{"\n"}
                  {"  "}
                  <span className="text-amber">&quot;audit_report.json&quot;</span>{"\n"}
                  <span className="text-white">)</span>{"\n\n"}
                  <span className="text-medium-gray"># Simulate threshold adjustment</span>{"\n"}
                  <span className="text-white">sim</span>{" "}
                  <span className="text-coral-light">=</span>{" "}
                  <span className="text-white">mit.simulate(</span>{"\n"}
                  {"  "}
                  <span className="text-teal-light">strategy</span>
                  <span className="text-coral-light">=</span>
                  <span className="text-amber">&quot;threshold_adj&quot;</span>
                  <span className="text-white">,</span>{"\n"}
                  {"  "}
                  <span className="text-teal-light">max_accuracy_loss</span>
                  <span className="text-coral-light">=</span>
                  <span className="text-teal-light">0.02</span>{"\n"}
                  <span className="text-white">)</span>{"\n\n"}
                  <span className="text-medium-gray"># Review tradeoffs</span>{"\n"}
                  <span className="text-coral-light">print</span>
                  <span className="text-white">(sim.summary())</span>{"\n"}
                  <span className="text-medium-gray"># Dem. Parity: 0.21 → 0.06</span>{"\n"}
                  <span className="text-medium-gray"># Accuracy:   66% → 64.2%</span>{"\n\n"}
                  <span className="text-medium-gray"># Apply if satisfied</span>{"\n"}
                  <span className="text-white">thresholds</span>{" "}
                  <span className="text-coral-light">=</span>{" "}
                  <span className="text-white">sim.apply()</span>{"\n"}
                  <span className="text-medium-gray"># {`{"18-39": 0.42, "65+": 0.55}`}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Fix the Bias Your Audit Found"
        description="ParityScope gives your team the strategies, simulations, and SDK tools to remediate disparities and ship fair clinical AI with confidence."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Run an Audit First", href: "/product/fairness-audit" }}
      />
    </>
  );
}
