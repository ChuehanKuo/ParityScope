import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Continuous Monitoring — Real-time AI Fairness Tracking",
  description:
    "Monitor AI fairness in production with drift detection, automated alerts, trend analysis, and lightweight SQLite-based persistence.",
};

const capabilities = [
  {
    title: "Drift Detection",
    description:
      "Automatically detect when fairness metrics shift beyond configurable thresholds. Uses statistical tests to distinguish meaningful drift from normal variation.",
    icon: (
      <svg className="h-8 w-8 text-teal" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 24l6-8 5 3 7-11 6 6" />
        <path strokeLinecap="round" d="M4 28h24" />
      </svg>
    ),
  },
  {
    title: "Automated Alerts",
    description:
      "Configure alert rules per metric, subgroup, and severity level. Notifications are delivered via webhook, email, or direct integration with your incident management system.",
    icon: (
      <svg className="h-8 w-8 text-teal" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 4v2M16 26v2M6 16H4M28 16h-2M8.9 8.9L7.5 7.5M23.1 8.9l1.4-1.4" />
        <circle cx="16" cy="16" r="6" />
      </svg>
    ),
  },
  {
    title: "Trend Analysis",
    description:
      "Visualize how fairness metrics evolve over time. Identify slow-moving trends that would be invisible in point-in-time audits, with time-series decomposition and seasonal adjustment.",
    icon: (
      <svg className="h-8 w-8 text-teal" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 28V4M4 24h4v4H4zM10 20h4v8h-4zM16 16h4v12h-4zM22 12h4v16h-4z" />
      </svg>
    ),
  },
  {
    title: "Historical Comparison",
    description:
      "Compare current metrics against any previous audit or monitoring run. Understand exactly when and how fairness characteristics changed between deployments.",
    icon: (
      <svg className="h-8 w-8 text-teal" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1.5}>
        <rect x="4" y="6" width="10" height="20" rx="2" />
        <rect x="18" y="6" width="10" height="20" rx="2" />
        <path strokeLinecap="round" d="M14 16h4" />
      </svg>
    ),
  },
  {
    title: "Monitoring Dashboard",
    description:
      "A unified view of all monitored models, their current fairness status, active alerts, and trend summaries. Designed for compliance officers and ML engineers alike.",
    icon: (
      <svg className="h-8 w-8 text-teal" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1.5}>
        <rect x="4" y="4" width="24" height="24" rx="3" />
        <path strokeLinecap="round" d="M4 12h24M12 12v16" />
      </svg>
    ),
  },
  {
    title: "Scheduled Runs",
    description:
      "Define monitoring cadences — daily, weekly, monthly, or event-triggered. Each run is logged with full provenance for audit trail compliance.",
    icon: (
      <svg className="h-8 w-8 text-teal" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="16" cy="16" r="12" />
        <path strokeLinecap="round" d="M16 8v8l5 5" />
      </svg>
    ),
  },
];

const architectureFeatures = [
  {
    title: "SQLite-Based Persistence",
    description:
      "All monitoring history is stored in a single SQLite database file. No external database infrastructure required. Easy to back up, migrate, and version control.",
  },
  {
    title: "Lightweight Footprint",
    description:
      "Runs as a background process or scheduled job. Minimal CPU and memory requirements — typically under 256 MB RAM even for large-scale monitoring.",
  },
  {
    title: "Alongside Existing Infrastructure",
    description:
      "Deploys as a sidecar, cron job, or integration within your ML pipeline. No changes to your existing model serving architecture.",
  },
  {
    title: "Stateless Computation",
    description:
      "Each monitoring run is fully self-contained. Results are deterministic and reproducible regardless of prior state, ensuring audit integrity.",
  },
];

export default function MonitoringPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 text-body-sm text-slate-400">
            <Link href="/product" className="hover:text-teal">Product</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Monitoring</span>
          </nav>
          <h1 className="text-display font-bold text-white">
            Continuous Monitoring
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-slate-300">
            Catch fairness drift before it causes harm. Automated, scheduled
            monitoring that tracks every metric across every subgroup — and alerts
            you when something changes.
          </p>
        </div>
      </section>

      {/* The Challenge */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-h2 font-bold text-navy">The Challenge</h2>
              <p className="mt-4 text-body-lg text-medium-gray">
                A model that passes a fairness audit today can fail tomorrow.
                Patient populations shift, data pipelines change, upstream systems
                are updated, and clinical workflows evolve. A one-time audit gives
                you a snapshot — not a guarantee.
              </p>
              <p className="mt-4 text-body-lg text-medium-gray">
                Without continuous monitoring, fairness degradation goes undetected
                until it surfaces as patient complaints, regulatory findings, or
                adverse outcomes.
              </p>
            </div>
            <div className="space-y-6">
              <div className="rounded-xl border border-light-gray bg-off-white p-6">
                <h3 className="text-h4 font-semibold text-navy">Data Distribution Shift</h3>
                <p className="mt-2 text-medium-gray">
                  As patient demographics change over time, a model's fairness
                  profile can degrade even without any changes to the model itself.
                </p>
              </div>
              <div className="rounded-xl border border-light-gray bg-off-white p-6">
                <h3 className="text-h4 font-semibold text-navy">Silent Failures</h3>
                <p className="mt-2 text-medium-gray">
                  Fairness degradation rarely triggers traditional ML monitoring
                  alerts. Overall accuracy can remain stable while subgroup
                  performance diverges dramatically.
                </p>
              </div>
              <div className="rounded-xl border border-light-gray bg-off-white p-6">
                <h3 className="text-h4 font-semibold text-navy">Regulatory Expectations</h3>
                <p className="mt-2 text-medium-gray">
                  The EU AI Act and FDA guidance increasingly expect ongoing
                  monitoring, not just pre-deployment testing. Continuous evidence
                  of fairness is becoming a compliance requirement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">How It Works</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            Set up once, monitor continuously. ParityScope handles scheduling,
            computation, storage, and alerting.
          </p>
          <div className="mx-auto mt-16 max-w-3xl space-y-8">
            {[
              {
                step: "1",
                title: "Configure Monitoring",
                text: "Define which models to monitor, which metrics to track, alert thresholds, and the monitoring schedule. Configuration is code-first via YAML or the SDK.",
              },
              {
                step: "2",
                title: "Scheduled Data Ingestion",
                text: "At each monitoring interval, ParityScope ingests the latest model predictions and demographic data — either pushed from your pipeline or pulled from a configured data source.",
              },
              {
                step: "3",
                title: "Drift Detection & Analysis",
                text: "Metrics are computed and compared against baseline values using statistical tests. Drift is classified by severity (info, warning, critical) based on your configured thresholds.",
              },
              {
                step: "4",
                title: "Alert & Report",
                text: "When drift exceeds thresholds, alerts fire immediately. Trend reports are generated on schedule. All results are persisted for audit trail compliance.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal text-h3 font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-h4 font-semibold text-navy">{item.title}</h3>
                  <p className="mt-2 text-medium-gray">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">Key Capabilities</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            Everything you need to maintain fairness in production, from detection
            to documentation.
          </p>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <div className="mb-4">{cap.icon}</div>
                <h3 className="text-h4 font-semibold text-navy">{cap.title}</h3>
                <p className="mt-3 text-body-sm text-medium-gray">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            Lightweight Architecture
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            Designed to run alongside your existing infrastructure with zero
            operational overhead. No dedicated database servers, no complex
            deployments.
          </p>
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {architectureFeatures.map((feat) => (
              <div key={feat.title} className="rounded-xl border border-light-gray bg-white p-8">
                <h3 className="text-h4 font-semibold text-navy">{feat.title}</h3>
                <p className="mt-3 text-medium-gray">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold text-white">
            Keep Your Models Fair in Production
          </h2>
          <p className="mt-4 text-body-lg text-slate-300">
            Set up continuous monitoring in minutes. Catch drift before it becomes
            a compliance issue or a patient safety concern.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-teal px-8 py-3 font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Request a Demo
            </Link>
            <Link
              href="/product/mitigation"
              className="rounded-lg border border-slate-500 px-8 py-3 font-semibold text-white transition-colors hover:border-teal hover:text-teal"
            >
              Explore Mitigation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
