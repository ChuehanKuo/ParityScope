import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "Blog — AI Fairness & Healthcare Compliance Insights",
  description:
    "Expert insights on AI fairness, healthcare compliance, bias auditing, and regulatory updates from the ParityScope team.",
};

const blogPosts = [
  {
    slug: "understanding-demographic-parity-clinical-ai",
    title: "Understanding Demographic Parity in Clinical AI",
    date: "2025-11-14",
    category: "Fairness Metrics",
    categoryColor: "bg-teal/10 text-teal",
    excerpt:
      "Demographic parity is one of the most widely discussed fairness criteria, but its application in clinical AI is nuanced. When should you optimize for equal prediction rates across groups, and when does doing so actually harm the patients you are trying to protect? We break down the trade-offs, walk through a clinical example using sepsis prediction, and explain when alternative metrics like equalized odds or calibration may be more appropriate for your use case.",
    author: "Dr. James Okonkwo",
    readingTime: "12 min read",
  },
  {
    slug: "eu-ai-act-timeline-healthcare",
    title: "EU AI Act Timeline: What Healthcare Organizations Need to Know",
    date: "2025-10-02",
    category: "Regulation",
    categoryColor: "bg-navy/10 text-navy",
    excerpt:
      "The EU AI Act is the most comprehensive AI regulation in the world, and healthcare AI is squarely in its crosshairs as a high-risk application. With enforcement timelines already in effect, healthcare organizations deploying AI in the EU need to understand their obligations now. This guide covers the key dates, the specific requirements for high-risk medical AI systems, and a practical compliance roadmap for health system CIOs and compliance teams.",
    author: "Dr. Elena Vasquez-Torres",
    readingTime: "15 min read",
  },
  {
    slug: "case-study-reducing-sepsis-model-bias",
    title: "Case Study: Reducing Sepsis Model Bias Across Patient Demographics",
    date: "2025-09-18",
    category: "Case Study",
    categoryColor: "bg-teal/10 text-teal",
    excerpt:
      "A 12-hospital regional health system discovered that their sepsis early warning model had a 23% higher false negative rate for Black patients compared to White patients. This post details how they used ParityScope to identify the root cause — feature engineering decisions that underweighted vital sign patterns more common in certain demographics — and the mitigation strategies that brought false negative rate disparity below 3% without sacrificing overall model performance.",
    author: "Sarah Kim",
    readingTime: "10 min read",
  },
  {
    slug: "intersectional-fairness-single-attribute-analysis",
    title: "Intersectional Fairness: Why Single-Attribute Analysis Isn't Enough",
    date: "2025-08-27",
    category: "Research",
    categoryColor: "bg-navy/10 text-navy",
    excerpt:
      "Most fairness audits evaluate bias along one protected attribute at a time: race, then gender, then age. But patients exist at the intersection of these identities, and a model can appear fair along each individual axis while producing severe disparities for specific subgroups — for example, elderly Black women or young Hispanic men. We explain the mathematics of intersectional fairness analysis, share findings from our research, and demonstrate how ParityScope's intersectional engine works in practice.",
    author: "Dr. James Okonkwo",
    readingTime: "14 min read",
  },
  {
    slug: "building-fairness-ci-cd-pipeline",
    title: "Building Fairness into Your CI/CD Pipeline",
    date: "2025-07-15",
    category: "Engineering",
    categoryColor: "bg-teal/10 text-teal",
    excerpt:
      "Fairness auditing should not be a manual, quarterly exercise disconnected from your development workflow. This technical guide shows how to integrate ParityScope's SDK into your CI/CD pipeline so that every model update is automatically evaluated against your fairness thresholds before it reaches production. We cover GitHub Actions integration, threshold configuration, failure handling, and how to set up automated Slack notifications when fairness regressions are detected during model retraining.",
    author: "Marcus Chen",
    readingTime: "9 min read",
  },
  {
    slug: "section-1557-clinical-algorithms-compliance",
    title: "Section 1557 and Clinical Algorithms: A Compliance Guide",
    date: "2025-06-03",
    category: "Regulation",
    categoryColor: "bg-navy/10 text-navy",
    excerpt:
      "Section 1557 of the Affordable Care Act prohibits discrimination in healthcare programs receiving federal funding — and recent rulemaking has explicitly extended this to clinical algorithms and AI-driven decision tools. This guide explains the legal framework, the specific obligations for organizations using clinical decision support algorithms, the enforcement mechanisms that HHS has signaled it will use, and practical steps for demonstrating compliance through fairness auditing and documentation.",
    author: "Dr. Elena Vasquez-Torres",
    readingTime: "13 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Blog"
            title="Insights on AI Fairness and Healthcare Compliance"
            description="Expert analysis on fairness metrics, regulatory developments, engineering best practices, and real-world case studies from the ParityScope team."
            align="left"
          />

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/resources/blog/${post.slug}`}
                className="group flex flex-col rounded-xl border border-light-gray p-6 transition-shadow hover:shadow-card-hover"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-caption font-medium ${post.categoryColor}`}
                  >
                    {post.category}
                  </span>
                  <time className="text-caption text-medium-gray">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h2 className="mt-4 text-h4 font-semibold text-navy group-hover:text-teal">
                  {post.title}
                </h2>
                <p className="mt-3 grow text-body-sm text-medium-gray leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-light-gray pt-4">
                  <span className="text-body-sm font-medium text-dark-gray">
                    {post.author}
                  </span>
                  <span className="text-caption text-medium-gray">
                    {post.readingTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader
            label="Stay Informed"
            title="Subscribe to the ParityScope Newsletter"
            description="Get monthly insights on AI fairness research, regulatory developments, and practical guidance for healthcare AI compliance. No spam, no fluff — just the information your team needs."
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-navy px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-navy-light"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="See ParityScope in Action"
        description="Ready to see how fairness auditing, continuous monitoring, and regulatory compliance work in practice? Request a demo tailored to your clinical AI portfolio."
        primaryCTA={{ label: "Request a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Explore the Product", href: "/product" }}
      />
    </>
  );
}
