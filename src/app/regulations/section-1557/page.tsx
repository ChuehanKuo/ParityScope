import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";
import { Accordion } from "@/components/ui/accordion";
import { FeatureCard } from "@/components/ui/feature-card";

export const metadata: Metadata = {
  title: "Section 1557 Compliance for Healthcare AI | ParityScope",
  description:
    "Navigate Section 1557 of the ACA and the 2024 HHS Final Rule extending nondiscrimination requirements to clinical algorithms and AI. ParityScope automates bias testing, documentation, and OCR-ready compliance reporting.",
};

const protectedClasses = [
  {
    name: "Race",
    statute: "Title VI of the Civil Rights Act of 1964",
    description:
      "Prohibits discrimination on the basis of race in any program or activity receiving federal financial assistance. Extends to clinical algorithms that produce disparate outcomes across racial groups.",
    metrics:
      "Demographic parity, equal opportunity, and treatment equality across racial categories with statistical significance testing.",
  },
  {
    name: "Color",
    statute: "Title VI of the Civil Rights Act of 1964",
    description:
      "Prohibits discrimination on the basis of color, treated as a distinct protected class from race. AI systems must demonstrate equitable outcomes regardless of skin color or complexion-related features.",
    metrics:
      "Subgroup analysis within and across racial categories to detect colorism-related disparities in AI outputs.",
  },
  {
    name: "National Origin",
    statute: "Title VI of the Civil Rights Act of 1964",
    description:
      "Prohibits discrimination based on national origin, including language-based disparities. Healthcare AI must account for linguistic and cultural factors that may produce discriminatory outputs.",
    metrics:
      "Fairness metric evaluation across national origin subgroups with proxy detection for language and name-based features.",
  },
  {
    name: "Sex",
    statute: "Title IX of the Education Amendments of 1972",
    description:
      "Prohibits sex-based discrimination, including on the basis of sexual orientation and gender identity under the 2024 Final Rule. Clinical algorithms must not produce disparate treatment based on sex or gender.",
    metrics:
      "Gender parity analysis, intersectional testing (e.g., race x sex), and calibration testing across sex and gender identity categories.",
  },
  {
    name: "Age",
    statute: "Age Discrimination Act of 1975",
    description:
      "Prohibits age-based discrimination in federally funded programs. Healthcare AI systems must ensure equitable recommendations across age groups unless clinically justified differential treatment exists.",
    metrics:
      "Age-stratified performance analysis, calibration across age bands, and detection of age-correlated proxy features.",
  },
  {
    name: "Disability",
    statute: "Section 504 of the Rehabilitation Act of 1973",
    description:
      "Prohibits discrimination against individuals with disabilities. AI-driven clinical tools must be accessible and must not produce systematically worse outcomes for patients with disabilities.",
    metrics:
      "Disability status subgroup analysis, accessibility-aware fairness testing, and evaluation of missing data patterns that may systematically exclude disabled populations.",
  },
];

const metricMappings = [
  {
    metric: "demographic_parity",
    display: "Demographic Parity",
    requirement: "Equal selection/recommendation rates",
    description:
      "Measures whether a clinical algorithm recommends treatments, referrals, or resources at equal rates across protected classes. Directly addresses disparate impact claims under Title VI by quantifying outcome rate differences.",
  },
  {
    metric: "equal_opportunity",
    display: "Equal Opportunity",
    requirement: "Equal true positive rates",
    description:
      "Ensures that patients who would benefit from a clinical intervention are identified at equal rates across protected groups. Critical for screening algorithms, risk stratification tools, and referral systems where missed cases carry clinical consequences.",
  },
  {
    metric: "treatment_equality",
    display: "Treatment Equality",
    requirement: "Equal error rate ratios",
    description:
      "Compares the ratio of false negatives to false positives across groups. Ensures that the type and direction of algorithmic errors are equitably distributed — a key indicator for demonstrating nondiscriminatory intent under the burden-shifting framework.",
  },
  {
    metric: "false_positive_rate_parity",
    display: "False Positive Rate Parity",
    requirement: "Equal false alarm rates",
    description:
      "Ensures that healthy patients across all protected groups are equally unlikely to receive unnecessary interventions. Particularly important for diagnostic algorithms and alert systems where false positives carry clinical costs and patient burden.",
  },
];

const coveredEntities = [
  {
    entity: "Hospitals & Health Systems",
    description:
      "Any hospital or health system receiving federal financial assistance, including Medicare and Medicaid reimbursement. Virtually all US hospitals are covered entities under Section 1557 — Medicare alone covers approximately 65 million beneficiaries.",
  },
  {
    entity: "Health Insurance Issuers",
    description:
      "Health insurance issuers offering plans on ACA Marketplace exchanges, as well as insurers receiving federal subsidies. Includes utilization management algorithms and prior authorization AI systems that determine coverage decisions.",
  },
  {
    entity: "Physicians & Clinical Practices",
    description:
      "Any physician or clinical practice accepting Medicare, Medicaid, or other federal healthcare funding. Includes the use of AI-powered clinical decision support tools embedded in EHR systems for patient care workflows.",
  },
  {
    entity: "State & Local Health Agencies",
    description:
      "Public health departments and government agencies administering health programs with federal funding. Includes AI systems used for population health management, disease surveillance, and resource allocation decisions.",
  },
  {
    entity: "Telehealth & Digital Health Platforms",
    description:
      "Digital health platforms and telehealth providers operating within covered entity networks or receiving federal funding. AI-driven triage, symptom assessment, and care routing algorithms are subject to nondiscrimination requirements.",
  },
];

const enforcementTimeline = [
  {
    date: "March 2010",
    event: "Section 1557 enacted as part of the ACA",
    detail:
      "Section 1557 of the Affordable Care Act is signed into law, establishing the first broad federal civil rights provision specific to healthcare. Incorporates protections from four existing civil rights statutes into a single healthcare-focused nondiscrimination requirement.",
  },
  {
    date: "May 2016",
    event: "Original HHS Final Rule published",
    detail:
      "The original implementing regulation established enforcement mechanisms, covered entity definitions, and compliance procedures. Did not specifically address AI, clinical algorithms, or automated decision-making tools.",
  },
  {
    date: "January 2024",
    event: "2024 Final Rule proposed with AI provisions",
    detail:
      "HHS proposed significant updates to Section 1557 regulations, explicitly extending nondiscrimination requirements to clinical algorithms, predictive models, and patient decision support tools used by covered entities in care delivery.",
  },
  {
    date: "May 2024",
    event: "2024 Final Rule published in Federal Register",
    detail:
      "The updated Final Rule was published, codifying that covered entities must not discriminate through the use of clinical algorithms. The rule specifically addresses AI-driven decision support, utilization management, risk assessment, and care allocation tools.",
  },
  {
    date: "July 2024",
    event: "Core compliance obligations take effect",
    detail:
      "Most provisions of the 2024 Final Rule become effective. Covered entities must ensure clinical algorithms do not result in discrimination and must take reasonable steps to identify and mitigate discriminatory outcomes across all six protected classes.",
  },
];

const ocrEnforcementProcess = [
  {
    step: "1",
    title: "Complaint Filed or Compliance Review Initiated",
    description:
      "OCR receives a complaint from a patient, provider, or advocacy organization, or initiates a directed compliance review. Complaints must generally be filed within 180 days of the alleged discriminatory act, though OCR may extend this period for good cause.",
  },
  {
    step: "2",
    title: "Investigation & Data Collection",
    description:
      "OCR investigates the complaint by requesting documentation from the covered entity — including algorithm specifications, fairness testing records, validation data, outcome data disaggregated by protected class, and any bias mitigation measures taken.",
  },
  {
    step: "3",
    title: "Findings & Determination",
    description:
      "OCR issues findings of compliance, noncompliance, or insufficient evidence. Noncompliance findings trigger resolution efforts. OCR evaluates whether the entity took reasonable steps to identify and address discriminatory algorithmic outcomes.",
  },
  {
    step: "4",
    title: "Resolution or Enforcement Action",
    description:
      "Remedies may include voluntary resolution agreements, corrective action plans requiring algorithm modification or removal, compensatory relief for affected patients, systemic policy changes, and ongoing monitoring. In severe cases, OCR may seek termination of federal financial assistance.",
  },
];

const recentEnforcementContext = [
  {
    area: "Algorithmic Risk Stratification",
    context:
      "HHS and academic researchers have identified risk stratification algorithms that use healthcare cost as a proxy for healthcare need, systematically disadvantaging Black patients who historically face barriers to accessing care and therefore generate lower costs despite higher clinical need. This led to widespread algorithm correction across major health systems.",
  },
  {
    area: "Utilization Management AI",
    context:
      "Insurance utilization management algorithms that deny or delay care authorizations at disparate rates across racial and ethnic groups have drawn OCR and Congressional scrutiny. Multiple state attorneys general have opened investigations into AI-driven prior authorization denials. The 2024 Final Rule explicitly brings these systems within Section 1557 scope.",
  },
  {
    area: "Race-Adjusted Clinical Calculators",
    context:
      "Race-adjusted clinical calculators — such as the eGFR calculation that historically included a race coefficient leading to underdiagnosis of kidney disease in Black patients — have been identified as discriminatory. The shift to race-neutral CKD-EPI 2021 formula demonstrates the regulatory trajectory for clinical algorithms.",
  },
  {
    area: "Sepsis Prediction Models",
    context:
      "Sepsis prediction algorithms deployed in EHR systems have shown differential performance across racial groups, with lower sensitivity for certain populations. These models, which influence clinical intervention timing, represent a growing area of algorithmic accountability under Section 1557.",
  },
];

const faqItems = [
  {
    question:
      "Does Section 1557 apply to AI systems and clinical algorithms?",
    answer:
      "Yes. The 2024 HHS Final Rule explicitly extends Section 1557 nondiscrimination requirements to clinical algorithms, including AI-driven decision support tools, risk stratification models, utilization management systems, and any automated or semi-automated tools used in clinical decision-making. Covered entities must ensure these tools do not discriminate on the basis of race, color, national origin, sex, age, or disability — regardless of whether the discrimination is intentional.",
  },
  {
    question:
      "What constitutes a covered entity under Section 1557?",
    answer:
      "Any entity that receives federal financial assistance is a covered entity. This includes virtually all hospitals (through Medicare and Medicaid reimbursement), most physician practices, health insurance issuers on ACA exchanges, state and local health agencies, and digital health platforms operating within covered entity networks. The reach is broad — even indirect federal funding triggers coverage. Third-party AI vendors may face contractual liability if their tools produce discriminatory results when used by covered entities.",
  },
  {
    question:
      "What is the difference between disparate treatment and disparate impact?",
    answer:
      "Disparate treatment involves intentional discrimination — treating patients differently because of a protected characteristic. Disparate impact involves facially neutral policies or algorithms that have a disproportionately adverse effect on a protected group without adequate justification. For AI systems, disparate impact is the primary concern: algorithms that do not explicitly use protected characteristics as inputs may still produce discriminatory outcomes through proxy variables, biased training data, or historically biased label definitions.",
  },
  {
    question:
      "What documentation should we maintain for Section 1557 compliance?",
    answer:
      "Covered entities should maintain comprehensive documentation including: an inventory of all clinical algorithms and AI tools in use, fairness testing results disaggregated by each protected class, bias mitigation measures taken and their quantified effectiveness, adverse impact analyses comparing outcomes across groups using the four-fifths rule and statistical significance tests, remediation records when disparities are identified, and ongoing monitoring reports demonstrating continuous compliance. ParityScope generates all of these documentation components automatically.",
  },
  {
    question:
      "Which ParityScope metrics map to Section 1557 requirements?",
    answer:
      "ParityScope maps four key metrics to Section 1557: demographic_parity for measuring equal selection and recommendation rates across groups, equal_opportunity for ensuring equitable identification of patients who need clinical intervention, treatment_equality for balancing error type ratios to demonstrate nondiscriminatory error distributions, and false_positive_rate_parity for preventing disproportionate false alarms. The SDK generates compliance reports with these metrics disaggregated across all six protected classes.",
  },
  {
    question:
      "What penalties exist for Section 1557 violations involving AI?",
    answer:
      "Enforcement remedies include voluntary resolution agreements requiring algorithm modification or removal, compensatory relief for affected patients, corrective action plans with ongoing monitoring, and in the most severe cases, termination of federal financial assistance — which for most healthcare organizations means loss of Medicare and Medicaid reimbursement (often 50-70% of revenue). Additionally, patients have a private right of action to sue covered entities, potentially resulting in compensatory damages, injunctive relief, and attorneys' fees.",
  },
  {
    question:
      "Can we still use race as a variable in clinical algorithms?",
    answer:
      "The use of race as an input variable in clinical algorithms is under intense scrutiny. While Section 1557 does not categorically prohibit race-aware clinical calculations, algorithms that include race must demonstrate clinical justification and must not produce discriminatory outcomes. The trend in regulation and clinical practice is strongly toward race-neutral algorithms — as demonstrated by the transition to race-free eGFR calculations. ParityScope helps organizations audit whether race-aware or race-proxy variables produce disparate outcomes and document the clinical justification when differential treatment is clinically warranted.",
  },
  {
    question:
      "Does Section 1557 require ongoing monitoring or just a one-time audit?",
    answer:
      "While Section 1557 does not prescribe a specific monitoring cadence, the 2024 Final Rule emphasizes that covered entities must take reasonable steps to ensure ongoing nondiscrimination. Because AI model behavior drifts over time as patient populations, clinical practices, and data distributions change, a one-time audit is generally insufficient to demonstrate reasonable compliance. ParityScope provides continuous monitoring that detects emergent disparities across protected classes, generating the ongoing compliance evidence that demonstrates a good-faith effort to maintain nondiscrimination.",
  },
];

export default function Section1557Page() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-wider text-teal-light">
            Section 1557 — Affordable Care Act
          </p>
          <h1 className="mt-3 text-display font-bold text-white">
            Section 1557 Compliance for Healthcare AI
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            The{" "}
            <strong className="text-white">
              2024 HHS Final Rule
            </strong>{" "}
            explicitly extends Section 1557 nondiscrimination requirements to{" "}
            <strong className="text-white">
              clinical algorithms and AI-driven decision support tools
            </strong>
            . Covered entities — virtually every US healthcare organization
            receiving federal funding — must ensure their AI systems do not
            discriminate on the basis of race, color, national origin, sex, age,
            or disability. The Office for Civil Rights (OCR) enforces compliance
            and can{" "}
            <strong className="text-coral-light">
              terminate federal financial assistance
            </strong>{" "}
            for violations.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Assess Your AI Compliance
            </Link>
            <Link
              href="/resources/whitepapers"
              className="rounded-full border border-white/30 px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Download Section 1557 Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Overview & Disparate Impact */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Overview"
            title="What Is Section 1557?"
            align="left"
          />
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <p className="text-body-lg text-medium-gray">
                Section 1557 is the nondiscrimination provision of the Affordable
                Care Act (ACA). It prohibits discrimination on the basis of race,
                color, national origin, sex, age, or disability in health programs
                and activities receiving federal financial assistance, administered
                by federal agencies, or established under Title I of the ACA.
              </p>
              <p className="mt-4 text-body-lg text-medium-gray">
                The 2024 Final Rule under Section 1557 explicitly addresses the
                use of clinical algorithms, predictive models, and AI tools in
                healthcare decision-making. Covered entities are responsible for
                ensuring that AI systems used in treatment decisions, risk
                stratification, and resource allocation do not produce
                discriminatory outcomes — even when the discrimination is
                unintentional.
              </p>
            </div>
            <div className="rounded-xl border border-light-gray bg-off-white p-8">
              <h3 className="text-h4 font-bold text-navy">
                The Disparate Impact Standard
              </h3>
              <p className="mt-3 text-body text-medium-gray">
                Under the disparate impact doctrine, a covered entity can be held
                liable for discrimination even without discriminatory intent. The
                legal framework follows a burden-shifting analysis:
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-body text-medium-gray">
                <li>
                  <strong className="text-navy">Prima facie case:</strong> The
                  plaintiff demonstrates the AI system produces a statistically
                  significant adverse effect on a protected class.
                </li>
                <li>
                  <strong className="text-navy">Business necessity:</strong> The
                  defendant must show the practice serves a substantial legitimate
                  clinical interest.
                </li>
                <li>
                  <strong className="text-navy">Less discriminatory alternative:</strong>{" "}
                  The plaintiff can prevail by showing an equally effective
                  alternative with less discriminatory impact exists.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Enforcement"
            title="Consequences of Non-Compliance"
            description="Section 1557 violations carry significant financial and operational consequences for healthcare organizations."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Loss of Federal Funding",
                text: "Covered entities risk termination of all federal financial assistance, including Medicare and Medicaid reimbursement — often 50-70% of hospital revenue.",
              },
              {
                title: "Civil Monetary Penalties",
                text: "HHS Office for Civil Rights can impose significant civil monetary penalties for each violation, with amounts adjusted annually for inflation.",
              },
              {
                title: "Private Right of Action",
                text: "Affected individuals can bring private lawsuits seeking compensatory damages, injunctive relief, and in some cases attorneys' fees and punitive damages.",
              },
              {
                title: "Reputational Harm",
                text: "Enforcement actions and settlements are public. A finding of discrimination in healthcare AI creates lasting reputational damage and erodes patient trust.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-light-gray bg-white p-6 shadow-card"
              >
                <h3 className="text-h4 font-bold text-coral">
                  {item.title}
                </h3>
                <p className="mt-3 text-body text-medium-gray">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protected Classes */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Protected Classes"
            title="Six Protected Classes Under Section 1557"
            description="Section 1557 incorporates protections from four existing federal civil rights statutes. ParityScope tests for disparate impact across every protected class."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {protectedClasses.map((pc) => (
              <div
                key={pc.name}
                className="rounded-xl border border-light-gray bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <h3 className="text-h3 font-bold text-navy">{pc.name}</h3>
                <p className="mt-1 text-caption font-semibold text-teal">
                  {pc.statute}
                </p>
                <p className="mt-4 text-body text-medium-gray">
                  {pc.description}
                </p>
                <div className="mt-4 rounded-lg bg-off-white p-4">
                  <p className="text-body-sm font-semibold text-navy">
                    ParityScope Testing
                  </p>
                  <p className="mt-1 text-body-sm text-medium-gray">
                    {pc.metrics}
                  </p>
                </div>
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
            title="ParityScope Metric Mapping for Section 1557"
            description="ParityScope's regulation-aware engine maps specific fairness metrics to Section 1557 requirements, generating jurisdiction-specific PDF compliance reports with protected-class disaggregation."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {metricMappings.map((mapping) => (
              <div
                key={mapping.metric}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <code className="rounded bg-navy/5 px-2 py-1 text-sm font-semibold text-navy">
                      {mapping.metric}
                    </code>
                    <h3 className="mt-3 text-h4 font-bold text-navy">
                      {mapping.display}
                    </h3>
                  </div>
                  <span className="shrink-0 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
                    {mapping.requirement}
                  </span>
                </div>
                <p className="mt-4 text-body text-medium-gray">
                  {mapping.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Covered Entities */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Scope"
            title="Who Must Comply"
            description="Section 1557 applies to any entity receiving federal financial assistance. In practice, this covers the vast majority of the US healthcare ecosystem."
          />
          <div className="mt-12 space-y-4">
            {coveredEntities.map((ce) => (
              <div
                key={ce.entity}
                className="flex flex-col gap-4 rounded-xl border border-light-gray bg-white p-6 shadow-card md:flex-row md:items-start md:gap-8"
              >
                <h3 className="shrink-0 text-h4 font-bold text-navy md:w-64">
                  {ce.entity}
                </h3>
                <p className="text-body text-medium-gray">{ce.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Decision Support Tools */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Covered Tools"
            title="AI Systems Covered Under the 2024 Final Rule"
            description="The 2024 Final Rule specifically identifies categories of clinical algorithms that fall within Section 1557's nondiscrimination scope."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<span className="text-xl">&#x1F3E5;</span>}
              title="Clinical Decision Support"
              description="AI systems that assist clinicians in diagnosis, treatment selection, or care planning — including sepsis prediction, deterioration alerts, and diagnostic imaging AI that inform clinical decisions."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x26A0;&#xFE0F;</span>}
              title="Risk Stratification"
              description="Algorithms assigning patients to risk categories for resource allocation, care management enrollment, or intervention prioritization. Must not use cost or utilization proxies that correlate with protected classes."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F4CB;</span>}
              title="Utilization Management"
              description="AI systems used by insurers for prior authorization, claims review, length-of-stay determinations, or coverage decisions. Must not deny or delay care at disparate rates across protected groups."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F4CA;</span>}
              title="Population Health Analytics"
              description="Algorithms identifying patient populations for outreach, wellness programs, or preventive interventions. Must ensure equitable identification and enrollment across all demographic groups."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F5D3;&#xFE0F;</span>}
              title="Scheduling & Access Tools"
              description="AI-driven appointment scheduling, wait-time estimation, and provider matching systems. Must not produce disparate access to care or appointment availability based on patient demographics."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F4B0;</span>}
              title="Cost Prediction Models"
              description="Algorithms predicting healthcare costs for resource allocation. Historically problematic when cost is used as a proxy for clinical need, disadvantaging populations with lower historical healthcare utilization."
            />
          </div>
        </div>
      </section>

      {/* Enforcement Timeline */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Timeline"
            title="Section 1557 Regulatory Timeline"
            description="From enactment through the 2024 Final Rule, the regulatory scope has expanded to address AI technologies in healthcare."
          />
          <div className="relative mt-12">
            <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-light-gray md:left-1/2 md:block" />
            <div className="space-y-10">
              {enforcementTimeline.map((event, index) => (
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

      {/* OCR Enforcement Process */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Enforcement Process"
            title="How OCR Investigates AI-Related Complaints"
            description="Understanding the Office for Civil Rights enforcement process helps organizations prepare documentation and maintain compliance readiness."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ocrEnforcementProcess.map((step) => (
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

      {/* Recent Enforcement Actions */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Enforcement Context"
            title="Algorithmic Discrimination Under Scrutiny"
            description="Recent regulatory attention, academic research, and enforcement investigations highlight the growing focus on AI-driven discrimination in healthcare."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {recentEnforcementContext.map((action) => (
              <div
                key={action.area}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <h3 className="text-h4 font-bold text-navy">{action.area}</h3>
                <p className="mt-3 text-body text-medium-gray">
                  {action.context}
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
            title="How ParityScope Automates Section 1557 Compliance"
            description="ParityScope's SDK-first approach ensures HIPAA-compliant fairness testing while generating the documentation OCR expects during investigations."
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<span className="text-xl">&#x1F50D;</span>}
              title="Protected-Class Disaggregation"
              description="Automatically disaggregate fairness metrics across all six Section 1557 protected classes simultaneously. Identify disparities before patients or OCR do."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F4C4;</span>}
              title="OCR-Ready PDF Reports"
              description="Generate jurisdiction-specific compliance reports in PDF format structured for OCR investigations, including metric results, statistical tests, methodology descriptions, and remediation records."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F512;</span>}
              title="HIPAA-Compliant Architecture"
              description="SDK-first design ensures patient data never leaves your infrastructure. All fairness computations run locally with only aggregate, de-identified metrics transmitted."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F504;</span>}
              title="Continuous Monitoring"
              description="Monitor production AI systems for emerging disparities across protected classes. Automated alerts trigger when metrics cross configurable thresholds, enabling proactive remediation."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F6E0;&#xFE0F;</span>}
              title="Bias Mitigation Toolkit"
              description="When disparities are detected, ParityScope provides mitigation strategies with projected impact analysis — enabling documented remediation that demonstrates good-faith compliance."
            />
            <FeatureCard
              icon={<span className="text-xl">&#x1F4DD;</span>}
              title="Immutable Audit Trail"
              description="Every fairness test, metric calculation, and report is timestamped and versioned. Maintain the longitudinal compliance record that OCR investigations demand."
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            title="Frequently Asked Questions"
            description="Common questions about Section 1557 compliance for healthcare AI and clinical algorithms."
          />
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Protect Your Organization from Disparate Impact Liability"
        description="ParityScope automates Section 1557 disparate impact testing across all six protected classes. Generate the statistical evidence and OCR-ready documentation you need before a complaint arrives."
        primaryCTA={{ label: "Request a Demo", href: "/contact" }}
        secondaryCTA={{
          label: "View Case Studies",
          href: "/resources/case-studies",
        }}
      />
    </main>
  );
}
