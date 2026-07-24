// components/process/ProcessDetailPage.tsx

import {
  BookOpenCheck,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import ProcessArticleContent from "@/components/process/ProcessArticleContent";
import ProcessCTA from "@/components/process/ProcessCTA";
import ProcessFAQ from "@/components/process/ProcessFAQ";
import ProcessHero from "@/components/process/ProcessHero";
import ProcessRelated from "@/components/process/ProcessRelated";

import type {
  NormalizedProcessEntry,
  ProcessCardData,
} from "@/lib/process";

/* =========================================================
   Types
========================================================= */

type ProcessDetailPageProps = {
  process: NormalizedProcessEntry;
  relatedProcesses?: ProcessCardData[];
};

/* =========================================================
   Component
========================================================= */

export default function ProcessDetailPage({
  process,
  relatedProcesses = [],
}: ProcessDetailPageProps) {
  return (
    <main className="overflow-hidden bg-bg-base">
      {/* =====================================================
          Hero
      ====================================================== */}

      <ProcessHero process={process} />

      {/* =====================================================
          Article Area
      ====================================================== */}

      <section className="relative px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        {/* Background */}

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(225,157,45,0.05),transparent_28%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
            {/* ===============================================
                Main Article
            ================================================ */}

            <div className="min-w-0">
              <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-surface px-6 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
                {/* Article Intro */}

                <div className="border-b border-white/[0.08] pb-8">
                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/[0.06] px-4 py-2 text-[11px] font-black uppercase tracking-[0.17em] text-amber-base">
                    <BookOpenCheck className="h-4 w-4" />

                    Complete Guide
                  </span>

                  <h2 className="mt-5 text-3xl font-black tracking-[-0.035em] text-text-primary sm:text-4xl">
                    Inside this process
                  </h2>

                  <p className="mt-4 max-w-3xl text-sm leading-7 text-silver sm:text-base">
                    This guide explains the strategy,
                    architecture, implementation,
                    security considerations, costs,
                    risks, and production requirements
                    involved in this process.
                  </p>
                </div>

                {/* Dynamic Content */}

                <ProcessArticleContent
                  content={process.content}
                  className="pt-2"
                />
              </div>
            </div>

            {/* ===============================================
                Sidebar
            ================================================ */}

            <aside className="space-y-6 lg:sticky lg:top-28">
              {/* Guide Overview */}

              <div className="rounded-[1.75rem] border border-white/[0.08] bg-surface p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-amber-base/20 bg-amber-base/[0.07] text-amber-base">
                    <ShieldCheck className="h-5 w-5" />
                  </span>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-base">
                      Guide Overview
                    </p>

                    <h2 className="mt-1 text-lg font-black text-text-primary">
                      What this covers
                    </h2>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    "Planning and technical strategy",
                    "Architecture and infrastructure",
                    "Security and risk considerations",
                    "Development and implementation",
                    "Testing and quality assurance",
                    "Production deployment",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-base" />

                      <span className="text-xs leading-6 text-silver">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Article Information */}

              <div className="rounded-[1.75rem] border border-white/[0.08] bg-surface p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-base">
                  Article Information
                </p>

                <dl className="mt-5 space-y-4">
                  <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
                    <dt className="text-xs text-silver">
                      Category
                    </dt>

                    <dd className="text-right text-xs font-black text-text-primary">
                      {process.category}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
                    <dt className="text-xs text-silver">
                      Reading time
                    </dt>

                    <dd className="text-right text-xs font-black text-text-primary">
                      {process.readTime}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
                    <dt className="text-xs text-silver">
                      Author
                    </dt>

                    <dd className="max-w-[150px] text-right text-xs font-black text-text-primary">
                      {process.author}
                    </dd>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-xs text-silver">
                      Guide type
                    </dt>

                    <dd className="text-right text-xs font-black text-text-primary">
                      Technical Process
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Credibility */}

              {process.credibility.length > 0 && (
                <div className="rounded-[1.75rem] border border-amber-base/20 bg-amber-base/[0.045] p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-base">
                    Professional Experience
                  </p>

                  <div className="mt-5 space-y-4">
                    {process.credibility.map(
                      (item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-base" />

                          <span className="text-xs leading-6 text-silver">
                            {item}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      {process.faqs.length > 0 && (
        <section className="px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <ProcessFAQ
              faqs={process.faqs}
              title={`Questions About ${process.title}`}
              description="Important answers about planning, security, implementation, costs, timelines, and production requirements."
            />
          </div>
        </section>
      )}

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <ProcessCTA cta={process.cta} />
        </div>
      </section>

      {/* =====================================================
          Related Guides
      ====================================================== */}

      {relatedProcesses.length > 0 && (
        <ProcessRelated
          processes={relatedProcesses}
        />
      )}
    </main>
  );
}