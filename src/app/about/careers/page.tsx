import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "Careers at ParityScope — Build Equitable Healthcare AI",
  description:
    "Join ParityScope and help make healthcare AI fair for every patient. We are hiring across ML engineering, full-stack development, healthcare regulation, developer advocacy, and solutions architecture.",
};

const cultureValues = [
  {
    title: "Mission Over Metrics",
    description:
      "We exist to eliminate bias in healthcare AI. Every feature we ship, every metric we add, and every customer we serve moves us closer to that goal. When we face trade-offs, we choose the path that maximizes patient impact.",
  },
  {
    title: "Intellectual Honesty",
    description:
      "Fairness is complex and contested. We embrace uncertainty, follow the evidence, and change our minds when the data demands it. We would rather be right slowly than wrong quickly.",
  },
  {
    title: "Deep Work, High Trust",
    description:
      "We optimize for focus and autonomy. No unnecessary meetings, no performative busyness, no status updates for the sake of status updates. We trust each other to do excellent work and communicate proactively.",
  },
  {
    title: "Interdisciplinary by Design",
    description:
      "The best solutions come from diverse perspectives. Engineers learn from clinicians, researchers learn from regulators, and everyone learns from each other. We hire for intellectual curiosity across domains.",
  },
];

const benefits = [
  {
    title: "Remote-First",
    description:
      "Work from anywhere in the US or EU. We are a distributed team by design, not by accident. Our processes, tools, and culture are built for asynchronous collaboration across time zones.",
  },
  {
    title: "Comprehensive Health Insurance",
    description:
      "We are a healthcare company, and we practice what we preach. Full medical, dental, and vision coverage for employees and dependents, with no waiting period.",
  },
  {
    title: "Meaningful Equity",
    description:
      "Every employee receives equity in ParityScope. You are not just building the product — you own a piece of the company and share in its success as we grow.",
  },
  {
    title: "Learning & Development Budget",
    description:
      "USD $3,000 per year for conferences, courses, books, and certifications. We encourage everyone to stay at the cutting edge of their discipline and cross-train in adjacent areas.",
  },
  {
    title: "Generous PTO",
    description:
      "Flexible time off with a minimum of 20 days per year plus all company holidays. We believe sustained excellence requires genuine rest and recovery.",
  },
  {
    title: "Home Office Stipend",
    description:
      "USD $2,000 one-time stipend for setting up your home workspace, plus a monthly $150 stipend for internet, co-working space, or other remote work expenses.",
  },
];

const openPositions = [
  {
    title: "Senior ML Engineer",
    department: "Engineering",
    location: "Remote (US/EU)",
    type: "Full-time",
    description:
      "Design and implement the fairness metrics engine that powers ParityScope's audit and monitoring platform. You will build scalable model evaluation pipelines, implement novel fairness metrics from research literature, and optimize our SDK for performance on customer infrastructure. Requires 5+ years of experience in ML engineering, strong Python skills, and familiarity with clinical data formats (FHIR, OMOP CDM) or a willingness to learn. Experience with fairness-aware ML, causal inference, or healthcare data is a significant plus.",
  },
  {
    title: "Full-Stack Engineer",
    department: "Engineering",
    location: "Remote (US/EU)",
    type: "Full-time",
    description:
      "Build the platform that healthcare organizations rely on to visualize, manage, and act on AI fairness insights. You will work across the stack — React/Next.js on the frontend, Python/FastAPI on the backend, and PostgreSQL for data persistence. Requires 4+ years of full-stack experience, strong TypeScript skills, and a commitment to building accessible, performant user interfaces. Experience with healthcare or compliance software, data visualization, or privacy-preserving architectures is a plus.",
  },
  {
    title: "Healthcare Regulatory Analyst",
    department: "Compliance",
    location: "Remote (US/EU)",
    type: "Full-time",
    description:
      "Track, interpret, and translate evolving AI regulations into actionable product requirements and customer guidance. You will monitor the EU AI Act implementation timeline, FDA SaMD guidance updates, Section 1557 rulemaking, and emerging global frameworks. Requires a background in healthcare policy, regulatory affairs, or health law. Experience with AI governance, algorithmic accountability, or clinical quality measurement programs (CMS, HEDIS) is strongly preferred. JD, MPH, or equivalent advanced degree preferred.",
  },
  {
    title: "DevRel / Developer Advocate",
    department: "Product",
    location: "Remote (US/EU)",
    type: "Full-time",
    description:
      "Be the voice of ParityScope in the developer and data science community. You will create technical content — tutorials, code samples, blog posts, conference talks — that helps healthcare data teams adopt fairness auditing practices. Requires a technical background (data science, ML engineering, or software development), excellent communication skills, and experience creating developer-facing content. Prior experience in healthtech, open-source communities, or developer relations is highly valued.",
  },
  {
    title: "Solutions Architect",
    department: "Customer Success",
    location: "Remote (US/EU)",
    type: "Full-time",
    description:
      "Partner with healthcare organizations to design and implement ParityScope deployments tailored to their clinical AI portfolios, infrastructure requirements, and regulatory obligations. You will conduct technical discovery, architect integration patterns with EHR systems and ML pipelines, and serve as the trusted technical advisor throughout the customer lifecycle. Requires 5+ years in a solutions architecture or technical consulting role, ideally in healthcare IT or SaaS. Deep understanding of enterprise security, cloud infrastructure (AWS/Azure/GCP), and healthcare interoperability standards is essential.",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            label="Careers"
            title="Help Us Make Healthcare AI Fair"
            description="We are building the tools that hold healthcare AI accountable. If you believe that every patient deserves equitable care and that technology should be part of the solution, we would love to work with you."
            align="left"
          />
          <p className="mt-4 text-body-lg text-medium-gray">
            ParityScope is a remote-first company with team members across North America
            and Europe. We offer competitive compensation, meaningful equity, and the
            opportunity to work on problems that genuinely matter — problems where the
            difference between a good algorithm and a biased one is measured in patient
            lives.
          </p>
        </div>
      </section>

      {/* Culture */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Our Culture"
            title="What It Means to Work Here"
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {cultureValues.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <h3 className="text-h4 font-semibold text-navy">{value.title}</h3>
                <p className="mt-3 text-medium-gray">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Benefits"
            title="What We Offer"
            description="We invest in the people who make ParityScope possible. Here is what you can expect when you join our team."
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-xl border border-light-gray p-8"
              >
                <h3 className="text-h4 font-semibold text-navy">{benefit.title}</h3>
                <p className="mt-3 text-body-sm text-medium-gray">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            label="Open Positions"
            title="Current Opportunities"
            description="All positions are remote-friendly within US and EU time zones. We offer competitive compensation, equity, and the chance to work on problems that genuinely matter."
            align="left"
          />
          <div className="mt-12 space-y-6">
            {openPositions.map((position) => (
              <div
                key={position.title}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-h4 font-semibold text-navy">
                    {position.title}
                  </h3>
                  <div className="flex gap-3">
                    <span className="rounded-full bg-off-white px-3 py-1 text-caption font-medium text-medium-gray">
                      {position.department}
                    </span>
                    <span className="rounded-full bg-off-white px-3 py-1 text-caption font-medium text-medium-gray">
                      {position.type}
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-body-sm text-teal">{position.location}</p>
                <p className="mt-3 text-medium-gray">{position.description}</p>
                <Link
                  href="/contact"
                  className="mt-4 inline-block text-body-sm font-semibold text-teal hover:underline"
                >
                  Apply Now &rarr;
                </Link>
              </div>
            ))}
          </div>

          {/* General Application */}
          <div className="mt-12 rounded-xl border border-light-gray bg-white p-8 text-center shadow-card">
            <h3 className="text-h4 font-semibold text-navy">
              Don&apos;t See the Right Fit?
            </h3>
            <p className="mt-3 text-medium-gray">
              We&apos;re always looking for exceptional people who are passionate about
              health equity and AI fairness. Send your resume and a note about what
              excites you to{" "}
              <a
                href="mailto:careers@parityscope.com"
                className="font-semibold text-teal hover:underline"
              >
                careers@parityscope.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Build Something That Matters"
        description="Join a team where your work directly impacts health equity for millions of patients. We are hiring across research, engineering, compliance, and customer success."
        primaryCTA={{ label: "Contact Us", href: "/contact" }}
        secondaryCTA={{ label: "Learn About Our Mission", href: "/about/mission" }}
      />
    </>
  );
}
