import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

type MetadataType = "website" | "article";

type CreateMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: MetadataType;
  publishedTime?: string;
  authors?: string[];
  keywords?: string[];
  noIndex?: boolean;
};

const TITLE_TOPIC_LIMIT = 45;
const DESCRIPTION_MIN_LENGTH = 70;
const DESCRIPTION_MAX_LENGTH = 155;
const DESCRIPTION_EXTENSION =
  " Explore practical details, options, and key considerations.";
const ROUTE_LABELS: Record<string, string> = {
  calculators: "Calculator",
  comparison: "Compare",
  cost: "Cost",
  faqs: "FAQ",
  glossary: "Glossary",
  hire: "Hire",
  howto: "How-to",
  industries: "Industry",
  locations: "Location",
  news: "News",
  partners: "Partner",
  process: "Process",
  resources: "Resource",
  service: "Service",
  templates: "Template",
  technologies: "Technology",
  tools: "Tool",
};

// Listing filter / pagination URLs, e.g. /tools/category/analytics or
// /service/page/8. They are thin views of the main listing, so they are kept
// out of the index (but links on them are still followed) and out of sitemaps.
const LISTING_FILTER_PATH = /^\/[^/]+\/(?:category|letter|search|page)\/[^/]+/i;

export function isListingFilterPath(path: string) {
  return LISTING_FILTER_PATH.test(normalizePath(path));
}

function normalizePath(path: string) {
  if (!path || path === "/") return "/";

  return path.startsWith("/") ? path : `/${path}`;
}

function absoluteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  return new URL(normalizePath(pathOrUrl), siteConfig.url).toString();
}

function titleWithBrand(title: string, path: string) {
  const topicWithContext = title
    .trim()
    .replace(/\s*(?:\||—|-)\s*clickmasters(?: blockchain technologies)?\s*$/i, "")
    .trim();
  const pageContextMatch = topicWithContext.match(/\s+\|\s+Page \d+ of \d+$/i);
  const pageContext = pageContextMatch?.[0] ?? "";
  const topic = pageContext
    ? topicWithContext.slice(0, -pageContext.length).trimEnd()
    : topicWithContext;
  const routeContext =
    pageContext || !topic || topic.length <= TITLE_TOPIC_LIMIT
      ? topic.toLowerCase() === "blockchain content library"
        ? ROUTE_LABELS[path.split("/").filter(Boolean)[0]] ?? ""
        : ""
      : getRouteContext(path);
  const suffix = `${routeContext ? ` — ${routeContext}` : ""}${pageContext}`;
  const topicLimit = TITLE_TOPIC_LIMIT - suffix.length;
  const shortenedTopic =
    topic.length > topicLimit
      ? `${topic.slice(0, topicLimit - 1).replace(/\s+\S*$/, "").trimEnd()}…`
      : topic;

  return `${shortenedTopic}${suffix} | Clickmasters`;
}

function getRouteContext(path: string) {
  const segments = path.split("/").filter(Boolean);
  const section = segments[0] ?? "";
  const label = ROUTE_LABELS[section] ?? section;
  const stopWords = new Set([
    "and",
    "best",
    "blockchain",
    "case",
    "company",
    "development",
    "for",
    "how",
    "in",
    "our",
    "partner",
    "partners",
    "study",
    "the",
    "to",
    "vs",
    "glossary",
  ]);
  const slugWords = (segments.at(-1) ?? "")
    .split("-")
    .filter((word) => word && !stopWords.has(word));
  const qualifierWords = /^\d{4}$/.test(slugWords.at(-1) ?? "")
    ? slugWords.slice(-3)
    : slugWords.slice(-2);
  const qualifier = qualifierWords.join(" ");

  return [label, qualifier].filter(Boolean).join(" ");
}

function normalizeDescription(description: string) {
  let normalized = description.trim().replace(/\s+/g, " ");
  const pageContextMatch = normalized.match(/\s+Page \d+ of \d+\.$/i);
  const pageContext = pageContextMatch?.[0] ?? "";
  let body = pageContext
    ? normalized.slice(0, -pageContext.length).trimEnd()
    : normalized;

  if (!body) {
    body =
      "Explore blockchain development topics, practical options, and key considerations for planning a project.";
  }

  if (body.length < DESCRIPTION_MIN_LENGTH) {
    body += DESCRIPTION_EXTENSION;
  }

  const availableLength = DESCRIPTION_MAX_LENGTH - pageContext.length;
  if (body.length <= availableLength) {
    return `${body}${pageContext}`;
  }

  const truncated = body
    .slice(0, availableLength - 1)
    .replace(/\s+\S*$/, "")
    .trimEnd();

  return `${truncated}…${pageContext}`;
}

export function createMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.logo,
  type = "website",
  publishedTime,
  authors,
  keywords,
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const fullTitle = titleWithBrand(title, path);
  const metaDescription = normalizeDescription(description);
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const index = !noIndex && !isListingFilterPath(path);
  const follow = !noIndex;

  return {
    title: fullTitle,
    description: metaDescription,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      locale: "en_US",
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: fullTitle,
      description: metaDescription,
      ...(type === "article" ? { publishedTime, authors } : {}),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [imageUrl],
    },
    robots: {
      index,
      follow,
      googleBot: {
        index,
        follow,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
