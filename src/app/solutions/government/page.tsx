import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Government & Payers — ParityScope",
  description:
    "Meet national AI governance mandates with on-premise deployment, population-level health equity auditing, and public accountability reporting from ParityScope.",
};

const painPoints = [
  {
    title: "Public Accountability",
    description:
      "Government agencies and public payers face heightened scrutiny on AI fairness. A biased algorithm that denies benefits, delays care, or misallocates resources generates public trust crises and legislative backlash.",
  },
  {
    title: "National AI Governance Mandates",
    description:
      "Executive orders, national AI strategies, and sector-specific regulations require agencies to demonstrate that AI systems operate without discrimination. Compliance timelines are aggressive and enforcement is real.",
  },
  {
    title: "Population-Level Health Equity",
    description:
      "Public health systems and payers serve entire populations. Bias in risk adjustment, claims processing, or resource allocation algorithms affects millions of beneficiaries — with disparities amplified at national scale.",
  },
  {
    title: "Procurement Requirements",
    description:
      "Agencies must evaluate AI vendors on fairness and transparency criteria. Without a standardized evaluation framework, procurement teams struggle to compare vendors or enforce post-award compliance.",
  },
];

const solutions = [
  {
    heading: "On-Premise Deployment — Data Sovereignty Guaranteed",
    body: "Government data cannot leave sovereign infrastructure. ParityScope deploys entirely within your data center, air-gapped network, or government cloud environment. No data egress, no third-party cloud dependencies.",
    detail:
      "Supports FedRAMP-authorized environments, government cloud regions (AWS GovCloud, Azure Government), and fully air-gapped installations. FIPS 140-2 compliant encryption at rest and in transit.",
  },
  {
    heading: "National AI Governance Framework Support",
    body: "ParityScope maps directly to national AI governance frameworks — including the NIST AI Risk Management Framework, the EU AI Act, and country-specific AI strategies — providing the technical implementation layer for policy requirements.",
    detail:
      "Pre-built assessment templates for NIST AI RMF MAP, MEASURE, MANAGE, and GOVERN functions. Crosswalk reporting shows compliance status across multiple frameworks simultaneously.",
  },
  {
    heading: "Public Transparency & Accountability Reporting",
    body: "Generate public-facing fairness reports that demonstrate algorithmic accountability to citizens, legislators, and oversight bodies. Reports are designed for non-technical stakeholders while maintaining methodological rigor.",
    detail:
      "Customizable report templates balance transparency with security. Redaction controls ensure sensitive model details are protected while fairness outcomes remain fully visible.",
  },
  {
    heading: "Procurement Evaluation Framework",
    body: "Equip your procurement team with a standardized AI fairness evaluation framework. Score vendor AI systems against consistent fairness criteria before contract award, and monitor compliance throughout the contract lifecycle.",
    detail:
      "Includes RFP language templates, vendor evaluation scorecards, and post-award monitoring dashboards. Designed for GS-level procurement officers and agency CTOs alike.",
  },
];

export default function GovernmentPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-6 text-body-sm text-navy-light">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/solutions" className="hover:text-white">Solutions</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Government &amp; Payers</span>
          </nav>
          <h1 className="text-display font-bold text-white">
            ParityScope for Government &amp; Payers
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-navy-light">
            Ensure AI systems serving public populations operate without
            discrimination. On-premise deployment, national governance framework
            alignment, and public accountability reporting — built for the
            unique requirements of government agencies and public payers.
          </p>
        </div>
      </section>

      {/* Pain Points */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            The Challenges You Face
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-medium-gray">
            Public sector AI governance demands the highest standards of
            accountability, transparency, and data sovereignty.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {painPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <h3 className="text-h4 font-semibold text-navy">
                  {point.title}
                </h3>
                <p className="mt-3 text-body-sm text-dark-gray">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How ParityScope Helps */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            How ParityScope Helps
          </h2>
          <div className="mt-12 space-y-20">
            {solutions.map((item, i) => (
              <div
                key={item.heading}
                className={`flex flex-col gap-10 lg:flex-row lg:items-center ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="lg:w-1/2">
                  <h3 className="text-h3 font-semibold text-navy">
                    {item.heading}
                  </h3>
                  <p className="mt-4 text-body-lg text-dark-gray">
                    {item.body}
                  </p>
                  <p className="mt-3 text-body-sm text-medium-gray">
                    {item.detail}
                  </p>
                </div>
                <div className="flex items-center justify-center lg:w-1/2">
                  <div className="h-48 w-full rounded-2xl bg-light-gray" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Recommendation */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-h2 font-bold text-navy">
            Recommended: Enterprise Tier with Custom Deployment
          </h2>
          <p className="mt-4 text-body-lg text-dark-gray">
            Government engagements require the Enterprise tier with custom
            deployment options. These are typically the largest contract values
            with the longest procurement cycles — and we are structured to
            support that process.
          </p>
          <div className="mt-8 inline-block rounded-xl bg-white p-8 shadow-card text-left">
            <ul className="space-y-3 text-body-sm text-dark-gray">
              <li>On-premise or government cloud deployment (FedRAMP ready)</li>
              <li>Air-gapped installation support for classified environments</li>
              <li>NIST AI RMF and EU AI Act crosswalk reporting</li>
              <li>Public transparency report generation</li>
              <li>Procurement evaluation framework and vendor scoring tools</li>
              <li>Dedicated government account team with security clearance support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Regulatory Context */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            Regulatory Landscape
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            Government agencies are both subject to and enforcers of AI
            regulations. ParityScope supports both roles.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-light-gray p-6">
              <h4 className="text-h4 font-semibold text-navy">
                NIST AI RMF
              </h4>
              <p className="mt-2 text-body-sm text-dark-gray">
                The NIST AI Risk Management Framework is the de facto standard
                for US federal AI governance. ParityScope provides the MEASURE
                and MANAGE functions with automated fairness metrics and
                remediation tracking.
              </p>
            </div>
            <div className="rounded-2xl border border-light-gray p-6">
              <h4 className="text-h4 font-semibold text-navy">
                Executive Orders on AI
              </h4>
              <p className="mt-2 text-body-sm text-dark-gray">
                Federal executive orders on AI safety and equity require
                agencies to inventory AI systems and assess them for bias.
                ParityScope automates both the inventory and the assessment.
              </p>
            </div>
            <div className="rounded-2xl border border-light-gray p-6">
              <h4 className="text-h4 font-semibold text-navy">
                EU AI Act
              </h4>
              <p className="mt-2 text-body-sm text-dark-gray">
                European government agencies deploying AI in public health and
                social services must comply with high-risk AI requirements.
                ParityScope generates conformity assessment evidence for public
                sector deployments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-h2 font-bold text-white">
            Govern AI for the Public Good
          </h2>
          <p className="mt-4 text-body-lg text-navy-light">
            Contact our government team to discuss your deployment requirements,
            security environment, and procurement timeline. We support RFI, RFP,
            and sole-source procurement pathways.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-coral px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-coral/90"
            >
              Book an Assessment
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-white px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Enterprise Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
