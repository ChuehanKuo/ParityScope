import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { Accordion } from "@/components/ui/accordion";
import { CTASection } from "@/components/ui/cta-section";

const metrics = [
  { value: "15+", label: "Fairness Metrics", description: "Covering demographic parity, equal opportunity, calibration, and more" },
  { value: "4", label: "Regulatory Frameworks", description: "EU AI Act, Section 1557, South Korea, and Taiwan" },
  { value: "19/24", label: "Failures Found", description: "In a model that passed standard review with 66% accuracy" },
  { value: "0", label: "Patient Data Exposed", description: "SDK runs on your infrastructure — data never leaves" },
];

const howItWorks = [
  {
    step: "01",
    title: "Connect Your Model",
    description:
      "Point ParityScope at any clinical AI model — risk scores, diagnostic classifiers, treatment recommenders. Our SDK integrates in minutes with Python, REST APIs, or batch CSV uploads.",
  },
  {
    step: "02",
    title: "Audit for Bias",
    description:
      "We evaluate your model across 15+ fairness metrics for every protected attribute — race, gender, age, insurance status, and more. Get regulation-specific compliance scores automatically.",
  },
  {
    step: "03",
    title: "Monitor & Improve",
    description:
      "Deploy continuous monitoring to catch fairness drift in production. Use what-if simulations to test mitigation strategies before they touch patients, with accuracy trade-off tracking.",
  },
];

const features = [
  {
    title: "Fairness Audit",
    href: "/product/fairness-audit",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    description: "Detect bias across 15+ fairness metrics and all protected attributes. Generate actionable audit reports that map directly to regulatory requirements.",
  },
  {
    title: "Continuous Monitoring",
    href: "/product/monitoring",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    description: "Real-time dashboards tracking fairness drift in production. Automated alerts when thresholds are breached, with full audit trail generation.",
  },
  {
    title: "Bias Mitigation",
    href: "/product/mitigation",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
    description: "Automated remediation recommendations and what-if simulations. Test threshold adjustments and resampling strategies with accuracy trade-off tracking.",
  },
];

const differentiators = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: "Privacy-First SDK",
    description: "Our SDK runs entirely on your infrastructure. Patient data never leaves your environment — ever. HIPAA-ready by design.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    title: "Healthcare-Only",
    description: "Not a generic AI governance tool. Purpose-built for clinical AI with domain-specific metrics, thresholds, and regulatory mappings.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "Multi-Jurisdiction",
    description: "One platform covers EU AI Act, US Section 1557, South Korea, and Taiwan. Automatic metric selection based on your regulatory requirements.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
    title: "Deterministic & Transparent",
    description: "Not a black box. Our statistical evaluation engine produces reproducible, explainable results. Every metric is auditable and defensible.",
  },
];

const faqItems = [
  {
    question: "What types of clinical AI models can ParityScope audit?",
    answer:
      "ParityScope works with any binary or multiclass classification model used in healthcare — risk stratification scores, diagnostic classifiers, treatment recommendation engines, resource allocation algorithms, and triage models. If your model produces predictions that affect patient care, we can audit it.",
  },
  {
    question: "Does patient data leave our environment?",
    answer:
      "Never. ParityScope's SDK runs entirely on your infrastructure. We evaluate your model's predictions against demographic data locally. Only aggregated, de-identified fairness metrics leave your environment — never individual patient records.",
  },
  {
    question: "Which regulations does ParityScope cover?",
    answer:
      "We currently support compliance mapping for the EU AI Act (Articles 9, 10, 15), US Section 1557 (anti-discrimination in healthcare), South Korea's AI Framework Act, and Taiwan's AI Basic Law. Our regulation engine automatically selects the appropriate fairness metrics based on your jurisdiction and clinical use case.",
  },
  {
    question: "How long does a fairness audit take?",
    answer:
      "A standard SDK-based audit completes in minutes once integrated. Our assessment service — which includes expert review, regulatory mapping, and a detailed compliance report — typically takes 2-3 weeks depending on the complexity of the model and the number of protected attributes.",
  },
  {
    question: "What makes ParityScope different from generic AI governance tools?",
    answer:
      "Most AI governance platforms are built for general-purpose AI. ParityScope is purpose-built for healthcare, with clinical domain awareness, healthcare-specific fairness thresholds, and direct regulatory compliance mapping. We catch failures that generic tools miss — like the 21-percentage-point racial disparity we found in a model that reported 66% overall accuracy.",
  },
  {
    question: "Can we start with a single model and expand later?",
    answer:
      "Absolutely. Our Assessment tier is designed as an entry point — a one-time expert-led audit of a single model. Many customers start there to see the value, then upgrade to our SDK License for continuous monitoring across their full model portfolio.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy px-4 pb-24 pt-20 text-white sm:px-6 lg:px-8">
        {/* Background pattern */}
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
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                Healthcare AI Compliance Toolkit
              </p>
              <h1 className="mt-4 text-h1 font-bold leading-tight tracking-tight lg:text-display">
                Fair AI Starts with{" "}
                <span className="text-teal">Knowing Where Bias Hides</span>
              </h1>
              <p className="mt-6 max-w-xl text-body-lg text-light-gray">
                ParityScope helps healthcare organizations audit, monitor, and
                mitigate AI bias — so you can deploy clinical AI with confidence
                and meet global regulatory requirements.
              </p>
              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="rounded-full bg-teal px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
                >
                  Book a Demo
                </Link>
                <Link
                  href="/product"
                  className="rounded-full border border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Explore Platform
                </Link>
              </div>
            </div>

            {/* Hero visual — abstract audit dashboard */}
            <div className="hidden lg:block">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-coral" />
                  <div className="h-3 w-3 rounded-full bg-amber" />
                  <div className="h-3 w-3 rounded-full bg-green" />
                  <span className="ml-2 text-body-sm text-light-gray">
                    ParityScope Audit Report
                  </span>
                </div>

                {/* Mock audit results */}
                <div className="space-y-3">
                  <div className="rounded-lg bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm text-light-gray">Demographic Parity</span>
                      <span className="rounded-full bg-coral/20 px-2.5 py-0.5 text-caption font-semibold text-coral-light">FAIL</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[72%] rounded-full bg-coral" />
                    </div>
                    <p className="mt-1 text-caption text-medium-gray">Disparity: 21.3% across racial groups</p>
                  </div>

                  <div className="rounded-lg bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm text-light-gray">Equal Opportunity</span>
                      <span className="rounded-full bg-green/20 px-2.5 py-0.5 text-caption font-semibold text-green-light">PASS</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[95%] rounded-full bg-green" />
                    </div>
                    <p className="mt-1 text-caption text-medium-gray">Disparity: 3.2% across gender groups</p>
                  </div>

                  <div className="rounded-lg bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm text-light-gray">Predictive Parity</span>
                      <span className="rounded-full bg-amber/20 px-2.5 py-0.5 text-caption font-semibold text-amber">REVIEW</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[88%] rounded-full bg-amber" />
                    </div>
                    <p className="mt-1 text-caption text-medium-gray">Disparity: 8.7% across age groups</p>
                  </div>

                  <div className="rounded-lg bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm text-light-gray">False Negative Rate</span>
                      <span className="rounded-full bg-coral/20 px-2.5 py-0.5 text-caption font-semibold text-coral-light">FAIL</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/10">
                      <div className="h-2 w-[45%] rounded-full bg-coral" />
                    </div>
                    <p className="mt-1 text-caption text-medium-gray">Disparity: 100% — 0% detection for ages 18-39</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-body-sm font-semibold text-coral-light">19 of 24 metrics failed</span>
                  <span className="text-caption text-medium-gray">EU AI Act · High-Risk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-light-gray bg-off-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 lg:grid-cols-4">
          {metrics.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-h1 font-bold text-teal">{stat.value}</p>
              <p className="mt-1 text-body-sm font-semibold text-navy">
                {stat.label}
              </p>
              <p className="mt-1 text-caption text-medium-gray">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem Statement */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="The Problem"
            title="Healthcare AI Has a Hidden Fairness Problem"
            description="Clinical algorithms affect millions of patients daily. Standard evaluation metrics — accuracy, AUC, F1 — hide systematic disparities across demographic groups. Without proper auditing, biased AI perpetuates health inequity."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                ),
                title: "Regulatory Pressure Is Real",
                stat: "Up to €35M",
                statLabel: "in EU AI Act penalties",
                description:
                  "The EU AI Act, Section 1557, and emerging laws in South Korea and Taiwan mandate bias auditing for healthcare AI. Non-compliance carries severe financial and operational consequences.",
              },
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ),
                title: "Overall Metrics Lie",
                stat: "21%",
                statLabel: "racial disparity hidden",
                description:
                  "A model reporting 66% accuracy and AUC 0.78 would pass standard review. ParityScope revealed it missed 100% of hypertensive patients under 40 and had a 21-point racial detection gap.",
              },
              {
                icon: (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                ),
                title: "Compliance Doesn't Scale",
                stat: "4+",
                statLabel: "jurisdictions to navigate",
                description:
                  "Multi-jurisdictional compliance is a moving target. Each regulation demands different metrics, thresholds, and documentation. Manual auditing across model portfolios is unsustainable.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-light-gray p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-coral/10 text-coral">
                  {item.icon}
                </div>
                <h3 className="mt-5 text-h4 font-semibold text-navy">
                  {item.title}
                </h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-h3 font-bold text-coral">{item.stat}</span>
                  <span className="text-body-sm text-medium-gray">{item.statLabel}</span>
                </div>
                <p className="mt-3 text-medium-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="How It Works"
            title="Three Steps to Fair, Compliant AI"
            description="ParityScope makes bias auditing straightforward. Integrate our SDK, run comprehensive audits, and continuously monitor your models in production."
          />
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Connector line */}
                {index < howItWorks.length - 1 && (
                  <div className="absolute right-0 top-12 hidden h-0.5 w-8 translate-x-full bg-teal/30 lg:block" />
                )}
                <div className="rounded-xl border border-light-gray bg-white p-8 shadow-card">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal text-base font-bold text-white">
                    {step.step}
                  </div>
                  <h3 className="mt-5 text-h4 font-semibold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-medium-gray">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Platform"
            title="One Platform. Complete AI Fairness."
            description="From pre-deployment audit to continuous production monitoring, ParityScope covers the full AI fairness lifecycle."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group rounded-xl border border-light-gray bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal/10 text-teal">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-h4 font-semibold text-navy group-hover:text-teal">
                  {feature.title}
                </h3>
                <p className="mt-3 text-medium-gray">{feature.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal">
                  Learn more
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Highlight */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Case Study"
            title="What Our Engine Found"
            description="We ran ParityScope against a real hypertension prediction model trained on CDC NHANES data. The results reveal exactly the kind of hidden failure that standard metrics miss."
            theme="dark"
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            {/* Before */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <p className="text-body-sm font-semibold uppercase tracking-wider text-coral-light">
                Standard Review
              </p>
              <h3 className="mt-3 text-h3 font-bold text-white">
                &ldquo;Looks Fine&rdquo;
              </h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-light-gray">Overall Accuracy</span>
                  <span className="font-semibold text-white">66%</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-light-gray">AUC Score</span>
                  <span className="font-semibold text-white">0.78</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-light-gray">Verdict</span>
                  <span className="rounded-full bg-green/20 px-3 py-0.5 text-body-sm font-semibold text-green-light">
                    Would Pass Review
                  </span>
                </div>
              </div>
              <p className="mt-6 text-body-sm text-medium-gray">
                By standard evaluation criteria, this model appears acceptable. It reports reasonable accuracy and a decent AUC. Most review boards would approve it.
              </p>
            </div>

            {/* After */}
            <div className="rounded-2xl border border-teal/30 bg-teal/5 p-8">
              <p className="text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                ParityScope Audit
              </p>
              <h3 className="mt-3 text-h3 font-bold text-white">
                &ldquo;Fundamentally Broken&rdquo;
              </h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-light-gray">Ages 18-39 Detection</span>
                  <span className="font-semibold text-coral-light">0%</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-light-gray">Racial Disparity</span>
                  <span className="font-semibold text-coral-light">21 percentage points</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-light-gray">Fairness Metrics Failed</span>
                  <span className="font-semibold text-coral-light">19 of 24</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-light-gray">Root Cause</span>
                  <span className="font-semibold text-amber">Age = 56.7% of model weight</span>
                </div>
              </div>
              <p className="mt-6 text-body-sm text-medium-gray">
                ParityScope revealed the model is essentially an age threshold — it missed every hypertensive patient under 40 and over-diagnosed the elderly, with a 21-point racial detection gap.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/resources/case-studies"
              className="inline-flex items-center gap-2 rounded-full border border-teal px-8 py-3 text-base font-semibold text-teal transition-colors hover:bg-teal hover:text-white"
            >
              Read the Full Case Study
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Why ParityScope"
            title="Purpose-Built for Healthcare AI Compliance"
            description="Generic AI governance tools weren't designed for the unique challenges of clinical AI. ParityScope was."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="flex gap-5 rounded-xl border border-light-gray p-8 shadow-card"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-navy/5 text-navy">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-h4 font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-medium-gray">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulation Coverage */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Regulatory Coverage"
            title="One Platform, Global Compliance"
            description="ParityScope automatically maps your audit results to the specific requirements of each regulatory framework."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "EU AI Act",
                href: "/regulations/eu-ai-act",
                articles: "Articles 9, 10, 15",
                description: "High-risk AI conformity assessment with automated bias testing and documentation.",
                penalty: "Up to €35M or 7% revenue",
              },
              {
                title: "Section 1557",
                href: "/regulations/section-1557",
                articles: "Anti-Discrimination",
                description: "Healthcare AI non-discrimination compliance under US civil rights law.",
                penalty: "Federal funding at risk",
              },
              {
                title: "South Korea",
                href: "/regulations/south-korea",
                articles: "AI Framework Act",
                description: "Navigate Korea's emerging AI regulatory requirements for healthcare applications.",
                penalty: "Compliance mandated",
              },
              {
                title: "Taiwan",
                href: "/regulations/taiwan",
                articles: "AI Basic Law",
                description: "Meet Taiwan's AI governance requirements for clinical decision support systems.",
                penalty: "Compliance mandated",
              },
            ].map((reg) => (
              <Link
                key={reg.title}
                href={reg.href}
                className="group rounded-xl border border-light-gray bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <p className="text-caption font-semibold uppercase tracking-wider text-teal">
                  {reg.articles}
                </p>
                <h3 className="mt-2 text-h4 font-bold text-navy group-hover:text-teal">
                  {reg.title}
                </h3>
                <p className="mt-2 text-body-sm text-medium-gray">
                  {reg.description}
                </p>
                <p className="mt-3 text-caption font-medium text-coral">
                  {reg.penalty}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SDK Code Preview */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-body-sm font-semibold uppercase tracking-wider text-teal">
                Developer Experience
              </p>
              <h2 className="mt-3 text-h2 font-bold text-navy">
                Integrate in Minutes, Not Months
              </h2>
              <p className="mt-4 text-body-lg text-medium-gray">
                ParityScope&apos;s Python SDK integrates into your existing ML pipeline
                with just a few lines of code. Run audits locally, get
                regulation-specific compliance scores, and export detailed reports.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Install via pip — no complex dependencies",
                  "Works with any scikit-learn, PyTorch, or TensorFlow model",
                  "Runs entirely on your infrastructure",
                  "JSON and PDF report export",
                  "CI/CD pipeline integration",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-teal"
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
                    <span className="text-medium-gray">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/product"
                  className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-navy-light"
                >
                  View Documentation
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Code block */}
            <div className="overflow-hidden rounded-2xl border border-light-gray bg-near-black shadow-elevated">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-coral/60" />
                <div className="h-3 w-3 rounded-full bg-amber/60" />
                <div className="h-3 w-3 rounded-full bg-green/60" />
                <span className="ml-2 font-mono text-caption text-medium-gray">
                  audit_model.py
                </span>
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-body-sm leading-relaxed">
                <code>
                  <span className="text-medium-gray"># Install: pip install parityscope</span>{"\n"}
                  <span className="text-coral-light">from</span>{" "}
                  <span className="text-teal-light">parityscope</span>{" "}
                  <span className="text-coral-light">import</span>{" "}
                  <span className="text-white">FairnessAudit</span>{"\n\n"}
                  <span className="text-medium-gray"># Initialize with your jurisdiction</span>{"\n"}
                  <span className="text-white">audit</span>{" "}
                  <span className="text-coral-light">=</span>{" "}
                  <span className="text-white">FairnessAudit(</span>{"\n"}
                  {"  "}
                  <span className="text-teal-light">jurisdiction</span>
                  <span className="text-coral-light">=</span>
                  <span className="text-amber">&quot;eu_ai_act&quot;</span>
                  <span className="text-white">,</span>{"\n"}
                  {"  "}
                  <span className="text-teal-light">clinical_domain</span>
                  <span className="text-coral-light">=</span>
                  <span className="text-amber">&quot;diagnosis&quot;</span>{"\n"}
                  <span className="text-white">)</span>{"\n\n"}
                  <span className="text-medium-gray"># Run the audit</span>{"\n"}
                  <span className="text-white">result</span>{" "}
                  <span className="text-coral-light">=</span>{" "}
                  <span className="text-white">audit.evaluate(</span>{"\n"}
                  {"  "}
                  <span className="text-teal-light">y_true</span>
                  <span className="text-coral-light">=</span>
                  <span className="text-white">labels,</span>{"\n"}
                  {"  "}
                  <span className="text-teal-light">y_pred</span>
                  <span className="text-coral-light">=</span>
                  <span className="text-white">predictions,</span>{"\n"}
                  {"  "}
                  <span className="text-teal-light">demographics</span>
                  <span className="text-coral-light">=</span>
                  <span className="text-white">patient_data</span>{"\n"}
                  <span className="text-white">)</span>{"\n\n"}
                  <span className="text-medium-gray"># Get compliance verdict</span>{"\n"}
                  <span className="text-coral-light">print</span>
                  <span className="text-white">(result.summary())</span>{"\n"}
                  <span className="text-medium-gray"># → 19 of 24 fairness metrics failed</span>{"\n"}
                  <span className="text-medium-gray"># → EU AI Act: NON-COMPLIANT</span>{"\n\n"}
                  <span className="text-medium-gray"># Export detailed report</span>{"\n"}
                  <span className="text-white">result.to_pdf(</span>
                  <span className="text-amber">&quot;audit_report.pdf&quot;</span>
                  <span className="text-white">)</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            title="Frequently Asked Questions"
            description="Common questions about ParityScope's AI fairness auditing platform."
          />
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Ready to Uncover What Your Metrics Are Hiding?"
        description="Join healthcare organizations that use ParityScope to ensure equitable AI outcomes across every patient population."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </>
  );
}
