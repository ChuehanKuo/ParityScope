import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security — ParityScope",
  description:
    "ParityScope's security practices, SDK-first privacy architecture, certification roadmap, and responsible disclosure policy.",
};

const certifications = [
  {
    name: "SOC 2 Type II",
    status: "In Progress",
    timeline: "2026",
    description:
      "Comprehensive audit of our security, availability, and confidentiality controls. SOC 2 certification validates that our platform infrastructure and processes meet the highest standards for data protection.",
  },
  {
    name: "HITRUST CSF",
    status: "Planned",
    timeline: "2026-2027",
    description:
      "The gold standard for healthcare information security. HITRUST certification demonstrates that ParityScope meets the specific security requirements of the healthcare industry, including HIPAA alignment.",
  },
  {
    name: "ISO 42001",
    status: "Planned",
    timeline: "2027",
    description:
      "The international standard for AI management systems. ISO 42001 certification validates that our AI fairness tools are developed and maintained according to best practices for responsible AI governance.",
  },
];

const dataHandling = [
  {
    title: "SDK-First Architecture",
    description:
      "Our SDK runs entirely within your infrastructure — on-premise or in your cloud environment. Patient data never leaves your network. Only aggregated, de-identified fairness metrics are shared with ParityScope for reporting purposes.",
  },
  {
    title: "No Patient Data Transmission",
    description:
      "ParityScope never receives, stores, or processes identifiable patient data. Our SDK computes fairness metrics locally, and only summary statistics (e.g., disparity ratios, group-level performance scores) are transmitted.",
  },
  {
    title: "Encryption in Transit & at Rest",
    description:
      "All communications between the SDK and ParityScope services are encrypted using TLS 1.3. Any aggregated metric data stored on our platform is encrypted at rest using AES-256.",
  },
  {
    title: "Access Controls",
    description:
      "Role-based access control (RBAC) governs all access to ParityScope systems. Administrative actions are logged and auditable. Multi-factor authentication is required for all team members.",
  },
  {
    title: "Data Retention & Deletion",
    description:
      "Aggregated fairness metrics are retained according to your organization's preferences. You can request deletion of all data at any time, and we will confirm deletion within 30 days.",
  },
  {
    title: "Vendor Security Assessment",
    description:
      "We maintain a rigorous vendor security assessment process. All third-party services used by ParityScope undergo security review before integration, and are regularly re-evaluated.",
  },
];

export default function SecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-h1 font-bold leading-tight lg:text-display">
            Security & Privacy
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            At ParityScope, security is foundational — not an afterthought. Our
            SDK-first architecture means your patient data never leaves your
            infrastructure. We bring the analysis to your data, not the other
            way around.
          </p>
        </div>
      </section>

      {/* SDK-First Privacy */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-body-sm font-semibold uppercase tracking-widest text-teal">
                Privacy by Architecture
              </p>
              <h2 className="mt-4 text-h2 font-bold text-navy">
                SDK-First Approach
              </h2>
              <div className="mt-6 space-y-4 text-medium-gray">
                <p>
                  Traditional AI auditing platforms require you to upload
                  sensitive data to their servers. In healthcare, this creates
                  unacceptable risk — patient data is among the most sensitive
                  and heavily regulated information in the world.
                </p>
                <p>
                  ParityScope takes a fundamentally different approach. Our SDK
                  installs within your infrastructure and runs all fairness
                  computations locally. Patient-level data never leaves your
                  environment. Only aggregated, de-identified fairness metrics
                  are transmitted to ParityScope for reporting and monitoring.
                </p>
                <p>
                  This architecture is not just a privacy feature — it is the
                  foundation of our entire platform. It eliminates the need for
                  complex data sharing agreements, reduces HIPAA/GDPR
                  compliance burden, and ensures your data governance
                  requirements are met by default.
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full rounded-2xl border border-light-gray bg-off-white p-8">
                <h3 className="text-h4 font-semibold text-navy">
                  How It Works
                </h3>
                <ol className="mt-6 space-y-4">
                  {[
                    "Install the ParityScope SDK in your environment (on-premise or cloud)",
                    "Configure audit parameters: models, attributes, metrics, thresholds",
                    "SDK runs fairness computations locally on your data",
                    "Only aggregated, de-identified metrics are transmitted",
                    "View results in the ParityScope dashboard or export reports",
                  ].map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal text-caption font-bold text-white">
                        {index + 1}
                      </span>
                      <span className="text-body-sm text-medium-gray">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Handling */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            Data Handling Practices
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            We take a defense-in-depth approach to data security, with multiple
            layers of protection at every stage.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {dataHandling.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-light-gray bg-white p-6 shadow-card"
              >
                <h3 className="text-h4 font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-body-sm text-medium-gray">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Roadmap */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            Certification Roadmap
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            We are pursuing industry-leading certifications to validate our
            security practices and provide assurance to our customers.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="rounded-2xl border border-light-gray p-8"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-h3 font-bold text-navy">{cert.name}</h3>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-caption font-semibold ${
                      cert.status === "In Progress"
                        ? "bg-amber/10 text-amber"
                        : "bg-medium-gray/10 text-medium-gray"
                    }`}
                  >
                    {cert.status}
                  </span>
                  <span className="text-body-sm text-medium-gray">
                    Target: {cert.timeline}
                  </span>
                </div>
                <p className="mt-4 text-body-sm text-medium-gray">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GDPR Compliance */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-h2 font-bold text-navy">GDPR Compliance</h2>
          <div className="mt-8 space-y-6 text-medium-gray">
            <p>
              ParityScope is designed with GDPR compliance built in. Our
              SDK-first architecture means we process minimal personal data,
              and what we do process is limited to aggregated, de-identified
              fairness metrics.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "Data Minimization",
                  description:
                    "We collect only the aggregated metrics necessary to generate fairness reports. No patient-level data is transmitted or stored by ParityScope.",
                },
                {
                  title: "Lawful Basis",
                  description:
                    "Processing is based on legitimate interest (compliance with AI regulations) and, where applicable, contractual necessity. We maintain detailed records of processing activities.",
                },
                {
                  title: "Data Subject Rights",
                  description:
                    "We support all GDPR data subject rights including access, rectification, erasure, and portability for any personal data we do process (e.g., account information).",
                },
                {
                  title: "Data Processing Agreements",
                  description:
                    "We execute DPAs with all customers. Our standard DPA addresses sub-processors, data transfers, security measures, and breach notification obligations.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-light-gray bg-white p-6"
                >
                  <h3 className="text-h4 font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-medium-gray">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Responsible Disclosure */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-h2 font-bold text-navy">
            Responsible Disclosure Policy
          </h2>
          <div className="mt-8 rounded-2xl border border-light-gray bg-off-white p-8">
            <div className="space-y-4 text-medium-gray">
              <p>
                We take security vulnerabilities seriously and appreciate
                responsible disclosure from the security research community.
                If you discover a potential security issue in ParityScope, we
                ask that you report it to us before disclosing it publicly.
              </p>
              <h3 className="text-h4 font-semibold text-navy">
                How to Report
              </h3>
              <ul className="space-y-2 text-body-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Email security vulnerabilities to{" "}
                  <span className="font-mono font-semibold text-navy">
                    security@parityscope.com
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Include a detailed description of the vulnerability and steps
                  to reproduce
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  We will acknowledge receipt within 48 hours
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  We will provide an initial assessment within 5 business days
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  We will not take legal action against researchers acting in
                  good faith
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-section text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold">Questions About Security?</h2>
          <p className="mt-4 text-body-lg text-light-gray">
            We are happy to discuss our security practices in detail, provide
            additional documentation, or participate in your vendor security
            assessment process.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book an Assessment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
