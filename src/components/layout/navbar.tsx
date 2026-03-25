"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/site-config";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-light-gray bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt={`${siteConfig.name} logo`}
            width={36}
            height={36}
            className="h-9 w-9"
            priority
          />
          <span className="text-xl font-bold text-navy">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() =>
                "children" in link ? setOpenDropdown(link.label) : null
              }
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={link.href}
                className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-dark-gray transition-colors hover:text-navy"
              >
                {link.label}
                {"children" in link && (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
              </Link>

              {/* Dropdown */}
              {"children" in link && openDropdown === link.label && (
                <div className="absolute left-0 top-full w-72 rounded-lg border border-light-gray bg-white p-2 shadow-elevated">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-md px-3 py-2 transition-colors hover:bg-off-white"
                    >
                      <span className="block text-sm font-medium text-navy">
                        {child.label}
                      </span>
                      <span className="block text-xs text-medium-gray">
                        {child.description}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-teal px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-dark sm:inline-flex"
          >
            Book an Assessment
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-dark-gray lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-light-gray bg-white lg:hidden">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-dark-gray hover:bg-off-white hover:text-navy"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
                {"children" in link && (
                  <div className="ml-4 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-1.5 text-sm text-medium-gray hover:text-navy"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Link
                href="/contact"
                className="block w-full rounded-full bg-teal px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-teal-dark"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book an Assessment
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
