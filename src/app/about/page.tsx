import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/ui/stat-card";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "About ParityScope — Healthcare AI Fairness Compliance",
  description:
    "Learn about ParityScope's mission to make healthcare AI fair, transparent, and compliant with global regulations. We help organizations audit, monitor, and mitigate AI bias.",
};

const values = [
  {
    title: "Equity",
    description:
      "Every patient deserves AI-driven care that is free from systematic bias. We measure our impact by the disparities we help eliminate, not just the software we ship. Equity is not an afterthought in our product — it is the product.",
  },
  {
    title: "Transparency",
    description:
      "Bias thrives in opacity. We build tools that make algorithmic decision-making legible to clinicians, regulators, and the patients who are affected. Our audit reports are designed to be understood by non-technical stakeholders, not just data scientists.",
  },
  {
    title: "Scientific Rigor",
    description:
      "Our fairness metrics and audit methodologies are grounded in peer-reviewed research. We do not cut corners when patient outcomes are at stake. Every metric we implement is validated against established statistical frameworks and clinical evidence.",
  },
  {
    title: "Privacy",
    description:
      "Patient data is sacred. Our SDK-first architecture ensures that sensitive health information never leaves the customer's infrastructure. We have designed our entire platform around the principle that you should not have to sacrifice privacy to achieve fairness.",
  },
];

const stats = [
  {
    value: "2.4M+",
    label: "Predictions Audited",
    description: "Clinical AI predictions evaluated for bias across protected attributes",
  },
  {
    value: "85+",
    label: "Healthcare Organizations",
    description: "Hospitals, health systems, and MedTech companies using ParityScope",
  },
  {
    value: "15+",
    label: "Fairness Metrics",
    description: "Validated metrics covering group fairness, individual fairness, and calibration",
  },
  {
    value: "6",
    label: "Regulatory Frameworks",
    description: "EU AI Act, FDA, CMS, Section 1557, NICE, and emerging global standards",
  },
];

const milestones = [
  {
    year: "2021",
    title: "Research Origins",
    description:
      "Co-founders publish peer-reviewed research on disparities in clinical risk prediction models, documenting systematic bias across race, gender, and age in widely deployed algorithms.",
  },
  {
    year: "2022",
    title: "Company Founded",
    description:
      "ParityScope is incorporated with a mission to bridge the gap between AI fairness research and real-world healthcare implementation. Seed funding raised from healthcare-focused investors.",
  },
  {
    year: "2022",
    title: "First SDK Release",
    description:
      "Launch of the ParityScope SDK for Python, enabling on-premise fairness auditing without requiring patient data to leave hospital infrastructure.",
  },
  {
    year: "2023",
    title: "Platform Launch",
    description:
      "General availability of the ParityScope platform with continuous monitoring, automated reporting, and dashboard visualization for clinical AI fairness metrics.",
  },
  {
    year: "2023",
    title: "EU AI Act Compliance Module",
    description:
      "Release of dedicated compliance tooling aligned with the EU AI Act's high-risk AI requirements, including bias testing documentation and conformity assessment support.",
  },
  {
    year: "2024",
    title: "Series A and Expansion",
    description:
      "Series A funding to expand into European markets. Partnerships with major EHR vendors and health system networks. Team grows to 40+ across research, engineering, and regulatory affairs.",
  },
  {
    year: "2025",
    title: "Intersectional Analysis Engine",
    description:
      "Launch of industry-first intersectional fairness analysis, evaluating bias across combinations of protected attributes to catch disparities that single-attribute analysis misses.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero / Company Overview */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            label="About Us"
            title="Making Healthcare AI Fair for Every Patient"
            description="ParityScope was founded to address one of the most consequential challenges in modern medicine: ensuring that AI systems used in clinical care work equitably for every patient, regardless of race, gender, age, or socioeconomic status."
            align="left"
          />
          <div className="mt-8 space-y-4 text-body-lg text-medium-gray">
            <p>
              Clinical AI algorithms are reshaping how diagnoses are made, treatments are
              recommended, and resources are allocated. But these systems inherit the biases
              embedded in historical data, and the consequences are measured in patient
              outcomes, not just statistical error. Research consistently shows that widely
              deployed algorithms systematically disadvantage patients by race, gender, age,
              and socioeconomic status.
            </p>
            <p>
              ParityScope exists to close that gap. We provide the compliance toolkit that
              healthcare organizations need to audit their AI systems for bias, monitor
              fairness in production, and take concrete steps to mitigate disparities. Our
              platform is built for the regulatory reality that is already here: the EU AI
              Act, FDA algorithmic guidance, and a growing global consensus that healthcare
              AI must be held to the highest standard of equity.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader
            label="Our Vision"
            title="A World Where Every Patient Receives Equitable AI-Driven Care"
            description="We envision a future where no patient is denied appropriate care, misdiagnosed, or deprioritized because of who they are. Where every clinical AI system is audited before deployment, monitored continuously in production, and held accountable to the communities it serves."
            theme="dark"
          />
          <p className="mt-6 text-body-lg text-light-gray">
            This vision requires more than good intentions. It requires infrastructure —
            tools that make fairness measurable, actionable, and continuous. That is what
            we are building.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="By the Numbers"
            title="Our Impact So Far"
            description="ParityScope is used by healthcare organizations across North America and Europe to ensure their clinical AI systems meet the highest standards of fairness and regulatory compliance."
          />
          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                description={stat.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Our Values"
            title="What Guides Us"
            description="These principles shape every product decision, every customer engagement, and every line of code we write."
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {values.map((value) => (
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

      {/* Timeline */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            label="Our Journey"
            title="Key Milestones"
            description="From academic research to a platform trusted by healthcare organizations worldwide."
            align="left"
          />
          <div className="mt-12 space-y-0">
            {milestones.map((milestone, index) => (
              <div
                key={`${milestone.year}-${milestone.title}`}
                className="relative flex gap-6 pb-10"
              >
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">
                    {milestone.year.slice(-2)}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-px grow bg-light-gray" />
                  )}
                </div>
                <div className="pb-2 pt-1">
                  <span className="text-body-sm font-semibold text-teal">
                    {milestone.year}
                  </span>
                  <h3 className="mt-1 text-h4 font-semibold text-navy">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-medium-gray">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Links */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <SectionHeader
            label="Learn More"
            title="Explore ParityScope"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Our Mission",
                href: "/about/mission",
                description:
                  "Why we exist and the documented disparities in clinical AI that drive our work.",
              },
              {
                title: "Our Team",
                href: "/about/team",
                description:
                  "The experts in ML fairness, clinical informatics, and regulation building ParityScope.",
              },
              {
                title: "Careers",
                href: "/about/careers",
                description:
                  "Join us in building equitable healthcare AI infrastructure.",
              },
            ].map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group rounded-xl border border-light-gray bg-white p-8 transition-shadow hover:shadow-card-hover"
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
        title="Ready to Ensure Your AI is Fair?"
        description="Talk to our team about how ParityScope can help you audit, monitor, and mitigate bias in your clinical AI systems."
        primaryCTA={{ label: "Request a Demo", href: "/contact" }}
        secondaryCTA={{ label: "View Product", href: "/product" }}
      />
    </>
  );
}
