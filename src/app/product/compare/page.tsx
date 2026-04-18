import type { Metadata } from "next";
import Link from "next/link";
import { ComparisonTable } from "@/components/shared/comparison-table";

export const metadata: Metadata = {
  title: "ParityScope vs Epic AI Trust & Assurance Suite",
  description:
    "Why independent verification matters for your AI audit evidence. Compare ParityScope against Epic's built-in fairness tooling and horizontal AI governance platforms.",
};

const epicComparisonRows = [
  {
    feature: "Fairness audit",
    values: [
      "Yes (U Chicago/CMU toolkit inside Epic)",
      "Yes (independent methodology)",
    ],
  },
  {
    feature: "Model coverage",
    values: [
      "Epic-hosted models only",
      "Epic, Cerner / Oracle Health, Meditech, athenahealth, third-party, custom",
    ],
  },
  {
    feature: "Regulatory mapping",
    values: [
      "Limited to US",
      "EU AI Act, FDA SaMD, NIST AI RMF, Section 1557, CHAI, Joint Commission, South Korea, Taiwan",
    ],
  },
  {
    feature: "Audit evidence package",
    values: [
      "Embedded EHR report",
      "Reproducible with input hashing, engine versioning, regulator-ready formats",
    ],
  },
  {
    feature: "Continuous monitoring",
    values: [
      "Seismometer (within Epic)",
      "Cross-vendor, statistical drift detection, CUSUM changepoint, anomaly detection",
    ],
  },
  {
    feature: "Root cause analysis",
    values: [
      "Basic",
      "Proxy detection, label bias, feature importance, representation analysis",
    ],
  },
  {
    feature: "Remediation planning",
    values: [
      "None",
      "Strategy ranking, dependency sequencing, effort / lift estimates",
    ],
  },
  {
    feature: "Independence",
    values: ["Vendor-built (conflict)", "Third-party verification"],
  },
  {
    feature: "Deployment",
    values: ["Inside Epic", "On-premise SDK, API, CLI"],
  },
];

const useEpicFor = [
  "Internal development and iteration on Epic-native models",
  "Sprint-level spot checks during model build",
  "First-pass sanity testing inside the Epic workflow",
];

const useParityScopeFor = [
  "Audit evidence that goes into regulatory binders",
  "Pre-conformity assessment for EU Notified Bodies",
  "Discovery defense in litigation or civil rights investigations",
  "CHAI Assurance Resource Provider certification",
  "Multi-vendor audit harmonization across Epic, Cerner / Oracle, Meditech, athenahealth, and custom models",
  "Anything that leaves your organization",
];

const regulatorAcceptance = [
  {
    body: "Notified Bodies (EU AI Act)",
    note: "Require demonstrable independence for conformity assessments of high-risk AI systems.",
  },
  {
    body: "FDA",
    note: "Good Machine Learning Practice (GMLP) Principle 5 requires training dataset independence from the audit.",
  },
  {
    body: "CHAI Assurance Resource Provider framework",
    note: "Certifies independent providers. ModelOp and BeeKeeperAI were among those certified as of late 2025.",
  },
  {
    body: "Joint Commission AI certification (launching 2026)",
    note: "Voluntary certification; independent methodology strengthens the application.",
  },
  {
    body: "Plaintiff counsel / discovery",
    note: "Independence is a discoverable fact. Self-auditing with your EHR vendor's tool weakens a defense.",
  },
];

const horizontalTools = [
  {
    title: "Horizontal, not healthcare-native",
    text: "Credo AI, Holistic AI, Arthur AI, and Fiddler serve finance, insurance, HR, and generic enterprise AI alongside health. ParityScope is healthcare-only.",
  },
  {
    title: "Generic governance frameworks",
    text: "They map to NIST AI RMF, ISO 42001, and the EU AI Act in broad strokes. ParityScope maps to healthcare-specific regulation: FDA SaMD, Section 1557, CHAI, Joint Commission, plus EU AI Act Annex III for medical devices.",
  },
  {
    title: "No clinical context",
    text: "Horizontal tools require hospitals to translate between generic outputs and clinical reality &mdash; what a calibration gap means for a sepsis model, or why a subgroup sample size matters in an ED triage tool. ParityScope speaks clinical.",
  },
];

export default function ComparePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-wider text-teal">
            Comparison
          </p>
          <h1 className="mt-4 text-h1 font-bold leading-tight lg:text-display">
            ParityScope vs Epic AI Trust &amp; Assurance Suite
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            Why independent verification matters for your AI audit evidence.
          </p>
        </div>
      </section>

      {/* Section 1: The question */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-h2 font-bold text-navy">
            The question every hospital is asking
          </h2>
          <p className="mt-6 text-body-lg italic text-medium-gray">
            &ldquo;If Epic includes a Fairness Audit module, why do we need
            ParityScope?&rdquo;
          </p>
          <div className="mt-6 rounded-2xl border-l-4 border-coral bg-off-white p-8 shadow-card">
            <p className="text-body-lg leading-relaxed text-dark-gray">
              Because your EHR vendor auditing its own AI has the same
              credibility problem as your bank auditing its own financial
              statements. When regulators, plaintiffs&rsquo; attorneys,
              accreditation bodies, or Notified Bodies scrutinize your audit
              evidence,{" "}
              <strong className="text-navy">
                &ldquo;we used the vendor&rsquo;s built-in tool&rdquo;
              </strong>{" "}
              won&rsquo;t hold up.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Feature comparison table */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">Feature comparison</h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            Side-by-side on the capabilities hospitals, MedTech vendors, and
            their auditors actually ask about.
          </p>
          <div className="mt-12 overflow-hidden rounded-2xl bg-white shadow-card">
            <ComparisonTable
              headers={["Epic AI Trust & Assurance Suite", "ParityScope"]}
              rows={epicComparisonRows}
            />
          </div>
        </div>
      </section>

      {/* Section 3: When to use which */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">When to use which</h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            These are not mutually exclusive tools. They serve different
            jobs in your AI lifecycle.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-light-gray bg-white p-8 shadow-card">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-amber/20 px-3 py-1 text-body-sm font-semibold text-navy">
                  Internal
                </span>
                <h3 className="text-h3 font-semibold text-navy">
                  Use Epic&rsquo;s tool for
                </h3>
              </div>
              <ul className="mt-6 space-y-3">
                {useEpicFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-body text-dark-gray"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-teal bg-white p-8 shadow-card-hover">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-teal px-3 py-1 text-body-sm font-semibold text-white">
                  External-facing
                </span>
                <h3 className="text-h3 font-semibold text-navy">
                  Use ParityScope for
                </h3>
              </div>
              <ul className="mt-6 space-y-3">
                {useParityScopeFor.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-body text-dark-gray"
                  >
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: What regulators accept */}
      <section className="bg-navy px-4 py-section text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold">What regulators actually accept</h2>
          <p className="mt-4 max-w-3xl text-body-lg text-light-gray">
            Independence is not a marketing claim. It is a regulatory
            requirement and a discoverable fact.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regulatorAcceptance.map((item) => (
              <div
                key={item.body}
                className="rounded-2xl border border-white/10 bg-navy-light p-6"
              >
                <h3 className="text-h4 font-semibold text-teal">{item.body}</h3>
                <p className="mt-3 text-body-sm text-light-gray">{item.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book a 90-day paid assessment
            </Link>
            <Link
              href="/regulations"
              className="rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              See regulatory mapping
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: Horizontal tools */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-wider text-coral">
            Also compared
          </p>
          <h2 className="mt-3 text-h2 font-bold text-navy">
            The horizontal AI governance tools
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            Credo AI, Holistic AI, Arthur AI, and Fiddler are strong platforms
            &mdash; but they are not built for healthcare. A shorter take:
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {horizontalTools.map((tool) => (
              <div
                key={tool.title}
                className="rounded-2xl border border-light-gray bg-white p-8 shadow-card"
              >
                <h3 className="text-h4 font-semibold text-navy">
                  {tool.title}
                </h3>
                <p
                  className="mt-4 text-body-sm text-medium-gray"
                  dangerouslySetInnerHTML={{ __html: tool.text }}
                />
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-body text-medium-gray">
            For most US hospitals and MedTech vendors, the primary decision is
            not ParityScope vs Credo AI. It&rsquo;s whether the vendor that
            built your EHR or AI platform should also grade its own homework.
            It shouldn&rsquo;t.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold text-navy">
            Get audit evidence you can defend
          </h2>
          <p className="mt-4 text-body-lg text-medium-gray">
            A 90-day paid assessment produces a regulator-ready binder for one
            clinical AI model &mdash; reproducible, independent, and mapped to
            the frameworks that matter in your jurisdiction.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book an Assessment
            </Link>
            <Link
              href="/product"
              className="rounded-full border border-navy/20 px-8 py-3 text-base font-semibold text-navy transition-colors hover:bg-navy/5"
            >
              Product Overview
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
