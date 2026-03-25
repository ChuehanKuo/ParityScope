import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developers — ParityScope SDK",
  description:
    "Get started with the ParityScope SDK. Audit, monitor, and mitigate bias in clinical AI systems. pip install parityscope.",
};

const sdkFeatures = [
  {
    title: "15+ Fairness Metrics",
    description:
      "Demographic parity, equalized odds, predictive parity, calibration, and more — all validated for clinical AI use cases.",
  },
  {
    title: "Multi-Jurisdiction Mapping",
    description:
      "One audit maps to EU AI Act, Section 1557, South Korea AI Framework Act, and Taiwan AI Basic Law requirements.",
  },
  {
    title: "Root Cause Analysis",
    description:
      "Identify where bias originates — training data imbalances, feature correlations, or model architecture — with detailed diagnostic reports.",
  },
  {
    title: "Intersectional Analysis",
    description:
      "Test fairness across combinations of protected attributes (e.g., race + sex) to detect disparities hidden in single-attribute analysis.",
  },
  {
    title: "Confidence Intervals",
    description:
      "Bootstrap confidence intervals for all metrics, so you know whether a detected disparity is statistically meaningful or noise.",
  },
  {
    title: "Privacy-Preserving",
    description:
      "Runs entirely within your infrastructure. Patient data never leaves your environment. Only aggregated metrics are transmitted.",
  },
  {
    title: "CLI & Python API",
    description:
      "Use the command-line interface for quick audits or the Python API for deep integration into your ML pipeline.",
  },
  {
    title: "PDF & JSON Reports",
    description:
      "Generate compliance-ready PDF reports for regulators and stakeholders, or machine-readable JSON for automated workflows.",
  },
];

const tiers = [
  {
    name: "Trial",
    price: "Free",
    period: "30 days",
    limits: "1 model, 5K samples",
    features: [
      "15 fairness metrics",
      "4 regulatory jurisdictions",
      "PDF & JSON reports",
      "CLI & Python SDK",
      "Root cause analysis",
    ],
    cta: "Get Trial Key",
    highlighted: false,
  },
  {
    name: "Starter",
    price: "EUR 30,000",
    period: "/year",
    limits: "5 models, 50K samples",
    features: [
      "Everything in Trial",
      "EU AI Act conformity reports",
      "FDA premarket documentation",
      "Section 1557 analysis",
      "Compliance checklists",
      "Evidence packages",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "EUR 75,000",
    period: "/year",
    limits: "25 models, 500K samples",
    features: [
      "Everything in Starter",
      "Continuous monitoring",
      "Drift detection & alerts",
      "Trend analysis",
      "REST API server",
      "Intersectional analysis",
      "Bootstrap confidence intervals",
      "Priority support",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    limits: "Unlimited",
    features: [
      "Everything in Professional",
      "Unlimited models & samples",
      "On-premise deployment",
      "Custom metrics & jurisdictions",
      "Dedicated support engineer",
      "SLA guarantee",
      "Security review & SOC 2",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function DevelopersPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-body-sm font-semibold uppercase tracking-widest text-teal">
            Developer Documentation
          </p>
          <h1 className="mt-4 text-h1 font-bold leading-tight lg:text-display">
            ParityScope SDK
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-light-gray">
            Audit, monitor, and mitigate bias in clinical AI systems. Install in
            30 seconds. Run your first fairness audit in 5 minutes.
          </p>
          <div className="mx-auto mt-10 max-w-2xl rounded-xl bg-navy-light p-4 text-left font-mono text-body-sm">
            <span className="text-medium-gray">$</span>{" "}
            <span className="text-green">pip install</span>{" "}
            <span className="text-white">parityscope</span>{" "}
            <span className="text-medium-gray">--index-url</span>{" "}
            <span className="text-teal">
              https://parityscope.com/sdk/simple/
            </span>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            Quick Start Guide
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            Get from zero to your first fairness audit in four steps.
          </p>

          <div className="mt-12 space-y-6">
            {/* Step 1 */}
            <div className="rounded-2xl border border-light-gray bg-white p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-body-sm font-bold text-white">
                  1
                </span>
                <h3 className="text-h4 font-semibold text-navy">
                  Install the SDK
                </h3>
              </div>
              <pre className="mt-4 overflow-x-auto rounded-xl bg-navy p-4 text-body-sm text-light-gray">
                <code>{`pip install parityscope \\
  --index-url https://parityscope.com/sdk/simple/ \\
  --extra-index-url https://pypi.org/simple/`}</code>
              </pre>
              <p className="mt-3 text-caption text-medium-gray">
                Or download directly:{" "}
                <a
                  href="/sdk/dist/parityscope-0.2.0-py3-none-any.whl"
                  className="font-semibold text-teal hover:underline"
                >
                  parityscope-0.2.0-py3-none-any.whl
                </a>
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-light-gray bg-white p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-body-sm font-bold text-white">
                  2
                </span>
                <h3 className="text-h4 font-semibold text-navy">
                  Activate Your License
                </h3>
              </div>
              <pre className="mt-4 overflow-x-auto rounded-xl bg-navy p-4 text-body-sm text-light-gray">
                <code>parityscope license activate PS-TRIAL-your-key-here</code>
              </pre>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-light-gray bg-white p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-body-sm font-bold text-white">
                  3
                </span>
                <h3 className="text-h4 font-semibold text-navy">
                  Run Your First Audit (CLI)
                </h3>
              </div>
              <pre className="mt-4 overflow-x-auto rounded-xl bg-navy p-4 text-body-sm text-light-gray">
                <code>{`parityscope audit \\
  --data patient_data.csv \\
  --model-name "sepsis_risk_v2" \\
  --attributes race sex \\
  --jurisdiction eu-ai-act \\
  --domain diagnosis`}</code>
              </pre>
            </div>

            {/* Step 4 */}
            <div className="rounded-2xl border border-light-gray bg-white p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-body-sm font-bold text-white">
                  4
                </span>
                <h3 className="text-h4 font-semibold text-navy">
                  Or Use the Python API
                </h3>
              </div>
              <pre className="mt-4 overflow-x-auto rounded-xl bg-navy p-4 text-body-sm text-light-gray">
                <code>{`from parityscope import FairnessAudit

audit = FairnessAudit(
    model_name="sepsis_risk_v2",
    protected_attributes=["race", "sex"],
    jurisdiction="eu-ai-act",
    clinical_domain="diagnosis",
)

result = audit.run(
    y_true=labels,
    y_pred=predictions,
    demographics=demographics_df,
)

print(f"Overall: {result.overall_fairness.value}")
for m in result.unfair_metrics:
    print(f"  {m.display_name}: {m.disparity:.4f}")`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* SDK Features */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            SDK Features
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            Everything you need to audit, monitor, and mitigate bias in clinical
            AI systems.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {sdkFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-light-gray p-6 transition-shadow hover:shadow-card-hover"
              >
                <h3 className="text-h4 font-semibold text-navy">
                  {feature.title}
                </h3>
                <p className="mt-3 text-body-sm text-medium-gray">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Reference Links */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            API & Documentation
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-light-gray bg-white p-8 shadow-card">
              <h3 className="text-h4 font-semibold text-navy">
                CLI Reference
              </h3>
              <p className="mt-3 text-body-sm text-medium-gray">
                Full command reference for{" "}
                <code className="rounded bg-off-white px-1.5 py-0.5 font-mono text-caption text-navy">
                  audit
                </code>
                ,{" "}
                <code className="rounded bg-off-white px-1.5 py-0.5 font-mono text-caption text-navy">
                  monitor
                </code>
                ,{" "}
                <code className="rounded bg-off-white px-1.5 py-0.5 font-mono text-caption text-navy">
                  simulate
                </code>
                ,{" "}
                <code className="rounded bg-off-white px-1.5 py-0.5 font-mono text-caption text-navy">
                  report
                </code>
                , and{" "}
                <code className="rounded bg-off-white px-1.5 py-0.5 font-mono text-caption text-navy">
                  serve
                </code>{" "}
                commands.
              </p>
              <pre className="mt-4 rounded-lg bg-navy p-3 text-caption text-light-gray">
                <code>parityscope --help</code>
              </pre>
            </div>
            <div className="rounded-2xl border border-light-gray bg-white p-8 shadow-card">
              <h3 className="text-h4 font-semibold text-navy">REST API</h3>
              <p className="mt-3 text-body-sm text-medium-gray">
                Start the API server for programmatic access. Auto-generated
                OpenAPI documentation available at{" "}
                <code className="rounded bg-off-white px-1.5 py-0.5 font-mono text-caption text-navy">
                  /docs
                </code>
                .
              </p>
              <pre className="mt-4 rounded-lg bg-navy p-3 text-caption text-light-gray">
                <code>parityscope serve --port 8080</code>
              </pre>
            </div>
            <div className="rounded-2xl border border-light-gray bg-white p-8 shadow-card">
              <h3 className="text-h4 font-semibold text-navy">GitHub</h3>
              <p className="mt-3 text-body-sm text-medium-gray">
                Source code, examples, issue tracker, and community discussions.
              </p>
              <div className="mt-4">
                <Link
                  href="https://github.com/ChuehanKuo/ParityScope"
                  className="text-body-sm font-semibold text-teal hover:underline"
                >
                  View on GitHub &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDK Licensing Tiers */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            SDK Licensing Tiers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            Start with a free trial. Upgrade when you need more models, samples,
            or continuous monitoring.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border-2 p-6 ${
                  tier.highlighted
                    ? "border-teal shadow-elevated"
                    : "border-light-gray"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal px-4 py-1 text-caption font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-h4 font-bold text-navy">{tier.name}</h3>
                <div className="mt-3">
                  <span className="text-h3 font-bold text-navy">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="ml-1 text-body-sm text-medium-gray">
                      {tier.period}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-body-sm text-medium-gray">
                  {tier.limits}
                </p>

                <ul className="mt-6 space-y-2">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-body-sm text-medium-gray"
                    >
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Link
                    href="/contact"
                    className={`block w-full rounded-full py-2.5 text-center text-body-sm font-semibold transition-colors ${
                      tier.highlighted
                        ? "bg-teal text-white hover:bg-teal-dark"
                        : "bg-off-white text-navy hover:bg-light-gray"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-section text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold">Ready to Audit Your AI?</h2>
          <p className="mt-4 text-body-lg text-light-gray">
            Get a free trial key and run your first fairness audit in under 5
            minutes. No credit card required.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book an Assessment
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Full Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
