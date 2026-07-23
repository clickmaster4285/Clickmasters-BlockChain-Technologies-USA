// lib/partner.ts

import partnersData from "@/data/partners";

/* =========================================================
   Content Block Types
========================================================= */

export type PartnerFeaturedAnswerBlock = {
  type: "featuredAnswer";
  text: string;
};

export type PartnerHeadingBlock = {
  type: "heading";
  text: string;
  level?: 2 | 3 | 4;
};

export type PartnerParagraphBlock = {
  type: "paragraph";
  text: string;
};

export type PartnerListBlock = {
  type: "list";
  items: string[];
};

export type PartnerTableBlock = {
  type: "table";
  headers?: string[];
  rows: string[][];
};

export type PartnerCodeBlock = {
  type: "code";
  text: string;
  language?: string;
};

export type PartnerContentBlock =
  | PartnerFeaturedAnswerBlock
  | PartnerHeadingBlock
  | PartnerParagraphBlock
  | PartnerListBlock
  | PartnerTableBlock
  | PartnerCodeBlock;

/* =========================================================
   Supporting Types
========================================================= */

export type PartnerHero = {
  badge?: string;
  title?: string;
  description?: string;
  image?: string;
};

export type PartnerFAQ = {
  question: string;
  answer: string;
};

export type PartnerCTA = {
  title?: string;
  description?: string;
  primaryText?: string;
  primaryLink?: string;
  secondaryText?: string;
  secondaryLink?: string;
};

/* =========================================================
   Main Partner Type
========================================================= */

export type PartnerEntry = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;

  category?: string;
  author?: string;
  date?: string;
  readTime?: string;

  image?: string;

  hero?: PartnerHero;

  credibility?: string[];

  content?: PartnerContentBlock[];

  faqs?: PartnerFAQ[];

  cta?: PartnerCTA;
};

/* =========================================================
   Normalized Partner Type
========================================================= */

export type NormalizedPartnerEntry = PartnerEntry & {
  category: string;
  credibility: string[];
  content: PartnerContentBlock[];
  faqs: PartnerFAQ[];
  cta: PartnerCTA;
};

/* =========================================================
   Raw Data
========================================================= */

const rawPartners =
  partnersData as PartnerEntry[];

/* =========================================================
   Internal Helpers
========================================================= */

function normalizeText(
  value: string | undefined,
): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const normalizedValue = value.trim();

  return normalizedValue.length > 0
    ? normalizedValue
    : undefined;
}

function normalizeSlug(slug: string): string {
  return slug
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "");
}

function normalizePartner(
  partner: PartnerEntry,
): NormalizedPartnerEntry {
  return {
    ...partner,

    slug: normalizeSlug(partner.slug),

    title:
      normalizeText(partner.title) ||
      "Blockchain Technology Partner",

    excerpt:
      normalizeText(partner.excerpt) ||
      "Explore this blockchain technology, infrastructure, security, or integration partner.",

    category:
      normalizeText(partner.category) ||
      "Partners",

    image: normalizeText(partner.image),

    author: normalizeText(partner.author),

    date: normalizeText(partner.date),

    readTime: normalizeText(
      partner.readTime,
    ),

    hero: partner.hero
      ? {
          badge:
            normalizeText(
              partner.hero.badge,
            ) || "PARTNER",

          title:
            normalizeText(
              partner.hero.title,
            ) ||
            normalizeText(partner.title),

          description:
            normalizeText(
              partner.hero.description,
            ) ||
            normalizeText(partner.excerpt),

          image: normalizeText(
            partner.hero.image,
          ),
        }
      : undefined,

    credibility: Array.isArray(
      partner.credibility,
    )
      ? partner.credibility
          .map((item) =>
            normalizeText(item),
          )
          .filter(
            (item): item is string =>
              Boolean(item),
          )
      : [],

    content: Array.isArray(partner.content)
      ? partner.content
      : [],

    faqs: Array.isArray(partner.faqs)
      ? partner.faqs.filter(
          (faq) =>
            Boolean(
              normalizeText(faq.question),
            ) &&
            Boolean(
              normalizeText(faq.answer),
            ),
        )
      : [],

    cta: {
      title:
        normalizeText(partner.cta?.title) ||
        "Ready to Discuss Your Blockchain Project?",

      description:
        normalizeText(
          partner.cta?.description,
        ) ||
        "Speak with our team about the right technology, infrastructure, security, and integration approach for your project.",

      primaryText:
        normalizeText(
          partner.cta?.primaryText,
        ) || "Book a Free Strategy Call",

      primaryLink:
        normalizeText(
          partner.cta?.primaryLink,
        ) || "/contact",

      secondaryText:
        normalizeText(
          partner.cta?.secondaryText,
        ) || "Explore Our Services",

      secondaryLink:
        normalizeText(
          partner.cta?.secondaryLink,
        ) || "/services",
    },
  };
}

/* =========================================================
   Normalized Data
========================================================= */

const partners: NormalizedPartnerEntry[] =
  rawPartners
    .filter(
      (partner) =>
        Boolean(partner) &&
        typeof partner.id === "number" &&
        Boolean(normalizeText(partner.slug)) &&
        Boolean(normalizeText(partner.title)),
    )
    .map(normalizePartner);

/* =========================================================
   Public Functions
========================================================= */

/**
 * Returns every normalized partner.
 */
export function getPartners(): NormalizedPartnerEntry[] {
  return [...partners];
}

/**
 * Returns lightweight data suitable for listing cards.
 */
export function getPartnerCards(): NormalizedPartnerEntry[] {
  return partners.map((partner) => ({
    ...partner,

    content: [],

    faqs: [],
  }));
}

/**
 * Returns one partner using its slug.
 */
export function getPartnerBySlug(
  slug: string,
): NormalizedPartnerEntry | undefined {
  const normalizedSlug =
    normalizeSlug(slug);

  return partners.find(
    (partner) =>
      partner.slug === normalizedSlug,
  );
}

/**
 * Returns all partner slugs for static generation.
 */
export function getPartnerSlugs(): string[] {
  return partners.map(
    (partner) => partner.slug,
  );
}

/**
 * Returns the total number of partners.
 */
export function getPartnersCount(): number {
  return partners.length;
}

/**
 * Returns related partners while excluding
 * the currently opened partner.
 */
export function getRelatedPartners(
  currentSlug: string,
  limit = 3,
): NormalizedPartnerEntry[] {
  const normalizedCurrentSlug =
    normalizeSlug(currentSlug);

  const safeLimit =
    Number.isInteger(limit) && limit > 0
      ? limit
      : 3;

  return partners
    .filter(
      (partner) =>
        partner.slug !==
        normalizedCurrentSlug,
    )
    .slice(0, safeLimit)
    .map((partner) => ({
      ...partner,

      content: [],

      faqs: [],
    }));
}