/**
 * Shared content model for the untyped JS content collections in `data/`
 * (news, how-tos, listicles, glossary, tools, templates, resources,
 * comparisons). All collections are generated from one template, so they
 * share a base item shape and a common set of content blocks.
 *
 * Fields that every data item actually contains are required; fields that
 * the rendering/helper code reads defensively (aliases such as `term`,
 * `definition`, `group`, `published`, ...) are modelled as optional.
 */

/* ---------------------------------------------------------------------------
 * Blocks
 * ------------------------------------------------------------------------- */

/** Object form of a list/step entry (lists in the data are plain strings). */
export interface ContentListObject {
  title?: string;
  description?: string;
  text?: string;
}

export type ContentListEntry = string | ContentListObject;

/**
 * Fields any block may carry; specific block types narrow some of them.
 * Declared as type aliases (not interfaces) so blocks stay assignable to
 * `Record<string, unknown>` for generic helpers.
 */
type ContentBlockFields = {
  text?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  items?: ContentListEntry[];
  points?: string[];
  rank?: number | string;
  columns?: string[];
  headers?: string[];
  rows?: string[][];
  code?: string;
  language?: string;
};

/** A block of kind `Type` whose `Narrowed` fields replace the generic ones. */
type BlockOf<Type extends string, Narrowed extends object = object> = Omit<
  ContentBlockFields,
  keyof Narrowed
> & { type: Type } & Narrowed;

export type TextBlock = BlockOf<
  | "featuredAnswer"
  | "definition"
  | "heading"
  | "subheading"
  | "paragraph"
  | "quote"
  | "note"
  | "info"
  | "example"
  | "result"
  | "summary"
  | "code",
  { text: string }
>;

export type CodeBlock = BlockOf<"codeBlock", { code: string }>;

export type ListBlock = BlockOf<"list", { items: string[] }>;

export type StepsBlock = BlockOf<"steps", { items: ContentListObject[] }>;

export type TableBlock = BlockOf<
  "table",
  { columns: string[]; rows: string[][] }
>;

/** Table variant used by `data/resources.js` (`headers` instead of `columns`). */
export type HeaderTableBlock = BlockOf<
  "table",
  { headers: string[]; rows: string[][] }
>;

export type RankedItemBlock = BlockOf<
  "rankedItem",
  { title: string; points: string[] }
>;

/** A content block, discriminated by `type`. */
export type ContentBlock =
  | TextBlock
  | CodeBlock
  | ListBlock
  | StepsBlock
  | TableBlock
  | RankedItemBlock;

/* ---------------------------------------------------------------------------
 * Item parts
 * ------------------------------------------------------------------------- */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContentHero {
  badge?: string;
  title?: string;
  description?: string;
}

/** CTA as stored on a content item. */
export interface ContentCta {
  title?: string;
  description?: string;
  primaryText?: string;
  secondaryText?: string;
  href?: string;
  primaryHref?: string;
  secondaryHref?: string;
}

/** CTA after the lib helpers have applied defaults (`getNewsCta`, ...). */
export interface ResolvedCta {
  title?: string;
  description?: string;
  primaryText: string;
  secondaryText?: string;
  href: string;
  secondaryHref?: string;
}

export interface ContentMeta {
  title?: string;
  description?: string;
}

export interface ContentSeo {
  title?: string;
  description?: string;
  image?: string;
}

/** Tags may be plain strings or labelled objects. */
export type ContentTag =
  | string
  | {
      title?: string;
      label?: string;
      text?: string;
    };

/* ---------------------------------------------------------------------------
 * Items
 * ------------------------------------------------------------------------- */

export interface ContentItem<Block = ContentBlock> {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  hero: ContentHero;
  credibility: string[];
  content: Block[];
  faqs: FAQItem[];
  cta: ContentCta;
  /** Optional aliases read by the helpers/components. */
  published?: string;
  description?: string;
  faq?: FAQItem[];
  tags?: ContentTag[];
  keywords?: ContentTag[];
}

export type NewsItem = ContentItem;
export type HowToItem = ContentItem;
export type ListicleItem = ContentItem;

export interface ComparisonItem extends ContentItem {
  meta?: ContentMeta & { wordCount?: number | string };
  /** Optional: no comparison in the current data defines tags. */
  tags?: string[];
}

export interface GlossaryItem extends ContentItem {
  term?: string;
  definition?: string;
  group?: string;
  type?: string;
  seo?: ContentSeo;
}

/** Legacy section shape some template helpers fall back to. */
export interface TemplateSection {
  title?: string;
  heading?: string;
  content?: string;
  description?: string;
  text?: string;
  items?: ContentListEntry[];
}

export interface TemplateItem extends ContentItem {
  name?: string;
  type?: string;
  group?: string;
  badge?: string;
  format?: string;
  fileType?: string;
  featured?: boolean;
  sections?: TemplateSection[];
  sectionsCount?: number;
  preview?: TemplateSection[];
  meta?: ContentMeta;
  seo?: ContentSeo;
}

export type ResourceBlock =
  | Exclude<ContentBlock, TableBlock>
  | HeaderTableBlock;

export interface ResourceItem extends ContentItem<ResourceBlock> {
  name?: string;
  type?: string;
  group?: string;
  badge?: string;
  format?: string;
  resourceType?: string;
  featured?: boolean;
  popular?: boolean;
  /** Resource cards/listings consume tags as plain strings. */
  tags?: string[];
}
