import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { Accordion } from "@/components/ui/accordion";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "Government & Payers — Regulatory AI Compliance | ParityScope",
  description:
    "Meet AI regulatory mandates with confidence. Automated auditing, population-level fairness monitoring, and audit-ready compliance reports for government agencies and health plans.",
};

const painPoints = [
  {
    title: "Section 1557 Compliance",
    description:
      "The Affordable Care Act's Section 1557 prohibits discrimination in healthcare programs receiving federal funding. As AI tools become central to coverage decisions, utilization management, and care delivery, demonstrating non-discrimination requires systematic fairness auditing — not just policy statements.",
    stat: "Federal funding",
    statLabel: "at risk for non-compliance",
  },
  {
    title: "Medicaid & Medicare AI Auditing",
    description:
      "CMS is increasingly scrutinizing AI-driven prior authorization, risk adjustment, and care management tools. Algorithms that systematically disadvantage beneficiaries based on race, disability, or socioeconomic status expose your agency to enforcement action and public accountability.",
    stat: "87M+",
    statLabel: "Medicare beneficiaries affected by AI decisions",
  },
  {
    title: "Health Equity Mandates",
    description:
      "Executive orders, legislative mandates, and agency directives are setting measurable health equity goals. If the AI systems your agency deploys or oversees exacerbate disparities, you are working against your own mandates. Automated monitoring is the only way to verify alignment at scale.",
    stat: "100%",
    statLabel: "of states have health equity initiatives",
  },
  {
    title: "Constituent Trust",
    description:
      "Public trust in government AI is fragile. A single report of biased algorithmic decision-making — in eligibility determination, fraud detection, or care management — can erode years of trust-building. Proactive, transparent auditing demonstrates accountability before problems emerge.",
    stat: "72%",
    statLabel: "of Americans concerned about AI bias in healthcare",
  },
];

const solutionFeatures = [
  {
    title: "Automated Regulatory Auditing",
    description:
      "Schedule recurring fairness audits across all AI systems under your jurisdiction. ParityScope evaluates each system against 15+ fairness metrics for every protected attribute — race, gender, age, disability status, language, and socioeconomic indicators. Results map directly to regulatory requirements.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    title: "Population-Level Fairness Monitoring",
    description:
      "Track AI fairness across entire beneficiary populations — not just individual model performance. Monitor how AI systems affect Medicaid enrollees, Medicare beneficiaries, and vulnerable populations at the aggregate level. Identify systemic patterns that model-level audits miss.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Compliance Documentation",
    description:
      "Generate comprehensive compliance documentation that satisfies audit requirements. Every fairness evaluation is timestamped, version-controlled, and linked to the specific regulatory framework it addresses. Reports are structured for legislative reporting, GAO reviews, and IG investigations.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: "Audit-Ready Reports",
    description:
      "When oversight bodies, legislative committees, or the public request evidence of AI fairness, your documentation is ready in seconds. ParityScope produces detailed, human-readable reports with metric-by-metric breakdowns, trend analysis, and remediation histories.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
      </svg>
    ),
  },
];

const regulations = [
  {
    title: "EU AI Act",
    href: "/regulations/eu-ai-act",
    jurisdiction: "European Union",
    articles: "Articles 9, 10, 15",
    description:
      "High-risk AI conformity assessment with mandatory bias testing, data governance requirements, and ongoing post-market monitoring. Healthcare AI systems are classified as high-risk by default.",
    penalty: "Up to \u20AC35M or 7% of global revenue",
    coverage: [
      "Automated bias testing against required metrics",
      "Data governance documentation per Article 10",
      "Post-market surveillance reports per Article 72",
      "Technical documentation per Article 11",
    ],
  },
  {
    title: "Section 1557",
    href: "/regulations/section-1557",
    jurisdiction: "United States",
    articles: "Anti-Discrimination",
    description:
      "Prohibits discrimination on the basis of race, color, national origin, sex, age, and disability in health programs receiving federal financial assistance. Increasingly applied to clinical decision support tools and utilization management AI.",
    penalty: "Federal funding at risk",
    coverage: [
      "Disparate impact analysis across protected classes",
      "Reasonable modification compliance for disability",
      "Language access fairness evaluation",
      "Intersectional discrimination detection",
    ],
  },
  {
    title: "South Korea AI Framework Act",
    href: "/regulations/south-korea",
    jurisdiction: "South Korea",
    articles: "AI Framework Act",
    description:
      "Establishes mandatory impact assessments for high-risk AI systems used in healthcare. Requires documented evidence of fairness evaluation and ongoing monitoring for bias drift.",
    penalty: "Compliance mandated for market access",
    coverage: [
      "High-risk AI impact assessment documentation",
      "Fairness evaluation evidence generation",
      "Bias drift monitoring and reporting",
      "Transparency and explainability documentation",
    ],
  },
  {
    title: "Taiwan AI Basic Law",
    href: "/regulations/taiwan",
    jurisdiction: "Taiwan",
    articles: "AI Basic Law",
    description:
      "Emerging regulatory framework establishing governance requirements for AI in healthcare. Emphasizes human rights protection, non-discrimination, and transparency in algorithmic decision-making.",
    penalty: "Compliance mandated for market access",
    coverage: [
      "Non-discrimination compliance testing",
      "Algorithmic transparency documentation",
      "Human rights impact assessment support",
      "Cross-border data governance alignment",
    ],
  },
];

const faqItems = [
  {
    question: "Can ParityScope audit AI systems we do not directly operate?",
    answer:
      "Yes. ParityScope evaluates model outputs — predictions and decisions — against demographic data. You do not need access to model internals. This is ideal for government agencies that need to audit AI systems operated by contractors, managed care organizations, or delegated entities. Provide the predictions and demographic data, and ParityScope handles the fairness evaluation.",
  },
  {
    question: "How does population-level monitoring differ from model-level auditing?",
    answer:
      "Model-level auditing evaluates a single AI system's fairness. Population-level monitoring aggregates the impact of all AI systems on a beneficiary population. For example, a Medicaid agency might have fair individual models for prior authorization, risk adjustment, and care management — but the combined effect on Black enrollees could still be disparate. Population-level monitoring catches systemic patterns that model-by-model auditing misses.",
  },
  {
    question: "Is ParityScope compatible with FedRAMP or StateRAMP requirements?",
    answer:
      "ParityScope's SDK runs entirely on your infrastructure, which means the software operates within your existing security boundary. Patient and beneficiary data never leaves your environment. Only aggregated, de-identified fairness metrics are produced. This architecture is designed to align with government security requirements, and we work with your security team to ensure compliance with your specific authorization framework.",
  },
  {
    question: "How quickly can we generate reports for legislative inquiries?",
    answer:
      "If continuous monitoring is active, compliance reports can be generated in seconds. Reports include metric-by-metric fairness breakdowns, trend analysis over any time period, per-model compliance status, and remediation history. For initial audits of previously unmonitored systems, a comprehensive report is typically available within hours of data ingestion.",
  },
  {
    question: "Can we set different fairness thresholds for different programs?",
    answer:
      "Absolutely. ParityScope supports hierarchical threshold configuration. You can set agency-wide minimum standards, then apply stricter thresholds for specific programs — such as heightened scrutiny for Medicaid managed care AI or Medicare Advantage risk adjustment models. Each program's thresholds are independently configurable and auditable.",
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
            Meet Regulatory Mandates{" "}
            <span className="text-teal">With Confidence</span>
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-light-gray">
            Government agencies and health plans must ensure that AI systems
            treat every beneficiary fairly. ParityScope provides automated
            auditing, population-level monitoring, and audit-ready compliance
            documentation across every regulatory framework.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Contact Us
            </Link>
            <Link
              href="/product"
              className="rounded-full border border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Explore the Platform
            </Link>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="The Challenge"
            title="AI Accountability in the Public Sector"
            description="As AI adoption grows across government healthcare programs, the obligation to demonstrate fairness and non-discrimination grows with it."
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

      {/* Solution Features */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="The Solution"
            title="Automated AI Fairness Governance for the Public Sector"
            description="ParityScope gives government agencies and health plans the tools to audit, monitor, and document AI fairness at the scale your programs demand."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {solutionFeatures.map((feature) => (
              <div
                key={feature.title}
                className="flex gap-5 rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-teal">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-h4 font-semibold text-navy">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-medium-gray">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Coverage */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Regulatory Coverage"
            title="One Platform, Global Compliance"
            description="ParityScope maps audit results to specific regulatory requirements across four jurisdictions. One audit run generates compliance evidence for every framework that applies to your programs."
          />
          <div className="mt-16 space-y-8">
            {regulations.map((reg) => (
              <div
                key={reg.title}
                className="rounded-xl border border-light-gray p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="grid gap-8 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3">
                      <p className="text-caption font-semibold uppercase tracking-wider text-teal">
                        {reg.jurisdiction}
                      </p>
                      <span className="text-caption text-medium-gray">
                        {reg.articles}
                      </span>
                    </div>
                    <Link
                      href={reg.href}
                      className="group mt-2 inline-block"
                    >
                      <h3 className="text-h3 font-bold text-navy group-hover:text-teal">
                        {reg.title}
                      </h3>
                    </Link>
                    <p className="mt-3 text-medium-gray">{reg.description}</p>
                    <p className="mt-3 text-body-sm font-medium text-coral">
                      {reg.penalty}
                    </p>
                  </div>
                  <div>
                    <p className="text-body-sm font-semibold text-navy">
                      ParityScope Coverage
                    </p>
                    <ul className="mt-3 space-y-2">
                      {reg.coverage.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <svg
                            className="mt-0.5 h-4 w-4 shrink-0 text-teal"
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
                          <span className="text-body-sm text-medium-gray">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Public Accountability Callout */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                Public Accountability
              </p>
              <h2 className="mt-3 text-h2 font-bold text-white">
                Demonstrate Algorithmic Accountability to Constituents
              </h2>
              <p className="mt-4 text-body-lg text-light-gray">
                Transparency is not optional in the public sector. ParityScope
                gives you the evidence base to demonstrate that AI systems used
                in government healthcare programs are fair, monitored, and
                continuously improved.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Audit-ready reports for legislative oversight committees",
                  "Population-level disparity tracking across programs",
                  "Timestamped evidence of proactive monitoring",
                  "Remediation history showing corrective actions taken",
                  "Exportable data for public transparency reports",
                  "Compatible with government security environments",
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
              <p className="text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                Sample Compliance Report
              </p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-light-gray">Program</span>
                  <span className="font-semibold text-white">
                    Medicaid Managed Care
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-light-gray">AI Systems Audited</span>
                  <span className="font-semibold text-white">12</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-light-gray">Protected Attributes</span>
                  <span className="font-semibold text-white">8</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-light-gray">Fairness Metrics</span>
                  <span className="font-semibold text-white">15</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-light-gray">Compliant Systems</span>
                  <span className="font-semibold text-green">10 of 12</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-light-gray">
                    Remediation In Progress
                  </span>
                  <span className="font-semibold text-amber">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-light-gray">Report Generated</span>
                  <span className="text-body-sm text-medium-gray">
                    March 3, 2026 14:32 UTC
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases for Government */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Applications"
            title="AI Fairness Across Government Healthcare Programs"
            description="ParityScope supports fairness governance wherever AI touches beneficiary decisions."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Prior Authorization AI",
                description:
                  "Ensure AI-driven prior authorization decisions do not systematically deny care to specific demographic groups. Monitor approval rates, denial rates, and appeal outcomes across all protected attributes.",
              },
              {
                title: "Risk Adjustment Models",
                description:
                  "Validate that risk adjustment algorithms accurately capture health status across all populations. Detect when models systematically under-predict risk for minority groups, leading to inadequate resource allocation.",
              },
              {
                title: "Fraud Detection Systems",
                description:
                  "Audit fraud detection AI to ensure it does not disproportionately flag providers serving minority communities. Unfair fraud detection creates a chilling effect on care access for vulnerable populations.",
              },
              {
                title: "Eligibility Determination",
                description:
                  "Monitor AI-assisted eligibility determination for disparate impact. Ensure that algorithms processing Medicaid applications, disability assessments, and benefit calculations treat every applicant equitably.",
              },
              {
                title: "Care Management Algorithms",
                description:
                  "Audit care management AI that identifies patients for outreach, intervention programs, and high-risk care coordination. Ensure these tools equitably allocate attention across all beneficiary populations.",
              },
              {
                title: "Quality Measurement AI",
                description:
                  "Validate that AI-assisted quality measurement and reporting tools accurately capture care quality across demographic groups. Prevent measurement bias from distorting provider incentives and resource allocation.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-light-gray p-6 shadow-card transition-shadow hover:shadow-card-hover"
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

      {/* FAQ */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            title="Frequently Asked Questions"
            description="Common questions from government agencies and health plans evaluating ParityScope."
          />
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Meet AI Regulatory Mandates With Confidence?"
        description="Join government agencies and health plans using ParityScope to ensure fair, accountable, and transparent AI across their healthcare programs."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{ label: "Explore the Platform", href: "/product" }}
      />
    </>
  );
}
