import type { Metadata } from "next";
import { getAllContent } from "@/lib/mdx";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — AI Fairness & Healthcare Compliance Insights",
  description:
    "Expert insights on AI fairness, healthcare compliance, bias auditing, and regulatory updates from the ParityScope team.",
};

export default function BlogPage() {
  const posts = getAllContent("blog");

  return (
    <section className="px-4 py-section sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-h1 font-bold text-navy">Blog</h1>
        <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
          Expert insights on AI fairness, healthcare compliance, and the
          evolving regulatory landscape from the ParityScope team.
        </p>

        {posts.length > 0 ? (
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/resources/blog/${post.slug}`}
                className="group rounded-xl border border-light-gray p-6 transition-shadow hover:shadow-card-hover"
              >
                <time className="text-body-sm text-medium-gray">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="mt-2 text-h4 font-semibold text-navy group-hover:text-teal">
                  {post.title}
                </h2>
                <p className="mt-2 text-body-sm text-medium-gray">
                  {post.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-body-sm text-muted">
                  <span>{post.author}</span>
                  <span>&middot;</span>
                  <span>{post.readingTime}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <>
            {/* Featured Article Preview */}
            <div className="mt-16">
              <p className="text-body-sm font-semibold uppercase tracking-wider text-teal">
                Coming Soon
              </p>
              <div className="mt-4 overflow-hidden rounded-xl border border-light-gray transition-shadow hover:shadow-card-hover">
                <div className="bg-gradient-to-br from-navy to-navy/80 px-8 py-10 sm:px-12">
                  <div className="flex items-center gap-3">
                    <span className="inline-block rounded-full bg-teal/20 px-3 py-1 text-body-sm font-medium text-teal">
                      Regulation
                    </span>
                    <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-body-sm text-white/70">
                      EU AI Act
                    </span>
                  </div>
                  <h2 className="mt-5 text-h3 font-bold text-white sm:text-h2">
                    What the EU AI Act Means for Healthcare AI
                  </h2>
                  <p className="mt-4 max-w-2xl text-body-lg text-white/70">
                    A practical guide for healthcare organizations
                    navigating the new regulatory landscape. We break down
                    the key requirements, timelines, and what you need to
                    do to prepare your AI systems for compliance.
                  </p>
                  <div className="mt-6 flex items-center gap-4 text-body-sm text-white/50">
                    <span>ParityScope Team</span>
                    <span>&middot;</span>
                    <span>12 min read</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Topics */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-light-gray p-6">
                <span className="inline-block rounded-full bg-teal/10 px-3 py-1 text-body-sm font-medium text-teal">
                  Technical
                </span>
                <h3 className="mt-4 text-h4 font-semibold text-navy">
                  Measuring Fairness: Metrics That Matter
                </h3>
                <p className="mt-2 text-body-sm text-medium-gray">
                  Demographic parity, equalized odds, and calibration
                  &#8212; which fairness metrics should you use and when?
                </p>
              </div>
              <div className="rounded-xl border border-light-gray p-6">
                <span className="inline-block rounded-full bg-teal/10 px-3 py-1 text-body-sm font-medium text-teal">
                  Industry
                </span>
                <h3 className="mt-4 text-h4 font-semibold text-navy">
                  The State of AI Bias in Radiology
                </h3>
                <p className="mt-2 text-body-sm text-medium-gray">
                  How diagnostic imaging algorithms perform across
                  demographic groups, and what the research tells us.
                </p>
              </div>
              <div className="rounded-xl border border-light-gray p-6">
                <span className="inline-block rounded-full bg-teal/10 px-3 py-1 text-body-sm font-medium text-teal">
                  Guide
                </span>
                <h3 className="mt-4 text-h4 font-semibold text-navy">
                  Building a Fairness-First ML Pipeline
                </h3>
                <p className="mt-2 text-body-sm text-medium-gray">
                  Practical steps for integrating bias detection and
                  mitigation into your machine learning workflow.
                </p>
              </div>
            </div>
          </>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 rounded-xl bg-off-white p-8 sm:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-h3 font-bold text-navy">
              Stay ahead of AI fairness regulation
            </h2>
            <p className="mt-3 text-medium-gray">
              Get expert analysis on the EU AI Act, healthcare AI
              compliance, and fairness best practices delivered to your
              inbox. No spam &#8212; just substantive insights for
              healthcare AI leaders.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="mailto:hello@parityscope.com?subject=Newsletter%20Signup"
                className="inline-flex items-center justify-center rounded-lg bg-teal px-6 py-3 font-semibold text-white transition-colors hover:bg-teal/90"
              >
                Subscribe to Newsletter
              </a>
            </div>
            <p className="mt-4 text-body-sm text-muted">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
