import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EHR Vendors & Health AI Startups — ParityScope",
  description:
    "Embed ParityScope's fairness SDK into your platform. One integration serves your entire customer base with built-in AI compliance.",
};

const painPoints = [
  {
    title: "Customer Compliance Requirements",
    description:
      "Your hospital and health system customers are demanding AI fairness documentation as part of procurement. Without built-in compliance tooling, you lose deals to competitors who offer it.",
  },
  {
    title: "Embedded AI Model Liability",
    description:
      "Prediction models embedded in your platform — readmission risk, deterioration scores, scheduling optimization — create shared liability between you and your customers when outcomes are inequitable.",
  },
  {
    title: "Platform-Level Liability Exposure",
    description:
      "As the platform provider, you face aggregate liability across your entire customer base. A single biased model deployed across hundreds of health systems multiplies your risk exponentially.",
  },
  {
    title: "Scaling Fairness Across Customers",
    description:
      "Each customer has different patient populations, demographic distributions, and fairness requirements. Manual auditing does not scale when you serve dozens or hundreds of health systems.",
  },
];

const solutions = [
  {
    heading: "One SDK Integration, Entire Customer Base",
    body: "Integrate ParityScope once into your platform and automatically provide fairness auditing to every customer. Each health system gets population-specific results without any additional integration work on their side.",
    detail:
      "Multi-tenant architecture ensures customer data isolation while providing you with aggregate insights across your portfolio. Deploy new fairness capabilities to all customers simultaneously.",
  },
  {
    heading: "SDK Integration into ML Pipelines",
    body: "ParityScope's SDK integrates directly into your model training and deployment pipelines. Run fairness checks as part of your CI/CD process — before a model update reaches any customer environment.",
    detail:
      "Python SDK, REST API, and webhook integrations. Compatible with MLflow, Kubeflow, SageMaker, and custom orchestration frameworks. Less than 50 lines of code to integrate.",
  },
  {
    heading: "Continuous Monitoring for Deployed Models",
    body: "Models that pass fairness testing at deployment can drift over time as patient populations shift. ParityScope monitors model performance across subgroups continuously and alerts both you and your customers when intervention is needed.",
    detail:
      "Customer-facing dashboards are white-labeled to your brand. Alert routing sends notifications to your support team and the customer's AI governance contact simultaneously.",
  },
  {
    heading: "Channel Partner Opportunity",
    body: "Beyond compliance, ParityScope creates a revenue opportunity. Offer fairness auditing as a premium platform feature or value-added service. Differentiate your platform and create a new margin stream.",
    detail:
      "Flexible licensing models support per-customer, per-model, or unlimited-use arrangements. Our partnerships team will help you structure the commercial offering for your customer base.",
  },
];

export default function EhrVendorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-6 text-body-sm text-navy-light">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/solutions" className="hover:text-white">Solutions</Link>
            <span className="mx-2">/</span>
            <span className="text-white">EHR Vendors &amp; Health AI Startups</span>
          </nav>
          <h1 className="text-display font-bold text-white">
            ParityScope for EHR Vendors &amp; Health AI Startups
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-navy-light">
            Embed fairness auditing directly into your platform. One SDK
            integration gives every customer built-in AI compliance — turning
            regulatory pressure into a competitive advantage.
          </p>
        </div>
      </section>

      {/* Pain Points */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            The Challenges You Face
          </h2>
          <p className="mt-4 max-w-2xl text-body-lg text-medium-gray">
            Your customers need AI compliance. Building it yourself is a
            distraction from your core product. Ignoring it loses you deals.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {painPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-2xl bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <h3 className="text-h4 font-semibold text-navy">
                  {point.title}
                </h3>
                <p className="mt-3 text-body-sm text-dark-gray">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How ParityScope Helps */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            How ParityScope Helps
          </h2>
          <div className="mt-12 space-y-20">
            {solutions.map((item, i) => (
              <div
                key={item.heading}
                className={`flex flex-col gap-10 lg:flex-row lg:items-center ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="lg:w-1/2">
                  <h3 className="text-h3 font-semibold text-navy">
                    {item.heading}
                  </h3>
                  <p className="mt-4 text-body-lg text-dark-gray">
                    {item.body}
                  </p>
                  <p className="mt-3 text-body-sm text-medium-gray">
                    {item.detail}
                  </p>
                </div>
                <div className="flex items-center justify-center lg:w-1/2">
                  <div className="h-48 w-full rounded-2xl bg-light-gray" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Recommendation */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-h2 font-bold text-navy">
            Recommended: SDK License or Enterprise Tier
          </h2>
          <p className="mt-4 text-body-lg text-dark-gray">
            Most EHR vendors start with the SDK License tier for development and
            testing, then upgrade to Enterprise as their customer base grows and
            continuous monitoring becomes essential.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-8 shadow-card text-left">
              <h4 className="text-h4 font-semibold text-teal">SDK License</h4>
              <ul className="mt-4 space-y-3 text-body-sm text-dark-gray">
                <li>Python SDK and REST API access</li>
                <li>CI/CD pipeline integration</li>
                <li>Per-model fairness audit reports</li>
                <li>Ideal for development and pre-launch validation</li>
              </ul>
            </div>
            <div className="rounded-xl bg-white p-8 shadow-card text-left">
              <h4 className="text-h4 font-semibold text-teal">Enterprise</h4>
              <ul className="mt-4 space-y-3 text-body-sm text-dark-gray">
                <li>Multi-tenant continuous monitoring</li>
                <li>White-labeled customer dashboards</li>
                <li>Channel partner licensing flexibility</li>
                <li>Ideal for production deployment at scale</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Context */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            Regulatory Landscape
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            Your customers face these requirements — and they expect you to help
            them comply. ParityScope makes that possible at platform scale.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-light-gray p-6">
              <h4 className="text-h4 font-semibold text-navy">EU AI Act</h4>
              <p className="mt-2 text-body-sm text-dark-gray">
                Health system customers operating in the EU need conformity
                assessment evidence for every AI model in their workflow —
                including models embedded in your platform.
              </p>
            </div>
            <div className="rounded-2xl border border-light-gray p-6">
              <h4 className="text-h4 font-semibold text-navy">CMS Requirements</h4>
              <p className="mt-2 text-body-sm text-dark-gray">
                US health systems face increasing AI equity mandates from CMS
                and state regulators. Platform-level fairness tooling helps your
                customers meet these requirements out of the box.
              </p>
            </div>
            <div className="rounded-2xl border border-light-gray p-6">
              <h4 className="text-h4 font-semibold text-navy">ONC Certification</h4>
              <p className="mt-2 text-body-sm text-dark-gray">
                As ONC certification evolves to include AI governance criteria,
                EHR vendors with embedded fairness tooling will be positioned
                for faster certification and competitive differentiation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-h2 font-bold text-white">
            Turn Compliance Into a Competitive Advantage
          </h2>
          <p className="mt-4 text-body-lg text-navy-light">
            Explore how ParityScope integrates into your platform. Our
            partnerships team will help you scope the integration, structure the
            commercial model, and launch to your customer base.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-coral px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-coral/90"
            >
              Explore Partnership
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-white px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              View SDK Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
