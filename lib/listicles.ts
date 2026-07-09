import { listicles } from "@/data/listicles";

export function getAllListicles() {
  return listicles || [];
}

export function getListicleBySlug(slug: string) {
  return getAllListicles().find((item: any) => item.slug === slug);
}

export function getRelatedListicles(slug: string, limit = 4) {
  return getAllListicles()
    .filter((item: any) => item.slug !== slug)
    .slice(0, limit);
}

export function estimateListicleReadTime(item: any) {
  if (item.readTime) return item.readTime;

  const text =
    item.content
      ?.map((block: any) => {
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

export function getListicleCta(item: any) {
  return {
    title: item.cta?.title || "Need expert help choosing the right option?",
    description:
      item.cta?.description ||
      "Get practical guidance from ClickMasters and make a better blockchain decision.",
    primaryText: item.cta?.primaryText || "Book a Free Strategy Call",
    secondaryText: item.cta?.secondaryText || "View Related Lists",
    href: "/contact",
  };
}

export function getListicleCards() {
  return getAllListicles().map((item: any) => ({
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt || item.hero?.description || item.title,
    category: item.category || "Listicle",
    readTime: item.readTime,
    image: item.image,
    badge: item.hero?.badge || "LIST",
  }));
}