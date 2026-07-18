import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Code2,
  FileText,
  Lightbulb,
  ListChecks,
  PenTool,
  Quote,
  Sparkles,
} from "lucide-react";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import ResourceCard from "@/components/resources/ResourceCard";
import { createMetadata } from "@/config/metadata";
import {
  estimateResourceReadTime,
  getAllResources,
  getRelatedResources,
  getResourceBySlug,
  getResourceCards,
  getResourceCTA,
} from "@/lib/resources";

type ResourcePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatResourceDate(date?: string) {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

function getListItemText(item: any) {
  if (typeof item === "string") return item;

  return [
    item?.title,
    item?.description,
    item?.text,
  ]
    .filter(Boolean)
    .join(" ");
}

function ResourceContent({
  item,
  cta,
}: {
  item: any;
  cta: ReturnType<typeof getResourceCTA>;
}) {
  const blocks = item.content || [];

  return (
    <article className="space-y-10">
      <section className="overflow-hidden rounded-[1.5rem] border border-amber-base/20 bg-amber-base/10 p-6 md:rounded-[2rem] md:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-amber-base/25 bg-amber-base/10 text-amber-base">
            <Lightbulb className="h-5 w-5" />
          </span>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-base">
              Practical Takeaway
            </p>

            <p className="mt-3 text-base leading-8 text-silver md:text-lg">
              {item.hero?.description ||
                item.excerpt ||
                "Use this resource to make clearer blockchain planning and implementation decisions."}
            </p>
          </div>
        </div>
      </section>

      <section
        id="resource-article"
        className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface/80 md:rounded-[2rem]"
      >
        <div className="border-b border-white/10 bg-white/[0.03] px-6 py-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-base">
            Full Resource
          </p>
        </div>

        <div className="space-y-7 p-4 sm:p-6 md:p-10">
          {blocks.map((block: any, index: number) => {
            switch (block.type) {
              case "featuredAnswer":
                return (
                  <div
                    key={index}
                    className="rounded-3xl border border-amber-base/20 bg-amber-base/10 p-6 md:p-7"
                  >
                    <div className="flex items-start gap-4">
                      <Lightbulb className="mt-1 h-6 w-6 shrink-0 text-amber-base" />

                      <p className="text-base leading-8 text-silver md:text-lg">
                        {block.text}
                      </p>
                    </div>
                  </div>
                );

              case "heading":
                return (
                  <h2
                    key={index}
                    className="border-l-4 border-amber-base pl-4 text-2xl font-black leading-tight text-text-primary sm:text-3xl"
                  >
                    {block.text}
                  </h2>
                );

              case "paragraph":
                return (
                  <p
                    key={index}
                    className="text-base leading-8 text-silver md:text-lg"
                  >
                    {block.text}
                  </p>
                );

              case "quote":
                return (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-bg-base/60 p-6 md:p-7"
                  >
                    <Quote className="mb-4 h-8 w-8 text-amber-base" />

                    <p className="text-base italic leading-8 text-silver md:text-lg">
                      {block.text}
                    </p>
                  </div>
                );

              case "list":
                return (
                  <div key={index}>
                    {block.title && (
                      <h3 className="mb-5 flex items-center gap-3 text-2xl font-black text-text-primary">
                        <ListChecks className="h-6 w-6 text-amber-base" />
                        {block.title}
                      </h3>
                    )}

                    <div className="grid gap-4">
                      {block.items?.map((listItem: any, itemIndex: number) => (
                        <div
                          key={`${getListItemText(listItem)}-${itemIndex}`}
                          className="flex gap-4 rounded-2xl border border-white/10 bg-bg-base/40 p-5"
                        >
                          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-amber-base" />

                          <p className="text-sm leading-7 text-silver">
                            {getListItemText(listItem)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );

              case "table":
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-3xl border border-white/10"
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[700px]">
                        <thead className="bg-white/[0.03]">
                          <tr>
                            {block.columns?.map((column: string) => (
                              <th
                                key={column}
                                className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.18em] text-amber-base"
                              >
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>

                        <tbody>
                          {block.rows?.map((row: any[], rowIndex: number) => (
                            <tr
                              key={rowIndex}
                              className="border-t border-white/10"
                            >
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={cellIndex}
                                  className="px-5 py-4 text-sm leading-6 text-silver"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );

              case "codeBlock":
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-bg-base"
                  >
                    <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-base">
                      <Code2 className="h-4 w-4" />
                      Example
                    </div>

                    <pre className="max-w-full overflow-x-auto p-4 text-xs leading-6 text-silver sm:p-6 sm:text-sm">
                      <code>{block.code}</code>
                    </pre>
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-white/10 bg-bg-base/60 p-6 md:rounded-[2rem] md:p-8">
        <h2 className="text-2xl font-black text-text-primary">
          {cta.title}
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-silver md:text-base">
          {cta.description}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={cta.href}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-base px-6 py-3 text-sm font-bold text-bg-base transition-transform hover:-translate-y-0.5"
          >
            {cta.primaryText}
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href={cta.secondaryHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-silver transition-all hover:border-amber-base/30 hover:text-amber-base"
          >
            {cta.secondaryText}
          </Link>
        </div>
      </section>
    </article>
  );
}

export async function generateStaticParams() {
  return getAllResources().map((item: any) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getResourceBySlug(slug);

  if (!item) return {};

  return createMetadata({
    title: item.title,
    description:
      item.excerpt ||
      item.hero?.description ||
      "Explore this practical blockchain resource from ClickMasters.",
    path: `/resources/${item.slug || slug}`,
    type: "article",
  });
}

export default async function SingleResourcePage({
  params,
}: ResourcePageProps) {
  const { slug } = await params;
  const item = getResourceBySlug(slug);

  if (!item) return notFound();

  const resource = item as any;
  const readTime = estimateResourceReadTime(resource);
  const formattedDate = formatResourceDate(resource.date);
  const cta = getResourceCTA(resource);
  const relatedCards = getResourceCards(
    getRelatedResources(slug, 3)
  );
  const credibility =
    resource.credibility || resource.tags || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-surface/40 to-bg-base pb-24 pt-32">
        <div className="pointer-events-none absolute left-[-14rem] top-[-10rem] h-[32rem] w-[32rem] rounded-full bg-amber-base/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-12rem] top-80 h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl" />

        <section className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-silver">
            <Link href="/" className="hover:text-amber-base">
              Home
            </Link>
            <span>/</span>
            <Link href="/resources" className="hover:text-amber-base">
              Resources
            </Link>
            <span>/</span>
            <span className="text-silver-light">{resource.title}</span>
          </nav>

          <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-bg-base/70 p-6 shadow-[0_35px_120px_rgba(0,0,0,.45)] backdrop-blur-xl md:p-12">
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-base/10 blur-3xl" />
            <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-silver transition-all hover:border-amber-base/30 hover:text-amber-base"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Resources
              </Link>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-base/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-base">
                  <FileText className="h-4 w-4" />
                  {resource.hero?.badge || resource.category || "Resource"}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-silver">
                  <Clock3 className="h-4 w-4 text-amber-base" />
                  {readTime}
                </span>

                {formattedDate && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-silver">
                    <CalendarDays className="h-4 w-4 text-amber-base" />
                    {formattedDate}
                  </span>
                )}
              </div>

              <h1 className="mt-7 max-w-5xl font-display text-4xl font-black leading-tight tracking-tight text-text-primary md:text-6xl">
                {resource.hero?.title || resource.title}
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-silver">
                {resource.hero?.description || resource.excerpt}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-silver">
                  <PenTool className="h-4 w-4 text-amber-base" />
                  {resource.author || "ClickMasters Team"}
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-silver">
                  <BookOpen className="h-4 w-4 text-amber-base" />
                  Practical Guide
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-silver">
                  <Sparkles className="h-4 w-4 text-amber-base" />
                  Expert Resource
                </div>
              </div>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#resource-article"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-base px-7 py-3 text-sm font-bold text-bg-base transition-transform hover:-translate-y-0.5 sm:w-auto"
                >
                  Read Resource
                  <ArrowRight className="h-4 w-4" />
                </a>

                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-7 py-3 text-sm font-semibold text-silver transition-all hover:border-amber-base/30 hover:text-amber-base sm:w-auto"
                >
                  Talk to an Expert
                </Link>
              </div>
            </div>
          </section>

          <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <ResourceContent item={resource} cta={cta} />

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              {credibility.length > 0 && (
                <div className="rounded-[1.5rem] border border-white/10 bg-surface/80 p-6">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-base">
                    Inside This Resource
                  </p>

                  <div className="mt-5 grid gap-3">
                    {credibility.slice(0, 6).map((point: string) => (
                      <div
                        key={point}
                        className="flex gap-3 rounded-2xl border border-white/10 bg-bg-base/40 p-4"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-base" />
                        <span className="text-sm leading-6 text-silver">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {resource.faqs?.length > 0 && (
                <div className="rounded-[1.5rem] border border-white/10 bg-surface/80 p-6">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-base">
                    FAQs
                  </p>

                  <div className="mt-5 space-y-4">
                    {resource.faqs.map((faq: any) => (
                      <div
                        key={faq.question}
                        className="rounded-2xl border border-white/10 bg-bg-base/40 p-4"
                      >
                        <h3 className="text-sm font-black text-text-primary">
                          {faq.question}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-silver">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </section>

          {relatedCards.length > 0 && (
            <section className="mt-20">
              <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                    Keep Reading
                  </p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                    Related Resources
                  </h2>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {relatedCards.map((related, index) => (
                  <ResourceCard
                    key={related.slug}
                    item={related}
                    index={index}
                  />
                ))}
              </div>
            </section>
          )}
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
