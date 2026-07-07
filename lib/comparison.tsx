import { comparisons } from "@/data/comparisons";

export function cleanComparisonTitle(title: string) {
  return title?.replace(/^H1:\s*/i, "")?.trim() || "Comparison Guide";
}

export function createComparisonSlug(title: string, fallback: string) {
  return (
    title
      ?.replace(/^H1:\s*/i, "")
      ?.toLowerCase()
      ?.replace(/[^a-z0-9]+/g, "-")
      ?.replace(/^-+|-+$/g, "") || fallback
  );
}

export function cleanComparisonContent(content: string) {
  return (
    content
      ?.replace(/URL:\*Schema:\*\*\*Internal Links:\*/g, "")
      ?.replace(/\[BUTTON — PRIMARY\].*/g, "")
      ?.replace(/\*\*/g, "")
      ?.replace(/\*/g, "")
      ?.replace(/---/g, "")
      ?.trim() || ""
  );
}

export function getAllComparisonArticles() {
  return comparisons || [];
}

export function getComparisonArticleBySlug(slug: string) {
  return getAllComparisonArticles().find((item: any) => item.slug === slug);
}

export function getRelatedComparisons(slug: string, limit = 4) {
  return getAllComparisonArticles()
    .filter((item: any) => item.slug !== slug)
    .slice(0, limit);
}

function extractTextFromContent(content: any): string {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((block) => {
        if (typeof block === "string") return block;
        if (block.type === "table") {
          const textRows = block.rows?.flatMap((row: any[]) => row) || [];
          return textRows.join(" ");
        }
        if (block.type === "list") {
          return (block.items || []).join(" ");
        }
        return block.text || "";
      })
      .join(" ");
  }
  return String(content);
}

export function estimateReadTime(content: any) {
  const text = extractTextFromContent(content);
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 220));
}

export function getComparisonCta(article: any) {
  const cta = article?.cta || {};

  return {
    text: cta.primaryText || cta.title || "Book a Free Strategy Call",
    href: cta.href && cta.href !== "#" ? cta.href : "/contact",
    primary: true,
  };
}

export function getComparisonExcerpt(content: string, limit = 170) {
  const text = cleanComparisonContent(content)
    .replace(/#+/g, "")
    .replace(/\|/g, " ")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > limit ? `${text.slice(0, limit)}...` : text;
}