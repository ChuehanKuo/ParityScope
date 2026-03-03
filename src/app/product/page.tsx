import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "Product — AI Fairness Platform for Healthcare",
  description:
    "ParityScope's end-to-end platform for auditing, monitoring, and mitigating AI bias in healthcare applications. SDK-first architecture, 15+ fairness metrics, 4 regulatory jurisdictions.",
};

const modules = [
  {
    label: "Module 01",
    title: "Fairness Audit",
    href: "/product/fairness-audit",
    description:
      "Comprehensive bias detection across 15+ fairness metrics and every protected attribute. Generate regulation-mapped audit reports that quantify disparities across race, gender, age, insurance status, and more.",
    highlights: [
      "15+ metrics including demographic parity, equal opportunity, and calibration",
      "Intersectional analysis across multiple attributes simultaneously",
      "Regulation-specific compliance scoring for EU AI Act, Section 1557, and more",
      "PDF and JSON export for audit documentation",
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
  },
  {
    label: "Module 02",
    title: "Continuous Monitoring",
    href: "/product/monitoring",
    description:
      "Real-time fairness tracking in production environments. Detect drift before it impacts patients with automated alerting, configurable thresholds, and a complete audit trail for regulatory compliance.",
    highlights: [
      "Real-time dashboards with portfolio-wide visibility",
      "Automated alerts when fairness metrics breach configurable thresholds",
      "Population drift detection across demographic groups",
      "Complete audit trail generation for regulatory inspections",
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    label: "Module 03",
    title: "Bias Mitigation",
    href: "/product/mitigation",
    description:
      "Move from detection to action with what-if simulations and automated remediation recommendations. Test threshold adjustments, resampling strategies, and feature modifications before they touch patients.",
    highlights: [
      "What-if simulation engine for safe experimentation",
      "Threshold adjustment with fairness-accuracy tradeoff tracking",
      "Balanced resampling and feature analysis strategies",
      "Side-by-side comparison of mitigation outcomes",
    ],
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
    ),
  },
];

const capabilities = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: "SDK-First Architecture",
    description:
      "Our SDK runs entirely on your infrastructure. Patient data never leaves your environment. Install via pip and integrate in minutes with any Python ML pipeline.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "Regulation-Aware Engine",
    description:
      "Automatic metric selection and compliance scoring for EU AI Act, Section 1557, South Korea, and Taiwan. One audit, multiple jurisdiction reports.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    title: "Clinical Domain Awareness",
    description:
      "Purpose-built for healthcare AI. Domain-specific thresholds, clinical context for metrics, and use-case-appropriate fairness definitions for diagnostics, risk scores, and treatment recommendations.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
      </svg>
    ),
    title: "Flexible Data Tiers",
    description:
      "Three data access levels — Minimal (predictions only), Standard (predictions + demographics), and Full (raw features). Get meaningful results at every tier.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    title: "Report Export",
    description:
      "Generate detailed PDF audit reports with executive summaries, metric breakdowns, and regulatory compliance mappings. JSON export for programmatic integration.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    title: "CI/CD Integration",
    description:
      "Embed fairness checks into your deployment pipeline. Fail builds that don't meet fairness thresholds. Works with GitHub Actions, GitLab CI, Jenkins, and any CI system.",
  },
];

export default function ProductPage() {
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
            Platform Overview
          </p>
          <h1 className="mt-4 max-w-4xl text-h1 font-bold leading-tight tracking-tight lg:text-display">
            The AI Fairness Platform{" "}
            <span className="text-teal">Built for Healthcare</span>
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-light-gray">
            ParityScope gives you the tools to detect, monitor, and fix bias in
            clinical AI — with an SDK-first approach that keeps patient data on
            your infrastructure and maps every finding to regulatory requirements.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book a Demo
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Pricing
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 lg:grid-cols-4">
            {[
              { value: "15+", label: "Fairness Metrics" },
              { value: "4", label: "Regulatory Jurisdictions" },
              { value: "0", label: "Patient Records Exposed" },
              { value: "19/24", label: "Failures Found in One Model" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-h2 font-bold text-teal">{stat.value}</p>
                <p className="mt-1 text-body-sm text-light-gray">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit. Monitor. Improve. — Three Modules */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Three Integrated Modules"
            title="Audit. Monitor. Improve."
            description="ParityScope covers the full AI fairness lifecycle — from pre-deployment bias detection to continuous production monitoring and automated remediation."
          />

          <div className="mt-20 space-y-24">
            {modules.map((mod, index) => (
              <div
                key={mod.title}
                className={`grid items-center gap-12 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                {/* Text side */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <p className="text-body-sm font-semibold uppercase tracking-wider text-teal">
                    {mod.label}
                  </p>
                  <h3 className="mt-3 text-h2 font-bold text-navy">
                    {mod.title}
                  </h3>
                  <p className="mt-4 text-body-lg text-medium-gray">
                    {mod.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {mod.highlights.map((item) => (
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
                      href={mod.href}
                      className="inline-flex items-center gap-2 text-base font-semibold text-teal transition-colors hover:text-teal-dark"
                    >
                      Learn more
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

                {/* Visual placeholder */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="rounded-2xl border border-light-gray bg-off-white p-8">
                    <div className="flex items-center gap-3 border-b border-light-gray pb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal/10 text-teal">
                        {mod.icon}
                      </div>
                      <div>
                        <p className="text-body-sm font-semibold text-navy">
                          {mod.title}
                        </p>
                        <p className="text-caption text-medium-gray">
                          ParityScope Platform
                        </p>
                      </div>
                    </div>
                    {index === 0 && (
                      <div className="mt-6 space-y-3">
                        {[
                          { metric: "Demographic Parity", status: "FAIL", color: "coral", width: "72%" },
                          { metric: "Equal Opportunity", status: "PASS", color: "green", width: "95%" },
                          { metric: "Calibration Diff.", status: "REVIEW", color: "amber", width: "82%" },
                          { metric: "FNR Parity", status: "FAIL", color: "coral", width: "38%" },
                        ].map((row) => (
                          <div key={row.metric} className="rounded-lg bg-white p-3 shadow-card">
                            <div className="flex items-center justify-between">
                              <span className="text-body-sm text-navy">{row.metric}</span>
                              <span className={`rounded-full bg-${row.color}/10 px-2 py-0.5 text-caption font-semibold text-${row.color}`}>
                                {row.status}
                              </span>
                            </div>
                            <div className="mt-2 h-1.5 rounded-full bg-light-gray">
                              <div className={`h-1.5 rounded-full bg-${row.color}`} style={{ width: row.width }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {index === 1 && (
                      <div className="mt-6 space-y-3">
                        <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-card">
                          <span className="text-body-sm text-navy">Active Models</span>
                          <span className="text-h4 font-bold text-teal">12</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-card">
                          <span className="text-body-sm text-navy">Alerts (7d)</span>
                          <span className="text-h4 font-bold text-amber">3</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-card">
                          <span className="text-body-sm text-navy">Drift Detected</span>
                          <span className="text-h4 font-bold text-coral">1</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-card">
                          <span className="text-body-sm text-navy">Compliance Status</span>
                          <span className="text-body-sm font-semibold text-green">11/12 Passing</span>
                        </div>
                      </div>
                    )}
                    {index === 2 && (
                      <div className="mt-6 space-y-3">
                        <div className="rounded-lg bg-white p-3 shadow-card">
                          <p className="text-caption font-semibold text-navy">Threshold Adjustment</p>
                          <div className="mt-2 flex items-center justify-between text-caption">
                            <span className="text-medium-gray">Accuracy</span>
                            <span className="text-navy">64.2% (-1.8%)</span>
                          </div>
                          <div className="mt-1 flex items-center justify-between text-caption">
                            <span className="text-medium-gray">Demographic Parity</span>
                            <span className="font-semibold text-green">PASS (+18.3%)</span>
                          </div>
                        </div>
                        <div className="rounded-lg bg-white p-3 shadow-card">
                          <p className="text-caption font-semibold text-navy">Balanced Resampling</p>
                          <div className="mt-2 flex items-center justify-between text-caption">
                            <span className="text-medium-gray">Accuracy</span>
                            <span className="text-navy">65.1% (-0.9%)</span>
                          </div>
                          <div className="mt-1 flex items-center justify-between text-caption">
                            <span className="text-medium-gray">Demographic Parity</span>
                            <span className="font-semibold text-green">PASS (+15.7%)</span>
                          </div>
                        </div>
                        <div className="rounded-lg bg-teal/5 p-3 text-center">
                          <p className="text-caption font-semibold text-teal">
                            Compare strategies side-by-side
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Capabilities"
            title="Everything You Need for AI Fairness Compliance"
            description="From privacy-first data handling to automated CI/CD pipeline integration, ParityScope is designed for enterprise healthcare workflows."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy/5 text-navy">
                  {cap.icon}
                </div>
                <h3 className="mt-5 text-h4 font-semibold text-navy">
                  {cap.title}
                </h3>
                <p className="mt-3 text-medium-gray">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDK Preview */}
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
                ParityScope&apos;s Python SDK integrates into your existing ML
                pipeline with just a few lines of code. Run audits locally, get
                regulation-specific compliance scores, and export detailed reports
                — all without sending patient data anywhere.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Install via pip — no complex dependencies",
                  "Works with scikit-learn, PyTorch, and TensorFlow",
                  "Runs entirely on your infrastructure",
                  "JSON and PDF report export",
                  "CI/CD pipeline gates for fairness thresholds",
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
            </div>

            <div className="overflow-hidden rounded-2xl border border-light-gray bg-near-black shadow-elevated">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-coral/60" />
                <div className="h-3 w-3 rounded-full bg-amber/60" />
                <div className="h-3 w-3 rounded-full bg-green/60" />
                <span className="ml-2 font-mono text-caption text-medium-gray">
                  audit_pipeline.py
                </span>
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-body-sm leading-relaxed">
                <code>
                  <span className="text-medium-gray"># pip install parityscope</span>{"\n"}
                  <span className="text-coral-light">from</span>{" "}
                  <span className="text-teal-light">parityscope</span>{" "}
                  <span className="text-coral-light">import</span>{" "}
                  <span className="text-white">FairnessAudit</span>{"\n\n"}
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
                  <span className="text-amber">&quot;risk_stratification&quot;</span>{"\n"}
                  <span className="text-white">)</span>{"\n\n"}
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
                  <span className="text-white">patient_demo</span>{"\n"}
                  <span className="text-white">)</span>{"\n\n"}
                  <span className="text-medium-gray"># Get compliance verdict</span>{"\n"}
                  <span className="text-coral-light">print</span>
                  <span className="text-white">(result.summary())</span>{"\n"}
                  <span className="text-medium-gray"># → 19/24 metrics failed</span>{"\n\n"}
                  <span className="text-medium-gray"># Export for regulators</span>{"\n"}
                  <span className="text-white">result.to_pdf(</span>
                  <span className="text-amber">&quot;report.pdf&quot;</span>
                  <span className="text-white">)</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to See What Your Metrics Are Hiding?"
        description="Join healthcare organizations that use ParityScope to ensure equitable AI outcomes for every patient population."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </>
  );
}
