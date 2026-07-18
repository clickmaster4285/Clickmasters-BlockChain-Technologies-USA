import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import NewsHero from "@/components/news/NewsHero";
import NewsContent from "@/components/news/NewsContent";
import NewsSidebar from "@/components/news/NewsSidebar";
import NewsFAQ from "@/components/news/NewsFAQ";
import NewsCTA from "@/components/news/NewsCTA";
import { createMetadata } from "@/config/metadata";
import {
  estimateNewsReadTime,
  getAllNews,
  getNewsBySlug,
  getNewsCta,
  getRelatedNews,
} from "@/lib/news";

export async function generateStaticParams() {
  return getAllNews().map((item: any) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);

  if (!item) return {};

  return createMetadata({
    title: item.title,
    description: item.excerpt || item.hero?.description || item.title,
    path: `/news/${item.slug || slug}`,
    type: "article",
  });
}

export default async function SingleNewsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);

  if (!item) return notFound();

  const readTime = estimateNewsReadTime(item);
  const related = getRelatedNews(slug, 4);
  const cta = getNewsCta(item);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-surface/40 to-bg-base pt-32 pb-24">
        <div className="pointer-events-none absolute left-[-14rem] top-[-10rem] h-[32rem] w-[32rem] rounded-full bg-amber-base/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-12rem] top-80 h-[28rem] w-[28rem] rounded-full bg-amber-base/10 blur-3xl" />

        <section className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-silver">
            <Link href="/" className="hover:text-amber-base">
              Home
            </Link>
            <span>/</span>
            <Link href="/news" className="hover:text-amber-base">
              News
            </Link>
            <span>/</span>
            <span className="text-silver-light">{item.title}</span>
          </nav>

          <NewsHero item={item} readTime={readTime} />

          <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <NewsContent item={item} cta={cta} />

            <NewsSidebar
              item={item}
              related={related}
              readTime={readTime}
            />
          </section>

          <NewsFAQ item={item} />

          <div className="mt-6">
            <NewsCTA
              cta={cta}
              title={cta.title}
              description={cta.description}
            />
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
