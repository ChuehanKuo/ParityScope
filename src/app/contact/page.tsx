import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact — Book a Demo",
  description:
    "Get in touch with ParityScope. Book a personalized demo of our AI fairness platform for healthcare.",
};

export default function ContactPage() {
  return (
    <>
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left column — info */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-teal">
                Contact Us
              </p>
              <h1 className="mt-3 text-h1 font-bold text-navy">
                Let&apos;s Talk AI Fairness
              </h1>
              <p className="mt-4 text-body-lg text-medium-gray">
                Whether you need a one-time assessment or a full compliance
                platform, we&apos;re here to help. Fill out the form and
                we&apos;ll be in touch within 1 business day.
              </p>

              {/* Contact info cards */}
              <div className="mt-12 space-y-6">
                <div className="rounded-xl border border-light-gray p-6">
                  <h3 className="font-semibold text-navy">Book a Demo</h3>
                  <p className="mt-2 text-sm text-medium-gray">
                    See ParityScope in action with a personalized walkthrough
                    using synthetic clinical data. We&apos;ll audit a sample
                    model live and show you the full compliance report.
                  </p>
                  <p className="mt-3 text-sm text-teal">
                    demo@parityscope.com
                  </p>
                </div>

                <div className="rounded-xl border border-light-gray p-6">
                  <h3 className="font-semibold text-navy">General Inquiries</h3>
                  <p className="mt-2 text-sm text-medium-gray">
                    Questions about pricing, partnerships, or how ParityScope
                    fits your organization? We&apos;re happy to help.
                  </p>
                  <p className="mt-3 text-sm text-teal">
                    hello@parityscope.com
                  </p>
                </div>

                <div className="rounded-xl border border-light-gray p-6">
                  <h3 className="font-semibold text-navy">Technical Support</h3>
                  <p className="mt-2 text-sm text-medium-gray">
                    Existing customers can reach our support team for SDK
                    integration help, API questions, or troubleshooting.
                  </p>
                  <p className="mt-3 text-sm text-teal">
                    support@parityscope.com
                  </p>
                </div>
              </div>

              {/* Response time */}
              <div className="mt-8 rounded-xl bg-off-white p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10">
                    <svg
                      className="h-5 w-5 text-teal"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-navy">
                      Response within 1 business day
                    </p>
                    <p className="text-sm text-medium-gray">
                      Enterprise support customers receive 4-hour response SLA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column — form */}
            <div>
              <div className="sticky top-8 rounded-2xl border border-light-gray bg-white p-8 shadow-card">
                <h2 className="text-h3 font-semibold text-navy">
                  Get in Touch
                </h2>
                <p className="mt-2 text-sm text-medium-gray">
                  Tell us about your AI fairness needs and we&apos;ll tailor a
                  solution for your organization.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            What to Expect
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Discovery Call",
                description:
                  "We learn about your AI models, patient populations, and regulatory requirements.",
              },
              {
                step: "2",
                title: "Live Demo",
                description:
                  "See ParityScope audit a model in real-time using synthetic data that mirrors your use case.",
              },
              {
                step: "3",
                title: "Pilot Setup",
                description:
                  "We help you run your first audit on a real model with full technical support.",
              },
              {
                step: "4",
                title: "Go Live",
                description:
                  "Deploy continuous monitoring across your model portfolio with ongoing compliance support.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy text-lg font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-medium-gray">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office locations / social */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-h3 font-bold text-navy">Connect With Us</h2>
              <p className="mt-4 text-medium-gray">
                Follow ParityScope for the latest on AI fairness, healthcare
                compliance, and product updates.
              </p>
              <div className="mt-6 flex gap-4">
                <Link
                  href="https://linkedin.com/company/parityscope"
                  className="rounded-lg border border-light-gray px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-navy"
                >
                  LinkedIn
                </Link>
                <Link
                  href="https://twitter.com/parityscope"
                  className="rounded-lg border border-light-gray px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-navy"
                >
                  Twitter / X
                </Link>
                <Link
                  href="https://github.com/parityscope"
                  className="rounded-lg border border-light-gray px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-navy"
                >
                  GitHub
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-h3 font-bold text-navy">Partnerships</h2>
              <p className="mt-4 text-medium-gray">
                Interested in integrating ParityScope into your platform, or
                partnering on healthcare AI fairness research? We work with EHR
                vendors, health systems, and academic institutions.
              </p>
              <Link
                href="mailto:partnerships@parityscope.com"
                className="mt-4 inline-block text-sm font-semibold text-teal hover:underline"
              >
                partnerships@parityscope.com
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
