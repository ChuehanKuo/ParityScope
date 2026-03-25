import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Glossary — AI Fairness & Compliance Terminology",
  description:
    "Comprehensive glossary of AI fairness, bias, healthcare compliance, and regulatory terminology.",
};

const glossaryTerms = [
  {
    term: "AI Literacy",
    definition:
      "A requirement under the EU AI Act obliging providers and deployers of AI systems to ensure that their staff and other involved persons have a sufficient level of AI literacy, considering their technical knowledge, experience, education, and context of use.",
  },
  {
    term: "Algorithmic Fairness",
    definition:
      "The study and practice of ensuring that automated decision-making systems do not produce systematically biased outcomes across different demographic groups.",
  },
  {
    term: "Allocation Harm",
    definition:
      "A type of AI harm that occurs when a system unfairly distributes opportunities, resources, or information — for example, when a clinical AI systematically denies care recommendations to certain patient populations.",
  },
  {
    term: "Annex III",
    definition:
      "The section of the EU AI Act that lists high-risk AI system categories subject to mandatory compliance requirements, including AI used in healthcare, employment, education, and law enforcement.",
  },
  {
    term: "Calibration",
    definition:
      "In the context of fairness, calibration requires that among all individuals assigned a predicted probability of p for a given outcome, the actual fraction experiencing that outcome is also p, and this property holds equally across protected groups.",
  },
  {
    term: "Clinical Decision Support (CDS)",
    definition:
      "Health information technology that provides clinicians, patients, or other individuals with knowledge and person-specific information to enhance health and healthcare decisions. CDS systems using AI must be carefully evaluated for bias across patient demographics.",
  },
  {
    term: "Conformity Assessment",
    definition:
      "A formal process required by the EU AI Act to evaluate whether a high-risk AI system meets regulatory requirements before it can be placed on the market, including testing for bias, robustness, and transparency.",
  },
  {
    term: "Counterfactual Fairness",
    definition:
      "A fairness criterion stipulating that a model's prediction for an individual should remain the same in a counterfactual world where the individual's protected attribute (e.g., race or gender) had been different, all else being equal.",
  },
  {
    term: "Demographic Parity",
    definition:
      "A fairness metric requiring that the positive prediction rate is equal across all protected groups.",
  },
  {
    term: "Disparate Impact",
    definition:
      "When a seemingly neutral policy or algorithm disproportionately affects a protected group, even without intent to discriminate.",
  },
  {
    term: "Equal Opportunity",
    definition:
      "A fairness metric requiring that the true positive rate is equal across all protected groups.",
  },
  {
    term: "Equalized Odds",
    definition:
      "A fairness metric requiring that both the true positive rate and false positive rate are equal across all protected groups.",
  },
  {
    term: "EU AI Act",
    definition:
      "The European Union's comprehensive regulatory framework for artificial intelligence, classifying healthcare AI as high-risk and requiring bias testing, documentation, and human oversight.",
  },
  {
    term: "Fairness Drift",
    definition:
      "The phenomenon where an AI model's fairness metrics degrade over time as the underlying data distribution shifts.",
  },
  {
    term: "High-Risk AI System",
    definition:
      "An AI system classified under the EU AI Act (primarily via Annex III) as posing significant risks to health, safety, or fundamental rights. High-risk systems — including healthcare AI — must comply with strict requirements for data quality, transparency, human oversight, and bias testing.",
  },
  {
    term: "Human Oversight",
    definition:
      "An AI governance principle requiring that high-risk AI systems are designed to be effectively overseen by natural persons during their period of use, including the ability to understand, monitor, and override the AI system's decisions.",
  },
  {
    term: "Individual Fairness",
    definition:
      "A fairness principle requiring that similar individuals receive similar predictions or outcomes from an AI model, regardless of group membership. Often formalized as a Lipschitz condition on the model's output with respect to a task-specific similarity metric.",
  },
  {
    term: "Label Bias",
    definition:
      "A form of bias that arises when the outcome labels used to train a model are themselves systematically skewed — for example, using healthcare cost as a proxy for healthcare need, which can embed historical disparities into predictions.",
  },
  {
    term: "Measurement Bias",
    definition:
      "Bias introduced when the features or outcome variables in a dataset are measured differently or with different accuracy across demographic groups, leading to systematically skewed model predictions.",
  },
  {
    term: "Post-Market Surveillance",
    definition:
      "Ongoing monitoring of an AI system after deployment, as mandated by the EU AI Act for high-risk systems. Includes continuous evaluation of performance, fairness metrics, and incident reporting to detect and address issues in real-world use.",
  },
  {
    term: "Predictive Parity",
    definition:
      "A fairness metric requiring that the positive predictive value (precision) is equal across all protected groups — meaning that among those predicted positive, the same proportion actually experiences the outcome regardless of group membership.",
  },
  {
    term: "Protected Attribute",
    definition:
      "A characteristic (e.g., race, gender, age) that is legally protected from discrimination and must be evaluated in AI fairness assessments.",
  },
  {
    term: "Proxy Variable",
    definition:
      "A feature in a dataset that is correlated with a protected attribute (e.g., zip code as a proxy for race) and can introduce indirect discrimination into AI models even when the protected attribute itself is excluded.",
  },
  {
    term: "Quality Management System (QMS)",
    definition:
      "A structured organizational framework required for providers of high-risk AI systems under the EU AI Act, encompassing policies, procedures, and documentation to ensure continuous compliance with regulatory requirements throughout the AI system lifecycle.",
  },
  {
    term: "Representation Bias",
    definition:
      "Bias that occurs when the training dataset does not adequately represent certain populations, leading to poorer model performance for underrepresented groups — a particular concern in healthcare AI where minority patient data is often scarce.",
  },
  {
    term: "Responsible AI",
    definition:
      "An umbrella framework for designing, developing, and deploying AI systems in an ethical, transparent, and accountable manner, encompassing fairness, explainability, privacy, safety, and human oversight.",
  },
  {
    term: "Selection Bias",
    definition:
      "Bias introduced when the process of selecting data for training is not random or representative, causing the model to learn patterns that do not generalize fairly — for example, training on data only from patients who had access to a particular healthcare system.",
  },
  {
    term: "Statistical Parity",
    definition:
      "A fairness criterion (closely related to demographic parity) requiring that the probability of receiving a positive outcome is independent of group membership, ensuring equal selection rates across protected groups.",
  },
  {
    term: "Subgroup Analysis",
    definition:
      "The practice of evaluating AI model performance and fairness metrics separately for specific demographic subgroups (e.g., by race, gender, age, or their intersections) to identify disparities that may be hidden in aggregate statistics.",
  },
  {
    term: "Transparency Obligation",
    definition:
      "A requirement under the EU AI Act and other regulatory frameworks mandating that AI system providers disclose information about how their systems work, their capabilities and limitations, and their potential risks — enabling users and affected individuals to make informed decisions.",
  },
  {
    term: "Treatment Equality",
    definition:
      "A fairness metric that compares the ratio of false negatives to false positives across protected groups, ensuring that the types of errors a model makes are distributed equitably rather than disproportionately burdening one group.",
  },
];

// Derive unique first letters
const letters = Array.from(
  new Set(glossaryTerms.map((t) => t.term[0].toUpperCase()))
).sort();

// Group terms by letter
const groupedTerms = letters.map((letter) => ({
  letter,
  terms: glossaryTerms.filter(
    (t) => t.term[0].toUpperCase() === letter
  ),
}));

export default function GlossaryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="text-h1 font-bold leading-tight tracking-tight lg:text-display">
            Glossary
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-body-lg text-light-gray">
            Key terms and definitions in AI fairness, bias auditing, and
            healthcare compliance.
          </p>
        </div>
      </section>

      {/* Alphabet navigation bar */}
      <nav className="sticky top-0 z-10 border-b border-light-gray bg-white/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-1 sm:gap-2">
          {letters.map((letter) => (
            <Link
              key={letter}
              href={`#letter-${letter}`}
              className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold text-navy transition-colors hover:bg-teal hover:text-white"
            >
              {letter}
            </Link>
          ))}
        </div>
      </nav>

      {/* Glossary terms */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {groupedTerms.map(({ letter, terms }) => (
            <div key={letter} id={`letter-${letter}`} className="mb-12 scroll-mt-20">
              <h2 className="mb-6 border-b-2 border-teal pb-2 text-h2 font-bold text-navy">
                {letter}
              </h2>
              <dl className="divide-y divide-light-gray">
                {terms.map((item) => (
                  <div key={item.term} className="py-6">
                    <dt className="text-h4 font-semibold text-navy">
                      {item.term}
                    </dt>
                    <dd className="mt-2 text-medium-gray">
                      {item.definition}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          {/* Term count footer */}
          <p className="mt-8 border-t border-light-gray pt-6 text-center text-body-sm text-medium-gray">
            {glossaryTerms.length} terms defined. Missing a term?{" "}
            <Link
              href="/contact"
              className="font-medium text-teal transition-colors hover:text-navy"
            >
              Let us know
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
