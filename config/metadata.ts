import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { TITLE_OVERRIDES } from "@/config/title-overrides";
import { resolveSiteImage } from "@/lib/site-image";

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

const DESCRIPTION_MIN_LENGTH = 70;
const DESCRIPTION_MAX_LENGTH = 155;
const DESCRIPTION_EXTENSION =
  " Explore practical details, options, and key considerations.";

/* -------------------------------------------------------------------------
 * Page titles
 * ----------------------------------------------------------------------- */

const TITLE_BRAND = " | Clickmasters";
/** ~600px — roughly what Google shows before truncating a title. */
const TITLE_MAX = 60;
/** A complete title may run this much longer rather than lose words. */
const TITLE_SOFT_OVERFLOW = 5;
/** Shorter leading phrases ("Case Study") are too generic to stand alone. */
const TITLE_MIN_PREFIX = 18;
/** Max characters of title text given up in order to keep the brand suffix. */
const TITLE_BRAND_TRADE = 6;
/** Natural breakpoints: "A — B", "A: B", "A | B", "A - B". */
const TITLE_BREAK = /(\s[—–|]\s|:\s|\s-\s)/;
/** Weaker breakpoint (list commas), only used when no natural one fits. */
const TITLE_SOFT_BREAK = /(\s[—–|]\s|:\s|\s-\s|,\s)/;
/** Words a shortened title must not end on. */
const TITLE_DANGLING =
  /\s+(?:and|or|for|the|of|in|to|with|a|an|on|at|by|from|vs\.?|while|which|that|where|when|how|why|&|—|–|-|:|\|)$/i;

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

/** Leading prefixes of `topic` that end at a `breakpoint`, longest first. */
function titlePrefixes(topic: string, breakpoint: RegExp) {
  const parts = topic.split(breakpoint);
  const prefixes: string[] = [];
  let accumulated = "";
  for (let i = 0; i < parts.length - 2; i += 2) {
    accumulated += (i ? parts[i - 1] : "") + parts[i];
    prefixes.unshift(accumulated.trim());
  }
  return prefixes;
}

/**
 * Builds the <title> for a page from its own (often long) title.
 *
 * Long titles are shortened at natural breakpoints ("Ethereum Gas Cost
 * Calculator — Estimate Transaction Fees…" → "Ethereum Gas Cost Calculator"),
 * never mid-word and never with an ellipsis. The " | Clickmasters" suffix is
 * kept when it costs little of the title; otherwise the title text wins.
 * Pagination context (" | Page 2 of 6") is always preserved. Pages whose
 * automatic title would collide with another page's use TITLE_OVERRIDES.
 */
export function buildPageTitle(title: string, path: string) {
  const override = TITLE_OVERRIDES[normalizePath(path)];
  if (override) return override;

  let topic = title
    .trim()
    .replace(/^H1:\s*/i, "")
    .replace(/\s*(?:\||—|-)\s*clickmasters(?: blockchain technologies)?\s*$/i, "")
    .trim();
  const page = topic.match(/\s+\|\s+Page \d+ of \d+$/i)?.[0] ?? "";
  if (page) topic = topic.slice(0, -page.length).trimEnd();

  // FAQ-section pages are FAQ pages even when their source title does not say
  // so; labelling them also keeps them distinct from same-topic service pages.
  if (/^\/faqs\/./.test(normalizePath(path)) && !/\bFAQs?\b/i.test(topic)) {
    const [head, ...rest] = topic.split(TITLE_BREAK);
    topic = `${head} FAQ${rest.join("")}`;
  }

  const room = (withBrand: boolean) =>
    TITLE_MAX - page.length - (withBrand ? TITLE_BRAND.length : 0);
  if (topic.length <= room(true)) return `${topic}${page}${TITLE_BRAND}`;

  const hard = titlePrefixes(topic, TITLE_BREAK);
  const soft = titlePrefixes(topic, TITLE_SOFT_BREAK);
  const pick = (list: string[], limit: number) =>
    list.find((p) => p.length >= TITLE_MIN_PREFIX && p.length <= limit);
  const prefixFor = (limit: number) => pick(hard, limit) ?? pick(soft, limit);

  const branded = prefixFor(room(true));

  // Best brand-free option: the complete title, a breakpoint prefix, the
  // specific part after a generic lead-in ("Blockchain News: …"), or as a last
  // resort a cut at a word boundary.
  let bare =
    topic.length <= room(false) + TITLE_SOFT_OVERFLOW
      ? topic
      : prefixFor(room(false));
  if (!bare) {
    const [head, separator, ...rest] = topic.split(TITLE_BREAK);
    const tail = rest.join("").trim();
    if (separator && head.length <= 20 && tail.length >= TITLE_MIN_PREFIX) {
      if (tail.length <= room(true)) return `${tail}${page}${TITLE_BRAND}`;
      if (tail.length <= room(false) + TITLE_SOFT_OVERFLOW) bare = tail;
    }
  }
  if (!bare) {
    bare = topic.slice(0, room(false) + 1).replace(/\s+\S*$/, "");
    while (TITLE_DANGLING.test(bare)) bare = bare.replace(TITLE_DANGLING, "");
    bare = bare.replace(/[,;:\s]+$/, "");
  }

  if (branded && bare.length - branded.length <= TITLE_BRAND_TRADE) {
    return `${branded}${page}${TITLE_BRAND}`;
  }
  return `${bare}${page}`;
}

function normalizeDescription(description: string) {
  const normalized = description.trim().replace(/\s+/g, " ");
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
  image,
  type = "website",
  publishedTime,
  authors,
  keywords,
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const fullTitle = buildPageTitle(title, path);
  const metaDescription = normalizeDescription(description);
  const canonicalUrl = absoluteUrl(path);
  const resolvedImage = resolveSiteImage(image);
  const imageUrl = absoluteUrl(resolvedImage.path);
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
          // Only declare dimensions we actually know (the default share image).
          ...(resolvedImage.width && resolvedImage.height
            ? { width: resolvedImage.width, height: resolvedImage.height }
            : {}),
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
