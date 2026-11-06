import { siteConfig } from "@/config/site";

/**
 * Client-safe JSON-LD primitives (no Node APIs), shared by server pages and by
 * the few client components that emit schema (breadcrumbs, homepage FAQ).
 * Server-only builders live in lib/structured-data.ts, which re-exports these.
 */

export type JsonLdObject = Record<string, unknown>;

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
