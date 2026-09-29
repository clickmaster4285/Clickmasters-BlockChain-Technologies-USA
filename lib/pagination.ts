type PageQueryValue = string | number | null | undefined;

const FILTER_KEYS = ["category", "letter", "search"] as const;

function cleanSegment(value: PageQueryValue) {
  if (value === null || value === undefined) return "";

  const text = String(value).trim();
  if (!text || text.toLowerCase() === "all") return "";

  return encodeURIComponent(text.toLowerCase());
}

export function getPageHref(
  basePath: string,
  page: number,
  query: Record<string, PageQueryValue> = {}
) {
  const parts: string[] = [];

  for (const key of FILTER_KEYS) {
    const segment = cleanSegment(query[key]);
    if (!segment) continue;
    parts.push(key, segment);
  }

  if (page > 1) {
    parts.push("page", String(Math.floor(page)));
  }

  return parts.length ? `${basePath}/${parts.join("/")}` : basePath;
}
