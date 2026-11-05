import { siteConfig } from "@/config/site";

/**
 * Server-side JSON-LD helpers (schema.org).
 *
 * Every schema here is emitted as a <script type="application/ld+json"> tag in
 * the server-rendered HTML, so crawlers see it without executing JavaScript.
 */

export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

type JsonLdObject = Record<string, unknown>;

export function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  // Canonical URLs on this site have no trailing slash (except the root).
  const normalized = path.length > 1 ? path.replace(/\/+$/, "") : path;
  return `${siteConfig.url}${normalized === "/" ? "/" : normalized}`;
}

/** Strips markdown / HTML so schema text matches the visible copy. */
export function toPlainText(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`#>]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Compact Organization node used for publisher / provider / author. */
const organizationReference = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: siteConfig.name,
  url: `${siteConfig.url}/`,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl(siteConfig.logo),
  },
};

/**
 * Organization facts.
 *
 * TODO(BCT-03): add verified NAP (address, telephone, email) and `sameAs`
 * social profile URLs here once the canonical business details are confirmed.
 * Do not add unverified values — inconsistent NAP data hurts more than it helps.
 */
export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteConfig.name,
    url: `${siteConfig.url}/`,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.logo),
    },
    description: siteConfig.description,
  };
}

export function websiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    url: `${siteConfig.url}/`,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: organizationReference,
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject | null {
  if (items.length < 2) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

type FaqLike = {
  question?: unknown;
  answer?: unknown;
  q?: unknown;
  a?: unknown;
};

/** Returns null when there are no usable FAQs, so callers can skip rendering. */
export function faqPageSchema(faqs: unknown): JsonLdObject | null {
  if (!Array.isArray(faqs)) return null;

  const mainEntity = (faqs as FaqLike[])
    .map((faq) => ({
      question: toPlainText(faq?.question ?? faq?.q),
      answer: toPlainText(faq?.answer ?? faq?.a),
    }))
    .filter((faq) => faq.question && faq.answer)
    .map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    }));

  if (mainEntity.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

export function serviceSchema({
  name,
  description,
  path,
  serviceType,
  image,
}: {
  name: string;
  description?: string;
  path: string;
  serviceType?: string;
  image?: string;
}): JsonLdObject {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: toPlainText(name),
    ...(description ? { description: toPlainText(description) } : {}),
    url,
    ...(serviceType ? { serviceType } : {}),
    ...(image ? { image: absoluteUrl(image) } : {}),
    provider: organizationReference,
    areaServed: { "@type": "Country", name: "United States" },
  };
}

function toIsoDate(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export function articleSchema({
  type = "Article",
  headline,
  description,
  path,
  image,
  datePublished,
  dateModified,
  author,
}: {
  type?: "Article" | "NewsArticle" | "BlogPosting";
  headline: string;
  description?: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}): JsonLdObject {
  const url = absoluteUrl(path);
  const published = toIsoDate(datePublished);
  const modified = toIsoDate(dateModified) ?? published;
  const authorName = author?.trim();

  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#article`,
    // Google truncates headlines over 110 characters.
    headline: toPlainText(headline).slice(0, 110),
    ...(description ? { description: toPlainText(description) } : {}),
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [absoluteUrl(image || siteConfig.logo)],
    ...(published ? { datePublished: published } : {}),
    ...(modified ? { dateModified: modified } : {}),
    // Bylines on this site are team/company bylines, so the author is an
    // Organization rather than a Person.
    author:
      !authorName || /clickmasters/i.test(authorName)
        ? organizationReference
        : { "@type": "Person", name: authorName },
    publisher: organizationReference,
    inLanguage: "en-US",
  };
}
