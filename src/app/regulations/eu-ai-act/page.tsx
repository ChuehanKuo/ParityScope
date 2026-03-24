import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EU AI Act — What Healthcare Organizations Need to Know",
  description:
    "Comprehensive guide to EU AI Act compliance for healthcare AI. Understand timelines, high-risk requirements, penalties, and how ParityScope maps to every obligation.",
};

const timelineItems = [
  {
    date: "February 2025",
    title: "AI Literacy Obligations",
    description:
      "All providers and deployers must ensure staff have sufficient AI literacy. Training programs and competency records become mandatory.",
  },
  {
    date: "August 2025",
    title: "Prohibited AI Practices",
    description:
      "Ban on social scoring, real-time biometric identification in public spaces (with exceptions), manipulation techniques, and exploitation of vulnerabilities.",
  },
  {
    date: "August 2026",
    title: "High-Risk Transparency",
    description:
      "High-risk AI systems must meet transparency requirements including clear user instructions, human oversight mechanisms, and logging capabilities.",
  },
  {
    date: "August 2027",
    title: "Full High-Risk Compliance",
    description:
      "Complete compliance required for all high-risk AI systems: risk management, data governance, technical documentation, accuracy testing, and post-market monitoring.",
  },
];

const articleMappings = [
  {
    article: "Article 10",
    title: "Data Governance",
    requirement:
      "Training, validation, and testing datasets must be relevant, representative, and examined for bias.",
    parityscope:
      "ParityScope audits dataset composition across protected attributes, identifies underrepresentation, and flags statistical imbalances before they become model bias.",
  },
  {
    article: "Article 13",
    title: "Transparency",
    requirement:
      "High-risk systems must be designed to allow deployers to interpret outputs and use the system appropriately.",
    parityscope:
      "Our compliance reports generate human-readable fairness assessments with clear explanations of metrics, disparities detected, and recommended actions.",
  },
  {
    article: "Article 14",
    title: "Human Oversight",
    requirement:
      "Systems must be designed to allow effective human oversight, including the ability to understand capabilities and limitations.",
    parityscope:
      "ParityScope dashboards surface fairness metrics that enable clinical staff to make informed decisions about when to trust, override, or escalate AI recommendations.",
  },
  {
    article: "Article 15",
    title: "Accuracy, Robustness & Cybersecurity",
    requirement:
      "High-risk systems must achieve appropriate levels of accuracy and be resilient to errors, faults, and adversarial attacks.",
    parityscope:
      "Our SDK tests model performance across demographic subgroups, detects accuracy disparities, and monitors for fairness drift over time with statistical confidence intervals.",
  },
  {
    article: "Annex III",
    title: "High-Risk Classification",
    requirement:
      "AI systems used in healthcare, including clinical decision support, diagnostic aids, and treatment recommendations, are classified as high-risk.",
    parityscope:
      "ParityScope is purpose-built for healthcare AI. We provide pre-configured audit templates aligned with clinical AI use cases covered by Annex III.",
  },
];

const checklist = [
  "Inventory all AI systems and classify them according to the EU AI Act risk categories (prohibited, high-risk, limited risk, minimal risk).",
  "Appoint an AI governance lead responsible for compliance coordination across clinical, legal, and technical teams.",
  "Conduct a bias audit of every high-risk AI system using validated fairness metrics across all relevant protected attributes.",
  "Establish a data governance framework that documents dataset provenance, representativeness, and known limitations.",
  "Implement continuous monitoring to detect fairness drift, accuracy degradation, and distribution shifts in production.",
  "Create technical documentation covering system architecture, training methodology, validation results, and intended use.",
  "Set up human oversight protocols that allow clinical staff to understand, interpret, and override AI outputs.",
  "Develop an incident reporting process for fairness failures and ensure it meets the EU AI Act notification timelines.",
];

export default function EuAiActPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-widest text-teal">
            Regulatory Guide
          </p>
          <h1 className="mt-4 text-h1 font-bold leading-tight lg:text-display">
            EU AI Act — What Healthcare Organizations Need to Know
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            The EU AI Act is the world&apos;s first comprehensive AI regulation.
            Healthcare AI systems are classified as high-risk, requiring bias
            testing, data governance, transparency, and continuous monitoring.
            Here is everything you need to prepare.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book a Compliance Assessment
            </Link>
            <Link
              href="/resources/whitepapers"
              className="rounded-full border border-white/30 px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Download Compliance Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            Overview of the EU AI Act
          </h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-medium-gray">
              <p>
                Regulation (EU) 2024/1689 — the EU AI Act — entered into force
                on 1 August 2024, establishing harmonized rules for the
                development, deployment, and use of artificial intelligence
                across the European Union. It is the first binding,
                comprehensive AI law anywhere in the world.
              </p>
              <p>
                The Act adopts a risk-based approach: AI systems are classified
                into four tiers (prohibited, high-risk, limited risk, and
                minimal risk), with obligations scaled to the level of potential
                harm. Healthcare AI — including clinical decision support,
                diagnostic aids, triage tools, and treatment recommendation
                systems — falls squarely into the high-risk category under
                Annex III.
              </p>
              <p>
                For healthcare organizations operating in or serving patients in
                the EU, compliance is not optional. Both providers (those who
                develop AI) and deployers (those who use AI in clinical settings)
                face significant obligations and substantial penalties for
                non-compliance.
              </p>
            </div>
            <div className="rounded-2xl border border-light-gray bg-off-white p-8">
              <h3 className="text-h4 font-semibold text-navy">
                Key Facts at a Glance
              </h3>
              <ul className="mt-4 space-y-3 text-body-sm text-medium-gray">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Entered into force: 1 August 2024
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Full high-risk compliance deadline: August 2027
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Healthcare AI classification: High-risk (Annex III)
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Maximum penalty: EUR 35 million or 7% of global turnover
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Applies to: Providers and deployers in the EU, and any system
                  whose output is used in the EU
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">Compliance Timeline</h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            The EU AI Act uses a phased implementation approach. Healthcare
            organizations should use this timeline to plan their compliance
            roadmap.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      {/* Healthcare Impact */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            Impact on Healthcare AI
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            Clinical decision support systems, diagnostic algorithms, triage
            tools, and treatment recommendation engines are all classified as
            high-risk AI under Annex III of the EU AI Act. This means
            healthcare organizations must comply with the most stringent tier
            of requirements.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Clinical Decision Support",
                description:
                  "Any AI system that assists clinicians in diagnosis, treatment selection, or risk stratification is classified as high-risk. This includes sepsis prediction, readmission risk, and clinical pathway recommendation systems.",
              },
              {
                title: "Bias Testing Requirements",
                description:
                  "High-risk AI systems must be tested for bias across protected attributes including race, ethnicity, sex, age, disability, and socioeconomic status. Testing must be ongoing, not just pre-deployment.",
              },
              {
                title: "Data Governance",
                description:
                  "Training datasets must be documented for provenance, representativeness, and known gaps. Organizations must demonstrate that data reflects the patient populations the system will serve.",
              },
              {
                title: "Technical Documentation",
                description:
                  "Detailed documentation covering system design, training methodology, validation results, known limitations, and intended use must be maintained and made available to regulators.",
              },
              {
                title: "Post-Market Monitoring",
                description:
                  "Deployers must monitor AI systems in production for accuracy degradation, fairness drift, and emergent disparities. Issues must be reported through established incident channels.",
              },
              {
                title: "Human Oversight",
                description:
                  "Clinical AI systems must include mechanisms for human oversight — clinicians must be able to understand, interpret, and override AI outputs in patient care decisions.",
              },
            ].map((item) => (
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

      {/* ParityScope Mapping */}
      <section className="bg-navy px-4 py-section text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold">
            How ParityScope Maps to the EU AI Act
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-light-gray">
            ParityScope was designed from the ground up to address EU AI Act
            requirements for healthcare AI. Here is how our platform maps to
            each relevant article.
          </p>
          <div className="mt-12 space-y-6">
            {articleMappings.map((item) => (
              <div
                key={item.article}
                className="rounded-2xl border border-white/10 bg-navy-light p-8"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
                  <div className="lg:w-1/2">
                    <p className="text-body-sm font-bold uppercase tracking-wider text-teal">
                      {item.article}
                    </p>
                    <h3 className="mt-2 text-h3 font-semibold">{item.title}</h3>
                    <p className="mt-3 text-body-sm text-light-gray">
                      <span className="font-semibold text-white">
                        Requirement:{" "}
                      </span>
                      {item.requirement}
                    </p>
                  </div>
                  <div className="lg:w-1/2">
                    <p className="text-body-sm text-light-gray">
                      <span className="font-semibold text-teal">
                        ParityScope Solution:{" "}
                      </span>
                      {item.parityscope}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Penalties */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">Penalty Structure</h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            The EU AI Act establishes significant financial penalties for
            non-compliance, scaled to the severity of the violation.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-coral bg-coral/5 p-8">
              <p className="text-h2 font-bold text-coral">
                EUR 35M <span className="text-h4 text-medium-gray">or</span> 7%
              </p>
              <p className="mt-1 text-body-sm font-semibold text-coral">
                of global annual turnover (whichever is higher)
              </p>
              <p className="mt-4 text-body-sm text-medium-gray">
                For violations involving prohibited AI practices — including
                social scoring, subliminal manipulation, and exploitation of
                vulnerable groups. While less common in healthcare, deploying
                AI systems that exploit patient vulnerabilities could trigger
                this tier.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-amber bg-amber/5 p-8">
              <p className="text-h2 font-bold text-amber">
                EUR 15M <span className="text-h4 text-medium-gray">or</span> 3%
              </p>
              <p className="mt-1 text-body-sm font-semibold text-amber">
                of global annual turnover (whichever is higher)
              </p>
              <p className="mt-4 text-body-sm text-medium-gray">
                For non-compliance with high-risk AI requirements — including
                failure to conduct bias testing, inadequate data governance,
                missing documentation, or lack of human oversight mechanisms.
                This is the tier most relevant to healthcare organizations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation Checklist */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            Preparation Checklist
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            Start preparing now. Use this checklist to build your EU AI Act
            compliance roadmap for healthcare AI systems.
          </p>
          <div className="mt-12 space-y-4">
            {checklist.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl border border-light-gray bg-white p-6 shadow-card"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-body-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-body-sm text-medium-gray">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-section text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold">Start Your Compliance Journey</h2>
          <p className="mt-4 text-body-lg text-light-gray">
            Download our comprehensive EU AI Act compliance guide for healthcare,
            or book a one-on-one assessment with our regulatory experts to
            understand exactly where your organization stands.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/resources/whitepapers"
              className="rounded-full bg-teal px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Download Compliance Guide
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Book a Compliance Assessment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
