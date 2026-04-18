import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const footerLinks = {
  Product: [
    { label: "Overview", href: "/product" },
    { label: "Fairness Audit", href: "/product/fairness-audit" },
    { label: "Monitoring", href: "/product/monitoring" },
    { label: "Mitigation", href: "/product/mitigation" },
    { label: "Pricing", href: "/pricing" },
  ],
  Solutions: [
    { label: "Hospitals", href: "/solutions/hospitals" },
    { label: "MedTech", href: "/solutions/medtech" },
    { label: "EHR Vendors", href: "/solutions/ehr-vendors" },
    { label: "Government", href: "/solutions/government" },
  ],
  Regulations: [
    { label: "EU AI Act", href: "/regulations/eu-ai-act" },
    { label: "South Korea", href: "/regulations/south-korea" },
    { label: "Taiwan", href: "/regulations/taiwan" },
    { label: "Section 1557", href: "/regulations/section-1557" },
  ],
  Resources: [
    { label: "Blog", href: "/resources/blog" },
    { label: "Case Studies", href: "/resources/case-studies" },
    { label: "Whitepapers", href: "/resources/whitepapers" },
    { label: "Glossary", href: "/resources/glossary" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Founder's Note", href: "/about/team" },
    { label: "Mission", href: "/about/mission" },
    { label: "Careers", href: "/about/careers" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-light-gray bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt={`${siteConfig.name} logo`}
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-3 text-sm text-light-gray">
              {siteConfig.tagline}
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-medium-gray transition-colors hover:text-teal"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-medium-gray transition-colors hover:text-teal"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-medium-gray transition-colors hover:text-teal"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white">{category}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-medium-gray transition-colors hover:text-teal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-navy-light pt-8 sm:flex-row">
          <p className="text-sm text-medium-gray">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-medium-gray transition-colors hover:text-teal"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-medium-gray transition-colors hover:text-teal"
            >
              Terms of Service
            </Link>
            <Link
              href="/imprint"
              className="text-sm text-medium-gray transition-colors hover:text-teal"
            >
              Imprint
            </Link>
            <Link
              href="/security"
              className="text-sm text-medium-gray transition-colors hover:text-teal"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
