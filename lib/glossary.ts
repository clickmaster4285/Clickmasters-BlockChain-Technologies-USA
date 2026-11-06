import * as glossaryData from "@/data/glossary";
import type { ContentListEntry, GlossaryItem } from "@/lib/content-types";

function resolveGlossaryData() {
  const source = glossaryData as Record<string, unknown>;

  return (
    source.glossary ||
    source.glossaryTerms ||
    source.terms ||
    source.default ||
    []
  );
}

export function getAllGlossaryTerms(): GlossaryItem[] {
  const terms = resolveGlossaryData();

  return Array.isArray(terms) ? terms : [];
}

export function getGlossaryTermBySlug(slug: string) {
  return getAllGlossaryTerms().find(
    (item) => item?.slug === slug
  );
}

export function getRelatedGlossaryTerms(
  slug: string,
  limit = 6
) {
  const currentItem = getGlossaryTermBySlug(slug);

  if (!currentItem) return [];

  const currentCategory =
    currentItem.category ||
    currentItem.group ||
    currentItem.type;

  const sameCategory = getAllGlossaryTerms().filter(
    (item) =>
      item?.slug !== slug &&
      currentCategory &&
      (
        item.category === currentCategory ||
        item.group === currentCategory ||
        item.type === currentCategory
      )
  );

  const remaining = getAllGlossaryTerms().filter(
    (item) =>
      item?.slug !== slug &&
      !sameCategory.some(
        (relatedItem) =>
          relatedItem.slug === item.slug
      )
  );

  return [...sameCategory, ...remaining].slice(0, limit);
}

export function estimateGlossaryReadTime(item: GlossaryItem) {
  if (item?.readTime) {
    return item.readTime;
  }

  const contentText =
    item?.content
      ?.map((block) => {
        if (block?.text) return block.text;

        if (Array.isArray(block?.items)) {
          return block.items
            .map((listItem: ContentListEntry) =>
              typeof listItem === "string"
                ? listItem
                : `${listItem?.title || ""} ${
                    listItem?.description || ""
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
    item?.term,
    item?.definition,
    item?.excerpt,
    item?.description,
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

export function getGlossaryCTA(item: GlossaryItem) {
  return {
    title:
      item?.cta?.title ||
      "Need help applying this blockchain concept?",

    description:
      item?.cta?.description ||
      "Talk with ClickMasters and understand how this concept applies to your product, architecture, or blockchain strategy.",

    primaryText:
      item?.cta?.primaryText ||
      "Book a Free Strategy Call",

    secondaryText:
      item?.cta?.secondaryText ||
      "Explore More Terms",

    href:
      item?.cta?.href &&
      item.cta.href !== "#"
        ? item.cta.href
        : "/contact",
  };
}

export function getGlossaryCards() {
  return getAllGlossaryTerms()
    .filter(
      (item) =>
        item &&
        (
          item.slug ||
          item.title ||
          item.term
        )
    )
    .map((item, index: number) => ({
      id: item.id || index + 1,

      slug:
        item.slug ||
        String(item.term || item.title)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, ""),

      title:
        item.title ||
        item.term ||
        "Blockchain Term",

      term:
        item.term ||
        item.title ||
        "Blockchain Term",

      definition:
        item.definition ||
        item.excerpt ||
        item.description ||
        item.hero?.description ||
        "Explore the meaning and practical use of this blockchain concept.",

      excerpt:
        item.excerpt ||
        item.definition ||
        item.description ||
        item.hero?.description ||
        "Explore the meaning and practical use of this blockchain concept.",

      category:
        item.category ||
        item.group ||
        item.type ||
        "Blockchain Glossary",

      letter:
        (
          item.term ||
          item.title ||
          "#"
        )
          .charAt(0)
          .toUpperCase(),

      readTime:
        estimateGlossaryReadTime(item),

      image:
        item.image,

      badge:
        item.hero?.badge ||
        "GLOSSARY",
    }));
}

export function searchGlossaryTerms(query: string) {
  const normalizedQuery = query
    .trim()
    .toLowerCase();

  if (!normalizedQuery) {
    return getGlossaryCards();
  }

  return getGlossaryCards().filter(
    (item) =>
      item.title
        ?.toLowerCase()
        .includes(normalizedQuery) ||
      item.term
        ?.toLowerCase()
        .includes(normalizedQuery) ||
      item.definition
        ?.toLowerCase()
        .includes(normalizedQuery) ||
      item.category
        ?.toLowerCase()
        .includes(normalizedQuery)
  );
}

export function filterGlossaryByLetter(
  letter: string
) {
  const normalizedLetter =
    letter?.trim().toUpperCase();

  if (
    !normalizedLetter ||
    normalizedLetter === "ALL"
  ) {
    return getGlossaryCards();
  }

  return getGlossaryCards().filter(
    (item) =>
      item.letter === normalizedLetter
  );
}

export function getAvailableGlossaryLetters() {
  return Array.from(
    new Set(
      getGlossaryCards()
        .map((item) => item.letter)
        .filter(
          (letter: string) =>
            /^[A-Z]$/.test(letter)
        )
    )
  ).sort();
}

export type GlossaryCardData = ReturnType<typeof getGlossaryCards>[number];
