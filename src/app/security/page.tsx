import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "Security — Data Protection & Compliance",
  description:
    "ParityScope's security architecture, certifications, and data protection practices. SDK-first design means patient data never leaves your infrastructure.",
};

export default function SecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            label="Security"
            title="Security by Architecture, Not Afterthought"
            description="ParityScope's SDK-first design means patient data never leaves your infrastructure. We bring the analysis to your data — not the other way around."
            align="left"
          />
        </div>
      </section>

      {/* Core principles */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-h2 font-bold text-navy">
            Security Principles
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Data Never Leaves Your Infrastructure",
                description:
                  "The ParityScope SDK runs entirely within your environment — on-premise, in your private cloud, or in your VPC. Patient data, model predictions, and protected attribute information are processed locally. Only aggregated, de-identified fairness metrics are generated.",
              },
              {
                title: "Zero Trust Architecture",
                description:
                  "Every API request is authenticated and authorized. We use API key authentication with scoped permissions, rate limiting, and request signing. All communication uses TLS 1.3 with certificate pinning for API endpoints.",
              },
              {
                title: "Encryption at Rest and in Transit",
                description:
                  "All data stored by the ParityScope platform (audit results, monitoring data, alert history) is encrypted at rest using AES-256. All network communication uses TLS 1.3. Encryption keys are managed via customer-controlled KMS integration.",
              },
              {
                title: "Principle of Least Privilege",
                description:
                  "The SDK requires read-only access to model predictions and demographic data. It does not require access to model weights, training data, or patient identifiers beyond the minimum needed for fairness analysis.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-light-gray bg-white p-8"
              >
                <h3 className="text-h3 font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-medium-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-h2 font-bold text-navy">
            Compliance & Certifications
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "HIPAA Compliant",
                description:
                  "ParityScope is designed for healthcare from the ground up. We maintain full HIPAA compliance, execute BAAs with all customers, and conduct annual HIPAA risk assessments. Our SDK architecture eliminates most HIPAA concerns by never handling PHI directly.",
              },
              {
                title: "SOC 2 Type II",
                description:
                  "Our cloud platform undergoes annual SOC 2 Type II audits covering security, availability, and confidentiality trust service criteria. Audit reports are available to customers and prospects under NDA.",
              },
              {
                title: "GDPR Ready",
                description:
                  "ParityScope supports GDPR compliance with data processing agreements, privacy impact assessments, and data residency options. EU customers can deploy with data processed exclusively within EU boundaries.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-light-gray p-6"
              >
                <h3 className="font-semibold text-navy">{item.title}</h3>
                <p className="mt-3 text-sm text-medium-gray">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data flow diagram */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-h2 font-bold text-white">
            How Your Data Stays Protected
          </h2>
          <p className="mt-4 text-gray-300">
            The SDK processes data locally and only transmits aggregated
            fairness scores.
          </p>
          <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-8 font-mono text-sm text-gray-300">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="rounded bg-teal/20 px-3 py-1 text-teal">
                  Your Infrastructure
                </span>
              </div>
              <div className="ml-4 space-y-2 border-l-2 border-white/20 pl-6">
                <p>
                  <span className="text-white">1.</span> Patient data +
                  predictions stay in your environment
                </p>
                <p>
                  <span className="text-white">2.</span> ParityScope SDK
                  computes fairness metrics locally
                </p>
                <p>
                  <span className="text-white">3.</span> De-identified,
                  aggregated results generated
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="rounded bg-white/10 px-3 py-1 text-white">
                  Network Boundary
                </span>
                <span className="text-medium-gray">
                  — TLS 1.3 encrypted —
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="rounded bg-teal/20 px-3 py-1 text-teal">
                  ParityScope Cloud (optional)
                </span>
              </div>
              <div className="ml-4 space-y-2 border-l-2 border-white/20 pl-6">
                <p>
                  <span className="text-white">4.</span> Aggregated fairness
                  scores stored (no PHI)
                </p>
                <p>
                  <span className="text-white">5.</span> Monitoring dashboard
                  and alerts
                </p>
                <p>
                  <span className="text-white">6.</span> Compliance reports
                  generated
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security practices */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-h2 font-bold text-navy">
            Security Practices
          </h2>
          <div className="mt-12 space-y-6">
            {[
              {
                title: "Penetration Testing",
                description:
                  "Annual third-party penetration testing by certified security firms. Findings are remediated within SLA timelines and re-tested for verification.",
              },
              {
                title: "Vulnerability Management",
                description:
                  "Continuous automated vulnerability scanning of all platform components. Critical vulnerabilities are patched within 24 hours. We maintain a responsible disclosure program for security researchers.",
              },
              {
                title: "Access Controls",
                description:
                  "Role-based access control (RBAC) for all platform features. SSO/SAML integration for Enterprise customers. Multi-factor authentication required for all ParityScope employees.",
              },
              {
                title: "Incident Response",
                description:
                  "Documented incident response plan with defined escalation procedures. Customers are notified of security incidents within 72 hours per GDPR and within 60 days per HIPAA Breach Notification Rule.",
              },
              {
                title: "Secure Development",
                description:
                  "All code undergoes peer review, automated SAST/DAST scanning, and dependency vulnerability checking before deployment. We follow OWASP Top 10 guidelines and maintain a secure SDLC.",
              },
              {
                title: "Business Continuity",
                description:
                  "Multi-region deployment with automated failover. RPO of 1 hour and RTO of 4 hours for cloud platform services. The SDK operates independently and is unaffected by cloud platform availability.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border-b border-light-gray pb-6"
              >
                <h3 className="font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-medium-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold text-navy">
            Security Questions?
          </h2>
          <p className="mt-4 text-medium-gray">
            Our security team is available to answer questions, provide
            documentation, and support your vendor assessment process.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="mailto:security@parityscope.com"
              className="rounded-full bg-navy px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy/90"
            >
              security@parityscope.com
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-navy px-8 py-3 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Request Security Documentation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
