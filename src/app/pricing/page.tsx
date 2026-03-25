import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = {
  title: "Pricing — Transparent Pricing for Every Stage",
  description:
    "Transparent pricing for ParityScope's AI fairness auditing, monitoring, and compliance tools. From one-time assessments to enterprise solutions.",
};

const tiers = [
  {
    name: "Assessment",
    price: "\u20AC25,000",
    period: "one-time",
    description: "Expert-led fairness audit to identify and address bias in your clinical AI systems.",
    features: [
      "Expert-led fairness audit",
      "Up to 3 AI models",
      "15+ fairness metrics",
      "All protected attributes",
      "Regulatory compliance report",
      "Mitigation recommendations",
      "90-day pilot included",
    ],
    cta: "Request Assessment",
    highlighted: false,
    note: "Pilot fees 100% credited toward full contract",
  },
  {
    name: "SDK License",
    price: "\u20AC30,000",
    period: "/year",
    description: "Self-serve toolkit for ongoing fairness testing integrated into your pipeline.",
    features: [
      "Everything in Assessment",
      "Self-serve SDK access",
      "Up to 5 AI models",
      "CI/CD integration",
      "Multi-jurisdiction mapping",
      "PDF & JSON reports",
      "Email support",
    ],
    cta: "Book an Assessment",
    highlighted: true,
    note: null,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Full-scale AI governance for large organizations with complex requirements.",
    features: [
      "Everything in SDK License",
      "Unlimited models",
      "Continuous monitoring",
      "Fairness drift alerts",
      "REST API access",
      "Dedicated CSM",
      "On-premise deployment",
      "Custom SLA",
    ],
    cta: "Contact Sales",
    highlighted: false,
    note: null,
  },
];

const comparisonFeatures = [
  { feature: "Number of models", assessment: "Up to 3", sdk: "Up to 5", enterprise: "Unlimited" },
  { feature: "Fairness metrics", assessment: "15+", sdk: "15+", enterprise: "15+ custom" },
  { feature: "Protected attributes", assessment: "All", sdk: "All", enterprise: "All + custom" },
  { feature: "Compliance report", assessment: "Yes", sdk: "Yes", enterprise: "Yes" },
  { feature: "Mitigation recommendations", assessment: "Yes", sdk: "Yes", enterprise: "Yes" },
  { feature: "SDK access", assessment: "\u2014", sdk: "Yes", enterprise: "Yes" },
  { feature: "CI/CD integration", assessment: "\u2014", sdk: "Yes", enterprise: "Yes" },
  { feature: "Multi-jurisdiction mapping", assessment: "\u2014", sdk: "Yes", enterprise: "Yes" },
  { feature: "Continuous monitoring", assessment: "\u2014", sdk: "\u2014", enterprise: "Yes" },
  { feature: "Drift alerts", assessment: "\u2014", sdk: "\u2014", enterprise: "Yes" },
  { feature: "REST API", assessment: "\u2014", sdk: "\u2014", enterprise: "Yes" },
  { feature: "Dedicated CSM", assessment: "\u2014", sdk: "\u2014", enterprise: "Yes" },
  { feature: "On-premise deployment", assessment: "\u2014", sdk: "\u2014", enterprise: "Yes" },
  { feature: "Support", assessment: "Email", sdk: "Email", enterprise: "Dedicated" },
];

const faqs = [
  {
    question: "Can I start with an Assessment and upgrade later?",
    answer:
      "Yes. The Assessment is designed as an on-ramp. 100% of your pilot fees are credited toward a full SDK License or Enterprise contract, so there is no wasted investment.",
  },
  {
    question: "What counts as a 'model' for pricing purposes?",
    answer:
      "A model is a single AI system or algorithm being audited. Different versions of the same model count as one model. If you retrain a model, re-auditing the new version does not count as an additional model.",
  },
  {
    question: "Do you support on-premise deployment?",
    answer:
      "Yes. Our SDK runs entirely within your infrastructure — patient data never leaves your environment. For Enterprise customers, we also support fully on-premise deployment of the monitoring dashboard and API server.",
  },
  {
    question: "Which regulatory frameworks do you support?",
    answer:
      "ParityScope maps to the EU AI Act, US Section 1557, South Korea AI Framework Act, and Taiwan AI Basic Law. Enterprise customers can request additional jurisdiction mappings.",
  },
  {
    question: "How long does an Assessment take?",
    answer:
      "A typical Assessment takes 4-6 weeks from kickoff to final report delivery. This includes data collection, audit configuration, analysis, and presentation of findings and recommendations.",
  },
  {
    question: "Is there a free trial of the SDK?",
    answer:
      "Yes. We offer a 30-day free trial with access to 1 model and 5,000 samples. Contact us to receive your trial license key.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }} />
      {/* Hero */}
      <section className="bg-navy px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-h1 font-bold leading-tight lg:text-display">
            Transparent Pricing for Every Stage
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-light-gray">
            Start with an expert-led assessment, scale with our SDK, or go
            enterprise for unlimited AI governance. Every plan includes full
            regulatory compliance support.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border p-8 ${
                  tier.highlighted
                    ? "border-teal bg-navy text-white shadow-elevated"
                    : "border-light-gray bg-white shadow-card"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal px-4 py-1 text-caption font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                )}
                <h2
                  className={`text-h3 font-bold ${tier.highlighted ? "text-white" : "text-navy"}`}
                >
                  {tier.name}
                </h2>
                <p
                  className={`mt-2 text-body-sm ${tier.highlighted ? "text-light-gray" : "text-medium-gray"}`}
                >
                  {tier.description}
                </p>
                <div className="mt-6">
                  <span
                    className={`text-h2 font-bold ${tier.highlighted ? "text-teal-light" : "text-navy"}`}
                  >
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span
                      className={`ml-1 text-body-sm ${tier.highlighted ? "text-light-gray" : "text-medium-gray"}`}
                    >
                      {tier.period}
                    </span>
                  )}
                </div>

                <ul className="mt-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg
                        className={`mt-0.5 h-5 w-5 shrink-0 ${tier.highlighted ? "text-teal-light" : "text-teal"}`}
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
                        className={`text-body-sm ${tier.highlighted ? "text-light-gray" : "text-medium-gray"}`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {tier.note && (
                  <p className="mt-4 rounded-lg bg-teal/10 px-3 py-2 text-caption font-medium text-teal">
                    {tier.note}
                  </p>
                )}

                <div className="mt-8">
                  <Link
                    href="/contact"
                    className={`block w-full rounded-full py-3 text-center text-sm font-semibold transition-colors ${
                      tier.highlighted
                        ? "bg-teal text-white hover:bg-teal-light"
                        : "bg-navy text-white hover:bg-navy-light"
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

      {/* Feature Comparison */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            Feature Comparison
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            A detailed look at what is included in each plan.
          </p>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-left text-body-sm">
              <thead>
                <tr className="border-b-2 border-navy/10">
                  <th className="pb-4 pr-4 font-semibold text-navy">
                    Feature
                  </th>
                  <th className="pb-4 px-4 text-center font-semibold text-navy">
                    Assessment
                  </th>
                  <th className="pb-4 px-4 text-center font-semibold text-teal">
                    SDK License
                  </th>
                  <th className="pb-4 pl-4 text-center font-semibold text-navy">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-light-gray"
                  >
                    <td className="py-3 pr-4 text-medium-gray">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 text-center text-medium-gray">
                      {row.assessment}
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-navy">
                      {row.sdk}
                    </td>
                    <td className="py-3 pl-4 text-center text-medium-gray">
                      {row.enterprise}
                    </td>
                  </tr>
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
          <div className="mt-12 space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-light-gray p-6"
              >
                <h3 className="text-h4 font-semibold text-navy">
                  {faq.question}
                </h3>
                <p className="mt-3 text-body-sm text-medium-gray">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-section text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold">Not Sure Which Plan Is Right?</h2>
          <p className="mt-4 text-body-lg text-light-gray">
            Talk to our team. We will help you choose the right plan based on
            your organization&apos;s size, number of AI models, and regulatory
            requirements.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Talk to Sales
            </Link>
            <Link
              href="/developers"
              className="rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Try the SDK Free
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
