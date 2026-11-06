import fs from "node:fs";
import path from "node:path";

import { siteConfig } from "@/config/site";

/**
 * Resolves an image path for metadata (og:image / twitter:image) and JSON-LD.
 *
 * Much of the content data references images under /assets that were never
 * added to /public. Emitting those paths gives crawlers 404 image URLs, so a
 * site-relative path is only used when the file actually exists; otherwise the
 * site's default share image is returned. Absolute (external) URLs are passed
 * through unchanged.
 *
 * Server-only: it checks the filesystem, so never import it from a "use client"
 * module (the build fails if you do). Pages are statically generated, so this
 * runs at build time and the results are cached per process.
 */

export type ResolvedSiteImage = {
  path: string;
  width?: number;
  height?: number;
  isFallback: boolean;
};

const existsCache = new Map<string, boolean>();

function publicFileExists(sitePath: string) {
  const cached = existsCache.get(sitePath);
  if (cached !== undefined) return cached;

  let exists = false;
  try {
    const clean = decodeURI(sitePath.split(/[?#]/)[0]);
    const publicDir = path.join(process.cwd(), "public");
    const filePath = path.join(publicDir, clean);
    // Guard against path traversal outside /public.
    exists = filePath.startsWith(publicDir) && fs.statSync(filePath).isFile();
  } catch {
    exists = false;
  }

  existsCache.set(sitePath, exists);
  return exists;
}

export function resolveSiteImage(image?: string | null): ResolvedSiteImage {
  const value = typeof image === "string" ? image.trim() : "";

  if (/^https?:\/\//i.test(value)) {
    return { path: value, isFallback: false };
  }

  if (value) {
    const sitePath = value.startsWith("/") ? value : `/${value}`;
    if (publicFileExists(sitePath)) {
      return { path: sitePath, isFallback: false };
    }
  }

  const { path: fallbackPath, width, height } = siteConfig.shareImage;
  return { path: fallbackPath, width, height, isFallback: true };
}
