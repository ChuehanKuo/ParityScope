import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EU AI Act — What Healthcare Organizations Need to Know",
  description:
    "Comprehensive guide to EU AI Act compliance for healthcare AI. Understand the Digital Omnibus delay, high-risk requirements under Regulation 2024/1689, penalties, and how ParityScope maps to every obligation.",
};

const timelineItems = [
  {
    date: "February 2025",
    title: "AI Literacy Obligations",
    description:
      "All providers and deployers must ensure staff have sufficient AI literacy. Training programs and competency records become mandatory (Article 4).",
  },
  {
    date: "August 2025",
    title: "Prohibited AI Practices",
    description:
      "Ban on social scoring, real-time biometric identification in public spaces (with exceptions), manipulation techniques, and exploitation of vulnerabilities takes effect.",
  },
  {
    date: "April 2026 (current)",
    title: "Harmonized Standards Still Missing",
    description:
      "Originally targeted for fall 2025, the CEN-CENELEC harmonized standards that underpin high-risk conformity assessments have not been published. Only 8 of 27 member states had designated national competent authorities by the Article 70 deadline.",
  },
  {
    date: "Dec 2027 (expected)",
    title: "High-Risk Annex III Obligations",
    description:
      "Under the Digital Omnibus amendments backed by the European Parliament on 2026-03-23 (569-45 vote), Annex III high-risk obligations are expected to slip from August 2026 to roughly December 2027.",
  },
  {
    date: "Aug 2028 (expected)",
    title: "Annex I / Medical Device AI",
    description:
      "AI embedded in CE-marked medical devices (Annex I / MDR and IVDR pathway) is expected to align with notified-body conformity assessment around August 2028. Some Omnibus drafts also propose carving medical AI out of the high-risk regime entirely.",
  },
];

const articleMappings = [
  {
    article: "Article 10(2)(f)",
    title: "Examination in View of Possible Biases",
    requirement:
      "Training, validation, and testing datasets must be examined in view of possible biases that are likely to affect the health and safety of persons, have a negative impact on fundamental rights, or lead to discrimination prohibited under Union law.",
    parityscope:
      "ParityScope audits dataset composition across every protected attribute you supply, flags representation gaps with confidence intervals, and documents the examination in a format suitable for the technical file.",
  },
  {
    article: "Article 10(2)(g)",
    title: "Appropriate Measures to Detect, Prevent and Mitigate",
    requirement:
      "Providers must implement appropriate measures to detect, prevent, and mitigate the biases identified in (2)(f), so that they do not propagate into deployment or produce discriminatory outcomes.",
    parityscope:
      "Our mitigation engine proposes ranked interventions — resampling, reweighting, threshold adjustment, fairness-constrained retraining — and simulates their effect on both fairness and clinical utility before you commit.",
  },
  {
    article: "Article 10(2)(h)",
    title: "Data Governance and Management Practices",
    requirement:
      "Providers must establish appropriate data governance and management practices covering design choices, data collection, data preparation, assumptions about what data should measure, and assessment of availability, quantity, and suitability of datasets.",
    parityscope:
      "ParityScope's data profiler produces a data-governance dossier: provenance, preprocessing steps, subgroup counts, known limitations, and suitability assessments — ready to attach to your technical documentation.",
  },
  {
    article: "Article 13",
    title: "Transparency & Information to Deployers",
    requirement:
      "High-risk systems must be designed so that deployers can interpret outputs and use the system appropriately, with instructions for use covering capabilities, limitations, and expected accuracy.",
    parityscope:
      "Our compliance reports include human-readable explanations of metrics, disparities, and subgroup performance, plus a standardized 'instructions for use' appendix that can ship with the model.",
  },
  {
    article: "Article 14",
    title: "Human Oversight",
    requirement:
      "Systems must be designed to allow effective human oversight, including the ability for natural persons to understand capabilities, limitations, and to correctly interpret outputs.",
    parityscope:
      "ParityScope dashboards expose per-subgroup fairness signals to clinical staff so they can calibrate trust, override recommendations, or escalate based on concrete evidence.",
  },
  {
    article: "Article 15 + Annex IV(2)(g)",
    title: "Accuracy, Robustness & Cybersecurity",
    requirement:
      "Article 15 mandates appropriate levels of accuracy, robustness, and cybersecurity across the lifecycle. Annex IV(2)(g) specifies that the technical documentation must include performance metrics — including for subpopulations — and descriptions of foreseeable unintended outcomes.",
    parityscope:
      "The ParityScope SDK produces performance tables with bootstrap confidence intervals across every subpopulation you define, and tracks drift against those baselines — directly populating the Annex IV(2)(g) evidence block.",
  },
  {
    article: "Article 72",
    title: "Post-Market Monitoring",
    requirement:
      "Providers of high-risk AI systems must establish and document a post-market monitoring system that proportionately and systematically collects, documents, and analyses relevant data on performance throughout the system's lifetime.",
    parityscope:
      "ParityScope's monitoring engine persists audit runs with SQLite-backed trend analysis, drift detection, and alerting — producing the continuous Article 72 evidence record that the Market Surveillance Authority will ask for.",
  },
  {
    article: "Annex III",
    title: "High-Risk Classification",
    requirement:
      "AI systems used in healthcare — including clinical decision support, diagnostic aids, and treatment recommendations — are presumed high-risk under Annex III (subject to the Digital Omnibus review of whether medical AI should remain on this list).",
    parityscope:
      "ParityScope ships with pre-configured audit templates aligned to the clinical AI use cases currently covered by Annex III, and tracks the Omnibus medical-device carve-out discussion so your evidence package adapts if scope changes.",
  },
];

const checklist = [
  "Inventory every AI system and classify it under the current EU AI Act tiers (prohibited, high-risk, limited risk, minimal risk) — and flag anything sitting in the medical-device carve-out discussion.",
  "Appoint an AI governance lead responsible for compliance coordination across clinical, legal, and technical teams, and track the notified-body landscape for your product category.",
  "Conduct a bias examination under Article 10(2)(f) for every high-risk AI system using validated fairness metrics across all relevant protected attributes.",
  "Establish Article 10(2)(h) data governance and management practices documenting provenance, preparation, and suitability of datasets.",
  "Implement Article 72 post-market monitoring — continuous fairness, accuracy, and drift tracking tied to the model lifecycle, not a one-time audit.",
  "Assemble the Annex IV technical file, including the (2)(g) performance-metrics block with subpopulation breakdowns and confidence intervals.",
  "Design Article 14 human oversight protocols that let clinicians interpret, override, or escalate AI outputs in the context of care.",
  "Build an incident-reporting process aligned with the Article 73 serious-incident notification timelines, even while harmonized standards remain in draft.",
];

export default function EuAiActPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-widest text-teal">
            Regulatory Guide
          </p>
          <h1 className="mt-4 text-h1 font-bold leading-tight lg:text-display">
            EU AI Act — What Healthcare Organizations Need to Know
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            Regulation (EU) 2024/1689 remains the most comprehensive AI law on
            the books. The substantive obligations for healthcare AI — bias
            examination, data governance, transparency, Article 72 post-market
            monitoring — have not changed. What has changed is the enforcement
            clock: the Digital Omnibus package is pushing high-risk deadlines
            out. Use that time to build a defensible evidence package.
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
              Download Compliance Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            Overview of the EU AI Act
          </h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-medium-gray">
              <p>
                Regulation (EU) 2024/1689 — the EU AI Act — entered into force
                on 1 August 2024, establishing harmonized rules for the
                development, deployment, and use of artificial intelligence
                across the European Union. It is the first binding,
                comprehensive AI law anywhere in the world.
              </p>
              <p>
                The Act adopts a risk-based approach: AI systems are classified
                into four tiers (prohibited, high-risk, limited risk, and
                minimal risk), with obligations scaled to the level of
                potential harm. Healthcare AI — clinical decision support,
                diagnostic aids, triage tools, and treatment recommendation
                systems — currently falls into the high-risk category under
                Annex III.
              </p>
              <p>
                As of April 2026 the substantive obligations are unchanged, but
                the timeline is slipping. The Digital Omnibus package moving
                through the EU institutions is widely expected to postpone
                high-risk enforcement and may carve parts of medical AI out of
                the Annex III regime entirely. Harmonized standards from
                CEN-CENELEC remain in draft, and only 8 of the 27 member
                states had designated national competent authorities by the
                Article 70 deadline.
              </p>
              <p>
                Practical takeaway: compliance is not optional, but the binding
                enforcement dates are moving. Build the evidence package now so
                that when the notified-body process crystallizes, your
                conformity assessment runs on documentation that already
                exists.
              </p>
            </div>
            <div className="rounded-2xl border border-light-gray bg-off-white p-8">
              <h3 className="text-h4 font-semibold text-navy">
                Key Facts at a Glance
              </h3>
              <ul className="mt-4 space-y-3 text-body-sm text-medium-gray">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Entered into force: 1 August 2024
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Annex III high-risk deadline: expected to slip to roughly
                  December 2027 under the Digital Omnibus
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Annex I / medical-device AI: expected to align around August
                  2028
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Healthcare AI classification: High-risk under Annex III
                  (carve-out under discussion)
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Maximum penalty for HIGH-RISK violations: EUR 15M or 3% of
                  global turnover (Article 99(4))
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  The EUR 35M / 7% tier (Article 99(3)) applies only to
                  prohibited AI practices
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Applies to: Providers and deployers in the EU, and any
                  system whose output is used in the EU
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Update (April 2026) */}
      <section className="bg-amber/5 px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-body-sm font-semibold uppercase tracking-widest text-amber">
            Timeline Update — April 2026
          </p>
          <h2 className="mt-4 text-h2 font-bold text-navy">
            The Digital Omnibus Is Pushing High-Risk Enforcement Back
          </h2>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-medium-gray">
              <p>
                On 23 March 2026 the European Parliament voted 569-45 in support
                of the Digital Omnibus package, which postpones the enforcement
                dates for several high-risk AI obligations. The final
                trilogue-negotiated dates are still being worked out, but the
                working assumption across the compliance community is:
              </p>
              <ul className="ml-4 list-disc space-y-2">
                <li>
                  Annex III high-risk obligations (including most clinical
                  decision support) slip from August 2026 to roughly
                  <strong> December 2027</strong>.
                </li>
                <li>
                  Annex I / MDR-pathway medical-device AI aligns around
                  <strong> August 2028</strong> to match notified-body
                  conformity timelines.
                </li>
                <li>
                  Some Omnibus drafts propose carving medical AI out of the
                  Annex III high-risk regime entirely, on the theory that MDR
                  and IVDR already cover the clinical safety case. This is
                  live; do not plan around it yet.
                </li>
              </ul>
              <p>
                Harmonized standards from CEN-CENELEC — the technical
                foundation for conformity assessment — were originally targeted
                for fall 2025 and have not landed. Only 8 of 27 member states
                had designated the Article 70 national competent authority by
                the statutory deadline.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-amber bg-white p-8">
              <h3 className="text-h4 font-semibold text-navy">
                What This Means for Your Program
              </h3>
              <p className="mt-4 text-body-sm text-medium-gray">
                Pivot from &ldquo;the compliance clock is ticking&rdquo; to
                <strong> prepare your evidence package for when the deadlines
                land</strong>. Specifically:
              </p>
              <ul className="mt-4 space-y-3 text-body-sm text-medium-gray">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Build the Article 10 bias examination and Annex IV(2)(g)
                  performance documentation now, while harmonized standards are
                  still in draft — your work will map cleanly regardless of the
                  final revision.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Track the medical-device carve-out proposal. If your product
                  is on the MDR pathway, your compliance story may consolidate
                  under MDR/IVDR rather than bifurcate across two regimes.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Engage notified bodies early. The bottleneck in 2027-2028
                  will be notified-body capacity, not regulatory text.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal" />
                  Stand up Article 72 post-market monitoring before
                  deployment. Retrofitting it later is harder than building it
                  in from day one.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">Compliance Timeline</h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            The phased implementation approach still applies — but the
            enforcement dates after August 2025 are moving under the Digital
            Omnibus. Use this as a planning roadmap, not a countdown.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {timelineItems.map((item) => (
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

      {/* Healthcare Impact */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            Impact on Healthcare AI
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            Clinical decision support, diagnostic algorithms, triage tools, and
            treatment recommendation engines are currently classified as
            high-risk AI under Annex III of the EU AI Act. This means
            healthcare organizations must comply with the most stringent tier
            of requirements — pending the outcome of the Digital Omnibus
            medical-device carve-out discussion.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Clinical Decision Support",
                description:
                  "Any AI system that assists clinicians in diagnosis, treatment selection, or risk stratification is currently classified as high-risk. This includes sepsis prediction, readmission risk, and clinical pathway recommendation systems.",
              },
              {
                title: "Bias Examination (Art. 10(2)(f))",
                description:
                  "High-risk AI systems must be examined for biases across protected attributes including race, ethnicity, sex, age, disability, and socioeconomic status. Examination must be ongoing, not a one-time pre-deployment step.",
              },
              {
                title: "Data Governance (Art. 10(2)(h))",
                description:
                  "Training datasets must be documented for provenance, representativeness, and known gaps. Organizations must demonstrate that data reflects the patient populations the system will serve.",
              },
              {
                title: "Technical Documentation (Annex IV)",
                description:
                  "Detailed documentation covering system design, training methodology, validation results, subpopulation performance metrics (Annex IV(2)(g)), known limitations, and intended use must be maintained and made available to regulators.",
              },
              {
                title: "Post-Market Monitoring (Art. 72)",
                description:
                  "Providers must establish a post-market monitoring system that proportionately and systematically collects, documents, and analyses performance data across the full lifecycle — including fairness drift and emergent disparities.",
              },
              {
                title: "Human Oversight (Art. 14)",
                description:
                  "Clinical AI systems must include mechanisms for effective human oversight — clinicians must be able to understand, interpret, and override AI outputs in patient care decisions.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-light-gray p-6"
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

      {/* ParityScope Mapping */}
      <section className="bg-navy px-4 py-section text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold">
            How ParityScope Maps to the EU AI Act
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-light-gray">
            ParityScope is designed against the article-level text of
            Regulation 2024/1689. Each ParityScope output cites the specific
            sub-article it satisfies, so the technical file reads like
            regulatory prose, not a dashboard screenshot.
          </p>
          <div className="mt-12 space-y-6">
            {articleMappings.map((item) => (
              <div
                key={item.article}
                className="rounded-2xl border border-white/10 bg-navy-light p-8"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
                  <div className="lg:w-1/2">
                    <p className="text-body-sm font-bold uppercase tracking-wider text-teal">
                      {item.article}
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

      {/* Penalties */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">Penalty Structure</h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            Article 99 sets tiered administrative fines. It matters which tier
            applies — the headline EUR 35M / 7% number circulates widely but is
            reserved for prohibited AI practices, not the high-risk obligations
            that govern healthcare AI.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-amber bg-amber/5 p-8">
              <p className="text-body-sm font-bold uppercase tracking-wider text-amber">
                Most relevant to healthcare
              </p>
              <p className="mt-2 text-h2 font-bold text-amber">
                EUR 15M <span className="text-h4 text-medium-gray">or</span> 3%
              </p>
              <p className="mt-1 text-body-sm font-semibold text-amber">
                of global annual turnover (whichever is higher) — Article 99(4)
              </p>
              <p className="mt-4 text-body-sm text-medium-gray">
                For non-compliance with the high-risk AI requirements that
                govern clinical decision support and diagnostic AI: failure to
                conduct Article 10 bias examination, missing Annex IV technical
                documentation, absent Article 14 human oversight, or gaps in
                Article 72 post-market monitoring. This is the tier healthcare
                providers and deployers should plan against.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-coral bg-coral/5 p-8">
              <p className="text-body-sm font-bold uppercase tracking-wider text-coral">
                Prohibited AI only
              </p>
              <p className="mt-2 text-h2 font-bold text-coral">
                EUR 35M <span className="text-h4 text-medium-gray">or</span> 7%
              </p>
              <p className="mt-1 text-body-sm font-semibold text-coral">
                of global annual turnover (whichever is higher) — Article 99(3)
              </p>
              <p className="mt-4 text-body-sm text-medium-gray">
                Reserved for violations involving the Article 5 prohibited AI
                practices: social scoring, subliminal manipulation, untargeted
                scraping for biometric databases, and exploitation of
                vulnerabilities. It is inaccurate — and something a general
                counsel will catch — to tell a healthcare organization that
                its clinical AI faces the EUR 35M / 7% tier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation Checklist */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-h2 font-bold text-navy">
            Preparation Checklist
          </h2>
          <p className="mt-4 max-w-3xl text-body-lg text-medium-gray">
            Work the list below now, while timelines are slipping. When the
            notified-body process opens for healthcare AI, you want conformity
            assessment to run on an evidence package that already exists.
          </p>
          <div className="mt-12 space-y-4">
            {checklist.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl border border-light-gray bg-white p-6 shadow-card"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal text-body-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-body-sm text-medium-gray">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-section text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold">Build the Evidence Package Now</h2>
          <p className="mt-4 text-body-lg text-light-gray">
            The Digital Omnibus bought healthcare AI providers more time. Use
            it to make your Article 10, Annex IV, and Article 72 documentation
            notified-body ready — before the queue forms.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/resources/whitepapers"
              className="rounded-full bg-teal px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Download Compliance Guide
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Book a Compliance Assessment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
