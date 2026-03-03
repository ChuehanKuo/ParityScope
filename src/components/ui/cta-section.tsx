import Link from "next/link";

interface CTASectionProps {
  title: string;
  description: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  theme?: "navy" | "teal";
}

export function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  theme = "navy",
}: CTASectionProps) {
  const bg = theme === "navy" ? "bg-navy" : "bg-teal";

  return (
    <section className={`${bg} px-4 py-section sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-h2 font-bold text-white">{title}</h2>
        <p className="mt-4 text-body-lg text-light-gray">{description}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={primaryCTA.href}
            className="rounded-full bg-teal px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
          >
            {primaryCTA.label}
          </Link>
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className="rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              {secondaryCTA.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
