import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About ParityScope — Making Healthcare AI Fair for Every Patient",
  description:
    "Learn about ParityScope's mission to make healthcare AI fair, transparent, and compliant. Aligned with UN Sustainable Development Goals.",
};

const sdgs = [
  {
    number: "3",
    title: "Good Health and Well-Being",
    description:
      "Biased AI systems perpetuate health disparities, leading to worse outcomes for marginalized populations. By ensuring clinical AI treats every patient equitably, ParityScope contributes to universal health coverage and reduced health inequalities.",
    color: "bg-green",
  },
  {
    number: "10",
    title: "Reduced Inequalities",
    description:
      "AI bias is a mechanism through which systemic inequalities are encoded and amplified at scale. ParityScope helps organizations identify and eliminate algorithmic discrimination, reducing inequalities in access to and quality of healthcare.",
    color: "bg-coral",
  },
  {
    number: "16",
    title: "Peace, Justice and Strong Institutions",
    description:
      "Trustworthy, accountable institutions require transparent decision-making. ParityScope enables healthcare organizations to demonstrate that their AI systems are fair, explainable, and compliant with the rule of law.",
    color: "bg-navy",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-h1 font-bold leading-tight lg:text-display">
            Making Healthcare AI Fair for Every Patient
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            ParityScope exists because healthcare AI has a fairness problem —
            and the patients who suffer most are those who have always been
            underserved. We build the tools that ensure clinical AI works
            equitably for everyone.
          </p>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-body-sm font-semibold uppercase tracking-widest text-teal">
                Why We Exist
              </p>
              <h2 className="mt-4 text-h2 font-bold text-navy">
                The Fairness Problem in Healthcare AI
              </h2>
              <div className="mt-6 space-y-4 text-medium-gray">
                <p>
                  Artificial intelligence is transforming healthcare. Clinical
                  decision support systems, diagnostic algorithms, and risk
                  prediction models are being deployed at an unprecedented
                  scale, affecting millions of patient care decisions every day.
                </p>
                <p>
                  But there is a problem. Study after study has shown that
                  healthcare AI systems can systematically disadvantage patients
                  based on race, gender, age, socioeconomic status, and other
                  characteristics. A sepsis prediction model that performs
                  differently for Black and white patients. A readmission risk
                  tool that underestimates risk for women. A triage algorithm
                  that deprioritizes elderly patients.
                </p>
                <p>
                  These are not hypothetical scenarios. They are documented
                  failures in deployed clinical AI systems. And they
                  disproportionately harm the patients who are already most
                  vulnerable.
                </p>
              </div>
            </div>
            <div>
              <div className="rounded-2xl border border-light-gray bg-off-white p-8">
                <h3 className="text-h3 font-semibold text-navy">
                  The Scale of the Problem
                </h3>
                <ul className="mt-6 space-y-4 text-body-sm text-medium-gray">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-coral" />
                    Peer-reviewed studies have identified racial bias in
                    algorithms used by over 200 million patients annually in the
                    US alone.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-coral" />
                    Clinical risk scores systematically underestimate severity
                    for minority populations, leading to delayed or denied care.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-coral" />
                    Most healthcare organizations have no systematic process for
                    testing their AI systems for bias before or after deployment.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-coral" />
                    New regulations — the EU AI Act, Section 1557, and laws in
                    South Korea and Taiwan — are now making bias testing a legal
                    requirement.
                  </li>
                </ul>
              </div>
              <div className="mt-8 rounded-2xl bg-teal/10 p-8">
                <h3 className="text-h4 font-semibold text-navy">
                  Our Response
                </h3>
                <p className="mt-3 text-body-sm text-medium-gray">
                  ParityScope was founded to close this gap. We provide
                  healthcare organizations with the tools, expertise, and
                  compliance infrastructure to audit, monitor, and mitigate AI
                  bias — so they can deploy clinical AI with confidence and
                  meet global regulatory requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UN SDG Alignment */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-body-sm font-semibold uppercase tracking-widest text-teal">
              Global Impact
            </p>
            <h2 className="mt-4 text-h2 font-bold text-navy">
              Aligned with the UN Sustainable Development Goals
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-body-lg text-medium-gray">
              Our work directly contributes to three of the United Nations
              Sustainable Development Goals.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {sdgs.map((sdg) => (
              <div
                key={sdg.number}
                className="rounded-2xl border border-light-gray bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${sdg.color} text-h4 font-bold text-white`}
                >
                  {sdg.number}
                </span>
                <h3 className="mt-4 text-h4 font-semibold text-navy">
                  SDG {sdg.number}: {sdg.title}
                </h3>
                <p className="mt-3 text-body-sm text-medium-gray">
                  {sdg.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            <Link
              href="/about/mission"
              className="group rounded-2xl border border-light-gray p-8 transition-all hover:border-teal hover:shadow-card-hover"
            >
              <h3 className="text-h3 font-semibold text-navy transition-colors group-hover:text-teal">
                Our Mission
              </h3>
              <p className="mt-3 text-body-sm text-medium-gray">
                Read the full story of why ParityScope exists, the problem we
                are solving, and our vision for the future of fair healthcare AI.
              </p>
              <span className="mt-4 inline-block text-body-sm font-semibold text-teal">
                Read more &rarr;
              </span>
            </Link>
            <Link
              href="/about/team"
              className="group rounded-2xl border border-light-gray p-8 transition-all hover:border-teal hover:shadow-card-hover"
            >
              <h3 className="text-h3 font-semibold text-navy transition-colors group-hover:text-teal">
                Our Team
              </h3>
              <p className="mt-3 text-body-sm text-medium-gray">
                Meet the AI researchers, healthcare domain experts, and
                engineers building the future of algorithmic fairness in
                clinical AI.
              </p>
              <span className="mt-4 inline-block text-body-sm font-semibold text-teal">
                Meet the team &rarr;
              </span>
            </Link>
            <Link
              href="/about/careers"
              className="group rounded-2xl border border-light-gray p-8 transition-all hover:border-teal hover:shadow-card-hover"
            >
              <h3 className="text-h3 font-semibold text-navy transition-colors group-hover:text-teal">
                Careers
              </h3>
              <p className="mt-3 text-body-sm text-medium-gray">
                Join us in making healthcare AI fair for every patient. We are
                hiring across engineering, research, and go-to-market.
              </p>
              <span className="mt-4 inline-block text-body-sm font-semibold text-teal">
                View openings &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
