import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — ParityScope",
  description:
    "Terms governing the use of ParityScope's website, services, and SDK products for AI fairness auditing.",
};

export default function TermsPage() {
  return (
    <section className="px-4 py-section sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-h1 font-bold text-navy">Terms of Service</h1>
        <p className="mt-4 text-body-lg text-medium-gray">
          Last updated: March 2026
        </p>

        <div className="mt-12 space-y-10 text-medium-gray leading-relaxed">
          {/* 1. Acceptance of Terms */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              1. Acceptance of Terms
            </h2>
            <p className="mt-4">
              By accessing or using the ParityScope website
              (parityscope.com), our SDK products, or any related services
              (collectively, the &quot;Services&quot;), you agree to be
              bound by these Terms of Service (&quot;Terms&quot;). If you
              are entering into these Terms on behalf of an organization,
              you represent that you have the authority to bind that
              organization. If you do not agree to these Terms, you may not
              use the Services.
            </p>
          </div>

          {/* 2. Description of Services */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              2. Description of Services
            </h2>
            <p className="mt-4">
              ParityScope provides AI fairness auditing tools and services
              for healthcare organizations, including:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                The ParityScope SDK, a software toolkit for automated
                fairness analysis of AI/ML models used in healthcare
                settings.
              </li>
              <li>
                Professional fairness assessment and consulting services.
              </li>
              <li>
                Documentation, research, and educational resources related
                to AI fairness and regulatory compliance (including EU AI
                Act).
              </li>
            </ul>
          </div>

          {/* 3. Account and Access */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              3. Account and Access
            </h2>
            <p className="mt-4">
              Certain Services may require you to create an account or
              obtain access credentials. You are responsible for
              maintaining the confidentiality of your account credentials
              and for all activities that occur under your account. You
              agree to notify us immediately of any unauthorized use of
              your account.
            </p>
          </div>

          {/* 4. SDK License Terms */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              4. SDK License Terms
            </h2>
            <p className="mt-4">
              Access to the ParityScope SDK is provided under a
              subscription license. The specific terms of your license,
              including features, usage limits, and support levels, are
              determined by your selected pricing tier and documented in
              your subscription agreement.
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                The SDK is licensed, not sold. You receive a non-exclusive,
                non-transferable, revocable license to use the SDK in
                accordance with these Terms and your subscription agreement.
              </li>
              <li>
                You may not reverse engineer, decompile, disassemble, or
                otherwise attempt to derive the source code of the SDK,
                except as permitted by applicable law.
              </li>
              <li>
                You may not sublicense, redistribute, or make the SDK
                available to third parties without prior written consent
                from ParityScope.
              </li>
              <li>
                Usage is limited to the scope defined by your pricing tier.
                Exceeding usage limits may result in additional charges or
                suspension of access.
              </li>
            </ul>
          </div>

          {/* 5. Intellectual Property */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              5. Intellectual Property
            </h2>
            <p className="mt-4">
              All intellectual property rights in the Services, including
              the SDK, documentation, website content, trademarks, and any
              underlying technology, are and remain the exclusive property
              of ParityScope GmbH. Nothing in these Terms grants you any
              right, title, or interest in our intellectual property beyond
              the limited license rights expressly granted herein.
            </p>
            <p className="mt-3">
              You retain all rights to your data, models, and any outputs
              generated by the SDK within your infrastructure.
            </p>
          </div>

          {/* 6. Limitation of Liability */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              6. Limitation of Liability
            </h2>
            <p className="mt-4">
              To the maximum extent permitted by applicable law, ParityScope
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including but not limited
              to loss of profits, data, business opportunities, or
              goodwill, arising out of or in connection with your use of
              the Services, whether based on warranty, contract, tort, or
              any other legal theory.
            </p>
            <p className="mt-3">
              ParityScope&apos;s total aggregate liability for any claims
              arising out of or related to these Terms or the Services
              shall not exceed the total fees paid by you to ParityScope in
              the twelve (12) months preceding the event giving rise to the
              claim.
            </p>
          </div>

          {/* 7. Warranty Disclaimer */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              7. Warranty Disclaimer
            </h2>
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-6">
              <p className="font-medium text-navy">
                The Services, including the SDK, are provided &quot;as
                is&quot; and &quot;as available&quot; without warranties of
                any kind, either express or implied.
              </p>
              <p className="mt-3">
                ParityScope does not warrant that the Services will be
                uninterrupted, error-free, or that any defects will be
                corrected. We disclaim all warranties, including but not
                limited to implied warranties of merchantability, fitness
                for a particular purpose, and non-infringement.
              </p>
              <p className="mt-3 font-medium text-navy">
                The Services do not constitute legal advice. Fairness audit
                results and reports generated by the SDK are intended to
                support your compliance efforts but do not guarantee legal
                compliance with the EU AI Act or any other regulation. You
                should seek independent legal counsel for compliance
                matters.
              </p>
            </div>
          </div>

          {/* 8. Termination */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              8. Termination
            </h2>
            <p className="mt-4">
              Either party may terminate these Terms at any time by
              providing written notice to the other party. ParityScope
              reserves the right to suspend or terminate your access to the
              Services immediately if you breach these Terms. Upon
              termination, your right to use the Services ceases
              immediately. Sections that by their nature should survive
              termination (including Intellectual Property, Limitation of
              Liability, and Warranty Disclaimer) will remain in effect.
            </p>
          </div>

          {/* 9. Governing Law */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              9. Governing Law
            </h2>
            <p className="mt-4">
              These Terms are governed by and construed in accordance with
              the laws of the Federal Republic of Germany, without regard
              to its conflict of law principles. Any disputes arising out
              of or in connection with these Terms shall be subject to the
              exclusive jurisdiction of the courts of Berlin, Germany. For
              consumers within the European Union, mandatory consumer
              protection laws of your country of residence shall apply
              where they provide a higher level of protection.
            </p>
          </div>

          {/* 10. Contact */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">10. Contact</h2>
            <p className="mt-4">
              If you have questions about these Terms of Service, please
              contact us:
            </p>
            <div className="mt-3">
              <p>ParityScope GmbH</p>
              <p>Friedrichstra&szlig;e 123, 10117 Berlin, Germany</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:legal@parityscope.com"
                  className="text-teal hover:underline"
                >
                  legal@parityscope.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
