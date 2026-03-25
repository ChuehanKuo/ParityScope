import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint (Impressum) — ParityScope",
  description:
    "Legal imprint for ParityScope GmbH as required by Section 5 TMG (German Telemedia Act).",
};

export default function ImprintPage() {
  return (
    <section className="px-4 py-section sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-h1 font-bold text-navy">
          Imprint (Impressum)
        </h1>
        <p className="mt-4 text-body-lg text-medium-gray">
          Information pursuant to Sect. 5 German Telemedia Act (TMG)
        </p>

        <div className="mt-12 space-y-8 text-medium-gray leading-relaxed">
          {/* Company Information */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              Company Information
            </h2>
            <div className="mt-4 space-y-1">
              <p className="font-medium text-navy">ParityScope GmbH</p>
              <p>Friedrichstra&szlig;e 123</p>
              <p>10117 Berlin</p>
              <p>Germany</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">Contact</h2>
            <div className="mt-4 space-y-1">
              <p>
                Email:{" "}
                <a
                  href="mailto:hello@parityscope.com"
                  className="text-teal hover:underline"
                >
                  hello@parityscope.com
                </a>
              </p>
              <p>
                Website:{" "}
                <a
                  href="https://parityscope.com"
                  className="text-teal hover:underline"
                >
                  parityscope.com
                </a>
              </p>
            </div>
          </div>

          {/* Managing Director */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              Managing Director (Gesch&auml;ftsf&uuml;hrer)
            </h2>
            <p className="mt-4">[To be updated]</p>
          </div>

          {/* Commercial Register */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              Commercial Register
            </h2>
            <div className="mt-4 space-y-1">
              <p>Registered at: Amtsgericht Charlottenburg</p>
              <p>Registration number: HRB [To be updated]</p>
            </div>
          </div>

          {/* VAT ID */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              VAT Identification Number
            </h2>
            <p className="mt-4">
              VAT ID pursuant to Sect. 27a German VAT Act
              (Umsatzsteuergesetz): DE[To be updated]
            </p>
          </div>

          {/* Responsible for Content */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              Responsible for Content
            </h2>
            <p className="mt-4">
              Responsible for content pursuant to Sect. 18 para. 2 German
              Interstate Media Treaty (Medienstaatsvertrag):
            </p>
            <div className="mt-2 space-y-1">
              <p>[To be updated]</p>
              <p>Friedrichstra&szlig;e 123</p>
              <p>10117 Berlin, Germany</p>
            </div>
          </div>

          {/* EU Dispute Resolution */}
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              EU Dispute Resolution
            </h2>
            <p className="mt-4">
              The European Commission provides a platform for online
              dispute resolution (ODR):{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal hover:underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              .
            </p>
            <p className="mt-2">
              We are neither willing nor obliged to participate in dispute
              resolution proceedings before a consumer arbitration board.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
