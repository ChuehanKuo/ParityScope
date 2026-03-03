import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { Accordion } from "@/components/ui/accordion";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "Glossary — AI Fairness & Healthcare Compliance Terminology",
  description:
    "Comprehensive glossary of AI fairness, bias, healthcare compliance, and regulatory terminology. Definitions for demographic parity, equalized odds, disparate impact, fairness drift, and more.",
};

const glossaryTerms = [
  {
    term: "Algorithmic Fairness",
    definition:
      "The study and practice of ensuring that automated decision-making systems do not produce systematically biased outcomes across different demographic groups. In healthcare, algorithmic fairness requires that clinical AI models perform equitably across race, gender, age, and socioeconomic status, so that no patient population receives systematically inferior predictions or recommendations.",
  },
  {
    term: "Calibration",
    definition:
      "A fairness metric that evaluates whether predicted probabilities match observed outcomes equally across demographic groups. A well-calibrated model assigns a 70% risk score to patients who actually have a 70% chance of the outcome, regardless of their demographic group. Poor calibration across groups means the model's confidence scores are systematically misleading for certain populations.",
  },
  {
    term: "Conditional Demographic Parity",
    definition:
      "A refinement of demographic parity that requires equal positive prediction rates across groups after controlling for legitimate risk factors. This metric acknowledges that outcome rates may genuinely differ across populations due to clinical factors, and measures whether the model's predictions remain fair after accounting for those differences.",
  },
  {
    term: "Counterfactual Fairness",
    definition:
      "A causal-inference-based fairness criterion that asks whether a model's prediction for an individual would remain the same if their protected attribute (such as race or gender) were different, while all other causally relevant factors remained the same. This metric requires a causal model of the data-generating process and addresses individual-level rather than group-level fairness.",
  },
  {
    term: "Demographic Parity",
    definition:
      "A group fairness metric requiring that the positive prediction rate is equal across all protected groups. For example, if a clinical risk model flags 20% of white patients as high-risk, demographic parity requires it to also flag approximately 20% of Black, Hispanic, and other racial groups. Also known as statistical parity or independence.",
  },
  {
    term: "Disparate Impact",
    definition:
      "A legal and statistical concept describing when a seemingly neutral policy, practice, or algorithm disproportionately affects a protected group, even without intent to discriminate. The four-fifths rule is a common threshold: if a selection rate for a protected group is less than 80% of the rate for the most favored group, disparate impact may be present. In healthcare AI, disparate impact can manifest as lower sensitivity, higher false negative rates, or reduced resource allocation for disadvantaged populations.",
  },
  {
    term: "Equal Opportunity",
    definition:
      "A fairness metric requiring that the true positive rate (sensitivity or recall) is equal across all protected groups. In clinical terms, this means the model should be equally good at correctly identifying patients who truly have a condition, regardless of their demographic group. A model that detects cancer in 90% of white patients but only 70% of Black patients violates equal opportunity.",
  },
  {
    term: "Equalized Odds",
    definition:
      "A stricter fairness metric requiring that both the true positive rate and the false positive rate are equal across all protected groups. This means the model should have the same sensitivity and specificity for every demographic group. Equalized odds is more demanding than equal opportunity because it constrains both types of error, ensuring that no group bears a disproportionate burden of either missed diagnoses or false alarms.",
  },
  {
    term: "Fairness Drift",
    definition:
      "The phenomenon where an AI model's fairness metrics degrade over time as the underlying data distribution shifts. Even a model that passes fairness audits at deployment can develop demographic disparities as patient populations change, clinical practices evolve, or data pipelines are modified. Continuous monitoring is essential to detect fairness drift before it causes harm. Causes include seasonal variations in patient demographics, changes in coding practices, and socioeconomic shifts in the served population.",
  },
  {
    term: "Fairness-Accuracy Trade-off",
    definition:
      "The observation that optimizing a model for certain fairness metrics may reduce its overall predictive accuracy, and vice versa. This trade-off is not always present and depends on the specific metrics, the data, and the model architecture. In clinical settings, navigating this trade-off requires input from clinicians, ethicists, and affected communities to determine acceptable thresholds. ParityScope helps quantify these trade-offs so organizations can make informed decisions.",
  },
  {
    term: "Group Fairness",
    definition:
      "A category of fairness criteria that evaluate whether a model's behavior is equitable across predefined demographic groups, such as racial, gender, or age groups. Metrics like demographic parity, equalized odds, and calibration are all group fairness measures. Group fairness is contrasted with individual fairness, which requires that similar individuals receive similar predictions regardless of group membership.",
  },
  {
    term: "Intersectional Fairness",
    definition:
      "The evaluation of model fairness across combinations of protected attributes, such as examining outcomes for Black women or elderly Hispanic patients, rather than evaluating race and gender independently. Single-attribute fairness analysis can mask disparities that emerge only at the intersection of multiple identities. Intersectional analysis is critical because patients exist at the intersection of multiple demographic categories, and bias often compounds across these dimensions.",
  },
  {
    term: "Model Card",
    definition:
      "A standardized documentation framework for machine learning models that includes information about the model's intended use, performance metrics, fairness evaluations, training data characteristics, and known limitations. Model cards are increasingly required by regulators and are a key component of responsible AI deployment. The EU AI Act mandates comparable documentation for high-risk AI systems, including healthcare applications.",
  },
  {
    term: "Positive Predictive Value Parity",
    definition:
      "A fairness metric requiring that the precision (positive predictive value) is equal across all protected groups. This means that when the model predicts a positive outcome for a patient, the probability that the prediction is correct should be the same regardless of the patient's demographic group. In clinical terms, a positive screening result should carry the same diagnostic weight for all populations.",
  },
  {
    term: "Predictive Parity",
    definition:
      "A fairness metric requiring that the positive predictive value and negative predictive value are equal across all protected groups. This ensures that the model's predictions are equally reliable for every demographic group. A model with predictive parity gives clinicians the same level of confidence in its outputs regardless of the patient's background.",
  },
  {
    term: "Protected Attribute",
    definition:
      "A characteristic of an individual that is legally protected from discrimination and must be evaluated in AI fairness assessments. Common protected attributes include race, ethnicity, gender, age, disability status, religion, and socioeconomic status. In healthcare AI, protected attributes are the dimensions along which fairness must be measured and ensured. The specific attributes and their legal protections vary by jurisdiction.",
  },
  {
    term: "Proxy Variable",
    definition:
      "A feature in a dataset that is correlated with a protected attribute and can serve as an indirect proxy for it, even when the protected attribute itself is not included in the model. ZIP code can serve as a proxy for race, insurance type can proxy for socioeconomic status, and language preference can proxy for ethnicity. Removing protected attributes from a model does not guarantee fairness if proxy variables remain.",
  },
  {
    term: "Subgroup Analysis",
    definition:
      "The evaluation of model performance and fairness metrics separately for each demographic subgroup within the data. Standard aggregate metrics can mask significant disparities across populations. A model with 85% overall accuracy might achieve 95% accuracy for one group and 65% for another. Subgroup analysis is essential for identifying these hidden inequities and is a core requirement of regulatory frameworks like the EU AI Act.",
  },
];

const faqItems = [
  {
    question: "Can a model satisfy all fairness metrics simultaneously?",
    answer:
      "In most real-world scenarios, no. The impossibility theorem in algorithmic fairness demonstrates that certain fairness metrics are mathematically incompatible when base rates differ across groups. For example, a model generally cannot achieve equalized odds and predictive parity at the same time if the prevalence of a condition differs by demographic group. This is why metric selection must be guided by the specific clinical context and ethical priorities of each use case.",
  },
  {
    question: "Which fairness metrics are required by the EU AI Act?",
    answer:
      "The EU AI Act does not mandate specific fairness metrics. Instead, it requires that high-risk AI systems, including healthcare AI, undergo bias testing and that providers demonstrate that their systems do not produce discriminatory outcomes. The choice of metrics depends on the specific application, but organizations should evaluate multiple metrics across all relevant protected attributes and document their methodology and findings.",
  },
  {
    question: "How does ParityScope handle fairness across intersectional groups?",
    answer:
      "ParityScope evaluates fairness not only across individual protected attributes but also across their intersections. This means we analyze model performance for subgroups defined by combinations of race, gender, age, and other attributes. Intersectional analysis is critical because disparities often compound at the intersection of multiple identities in ways that single-attribute analysis cannot detect.",
  },
];

export default function GlossaryPage() {
  return (
    <>
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            label="Glossary"
            title="AI Fairness & Healthcare Compliance Terminology"
            description="A comprehensive reference for the key terms, metrics, and concepts in algorithmic fairness, bias auditing, and healthcare AI regulation."
            align="left"
          />
        </div>
      </section>

      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <dl className="space-y-0 divide-y divide-light-gray rounded-xl border border-light-gray bg-white">
            {glossaryTerms.map((item) => (
              <div key={item.term} className="px-8 py-6">
                <dt className="text-h4 font-semibold text-navy">{item.term}</dt>
                <dd className="mt-2 text-medium-gray">{item.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            label="FAQ"
            title="Frequently Asked Questions"
            description="Common questions about fairness metrics, regulatory requirements, and practical implementation."
            align="left"
          />
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <SectionHeader
            label="Related Resources"
            title="Deepen Your Understanding"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { title: "Fairness Metrics Guide", href: "/resources/whitepapers", description: "In-depth guide covering 15+ metrics with clinical examples." },
              { title: "Case Studies", href: "/resources/case-studies", description: "See fairness audits applied to real clinical AI models." },
              { title: "Blog", href: "/resources/blog", description: "Latest insights on AI fairness and healthcare regulation." },
            ].map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group rounded-xl border border-light-gray bg-white p-6 transition-shadow hover:shadow-card"
              >
                <h3 className="text-h4 font-semibold text-navy group-hover:text-teal">
                  {link.title}
                </h3>
                <p className="mt-2 text-body-sm text-medium-gray">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Put These Concepts Into Practice"
        description="ParityScope evaluates your clinical AI across all of these fairness metrics automatically. See how it works."
        primaryCTA={{ label: "Request a Demo", href: "/contact" }}
        secondaryCTA={{ label: "View Product", href: "/product" }}
      />
    </>
  );
}
