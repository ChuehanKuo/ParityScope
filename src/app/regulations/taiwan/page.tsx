import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Taiwan AI Basic Law — Healthcare Compliance",
  description:
    "Navigate Taiwan's AI Basic Law requirements for healthcare AI. Understand the framework, obligations, and how ParityScope helps you comply.",
};

const timelineItems = [
  {
    date: "December 2024",
    title: "Draft Introduced",
    description:
      "The Executive Yuan approved the draft AI Basic Law, establishing Taiwan's foundational approach to AI governance across all sectors.",
  },
  {
    date: "2025",
    title: "Legislative Review & Passage",
    description:
      "The Legislative Yuan reviewed and passed the AI Basic Law, making Taiwan one of the first jurisdictions in Asia-Pacific to establish a comprehensive AI governance framework.",
  },
  {
    date: "Ongoing",
    title: "Implementation Guidelines",
    description:
      "Government agencies are developing sector-specific implementation guidelines, including detailed requirements for healthcare AI applications and clinical decision support systems.",
  },
];

const requirements = [
  {
    title: "Risk-Based Governance",
    description:
      "The AI Basic Law adopts a risk-proportionate approach to regulation. Healthcare AI systems — particularly those involved in diagnosis, treatment recommendations, and patient triage — are expected to face the highest tier of governance requirements.",
  },
  {
    title: "Fairness & Non-Discrimination",
    description:
      "AI systems must not produce outcomes that discriminate on the basis of gender, age, ethnicity, disability, or other protected characteristics. Healthcare organizations must test for and mitigate bias in clinical AI.",
  },
  {
    title: "Transparency & Accountability",
    description:
      "Organizations deploying AI in healthcare must be transparent about AI use, provide explanations of AI-driven decisions to patients and clinicians, and maintain accountability for outcomes.",
  },
  {
    title: "Data Protection & Privacy",
    description:
      "AI systems must comply with Taiwan's Personal Data Protection Act. Healthcare AI faces additional scrutiny given the sensitivity of patient data and the potential for re-identification.",
  },
  {
    title: "Human-Centric Design",
    description:
      "The law emphasizes that AI should augment human decision-making, not replace it. Clinical AI must include mechanisms for human oversight, intervention, and override.",
  },
  {
    title: "Innovation & Sandboxing",
    description:
      "Taiwan's approach balances regulation with innovation, providing regulatory sandboxes for AI development in healthcare. Organizations can test new AI systems under supervised conditions before full deployment.",
  },
];

const parityHelps = [
  {
    title: "Bias Testing & Documentation",
    description:
      "ParityScope audits healthcare AI systems across all protected attributes recognized by Taiwan's anti-discrimination framework, generating evidence of fairness testing and compliance.",
  },
  {
    title: "Multi-Jurisdiction Compliance",
    description:
      "For organizations operating across Taiwan and other regulated markets (EU, South Korea, US), ParityScope maps a single audit to multiple regulatory frameworks simultaneously.",
  },
  {
    title: "Transparency Reports",
    description:
      "Our compliance reports provide the clear, human-readable explanations of AI behavior that Taiwan's transparency requirements demand — suitable for both regulators and clinical staff.",
  },
  {
    title: "Continuous Monitoring",
    description:
      "Meet ongoing governance requirements with real-time fairness monitoring, drift detection, and automated alerts when your AI systems deviate from fairness thresholds.",
  },
];

export default function TaiwanPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-widest text-teal">
            Regulatory Guide
          </p>
          <h1 className="mt-4 text-h1 font-bold leading-tight lg:text-display">
            Taiwan AI Basic Law
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            Taiwan&apos;s AI Basic Law establishes a comprehensive governance
            framework for artificial intelligence, with healthcare identified
            as a priority sector requiring fairness testing, transparency, and
            human oversight in clinical AI applications.
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
              The AI Basic Law represents Taiwan&apos;s foundational approach to
              governing artificial intelligence. Introduced by the Executive
              Yuan and passed by the Legislative Yuan in 2025, the law
              establishes principles and requirements for AI development and
              deployment across all sectors, with particular emphasis on
              high-risk applications in healthcare, finance, and public
              administration.
            </p>
            <p>
              Taiwan&apos;s approach reflects its position as a major technology
              hub in the Asia-Pacific region. The AI Basic Law draws on
              international frameworks — including the EU AI Act and OECD AI
              Principles — while addressing the specific needs and context of
              Taiwan&apos;s healthcare system and regulatory environment.
            </p>
            <p>
              For healthcare organizations developing or deploying AI in Taiwan,
              the AI Basic Law creates new obligations around fairness,
              transparency, accountability, and data protection that must be
              integrated into existing clinical governance structures.
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
            developing or deploying AI systems under the AI Basic Law.
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
            organizations need to meet the AI Basic Law&apos;s requirements for
            fairness, transparency, and accountability.
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
            As implementation guidelines take shape, now is the time to assess
            your healthcare AI systems and build a compliance roadmap. Start
            with a ParityScope assessment.
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
