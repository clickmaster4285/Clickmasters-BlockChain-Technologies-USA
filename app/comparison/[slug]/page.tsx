import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import ComparisonHero from "@/components/comparison/ComparisonHero";
import ComparisonArticle from "@/components/comparison/ComparisonArticle";
import ComparisonSidebar from "@/components/comparison/ComparisonSidebar";
import ComparisonCTA from "@/components/comparison/ComparisonCTA";
import ComparisonFAQ from "@/components/comparison/ComparisonFAQ";
import {
  estimateReadTime,
  getAllComparisonArticles,
  getComparisonArticleBySlug,
  getRelatedComparisons,
} from "@/lib/comparison";

export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllComparisonArticles().map((item: any) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getComparisonArticleBySlug(slug);

  if (!article) return {};

  return {
    title: `${article.title} — ClickMasters`,
    description: article.excerpt || article.hero?.description || "Blockchain comparison and decision guide.",
    openGraph: {
      title: `${article.title} — ClickMasters`,
      description: article.excerpt || article.hero?.description || "Blockchain comparison and decision guide.",
    },
  };
}

export default async function SingleComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = getComparisonArticleBySlug(slug);

  if (!article) return notFound();

  const readTime = estimateReadTime(article.content);
  const related = getRelatedComparisons(slug, 4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-surface/40 to-bg-base pt-32 pb-24">
        <div className="pointer-events-none absolute left-[-14rem] top-[-10rem] h-[32rem] w-[32rem] rounded-full bg-amber-base/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-12rem] top-80 h-[28rem] w-[28rem] rounded-full bg-amber-base/10 blur-3xl" />

        <section className="site-container relative px-6">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-silver">
            <Link href="/" className="hover:text-amber-base">
              Home
            </Link>
            <span>/</span>
            <Link href="/comparison" className="hover:text-amber-base">
              Comparisons
            </Link>
            <span>/</span>
            <span className="text-silver-light">{article.title}</span>
          </nav>

          <ComparisonHero article={article} readTime={readTime} />

          <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
  <ComparisonArticle
  article={article}
  showFaq={false}
  showBottomCta={false}
/>

  <ComparisonSidebar
    article={article}
    related={related}
    readTime={readTime}
  />
</section>
<ComparisonFAQ article={article} />

<ComparisonFAQ article={article} />

<div className="mt-8"> {/* mt-8 ka matlab hai margin-top: 2rem */}
  <ComparisonCTA
    cta={{
      text: article.cta?.primaryText || "Book a Free Strategy Call",
      href: "/contact",
      primary: true,
    }}
    title={article.cta?.title || "Ready to make the right technical decision?"}
    description={
      article.cta?.description ||
      "We can help you choose the right chain, architecture, smart contract strategy, and launch plan."
    }
  />
</div>

        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}