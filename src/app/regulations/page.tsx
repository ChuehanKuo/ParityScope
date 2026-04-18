import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Regulatory Landscape — AI Regulations Affecting Healthcare",
  description:
    "Navigate the global AI regulatory landscape in April 2026. EU AI Act under Digital Omnibus delay, FDA AI/ML guidance, NIST AI RMF, Section 1557 with private litigation enforcement, South Korea, and Taiwan.",
};

const regulations = [
  {
    flag: "\uD83C\uDDEA\uD83C\uDDFA",
    name: "EU AI Act",
    href: "/regulations/eu-ai-act",
    status: "Delayed",
    statusColor: "bg-amber text-white",
    dates:
      "High-risk obligations expected to slip to Dec 2027 (Annex III) / Aug 2028 (medical device AI) under the Digital Omnibus",
    description:
      "Regulation (EU) 2024/1689 still classifies healthcare AI as high-risk. The European Parliament voted 569-45 on 2026-03-23 to support postponement, harmonized standards remain missing, and a medical-device carve-out is under discussion. Penalties for high-risk violations are EUR 15M or 3% of global turnover under Article 99(4) — the EUR 35M / 7% tier applies only to prohibited AI.",
  },
  {
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    name: "FDA AI/ML Devices",
    href: "/regulations/fda",
    status: "Voluntary best practice",
    statusColor: "bg-teal text-white",
    dates:
      "GMLP (Oct 2021), PCCP final (Dec 2024), draft guidance on FY2026 B list",
    description:
      "FDA regulates AI-enabled medical devices via 510(k), De Novo, and PMA. The 10 GMLP guiding principles co-issued with Health Canada and MHRA remain the operative framework. Commissioner Makary signaled deregulation at CES 2026 — but reviewers still expect Principle 8 subpopulation performance evidence in pre-submissions.",
  },
  {
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    name: "NIST AI RMF",
    href: "/regulations/nist",
    status: "Voluntary; widely cited",
    statusColor: "bg-teal text-white",
    dates: "AI RMF 1.0 (Jan 2023), GenAI Profile NIST-AI-600-1 (Jul 2024)",
    description:
      "Voluntary federal framework organized around GOVERN, MAP, MEASURE, MANAGE. Referenced by the Colorado AI Act (effective 2026-02-01), Texas RAIA, and federal procurement. Not rescinded by the current administration. The de-facto baseline state laws and contracts point to.",
  },
  {
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    name: "Section 1557 (ACA)",
    href: "/regulations/section-1557",
    status: "Litigation-driven",
    statusColor: "bg-coral text-white",
    dates:
      "May 2025 deadline passed with zero OCR enforcement actions; private litigation is now the active mechanism",
    description:
      "The 2024 final rule at 45 CFR 92.210 covers clinical algorithms and AI. HHS OCR has been silent under the current administration; Florida v. HHS stayed unrelated parts of the rule. Real enforcement is private litigation — the UnitedHealth nH Predict case (court ordered algorithm disclosure Mar 2026) is the template plaintiffs are now following.",
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
            Healthcare AI is regulated across multiple jurisdictions — each
            with distinct requirements, timelines, and (in 2026) very
            different enforcement realities. ParityScope helps you build the
            evidence package that holds up wherever you operate.
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
              Prepare Now — Regulators Will Catch Up
            </h2>
            <div className="mt-6 space-y-4 text-medium-gray">
              <p>
                The April 2026 picture is one of postponed deadlines and
                shifted enforcement modes. The European Parliament has voted
                to delay high-risk EU AI Act obligations under the Digital
                Omnibus. FDA&apos;s January 2025 draft guidance sits on the
                FY2026 B list. HHS OCR has not opened a single AI-related
                Section 1557 enforcement action since the May 2025 deadline
                passed. Harmonized EU standards are still missing.
              </p>
              <p>
                None of that means the obligations have softened. EU
                providers still need Article 10 bias examinations, Article 72
                post-market monitoring, and Annex IV documentation when the
                conformity-assessment queue forms. US covered entities still
                face plaintiff discovery — the UnitedHealth nH Predict case
                established that courts will order algorithm disclosure.
                State AI laws (Colorado, Texas) point at NIST AI RMF as the
                operational baseline. Korea and Taiwan are already in force.
              </p>
              <p>
                The organizations that come out of 2026-2027 in the
                strongest position are the ones building defensible evidence
                packages now — before the deadlines land, before the
                subpoena arrives, and before the notified-body queue gets
                long.
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
            Six frameworks now shape healthcare AI compliance worldwide. Here
            is the current state of each.
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
            Build the Evidence Package Before You Need It
          </h2>
          <p className="mt-4 text-body-lg text-slate-300">
            Whether your trigger is an EU notified body, an FDA pre-submission,
            a state AI law, or a plaintiff&apos;s subpoena — the underlying
            evidence is the same. ParityScope can have your first
            regulatory-grade fairness audit completed in under a week.
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
