type PageQueryValue = string | number | null | undefined;

export function getPageHref(
  basePath: string,
  page: number,
  query: Record<string, PageQueryValue> = {}
) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      return;
    }

    params.set(key, String(value));
  });

  if (page > 1) {
    params.set("page", String(page));
  }

  const queryString = params.toString();

  return queryString ? `${basePath}?${queryString}` : basePath;
}
