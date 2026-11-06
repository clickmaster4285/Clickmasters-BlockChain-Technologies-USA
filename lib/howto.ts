import { howTos } from "@/data/howtos";
import type { HowToItem } from "@/lib/content-types";

export function getAllHowTos(): HowToItem[] {
  return (howTos || []) as HowToItem[];
}

export function getHowToBySlug(slug: string) {
  return getAllHowTos().find((item) => item.slug === slug);
}

export function getRelatedHowTos(slug: string, limit = 4) {
  return getAllHowTos()
    .filter((item) => item.slug !== slug)
    .slice(0, limit);
}

export function estimateHowToReadTime(item: HowToItem) {
  if (item.readTime) return item.readTime;

  const text =
    item.content
      ?.map((block) => {
        if (block.text) return block.text;
        if (block.items) return block.items.join(" ");
        if (block.rows) return block.rows.flat().join(" ");
        if (block.code) return block.code;
        return "";
      })
      .join(" ") || "";

  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(3, Math.ceil(words / 220))} min read`;
}

export function getHowToCta(item: HowToItem) {
  return {
    title: item.cta?.title || "Need help implementing this?",
    description:
      item.cta?.description ||
      "Get expert guidance from ClickMasters and turn this how-to into a production-ready implementation.",
    primaryText: item.cta?.primaryText || "Book a Free Strategy Call",
    secondaryText: item.cta?.secondaryText || "View Related Guides",
    href: "/contact",
  };
}

export function getHowToCards() {
  return getAllHowTos().map((item) => ({
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt || item.hero?.description || item.title,
    category: item.category || "How To",
    readTime: item.readTime,
    image: item.image,
    badge: item.hero?.badge || "GUIDE",
  }));
}

export type HowToCardData = ReturnType<typeof getHowToCards>[number];
