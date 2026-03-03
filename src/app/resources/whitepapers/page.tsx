import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "Whitepapers & Guides — AI Fairness Research for Healthcare",
  description:
    "Download in-depth research and practical guides on AI fairness, EU AI Act compliance, bias mitigation, and fairness metrics for healthcare organizations.",
};

const whitepapers = [
  {
    title: "EU AI Act Compliance Guide for Healthcare Organizations",
    description:
      "A comprehensive guide to the EU AI Act's requirements for high-risk healthcare AI systems. Covers bias testing mandates, transparency obligations, documentation standards, conformity assessments, and timelines. Includes a step-by-step compliance checklist and practical implementation roadmap.",
    category: "Regulatory Compliance",
    pages: "42 pages",
    topics: ["EU AI Act Articles 9-15", "High-risk classification", "Bias testing requirements", "Conformity assessment", "Post-market monitoring"],
  },
  {
    title: "The Complete Guide to AI Fairness Metrics in Clinical Settings",
    description:
      "An authoritative reference covering 15+ fairness metrics, their mathematical definitions, clinical interpretations, and guidance on which metrics to apply for different healthcare use cases. Includes worked examples from diagnostic, prognostic, and resource allocation models.",
    category: "Technical Guide",
    pages: "58 pages",
    topics: ["Demographic parity", "Equalized odds", "Calibration", "Predictive parity", "Metric selection frameworks"],
  },
  {
    title: "Bias Mitigation Strategies for Clinical AI: From Theory to Practice",
    description:
      "A practical guide to pre-processing, in-processing, and post-processing bias mitigation techniques applied to healthcare AI. Covers data augmentation, fairness-constrained optimization, threshold adjustment, and continuous monitoring with real-world implementation patterns.",
    category: "Technical Guide",
    pages: "36 pages",
    topics: ["Pre-processing techniques", "Fairness-constrained training", "Post-hoc calibration", "Mitigation trade-offs", "Production monitoring"],
  },
];

export default function WhitepapersPage() {
  return (
    <>
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Whitepapers & Guides"
            title="In-Depth Research on AI Fairness in Healthcare"
            description="Practical guides and technical deep dives for healthcare organizations navigating AI fairness, regulatory compliance, and bias mitigation."
          />

          <div className="mt-16 space-y-8">
            {whitepapers.map((paper) => (
              <div
                key={paper.title}
                className="rounded-xl border border-light-gray p-8 transition-shadow hover:shadow-card"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-off-white px-3 py-1 text-caption font-medium text-teal">
                    {paper.category}
                  </span>
                  <span className="text-body-sm text-medium-gray">{paper.pages}</span>
                </div>
                <h2 className="mt-4 text-h3 font-semibold text-navy">{paper.title}</h2>
                <p className="mt-3 text-medium-gray">{paper.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {paper.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-light-gray px-3 py-1 text-caption text-medium-gray"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="mt-6 inline-block rounded-full bg-navy px-6 py-2 text-body-sm font-semibold text-white transition-colors hover:bg-navy-light"
                >
                  Request Access
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need Help With Compliance?"
        description="Our team can walk you through the regulatory requirements and show you how ParityScope makes compliance straightforward."
        primaryCTA={{ label: "Talk to Our Team", href: "/contact" }}
        secondaryCTA={{ label: "View Case Studies", href: "/resources/case-studies" }}
      />
    </>
  );
}
