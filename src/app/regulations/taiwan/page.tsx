import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";
import { Accordion } from "@/components/ui/accordion";
import { FeatureCard } from "@/components/ui/feature-card";

export const metadata: Metadata = {
  title:
    "Taiwan AI Basic Act Compliance for Healthcare AI | ParityScope",
  description:
    "Navigate Taiwan's AI Basic Act and TFDA SaMD guidelines for healthcare AI. ParityScope automates fairness testing, non-discrimination compliance, and transparency documentation under Taiwan's emerging regulatory framework.",
};

const principles = [
  {
    principle: "Fairness and Non-Discrimination",
    description:
      "AI systems must not produce unfair or discriminatory outcomes. Developers and deployers must take proactive measures to identify and mitigate bias across all stages of the AI lifecycle, from data collection through deployment and ongoing monitoring. This is the most directly relevant principle for healthcare AI fairness compliance.",
    parityscope:
      "ParityScope tests for bias across all three Taiwan-mapped fairness metrics — demographic_parity, equal_opportunity, and equalized_odds — and all protected attributes simultaneously. Regulation-aware metric selection ensures the right tests are applied, with automated remediation recommendations when disparities are detected.",
    metrics: ["demographic_parity", "equal_opportunity", "equalized_odds"],
  },
  {
    principle: "Transparency and Explainability",
    description:
      "AI systems affecting individual rights or interests must operate with sufficient transparency. Users and affected individuals should be able to understand the general logic of AI-driven decisions and the key factors influencing outcomes. Healthcare AI must provide interpretable outputs for clinical decision-making.",
    parityscope:
      "ParityScope generates human-readable fairness reports with plain-language metric explanations, subgroup performance breakdowns, and confidence intervals. Reports are designed for both technical teams and non-technical stakeholders including patients, hospital administrators, and regulators.",
    metrics: ["demographic_parity", "equalized_odds"],
  },
  {
    principle: "Safety and Security",
    description:
      "AI systems must be developed and operated with appropriate safeguards to protect safety and security. This includes ongoing risk assessment, testing, and monitoring to prevent harms throughout the system lifecycle. For healthcare AI, safety encompasses equitable clinical performance.",
    parityscope:
      "Continuous production monitoring detects performance degradation and fairness drift across demographic subgroups in real time. Automated alerts notify compliance teams when safety-critical thresholds are approached, enabling proactive intervention before patient harm occurs.",
    metrics: ["equal_opportunity", "equalized_odds"],
  },
  {
    principle: "Accountability and Governance",
    description:
      "Organizations deploying AI must establish clear governance structures, designate responsible individuals, maintain comprehensive records, and be prepared to demonstrate compliance with applicable principles and standards upon request by regulatory authorities.",
    parityscope:
      "ParityScope maintains immutable audit trails of all fairness assessments, metric calculations, and remediation actions. Export-ready compliance documentation in PDF format supports regulatory inquiries and internal governance reviews with full traceability.",
    metrics: ["demographic_parity", "equal_opportunity", "equalized_odds"],
  },
  {
    principle: "Privacy and Data Protection",
    description:
      "AI systems must respect personal data protection rights under Taiwan's Personal Data Protection Act (PDPA). Data used for AI development and operation must be collected, processed, and stored in accordance with PDPA requirements and relevant sectoral regulations.",
    parityscope:
      "ParityScope's SDK-first architecture ensures patient data never leaves your infrastructure. All fairness computations run locally on your systems, with only aggregate statistical outputs transmitted — fully compatible with Taiwan's PDPA requirements for healthcare data.",
    metrics: [],
  },
  {
    principle: "Human Oversight",
    description:
      "High-stakes AI applications, particularly in healthcare, must incorporate meaningful human oversight mechanisms. Automated decisions affecting individual health and welfare should be subject to human review and intervention capabilities.",
    parityscope:
      "ParityScope's fairness dashboards and alert systems support human-in-the-loop oversight. Flagging systems highlight cases where AI outputs show elevated bias risk across subgroups, enabling clinical teams to exercise informed judgment on intervention.",
    metrics: [],
  },
];

const metricMappings = [
  {
    metric: "demographic_parity",
    display: "Demographic Parity",
    description:
      "Measures whether the AI system's selection or recommendation rate is equal across demographic groups. The foundational metric for demonstrating non-discrimination under the AI Basic Act's fairness principle. Essential for clinical algorithms that allocate resources, recommend treatments, or prioritize patients.",
  },
  {
    metric: "equal_opportunity",
    display: "Equal Opportunity",
    description:
      "Ensures true positive rates are equalized across demographic groups. Critical for diagnostic AI and screening tools where missed cases carry direct clinical consequences. Demonstrates that the AI identifies patients who need care at equitable rates regardless of demographic background.",
  },
  {
    metric: "equalized_odds",
    display: "Equalized Odds",
    description:
      "Requires both true positive and false positive rates to be equal across groups. The most comprehensive error-based fairness metric, ensuring that the AI's complete error profile is equitable. Addresses both missed diagnoses and unnecessary interventions across all patient populations.",
  },
];

const tfdaRequirements = [
  {
    area: "SaMD Classification",
    description:
      "Taiwan's FDA (TFDA) classifies AI-based Software as a Medical Device using a risk-based framework. Clinical decision support AI typically falls under Class II or Class III, requiring pre-market review with increasing levels of clinical evidence for higher risk classifications.",
    status: "Active framework",
  },
  {
    area: "Clinical Performance Validation",
    description:
      "TFDA requires clinical performance evidence demonstrating safety and effectiveness for the intended patient population. For AI-based SaMD, this increasingly includes demonstration of consistent performance across demographic subgroups relevant to Taiwan's diverse population.",
    status: "Active framework",
  },
  {
    area: "Good Machine Learning Practice",
    description:
      "TFDA has signaled alignment with the international GMLP framework developed by FDA, Health Canada, and MHRA. Principles include representative training data, bias identification and mitigation, and comprehensive documentation of data governance practices throughout the AI lifecycle.",
    status: "Emerging guidance",
  },
  {
    area: "Post-Market Surveillance",
    description:
      "Approved SaMD products must implement post-market surveillance plans proportionate to device risk. For AI-based devices, TFDA expects performance monitoring that can detect degradation patterns, including differential performance across patient subgroups.",
    status: "Active framework",
  },
  {
    area: "Predetermined Change Control",
    description:
      "For AI systems designed to adapt and learn after deployment, TFDA is developing guidance on predetermined change control plans. Organizations must document anticipated modification types, validation protocols, and performance impact assessments including fairness considerations.",
    status: "Emerging guidance",
  },
];

const healthcareGuidance = [
  {
    area: "Clinical Decision Support",
    requirement:
      "AI systems assisting clinical decisions must demonstrate equitable performance across patient demographics. The Ministry of Health and Welfare emphasizes that diagnostic accuracy, sensitivity, and specificity should not vary significantly across protected subgroups.",
    status: "Active guidance from MOHW",
  },
  {
    area: "Medical Device AI (SaMD)",
    requirement:
      "AI-enabled medical devices must comply with TFDA's Software as Medical Device framework in addition to AI Basic Act principles. Fairness and non-discrimination documentation is increasingly expected as part of regulatory submissions and will likely become mandatory.",
    status: "Evolving regulatory framework",
  },
  {
    area: "Health Data Analytics",
    requirement:
      "AI systems analyzing population health data must ensure that analytical outputs do not perpetuate or amplify existing health disparities. Special attention is required for underrepresented populations in training datasets, including indigenous and rural communities.",
    status: "Active guidance from MOHW",
  },
  {
    area: "Telemedicine AI",
    requirement:
      "AI systems integrated into telemedicine platforms must provide equitable service quality across geographic regions, language groups, and demographic categories. Particular attention is required for Taiwan's rural and mountain communities.",
    status: "Emerging requirements",
  },
];

const regionalComparison = [
  {
    dim: "Regulatory Approach",
    taiwan: "Principles-based (AI Basic Act)",
    korea: "Comprehensive framework (K-AI Act)",
    eu: "Prescriptive regulation (EU AI Act)",
  },
  {
    dim: "Healthcare AI Status",
    taiwan: "Priority sector under MOHW guidance",
    korea: "High-impact classification",
    eu: "High-risk under Annex III",
  },
  {
    dim: "Medical Device AI",
    taiwan: "TFDA SaMD framework",
    korea: "MFDS SaMD + K-certification",
    eu: "MDR 2017/745 + EU AI Act",
  },
  {
    dim: "Fairness Requirements",
    taiwan: "Principle-level (non-discrimination)",
    korea: "Mandatory bias prevention (Articles 24-25)",
    eu: "Mandatory under Articles 9, 10, 15",
  },
  {
    dim: "ParityScope Metrics",
    taiwan: "demographic_parity, equal_opportunity, equalized_odds",
    korea: "demographic_parity, equal_opportunity, disparate_impact, calibration_ratio",
    eu: "6 metrics mapped to specific articles",
  },
  {
    dim: "Enforcement Stage",
    taiwan: "Emerging framework with voluntary adoption",
    korea: "Enacted, enforcement from 2026",
    eu: "In force, phased enforcement 2024-2027",
  },
  {
    dim: "Penalty Structure",
    taiwan: "Evolving — primarily administrative measures",
    korea: "Up to KRW 500M + operational restrictions",
    eu: "Up to EUR 35M or 7% global turnover",
  },
];

const faqItems = [
  {
    question: "What is Taiwan's AI Basic Act?",
    answer:
      "Taiwan's AI Basic Act is a principles-based regulatory framework governing the development, deployment, and use of AI systems in Taiwan. Rather than prescribing detailed technical requirements like the EU AI Act, the AI Basic Act establishes foundational principles — fairness, transparency, safety, accountability, privacy, and human oversight — that AI developers and deployers must adhere to. Sector-specific agencies, including the Ministry of Health and Welfare (MOHW) for healthcare and TFDA for medical devices, develop detailed implementation guidelines based on these principles.",
  },
  {
    question:
      "How does a principles-based approach affect compliance strategy?",
    answer:
      "A principles-based approach establishes broad governance principles while leaving flexibility in how organizations demonstrate compliance. This can create a higher compliance bar than prescriptive regulation — without detailed checklists, organizations must demonstrate that their approach to fairness is reasonable, thorough, and defensible. When enforcement actions arise, regulators evaluate whether your organization took adequate steps to comply with the principles. Comprehensive, automated fairness testing with full documentation is the strongest evidence of good-faith compliance under this regime.",
  },
  {
    question:
      "What fairness metrics does ParityScope map to Taiwan's requirements?",
    answer:
      "ParityScope maps three key metrics to Taiwan's AI Basic Act requirements: demographic_parity for measuring equal selection rates across demographic groups, equal_opportunity for ensuring equitable identification of patients who need clinical intervention, and equalized_odds for comprehensive error-profile analysis ensuring both true positive and false positive rates are equalized. The SDK generates jurisdiction-specific PDF compliance reports with metric results tailored to Taiwan's principles-based framework.",
  },
  {
    question: "Does the AI Basic Act apply specifically to healthcare?",
    answer:
      "The AI Basic Act applies broadly to all sectors, but healthcare is a priority area for implementation. The Ministry of Health and Welfare (MOHW) is responsible for developing sector-specific guidelines, and has issued guidance emphasizing non-discrimination in clinical AI, equitable access to AI-driven healthcare services, and transparency in AI-assisted medical decisions. Healthcare organizations should anticipate that the AI Basic Act's principles will be interpreted with particular rigor in the medical context given the direct impact on patient welfare.",
  },
  {
    question:
      "How does Taiwan's TFDA regulate AI medical devices?",
    answer:
      "TFDA regulates AI-based Software as Medical Device (SaMD) through a risk-based classification framework. AI medical devices require pre-market review with clinical performance evidence proportionate to device risk. TFDA has signaled alignment with international Good Machine Learning Practice principles and increasingly expects fairness validation as part of SaMD submissions. While fairness documentation is not yet mandatory for all TFDA submissions, the trajectory is clear — organizations that include comprehensive fairness evidence now are better positioned for future requirements.",
  },
  {
    question:
      "What enforcement mechanisms exist under the AI Basic Act?",
    answer:
      "As a principles-based framework, enforcement authority is delegated to sector-specific regulators. For healthcare AI, enforcement falls primarily to MOHW and TFDA (for medical device AI). Current enforcement mechanisms include administrative guidance and corrective orders, restrictions on AI system deployment, and potential liability under existing consumer protection and medical practice laws. While the penalty structure is still evolving, organizations that proactively demonstrate compliance through comprehensive testing and documentation are best positioned as enforcement matures.",
  },
  {
    question: "Does the AI Basic Act have extraterritorial reach?",
    answer:
      "The AI Basic Act primarily applies to AI systems deployed within Taiwan or affecting individuals in Taiwan. Foreign companies offering AI-powered healthcare services or products in the Taiwanese market are expected to comply with the Act's principles. Given Taiwan's significant healthcare technology sector and growing AI governance focus, international health technology companies serving Taiwanese patients should incorporate AI Basic Act compliance into their regulatory strategy.",
  },
  {
    question:
      "How does Taiwan's approach compare to South Korea and the EU?",
    answer:
      "Taiwan takes a principles-based approach compared to South Korea's comprehensive framework law and the EU's prescriptive regulation. Taiwan's framework provides more flexibility but less regulatory certainty. South Korea's K-AI Act and the EU AI Act both classify healthcare AI as high-risk/high-impact with mandatory assessments, while Taiwan currently relies on voluntary compliance with MOHW guidance. ParityScope supports all three jurisdictions with region-specific metric mapping, enabling organizations operating across Asia-Pacific and Europe to maintain unified compliance from a single platform.",
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
            Taiwan AI Basic Act Compliance for Healthcare AI
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            Taiwan&apos;s AI Basic Act establishes a{" "}
            <strong className="text-white">principles-based framework</strong>{" "}
            governing AI development and deployment, with{" "}
            <strong className="text-white">
              fairness and non-discrimination
            </strong>{" "}
            as core requirements. The{" "}
            <strong className="text-white">
              TFDA (Taiwan FDA)
            </strong>{" "}
            separately regulates AI-based medical devices through its SaMD
            guidelines, with fairness evidence increasingly expected in
            submissions. ParityScope provides proactive compliance by automating
            bias testing, transparency documentation, and ongoing monitoring
            before mandatory requirements solidify.
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
            description="Taiwan's AI Basic Act takes a principles-based approach to AI regulation, with healthcare designated as a priority sector. The framework is emerging but the compliance trajectory is clear."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                stat: "Principles-Based",
                label: "Regulatory Approach",
                text: "The AI Basic Act establishes foundational principles — fairness, transparency, safety, accountability — rather than prescriptive technical requirements. Sector-specific agencies develop detailed implementation guidelines.",
              },
              {
                stat: "TFDA",
                label: "Medical Device Authority",
                text: "Taiwan's FDA regulates AI-based Software as Medical Devices through a risk-based classification framework. Fairness evidence is increasingly expected in SaMD submissions and will likely become mandatory.",
              },
              {
                stat: "MOHW",
                label: "Healthcare Regulator",
                text: "The Ministry of Health and Welfare develops healthcare-specific AI guidance emphasizing non-discrimination, equitable access, and transparency in clinical AI applications across Taiwan's healthcare system.",
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
            title="ParityScope Metric Mapping for Taiwan"
            description="ParityScope's regulation-aware engine maps specific fairness metrics to Taiwan's AI Basic Act requirements, generating jurisdiction-specific PDF compliance reports."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
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

      {/* Core Principles */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Regulatory Mapping"
            title="Core Principles & How ParityScope Helps"
            description="The AI Basic Act establishes six core principles for responsible AI. ParityScope provides automated compliance support for each principle with specific metric mapping."
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
                    {item.metrics.length > 0 && (
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
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TFDA SaMD Guidelines */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="TFDA Requirements"
            title="TFDA SaMD Guidelines for AI Medical Devices"
            description="Taiwan's FDA regulates AI-based medical devices through a risk-based SaMD framework. Fairness evidence is an emerging but increasingly expected component of regulatory submissions."
          />
          <div className="mt-12 space-y-4">
            {tfdaRequirements.map((req) => (
              <div
                key={req.area}
                className="flex flex-col gap-4 rounded-xl border border-light-gray bg-white p-6 shadow-card md:flex-row md:items-start md:gap-8"
              >
                <div className="flex shrink-0 items-start justify-between md:w-60 md:flex-col md:gap-2">
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

      {/* Healthcare-Specific Guidance */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Healthcare Focus"
            title="Sector-Specific Guidance for Healthcare AI"
            description="The Ministry of Health and Welfare is developing detailed guidelines for healthcare AI applications under the AI Basic Act framework."
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

      {/* Why Proactive Compliance Matters */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Strategy"
            title="Why Proactive Compliance Under an Emerging Framework"
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
                Organizations that establish robust fairness testing and
                documentation practices now — before mandatory requirements
                solidify — gain three advantages: they influence emerging
                standards through demonstrated best practice, they avoid costly
                remediation when requirements become binding, and they build the
                institutional muscle for continuous compliance.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "No checklist to hide behind",
                  text: "Without prescriptive requirements, you cannot claim compliance simply by checking boxes. You must demonstrate substantive and defensible fairness practices.",
                },
                {
                  title: "Reasonableness standard",
                  text: "Regulators assess whether your compliance efforts are reasonable for your risk profile. Automated testing with documented metrics sets a strong standard of care.",
                },
                {
                  title: "Evolving expectations",
                  text: "Principles-based regimes evolve through enforcement precedent and guidance updates. Organizations with robust baseline compliance are best positioned as standards tighten.",
                },
                {
                  title: "Documentation is your defense",
                  text: "Comprehensive audit trails and testing documentation serve as your primary evidence of compliance. ParityScope generates jurisdiction-specific PDF reports automatically.",
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

      {/* How ParityScope Helps */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Compliance Automation"
            title="How ParityScope Provides Proactive Compliance"
            description="ParityScope's SDK-first approach ensures data sovereignty while generating the documentation Taiwan's evolving regulatory framework will require."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<span className="text-xl">&#x1F4CA;</span>}
              title="Principles-Aligned Testing"
              description="Comprehensive fairness audits mapped to all three Taiwan-specified metrics. Demonstrates substantive compliance with the AI Basic Act's fairness and non-discrimination principle."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F4C4;</span>}
              title="Jurisdiction-Specific PDF Reports"
              description="Generate Taiwan-specific compliance reports in PDF format referencing AI Basic Act principles, MOHW guidance, and TFDA expectations. Reports serve both internal governance and regulatory inquiry needs."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F50D;</span>}
              title="Demographic Subgroup Analysis"
              description="Validate AI performance across demographic subgroups relevant to Taiwan's patient population. Identifies disparities across age, sex, ethnicity, and geographic factors."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x26A0;&#xFE0F;</span>}
              title="Continuous Monitoring"
              description="Production monitoring satisfies the AI Basic Act's safety and ongoing accountability principles. Detect fairness drift and performance degradation before they become regulatory issues."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F512;</span>}
              title="PDPA-Compatible Architecture"
              description="SDK-first design ensures patient data never leaves your infrastructure. All fairness computations run locally, maintaining compatibility with Taiwan's Personal Data Protection Act."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F30F;</span>}
              title="Multi-Jurisdiction Support"
              description="Organizations operating across Taiwan, Korea, and the EU can generate jurisdiction-specific compliance documentation from a single audit run — streamlining regional compliance."
            />
          </div>
        </div>
      </section>

      {/* Regional Comparison */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Regional Comparison"
            title="Taiwan vs. Regional Peers"
            description="Understanding how Taiwan's approach compares to South Korea and the EU helps organizations build a compliance strategy that works across jurisdictions."
          />
          <div className="mt-12 overflow-x-auto rounded-xl border border-light-gray shadow-card">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-navy">
                  <th className="whitespace-nowrap px-6 py-4 text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                    Dimension
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                    Taiwan
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                    South Korea
                  </th>
                  <th className="whitespace-nowrap px-6 py-4 text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                    EU
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-gray bg-white">
                {regionalComparison.map((row) => (
                  <tr key={row.dim} className="hover:bg-off-white">
                    <td className="whitespace-nowrap px-6 py-4 text-body font-semibold text-navy">
                      {row.dim}
                    </td>
                    <td className="px-6 py-4 text-sm text-medium-gray">
                      {row.taiwan}
                    </td>
                    <td className="px-6 py-4 text-sm text-medium-gray">
                      {row.korea}
                    </td>
                    <td className="px-6 py-4 text-sm text-medium-gray">
                      {row.eu}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-center text-body text-medium-gray">
            ParityScope supports all three frameworks with jurisdiction-specific
            metric mapping, enabling unified compliance for organizations
            operating across the Asia-Pacific region and Europe.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            title="Frequently Asked Questions"
            description="Common questions about Taiwan's AI Basic Act, TFDA requirements, and healthcare AI compliance."
          />
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Get Ahead of Taiwan's Evolving AI Regulations"
        description="ParityScope provides the comprehensive fairness testing, transparency documentation, and continuous monitoring needed to demonstrate compliance with Taiwan's AI Basic Act — before mandatory requirements arrive."
        primaryCTA={{ label: "Request a Demo", href: "/contact" }}
        secondaryCTA={{
          label: "Read the Whitepaper",
          href: "/resources/whitepapers",
        }}
      />
    </main>
  );
}
