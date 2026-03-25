import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = {
  title: "Product — AI Fairness Platform for Healthcare",
  description:
    "ParityScope's end-to-end platform for auditing, monitoring, and mitigating AI bias in healthcare applications.",
};

const modules = [
  {
    title: "Fairness Audit",
    href: "/product/fairness-audit",
    description:
      "Comprehensive bias detection across 15+ metrics, every protected attribute, and all major clinical AI use cases.",
    icon: (
      <svg className="h-10 w-10 text-teal" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 20l8-12h8l8 12-8 12h-8L8 20z" />
        <circle cx="20" cy="20" r="5" />
      </svg>
    ),
  },
  {
    title: "Continuous Monitoring",
    href: "/product/monitoring",
    description:
      "Real-time fairness tracking in production with automated alerting, drift detection, and audit trail generation.",
    icon: (
      <svg className="h-10 w-10 text-teal" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 30l8-10 6 4 8-14 6 8 4-4" />
        <path strokeLinecap="round" d="M4 36h32" />
      </svg>
    ),
  },
  {
    title: "Bias Mitigation",
    href: "/product/mitigation",
    description:
      "Actionable recommendations and what-if simulations to remediate identified biases without sacrificing model accuracy.",
    icon: (
      <svg className="h-10 w-10 text-teal" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 6v28M6 20h28" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l16 16M28 12L12 28" />
        <circle cx="20" cy="20" r="14" />
      </svg>
    ),
  },
];

const transparencyPoints = [
  {
    heading: "Deterministic & Reproducible",
    text: "Run the same analysis twice, get the same result. Every metric is computed from well-defined statistical formulas — no random seeds, no stochastic variation.",
  },
  {
    heading: "No Training Data Required",
    text: "ParityScope is not a trained AI model. It is a statistical evaluation engine. It never learns from your data, so there is no risk of data leakage or model contamination.",
  },
  {
    heading: "Every Output Explainable",
    text: "Each metric comes with a plain-language interpretation, the formula used, the sample sizes considered, and confidence intervals. Nothing is hidden.",
  },
  {
    heading: "Auditor-Ready Documentation",
    text: "Reports are designed for regulators, compliance officers, and clinical review boards — not just data scientists. Every number can be traced back to its source.",
  },
];

const dataTiers = [
  {
    tier: "Minimal",
    label: "Privacy-First",
    data: "Model predictions + group labels only",
    metrics: "Core classification parity metrics",
    useCase: "Quick screening when raw data cannot leave your environment",
  },
  {
    tier: "Standard",
    label: "Recommended",
    data: "Predictions + demographics + ground-truth labels",
    metrics: "Full 15+ metric suite including calibration and effect sizes",
    useCase: "Comprehensive audits for regulatory submissions",
  },
  {
    tier: "Full",
    label: "Deep Analysis",
    data: "Predictions + demographics + labels + feature data",
    metrics: "All metrics plus subgroup discovery and root-cause analysis",
    useCase: "End-to-end fairness governance with mitigation recommendations",
  },
];

const deploymentOptions = [
  {
    name: "Cloud SaaS",
    description: "Managed platform hosted by ParityScope. Fastest time to value with zero infrastructure overhead.",
    features: ["Managed updates", "Dashboard included", "SOC 2 compliant", "Team collaboration"],
  },
  {
    name: "On-Premise SDK",
    description: "Python SDK that runs entirely within your infrastructure. Patient data never leaves your environment.",
    features: ["Data stays on-prem", "pip install", "Air-gapped support", "Full API control"],
  },
  {
    name: "Privacy-Preserving",
    description: "Hybrid approach using differential privacy and federated evaluation for multi-site deployments.",
    features: ["Multi-site support", "Differential privacy", "Aggregate reporting", "No raw data sharing"],
  },
];

export default function ProductPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "ParityScope",
        applicationCategory: "HealthcareApplication",
        operatingSystem: "Cross-platform",
        description: "AI fairness auditing, continuous monitoring, and bias mitigation toolkit for healthcare organizations.",
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "EUR",
          lowPrice: "25000",
          offerCount: "3",
        },
      }} />
      {/* Hero */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-display font-bold text-white">
            One Toolkit. Complete Fairness Governance.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-body-lg text-slate-300">
            ParityScope is built on a simple philosophy: fairness evaluation must
            be deterministic, reproducible, and transparent. We are not a black-box
            AI — we are a statistical engine you can trust, audit, and explain.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-teal px-8 py-3 font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book an Assessment
            </Link>
            <Link
              href="/docs"
              className="rounded-lg border border-slate-500 px-8 py-3 font-semibold text-white transition-colors hover:border-teal hover:text-teal"
            >
              Read the Docs
            </Link>
          </div>
        </div>
      </section>

      {/* Module Cards */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            Three Modules, One Platform
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            Each module works independently or together as an integrated fairness
            governance suite.
          </p>
          <div className="mt-16 grid gap-10 lg:grid-cols-3">
            {modules.map((mod) => (
              <Link
                key={mod.title}
                href={mod.href}
                className="group rounded-xl border border-light-gray bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="mb-5">{mod.icon}</div>
                <h3 className="text-h3 font-semibold text-navy group-hover:text-teal">
                  {mod.title}
                </h3>
                <p className="mt-3 text-medium-gray">{mod.description}</p>
                <span className="mt-6 inline-flex items-center text-body-sm font-semibold text-teal">
                  Learn more
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m-4-4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Not a Black Box */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-h2 font-bold text-navy">Not a Black Box</h2>
            <p className="mt-4 text-body-lg text-medium-gray">
              ParityScope is a statistical evaluation engine — not a trained AI
              model. Every result is fully explainable, every metric is
              mathematically defined, and every run is perfectly reproducible.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {transparencyPoints.map((point) => (
              <div
                key={point.heading}
                className="rounded-xl border border-light-gray bg-white p-8"
              >
                <h3 className="text-h4 font-semibold text-navy">
                  {point.heading}
                </h3>
                <p className="mt-3 text-medium-gray">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Access Tiers */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            Data Access Tiers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            ParityScope adapts to your data availability and privacy constraints.
            More data enables deeper analysis, but meaningful results start with
            minimal input.
          </p>
          <div className="mt-16 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b-2 border-navy">
                  <th className="pb-4 pr-6 text-h4 font-semibold text-navy">Tier</th>
                  <th className="pb-4 pr-6 text-h4 font-semibold text-navy">Data Required</th>
                  <th className="pb-4 pr-6 text-h4 font-semibold text-navy">Metrics Available</th>
                  <th className="pb-4 text-h4 font-semibold text-navy">Best For</th>
                </tr>
              </thead>
              <tbody>
                {dataTiers.map((row) => (
                  <tr key={row.tier} className="border-b border-light-gray">
                    <td className="py-5 pr-6 align-top">
                      <span className="font-semibold text-navy">{row.tier}</span>
                      <span className="ml-2 rounded-full bg-teal/10 px-2 py-0.5 text-caption font-medium text-teal">
                        {row.label}
                      </span>
                    </td>
                    <td className="py-5 pr-6 align-top text-medium-gray">{row.data}</td>
                    <td className="py-5 pr-6 align-top text-medium-gray">{row.metrics}</td>
                    <td className="py-5 align-top text-medium-gray">{row.useCase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Deployment Options */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            Deployment Options
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            Run ParityScope however your security and compliance teams require.
          </p>
          <div className="mt-16 grid gap-10 lg:grid-cols-3">
            {deploymentOptions.map((opt) => (
              <div
                key={opt.name}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <h3 className="text-h3 font-semibold text-navy">{opt.name}</h3>
                <p className="mt-3 text-medium-gray">{opt.description}</p>
                <ul className="mt-6 space-y-3">
                  {opt.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-body-sm text-dark-gray">
                      <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-green" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l3 3 7-7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold text-white">
            Ready to Make Your AI Fair?
          </h2>
          <p className="mt-4 text-body-lg text-slate-300">
            Get started with a free fairness audit on your own data, or talk to
            our team about enterprise deployment.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-teal px-8 py-3 font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book an Assessment
            </Link>
            <Link
              href="/product/fairness-audit"
              className="rounded-lg border border-slate-500 px-8 py-3 font-semibold text-white transition-colors hover:border-teal hover:text-teal"
            >
              Explore the Audit Module
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
