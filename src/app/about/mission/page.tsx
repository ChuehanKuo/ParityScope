import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Mission — ParityScope",
  description:
    "Why ParityScope exists: the story behind our mission to make healthcare AI fair, transparent, and compliant for every patient, everywhere.",
};

export default function MissionPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-body-sm font-semibold uppercase tracking-widest text-teal">
            Our Mission
          </p>
          <h1 className="mt-4 text-h1 font-bold leading-tight lg:text-display">
            Every Patient Deserves Equitable AI
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-light-gray">
            Healthcare AI is making life-or-death decisions for millions of
            patients every day. We exist to ensure those decisions are fair.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-h2 font-bold text-navy">The Problem</h2>
          <div className="mt-8 space-y-6 text-medium-gray">
            <p className="text-body-lg">
              Artificial intelligence is being deployed across healthcare at a
              pace that outstrips our ability to verify its fairness. Sepsis
              prediction models, readmission risk scores, treatment
              recommendation engines, diagnostic aids, and triage algorithms are
              being integrated into clinical workflows in hospitals,
              health systems, and insurance companies around the world.
            </p>
            <p>
              The promise of these systems is enormous: faster diagnoses, more
              consistent care, reduced clinician burden, and better patient
              outcomes. But the reality is more complicated. These AI systems
              are trained on historical data — data that reflects decades of
              systemic inequities in healthcare access, treatment patterns, and
              clinical research.
            </p>
            <p>
              The result is AI that encodes and amplifies existing biases at
              scale. A landmark 2019 study published in Science found that a
              widely-used clinical algorithm systematically underestimated the
              healthcare needs of Black patients, affecting the care of millions.
              Since then, similar biases have been documented across dozens of
              clinical AI systems — in radiology, dermatology, cardiology,
              mental health, and primary care.
            </p>
            <p>
              The patients who suffer most from biased AI are those who have
              always been underserved by the healthcare system: racial and
              ethnic minorities, women, elderly patients, people with
              disabilities, and those from lower socioeconomic backgrounds.
              Biased AI does not create new inequities — it automates and
              accelerates the ones that already exist.
            </p>
          </div>
        </div>
      </section>

      {/* The Gap */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-h2 font-bold text-navy">The Gap</h2>
          <div className="mt-8 space-y-6 text-medium-gray">
            <p>
              Healthcare organizations know that AI fairness matters. Clinical
              leaders, compliance officers, and IT teams increasingly recognize
              the ethical and legal risks of deploying biased AI. But most
              organizations lack the specialized tools, expertise, and
              infrastructure to systematically assess and address AI bias.
            </p>
            <p>
              The fairness testing landscape has been fragmented: academic
              research papers propose metrics, open-source libraries offer
              building blocks, and consulting firms provide bespoke analyses.
              But no solution has been purpose-built for the unique requirements
              of healthcare AI — where the stakes are measured in patient
              outcomes, the data involves protected health information, the
              regulatory landscape spans multiple jurisdictions, and the
              clinical context matters as much as the statistics.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "No Standard Toolkit",
                description:
                  "Healthcare organizations have no standardized, validated toolkit for testing AI fairness. Most rely on ad hoc analyses or vendor self-assessments.",
              },
              {
                title: "Regulatory Complexity",
                description:
                  "The EU AI Act, Section 1557, and emerging laws in South Korea and Taiwan each have different requirements. Mapping AI fairness to multiple jurisdictions is a manual, error-prone process.",
              },
              {
                title: "Privacy Constraints",
                description:
                  "Healthcare data is among the most sensitive in the world. Bias testing tools that require sending patient data to external platforms are a non-starter for most organizations.",
              },
            ].map((item) => (
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

      {/* Our Vision */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-h2 font-bold text-navy">Our Vision</h2>
          <div className="mt-8 space-y-6 text-medium-gray">
            <p className="text-body-lg">
              We envision a world where every healthcare AI system is audited
              for fairness before it touches a patient — and monitored
              continuously after deployment to ensure it stays fair.
            </p>
            <p>
              ParityScope was founded to bridge the gap between AI innovation
              and health equity. We build the specialized tools healthcare
              organizations need to audit, monitor, and mitigate AI bias — so
              they can deploy clinical AI with confidence and meet the rapidly
              evolving global regulatory landscape.
            </p>
            <p>
              Our approach is built on three principles:
            </p>
          </div>
          <div className="mt-8 space-y-6">
            {[
              {
                title: "Privacy by Architecture",
                description:
                  "Our SDK runs within your infrastructure. Patient data never leaves your environment. We bring the analysis to your data, not the other way around.",
              },
              {
                title: "Healthcare-Specific by Design",
                description:
                  "We are not a general-purpose fairness toolkit adapted for healthcare. Every metric, threshold, and report template is designed for clinical AI use cases, with input from clinicians, ethicists, and regulators.",
              },
              {
                title: "Compliance-Ready by Default",
                description:
                  "Every audit maps directly to regulatory requirements across the EU AI Act, Section 1557, South Korea AI Framework Act, and Taiwan AI Basic Law. One audit, multiple jurisdictions.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-xl border border-light-gray p-6"
              >
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal">
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </span>
                <div>
                  <h3 className="text-h4 font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-medium-gray">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Future */}
      <section className="bg-navy px-4 py-section text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-h2 font-bold">Looking Ahead</h2>
          <div className="mt-8 space-y-6 text-light-gray">
            <p>
              The regulatory landscape for healthcare AI is evolving rapidly.
              The EU AI Act sets the global standard, but South Korea, Taiwan,
              and the United States are following with their own frameworks. We
              expect every major healthcare market to have binding AI fairness
              requirements within the next three years.
            </p>
            <p>
              Organizations that invest in AI fairness infrastructure now will
              be well-positioned for this future. Those that wait will face
              costly remediation, regulatory penalties, and — most importantly —
              the continued risk of harming patients through biased AI.
            </p>
            <p>
              We are building ParityScope to be the global standard for
              healthcare AI fairness. Our mission will not be complete until
              every clinical AI system is tested, monitored, and proven fair for
              every patient it serves.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold text-navy">Join Our Mission</h2>
          <p className="mt-4 text-body-lg text-medium-gray">
            Whether you are a healthcare organization looking to audit your AI,
            a researcher passionate about algorithmic fairness, or a regulator
            shaping the future of AI governance — we want to work with you.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book an Assessment
            </Link>
            <Link
              href="/about/team"
              className="rounded-full border border-navy px-8 py-3 text-base font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Meet the Team
            </Link>
            <Link
              href="/about/careers"
              className="rounded-full border border-navy px-8 py-3 text-base font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              View Careers
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
