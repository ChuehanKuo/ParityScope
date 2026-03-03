import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "Whitepapers — In-Depth Healthcare AI Fairness Research & Guides",
  description:
    "Download in-depth research and practical guides on AI fairness metrics, EU AI Act compliance, intersectional bias, and continuous fairness monitoring for healthcare organizations.",
};

const whitepapers = [
  {
    title: "The Complete Guide to Healthcare AI Fairness Metrics",
    description:
      "A comprehensive reference covering every major fairness metric used in clinical AI evaluation — from group fairness measures like demographic parity, equalized odds, and calibration to individual fairness criteria and causal fairness frameworks. Each metric is explained with mathematical definitions, clinical examples, implementation guidance, and a discussion of when it is and is not appropriate for specific healthcare use cases. Includes decision trees for selecting the right metrics based on your model type, clinical context, and regulatory requirements.",
    pages: 64,
    category: "Technical Reference",
    topics: [
      "Demographic parity and its clinical limitations",
      "Equalized odds for diagnostic models",
      "Calibration across demographic subgroups",
      "Predictive parity in risk stratification",
      "Individual fairness in treatment recommendation",
      "Causal fairness frameworks for healthcare",
      "Metric selection decision framework",
    ],
  },
  {
    title: "EU AI Act Compliance Playbook for Health Systems",
    description:
      "A practical, step-by-step compliance guide for healthcare organizations deploying AI systems in the European Union. This playbook translates the EU AI Act's legal requirements into actionable technical and organizational measures, with specific focus on the high-risk classification of medical AI. Covers conformity assessment procedures, required documentation under Annex IV, bias testing obligations, post-market surveillance requirements, and the role of notified bodies. Includes checklists, timeline planning tools, and template documentation structures.",
    pages: 48,
    category: "Regulatory Compliance",
    topics: [
      "High-risk AI classification for healthcare",
      "Conformity assessment procedures",
      "Annex IV documentation requirements",
      "Mandatory bias testing and fairness evaluation",
      "Post-market monitoring obligations",
      "Notified body assessment preparation",
      "Implementation timeline and milestones",
    ],
  },
  {
    title: "Intersectional Bias in Clinical Decision Support",
    description:
      "Original research from ParityScope's data science team examining how single-attribute fairness analysis fails to detect critical disparities in clinical decision support (CDS) systems. Using de-identified data from three health systems, this paper demonstrates that CDS algorithms can appear fair when evaluated along individual demographic axes while producing significant adverse outcomes for patients at the intersection of multiple protected attributes — for example, elderly Hispanic women or young Black men with disabilities. Introduces a practical methodology for intersectional fairness evaluation that scales to clinical populations.",
    pages: 36,
    category: "Research",
    topics: [
      "Limitations of single-attribute fairness analysis",
      "Mathematical framework for intersectional evaluation",
      "Empirical findings across three health systems",
      "Subgroup sample size challenges and solutions",
      "Clinical impact of intersectional disparities",
      "Implementation guide for intersectional auditing",
      "Statistical significance testing for small subgroups",
    ],
  },
  {
    title: "Building a Continuous Fairness Monitoring Program",
    description:
      "A practical operations guide for healthcare organizations transitioning from one-time fairness audits to continuous monitoring. Covers the organizational structures, technical infrastructure, alert thresholds, escalation protocols, and governance frameworks needed to sustain ongoing fairness oversight of clinical AI systems. Draws on implementation experience from ParityScope deployments across hospitals, health systems, and MedTech companies. Includes role-based responsibility matrices, sample monitoring dashboards, and threshold calibration guidance.",
    pages: 42,
    category: "Operations Guide",
    topics: [
      "Why one-time audits are insufficient",
      "Technical architecture for continuous monitoring",
      "Fairness drift detection and alerting",
      "Threshold setting and calibration",
      "Escalation protocols and governance structures",
      "Integration with existing model monitoring infrastructure",
      "Reporting for compliance and executive stakeholders",
    ],
  },
];

export default function WhitepapersPage() {
  return (
    <>
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Whitepapers"
            title="In-Depth Research and Practical Guides"
            description="Deep technical resources for healthcare data scientists, compliance teams, and clinical informaticists working to ensure AI fairness and regulatory compliance."
            align="left"
          />
        </div>
      </section>

      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-8">
          {whitepapers.map((paper) => (
            <div
              key={paper.title}
              className="rounded-xl border border-light-gray bg-white shadow-card"
            >
              <div className="p-8">
                {/* Header row */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-navy/10 px-3 py-1 text-caption font-semibold text-navy">
                        {paper.category}
                      </span>
                      <span className="text-caption text-medium-gray">
                        {paper.pages} pages
                      </span>
                    </div>
                    <h2 className="mt-4 text-h3 font-semibold text-navy">
                      {paper.title}
                    </h2>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-medium-gray leading-relaxed">
                  {paper.description}
                </p>

                {/* Topics covered */}
                <div className="mt-6">
                  <h3 className="text-body-sm font-semibold text-navy">
                    Topics Covered
                  </h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {paper.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-start gap-2 text-body-sm text-medium-gray"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Download CTA */}
                <div className="mt-8 flex flex-col gap-3 border-t border-light-gray pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-body-sm text-medium-gray">
                    Free download. No email required for preview. Full report
                    available with a ParityScope account.
                  </p>
                  <Link
                    href="/contact"
                    className="shrink-0 rounded-full bg-teal px-6 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-teal-dark"
                  >
                    Download PDF
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional resources */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="More Resources"
            title="Continue Learning"
            description="Explore our blog for shorter-form insights, review real-world case studies, or browse our glossary of AI fairness terminology."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Blog",
                href: "/resources/blog",
                description:
                  "Expert insights on fairness metrics, regulatory developments, and engineering best practices.",
              },
              {
                title: "Case Studies",
                href: "/resources/case-studies",
                description:
                  "Real-world stories of healthcare organizations ensuring AI fairness with measurable outcomes.",
              },
              {
                title: "Glossary",
                href: "/resources/glossary",
                description:
                  "Comprehensive definitions of AI fairness, bias, and healthcare compliance terminology.",
              },
            ].map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group rounded-xl border border-light-gray p-8 transition-shadow hover:shadow-card-hover"
              >
                <h3 className="text-h4 font-semibold text-navy group-hover:text-teal">
                  {link.title}
                </h3>
                <p className="mt-2 text-body-sm text-medium-gray">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need Help Choosing the Right Approach?"
        description="Our team can help you understand which fairness metrics, compliance frameworks, and monitoring strategies are right for your organization's clinical AI portfolio."
        primaryCTA={{ label: "Talk to an Expert", href: "/contact" }}
        secondaryCTA={{ label: "Explore the Product", href: "/product" }}
      />
    </>
  );
}
