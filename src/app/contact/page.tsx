import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact — Book an Assessment",
  description:
    "Get in touch with ParityScope. Book a personalized demo of our AI fairness platform for healthcare.",
};

export default function ContactPage() {
  return (
    <section className="px-4 py-section sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h1 className="text-h1 font-bold text-navy">
              Let&apos;s Talk AI Fairness
            </h1>
            <p className="mt-4 text-body-lg text-medium-gray">
              Whether you need a one-time assessment or a full compliance
              platform, we&apos;re here to help. Fill out the form and
              we&apos;ll be in touch within 1 business day.
            </p>

            <div className="mt-12 space-y-6">
              <div>
                <h3 className="text-h4 font-semibold text-navy">Email</h3>
                <p className="mt-1 text-medium-gray">hello@parityscope.com</p>
              </div>
              <div>
                <h3 className="text-h4 font-semibold text-navy">Response Time</h3>
                <p className="mt-1 text-medium-gray">
                  We respond to all inquiries within 1 business day.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-light-gray bg-white p-8 shadow-card">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
