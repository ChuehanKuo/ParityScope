import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";
import { Accordion } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "South Korea AI Framework Act Compliance for Healthcare | ParityScope",
  description:
    "Navigate South Korea's AI Framework Act requirements for high-impact healthcare AI systems. ParityScope automates impact assessments, bias testing, and transparency documentation.",
};

const requirements = [
  {
    requirement: "AI Impact Assessment",
    article: "Articles 27-30",
    description:
      "Operators of high-impact AI must conduct impact assessments evaluating the AI system's potential effects on fundamental rights, safety, and social impact before deployment and on a regular basis thereafter.",
    parityscope:
      "ParityScope generates comprehensive impact assessment documentation covering fairness, bias risk, and demographic impact analysis. Automated reporting maps directly to the assessment framework specified by Korea's AI Safety Institute.",
  },
  {
    requirement: "Transparency and Explainability",
    article: "Articles 21-23",
    description:
      "Users must be informed when they are interacting with or being affected by an AI system. High-impact AI decisions must be explainable, and the criteria used for decision-making must be disclosed.",
    parityscope:
      "ParityScope produces human-readable fairness reports with metric explanations, subgroup breakdowns, and confidence intervals. These reports satisfy transparency requirements for both patients and regulatory authorities.",
  },
  {
    requirement: "Bias Prevention and Non-Discrimination",
    article: "Articles 24-25",
    description:
      "AI systems must be designed, developed, and operated to prevent unfair discrimination. Operators must implement measures to identify and mitigate bias throughout the AI lifecycle.",
    parityscope:
      "Automated bias detection across 15+ fairness metrics identifies discrimination risks before deployment. Continuous monitoring in production ensures bias does not emerge over time as patient populations shift.",
  },
  {
    requirement: "Data Quality and Governance",
    article: "Article 26",
    description:
      "Data used for AI training and operation must meet quality standards. Operators must implement data governance practices that ensure representativeness, accuracy, and appropriateness of datasets.",
    parityscope:
      "Dataset bias scanning detects representation gaps, label imbalances, and missing data patterns across demographic groups. ParityScope generates data governance reports documenting dataset fitness for the intended healthcare application.",
  },
  {
    requirement: "Post-Deployment Monitoring",
    article: "Articles 31-33",
    description:
      "High-impact AI systems must be continuously monitored after deployment. Operators must maintain records of system performance and report significant incidents to the Korea AI Safety Institute.",
    parityscope:
      "Production monitoring dashboards track fairness metrics in real time, detect performance degradation across demographic subgroups, and generate the periodic compliance reports required for ongoing regulatory compliance.",
  },
  {
    requirement: "Accountability and Record-Keeping",
    article: "Articles 34-36",
    description:
      "Organizations must designate responsible persons for AI governance, maintain comprehensive records of AI system development and operation, and be able to demonstrate compliance upon request.",
    parityscope:
      "ParityScope maintains immutable audit trails of all fairness assessments, metric calculations, and remediation actions. Export-ready compliance packages support regulatory inspections and internal governance reviews.",
  },
];

const faqItems = [
  {
    question: "When does South Korea's AI Framework Act take effect?",
    answer:
      "The AI Framework Act was enacted in December 2025 and takes effect in stages beginning in 2026. Core provisions including the high-impact AI classification framework and impact assessment requirements become enforceable in the second half of 2026. Organizations deploying healthcare AI in South Korea should begin compliance preparations immediately, as the Korea AI Safety Institute has indicated that healthcare will be a priority enforcement sector.",
  },
  {
    question: "Is healthcare AI classified as high-impact under the Act?",
    answer:
      "Yes. The Act classifies AI systems that materially affect individuals' life, physical safety, and fundamental rights as high-impact AI. Healthcare AI — including clinical decision support, diagnostic assistance, treatment recommendation systems, and patient risk stratification tools — falls squarely within this classification. High-impact AI triggers the full set of obligations including mandatory impact assessments, enhanced transparency requirements, and continuous monitoring.",
  },
  {
    question: "What is the role of the Korea AI Safety Institute?",
    answer:
      "The Korea AI Safety Institute (KAISI) serves as the primary regulatory body for AI governance under the Framework Act. KAISI is responsible for developing technical standards, conducting regulatory oversight, receiving and processing AI impact assessments, investigating complaints, and issuing enforcement actions. For healthcare AI, KAISI coordinates with the Ministry of Health and Welfare to establish sector-specific guidance.",
  },
  {
    question: "What are the penalties for non-compliance?",
    answer:
      "The Act establishes a graduated penalty structure. Administrative measures include corrective orders requiring remediation within a specified timeframe, restrictions on AI system operation, and mandatory re-assessment. Financial penalties can reach up to KRW 500 million (approximately USD 380,000) for serious violations, with higher penalties possible for repeat offenders. For healthcare AI that causes patient harm, additional liability under medical safety regulations may apply.",
  },
  {
    question: "Does the Act apply to foreign companies operating in South Korea?",
    answer:
      "Yes. The Act applies to any organization deploying AI systems that affect individuals in South Korea, regardless of where the organization is headquartered. Foreign healthcare technology companies, medical device manufacturers, and health system vendors that serve the Korean market must comply with the full set of obligations applicable to their AI risk classification.",
  },
  {
    question: "How does the Korean framework compare to the EU AI Act?",
    answer:
      "The Korean AI Framework Act shares structural similarities with the EU AI Act, including a risk-based classification system and mandatory impact assessments for high-risk AI. However, there are notable differences: the Korean framework places greater emphasis on the role of a centralized AI Safety Institute, includes specific provisions for AI industry promotion alongside regulation, and establishes a somewhat different penalty structure. ParityScope's regulation-aware engine handles the mapping requirements for both frameworks, enabling organizations operating in multiple jurisdictions to maintain unified compliance.",
  },
];

export default function SouthKoreaPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-wider text-teal-light">
            South Korea AI Framework Act
          </p>
          <h1 className="mt-3 text-display font-bold text-white">
            South Korea AI Compliance for Healthcare
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            South Korea&apos;s AI Framework Act establishes mandatory{" "}
            <strong className="text-white">impact assessments</strong> for
            high-impact AI systems, including all healthcare AI. Effective{" "}
            <strong className="text-white">2026</strong>, the Act requires bias
            testing, transparency documentation, and continuous monitoring —
            enforced by the Korea AI Safety Institute. ParityScope automates
            compliance with every requirement.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Start Your Impact Assessment
            </Link>
            <Link
              href="/resources/whitepapers"
              className="rounded-full border border-white/30 px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Download Korea AI Guide
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
            description="South Korea's AI Framework Act is one of Asia's most comprehensive AI regulations. Here are the essentials for healthcare AI operators."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                stat: "High-Impact",
                label: "AI Classification",
                text: "Healthcare AI systems are classified as high-impact under the Act, triggering mandatory impact assessments, enhanced transparency obligations, and continuous monitoring requirements enforced by KAISI.",
              },
              {
                stat: "2026",
                label: "Enforcement Year",
                text: "Core provisions including impact assessment requirements and the high-impact classification framework become enforceable in 2026. Healthcare is designated as a priority enforcement sector by the Korea AI Safety Institute.",
              },
              {
                stat: "KAISI",
                label: "Regulatory Authority",
                text: "The Korea AI Safety Institute serves as the primary enforcement body, responsible for technical standards, impact assessment review, complaint investigation, and enforcement actions against non-compliant AI operators.",
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

      {/* Requirements & ParityScope Mapping */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Regulatory Mapping"
            title="Requirements & How ParityScope Helps"
            description="The AI Framework Act imposes specific obligations on high-impact AI operators. ParityScope maps directly to each requirement for healthcare AI compliance."
          />
          <div className="mt-12 space-y-6">
            {requirements.map((item) => (
              <div
                key={item.requirement}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="lg:w-1/2">
                    <p className="text-body-sm font-semibold uppercase tracking-wider text-teal">
                      {item.article}
                    </p>
                    <h3 className="mt-1 text-h3 font-bold text-navy">
                      {item.requirement}
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

      {/* Compliance Comparison */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Multi-Jurisdictional"
            title="Korean AI Act vs. EU AI Act"
            description="Organizations operating across jurisdictions need to understand how the Korean framework compares to EU requirements. ParityScope supports both."
          />
          <div className="mt-12 overflow-hidden rounded-xl border border-light-gray shadow-card">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-navy">
                  <th className="px-6 py-4 text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                    Dimension
                  </th>
                  <th className="px-6 py-4 text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                    South Korea AI Framework Act
                  </th>
                  <th className="px-6 py-4 text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                    EU AI Act
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-gray bg-white">
                {[
                  {
                    dim: "Risk Classification",
                    korea: "High-impact / General AI",
                    eu: "Unacceptable / High-risk / Limited / Minimal",
                  },
                  {
                    dim: "Healthcare Status",
                    korea: "High-impact (mandatory assessments)",
                    eu: "High-risk under Annex III",
                  },
                  {
                    dim: "Impact Assessment",
                    korea: "Mandatory for high-impact AI",
                    eu: "Conformity assessment for high-risk AI",
                  },
                  {
                    dim: "Regulatory Body",
                    korea: "Korea AI Safety Institute (KAISI)",
                    eu: "National supervisory authorities + EU AI Office",
                  },
                  {
                    dim: "Enforcement Start",
                    korea: "2026 (phased)",
                    eu: "2024-2027 (phased)",
                  },
                  {
                    dim: "Extraterritorial",
                    korea: "Yes — affects individuals in Korea",
                    eu: "Yes — placed on EU market or output used in EU",
                  },
                ].map((row) => (
                  <tr key={row.dim} className="hover:bg-off-white">
                    <td className="px-6 py-4 text-body font-semibold text-navy">
                      {row.dim}
                    </td>
                    <td className="px-6 py-4 text-body text-medium-gray">
                      {row.korea}
                    </td>
                    <td className="px-6 py-4 text-body text-medium-gray">
                      {row.eu}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-body text-medium-gray">
            ParityScope&apos;s regulation-aware engine supports both frameworks
            simultaneously, enabling unified compliance for organizations
            operating in multiple jurisdictions.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            title="Frequently Asked Questions"
            description="Common questions about South Korea's AI Framework Act and healthcare AI compliance."
          />
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Prepare for South Korea's AI Framework Act"
        description="ParityScope automates the impact assessments, bias testing, and monitoring documentation required by the AI Framework Act. Get compliant before enforcement begins."
        primaryCTA={{ label: "Request a Demo", href: "/contact" }}
        secondaryCTA={{
          label: "Read the Whitepaper",
          href: "/resources/whitepapers",
        }}
      />
    </main>
  );
}
