import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bias Mitigation — Actionable AI Fairness Fixes",
  description:
    "What-if simulations, root cause analysis, and automated recommendations to remediate AI bias without sacrificing model accuracy.",
};

const rootCauseCategories = [
  {
    title: "Proxy Detection",
    description:
      "Identify features that act as proxies for protected attributes. Even when demographic data is excluded from a model, correlated variables like zip code, insurance type, or language preference can re-introduce bias.",
  },
  {
    title: "Label Bias Analysis",
    description:
      "Detect systematic biases in ground-truth labels. Historical disparities in care — such as under-diagnosis of pain in certain populations — can embed bias directly into training labels.",
  },
  {
    title: "Feature Importance",
    description:
      "Understand which features drive disparities in model outcomes. Decompose the fairness gap into feature-level contributions to identify the highest-leverage intervention points.",
  },
  {
    title: "Representation Gaps",
    description:
      "Quantify underrepresentation across subgroups in training and evaluation data. Small sample sizes for minority populations lead to higher variance and less reliable predictions.",
  },
];

const capabilities = [
  {
    title: "Automated Recommendations",
    description:
      "Based on root cause analysis, ParityScope generates specific, prioritized recommendations for reducing disparities. Each recommendation includes expected impact estimates and implementation guidance.",
    highlights: ["Threshold adjustment suggestions", "Resampling strategies", "Feature engineering guidance", "Model architecture changes"],
  },
  {
    title: "Gap Analysis",
    description:
      "Quantify the exact performance gap between subgroups for every metric. Understand not just that a disparity exists, but its precise magnitude, statistical significance, and clinical relevance.",
    highlights: ["Per-metric gap quantification", "Statistical significance testing", "Clinical impact estimation", "Regulatory threshold comparison"],
  },
  {
    title: "Trade-off Assessment",
    description:
      "Every mitigation involves trade-offs. ParityScope makes these trade-offs explicit by showing how each intervention affects accuracy, fairness, and other metrics simultaneously.",
    highlights: ["Accuracy-fairness Pareto frontier", "Multi-metric impact analysis", "Subgroup-level trade-off visualization", "Stakeholder decision support"],
  },
  {
    title: "Priority Ranking",
    description:
      "Not all disparities are equally urgent. ParityScope ranks identified biases by severity, regulatory risk, affected population size, and remediation feasibility to focus your team on what matters most.",
    highlights: ["Severity scoring", "Regulatory risk assessment", "Population impact weighting", "Feasibility estimation"],
  },
];

export default function MitigationPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 text-body-sm text-slate-400">
            <Link href="/product" className="hover:text-teal">Product</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Mitigation</span>
          </nav>
          <h1 className="text-display font-bold text-white">Bias Mitigation</h1>
          <p className="mt-6 max-w-3xl text-body-lg text-slate-300">
            Fix bias without sacrificing accuracy. What-if simulations,
            root cause analysis, and automated recommendations that turn audit
            findings into concrete improvements.
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
                Knowing that bias exists is only the first step. Most organizations
                discover disparities in their AI systems but lack a systematic
                process for addressing them. Ad-hoc fixes can introduce new problems,
                and without the ability to preview outcomes, teams are reluctant to
                make changes to production models.
              </p>
              <p className="mt-4 text-body-lg text-medium-gray">
                The result: audit findings sit in spreadsheets, remediation is
                delayed indefinitely, and patients continue to receive inequitable
                care.
              </p>
            </div>
            <div className="rounded-xl border border-light-gray bg-off-white p-8">
              <h3 className="text-h4 font-semibold text-navy">Common Barriers to Remediation</h3>
              <ul className="mt-4 space-y-4 text-medium-gray">
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-coral" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l8 8M14 6l-8 8" />
                  </svg>
                  <span>Fear that fairness fixes will reduce overall model accuracy</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-coral" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l8 8M14 6l-8 8" />
                  </svg>
                  <span>No way to preview the impact of interventions before deployment</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-coral" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l8 8M14 6l-8 8" />
                  </svg>
                  <span>Unclear which disparities to prioritize with limited resources</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-coral" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l8 8M14 6l-8 8" />
                  </svg>
                  <span>Lack of tooling that bridges data science and compliance teams</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What-If Simulations */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-h2 font-bold text-navy">What-If Simulations</h2>
            <p className="mt-4 text-body-lg text-medium-gray">
              Preview the impact of any intervention before deploying it.
              ParityScope simulates how threshold adjustments, resampling
              strategies, and feature modifications would affect both fairness
              and accuracy metrics across every subgroup.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl border border-light-gray bg-white p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
                <svg className="h-7 w-7 text-teal" fill="none" viewBox="0 0 28 28" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 14h8l2-6 4 12 2-6h4" />
                </svg>
              </div>
              <h3 className="text-h4 font-semibold text-navy">Define Intervention</h3>
              <p className="mt-3 text-body-sm text-medium-gray">
                Specify a proposed change — adjust a decision threshold, apply
                resampling weights, modify feature sets, or simulate a data
                collection strategy.
              </p>
            </div>
            <div className="rounded-xl border border-light-gray bg-white p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
                <svg className="h-7 w-7 text-teal" fill="none" viewBox="0 0 28 28" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="4" y="4" width="20" height="20" rx="3" />
                  <path strokeLinecap="round" d="M4 12h20M12 4v20" />
                </svg>
              </div>
              <h3 className="text-h4 font-semibold text-navy">Simulate Impact</h3>
              <p className="mt-3 text-body-sm text-medium-gray">
                ParityScope recomputes all fairness and performance metrics under
                the simulated intervention, showing exactly how each subgroup
                would be affected.
              </p>
            </div>
            <div className="rounded-xl border border-light-gray bg-white p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
                <svg className="h-7 w-7 text-teal" fill="none" viewBox="0 0 28 28" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 14l5 5 9-9" />
                </svg>
              </div>
              <h3 className="text-h4 font-semibold text-navy">Compare & Decide</h3>
              <p className="mt-3 text-body-sm text-medium-gray">
                Compare multiple intervention scenarios side by side. Make
                data-driven decisions about which approach best balances fairness
                gains against accuracy trade-offs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Root Cause Analysis */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">Root Cause Analysis</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            Before you can fix bias, you need to understand where it comes from.
            ParityScope traces disparities back to their sources in the data,
            features, and labels.
          </p>
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {rootCauseCategories.map((cat) => (
              <div
                key={cat.title}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <h3 className="text-h4 font-semibold text-navy">{cat.title}</h3>
                <p className="mt-3 text-medium-gray">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            Mitigation Capabilities
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            From automated recommendations to trade-off assessment, everything
            you need to move from detection to remediation.
          </p>
          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <h3 className="text-h3 font-semibold text-navy">{cap.title}</h3>
                <p className="mt-3 text-medium-gray">{cap.description}</p>
                <ul className="mt-6 grid grid-cols-2 gap-3">
                  {cap.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-body-sm text-dark-gray">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8l3 3 5-5" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold text-white">
            Turn Audit Findings Into Action
          </h2>
          <p className="mt-4 text-body-lg text-slate-300">
            Stop letting bias reports collect dust. ParityScope gives your team
            the tools to understand, prioritize, and remediate disparities with
            confidence.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-teal px-8 py-3 font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book an Assessment
            </Link>
            <Link
              href="/product"
              className="rounded-lg border border-slate-500 px-8 py-3 font-semibold text-white transition-colors hover:border-teal hover:text-teal"
            >
              Back to Product Overview
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
