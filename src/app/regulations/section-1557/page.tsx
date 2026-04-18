import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Section 1557 — Anti-Discrimination in Healthcare AI",
  description:
    "Understand how Section 1557 of the Affordable Care Act applies to clinical algorithms in April 2026. OCR enforcement has been quiet; plaintiffs and class actions are driving the real risk — starting with the UnitedHealth nH Predict litigation.",
};

const requirements = [
  {
    title: "Non-Discrimination in Clinical Algorithms",
    description:
      "The 2024 final rule makes explicit that Section 1557 applies to clinical algorithms, predictive models, and AI-driven decision support. Covered entities must not use a patient-care decision support tool in a way that discriminates on the basis of race, color, national origin, sex, age, or disability.",
  },
  {
    title: "Identify & Mitigate Discrimination",
    description:
      "45 CFR 92.210 requires covered entities to make reasonable efforts to identify the use of patient care decision support tools that employ protected characteristics, and to mitigate the risk of discrimination resulting from that use. HHS has not published enforcement guidance spelling out what 'reasonable efforts' means in practice.",
  },
  {
    title: "Covered Protected Classes",
    description:
      "Race, color, national origin, sex, age, and disability. The Florida v. HHS litigation stayed parts of the 1557 rule covering gender identity and sexual orientation protections — the stay does NOT reach the algorithm provisions in 92.210.",
  },
  {
    title: "Documentation as Litigation Defense",
    description:
      "Given the shift toward private enforcement (below), the real value of compliance documentation is discovery-readiness: if your algorithm is subpoenaed in a class action, you want to hand over a fairness audit trail, not produce it on a court-ordered deadline.",
  },
  {
    title: "Third-Party AI Liability",
    description:
      "Covered entities remain responsible for discriminatory outcomes even when using third-party AI systems. Vendor indemnity clauses do not transfer the obligation to identify and mitigate discriminatory effects.",
  },
  {
    title: "HHS OCR Enforcement (Currently Dormant)",
    description:
      "The May 2025 compliance deadline passed with zero OCR enforcement actions as of April 2026. HHS under the current administration has been silent on the AI-specific provisions and has signaled reduced enforcement. This may change; the rule remains on the books.",
  },
];

const parityHelps = [
  {
    title: "Discovery-Ready Bias Audits",
    description:
      "ParityScope tests clinical AI systems across all Section 1557 protected classes using 15+ validated fairness metrics — producing a documented audit trail you can hand to outside counsel or opposing counsel without rebuilding it under deadline pressure.",
  },
  {
    title: "Algorithm Transparency for Litigation",
    description:
      "The UnitedHealth nH Predict case established that courts will order algorithm disclosure in healthcare coverage disputes. ParityScope produces human-readable algorithm documentation and subgroup performance breakdowns that hold up under cross-examination.",
  },
  {
    title: "Root-Cause Analysis",
    description:
      "We don't just flag disparities — we identify whether they stem from training data imbalances, proxy variables, label bias, or model architecture. That level of specificity matters when a plaintiff's expert will try to characterize any disparity as actionable discrimination.",
  },
  {
    title: "Mitigation Recommendations",
    description:
      "ParityScope provides evidence-based recommendations for reducing identified disparities — from resampling strategies to fairness-constrained retraining — with simulated impact on both fairness and clinical utility.",
  },
  {
    title: "Ongoing Monitoring",
    description:
      "Bias can emerge over time as patient populations shift. Continuous monitoring closes off the argument that you 'should have known' about a disparity that surfaced post-deployment.",
  },
  {
    title: "Third-Party Vendor Assessment",
    description:
      "Validate that AI systems purchased from third-party vendors meet Section 1557 non-discrimination expectations before and after deployment — so vendor liability and your organizational liability are both documented.",
  },
];

export default function Section1557Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-widest text-teal">
            Regulatory Guide
          </p>
          <h1 className="mt-4 text-h1 font-bold leading-tight lg:text-display">
            Section 1557 — Anti-Discrimination in Healthcare AI
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            Section 1557 of the Affordable Care Act prohibits discrimination in
            healthcare, and the 2024 final rule made clear it extends to
            clinical algorithms. The federal enforcement picture has shifted
            sharply: HHS OCR has been dormant on the AI provisions, and the
            real enforcement mechanism is now private litigation — most
            visibly the UnitedHealth nH Predict case.
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
              Download Section 1557 Brief
            </Link>
          </div>
        </div>
      </section>

      {/* Enforcement Reality */}
      <section className="bg-amber/5 px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-widest text-amber">
            Enforcement Reality — April 2026
          </p>
          <h2 className="mt-4 text-h2 font-bold text-navy">
            Limited Federal Enforcement; Litigation Is the Primary Mechanism
          </h2>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-medium-gray">
              <p>
                The May 2025 compliance deadline for the 2024 final rule passed
                with <strong>zero OCR enforcement actions</strong> as of April
                2026. HHS under the current administration has been silent on
                the AI-specific provisions at 45 CFR 92.210, and the
                Department has signaled reduced civil rights enforcement more
                broadly.
              </p>
              <p>
                <strong>Florida v. HHS</strong> stayed parts of the 1557 rule
                — specifically the gender identity and sexual orientation
                provisions — but the stay does not reach the algorithm
                provisions. The algorithm rule remains on the books and
                enforceable; OCR has simply chosen not to enforce it.
              </p>
              <p>
                What has filled the vacuum is <strong>private
                litigation</strong>. Plaintiffs&apos; firms have learned that
                clinical algorithms are discoverable, that performance gaps
                across protected classes make compelling class-certification
                arguments, and that courts will order algorithm disclosure
                when the record supports it.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-amber bg-white p-8">
              <p className="text-body-sm font-bold uppercase tracking-wider text-amber">
                Reference case
              </p>
              <h3 className="mt-2 text-h3 font-semibold text-navy">
                Estate of Lokken v. UnitedHealth (nH Predict)
              </h3>
              <p className="mt-4 text-body-sm text-medium-gray">
                Pending in the District of Minnesota, the Lokken class action
                alleges UnitedHealth used the nH Predict algorithm to deny
                post-acute care to Medicare Advantage beneficiaries at rates
                that class counsel characterize as a 90% error rate on reviewed
                denials. In <strong>March 2026</strong>, the court ordered
                UnitedHealth to disclose the algorithm itself — the documented
                turning point where &ldquo;trade secret&rdquo; arguments
                stopped shielding clinical AI from discovery.
              </p>
              <p className="mt-4 text-body-sm text-medium-gray">
                This is the model a plaintiff&apos;s firm will follow against
                any payer or provider using algorithmic denials, triage, or
                risk stratification. The document you produce in discovery is
                the fairness audit you should have been running all along.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            Overview of Section 1557
          </h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-medium-gray">
              <p>
                Section 1557 of the Affordable Care Act (ACA) is the first
                federal civil rights law to broadly prohibit discrimination in
                healthcare. It applies to any healthcare program or activity
                that receives federal financial assistance, operates on a
                federal health insurance exchange, or is administered by a
                federal executive agency.
              </p>
              <p>
                The 2024 final rule from the Department of Health and Human
                Services (HHS) added 45 CFR 92.210, which explicitly covers
                clinical algorithms, predictive analytics, and AI systems. It
                establishes that covered entities must make reasonable efforts
                to identify the use of patient care decision support tools
                that employ protected characteristics, and to mitigate the
                risk of discrimination from that use.
              </p>
              <p>
                Healthcare organizations using AI for clinical decision
                support, patient risk stratification, resource allocation, or
                treatment recommendations have an affirmative obligation under
                the rule. The federal enforcement of that obligation is
                currently minimal; the plaintiff-bar enforcement is not.
              </p>
            </div>
            <div className="rounded-2xl border border-light-gray bg-off-white p-8">
              <h3 className="text-h4 font-semibold text-navy">
                Key Points
              </h3>
              <ul className="mt-4 space-y-3 text-body-sm text-medium-gray">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Applies to all entities receiving federal healthcare funding
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  2024 final rule at 45 CFR 92.210 covers AI and clinical
                  algorithms
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Protects: race, color, national origin, sex, age, disability
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Unintentional bias can still be actionable
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Providers liable even for third-party AI systems
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Federal enforcement (HHS OCR) currently dormant as of April
                  2026
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Active enforcement: private litigation, class actions,
                  court-ordered algorithm discovery
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Applies to AI */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            How Section 1557 Applies to AI
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            The 2024 final rule creates specific obligations on paper. HHS has
            not actively enforced them, but the compliance requirements still
            frame what plaintiffs and judges expect a reasonable covered entity
            to have been doing.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {requirements.map((item) => (
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
        </div>
      </section>

      {/* Who This Applies To */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">Who Should Care</h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            Think of Section 1557 less as an OCR compliance exercise and more
            as a plaintiff-discovery risk profile. The organizations with the
            most exposure are the ones most likely to face class-action
            discovery, not the ones most likely to get an OCR letter.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-light-gray p-6">
              <h3 className="text-h4 font-semibold text-navy">
                Medicare Advantage & Managed Care Payers
              </h3>
              <p className="mt-3 text-body-sm text-medium-gray">
                Denials driven by algorithmic coverage decisions are the most
                visible litigation surface. If a model influences whether post-
                acute care, prior authorization, or utilization review goes
                one way or another, class counsel can map the disparate
                outcome to a protected class.
              </p>
            </div>
            <div className="rounded-2xl border border-light-gray p-6">
              <h3 className="text-h4 font-semibold text-navy">
                Health Systems Using Clinical Decision Support
              </h3>
              <p className="mt-3 text-body-sm text-medium-gray">
                Sepsis prediction, readmission risk, deterioration alerts,
                triage scoring — each of these has been shown to underperform
                on specific subgroups. Documented audits are the difference
                between a compliance story and a defendant&apos;s nightmare.
              </p>
            </div>
            <div className="rounded-2xl border border-light-gray p-6">
              <h3 className="text-h4 font-semibold text-navy">
                AI Vendors Selling Into Covered Entities
              </h3>
              <p className="mt-3 text-body-sm text-medium-gray">
                The covered entity carries the 1557 obligation, but they will
                pass it down through contractual indemnities and audit rights.
                Vendors without a documented fairness audit will lose deals
                and inherit contractual exposure they cannot mitigate after
                the fact.
              </p>
            </div>
            <div className="rounded-2xl border border-light-gray p-6">
              <h3 className="text-h4 font-semibold text-navy">
                Federal Contractors & Grant Recipients
              </h3>
              <p className="mt-3 text-body-sm text-medium-gray">
                Federal funding brings Section 1557 scope, and also brings
                NIST AI RMF expectations via procurement. The same fairness
                evidence generally discharges both.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How ParityScope Helps */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            How ParityScope Helps
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            ParityScope produces the fairness audit trail that both discharges
            the 1557 obligation and defends the algorithm in discovery.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {parityHelps.map((item) => (
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
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-section text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold">
            Be Ready Before the Subpoena, Not After
          </h2>
          <p className="mt-4 text-body-lg text-light-gray">
            The nH Predict disclosure order is the template. The next class
            action will not give your counsel time to commission a fairness
            audit from scratch. Book an assessment to understand your exposure
            and build a documented defense.
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
              className="rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Download Section 1557 Brief
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
