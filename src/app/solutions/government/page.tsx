import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { Accordion } from "@/components/ui/accordion";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title:
    "Government & Payers — AI Fairness Compliance for Public Health | ParityScope",
  description:
    "Meet Section 1557 mandates, oversee Medicaid/Medicare AI systems, and enforce health equity requirements at scale. ParityScope provides standardized audit frameworks and population-level fairness monitoring for government agencies and health plans.",
};

const painPoints = [
  {
    title: "Section 1557 Enforcement Demands Measurable Proof",
    description:
      "Section 1557 of the Affordable Care Act prohibits discrimination in healthcare programs receiving federal funding. As AI systems increasingly drive clinical and administrative decisions, HHS enforcement requires demonstrable evidence that these systems do not produce disparate outcomes across race, color, national origin, sex, age, or disability. Manual compliance review cannot keep pace with the volume of AI deployed across the healthcare system.",
    stat: "1557",
    statLabel: "ACA Section — the foundation of AI anti-discrimination enforcement",
  },
  {
    title: "Medicaid and Medicare AI Oversight at Scale",
    description:
      "State Medicaid agencies and CMS-regulated Medicare Advantage plans deploy AI for prior authorization, utilization management, care coordination, and fraud detection. Each of these systems makes decisions that directly affect beneficiary access to care. Federal oversight bodies need standardized tools to evaluate whether these AI systems treat every beneficiary population equitably.",
    stat: "90M+",
    statLabel: "Medicaid beneficiaries affected by AI-driven decisions",
  },
  {
    title: "Health Equity Mandates Require Algorithmic Accountability",
    description:
      "Executive orders, CMS quality programs, and state-level health equity mandates increasingly require that AI systems be evaluated for disparate impact. Government agencies must demonstrate that the AI tools they procure, deploy, or oversee do not exacerbate existing healthcare disparities — particularly for historically underserved populations.",
    stat: "50",
    statLabel: "states with active or pending AI governance legislation",
  },
  {
    title: "Procurement Standards Lack Fairness Benchmarks",
    description:
      "Government procurement processes for AI-enabled healthcare tools lack standardized fairness evaluation criteria. Without a consistent framework, agencies cannot meaningfully compare vendor claims about algorithmic fairness, and procurement officers lack the technical tools to validate those claims independently.",
    stat: "0",
    statLabel: "standardized federal AI fairness procurement benchmarks today",
  },
];

const solutionBenefits = [
  {
    title: "Standardized Audit Framework",
    description:
      "Replace ad hoc vendor questionnaires with a rigorous, standardized fairness evaluation framework. ParityScope evaluates AI systems against 15+ fairness metrics across all protected attributes defined by Section 1557, producing consistent, comparable results regardless of which agency conducts the audit or which vendor built the system.",
  },
  {
    title: "Population-Level Fairness Monitoring",
    description:
      "Monitor AI fairness across entire beneficiary populations — not just individual model outputs. ParityScope aggregates fairness metrics at the population level, enabling agencies to identify systemic patterns of algorithmic discrimination across providers, plans, and geographic regions. Track whether AI-driven disparities are improving or worsening over time.",
  },
  {
    title: "Policy Compliance Dashboards",
    description:
      "Purpose-built dashboards for government oversight teams. Track compliance status across all AI systems within your jurisdiction, visualize fairness trends by population subgroup, and generate reports that map directly to Section 1557 requirements, CMS quality measures, and state-level health equity mandates.",
  },
  {
    title: "Vendor Assessment Tools",
    description:
      "Evaluate AI vendors' fairness claims with standardized, independent testing. ParityScope enables procurement officers to require and verify fairness documentation as part of the vendor selection process. Compare vendors side-by-side on fairness metrics — not marketing materials — and establish ongoing monitoring requirements as contract conditions.",
  },
];

const regulatoryTimeline = [
  {
    year: "2010",
    title: "ACA Section 1557 Enacted",
    description:
      "The Affordable Care Act establishes Section 1557, prohibiting discrimination in health programs receiving federal financial assistance. This becomes the foundational anti-discrimination statute applied to healthcare AI systems.",
    status: "enacted" as const,
  },
  {
    year: "2022",
    title: "HHS Proposes Updated Section 1557 Rules",
    description:
      "HHS proposes updated regulations explicitly addressing the use of clinical algorithms and AI systems, requiring covered entities to identify and mitigate discrimination in automated decision-making tools used in healthcare delivery and coverage.",
    status: "enacted" as const,
  },
  {
    year: "2023",
    title: "Executive Order on AI Safety and Trustworthiness",
    description:
      "The White House Executive Order on Safe, Secure, and Trustworthy AI directs HHS to establish AI safety and fairness standards for healthcare, including requirements for algorithmic impact assessments and bias testing in federally funded programs.",
    status: "enacted" as const,
  },
  {
    year: "2024",
    title: "CMS Finalizes AI Transparency Requirements",
    description:
      "CMS finalizes rules requiring Medicare Advantage plans to ensure that AI and algorithmic tools used in coverage determinations comply with existing anti-discrimination requirements and provide transparent, explainable decisions to beneficiaries and oversight bodies.",
    status: "enacted" as const,
  },
  {
    year: "2025",
    title: "State-Level AI Governance Laws Proliferate",
    description:
      "Multiple states enact AI governance legislation requiring bias audits for AI systems used in healthcare, insurance, and public benefits. State Medicaid agencies begin requiring fairness documentation from AI vendors and managed care organizations as a condition of procurement and contract renewal.",
    status: "enacted" as const,
  },
  {
    year: "2026",
    title: "Federal AI Fairness Standards Expected",
    description:
      "HHS and ONC are expected to finalize standardized AI fairness evaluation frameworks for healthcare, establishing minimum bias testing requirements for AI systems used in federally funded programs. Agencies that have not built governance infrastructure will face compliance gaps.",
    status: "upcoming" as const,
  },
  {
    year: "2027",
    title: "EU AI Act Full Enforcement Begins",
    description:
      "The EU AI Act enters full enforcement for high-risk AI systems, including healthcare applications. Government agencies and payers with international obligations must demonstrate conformity across both US and EU regulatory frameworks simultaneously.",
    status: "upcoming" as const,
  },
];

const useCases = [
  {
    title: "Prior Authorization AI Oversight",
    description:
      "Monitor AI systems used by Medicare Advantage plans and Medicaid managed care organizations for prior authorization decisions. Ensure that automated approval and denial patterns do not discriminate against beneficiaries based on race, disability, age, or geographic location.",
  },
  {
    title: "Risk Adjustment Model Fairness",
    description:
      "Audit risk adjustment models used in Medicare Advantage, Medicaid managed care, and ACA marketplace programs. Ensure risk scores do not systematically under-predict healthcare needs for racial minorities, people with disabilities, or low-income beneficiaries.",
  },
  {
    title: "Fraud Detection and Program Integrity",
    description:
      "Validate that AI-driven fraud detection and program integrity tools do not disproportionately flag providers serving minority or low-income communities. Ensure investigative resources are allocated based on genuine risk indicators, not demographic proxies.",
  },
  {
    title: "Eligibility Determination Systems",
    description:
      "Monitor AI-assisted eligibility determination for disparate impact. Ensure that algorithms processing Medicaid applications, disability assessments, and benefit calculations treat every applicant equitably regardless of demographic characteristics.",
  },
  {
    title: "Care Coordination Algorithms",
    description:
      "Audit care management AI that identifies patients for outreach, intervention programs, and high-risk care coordination. Ensure these tools equitably allocate attention and resources across all beneficiary populations.",
  },
  {
    title: "Quality Measurement and Reporting",
    description:
      "Validate that AI-assisted quality measurement tools accurately capture care quality across demographic groups. Prevent measurement bias from distorting provider incentives, star ratings, and resource allocation decisions.",
  },
];

const faqItems = [
  {
    question:
      "How does ParityScope help with Section 1557 compliance specifically?",
    answer:
      "ParityScope evaluates AI systems against the protected attributes defined by Section 1557: race, color, national origin, sex, age, and disability. Our audit reports document whether each system produces statistically significant disparate outcomes across these groups, using metrics aligned with HHS enforcement guidance. Reports are structured for regulatory submission and can serve as evidence of due diligence in enforcement proceedings.",
  },
  {
    question: "Can ParityScope audit AI systems we do not own or operate?",
    answer:
      "Yes. ParityScope audits any AI system that produces predictions, regardless of who built or operates it. For vendor-operated systems, you provide the system's outputs and beneficiary demographic data. Our SDK evaluates fairness without requiring access to the vendor's proprietary model internals. This is essential for government agencies that oversee third-party AI systems deployed by health plans, providers, and contractors.",
  },
  {
    question:
      "How does population-level monitoring differ from model-level auditing?",
    answer:
      "Model-level auditing evaluates a single AI system's fairness. Population-level monitoring aggregates the impact of all AI systems on a beneficiary population. For example, a Medicaid agency might have fair individual models for prior authorization, risk adjustment, and care management — but the combined effect on Black enrollees could still be disparate. Population-level monitoring catches systemic patterns that model-by-model auditing misses.",
  },
  {
    question:
      "Is ParityScope compatible with FedRAMP and government security requirements?",
    answer:
      "ParityScope's SDK runs entirely on your infrastructure, which means the software operates within your existing security boundary. Patient and beneficiary data never leaves your environment. Only aggregated, de-identified fairness metrics are produced. This architecture is designed to align with government security requirements including FedRAMP, FISMA, and StateRAMP. We work with your security team to ensure compliance with your specific authorization framework.",
  },
  {
    question: "How quickly can we generate reports for legislative inquiries?",
    answer:
      "If continuous monitoring is active, compliance reports can be generated in seconds. Reports include metric-by-metric fairness breakdowns, trend analysis over any time period, per-model compliance status, and remediation history. For initial audits of previously unmonitored systems, a comprehensive report is typically available within hours of data ingestion.",
  },
  {
    question:
      "Can we set different fairness thresholds for different programs?",
    answer:
      "Absolutely. ParityScope supports hierarchical threshold configuration. You can set agency-wide minimum standards, then apply stricter thresholds for specific programs — such as heightened scrutiny for Medicaid managed care AI or Medicare Advantage risk adjustment models. Each program's thresholds are independently configurable and auditable.",
  },
  {
    question:
      "Does ParityScope support procurement evaluation workflows?",
    answer:
      "Yes. ParityScope provides a standardized vendor assessment framework that procurement officers can require as part of AI solicitations. Vendors submit their models for fairness evaluation using ParityScope's SDK, and results are returned in a standardized format that enables side-by-side comparison. This replaces self-reported vendor fairness claims with independently verified metrics.",
  },
];

export default function GovernmentPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy px-4 pb-24 pt-20 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-wider text-teal-light">
            Government & Payers
          </p>
          <h1 className="mt-4 max-w-4xl text-h1 font-bold leading-tight tracking-tight lg:text-display">
            Enforce AI Fairness Across{" "}
            <span className="text-teal">Public Healthcare Programs</span>
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-light-gray">
            Section 1557 mandates, Medicaid/Medicare AI oversight, and health
            equity requirements demand standardized tools for evaluating
            algorithmic fairness at scale. ParityScope gives government agencies
            and health plans the audit framework, monitoring infrastructure, and
            compliance documentation to protect every beneficiary.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Contact Our Government Team
            </Link>
            <Link
              href="/product"
              className="rounded-full border border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Platform Overview
            </Link>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="The Challenge"
            title="AI Governance in Public Healthcare Lacks Standardized Tools"
            description="Government agencies and health plans face an urgent need to oversee AI systems that affect millions of beneficiaries — without the standardized frameworks and tooling to do it effectively."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {painPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-xl border border-light-gray p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-h3 font-bold text-coral">
                    {point.stat}
                  </span>
                  <span className="text-body-sm text-medium-gray">
                    {point.statLabel}
                  </span>
                </div>
                <h3 className="mt-4 text-h4 font-semibold text-navy">
                  {point.title}
                </h3>
                <p className="mt-3 text-medium-gray">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Benefits */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="The Solution"
            title="Standardized AI Fairness Governance at Scale"
            description="ParityScope provides government agencies and health plans with the tools to evaluate, monitor, and enforce AI fairness across their entire jurisdiction."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {solutionBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <h3 className="text-h4 font-semibold text-navy">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-medium-gray">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Compliance Timeline */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Regulatory Compliance Timeline"
            title="The AI Fairness Regulatory Landscape Is Accelerating"
            description="Federal and state requirements for AI fairness in healthcare are compounding year over year. Agencies that build governance infrastructure now will be prepared; those that wait will scramble to catch up."
            align="left"
          />
          <div className="mt-16 relative">
            <div className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-gradient-to-b from-teal via-teal/50 to-coral/50 md:left-[55px]" />
            <div className="space-y-8">
              {regulatoryTimeline.map((event) => (
                <div
                  key={event.year}
                  className="relative flex flex-col gap-4 pl-8 md:flex-row md:gap-8 md:pl-0"
                >
                  <div
                    className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 md:left-[48px] ${
                      event.status === "upcoming"
                        ? "border-coral bg-coral/20"
                        : "border-teal bg-white"
                    }`}
                  />
                  <div className="shrink-0 md:w-12 md:text-right">
                    <span
                      className={`text-body-sm font-bold ${
                        event.status === "upcoming"
                          ? "text-coral"
                          : "text-teal"
                      }`}
                    >
                      {event.year}
                    </span>
                  </div>
                  <div
                    className={`rounded-xl border p-6 shadow-card md:ml-8 md:flex-1 ${
                      event.status === "upcoming"
                        ? "border-coral/30 bg-coral/5"
                        : "border-light-gray bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <h3 className="text-h4 font-semibold text-navy">
                        {event.title}
                      </h3>
                      {event.status === "upcoming" && (
                        <span className="rounded-full bg-coral/10 px-2.5 py-0.5 text-caption font-semibold text-coral">
                          UPCOMING
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-medium-gray">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Government Use Cases"
            title="AI Fairness Oversight Across Public Programs"
            description="ParityScope enables government agencies and health plans to evaluate and monitor AI fairness across every program that affects beneficiary access to care."
            align="left"
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase) => (
              <div
                key={useCase.title}
                className="rounded-xl border border-light-gray bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <h3 className="text-h4 font-semibold text-navy">
                  {useCase.title}
                </h3>
                <p className="mt-3 text-body-sm text-medium-gray">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security and Deployment */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                Security-First Architecture
              </p>
              <h2 className="mt-3 text-h2 font-bold text-white">
                Beneficiary Data Never Leaves Your Environment
              </h2>
              <p className="mt-4 text-body-lg text-light-gray">
                ParityScope&apos;s SDK runs entirely on your infrastructure.
                Protected health information, beneficiary demographics, and AI
                system outputs stay behind your security perimeter. Only
                aggregated, de-identified fairness metrics are surfaced to
                oversight dashboards.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "SDK deploys on-premise or in your government cloud (GovCloud)",
                  "Zero beneficiary data exfiltration — HIPAA-ready by design",
                  "Compatible with FedRAMP, FISMA, and agency-specific requirements",
                  "Aggregated metrics only in oversight dashboards",
                  "Full audit trail stored within your security perimeter",
                  "Supports role-based access control and existing IAM systems",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-teal-light"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-light-gray">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="space-y-8">
                <div>
                  <p className="text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                    For Federal Agencies
                  </p>
                  <p className="mt-2 text-light-gray">
                    Deploy ParityScope within your ATO boundary. The SDK
                    integrates with existing data infrastructure and requires no
                    external network connections. Audit results and compliance
                    reports are generated and stored entirely within your
                    authorized environment.
                  </p>
                </div>
                <div className="border-t border-white/10 pt-8">
                  <p className="text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                    For State Medicaid Agencies
                  </p>
                  <p className="mt-2 text-light-gray">
                    Evaluate managed care organization AI systems using
                    ParityScope&apos;s vendor assessment tools. Require MCOs to
                    submit fairness evaluation data as part of contract
                    compliance, and monitor ongoing performance through
                    population-level dashboards.
                  </p>
                </div>
                <div className="border-t border-white/10 pt-8">
                  <p className="text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                    For Health Plans
                  </p>
                  <p className="mt-2 text-light-gray">
                    Monitor all AI systems used in coverage determinations,
                    utilization management, and member outreach. Generate
                    compliance reports that satisfy CMS regulatory requirements
                    and demonstrate algorithmic fairness to members and
                    regulators.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            title="Frequently Asked Questions"
            description="Common questions from government agencies and health plans evaluating ParityScope for AI fairness oversight."
          />
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Standardize AI Fairness Oversight?"
        description="Join government agencies and health plans using ParityScope to enforce equitable AI across public healthcare programs. Protect every beneficiary with standardized, scalable fairness governance."
        primaryCTA={{
          label: "Contact Our Government Team",
          href: "/contact",
        }}
        secondaryCTA={{ label: "View Platform Overview", href: "/product" }}
      />
    </>
  );
}
