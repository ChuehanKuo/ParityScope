import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solutions — ParityScope for Every Healthcare Stakeholder",
  description:
    "Purpose-built AI fairness solutions for hospitals, MedTech companies, EHR vendors, and government agencies. Meet regulatory requirements with ParityScope.",
};

const solutions = [
  {
    title: "Hospitals & Health Systems",
    href: "/solutions/hospitals",
    description:
      "Deploy fairness governance on-premise with full data sovereignty. ParityScope integrates into your clinical AI governance workflow so compliance teams, CHAIO buyers, and clinical informatics leads can audit every model before it touches a patient.",
    benefits: [
      "On-premise SDK — patient data never leaves your infrastructure",
      "Clinical AI governance dashboards for CHAIO and compliance teams",
      "Audit-ready reports aligned with Joint Commission and CMS requirements",
    ],
    icon: (
      <svg className="h-10 w-10 text-teal" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 4v32M12 12h16M8 20h24M12 28h16" />
        <rect x="6" y="8" width="28" height="24" rx="3" />
      </svg>
    ),
  },
  {
    title: "MedTech & Digital Health",
    href: "/solutions/medtech",
    description:
      "Prove your AI is fair before regulators ask. ParityScope provides conformity assessment tooling for the EU AI Act, Section 1557, and emerging Asian frameworks — so you can launch in multiple jurisdictions with one compliance workflow.",
    benefits: [
      "Conformity assessment documentation for EU AI Act high-risk classification",
      "Multi-jurisdiction compliance from a single evaluation pipeline",
      "Continuous monitoring for post-market surveillance obligations",
    ],
    icon: (
      <svg className="h-10 w-10 text-teal" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="20" cy="20" r="14" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 20l4 4 8-8" />
      </svg>
    ),
  },
  {
    title: "EHR Vendors & Health AI Startups",
    href: "/solutions/ehr-vendors",
    description:
      "Embed fairness evaluation directly into your platform with a single SDK. Give every customer access to bias auditing, monitoring, and compliance reporting without building it yourself — and differentiate on trust.",
    benefits: [
      "One SDK integration serves all downstream customers and use cases",
      "White-label compliance reports your customers can submit to regulators",
      "Platform-ready APIs for seamless EHR and clinical workflow integration",
    ],
    icon: (
      <svg className="h-10 w-10 text-teal" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h24M8 20h24M8 30h24" />
        <rect x="4" y="6" width="32" height="28" rx="3" />
      </svg>
    ),
  },
  {
    title: "Government & Payers",
    href: "/solutions/government",
    description:
      "Establish national AI governance frameworks with validated fairness tooling. ParityScope supports data sovereignty requirements, population-level bias monitoring, and policy-aligned reporting for public-sector AI oversight.",
    benefits: [
      "Full data sovereignty with air-gapped and on-premise deployment options",
      "National AI governance dashboards for population-level fairness tracking",
      "Policy-aligned reporting for legislative and regulatory oversight bodies",
    ],
    icon: (
      <svg className="h-10 w-10 text-teal" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 4l16 10v4H4v-4L20 4z" />
        <path strokeLinecap="round" d="M8 18v14M16 18v14M24 18v14M32 18v14" />
        <path strokeLinecap="round" d="M4 32h32M4 36h32" />
      </svg>
    ),
  },
];

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-display font-bold text-white">
            Solutions for Every Healthcare Stakeholder
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-body-lg text-slate-300">
            Whether you are a hospital deploying clinical AI, a MedTech company
            seeking regulatory approval, or a government agency building
            national oversight — ParityScope is purpose-built for your role in
            the healthcare AI ecosystem.
          </p>
        </div>
      </section>

      {/* Solution Cards */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            Choose Your Path
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-body-lg text-medium-gray">
            Each solution is tailored to the regulatory obligations, deployment
            constraints, and operational realities of your organization type.
          </p>
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {solutions.map((sol) => (
              <Link
                key={sol.title}
                href={sol.href}
                className="group rounded-xl border border-light-gray bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="mb-5">{sol.icon}</div>
                <h3 className="text-h3 font-semibold text-navy group-hover:text-teal">
                  {sol.title}
                </h3>
                <p className="mt-3 text-medium-gray">{sol.description}</p>
                <ul className="mt-6 space-y-3">
                  {sol.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-body-sm text-dark-gray">
                      <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-green" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l3 3 7-7" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
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

      {/* CTA */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold text-white">
            Not Sure Which Solution Fits?
          </h2>
          <p className="mt-4 text-body-lg text-slate-300">
            Talk to our team. We will help you identify the right deployment
            model, compliance scope, and integration path for your organization.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-teal px-8 py-3 font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book an Assessment
            </Link>
            <Link
              href="/pricing"
              className="rounded-lg border border-slate-500 px-8 py-3 font-semibold text-white transition-colors hover:border-teal hover:text-teal"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
