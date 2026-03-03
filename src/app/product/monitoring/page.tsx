import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "Continuous Monitoring — Real-time AI Fairness Tracking",
  description:
    "Monitor AI fairness in production with real-time dashboards, automated alerts, drift detection, and audit trail generation. Keep clinical AI compliant continuously.",
};

const whyMonitorReasons = [
  {
    title: "Population Drift",
    description:
      "Patient demographics shift over time. A model trained on one population may become unfair as the patient mix changes. Seasonal admissions, new clinic openings, and demographic shifts in service areas can all introduce silent bias that only surfaces through continuous monitoring.",
    stat: "73%",
    statLabel: "of models show fairness drift within 12 months",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    title: "Practice Changes",
    description:
      "Clinical workflows evolve constantly. New treatment guidelines, updated coding standards, and changes in referral patterns alter the relationship between model inputs and patient outcomes. These shifts can introduce new biases that did not exist at deployment time.",
    stat: "2-3x",
    statLabel: "faster detection vs. periodic audits",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
  },
  {
    title: "Regulatory Updates",
    description:
      "Compliance requirements are evolving rapidly across all four jurisdictions ParityScope supports. New regulations, updated thresholds, and enforcement actions mean a model compliant today may fall out of compliance tomorrow without active monitoring and automatic re-evaluation.",
    stat: "4",
    statLabel: "jurisdictions tracked in real-time",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
];

const monitoringFeatures = [
  {
    title: "Real-Time Dashboards",
    description:
      "Live fairness metrics across your entire model portfolio. Track demographic parity, equal opportunity, and calibration scores as new predictions are made, with configurable time windows from hourly to quarterly.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
  },
  {
    title: "Automated Alerting",
    description:
      "Instant notifications via email, Slack, or webhook when any fairness metric breaches its threshold. Configurable escalation rules for critical failures with on-call team routing.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    ),
  },
  {
    title: "Drift Detection",
    description:
      "Statistical tests detect when fairness metrics deviate significantly from baseline. Distinguishes between random fluctuation and meaningful distributional shift using confidence intervals and control charts.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: "Audit Trail",
    description:
      "Complete, immutable log of every fairness evaluation, threshold change, and remediation action. Timestamped and exportable for regulatory inspections and compliance documentation.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: "Configurable Thresholds",
    description:
      "Set warning and critical thresholds per metric, per model, or portfolio-wide. Align thresholds with regulatory requirements from any of the four supported jurisdictions automatically.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
  {
    title: "Portfolio View",
    description:
      "Monitor every model across your organization from a single dashboard. Aggregate compliance status, identify systemic patterns, and prioritize remediation efforts across your entire AI portfolio.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
      </svg>
    ),
  },
];

const dashboardModels = [
  { name: "Sepsis Risk Score", status: "passing" as const, demParity: 0.03, equalOpp: 0.05, calibration: 0.02, lastAudit: "2 min ago" },
  { name: "Readmission Predictor", status: "review" as const, demParity: 0.09, equalOpp: 0.07, calibration: 0.11, lastAudit: "14 min ago" },
  { name: "HTN Risk Classifier", status: "failing" as const, demParity: 0.21, equalOpp: 0.18, calibration: 0.24, lastAudit: "6 min ago" },
  { name: "Diabetes Screening", status: "passing" as const, demParity: 0.04, equalOpp: 0.03, calibration: 0.05, lastAudit: "8 min ago" },
  { name: "ED Triage Algorithm", status: "passing" as const, demParity: 0.02, equalOpp: 0.04, calibration: 0.03, lastAudit: "1 min ago" },
  { name: "Cardiac Event Predictor", status: "review" as const, demParity: 0.08, equalOpp: 0.10, calibration: 0.07, lastAudit: "22 min ago" },
];

function getMetricColor(value: number) {
  if (value > 0.10) return "text-coral-light";
  if (value > 0.07) return "text-amber";
  return "text-green-light";
}

function StatusBadge({ status }: { status: "passing" | "review" | "failing" }) {
  const config = {
    passing: { label: "PASS", dotBg: "bg-green", badgeBg: "bg-green/10", text: "text-green-light" },
    review: { label: "REVIEW", dotBg: "bg-amber", badgeBg: "bg-amber/10", text: "text-amber" },
    failing: { label: "FAIL", dotBg: "bg-coral", badgeBg: "bg-coral/10", text: "text-coral-light" },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full ${c.badgeBg} px-2.5 py-0.5 text-caption font-semibold ${c.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dotBg}`} />
      {c.label}
    </span>
  );
}

export default function MonitoringPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy px-4 pb-20 pt-20 text-white sm:px-6 lg:px-8">
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
          <Link
            href="/product"
            className="inline-flex items-center gap-2 text-body-sm font-medium text-teal-light transition-colors hover:text-teal"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Platform
          </Link>
          <h1 className="mt-6 max-w-3xl text-h1 font-bold leading-tight tracking-tight lg:text-display">
            Continuous Monitoring
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-light-gray">
            Real-time fairness tracking in production. Detect drift before it
            impacts patients, get automated alerts when thresholds are breached,
            and maintain a complete audit trail for regulatory compliance.
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
        </div>
      </section>

      {/* Why Monitor */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Why Monitor"
            title="Fairness Is Not a One-Time Check"
            description="A model that passes audit today can fail tomorrow. Production environments introduce new variables that static audits cannot anticipate."
          />
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {whyMonitorReasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-xl border border-light-gray p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-coral/10 text-coral">
                  {reason.icon}
                </div>
                <h3 className="mt-5 text-h4 font-semibold text-navy">
                  {reason.title}
                </h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-h3 font-bold text-teal">
                    {reason.stat}
                  </span>
                  <span className="text-body-sm text-medium-gray">
                    {reason.statLabel}
                  </span>
                </div>
                <p className="mt-3 text-medium-gray">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Features"
            title="Everything You Need for Production Fairness"
            description="From real-time dashboards to automated compliance documentation, ParityScope monitoring keeps your AI portfolio fair and auditable."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {monitoringFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal/10 text-teal">
                  {feature.icon}
                </div>
                <h3 className="mt-5 text-h4 font-semibold text-navy">
                  {feature.title}
                </h3>
                <p className="mt-3 text-medium-gray">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mock Dashboard */}
      <section className="bg-near-black px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Dashboard Preview"
            title="Portfolio Monitoring at a Glance"
            description="Track every model in your organization from a single, real-time dashboard. Instantly identify which models need attention."
            theme="dark"
          />
          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-elevated">
            {/* Dashboard header bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-coral" />
                <div className="h-3 w-3 rounded-full bg-amber" />
                <div className="h-3 w-3 rounded-full bg-green" />
                <span className="ml-2 font-mono text-body-sm text-light-gray">
                  ParityScope Monitor
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-caption text-green-light">
                  <span className="h-2 w-2 rounded-full bg-green" />
                  Live
                </span>
                <span className="text-caption text-medium-gray">
                  Last refresh: 30s ago
                </span>
              </div>
            </div>

            {/* Summary bar */}
            <div className="grid grid-cols-4 border-b border-white/10">
              <div className="border-r border-white/10 p-4 text-center">
                <p className="text-h3 font-bold text-white">6</p>
                <p className="text-caption text-medium-gray">Total Models</p>
              </div>
              <div className="border-r border-white/10 p-4 text-center">
                <p className="text-h3 font-bold text-green-light">3</p>
                <p className="text-caption text-medium-gray">Passing</p>
              </div>
              <div className="border-r border-white/10 p-4 text-center">
                <p className="text-h3 font-bold text-amber">2</p>
                <p className="text-caption text-medium-gray">Review</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-h3 font-bold text-coral-light">1</p>
                <p className="text-caption text-medium-gray">Failing</p>
              </div>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-6 border-b border-white/10 px-6 py-3">
              <span className="text-caption font-semibold uppercase tracking-wider text-teal-light">
                Model
              </span>
              <span className="text-caption font-semibold uppercase tracking-wider text-teal-light">
                Status
              </span>
              <span className="text-caption font-semibold uppercase tracking-wider text-teal-light">
                Dem. Parity
              </span>
              <span className="text-caption font-semibold uppercase tracking-wider text-teal-light">
                Equal Opp.
              </span>
              <span className="text-caption font-semibold uppercase tracking-wider text-teal-light">
                Calibration
              </span>
              <span className="text-caption font-semibold uppercase tracking-wider text-teal-light">
                Last Audit
              </span>
            </div>

            {/* Table rows */}
            {dashboardModels.map((model) => (
              <div
                key={model.name}
                className="grid grid-cols-6 items-center border-b border-white/5 px-6 py-3 transition-colors hover:bg-white/5"
              >
                <span className="font-mono text-body-sm text-white">
                  {model.name}
                </span>
                <span>
                  <StatusBadge status={model.status} />
                </span>
                <span className={`font-mono text-body-sm ${getMetricColor(model.demParity)}`}>
                  {model.demParity.toFixed(2)}
                </span>
                <span className={`font-mono text-body-sm ${getMetricColor(model.equalOpp)}`}>
                  {model.equalOpp.toFixed(2)}
                </span>
                <span className={`font-mono text-body-sm ${getMetricColor(model.calibration)}`}>
                  {model.calibration.toFixed(2)}
                </span>
                <span className="text-caption text-medium-gray">
                  {model.lastAudit}
                </span>
              </div>
            ))}

            {/* Dashboard footer */}
            <div className="flex items-center justify-between px-6 py-3">
              <span className="text-caption text-medium-gray">
                Showing 6 of 6 monitored models
              </span>
              <span className="text-caption text-medium-gray">
                Thresholds: PASS &lt; 0.05 | REVIEW 0.05-0.10 | FAIL &gt; 0.10
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Options */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Integration"
            title="Fits Into Your Existing Infrastructure"
            description="ParityScope monitoring integrates with your production ML systems through multiple deployment options."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "SDK Instrumentation",
                description:
                  "Add a few lines to your model serving code. The SDK captures predictions and demographics at inference time and streams fairness metrics to the monitoring dashboard automatically.",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                  </svg>
                ),
              },
              {
                title: "Batch Processing",
                description:
                  "Schedule periodic audits on stored prediction logs. Ideal for high-throughput models where real-time evaluation is impractical. Supports Parquet, CSV, and database queries.",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  </svg>
                ),
              },
              {
                title: "API Webhooks",
                description:
                  "Push prediction events to the ParityScope monitoring API. Compatible with TensorFlow Serving, Triton, Seldon, SageMaker, or any custom REST endpoints.",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                ),
              },
            ].map((integration) => (
              <div
                key={integration.title}
                className="rounded-xl border border-light-gray p-8 shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-navy/5 text-navy">
                  {integration.icon}
                </div>
                <h3 className="mt-5 text-h4 font-semibold text-navy">
                  {integration.title}
                </h3>
                <p className="mt-3 text-medium-gray">
                  {integration.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Stop Guessing. Start Monitoring."
        description="A model that was fair at deployment can drift silently. ParityScope monitoring catches fairness degradation before it reaches patients."
        primaryCTA={{ label: "Book a Demo", href: "/contact" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </>
  );
}
