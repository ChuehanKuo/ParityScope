import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";
import { Accordion } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Taiwan AI Basic Act Compliance for Healthcare | ParityScope",
  description:
    "Navigate Taiwan's AI Basic Act requirements for healthcare AI systems. ParityScope automates fairness testing, non-discrimination compliance, and transparency documentation under Taiwan's principles-based AI regulation.",
};

const principles = [
  {
    principle: "Fairness and Non-Discrimination",
    description:
      "AI systems must not produce unfair or discriminatory outcomes. Developers and deployers must take proactive measures to identify and mitigate bias across all stages of the AI lifecycle, from data collection through deployment and monitoring.",
    parityscope:
      "ParityScope tests for bias across 15+ fairness metrics and all protected attributes simultaneously. Regulation-aware metric selection ensures the right tests are applied for Taiwan's fairness requirements, with automated remediation recommendations when disparities are detected.",
  },
  {
    principle: "Transparency and Explainability",
    description:
      "AI systems affecting individual rights or interests must operate with sufficient transparency. Users and affected individuals should be able to understand the general logic of AI-driven decisions and the key factors influencing outcomes.",
    parityscope:
      "ParityScope generates human-readable fairness reports with plain-language metric explanations, subgroup performance breakdowns, and confidence intervals. Reports are designed for both technical teams and non-technical stakeholders including patients and regulators.",
  },
  {
    principle: "Safety and Security",
    description:
      "AI systems must be developed and operated with appropriate safeguards to protect safety and security. This includes ongoing risk assessment, testing, and monitoring to prevent harms throughout the system lifecycle.",
    parityscope:
      "Continuous production monitoring detects performance degradation and fairness drift across demographic subgroups in real time. Automated alerts notify compliance teams when safety-critical thresholds are approached, enabling proactive intervention.",
  },
  {
    principle: "Accountability and Governance",
    description:
      "Organizations deploying AI must establish clear governance structures, designate responsible individuals, maintain comprehensive records, and be prepared to demonstrate compliance with applicable principles and standards.",
    parityscope:
      "ParityScope maintains immutable audit trails of all fairness assessments, metric calculations, and remediation actions. Export-ready compliance documentation supports regulatory inquiries and internal governance reviews.",
  },
  {
    principle: "Privacy and Data Protection",
    description:
      "AI systems must respect personal data protection rights. Data used for AI development and operation must be collected, processed, and stored in accordance with Taiwan's Personal Data Protection Act and related regulations.",
    parityscope:
      "ParityScope operates on aggregated statistical outputs and metadata — not raw patient data. The platform's architecture supports privacy-preserving fairness analysis that complies with Taiwan's data protection framework while delivering comprehensive bias assessments.",
  },
  {
    principle: "Human Oversight",
    description:
      "High-stakes AI applications, particularly in healthcare, must incorporate meaningful human oversight mechanisms. Automated decisions affecting individual health and welfare should be subject to human review and intervention.",
    parityscope:
      "ParityScope's fairness dashboards and alert systems are designed to support human-in-the-loop oversight. Flagging systems highlight cases where AI outputs show elevated bias risk, enabling clinical teams to exercise informed judgment.",
  },
];

const healthcareGuidance = [
  {
    area: "Clinical Decision Support",
    requirement:
      "AI systems assisting clinical decisions must demonstrate equitable performance across patient demographics. Developers must validate that diagnostic accuracy, sensitivity, and specificity do not vary significantly across protected subgroups.",
    status: "Active guidance from MOHW",
  },
  {
    area: "Medical Device AI",
    requirement:
      "AI-enabled medical devices must comply with Taiwan FDA's Software as Medical Device (SaMD) framework in addition to AI Basic Act principles. Fairness and non-discrimination documentation is increasingly expected as part of regulatory submissions.",
    status: "Evolving regulatory framework",
  },
  {
    area: "Health Data Analytics",
    requirement:
      "AI systems analyzing population health data must ensure that analytical outputs do not perpetuate or amplify existing health disparities. Special attention is required for underrepresented populations in training datasets.",
    status: "Active guidance from MOHW",
  },
  {
    area: "Telemedicine AI",
    requirement:
      "AI systems integrated into telemedicine platforms must provide equitable service quality across geographic regions, language groups, and demographic categories. Particular attention is required for rural and underserved communities.",
    status: "Emerging requirements",
  },
];

const faqItems = [
  {
    question: "What is Taiwan's AI Basic Act?",
    answer:
      "Taiwan's AI Basic Act (also referred to as the AI Basic Law) is a principles-based regulatory framework enacted to govern the development, deployment, and use of AI systems in Taiwan. Rather than prescribing detailed technical requirements like the EU AI Act, the AI Basic Act establishes foundational principles — fairness, transparency, safety, accountability, privacy, and human oversight — that AI developers and deployers must adhere to. Sector-specific agencies, including the Ministry of Health and Welfare for healthcare, are tasked with developing detailed implementation guidelines based on these principles.",
  },
  {
    question: "How does a principles-based approach differ from prescriptive regulation?",
    answer:
      "A principles-based approach establishes broad governance principles that organizations must satisfy, while leaving flexibility in how they demonstrate compliance. This contrasts with prescriptive regulations like the EU AI Act, which specify detailed technical requirements. The advantage of a principles-based approach is adaptability — it can accommodate diverse AI applications and evolving technology. The challenge is that compliance standards may be less defined, making it important to adopt robust and defensible testing methodologies. ParityScope's comprehensive fairness testing framework provides the quantitative rigor needed to demonstrate compliance under a principles-based regime.",
  },
  {
    question: "Does the AI Basic Act apply specifically to healthcare?",
    answer:
      "The AI Basic Act applies broadly to all sectors, but healthcare is a priority area for implementation. The Ministry of Health and Welfare (MOHW) is responsible for developing sector-specific guidelines for healthcare AI, and has issued guidance emphasizing non-discrimination in clinical AI, equitable access to AI-driven healthcare services, and transparency in AI-assisted medical decisions. Healthcare organizations should anticipate that the general principles of the AI Basic Act will be interpreted with particular rigor in the medical context.",
  },
  {
    question: "What enforcement mechanisms exist under the AI Basic Act?",
    answer:
      "As a principles-based framework, the AI Basic Act delegates enforcement authority to sector-specific regulators. For healthcare AI, enforcement falls primarily to the Ministry of Health and Welfare and Taiwan's FDA (for medical device AI). Enforcement mechanisms include administrative guidance and corrective orders, restrictions on AI system deployment, civil penalties, and potential liability under existing consumer protection and medical practice laws. While the penalty structure is still evolving, organizations that proactively demonstrate compliance through comprehensive testing and documentation are best positioned to satisfy regulatory expectations.",
  },
  {
    question: "Does the AI Basic Act have extraterritorial reach?",
    answer:
      "The AI Basic Act primarily applies to AI systems deployed within Taiwan or affecting individuals in Taiwan. Foreign companies that offer AI-powered healthcare services or products in the Taiwanese market are expected to comply with the Act's principles. Given Taiwan's significant healthcare technology sector and growing focus on AI governance, international health technology companies serving Taiwanese patients or partnering with Taiwanese healthcare providers should incorporate AI Basic Act compliance into their regulatory strategy.",
  },
  {
    question: "How can organizations prepare for evolving Taiwan AI regulations?",
    answer:
      "Because Taiwan's AI regulatory landscape is evolving, the most effective preparation strategy is to implement a robust, principles-aligned AI governance framework now. This means conducting comprehensive bias testing across all protected attributes, documenting fairness methodology and results, establishing continuous monitoring processes, and maintaining audit-ready compliance records. ParityScope provides all of these capabilities in a unified platform, ensuring that organizations are prepared for both current principles and future detailed requirements as they are established.",
  },
];

export default function TaiwanPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-wider text-teal-light">
            Taiwan AI Basic Act
          </p>
          <h1 className="mt-3 text-display font-bold text-white">
            Taiwan AI Basic Act Compliance
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            Taiwan&apos;s AI Basic Act establishes a{" "}
            <strong className="text-white">principles-based framework</strong>{" "}
            governing AI development and deployment, with{" "}
            <strong className="text-white">
              fairness and non-discrimination
            </strong>{" "}
            as core requirements. Healthcare AI is a priority enforcement sector
            under the Ministry of Health and Welfare. ParityScope automates the
            bias testing, transparency documentation, and ongoing monitoring
            needed to demonstrate compliance.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Start Your Compliance Assessment
            </Link>
            <Link
              href="/resources/whitepapers"
              className="rounded-full border border-white/30 px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Download Taiwan AI Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Key Facts"
            title="What Healthcare Organizations Need to Know"
            description="Taiwan's AI Basic Act takes a principles-based approach to AI regulation, with healthcare designated as a priority sector for implementation."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                stat: "Principles-Based",
                label: "Regulatory Approach",
                text: "The AI Basic Act establishes foundational principles — fairness, transparency, safety, accountability — rather than prescriptive technical requirements. Sector-specific agencies develop detailed guidelines based on these principles.",
              },
              {
                stat: "MOHW",
                label: "Healthcare Regulator",
                text: "The Ministry of Health and Welfare is responsible for healthcare AI governance, developing sector-specific guidance on non-discrimination, equitable access, and transparency in clinical AI applications.",
              },
              {
                stat: "Core Principle",
                label: "Fairness & Non-Discrimination",
                text: "Non-discrimination is a foundational principle of the Act. AI systems must not produce unfair outcomes, and developers must proactively test for and mitigate bias throughout the AI lifecycle.",
              },
            ].map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <p className="text-h2 font-bold text-teal">{fact.stat}</p>
                <p className="mt-1 text-body-sm font-semibold uppercase tracking-wider text-medium-gray">
                  {fact.label}
                </p>
                <p className="mt-4 text-body text-medium-gray">{fact.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Regulatory Mapping"
            title="Core Principles & How ParityScope Helps"
            description="The AI Basic Act establishes six core principles for responsible AI. ParityScope provides automated compliance support for each."
          />
          <div className="mt-12 space-y-6">
            {principles.map((item) => (
              <div
                key={item.principle}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="lg:w-1/2">
                    <h3 className="text-h3 font-bold text-navy">
                      {item.principle}
                    </h3>
                    <p className="mt-3 text-body text-medium-gray">
                      {item.description}
                    </p>
                  </div>
                  <div className="rounded-lg bg-off-white p-6 lg:w-1/2">
                    <p className="text-body-sm font-semibold uppercase tracking-wider text-coral">
                      How ParityScope Helps
                    </p>
                    <p className="mt-3 text-body text-navy">
                      {item.parityscope}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Healthcare-Specific Guidance */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Healthcare Focus"
            title="Sector-Specific Guidance for Healthcare AI"
            description="The Ministry of Health and Welfare is developing detailed guidelines for healthcare AI applications. Here are the key areas of focus."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {healthcareGuidance.map((item) => (
              <div
                key={item.area}
                className="rounded-xl border border-light-gray bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-h4 font-bold text-navy">{item.area}</h3>
                  <span className="shrink-0 rounded-full bg-off-white px-3 py-1 text-caption font-semibold text-teal">
                    {item.status}
                  </span>
                </div>
                <p className="mt-4 text-body text-medium-gray">
                  {item.requirement}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Principles-Based Matters */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Strategy"
            title="Why Principles-Based Regulation Demands Stronger Compliance"
            align="left"
          />
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-body-lg text-medium-gray">
                A principles-based regulatory framework might appear less
                demanding than prescriptive regulation, but in practice it creates
                a higher compliance bar. Without detailed checklists to follow,
                organizations must demonstrate that their approach to fairness,
                transparency, and safety is reasonable, thorough, and defensible.
              </p>
              <p className="mt-4 text-body-lg text-medium-gray">
                This means that when enforcement actions arise, regulators and
                courts will evaluate whether your organization took reasonable
                and adequate steps to comply with the Act&apos;s principles. Having
                comprehensive, automated, and well-documented bias testing is the
                strongest evidence of good-faith compliance.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "No checklist to hide behind",
                  text: "Without prescriptive requirements, you cannot claim compliance simply by checking boxes. You must demonstrate substantive fairness practices.",
                },
                {
                  title: "Reasonableness standard",
                  text: "Regulators assess whether your compliance efforts are reasonable for your risk profile. Automated testing with 15+ metrics sets a strong standard.",
                },
                {
                  title: "Evolving expectations",
                  text: "Principles-based regimes evolve through enforcement. Organizations with robust baseline compliance are best positioned as standards tighten.",
                },
                {
                  title: "Documentation is your defense",
                  text: "Comprehensive audit trails and testing documentation are your primary evidence of compliance. ParityScope generates this automatically.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-light-gray bg-white p-5"
                >
                  <h4 className="text-body font-bold text-navy">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-body-sm text-medium-gray">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            title="Frequently Asked Questions"
            description="Common questions about Taiwan's AI Basic Act and healthcare AI compliance."
          />
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Demonstrate Compliance with Taiwan's AI Basic Act"
        description="ParityScope provides the comprehensive fairness testing, transparency documentation, and continuous monitoring needed to satisfy Taiwan's principles-based AI regulation."
        primaryCTA={{ label: "Request a Demo", href: "/contact" }}
        secondaryCTA={{
          label: "Read the Whitepaper",
          href: "/resources/whitepapers",
        }}
      />
    </main>
  );
}
