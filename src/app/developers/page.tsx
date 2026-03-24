import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developers — ParityScope SDK",
  description:
    "Download the ParityScope SDK. Audit, monitor, and mitigate bias in clinical AI systems. pip install parityscope.",
};

const tiers = [
  {
    id: "trial",
    name: "Trial",
    keyPrefix: "PS-TRIAL",
    price: "Free",
    period: "30 days",
    limits: "1 model, 5K samples",
    features: [
      "15 fairness metrics",
      "4 regulatory jurisdictions",
      "PDF & JSON reports",
      "CLI & Python SDK",
      "Root cause analysis",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    keyPrefix: "PS-STARTER",
    price: "EUR 30,000",
    period: "/year",
    limits: "5 models, 50K samples",
    features: [
      "Everything in Trial",
      "EU AI Act conformity reports",
      "FDA premarket documentation",
      "Section 1557 analysis",
      "Compliance checklists",
      "Evidence packages",
      "Email support",
    ],
  },
  {
    id: "pro",
    name: "Professional",
    keyPrefix: "PS-PRO",
    price: "EUR 75,000",
    period: "/year",
    limits: "25 models, 500K samples",
    features: [
      "Everything in Starter",
      "Continuous monitoring",
      "Drift detection & alerts",
      "Trend analysis",
      "REST API server",
      "Intersectional analysis",
      "Bootstrap confidence intervals",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    keyPrefix: "PS-ENTERPRISE",
    price: "Custom",
    period: "",
    limits: "Unlimited",
    features: [
      "Everything in Professional",
      "Unlimited models & samples",
      "On-premise deployment",
      "Custom metrics & jurisdictions",
      "Dedicated support engineer",
      "SLA guarantee",
      "Security review & SOC 2",
    ],
  },
];

export default function DevelopersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0B1D3A] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            ParityScope SDK
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Audit, monitor, and mitigate bias in clinical AI systems.
            Install in 30 seconds. First audit in 5 minutes.
          </p>
          <div className="bg-gray-900 rounded-lg p-4 max-w-2xl mx-auto text-left font-mono text-sm">
            <span className="text-gray-500">$</span>{" "}
            <span className="text-green-400">pip install</span>{" "}
            <span className="text-white">parityscope</span>{" "}
            <span className="text-gray-500">--index-url</span>{" "}
            <span className="text-cyan-400">https://parityscope.com/sdk/simple/</span>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0B1D3A] mb-8 text-center">
            Quick Start
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-3">
                Step 1: Install the SDK
              </h3>
              <pre className="bg-gray-900 text-gray-100 rounded p-4 text-sm overflow-x-auto">
{`pip install parityscope --index-url https://parityscope.com/sdk/simple/ --extra-index-url https://pypi.org/simple/`}
              </pre>
              <p className="text-xs text-gray-500 mt-2">
                Or download directly:{" "}
                <a href="/sdk/dist/parityscope-0.2.0-py3-none-any.whl" className="text-[#0EA5A0] hover:underline">
                  parityscope-0.2.0-py3-none-any.whl
                </a>
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-3">
                Step 2: Activate your license
              </h3>
              <pre className="bg-gray-900 text-gray-100 rounded p-4 text-sm overflow-x-auto">
                parityscope license activate PS-TRIAL-your-key-here
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-3">
                Step 3: Run your first audit
              </h3>
              <pre className="bg-gray-900 text-gray-100 rounded p-4 text-sm overflow-x-auto">
{`parityscope audit \\
  --data patient_data.csv \\
  --model-name "my_model" \\
  --attributes race sex \\
  --jurisdiction eu-ai-act \\
  --domain diagnosis`}
              </pre>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold text-lg mb-3">
                Or use the Python SDK directly
              </h3>
              <pre className="bg-gray-900 text-gray-100 rounded p-4 text-sm overflow-x-auto">
{`from parityscope import FairnessAudit

audit = FairnessAudit(
    model_name="sepsis_risk_v2",
    protected_attributes=["race", "sex"],
    jurisdiction="eu-ai-act",
    clinical_domain="diagnosis",
)

result = audit.run(
    y_true=labels,
    y_pred=predictions,
    demographics=demographics_df,
)

print(f"Overall: {result.overall_fairness.value}")
for m in result.unfair_metrics:
    print(f"  {m.display_name}: {m.disparity:.4f}")`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* SDK Tiers */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-[#0B1D3A] mb-4 text-center">
            SDK Licensing Tiers
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Start with a free trial. Upgrade when you need more models,
            samples, or continuous monitoring.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`rounded-xl p-6 border-2 ${
                  tier.highlighted
                    ? "border-[#0EA5A0] shadow-lg"
                    : "border-gray-200"
                }`}
              >
                {tier.highlighted && (
                  <span className="inline-block bg-[#0EA5A0] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-xl font-bold text-[#0B1D3A]">
                  {tier.name}
                </h3>
                <div className="mt-2 mb-1">
                  <span className="text-2xl font-bold text-[#0B1D3A]">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-gray-500 text-sm">
                      {tier.period}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-4">{tier.limits}</p>

                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start text-sm text-gray-700"
                    >
                      <span className="text-[#0EA5A0] mr-2 mt-0.5">
                        &#10003;
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.id === "enterprise" ? "/contact" : "/contact"}
                  className={`block text-center py-2 px-4 rounded-lg font-semibold text-sm ${
                    tier.highlighted
                      ? "bg-[#0EA5A0] text-white hover:bg-[#0c8f8b]"
                      : "bg-gray-100 text-[#0B1D3A] hover:bg-gray-200"
                  }`}
                >
                  {tier.id === "trial"
                    ? "Get Trial Key"
                    : tier.id === "enterprise"
                    ? "Contact Sales"
                    : "Get Started"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Links */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#0B1D3A] mb-8">
            Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-2">CLI Reference</h3>
              <p className="text-sm text-gray-600 mb-3">
                Full command reference for audit, monitor, simulate, report, and
                serve commands.
              </p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                parityscope --help
              </code>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-2">REST API</h3>
              <p className="text-sm text-gray-600 mb-3">
                Start the API server and view auto-generated OpenAPI
                documentation.
              </p>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                parityscope serve
              </code>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-2">GitHub</h3>
              <p className="text-sm text-gray-600 mb-3">
                Source code, examples, and issue tracker.
              </p>
              <Link
                href="https://github.com/ChuehanKuo/ParityScope"
                className="text-[#0EA5A0] text-sm font-semibold hover:underline"
              >
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#0B1D3A] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to audit your AI?
          </h2>
          <p className="text-gray-300 mb-8">
            Get a free trial key and run your first fairness audit in under 5
            minutes. No credit card required.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#0EA5A0] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0c8f8b]"
          >
            Get Your Trial Key
          </Link>
        </div>
      </section>
    </main>
  );
}
