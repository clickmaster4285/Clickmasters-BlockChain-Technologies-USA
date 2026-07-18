import { resources } from "@/data/resources";

type ResourceSource = Record<string, any>;

function normalizeResourceImage(image?: string) {
  if (!image || image.startsWith("/assets/")) {
    return "";
  }

  return image;
}

export function getAllResources() {
  return Array.isArray(resources)
    ? (resources as ResourceSource[])
    : [];
}

export function getResourceBySlug(slug: string) {
  return getAllResources().find(
    (item: any) => item?.slug === slug
  );
}

export function estimateResourceReadTime(item: any) {
  if (item?.readTime) {
    return item.readTime;
  }

  const contentText =
    item?.content
      ?.map((block: any) => {
        if (block?.text) return block.text;
        if (block?.description) {
          return block.description;
        }

        if (Array.isArray(block?.items)) {
          return block.items
            .map((entry: any) =>
              typeof entry === "string"
                ? entry
                : [
                    entry?.title,
                    entry?.description,
                    entry?.text,
                  ]
                    .filter(Boolean)
                    .join(" ")
            )
            .join(" ");
        }

        if (Array.isArray(block?.rows)) {
          return block.rows
            .flat()
            .join(" ");
        }

        if (block?.code) {
          return block.code;
        }

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

export function getResourceCards(
  sourceResources: ResourceSource[] = getAllResources()
) {
  return sourceResources
    .filter(
      (item: any) =>
        item &&
        (item.slug || item.title)
    )
    .map((item: any, index: number) => ({
      id: item?.id || index + 1,

      slug:
        item?.slug ||
        String(
          item?.title ||
            `resource-${index + 1}`
        )
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, ""),

      title:
        item?.title ||
        item?.name ||
        "Blockchain Resource",

      excerpt:
        item?.excerpt ||
        item?.description ||
        item?.hero?.description ||
        "Explore this practical blockchain resource from ClickMasters.",

      category:
        item?.category ||
        item?.type ||
        item?.group ||
        "Blockchain Resource",

      badge:
        item?.hero?.badge ||
        item?.badge ||
        "RESOURCE",

      image:
        normalizeResourceImage(item?.image),

      author:
        item?.author ||
        "ClickMasters Team",

      date:
        item?.date ||
        item?.published ||
        "",

      readTime:
        estimateResourceReadTime(item),

      featured:
        Boolean(item?.featured),

      popular:
        Boolean(item?.popular),

      format:
        item?.format ||
        item?.resourceType ||
        item?.type ||
        "Article",

      tags:
        item?.tags ||
        item?.credibility ||
        [],
    }));
}

export function getResourceCategories(
  sourceResources: ResourceSource[] = getAllResources()
) {
  return Array.from(
    new Set(
      getResourceCards(sourceResources)
        .map((item: any) => item.category)
        .filter(Boolean)
    )
  ).sort();
}

export function getFeaturedResources(
  sourceResourcesOrLimit: ResourceSource[] | number = getAllResources(),
  maybeLimit = 3
) {
  const sourceResources = Array.isArray(sourceResourcesOrLimit)
    ? sourceResourcesOrLimit
    : getAllResources();

  const limit = Array.isArray(sourceResourcesOrLimit)
    ? maybeLimit
    : sourceResourcesOrLimit;

  const cards = getResourceCards(sourceResources);

  const featured = cards.filter(
    (item: any) => item.featured
  );

  const remaining = cards.filter(
    (item: any) =>
      !featured.some(
        (featuredItem: any) =>
          featuredItem.slug === item.slug
      )
  );

  return [...featured, ...remaining].slice(
    0,
    limit
  );
}

export function getPopularResources(limit = 6) {
  const cards = getResourceCards();

  const popular = cards.filter(
    (item: any) => item.popular
  );

  const remaining = cards.filter(
    (item: any) =>
      !popular.some(
        (popularItem: any) =>
          popularItem.slug === item.slug
      )
  );

  return [...popular, ...remaining].slice(
    0,
    limit
  );
}

export function getLatestResources(limit = 6) {
  return [...getResourceCards()]
    .sort((a: any, b: any) => {
      const dateA = a.date
        ? new Date(a.date).getTime()
        : 0;

      const dateB = b.date
        ? new Date(b.date).getTime()
        : 0;

      return dateB - dateA;
    })
    .slice(0, limit);
}

export function getRelatedResources(
  slug: string,
  limit = 4
) {
  const current = getResourceBySlug(slug);

  if (!current) return [];

  const currentCategory =
    current?.category ||
    current?.type ||
    current?.group;

  const sameCategory = getAllResources().filter(
    (item: any) =>
      item?.slug !== slug &&
      currentCategory &&
      (
        item?.category === currentCategory ||
        item?.type === currentCategory ||
        item?.group === currentCategory
      )
  );

  const remaining = getAllResources().filter(
    (item: any) =>
      item?.slug !== slug &&
      !sameCategory.some(
        (related: any) =>
          related?.slug === item?.slug
      )
  );

  return [...sameCategory, ...remaining].slice(
    0,
    limit
  );
}

export function searchResources(query: string) {
  const normalized = query
    .trim()
    .toLowerCase();

  if (!normalized) {
    return getResourceCards();
  }

  return getResourceCards().filter(
    (item: any) =>
      item?.title
        ?.toLowerCase()
        .includes(normalized) ||
      item?.excerpt
        ?.toLowerCase()
        .includes(normalized) ||
      item?.category
        ?.toLowerCase()
        .includes(normalized) ||
      item?.format
        ?.toLowerCase()
        .includes(normalized) ||
      item?.tags?.some((tag: any) =>
        String(tag)
          .toLowerCase()
          .includes(normalized)
      )
  );
}

export function getResourceCTA(item: any) {
  return {
    title:
      item?.cta?.title ||
      "Need expert help applying this resource?",

    description:
      item?.cta?.description ||
      "Talk with ClickMasters and turn this guidance into a practical blockchain strategy, architecture, or implementation plan.",

    primaryText:
      item?.cta?.primaryText ||
      "Book a Free Strategy Call",

    secondaryText:
      item?.cta?.secondaryText ||
      "Explore More Resources",

    href:
      item?.cta?.primaryHref ||
      item?.cta?.href ||
      "/contact",

    secondaryHref:
      item?.cta?.secondaryHref ||
      "/resources",
  };
}
