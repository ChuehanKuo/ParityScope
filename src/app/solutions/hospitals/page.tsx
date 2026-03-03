import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { Accordion } from "@/components/ui/accordion";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "Hospitals & Health Systems — AI Fairness Solutions | ParityScope",
  description:
    "Ensure equitable clinical AI across your health system. Centralized fairness monitoring, automated audit trails, and portfolio-level compliance for every AI model in your organization.",
};

const painPoints = [
  {
    title: "Dozens of AI Models, Zero Centralized Oversight",
    description:
      "Sepsis prediction in the ICU, readmission risk in care management, deterioration scoring on medical-surgical floors, radiology AI in imaging — your health system deploys AI tools from multiple vendors across every department. Without centralized fairness governance, each model is a liability waiting to surface.",
    stat: "50+",
    statLabel: "AI models in a typical large health system",
  },
  {
    title: "Diverse Patient Populations Demand Equitable Care",
    description:
      "Your patients span every demographic — race, ethnicity, age, gender, language, insurance status, and socioeconomic background. Clinical AI models trained on narrow datasets can systematically underserve the very populations your health equity commitments are meant to protect.",
    stat: "21%",
    statLabel: "racial disparity hidden by standard accuracy metrics",
  },
  {
    title: "Joint Commission and CMS Requirements Are Tightening",
    description:
      "The Joint Commission now expects documented evidence of AI governance. CMS Conditions of Participation increasingly reference algorithmic accountability. Your accreditation and reimbursement depend on demonstrating that your AI systems do not discriminate.",
    stat: "4+",
    statLabel: "regulatory frameworks health systems must track",
  },
  {
    title: "Limited Data Science Resources, Expanding AI Footprint",
    description:
      "Most health systems have small data science teams relative to the number of deployed AI tools. Manual bias auditing is not scalable — your team cannot review every model, every quarter, across every protected attribute without automated tooling.",
    stat: "3:50",
    statLabel: "typical ratio of data scientists to deployed AI models",
  },
];

const benefits = [
  {
    title: "Automated Auditing Across All Deployed Models",
    description:
      "Run fairness audits across your entire AI portfolio with a single command. ParityScope evaluates 15+ fairness metrics for every model — from sepsis prediction to resource allocation — without requiring vendor cooperation or model access. Just provide predictions and demographic data.",
    icon: "shield",
  },
  {
    title: "Continuous Monitoring Dashboards for the C-Suite",
    description:
      "Real-time dashboards built for Chief Medical Officers, Chief Information Officers, and health equity leaders. Track fairness trends, receive drift alerts, and monitor portfolio-level compliance status. No data science expertise required to interpret results.",
    icon: "chart",
  },
  {
    title: "Regulatory Compliance Reports for Accreditation",
    description:
      "Generate PDF and JSON compliance reports that map directly to Joint Commission standards, CMS requirements, Section 1557 obligations, and EU AI Act mandates. Reports are timestamped, version-controlled, and ready for submission within seconds.",
    icon: "document",
  },
  {
    title: "Health Equity Improvement Tracking",
    description:
      "Measure the impact of your health equity initiatives over time. ParityScope tracks fairness metrics longitudinally, showing whether your interventions — model retraining, workflow changes, or vendor switches — are actually reducing disparities in care.",
    icon: "trending",
  },
];

const dayInTheLife = [
  {
    time: "7:30 AM",
    title: "Morning Dashboard Review",
    description:
      "Dr. Patel, Chief Medical Information Officer at a 12-hospital system, opens the ParityScope executive dashboard over coffee. The portfolio health score is 94/100. One alert: the sepsis prediction model at the downtown campus has shown a 3.2% drop in sensitivity for Hispanic patients over the past 14 days.",
  },
  {
    time: "9:00 AM",
    title: "AI Governance Committee Meeting",
    description:
      "Dr. Patel presents the monthly AI fairness report to the governance committee. ParityScope auto-generated the slide deck: portfolio-level fairness trends, per-model compliance status, and a risk-ranked list of models requiring attention. The committee approves a remediation plan for two underperforming models.",
  },
  {
    time: "11:00 AM",
    title: "Vendor Accountability Review",
    description:
      "A radiology AI vendor requests renewal of their enterprise contract. Dr. Patel pulls ParityScope's 12-month fairness history for the vendor's chest X-ray model. The data shows a persistent 8% false-negative disparity for patients over 65. She shares the report with the vendor and requests a remediation timeline before renewal.",
  },
  {
    time: "1:30 PM",
    title: "New Model Pre-Deployment Audit",
    description:
      "The cardiology department wants to deploy a new heart failure risk model. Before it goes live, the data science team runs a ParityScope fairness audit using the Python SDK. The audit completes in 12 minutes, evaluating the model across race, age, gender, and insurance status. Two intersectional disparities are flagged — the model underperforms for Black women over 70.",
  },
  {
    time: "3:00 PM",
    title: "Board Health Equity Report Preparation",
    description:
      "The quarterly board meeting is next week. Dr. Patel exports ParityScope's health equity impact report — a longitudinal view of how AI fairness has improved across the system since deployment. The report shows a 34% reduction in algorithmic disparities over 9 months, directly attributable to ParityScope-driven interventions.",
  },
  {
    time: "4:30 PM",
    title: "Joint Commission Preparation",
    description:
      "The Joint Commission survey is in six weeks. Dr. Patel generates compliance documentation for all 47 active AI models. Each report includes fairness metrics, audit history, threshold configurations, and remediation logs. What would have taken her team three weeks of manual work is ready in under a minute.",
  },
];

const useCases = [
  {
    title: "Sepsis Prediction Models",
    description:
      "Sepsis early-warning systems are among the most widely deployed clinical AI tools — and among the most prone to demographic bias. Continuous monitoring ensures equitable alert sensitivity across all patient populations, catching performance drift before it impacts care.",
  },
  {
    title: "Readmission Risk Scoring",
    description:
      "Hospital readmission models often encode socioeconomic factors as proxies for clinical risk. ParityScope identifies when your readmission model penalizes patients based on zip code, insurance type, or race rather than genuine health indicators.",
  },
  {
    title: "Patient Deterioration Alerts",
    description:
      "Early warning scores for patient deterioration must trigger equitably across every demographic group. ParityScope monitors whether your deterioration model generates timely alerts for all patients — not just those whose physiology matches the training data.",
  },
  {
    title: "Radiology and Imaging AI",
    description:
      "Imaging algorithms for chest X-ray, mammography, and CT screening must detect conditions equally across patient demographics. Audit detection sensitivity and specificity across age, race, and gender to ensure no population is systematically underserved.",
  },
  {
    title: "Clinical Decision Support",
    description:
      "Treatment recommendation engines must provide equitable guidance regardless of patient demographics. Validate that your CDS tools do not steer different clinical pathways based on race, gender, or insurance status.",
  },
];

const faqItems = [
  {
    question: "How many AI models can we monitor simultaneously?",
    answer:
      "Our Enterprise plan supports unlimited models. Whether you have 5 models or 500, ParityScope provides centralized monitoring with portfolio-level dashboards. Each model is tracked independently with its own fairness thresholds, regulatory mappings, and alert configurations.",
  },
  {
    question: "Can ParityScope audit models from third-party vendors?",
    answer:
      "Yes. ParityScope audits any model that produces predictions — whether built in-house or purchased from a vendor. You provide the model's predictions and demographic data; our SDK evaluates fairness without needing access to the model's internals. This is critical for health systems that deploy dozens of vendor-supplied AI tools.",
  },
  {
    question: "How does this integrate with our existing governance workflows?",
    answer:
      "ParityScope generates audit reports and compliance documentation that slot directly into your AI governance committee reviews, IRB processes, and accreditation workflows. Reports are exportable as PDF and JSON, and our API supports integration with GRC platforms and risk management systems.",
  },
  {
    question: "Does patient data leave our environment?",
    answer:
      "Never. ParityScope's SDK runs entirely on your infrastructure. Patient data stays within your environment at all times. Only aggregated, de-identified fairness metrics are surfaced to dashboards — never individual patient records. The architecture is HIPAA-ready by design.",
  },
  {
    question: "What protected attributes does ParityScope evaluate?",
    answer:
      "ParityScope evaluates fairness across all protected attributes relevant to healthcare: race, ethnicity, gender, age, insurance status, language preference, disability status, and socioeconomic indicators. Intersectional analysis is supported — you can evaluate combinations like race + gender + age to uncover hidden disparities.",
  },
  {
    question: "How long does it take to deploy across our health system?",
    answer:
      "Most health systems complete initial deployment within 2-4 weeks. The SDK installs via pip, and our REST API integrates with existing data pipelines. Our implementation team works with your IT and data science staff to configure model connections, set fairness thresholds, and establish monitoring baselines.",
  },
];

export default function HospitalsPage() {
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
            Hospitals & Health Systems
          </p>
          <h1 className="mt-4 max-w-4xl text-h1 font-bold leading-tight tracking-tight lg:text-display">
            Ensure Equitable AI Across{" "}
            <span className="text-teal">Your Entire Health System</span>
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-light-gray">
            Your health system deploys dozens of clinical AI models — sepsis
            prediction, readmission risk, deterioration scoring, imaging
            diagnostics, and more. ParityScope gives you centralized visibility
            and control over AI fairness across every department, vendor, and
            patient population.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Schedule a Consultation
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
            title="AI Governance at Scale Is Breaking Health Systems"
            description="As AI adoption accelerates across departments, health systems face compounding risks that manual processes cannot address."
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
            title="Centralized AI Fairness for Your Entire Portfolio"
            description="ParityScope gives health system leaders a single pane of glass for AI fairness governance — from radiology to revenue cycle."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex gap-5 rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal/10 text-2xl">
                  {benefit.icon === "shield" && (
                    <svg className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                  )}
                  {benefit.icon === "chart" && (
                    <svg className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                    </svg>
                  )}
                  {benefit.icon === "document" && (
                    <svg className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                  )}
                  {benefit.icon === "trending" && (
                    <svg className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="text-h4 font-semibold text-navy">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-medium-gray">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Day in the Life Section */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="A Day in the Life"
            title="How a CMIO Uses ParityScope"
            description="Follow Dr. Patel, Chief Medical Information Officer at a 12-hospital health system, through a typical day of AI fairness governance."
            align="left"
          />
          <div className="mt-16 relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-teal via-teal/50 to-teal/10 md:left-[119px]" />
            <div className="space-y-10">
              {dayInTheLife.map((event) => (
                <div
                  key={event.time}
                  className="relative flex flex-col gap-4 pl-8 md:flex-row md:gap-8 md:pl-0"
                >
                  <div className="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-teal bg-white md:left-[112px]" />
                  <div className="shrink-0 md:w-24 md:text-right">
                    <span className="text-body-sm font-bold text-teal">
                      {event.time}
                    </span>
                  </div>
                  <div className="rounded-xl border border-light-gray bg-white p-6 shadow-card md:ml-8 md:flex-1">
                    <h3 className="text-h4 font-semibold text-navy">
                      {event.title}
                    </h3>
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
            label="Clinical AI Use Cases"
            title="Fairness Monitoring Across Every Department"
            description="ParityScope audits and monitors any clinical AI model — regardless of vendor, department, or clinical domain."
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

      {/* Privacy-First Callout */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                Privacy-First Architecture
              </p>
              <h2 className="mt-3 text-h2 font-bold text-white">
                Your Patient Data Never Leaves Your Environment
              </h2>
              <p className="mt-4 text-body-lg text-light-gray">
                ParityScope&apos;s SDK runs entirely on your infrastructure.
                Patient records, predictions, and demographic data stay behind
                your firewall. Only aggregated fairness metrics are surfaced to
                dashboards — never individual patient information.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "SDK deploys on-premise or in your private cloud",
                  "Zero patient data exfiltration — HIPAA-ready by design",
                  "Aggregated metrics only in compliance dashboards",
                  "Full audit trail stored within your environment",
                  "Compatible with your existing security posture",
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
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/20 text-teal-light">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Your Infrastructure</p>
                    <p className="text-body-sm text-medium-gray">SDK runs inside your firewall</p>
                  </div>
                </div>
                <div className="ml-5 border-l-2 border-teal/30 py-2 pl-9">
                  <p className="text-body-sm text-medium-gray">Patient data stays here</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/20 text-teal-light">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Fairness Dashboard</p>
                    <p className="text-body-sm text-medium-gray">Aggregated metrics only — no PHI</p>
                  </div>
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
            description="Common questions from health system leaders evaluating ParityScope."
          />
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Govern AI Fairness Across Your Health System?"
        description="Join leading health systems using ParityScope to centralize AI compliance, protect patients, and meet regulatory mandates."
        primaryCTA={{ label: "Schedule a Consultation", href: "/contact" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </>
  );
}
