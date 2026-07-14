import * as toolsData from "@/data/tools";

function resolveToolsData() {
  const source = toolsData as Record<string, any>;

  return (
    source.tools ||
    source.toolItems ||
    source.blockchainTools ||
    source.resources ||
    source.default ||
    []
  );
}

export function getAllTools() {
  const items = resolveToolsData();

  return Array.isArray(items) ? items : [];
}

export function getToolBySlug(slug: string) {
  return getAllTools().find(
    (item: any) => item?.slug === slug
  );
}

export function getRelatedTools(
  slug: string,
  limit = 4
) {
  const currentTool = getToolBySlug(slug);

  if (!currentTool) return [];

  const currentCategory =
    currentTool.category ||
    currentTool.type ||
    currentTool.group;

  const sameCategory = getAllTools().filter(
    (item: any) =>
      item?.slug !== slug &&
      currentCategory &&
      (
        item.category === currentCategory ||
        item.type === currentCategory ||
        item.group === currentCategory
      )
  );

  const remaining = getAllTools().filter(
    (item: any) =>
      item?.slug !== slug &&
      !sameCategory.some(
        (relatedItem: any) =>
          relatedItem.slug === item.slug
      )
  );

  return [...sameCategory, ...remaining].slice(0, limit);
}

export function estimateToolReadTime(item: any) {
  if (item?.readTime) {
    return item.readTime;
  }

  const contentText =
    item?.content
      ?.map((block: any) => {
        if (block?.text) return block.text;
        if (block?.description) return block.description;

        if (Array.isArray(block?.items)) {
          return block.items
            .map((entry: any) =>
              typeof entry === "string"
                ? entry
                : `${entry?.title || ""} ${
                    entry?.description ||
                    entry?.text ||
                    ""
                  }`
            )
            .join(" ");
        }

        if (Array.isArray(block?.rows)) {
          return block.rows.flat().join(" ");
        }

        if (block?.code) return block.code;

        return "";
      })
      .join(" ") || "";

  const fallbackText = [
    item?.title,
    item?.excerpt,
    item?.description,
    item?.hero?.description,
    contentText,
  ]
    .filter(Boolean)
    .join(" ");

  const words = fallbackText
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(
    2,
    Math.ceil(words / 220)
  )} min read`;
}

export function getToolCTA(item: any) {
  return {
    title:
      item?.cta?.title ||
      "Need help using this tool for your project?",

    description:
      item?.cta?.description ||
      "Talk with ClickMasters and get expert guidance tailored to your blockchain product, architecture, timeline, and business goals.",

    primaryText:
      item?.cta?.primaryText ||
      "Book a Free Strategy Call",

    secondaryText:
      item?.cta?.secondaryText ||
      "Explore More Tools",

    href:
      item?.cta?.primaryHref ||
      item?.cta?.href ||
      "/contact",

    secondaryHref:
      item?.cta?.secondaryHref ||
      "/tools",
  };
}

export function getToolCards() {
  return getAllTools()
    .filter(
      (item: any) =>
        item &&
        (
          item.slug ||
          item.title
        )
    )
    .map((item: any, index: number) => ({
      id: item.id || index + 1,

      slug:
        item.slug ||
        String(item.title || `tool-${index + 1}`)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, ""),

      title:
        item.title ||
        item.name ||
        "Blockchain Tool",

      excerpt:
        item.excerpt ||
        item.description ||
        item.hero?.description ||
        "Use this practical blockchain tool to plan, calculate, analyze, or improve your project.",

      category:
        item.category ||
        item.type ||
        item.group ||
        "Blockchain Tool",

      badge:
        item.hero?.badge ||
        item.badge ||
        "TOOL",

      icon:
        item.icon,

      image:
        item.image,

      readTime:
        estimateToolReadTime(item),

      status:
        item.status ||
        "Available",

      featured:
        Boolean(item.featured),

      tags:
        item.tags ||
        item.credibility ||
        [],
    }));
}

export function searchTools(query: string) {
  const normalizedQuery = query
    .trim()
    .toLowerCase();

  if (!normalizedQuery) {
    return getToolCards();
  }

  return getToolCards().filter(
    (item: any) =>
      item.title
        ?.toLowerCase()
        .includes(normalizedQuery) ||
      item.excerpt
        ?.toLowerCase()
        .includes(normalizedQuery) ||
      item.category
        ?.toLowerCase()
        .includes(normalizedQuery) ||
      item.tags?.some((tag: any) =>
        String(tag)
          .toLowerCase()
          .includes(normalizedQuery)
      )
  );
}

export function getToolCategories() {
  return Array.from(
    new Set(
      getToolCards()
        .map((item: any) => item.category)
        .filter(Boolean)
    )
  ).sort();
}

export function filterToolsByCategory(
  category: string
) {
  const normalizedCategory =
    category?.trim().toLowerCase();

  if (
    !normalizedCategory ||
    normalizedCategory === "all"
  ) {
    return getToolCards();
  }

  return getToolCards().filter(
    (item: any) =>
      item.category
        ?.toLowerCase() === normalizedCategory
  );
}

export function getFeaturedTools(limit = 3) {
  const cards = getToolCards();

  const featured = cards.filter(
    (item: any) => item.featured
  );

  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }

  const remaining = cards.filter(
    (item: any) =>
      !featured.some(
        (featuredItem: any) =>
          featuredItem.slug === item.slug
      )
  );

  return [...featured, ...remaining].slice(0, limit);
}