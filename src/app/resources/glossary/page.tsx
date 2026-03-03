import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "Glossary — AI Fairness & Healthcare Compliance Terminology",
  description:
    "Comprehensive glossary of AI fairness, algorithmic bias, healthcare compliance, and regulatory terminology. Definitions for demographic parity, disparate impact, EU AI Act, Section 1557, and more.",
};

const glossaryTerms = [
  {
    term: "Algorithmic Fairness",
    letter: "A",
    definition:
      "The study and practice of ensuring that automated decision-making systems do not produce systematically biased outcomes across different demographic groups. In healthcare, algorithmic fairness is concerned with whether clinical AI systems provide equitable predictions, recommendations, and decisions regardless of a patient's race, gender, age, socioeconomic status, or other protected attributes. Algorithmic fairness is not a single property but a family of related mathematical criteria, each encoding a different normative concept of what it means for an algorithm to be 'fair.'",
  },
  {
    term: "Bias",
    letter: "B",
    definition:
      "In the context of AI and machine learning, bias refers to systematic errors in a model's predictions that disproportionately affect certain groups. Bias can enter a model through multiple pathways: historical bias in training data that reflects past discrimination, representation bias from datasets that underrepresent certain populations, measurement bias from features that are collected or recorded differently across groups, and aggregation bias from models that assume a one-size-fits-all relationship across heterogeneous populations. In clinical AI, bias is a patient safety concern because it can lead to missed diagnoses, delayed treatment, or inequitable resource allocation.",
  },
  {
    term: "Calibration",
    letter: "C",
    definition:
      "A property of a predictive model where the predicted probabilities accurately reflect the true likelihood of the outcome. A well-calibrated sepsis prediction model that assigns a 30% risk score to a group of patients should see approximately 30% of those patients actually develop sepsis. Calibration fairness requires that this accuracy holds across all demographic subgroups — meaning a 30% risk score carries the same clinical meaning for Black patients as it does for White patients, for men as it does for women. Poor calibration across groups means the same score implies different levels of risk for different patients.",
  },
  {
    term: "Clinical Decision Support",
    letter: "C",
    definition:
      "Health information technology systems designed to assist clinicians in making diagnostic, therapeutic, and care management decisions. CDS systems include risk scoring models, diagnostic algorithms, treatment recommendation engines, drug interaction checkers, and population health stratification tools. When powered by AI or machine learning, CDS systems are subject to algorithmic bias and are increasingly subject to regulatory oversight under the EU AI Act, FDA guidance, and Section 1557 of the Affordable Care Act.",
  },
  {
    term: "Demographic Parity",
    letter: "D",
    definition:
      "A group fairness metric that requires the positive prediction rate (the proportion of individuals who receive a positive outcome from the model) to be equal across all protected groups. For example, demographic parity for a care management enrollment model would require that the same proportion of Black, White, Hispanic, and Asian patients are flagged as high-risk. While intuitive, demographic parity has important limitations in clinical AI: if disease prevalence genuinely differs across populations, enforcing equal prediction rates can lead to under-treatment of higher-risk groups or over-treatment of lower-risk groups.",
  },
  {
    term: "Disparate Impact",
    letter: "D",
    definition:
      "A legal and statistical concept describing when a facially neutral policy, practice, or algorithm disproportionately affects a protected group, even without discriminatory intent. Originally developed in employment discrimination law (Griggs v. Duke Power Co., 1971), disparate impact analysis has been applied to healthcare algorithms under Section 1557 of the Affordable Care Act and civil rights law. The four-fifths rule, commonly used in employment, states that disparate impact exists when the selection rate for a protected group is less than 80% of the rate for the most-favored group. ParityScope evaluates disparate impact ratios across all protected attributes.",
  },
  {
    term: "Equal Opportunity",
    letter: "E",
    definition:
      "A fairness metric requiring that the true positive rate (sensitivity or recall) is equal across all protected groups. In clinical AI, equal opportunity means that among patients who truly have a condition (e.g., sepsis, cancer, high cardiovascular risk), the model is equally likely to correctly identify them regardless of their demographic group. This metric is particularly important for diagnostic and screening models where a false negative — failing to identify a patient who needs intervention — has severe clinical consequences.",
  },
  {
    term: "Equalized Odds",
    letter: "E",
    definition:
      "A fairness metric that is stricter than equal opportunity, requiring that both the true positive rate and the false positive rate are equal across all protected groups. Equalized odds ensures that the model is equally accurate for all groups in both directions: it is equally likely to correctly identify patients who need intervention (true positives) and equally likely to correctly rule out patients who do not (true negatives). This metric is often considered more appropriate for clinical AI than demographic parity because it accounts for potentially different base rates across populations.",
  },
  {
    term: "EU AI Act",
    letter: "E",
    definition:
      "The European Union's comprehensive regulatory framework for artificial intelligence, adopted in 2024. The EU AI Act classifies AI systems by risk level, with healthcare AI systems designated as high-risk in Annex III. High-risk AI systems must meet requirements for risk management, data governance, transparency, human oversight, accuracy, robustness, and cybersecurity. Critically, Article 10 requires providers to examine training data for biases and to take appropriate measures to detect, prevent, and mitigate potential discrimination. Non-compliance can result in fines up to EUR 35 million or 7% of global annual turnover.",
  },
  {
    term: "Fairness Metric",
    letter: "F",
    definition:
      "A quantitative measure used to evaluate whether an AI system's outcomes satisfy a specific definition of fairness. There are many fairness metrics, each encoding different normative assumptions about what constitutes equitable treatment. Common metrics include demographic parity, equalized odds, equal opportunity, predictive parity, calibration, and individual fairness measures. An important result in fairness research (the impossibility theorem) demonstrates that most fairness metrics cannot be simultaneously satisfied except in trivial cases, making the choice of which metrics to optimize a value judgment that should be informed by clinical context, regulatory requirements, and stakeholder input.",
  },
  {
    term: "High-Risk AI",
    letter: "H",
    definition:
      "Under the EU AI Act, AI systems that pose significant risks to health, safety, or fundamental rights. Healthcare AI is classified as high-risk in Annex III, Section 5, which covers AI systems intended to be used as medical devices or in vitro diagnostic medical devices. High-risk AI systems are subject to the most stringent requirements of the regulation, including mandatory conformity assessment, registration in the EU database, post-market monitoring, and incident reporting. Health systems, MedTech companies, and EHR vendors deploying clinical AI in the EU must ensure their systems comply with all high-risk requirements.",
  },
  {
    term: "Intersectional Analysis",
    letter: "I",
    definition:
      "A fairness evaluation approach that examines model performance across combinations of protected attributes rather than evaluating each attribute independently. Intersectional analysis recognizes that patients exist at the intersection of multiple identities (e.g., race and gender, age and disability status) and that a model can appear fair along each individual dimension while producing significant disparities for specific subgroups. For example, a model might show equitable performance for Black patients overall and for women overall, but perform poorly for Black women specifically. Intersectional analysis is critical in clinical AI because health disparities are often concentrated at these intersections.",
  },
  {
    term: "Model Drift",
    letter: "M",
    definition:
      "The phenomenon where a deployed model's performance degrades over time as the real-world data it encounters diverges from the data it was trained on. In the context of fairness, model drift can cause a model that was initially fair to develop biased outcomes as patient populations change, clinical practices evolve, or data collection processes shift. Fairness drift is particularly insidious because it can occur even when overall model accuracy remains stable — the model may maintain aggregate performance while developing disparities within specific subgroups. Continuous fairness monitoring is essential to detect fairness drift before it impacts patient outcomes.",
  },
  {
    term: "Protected Attribute",
    letter: "P",
    definition:
      "A characteristic of an individual that is legally protected from discrimination. In healthcare AI, key protected attributes include race, ethnicity, sex, gender identity, age, disability status, national origin, primary language, religion, and socioeconomic status. Different regulatory frameworks protect different attributes: the EU AI Act focuses on attributes protected under EU non-discrimination law, while Section 1557 of the ACA protects race, color, national origin, sex, age, and disability. Fairness auditing evaluates model performance across all relevant protected attributes to identify potential discrimination.",
  },
  {
    term: "Section 1557",
    letter: "S",
    definition:
      "Section 1557 of the Affordable Care Act is the primary federal civil rights provision prohibiting discrimination in healthcare programs and activities receiving federal financial assistance. It prohibits discrimination on the basis of race, color, national origin, sex (including sexual orientation and gender identity), age, and disability. Recent regulatory guidance has clarified that Section 1557 applies to clinical algorithms and AI-driven decision-making tools used by covered entities. Healthcare organizations that use biased algorithms to make coverage, treatment, or resource allocation decisions may face enforcement action under Section 1557, making fairness auditing a legal compliance requirement, not just an ethical best practice.",
  },
  {
    term: "Threshold",
    letter: "T",
    definition:
      "In classification models, the decision boundary that converts a continuous risk score into a binary prediction (e.g., high-risk vs. low-risk, positive vs. negative). Threshold selection has significant fairness implications: a single threshold applied uniformly across all demographic groups can produce disparate outcomes if the model's score distributions differ across groups. Threshold optimization strategies include group-specific thresholds (calibrating the decision boundary to equalize outcomes or error rates across groups), but these approaches introduce their own ethical and clinical trade-offs. ParityScope evaluates fairness across the full threshold range and helps teams select thresholds that balance clinical performance with equity goals.",
  },
];

const letters = [...new Set(glossaryTerms.map((t) => t.letter))].sort();

export default function GlossaryPage() {
  return (
    <>
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            label="Glossary"
            title="AI Fairness and Healthcare Compliance Terminology"
            description="A comprehensive reference of key terms in algorithmic fairness, bias auditing, healthcare regulation, and compliance. Designed for clinical informaticists, data scientists, compliance officers, and healthcare leaders."
            align="left"
          />

          {/* Alphabet Navigation */}
          <nav className="mt-10 flex flex-wrap gap-2" aria-label="Glossary navigation">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-light-gray text-sm font-semibold text-navy transition-colors hover:bg-teal hover:text-white"
              >
                {letter}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {letters.map((letter) => {
            const termsForLetter = glossaryTerms.filter(
              (t) => t.letter === letter
            );
            return (
              <div key={letter} id={`letter-${letter}`} className="mb-12 last:mb-0">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-navy">
                  <span className="text-h4 font-bold text-white">{letter}</span>
                </div>
                <dl className="space-y-6">
                  {termsForLetter.map((item) => (
                    <div
                      key={item.term}
                      className="rounded-xl border border-light-gray bg-white p-6 shadow-card"
                    >
                      <dt className="text-h4 font-semibold text-navy">
                        {item.term}
                      </dt>
                      <dd className="mt-3 text-medium-gray leading-relaxed">
                        {item.definition}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Resources */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Go Deeper"
            title="Related Resources"
            description="Explore our whitepapers, blog, and case studies for in-depth coverage of these topics in practice."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Fairness Metrics Whitepaper",
                href: "/resources/whitepapers",
                description:
                  "A 64-page guide covering every major fairness metric with mathematical definitions, clinical examples, and selection guidance.",
              },
              {
                title: "Blog: Intersectional Fairness",
                href: "/resources/blog",
                description:
                  "Why single-attribute analysis misses critical disparities and how intersectional evaluation works in practice.",
              },
              {
                title: "Case Studies",
                href: "/resources/case-studies",
                description:
                  "See how healthcare organizations apply these concepts to real clinical AI systems with measurable outcomes.",
              },
            ].map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group rounded-xl border border-light-gray p-8 transition-shadow hover:shadow-card-hover"
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
        title="Put These Concepts into Practice"
        description="ParityScope makes it easy to apply fairness metrics, regulatory compliance checks, and continuous monitoring to your clinical AI systems. See the platform in action."
        primaryCTA={{ label: "Request a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Explore the Product", href: "/product" }}
      />
    </>
  );
}
