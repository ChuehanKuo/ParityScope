import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Team — ParityScope",
  description:
    "Meet the AI researchers, healthcare domain experts, and engineers behind ParityScope.",
};

const teamMembers = [
  {
    name: "Team Member",
    role: "Co-Founder & CEO",
    bio: "Background in healthcare technology and regulatory affairs. Previously led digital health initiatives at a major European health system. Passionate about closing the gap between AI innovation and health equity.",
  },
  {
    name: "Team Member",
    role: "Co-Founder & CTO",
    bio: "Machine learning researcher with expertise in algorithmic fairness and bias mitigation. Published work on fairness metrics for clinical AI systems. Former research scientist at a leading AI lab.",
  },
  {
    name: "Team Member",
    role: "Head of Product",
    bio: "Product leader with deep experience in healthcare SaaS and compliance tooling. Focused on making fairness auditing accessible to clinical and technical teams alike.",
  },
  {
    name: "Team Member",
    role: "Lead Engineer",
    bio: "Full-stack engineer specializing in privacy-preserving analytics and SDK design. Previously built data infrastructure for healthcare analytics platforms.",
  },
  {
    name: "Team Member",
    role: "Clinical AI Researcher",
    bio: "PhD in biomedical informatics with a focus on health disparities and clinical decision support. Bridges the gap between fairness theory and clinical practice.",
  },
  {
    name: "Team Member",
    role: "Regulatory & Compliance Lead",
    bio: "Healthcare regulatory specialist with expertise in the EU AI Act, FDA software guidance, and Section 1557. Ensures ParityScope stays ahead of global compliance requirements.",
  },
];

const advisors = [
  {
    name: "Advisor",
    role: "Clinical Ethics",
    bio: "Professor of bioethics at a leading university medical school. Research focuses on the ethical implications of AI in clinical decision-making and health equity.",
  },
  {
    name: "Advisor",
    role: "AI Regulation",
    bio: "Former regulator with expertise in AI policy across EU and Asia-Pacific jurisdictions. Advises on regulatory strategy and government affairs.",
  },
  {
    name: "Advisor",
    role: "Health Systems",
    bio: "Former Chief Medical Information Officer at a top academic medical center. Brings deep operational experience in deploying and governing clinical AI at scale.",
  },
  {
    name: "Advisor",
    role: "Machine Learning",
    bio: "Distinguished researcher in fairness-aware machine learning. Authored foundational papers on algorithmic fairness metrics and bias mitigation techniques.",
  },
];

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-h1 font-bold leading-tight lg:text-display">
            Our Team
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            We are a team of AI researchers, healthcare domain experts,
            regulatory specialists, and software engineers united by a shared
            conviction: healthcare AI must work fairly for every patient.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">Leadership</h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            Our founding team brings together expertise from AI research,
            clinical medicine, healthcare regulation, and enterprise software.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="rounded-2xl border border-light-gray p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-light">
                  <svg
                    className="h-8 w-8 text-light-gray"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-h4 font-semibold text-navy">
                  {member.name}
                </h3>
                <p className="text-body-sm font-medium text-teal">
                  {member.role}
                </p>
                <p className="mt-3 text-body-sm text-medium-gray">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">Our Advisors</h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            We are guided by advisors with deep expertise in clinical ethics,
            AI regulation, health systems, and machine learning research.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {advisors.map((advisor, index) => (
              <div
                key={index}
                className="rounded-2xl border border-light-gray bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
                  <svg
                    className="h-7 w-7 text-teal"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-h4 font-semibold text-navy">
                  {advisor.name}
                </h3>
                <p className="text-body-sm font-medium text-teal">
                  {advisor.role}
                </p>
                <p className="mt-3 text-body-sm text-medium-gray">
                  {advisor.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">Our Values</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Patient First",
                description:
                  "Every decision we make is guided by one question: does this make healthcare AI fairer for patients?",
              },
              {
                title: "Scientific Rigor",
                description:
                  "We use validated, peer-reviewed methods. Our metrics are grounded in statistical theory and clinical evidence.",
              },
              {
                title: "Transparency",
                description:
                  "We build tools that make AI explainable. We practice what we preach — our methods, assumptions, and limitations are always documented.",
              },
              {
                title: "Global Perspective",
                description:
                  "Health equity is a global challenge. We build for healthcare organizations everywhere, not just one market.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="text-h4 font-semibold text-navy">
                  {value.title}
                </h3>
                <p className="mt-3 text-body-sm text-medium-gray">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-section text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold">Join Our Team</h2>
          <p className="mt-4 text-body-lg text-light-gray">
            We are building the global standard for healthcare AI fairness. If
            you are passionate about health equity, algorithmic fairness, or
            healthcare technology, we want to hear from you.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/about/careers"
              className="rounded-full bg-teal px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              View Open Positions
            </Link>
            <Link
              href="/about/mission"
              className="rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Read Our Mission
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
