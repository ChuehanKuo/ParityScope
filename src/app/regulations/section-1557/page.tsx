import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Section 1557 — Anti-Discrimination in Healthcare AI",
  description:
    "Understand how Section 1557 of the Affordable Care Act applies to healthcare AI and algorithms. Learn compliance requirements and how ParityScope helps.",
};

const requirements = [
  {
    title: "Non-Discrimination in Clinical Algorithms",
    description:
      "Healthcare providers using clinical algorithms, predictive models, or AI-driven decision support must ensure these tools do not discriminate against patients based on race, color, national origin, sex, age, or disability.",
  },
  {
    title: "Proactive Bias Assessment",
    description:
      "Organizations cannot simply wait for discrimination complaints. The 2024 final rule establishes an obligation to proactively identify and address potential discrimination in clinical decision-making tools, including AI systems.",
  },
  {
    title: "Covered Protected Classes",
    description:
      "Section 1557 protects against discrimination on the basis of race, color, national origin, sex (including sexual orientation and gender identity), age, and disability. AI systems must be tested across all of these dimensions.",
  },
  {
    title: "Remediation Obligation",
    description:
      "When bias is identified in a clinical algorithm or AI system, healthcare organizations must take steps to mitigate the discrimination. Continued use of a biased system after identification may constitute a violation.",
  },
  {
    title: "Documentation & Evidence",
    description:
      "Organizations should maintain documentation demonstrating their efforts to assess and mitigate bias in clinical AI systems. This documentation serves as evidence of compliance in the event of an investigation or complaint.",
  },
  {
    title: "Third-Party AI Liability",
    description:
      "Healthcare providers remain responsible for discriminatory outcomes even when using third-party AI systems. Purchasing an AI tool from a vendor does not transfer the obligation to ensure non-discrimination.",
  },
];

const parityHelps = [
  {
    title: "Comprehensive Bias Auditing",
    description:
      "ParityScope tests clinical AI systems across all Section 1557 protected classes — race, color, national origin, sex, age, and disability — using 15+ validated fairness metrics to identify statistical disparities.",
  },
  {
    title: "Disparity Detection & Root Cause Analysis",
    description:
      "Our SDK does not just flag bias — it identifies where disparities originate, whether from training data imbalances, feature correlations, or model architecture, so you can address root causes.",
  },
  {
    title: "Mitigation Recommendations",
    description:
      "ParityScope provides actionable, evidence-based recommendations for reducing identified disparities, from resampling strategies to fairness-constrained retraining approaches.",
  },
  {
    title: "Compliance Documentation",
    description:
      "Generate Section 1557-specific compliance reports that document your testing methodology, results, and mitigation actions — ready for regulatory review or legal defense.",
  },
  {
    title: "Ongoing Monitoring",
    description:
      "Bias can emerge or worsen over time as patient populations shift. ParityScope provides continuous monitoring to ensure your AI systems remain non-discriminatory in production.",
  },
  {
    title: "Third-Party Vendor Assessment",
    description:
      "Validate that AI systems purchased from third-party vendors meet Section 1557 non-discrimination requirements before and after deployment in your clinical environment.",
  },
];

export default function Section1557Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-widest text-teal">
            Regulatory Guide
          </p>
          <h1 className="mt-4 text-h1 font-bold leading-tight lg:text-display">
            Section 1557 — Anti-Discrimination in Healthcare AI
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            Section 1557 of the Affordable Care Act prohibits discrimination in
            healthcare — and the 2024 final rule makes clear that this
            prohibition extends to clinical algorithms and AI systems.
            Healthcare organizations must proactively test for and mitigate
            bias in their AI tools.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book a Compliance Assessment
            </Link>
            <Link
              href="/resources/whitepapers"
              className="rounded-full border border-white/30 px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Download Section 1557 Brief
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            Overview of Section 1557
          </h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-medium-gray">
              <p>
                Section 1557 of the Affordable Care Act (ACA) is the first
                federal civil rights law to broadly prohibit discrimination in
                healthcare. It applies to any healthcare program or activity
                that receives federal financial assistance, operates on a
                federal health insurance exchange, or is administered by a
                federal executive agency.
              </p>
              <p>
                The 2024 final rule from the Department of Health and Human
                Services (HHS) explicitly addresses the use of clinical
                algorithms, predictive analytics, and AI systems in healthcare.
                It clarifies that the use of biased AI tools can constitute
                discrimination under Section 1557, even when the bias is
                unintentional.
              </p>
              <p>
                This means healthcare organizations using AI for clinical
                decision support, patient risk stratification, resource
                allocation, or treatment recommendations have an affirmative
                obligation to assess these systems for discriminatory outcomes
                and take corrective action when bias is found.
              </p>
            </div>
            <div className="rounded-2xl border border-light-gray bg-off-white p-8">
              <h3 className="text-h4 font-semibold text-navy">
                Key Points
              </h3>
              <ul className="mt-4 space-y-3 text-body-sm text-medium-gray">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Applies to all entities receiving federal healthcare funding
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  2024 final rule explicitly covers AI and clinical algorithms
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Protects: race, color, national origin, sex, age, disability
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Unintentional bias can constitute a violation
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Providers liable even for third-party AI systems
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Enforced by the HHS Office for Civil Rights (OCR)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Applies to AI */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            How Section 1557 Applies to AI
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            The 2024 final rule creates specific obligations for healthcare
            organizations using AI and clinical algorithms.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {requirements.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-light-gray bg-white p-6 shadow-card"
              >
                <h3 className="text-h4 font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-body-sm text-medium-gray">
                  {item.description}
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
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            ParityScope provides the tools and documentation healthcare
            organizations need to demonstrate Section 1557 compliance for their
            AI systems.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {parityHelps.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-light-gray p-6"
              >
                <h3 className="text-h4 font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-body-sm text-medium-gray">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-section text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold">
            Ensure Your AI Is Non-Discriminatory
          </h2>
          <p className="mt-4 text-body-lg text-light-gray">
            Section 1557 compliance is not optional for healthcare organizations
            using AI. Book an assessment to understand your risk exposure and
            build an action plan.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book a Compliance Assessment
            </Link>
            <Link
              href="/resources/whitepapers"
              className="rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Download Section 1557 Brief
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
