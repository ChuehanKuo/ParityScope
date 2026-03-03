import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "Fairness Audit — Comprehensive AI Bias Detection",
  description:
    "Detect and quantify AI bias across 15+ fairness metrics and all protected attributes with ParityScope's Fairness Audit. Regulation-mapped reports for EU AI Act, Section 1557, and more.",
};

const auditSteps = [
  {
    step: "01",
    title: "Connect Your Model",
    description:
      "Point the SDK at your clinical AI model — risk scores, diagnostic classifiers, treatment recommenders. Provide predictions and demographic data at any of our three data tiers.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Select Jurisdiction & Domain",
    description:
      "Choose your regulatory framework (EU AI Act, Section 1557, South Korea, Taiwan) and clinical domain. The engine automatically selects the appropriate metrics and thresholds.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Run the Audit",
    description:
      "The engine evaluates your model across every selected metric and protected attribute, including intersectional combinations. All computation happens locally on your infrastructure.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Review & Export",
    description:
      "Get a comprehensive report with metric-by-metric breakdowns, regulatory compliance verdicts, and actionable findings. Export as PDF for regulators or JSON for programmatic use.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
];

const classificationMetrics = [
  {
    name: "Demographic Parity",
    description:
      "Equal positive prediction rates across groups, regardless of true outcomes. Ensures approval or diagnosis rates are independent of protected attributes.",
  },
  {
    name: "Equal Opportunity",
    description:
      "Equal true positive rates across groups. Patients who truly have a condition are equally likely to be correctly identified regardless of demographics.",
  },
  {
    name: "Equalized Odds",
    description:
      "Equal true positive and false positive rates simultaneously. Prevents achieving equal sensitivity at the cost of disproportionate false alarms for certain groups.",
  },
  {
    name: "Predictive Parity",
    description:
      "Equal positive predictive value across groups. When the model flags a patient as high-risk, the actual risk should not depend on their demographic group.",
  },
  {
    name: "Accuracy Parity",
    description:
      "Equal overall accuracy across demographic groups. Ensures the model does not systematically perform better for one population than another.",
  },
  {
    name: "Treatment Equality",
    description:
      "Equal ratio of false positives to false negatives across groups. Even when error rates are similar, imbalanced error types indicate different failure modes.",
  },
  {
    name: "FPR Parity",
    description:
      "Equal false positive rates across groups. Ensures healthy patients face the same probability of unnecessary follow-ups regardless of demographics.",
  },
  {
    name: "FNR Parity",
    description:
      "Equal false negative rates across groups. A disparity here means some populations are systematically under-diagnosed with life-threatening consequences.",
  },
  {
    name: "FDR Parity",
    description:
      "Equal false discovery rates across groups. Ensures the proportion of false positives among all positive predictions is consistent across populations.",
  },
  {
    name: "FOR Parity",
    description:
      "Equal false omission rates across groups. Ensures the proportion of missed cases among all negative predictions does not vary by demographic group.",
  },
  {
    name: "NPV Parity",
    description:
      "Equal negative predictive value across groups. When the model says a patient is low-risk, that assessment should be equally reliable for all populations.",
  },
  {
    name: "Specificity Parity",
    description:
      "Equal true negative rates across groups. The model correctly identifies healthy patients at equal rates across demographic populations.",
  },
];

const calibrationMetrics = [
  {
    name: "Calibration Difference",
    description:
      "Measures whether predicted probabilities match observed outcome frequencies equally across demographic groups. Critical for risk scores where clinicians act on probability outputs.",
  },
  {
    name: "Well Calibration (Brier Score)",
    description:
      "Overall calibration quality via Brier score, evaluated per group. Detects populations where the model's confidence is systematically miscalibrated.",
  },
  {
    name: "Score Distribution (KS Statistic)",
    description:
      "Kolmogorov-Smirnov test comparing predicted score distributions across groups. Identifies systematic distributional shifts that indicate fundamentally different model behavior.",
  },
];

const protectedAttributes = [
  {
    name: "Race & Ethnicity",
    description: "All reported racial and ethnic categories with intersectional breakdowns.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    name: "Gender",
    description: "Binary and non-binary gender analysis with self-reported identity support.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    name: "Age",
    description: "Configurable age bands with clinical relevance — pediatric, adult, geriatric.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    name: "Insurance Status",
    description: "Medicare, Medicaid, private, uninsured — a key proxy for socioeconomic access.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    name: "Socioeconomic Status",
    description: "Income level, education, and area deprivation indices for equity analysis.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
  },
  {
    name: "Language",
    description: "Primary language and limited English proficiency for communication-dependent models.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
      </svg>
    ),
  },
  {
    name: "Disability Status",
    description: "Physical, cognitive, and sensory disability categories for accessibility-aware audits.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    name: "Geographic Location",
    description: "Urban, suburban, rural, frontier — geography impacts model performance and access.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
];

const dataTiers = [
  {
    tier: "Minimal",
    label: "Predictions Only",
    description:
      "Provide model predictions and demographic labels only. Get core fairness metrics like demographic parity and equal opportunity without exposing any clinical features.",
    metrics: "Core classification metrics (6+)",
    bestFor: "Quick preliminary assessments and privacy-constrained environments",
  },
  {
    tier: "Standard",
    label: "Predictions + Demographics",
    description:
      "Add predicted probabilities and ground truth labels. Unlock calibration metrics, intersectional analysis, and threshold sensitivity analysis.",
    metrics: "Full classification + calibration metrics (12+)",
    bestFor: "Comprehensive fairness audits and regulatory compliance reporting",
  },
  {
    tier: "Full",
    label: "Raw Features Included",
    description:
      "Include raw model features for feature importance analysis and root cause identification. Understand why bias exists, not just where.",
    metrics: "All metrics + feature analysis (15+)",
    bestFor: "Root cause analysis and mitigation strategy development",
  },
];

export default function FairnessAuditPage() {
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
            Fairness Audit
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-light-gray">
            Comprehensive bias detection across every protected attribute — race,
            gender, age, socioeconomic status, and more. Quantify disparities with
            15+ fairness metrics and generate regulation-mapped audit reports.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Request an Audit
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* How Audit Works — 4 Steps */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="How It Works"
            title="Four Steps to a Complete Fairness Audit"
            description="From model connection to regulatory-ready report, a full fairness audit completes in minutes with the SDK."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {auditSteps.map((step, index) => (
              <div key={step.step} className="relative">
                {index < auditSteps.length - 1 && (
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

      {/* 15+ Metrics — Classification */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Metrics Library"
            title="15+ Fairness Metrics, Grouped by Category"
            description="Every metric is computed per protected attribute, per group, and across intersectional combinations. Results include statistical significance testing and regulatory compliance mapping."
          />

          {/* Classification Metrics */}
          <div className="mt-16">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
                </svg>
              </div>
              <h3 className="text-h3 font-bold text-navy">Classification Metrics</h3>
              <span className="rounded-full bg-teal/10 px-3 py-1 text-caption font-semibold text-teal">
                12 metrics
              </span>
            </div>
            <p className="mt-3 max-w-3xl text-medium-gray">
              Evaluate whether your model&apos;s classification decisions are equitable across demographic groups. Each metric captures a different dimension of fairness.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {classificationMetrics.map((metric) => (
                <div
                  key={metric.name}
                  className="rounded-lg border border-light-gray bg-white p-5 shadow-card"
                >
                  <h4 className="text-body font-semibold text-navy">{metric.name}</h4>
                  <p className="mt-2 text-body-sm text-medium-gray">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Calibration Metrics */}
          <div className="mt-16">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral/10 text-coral">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                </svg>
              </div>
              <h3 className="text-h3 font-bold text-navy">Calibration Metrics</h3>
              <span className="rounded-full bg-coral/10 px-3 py-1 text-caption font-semibold text-coral">
                3 metrics
              </span>
            </div>
            <p className="mt-3 max-w-3xl text-medium-gray">
              Evaluate whether your model&apos;s predicted probabilities are equally well-calibrated across groups. Critical for risk-score models where clinicians act on probability outputs.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {calibrationMetrics.map((metric) => (
                <div
                  key={metric.name}
                  className="rounded-lg border border-light-gray bg-white p-5 shadow-card"
                >
                  <h4 className="text-body font-semibold text-navy">{metric.name}</h4>
                  <p className="mt-2 text-body-sm text-medium-gray">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Protected Attributes */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Protected Attributes"
            title="Every Dimension of Patient Demographics"
            description="ParityScope audits across all protected attributes defined by healthcare regulations and clinical fairness standards."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {protectedAttributes.map((attr) => (
              <div
                key={attr.name}
                className="rounded-xl border border-light-gray p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
                  {attr.icon}
                </div>
                <h4 className="mt-4 text-body font-semibold text-navy">
                  {attr.name}
                </h4>
                <p className="mt-2 text-body-sm text-medium-gray">
                  {attr.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intersectional Analysis Callout */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal/10">
            <svg className="h-8 w-8 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </div>
          <h2 className="mt-6 text-h2 font-bold text-white">
            Intersectional Analysis
          </h2>
          <p className="mt-4 text-body-lg text-light-gray">
            Single-attribute analysis is not enough. A model may appear fair
            across race and fair across gender — but fail dramatically for
            Black women or elderly Hispanic men. ParityScope automatically
            evaluates intersectional subgroups, uncovering compound disparities
            that single-axis audits miss entirely.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-h3 font-bold text-coral-light">2.3x</p>
              <p className="mt-2 text-body-sm text-light-gray">
                Average increase in disparity found at intersectional level vs. single-attribute
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-h3 font-bold text-teal">Auto</p>
              <p className="mt-2 text-body-sm text-light-gray">
                Automatic subgroup generation with no manual configuration needed
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-h3 font-bold text-amber">N-way</p>
              <p className="mt-2 text-body-sm text-light-gray">
                Support for 2-way, 3-way, and N-way attribute combinations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Access Tiers */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Data Privacy"
            title="Three Data Access Tiers"
            description="Get meaningful fairness results at any data access level. More data unlocks deeper analysis, but even the minimal tier produces actionable findings."
          />
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {dataTiers.map((tier) => (
              <div
                key={tier.tier}
                className={`relative rounded-xl border p-8 shadow-card ${
                  tier.tier === "Standard"
                    ? "border-teal bg-teal/5"
                    : "border-light-gray bg-white"
                }`}
              >
                {tier.tier === "Standard" && (
                  <span className="absolute -top-3 left-6 rounded-full bg-teal px-3 py-1 text-caption font-semibold text-white">
                    Most Common
                  </span>
                )}
                <p className="text-body-sm font-semibold uppercase tracking-wider text-teal">
                  {tier.tier} Tier
                </p>
                <h3 className="mt-2 text-h4 font-bold text-navy">{tier.label}</h3>
                <p className="mt-4 text-medium-gray">{tier.description}</p>
                <div className="mt-6 space-y-3 border-t border-light-gray pt-6">
                  <div className="flex items-start gap-2">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className="text-body-sm text-medium-gray">{tier.metrics}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    <span className="text-body-sm text-medium-gray">{tier.bestFor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Find What Your Metrics Are Missing"
        description="A model that reports 66% accuracy can hide 19 fairness failures. Run a comprehensive audit with ParityScope and get the full picture."
        primaryCTA={{ label: "Request an Audit", href: "/contact" }}
        secondaryCTA={{ label: "View Case Study", href: "/resources/case-studies" }}
      />
    </>
  );
}
