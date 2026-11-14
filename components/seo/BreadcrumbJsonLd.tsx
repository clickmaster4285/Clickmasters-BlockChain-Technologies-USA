"use client";

import { usePathname } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/schema-primitives";

/**
 * Site-wide BreadcrumbList derived from the URL path.
 *
 * This is a client component only so it can read the pathname; it is still
 * rendered on the server, so the JSON-LD is present in the static HTML.
 */

const SECTION_LABELS: Record<string, string> = {
  about: "About",
  calculators: "Calculators",
  "case-studies": "Case Studies",
  comparison: "Comparisons",
  contact: "Contact",
  cost: "Cost Guides",
  faqs: "FAQs",
  glossary: "Glossary",
  hire: "Hire Developers",
  howto: "How-To Guides",
  industries: "Industries",
  listicles: "Listicles",
  locations: "Locations",
  news: "News",
  partners: "Partners",
  process: "Process",
  resources: "Resources",
  service: "Services",
  solution: "Solutions",
  technologies: "Technologies",
  templates: "Templates",
  tools: "Tools",
};

/** Leaf labels that must match a page's visible breadcrumb exactly. */
const PAGE_LABELS: Record<string, string> = {
  "/faqs/blockchain-development-consulting-enterprise":
    "Enterprise blockchain consulting",
  "/service/blockchain-consulting": "Blockchain consulting",
};

// Listing filter / pagination segments, e.g. /service/category/defi/page/2
const FILTER_KEYS = new Set(["category", "letter", "search", "page"]);

const UPPERCASE_WORDS = new Set([
  "ai",
  "api",
  "dao",
  "evm",
  "faq",
  "ico",
  "ido",
  "kyc",
  "aml",
  "l2",
  "mvp",
  "nft",
  "rwa",
  "sdk",
  "seo",
  "sto",
  "ui",
  "ux",
  "usa",
  "uk",
  "uae",
  "zk",
  "p2e",
  "erc",
  "bnb",
  "ipfs",
  "dex",
  "cex",
  "roi",
  "tvl",
  "ceo",
  "cto",
  "sec",
  "eu",
  "cbdc",
]);

const WORD_OVERRIDES: Record<string, string> = {
  defi: "DeFi",
  dapp: "dApp",
  dapps: "dApps",
  nfts: "NFTs",
  faqs: "FAQs",
  daos: "DAOs",
  mica: "MiCA",
  web3: "Web3",
  zkp: "ZKP",
};

function humanize(segment: string) {
  return decodeURIComponent(segment)
    .split("-")
    .filter(Boolean)
    .map((word) => {
      const lower = word.toLowerCase();
      if (WORD_OVERRIDES[lower]) return WORD_OVERRIDES[lower];
      if (UPPERCASE_WORDS.has(lower)) return lower.toUpperCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function stripFilterSegments(segments: string[]) {
  // Filters only appear after the first (section) segment, as key/value pairs.
  if (segments.length < 3) return segments;
  const rest = segments.slice(1);
  if (rest.length % 2 !== 0) return segments;
  for (let i = 0; i < rest.length; i += 2) {
    if (!FILTER_KEYS.has(rest[i].toLowerCase())) return segments;
  }
  return segments.slice(0, 1);
}

export function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = stripFilterSegments(
    pathname.split("?")[0].split("/").filter(Boolean),
  );

  const items: BreadcrumbItem[] = [{ name: "Home", path: "/" }];
  if (segments.length === 0) return items;

  const [section] = segments;
  items.push({
    name: SECTION_LABELS[section] ?? humanize(section),
    path: `/${section}`,
  });

  // Catch-all routes (e.g. /service/resources/x) have no page for the
  // intermediate segments, so link straight from the section to the leaf.
  if (segments.length > 1) {
    const path = `/${segments.join("/")}`;
    items.push({
      name: PAGE_LABELS[path] ?? humanize(segments[segments.length - 1]),
      path,
    });
  }

  return items;
}

export function BreadcrumbJsonLd() {
  const pathname = usePathname() || "/";
  return <JsonLd data={breadcrumbSchema(buildBreadcrumbs(pathname))} />;
}

export default BreadcrumbJsonLd;
