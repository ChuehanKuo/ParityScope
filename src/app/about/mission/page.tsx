import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";

export const metadata: Metadata = {
  title: "Our Mission — Equitable Healthcare AI for Every Patient",
  description:
    "ParityScope exists to ensure healthcare AI works equitably for every patient. Learn about documented disparities in clinical AI, why existing tools fall short, and our approach to solving the problem.",
};

const disparities = [
  {
    title: "The Obermeyer 2019 Study",
    description:
      "A landmark Science paper revealed that a commercial algorithm used by major health systems to allocate care management resources systematically discriminated against Black patients. At a given risk score, Black patients were considerably sicker than White patients — because the algorithm used healthcare spending as a proxy for health needs, embedding historical inequities in access to care directly into its predictions. The study estimated that fixing this bias would increase the percentage of Black patients receiving additional help from 17.7% to 46.5%.",
  },
  {
    title: "eGFR Race Adjustment",
    description:
      "For decades, the estimated Glomerular Filtration Rate (eGFR) formula included a race-based coefficient that systematically overestimated kidney function in Black patients. This adjustment, embedded in clinical decision support systems and EHR calculators nationwide, delayed referrals to nephrology and reduced eligibility for kidney transplant waitlists. The NKF and ASN formally recommended removing the race coefficient in 2021, but algorithms built on historical data that included the adjustment continue to propagate this bias.",
  },
  {
    title: "Pulse Oximetry Bias",
    description:
      "Multiple studies, including a 2020 analysis in the New England Journal of Medicine, have documented that pulse oximeters overestimate arterial oxygen saturation in patients with darker skin pigmentation. This leads to occult hypoxemia — dangerously low blood oxygen levels that go undetected. During the COVID-19 pandemic, this bias had life-threatening consequences, with patients of color less likely to receive supplemental oxygen and escalated care despite equivalent or worse underlying hypoxemia.",
  },
  {
    title: "Dermatology AI Disparities",
    description:
      "AI systems trained to detect skin conditions using image datasets that are predominantly composed of lighter-skinned patients consistently underperform on patients with darker skin tones. Studies have shown diagnostic accuracy drops significantly for melanoma, eczema, and other conditions in underrepresented skin types. When these models are deployed in clinical screening tools, they create a two-tiered standard of care based on the color of a patient's skin.",
  },
];

const shortfalls = [
  {
    title: "Not Healthcare-Specific",
    description:
      "General-purpose AI fairness toolkits lack the domain knowledge required for clinical AI. They do not understand FHIR data schemas, clinical outcome hierarchies, or the specific protected attributes that matter in healthcare regulation. A tool that treats a loan approval model and a sepsis prediction model identically will miss critical, domain-specific sources of bias.",
  },
  {
    title: "Not Regulation-Aware",
    description:
      "The EU AI Act, FDA algorithmic guidance, Section 1557 anti-discrimination requirements, and CMS quality measures each impose specific obligations on healthcare AI. Existing tools do not map fairness findings to regulatory requirements, generate compliant documentation, or track evolving standards across jurisdictions. Compliance teams are left to bridge this gap manually.",
  },
  {
    title: "Not Privacy-Preserving",
    description:
      "Most fairness auditing tools require centralizing sensitive patient data on external infrastructure. In healthcare, this creates HIPAA liability, patient trust violations, and logistical barriers that prevent adoption. Organizations should not have to choose between fairness and privacy.",
  },
  {
    title: "Audit-Only, Not Continuous",
    description:
      "A one-time fairness audit provides a snapshot but not protection. Clinical AI models drift as patient populations change, new data enters training pipelines, and treatment patterns evolve. Without continuous monitoring, organizations discover fairness regressions only when harm has already occurred.",
  },
];

const approaches = [
  {
    step: "01",
    title: "Healthcare-Specific by Design",
    description:
      "Our metrics engine understands clinical data formats (FHIR, HL7, OMOP CDM), healthcare-specific protected attributes, and the outcome hierarchies that matter in medicine. We evaluate fairness in the context of clinical decisions — referrals, diagnoses, risk scores, treatment recommendations — not generic model predictions.",
  },
  {
    step: "02",
    title: "Regulation-Aware Compliance",
    description:
      "ParityScope maps every fairness finding to the specific regulatory requirements that apply to your organization. Whether you need EU AI Act conformity assessment documentation, FDA pre-market fairness evidence, or Section 1557 non-discrimination analysis, our platform generates compliant reports automatically.",
  },
  {
    step: "03",
    title: "SDK-First, Privacy-Preserving",
    description:
      "Our SDK runs on your infrastructure. Patient data never leaves your environment. You get the full power of our fairness analysis engine without creating new data transfer agreements, BAAs, or security review cycles. Install the SDK, point it at your model, and get results — all within your own security perimeter.",
  },
  {
    step: "04",
    title: "Continuous, Not One-Time",
    description:
      "ParityScope monitors fairness metrics in production, detecting drift and regression before they impact patients. Automated alerts notify your team when metrics cross thresholds. Audit trails are generated continuously, so you always have current evidence of compliance — not a stale report from six months ago.",
  },
];

const impactGoals = [
  {
    metric: "100%",
    title: "High-Risk AI Audited",
    description:
      "Every clinical AI system classified as high-risk under the EU AI Act or FDA oversight should undergo rigorous fairness auditing before deployment.",
  },
  {
    metric: "Zero",
    title: "Preventable Disparities",
    description:
      "No patient should receive inferior AI-driven care because of their race, gender, age, language, or socioeconomic status when tools exist to prevent it.",
  },
  {
    metric: "Real-Time",
    title: "Fairness Monitoring",
    description:
      "Fairness should be monitored as continuously as model accuracy. Organizations should know the moment a model begins producing disparate outcomes.",
  },
  {
    metric: "Open",
    title: "Methodology Standards",
    description:
      "We contribute to open standards for healthcare AI fairness evaluation, publishing our methodologies and advocating for industry-wide adoption of rigorous testing.",
  },
];

export default function MissionPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            label="Our Mission"
            title="Every Patient Deserves Equitable AI"
            align="left"
          />
          <div className="mt-8 space-y-4 text-body-lg text-medium-gray">
            <p>
              Every patient deserves equitable care, regardless of who they are. As AI
              becomes central to clinical decision-making — informing diagnoses, guiding
              treatment selections, allocating scarce resources — ensuring algorithmic
              fairness is not optional. It is a moral imperative and an emerging legal
              requirement.
            </p>
            <p>
              ParityScope exists to bridge the gap between AI innovation and health equity.
              We provide healthcare organizations with the tools, expertise, and compliance
              infrastructure to deploy AI that is fair, transparent, and regulatory-ready.
              Our mission is not to slow down AI adoption in healthcare — it is to ensure
              that adoption does not come at the cost of the patients who need equitable
              care the most.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem: Documented Disparities */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="The Problem"
            title="Documented Disparities in Clinical AI"
            description="These are not theoretical risks. Each of the following examples represents bias in clinical AI systems that has been documented in peer-reviewed research, affecting real patients in real healthcare settings."
            align="left"
          />
          <div className="mt-12 space-y-8">
            {disparities.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <h3 className="text-h4 font-semibold text-navy">{item.title}</h3>
                <p className="mt-3 text-medium-gray leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Existing Tools Fall Short */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="The Gap"
            title="Why Existing Tools Fall Short"
            description="General-purpose AI fairness toolkits like Fairlearn, AI Fairness 360, and What-If Tool have advanced the field significantly. But healthcare is not a general-purpose domain. Clinical AI operates under unique constraints that existing tools were not designed to address."
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {shortfalls.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-light-gray p-8"
              >
                <h3 className="text-h4 font-semibold text-navy">{item.title}</h3>
                <p className="mt-3 text-medium-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Our Approach"
            title="How ParityScope Solves It"
            description="ParityScope provides an end-to-end fairness compliance toolkit designed specifically for the complexity and regulatory demands of healthcare AI."
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {approaches.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <span className="text-body-sm font-bold text-teal">{item.step}</span>
                <h3 className="mt-2 text-h4 font-semibold text-navy">{item.title}</h3>
                <p className="mt-3 text-medium-gray">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Goals */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="Impact Goals"
            title="What We Are Working Toward"
            description="These are the outcomes we measure ourselves against. They guide our product roadmap, our partnerships, and our advocacy."
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {impactGoals.map((goal) => (
              <div key={goal.title} className="text-center">
                <p className="text-h2 font-bold text-teal">{goal.metric}</p>
                <h3 className="mt-2 text-h4 font-semibold text-navy">{goal.title}</h3>
                <p className="mt-2 text-body-sm text-medium-gray">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeader
            label="Our Vision"
            title="A Future Where Healthcare AI Earns Trust"
            description="We envision a world where every clinical AI system is audited for fairness before deployment, monitored continuously in production, and held accountable to the patients it serves. Where regulators, clinicians, and patients can trust that the algorithms shaping care are equitable, transparent, and evidence-based."
          />
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/product"
              className="rounded-full bg-navy px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-navy-light"
            >
              Explore Our Platform
            </Link>
            <Link
              href="/about/team"
              className="rounded-full border border-navy px-8 py-3 text-base font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Join the Movement for Fair Healthcare AI"
        description="Whether you are a health system deploying clinical AI or a regulator shaping policy, ParityScope is your partner in ensuring algorithmic equity."
        primaryCTA={{ label: "Request a Demo", href: "/contact" }}
        secondaryCTA={{ label: "Read Our Case Studies", href: "/resources/case-studies" }}
      />
    </>
  );
}
