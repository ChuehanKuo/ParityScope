import Link from "next/link";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

export function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
  const content = (
    <>
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal/10 text-teal">{icon}</div>
      <h3 className="mt-4 text-h4 font-semibold text-navy group-hover:text-teal">{title}</h3>
      <p className="mt-2 text-body text-medium-gray">{description}</p>
      {href && (
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal">
          Learn more
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="group rounded-xl border border-light-gray bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover">
        {content}
      </Link>
    );
  }

  return <div className="rounded-xl border border-light-gray bg-white p-8 shadow-card">{content}</div>;
}
