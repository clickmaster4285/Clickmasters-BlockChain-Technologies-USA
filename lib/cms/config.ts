// lib/cms/config.ts
// Shared server-side configuration + fetch helper for the ERP / Nexus CMS
// public API. Everything comes from env (CMS_API_URL, CMS_SITE_DOMAIN); when
// CMS_API_URL is missing the whole integration is simply switched off.
import { createHash } from "node:crypto";

export const CMS_API_URL = process.env.CMS_API_URL?.trim().replace(/\/+$/, "") || "";
export const CMS_SITE_DOMAIN = process.env.CMS_SITE_DOMAIN?.trim() || "";
export const CMS_ENABLED = Boolean(CMS_API_URL && CMS_SITE_DOMAIN);

/** Seconds cached responses are reused for (spec: ~60s). */
export const CMS_REVALIDATE_SECONDS = 60;
export const CMS_TIMEOUT_MS = 4000;

export const isDev = process.env.NODE_ENV === "development";

/** Dev-only warning. Production stays silent when the ERP is down. */
export function cmsWarn(...args: unknown[]) {
  if (isDev) console.warn("[cms]", ...args);
}

export const cmsBase = () => `${CMS_API_URL}/public/${encodeURIComponent(CMS_SITE_DOMAIN)}`;

/**
 * GET JSON from the ERP. Returns null on 404 ("not found" / site not
 * registered). Throws on network errors, timeouts and other statuses so
 * unstable_cache never stores an outage.
 */
export async function cmsGetJson(path: string): Promise<unknown | null> {
  const url = `${cmsBase()}${path}`;
  const res = await fetch(url, {
    cache: "no-store",
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(CMS_TIMEOUT_MS),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`${url} responded ${res.status}`);
  return res.json();
}

/** Short stable fingerprint of a JSON value, used to detect ERP publishes. */
export function contentHash(value: unknown): string {
  return createHash("sha1").update(JSON.stringify(value ?? null)).digest("hex").slice(0, 16);
}

export const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
export const obj = (v: unknown): Record<string, unknown> =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};

/** Absolute URL on this site for a path, or the URL itself when already absolute http(s). */
export function absoluteSiteUrl(pathOrUrl: string, siteUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return new URL(path, siteUrl).toString();
}
