import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FDA AI/ML-Enabled Medical Devices — Compliance Guide",
  description:
    "What FDA expects from AI-enabled Software as a Medical Device: Good Machine Learning Practice (GMLP), the January 2025 draft guidance on AI-enabled device software functions, and Predetermined Change Control Plans (PCCP).",
};

const statusItems = [
  {
    date: "October 2021",
    title: "GMLP Guiding Principles Issued",
    description:
      "FDA, Health Canada, and the UK MHRA jointly issued 10 Good Machine Learning Practice guiding principles for medical device development.",
  },
  {
    date: "December 2024",
    title: "PCCP Final Guidance",
    description:
      "FDA finalized the Predetermined Change Control Plan guidance, defining how AI/ML-enabled devices may be modified post-clearance without new submissions.",
  },
  {
    date: "January 2025",
    title: "Draft Guidance: AI-Enabled Device Software Functions",
    description:
      "FDA issued draft guidance on lifecycle considerations and premarket submissions for AI-enabled device software functions. Comment period closed in April 2025.",
  },
  {
    date: "January 2026",
    title: "CES Deregulation Signal",
    description:
      "Commissioner Makary used CES 2026 to telegraph a deregulatory posture for AI in medicine. The draft guidance now sits on FDA's 'B list' for FY2026 — published as resources permit.",
  },
];

const gmlpPrinciples = [
  {
    number: "1",
    title: "Multi-Disciplinary Expertise",
    description:
      "Multi-disciplinary expertise is leveraged throughout the total product lifecycle.",
  },
  {
    number: "2",
    title: "Good Software Engineering",
    description:
      "Good software engineering and security practices are implemented.",
  },
  {
    number: "3",
    title: "Representative Datasets",
    description:
      "Clinical study participants and datasets are representative of the intended patient population.",
  },
  {
    number: "4",
    title: "Independent Test Sets",
    description:
      "Training datasets are independent of test sets.",
  },
  {
    number: "5",
    title: "Best Available Reference",
    description:
      "Selected reference datasets are based upon the best available methods.",
  },
  {
    number: "6",
    title: "Tailored Model Design",
    description:
      "Model design is tailored to the available data and reflects the intended use of the device.",
  },
  {
    number: "7",
    title: "Human-AI Team Performance",
    description:
      "Focus is placed on the performance of the human-AI team, not just the model in isolation.",
  },
  {
    number: "8",
    title: "Clinically Relevant Subpopulation Performance",
    description:
      "Testing demonstrates device performance during clinically relevant conditions, including across the relevant subpopulations the device will encounter in deployment.",
  },
  {
    number: "9",
    title: "Clear User Information",
    description:
      "Users are provided clear, essential information.",
  },
  {
    number: "10",
    title: "Monitored Deployment",
    description:
      "Deployed models are monitored for performance and re-training risks are managed.",
  },
];

const pccpItems = [
  {
    title: "Description of Modifications",
    description:
      "Specify the planned changes — model retraining, data drift response, performance threshold updates — that may occur post-authorization without new 510(k), De Novo, or PMA submission.",
  },
  {
    title: "Modification Protocol",
    description:
      "Document the methods that will be used to validate each planned modification, including data acquisition, retraining procedure, performance evaluation, and update deployment.",
  },
  {
    title: "Impact Assessment",
    description:
      "Analyze how each planned modification affects safety and effectiveness, including subpopulation performance — directly mapping to GMLP Principle 8.",
  },
];

const parityHelps = [
  {
    title: "FDA-Aligned Audit Reports",
    description:
      "ParityScope produces audit outputs structured against the GMLP principles and the January 2025 draft guidance — so the same evidence package supports a 510(k) submission, De Novo classification, or pre-submission Q-Sub meeting.",
  },
  {
    title: "Subpopulation Performance Documentation",
    description:
      "Principle 8 requires demonstrating performance across clinically relevant subpopulations. ParityScope generates per-subgroup performance tables with bootstrap confidence intervals and statistical power analysis.",
  },
  {
    title: "PCCP-Compatible Monitoring",
    description:
      "Our monitoring engine produces the kind of post-market performance evidence a PCCP modification protocol can reference: drift detection, subpopulation tracking, retraining triggers, and audit-trail logging.",
  },
  {
    title: "Demographic Validation Cohorts",
    description:
      "ParityScope's data profiler documents the demographic composition of training, validation, and test sets — ready to drop into the device description and clinical validation sections of a submission.",
  },
  {
    title: "Intersectional Subpopulation Analysis",
    description:
      "Beyond single-axis subgroups, ParityScope tests performance at intersections (e.g., older Black women on Medicare Advantage) — the kind of granularity reviewers increasingly ask about during pre-submission feedback.",
  },
  {
    title: "Pre-Submission Best Practice",
    description:
      "Even while the draft guidance sits on the B list, FDA reviewers expect GMLP-aligned evidence in pre-submission interactions. ParityScope formats its outputs to match that expectation.",
  },
];

export default function FdaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-widest text-teal">
            Regulatory Guide
          </p>
          <h1 className="mt-4 text-h1 font-bold leading-tight lg:text-display">
            FDA AI/ML-Enabled Medical Devices
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            Good Machine Learning Practice guiding principles, the January 2025
            draft guidance on AI-enabled device software functions, and
            Predetermined Change Control Plans. FDA is not driving rapid
            enforcement in 2026 — but the GMLP framework is what reviewers
            still expect in pre-submissions and what your competitors are
            building toward.
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
              Download FDA Brief
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
                FDA regulates AI-enabled medical software as Software as a
                Medical Device (SaMD) under existing device-authority pathways
                — 510(k), De Novo classification, and PMA. The Center for
                Devices and Radiological Health (CDRH) has issued guiding
                principles, finalized the Predetermined Change Control Plan
                framework, and put out draft guidance on lifecycle
                considerations specific to AI-enabled device software
                functions.
              </p>
              <p>
                What FDA expects, in practice, is documented evidence that the
                model performs across the patient population it will encounter
                in clinical use — and that the manufacturer has a plan for
                monitoring and updating the model post-clearance. Bias and
                subpopulation performance are not separate compliance
                exercises; they are core elements of the safety and
                effectiveness case.
              </p>
              <p>
                The current FDA posture (April 2026) is unhurried. Commissioner
                Makary used CES 2026 to signal deregulation, and the January
                2025 draft guidance now sits on the FY2026 B list — meaning
                FDA will publish it as resources permit, with no firm
                timeline. The substantive expectations have not changed; the
                clock has just slowed.
              </p>
            </div>
            <div className="rounded-2xl border border-light-gray bg-off-white p-8">
              <h3 className="text-h4 font-semibold text-navy">
                Key Facts at a Glance
              </h3>
              <ul className="mt-4 space-y-3 text-body-sm text-medium-gray">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Regulatory pathway: 510(k), De Novo, or PMA depending on
                  classification
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  GMLP: 10 guiding principles co-issued with Health Canada and
                  MHRA (Oct 2021)
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  PCCP final guidance: December 2024
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Jan 2025 draft guidance: comment period closed April 2025;
                  on FY2026 B list
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Bias-specific anchor: GMLP Principle 8 (subpopulation
                  performance)
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Current posture: deregulatory; pre-submission best practice
                  still applies
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Current Status */}
      <section className="bg-amber/5 px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-widest text-amber">
            Current Status — April 2026
          </p>
          <h2 className="mt-4 text-h2 font-bold text-navy">
            Where the FDA AI Framework Stands
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {statusItems.map((item) => (
              <div
                key={item.date}
                className="rounded-2xl border border-light-gray bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <p className="text-body-sm font-bold uppercase tracking-wider text-teal">
                  {item.date}
                </p>
                <h3 className="mt-3 text-h4 font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-body-sm text-medium-gray">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GMLP Principles */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            Good Machine Learning Practice — 10 Guiding Principles
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            Co-issued by FDA, Health Canada, and the UK MHRA in October 2021,
            the GMLP guiding principles remain the most influential framework
            for AI-enabled medical device development. Principle 8 is the
            anchor for fairness and subpopulation performance.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gmlpPrinciples.map((p) => (
              <div
                key={p.number}
                className={`rounded-2xl border p-6 ${
                  p.number === "8"
                    ? "border-teal bg-teal/5"
                    : "border-light-gray"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-body-sm font-bold ${
                      p.number === "8"
                        ? "bg-teal text-white"
                        : "bg-light-gray text-navy"
                    }`}
                  >
                    {p.number}
                  </span>
                  <h3 className="text-h4 font-semibold text-navy">{p.title}</h3>
                </div>
                <p className="mt-3 text-body-sm text-medium-gray">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PCCP */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            Predetermined Change Control Plans (PCCP)
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            FDA finalized the PCCP guidance in December 2024. A PCCP lets a
            manufacturer specify, at the time of premarket authorization, the
            modifications it intends to make to an AI/ML model post-clearance
            — without requiring a new submission for each update.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {pccpItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-light-gray bg-white p-6 shadow-card"
              >
                <h3 className="text-h4 font-semibold text-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-body-sm text-medium-gray">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-body-sm text-medium-gray">
            For AI-enabled devices that will retrain on real-world data, the
            PCCP is the difference between &ldquo;every update is a new
            submission&rdquo; and &ldquo;updates ship within the agreed
            modification protocol.&rdquo; Building a PCCP is now table stakes
            for any model that touches drifting clinical data.
          </p>
        </div>
      </section>

      {/* Bias-Specific Expectations */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            Bias-Specific Expectations
          </h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-medium-gray">
              <p>
                FDA does not yet have an AI-bias regulation, but reviewers
                consistently raise three expectations during pre-submission
                interactions and 510(k) review:
              </p>
              <ol className="ml-4 list-decimal space-y-3">
                <li>
                  <strong>GMLP Principle 8 evidence.</strong> Demonstrate
                  performance across the clinically relevant subpopulations
                  the device will encounter — by race, ethnicity, sex, age,
                  and any condition-specific axis (e.g., disease severity,
                  comorbidity).
                </li>
                <li>
                  <strong>Demographic validation cohort documentation.</strong>
                  Document the composition of training, validation, and test
                  cohorts. Reviewers expect to see whether the cohorts reflect
                  the intended-use population, and what the gaps are.
                </li>
                <li>
                  <strong>Post-market performance plan.</strong> Outline how
                  subpopulation performance will be monitored after clearance,
                  and what triggers will prompt retraining or label revision.
                  This dovetails with the PCCP modification protocol.
                </li>
              </ol>
            </div>
            <div className="rounded-2xl border-2 border-teal bg-teal/5 p-8">
              <h3 className="text-h4 font-semibold text-navy">
                Pre-Submission Reality
              </h3>
              <p className="mt-4 text-body-sm text-medium-gray">
                Even while the January 2025 draft guidance sits on the B list,
                CDRH reviewers are asking subpopulation-performance questions
                in pre-submission Q-Sub meetings. Manufacturers that arrive
                with a clean Principle 8 evidence package move through review
                faster — and avoid the late-cycle subgroup study that derails
                a submission timeline.
              </p>
              <p className="mt-4 text-body-sm text-medium-gray">
                The deregulatory posture changes the enforcement clock; it
                does not change reviewer expectations on the ground.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How ParityScope Helps */}
      <section className="bg-navy px-4 py-section text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold">How ParityScope Helps</h2>
          <p className="mt-4 max-w-3xl text-body-lg text-light-gray">
            ParityScope produces FDA-aligned evidence: GMLP Principle 8
            subpopulation performance, demographic validation documentation,
            and PCCP-compatible monitoring outputs.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {parityHelps.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-navy-light p-6"
              >
                <h3 className="text-h4 font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-body-sm text-light-gray">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold text-navy">
            Build a GMLP-Aligned Evidence Package
          </h2>
          <p className="mt-4 text-body-lg text-medium-gray">
            FDA&apos;s pace is not the bottleneck — your subpopulation
            evidence is. Book an assessment to scope what your submission
            needs and how ParityScope produces it.
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
              Download FDA Brief
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
