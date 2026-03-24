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
              Make Healthcare AI Fair{" "}
              <span className="text-teal">for Every Patient</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-body-lg text-light-gray">
              Audit clinical AI for bias. Generate compliance reports. Meet EU AI Act
              requirements — before enforcement begins.
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
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-8">
            <span className="text-body-sm text-medium-gray">Mapping to:</span>
            {["EU AI Act", "South Korea AI Framework Act", "Taiwan AI Basic Law", "Section 1557"].map((reg) => (
              <span key={reg} className="text-body-sm font-medium text-light-gray">{reg}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem — Bias Stats */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            Healthcare AI Is Systematically Biased
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-body-lg text-medium-gray">
            Clinical algorithms affect millions of patients daily. Without proper
            auditing, biased AI perpetuates health disparities and creates regulatory risk.
          </p>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { stat: "200M+", description: "patients affected by racially biased Optum algorithm that systematically deprioritized Black patients", source: "Science, 2019", color: "coral" as const },
              { stat: "29%", description: "accuracy drop on dark skin tones in dermatology AI compared to light skin tones", source: "Science Advances, 2021", color: "coral" as const },
              { stat: "67%", description: "of sepsis cases missed by Epic's prediction model, disproportionately affecting minority patients", source: "JAMA Internal Medicine, 2021", color: "coral" as const },
            ].map((item) => (
              <div key={item.stat} className={`rounded-xl border-2 border-${item.color}/20 bg-white p-8 shadow-card`}>
                <div className={`text-h1 font-bold text-${item.color}`}>{item.stat}</div>
                <p className="mt-2 text-body text-dark-gray">{item.description}</p>
                <p className="mt-3 text-caption text-medium-gray">{item.source}</p>
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
                  <div className="text-display font-bold text-navy">84%</div>
                  <p className="text-body text-medium-gray">have AI governance committees</p>
                </div>
                <div className="text-h2 font-bold text-medium-gray">vs</div>
                <div>
                  <div className="text-display font-bold text-coral">16%</div>
                  <p className="text-body text-medium-gray">have governance frameworks</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-h2 font-bold text-navy">The Governance Gap</h2>
              <p className="mt-4 text-body-lg text-medium-gray">
                Most healthcare organizations have created AI governance committees —
                but few have implemented the tools and processes to actually audit their AI
                systems. The gap between intention and action is where patient harm occurs.
              </p>
              <Link
                href="/regulations/eu-ai-act"
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

      {/* What ParityScope Does */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">
            What ParityScope Does
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-body-lg text-medium-gray">
            From pre-deployment audit to continuous production monitoring,
            ParityScope covers the full AI fairness lifecycle.
          </p>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Fairness Audit",
                href: "/product/fairness-audit",
                description: "Evaluate models across patient demographics with 15+ fairness metrics. Generate compliance-ready reports for regulatory submissions.",
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                  </svg>
                ),
              },
              {
                title: "Continuous Monitoring",
                href: "/product/monitoring",
                description: "Track fairness metrics as data distributions shift. Get alerts when thresholds are breached before harm occurs.",
                icon: (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                  </svg>
                ),
              },
              {
                title: "Bias Mitigation",
                href: "/product/mitigation",
                description: "Preview the impact of interventions before deploying them. Automated recommendations with zero accuracy cost.",
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
      <section className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-24">
          {/* Healthcare-Only */}
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-body-sm font-semibold uppercase tracking-wider text-teal">Purpose-Built</span>
              <h2 className="mt-2 text-h2 font-bold text-navy">Healthcare-Only</h2>
              <p className="mt-4 text-body-lg text-medium-gray">
                Not a generic AI governance tool. ParityScope is purpose-built for
                clinical AI — from risk stratification models to diagnostic algorithms.
                Every metric, every report template, every compliance mapping is designed
                for the unique regulatory and ethical landscape of healthcare.
              </p>
              <ul className="mt-6 space-y-3">
                {["Clinical AI-specific fairness metrics", "Healthcare regulatory compliance mapping", "HIPAA-aligned data handling"].map((item) => (
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
                  <span className="ml-auto text-body-sm text-medium-gray">Limited healthcare context</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border-2 border-teal/20 bg-teal/5 p-4">
                  <div className="h-3 w-3 rounded-full bg-teal" />
                  <span className="text-body-sm font-medium text-navy">ParityScope</span>
                  <span className="ml-auto text-body-sm text-teal">Built for clinical AI</span>
                </div>
              </div>
            </div>
          </div>

          {/* Regulation-Aware */}
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { flag: "🇪🇺", name: "EU AI Act", status: "Enforcing 2026–2028" },
                  { flag: "🇰🇷", name: "South Korea", status: "Active Jan 2026" },
                  { flag: "🇹🇼", name: "Taiwan", status: "Passed Dec 2025" },
                  { flag: "🇺🇸", name: "Section 1557", status: "Active" },
                ].map((reg) => (
                  <div key={reg.name} className="rounded-xl border border-light-gray bg-white p-5 shadow-card">
                    <span className="text-2xl">{reg.flag}</span>
                    <h4 className="mt-2 text-body-sm font-semibold text-navy">{reg.name}</h4>
                    <p className="mt-1 text-caption text-medium-gray">{reg.status}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-body-sm font-semibold uppercase tracking-wider text-teal">Multi-Jurisdiction</span>
              <h2 className="mt-2 text-h2 font-bold text-navy">Regulation-Aware</h2>
              <p className="mt-4 text-body-lg text-medium-gray">
                Proprietary knowledge base maps fairness metrics directly to regulatory
                articles. Tell us where you are deploying and what you are evaluating —
                ParityScope automatically selects the right metrics and generates
                compliance documentation for each jurisdiction.
              </p>
            </div>
          </div>

          {/* Your Data Stays with You */}
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-body-sm font-semibold uppercase tracking-wider text-teal">Privacy-First</span>
              <h2 className="mt-2 text-h2 font-bold text-navy">Your Data Stays with You</h2>
              <p className="mt-4 text-body-lg text-medium-gray">
                SDK-first architecture means patient data never leaves your organization.
                Install ParityScope inside your environment — the code comes to you, not
                your data to us. This solves the #1 privacy barrier that blocks
                cloud-based governance tools in healthcare.
              </p>
              <ul className="mt-6 space-y-3">
                {["Patient data never transmitted externally", "On-premise or private cloud deployment", "HIPAA and GDPR compliant by architecture"].map((item) => (
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

      {/* Regulatory Timeline */}
      <section className="px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-h2 font-bold text-navy">The Compliance Clock Is Ticking</h2>
              <p className="mt-4 text-body-lg text-medium-gray">
                AI regulations are moving from proposal to enforcement. Healthcare
                organizations that wait risk penalties, reputational damage, and most
                importantly — patient harm.
              </p>
              <div className="mt-8 rounded-xl border-2 border-coral/20 bg-coral/5 p-6">
                <p className="text-h4 font-bold text-coral">Up to €35M</p>
                <p className="mt-1 text-body text-dark-gray">or 7% of global annual turnover for EU AI Act non-compliance</p>
              </div>
              <Link
                href="/contact"
                className="mt-8 inline-flex rounded-full bg-teal px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
              >
                Assess Your Readiness
              </Link>
            </div>
            <div className="space-y-0">
              {[
                { date: "December 2025", title: "Taiwan AI Basic Law", description: "Passed by Legislative Yuan, establishing AI governance framework with fairness requirements.", status: "past" as const },
                { date: "January 2026", title: "South Korea AI Framework Act", description: "Active enforcement begins. High-risk AI systems in healthcare require bias auditing.", status: "past" as const },
                { date: "August 2026", title: "EU AI Act — Prohibited AI", description: "Enforcement of prohibited AI practices begins. Social scoring and manipulative AI banned.", status: "upcoming" as const },
                { date: "August 2027", title: "EU AI Act — High-Risk AI", description: "Full compliance required for high-risk AI systems, including clinical decision support.", status: "upcoming" as const },
              ].map((item) => (
                <div key={item.date} className="relative flex gap-6 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className={`mt-1 h-4 w-4 shrink-0 rounded-full ${item.status === "past" ? "bg-medium-gray" : item.status === "upcoming" ? "bg-teal" : "bg-coral animate-pulse"}`} />
                    <div className="w-px flex-1 bg-light-gray" />
                  </div>
                  <div className="pb-2">
                    <span className="text-body-sm font-medium text-teal">{item.date}</span>
                    <h4 className="mt-1 text-h4 font-semibold text-navy">{item.title}</h4>
                    <p className="mt-1 text-body text-medium-gray">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-off-white px-4 py-section sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-h2 font-bold text-navy">How It Works</h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-body-lg text-medium-gray">
            Get from installation to compliance report in four steps.
          </p>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { number: "1", title: "Install the SDK", description: "Your team installs ParityScope in your environment. pip install, Docker, or air-gapped deployment.", icon: (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                </svg>
              )},
              { number: "2", title: "Point to Your Models", description: "Connect to AI model outputs and patient demographic data. Works with any ML framework.", icon: (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m9.86-2.554a4.5 4.5 0 0 0-1.242-7.244l-4.5-4.5a4.5 4.5 0 0 0-6.364 6.364L4.34 8.87" />
                </svg>
              )},
              { number: "3", title: "Run the Audit", description: "ParityScope selects appropriate fairness metrics based on your regulatory jurisdiction and use case.", icon: (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
              )},
              { number: "4", title: "Get Compliance Reports", description: "Structured reports mapping to specific regulation articles. Ready for regulatory submission.", icon: (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              )},
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
            Ready to Audit Your Healthcare AI?
          </h2>
          <p className="mt-4 text-body-lg text-light-gray">
            Start with an expert assessment. 90-day pilot with clear success
            metrics — 100% of pilot fees credited toward full contract.
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
