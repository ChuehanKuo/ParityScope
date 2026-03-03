import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "Our Team — Experts in AI Fairness & Healthcare Compliance",
  description:
    "Meet the ParityScope team: researchers, engineers, and domain experts working at the intersection of machine learning fairness, clinical informatics, and healthcare regulation.",
};

const leadership = [
  {
    name: "Dr. Amara Osei-Mensah",
    title: "CEO & Co-Founder",
    initials: "AO",
    bio: "Amara leads ParityScope's vision and strategy. She holds an MD from Johns Hopkins and a PhD in Machine Learning from MIT, where her research focused on fairness-aware clinical prediction models. Before founding ParityScope, she served as Director of Clinical AI at a major health system, where she saw firsthand how algorithmic bias affected patient outcomes in underserved communities. She has published over 30 peer-reviewed papers on health equity and algorithmic fairness.",
  },
  {
    name: "Marcus Chen",
    title: "CTO & Co-Founder",
    initials: "MC",
    bio: "Marcus oversees ParityScope's technical architecture and engineering organization. He previously spent eight years at a leading cloud infrastructure company, where he built distributed systems processing billions of healthcare transactions annually. His expertise in privacy-preserving computation and on-premise SDK architectures shaped ParityScope's foundational technical decisions. He holds an MS in Computer Science from Stanford with a focus on systems security.",
  },
  {
    name: "Dr. Elena Vasquez-Torres",
    title: "Head of Regulatory Affairs",
    initials: "EV",
    bio: "Elena leads ParityScope's regulatory strategy and compliance framework development. She previously served as a Senior Policy Advisor at the U.S. Department of Health and Human Services, where she contributed to federal guidance on algorithmic accountability in healthcare. Before HHS, she worked at the FDA's Digital Health Center of Excellence on pre-market review processes for AI/ML-based medical devices. She holds a JD from Georgetown and a Master of Public Health from Harvard.",
  },
  {
    name: "Dr. James Okonkwo",
    title: "Head of Data Science",
    initials: "JO",
    bio: "James leads ParityScope's fairness metrics research and data science team. He is a former Assistant Professor of Computer Science at UC Berkeley, where his lab published foundational work on intersectional fairness measurement and causal approaches to algorithmic bias. His research on healthcare-specific fairness metrics has been cited over 2,000 times. He holds a PhD in Statistics from Columbia University and completed a postdoctoral fellowship at Microsoft Research.",
  },
  {
    name: "Sarah Kim",
    title: "Head of Engineering",
    initials: "SK",
    bio: "Sarah leads platform engineering and infrastructure at ParityScope. She brings 12 years of experience building healthtech platforms, including five years as VP of Engineering at a Series C health data company where she led a team of 60 engineers. She specializes in building HIPAA-compliant, SOC 2-certified infrastructure and has deep expertise in designing systems that process sensitive health data at scale. She holds a BS in Computer Engineering from Georgia Tech.",
  },
];

const advisors = [
  {
    name: "Dr. Robert Langston",
    title: "Clinical Advisor",
    initials: "RL",
    bio: "Chief Medical Informatics Officer at a top-10 academic medical center. Board-certified in internal medicine and clinical informatics with 20 years of experience deploying clinical decision support systems.",
  },
  {
    name: "Prof. Fatima Al-Rashidi",
    title: "Research Advisor",
    initials: "FA",
    bio: "Professor of Computer Science at ETH Zurich and leading researcher in algorithmic fairness. Author of a widely-used textbook on fairness in machine learning and contributor to the EU AI Act's technical standards.",
  },
  {
    name: "Diana Thornton",
    title: "Regulatory Advisor",
    initials: "DT",
    bio: "Former Commissioner at a state health regulatory agency and current healthcare policy partner at a national law firm. Specializes in AI governance frameworks and anti-discrimination law as applied to clinical algorithms.",
  },
];

const teamAreas = [
  {
    role: "Machine Learning Fairness",
    count: "8 researchers",
    description:
      "Researchers with deep expertise in algorithmic fairness, bias detection methodologies, and fairness-aware model training. Our ML fairness team develops the metrics engine that powers every ParityScope audit.",
    skills: [
      "Fairness metrics research",
      "Bias detection algorithms",
      "Causal inference",
      "Statistical auditing",
    ],
  },
  {
    role: "Healthcare Regulation & Policy",
    count: "5 specialists",
    description:
      "Regulatory specialists who track the EU AI Act, FDA guidance, CMS requirements, and emerging global frameworks. They ensure ParityScope stays ahead of the compliance landscape so our customers never fall behind.",
    skills: [
      "EU AI Act compliance",
      "FDA SaMD guidance",
      "HIPAA & data governance",
      "Health equity policy",
    ],
  },
  {
    role: "Clinical Informatics",
    count: "4 informaticists",
    description:
      "Clinicians and informaticists who understand how AI is used in real-world healthcare settings. They bridge the gap between technical fairness metrics and meaningful clinical impact.",
    skills: [
      "EHR integration",
      "Clinical decision support",
      "Health outcomes research",
      "Population health analytics",
    ],
  },
  {
    role: "Software Engineering",
    count: "18 engineers",
    description:
      "Engineers building a secure, scalable platform that runs on customer infrastructure. Our SDK-first architecture ensures that sensitive patient data never leaves the environments where it belongs.",
    skills: [
      "Privacy-preserving computation",
      "SDK architecture",
      "Cloud-native infrastructure",
      "Enterprise security",
    ],
  },
];

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Our Team"
            title="Built by Experts Across Disciplines"
            description="ParityScope brings together machine learning researchers, healthcare regulatory specialists, clinical informaticists, and software engineers. Our interdisciplinary team is what makes it possible to tackle AI fairness with the depth and rigor the healthcare industry demands."
          />
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Leadership"
            title="The People Leading ParityScope"
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-navy">
                  <span className="text-h3 font-bold text-white">
                    {person.initials}
                  </span>
                </div>
                <h3 className="text-h4 font-semibold text-navy">{person.name}</h3>
                <p className="mt-1 text-body-sm font-medium text-teal">
                  {person.title}
                </p>
                <p className="mt-4 text-body-sm text-medium-gray leading-relaxed">
                  {person.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Advisors"
            title="Guided by Domain Experts"
            description="Our advisory board brings clinical, research, and regulatory perspectives that shape our product direction and ensure we are solving the right problems."
          />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {advisors.map((advisor) => (
              <div
                key={advisor.name}
                className="rounded-xl border border-light-gray p-8"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal/10">
                  <span className="text-h4 font-bold text-teal">
                    {advisor.initials}
                  </span>
                </div>
                <h3 className="text-h4 font-semibold text-navy">{advisor.name}</h3>
                <p className="mt-1 text-body-sm font-medium text-teal">
                  {advisor.title}
                </p>
                <p className="mt-3 text-body-sm text-medium-gray">{advisor.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Areas */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Expertise Areas"
            title="Where Our Expertise Lives"
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {teamAreas.map((area) => (
              <div
                key={area.role}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-navy">
                  <span className="text-body-sm font-bold text-white">PS</span>
                </div>
                <h3 className="text-h4 font-semibold text-navy">{area.role}</h3>
                <p className="mt-1 text-body-sm font-medium text-teal">{area.count}</p>
                <p className="mt-3 text-medium-gray">{area.description}</p>
                <ul className="mt-4 space-y-1">
                  {area.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2 text-body-sm text-medium-gray"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join us */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader
            label="Join Us"
            title="We Are Growing"
            description="ParityScope is hiring across all teams. If you are passionate about making healthcare AI fair and equitable, we want to hear from you."
          />
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/about/careers"
              className="rounded-full bg-navy px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-navy-light"
            >
              View Open Roles
            </Link>
            <Link
              href="/about/mission"
              className="rounded-full border border-navy px-8 py-3 text-base font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Our Mission
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Want to Join Our Team?"
        description="We are hiring across ML fairness, healthcare regulation, clinical informatics, and engineering. If you are passionate about equitable healthcare AI, we want to hear from you."
        primaryCTA={{ label: "View Careers", href: "/about/careers" }}
        secondaryCTA={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
