import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-h1 font-bold leading-tight tracking-tight lg:text-display">
              The Independent Verifier{" "}
              <span className="text-teal">for Clinical AI</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-body-lg text-light-gray">
              Healthcare AI doesn&apos;t fail in headlines. It fails in the chart review
              six months later, in the subpoenaed algorithm report, in the accreditation
              finding. ParityScope is the fairness audit built for when your AI comes
              under scrutiny.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full bg-teal px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
              >
                Book an Assessment
              </Link>
              <Link
                href="#how-it-works"
                className="rounded-full border border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                See How It Works
              </Link>
            </div>
          </div>
          {/* Trust bar */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-8">
            <span className="text-body-sm text-medium-gray">Mapping to:</span>
            {["EU AI Act", "FDA SaMD Guidance", "NIST AI RMF", "Section 1557", "Joint Commission/CHAI"].map((reg) => (
              <span key={reg} className="text-body-sm font-medium text-light-gray">{reg}</span>
            ))}
          </div>
        </div>
      </section>

      {/* The Real Pressure Points */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            The Real Pressure Points
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-body-lg text-medium-gray">
            The forcing functions in clinical AI aren&apos;t abstract future deadlines.
            They&apos;re live today — in courtrooms, accreditation visits, and conformity
            assessments.
          </p>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                label: "Litigation",
                title: "Subpoenas, not statutes",
                description:
                  "UnitedHealth was ordered to disclose the nH Predict algorithm in March 2026. The class action proceeded in February 2025 over a 90% error rate on Medicare Advantage denials. The plaintiffs&apos; bar is the new enforcement mechanism.",
                source: "In re UnitedHealth Group (D. Minn.), Mar 2026",
                color: "coral" as const,
              },
              {
                label: "Certification",
                title: "Voluntary until it isn&apos;t",
                description:
                  "Joint Commission and CHAI launched the Responsible Use of AI in Healthcare certification in September 2025. Rolling out across 22,000+ accredited organizations. Being certified is becoming a procurement prerequisite, not a nice-to-have.",
                source: "Joint Commission / CHAI, Sept 2025",
                color: "amber" as const,
              },
              {
                label: "Conformity Assessment",
                title: "MDR/IVDR is already here",
                description:
                  "EU MedTech vendors face Notified Body conformity assessment regardless of how the AI Act timeline shifts. Post-market surveillance under MDR and IVDR is mandatory today and has not been delayed.",
                source: "Regulation (EU) 2017/745, 2017/746",
                color: "coral" as const,
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-xl border-2 bg-white p-8 shadow-card ${
                  item.color === "coral" ? "border-coral/20" : "border-amber/30"
                }`}
              >
                <span
                  className={`text-caption font-semibold uppercase tracking-wider ${
                    item.color === "coral" ? "text-coral" : "text-amber"
                  }`}
                >
                  {item.label}
                </span>
                <h3 className="mt-2 text-h4 font-bold text-navy" dangerouslySetInnerHTML={{ __html: item.title }} />
                <p
                  className="mt-3 text-body text-dark-gray"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                <p className="mt-4 text-caption text-medium-gray">{item.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Gap */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="flex items-end gap-6">
                <div>
                  <div className="text-display font-bold text-coral">23%</div>
                  <p className="text-body text-medium-gray">have formal AI governance</p>
                </div>
                <div className="text-h2 font-bold text-medium-gray">vs</div>
                <div>
                  <div className="text-display font-bold text-navy">78%</div>
                  <p className="text-body text-medium-gray">deploying clinical AI in 24 months</p>
                </div>
              </div>
              <p className="mt-8 text-caption text-medium-gray">
                Sources: CHIME Foundation / Censinet, Dec 2025; ASTP &amp; AHA IT
                Supplement, 2024.
              </p>
            </div>
            <div>
              <h2 className="text-h2 font-bold text-navy">The Governance Gap</h2>
              <p className="mt-4 text-body-lg text-medium-gray">
                Committees exist. Frameworks don&apos;t. When models fail audits, there&apos;s
                no playbook — no pre-approved remediation path, no evidence trail,
                no one whose job it is to sign the report. That&apos;s where patients get
                hurt and systems get sued.
              </p>
              <Link
                href="/regulations"
                className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-teal transition-colors hover:text-teal-dark"
              >
                Explore regulatory requirements
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Independent Verification */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-body-sm font-semibold uppercase tracking-wider text-teal">
              Independent by design
            </span>
            <h2 className="mt-2 text-h2 font-bold text-navy">
              Why You Need an Independent Verifier
            </h2>
            <p className="mt-4 text-body-lg text-medium-gray">
              EHR vendors have started shipping their own fairness modules. They don&apos;t
              replace independent audit — they make the case for it.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Conflict of interest",
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152A11.959 11.959 0 0 1 12 2.714ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                ),
                description:
                  "EHR vendors auditing their own AI is the same as AWS audits auditing AWS bills. When regulators, plaintiffs, or accreditation surveyors ask who verified your AI, &ldquo;we used the vendor&rsquo;s tool&rdquo; isn&apos;t an answer.",
              },
              {
                title: "Multi-vendor coverage",
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                  </svg>
                ),
                description:
                  "Most hospitals run models from 5+ vendors. One tool that covers all of them means one report, one methodology, and one traceable audit trail — across Epic, Oracle, startups, and in-house models.",
              },
              {
                title: "Regulatory-native reports",
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                ),
                description:
                  "Purpose-built to produce evidence packs for Notified Bodies, FDA PCCP filings, CHAI certification, and Section 1557 defense. Generic EHR audit modules don&apos;t ship in those formats.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-light-gray bg-white p-8 shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal/10 text-teal">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-h4 font-semibold text-navy">{item.title}</h3>
                <p
                  className="mt-2 text-body text-medium-gray"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            What ParityScope Does
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-body-lg text-medium-gray">
            Audit, monitor, remediate. Three pillars, one traceable evidence trail.
          </p>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Audit",
                href: "/product/fairness-audit",
                description:
                  "15+ fairness metrics plus AUROC parity and calibration slope. Intersectional analysis. Sample adequacy power analysis. Regulator-reproducible outputs with input hashing.",
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                  </svg>
                ),
              },
              {
                title: "Monitor",
                href: "/product/monitoring",
                description:
                  "Continuous monitoring with statistical drift detection (KS, PSI, chi-squared), CUSUM changepoint detection, and Isolation Forest anomaly detection. Alerts before metrics breach.",
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                  </svg>
                ),
              },
              {
                title: "Remediate",
                href: "/product/mitigation",
                description:
                  "Root cause analysis (proxy detection, label bias, representation). Mitigation strategy ranking. What-if simulation. Sequenced remediation plans with dependency logic.",
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-xl border border-light-gray bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal/10 text-teal">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-h4 font-semibold text-navy group-hover:text-teal">
                  {item.title}
                </h3>
                <p className="mt-2 text-medium-gray">{item.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal">
                  Learn more
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-24">
          {/* Healthcare-only */}
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-body-sm font-semibold uppercase tracking-wider text-teal">Purpose-built</span>
              <h2 className="mt-2 text-h2 font-bold text-navy">Healthcare-only</h2>
              <p className="mt-4 text-body-lg text-medium-gray">
                No generic tool knows clinical context. ParityScope recommends metrics
                by clinical domain — diagnosis, risk stratification, treatment
                recommendation — because a calibration slope failure in a sepsis
                predictor isn&apos;t the same problem as one in a dermatology classifier.
              </p>
              <ul className="mt-6 space-y-3">
                {["Metric selection by clinical use-case", "Healthcare-specific proxy detection", "PHI-aware data handling"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-body text-dark-gray">
                    <svg className="h-5 w-5 shrink-0 text-green" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-light-gray bg-white p-8 shadow-card">
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-lg bg-off-white p-4">
                  <div className="h-3 w-3 rounded-full bg-coral" />
                  <span className="text-body-sm text-dark-gray">Generic AI audit tool</span>
                  <span className="ml-auto text-body-sm text-medium-gray">Limited clinical context</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border-2 border-teal/20 bg-teal/5 p-4">
                  <div className="h-3 w-3 rounded-full bg-teal" />
                  <span className="text-body-sm font-medium text-navy">ParityScope</span>
                  <span className="ml-auto text-body-sm text-teal">Built for clinical AI</span>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-jurisdiction */}
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "EU AI Act", status: "Annex III: Dec 2027" },
                  { name: "FDA SaMD Guidance", status: "PCCP filings active" },
                  { name: "NIST AI RMF", status: "Reference framework" },
                  { name: "Section 1557", status: "ACA, enforcement via DOJ" },
                  { name: "Joint Commission / CHAI", status: "Certification Sept 2025" },
                  { name: "South Korea AI Basic Act", status: "Active Jan 2026" },
                  { name: "Taiwan AI Basic Law", status: "Passed Dec 2025" },
                  { name: "MDR / IVDR", status: "Post-market surveillance" },
                ].map((reg) => (
                  <div key={reg.name} className="rounded-xl border border-light-gray bg-white p-5 shadow-card">
                    <h4 className="text-body-sm font-semibold text-navy">{reg.name}</h4>
                    <p className="mt-1 text-caption text-medium-gray">{reg.status}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-body-sm font-semibold uppercase tracking-wider text-teal">Multi-jurisdiction</span>
              <h2 className="mt-2 text-h2 font-bold text-navy">One audit, every framework</h2>
              <p className="mt-4 text-body-lg text-medium-gray">
                EU AI Act, FDA SaMD Guidance, NIST AI RMF, Section 1557, Joint Commission /
                CHAI, South Korea AI Basic Act, Taiwan AI Basic Law. No other tool maps
                healthcare AI to this many frameworks from a single audit run.
              </p>
            </div>
          </div>

          {/* On-premise SDK */}
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-body-sm font-semibold uppercase tracking-wider text-teal">Privacy-first</span>
              <h2 className="mt-2 text-h2 font-bold text-navy">On-premise SDK</h2>
              <p className="mt-4 text-body-lg text-medium-gray">
                Patient data never leaves your environment. Code comes in, data stays
                put. Critical for hospitals and MedTech vendors that cannot ship PHI to
                cloud audit services — and for anyone whose legal team has read a BAA.
              </p>
              <ul className="mt-6 space-y-3">
                {["Install via pip or Docker inside your VPC", "Air-gapped deployment supported", "HIPAA and GDPR compliant by architecture"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-body text-dark-gray">
                    <svg className="h-5 w-5 shrink-0 text-green" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-light-gray bg-white p-8 shadow-card">
              <div className="text-center">
                <div className="mx-auto rounded-xl border-2 border-dashed border-teal/30 bg-teal/5 p-6">
                  <p className="text-body-sm font-semibold text-navy">Your Environment</p>
                  <div className="mt-4 flex items-center justify-center gap-4">
                    <div className="rounded-lg bg-navy p-3">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                      </svg>
                    </div>
                    <span className="text-body-sm text-medium-gray">Your data</span>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 text-teal" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                    </svg>
                  </div>
                  <div className="mt-2 rounded-lg bg-teal p-3">
                    <p className="text-body-sm font-semibold text-white">ParityScope SDK</p>
                  </div>
                  <p className="mt-3 text-caption text-medium-gray">Code comes in. Data stays put.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">How It Works</h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-body-lg text-medium-gray">
            From installation to regulator-ready evidence in four steps.
          </p>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "1",
                title: "Install the SDK",
                description: "Your team installs ParityScope in your environment. pip install, Docker, or air-gapped deployment.",
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                  </svg>
                ),
              },
              {
                number: "2",
                title: "Point to your models",
                description: "Connect to model outputs and demographic data. Works with any ML framework and across vendors.",
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m9.86-2.554a4.5 4.5 0 0 0-1.242-7.244l-4.5-4.5a4.5 4.5 0 0 0-6.364 6.364L4.34 8.87" />
                  </svg>
                ),
              },
              {
                number: "3",
                title: "Run the audit",
                description: "ParityScope selects appropriate fairness metrics based on your jurisdiction, clinical use-case, and risk tier.",
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                  </svg>
                ),
              },
              {
                number: "4",
                title: "Get regulator-ready reports",
                description: "Structured reports mapped to specific regulatory articles. Ready for Notified Bodies, FDA, CHAI certification, or litigation defense.",
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                  </svg>
                ),
              },
            ].map((step) => (
              <div key={step.number} className="relative rounded-xl border border-light-gray bg-white p-8 shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal text-lg font-bold text-white">
                  {step.number}
                </div>
                <div className="mt-4 flex h-10 w-10 items-center justify-center text-teal">
                  {step.icon}
                </div>
                <h3 className="mt-4 text-h4 font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-body-sm text-medium-gray">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-h2 font-bold text-white">
            Audit Your AI Before Someone Else Does
          </h2>
          <p className="mt-4 text-body-lg text-light-gray">
            Start with an expert-led assessment. 90-day paid pilot with 100% credit
            toward full contract.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
            >
              Book an Assessment
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
