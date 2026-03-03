import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { Accordion } from "@/components/ui/accordion";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "MedTech & Digital Health — Ship Compliant AI Faster | ParityScope",
  description:
    "Embed AI fairness testing into your development pipeline. Meet FDA, EU MDR, and AI Act requirements with automated bias detection, CI/CD integration, and regulatory-grade documentation.",
};

const painPoints = [
  {
    title: "FDA Pre-Market Compliance Is Evolving",
    description:
      "The FDA increasingly expects algorithmic fairness documentation as part of 510(k), De Novo, and PMA submissions. Your regulatory affairs team needs structured evidence that your AI/ML-enabled device performs equitably across patient demographics — and manual testing cannot produce the depth reviewers now expect.",
    stat: "510(k)",
    statLabel: "submissions now scrutinized for algorithmic bias",
  },
  {
    title: "EU MDR and AI Act Create a Dual Compliance Burden",
    description:
      "Selling into the European market means satisfying both EU MDR device requirements and the AI Act's fairness mandates for high-risk systems. You need documented bias testing, ongoing monitoring, and conformity assessments. Non-compliance risks penalties up to 7% of global annual revenue.",
    stat: "7%",
    statLabel: "of global revenue — maximum AI Act penalty",
  },
  {
    title: "Health System Customers Demand Fairness Evidence",
    description:
      "Enterprise health system procurement teams increasingly require bias testing documentation before signing contracts. If you cannot demonstrate algorithmic fairness across demographics, you lose deals to competitors who can. Fairness evidence has become table stakes for enterprise sales.",
    stat: "68%",
    statLabel: "of health systems now require bias documentation in RFPs",
  },
  {
    title: "Competitive Differentiation Requires Proof",
    description:
      "Every MedTech company claims their AI is fair and unbiased. Few can prove it with rigorous, third-party-verifiable documentation. ParityScope transforms fairness from a marketing claim into a measurable, auditable product feature that differentiates you in procurement evaluations.",
    stat: "3x",
    statLabel: "faster deal closure with documented fairness evidence",
  },
];

const lifecycleStages = [
  {
    stage: "01",
    title: "Research & Development",
    subtitle: "Fairness from Day One",
    description:
      "Integrate ParityScope's Python SDK into your research environment. Run fairness audits on training data and early model prototypes. Identify demographic performance gaps before they become embedded in production models. Evaluate 15+ fairness metrics across all protected attributes during model selection and hyperparameter tuning.",
    tools: ["Python SDK", "Jupyter integration", "15+ fairness metrics"],
  },
  {
    stage: "02",
    title: "Validation & Testing",
    subtitle: "Systematic Bias Detection",
    description:
      "Incorporate fairness testing into your verification and validation protocols. ParityScope's intersectional analysis evaluates performance across combinations of race, gender, age, and socioeconomic status — uncovering disparities that single-attribute testing misses. Generate structured validation reports that map directly to FDA and EU MDR requirements.",
    tools: ["Intersectional analysis", "Validation reports", "Regulatory mapping"],
  },
  {
    stage: "03",
    title: "CI/CD Integration",
    subtitle: "Automated Gates Before Every Release",
    description:
      "Add ParityScope to your continuous integration pipeline. Every code change, model retrain, or data update triggers automated fairness checks. Configurable exit codes block releases that fail fairness thresholds — bias never ships to production. Your QA team reviews fairness results alongside unit tests and integration tests.",
    tools: ["CI/CD exit codes", "CLI tool", "GitHub Actions / Jenkins"],
  },
  {
    stage: "04",
    title: "Regulatory Submission",
    subtitle: "Audit-Ready Documentation",
    description:
      "Generate pre-submission fairness documentation formatted for FDA 510(k), De Novo, PMA, EU MDR Technical Files, and AI Act Conformity Assessments. Every audit is timestamped, version-controlled, and traceable to specific model versions and datasets. Regulatory affairs teams receive submission-ready PDF and JSON reports without manual assembly.",
    tools: ["PDF/JSON reports", "Submission templates", "Version control"],
  },
  {
    stage: "05",
    title: "Post-Market Surveillance",
    subtitle: "Continuous Monitoring in Production",
    description:
      "Once your product is deployed in health systems, ParityScope monitors real-world performance for fairness drift. Receive alerts when demographic performance gaps widen beyond thresholds. Generate periodic post-market surveillance reports required by both FDA and EU MDR. Demonstrate ongoing compliance throughout your product's full lifecycle.",
    tools: ["Drift detection", "Real-time alerts", "Surveillance reports"],
  },
];

const benefits = [
  {
    title: "Pre-Submission Fairness Documentation",
    description:
      "Generate regulatory-grade fairness reports mapped to FDA guidance documents and EU AI Act conformity requirements. Stop spending weeks manually assembling compliance evidence — ParityScope produces submission-ready documentation in minutes, not months.",
  },
  {
    title: "SDK Embeds Into Your Development Pipeline",
    description:
      "Install with pip, import in Python, and start auditing. The SDK runs on your infrastructure — no patient data leaves your environment. Works with any ML framework: TensorFlow, PyTorch, scikit-learn, or custom models. Your engineers use it like any other testing library.",
  },
  {
    title: "CI/CD Integration Catches Bias Before Release",
    description:
      "Add a single step to your CI pipeline. ParityScope runs fairness checks on every build and returns exit codes your pipeline understands. Failing builds are blocked automatically — no biased model version ever reaches a release branch without explicit review and override.",
  },
  {
    title: "Audit Trail for Regulatory Submissions",
    description:
      "Every audit result is immutably logged with timestamp, model version, dataset hash, fairness thresholds, and metric values. When regulators ask for evidence of ongoing monitoring, your complete audit history is available immediately — no retroactive documentation required.",
  },
];

const faqItems = [
  {
    question: "Does ParityScope work with our existing ML framework?",
    answer:
      "Yes. ParityScope is framework-agnostic. It evaluates model predictions, not model internals. Whether you build with TensorFlow, PyTorch, scikit-learn, ONNX, or a custom framework, ParityScope audits fairness by analyzing predictions against demographic data. The SDK integrates via a simple Python API.",
  },
  {
    question: "How does CI/CD integration work?",
    answer:
      "ParityScope provides a CLI tool that runs fairness audits and returns POSIX-compliant exit codes. Exit code 0 means all fairness thresholds passed; non-zero means one or more metrics failed. Add it as a step in GitHub Actions, Jenkins, GitLab CI, or any CI/CD platform. Failing builds are blocked automatically, and detailed reports are saved as build artifacts.",
  },
  {
    question: "What regulatory frameworks does ParityScope map to?",
    answer:
      "ParityScope generates reports mapped to FDA 510(k) and De Novo guidance, EU MDR Technical File requirements, EU AI Act Conformity Assessments (Articles 9, 10, 15), Section 1557 of the Affordable Care Act, and emerging frameworks in South Korea and Taiwan. Each report automatically selects the relevant fairness metrics, thresholds, and documentation format for the target jurisdiction.",
  },
  {
    question: "Can we white-label ParityScope reports for our customers?",
    answer:
      "Yes. Our Enterprise and Platform plans support white-label reporting. You can embed ParityScope's fairness reports into your product's compliance documentation with your branding, or provide them as part of customer-facing transparency materials. This is especially valuable for MedTech companies selling into health systems that require vendor fairness evidence.",
  },
  {
    question: "How does ParityScope handle intersectional analysis?",
    answer:
      "ParityScope evaluates fairness across individual protected attributes (race, gender, age, etc.) and their intersections (e.g., Black women over 65, Hispanic men with Medicaid). Intersectional analysis is critical because models can appear fair on individual attributes while exhibiting significant bias for specific subgroups. Our SDK automatically identifies the intersections with the largest performance disparities.",
  },
  {
    question: "Does patient data leave our infrastructure?",
    answer:
      "Never. ParityScope's SDK runs entirely on your infrastructure. Patient data, model predictions, and demographic information stay behind your firewall. Only aggregated, de-identified fairness metrics are surfaced to dashboards. The architecture is HIPAA-ready by design and compatible with your existing security posture.",
  },
];

export default function MedtechPage() {
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
            MedTech & Digital Health
          </p>
          <h1 className="mt-4 max-w-4xl text-h1 font-bold leading-tight tracking-tight lg:text-display">
            Ship Compliant AI Products{" "}
            <span className="text-teal">Faster and With Confidence</span>
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-light-gray">
            Embed fairness testing directly into your development pipeline. Meet
            FDA, EU MDR, and AI Act requirements with automated bias detection,
            CI/CD integration, and regulatory-grade documentation — without
            slowing down your release cycle.
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
              Explore the SDK
            </Link>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="The Challenge"
            title="Regulatory Expectations Are Outpacing Your Compliance Capabilities"
            description="MedTech companies face a rapidly evolving regulatory landscape where algorithmic fairness is no longer optional — it is a prerequisite for market access."
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

      {/* Product Development Lifecycle */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Product Development Lifecycle"
            title="Fairness Built Into Every Stage of Your Pipeline"
            description="From first prototype to post-market surveillance, ParityScope integrates into every phase of your product development lifecycle — ensuring compliance is continuous, not an afterthought."
            align="left"
          />
          <div className="mt-16 space-y-8">
            {lifecycleStages.map((stage) => (
              <div
                key={stage.stage}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy text-h3 font-bold text-teal">
                    {stage.stage}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                      <h3 className="text-h4 font-semibold text-navy">
                        {stage.title}
                      </h3>
                      <span className="text-body-sm font-medium text-teal">
                        {stage.subtitle}
                      </span>
                    </div>
                    <p className="mt-3 text-medium-gray">
                      {stage.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {stage.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full bg-teal/10 px-3 py-1 text-body-sm font-medium text-teal"
                        >
                          {tool}
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

      {/* Key Benefits */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Key Benefits"
            title="Why MedTech Companies Choose ParityScope"
            description="From regulatory submissions to enterprise sales, ParityScope gives your team the tools to prove fairness — not just claim it."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border border-light-gray p-8 shadow-card"
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

      {/* Developer Experience / Code Example */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                Developer Experience
              </p>
              <h2 className="mt-3 text-h2 font-bold text-white">
                Add Fairness Testing in 15 Minutes
              </h2>
              <p className="mt-4 text-body-lg text-light-gray">
                ParityScope&apos;s Python SDK drops into your existing pipeline
                with minimal configuration. Define your fairness requirements
                once and enforce them on every build — from local development
                through production deployment.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "pip install parityscope — no complex dependencies",
                  "Works with scikit-learn, PyTorch, TensorFlow, and ONNX",
                  "YAML-based threshold configuration",
                  "Non-zero exit codes for CI/CD gate enforcement",
                  "JSON and PDF report output for regulatory submissions",
                  "Runs entirely on your build infrastructure",
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
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-white/20" />
                <div className="h-3 w-3 rounded-full bg-white/20" />
                <div className="h-3 w-3 rounded-full bg-white/20" />
                <span className="ml-2 font-mono text-body-sm text-medium-gray">
                  .github/workflows/fairness.yml
                </span>
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed">
                <code className="text-light-gray">
                  <span className="text-medium-gray"># Add to your CI/CD pipeline</span>
                  {"\n"}
                  <span className="text-teal-light">name</span>
                  <span className="text-white">: Fairness Gate</span>
                  {"\n"}
                  <span className="text-teal-light">on</span>
                  <span className="text-white">: [push, pull_request]</span>
                  {"\n\n"}
                  <span className="text-teal-light">jobs</span>
                  <span className="text-white">:</span>
                  {"\n"}
                  {"  "}
                  <span className="text-teal-light">fairness-audit</span>
                  <span className="text-white">:</span>
                  {"\n"}
                  {"    "}
                  <span className="text-teal-light">runs-on</span>
                  <span className="text-white">: ubuntu-latest</span>
                  {"\n"}
                  {"    "}
                  <span className="text-teal-light">steps</span>
                  <span className="text-white">:</span>
                  {"\n"}
                  {"      "}
                  <span className="text-white">- uses: actions/checkout@v4</span>
                  {"\n"}
                  {"      "}
                  <span className="text-white">- run: pip install parityscope</span>
                  {"\n"}
                  {"      "}
                  <span className="text-white">- run: parityscope audit \</span>
                  {"\n"}
                  {"          "}
                  <span className="text-coral">--config fairness.yml</span>
                  {" "}
                  <span className="text-white">\</span>
                  {"\n"}
                  {"          "}
                  <span className="text-coral">--jurisdiction fda,eu_ai_act</span>
                  {" "}
                  <span className="text-white">\</span>
                  {"\n"}
                  {"          "}
                  <span className="text-coral">--output report.pdf</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantage Stats */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Competitive Advantage"
            title="Win Enterprise Deals with Fairness Proof"
            description="Health system procurement teams are adding AI fairness requirements to vendor evaluations. ParityScope gives you the documentation to win."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                stat: "15+",
                label: "Fairness Metrics",
                description:
                  "Demonstrate comprehensive bias evaluation across demographic parity, equal opportunity, calibration, and more — far beyond what competitors can show.",
              },
              {
                stat: "4",
                label: "Regulatory Jurisdictions",
                description:
                  "Ship one product globally with compliance documentation for the EU AI Act, Section 1557, South Korea, and Taiwan — all from a single audit run.",
              },
              {
                stat: "0",
                label: "Patient Records Exposed",
                description:
                  "Tell your enterprise customers that their patient data never leaves their environment. Our privacy-first SDK architecture removes data handling objections entirely.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-light-gray p-8 text-center shadow-card"
              >
                <p className="text-h1 font-bold text-teal">{item.stat}</p>
                <p className="mt-1 text-body-sm font-semibold text-navy">
                  {item.label}
                </p>
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
            description="Common questions from MedTech product and regulatory teams evaluating ParityScope."
          />
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Ship Compliant AI Products Faster?"
        description="Join leading MedTech companies using ParityScope to embed fairness testing into their development pipeline and accelerate regulatory approval."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </>
  );
}
