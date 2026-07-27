import { tools } from "@/data/tools";

/* =========================================================
   Local Types
========================================================= */

type UnknownRecord = Record<string, unknown>;

export type ToolType =
  | "calculator"
  | "template"
  | "checklist"
  | "guide"
  | "document"
  | "utility"
  | "tool";

export type ToolCardData = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  type: ToolType;
  href: string;
  tags: string[];
  badge: string;
  featured: boolean;
  readTime: string;
  status: string;
};

export type ToolData = UnknownRecord & {
  id?: string | number;
  slug: string;
  title?: string;
  name?: string;
  description?: string;
  excerpt?: string;
  summary?: string;
  category?: string;
  type?: ToolType | string;
  tags?: string[];
  featured?: boolean;
  readTime?: string;
  status?: string;
  image?: string;

  cta?: {
    title?: string;
    description?: string;
    primaryText?: string;
    secondaryText?: string;
    href?: string;
    secondaryHref?: string;
  };

  seo?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    primaryKeyword?: string;
    secondaryKeywords?: string[];
    schema?: string[];
  };

  meta?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    primaryKeyword?: string;
    secondaryKeywords?: string[];
    schema?: string[];
  };

  hero?: {
    badge?: string;
    eyebrow?: string;
    title?: string;
    heading?: string;
    description?: string;
  };

  faqs?: Array<{
    question: string;
    answer: string;
  }>;

  internalLinks?: Array<
    | string
    | {
        label?: string;
        title?: string;
        href: string;
      }
  >;
};

/* =========================================================
   Safe Helpers
========================================================= */

function normalizeText(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function normalizeSlug(value: unknown): string {
  return normalizeText(value)
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .replace(/^tools\//, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeTags(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return Array.from(
    new Set(
      value
        .map((item) => normalizeText(item))
        .filter(Boolean),
    ),
  );
}

function normalizeToolType(value: unknown): ToolType {
  const type = normalizeText(value).toLowerCase();

  const supportedTypes: ToolType[] = [
    "calculator",
    "template",
    "checklist",
    "guide",
    "document",
    "utility",
    "tool",
  ];

  if (supportedTypes.includes(type as ToolType)) {
    return type as ToolType;
  }

  return "tool";
}

function createReadableLabel(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getToolTitle(tool: ToolData): string {
  return (
    normalizeText(tool.hero?.title) ||
    normalizeText(tool.hero?.heading) ||
    normalizeText(tool.title) ||
    normalizeText(tool.name) ||
    normalizeText(tool.seo?.title) ||
    normalizeText(tool.meta?.title) ||
    createReadableLabel(tool.slug)
  );
}

function getToolDescription(tool: ToolData): string {
  return (
    normalizeText(tool.hero?.description) ||
    normalizeText(tool.description) ||
    normalizeText(tool.excerpt) ||
    normalizeText(tool.summary) ||
    normalizeText(tool.seo?.description) ||
    normalizeText(tool.meta?.description) ||
    "Explore this practical blockchain resource from ClickMasters."
  );
}

function getToolCategory(tool: ToolData): string {
  const category = normalizeText(tool.category);

  if (category) {
    return category;
  }

  const type = normalizeToolType(tool.type);

  const categoryMap: Record<ToolType, string> = {
    calculator: "Calculators",
    template: "Templates",
    checklist: "Checklists",
    guide: "Guides",
    document: "Documents",
    utility: "Utilities",
    tool: "Blockchain Tools",
  };

  return categoryMap[type];
}

function getToolBadge(tool: ToolData): string {
  return (
    normalizeText(tool.hero?.badge) ||
    normalizeText(tool.hero?.eyebrow) ||
    getToolCategory(tool)
  );
}

function getToolHref(tool: ToolData): string {
  const seoUrl =
    normalizeText(tool.seo?.url) ||
    normalizeText(tool.meta?.url);

  if (seoUrl) {
    const normalizedUrl = `/${seoUrl.replace(/^\/+|\/+$/g, "")}`;

    if (normalizedUrl.startsWith("/tools/")) {
      return normalizedUrl;
    }
  }

  return `/tools/${normalizeSlug(tool.slug)}`;
}

function getToolSearchText(tool: ToolData): string {
  const secondaryKeywords = [
    ...(tool.seo?.secondaryKeywords || []),
    ...(tool.meta?.secondaryKeywords || []),
  ];

  return [
    getToolTitle(tool),
    getToolDescription(tool),
    getToolCategory(tool),
    normalizeText(tool.type),
    normalizeText(tool.seo?.primaryKeyword),
    normalizeText(tool.meta?.primaryKeyword),
    ...secondaryKeywords,
    ...(tool.tags || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function getToolReadTime(tool: ToolData): string {
  const explicitReadTime = normalizeText(tool.readTime);

  if (explicitReadTime) {
    return explicitReadTime;
  }

  const content = Array.isArray(tool.content)
    ? tool.content
    : [];

  const wordCount = content.reduce((total, block) => {
    if (!block || typeof block !== "object") {
      return total;
    }

    const record = block as UnknownRecord;
    const text = normalizeText(record.text);
    const items = Array.isArray(record.items)
      ? record.items
      : [];

    const itemWords = items.reduce((itemTotal, item) => {
      if (typeof item === "string") {
        return itemTotal + item.split(/\s+/).filter(Boolean).length;
      }

      if (item && typeof item === "object") {
        return (
          itemTotal +
          Object.values(item as UnknownRecord)
            .map((value) => normalizeText(value))
            .join(" ")
            .split(/\s+/)
            .filter(Boolean).length
        );
      }

      return itemTotal;
    }, 0);

    return (
      total +
      text.split(/\s+/).filter(Boolean).length +
      itemWords
    );
  }, 0);

  const minutes = Math.max(3, Math.ceil(wordCount / 220));

  return `${minutes} min read`;
}

/* =========================================================
   Normalized Data
========================================================= */

const rawTools: unknown[] = Array.isArray(tools)
  ? (tools as unknown[])
  : [];

const normalizedTools: ToolData[] = rawTools
  .filter(
    (tool): tool is ToolData =>
      Boolean(
        tool &&
          typeof tool === "object" &&
          normalizeText((tool as ToolData).slug),
      ),
  )
  .map((tool) => ({
    ...tool,
    slug: normalizeSlug(tool.slug),
    type: normalizeToolType(tool.type),
    category: getToolCategory(tool),
    tags: normalizeTags(tool.tags),
  }));

/* =========================================================
   Public Tool Functions
========================================================= */

export function getAllTools(): ToolData[] {
  return [...normalizedTools];
}

export function getToolBySlug(
  slug: string,
): ToolData | undefined {
  const normalizedSlug = normalizeSlug(slug);

  return normalizedTools.find(
    (tool) => tool.slug === normalizedSlug,
  );
}

export function getToolCards(): ToolCardData[] {
  return normalizedTools.map((tool) => {
    const description = getToolDescription(tool);

    return {
      slug: tool.slug,
      title: getToolTitle(tool),
      description,
      excerpt: description,
      category: getToolCategory(tool),
      type: normalizeToolType(tool.type),
      href: getToolHref(tool),
      tags: normalizeTags(tool.tags),
      badge: getToolBadge(tool),
      featured: Boolean(tool.featured),
      readTime: getToolReadTime(tool),
      status: normalizeText(tool.status) || "Available",
    };
  });
}

export function getToolCategories(): string[] {
  return Array.from(
    new Set(
      normalizedTools
        .map((tool) => getToolCategory(tool))
        .filter(Boolean),
    ),
  ).sort((first, second) =>
    first.localeCompare(second),
  );
}

export function getToolsByCategory(
  category: string,
): ToolData[] {
  const normalizedCategory = normalizeText(category).toLowerCase();

  if (!normalizedCategory || normalizedCategory === "all") {
    return getAllTools();
  }

  return normalizedTools.filter(
    (tool) =>
      getToolCategory(tool).toLowerCase() ===
      normalizedCategory,
  );
}

export function getToolsByType(
  type: ToolType,
): ToolData[] {
  return normalizedTools.filter(
    (tool) => normalizeToolType(tool.type) === type,
  );
}

export function getFeaturedTools(
  limit?: number,
): ToolData[] {
  const featuredTools = normalizedTools.filter(
    (tool) => Boolean(tool.featured),
  );

  if (typeof limit === "number" && limit > 0) {
    return featuredTools.slice(0, limit);
  }

  return featuredTools;
}

export function searchTools(
  query: string,
): ToolData[] {
  const normalizedQuery = normalizeText(query).toLowerCase();

  if (!normalizedQuery) {
    return getAllTools();
  }

  return normalizedTools.filter((tool) =>
    getToolSearchText(tool).includes(normalizedQuery),
  );
}

export function getRelatedTools(
  currentSlug: string,
  limit = 3,
): ToolCardData[] {
  const currentTool = getToolBySlug(currentSlug);

  if (!currentTool) {
    return [];
  }

  const currentCategory =
    getToolCategory(currentTool).toLowerCase();

  const currentTags = new Set(
    normalizeTags(currentTool.tags).map((tag) =>
      tag.toLowerCase(),
    ),
  );

  return normalizedTools
    .filter((tool) => tool.slug !== currentTool.slug)
    .map((tool) => {
      const sameCategory =
        getToolCategory(tool).toLowerCase() ===
        currentCategory;

      const sharedTags = normalizeTags(tool.tags).filter(
        (tag) => currentTags.has(tag.toLowerCase()),
      ).length;

      const score =
        (sameCategory ? 10 : 0) +
        sharedTags * 3 +
        (tool.featured ? 1 : 0);

      return {
        tool,
        score,
      };
    })
    .sort((first, second) => second.score - first.score)
    .slice(0, Math.max(limit, 0))
    .map(({ tool }) => {
      const description = getToolDescription(tool);

      return {
        slug: tool.slug,
        title: getToolTitle(tool),
        description,
        excerpt: description,
        category: getToolCategory(tool),
        type: normalizeToolType(tool.type),
        href: getToolHref(tool),
        tags: normalizeTags(tool.tags),
        badge: getToolBadge(tool),
        featured: Boolean(tool.featured),
        readTime: getToolReadTime(tool),
        status: normalizeText(tool.status) || "Available",
      };
    });
}

export function estimateToolReadTime(tool: ToolData): string {
  return getToolReadTime(tool);
}

export function getToolCTA(tool: ToolData): {
  title?: string;
  description?: string;
  primaryText: string;
  secondaryText?: string;
  href: string;
  secondaryHref?: string;
} {
  return {
    title:
      normalizeText(tool.cta?.title) ||
      `Need help with ${getToolTitle(tool)}?`,
    description:
      normalizeText(tool.cta?.description) ||
      "Talk with ClickMasters and get expert guidance tailored to your product, architecture, budget, timeline, and technical goals.",
    primaryText:
      normalizeText(tool.cta?.primaryText) ||
      "Book a Free Strategy Call",
    secondaryText: normalizeText(tool.cta?.secondaryText),
    href: normalizeText(tool.cta?.href) || "/contact",
    secondaryHref:
      normalizeText(tool.cta?.secondaryHref) ||
      "/tools",
  };
}

export function getToolStaticParams(): Array<{
  slug: string;
}> {
  return normalizedTools.map((tool) => ({
    slug: tool.slug,
  }));
}

export function toolExists(slug: string): boolean {
  return Boolean(getToolBySlug(slug));
}
