import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story — ParityScope",
  description:
    "A founder's note on why ParityScope exists, what we've built, and what we are not.",
};

export default function FoundersNotePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-body-sm font-semibold uppercase tracking-wider text-teal">
            A founder&rsquo;s note
          </p>
          <h1 className="mt-4 text-h1 font-bold leading-tight lg:text-display">
            Our Story
          </h1>
          <p className="mt-6 max-w-3xl text-body-lg text-light-gray">
            ParityScope is early. Here&rsquo;s what we&rsquo;re building and why.
          </p>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl space-y-6 text-body-lg leading-relaxed text-dark-gray">
          <p>
            Algorithmic fairness in healthcare is not a checkbox. A miscalibrated
            sepsis model, a pulse oximeter that underestimates hypoxia in darker
            skin, a readmission score that systematically underserves a
            neighborhood &mdash; these are not abstract risks. They are
            operational failures with clinical consequences, and the tools
            hospitals and MedTech vendors have today were not built for them.
            Horizontal AI governance platforms treat a loan-approval model and a
            clinical decision support tool as the same object. They are not.
          </p>

          <p>
            ParityScope exists because healthcare AI deserves a fairness audit
            built for healthcare &mdash; one that speaks the vocabulary of
            Notified Bodies, FDA GMLP, Section 1557, CHAI, and the emerging
            frameworks in South Korea and Taiwan, not a generic ISO checklist
            retrofitted onto a clinical use case.
          </p>

          <p>
            <strong className="text-navy">What&rsquo;s built today.</strong>{" "}
            A Python audit engine with 15 fairness metrics, bootstrap confidence
            intervals, and statistical power diagnostics. Continuous monitoring
            with drift detection, CUSUM changepoint analysis, and anomaly
            alerting. Root-cause tooling for proxy detection, label bias, and
            representation gaps. Recommendations with priority ranking and
            tradeoff analysis. Regulatory mapping for five jurisdictions: the
            EU AI Act, US FDA SaMD guidance and Section 1557, South Korea&rsquo;s
            AI Act, and Taiwan&rsquo;s AI Basic Act. CLI, REST API, and library
            interfaces, so the audit lives where your model does.
          </p>

          <p>
            <strong className="text-navy">What we are not.</strong>{" "}
            We are not a validation lab &mdash; we do not certify models or
            issue conformity decisions. We are not a generic AI governance
            platform &mdash; we do not sell to banks or insurers. We are not a
            consulting firm &mdash; we ship software, not slide decks. If you
            need a head count of compliance analysts, hire one. If you need
            reproducible, regulator-ready audit evidence, that is what we do.
          </p>

          <p>
            <strong className="text-navy">We are early.</strong> Our initial
            focus is MedTech vendors preparing for EU conformity assessment and
            health systems building audit documentation for Joint Commission or
            CHAI certification. If you sit outside those two lanes, we will
            still talk &mdash; but those are the customers we are currently
            best positioned to serve.
          </p>

          <p>
            <strong className="text-navy">On the team you don&rsquo;t see on
            this page.</strong>{" "}
            We are building out our clinical advisory board and will update
            this page with their names as agreements finalize. We would rather
            publish nothing than publish placeholders. If you are a health AI
            ethics researcher, clinical informaticist, or regulatory affairs
            expert interested in advising, reach out.
          </p>

          <p>
            The fastest way to reach me is{" "}
            <Link
              href="mailto:hello@parityscope.com"
              className="font-semibold text-teal hover:text-teal-dark"
            >
              hello@parityscope.com
            </Link>
            . I read every message.
          </p>
        </article>
      </section>

      {/* CTA */}
      <section className="bg-navy px-4 py-section text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2 font-bold">Book a paid assessment</h2>
          <p className="mt-4 text-body-lg text-light-gray">
            A 90-day engagement that produces audit evidence you can put in a
            regulatory binder &mdash; not a pitch deck.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book an Assessment
            </Link>
            <Link
              href="/about/mission"
              className="rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Read Our Mission
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
