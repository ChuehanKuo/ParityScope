import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";
import { Accordion } from "@/components/ui/accordion";
import { FeatureCard } from "@/components/ui/feature-card";

export const metadata: Metadata = {
  title: "EU AI Act Compliance for Healthcare AI | ParityScope",
  description:
    "Navigate EU AI Act requirements for high-risk healthcare AI systems. ParityScope automates compliance with Articles 9, 10, 13, 15, and 61 — bias testing, documentation, and post-market monitoring.",
};

const articles = [
  {
    article: "Article 9",
    name: "Risk Management System",
    requirement:
      "Establish and maintain a continuous risk management system throughout the AI system lifecycle, including identification of known and foreseeable risks to health and safety, estimation and evaluation of risks arising from intended use and reasonably foreseeable misuse, and adoption of suitable risk management measures. The system must be iterative, planned, and run throughout the entire lifecycle.",
    parityscope:
      "ParityScope provides automated risk identification across 15+ fairness metrics, continuous risk scoring tied to protected subgroups, and audit-ready risk management documentation that maps directly to Article 9 requirements. Risk assessments are versioned and timestamped for full traceability.",
    metrics: ["demographic_parity", "equal_opportunity", "equalized_odds"],
  },
  {
    article: "Article 10",
    name: "Data & Data Governance",
    requirement:
      "Training, validation, and testing datasets must be subject to appropriate data governance and management practices — including examination for possible biases that are likely to affect health and safety, gap identification in geographic, behavioral, or functional coverage, and measures to address shortcomings. Datasets must be relevant, sufficiently representative, and to the best extent possible free of errors and complete.",
    parityscope:
      "Automated dataset bias scanning detects representation gaps and label imbalances across all protected attributes. ParityScope generates data governance reports with statistical evidence of dataset fitness, subgroup coverage analysis, and documented remediation steps that satisfy Article 10(2)(f) requirements.",
    metrics: ["demographic_parity", "calibration_ratio", "group_calibration"],
  },
  {
    article: "Article 13",
    name: "Transparency & Provision of Information",
    requirement:
      "High-risk AI systems must be designed and developed to ensure their operation is sufficiently transparent to enable deployers to interpret the system output and use it appropriately. An appropriate type and degree of transparency must be ensured, with a view to achieving compliance with the obligations of the provider and deployer.",
    parityscope:
      "ParityScope generates human-readable fairness reports with metric explanations, confidence intervals, and subgroup breakdowns that satisfy transparency obligations. Reports include plain-language interpretations suitable for both technical teams and clinical governance boards.",
    metrics: ["predictive_parity", "calibration_ratio", "group_calibration"],
  },
  {
    article: "Article 15",
    name: "Accuracy, Robustness & Cybersecurity",
    requirement:
      "High-risk AI systems must achieve appropriate levels of accuracy, robustness, and cybersecurity, and perform consistently throughout their lifecycle for the persons or groups on which the system is intended to be used. Accuracy metrics must be declared in the accompanying instructions of use.",
    parityscope:
      "Continuous performance monitoring across all demographic subgroups ensures accuracy parity is maintained over time. ParityScope tracks equalized odds and equal opportunity metrics to detect group-specific performance degradation, generating accuracy declarations that map to Article 15(1) and 15(3) requirements.",
    metrics: ["equal_opportunity", "equalized_odds", "predictive_parity"],
  },
  {
    article: "Article 61",
    name: "Post-Market Monitoring",
    requirement:
      "Providers must establish and document a post-market monitoring system proportionate to the nature and risks of the AI system, actively and systematically collecting, documenting, and analyzing relevant data provided by deployers or collected through other sources on the performance of the high-risk AI system throughout its lifetime.",
    parityscope:
      "Built-in post-market monitoring dashboards track fairness metrics in production, trigger automated alerts on metric threshold breaches, and generate periodic compliance reports required under Article 61. Integration with clinical data pipelines ensures continuous real-world performance validation.",
    metrics: ["demographic_parity", "equal_opportunity", "equalized_odds", "calibration_ratio"],
  },
];

const timelineEvents = [
  {
    date: "August 1, 2024",
    event: "EU AI Act enters into force",
    detail:
      "The regulation was published in the Official Journal of the European Union and formally entered into force 20 days after publication. The phased transition period begins.",
  },
  {
    date: "February 2, 2025",
    event: "Prohibited AI practices banned",
    detail:
      "AI systems with unacceptable risk are prohibited, including social scoring systems, manipulative AI targeting vulnerabilities, and certain biometric identification systems used by law enforcement in public spaces.",
  },
  {
    date: "August 2, 2025",
    event: "General-purpose AI model rules apply",
    detail:
      "Obligations for providers of general-purpose AI models take effect, including transparency requirements, copyright compliance, and systemic risk assessments for models with significant capabilities.",
  },
  {
    date: "August 2, 2026",
    event: "High-risk AI system obligations apply",
    detail:
      "Full compliance required for standalone high-risk AI systems listed in Annex III, including clinical decision support, diagnostic AI, and treatment recommendation systems. Conformity assessments, risk management, and technical documentation obligations take effect.",
  },
  {
    date: "August 2, 2027",
    event: "Full enforcement for embedded high-risk systems",
    detail:
      "Obligations for high-risk AI systems embedded in products regulated by EU harmonization legislation take effect — including medical devices under MDR 2017/745 and in vitro diagnostics under IVDR 2017/746. Full penalty regime in force.",
  },
];

const metricMappings = [
  {
    metric: "demographic_parity",
    display: "Demographic Parity",
    articles: ["Article 10", "Article 15"],
    description:
      "Measures whether the selection rate is equal across protected groups. Directly addresses Article 10 dataset representativeness and Article 15 consistent performance requirements.",
  },
  {
    metric: "equal_opportunity",
    display: "Equal Opportunity",
    articles: ["Article 9", "Article 15"],
    description:
      "Ensures true positive rates are equalized across groups. Maps to Article 9 risk identification for group-specific harms and Article 15 accuracy parity obligations.",
  },
  {
    metric: "equalized_odds",
    display: "Equalized Odds",
    articles: ["Article 9", "Article 15"],
    description:
      "Requires both true positive and false positive rates to be equal across groups. Satisfies Article 15 robustness requirements by ensuring consistent error profiles.",
  },
  {
    metric: "predictive_parity",
    display: "Predictive Parity",
    articles: ["Article 13", "Article 15"],
    description:
      "Verifies that positive predictive value is consistent across groups. Supports Article 13 transparency by ensuring predictions are equally reliable for all populations.",
  },
  {
    metric: "calibration_ratio",
    display: "Calibration Ratio",
    articles: ["Article 10", "Article 13"],
    description:
      "Assesses whether predicted probabilities match observed outcomes across groups. Addresses Article 10 data quality and Article 13 interpretability of outputs.",
  },
  {
    metric: "group_calibration",
    display: "Group Calibration",
    articles: ["Article 10", "Article 13", "Article 15"],
    description:
      "Evaluates calibration across all defined subgroups simultaneously. Comprehensive metric spanning data governance, transparency, and accuracy requirements.",
  },
];

const complianceChecklist = [
  {
    category: "Risk Management (Article 9)",
    items: [
      "Establish an iterative risk management system covering the full AI lifecycle",
      "Identify and document known and foreseeable risks to health, safety, and fundamental rights",
      "Implement risk mitigation measures with quantifiable residual risk thresholds",
      "Conduct regular risk reassessment with fairness metrics as risk indicators",
    ],
  },
  {
    category: "Data Governance (Article 10)",
    items: [
      "Document data collection processes, sources, and original purpose of data",
      "Perform statistical bias examination across all protected attributes",
      "Validate dataset representativeness against intended deployment population",
      "Implement data gap analysis and remediation procedures",
    ],
  },
  {
    category: "Transparency (Article 13)",
    items: [
      "Generate human-readable documentation of system capabilities and limitations",
      "Provide deployer instructions including accuracy metrics by subgroup",
      "Document fairness metric results with confidence intervals",
      "Publish interpretive guides for non-technical clinical governance stakeholders",
    ],
  },
  {
    category: "Accuracy & Robustness (Article 15)",
    items: [
      "Declare accuracy levels and accuracy metrics in instructions for use",
      "Test for consistent performance across demographic subgroups",
      "Validate robustness against data distribution shifts",
      "Implement continuous monitoring with automated degradation alerts",
    ],
  },
  {
    category: "Post-Market Monitoring (Article 61)",
    items: [
      "Establish and document a post-market monitoring plan",
      "Implement automated collection of production performance data",
      "Define threshold-based alerting for fairness metric deviations",
      "Generate periodic compliance reports for notified bodies and market surveillance authorities",
    ],
  },
];

const penalties = [
  {
    tier: "Tier 1 — Prohibited Practices",
    fine: "EUR 35 million or 7% of global annual turnover",
    scope:
      "Violations of Article 5 prohibitions: deploying banned AI systems such as social scoring, subliminal manipulation techniques, or exploiting vulnerabilities of specific groups.",
  },
  {
    tier: "Tier 2 — High-Risk Obligations",
    fine: "EUR 15 million or 3% of global annual turnover",
    scope:
      "Non-compliance with high-risk AI system requirements under Title III, Chapter 2 — including data governance, transparency, accuracy, risk management, and post-market monitoring obligations. This is the most relevant tier for healthcare AI.",
  },
  {
    tier: "Tier 3 — Information Obligations",
    fine: "EUR 7.5 million or 1% of global annual turnover",
    scope:
      "Supplying incorrect, incomplete, or misleading information to notified bodies or national competent authorities in response to requests.",
  },
];

const faqItems = [
  {
    question:
      "Is healthcare AI always classified as high-risk under the EU AI Act?",
    answer:
      "Yes. Under Annex III, Section 5(b), AI systems intended to be used for making decisions or materially influencing decisions about healthcare service provision — including clinical decision support, triage, diagnosis assistance, and treatment recommendations — are classified as high-risk. This classification triggers the full set of obligations under Title III, Chapter 2 of the Act, regardless of the risk level the provider might self-assign.",
  },
  {
    question:
      "What are the penalties for non-compliance with the EU AI Act?",
    answer:
      "Penalties are tiered by severity. For prohibited AI practices, fines can reach up to EUR 35 million or 7% of global annual turnover, whichever is higher. For violations of high-risk AI obligations — the category most relevant to healthcare — fines can reach EUR 15 million or 3% of global annual turnover. For supplying incorrect information to authorities, fines can reach EUR 7.5 million or 1% of global annual turnover. SMEs and startups may receive proportionally lower penalties.",
  },
  {
    question:
      "Does the EU AI Act apply to companies outside the European Union?",
    answer:
      "Yes. The EU AI Act has extraterritorial reach under Article 2. It applies to any provider placing an AI system on the EU market or putting it into service in the EU, regardless of where the provider is established. It also applies to deployers of AI systems located within the EU, and to providers and deployers located outside the EU when the output produced by the AI system is used in the EU. This means US-based healthcare AI vendors selling to European hospitals must comply.",
  },
  {
    question:
      "What technical documentation is required for high-risk healthcare AI?",
    answer:
      "Under Annex IV, high-risk AI systems require extensive technical documentation including: a general description of the system and its intended purpose, detailed information about development methodology and design choices, data governance and management practices covering training, validation, and testing data, the risk management system documentation, a description of monitoring, functioning, and control processes, conformity assessment records, and an EU declaration of conformity. ParityScope generates the bias testing, fairness metric, and monitoring documentation components automatically.",
  },
  {
    question:
      "How does ParityScope help with conformity assessments under the EU AI Act?",
    answer:
      "ParityScope provides the quantitative evidence base for conformity assessments by generating comprehensive fairness audit reports with statistical rigor, documenting risk management measures with metric-backed evidence, providing continuous monitoring data that demonstrates ongoing compliance, and creating timestamped audit trails. While ParityScope does not replace the conformity assessment body itself, it produces the critical bias, fairness, and accuracy parity documentation that notified bodies will require.",
  },
  {
    question:
      "Which fairness metrics does ParityScope map to EU AI Act articles?",
    answer:
      "ParityScope maps six key metrics to EU AI Act requirements: demographic_parity and calibration_ratio for Article 10 data governance, predictive_parity and group_calibration for Article 13 transparency, and equal_opportunity and equalized_odds for Article 15 accuracy and robustness. The regulation-aware engine automatically selects the relevant metrics for your use case and generates jurisdiction-specific PDF compliance reports that reference the applicable articles.",
  },
  {
    question:
      "How does the EU AI Act interact with the Medical Device Regulation (MDR)?",
    answer:
      "AI systems that qualify as medical devices under MDR 2017/745 or IVDR 2017/746 are subject to both regulations. The EU AI Act explicitly states that for these products, conformity assessment under the AI Act is integrated into the existing MDR/IVDR assessment process. The notified body conducting the MDR assessment will also verify AI Act compliance. Full enforcement for these embedded high-risk systems begins August 2027, one year after standalone high-risk system obligations take effect.",
  },
  {
    question:
      "What is the role of national competent authorities in EU AI Act enforcement?",
    answer:
      "Each EU Member State must designate at least one national competent authority and a market surveillance authority responsible for supervising AI Act compliance. These authorities have the power to conduct audits, request access to documentation, order corrective actions, and impose fines. For healthcare AI, enforcement will often involve coordination between the AI market surveillance authority and the existing medical device competent authority in each Member State.",
  },
];

export default function EuAiActPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-wider text-teal-light">
            EU AI Act
          </p>
          <h1 className="mt-3 text-display font-bold text-white">
            EU AI Act Compliance for Healthcare AI
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            Healthcare AI systems are classified as{" "}
            <strong className="text-white">high-risk under Annex III</strong> of
            the EU AI Act — the world&apos;s first comprehensive AI regulation.
            Non-compliance carries penalties of up to{" "}
            <strong className="text-coral-light">
              EUR 35 million or 7% of global annual turnover
            </strong>
            . Full enforcement for standalone high-risk healthcare AI begins{" "}
            <strong className="text-white">August 2026</strong>, with embedded
            medical device AI following in August 2027. ParityScope automates
            the bias testing, documentation, and monitoring your organization
            needs to comply.
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
              Download EU AI Act Guide
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
            description="The EU AI Act is the world's first comprehensive AI regulation. Here are the critical facts for healthcare AI providers and deployers operating in or selling into the European Union."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                stat: "High-Risk",
                label: "Classification",
                text: "All healthcare AI systems fall under Annex III, Category 5(b) — AI intended to be used in healthcare. This triggers the strictest compliance obligations under Title III, Chapter 2, including mandatory conformity assessments, risk management systems, and technical documentation.",
              },
              {
                stat: "EUR 35M",
                label: "Maximum Penalty",
                text: "Fines for prohibited AI practices reach EUR 35 million or 7% of global annual turnover. High-risk obligation violations carry fines up to EUR 15 million or 3% of turnover. Even information supply violations carry EUR 7.5 million penalties.",
              },
              {
                stat: "Aug 2026",
                label: "High-Risk Enforcement",
                text: "Standalone high-risk healthcare AI systems must be fully compliant by August 2026. Systems embedded in medical devices under MDR/IVDR have until August 2027. Organizations should be building compliance infrastructure now.",
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

      {/* Relevant Articles */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Regulatory Mapping"
            title="Relevant Articles & How ParityScope Helps"
            description="The EU AI Act imposes specific obligations on high-risk AI systems. ParityScope maps directly to the articles most critical for healthcare AI compliance, with automated metric tracking for each."
          />
          <div className="mt-12 space-y-6">
            {articles.map((item) => (
              <div
                key={item.article}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="lg:w-1/2">
                    <p className="text-body-sm font-semibold uppercase tracking-wider text-teal">
                      {item.article}
                    </p>
                    <h3 className="mt-1 text-h3 font-bold text-navy">
                      {item.name}
                    </h3>
                    <p className="mt-3 text-body text-medium-gray">
                      {item.requirement}
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

      {/* Metric-to-Article Mapping */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Fairness Metrics"
            title="ParityScope Metric-to-Article Mapping"
            description="ParityScope's regulation-aware engine maps specific fairness metrics to each EU AI Act article, generating jurisdiction-specific PDF compliance reports with article-level references."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {metricMappings.map((mapping) => (
              <div
                key={mapping.metric}
                className="rounded-xl border border-light-gray bg-white p-6 shadow-card"
              >
                <code className="rounded bg-navy/5 px-2 py-1 text-sm font-semibold text-navy">
                  {mapping.metric}
                </code>
                <h3 className="mt-3 text-h4 font-bold text-navy">
                  {mapping.display}
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {mapping.articles.map((a) => (
                    <span
                      key={a}
                      className="rounded-full bg-teal/10 px-2.5 py-0.5 text-xs font-semibold text-teal"
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-sm text-medium-gray">
                  {mapping.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Checklist */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Compliance Checklist"
            title="EU AI Act Healthcare Compliance Checklist"
            description="A practical checklist for healthcare AI providers and deployers preparing for EU AI Act compliance. ParityScope automates the bias testing and documentation items."
          />
          <div className="mt-12 space-y-8">
            {complianceChecklist.map((section) => (
              <div
                key={section.category}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <h3 className="text-h4 font-bold text-navy">
                  {section.category}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-teal">
                        <span className="h-2 w-2 rounded-sm bg-teal" />
                      </span>
                      <span className="text-body text-medium-gray">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Timeline */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Timeline"
            title="EU AI Act Enforcement Timeline"
            description="The EU AI Act follows a phased enforcement schedule. Healthcare organizations must plan their compliance roadmap around these key dates."
          />
          <div className="relative mt-12">
            <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-light-gray md:left-1/2 md:block" />
            <div className="space-y-10">
              {timelineEvents.map((event, index) => (
                <div
                  key={event.date}
                  className={`relative flex flex-col gap-4 md:flex-row ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="md:w-1/2 md:px-8">
                    <div
                      className={`rounded-xl border border-light-gray bg-white p-6 shadow-card ${
                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <p className="text-body-sm font-semibold text-teal">
                        {event.date}
                      </p>
                      <h3 className="mt-1 text-h4 font-bold text-navy">
                        {event.event}
                      </h3>
                      <p className="mt-2 text-body text-medium-gray">
                        {event.detail}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-2.5 top-6 hidden h-4 w-4 rounded-full border-4 border-teal bg-white md:left-1/2 md:-ml-2 md:block" />
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Penalty Structure */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Penalties"
            title="EU AI Act Penalty Structure"
            description="The EU AI Act establishes a three-tiered penalty regime. For healthcare AI providers, Tier 2 penalties for high-risk obligation violations represent the primary compliance risk."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {penalties.map((penalty) => (
              <div
                key={penalty.tier}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <h3 className="text-h4 font-bold text-navy">{penalty.tier}</h3>
                <p className="mt-2 text-h3 font-bold text-coral">
                  {penalty.fine}
                </p>
                <p className="mt-4 text-body text-medium-gray">
                  {penalty.scope}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-medium-gray">
            For SMEs and startups, the EU AI Act provides for proportionally
            lower penalty caps. However, all organizations are subject to the
            same substantive compliance obligations regardless of size.
          </p>
        </div>
      </section>

      {/* How ParityScope Automates Compliance */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Automation"
            title="How ParityScope Automates EU AI Act Compliance"
            description="ParityScope's SDK-first approach provides programmatic access to every compliance capability, ensuring HIPAA-compliant data handling while generating the documentation the EU AI Act demands."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<span className="text-xl">&#x1F4CA;</span>}
              title="Automated Fairness Audits"
              description="Run comprehensive fairness audits against all six EU AI Act-mapped metrics with a single SDK call. Results include Article-level compliance mappings, confidence intervals, and subgroup breakdowns."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F4C4;</span>}
              title="Jurisdiction-Specific PDF Reports"
              description="Generate EU AI Act-specific compliance reports in PDF format with article references, metric results, and remediation guidance. Reports are structured for submission to notified bodies."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F50D;</span>}
              title="Dataset Bias Scanning"
              description="Automated Article 10 compliance through statistical analysis of training data representation, label distribution, and coverage gaps across protected attributes."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x26A0;&#xFE0F;</span>}
              title="Continuous Risk Monitoring"
              description="Post-market monitoring dashboards satisfy Article 61 by tracking production metrics, detecting distribution drift, and triggering alerts before compliance gaps emerge."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F512;</span>}
              title="HIPAA-Compliant Architecture"
              description="SDK-first design ensures patient data never leaves your infrastructure. All fairness computations run locally, with only aggregate metrics transmitted — maintaining HIPAA compliance alongside EU AI Act obligations."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F4DD;</span>}
              title="Audit Trail & Versioning"
              description="Every audit, metric calculation, and report is timestamped and versioned. Full traceability from raw data through metric computation to final compliance report — exactly what conformity assessors require."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            title="Frequently Asked Questions"
            description="Common questions about EU AI Act compliance for healthcare AI systems."
          />
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Start Your EU AI Act Compliance Journey"
        description="ParityScope automates the fairness testing, documentation, and monitoring required by the EU AI Act. Build your compliance infrastructure before enforcement begins in August 2026."
        primaryCTA={{ label: "Request a Demo", href: "/contact" }}
        secondaryCTA={{
          label: "Read the Whitepaper",
          href: "/resources/whitepapers",
        }}
      />
    </main>
  );
}
