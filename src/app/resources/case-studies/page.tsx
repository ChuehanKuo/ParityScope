import type { Metadata } from "next";
import { getAllContent } from "@/lib/mdx";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case Studies — Real-world AI Fairness Impact",
  description:
    "See how healthcare organizations use ParityScope to ensure AI fairness and meet compliance requirements.",
};

export default function CaseStudiesPage() {
  const studies = getAllContent("case-studies");

  return (
    <section className="px-4 py-section sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-h1 font-bold text-navy">Case Studies</h1>
        <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
          Real-world stories of healthcare organizations ensuring AI
          fairness with ParityScope.
        </p>

        {studies.length > 0 ? (
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {studies.map((study) => (
              <Link
                key={study.slug}
                href={`/resources/case-studies/${study.slug}`}
                className="group rounded-xl border border-light-gray p-8 transition-shadow hover:shadow-card-hover"
              >
                <h2 className="text-h3 font-semibold text-navy group-hover:text-teal">
                  {study.title}
                </h2>
                <p className="mt-3 text-medium-gray">
                  {study.description}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <>
            {/* How Case Studies Work */}
            <div className="mt-16 rounded-xl border border-light-gray bg-off-white p-8 sm:p-12">
              <h2 className="text-h3 font-bold text-navy">
                How Our Case Studies Are Built
              </h2>
              <p className="mt-4 max-w-3xl text-medium-gray">
                Every ParityScope case study is grounded in a real fairness
                assessment. We publish case studies as engagements are
                completed, with the consent of our partner organizations.
                Each study documents the challenge, methodology, findings,
                and measurable outcomes.
              </p>

              <div className="mt-10 grid gap-8 sm:grid-cols-3">
                {/* Step 1 */}
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10">
                    <span className="text-body-lg font-bold text-teal">
                      1
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-navy">
                    Assessment
                  </h3>
                  <p className="mt-2 text-body-sm text-medium-gray">
                    We work with healthcare organizations to conduct a
                    comprehensive fairness audit of their AI systems using
                    the ParityScope SDK.
                  </p>
                </div>

                {/* Step 2 */}
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10">
                    <span className="text-body-lg font-bold text-teal">
                      2
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-navy">
                    Analysis &amp; Action
                  </h3>
                  <p className="mt-2 text-body-sm text-medium-gray">
                    Together we analyze the results, identify disparities,
                    and implement targeted mitigation strategies to improve
                    model fairness.
                  </p>
                </div>

                {/* Step 3 */}
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10">
                    <span className="text-body-lg font-bold text-teal">
                      3
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold text-navy">
                    Publication
                  </h3>
                  <p className="mt-2 text-body-sm text-medium-gray">
                    With our partner&apos;s approval, we document the
                    journey and outcomes as a case study to help the
                    broader industry learn and improve.
                  </p>
                </div>
              </div>
            </div>

            {/* What to Expect */}
            <div className="mt-12 rounded-xl border border-light-gray p-8 sm:p-12">
              <h2 className="text-h3 font-bold text-navy">
                What Our Case Studies Cover
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="flex items-start gap-4">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-teal"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-navy">
                      Clinical AI Applications
                    </h3>
                    <p className="mt-1 text-body-sm text-medium-gray">
                      Diagnostic imaging, clinical decision support,
                      risk scoring, and treatment recommendation systems.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-teal"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-navy">
                      Measurable Outcomes
                    </h3>
                    <p className="mt-1 text-body-sm text-medium-gray">
                      Quantified improvements in fairness metrics across
                      demographic groups before and after intervention.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-teal"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-navy">
                      Regulatory Compliance
                    </h3>
                    <p className="mt-1 text-body-sm text-medium-gray">
                      How organizations achieved EU AI Act readiness and
                      met documentation requirements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-teal"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-navy">
                      Implementation Insights
                    </h3>
                    <p className="mt-1 text-body-sm text-medium-gray">
                      Practical lessons learned, integration timelines,
                      and team workflows from real deployments.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-xl bg-navy p-8 text-center sm:p-12">
              <h2 className="text-h3 font-bold text-white">
                Be Among Our First Published Case Studies
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/70">
                We are actively partnering with healthcare organizations to
                conduct fairness assessments. Book an assessment today and
                your results could help shape industry best practices.
              </p>
              <div className="mt-8">
                <a
                  href="mailto:hello@parityscope.com?subject=Fairness%20Assessment%20Inquiry"
                  className="inline-flex items-center justify-center rounded-lg bg-teal px-8 py-3 font-semibold text-white transition-colors hover:bg-teal/90"
                >
                  Book an Assessment
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
