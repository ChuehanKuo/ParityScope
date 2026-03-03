import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { Accordion } from "@/components/ui/accordion";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "EHR Vendors — Embed AI Fairness Into Your Platform | ParityScope",
  description:
    "Integrate ParityScope's fairness SDK into your EHR platform. Provide built-in AI compliance monitoring, white-label reporting, and multi-tenant governance for your health system customers.",
};

const painPoints = [
  {
    title: "Embedded CDS Algorithms Need Fairness Validation",
    description:
      "Your EHR platform embeds dozens of clinical decision support algorithms — sepsis alerts, readmission risk scores, medication interaction warnings, and care gap identification. Each CDS model makes predictions that directly affect patient care, and each one requires independent fairness validation. Manual auditing does not scale with your feature roadmap.",
    stat: "30+",
    statLabel: "CDS algorithms in a typical modern EHR platform",
  },
  {
    title: "Customer Demands for Bias Transparency Are Escalating",
    description:
      "Health system CIOs and CMIOs are asking pointed questions during procurement: How do you test your AI for bias? Can you demonstrate equitable performance across demographics? If you cannot provide structured fairness evidence, your customers will choose a platform vendor who can — or demand third-party auditing at your expense.",
    stat: "72%",
    statLabel: "of health systems now include fairness criteria in EHR RFPs",
  },
  {
    title: "ONC Requirements Create Regulatory Pressure",
    description:
      "The Office of the National Coordinator for Health IT is advancing rules around algorithmic transparency and decision support oversight. ONC's Health IT Certification Program is expanding to include AI governance requirements. EHR vendors who cannot demonstrate compliance risk certification delays and market access limitations.",
    stat: "2026",
    statLabel: "ONC AI transparency requirements expected to take effect",
  },
  {
    title: "Platform Liability Extends to Every Embedded Model",
    description:
      "When an AI model embedded in your platform produces biased outcomes, your health system customers hold you accountable — regardless of whether the model was built by your team, a third-party vendor, or the customer's own data scientists. Without proactive fairness monitoring, you carry the liability for every model running on your infrastructure.",
    stat: "100%",
    statLabel: "of platform-embedded model liability falls on the EHR vendor",
  },
];

const platformArchitecture = [
  {
    layer: "Platform Layer",
    title: "SDK Integration Point",
    description:
      "The ParityScope SDK integrates at your platform's model serving layer. It intercepts predictions and evaluates them against demographic data — without modifying model behavior or adding latency to clinical workflows. A single integration point covers every AI model on your platform.",
    features: [
      "Single point of integration at the model serving layer",
      "Sub-millisecond overhead — no impact on clinical workflows",
      "Automatic model discovery and registration",
      "Compatible with FHIR-based and proprietary model architectures",
    ],
  },
  {
    layer: "Tenant Isolation",
    title: "Per-Customer Governance",
    description:
      "Each hospital customer gets a fully isolated fairness environment. Their models, metrics, thresholds, and compliance reports are strictly segregated. Customers can self-serve through your platform UI — configuring their own fairness thresholds and generating compliance reports on demand.",
    features: [
      "Strict data isolation per tenant — no cross-contamination",
      "Customer-configurable fairness thresholds",
      "Self-service compliance report generation",
      "Hierarchical policies: platform minimums + customer overrides",
    ],
  },
  {
    layer: "Admin Oversight",
    title: "Portfolio-Level Visibility",
    description:
      "Your platform team gets an aggregate view across all tenants and all models. Identify systemic fairness issues before they become customer complaints. Track compliance posture across your entire customer base and generate platform-wide governance reports for your own regulatory needs.",
    features: [
      "Cross-tenant aggregate dashboards for platform admins",
      "Systemic bias pattern detection across deployments",
      "Platform-wide compliance reporting for ONC and regulators",
      "Proactive alerting when any tenant's models drift",
    ],
  },
];

const solutionBenefits = [
  {
    title: "Embed ParityScope Into Your Platform",
    description:
      "ParityScope's lightweight SDK installs as a platform-level service, not a per-model integration. Deploy once and every AI model on your platform — first-party, third-party, or customer-built — is automatically covered by fairness monitoring. No changes to your existing model serving architecture required.",
  },
  {
    title: "White-Label Reporting for Health System Customers",
    description:
      "Provide your customers with branded compliance reports they can present to their boards, governance committees, and accreditation surveyors. White-label reports carry your platform branding and are formatted for Joint Commission, CMS, and Section 1557 compliance documentation. Your customers get governance tools; you get a differentiated platform.",
  },
  {
    title: "Multi-Tenant Monitoring Dashboard",
    description:
      "Serve hundreds of hospital customers from a single platform with tenant-isolated fairness monitoring. Each customer sees only their own models, metrics, and reports. Your admin team maintains portfolio-level visibility across all deployments — identifying systemic issues and ensuring platform-wide compliance.",
  },
  {
    title: "API-First Integration for Maximum Flexibility",
    description:
      "ParityScope's REST API exposes every capability programmatically. Your platform's front-end team can embed fairness dashboards directly into your existing UI. Customer governance teams can pull compliance metrics into their own GRC platforms and reporting systems via API — no manual data extraction required.",
  },
];

const businessImpact = [
  {
    title: "Win More RFPs",
    description:
      "Health systems are adding AI governance to their vendor evaluation criteria. Built-in fairness monitoring makes your platform the obvious choice when competitors cannot demonstrate compliance capabilities. Show evaluators a live fairness dashboard during demos — not a slide deck of future promises.",
  },
  {
    title: "Reduce Liability Exposure",
    description:
      "Proactive fairness monitoring creates a documented defense against bias claims. When a model produces disparate outcomes, you have timestamped evidence that you were actively monitoring and alerting — not ignoring the problem. This audit trail is your strongest legal protection.",
  },
  {
    title: "Create a New Revenue Stream",
    description:
      "Offer AI governance as a premium platform capability. Hospitals that need compliance monitoring will pay for it — especially when it is natively integrated into the EHR they use daily. Platform-level licensing means predictable revenue that scales with your customer base.",
  },
];

const faqItems = [
  {
    question: "How does multi-tenant isolation work?",
    answer:
      "Each customer tenant has fully isolated fairness data, metrics, and reports. Patient data and model predictions are processed within tenant boundaries and never cross-contaminate. Your platform team gets an admin view across all tenants for aggregate reporting, but individual tenant data is strictly segregated. This architecture satisfies both HIPAA requirements and your customers' data governance policies.",
  },
  {
    question: "Can our customers configure their own fairness thresholds?",
    answer:
      "Yes. ParityScope supports hierarchical configuration — you set platform-level minimums, and individual customers can set stricter thresholds based on their own regulatory requirements or institutional policies. Customers cannot weaken platform-level policies, ensuring a governance floor across your entire deployment.",
  },
  {
    question: "How does white-label reporting work?",
    answer:
      "White-label reports are generated with your platform branding — logo, color scheme, and contact information. Reports are available in PDF and JSON formats and are structured for regulatory submissions. Your customers can generate reports on demand through your platform UI, or you can automate periodic report generation via API. Reports map to Joint Commission, CMS, Section 1557, and EU AI Act requirements.",
  },
  {
    question: "What does the integration timeline look like?",
    answer:
      "A typical EHR platform integration takes 4-6 weeks from kickoff to production. The first week covers SDK integration and architecture review. Weeks 2-3 handle multi-tenant configuration and API setup. Weeks 4-6 cover testing, customer pilot deployment, and documentation. Our integration team works alongside your engineering team throughout the process.",
  },
  {
    question: "Does this work with third-party AI models on our platform?",
    answer:
      "Absolutely. ParityScope monitors any model that produces predictions, regardless of origin. It evaluates model outputs against demographic data — it does not need access to model internals. This means you can monitor first-party models, third-party vendor models, and customer-built models through a single governance layer.",
  },
  {
    question: "How does this help with ONC certification requirements?",
    answer:
      "ParityScope provides the algorithmic transparency and governance documentation that ONC's evolving Health IT Certification Program will require. By embedding fairness monitoring now, you build the compliance infrastructure before requirements are finalized — positioning your platform ahead of competitors who will scramble to retrofit governance capabilities.",
  },
  {
    question: "How is this licensed for platform use?",
    answer:
      "We offer platform licensing that covers your entire deployment — not per-customer or per-model pricing. This means your costs are predictable as you onboard new customers and add new AI models. You can pass governance capabilities through to your customers as a value-add or premium feature. Contact our partnerships team for platform-specific pricing.",
  },
];

export default function EhrVendorsPage() {
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
            EHR Vendors
          </p>
          <h1 className="mt-4 max-w-4xl text-h1 font-bold leading-tight tracking-tight lg:text-display">
            Embed AI Fairness{" "}
            <span className="text-teal">Directly Into Your Platform</span>
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-light-gray">
            Give your health system customers built-in AI fairness monitoring,
            white-label compliance reporting, and multi-tenant governance tools.
            ParityScope&apos;s embeddable SDK differentiates your EHR platform
            and reduces your liability exposure.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Explore Partnership
            </Link>
            <Link
              href="/product"
              className="rounded-full border border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Technical Overview
            </Link>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="The Challenge"
            title="Your Customers' AI Compliance Problem Is Your Problem"
            description="As AI becomes central to your platform, the governance gap becomes your responsibility. Health systems expect their EHR vendor to be part of the solution — not part of the problem."
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

      {/* Solution Benefits */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="The Solution"
            title="Platform-Native AI Fairness Governance"
            description="ParityScope embeds into your platform as a first-class governance layer. Your customers get turnkey compliance tools; you get a powerful differentiator and reduced liability."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {solutionBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
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

      {/* Platform Architecture Section */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Platform Architecture"
            title="One Integration, Every Model Monitored"
            description="Embed the SDK once at the platform level. Every AI model — first-party, third-party, or customer-built — is automatically monitored for fairness across all tenant deployments."
            theme="dark"
          />
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {platformArchitecture.map((item) => (
              <div
                key={item.layer}
                className="rounded-2xl border border-white/10 bg-white/5 p-8"
              >
                <p className="text-body-sm font-semibold uppercase tracking-wider text-teal-light">
                  {item.layer}
                </p>
                <h3 className="mt-3 text-h4 font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-body-sm text-medium-gray">
                  {item.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 text-teal-light"
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
                      <span className="text-body-sm text-light-gray">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Architecture Flow Diagram */}
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-center text-h4 font-semibold text-white">
              Data Flow
            </h3>
            <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-0">
              <div className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-center">
                <p className="text-body-sm font-semibold text-white">
                  AI Model Prediction
                </p>
                <p className="text-caption text-medium-gray">
                  CDS, Risk Score, Alert
                </p>
              </div>
              <div className="hidden h-0.5 w-12 bg-teal/40 md:block" />
              <svg className="h-6 w-6 rotate-90 text-teal/40 md:hidden" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
              </svg>
              <div className="rounded-lg border border-teal/40 bg-teal/10 px-6 py-3 text-center">
                <p className="text-body-sm font-semibold text-teal-light">
                  ParityScope SDK
                </p>
                <p className="text-caption text-medium-gray">
                  Fairness Evaluation
                </p>
              </div>
              <div className="hidden h-0.5 w-12 bg-teal/40 md:block" />
              <svg className="h-6 w-6 rotate-90 text-teal/40 md:hidden" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
              </svg>
              <div className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-center">
                <p className="text-body-sm font-semibold text-white">
                  Tenant Dashboard
                </p>
                <p className="text-caption text-medium-gray">
                  Metrics Only — No PHI
                </p>
              </div>
              <div className="hidden h-0.5 w-12 bg-teal/40 md:block" />
              <svg className="h-6 w-6 rotate-90 text-teal/40 md:hidden" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
              </svg>
              <div className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-center">
                <p className="text-body-sm font-semibold text-white">
                  Compliance Reports
                </p>
                <p className="text-caption text-medium-gray">
                  White-Label PDF/JSON
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Impact */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Business Impact"
            title="What This Means for Your EHR Business"
            description="Embedding ParityScope is a strategic investment that pays off in customer retention, new revenue, and reduced risk."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {businessImpact.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-light-gray p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <h3 className="text-h4 font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-medium-gray">{item.description}</p>
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
            description="Common questions from EHR platform and partnership teams evaluating ParityScope."
          />
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Differentiate Your EHR with AI Governance?"
        description="Partner with ParityScope to embed fairness monitoring into your platform. Give your customers what they need — and what your competitors cannot yet offer."
        primaryCTA={{ label: "Explore Partnership", href: "/contact" }}
        secondaryCTA={{ label: "Technical Overview", href: "/product" }}
        theme="teal"
      />
    </>
  );
}
