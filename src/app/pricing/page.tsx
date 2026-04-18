import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = {
  title: "Pricing — ParityScope Fairness Auditing",
  description:
    "Transparent pricing for ParityScope's AI fairness auditing, monitoring, and compliance tools. Free developer tier, annual subscriptions for clinical AI teams, and enterprise deployments for health systems.",
};

const tiers = [
  {
    name: "Developer",
    price: "Free",
    period: "",
    description:
      "For individual researchers, students, and teams evaluating ParityScope before purchase.",
    features: [
      "1 model",
      "100 samples per audit",
      "All 15+ core fairness metrics",
      "Community support (GitHub Discussions)",
      "Local CLI + Python SDK",
      "No regulatory reports",
    ],
    cta: "Download SDK",
    ctaHref: "/developers",
    highlighted: false,
    note: null,
  },
  {
    name: "Team",
    price: "\u20AC12,000",
    period: "/year",
    description:
      "For ML engineers at clinical AI startups running bias audits in CI/CD.",
    features: [
      "3 models",
      "10,000 samples per audit",
      "EU AI Act, FDA, and NIST AI RMF reports",
      "Basic continuous monitoring",
      "CI/CD integration",
      "Email support (2 business day SLA)",
    ],
    cta: "Start Team Plan",
    ctaHref: "/contact",
    highlighted: false,
    note: null,
  },
  {
    name: "Professional",
    price: "\u20AC75,000",
    period: "/year",
    description:
      "For mid-market health systems and MedTech companies with production AI portfolios.",
    features: [
      "10 models",
      "Unlimited samples",
      "Continuous monitoring with statistical drift detection",
      "All jurisdictions (EU, US, South Korea, Taiwan, UK, Singapore)",
      "SOC 2 Type II documentation package",
      "Email + dedicated Slack support",
      "Quarterly expert review sessions",
    ],
    cta: "Request Demo",
    ctaHref: "/contact",
    highlighted: true,
    note: null,
  },
  {
    name: "Enterprise",
    price: "Starting \u20AC150,000",
    period: "/year",
    description:
      "For large health systems and MedTech platforms with complex governance requirements.",
    features: [
      "Unlimited models",
      "Dedicated Customer Success Manager",
      "On-premise deployment",
      "Custom integrations (EHR, MLOps)",
      "RBAC and audit logging",
      "Priority support with custom SLA",
      "Legal and regulatory advisory hours",
    ],
    cta: "Contact Sales",
    ctaHref: "/contact",
    highlighted: false,
    note: null,
  },
];

const comparisonFeatures = [
  {
    feature: "Number of models",
    developer: "1",
    team: "3",
    professional: "10",
    enterprise: "Unlimited",
  },
  {
    feature: "Samples per audit",
    developer: "100",
    team: "10,000",
    professional: "Unlimited",
    enterprise: "Unlimited",
  },
  {
    feature: "Core fairness metrics",
    developer: "All 15+",
    team: "All 15+",
    professional: "All 15+",
    enterprise: "All 15+ and custom",
  },
  {
    feature: "Regulatory reports",
    developer: "\u2014",
    team: "EU AI Act, FDA, NIST",
    professional: "All jurisdictions",
    enterprise: "All + custom mappings",
  },
  {
    feature: "Continuous monitoring",
    developer: "\u2014",
    team: "Basic",
    professional: "Statistical drift detection",
    enterprise: "Custom alerting",
  },
  {
    feature: "CI/CD integration",
    developer: "\u2014",
    team: "Yes",
    professional: "Yes",
    enterprise: "Yes",
  },
  {
    feature: "REST API",
    developer: "\u2014",
    team: "Yes",
    professional: "Yes",
    enterprise: "Yes",
  },
  {
    feature: "SOC 2 Type II docs",
    developer: "\u2014",
    team: "\u2014",
    professional: "Yes",
    enterprise: "Yes",
  },
  {
    feature: "On-premise deployment",
    developer: "\u2014",
    team: "\u2014",
    professional: "\u2014",
    enterprise: "Yes",
  },
  {
    feature: "RBAC and audit logging",
    developer: "\u2014",
    team: "\u2014",
    professional: "\u2014",
    enterprise: "Yes",
  },
  {
    feature: "Dedicated CSM",
    developer: "\u2014",
    team: "\u2014",
    professional: "\u2014",
    enterprise: "Yes",
  },
  {
    feature: "Support",
    developer: "Community",
    team: "Email (2 BD SLA)",
    professional: "Email + Slack",
    enterprise: "Priority + custom SLA",
  },
];

const faqs = [
  {
    question: "How does the Assessment pilot convert to a paid tier?",
    answer:
      "The \u20AC25,000 Assessment is a 90-day expert-led audit covering up to 3 models, full compliance reports, and a mitigation roadmap. If you sign an annual Professional or Enterprise contract within 12 months, 100% of the Assessment fee is credited against the first-year subscription. The Assessment is the recommended on-ramp for health systems that have never run a formal fairness audit.",
  },
  {
    question: "Why is pricing listed in EUR?",
    answer:
      "ParityScope's primary market is EU MedTech vendors and health systems preparing for the EU AI Act (Annex III high-risk AI). We quote in EUR because most of our customers contract in EUR. USD and GBP contracts are available on request at the prevailing spot rate.",
  },
  {
    question: "What is the difference between Team and Professional?",
    answer:
      "Team (\u20AC12,000/year) is sized for a clinical AI startup auditing up to 3 models with sample sizes typical of validation sets (10,000 rows). It covers the three frameworks most early-stage teams need: EU AI Act, FDA, and NIST AI RMF. Professional (\u20AC75,000/year) is sized for a health system or mid-market MedTech with up to 10 models in production, unlimited sample sizes, continuous statistical drift monitoring, all regulatory jurisdictions, SOC 2 documentation, and Slack support with quarterly expert review.",
  },
  {
    question: "Which tier supports on-premise deployment?",
    answer:
      "On-premise deployment is an Enterprise-only feature. The Team and Professional tiers run ParityScope as a cloud-hosted service, but audits execute against your data within your infrastructure via the SDK \u2014 patient data never leaves your environment. Enterprise deployments additionally host the monitoring dashboard and API server inside your network perimeter.",
  },
  {
    question: "Do you offer reseller or Notified Body partnerships?",
    answer:
      "Yes. We partner with Notified Bodies, regulatory consultancies, and EHR vendors under a custom program that includes white-labeling, per-assessment royalties, and co-branded compliance reports. Contact sales for partnership terms.",
  },
  {
    question: "What counts as a 'model' for pricing purposes?",
    answer:
      "A model is a single AI system or algorithm being audited. Different versions of the same model count as one model. Retraining and re-auditing a new version does not consume an additional model slot.",
  },
  {
    question: "Is there a free trial of paid tiers?",
    answer:
      "The Developer tier is permanently free and lets you evaluate ParityScope against a single model with 100 samples. For paid tiers, we recommend the \u20AC25,000 Assessment as a low-risk, fully-credited entry point.",
  },
];

const tierGridClass = "grid gap-6 lg:grid-cols-4";

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={{
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
        }}
      />
      {/* Hero */}
      <section className="bg-navy px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-h1 font-bold leading-tight lg:text-display">
            Pricing built for clinical AI teams
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-light-gray">
            Start free. Pay annually as your portfolio grows. Scale to
            enterprise deployments with dedicated support, on-premise hosting,
            and custom integrations.
          </p>
        </div>
      </section>

      {/* Assessment banner */}
      <section className="px-4 pt-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-teal bg-teal/5 p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="max-w-3xl">
              <p className="text-caption font-bold uppercase tracking-wider text-teal">
                Not sure which tier?
              </p>
              <h2 className="mt-2 text-h3 font-bold text-navy">
                Start with a 90-day paid pilot (&euro;25,000)
              </h2>
              <p className="mt-3 text-body-sm text-medium-gray">
                Expert-led fairness audit of up to 3 models, full compliance
                reports across your target jurisdictions, and a mitigation
                roadmap. 100% of the pilot fee is credited toward any annual
                Professional or Enterprise contract signed within 12 months.
              </p>
            </div>
            <div className="mt-6 shrink-0 lg:mt-0">
              <Link
                href="/contact?topic=assessment"
                className="inline-block rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-dark"
              >
                Request Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className={tierGridClass}>
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border p-6 ${
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
                  className={`text-h3 font-bold ${
                    tier.highlighted ? "text-white" : "text-navy"
                  }`}
                >
                  {tier.name}
                </h2>
                <p
                  className={`mt-2 text-body-sm ${
                    tier.highlighted ? "text-light-gray" : "text-medium-gray"
                  }`}
                >
                  {tier.description}
                </p>
                <div className="mt-6">
                  <span
                    className={`text-h2 font-bold ${
                      tier.highlighted ? "text-teal-light" : "text-navy"
                    }`}
                  >
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span
                      className={`ml-1 text-body-sm ${
                        tier.highlighted ? "text-light-gray" : "text-medium-gray"
                      }`}
                    >
                      {tier.period}
                    </span>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg
                        className={`mt-0.5 h-5 w-5 shrink-0 ${
                          tier.highlighted ? "text-teal-light" : "text-teal"
                        }`}
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
                        className={`text-body-sm ${
                          tier.highlighted ? "text-light-gray" : "text-medium-gray"
                        }`}
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

                <div className="mt-6">
                  <Link
                    href={tier.ctaHref}
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

          {/* Notified Body row */}
          <div className="mt-8 rounded-2xl border border-dashed border-navy/30 bg-off-white p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="max-w-3xl">
              <p className="text-caption font-bold uppercase tracking-wider text-navy">
                Notified Body / OEM
              </p>
              <h3 className="mt-2 text-h4 font-bold text-navy">
                White-label ParityScope for your assessments
              </h3>
              <p className="mt-3 text-body-sm text-medium-gray">
                For Notified Bodies, regulatory consultancies, and EHR vendors
                embedding fairness auditing into their service offering.
                Includes white-labeling, per-assessment royalties, and
                co-branded compliance reports.
              </p>
            </div>
            <div className="mt-6 shrink-0 lg:mt-0">
              <Link
                href="/contact?topic=partnership"
                className="inline-block rounded-full border border-navy px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
              >
                Contact for Custom
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            Feature Comparison
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            What&apos;s included at each tier.
          </p>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-left text-body-sm">
              <thead>
                <tr className="border-b-2 border-navy/10">
                  <th className="pb-4 pr-4 font-semibold text-navy">Feature</th>
                  <th className="pb-4 px-4 text-center font-semibold text-navy">
                    Developer
                  </th>
                  <th className="pb-4 px-4 text-center font-semibold text-navy">
                    Team
                  </th>
                  <th className="pb-4 px-4 text-center font-semibold text-teal">
                    Professional
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
                      {row.developer}
                    </td>
                    <td className="py-3 px-4 text-center text-medium-gray">
                      {row.team}
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-navy">
                      {row.professional}
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
          <h2 className="text-h2 font-bold">Still deciding?</h2>
          <p className="mt-4 text-body-lg text-light-gray">
            Download the Developer tier to evaluate ParityScope on your own
            data, or talk to sales about an Assessment pilot to de-risk a
            larger commitment.
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
              Download Free SDK
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
