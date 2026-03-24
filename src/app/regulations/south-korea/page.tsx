import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "South Korea AI Framework Act — Healthcare Compliance",
  description:
    "Navigate South Korea's AI Framework Act requirements for healthcare AI. Understand obligations, timelines, and how ParityScope helps you comply.",
};

const timelineItems = [
  {
    date: "September 2024",
    title: "Act Passed",
    description:
      "The National Assembly passed the Framework Act on Artificial Intelligence, making South Korea one of the first countries in Asia to enact comprehensive AI legislation.",
  },
  {
    date: "January 2026",
    title: "Act Takes Effect",
    description:
      "Full enforcement begins. Organizations deploying high-impact AI systems in healthcare must comply with risk assessment, transparency, and accountability requirements.",
  },
  {
    date: "Ongoing",
    title: "Sector-Specific Guidelines",
    description:
      "The Ministry of Health and Welfare is expected to issue detailed sector-specific guidelines for healthcare AI, including clinical decision support and diagnostic systems.",
  },
];

const requirements = [
  {
    title: "High-Impact AI Classification",
    description:
      "AI systems that affect life, physical safety, and fundamental rights are classified as high-impact. Healthcare AI — including diagnostic tools, treatment recommendation engines, and patient risk stratification systems — falls into this category.",
  },
  {
    title: "Risk Assessment & Impact Evaluation",
    description:
      "Operators of high-impact AI must conduct risk assessments evaluating the potential for harm, bias, and discrimination. These assessments must be documented and updated periodically.",
  },
  {
    title: "Transparency & Explainability",
    description:
      "Healthcare AI systems must provide users with clear information about how the system works, what data it uses, and the basis for its outputs. Patients and clinicians have a right to understand AI-driven decisions.",
  },
  {
    title: "Fairness & Non-Discrimination",
    description:
      "The Act explicitly prohibits AI systems that produce discriminatory outcomes based on gender, age, disability, race, region, or other protected characteristics — directly relevant to clinical AI bias.",
  },
  {
    title: "Accountability & Governance",
    description:
      "Organizations must designate responsible persons for AI governance, establish internal oversight mechanisms, and maintain records of AI system performance and incidents.",
  },
  {
    title: "Data Quality & Management",
    description:
      "High-impact AI systems must be trained on high-quality, representative datasets. Organizations must document data sources, preprocessing steps, and known limitations.",
  },
];

const parityHelps = [
  {
    title: "Automated Bias Auditing",
    description:
      "ParityScope tests your healthcare AI across 15+ fairness metrics and all protected attributes specified by the Framework Act, generating evidence of non-discrimination.",
  },
  {
    title: "Risk Assessment Documentation",
    description:
      "Our compliance reports map directly to the risk assessment requirements, providing structured documentation of fairness testing, identified disparities, and mitigation steps.",
  },
  {
    title: "Continuous Monitoring",
    description:
      "Meet the ongoing oversight requirement with real-time fairness monitoring that detects drift, alerts on emerging disparities, and maintains an audit trail.",
  },
  {
    title: "Multi-Jurisdiction Mapping",
    description:
      "For organizations operating across South Korea and other regulated markets, ParityScope maps a single audit to multiple regulatory frameworks simultaneously.",
  },
];

export default function SouthKoreaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-widest text-teal">
            Regulatory Guide
          </p>
          <h1 className="mt-4 text-h1 font-bold leading-tight lg:text-display">
            South Korea AI Framework Act
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            South Korea&apos;s Framework Act on Artificial Intelligence
            establishes comprehensive rules for high-impact AI systems, with
            healthcare as a priority sector. Effective January 2026, the Act
            requires risk assessments, fairness testing, and transparency for
            clinical AI.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book a Compliance Assessment
            </Link>
            <Link
              href="/regulations/eu-ai-act"
              className="rounded-full border border-white/30 px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Compare with EU AI Act
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">Overview</h2>
          <div className="mt-8 max-w-4xl space-y-4 text-medium-gray">
            <p>
              The Framework Act on Artificial Intelligence (AI Framework Act)
              represents South Korea&apos;s commitment to responsible AI
              governance. Passed by the National Assembly in September 2024,
              the law provides a comprehensive regulatory framework for AI
              development and deployment across all sectors, with particular
              attention to high-impact applications in healthcare, criminal
              justice, and employment.
            </p>
            <p>
              The Act takes a principles-based approach, establishing
              requirements for transparency, fairness, accountability, and
              safety. It distinguishes between general AI systems and
              high-impact AI systems that affect life, safety, or fundamental
              rights — a category that encompasses virtually all clinical AI
              applications.
            </p>
            <p>
              South Korea is the second jurisdiction globally (after the EU) to
              enact a comprehensive, binding AI law. For healthcare organizations
              operating in South Korea or serving Korean patients, compliance
              preparation should begin now.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">Timeline</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {timelineItems.map((item) => (
              <div
                key={item.date}
                className="rounded-2xl border border-light-gray bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <p className="text-body-sm font-bold uppercase tracking-wider text-teal">
                  {item.date}
                </p>
                <h3 className="mt-3 text-h4 font-semibold text-navy">
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

      {/* Healthcare Requirements */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            Healthcare Requirements
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            The following requirements apply to healthcare organizations
            deploying AI systems classified as high-impact under the Framework
            Act.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {requirements.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-light-gray p-6"
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

      {/* How ParityScope Helps */}
      <section className="bg-navy px-4 py-section text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold">How ParityScope Helps</h2>
          <p className="mt-4 max-w-3xl text-body-lg text-light-gray">
            ParityScope provides the tools and documentation healthcare
            organizations need to demonstrate compliance with the South Korea
            AI Framework Act.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {parityHelps.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-navy-light p-8"
              >
                <h3 className="text-h4 font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-body-sm text-light-gray">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold text-navy">
            Prepare for Compliance
          </h2>
          <p className="mt-4 text-body-lg text-medium-gray">
            The AI Framework Act takes effect in January 2026. Start your
            compliance journey now with a ParityScope assessment to identify
            gaps and build your roadmap.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book a Compliance Assessment
            </Link>
            <Link
              href="/resources/whitepapers"
              className="rounded-full border border-navy px-8 py-3 text-base font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Download Regulatory Brief
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
