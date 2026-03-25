import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — Join ParityScope",
  description:
    "Join ParityScope and help make healthcare AI fair for everyone. Learn about our mission, culture, and opportunities.",
};

export default function CareersPage() {
  return (
    <section className="px-4 py-section sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Hero */}
        <h1 className="text-h1 font-bold text-navy">
          Build the Future of Fair AI
        </h1>
        <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
          At ParityScope, we are tackling one of the most important
          challenges in healthcare technology: ensuring AI systems work
          fairly for every patient, regardless of who they are.
        </p>

        {/* Mission */}
        <div className="mt-16">
          <h2 className="text-h3 font-bold text-navy">Our Mission</h2>
          <p className="mt-4 text-medium-gray leading-relaxed">
            Healthcare AI has the potential to transform patient outcomes,
            but only if it works equitably across all populations. Biased
            algorithms can reinforce existing health disparities and harm
            the communities that need care most. ParityScope exists to
            ensure that does not happen. We build tools that give
            healthcare organizations the power to detect, measure, and
            mitigate bias in their AI systems &#8212; meeting regulatory
            requirements like the EU AI Act while advancing health equity.
          </p>
        </div>

        {/* Values */}
        <div className="mt-16">
          <h2 className="text-h3 font-bold text-navy">
            What We Value
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-light-gray p-6">
              <h3 className="font-semibold text-navy">
                Rigor Over Shortcuts
              </h3>
              <p className="mt-2 text-body-sm text-medium-gray">
                Fairness in healthcare is too important for superficial
                solutions. We take the time to get the science right,
                validate our methods, and build tools that healthcare
                professionals can trust.
              </p>
            </div>
            <div className="rounded-xl border border-light-gray p-6">
              <h3 className="font-semibold text-navy">
                Impact-Driven Work
              </h3>
              <p className="mt-2 text-body-sm text-medium-gray">
                Every line of code we write has the potential to affect
                patient care. We are motivated by the real-world impact of
                our work and hold ourselves accountable to the communities
                we serve.
              </p>
            </div>
            <div className="rounded-xl border border-light-gray p-6">
              <h3 className="font-semibold text-navy">
                Transparency &amp; Openness
              </h3>
              <p className="mt-2 text-body-sm text-medium-gray">
                We believe in open communication, clear documentation, and
                honest conversations about what our tools can and cannot
                do. We share our research and contribute to the broader
                AI fairness community.
              </p>
            </div>
            <div className="rounded-xl border border-light-gray p-6">
              <h3 className="font-semibold text-navy">
                Diverse Perspectives
              </h3>
              <p className="mt-2 text-body-sm text-medium-gray">
                Building fair AI requires diverse teams. We actively seek
                people with different backgrounds, experiences, and
                viewpoints because better perspectives lead to better
                products.
              </p>
            </div>
          </div>
        </div>

        {/* What It's Like */}
        <div className="mt-16">
          <h2 className="text-h3 font-bold text-navy">
            What It&apos;s Like to Work Here
          </h2>
          <div className="mt-6 space-y-4 text-medium-gray leading-relaxed">
            <p>
              We are a small, focused team based in Berlin working at the
              intersection of machine learning, healthcare, and regulatory
              compliance. As an early-stage company, every team member has
              significant influence on our product direction, technical
              architecture, and company culture.
            </p>
            <p>
              We work with cutting-edge ML fairness research, collaborate
              closely with healthcare organizations across Europe, and
              navigate one of the most consequential regulatory frameworks
              in AI history. If you want your work to matter, this is the
              place.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-off-white p-5">
              <p className="font-semibold text-navy">Remote-Friendly</p>
              <p className="mt-1 text-body-sm text-medium-gray">
                Berlin-based with flexible remote options across EU time
                zones.
              </p>
            </div>
            <div className="rounded-lg bg-off-white p-5">
              <p className="font-semibold text-navy">
                Research-Oriented
              </p>
              <p className="mt-1 text-body-sm text-medium-gray">
                Dedicated time for exploring new fairness methods and
                contributing to open research.
              </p>
            </div>
            <div className="rounded-lg bg-off-white p-5">
              <p className="font-semibold text-navy">Early-Stage Impact</p>
              <p className="mt-1 text-body-sm text-medium-gray">
                Shape the product, the team, and the company from the
                ground up.
              </p>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <div className="mt-16">
          <h2 className="text-h3 font-bold text-navy">Open Positions</h2>
          <div className="mt-6 rounded-xl border border-light-gray bg-off-white p-8">
            <p className="text-medium-gray">
              There are no open positions at the moment. We are a growing
              team and new roles will be posted here as they become
              available.
            </p>
          </div>
        </div>

        {/* Reach Out */}
        <div className="mt-12 rounded-xl bg-navy p-8 sm:p-12">
          <h2 className="text-h3 font-bold text-white">
            Don&apos;t See the Right Role?
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">
            We are always interested in hearing from talented people who
            are passionate about AI fairness, healthcare, and building
            high-quality software. If you think you could contribute to
            our mission, we would love to hear from you &#8212; even if
            there is no open position that matches your profile today.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="mailto:careers@parityscope.com?subject=Speculative%20Application"
              className="inline-flex items-center justify-center rounded-lg bg-teal px-8 py-3 font-semibold text-white transition-colors hover:bg-teal/90"
            >
              Send Us Your Profile
            </a>
            <span className="text-body-sm text-white/50">
              Include your CV and a brief note about what excites you
              about ParityScope.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
