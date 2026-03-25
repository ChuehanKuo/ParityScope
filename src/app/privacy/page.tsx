import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ParityScope",
  description:
    "How ParityScope collects, uses, and protects your information. Learn about our data practices for our website, services, and SDK.",
};

export default function PrivacyPage() {
  return (
    <section className="px-4 py-section sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-h1 font-bold text-navy">Privacy Policy</h1>
        <p className="mt-4 text-body-lg text-medium-gray">
          Last updated: March 2026
        </p>

        <div className="mt-12 space-y-10 text-medium-gray leading-relaxed">
          {/* Intro */}
          <p>
            ParityScope GmbH (&quot;ParityScope&quot;, &quot;we&quot;,
            &quot;our&quot;, or &quot;us&quot;) is committed to protecting
            your privacy. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our
            website at parityscope.com, interact with our services, or
            engage with us as a business partner or prospective customer.
          </p>

          {/* 1. Information We Collect */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              1. Information We Collect
            </h2>
            <p className="mt-4">
              We collect information in the following ways:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-navy">Website Analytics.</strong> We
                collect anonymized usage data such as pages visited, time
                spent, browser type, device information, and referring URLs
                to understand how visitors interact with our website and
                improve the user experience.
              </li>
              <li>
                <strong className="text-navy">Contact Form Data.</strong>{" "}
                When you submit a contact form, request a demo, or sign up
                for our newsletter, we collect the information you provide,
                including your name, email address, company name, job title,
                and the content of your message.
              </li>
              <li>
                <strong className="text-navy">
                  Business Contact Information.
                </strong>{" "}
                In the course of our B2B relationships, we may collect
                professional contact details such as your name, work email,
                phone number, company name, and job title.
              </li>
            </ul>
          </div>

          {/* 2. How We Use Your Information */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              2. How We Use Your Information
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                To respond to your inquiries and provide customer support.
              </li>
              <li>
                To send you information about our products and services that
                may be relevant to you, where you have opted in to receive
                such communications.
              </li>
              <li>
                To improve our website, products, and services based on
                aggregated, anonymized usage analytics.
              </li>
              <li>
                To fulfill contractual obligations with our business
                customers.
              </li>
              <li>
                To comply with applicable legal obligations and regulatory
                requirements.
              </li>
            </ul>
          </div>

          {/* 3. Data Sharing */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              3. Data Sharing
            </h2>
            <p className="mt-4">
              We do not sell, rent, or trade your personal information to
              third parties. We may share your information only in the
              following limited circumstances:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-navy">Service Providers.</strong> We
                work with trusted third-party service providers who assist
                us in operating our website, conducting business, or
                servicing you (e.g., hosting providers, email delivery
                services, analytics tools). These providers are
                contractually obligated to keep your information
                confidential.
              </li>
              <li>
                <strong className="text-navy">Legal Requirements.</strong>{" "}
                We may disclose your information if required by law, court
                order, or governmental regulation, or if we believe
                disclosure is necessary to protect our rights, your safety,
                or the safety of others.
              </li>
            </ul>
          </div>

          {/* 4. SDK & Patient Data */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              4. SDK &amp; Patient Data
            </h2>
            <div className="mt-4 rounded-lg border border-teal/30 bg-teal/5 p-6">
              <p className="font-medium text-navy">
                Important: The ParityScope SDK processes all data locally
                within your infrastructure.
              </p>
              <p className="mt-3">
                Patient data, protected health information (PHI), and any
                sensitive data analyzed by the ParityScope SDK are never
                transmitted to, stored by, or accessible to ParityScope. The
                SDK runs entirely within your own environment. Fairness
                audit results, statistical metrics, and reports are
                generated and stored locally under your control.
              </p>
              <p className="mt-3">
                ParityScope has no access to, and assumes no responsibility
                for, the patient data processed by the SDK. You retain full
                ownership, control, and responsibility for all data
                processed within your infrastructure.
              </p>
            </div>
          </div>

          {/* 5. Data Retention */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              5. Data Retention
            </h2>
            <p className="mt-4">
              We retain your personal information only for as long as
              necessary to fulfill the purposes outlined in this policy,
              unless a longer retention period is required or permitted by
              law. Contact form submissions and business contact information
              are retained for the duration of our business relationship and
              for a reasonable period thereafter. Website analytics data is
              retained in anonymized, aggregated form and is not linked to
              identifiable individuals.
            </p>
          </div>

          {/* 6. Your Rights */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              6. Your Rights
            </h2>
            <p className="mt-4">
              Under the General Data Protection Regulation (GDPR) and
              applicable data protection laws, you have the following
              rights:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-navy">Right of Access.</strong> You
                may request a copy of the personal data we hold about you.
              </li>
              <li>
                <strong className="text-navy">Right to Rectification.</strong>{" "}
                You may request that we correct any inaccurate or incomplete
                personal data.
              </li>
              <li>
                <strong className="text-navy">Right to Erasure.</strong> You
                may request that we delete your personal data, subject to
                legal retention requirements.
              </li>
              <li>
                <strong className="text-navy">Right to Data Portability.</strong>{" "}
                You may request a copy of your personal data in a
                structured, commonly used, and machine-readable format.
              </li>
              <li>
                <strong className="text-navy">Right to Object.</strong> You
                may object to the processing of your personal data for
                direct marketing purposes or on grounds relating to your
                particular situation.
              </li>
              <li>
                <strong className="text-navy">
                  Right to Restrict Processing.
                </strong>{" "}
                You may request that we restrict the processing of your
                personal data under certain circumstances.
              </li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:privacy@parityscope.com"
                className="text-teal hover:underline"
              >
                privacy@parityscope.com
              </a>
              . We will respond to your request within 30 days.
            </p>
          </div>

          {/* 7. Cookies */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">7. Cookies</h2>
            <p className="mt-4">
              Our website uses minimal cookies. We use only essential
              cookies required for the website to function properly and
              analytics cookies to understand how visitors use our site. We
              do not use advertising or tracking cookies. You can control
              cookie preferences through your browser settings. Disabling
              analytics cookies will not affect your ability to use our
              website.
            </p>
          </div>

          {/* 8. Contact Information */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              8. Contact Information
            </h2>
            <p className="mt-4">
              If you have questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div className="mt-3">
              <p>ParityScope GmbH</p>
              <p>Friedrichstra&szlig;e 123, 10117 Berlin, Germany</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:privacy@parityscope.com"
                  className="text-teal hover:underline"
                >
                  privacy@parityscope.com
                </a>
              </p>
            </div>
          </div>

          {/* 9. Changes to This Policy */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              9. Changes to This Policy
            </h2>
            <p className="mt-4">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, technology, legal requirements, or
              other factors. When we make material changes, we will update
              the &quot;Last updated&quot; date at the top of this page. We
              encourage you to review this page periodically to stay
              informed about how we protect your information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
