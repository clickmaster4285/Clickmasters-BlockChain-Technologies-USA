// components/cms/cmsContent.ts
// Helpers for reading untrusted CMS section content.

export type Content = Record<string, unknown>;

/** First non-empty string among the given keys (the CMS has legacy aliases). */
export function pick(c: Content, ...keys: string[]): string {
  for (const k of keys) {
    const v = c[k];
    if (typeof v === "string" && v.trim()) return v.trim();
    if (typeof v === "number" && Number.isFinite(v)) return String(v);
  }
  return "";
}

export function items(c: Content): Content[] {
  const v = c.items;
  return Array.isArray(v)
    ? v.filter(
        (i): i is Content => !!i && typeof i === "object" && !Array.isArray(i),
      )
    : [];
}

// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u001f\u007f\s]/g;

/**
 * Links: site-relative paths, #anchors, http(s), mailto, tel. Everything else
 * (javascript:, data:, vbscript:, protocol-relative //host …) becomes "".
 */
export function safeHref(url: string): string {
  const u = (url || "").trim();
  if (!u) return "";
  const probe = u.replace(CONTROL, "");
  if (probe.startsWith("#")) return u;
  if (probe.startsWith("/"))
    return probe.startsWith("//") || probe.includes("\\") ? "" : u;
  if (/^(https?:|mailto:|tel:)/i.test(probe)) return u;
  // Bare relative paths ("contact", "./x") stay site-relative.
  if (!/^[a-z][a-z0-9+.-]*:/i.test(probe) && !probe.includes("\\")) return u;
  return "";
}

/** Images: http(s), site-relative, or data:image/… only. */
export function safeImage(url: string): string {
  const u = (url || "").trim();
  if (!u) return "";
  const probe = u.replace(CONTROL, "");
  if (probe.startsWith("/"))
    return probe.startsWith("//") || probe.includes("\\") ? "" : u;
  if (/^https?:\/\//i.test(probe)) return u;
  if (/^data:image\/(png|jpe?g|gif|webp|avif|svg\+xml);/i.test(probe)) return u;
  return "";
}

export const isExternal = (href: string) => /^https?:\/\//i.test(href);

export type CmsLink = { text: string; link: string };

export function button(
  c: Content,
  prefix: "primary" | "secondary",
): CmsLink | undefined {
  const text = pick(c, `${prefix}Label`, `${prefix}Button`);
  const link = safeHref(pick(c, `${prefix}Url`, `${prefix}Link`));
  return text && link ? { text, link } : undefined;
}

/** "buttonLabel"/"buttonUrl" pair, also used as a fallback primary button. */
export function plainButton(c: Content): CmsLink | undefined {
  const text = pick(c, "buttonLabel", "ctaLabel", "linkLabel");
  const link = safeHref(pick(c, "buttonUrl", "ctaUrl", "url"));
  return text && link ? { text, link } : undefined;
}

/** Splits a heading so its last words can carry the site's gradient accent. */
export function splitHeading(heading: string): { head: string; tail: string } {
  const words = heading.trim().split(/\s+/);
  if (words.length < 3) return { head: heading.trim(), tail: "" };
  const n = words.length >= 5 ? 2 : 1;
  return {
    head: words.slice(0, -n).join(" "),
    tail: words.slice(-n).join(" "),
  };
}
