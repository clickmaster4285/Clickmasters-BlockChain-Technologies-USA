// lib/cms/erp-edits.ts
// Server-only client for ERP "edited pages" (Part B): published visual edits
// to existing pages on this site (code-owned or created). The browser applies
// the DOM edits (components/cms/ErpPageEdits.tsx) through /api/erp-edits; the
// server only uses the SEO fields (withEditedPageSeo / createPageMetadata).
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { siteConfig } from "@/config/site";
import {
  CMS_ENABLED,
  CMS_REVALIDATE_SECONDS,
  CMS_SITE_DOMAIN,
  absoluteSiteUrl,
  cmsGetJson,
  cmsWarn,
  contentHash,
  isDev,
  obj,
  str,
} from "./config";
import { normalizeEditPath, parseErpSections, type ErpEdit } from "./erp-edits-shared";

export const EDITS_TAG = "erp-edited-pages";
const FAILURE_BACKOFF_MS = 30_000;

// Slugs from the list are used to build the page URL; allow only plain paths.
const SLUG_REGEX = /^\/[a-z0-9\-._~%/]*$/;

export type EditedPageSeo = {
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
};

export type EditedPage = {
  slug: string;
  version: number;
  seo: EditedPageSeo;
  edits: ErpEdit[];
  /** Fingerprint of the edit list; changes on every ERP publish. */
  hash: string;
};

async function fetchEditedPaths(): Promise<string[]> {
  const json = await cmsGetJson("/edited-pages");
  const pages = obj(obj(json).data).pages;
  if (!Array.isArray(pages)) return [];
  const paths = pages.map((p) => normalizeEditPath(str(obj(p).slug))).filter((slug) => SLUG_REGEX.test(slug));
  return [...new Set(paths)];
}

async function fetchEditedPage(slug: string): Promise<EditedPage | null> {
  const path =
    slug === "/"
      ? `/edited-page?slug=${encodeURIComponent("/")}`
      : `/edited-pages/${slug.slice(1).split("/").map(encodeURIComponent).join("/")}`;
  const json = await cmsGetJson(path);
  if (json === null) return null;
  const page = obj(obj(obj(json).data).page);
  const seo = obj(page.seo);
  const edits = parseErpSections(page.sections);
  return {
    slug,
    version: typeof page.version === "number" ? page.version : 0,
    seo: {
      title: str(seo.title),
      metaDescription: str(seo.metaDescription),
      canonicalUrl: str(seo.canonicalUrl),
      robots: str(seo.robots),
      ogTitle: str(seo.ogTitle),
      ogDescription: str(seo.ogDescription),
      ogImage: str(seo.ogImage),
    },
    edits,
    hash: contentHash(edits),
  };
}

const cacheOptions = { revalidate: CMS_REVALIDATE_SECONDS, tags: [EDITS_TAG] };
const fetchEditedPathsCached = isDev
  ? fetchEditedPaths
  : unstable_cache(fetchEditedPaths, ["erp-edited-paths", CMS_SITE_DOMAIN], cacheOptions);
const fetchEditedPageCached = isDev
  ? fetchEditedPage
  : unstable_cache(fetchEditedPage, ["erp-edited-page", CMS_SITE_DOMAIN], cacheOptions);

let lastFailureAt = 0;

// `fresh: true` skips the cache (used by the browser-facing API, so a publish
// shows on the next check). Server metadata keeps the 60s cache.
type FetchOptions = { fresh?: boolean };

/** Normalized paths ("/a/b", home "/") that have published edits. Empty on any error. */
export async function getEditedPaths({ fresh = false }: FetchOptions = {}): Promise<string[]> {
  if (!CMS_ENABLED) return [];
  if (!fresh && Date.now() - lastFailureAt < FAILURE_BACKOFF_MS) return [];
  try {
    return await (fresh ? fetchEditedPaths() : fetchEditedPathsCached());
  } catch (error) {
    if (!fresh) lastFailureAt = Date.now();
    cmsWarn("failed to fetch edited pages list:", error);
    return [];
  }
}

/** Published edits for a URL path, or null. Checks the list first (B1). */
export async function getEditedPage(path: string, { fresh = false }: FetchOptions = {}): Promise<EditedPage | null> {
  const slug = normalizeEditPath(path);
  const paths = await getEditedPaths({ fresh });
  if (!paths.includes(slug)) return null;
  try {
    return await (fresh ? fetchEditedPage(slug) : fetchEditedPageCached(slug));
  } catch (error) {
    cmsWarn(`failed to fetch edited page ${slug}:`, error);
    return null;
  }
}

/** Overlays an edited page's SEO on a route's own metadata. Only set fields replace. */
export async function withEditedPageSeo(path: string, metadata: Metadata): Promise<Metadata> {
  const page = await getEditedPage(path);
  if (!page) return metadata;
  const { seo } = page;
  const rawImage = seo.ogImage;
  const ogImage =
    /^https?:\/\//i.test(rawImage) || (rawImage.startsWith("/") && !rawImage.startsWith("//"))
      ? absoluteSiteUrl(rawImage, siteConfig.url)
      : "";
  const hasOg = Boolean(seo.ogTitle || seo.ogDescription || ogImage || seo.title);
  const canonical = seo.canonicalUrl ? absoluteSiteUrl(seo.canonicalUrl, siteConfig.url) : "";

  return {
    ...metadata,
    ...(seo.title ? { title: seo.title } : {}),
    ...(seo.metaDescription ? { description: seo.metaDescription } : {}),
    ...(seo.robots ? { robots: seo.robots } : {}),
    ...(canonical ? { alternates: { ...metadata.alternates, canonical } } : {}),
    ...(hasOg
      ? {
          openGraph: {
            ...metadata.openGraph,
            ...(canonical ? { url: canonical } : {}),
            ...(seo.ogTitle || seo.title ? { title: seo.ogTitle || seo.title } : {}),
            ...(seo.ogDescription || seo.metaDescription
              ? { description: seo.ogDescription || seo.metaDescription }
              : {}),
            ...(ogImage ? { images: [ogImage] } : {}),
          },
          twitter: {
            ...metadata.twitter,
            ...(seo.ogTitle || seo.title ? { title: seo.ogTitle || seo.title } : {}),
            ...(seo.ogDescription || seo.metaDescription
              ? { description: seo.ogDescription || seo.metaDescription }
              : {}),
            ...(ogImage ? { images: [ogImage] } : {}),
          },
        }
      : {}),
  };
}
