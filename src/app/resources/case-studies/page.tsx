import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "Case Studies — Real-world AI Fairness Impact in Healthcare",
  description:
    "See how healthcare organizations use ParityScope to detect, monitor, and mitigate AI bias. Detailed case studies with measurable outcomes from hospitals, MedTech companies, academic medical centers, and government payers.",
};

const caseStudies = [
  {
    orgType: "Regional Health System",
    orgDescription: "12-hospital system serving 2.8 million patients across the Southeastern US",
    title: "Reducing Sepsis Early Warning Model Disparity by 87%",
    challenge:
      "The health system's internally developed sepsis early warning model, deployed across all 12 hospitals and generating over 40,000 alerts per month, was found to have a 23% higher false negative rate for Black patients compared to White patients during a routine model performance review. The disparity meant that Black patients with developing sepsis were significantly less likely to trigger early intervention protocols, resulting in later identification and worse outcomes. The clinical team suspected the issue was related to the model's feature engineering but lacked the tools to pinpoint the root cause or quantify the scope of the problem.",
    solution:
      "ParityScope's SDK was deployed on the health system's on-premise infrastructure and integrated into the model's prediction pipeline. The platform's intersectional fairness analysis revealed that the disparity was concentrated in the feature engineering layer: vital sign variability features that were strongly predictive for White patients were being underweighted for Black patients due to differences in baseline vital sign distributions that the model had not been trained to account for. ParityScope's mitigation recommendations included recalibrating threshold sensitivity by demographic group and re-engineering two key features using clinically validated, race-neutral vital sign baselines.",
    results: [
      { metric: "87%", label: "Reduction in false negative rate disparity across racial groups" },
      { metric: "< 3%", label: "Residual false negative rate difference after mitigation" },
      { metric: "0.2%", label: "Improvement in overall model AUROC after bias correction" },
      { metric: "4 weeks", label: "Time from SDK deployment to validated mitigation in production" },
    ],
  },
  {
    orgType: "MedTech Company",
    orgDescription: "Series C medical device company with FDA-cleared AI diagnostic products",
    title: "Achieving EU AI Act Pre-Market Compliance for Radiology AI",
    challenge:
      "The company was preparing to launch its AI-powered chest X-ray triage system in the European market. With the EU AI Act classifying medical AI as high-risk, the company needed to demonstrate comprehensive bias testing, provide transparent documentation of model behavior across demographic subgroups, and establish ongoing monitoring protocols — all before their notified body assessment. Their existing validation process tested for aggregate accuracy but did not evaluate fairness across protected attributes, and they lacked documentation that met the EU AI Act's technical standards for conformity assessment.",
    solution:
      "ParityScope conducted a comprehensive pre-market fairness audit evaluating the model's performance across age, sex, ethnicity, and BMI subgroups using the company's multi-site clinical validation dataset. The platform generated conformity assessment documentation aligned with the EU AI Act's Annex IV requirements, including detailed bias test results, subgroup performance analyses, and residual risk assessments. ParityScope also deployed its continuous monitoring module to track fairness metrics post-deployment, providing the ongoing oversight documentation that the regulation requires.",
    results: [
      { metric: "100%", label: "Annex IV documentation requirements covered" },
      { metric: "12", label: "Subgroup fairness evaluations across 4 protected attributes" },
      { metric: "3 months", label: "Time from engagement to notified body submission" },
      { metric: "Zero", label: "Findings from notified body related to bias or fairness testing" },
    ],
  },
  {
    orgType: "Academic Medical Center",
    orgDescription: "Top-20 research hospital with 200+ clinical AI models embedded in their EHR",
    title: "Auditing 200+ EHR-Embedded Clinical Algorithms for Bias",
    challenge:
      "The medical center had accumulated over 200 clinical algorithms embedded in their EHR over a decade — risk scores, clinical decision support rules, order set recommendations, and population health stratification tools. Many were developed by different teams using different methodologies, and none had undergone systematic fairness evaluation. A new institutional policy, driven by Section 1557 compliance concerns and the medical center's health equity strategic plan, required all embedded algorithms to be audited for bias. The clinical informatics team estimated that manually auditing each algorithm would take 18+ months and require specialized statistical expertise they did not have in-house.",
    solution:
      "ParityScope's SDK was integrated into the medical center's data warehouse and connected to the prediction outputs of all 200+ algorithms. The platform's batch auditing capability evaluated each algorithm across race, ethnicity, sex, age, language, and insurance status using the medical center's patient population data. A risk-stratified report prioritized algorithms by disparity severity, patient volume, and clinical impact. The clinical informatics team used ParityScope's dashboard to triage findings and the mitigation module to address the highest-priority disparities first.",
    results: [
      { metric: "214", label: "Clinical algorithms audited in a single evaluation cycle" },
      { metric: "31", label: "Algorithms flagged with statistically significant disparities" },
      { metric: "8 weeks", label: "Time to complete full audit vs. 18-month manual estimate" },
      { metric: "14", label: "High-priority algorithms remediated within the first quarter" },
    ],
  },
  {
    orgType: "Government Payer",
    orgDescription: "State Medicaid agency managing care for 4.2 million beneficiaries",
    title: "Validating Claims Prediction Models for Equitable Resource Allocation",
    challenge:
      "The state Medicaid agency used predictive models to identify high-risk beneficiaries for care management enrollment, allocate community health worker resources, and flag potential fraud, waste, and abuse. An internal review, prompted by advocacy group concerns and CMS equity requirements, revealed that the care management enrollment model was systematically under-identifying high-risk beneficiaries in rural communities and among non-English-speaking populations. The agency needed to validate all three models for fairness and demonstrate compliance with federal non-discrimination requirements.",
    solution:
      "ParityScope audited all three predictive models using the agency's claims data, evaluating fairness across race, ethnicity, geography (urban/rural), primary language, disability status, and age. The analysis revealed that the care management model's reliance on prior healthcare utilization as a proxy for health need — similar to the Obermeyer finding — was the primary driver of rural and linguistic disparities. ParityScope's mitigation recommendations included incorporating social determinants of health data, adjusting for utilization access barriers, and implementing geography-specific threshold calibration.",
    results: [
      { metric: "3", label: "Predictive models audited across 6 protected attributes" },
      { metric: "42%", label: "Increase in high-risk rural beneficiaries identified after mitigation" },
      { metric: "38%", label: "Increase in non-English-speaking beneficiaries flagged for care management" },
      { metric: "Full", label: "Compliance documentation for CMS equity reporting requirements" },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Case Studies"
            title="Real-World Impact on Healthcare AI Fairness"
            description="See how hospitals, MedTech companies, academic medical centers, and government payers use ParityScope to detect, quantify, and mitigate bias in clinical AI systems — with measurable outcomes."
            align="left"
          />
        </div>
      </section>

      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          {caseStudies.map((study) => (
            <div
              key={study.title}
              className="rounded-xl border border-light-gray bg-white shadow-card"
            >
              {/* Header */}
              <div className="border-b border-light-gray px-8 py-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="rounded-full bg-teal/10 px-3 py-1 text-caption font-semibold text-teal">
                    {study.orgType}
                  </span>
                  <span className="text-body-sm text-medium-gray">
                    {study.orgDescription}
                  </span>
                </div>
                <h2 className="mt-4 text-h3 font-semibold text-navy">
                  {study.title}
                </h2>
              </div>

              {/* Body */}
              <div className="space-y-6 px-8 py-6">
                <div>
                  <h3 className="text-body font-semibold text-navy">Challenge</h3>
                  <p className="mt-2 text-body-sm text-medium-gray leading-relaxed">
                    {study.challenge}
                  </p>
                </div>
                <div>
                  <h3 className="text-body font-semibold text-navy">Solution</h3>
                  <p className="mt-2 text-body-sm text-medium-gray leading-relaxed">
                    {study.solution}
                  </p>
                </div>
                <div>
                  <h3 className="text-body font-semibold text-navy">Results</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {study.results.map((result) => (
                      <div
                        key={result.label}
                        className="rounded-lg bg-off-white p-4 text-center"
                      >
                        <p className="text-h3 font-bold text-teal">{result.metric}</p>
                        <p className="mt-1 text-caption text-medium-gray">
                          {result.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader
            label="Your Organization"
            title="Ready to Write Your Own Case Study?"
            description="Every healthcare organization deploying clinical AI has a fairness story. The question is whether you discover disparities before or after they impact patients. ParityScope helps you find out proactively."
          />
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-navy px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-navy-light"
            >
              Request a Demo
            </Link>
            <Link
              href="/product"
              className="rounded-full border border-navy px-8 py-3 text-base font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Explore the Platform
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="See What ParityScope Can Find in Your AI Systems"
        description="Our team will walk you through a tailored demo using scenarios relevant to your clinical AI portfolio, regulatory obligations, and patient population."
        primaryCTA={{ label: "Schedule a Demo", href: "/contact" }}
        secondaryCTA={{ label: "View Product", href: "/product" }}
      />
    </>
  );
}
