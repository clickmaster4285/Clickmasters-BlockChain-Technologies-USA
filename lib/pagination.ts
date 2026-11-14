type PageQueryValue = string | number | null | undefined;

const FILTER_KEYS = ["category", "letter", "search"] as const;

export function withPageContext(
  title: string,
  description: string,
  page: number,
  totalPages: number,
) {
  if (page <= 1) {
    return { title, description };
  }

  const context = `Page ${page} of ${totalPages}`;

  return {
    title: `${title} | ${context}`,
    description: `${description} ${context}.`,
  };
}

export function slugifyCategory(value: string) {
  let text = value.trim().toLowerCase();

  try {
    text = decodeURIComponent(text.replace(/\+/g, " ")).trim().toLowerCase();
  } catch {
    text = text.replace(/\+/g, " ");
  }

  return text
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function categoryMatches(categoryName: string, requested: string) {
  const request = requested.trim();
  if (!request) return false;

  return slugifyCategory(categoryName) === slugifyCategory(request);
}

export function resolveListingCategory(
  categories: readonly string[],
  requested: string | null | undefined,
  emptyValue = "All",
) {
  const value = (requested ?? "").trim();
  if (!value || (emptyValue === "All" && value.toLowerCase() === "all")) {
    return emptyValue;
  }

  return (
    categories.find((category) => categoryMatches(category, value)) ?? value
  );
}

function cleanSegment(
  key: (typeof FILTER_KEYS)[number],
  value: PageQueryValue,
) {
  if (value === null || value === undefined) return "";

  const text = String(value).trim();
  if (!text || text.toLowerCase() === "all") return "";

  if (key === "category") return slugifyCategory(text);

  return encodeURIComponent(text.toLowerCase());
}

export function getPageHref(
  basePath: string,
  page: number,
  query: Record<string, PageQueryValue> = {},
) {
  const parts: string[] = [];

  for (const key of FILTER_KEYS) {
    const segment = cleanSegment(key, query[key]);
    if (!segment) continue;
    parts.push(key, segment);
  }

  if (page > 1) {
    parts.push("page", String(Math.floor(page)));
  }

  return parts.length ? `${basePath}/${parts.join("/")}` : basePath;
}
