import { calculators } from "@/data/calculators";

/* =========================================================
   Core Content Types
========================================================= */

export type CalculatorContentType =
  | "featuredAnswer"
  | "heading"
  | "paragraph"
  | "table"
  | "list"
  | "code";

export type FeaturedAnswerBlock = {
  type: "featuredAnswer";
  text: string;
};

export type HeadingBlock = {
  type: "heading";
  text: string;
};

export type ParagraphBlock = {
  type: "paragraph";
  text: string;
};

export type TableBlock = {
  type: "table";
  headers: string[];
  rows: string[][];
};

export type ListBlock = {
  type: "list";
  items: string[];
};

export type CodeBlock = {
  type: "code";
  text: string;
};

export type CalculatorContentBlock =
  | FeaturedAnswerBlock
  | HeadingBlock
  | ParagraphBlock
  | TableBlock
  | ListBlock
  | CodeBlock;

/* =========================================================
   Calculator Data Types
========================================================= */

export type CalculatorFaq = {
  question: string;
  answer: string;
};

export type CalculatorCta = {
  title: string;
  description: string;
  primaryText: string;
  secondaryText: string;
  primaryHref?: string;
  secondaryHref?: string;
};

export type CalculatorHero = {
  badge: string;
  title: string;
  description: string;
};

export type CalculatorData = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image?: string;
  hero: CalculatorHero;
  credibility: string[];
  content: CalculatorContentBlock[];
  faqs: CalculatorFaq[];
  cta: CalculatorCta;
};

export type CalculatorEngineType =
  | "blockchain-gas"
  | "defi-yield"
  | "nft-rarity"
  | "exchange-volume"
  | "ethereum-gas"
  | "supply-chain-roi"
  | "token-economics"
  | null;

export type CalculatorResourceType =
  | "calculator"
  | "simulator"
  | "template"
  | "checklist"
  | "guide";

export type CalculatorCardData = {
  id: number;
  slug: string;
  sourceSlug: string;
  href: string;
  title: string;
  excerpt: string;
  badge: string;
  category: string;
  author: string;
  date: string;
  formattedDate: string;
  readTime: string;
  credibility: string[];
  resourceType: CalculatorResourceType;
  engineType: CalculatorEngineType;
  isInteractive: boolean;
  image?: string;
};

/* =========================================================
   Constants
========================================================= */

export const CALCULATORS_BASE_PATH = "/calculators";

export const CALCULATORS_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://clickmasters.com";

const calculatorEngineMap: Record<
  string,
  Exclude<CalculatorEngineType, null>
> = {
  "blockchain-gas-calculator": "blockchain-gas",
  "defi-yield-calculator": "defi-yield",
  "nft-rarity-calculator": "nft-rarity",
  "crypto-exchange-volume-calculator": "exchange-volume",
  "ethereum-gas-calculator": "ethereum-gas",
  "supply-chain-blockchain-roi-calculator": "supply-chain-roi",
  "token-economics-simulator": "token-economics",
};

const resourceTypeMap: Record<string, CalculatorResourceType> = {
  "blockchain-gas-calculator": "calculator",
  "defi-yield-calculator": "calculator",
  "nft-rarity-calculator": "calculator",
  "blockchain-scope-document-template": "template",
  "smart-contract-audit-preparation": "checklist",
  "crypto-exchange-volume-calculator": "calculator",
  "smart-contract-upgrade-patterns": "guide",
  "ethereum-gas-calculator": "calculator",
  "supply-chain-blockchain-roi-calculator": "calculator",
  "token-economics-simulator": "simulator",
};

/* =========================================================
   Normalization Helpers
========================================================= */

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeCalculatorSlug(value: string): string {
  return normalizeText(value)
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .replace(/^calculators\//, "")
    .replace(/^tools-/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createCalculatorSourceSlug(value: string): string {
  const cleanSlug = normalizeCalculatorSlug(value);

  return `tools-${cleanSlug}`;
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return Array.from(
    new Set(value.map((item) => normalizeText(item)).filter(Boolean)),
  );
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}

function isTableRows(value: unknown): value is string[][] {
  return Array.isArray(value) && value.every((row) => isStringArray(row));
}

/* =========================================================
   Content Block Validation
========================================================= */

function normalizeContentBlock(block: unknown): CalculatorContentBlock | null {
  if (!block || typeof block !== "object") {
    return null;
  }

  const value = block as Record<string, unknown>;
  const type = normalizeText(value.type);

  if (type === "featuredAnswer") {
    const text = normalizeText(value.text);

    return text
      ? {
          type: "featuredAnswer",
          text,
        }
      : null;
  }

  if (type === "heading") {
    const text = normalizeText(value.text);

    return text
      ? {
          type: "heading",
          text,
        }
      : null;
  }

  if (type === "paragraph") {
    const text = normalizeText(value.text);

    return text
      ? {
          type: "paragraph",
          text,
        }
      : null;
  }

  if (type === "code") {
    const text = normalizeText(value.text);

    return text
      ? {
          type: "code",
          text,
        }
      : null;
  }

  if (type === "list") {
    const items = normalizeStringArray(value.items);

    return items.length
      ? {
          type: "list",
          items,
        }
      : null;
  }

  if (type === "table") {
    const headers = isStringArray(value.headers)
      ? value.headers.map((header) => header.trim())
      : [];

    const rows = isTableRows(value.rows)
      ? value.rows.map((row) => row.map((cell) => cell.trim()))
      : [];

    return headers.length && rows.length
      ? {
          type: "table",
          headers,
          rows,
        }
      : null;
  }

  return null;
}

/* =========================================================
   Main Data Normalization
========================================================= */

function normalizeCalculator(item: unknown): CalculatorData | null {
  if (!item || typeof item !== "object") {
    return null;
  }

  const value = item as Record<string, unknown>;
  const heroValue =
    value.hero && typeof value.hero === "object"
      ? (value.hero as Record<string, unknown>)
      : {};

  const ctaValue =
    value.cta && typeof value.cta === "object"
      ? (value.cta as Record<string, unknown>)
      : {};

  const rawSlug = normalizeText(value.slug);
  const title = normalizeText(value.title);
  const excerpt = normalizeText(value.excerpt);

  if (!rawSlug || !title) {
    return null;
  }

  const content = Array.isArray(value.content)
    ? value.content
        .map(normalizeContentBlock)
        .filter((block): block is CalculatorContentBlock => block !== null)
    : [];

  const faqs = Array.isArray(value.faqs)
    ? value.faqs
        .map((faq) => {
          if (!faq || typeof faq !== "object") {
            return null;
          }

          const faqValue = faq as Record<string, unknown>;
          const question = normalizeText(faqValue.question);
          const answer = normalizeText(faqValue.answer);

          if (!question || !answer) {
            return null;
          }

          return {
            question,
            answer,
          };
        })
        .filter((faq): faq is CalculatorFaq => faq !== null)
    : [];

  return {
    id: typeof value.id === "number" ? value.id : Number(value.id) || 0,

    slug: rawSlug,

    title,

    excerpt: excerpt || normalizeText(heroValue.description),

    category: normalizeText(value.category) || "Calculators",

    author: normalizeText(value.author) || "ClickMasters Team",

    date: normalizeText(value.date),

    readTime: normalizeText(value.readTime) || "5 min read",

    image: normalizeText(value.image) || undefined,

    hero: {
      badge: normalizeText(heroValue.badge) || "TOOL",

      title: normalizeText(heroValue.title) || title,

      description: normalizeText(heroValue.description) || excerpt,
    },

    credibility: normalizeStringArray(value.credibility),

    content,

    faqs,

    cta: {
      title:
        normalizeText(ctaValue.title) ||
        "Ready to Start Your Blockchain Project?",

      description:
        normalizeText(ctaValue.description) ||
        "Speak with our blockchain specialists about your project.",

      primaryText:
        normalizeText(ctaValue.primaryText) || "Book a Free Strategy Call",

      secondaryText:
        normalizeText(ctaValue.secondaryText) || "Explore Our Services",

      primaryHref: normalizeText(ctaValue.primaryHref) || undefined,

      secondaryHref: normalizeText(ctaValue.secondaryHref) || undefined,
    },
  };
}

const normalizedCalculators: CalculatorData[] = (
  Array.isArray(calculators) ? calculators : []
)
  .map(normalizeCalculator)
  .filter((calculator): calculator is CalculatorData => calculator !== null);

/* =========================================================
   Public Lookup Functions
========================================================= */

export function getAllCalculators(): CalculatorData[] {
  return [...normalizedCalculators];
}

export function getCalculatorBySlug(slug: string): CalculatorData | undefined {
  const normalizedSlug = normalizeCalculatorSlug(slug);

  return normalizedCalculators.find(
    (calculator) => normalizeCalculatorSlug(calculator.slug) === normalizedSlug,
  );
}

export function calculatorExists(slug: string): boolean {
  return Boolean(getCalculatorBySlug(slug));
}

export function getCalculatorHref(slug: string): string {
  return `${CALCULATORS_BASE_PATH}/${normalizeCalculatorSlug(slug)}`;
}

export function getCalculatorAbsoluteUrl(slug: string): string {
  return `${CALCULATORS_SITE_URL}${getCalculatorHref(slug)}`;
}

/* =========================================================
   Calculator Classification
========================================================= */

export function getCalculatorEngineType(slug: string): CalculatorEngineType {
  const normalizedSlug = normalizeCalculatorSlug(slug);

  return calculatorEngineMap[normalizedSlug] || null;
}

export function getCalculatorResourceType(
  slug: string,
): CalculatorResourceType {
  const normalizedSlug = normalizeCalculatorSlug(slug);

  return resourceTypeMap[normalizedSlug] || "guide";
}

export function isInteractiveCalculator(slug: string): boolean {
  return getCalculatorEngineType(slug) !== null;
}

export function getInteractiveCalculators(): CalculatorData[] {
  return normalizedCalculators.filter((calculator) =>
    isInteractiveCalculator(calculator.slug),
  );
}

export function getContentResources(): CalculatorData[] {
  return normalizedCalculators.filter(
    (calculator) => !isInteractiveCalculator(calculator.slug),
  );
}

/* =========================================================
   Card Data
========================================================= */

export function getCalculatorCard(
  calculator: CalculatorData,
): CalculatorCardData {
  const slug = normalizeCalculatorSlug(calculator.slug);

  const engineType = getCalculatorEngineType(slug);
  const resourceType = getCalculatorResourceType(slug);

  return {
    id: calculator.id,
    slug,
    sourceSlug: calculator.slug,
    href: getCalculatorHref(slug),
    title: calculator.title,
    excerpt: calculator.excerpt,
    badge: calculator.hero.badge,
    category: calculator.category,
    author: calculator.author,
    date: calculator.date,
    formattedDate: formatCalculatorDate(calculator.date),
    readTime: calculator.readTime,
    credibility: calculator.credibility,
    resourceType,
    engineType,
    isInteractive: engineType !== null,
    image: calculator.image,
  };
}

export function getCalculatorCards(): CalculatorCardData[] {
  return normalizedCalculators.map(getCalculatorCard);
}

/* =========================================================
   Related Calculators
========================================================= */

export function getRelatedCalculators(
  currentSlug: string,
  limit = 3,
): CalculatorCardData[] {
  const currentCalculator = getCalculatorBySlug(currentSlug);

  if (!currentCalculator) {
    return [];
  }

  const currentType = getCalculatorResourceType(currentCalculator.slug);

  const currentCredibility = new Set(
    currentCalculator.credibility.map((item) => item.toLowerCase()),
  );

  return normalizedCalculators
    .filter(
      (calculator) =>
        normalizeCalculatorSlug(calculator.slug) !==
        normalizeCalculatorSlug(currentSlug),
    )
    .map((calculator) => {
      const type = getCalculatorResourceType(calculator.slug);

      const sharedCredibility = calculator.credibility.filter((item) =>
        currentCredibility.has(item.toLowerCase()),
      ).length;

      const sameType = type === currentType;
      const bothInteractive =
        isInteractiveCalculator(calculator.slug) &&
        isInteractiveCalculator(currentSlug);

      const score =
        (sameType ? 10 : 0) + (bothInteractive ? 5 : 0) + sharedCredibility * 3;

      return {
        calculator,
        score,
      };
    })
    .sort((first, second) => {
      if (second.score !== first.score) {
        return second.score - first.score;
      }

      return first.calculator.id - second.calculator.id;
    })
    .slice(0, Math.max(limit, 0))
    .map(({ calculator }) => getCalculatorCard(calculator));
}

/* =========================================================
   Static Params
========================================================= */

export function getCalculatorStaticParams(): Array<{
  slug: string;
}> {
  return normalizedCalculators.map((calculator) => ({
    slug: normalizeCalculatorSlug(calculator.slug),
  }));
}

/* =========================================================
   SEO Helpers
========================================================= */

export function getCalculatorMetadata(calculator: CalculatorData) {
  const slug = normalizeCalculatorSlug(calculator.slug);

  const title = calculator.title;
  const description = calculator.excerpt || calculator.hero.description;

  const canonical = getCalculatorHref(slug);
  const absoluteUrl = getCalculatorAbsoluteUrl(slug);

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description,
      type: "article" as const,
      url: absoluteUrl,
      publishedTime: calculator.date || undefined,
      authors: [calculator.author],
      images: calculator.image
        ? [
            {
              url: calculator.image,
              alt: calculator.title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: calculator.image ? [calculator.image] : undefined,
    },
  };
}

/* =========================================================
   Schema Helpers
========================================================= */

export function getCalculatorSchemas(calculator: CalculatorData) {
  const slug = normalizeCalculatorSlug(calculator.slug);

  const url = getCalculatorAbsoluteUrl(slug);
  const resourceType = getCalculatorResourceType(slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type":
      resourceType === "calculator" || resourceType === "simulator"
        ? "SoftwareApplication"
        : "Article",

    name: calculator.title,
    headline: calculator.title,
    description: calculator.excerpt,
    url,

    author: {
      "@type": "Organization",
      name: calculator.author,
    },

    publisher: {
      "@type": "Organization",
      name: "ClickMasters",
      url: CALCULATORS_SITE_URL,
    },

    datePublished: calculator.date || undefined,
    dateModified: calculator.date || undefined,

    applicationCategory:
      resourceType === "calculator" || resourceType === "simulator"
        ? "BusinessApplication"
        : undefined,

    operatingSystem:
      resourceType === "calculator" || resourceType === "simulator"
        ? "Web"
        : undefined,

    offers:
      resourceType === "calculator" || resourceType === "simulator"
        ? {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          }
        : undefined,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: CALCULATORS_SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: `${CALCULATORS_SITE_URL}${CALCULATORS_BASE_PATH}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: calculator.title,
        item: url,
      },
    ],
  };

  const faqSchema =
    calculator.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: calculator.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return {
    articleSchema,
    breadcrumbSchema,
    faqSchema,
  };
}

/* =========================================================
   Search and Filtering
========================================================= */

export function searchCalculators(query: string): CalculatorData[] {
  const normalizedQuery = normalizeText(query).toLowerCase();

  if (!normalizedQuery) {
    return getAllCalculators();
  }

  return normalizedCalculators.filter((calculator) => {
    const searchableContent = [
      calculator.title,
      calculator.excerpt,
      calculator.hero.title,
      calculator.hero.description,
      calculator.category,
      calculator.author,
      calculator.hero.badge,
      ...calculator.credibility,
      ...calculator.content.flatMap((block) => {
        if (
          block.type === "featuredAnswer" ||
          block.type === "heading" ||
          block.type === "paragraph" ||
          block.type === "code"
        ) {
          return [block.text];
        }

        if (block.type === "list") {
          return block.items;
        }

        if (block.type === "table") {
          return [...block.headers, ...block.rows.flat()];
        }

        return [];
      }),
    ]
      .join(" ")
      .toLowerCase();

    return searchableContent.includes(normalizedQuery);
  });
}

export function getCalculatorsByResourceType(
  resourceType: CalculatorResourceType,
): CalculatorData[] {
  return normalizedCalculators.filter(
    (calculator) => getCalculatorResourceType(calculator.slug) === resourceType,
  );
}

/* =========================================================
   Content Helpers
========================================================= */

export function getFeaturedAnswer(
  calculator: CalculatorData,
): FeaturedAnswerBlock | undefined {
  return calculator.content.find(
    (block): block is FeaturedAnswerBlock => block.type === "featuredAnswer",
  );
}

export function getCalculatorTables(calculator: CalculatorData): TableBlock[] {
  return calculator.content.filter(
    (block): block is TableBlock => block.type === "table",
  );
}

export function getCalculatorCodeBlocks(
  calculator: CalculatorData,
): CodeBlock[] {
  return calculator.content.filter(
    (block): block is CodeBlock => block.type === "code",
  );
}

/* =========================================================
   Utility Functions
========================================================= */

export function formatCalculatorDate(date: string): string {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsedDate);
}

export function getCalculatorResourceLabel(
  type: CalculatorResourceType,
): string {
  const labels: Record<CalculatorResourceType, string> = {
    calculator: "Calculator",
    simulator: "Simulator",
    template: "Template",
    checklist: "Checklist",
    guide: "Decision Guide",
  };

  return labels[type];
}

export function getCalculatorResourceDescription(
  type: CalculatorResourceType,
): string {
  const descriptions: Record<CalculatorResourceType, string> = {
    calculator: "Enter your values to calculate an estimated result.",

    simulator: "Adjust the assumptions to model different scenarios.",

    template:
      "Use this structured template to define and document your project.",

    checklist: "Follow the checklist to prepare each required item.",

    guide: "Compare the available options and choose the right approach.",
  };

  return descriptions[type];
}
