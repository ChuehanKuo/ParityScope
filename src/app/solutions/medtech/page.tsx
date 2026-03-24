import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MedTech & Digital Health — ParityScope",
  description:
    "Accelerate regulatory submissions for AI-enabled medical devices with automated fairness testing, conformity assessments, and multi-jurisdiction compliance.",
};

const painPoints = [
  {
    title: "Pre-Market Regulatory Submissions",
    description:
      "Regulators increasingly require bias and fairness evidence as part of your 510(k), De Novo, or CE marking submission. Assembling this evidence manually delays your filing by months.",
  },
  {
    title: "Multi-Jurisdiction Compliance",
    description:
      "Your AI-enabled device ships to the EU, South Korea, Taiwan, and the US — each with distinct fairness and transparency requirements. Managing parallel compliance workflows is expensive and error-prone.",
  },
  {
    title: "Time-to-Market Pressure",
    description:
      "Every week spent on compliance documentation is a week your competitor gains. You need fairness testing that integrates into your development pipeline, not a separate workstream that blocks launch.",
  },
  {
    title: "Post-Market Surveillance",
    description:
      "Regulatory obligations do not end at approval. Post-market surveillance requires ongoing monitoring of model performance across demographic subgroups in real-world clinical settings.",
  },
];

const solutions = [
  {
    heading: "Automated Conformity Assessment",
    body: "Generate the fairness and non-discrimination evidence required for EU AI Act conformity assessments. ParityScope maps directly to Annex IV documentation requirements, producing audit-ready reports from your test data.",
    detail:
      "Covers demographic parity, equalized odds, predictive parity, and calibration metrics across all protected attributes specified in Article 10.",
  },
  {
    heading: "EU AI Act Annex Pathway Support",
    body: "AI-enabled medical devices fall under both the Medical Device Regulation and the EU AI Act. ParityScope provides the fairness testing layer that bridges both regulatory frameworks, ensuring your Annex pathway documentation is complete.",
    detail:
      "Pre-built report templates for Annex I essential requirements, Annex IV technical documentation, and Annex VII conformity assessment procedures.",
  },
  {
    heading: "QMS & Design Control Integration",
    body: "Embed fairness testing directly into your existing quality management system. ParityScope integrates with your design control process so bias testing becomes a standard verification and validation step — not an afterthought.",
    detail:
      "Compatible with ISO 13485 workflows. Outputs integrate with Greenlight Guru, MasterControl, and Arena PLM systems.",
  },
  {
    heading: "Multi-Jurisdiction Reporting",
    body: "One fairness audit, multiple regulatory outputs. ParityScope generates jurisdiction-specific reports for the EU, South Korea (MFDS), Taiwan (TFDA), and the US (FDA) from a single test run.",
    detail:
      "Each report follows the local regulator's preferred format, citation style, and metric definitions — eliminating redundant testing and reformatting.",
  },
];

export default function MedtechPage() {
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
            <span className="text-white">MedTech &amp; Digital Health</span>
          </nav>
          <h1 className="text-display font-bold text-white">
            ParityScope for MedTech &amp; Digital Health
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-navy-light">
            Ship compliant AI-enabled medical devices faster. Automate fairness
            testing, generate conformity assessment evidence, and manage multi-
            jurisdiction regulatory requirements from a single platform.
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
            Bringing an AI-enabled device to market is a regulatory marathon.
            Fairness compliance should not be the obstacle that slows you down.
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
            Recommended: SDK License Tier
          </h2>
          <p className="mt-4 text-body-lg text-dark-gray">
            MedTech companies benefit most from the SDK License tier, which
            provides programmatic access to fairness testing and report
            generation — designed to embed directly into your CI/CD and
            regulatory submission workflows.
          </p>
          <div className="mt-8 inline-block rounded-xl bg-white p-8 shadow-card text-left">
            <ul className="space-y-3 text-body-sm text-dark-gray">
              <li>Python and REST API access for pipeline integration</li>
              <li>Pre-built conformity assessment report templates</li>
              <li>Multi-jurisdiction output from a single test run</li>
              <li>QMS integration with leading PLM platforms</li>
              <li>Post-market surveillance monitoring endpoints</li>
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
            AI-enabled medical devices face overlapping regulatory requirements
            across every market you ship to. ParityScope keeps you compliant
            everywhere.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-light-gray p-6">
              <h4 className="text-h4 font-semibold text-navy">EU AI Act</h4>
              <p className="mt-2 text-body-sm text-dark-gray">
                High-risk classification under Annex III. Requires conformity
                assessment with bias testing, data governance, and transparency
                documentation.
              </p>
            </div>
            <div className="rounded-2xl border border-light-gray p-6">
              <h4 className="text-h4 font-semibold text-navy">South Korea (MFDS)</h4>
              <p className="mt-2 text-body-sm text-dark-gray">
                AI medical device guidance requires fairness evaluation across
                Korean demographic categories. ParityScope generates MFDS-
                compatible reporting.
              </p>
            </div>
            <div className="rounded-2xl border border-light-gray p-6">
              <h4 className="text-h4 font-semibold text-navy">Taiwan (TFDA)</h4>
              <p className="mt-2 text-body-sm text-dark-gray">
                AI medical device registration requires performance validation
                across local population subgroups. Automated report generation
                in TFDA-accepted formats.
              </p>
            </div>
            <div className="rounded-2xl border border-light-gray p-6">
              <h4 className="text-h4 font-semibold text-navy">US (FDA)</h4>
              <p className="mt-2 text-body-sm text-dark-gray">
                FDA action plan for AI/ML-based SaMD emphasizes real-world
                performance monitoring. ParityScope supports predetermined
                change control plans with fairness metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-h2 font-bold text-white">
            Accelerate Your Regulatory Submissions
          </h2>
          <p className="mt-4 text-body-lg text-navy-light">
            Book a demo to see how ParityScope integrates into your development
            pipeline and generates submission-ready fairness evidence in minutes
            instead of months.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-coral px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-coral/90"
            >
              Book a Demo
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-white px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              View SDK Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
