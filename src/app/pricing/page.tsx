import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Pricing — AI Fairness Auditing Plans",
  description:
    "Transparent pricing for ParityScope's AI fairness auditing, monitoring, and compliance tools. From one-time assessments to enterprise solutions.",
};

const tiers = [
  {
    name: "Assessment",
    description: "One-time fairness audit for a single AI model",
    price: "Contact us",
    features: [
      "Single model audit",
      "15+ fairness metrics",
      "All protected attributes",
      "Detailed PDF audit report",
      "Regulatory compliance mapping",
      "Remediation recommendations",
      "30-day email support",
    ],
    cta: "Request Assessment",
    href: "/contact",
    highlighted: false,
  },
  {
    name: "SDK License",
    description: "Ongoing fairness testing integrated into your pipeline",
    price: "Contact us",
    features: [
      "Everything in Assessment",
      "Python SDK access",
      "CI/CD integration",
      "Continuous monitoring dashboard",
      "Automated alerting (Slack, email)",
      "Fairness drift detection",
      "Intersectional analysis",
      "Quarterly compliance reviews",
      "Priority email support",
    ],
    cta: "Book a Demo",
    href: "/contact",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "Full-scale AI governance for large organizations",
    price: "Custom",
    features: [
      "Everything in SDK License",
      "Unlimited models",
      "Custom fairness metrics",
      "Multi-jurisdiction compliance",
      "REST API access",
      "On-premise deployment",
      "Dedicated success manager",
      "SLA guarantees (99.9%)",
      "Custom training & onboarding",
      "SSO & RBAC",
    ],
    cta: "Contact Sales",
    href: "/contact",
    highlighted: false,
  },
];

const comparisonFeatures = [
  {
    category: "Auditing",
    features: [
      { name: "Fairness metrics", assessment: "15+", sdk: "15+", enterprise: "15+ custom" },
      { name: "Protected attributes", assessment: "All standard", sdk: "All standard", enterprise: "Custom + standard" },
      { name: "Intersectional analysis", assessment: false, sdk: true, enterprise: true },
      { name: "Regulatory mapping", assessment: "1 jurisdiction", sdk: "4 jurisdictions", enterprise: "All + custom" },
      { name: "PDF compliance reports", assessment: true, sdk: true, enterprise: true },
    ],
  },
  {
    category: "Monitoring",
    features: [
      { name: "Continuous monitoring", assessment: false, sdk: true, enterprise: true },
      { name: "Drift detection", assessment: false, sdk: true, enterprise: true },
      { name: "Automated alerting", assessment: false, sdk: "Email", enterprise: "Email, Slack, PagerDuty, webhook" },
      { name: "Monitoring dashboard", assessment: false, sdk: true, enterprise: true },
      { name: "Custom alert thresholds", assessment: false, sdk: false, enterprise: true },
    ],
  },
  {
    category: "Integration",
    features: [
      { name: "Python SDK", assessment: false, sdk: true, enterprise: true },
      { name: "REST API", assessment: false, sdk: false, enterprise: true },
      { name: "CLI tool", assessment: false, sdk: true, enterprise: true },
      { name: "CI/CD pipeline integration", assessment: false, sdk: true, enterprise: true },
      { name: "On-premise deployment", assessment: false, sdk: false, enterprise: true },
      { name: "SSO / SAML", assessment: false, sdk: false, enterprise: true },
    ],
  },
  {
    category: "Support",
    features: [
      { name: "Email support", assessment: "30 days", sdk: "Priority", enterprise: "24/7 dedicated" },
      { name: "Dedicated success manager", assessment: false, sdk: false, enterprise: true },
      { name: "Custom training", assessment: false, sdk: false, enterprise: true },
      { name: "SLA", assessment: false, sdk: "99.5%", enterprise: "99.9%" },
      { name: "Quarterly reviews", assessment: false, sdk: true, enterprise: true },
    ],
  },
];

const faqItems = [
  {
    question: "Do I need to share patient data with ParityScope?",
    answer:
      "No. Our SDK runs entirely on your infrastructure. Patient data never leaves your environment. Only aggregated, de-identified fairness metrics are generated locally. For the Assessment tier, we work with your team on-site or via secure screen share to conduct the audit.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Assessment is a fixed-fee engagement scoped to a single model audit. SDK License is an annual subscription based on the number of models monitored. Enterprise pricing is custom-tailored based on your organization's scale, deployment model, and support requirements. Contact us for a detailed quote.",
  },
  {
    question: "Can I start with an Assessment and upgrade later?",
    answer:
      "Absolutely. Many customers start with a one-time Assessment to evaluate a specific model, then upgrade to the SDK License for ongoing monitoring. Assessment fees can be credited toward an annual SDK License subscription.",
  },
  {
    question: "What regulatory frameworks do you support?",
    answer:
      "We currently support the EU AI Act, US Section 1557, South Korea AI Act, and Taiwan AI Basic Act. Each jurisdiction has specific metric requirements that our platform maps automatically. Enterprise customers can request additional jurisdiction profiles.",
  },
  {
    question: "How long does an initial assessment take?",
    answer:
      "A typical Assessment engagement takes 2-4 weeks from kickoff to final report delivery. This includes data preparation, metric computation across all protected attributes, regulatory mapping, and remediation recommendations. Complex models with many subgroups may require additional time.",
  },
  {
    question: "Do you offer academic or nonprofit discounts?",
    answer:
      "Yes. We offer discounted pricing for academic research institutions, nonprofit healthcare organizations, and community health centers. Contact us to discuss eligibility.",
  },
  {
    question: "What models and frameworks do you support?",
    answer:
      "ParityScope works with any classification or risk-scoring model regardless of framework. Our SDK has native connectors for scikit-learn, and we support any model that can produce predictions and probability scores. Custom connectors for PyTorch, TensorFlow, and other frameworks are available for Enterprise customers.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "We offer a free demo using synthetic clinical data so you can see the platform in action before committing. The demo includes a full audit walkthrough with sample fairness reports. Contact us to schedule your personalized demo.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal">
              Pricing
            </p>
            <h1 className="mt-3 text-h1 font-bold text-navy">
              Simple, Transparent Pricing
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-body-lg text-medium-gray">
              Start with a one-time assessment or scale with continuous
              monitoring. Every plan includes full regulatory compliance support.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border p-8 ${
                  tier.highlighted
                    ? "border-teal bg-navy text-white shadow-elevated"
                    : "border-light-gray bg-white"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h2
                  className={`text-h3 font-bold ${tier.highlighted ? "text-white" : "text-navy"}`}
                >
                  {tier.name}
                </h2>
                <p
                  className={`mt-2 text-body-sm ${tier.highlighted ? "text-gray-300" : "text-medium-gray"}`}
                >
                  {tier.description}
                </p>
                <p
                  className={`mt-6 text-h2 font-bold ${tier.highlighted ? "text-teal" : "text-navy"}`}
                >
                  {tier.price}
                </p>

                <ul className="mt-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg
                        className={`mt-0.5 h-5 w-5 shrink-0 ${tier.highlighted ? "text-teal" : "text-teal"}`}
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
                      <span
                        className={`text-body-sm ${tier.highlighted ? "text-gray-300" : "text-medium-gray"}`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link
                    href={tier.href}
                    className={`block w-full rounded-full py-3 text-center text-sm font-semibold transition-colors ${
                      tier.highlighted
                        ? "bg-teal text-white hover:bg-teal/90"
                        : "bg-navy text-white hover:bg-navy/90"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="mt-16 text-center">
            <p className="text-sm text-medium-gray">
              Trusted by healthcare organizations managing clinical AI across 4 regulatory jurisdictions
            </p>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            Detailed Feature Comparison
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-medium-gray">
            See exactly what&apos;s included in each plan.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-navy">
                  <th className="py-4 pr-4 text-left text-sm font-semibold text-navy">
                    Feature
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-navy">
                    Assessment
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-teal">
                    SDK License
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-semibold text-navy">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category) => (
                  <>
                    <tr key={category.category}>
                      <td
                        colSpan={4}
                        className="pb-2 pt-6 text-xs font-bold uppercase tracking-wider text-medium-gray"
                      >
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="border-b border-light-gray"
                      >
                        <td className="py-3 pr-4 text-sm text-dark-gray">
                          {feature.name}
                        </td>
                        {(
                          [
                            feature.assessment,
                            feature.sdk,
                            feature.enterprise,
                          ] as (string | boolean)[]
                        ).map((value, i) => (
                          <td
                            key={i}
                            className="px-4 py-3 text-center text-sm"
                          >
                            {value === true ? (
                              <svg
                                className="mx-auto h-5 w-5 text-teal"
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
                            ) : value === false ? (
                              <span className="text-gray-300">&mdash;</span>
                            ) : (
                              <span className="text-medium-gray">{value}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            Frequently Asked Questions
          </h2>
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold text-white">
            Ready to Ensure Fair AI in Healthcare?
          </h2>
          <p className="mt-4 text-body-lg text-gray-300">
            Schedule a personalized demo to see ParityScope in action with your
            use case. No commitment required.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal/90"
            >
              Book a Demo
            </Link>
            <Link
              href="/product"
              className="rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore the Platform
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
