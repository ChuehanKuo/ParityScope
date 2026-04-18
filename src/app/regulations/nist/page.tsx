import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NIST AI Risk Management Framework — Healthcare AI Guide",
  description:
    "NIST AI RMF 1.0 is voluntary, but it's referenced in the Colorado AI Act, Texas RAIA (HB 149), and federal procurement. A practical guide to the four functions and the controls that matter for healthcare AI fairness.",
};

const functions = [
  {
    name: "GOVERN",
    color: "bg-navy",
    description:
      "Cultivates a culture of risk management — policies, accountability, roles, and oversight that apply across all AI systems in scope. GOVERN is cross-cutting; the other three functions plug into it.",
  },
  {
    name: "MAP",
    color: "bg-teal",
    description:
      "Establishes context: intended use, deployment setting, stakeholders, potential impacts, and the categorization of AI risks. For clinical AI, MAP is where you document who the model affects and how.",
  },
  {
    name: "MEASURE",
    color: "bg-amber",
    description:
      "Analyzes, assesses, benchmarks, and monitors the AI risks identified in MAP — using quantitative and qualitative methods. This is where fairness metrics, subpopulation analysis, and bootstrap confidence intervals live.",
  },
  {
    name: "MANAGE",
    color: "bg-coral",
    description:
      "Allocates resources to identified risks and treats them through mitigation, transfer, avoidance, or acceptance — with documented rationale and continuous monitoring.",
  },
];

const whyItMatters = [
  {
    title: "Colorado AI Act",
    detail:
      "Effective 2026-02-01. Developers and deployers of high-risk AI systems must implement risk management programs that may comply with the NIST AI RMF as one acceptable framework. Healthcare AI is in scope.",
  },
  {
    title: "Texas RAIA (HB 149)",
    detail:
      "The Responsible Artificial Intelligence Act references NIST as the benchmark for risk management programs. State agency procurement of AI for health and human services explicitly leans on the framework.",
  },
  {
    title: "Future State Laws",
    detail:
      "California, New York, Connecticut, and others have draft AI legislation in flight. The pattern is consistent: NIST AI RMF or equivalent is named as an acceptable risk-management baseline.",
  },
  {
    title: "Federal Procurement",
    detail:
      "Department of Defense, Department of Veterans Affairs, and other federal contracting officers increasingly require NIST AI RMF alignment for AI systems sold into federal use — including federally funded healthcare delivery.",
  },
  {
    title: "Trump Administration Posture",
    detail:
      "The current administration has NOT rescinded the NIST AI RMF. The framework is voluntary and pre-dates the Biden EO that was rescinded — making it one of the more durable pieces of US AI governance infrastructure.",
  },
  {
    title: "GenAI Profile (NIST-AI-600-1)",
    detail:
      "Published July 2024, the Generative AI profile extends the AI RMF with risks specific to foundation models — relevant for clinical scribes, ambient documentation, and LLM-based clinical decision support.",
  },
];

const fairnessControls = [
  {
    control: "MAP 2.3",
    title: "Context of Use Documented",
    requirement:
      "The context in which the AI system will be deployed is documented, including intended users, intended use cases, and operational environment.",
    parityscope:
      "ParityScope's data profiler captures the deployment context — patient population, care setting, intended subpopulations — and writes it into the audit metadata so MAP 2.3 evidence is generated as a side-effect of running an audit, not a separate documentation exercise.",
  },
  {
    control: "MEASURE 2.11",
    title: "Fairness Evaluation Criteria Defined",
    requirement:
      "Fairness and bias considerations are evaluated using metrics appropriate to the AI system's context, with defined criteria and thresholds.",
    parityscope:
      "ParityScope ships with 15+ fairness metrics, automatic metric selection based on context, bootstrap confidence intervals, and statistical power analysis — the quantitative substrate MEASURE 2.11 expects.",
  },
  {
    control: "MANAGE 2.2",
    title: "Risk Treatment Documented",
    requirement:
      "Identified risks are treated through documented mitigation, transfer, avoidance, or acceptance decisions, with rationale and ongoing monitoring.",
    parityscope:
      "Our recommendation engine produces ranked mitigation strategies with simulated impact, and our monitoring engine logs the ongoing treatment evidence — closing the loop from MEASURE finding to MANAGE decision to documented outcome.",
  },
  {
    control: "GOVERN 1.4",
    title: "Roles & Accountability",
    requirement:
      "Roles, responsibilities, and lines of communication for AI risk management are clearly defined, documented, and communicated.",
    parityscope:
      "ParityScope audit reports include a 'compliance owner' attribution block that ties each finding and decision back to a named role — making the GOVERN evidence concrete instead of organizational hand-waving.",
  },
  {
    control: "MEASURE 3.2",
    title: "Continuous Monitoring",
    requirement:
      "AI system performance is continuously monitored, with mechanisms to detect performance degradation, data drift, and emerging risks.",
    parityscope:
      "The monitoring engine persists audit runs, detects fairness and accuracy drift against documented baselines, and emits alerts — directly satisfying MEASURE 3.2 with audit-trail evidence.",
  },
];

export default function NistPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-widest text-teal">
            Regulatory Guide
          </p>
          <h1 className="mt-4 text-h1 font-bold leading-tight lg:text-display">
            NIST AI Risk Management Framework 1.0
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            Voluntary US federal framework — referenced in the Colorado AI
            Act, Texas RAIA, future state AI laws, and federal procurement.
            For healthcare AI, NIST is rapidly becoming the de-facto baseline
            that statutes and contracts point to.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book a Compliance Assessment
            </Link>
            <Link
              href="/resources/whitepapers"
              className="rounded-full border border-white/30 px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Download NIST Brief
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">Overview</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-medium-gray">
              <p>
                The National Institute of Standards and Technology (NIST)
                published <strong>AI RMF 1.0</strong> on 2023-01-26. It is a
                voluntary framework that organizes AI risk management into
                four cross-cutting functions: GOVERN, MAP, MEASURE, MANAGE. It
                is sector-agnostic by design but maps cleanly to healthcare AI
                use cases.
              </p>
              <p>
                In July 2024 NIST released <strong>NIST-AI-600-1</strong>, the
                Generative AI Profile, which extends the AI RMF with risks
                specific to foundation models — relevant for clinical
                scribes, ambient documentation, and LLM-driven decision
                support that has proliferated in clinical workflows.
              </p>
              <p>
                NIST AI RMF is voluntary on its own. It becomes mandatory in
                practice through three channels: state AI laws that name it
                as an acceptable baseline, federal procurement requirements,
                and customer contracts that pass federal expectations down
                the supply chain.
              </p>
              <p>
                The framework was issued under standing NIST authority and
                pre-dates the Biden AI Executive Order that the current
                administration rescinded. As a result, NIST AI RMF remains
                fully in effect and is one of the more durable pieces of US
                AI governance infrastructure.
              </p>
            </div>
            <div className="rounded-2xl border border-light-gray bg-off-white p-8">
              <h3 className="text-h4 font-semibold text-navy">
                Key Facts at a Glance
              </h3>
              <ul className="mt-4 space-y-3 text-body-sm text-medium-gray">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Status: Voluntary federal framework
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  AI RMF 1.0 published: 2023-01-26
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Generative AI Profile (NIST-AI-600-1): July 2024
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Four functions: GOVERN, MAP, MEASURE, MANAGE
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Referenced in: Colorado AI Act, Texas RAIA, federal
                  procurement
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Status under current administration: NOT rescinded
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Four Functions */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">The Four Functions</h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            The AI RMF is structured around four functions. GOVERN is
            cross-cutting; MAP, MEASURE, and MANAGE form the operational
            cycle that runs over the AI system lifecycle.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {functions.map((fn) => (
              <div
                key={fn.name}
                className="rounded-2xl border border-light-gray bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-caption font-bold uppercase tracking-wider text-white ${fn.color}`}
                >
                  {fn.name}
                </span>
                <p className="mt-4 text-body-sm text-medium-gray">
                  {fn.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            Why It Matters Even Though Voluntary
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            Voluntary at the federal level does not mean optional in
            practice. State legislatures and federal contracting offices
            have made NIST AI RMF the reference framework that other
            requirements point to.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {whyItMatters.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-light-gray p-6"
              >
                <h3 className="text-h4 font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-body-sm text-medium-gray">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Relevant Controls */}
      <section className="bg-navy px-4 py-section text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold">Relevant Controls for Fairness</h2>
          <p className="mt-4 max-w-3xl text-body-lg text-light-gray">
            ParityScope maps directly to the controls that govern fairness
            and bias risk in the NIST AI RMF. Each ParityScope output cites
            the specific control identifier so audit-trail evidence is
            indexable against the framework.
          </p>
          <div className="mt-12 space-y-6">
            {fairnessControls.map((item) => (
              <div
                key={item.control}
                className="rounded-2xl border border-white/10 bg-navy-light p-8"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
                  <div className="lg:w-1/2">
                    <p className="text-body-sm font-bold uppercase tracking-wider text-teal">
                      {item.control}
                    </p>
                    <h3 className="mt-2 text-h3 font-semibold">{item.title}</h3>
                    <p className="mt-3 text-body-sm text-light-gray">
                      <span className="font-semibold text-white">
                        Requirement:{" "}
                      </span>
                      {item.requirement}
                    </p>
                  </div>
                  <div className="lg:w-1/2">
                    <p className="text-body-sm text-light-gray">
                      <span className="font-semibold text-teal">
                        ParityScope Solution:{" "}
                      </span>
                      {item.parityscope}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold text-navy">
            Run NIST-Aligned Audits Today
          </h2>
          <p className="mt-4 text-body-lg text-medium-gray">
            The state laws and procurement clauses that point to NIST AI RMF
            are landing in 2026. ParityScope produces the GOVERN, MAP,
            MEASURE, and MANAGE evidence those clauses ask for — out of the
            box.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book a Compliance Assessment
            </Link>
            <Link
              href="/resources/whitepapers"
              className="rounded-full border border-navy/30 px-8 py-3 text-base font-semibold text-navy transition-colors hover:bg-navy/5"
            >
              Download NIST Brief
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
