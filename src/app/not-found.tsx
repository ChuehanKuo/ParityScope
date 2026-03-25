import Link from "next/link";

const helpfulLinks = [
  { label: "Product", href: "/product" },
  { label: "Solutions", href: "/solutions" },
  { label: "Regulations", href: "/regulations" },
  { label: "Pricing", href: "/pricing" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-navy px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* 404 display */}
        <p className="text-teal text-[8rem] font-bold leading-none tracking-tight sm:text-[10rem]">
          404
        </p>

        <h1 className="mt-4 text-h1 font-bold leading-tight tracking-tight">
          Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-body-lg text-light-gray">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Action buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-teal px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-dark"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>

        {/* Helpful links */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-body-sm text-medium-gray">
            Maybe one of these pages can help:
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {helpfulLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-teal transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
