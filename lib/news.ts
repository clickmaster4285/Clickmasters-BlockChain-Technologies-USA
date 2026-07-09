import { news } from "@/data/news";

export function getAllNews() {
  return news || [];
}

export function getNewsBySlug(slug: string) {
  return getAllNews().find((item: any) => item.slug === slug);
}

export function getRelatedNews(slug: string, limit = 4) {
  return getAllNews()
    .filter((item: any) => item.slug !== slug)
    .slice(0, limit);
}

export function estimateNewsReadTime(item: any) {
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

export function getNewsCta(item: any) {
  return {
    title: item.cta?.title || "Need help applying this news to your business?",
    description:
      item.cta?.description ||
      "Talk with ClickMasters and understand how this blockchain update affects your product, roadmap, or investment decision.",
    primaryText: item.cta?.primaryText || "Book a Free Strategy Call",
    secondaryText: item.cta?.secondaryText || "View More News",
    href: "/contact",
  };
}

export function getNewsCards() {
  return getAllNews().map((item: any) => ({
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt || item.hero?.description || item.title,
    category: item.category || "News",
    readTime: item.readTime,
    image: item.image,
    badge: item.hero?.badge || item.category || "News",
    date: item.date || item.published,
    author: item.author,
  }));
}