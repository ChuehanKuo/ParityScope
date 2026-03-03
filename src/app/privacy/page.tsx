import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "ParityScope's privacy policy — how we collect, use, and protect your information.",
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
          <div>
            <h2 className="text-h3 font-semibold text-navy">1. Introduction</h2>
            <p className="mt-3">
              ParityScope (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website (parityscope.com), use our SDK, access our API, or
              interact with our services (collectively, the
              &quot;Services&quot;).
            </p>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">
              2. Information We Collect
            </h2>
            <h3 className="mt-4 font-semibold text-dark-gray">
              2.1 Information You Provide
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                Contact information (name, email, organization) when you request
                a demo, create an account, or contact us
              </li>
              <li>
                Billing information (processed by our payment provider; we do
                not store credit card numbers)
              </li>
              <li>
                Communications you send us (support requests, feedback, survey
                responses)
              </li>
            </ul>

            <h3 className="mt-4 font-semibold text-dark-gray">
              2.2 Information Collected Automatically
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                Usage data: pages visited, features used, session duration
              </li>
              <li>
                Device information: browser type, operating system, screen
                resolution
              </li>
              <li>
                Log data: IP address, access times, referring URLs
              </li>
              <li>
                Cookies and similar technologies (see Section 6)
              </li>
            </ul>

            <h3 className="mt-4 font-semibold text-dark-gray">
              2.3 Data Processed by Our SDK
            </h3>
            <p className="mt-2">
              <strong>Important:</strong> The ParityScope SDK runs entirely
              within your infrastructure. We do not receive, store, or process
              patient data, protected health information (PHI), or model
              training data. The SDK processes this data locally and generates
              only aggregated, de-identified fairness metrics. If you choose to
              use our cloud monitoring features, only these aggregated metrics
              are transmitted — never individual patient records.
            </p>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">
              3. How We Use Your Information
            </h2>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>Provide, maintain, and improve our Services</li>
              <li>Process your requests and respond to inquiries</li>
              <li>Send administrative communications (service updates, security alerts)</li>
              <li>Send marketing communications (with your consent; you can opt out at any time)</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Comply with legal obligations</li>
              <li>Detect and prevent fraud or security incidents</li>
            </ul>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">
              4. Legal Basis for Processing (GDPR)
            </h2>
            <p className="mt-3">
              For users in the European Economic Area, we process personal data
              under the following legal bases:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                <strong>Contract performance:</strong> to provide our Services
                to you
              </li>
              <li>
                <strong>Legitimate interests:</strong> to improve our products,
                ensure security, and communicate with you
              </li>
              <li>
                <strong>Consent:</strong> for marketing communications and
                non-essential cookies
              </li>
              <li>
                <strong>Legal obligation:</strong> to comply with applicable
                laws and regulations
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">
              5. Information Sharing
            </h2>
            <p className="mt-3">
              We do not sell your personal information. We may share information
              with:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                <strong>Service providers:</strong> hosting, analytics, payment
                processing, and customer support tools that process data on our
                behalf
              </li>
              <li>
                <strong>Legal requirements:</strong> when required by law,
                regulation, or legal process
              </li>
              <li>
                <strong>Business transfers:</strong> in connection with a
                merger, acquisition, or sale of assets
              </li>
              <li>
                <strong>With your consent:</strong> when you explicitly
                authorize sharing
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">
              6. Cookies & Tracking
            </h2>
            <p className="mt-3">
              We use essential cookies for website functionality and optional
              analytics cookies to understand usage patterns. You can control
              cookie preferences through your browser settings or our cookie
              consent banner. We do not use third-party advertising cookies.
            </p>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">
              7. Data Retention
            </h2>
            <p className="mt-3">
              We retain personal information for as long as necessary to provide
              our Services, comply with legal obligations, resolve disputes, and
              enforce our agreements. Account data is retained for the duration
              of your subscription plus 90 days. You can request deletion of
              your data at any time (see Section 8).
            </p>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">
              8. Your Rights
            </h2>
            <p className="mt-3">
              Depending on your jurisdiction, you may have the following rights:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your data (&quot;right to be forgotten&quot;)</li>
              <li>Restrict or object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, contact us at privacy@parityscope.com.
              We will respond within 30 days (or as required by applicable law).
            </p>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">
              9. International Transfers
            </h2>
            <p className="mt-3">
              If you are located outside the United States, your information may
              be transferred to and processed in the United States or other
              countries. We use Standard Contractual Clauses and other
              appropriate safeguards for international data transfers as required
              by GDPR. EU customers can request data residency within the
              European Union.
            </p>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">
              10. Children&apos;s Privacy
            </h2>
            <p className="mt-3">
              Our Services are not directed at individuals under 18 years of
              age. We do not knowingly collect personal information from
              children.
            </p>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">
              11. Changes to This Policy
            </h2>
            <p className="mt-3">
              We may update this Privacy Policy from time to time. We will
              notify you of material changes by posting the updated policy on
              our website and, for registered users, by email notification. Your
              continued use of our Services after the effective date constitutes
              acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">
              12. Contact Us
            </h2>
            <p className="mt-3">
              If you have questions about this Privacy Policy or our data
              practices, please contact us at:
            </p>
            <div className="mt-3">
              <p>ParityScope</p>
              <p>Email: privacy@parityscope.com</p>
              <p>General: hello@parityscope.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
