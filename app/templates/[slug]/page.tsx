import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, FileText, Home, Sparkles } from "lucide-react";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";

import TemplateHero from "@/components/templates/TemplateHero";
import TemplateContent from "@/components/templates/TemplateContent";
import TemplateSidebar from "@/components/templates/TemplateSidebar";
import TemplateFAQ from "@/components/templates/TemplateFAQ";
import TemplateCTA from "@/components/templates/TemplateCTA";

import {
  estimateTemplateReadTime,
  getAllTemplates,
  getRelatedTemplates,
  getTemplateBySlug,
  getTemplateCTA,
} from "@/lib/templates";

type TemplatePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/*
|--------------------------------------------------------------------------
| Generate static template routes
|--------------------------------------------------------------------------
*/

export async function generateStaticParams() {
  return getAllTemplates()
    .filter((item: any) => Boolean(item?.slug))
    .map((item: any) => ({
      slug: item.slug,
    }));
}

/*
|--------------------------------------------------------------------------
| Dynamic metadata
|--------------------------------------------------------------------------
*/

export async function generateMetadata({
  params,
}: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getTemplateBySlug(slug);

  if (!item) {
    return {
      title: "Template Not Found — ClickMasters",
      description: "The requested blockchain template could not be found.",
    };
  }

  const title =
    item?.seo?.title ||
    item?.hero?.title ||
    item?.meta?.title ||
    item?.title ||
    "Blockchain Template";

  const description =
    item?.seo?.description ||
    item?.excerpt ||
    item?.description ||
    item?.hero?.description ||
    item?.sections?.[0]?.content ||
    "Explore this professional blockchain template from ClickMasters.";

  const image =
    item?.seo?.image || item?.image || "/assets/templates-hero.webp";

  return {
    title: `${title} | ClickMasters`,
    description,

    openGraph: {
      title: `${title} | ClickMasters`,
      description,
      type: "article",
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | ClickMasters`,
      description,
      images: [image],
    },
  };
}

/*
|--------------------------------------------------------------------------
| Single template page
|--------------------------------------------------------------------------
*/

export default async function TemplateSlugPage({ params }: TemplatePageProps) {
  const { slug } = await params;

  const item = getTemplateBySlug(slug);

  if (!item) {
    notFound();
  }

  const readTime = estimateTemplateReadTime(item);
  const relatedTemplates = getRelatedTemplates(slug, 4);
  const cta = getTemplateCTA(item);

  const pageTitle =
    item?.hero?.title ||
    item?.meta?.title ||
    item?.title ||
    "Blockchain Template";

  const category = item?.category || item?.type || item?.group || "Templates";

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-amber-base/5 to-bg-base pb-24 pt-28 sm:pt-32">
        {/* Main background grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(100,116,139,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.055)_1px,transparent_1px)] bg-[size:68px_68px] opacity-70" />

        {/* Animated ambient glows */}
        <div className="pointer-events-none absolute -left-72 -top-56 h-[46rem] w-[46rem] animate-template-ambient-one rounded-full bg-amber-base/[0.09] blur-[140px]" />

        <div className="pointer-events-none absolute -right-72 top-[34rem] h-[42rem] w-[42rem] animate-template-ambient-two rounded-full bg-emerald-base/[0.06] blur-[140px]" />

        <div className="pointer-events-none absolute left-1/2 top-[85rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-amber-base/[0.04] blur-[120px]" />

        {/* Decorative particles */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <span className="absolute left-[6%] top-[12%] h-1.5 w-1.5 animate-template-page-particle rounded-full bg-amber-base" />

          <span className="absolute right-[9%] top-[18%] h-1 w-1 animate-template-page-particle-delayed rounded-full bg-blue-300" />

          <span className="absolute left-[12%] top-[44rem] h-1 w-1 animate-template-page-particle-delayed rounded-full bg-amber-base" />

          <span className="absolute right-[8%] top-[72rem] h-1.5 w-1.5 animate-template-page-particle rounded-full bg-amber-base" />
        </div>

        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 overflow-hidden rounded-2xl border border-border-default bg-bg-surface/80 px-4 py-3 backdrop-blur-xl transition-all duration-500 hover:border-amber-base/20 sm:px-5"
          >
            <div className="flex min-w-0 items-center gap-2 overflow-hidden text-xs font-semibold text-text-secondary sm:text-sm">
              <Link
                href="/"
                className="inline-flex shrink-0 items-center gap-2 transition-colors duration-300 hover:text-amber-base"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>

              <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />

              <Link
                href="/templates"
                className="shrink-0 transition-colors duration-300 hover:text-amber-base"
              >
                Templates
              </Link>

              <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />

              <span className="min-w-0 truncate font-bold text-text-primary">
                {pageTitle}
              </span>
            </div>
          </nav>

          {/* Hero */}
          <TemplateHero item={item} readTime={readTime} />

          {/* Content divider */}
          <div className="relative my-12 flex items-center justify-center sm:my-16">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-default to-amber-base/30" />

            <div className="relative mx-5">
              <div className="absolute inset-0 rounded-full bg-amber-base/20 blur-xl" />

              <span className="relative grid h-12 w-12 animate-template-divider-pulse place-items-center rounded-2xl border border-amber-base/25 bg-bg-base text-amber-base">
                <FileText className="h-5 w-5" />
              </span>
            </div>

            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border-default to-amber-base/30" />
          </div>

          {/* Main layout */}
          <section className="grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1fr)_350px]">
            {/* Main content */}
            <div className="min-w-0">
              <TemplateContent item={item} />
            </div>

            {/* Sticky sidebar */}
            <div className="min-w-0">
              <TemplateSidebar
                item={item}
                related={relatedTemplates}
                readTime={readTime}
              />
            </div>
          </section>

          {/* FAQ */}
          <TemplateFAQ item={item} />

          {/* Final CTA section */}
          <section className="relative mt-10">
            <div className="pointer-events-none absolute inset-x-16 -top-12 h-32 rounded-full bg-amber-base/[0.08] blur-[80px]" />

            <TemplateCTA
              cta={cta}
              title={cta.title}
              description={cta.description}
            />
          </section>

          {/* Bottom navigation bar */}
          <section className="mt-8 overflow-hidden rounded-[1.75rem] border border-border-default bg-bg-surface/90 p-5 backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
                  <Sparkles className="h-5 w-5" />
                </span>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-base">
                    Template Category
                  </p>

                  <p className="mt-1 font-bold text-text-primary">{category}</p>
                </div>
              </div>

              <Link
                href="/templates"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-default bg-bg-base px-6 py-3 text-sm font-black text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-base/30 hover:bg-amber-base/[0.06] hover:text-amber-base sm:w-auto"
              >
                Explore All Templates
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
