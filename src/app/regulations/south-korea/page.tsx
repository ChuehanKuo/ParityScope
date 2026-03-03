import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";
import { Accordion } from "@/components/ui/accordion";
import { FeatureCard } from "@/components/ui/feature-card";

export const metadata: Metadata = {
  title:
    "South Korea K-AI Act Compliance for Healthcare AI | ParityScope",
  description:
    "Navigate South Korea's K-AI Act framework and MFDS requirements for healthcare AI. ParityScope automates fairness testing, SaMD compliance documentation, and K-certification readiness for clinical decision support systems.",
};

const requirements = [
  {
    requirement: "AI Impact Assessment",
    article: "Articles 27-30",
    description:
      "Operators of high-impact AI must conduct impact assessments evaluating the AI system's potential effects on fundamental rights, safety, and social impact before deployment and on a regular basis thereafter. Assessments must include bias evaluation across demographic groups.",
    parityscope:
      "ParityScope generates comprehensive impact assessment documentation covering fairness, bias risk, and demographic impact analysis. Automated reporting maps directly to the assessment framework specified by Korea's AI Safety Institute.",
    metrics: ["demographic_parity", "equal_opportunity", "disparate_impact"],
  },
  {
    requirement: "Transparency and Explainability",
    article: "Articles 21-23",
    description:
      "Users must be informed when they are interacting with or being affected by an AI system. High-impact AI decisions must be explainable, and the criteria used for decision-making must be disclosed to affected individuals.",
    parityscope:
      "ParityScope produces human-readable fairness reports with metric explanations, subgroup breakdowns, and confidence intervals. These reports satisfy transparency requirements for both patients and regulatory authorities, including MFDS reviewers.",
    metrics: ["calibration_ratio", "demographic_parity"],
  },
  {
    requirement: "Bias Prevention and Non-Discrimination",
    article: "Articles 24-25",
    description:
      "AI systems must be designed, developed, and operated to prevent unfair discrimination. Operators must implement measures to identify and mitigate bias throughout the AI lifecycle, from data collection through deployment and ongoing monitoring.",
    parityscope:
      "Automated bias detection across all four K-AI Act-mapped metrics identifies discrimination risks before deployment. Continuous monitoring in production ensures bias does not emerge over time as patient demographics shift.",
    metrics: ["demographic_parity", "equal_opportunity", "disparate_impact", "calibration_ratio"],
  },
  {
    requirement: "Data Quality and Governance",
    article: "Article 26",
    description:
      "Data used for AI training and operation must meet quality standards. Operators must implement data governance practices that ensure representativeness, accuracy, and appropriateness of datasets for the intended clinical application.",
    parityscope:
      "Dataset bias scanning detects representation gaps, label imbalances, and missing data patterns across demographic groups. ParityScope generates data governance reports documenting dataset fitness for the intended healthcare application.",
    metrics: ["demographic_parity", "calibration_ratio"],
  },
  {
    requirement: "Post-Deployment Monitoring",
    article: "Articles 31-33",
    description:
      "High-impact AI systems must be continuously monitored after deployment. Operators must maintain records of system performance disaggregated by demographic group and report significant incidents to the Korea AI Safety Institute.",
    parityscope:
      "Production monitoring dashboards track fairness metrics in real time, detect performance degradation across demographic subgroups, and generate the periodic compliance reports required for ongoing regulatory compliance with KAISI.",
    metrics: ["equal_opportunity", "disparate_impact", "calibration_ratio"],
  },
  {
    requirement: "Accountability and Record-Keeping",
    article: "Articles 34-36",
    description:
      "Organizations must designate responsible persons for AI governance, maintain comprehensive records of AI system development and operation, and be able to demonstrate compliance upon request by KAISI or MFDS.",
    parityscope:
      "ParityScope maintains immutable audit trails of all fairness assessments, metric calculations, and remediation actions. Export-ready compliance packages support regulatory inspections and internal governance reviews.",
    metrics: ["demographic_parity", "equal_opportunity", "disparate_impact", "calibration_ratio"],
  },
];

const metricMappings = [
  {
    metric: "demographic_parity",
    display: "Demographic Parity",
    description:
      "Measures whether the selection or recommendation rate is equal across demographic groups. Core metric for K-AI Act bias prevention obligations under Articles 24-25, demonstrating that clinical AI outputs do not systematically favor or disfavor any population group.",
  },
  {
    metric: "equal_opportunity",
    display: "Equal Opportunity",
    description:
      "Ensures true positive rates are equalized across demographic groups. Critical for MFDS SaMD evaluation — a diagnostic AI must identify disease with comparable sensitivity across all patient populations to satisfy clinical validity requirements.",
  },
  {
    metric: "disparate_impact",
    display: "Disparate Impact",
    description:
      "Quantifies whether an AI system's outcomes fall below the four-fifths threshold across groups. Directly maps to K-AI Act anti-discrimination requirements and provides a legally recognized measure of disproportionate adverse effect on protected populations.",
  },
  {
    metric: "calibration_ratio",
    display: "Calibration Ratio",
    description:
      "Assesses whether predicted probabilities match observed outcomes proportionally across groups. Addresses K-AI Act transparency requirements by ensuring that risk scores and probability outputs are equally reliable for all patient populations.",
  },
];

const mfdsRequirements = [
  {
    area: "SaMD Classification",
    description:
      "South Korea's MFDS classifies AI-based Software as a Medical Device (SaMD) using a risk-based framework aligned with the IMDRF. Clinical decision support AI typically falls under Class II or Class III depending on the condition severity and AI's role in the clinical decision.",
    status: "Mandatory",
  },
  {
    area: "Clinical Validation",
    description:
      "MFDS requires clinical validation demonstrating safety and efficacy across the intended patient population. Since 2023, this increasingly includes fairness validation — evidence that the AI performs equitably across demographic subgroups relevant to the Korean patient population.",
    status: "Mandatory",
  },
  {
    area: "Good Machine Learning Practice",
    description:
      "MFDS has adopted principles aligned with the FDA/Health Canada/MHRA Good Machine Learning Practice framework. This includes requirements for representative training data, bias detection, and documentation of data governance practices throughout the AI development lifecycle.",
    status: "Expected in submissions",
  },
  {
    area: "Post-Market Surveillance",
    description:
      "Approved SaMD products must implement post-market surveillance plans that include performance monitoring across demographic subgroups. Manufacturers must report significant performance degradation or emergent bias to MFDS within defined timelines.",
    status: "Mandatory",
  },
  {
    area: "Predetermined Change Control Plan",
    description:
      "For adaptive AI systems that learn and update after deployment, MFDS requires a predetermined change control plan documenting anticipated modifications, validation procedures, and fairness impact assessment protocols.",
    status: "Required for adaptive AI",
  },
];

const kCertificationProcess = [
  {
    step: "1",
    title: "Pre-Submission Consultation",
    description:
      "Engage with MFDS for pre-submission guidance on classification, required evidence, and clinical validation study design. Early engagement on fairness testing methodology is increasingly recommended.",
  },
  {
    step: "2",
    title: "Technical Documentation",
    description:
      "Prepare comprehensive technical documentation including AI architecture description, training data governance records, validation methodology, fairness testing results, and intended use specifications.",
  },
  {
    step: "3",
    title: "Clinical Validation Study",
    description:
      "Conduct clinical validation demonstrating safety and efficacy with the Korean patient population. Include demographic subgroup analysis showing equitable performance across age, sex, and relevant clinical subgroups.",
  },
  {
    step: "4",
    title: "MFDS Review & K-Certification",
    description:
      "Submit the complete regulatory package to MFDS for review. The review includes evaluation of AI performance, safety data, fairness evidence, and compliance with applicable K-AI Act provisions. Successful review results in K-certification.",
  },
];

const comparisonData = [
  {
    dim: "Risk Classification",
    korea: "High-impact / General AI (two-tier)",
    eu: "Unacceptable / High-risk / Limited / Minimal (four-tier)",
  },
  {
    dim: "Healthcare AI Status",
    korea: "High-impact (mandatory assessments)",
    eu: "High-risk under Annex III, Section 5(b)",
  },
  {
    dim: "Medical Device AI",
    korea: "MFDS SaMD framework + K-AI Act",
    eu: "MDR 2017/745 + EU AI Act",
  },
  {
    dim: "Impact/Conformity Assessment",
    korea: "Mandatory impact assessment for high-impact AI",
    eu: "Conformity assessment for high-risk AI",
  },
  {
    dim: "Regulatory Authority",
    korea: "KAISI (AI), MFDS (medical devices)",
    eu: "National authorities + EU AI Office",
  },
  {
    dim: "Fairness Metrics (ParityScope)",
    korea: "demographic_parity, equal_opportunity, disparate_impact, calibration_ratio",
    eu: "demographic_parity, equal_opportunity, equalized_odds, predictive_parity, calibration_ratio, group_calibration",
  },
  {
    dim: "Enforcement Timeline",
    korea: "2026 (phased implementation)",
    eu: "2024-2027 (phased implementation)",
  },
  {
    dim: "Extraterritorial Reach",
    korea: "Yes — AI affecting individuals in Korea",
    eu: "Yes — AI placed on EU market or output used in EU",
  },
  {
    dim: "Maximum Penalties",
    korea: "Up to KRW 500M (~USD 380K) + operational restrictions",
    eu: "Up to EUR 35M or 7% global turnover",
  },
];

const faqItems = [
  {
    question:
      "When does South Korea's K-AI Act take effect?",
    answer:
      "The K-AI Act (AI Framework Act) was enacted in late 2025 and takes effect in stages beginning in 2026. Core provisions including the high-impact AI classification framework, mandatory impact assessments, and bias prevention requirements become enforceable in the second half of 2026. Healthcare has been designated as a priority enforcement sector by the Korea AI Safety Institute (KAISI). Organizations deploying healthcare AI in South Korea should begin compliance preparations immediately.",
  },
  {
    question:
      "Is healthcare AI classified as high-impact under the K-AI Act?",
    answer:
      "Yes. The K-AI Act classifies AI systems that materially affect individuals' life, physical safety, and fundamental rights as high-impact AI. Healthcare AI — including clinical decision support, diagnostic assistance, treatment recommendation systems, patient risk stratification tools, and medical imaging analysis — falls squarely within this classification. High-impact classification triggers the full set of obligations including mandatory impact assessments, enhanced transparency, bias prevention measures, and continuous monitoring.",
  },
  {
    question:
      "How do MFDS SaMD requirements interact with the K-AI Act?",
    answer:
      "AI-based Software as a Medical Device (SaMD) is subject to both MFDS medical device regulations and the K-AI Act. MFDS handles product-level safety and efficacy evaluation through the K-certification process, while the K-AI Act imposes broader governance obligations including impact assessments, transparency, and non-discrimination requirements. In practice, organizations must satisfy both regulatory frameworks. ParityScope generates documentation that serves both purposes — clinical validation evidence for MFDS and fairness compliance reports for K-AI Act obligations.",
  },
  {
    question:
      "What fairness metrics does ParityScope map to Korean requirements?",
    answer:
      "ParityScope maps four key metrics to K-AI Act requirements: demographic_parity for measuring equal selection rates across demographic groups, equal_opportunity for ensuring equitable true positive rates in clinical detection, disparate_impact for quantifying disproportionate adverse effects using the four-fifths threshold, and calibration_ratio for verifying that predicted probabilities match observed outcomes across populations. The SDK automatically selects these metrics and generates jurisdiction-specific PDF compliance reports with Korean regulatory references.",
  },
  {
    question:
      "What are the penalties for non-compliance with the K-AI Act?",
    answer:
      "The K-AI Act establishes a graduated penalty structure. Administrative measures include corrective orders requiring remediation within specified timeframes, restrictions on or suspension of AI system operation, and mandatory re-assessment. Financial penalties can reach up to KRW 500 million (approximately USD 380,000) for serious violations, with escalating penalties for repeat offenders. For healthcare AI that causes patient harm, additional liability under medical safety regulations and the Medical Devices Act may apply.",
  },
  {
    question:
      "Does the K-AI Act apply to foreign companies?",
    answer:
      "Yes. The K-AI Act applies to any organization deploying AI systems that affect individuals in South Korea, regardless of where the organization is headquartered. Foreign healthcare technology companies, medical device manufacturers, and health system vendors that serve the Korean market must comply with the full set of obligations applicable to their AI risk classification. This extraterritorial reach mirrors the approach taken by the EU AI Act.",
  },
  {
    question:
      "How does the K-AI Act compare to the EU AI Act?",
    answer:
      "The K-AI Act shares structural similarities with the EU AI Act, including a risk-based classification system, mandatory impact assessments for high-risk AI, and transparency obligations. Key differences include: the Korean framework uses a two-tier classification (high-impact vs. general) rather than the EU's four-tier system, KAISI serves as a centralized regulatory body compared to the EU's distributed national authority model, and the Korean framework includes specific provisions for AI industry promotion alongside regulation. ParityScope supports both frameworks with jurisdiction-specific metric mapping and documentation.",
  },
  {
    question:
      "What is the K-certification process for AI medical devices?",
    answer:
      "K-certification through MFDS involves pre-submission consultation, technical documentation preparation, clinical validation with the Korean patient population (including demographic subgroup analysis), and formal MFDS review. For AI-based SaMD, MFDS evaluates algorithmic performance, safety data, training data governance, and increasingly, fairness evidence demonstrating equitable performance across demographic groups. ParityScope generates the fairness validation documentation that supports the clinical evidence package for K-certification submissions.",
  },
];

export default function SouthKoreaPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-wider text-teal-light">
            South Korea K-AI Act
          </p>
          <h1 className="mt-3 text-display font-bold text-white">
            South Korea AI Compliance for Healthcare
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            South Korea&apos;s K-AI Act establishes mandatory{" "}
            <strong className="text-white">
              impact assessments and bias prevention requirements
            </strong>{" "}
            for high-impact AI systems, including all healthcare AI. The{" "}
            <strong className="text-white">
              Ministry of Food and Drug Safety (MFDS)
            </strong>{" "}
            separately regulates AI-based medical devices through the
            K-certification process, requiring clinical validation across
            demographic subgroups. Enforcement begins{" "}
            <strong className="text-white">2026</strong>. ParityScope automates
            compliance with both the K-AI Act and MFDS fairness requirements.
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
            description="South Korea's K-AI Act is one of Asia's most comprehensive AI regulations. Healthcare AI faces dual regulatory requirements from KAISI and MFDS."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                stat: "High-Impact",
                label: "AI Classification",
                text: "Healthcare AI systems are classified as high-impact under the K-AI Act, triggering mandatory impact assessments, enhanced transparency obligations, bias prevention requirements, and continuous post-deployment monitoring enforced by KAISI.",
              },
              {
                stat: "MFDS",
                label: "Medical Device Authority",
                text: "The Ministry of Food and Drug Safety regulates AI-based Software as a Medical Device (SaMD) through the K-certification process. Clinical validation must demonstrate equitable performance across the Korean patient population.",
              },
              {
                stat: "2026",
                label: "Enforcement Year",
                text: "Core provisions including impact assessment requirements and the high-impact classification framework become enforceable in 2026. Healthcare is a designated priority enforcement sector with early regulatory attention from KAISI.",
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

      {/* Metric Mapping */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Fairness Metrics"
            title="ParityScope Metric Mapping for K-AI Act"
            description="ParityScope's regulation-aware engine maps specific fairness metrics to Korean regulatory requirements, generating jurisdiction-specific PDF compliance reports."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {metricMappings.map((mapping) => (
              <div
                key={mapping.metric}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <code className="rounded bg-navy/5 px-2 py-1 text-sm font-semibold text-navy">
                  {mapping.metric}
                </code>
                <h3 className="mt-3 text-h4 font-bold text-navy">
                  {mapping.display}
                </h3>
                <p className="mt-3 text-body text-medium-gray">
                  {mapping.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* K-AI Act Requirements & ParityScope Mapping */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Regulatory Mapping"
            title="K-AI Act Requirements & How ParityScope Helps"
            description="The K-AI Act imposes specific obligations on high-impact AI operators. ParityScope maps directly to each requirement for healthcare AI compliance."
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
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.metrics.map((m) => (
                        <span
                          key={m}
                          className="rounded-full bg-teal/10 px-3 py-1 text-xs font-medium text-teal"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MFDS SaMD Requirements */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="MFDS Requirements"
            title="Medical Device AI: MFDS SaMD Framework"
            description="AI-based medical devices in South Korea must satisfy MFDS requirements in addition to K-AI Act obligations. ParityScope supports both regulatory tracks."
          />
          <div className="mt-12 space-y-4">
            {mfdsRequirements.map((req) => (
              <div
                key={req.area}
                className="flex flex-col gap-4 rounded-xl border border-light-gray bg-white p-6 shadow-card md:flex-row md:items-start md:gap-8"
              >
                <div className="flex shrink-0 items-start justify-between md:w-56 md:flex-col md:gap-2">
                  <h3 className="text-h4 font-bold text-navy">{req.area}</h3>
                  <span className="shrink-0 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
                    {req.status}
                  </span>
                </div>
                <p className="text-body text-medium-gray">{req.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* K-Certification Process */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Certification"
            title="K-Certification Process for AI Medical Devices"
            description="The path to MFDS K-certification for AI-based SaMD products, with ParityScope supporting the fairness evidence component at each stage."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {kCertificationProcess.map((step) => (
              <div
                key={step.step}
                className="rounded-xl border border-light-gray bg-white p-6 shadow-card"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal text-lg font-bold text-white">
                  {step.step}
                </div>
                <h3 className="mt-4 text-h4 font-bold text-navy">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-medium-gray">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How ParityScope Helps */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Compliance Automation"
            title="How ParityScope Automates Korean AI Compliance"
            description="ParityScope's SDK-first approach ensures HIPAA-compliant data handling while generating the documentation both KAISI and MFDS require."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<span className="text-xl">&#x1F4CA;</span>}
              title="Automated Impact Assessments"
              description="Generate K-AI Act impact assessment documentation with automated bias analysis across all four mapped metrics. Assessment reports follow the KAISI framework structure."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F4C4;</span>}
              title="Jurisdiction-Specific PDF Reports"
              description="Generate Korea-specific compliance reports in PDF format with K-AI Act article references, MFDS submission-ready fairness evidence, and metric results with statistical significance testing."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F50D;</span>}
              title="Demographic Subgroup Analysis"
              description="Validate AI performance across demographic subgroups relevant to the Korean patient population. Generates the subgroup analysis evidence that MFDS increasingly expects in SaMD submissions."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x26A0;&#xFE0F;</span>}
              title="Post-Market Monitoring"
              description="Continuous production monitoring satisfies K-AI Act Article 31-33 requirements. Automated alerts detect performance degradation and emergent bias before they become compliance incidents."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F512;</span>}
              title="HIPAA-Compliant Architecture"
              description="SDK-first design ensures patient data never leaves your infrastructure. All fairness computations run locally, maintaining data sovereignty requirements critical for Korean healthcare data regulations."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F4DD;</span>}
              title="Multi-Jurisdiction Support"
              description="Organizations operating across Korea and the EU can generate both K-AI Act and EU AI Act compliance documentation from a single audit run, streamlining multi-jurisdictional compliance."
            />
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Multi-Jurisdictional"
            title="K-AI Act vs. EU AI Act Comparison"
            description="Organizations operating across jurisdictions need to understand how the Korean framework compares to EU requirements. ParityScope supports both with jurisdiction-specific metric mapping."
          />
          <div className="mt-12 overflow-hidden rounded-xl border border-light-gray shadow-card">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-navy">
                  <th className="px-6 py-4 text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                    Dimension
                  </th>
                  <th className="px-6 py-4 text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                    South Korea K-AI Act
                  </th>
                  <th className="px-6 py-4 text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                    EU AI Act
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-gray bg-white">
                {comparisonData.map((row) => (
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
            description="Common questions about South Korea's K-AI Act, MFDS requirements, and healthcare AI compliance."
          />
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Prepare for South Korea's K-AI Act"
        description="ParityScope automates the impact assessments, bias testing, and monitoring documentation required by the K-AI Act and MFDS. Get compliant before enforcement begins in 2026."
        primaryCTA={{ label: "Request a Demo", href: "/contact" }}
        secondaryCTA={{
          label: "Read the Whitepaper",
          href: "/resources/whitepapers",
        }}
      />
    </main>
  );
}
