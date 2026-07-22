import industriesData from "@/data/industries";

/* =========================================================
   Industry Content Types
========================================================= */

export interface IndustryFeaturedAnswerBlock {
  type: "featuredAnswer";
  text: string;
}

export interface IndustryHeadingBlock {
  type: "heading";
  text: string;
}

export interface IndustryParagraphBlock {
  type: "paragraph";
  text: string;
}

export interface IndustryListBlock {
  type: "list";
  items: string[];
}

export interface IndustryTableBlock {
  type: "table";
  headers: string[];
  rows: string[][];
}

export type IndustryContentBlock =
  | IndustryFeaturedAnswerBlock
  | IndustryHeadingBlock
  | IndustryParagraphBlock
  | IndustryListBlock
  | IndustryTableBlock;

/* =========================================================
   Industry Page Types
========================================================= */

export interface IndustryHero {
  badge: string;
  title: string;
  description: string;
}

export interface IndustryFaq {
  question: string;
  answer: string;
}

export interface IndustryCta {
  title: string;
  description: string;
  primaryText: string;
  secondaryText: string;
}

export interface IndustryPage {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: "Industry";
  author: string;
  date: string;
  readTime: string;
  image: string;
  hero: IndustryHero;
  credibility: string[];
  content: IndustryContentBlock[];
  faqs: IndustryFaq[];
  cta: IndustryCta;
}

/* =========================================================
   Industry Card Types
========================================================= */

export interface IndustryCardData {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: "Industry";
  badge: string;
  image: string;
  readTime: string;
  date: string;
  author: string;
  credibility: string[];
}

export interface IndustryPageParams {
  slug: string;
}

export interface IndustryPageProps {
  params: Promise<IndustryPageParams>;
}

/* =========================================================
   Internal Utility Types
========================================================= */

type UnknownRecord = Record<string, unknown>;

/* =========================================================
   String Helpers
========================================================= */

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeIndustrySlug(slug: string): string {
  if (!slug) {
    return "";
  }

  try {
    return decodeURIComponent(slug)
      .trim()
      .toLowerCase()
      .replace(/^\/+|\/+$/g, "");
  } catch {
    return slug
      .trim()
      .toLowerCase()
      .replace(/^\/+|\/+$/g, "");
  }
}

function normalizeStringArray(values: string[]): string[] {
  return Array.from(
    new Set(
      values
        .map((value) => normalizeString(value))
        .filter(Boolean)
    )
  );
}

/* =========================================================
   Type Guards
========================================================= */

function isRecord(value: unknown): value is UnknownRecord {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((item) => typeof item === "string")
  );
}

function isStringMatrix(value: unknown): value is string[][] {
  return (
    Array.isArray(value) &&
    value.every((row) => isStringArray(row))
  );
}

function isIndustryContentBlock(
  value: unknown
): value is IndustryContentBlock {
  if (!isRecord(value)) {
    return false;
  }

  switch (value.type) {
    case "featuredAnswer":
    case "heading":
    case "paragraph":
      return typeof value.text === "string";

    case "list":
      return isStringArray(value.items);

    case "table":
      return (
        isStringArray(value.headers) &&
        isStringMatrix(value.rows)
      );

    default:
      return false;
  }
}

function isIndustryHero(
  value: unknown
): value is IndustryHero {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.badge === "string" &&
    typeof value.title === "string" &&
    typeof value.description === "string"
  );
}

function isIndustryFaq(
  value: unknown
): value is IndustryFaq {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.question === "string" &&
    typeof value.answer === "string"
  );
}

function isIndustryCta(
  value: unknown
): value is IndustryCta {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.primaryText === "string" &&
    typeof value.secondaryText === "string"
  );
}

function isIndustryPage(
  value: unknown
): value is IndustryPage {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "number" &&
    Number.isFinite(value.id) &&
    typeof value.slug === "string" &&
    typeof value.title === "string" &&
    typeof value.excerpt === "string" &&
    value.category === "Industry" &&
    typeof value.author === "string" &&
    typeof value.date === "string" &&
    typeof value.readTime === "string" &&
    typeof value.image === "string" &&
    isIndustryHero(value.hero) &&
    isStringArray(value.credibility) &&
    Array.isArray(value.content) &&
    value.content.every(isIndustryContentBlock) &&
    Array.isArray(value.faqs) &&
    value.faqs.every(isIndustryFaq) &&
    isIndustryCta(value.cta)
  );
}

/* =========================================================
   Content Normalization
========================================================= */

function normalizeContentBlock(
  block: IndustryContentBlock
): IndustryContentBlock | null {
  switch (block.type) {
    case "featuredAnswer": {
      const text = normalizeString(block.text);

      return text
        ? {
            type: "featuredAnswer",
            text,
          }
        : null;
    }

    case "heading": {
      const text = normalizeString(block.text);

      return text
        ? {
            type: "heading",
            text,
          }
        : null;
    }

    case "paragraph": {
      const text = normalizeString(block.text);

      return text
        ? {
            type: "paragraph",
            text,
          }
        : null;
    }

    case "list": {
      const items = normalizeStringArray(block.items);

      return items.length > 0
        ? {
            type: "list",
            items,
          }
        : null;
    }

    case "table": {
      const headers = block.headers.map(normalizeString);

      const rows = block.rows
        .map((row) => row.map(normalizeString))
        .filter((row) =>
          row.some((cell) => Boolean(cell))
        );

      if (headers.length === 0 || rows.length === 0) {
        return null;
      }

      return {
        type: "table",
        headers,
        rows,
      };
    }

    default:
      return null;
  }
}

/* =========================================================
   Industry Page Normalization
========================================================= */

function normalizeIndustryPage(
  industry: IndustryPage
): IndustryPage {
  const title = normalizeString(industry.title);

  const excerpt = normalizeString(industry.excerpt);

  const content = industry.content
    .map(normalizeContentBlock)
    .filter(
      (
        block
      ): block is IndustryContentBlock =>
        block !== null
    );

  const faqs = industry.faqs
    .map((faq) => ({
      question: normalizeString(faq.question),
      answer: normalizeString(faq.answer),
    }))
    .filter(
      (faq) => faq.question && faq.answer
    );

  return {
    id: industry.id,

    slug: normalizeIndustrySlug(industry.slug),

    title,

    excerpt,

    category: "Industry",

    author:
      normalizeString(industry.author) ||
      "ClickMasters Team",

    date: normalizeString(industry.date),

    readTime:
      normalizeString(industry.readTime) ||
      "5 min read",

    image:
      normalizeString(industry.image) ||
      "/media/blockchain.png",

    hero: {
      badge:
        normalizeString(industry.hero.badge) ||
        "Industry",

      title:
        normalizeString(industry.hero.title) ||
        title,

      description:
        normalizeString(
          industry.hero.description
        ) || excerpt,
    },

    credibility: normalizeStringArray(
      industry.credibility
    ),

    content,

    faqs,

    cta: {
      title:
        normalizeString(industry.cta.title) ||
        "Ready to Build Your Blockchain Solution?",

      description:
        normalizeString(
          industry.cta.description
        ) ||
        "Discuss your requirements with our blockchain development team.",

      primaryText:
        normalizeString(
          industry.cta.primaryText
        ) || "Book a Free Consultation",

      secondaryText:
        normalizeString(
          industry.cta.secondaryText
        ) || "Request a Proposal",
    },
  };
}

/* =========================================================
   Industry Card Mapper
========================================================= */

function mapIndustryToCard(
  industry: IndustryPage
): IndustryCardData {
  return {
    id: industry.id,
    slug: industry.slug,
    title: industry.title,
    excerpt: industry.excerpt,
    category: industry.category,
    badge: industry.hero.badge,
    image: industry.image,
    readTime: industry.readTime,
    date: industry.date,
    author: industry.author,
    credibility: [...industry.credibility],
  };
}

/* =========================================================
   Industry Data Collection
========================================================= */

const normalizedIndustriesMap = new Map<
  string,
  IndustryPage
>();

const normalizedIndustryIds = new Set<number>();

if (!Array.isArray(industriesData)) {
  console.warn(
    "[industry] industriesData must be an array."
  );
} else {
  for (const industry of industriesData) {
    if (!isIndustryPage(industry)) {
      console.warn(
        "[industry] Invalid industry entry skipped:",
        industry
      );

      continue;
    }

    const normalizedIndustry =
      normalizeIndustryPage(industry);

    if (!normalizedIndustry.slug) {
      console.warn(
        "[industry] Industry with empty slug skipped:",
        normalizedIndustry.title
      );

      continue;
    }

    if (
      normalizedIndustriesMap.has(
        normalizedIndustry.slug
      )
    ) {
      console.warn(
        `[industry] Duplicate slug skipped: "${normalizedIndustry.slug}"`
      );

      continue;
    }

    if (
      normalizedIndustryIds.has(
        normalizedIndustry.id
      )
    ) {
      console.warn(
        `[industry] Duplicate ID skipped: "${normalizedIndustry.id}"`
      );

      continue;
    }

    normalizedIndustriesMap.set(
      normalizedIndustry.slug,
      normalizedIndustry
    );

    normalizedIndustryIds.add(
      normalizedIndustry.id
    );
  }
}

const normalizedIndustries = Array.from(
  normalizedIndustriesMap.values()
);

/* =========================================================
   Public Industry Utilities
========================================================= */

export function getAllIndustryPages(): IndustryPage[] {
  return normalizedIndustries.map((industry) => ({
    ...industry,
    hero: { ...industry.hero },
    credibility: [...industry.credibility],
    content: [...industry.content],
    faqs: industry.faqs.map((faq) => ({
      ...faq,
    })),
    cta: { ...industry.cta },
  }));
}

export function getIndustryPageBySlug(
  slug: string
): IndustryPage | undefined {
  const normalizedSlug =
    normalizeIndustrySlug(slug);

  return normalizedIndustriesMap.get(
    normalizedSlug
  );
}

export function hasIndustryPage(
  slug: string
): boolean {
  return normalizedIndustriesMap.has(
    normalizeIndustrySlug(slug)
  );
}

export function getIndustryCards(): IndustryCardData[] {
  return normalizedIndustries.map(
    mapIndustryToCard
  );
}

export function getIndustryStaticParams(): IndustryPageParams[] {
  return normalizedIndustries.map(
    (industry) => ({
      slug: industry.slug,
    })
  );
}

export function getIndustrySlugs(): string[] {
  return normalizedIndustries.map(
    (industry) => industry.slug
  );
}

export function getIndustryPageCount(): number {
  return normalizedIndustries.length;
}

export function getFeaturedIndustryPages(
  limit = 6
): IndustryCardData[] {
  const safeLimit = Math.max(
    0,
    Math.floor(limit)
  );

  return normalizedIndustries
    .slice(0, safeLimit)
    .map(mapIndustryToCard);
}

export function getRelatedIndustryPages(
  currentSlug: string,
  limit = 3
): IndustryCardData[] {
  const normalizedCurrentSlug =
    normalizeIndustrySlug(currentSlug);

  const safeLimit = Math.max(
    0,
    Math.floor(limit)
  );

  return normalizedIndustries
    .filter(
      (industry) =>
        industry.slug !== normalizedCurrentSlug
    )
    .slice(0, safeLimit)
    .map(mapIndustryToCard);
}

export function getIndustryBadges(): string[] {
  return Array.from(
    new Set(
      normalizedIndustries
        .map((industry) =>
          normalizeString(industry.hero.badge)
        )
        .filter(Boolean)
    )
  );
}

export function searchIndustryPages(
  query: string
): IndustryCardData[] {
  const normalizedQuery = normalizeString(
    query
  ).toLowerCase();

  if (!normalizedQuery) {
    return getIndustryCards();
  }

  return normalizedIndustries
    .filter((industry) => {
      const contentText = industry.content
        .map((block) => {
          switch (block.type) {
            case "featuredAnswer":
            case "heading":
            case "paragraph":
              return block.text;

            case "list":
              return block.items.join(" ");

            case "table":
              return [
                ...block.headers,
                ...block.rows.flat(),
              ].join(" ");

            default:
              return "";
          }
        })
        .join(" ");

      const searchableText = [
        industry.title,
        industry.excerpt,
        industry.hero.badge,
        industry.hero.title,
        industry.hero.description,
        industry.author,
        ...industry.credibility,
        contentText,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(
        normalizedQuery
      );
    })
    .map(mapIndustryToCard);
}