// lib/process.ts

import processData from "@/data/process";

/* =========================================================
   Content Block Types
========================================================= */

export type ProcessFeaturedAnswerBlock = {
  type: "featuredAnswer";
  text: string;
};

export type ProcessHeadingBlock = {
  type: "heading";
  text: string;
  level?: 2 | 3 | 4;
};

export type ProcessParagraphBlock = {
  type: "paragraph";
  text: string;
};

export type ProcessListBlock = {
  type: "list";
  items: string[];
};

export type ProcessTableBlock = {
  type: "table";
  headers?: string[];
  rows: string[][];
};

export type ProcessCodeBlock = {
  type: "code";
  text: string;
  language?: string;
};

export type ProcessContentBlock =
  | ProcessFeaturedAnswerBlock
  | ProcessHeadingBlock
  | ProcessParagraphBlock
  | ProcessListBlock
  | ProcessTableBlock
  | ProcessCodeBlock;

/* =========================================================
   Raw Data Types
========================================================= */

export type RawProcessHero = {
  badge?: string;
  title?: string;
  description?: string;
  image?: string;
};

export type RawProcessFAQ = {
  question?: string;
  answer?: string;
};

export type RawProcessCTA = {
  title?: string;
  description?: string;
  primaryText?: string;
  primaryLink?: string;
  secondaryText?: string;
  secondaryLink?: string;
};

export type RawProcessEntry = {
  id?: number;
  slug?: string;
  title?: string;
  excerpt?: string;
  category?: string;
  author?: string;
  date?: string;
  readTime?: string;
  image?: string;
  hero?: RawProcessHero;
  credibility?: string[];
  content?: ProcessContentBlock[];
  faqs?: RawProcessFAQ[];
  cta?: RawProcessCTA;
};

/* =========================================================
   Normalized Types
========================================================= */

export type ProcessHero = {
  badge: string;
  title: string;
  description: string;
  image?: string;
};

export type ProcessFAQ = {
  question: string;
  answer: string;
};

export type ProcessCTA = {
  title: string;
  description: string;
  primaryText: string;
  primaryLink: string;
  secondaryText: string;
  secondaryLink: string;
};

export type NormalizedProcessEntry = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image?: string;
  hero: ProcessHero;
  credibility: string[];
  content: ProcessContentBlock[];
  faqs: ProcessFAQ[];
  cta: ProcessCTA;
};

export type ProcessCardData = Pick<
  NormalizedProcessEntry,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "category"
  | "author"
  | "date"
  | "readTime"
  | "image"
  | "hero"
  | "credibility"
>;

/* =========================================================
   Constants
========================================================= */

const DEFAULT_CATEGORY = "Process";

const DEFAULT_AUTHOR = "ClickMasters Team";

const DEFAULT_READ_TIME = "8 min read";

const DEFAULT_CTA: ProcessCTA = {
  title: "Ready to Start Your Blockchain Project?",
  description:
    "Speak with our team about your requirements, architecture, security, timeline, and development strategy.",
  primaryText: "Book a Free Strategy Call",
  primaryLink: "/contact",
  secondaryText: "Explore Our Services",
  secondaryLink: "/services",
};

/* =========================================================
   Internal Utilities
========================================================= */

function isNonEmptyString(
  value: unknown,
): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

function normalizeText(
  value: unknown,
  fallback = "",
): string {
  return isNonEmptyString(value)
    ? value.trim()
    : fallback;
}

function normalizeStringArray(
  value: unknown,
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isNonEmptyString)
    .map((item) => item.trim());
}

function createSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeSlug(
  slug: unknown,
  title: string,
  id: number,
): string {
  const source = normalizeText(
    slug,
    title || `process-${id}`,
  );

  const normalized = createSlug(source);

  return normalized || `process-${id}`;
}

function createExcerpt(
  entry: RawProcessEntry,
  title: string,
): string {
  const explicitExcerpt = normalizeText(
    entry.excerpt,
  );

  if (explicitExcerpt) {
    return explicitExcerpt;
  }

  const heroDescription = normalizeText(
    entry.hero?.description,
  );

  if (heroDescription) {
    return heroDescription;
  }

  const firstParagraph = entry.content?.find(
    (
      block,
    ): block is ProcessParagraphBlock =>
      block.type === "paragraph" &&
      isNonEmptyString(block.text),
  );

  if (firstParagraph) {
    return firstParagraph.text.trim();
  }

  return `Explore the professional process, architecture, security considerations, costs, timelines, and implementation requirements for ${title}.`;
}

function normalizeHero(
  entry: RawProcessEntry,
  title: string,
  excerpt: string,
): ProcessHero {
  const image = normalizeText(
    entry.hero?.image,
    normalizeText(entry.image),
  );

  return {
    badge: normalizeText(
      entry.hero?.badge,
      normalizeText(
        entry.category,
        DEFAULT_CATEGORY,
      ).toUpperCase(),
    ),

    title: normalizeText(
      entry.hero?.title,
      title,
    ),

    description: normalizeText(
      entry.hero?.description,
      excerpt,
    ),

    ...(image ? { image } : {}),
  };
}

function normalizeFAQs(
  faqs: unknown,
): ProcessFAQ[] {
  if (!Array.isArray(faqs)) {
    return [];
  }

  return faqs
    .map((faq) => {
      if (
        !faq ||
        typeof faq !== "object"
      ) {
        return null;
      }

      const rawFAQ = faq as RawProcessFAQ;

      const question = normalizeText(
        rawFAQ.question,
      );

      const answer = normalizeText(
        rawFAQ.answer,
      );

      if (!question || !answer) {
        return null;
      }

      return {
        question,
        answer,
      };
    })
    .filter(
      (faq): faq is ProcessFAQ =>
        faq !== null,
    );
}

function normalizeContent(
  content: unknown,
): ProcessContentBlock[] {
  if (!Array.isArray(content)) {
    return [];
  }

  return content.filter(
    (
      block,
    ): block is ProcessContentBlock => {
      if (
        !block ||
        typeof block !== "object" ||
        !("type" in block)
      ) {
        return false;
      }

      const candidate =
        block as ProcessContentBlock;

      switch (candidate.type) {
        case "featuredAnswer":
        case "paragraph":
          return isNonEmptyString(
            candidate.text,
          );

        case "heading":
          return isNonEmptyString(
            candidate.text,
          );

        case "list":
          return (
            Array.isArray(candidate.items) &&
            candidate.items.some(
              isNonEmptyString,
            )
          );

        case "table":
          return (
            Array.isArray(candidate.rows) &&
            candidate.rows.length > 0
          );

        case "code":
          return isNonEmptyString(
            candidate.text,
          );

        default:
          return false;
      }
    },
  );
}

function normalizeCTA(
  cta: RawProcessCTA | undefined,
): ProcessCTA {
  return {
    title: normalizeText(
      cta?.title,
      DEFAULT_CTA.title,
    ),

    description: normalizeText(
      cta?.description,
      DEFAULT_CTA.description,
    ),

    primaryText: normalizeText(
      cta?.primaryText,
      DEFAULT_CTA.primaryText,
    ),

    primaryLink: normalizeText(
      cta?.primaryLink,
      DEFAULT_CTA.primaryLink,
    ),

    secondaryText: normalizeText(
      cta?.secondaryText,
      DEFAULT_CTA.secondaryText,
    ),

    secondaryLink: normalizeText(
      cta?.secondaryLink,
      DEFAULT_CTA.secondaryLink,
    ),
  };
}

function normalizeProcessEntry(
  entry: RawProcessEntry,
  index: number,
): NormalizedProcessEntry {
  const id =
    typeof entry.id === "number" &&
    Number.isFinite(entry.id)
      ? entry.id
      : index + 1;

  const title = normalizeText(
    entry.title,
    `Process Guide ${id}`,
  );

  const slug = normalizeSlug(
    entry.slug,
    title,
    id,
  );

  const excerpt = createExcerpt(
    entry,
    title,
  );

  const image = normalizeText(
    entry.image,
  );

  return {
    id,
    slug,
    title,
    excerpt,

    category: normalizeText(
      entry.category,
      DEFAULT_CATEGORY,
    ),

    author: normalizeText(
      entry.author,
      DEFAULT_AUTHOR,
    ),

    date: normalizeText(entry.date),

    readTime: normalizeText(
      entry.readTime,
      DEFAULT_READ_TIME,
    ),

    ...(image ? { image } : {}),

    hero: normalizeHero(
      entry,
      title,
      excerpt,
    ),

    credibility: normalizeStringArray(
      entry.credibility,
    ),

    content: normalizeContent(
      entry.content,
    ),

    faqs: normalizeFAQs(entry.faqs),

    cta: normalizeCTA(entry.cta),
  };
}

/* =========================================================
   Cached Normalized Data
========================================================= */

const normalizedProcesses: NormalizedProcessEntry[] =
  (
    Array.isArray(processData)
      ? processData
      : []
  ).map((entry, index) =>
    normalizeProcessEntry(
      entry as RawProcessEntry,
      index,
    ),
  );

/* =========================================================
   Public Helpers
========================================================= */

/**
 * Returns all normalized process entries.
 */
export function getProcesses(): NormalizedProcessEntry[] {
  return normalizedProcesses;
}

/**
 * Returns lightweight data suitable for listing cards.
 */
export function getProcessCards(): ProcessCardData[] {
  return normalizedProcesses.map(
    ({
      id,
      slug,
      title,
      excerpt,
      category,
      author,
      date,
      readTime,
      image,
      hero,
      credibility,
    }) => ({
      id,
      slug,
      title,
      excerpt,
      category,
      author,
      date,
      readTime,
      image,
      hero,
      credibility,
    }),
  );
}

/**
 * Finds a process entry by normalized slug.
 */
export function getProcessBySlug(
  slug: string,
): NormalizedProcessEntry | undefined {
  const normalizedSlug =
    createSlug(slug);

  return normalizedProcesses.find(
    (process) =>
      process.slug === normalizedSlug,
  );
}

/**
 * Returns all valid process slugs.
 */
export function getProcessSlugs(): string[] {
  return normalizedProcesses.map(
    (process) => process.slug,
  );
}

/**
 * Returns the total number of process entries.
 */
export function getProcessCount(): number {
  return normalizedProcesses.length;
}

/**
 * Returns unique categories in alphabetical order.
 */
export function getProcessCategories(): string[] {
  return Array.from(
    new Set(
      normalizedProcesses.map(
        (process) => process.category,
      ),
    ),
  ).sort((first, second) =>
    first.localeCompare(second),
  );
}

/**
 * Returns related processes.
 *
 * Priority:
 * 1. Same category
 * 2. Other available processes
 */
export function getRelatedProcesses(
  currentSlug: string,
  limit = 3,
): NormalizedProcessEntry[] {
  const safeLimit = Math.max(
    0,
    Math.floor(limit),
  );

  if (safeLimit === 0) {
    return [];
  }

  const currentProcess =
    getProcessBySlug(currentSlug);

  if (!currentProcess) {
    return normalizedProcesses.slice(
      0,
      safeLimit,
    );
  }

  const otherProcesses =
    normalizedProcesses.filter(
      (process) =>
        process.slug !==
        currentProcess.slug,
    );

  const sameCategory =
    otherProcesses.filter(
      (process) =>
        process.category ===
        currentProcess.category,
    );

  const differentCategory =
    otherProcesses.filter(
      (process) =>
        process.category !==
        currentProcess.category,
    );

  return [
    ...sameCategory,
    ...differentCategory,
  ].slice(0, safeLimit);
}