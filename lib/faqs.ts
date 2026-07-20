import faqHubsData from "@/data/faqs.js";

export type FAQContentBlockType =
  | "featuredAnswer"
  | "heading"
  | "paragraph"
  | "list"
  | "table"
  | "code";

export interface FAQContentBlock {
  type: FAQContentBlockType;
  text?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
}

export interface NestedFAQItem {
  question: string;
  answer: string;
}

export interface FAQCTA {
  title: string;
  description: string;
  primaryText: string;
  secondaryText: string;
}

export interface FAQItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image?: string;
  hero?: {
    badge?: string;
    title?: string;
    description?: string;
  };
  credibility: string[];
  content: FAQContentBlock[];
  faqs: NestedFAQItem[];
  cta?: FAQCTA;
}

export interface FAQCategoryItem {
  slug: "all" | string;
  label: string;
  description: string;
}

const rawFAQs = faqHubsData as FAQItem[];

const categoryDescriptions: Record<string, string> = {
  FAQ: "Core blockchain, Web3, DeFi, NFT, exchange, and tokenization questions.",
  "Case Studies": "Real project outcomes, delivery decisions, and measurable results.",
  Tools: "Technical workflows, deployment automation, APIs, and practical resources.",
  Glossary: "Deep explanations of blockchain and DeFi architecture terms.",
  Services: "Consulting and delivery guidance for blockchain projects.",
  Locations: "Location-specific blockchain development guidance.",
  Resources: "Broader content library updates and strategic resources.",
};

export const faqs: FAQItem[] = rawFAQs;

export const faqCategories: FAQCategoryItem[] = [
  {
    slug: "all",
    label: "All",
    description: "Browse every FAQ hub and related blockchain resource.",
  },
  ...Array.from(new Set(faqs.map((faq) => faq.category))).map(
    (category) => ({
      slug: category,
      label: category,
      description:
        categoryDescriptions[category] ||
        `Browse ${category.toLowerCase()} questions and resources.`,
    })
  ),
];

export function getAllFAQs(): FAQItem[] {
  return faqs;
}

export function getFeaturedFAQs(): FAQItem[] {
  return faqs.filter((faq) => faq.category === "FAQ").slice(0, 6);
}

export function getFAQBySlug(slug: string): FAQItem | undefined {
  return faqs.find((faq) => faq.slug === slug);
}

export function getFAQsByCategory(category: string): FAQItem[] {
  return faqs.filter((faq) => faq.category === category);
}

export function getRelatedFAQs(
  currentSlug: string,
  category: string,
  limit = 3
): FAQItem[] {
  const sameCategory = faqs.filter(
    (faq) => faq.slug !== currentSlug && faq.category === category
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  return [
    ...sameCategory,
    ...faqs.filter(
      (faq) => faq.slug !== currentSlug && faq.category !== category
    ),
  ].slice(0, limit);
}

export function searchFAQs(query: string): FAQItem[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return faqs;
  }

  return faqs.filter((faq) => {
    const searchableContent = [
      faq.title,
      faq.excerpt,
      faq.category,
      faq.hero?.badge,
      faq.hero?.title,
      faq.hero?.description,
      ...faq.credibility,
      ...faq.content.map((block) =>
        [
          block.text,
          ...(block.items || []),
          ...(block.headers || []),
          ...(block.rows || []).flat(),
        ]
          .filter(Boolean)
          .join(" ")
      ),
      ...faq.faqs.flatMap((item) => [item.question, item.answer]),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableContent.includes(normalizedQuery);
  });
}

export function getFAQSlugs(): string[] {
  return faqs.map((faq) => faq.slug);
}
