import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprint (Impressum)",
  description:
    "Legal imprint for ParityScope as required by German and EU law.",
};

export default function ImprintPage() {
  return (
    <section className="px-4 py-section sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-h1 font-bold text-navy">
          Imprint (Impressum)
        </h1>
        <p className="mt-4 text-body-lg text-medium-gray">
          Information pursuant to Sect. 5 German Telemedia Act (TMG) and
          Article 13 GDPR.
        </p>

        <div className="mt-12 space-y-10 text-medium-gray leading-relaxed">
          <div>
            <h2 className="text-h3 font-semibold text-navy">
              Company Information
            </h2>
            <div className="mt-3 space-y-1">
              <p className="font-medium text-dark-gray">ParityScope GmbH</p>
              <p>Registered office: Berlin, Germany</p>
              <p>Registration court: Amtsgericht Charlottenburg</p>
              <p>Registration number: HRB [pending]</p>
              <p>VAT ID: DE [pending]</p>
            </div>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">
              Managing Directors
            </h2>
            <p className="mt-3">To be published upon company registration.</p>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">Contact</h2>
            <div className="mt-3 space-y-1">
              <p>Email: hello@parityscope.com</p>
              <p>Website: parityscope.com</p>
            </div>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">
              Responsible for Content
            </h2>
            <p className="mt-3">
              Responsible for content pursuant to Sect. 55 para. 2 RStV:
            </p>
            <p className="mt-2">To be published upon company registration.</p>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">
              EU Dispute Resolution
            </h2>
            <p className="mt-3">
              The European Commission provides a platform for online dispute
              resolution (ODR). We are not willing or obliged to participate in
              dispute resolution proceedings before a consumer arbitration
              board.
            </p>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">
              Liability for Content
            </h2>
            <p className="mt-3">
              As a service provider, we are responsible for our own content on
              these pages in accordance with Sect. 7 para. 1 TMG. According to
              Sects. 8 to 10 TMG, however, we are not obligated to monitor
              transmitted or stored third-party information or to investigate
              circumstances that indicate illegal activity. Obligations to
              remove or block the use of information under general law remain
              unaffected.
            </p>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">
              Liability for Links
            </h2>
            <p className="mt-3">
              Our website may contain links to external third-party websites
              over whose content we have no influence. Therefore, we cannot
              accept any liability for these external contents. The respective
              provider or operator of the linked pages is always responsible for
              the content of those pages. The linked pages were checked for
              possible legal violations at the time of linking. Illegal content
              was not identifiable at the time of linking.
            </p>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">Copyright</h2>
            <p className="mt-3">
              The content and works created by the site operators on these pages
              are subject to copyright law. Reproduction, editing,
              distribution, and any kind of use outside the limits of copyright
              law require the written consent of the respective author or
              creator. Downloads and copies of this site are only permitted for
              private, non-commercial use.
            </p>
          </div>

          <div>
            <h2 className="text-h3 font-semibold text-navy">
              Data Protection Officer
            </h2>
            <p className="mt-3">
              For questions about data protection, please contact our data
              protection officer at: privacy@parityscope.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
