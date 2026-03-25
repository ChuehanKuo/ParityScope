import type { Metadata } from "next";
import { getAllContent } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Whitepapers — In-depth AI Fairness Research",
  description:
    "Download in-depth research and guides on AI fairness, healthcare compliance, and bias mitigation from ParityScope.",
};

export default function WhitepapersPage() {
  const papers = getAllContent("whitepapers");

  return (
    <section className="px-4 py-section sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-h1 font-bold text-navy">Whitepapers</h1>
        <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
          In-depth research and practical guides on AI fairness, regulatory
          compliance, and bias mitigation in healthcare.
        </p>

        {papers.length > 0 ? (
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {papers.map((paper) => (
              <div
                key={paper.slug}
                className="rounded-xl border border-light-gray p-6"
              >
                <h2 className="text-h4 font-semibold text-navy">
                  {paper.title}
                </h2>
                <p className="mt-2 text-body-sm text-medium-gray">
                  {paper.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Featured Whitepaper */}
            <div className="mt-16">
              <div className="overflow-hidden rounded-xl border border-light-gray lg:grid lg:grid-cols-5">
                {/* Left: Visual */}
                <div className="flex items-center justify-center bg-gradient-to-br from-navy to-navy/80 p-10 lg:col-span-2">
                  <div className="text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10">
                      <svg
                        className="h-10 w-10 text-teal"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                      </svg>
                    </div>
                    <p className="mt-4 text-body-sm font-semibold uppercase tracking-wider text-teal">
                      Whitepaper
                    </p>
                    <p className="mt-1 text-body-sm text-white/50">
                      PDF &middot; 18 pages
                    </p>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="p-8 sm:p-10 lg:col-span-3">
                  <span className="inline-block rounded-full bg-teal/10 px-3 py-1 text-body-sm font-medium text-teal">
                    Featured
                  </span>
                  <h2 className="mt-4 text-h3 font-bold text-navy">
                    EU AI Act Compliance Checklist for Healthcare
                  </h2>
                  <p className="mt-4 text-medium-gray">
                    A comprehensive, step-by-step guide for healthcare
                    organizations preparing for EU AI Act compliance. This
                    whitepaper covers risk classification, conformity
                    assessments, documentation requirements, bias testing
                    obligations, and practical implementation timelines.
                  </p>
                  <ul className="mt-4 space-y-2 text-body-sm text-medium-gray">
                    <li className="flex items-start gap-2">
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      High-risk AI system classification criteria
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Fairness testing requirements and methodologies
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Documentation and audit trail templates
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Implementation timeline and milestones
                    </li>
                  </ul>
                  <div className="mt-8">
                    <a
                      href="mailto:hello@parityscope.com?subject=Whitepaper%20Request%3A%20EU%20AI%20Act%20Compliance%20Checklist"
                      className="inline-flex items-center justify-center rounded-lg bg-teal px-6 py-3 font-semibold text-white transition-colors hover:bg-teal/90"
                    >
                      Request Access
                    </a>
                    <p className="mt-3 text-body-sm text-muted">
                      Available for healthcare organizations and compliance
                      teams. Contact us for a complimentary copy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Planned Whitepapers */}
            <div className="mt-12">
              <h2 className="text-h4 font-semibold text-navy">
                More Research Coming Soon
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-light-gray p-6">
                  <span className="inline-block rounded-full bg-navy/5 px-3 py-1 text-body-sm font-medium text-navy">
                    In Progress
                  </span>
                  <h3 className="mt-4 text-h4 font-semibold text-navy">
                    Fairness Metrics in Clinical Decision Support
                  </h3>
                  <p className="mt-2 text-body-sm text-medium-gray">
                    A technical deep-dive into selecting appropriate
                    fairness metrics for clinical AI applications, with
                    real-world examples and trade-off analysis.
                  </p>
                </div>
                <div className="rounded-xl border border-light-gray p-6">
                  <span className="inline-block rounded-full bg-navy/5 px-3 py-1 text-body-sm font-medium text-navy">
                    Planned
                  </span>
                  <h3 className="mt-4 text-h4 font-semibold text-navy">
                    Bias Mitigation Strategies for Medical Imaging AI
                  </h3>
                  <p className="mt-2 text-body-sm text-medium-gray">
                    Pre-processing, in-processing, and post-processing
                    approaches to reducing bias in radiology and pathology
                    AI systems.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
