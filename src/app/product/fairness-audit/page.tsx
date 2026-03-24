import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fairness Audit — Comprehensive AI Bias Detection",
  description:
    "Detect and quantify AI bias across 15+ fairness metrics and all protected attributes with ParityScope's Fairness Audit.",
};

const steps = [
  {
    number: "01",
    title: "Provide Model Outputs + Demographics",
    description:
      "Supply your model's predictions alongside demographic attributes for the evaluated population. No access to the model itself is needed — only its outputs.",
  },
  {
    number: "02",
    title: "ParityScope Selects Metrics",
    description:
      "Based on the clinical context, data availability, and applicable regulations, ParityScope automatically selects the most relevant fairness metrics for your use case.",
  },
  {
    number: "03",
    title: "Statistical Analysis Across Subgroups",
    description:
      "Every metric is computed across all protected subgroups with bootstrap confidence intervals, statistical power analysis, and effect-size estimation.",
  },
  {
    number: "04",
    title: "Compliance Report Generation",
    description:
      "Receive a structured, auditor-ready report with compliance scores, subgroup breakdowns, and prioritized remediation recommendations.",
  },
];

const metricCategories = [
  {
    name: "Classification Parity",
    metrics: ["Demographic Parity", "Equalized Odds", "Equal Opportunity", "Predictive Parity"],
    description: "Measure whether positive outcomes and error rates are distributed equitably across groups.",
  },
  {
    name: "Calibration Metrics",
    metrics: ["Calibration Difference", "Brier Score Parity", "Expected Calibration Error"],
    description: "Assess whether predicted probabilities reflect true outcomes equally for all subgroups.",
  },
  {
    name: "Effect Size Measures",
    metrics: ["Cohen's d", "Odds Ratio", "Risk Ratio"],
    description: "Quantify the practical magnitude of disparities, not just statistical significance.",
  },
  {
    name: "Bootstrap Confidence Intervals",
    metrics: ["Metric CIs", "Difference CIs", "Ratio CIs"],
    description: "Provide uncertainty quantification for every metric to support statistically rigorous decisions.",
  },
  {
    name: "Statistical Power",
    metrics: ["Power Analysis", "Sample Size Requirements", "Detectable Effect Size"],
    description: "Determine whether your data is sufficient to detect meaningful disparities at desired confidence levels.",
  },
  {
    name: "Subgroup Discovery",
    metrics: ["Intersectional Analysis", "Worst-Case Subgroup", "Automatic Stratification"],
    description: "Identify vulnerable subpopulations that may be hidden in aggregate analyses.",
  },
];

const regulatoryMappings = [
  {
    regulation: "EU AI Act",
    requirements: "Risk assessment, bias testing, transparency obligations for high-risk AI systems",
    coveredMetrics: "Classification Parity, Calibration, Effect Size, Subgroup Discovery",
  },
  {
    regulation: "FDA AI/ML Guidance",
    requirements: "Evaluation across demographic subgroups, performance equity documentation",
    coveredMetrics: "All classification metrics, Bootstrap CIs, Statistical Power",
  },
  {
    regulation: "CMS Health Equity",
    requirements: "Stratified quality measures, disparity identification in Medicare/Medicaid AI tools",
    coveredMetrics: "Classification Parity, Subgroup Discovery, Effect Size",
  },
  {
    regulation: "ONC HTI-1 Rule",
    requirements: "Algorithmic transparency, bias assessment for certified health IT",
    coveredMetrics: "Full metric suite with auditor-ready documentation",
  },
];

export default function FairnessAuditPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 text-body-sm text-slate-400">
            <Link href="/product" className="hover:text-teal">Product</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Fairness Audit</span>
          </nav>
          <h1 className="text-display font-bold text-white">Fairness Audit</h1>
          <p className="mt-6 max-w-3xl text-body-lg text-slate-300">
            Detect bias before your patients do. Comprehensive statistical
            analysis across 15+ fairness metrics, every protected attribute, and
            all major clinical AI use cases.
          </p>
        </div>
      </section>

      {/* The Challenge */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-h2 font-bold text-navy">The Challenge</h2>
              <p className="mt-4 text-body-lg text-medium-gray">
                AI models deployed in healthcare can encode and amplify existing
                disparities in care. A sepsis prediction model that underperforms
                for Black patients, a readmission algorithm that penalizes
                low-income populations, a diagnostic tool that was never validated
                on older adults — the consequences are real and measurable.
              </p>
            </div>
            <div className="rounded-xl border border-light-gray bg-off-white p-8">
              <h3 className="text-h4 font-semibold text-navy">Why It Matters</h3>
              <ul className="mt-4 space-y-4 text-medium-gray">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-coral/10 text-caption font-bold text-coral">!</span>
                  <span>Biased clinical AI can lead to delayed diagnoses, inappropriate treatment plans, and worse outcomes for underserved populations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-coral/10 text-caption font-bold text-coral">!</span>
                  <span>The EU AI Act, FDA guidance, and CMS requirements now mandate bias testing for high-risk healthcare AI systems.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-coral/10 text-caption font-bold text-coral">!</span>
                  <span>Manual auditing is time-consuming, inconsistent, and often lacks the statistical rigor to withstand regulatory scrutiny.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">How It Works</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            Four steps from raw data to compliance-ready audit report.
          </p>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="relative rounded-xl border border-light-gray bg-white p-8">
                <span className="text-display font-bold text-teal/20">{step.number}</span>
                <h3 className="mt-2 text-h4 font-semibold text-navy">{step.title}</h3>
                <p className="mt-3 text-body-sm text-medium-gray">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15+ Fairness Metrics */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">15+ Fairness Metrics</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            A comprehensive suite of statistically rigorous metrics organized into
            six categories, each addressing a different dimension of algorithmic
            fairness.
          </p>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {metricCategories.map((cat) => (
              <div
                key={cat.name}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <h3 className="text-h4 font-semibold text-navy">{cat.name}</h3>
                <p className="mt-2 text-body-sm text-medium-gray">{cat.description}</p>
                <ul className="mt-5 space-y-2">
                  {cat.metrics.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-body-sm text-dark-gray">
                      <svg className="h-4 w-4 flex-shrink-0 text-teal" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l3 3 5-5" />
                      </svg>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Mapping */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">Regulatory Mapping</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            ParityScope maps every metric to the regulatory frameworks that require
            it, so you know exactly which requirements your audit satisfies.
          </p>
          <div className="mt-16 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b-2 border-navy">
                  <th className="pb-4 pr-6 text-h4 font-semibold text-navy">Regulation</th>
                  <th className="pb-4 pr-6 text-h4 font-semibold text-navy">Key Requirements</th>
                  <th className="pb-4 text-h4 font-semibold text-navy">Metrics Covered</th>
                </tr>
              </thead>
              <tbody>
                {regulatoryMappings.map((row) => (
                  <tr key={row.regulation} className="border-b border-light-gray">
                    <td className="py-5 pr-6 align-top font-semibold text-navy">{row.regulation}</td>
                    <td className="py-5 pr-6 align-top text-medium-gray">{row.requirements}</td>
                    <td className="py-5 align-top text-medium-gray">{row.coveredMetrics}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Output Examples */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">What You Receive</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            Every audit produces a structured, auditor-ready report designed for
            both technical teams and compliance stakeholders.
          </p>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-light-gray bg-white p-8">
              <h3 className="text-h4 font-semibold text-navy">Compliance Scorecard</h3>
              <p className="mt-3 text-medium-gray">
                An overall compliance score with per-regulation breakdowns, pass/fail
                indicators for each metric, and a clear summary of where your model
                stands.
              </p>
            </div>
            <div className="rounded-xl border border-light-gray bg-white p-8">
              <h3 className="text-h4 font-semibold text-navy">Subgroup Breakdowns</h3>
              <p className="mt-3 text-medium-gray">
                Detailed metric values for every demographic subgroup, including
                intersectional analyses. Visualizations highlight disparities and
                confidence intervals at a glance.
              </p>
            </div>
            <div className="rounded-xl border border-light-gray bg-white p-8">
              <h3 className="text-h4 font-semibold text-navy">Remediation Recommendations</h3>
              <p className="mt-3 text-medium-gray">
                Prioritized, actionable recommendations ranked by impact and
                feasibility. Each recommendation links directly to the mitigation
                module for guided implementation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold text-white">
            Start Your First Fairness Audit
          </h2>
          <p className="mt-4 text-body-lg text-slate-300">
            See how your clinical AI performs across every demographic subgroup.
            No model access required — just predictions and demographics.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-teal px-8 py-3 font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Request a Demo
            </Link>
            <Link
              href="/product/monitoring"
              className="rounded-lg border border-slate-500 px-8 py-3 font-semibold text-white transition-colors hover:border-teal hover:text-teal"
            >
              Explore Monitoring
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
