// app/process/[slug]/page.tsx

import type { Metadata } from "next";

import { notFound } from "next/navigation";

import BackToTop from "@/components/ui/BackToTop";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import ProcessArticleContent from "@/components/process/ProcessArticleContent";
import ProcessCard from "@/components/process/ProcessCard";
import ProcessCTA from "@/components/process/ProcessCTA";
import ProcessFAQ from "@/components/process/ProcessFAQ";
import ProcessHero from "@/components/process/ProcessHero";
import { createMetadata } from "@/config/metadata";
import {
  getProcessBySlug,
  getProcessSlugs,
  getRelatedProcesses,
} from "@/lib/process";

type ProcessSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getProcessSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProcessSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const process = getProcessBySlug(slug);

  if (!process) {
    return createMetadata({
      title: "Process Guide Not Found",
      description:
        "The requested blockchain process guide could not be found.",
      path: `/process/${slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: process.title,
    description:
      process.excerpt ||
      process.hero.description ||
      process.title,
    path: `/process/${process.slug}`,
    image:
      process.hero.image ||
      process.image ||
      undefined,
    type: "article",
  });
}

export default async function ProcessSlugPage({
  params,
}: ProcessSlugPageProps) {
  const { slug } = await params;
  const process = getProcessBySlug(slug);

  if (!process) {
    notFound();
  }

  const relatedProcesses = getRelatedProcesses(
    process.slug,
    3,
  );

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Navbar />

      <main className="overflow-hidden bg-bg-base">
        <ProcessHero process={process} />

        <section className="py-12 lg:py-16">
          <div className="site-container relative grid gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <ProcessArticleContent
              content={process.content}
              className="rounded-[2rem] border border-white/[0.08] bg-surface/70 p-6 sm:p-8 lg:p-10"
            />

            <aside className="space-y-5 lg:sticky lg:top-28">
              <div className="rounded-[1.5rem] border border-white/[0.08] bg-surface p-6">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-amber-base">
                  Guide Summary
                </p>

                <h2 className="mt-4 text-xl font-black leading-tight text-text-primary">
                  {process.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-silver">
                  {process.excerpt}
                </p>
              </div>

              {process.credibility.length > 0 && (
                <div className="rounded-[1.5rem] border border-white/[0.08] bg-surface p-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.16em] text-amber-base">
                    What This Covers
                  </p>

                  <div className="mt-5 space-y-3">
                    {process.credibility.map(
                      (item) => (
                        <div
                          key={item}
                          className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm leading-6 text-silver"
                        >
                          {item}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </section>

        <section className="pb-12 lg:pb-16">
          <div className="site-container relative space-y-8 px-6">
            <ProcessFAQ faqs={process.faqs} />

            <ProcessCTA cta={process.cta} />
          </div>
        </section>

        {relatedProcesses.length > 0 && (
          <section className="border-t border-white/[0.07] py-12 lg:py-16">
            <div className="site-container relative px-6">
              <div className="max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                  Related Guides
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-text-primary sm:text-4xl">
                  More process guides
                </h2>
              </div>

              <div className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                {relatedProcesses.map(
                  (relatedProcess) => (
                    <ProcessCard
                      key={relatedProcess.slug}
                      process={relatedProcess}
                    />
                  ),
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
