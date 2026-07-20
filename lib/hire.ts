// lib/hire.ts

import hireData from "@/data/hire";

export type HireContentBlock =
  | {
      type: "featuredAnswer";
      text: string;
    }
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "code";
      text: string;
    }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    };

export interface HireFaq {
  question: string;
  answer: string;
}

export interface HireHero {
  badge: string;
  title: string;
  description: string;
}

export interface HireCta {
  title: string;
  description: string;
  primaryText: string;
  secondaryText: string;
}

export interface HirePage {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  hero: HireHero;
  credibility: string[];
  content: HireContentBlock[];
  faqs: HireFaq[];
  cta: HireCta;
}

export interface HireCardData {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  credibility: string[];
}

type RawHirePage = Partial<HirePage> & {
  id?: unknown;
  slug?: unknown;
  title?: unknown;
  excerpt?: unknown;
  category?: unknown;
  author?: unknown;
  date?: unknown;
  readTime?: unknown;
  image?: unknown;
  hero?: unknown;
  credibility?: unknown;
  content?: unknown;
  faqs?: unknown;
  cta?: unknown;
};

const hireVisuals = [
  "/media/blockchain.png",
  "/media/services-bg.jpeg",
  "/media/hero-bg.png",
  "/media/hero.jpg",
  "/media/tools-hero.png",
];

export function getHireVisual(slug = ""): string {
  const source = slug || "hire-blockchain-developer";
  const visualIndex =
    source
      .split("")
      .reduce(
        (sum, character) =>
          sum + character.charCodeAt(0),
        0
      ) % hireVisuals.length;

  return hireVisuals[visualIndex];
}

function normalizeSlug(slug: string): string {
  return slug.trim().toLowerCase();
}

function normalizeText(
  value: unknown,
  fallback = ""
): string {
  return typeof value === "string"
    ? value.trim()
    : fallback;
}

function normalizeStringArray(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string"
    )
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeImage(
  value: unknown,
  slug: string
): string {
  const image = normalizeText(value);

  if (image.startsWith("/media/")) {
    return image;
  }

  return getHireVisual(slug);
}

function isHireCategory(
  category: unknown
): boolean {
  return (
    typeof category === "string" &&
    category.trim().toLowerCase() === "hire"
  );
}

function normalizeHero(
  value: unknown,
  title: string,
  excerpt: string
): HireHero {
  if (!value || typeof value !== "object") {
    return {
      badge: "Hire Blockchain Expert",
      title,
      description: excerpt,
    };
  }

  const hero = value as Partial<HireHero>;

  return {
    badge: normalizeText(
      hero.badge,
      "Hire Blockchain Expert"
    ),
    title: normalizeText(hero.title, title),
    description: normalizeText(
      hero.description,
      excerpt
    ),
  };
}

function normalizeCta(
  value: unknown,
  title: string
): HireCta {
  if (!value || typeof value !== "object") {
    return {
      title: `Ready to ${title}?`,
      description:
        "Share your project requirements and get matched with the right blockchain development expertise.",
      primaryText: "Discuss Your Project",
      secondaryText: "Explore More Experts",
    };
  }

  const cta = value as Partial<HireCta>;

  return {
    title: normalizeText(
      cta.title,
      `Ready to ${title}?`
    ),
    description: normalizeText(
      cta.description,
      "Share your project requirements and get matched with the right blockchain development expertise."
    ),
    primaryText: normalizeText(
      cta.primaryText,
      "Discuss Your Project"
    ),
    secondaryText: normalizeText(
      cta.secondaryText,
      "Explore More Experts"
    ),
  };
}

function normalizeFaqs(
  value: unknown
): HireFaq[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is Partial<HireFaq> =>
        Boolean(
          item &&
            typeof item === "object"
        )
    )
    .map((item) => ({
      question: normalizeText(item.question),
      answer: normalizeText(item.answer),
    }))
    .filter(
      (item) =>
        item.question.length > 0 &&
        item.answer.length > 0
    );
}

function normalizeContent(
  value: unknown
): HireContentBlock[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (block): block is HireContentBlock => {
      if (
        !block ||
        typeof block !== "object" ||
        !("type" in block)
      ) {
        return false;
      }

      const item = block as Record<
        string,
        unknown
      >;

      switch (item.type) {
        case "featuredAnswer":
        case "heading":
        case "paragraph":
        case "code":
          return typeof item.text === "string";

        case "list":
          return Array.isArray(item.items);

        case "table":
          return (
            Array.isArray(item.headers) &&
            Array.isArray(item.rows)
          );

        default:
          return false;
      }
    }
  );
}

function normalizeHirePage(
  item: unknown
): HirePage | null {
  if (!item || typeof item !== "object") {
    return null;
  }

  const page = item as RawHirePage;

  if (!isHireCategory(page.category)) {
    return null;
  }

  const slug = normalizeText(page.slug);
  const title = normalizeText(page.title);

  if (!slug || !title) {
    return null;
  }

  const excerpt = normalizeText(
    page.excerpt,
    `Hire experienced professionals for ${title}.`
  );

  return {
    id:
      typeof page.id === "number"
        ? page.id
        : 0,

    slug: normalizeSlug(slug),

    title,

    excerpt,

    category: "Hire",

    author: normalizeText(
      page.author,
      "ClickMasters"
    ),

    date: normalizeText(page.date),

    readTime: normalizeText(
      page.readTime,
      "8 min read"
    ),

    image: normalizeImage(page.image, slug),

    hero: normalizeHero(
      page.hero,
      title,
      excerpt
    ),

    credibility: normalizeStringArray(
      page.credibility
    ),

    content: normalizeContent(page.content),

    faqs: normalizeFaqs(page.faqs),

    cta: normalizeCta(page.cta, title),
  };
}

export function getAllHirePages(): HirePage[] {
  if (!Array.isArray(hireData)) {
    return [];
  }

  const uniquePages = new Map<
    string,
    HirePage
  >();

  for (const item of hireData) {
    const normalizedPage =
      normalizeHirePage(item);

    if (!normalizedPage) {
      continue;
    }

    uniquePages.set(
      normalizedPage.slug,
      normalizedPage
    );
  }

  return Array.from(
    uniquePages.values()
  ).sort((a, b) =>
    a.title.localeCompare(b.title)
  );
}

function toHireCard(
  page: HirePage
): HireCardData {
  return {
    id: page.id,
    slug: page.slug,
    title: page.title,
    excerpt: page.excerpt,
    image: page.image,
    readTime: page.readTime,
    credibility: page.credibility,
  };
}

export function getHireCards(): HireCardData[] {
  return getAllHirePages().map(toHireCard);
}

export function getHirePageBySlug(
  slug: string | undefined
): HirePage | undefined {
  if (!slug) {
    return undefined;
  }

  const normalizedSlug =
    normalizeSlug(slug);

  return getAllHirePages().find(
    (page) =>
      page.slug === normalizedSlug
  );
}

export function hasHirePage(
  slug: string
): boolean {
  return Boolean(getHirePageBySlug(slug));
}

export function getHireStaticParams(): Array<{
  slug: string;
}> {
  return getAllHirePages().map((page) => ({
    slug: page.slug,
  }));
}

export function getRelatedHirePages(
  currentSlug: string,
  limit = 3
): HireCardData[] {
  if (limit <= 0) {
    return [];
  }

  const currentPage =
    getHirePageBySlug(currentSlug);

  if (!currentPage) {
    return [];
  }

  const currentKeywords = new Set(
    currentPage.credibility.map((item) =>
      item.toLowerCase()
    )
  );

  return getAllHirePages()
    .filter(
      (page) =>
        page.slug !== currentPage.slug
    )
    .map((page) => {
      const relevanceScore =
        page.credibility.reduce(
          (score, item) =>
            currentKeywords.has(
              item.toLowerCase()
            )
              ? score + 1
              : score,
          0
        );

      return {
        page,
        relevanceScore,
      };
    })
    .sort((a, b) => {
      if (
        b.relevanceScore !==
        a.relevanceScore
      ) {
        return (
          b.relevanceScore -
          a.relevanceScore
        );
      }

      return a.page.title.localeCompare(
        b.page.title
      );
    })
    .slice(0, limit)
    .map(({ page }) => toHireCard(page));
}

export function getFeaturedHirePages(
  limit = 6
): HireCardData[] {
  if (limit <= 0) {
    return [];
  }

  const prioritySlugs = [
    "hire-blockchain-developer",
    "hire-solidity-developer",
    "hire-smart-contract-developer",
    "hire-web3-developer",
    "hire-defi-developer",
    "hire-solana-developer",
  ];

  return getAllHirePages()
    .map((page) => {
      const priorityIndex =
        prioritySlugs.indexOf(page.slug);

      return {
        page,
        priority:
          priorityIndex === -1
            ? Number.MAX_SAFE_INTEGER
            : priorityIndex,
      };
    })
    .sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }

      return a.page.title.localeCompare(
        b.page.title
      );
    })
    .slice(0, limit)
    .map(({ page }) => toHireCard(page));
}

export function getHirePageCount(): number {
  return getAllHirePages().length;
}
