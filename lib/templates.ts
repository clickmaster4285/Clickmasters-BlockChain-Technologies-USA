import * as templatesData from "@/data/templates";

function resolveTemplatesData() {
  const source = templatesData as Record<string, any>;

  return (
    source.templates ||
    source.templateItems ||
    source.blockchainTemplates ||
    source.resources ||
    source.default ||
    []
  );
}

export function getAllTemplates() {
  const items = resolveTemplatesData();

  return Array.isArray(items) ? items : [];
}

export function getTemplateBySlug(slug: string) {
  return getAllTemplates().find(
    (item: any) => item?.slug === slug
  );
}

export function getRelatedTemplates(
  slug: string,
  limit = 4
) {
  const current = getTemplateBySlug(slug);

  if (!current) return [];

  const currentCategory =
    current.category ||
    current.type ||
    current.group;

  const sameCategory = getAllTemplates().filter(
    (item: any) =>
      item?.slug !== slug &&
      currentCategory &&
      (
        item.category === currentCategory ||
        item.type === currentCategory ||
        item.group === currentCategory
      )
  );

  const remaining = getAllTemplates().filter(
    (item: any) =>
      item?.slug !== slug &&
      !sameCategory.some(
        (related: any) =>
          related.slug === item.slug
      )
  );

  return [...sameCategory, ...remaining].slice(0, limit);
}

export function estimateTemplateReadTime(item: any) {
  if (item?.readTime) return item.readTime;

  const content =
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

        return "";
      })
      .join(" ") || "";

  const text = [
    item?.title,
    item?.excerpt,
    item?.description,
    item?.hero?.description,
    content,
  ]
    .filter(Boolean)
    .join(" ");

  const words = text
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(
    2,
    Math.ceil(words / 220)
  )} min read`;
}

export function getTemplateCTA(item: any) {
  return {
    title:
      item?.cta?.title ||
      "Need a custom version of this template?",

    description:
      item?.cta?.description ||
      "Talk with ClickMasters and get a professionally tailored blockchain template for your project, team, or business requirements.",

    primaryText:
      item?.cta?.primaryText ||
      "Use This Template",

    secondaryText:
      item?.cta?.secondaryText ||
      "Explore More Templates",

    href:
      item?.cta?.primaryHref ||
      item?.cta?.href ||
      "/contact",

    secondaryHref:
      item?.cta?.secondaryHref ||
      "/templates",
  };
}

export function getTemplateCards() {
  return getAllTemplates()
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
        String(item.title || `template-${index + 1}`)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, ""),

      title:
        item.title ||
        item.name ||
        "Blockchain Template",

      excerpt:
        item.excerpt ||
        item.description ||
        item.hero?.description ||
        "A practical blockchain template designed to save planning and documentation time.",

      category:
        item.category ||
        item.type ||
        item.group ||
        "Blockchain Template",

      badge:
        item.hero?.badge ||
        item.badge ||
        "TEMPLATE",

      image:
        item.image,

      format:
        item.format ||
        item.fileType ||
        "Document",

      sections:
        item.sectionsCount ||
        item.sections?.length ||
        item.content?.filter(
          (block: any) =>
            block?.type === "heading"
        ).length ||
        0,

      readTime:
        estimateTemplateReadTime(item),

      featured:
        Boolean(item.featured),

      tags:
        item.tags ||
        item.credibility ||
        [],
    }));
}

export function searchTemplates(query: string) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return getTemplateCards();
  }

  return getTemplateCards().filter(
    (item: any) =>
      item.title
        ?.toLowerCase()
        .includes(normalized) ||
      item.excerpt
        ?.toLowerCase()
        .includes(normalized) ||
      item.category
        ?.toLowerCase()
        .includes(normalized) ||
      item.format
        ?.toLowerCase()
        .includes(normalized) ||
      item.tags?.some((tag: any) =>
        String(tag)
          .toLowerCase()
          .includes(normalized)
      )
  );
}

export function getTemplateCategories() {
  return Array.from(
    new Set(
      getTemplateCards()
        .map((item: any) => item.category)
        .filter(Boolean)
    )
  ).sort();
}

export function getFeaturedTemplates(limit = 3) {
  const cards = getTemplateCards();

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