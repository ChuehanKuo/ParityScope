import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Regulatory Landscape — AI Regulations Affecting Healthcare",
  description:
    "Navigate the global AI regulatory landscape. Understand the EU AI Act, South Korea AI Framework Act, Taiwan AI Basic Law, and Section 1557 compliance requirements.",
};

const regulations = [
  {
    flag: "\uD83C\uDDEA\uD83C\uDDFA",
    name: "EU AI Act",
    href: "/regulations/eu-ai-act",
    status: "Enforcing",
    statusColor: "bg-coral text-white",
    dates: "Aug 2026 — full enforcement for high-risk AI systems; tiered rollout through 2027",
    description:
      "The world's most comprehensive AI regulation classifies healthcare AI as high-risk, requiring conformity assessments, bias testing, human oversight, and post-market monitoring. Non-compliance penalties reach up to \u20AC35 million or 7% of global annual turnover.",
  },
  {
    flag: "\uD83C\uDDF0\uD83C\uDDF7",
    name: "South Korea AI Framework Act",
    href: "/regulations/south-korea",
    status: "Active",
    statusColor: "bg-green text-white",
    dates: "Jan 2026 — enacted and in force",
    description:
      "South Korea's comprehensive AI governance framework mandates risk assessments for high-impact AI systems, including clinical decision support and diagnostic algorithms. Requires algorithmic impact assessments and transparency obligations for healthcare AI deployers.",
  },
  {
    flag: "\uD83C\uDDF9\uD83C\uDDFC",
    name: "Taiwan AI Basic Law",
    href: "/regulations/taiwan",
    status: "Active",
    statusColor: "bg-green text-white",
    dates: "Dec 2025 — passed into law",
    description:
      "Taiwan's foundational AI legislation establishes governance principles for AI development and deployment across regulated industries. Sets requirements for fairness evaluation, transparency, and accountability in healthcare AI applications used in the national health system.",
  },
  {
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    name: "Section 1557 (ACA)",
    href: "/regulations/section-1557",
    status: "Active",
    statusColor: "bg-green text-white",
    dates: "Active — enforcement ongoing under HHS OCR",
    description:
      "The Affordable Care Act's anti-discrimination provision now explicitly covers clinical algorithms and AI-driven decision tools. Healthcare organizations using AI that produces disparate outcomes based on race, sex, age, or disability face enforcement action and loss of federal funding.",
  },
];

const capabilities = [
  {
    heading: "Automatic Metric Selection",
    text: "ParityScope maps each regulation's fairness requirements to the correct statistical metrics — so you evaluate what the law actually demands, not what a generic tool provides.",
  },
  {
    heading: "Compliance Report Generation",
    text: "Generate regulator-ready documentation with one command. Reports include methodology descriptions, metric results, confidence intervals, and plain-language interpretations formatted for each jurisdiction.",
  },
  {
    heading: "Multi-Jurisdiction Support",
    text: "Run a single evaluation and produce compliance artifacts for every applicable regulation simultaneously. No need to maintain separate testing pipelines for the EU, US, South Korea, and Taiwan.",
  },
  {
    heading: "Continuous Monitoring & Audit Trails",
    text: "Post-market surveillance obligations require ongoing fairness tracking. ParityScope monitors model performance in production and maintains tamper-evident audit trails for regulatory inspection.",
  },
];

export default function RegulationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-display font-bold text-white">
            Navigate the Global AI Regulatory Landscape
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-body-lg text-slate-300">
            Healthcare AI is now regulated across multiple jurisdictions — each
            with distinct requirements, timelines, and penalties. ParityScope
            helps you stay compliant everywhere you operate.
          </p>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl">
            <p className="text-body-sm font-semibold uppercase tracking-widest text-teal">
              Why This Matters
            </p>
            <h2 className="mt-4 text-h2 font-bold text-navy">
              Enforcement Is Here — Not Coming
            </h2>
            <div className="mt-6 space-y-4 text-medium-gray">
              <p>
                The regulatory window for voluntary AI fairness testing has
                closed. South Korea and Taiwan have enacted AI governance laws.
                The US is actively enforcing anti-discrimination requirements
                against clinical algorithms under Section 1557. The EU AI Act
                begins full enforcement for high-risk healthcare AI systems in
                August 2026, with penalties reaching tens of millions of euros.
              </p>
              <p>
                Organizations deploying clinical AI without systematic bias
                testing now face legal liability, loss of federal funding,
                market access restrictions, and reputational damage. The
                question is no longer whether to comply, but how quickly you
                can build a defensible compliance program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regulation Cards */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            Key Regulations You Need to Know
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            Four regulatory frameworks are shaping healthcare AI compliance
            worldwide. Here is what each one requires.
          </p>
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {regulations.map((reg) => (
              <Link
                key={reg.name}
                href={reg.href}
                className="group rounded-xl border border-light-gray bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{reg.flag}</span>
                  <h3 className="text-h3 font-semibold text-navy group-hover:text-teal">
                    {reg.name}
                  </h3>
                  <span className={`ml-auto rounded-full px-3 py-1 text-caption font-semibold ${reg.statusColor}`}>
                    {reg.status}
                  </span>
                </div>
                <p className="mt-2 text-caption font-medium text-dark-gray">
                  {reg.dates}
                </p>
                <p className="mt-4 text-medium-gray">{reg.description}</p>
                <span className="mt-6 inline-flex items-center text-body-sm font-semibold text-teal">
                  Read compliance guide
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m-4-4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How ParityScope Helps */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            How ParityScope Helps
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            One platform that translates regulatory requirements into
            actionable fairness evaluation — across every jurisdiction.
          </p>
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {capabilities.map((cap) => (
              <div
                key={cap.heading}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <h3 className="text-h4 font-semibold text-navy">
                  {cap.heading}
                </h3>
                <p className="mt-3 text-medium-gray">{cap.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold text-white">
            Stay Ahead of Enforcement Deadlines
          </h2>
          <p className="mt-4 text-body-lg text-slate-300">
            Start your compliance journey today. ParityScope can have your
            first regulatory-grade fairness audit completed in under a week.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-teal px-8 py-3 font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Request a Compliance Assessment
            </Link>
            <Link
              href="/product"
              className="rounded-lg border border-slate-500 px-8 py-3 font-semibold text-white transition-colors hover:border-teal hover:text-teal"
            >
              Explore the Platform
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
