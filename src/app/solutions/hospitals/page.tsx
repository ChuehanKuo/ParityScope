import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hospitals & Health Systems — ParityScope",
  description:
    "Govern clinical AI across your health system with on-premise bias auditing, continuous monitoring, and EU AI Act compliance from ParityScope.",
};

const painPoints = [
  {
    title: "Clinical AI Governance Gap",
    description:
      "Dozens of AI models are deployed across radiology, pathology, sepsis prediction, and scheduling — but no unified framework exists to audit them for fairness or track performance drift over time.",
  },
  {
    title: "Multi-Department Model Sprawl",
    description:
      "Each department procures its own AI tools independently. Without a centralized registry and audit trail, the CHAIO has no visibility into which models are running, on what populations, or with what outcomes.",
  },
  {
    title: "Patient Safety Liability",
    description:
      "A biased clinical decision support algorithm can lead to delayed diagnoses, inequitable resource allocation, and malpractice exposure. The liability falls squarely on the health system — not the vendor.",
  },
  {
    title: "Regulatory Audit Readiness",
    description:
      "Accreditation bodies, CMS, and state regulators increasingly require documentation that AI tools meet equity standards. Manual audits are time-consuming, inconsistent, and difficult to reproduce.",
  },
];

const solutions = [
  {
    heading: "Centralized AI Model Registry",
    body: "Catalog every clinical AI model across your health system in a single dashboard. Track model provenance, deployment status, fairness metrics, and responsible owners — giving the CHAIO complete visibility from day one.",
    detail:
      "ParityScope integrates with Epic, Cerner, and custom EHR deployments to automatically discover embedded prediction models and surface them for audit.",
  },
  {
    heading: "On-Premise SDK — Data Never Leaves Your Network",
    body: "Run bias audits and fairness testing entirely within your hospital infrastructure. Patient data stays behind your firewall at all times, satisfying HIPAA, institutional review boards, and data governance requirements.",
    detail:
      "The SDK deploys as a lightweight container or Python package inside your existing analytics environment. No cloud egress, no BAA complexity.",
  },
  {
    heading: "Continuous Monitoring & Drift Detection",
    body: "Clinical populations shift. Payer mixes change. New demographic groups enter your catchment area. ParityScope continuously monitors model performance across subgroups and alerts your team when fairness metrics degrade.",
    detail:
      "Set custom thresholds for demographic parity, equalized odds, and calibration metrics. Receive automated alerts before a disparity becomes a patient safety event.",
  },
  {
    heading: "Epic & EHR Model Auditing",
    body: "Audit the prediction models embedded in your EHR — sepsis scores, readmission risk, deterioration indices — against your actual patient population rather than the vendor's training data.",
    detail:
      "Generate audit reports stratified by race, ethnicity, age, sex, payer status, and language preference. Export results in formats ready for quality committees and board presentations.",
  },
];

export default function HospitalsPage() {
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
            <span className="text-white">Hospitals &amp; Health Systems</span>
          </nav>
          <h1 className="text-display font-bold text-white">
            ParityScope for Hospitals &amp; Health Systems
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-navy-light">
            Govern every clinical AI model across your health system with a
            unified fairness auditing platform — deployed on-premise, designed
            for the Chief Health AI Officer, and built for regulatory readiness.
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
            Health systems are deploying AI faster than they can govern it. These
            are the gaps that keep CHAIOs up at night.
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
            Recommended: Enterprise Tier
          </h2>
          <p className="mt-4 text-body-lg text-dark-gray">
            Health systems benefit most from the Enterprise tier with continuous
            monitoring, on-premise deployment, dedicated support, and custom SLAs.
            Pricing is based on the number of AI models under governance and
            annual patient volume.
          </p>
          <div className="mt-8 inline-block rounded-xl bg-white p-8 shadow-card text-left">
            <ul className="space-y-3 text-body-sm text-dark-gray">
              <li>On-premise SDK deployment within your data center</li>
              <li>Continuous fairness monitoring with automated alerting</li>
              <li>Dedicated customer success manager and CHAIO onboarding</li>
              <li>Custom integrations with Epic, Cerner, and internal data lakes</li>
              <li>Quarterly executive fairness reports for board review</li>
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
            Clinical AI is under increasing regulatory scrutiny. ParityScope
            helps you stay ahead of these requirements.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-light-gray p-6">
              <h4 className="text-h4 font-semibold text-navy">EU AI Act</h4>
              <p className="mt-2 text-body-sm text-dark-gray">
                Clinical decision support systems are classified as high-risk
                under Article 6. ParityScope generates the conformity assessment
                documentation and bias testing evidence required for compliance.
              </p>
            </div>
            <div className="rounded-2xl border border-light-gray p-6">
              <h4 className="text-h4 font-semibold text-navy">CMS &amp; Joint Commission</h4>
              <p className="mt-2 text-body-sm text-dark-gray">
                US regulators and accreditation bodies are increasing AI equity
                requirements. Automated audit trails demonstrate ongoing
                compliance without manual effort.
              </p>
            </div>
            <div className="rounded-2xl border border-light-gray p-6">
              <h4 className="text-h4 font-semibold text-navy">State-Level AI Laws</h4>
              <p className="mt-2 text-body-sm text-dark-gray">
                Colorado, Illinois, and other states are enacting AI fairness
                laws that apply to healthcare. ParityScope tracks jurisdiction-
                specific requirements across your operating footprint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-h2 font-bold text-white">
            Ready to Govern Clinical AI with Confidence?
          </h2>
          <p className="mt-4 text-body-lg text-navy-light">
            Schedule a consultation with our health systems team. We will map
            your AI inventory, identify governance gaps, and deliver a fairness
            baseline within 30 days.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-coral px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-coral/90"
            >
              Schedule a Consultation
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
