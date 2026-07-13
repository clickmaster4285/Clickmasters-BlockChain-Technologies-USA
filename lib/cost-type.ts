/**
 * lib/cost-types.ts
 * Shared types for the /cost content system.
 * Put this file at lib/cost-types.ts — costs-data.ts imports from it.
 */

export interface CostMeta {
  url: string;
  title: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  schema: string;
  wordCount: number;
}

export interface CostSection {
  heading: string;
  content: string;
  bullets?: string[];
}

export interface CostFAQItem {
  question: string;
  answer: string;
}

export interface CostCTAItem {
  text: string;
  href: string;
  primary: boolean;
}

export interface CostItem {
  slug: string;
  meta: CostMeta;
  sections: CostSection[];
  faq: CostFAQItem[];
  ctas: CostCTAItem[];
  tags: string[];
  category?: string;
}

export interface CostCard {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags?: string[];
  url: string;
}

export interface CostCardOptions {
  tag?: string;
  search?: string;
  offset?: number;
  limit?: number;
} 