import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description: string;
  breadcrumb?: { label: string; href: string }[];
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function PageHeader({ title, description, breadcrumb, cta, secondaryCta }: PageHeaderProps) {
  return (
    <section className="bg-navy px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {breadcrumb && (
          <nav className="mb-6 flex items-center gap-2 text-sm text-medium-gray">
            <Link href="/" className="hover:text-teal transition-colors">Home</Link>
            {breadcrumb.map((item) => (
              <span key={item.href} className="flex items-center gap-2">
                <span>/</span>
                <Link href={item.href} className="hover:text-teal transition-colors">{item.label}</Link>
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-h1 font-bold leading-tight tracking-tight lg:text-display">{title}</h1>
        <p className="mt-4 max-w-3xl text-body-lg text-light-gray">{description}</p>
        {(cta || secondaryCta) && (
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            {cta && (
              <Link href={cta.href} className="rounded-full bg-teal px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-teal-dark">
                {cta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className="rounded-full border border-white/30 px-8 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-white/10">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
