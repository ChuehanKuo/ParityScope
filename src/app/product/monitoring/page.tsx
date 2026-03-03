import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";
import { Accordion } from "@/components/ui/accordion";
import { FeatureCard } from "@/components/ui/feature-card";

export const metadata: Metadata = {
  title: "Continuous Monitoring — Real-time AI Fairness Tracking",
  description:
    "Monitor AI fairness in production with real-time dashboards, automated alerts, drift detection, and audit trail generation. ParityScope keeps your clinical AI compliant 24/7.",
};

const monitoringFeatures = [
  {
    icon: <span className="text-xl">📊</span>,
    title: "Real-Time Dashboards",
    description:
      "Live fairness metric visualizations across every deployed model. Track demographic parity, equal opportunity, and calibration trends over time with configurable time windows from hourly to quarterly.",
  },
  {
    icon: <span className="text-xl">📉</span>,
    title: "Fairness Drift Detection",
    description:
      "Statistical process control detects when fairness metrics deviate from established baselines. Algorithms account for seasonal patient population shifts and distinguish genuine drift from sampling noise.",
  },
  {
    icon: <span className="text-xl">🔔</span>,
    title: "Automated Alerting",
    description:
      "Configurable alert thresholds with multi-channel delivery. Get notified the moment a metric crosses a warning or critical boundary — before patients are impacted and before regulators notice.",
  },
  {
    icon: <span className="text-xl">📋</span>,
    title: "Audit Trail Generation",
    description:
      "Every metric evaluation, alert, and remediation action is logged immutably. Generate compliance audit trails on demand that demonstrate continuous fairness oversight to regulators.",
  },
  {
    icon: <span className="text-xl">🏥</span>,
    title: "Multi-Model Oversight",
    description:
      "Monitor fairness across your entire portfolio of clinical AI models from a single pane of glass. Compare fairness posture across radiology, pathology, triage, and other clinical domains simultaneously.",
  },
  {
    icon: <span className="text-xl">🔒</span>,
    title: "HIPAA-Safe Architecture",
    description:
      "The monitoring SDK transmits only aggregated metric values — never raw patient data. Counts, rates, and scores flow to the dashboard; PHI stays on your infrastructure at all times.",
  },
];

const pipelineSteps = [
  {
    step: "01",
    title: "Instrument Your Models",
    description:
      "Add the ParityScope monitoring SDK to your model inference pipeline. The SDK wraps your existing prediction calls and captures the metadata needed for fairness computation — predictions, ground truth (when available), and protected attribute indicators.",
  },
  {
    step: "02",
    title: "Establish Baselines",
    description:
      "Run an initial fairness audit to set baseline metric values for each model. ParityScope computes control limits using your historical data, accounting for natural population variation and seasonal patterns.",
  },
  {
    step: "03",
    title: "Stream Metrics Continuously",
    description:
      "As your model serves predictions in production, the SDK computes fairness metrics on configurable batches (every N predictions or every T minutes). Aggregated results stream to the monitoring dashboard via encrypted API calls.",
  },
  {
    step: "04",
    title: "Detect, Alert, and Act",
    description:
      "Statistical process control algorithms evaluate each incoming metric batch against baselines. When drift is detected, alerts fire through your configured channels and the system logs the event for audit compliance.",
  },
];

const alertConfig = [
  {
    level: "Warning",
    color: "bg-yellow-400",
    description:
      "A fairness metric has moved beyond 1 standard deviation from baseline or is approaching a regulatory threshold. Typically requires review within 48 hours.",
    actions: "Log event, notify data science team via Slack, flag on dashboard",
  },
  {
    level: "Critical",
    color: "bg-red-500",
    description:
      "A fairness metric has crossed a regulatory threshold or deviated more than 2 standard deviations from baseline. Requires immediate investigation.",
    actions: "Log event, page on-call via PagerDuty, send email to compliance officer, flag on dashboard",
  },
  {
    level: "Resolution",
    color: "bg-green-500",
    description:
      "A previously flagged metric has returned to acceptable range for a sustained period (configurable, default 72 hours). The incident is auto-closed.",
    actions: "Log resolution, notify original responders, update audit trail",
  },
];

const integrations = [
  {
    icon: <span className="text-xl">💬</span>,
    title: "Slack",
    description:
      "Receive formatted fairness alerts in dedicated Slack channels. Alerts include metric name, affected groups, severity level, and a direct link to the monitoring dashboard for investigation.",
  },
  {
    icon: <span className="text-xl">📟</span>,
    title: "PagerDuty",
    description:
      "Route critical fairness violations to your on-call rotation. Integrates with existing PagerDuty escalation policies so fairness incidents follow the same response workflow as infrastructure incidents.",
  },
  {
    icon: <span className="text-xl">✉️</span>,
    title: "Email",
    description:
      "Scheduled digest emails summarize fairness posture across all monitored models — daily, weekly, or monthly. Critical alerts also trigger immediate email notifications to designated compliance contacts.",
  },
  {
    icon: <span className="text-xl">🔗</span>,
    title: "Webhooks",
    description:
      "Send structured JSON payloads to any HTTP endpoint when alerts fire. Use webhooks to integrate with custom ticketing systems, internal dashboards, or compliance management platforms.",
  },
  {
    icon: <span className="text-xl">📊</span>,
    title: "Datadog / Grafana",
    description:
      "Export fairness metrics as custom metrics to your existing observability stack. Overlay fairness trends alongside model performance, latency, and infrastructure metrics for unified operational visibility.",
  },
  {
    icon: <span className="text-xl">🗄️</span>,
    title: "SIEM / Log Aggregation",
    description:
      "Stream fairness events to Splunk, Elastic, or your SIEM of choice. Maintain a centralized, searchable log of all fairness monitoring activity for security and compliance audits.",
  },
];

const apiEndpoints = [
  {
    method: "POST",
    path: "/v1/monitor/ingest",
    description: "Submit a batch of predictions, labels, and demographic data for fairness evaluation. Accepts JSON arrays with configurable batch sizes up to 10,000 records.",
  },
  {
    method: "GET",
    path: "/v1/monitor/metrics/{model_id}",
    description: "Retrieve current and historical fairness metrics for a specific model. Supports time range filters, metric selection, and group-level breakdowns.",
  },
  {
    method: "GET",
    path: "/v1/monitor/drift/{model_id}",
    description: "Get drift detection results including deviation magnitude, statistical significance, and affected demographic groups for a specified time window.",
  },
  {
    method: "GET",
    path: "/v1/monitor/alerts",
    description: "List active and resolved alerts across all monitored models. Filter by severity, model, metric, and date range. Includes full event timeline.",
  },
  {
    method: "PUT",
    path: "/v1/monitor/config/{model_id}",
    description: "Update monitoring configuration including alert thresholds, evaluation frequency, baseline parameters, and notification channel settings.",
  },
  {
    method: "POST",
    path: "/v1/monitor/report",
    description: "Generate an on-demand monitoring summary report in PDF or JSON format. Specify date range, models, and target regulatory jurisdiction.",
  },
];

const driftMethods = [
  {
    title: "Statistical Process Control (SPC)",
    description:
      "Applies Shewhart control charts to fairness metrics over time. Upper and lower control limits are computed from baseline data using configurable sigma levels (default: 2-sigma for warning, 3-sigma for critical). SPC naturally handles sampling variation and only fires when deviations are statistically meaningful.",
  },
  {
    title: "Population Stability Index (PSI)",
    description:
      "Measures shifts in the distribution of protected attributes in the incoming patient population. A rising PSI indicates that the demographic composition of model inputs is changing — which can cause fairness metrics to drift even if the model itself has not changed. PSI above 0.20 triggers an automatic demographic shift advisory.",
  },
  {
    title: "CUSUM (Cumulative Sum Control)",
    description:
      "Detects small, sustained drifts that SPC might miss. CUSUM accumulates the cumulative deviation of each metric from its target value and triggers when the accumulated deviation exceeds a decision boundary. Especially effective for catching gradual fairness degradation over weeks or months.",
  },
  {
    title: "Wasserstein Distance Monitoring",
    description:
      "Computes the earth mover's distance between the current and baseline distributions of prediction scores within each demographic group. Unlike threshold-based methods, Wasserstein distance captures distributional shape changes that might precede threshold violations, providing an early warning signal.",
  },
];

const faqItems = [
  {
    question: "How quickly does monitoring detect fairness drift?",
    answer:
      "Detection latency depends on your configured evaluation frequency. With the default settings, the SDK evaluates fairness on every batch of 500 predictions or every 30 minutes (whichever comes first). In high-throughput clinical settings, this typically means drift is detected within 1-2 hours of onset. You can reduce batch size for faster detection at the cost of noisier signals.",
  },
  {
    question: "Does monitoring require ground truth labels in real time?",
    answer:
      "No. ParityScope supports two monitoring modes: prediction-only monitoring tracks demographic parity and prediction-distribution metrics using only model outputs, while outcome-aware monitoring incorporates ground truth labels when they become available (which may be delayed in clinical settings). Most organizations run prediction-only monitoring continuously and overlay outcome-aware analysis on a weekly or monthly cadence.",
  },
  {
    question: "How much overhead does the monitoring SDK add to inference latency?",
    answer:
      "The SDK adds less than 2 milliseconds of overhead per prediction call. Metric computation happens asynchronously in a background thread and does not block the inference response. Batch transmission to the monitoring API occurs on a separate thread pool and is fully non-blocking.",
  },
  {
    question: "Can I monitor models deployed across multiple environments?",
    answer:
      "Yes. Each model instance registers with a unique deployment ID that includes environment metadata (staging, production-east, production-west, etc.). The dashboard supports filtering and aggregating by environment, so you can compare fairness metrics across deployments and detect environment-specific drift patterns.",
  },
  {
    question: "What happens if the monitoring API is temporarily unreachable?",
    answer:
      "The SDK buffers metric batches locally using a configurable ring buffer (default: 10,000 batches). When connectivity is restored, buffered data is transmitted in order. If the buffer fills before connectivity returns, oldest batches are dropped and a gap is recorded in the audit trail. Fairness computation continues locally regardless of connectivity.",
  },
  {
    question: "How does monitoring integrate with the Fairness Audit?",
    answer:
      "Monitoring and auditing share the same metric computation engine. When monitoring detects drift, you can trigger a full Fairness Audit on the latest data window with a single API call to get a comprehensive diagnostic report — including intersectional analysis and regulatory compliance mapping.",
  },
];

export default function MonitoringPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-wider text-teal">
            Continuous Monitoring
          </p>
          <h1 className="mt-3 text-h1 font-bold text-navy">
            Fairness Does Not End at Deployment
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-medium-gray">
            Clinical AI models operate on shifting patient populations. A model
            that was fair at launch can develop disparities over weeks or
            months. ParityScope Continuous Monitoring tracks fairness metrics
            in real time, detects drift before it reaches patients, and
            maintains the audit trail regulators require.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Request a Demo
            </a>
            <a
              href="/resources"
              className="rounded-full border border-navy px-8 py-3 text-center text-base font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Read the Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Monitoring Features */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Core Capabilities"
            title="Everything You Need for Production Fairness Oversight"
            description="From live dashboards to automated alerting, ParityScope provides the complete monitoring toolkit for clinical AI compliance."
            align="center"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {monitoringFeatures.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How Monitoring Works */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Data Pipeline"
            title="How Continuous Monitoring Works"
            description="A four-stage pipeline from model instrumentation to actionable alerts, designed to run at scale without exposing patient data."
            align="center"
          />
          <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {pipelineSteps.map((step) => (
              <div key={step.step} className="relative">
                <span className="text-5xl font-bold text-teal/20">
                  {step.step}
                </span>
                <h3 className="mt-2 text-h4 font-semibold text-navy">
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

      {/* Alert Configuration */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Alert Levels"
            title="Tiered Alert Configuration"
            description="Configure warning, critical, and resolution thresholds independently for each metric and model. Alerts route to the right team at the right urgency."
            align="center"
            theme="dark"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {alertConfig.map((alert) => (
              <div
                key={alert.level}
                className="rounded-xl border border-white/10 bg-white/5 p-8"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-3 w-3 rounded-full ${alert.color}`}
                  />
                  <h3 className="text-h4 font-semibold text-white">
                    {alert.level}
                  </h3>
                </div>
                <p className="mt-4 text-sm text-light-gray">
                  {alert.description}
                </p>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-teal">
                    Automated Actions
                  </p>
                  <p className="mt-2 text-sm text-light-gray">
                    {alert.actions}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Points */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Integrations"
            title="Fits Into Your Existing Workflow"
            description="ParityScope monitoring integrates with the tools your teams already use for alerting, observability, and incident response."
            align="center"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {integrations.map((integration) => (
              <FeatureCard
                key={integration.title}
                icon={integration.icon}
                title={integration.title}
                description={integration.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="REST API"
            title="Monitoring API Endpoints"
            description="Full programmatic access to monitoring data, configuration, and reporting via a RESTful API secured with API key authentication and TLS encryption."
            align="center"
          />
          <div className="mt-12 space-y-4 mx-auto max-w-4xl">
            {apiEndpoints.map((endpoint) => (
              <div
                key={endpoint.path}
                className="rounded-xl border border-light-gray bg-white p-6 shadow-card"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                      endpoint.method === "POST"
                        ? "bg-green-100 text-green-700"
                        : endpoint.method === "GET"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-medium text-navy">
                    {endpoint.path}
                  </code>
                </div>
                <p className="mt-3 text-sm text-medium-gray">
                  {endpoint.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drift Detection Methodology */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Drift Detection"
            title="Four Statistical Methods Working Together"
            description="No single drift detection algorithm is sufficient. ParityScope combines complementary methods to catch sudden shifts, gradual degradation, and distributional changes."
            align="center"
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {driftMethods.map((method) => (
              <div
                key={method.title}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <h3 className="text-h4 font-semibold text-navy">
                  {method.title}
                </h3>
                <p className="mt-3 text-sm text-medium-gray">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Mockup */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Dashboard Preview"
            title="See Your Fairness Posture at a Glance"
            description="The monitoring dashboard provides real-time visibility into fairness metrics across all deployed models, with drill-down capability to individual metrics and demographic groups."
            align="center"
          />
          <div className="mt-12 mx-auto max-w-5xl overflow-hidden rounded-xl border border-light-gray bg-white shadow-card">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between border-b border-light-gray bg-navy px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-teal/20 flex items-center justify-center">
                  <span className="text-sm text-teal font-bold">PS</span>
                </div>
                <span className="text-sm font-semibold text-white">
                  ParityScope Monitoring Dashboard
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-white/50">Last updated: 2 min ago</span>
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              </div>
            </div>
            {/* Model Status Cards */}
            <div className="grid grid-cols-3 gap-4 p-6">
              {[
                { name: "Radiology Triage", status: "Passing", color: "text-green-600 bg-green-50", metrics: "12/12" },
                { name: "Sepsis Prediction", status: "Warning", color: "text-yellow-600 bg-yellow-50", metrics: "10/12" },
                { name: "Readmission Risk", status: "Passing", color: "text-green-600 bg-green-50", metrics: "12/12" },
              ].map((model) => (
                <div key={model.name} className="rounded-lg border border-light-gray p-4">
                  <p className="text-xs font-medium text-medium-gray">{model.name}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${model.color}`}>
                      {model.status}
                    </span>
                    <span className="text-xs text-medium-gray">{model.metrics} metrics</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Metric Trend Mockup */}
            <div className="border-t border-light-gray p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-navy">Demographic Parity — Sepsis Prediction</p>
                <span className="text-xs text-medium-gray">Last 30 days</span>
              </div>
              <div className="mt-4 flex items-end gap-1 h-24">
                {[0.92, 0.91, 0.93, 0.90, 0.89, 0.91, 0.88, 0.87, 0.86, 0.85, 0.84, 0.83, 0.82, 0.81, 0.82].map(
                  (val, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t ${val >= 0.85 ? "bg-teal/60" : "bg-yellow-400/60"}`}
                      style={{ height: `${(val - 0.7) * 333}%` }}
                    />
                  )
                )}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-medium-gray">30 days ago</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-teal/60" />
                    <span className="text-xs text-medium-gray">Passing</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-yellow-400/60" />
                    <span className="text-xs text-medium-gray">Warning</span>
                  </div>
                </div>
                <span className="text-xs text-medium-gray">Today</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            label="FAQ"
            title="Frequently Asked Questions"
            description="Common questions about ParityScope Continuous Monitoring and production fairness oversight."
            align="center"
          />
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Keep Your Clinical AI Fair in Production"
        description="Deploy ParityScope Continuous Monitoring and get real-time fairness visibility across every model in your organization."
        primaryCTA={{ label: "Request a Demo", href: "/contact" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
        theme="navy"
      />
    </>
  );
}
