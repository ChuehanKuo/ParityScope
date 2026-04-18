export const siteConfig = {
  name: "ParityScope",
  tagline: "Healthcare AI Compliance, Simplified",
  description:
    "ParityScope provides AI fairness auditing, continuous monitoring, and bias mitigation tools purpose-built for healthcare organizations navigating global AI regulations.",
  url: "https://parityscope.com",
  ogImage: "https://parityscope.com/og-image.png",
  creator: "ParityScope",
  keywords: [
    "AI fairness",
    "healthcare AI compliance",
    "bias auditing",
    "EU AI Act",
    "algorithmic fairness",
    "health equity",
    "AI governance",
    "clinical decision support",
    "HIPAA",
    "health AI regulation",
  ],
  links: {
    twitter: "https://twitter.com/parityscope",
    linkedin: "https://linkedin.com/company/parityscope",
    github: "https://github.com/parityscope",
  },
  contact: {
    email: "hello@parityscope.com",
    demoEmail: "demo@parityscope.com",
    supportEmail: "support@parityscope.com",
  },
} as const;

export const navLinks = [
  {
    label: "Product",
    href: "/product",
    children: [
      {
        label: "Overview",
        href: "/product",
        description: "End-to-end AI fairness platform for healthcare",
      },
      {
        label: "Fairness Audit",
        href: "/product/fairness-audit",
        description: "Comprehensive bias detection across protected attributes",
      },
      {
        label: "Continuous Monitoring",
        href: "/product/monitoring",
        description: "Real-time fairness monitoring in production",
      },
      {
        label: "Bias Mitigation",
        href: "/product/mitigation",
        description: "Actionable recommendations and automated fixes",
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "Hospitals & Health Systems",
        href: "/solutions/hospitals",
        description: "Ensure equitable clinical AI across your organization",
      },
      {
        label: "MedTech & Digital Health",
        href: "/solutions/medtech",
        description: "Ship compliant AI products faster",
      },
      {
        label: "EHR Vendors",
        href: "/solutions/ehr-vendors",
        description: "Embed fairness into your platform",
      },
      {
        label: "Government & Payers",
        href: "/solutions/government",
        description: "Meet regulatory mandates with confidence",
      },
    ],
  },
  {
    label: "Regulations",
    href: "/regulations",
    children: [
      {
        label: "EU AI Act",
        href: "/regulations/eu-ai-act",
        description: "High-risk AI compliance for healthcare",
      },
      {
        label: "South Korea AI Act",
        href: "/regulations/south-korea",
        description: "Navigate Korea's AI regulatory framework",
      },
      {
        label: "Taiwan AI Basic Act",
        href: "/regulations/taiwan",
        description: "Comply with Taiwan's emerging AI rules",
      },
      {
        label: "Section 1557",
        href: "/regulations/section-1557",
        description: "US anti-discrimination in healthcare AI",
      },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      {
        label: "Blog",
        href: "/resources/blog",
        description: "Insights on AI fairness and healthcare compliance",
      },
      {
        label: "Case Studies",
        href: "/resources/case-studies",
        description: "Real-world impact stories",
      },
      {
        label: "Whitepapers",
        href: "/resources/whitepapers",
        description: "In-depth research and guides",
      },
      {
        label: "Glossary",
        href: "/resources/glossary",
        description: "AI fairness and compliance terminology",
      },
    ],
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "Our Mission",
        href: "/about/mission",
        description: "Why we're building ParityScope",
      },
      {
        label: "Founder's Note",
        href: "/about/team",
        description: "Our story, what we've built, and what we are not",
      },
      {
        label: "Careers",
        href: "/about/careers",
        description: "Join our team",
      },
    ],
  },
] as const;
