import { siteConfig } from "@/config/site";
import {
  absoluteUrl,
  toPlainText,
  type JsonLdObject,
} from "@/lib/schema-primitives";
import { resolveSiteImage } from "@/lib/site-image";

/**
 * Server-side JSON-LD helpers (schema.org).
 *
 * Every schema here is emitted as a <script type="application/ld+json"> tag in
 * the server-rendered HTML, so crawlers see it without executing JavaScript.
 *
 * Server-only (images are verified against /public). Client components must
 * import from lib/schema-primitives instead.
 */

export {
  absoluteUrl,
  breadcrumbSchema,
  faqPageSchema,
  toPlainText,
  type BreadcrumbItem,
} from "@/lib/schema-primitives";

export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

const organizationLogo = {
  "@type": "ImageObject",
  url: absoluteUrl(siteConfig.logo),
  width: 256,
  height: 51,
};

const sameAs = siteConfig.sameAs.filter((url) => /^https:\/\//i.test(url));

/** Compact Organization node used for publisher / provider / author. */
const organizationReference = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: siteConfig.name,
  url: `${siteConfig.url}/`,
  logo: organizationLogo,
};

/**
 * Organization facts.
 *
 * TODO(BCT-03): add verified NAP (address, telephone) here and official profile
 * URLs to `siteConfig.sameAs` once the canonical business details are
 * confirmed. Do not add unverified values — inconsistent NAP data hurts more
 * than it helps.
 */
export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: siteConfig.name,
    url: `${siteConfig.url}/`,
    logo: organizationLogo,
    image: absoluteUrl(siteConfig.shareImage.path),
    description: siteConfig.description,
    email: "sales@clickmastersblockchaintechnologies.com",
    ...(sameAs.length > 0 ? { sameAs } : {}),
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
    publisher: { "@id": ORGANIZATION_ID },
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
  const resolvedImage = resolveSiteImage(image);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: toPlainText(name),
    ...(description ? { description: toPlainText(description) } : {}),
    url,
    ...(serviceType ? { serviceType } : {}),
    // Only a page-specific image is meaningful here; skip the generic fallback.
    ...(!resolvedImage.isFallback
      ? { image: absoluteUrl(resolvedImage.path) }
      : {}),
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
    image: [absoluteUrl(resolveSiteImage(image).path)],
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
