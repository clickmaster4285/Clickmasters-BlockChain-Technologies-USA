import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import GlossaryHero from "@/components/glossary/GlossaryHero";
import GlossaryContent from "@/components/glossary/GlossaryContent";
import GlossarySidebar from "@/components/glossary/GlossarySidebar";
import GlossaryFAQ from "@/components/glossary/GlossaryFAQ";
import GlossaryCTA from "@/components/glossary/GlossaryCTA";
import { createMetadata } from "@/config/metadata";
import {
  estimateGlossaryReadTime,
  getAllGlossaryTerms,
  getGlossaryCTA,
  getGlossaryTermBySlug,
  getRelatedGlossaryTerms,
} from "@/lib/glossary";

export async function generateStaticParams() {
  return getAllGlossaryTerms()
    .filter((item: any) => item?.slug)
    .map((item: any) => ({
      slug: item.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getGlossaryTermBySlug(slug);

  if (!item) return {};

  const title =
    item.seo?.title ||
    item.title ||
    item.term ||
    "Blockchain Glossary";

  const description =
    item.seo?.description ||
    item.definition ||
    item.excerpt ||
    item.description ||
    item.hero?.description ||
    `Learn what ${item.term || item.title} means and how it is used in blockchain and Web3.`;

  return createMetadata({
    title,
    description,
    path: `/glossary/${item.slug || slug}`,
    type: "article",
  });
}

export default async function SingleGlossaryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item = getGlossaryTermBySlug(slug);

  if (!item) return notFound();

  const readTime = estimateGlossaryReadTime(item);
  const related = getRelatedGlossaryTerms(slug, 6);
  const cta = getGlossaryCTA(item);

  const pageTitle =
    item.title ||
    item.term ||
    "Blockchain Glossary Term";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-surface/40 to-bg-base pb-24 pt-32">
        <div className="pointer-events-none absolute left-[-14rem] top-[-10rem] h-[32rem] w-[32rem] rounded-full bg-amber-base/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-12rem] top-80 h-[28rem] w-[28rem] rounded-full bg-amber-base/10 blur-3xl" />

        <section className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          <nav
            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-silver"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="transition-colors hover:text-amber-base"
            >
              Home
            </Link>

            <span aria-hidden="true">/</span>

            <Link
              href="/glossary"
              className="transition-colors hover:text-amber-base"
            >
              Glossary
            </Link>

            <span aria-hidden="true">/</span>

            <span className="max-w-full truncate text-silver-light">
              {pageTitle}
            </span>
          </nav>

          <GlossaryHero
            item={item}
            readTime={readTime}
          />

          <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <GlossaryContent
              item={item}
              cta={cta}
            />

            <GlossarySidebar
              item={item}
              related={related}
              readTime={readTime}
            />
          </section>

          <GlossaryFAQ item={item} />

          
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
