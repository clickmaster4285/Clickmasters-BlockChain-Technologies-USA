import Link from "next/link";
import { notFound } from "next/navigation";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";

import ToolHero from "@/components/tools/ToolHero";
import ToolContent from "@/components/tools/ToolContent";
import ToolSidebar from "@/components/tools/ToolSidebar";
import ToolFAQ from "@/components/tools/ToolFAQ";
import ToolCTA from "@/components/tools/ToolCTA";
import { createMetadata } from "@/config/metadata";

import {
  estimateToolReadTime,
  getAllTools,
  getRelatedTools,
  getToolBySlug,
  getToolCTA,
} from "@/lib/tools";

export async function generateStaticParams() {
  return getAllTools()
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
  const item = getToolBySlug(slug);

  if (!item) return {};

  const title =
    item?.seo?.title ||
    item?.hero?.title ||
    item?.title ||
    "Blockchain Tool";

  const description =
    item?.seo?.description ||
    item?.excerpt ||
    item?.description ||
    item?.hero?.description ||
    "Use this practical blockchain tool to improve your planning, analysis, security, and technical decision-making.";

  const image =
    item?.seo?.image ||
    item?.image ||
    "/assets/tools-hero.png";

  return createMetadata({
    title,
    description,
    path: `/tools/${item.slug || slug}`,
    image,
    type: "article",
  });
}

export default async function SingleToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item = getToolBySlug(slug);

  if (!item) {
    return notFound();
  }

  const readTime = estimateToolReadTime(item);
  const related = getRelatedTools(slug, 4);
  const cta = getToolCTA(item);

  const pageTitle =
    item?.hero?.title ||
    item?.title ||
    "Blockchain Tool";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-surface/40 to-bg-base pb-24 pt-32">
        {/* Background decoration */}
        <div className="pointer-events-none absolute left-[-14rem] top-[-10rem] h-[32rem] w-[32rem] rounded-full bg-amber-base/10 blur-3xl" />

        <div className="pointer-events-none absolute right-[-12rem] top-80 h-[28rem] w-[28rem] rounded-full bg-amber-base/10 blur-3xl" />

        <div className="pointer-events-none absolute left-1/2 top-[48rem] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-amber-base/5 blur-3xl" />

        <section className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav
            className="mb-6 flex min-w-0 flex-wrap items-center gap-2 text-sm text-silver"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="transition-colors hover:text-amber-base"
            >
              Home
            </Link>

            <span
              aria-hidden="true"
              className="text-silver/50"
            >
              /
            </span>

            <Link
              href="/tools"
              className="transition-colors hover:text-amber-base"
            >
              Tools
            </Link>

            <span
              aria-hidden="true"
              className="text-silver/50"
            >
              /
            </span>

            <span className="min-w-0 max-w-full truncate text-silver-light">
              {pageTitle}
            </span>
          </nav>

          {/* Hero */}
          <ToolHero
            item={item}
            readTime={readTime}
          />

          {/* Main content and sidebar */}
          <section className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0">
              <ToolContent
                item={item}
                cta={cta}
              />
            </div>

            <div className="min-w-0">
              <ToolSidebar
                item={item}
                related={related}
                readTime={readTime}
              />
            </div>
          </section>

          {/* Full-width FAQ */}
          <ToolFAQ item={item} />

          {/* Final full-width CTA */}
          <div className="mt-6">
            <ToolCTA
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
