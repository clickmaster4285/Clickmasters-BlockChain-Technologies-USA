// lib/cms/cms.ts
// Server-only client for pages *created* in the ERP / Nexus CMS (Part A).
// The public API only returns published snapshots. Every function returns an
// empty/null result when the ERP is unreachable, so the site keeps working.
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { createMetadata } from "@/config/metadata";
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

export const CMS_PAGE_TAG = "cms-page";
export const CMS_SITE_TAG = "cms-site";

// Normalized slug: "/segment" or "/nested/segment", lowercase.
const SLUG_REGEX = /^(\/[a-z0-9][a-z0-9._~-]*)+$/;
const HEX_COLOR = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

export type CmsSection = {
  id: string;
  type: string;
  order: number;
  content: Record<string, unknown>;
  settings: Record<string, unknown>;
};

export type CmsSeo = {
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  focusKeyword: string;
  twitterHandle: string;
};

export type CmsPostSummary = {
  title: string;
  url: string;
  pageType: string;
  excerpt: string;
  image: string;
  publishedAt: string;
};

export type CmsNavItem = {
  id: string;
  label: string;
  url: string;
  order: number;
  target: string;
  children: CmsNavItem[];
};

export type CmsNavigation = { header: CmsNavItem[]; footer: CmsNavItem[] };
export type CmsColors = { primary: string; secondary: string };

export type CmsPage = {
  title: string;
  slug: string;
  pageType: string;
  featuredImage: string;
  sections: CmsSection[];
  seo: CmsSeo;
  colors: CmsColors;
  posts: CmsPostSummary[];
  customCss: string;
  customHtml: string;
  noindex: boolean;
  publishedAt: string;
  /** Fingerprint of the published snapshot; changes on every ERP publish. */
  hash: string;
};

export type CmsSite = {
  name: string;
  logo: string;
  favicon: string;
  colors: CmsColors;
  navigation: CmsNavigation;
};

export type CmsPageListItem = {
  title: string;
  slug: string;
  pageType: string;
  publishedAt: string;
  noindex: boolean;
};

/* ------------------------------ slugs ------------------------------ */

/** URL path → CMS slug: decoded, lowercase, no leading/trailing slash noise, home "/". */
export function normalizeCmsSlug(input: string): string {
  let path = (input || "").split(/[?#]/)[0];
  try {
    path = decodeURIComponent(path);
  } catch {
    // keep raw
  }
  path = path.trim().toLowerCase().replace(/\/{2,}/g, "/").replace(/^\/+|\/+$/g, "");
  return `/${path}`;
}

function pageApiPath(slug: string) {
  // Home is "/pages/"; others "/pages/a/b" (segments encoded, no leading slash after /pages/).
  if (slug === "/") return "/pages/";
  return `/pages/${slug.slice(1).split("/").map(encodeURIComponent).join("/")}`;
}

/* ------------------------------ fetchers ------------------------------ */

async function fetchCmsPage(slug: string): Promise<CmsPage | null> {
  const json = await cmsGetJson(pageApiPath(slug));
  if (json === null) return null;
  const page = parsePage(obj(obj(json).data).page);
  if (!page) throw new Error(`invalid page payload for ${slug}`);
  return page;
}

async function fetchCmsSite(): Promise<CmsSite | null> {
  const json = await cmsGetJson("");
  if (json === null) return null;
  return parseSite(obj(obj(json).data));
}

async function fetchCmsPageList(): Promise<CmsPageListItem[]> {
  const json = await cmsGetJson("/pages");
  const pages = obj(obj(json).data).pages;
  if (!Array.isArray(pages)) return [];
  return pages.map(obj).map((p) => ({
    title: str(p.title),
    slug: normalizeCmsSlug(str(p.slug)),
    pageType: str(p.pageType),
    publishedAt: str(p.publishedAt),
    noindex: p.noindex === true,
  }));
}

// unstable_cache (not fetch's cache) so 404s are cached too; thrown errors
// (outages) are never cached. Bypassed in development.
const opts = (tag: string) => ({ revalidate: CMS_REVALIDATE_SECONDS, tags: [tag] });
const fetchCmsPageCached = isDev
  ? fetchCmsPage
  : unstable_cache(fetchCmsPage, ["cms-page", CMS_SITE_DOMAIN], opts(CMS_PAGE_TAG));
const fetchCmsSiteCached = isDev
  ? fetchCmsSite
  : unstable_cache(fetchCmsSite, ["cms-site", CMS_SITE_DOMAIN], opts(CMS_SITE_TAG));
const fetchCmsPageListCached = isDev
  ? fetchCmsPageList
  : unstable_cache(fetchCmsPageList, ["cms-page-list", CMS_SITE_DOMAIN], opts(CMS_PAGE_TAG));

// After a failure, skip the ERP for a while so builds and renders stay fast.
const FAILURE_BACKOFF_MS = 30_000;
let lastFailureAt = 0;

async function guarded<T>(label: string, fallback: T, run: () => Promise<T>, fresh = false): Promise<T> {
  if (!CMS_ENABLED) return fallback;
  if (!fresh && Date.now() - lastFailureAt < FAILURE_BACKOFF_MS) return fallback;
  try {
    return await run();
  } catch (error) {
    if (!fresh) lastFailureAt = Date.now();
    cmsWarn(`failed to load ${label}:`, error);
    return fallback;
  }
}

/** One published page, or null (not found / not published / ERP down). */
export function getCmsPage(path: string, { fresh = false } = {}): Promise<CmsPage | null> {
  const slug = normalizeCmsSlug(path);
  if (slug !== "/" && !SLUG_REGEX.test(slug)) return Promise.resolve(null);
  return guarded(`page ${slug}`, null, () => (fresh ? fetchCmsPage(slug) : fetchCmsPageCached(slug)), fresh);
}

/** Site info + navigation, or null. */
export function getCmsSite(): Promise<CmsSite | null> {
  return guarded("site", null, () => fetchCmsSiteCached());
}

/** Published created pages (for sitemaps etc.). */
export function getCmsPageList(): Promise<CmsPageListItem[]> {
  return guarded("page list", [], () => fetchCmsPageListCached());
}

/* ------------------------------ metadata ------------------------------ */

const HANDLE = /^@?[A-Za-z0-9_]{1,15}$/;

/** Server-rendered SEO for a created page (A7). ERP values win; site defaults fill gaps. */
export function buildCmsMetadata(page: CmsPage | null): Metadata {
  if (!page) return { title: "Page Not Found", robots: { index: false, follow: false } };
  const { seo } = page;
  const noindex = page.noindex || /noindex/i.test(seo.robots);
  const image = seo.ogImage || page.featuredImage;
  const safeImage = /^https?:\/\//i.test(image) || (image.startsWith("/") && !image.startsWith("//")) ? image : "";

  const base = createMetadata({
    title: page.title || seo.title || siteConfig.name,
    description: seo.metaDescription || seo.ogDescription || page.title,
    path: page.slug,
    image: safeImage || undefined,
    type: page.pageType === "blog" ? "article" : "website",
    keywords: seo.focusKeyword ? [seo.focusKeyword] : undefined,
    noIndex: noindex,
  });

  const title = seo.title || (base.title as string);
  const description = seo.metaDescription || (base.description as string);
  const canonical = absoluteSiteUrl(seo.canonicalUrl || page.slug, siteConfig.url);
  const ogImage = safeImage ? absoluteSiteUrl(safeImage, siteConfig.url) : undefined;
  const handle = HANDLE.test(seo.twitterHandle) ? `@${seo.twitterHandle.replace(/^@/, "")}` : undefined;

  return {
    ...base,
    title,
    description,
    alternates: { canonical },
    robots: noindex ? (/noindex/i.test(seo.robots) ? seo.robots : "noindex, follow") : seo.robots || base.robots,
    openGraph: {
      ...base.openGraph,
      url: canonical,
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: {
      ...base.twitter,
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      ...(ogImage ? { images: [ogImage] } : {}),
      ...(handle ? { site: handle, creator: handle } : {}),
    },
  };
}

/* ------------------------- defensive parsing ------------------------- */
// ERP content is untrusted data: only copy known fields of the right type.

function parseColors(raw: unknown, fallback: Record<string, unknown> = {}): CmsColors {
  const c = obj(raw);
  const pick = (v: unknown) => (HEX_COLOR.test(str(v)) ? str(v) : "");
  return {
    primary: pick(c.primary) || pick(fallback.primaryColor),
    secondary: pick(c.secondary) || pick(fallback.secondaryColor),
  };
}

function parseNav(raw: unknown, depth = 0): CmsNavItem[] {
  if (!Array.isArray(raw) || depth > 2) return [];
  return raw
    .map(obj)
    .map((n, i) => ({
      id: str(n.id) || `nav-${depth}-${i}`,
      label: str(n.label),
      url: str(n.url),
      order: typeof n.order === "number" ? n.order : i,
      target: str(n.target) === "_blank" ? "_blank" : "",
      children: parseNav(n.children, depth + 1),
    }))
    .filter((n) => n.label)
    .sort((a, b) => a.order - b.order);
}

function parseSite(data: Record<string, unknown>): CmsSite {
  const website = obj(data.website);
  const nav = obj(data.navigation);
  return {
    name: str(website.name),
    logo: str(website.logo),
    favicon: str(website.favicon),
    colors: parseColors(obj(data.design).colors, website),
    navigation: { header: parseNav(nav.header), footer: parseNav(nav.footer) },
  };
}

function parsePage(raw: unknown): CmsPage | null {
  const p = obj(raw);
  if (!str(p.slug) || !Array.isArray(p.sections)) return null;
  const seo = obj(p.seo);
  const posts = obj(p.context).posts;
  const code = obj(p.customCode);
  const sectionDefaults = obj(obj(p.design).sectionDefaults);
  return {
    title: str(p.title),
    slug: normalizeCmsSlug(str(p.slug)),
    pageType: str(p.pageType),
    featuredImage: str(p.featuredImage),
    sections: p.sections
      .map(obj)
      .filter((s) => str(s.type) && s.hidden !== true)
      .map((s, i) => ({
        id: str(s.id) || `section-${i}`,
        type: str(s.type),
        order: typeof s.order === "number" ? s.order : i,
        content: obj(s.content),
        settings: { ...obj(sectionDefaults[str(s.type)]), ...obj(s.settings) },
      }))
      .sort((a, b) => a.order - b.order),
    seo: {
      title: str(seo.title),
      metaDescription: str(seo.metaDescription),
      canonicalUrl: str(seo.canonicalUrl),
      robots: str(seo.robots),
      ogTitle: str(seo.ogTitle),
      ogDescription: str(seo.ogDescription),
      ogImage: str(seo.ogImage),
      focusKeyword: str(seo.focusKeyword),
      twitterHandle: str(seo.twitterHandle),
    },
    colors: parseColors(obj(p.design).colors),
    posts: (Array.isArray(posts) ? posts : []).map(obj).map((post) => ({
      title: str(post.title),
      url: str(post.url),
      pageType: str(post.pageType),
      excerpt: str(post.excerpt),
      image: str(post.image),
      publishedAt: str(post.publishedAt),
    })),
    customCss: typeof code.css === "string" ? code.css : "",
    customHtml: typeof code.html === "string" ? code.html : "",
    noindex: p.noindex === true,
    publishedAt: str(p.publishedAt),
    hash: contentHash(raw),
  };
}
