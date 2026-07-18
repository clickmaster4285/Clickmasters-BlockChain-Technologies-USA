import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Home,
  Layers3,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import BackToTop from "@/components/ui/BackToTop";
import { createMetadata } from "@/config/metadata";
import { caseStudies } from "@/data/case-studies";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ContentBlock = {
  type?: string;
  text?: string;
  title?: string;
  headers?: string[];
  columns?: string[];
  rows?: unknown[][];
  items?: unknown[];
};

function getPlainText(value: unknown) {
  if (typeof value === "string") return value;
  if (!value || typeof value !== "object") return "";

  const item = value as {
    title?: string;
    description?: string;
    text?: string;
  };

  return [item.title, item.description, item.text].filter(Boolean).join(" ");
}

function getSectionId(text: string, index: number) {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || `section-${index + 1}`;
}

function getArticleHeadings(content: ContentBlock[]) {
  return content
    .map((block, index) => ({
      id: getSectionId(block.text || "", index),
      label: block.text || "",
      type: block.type,
    }))
    .filter((item) => item.type === "heading" && item.label)
    .slice(0, 8);
}

function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-8">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "featuredAnswer":
            return (
              <section
                key={index}
                className="rounded-2xl border border-amber-base/20 bg-amber-base/10 p-5 sm:p-6"
              >
                <div className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-amber-base/25 bg-white text-amber-base">
                    <Lightbulb className="h-5 w-5" />
                  </span>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-base">
                      Key Takeaway
                    </p>

                    <p className="mt-3 text-base leading-8 text-text-secondary">
                      {block.text}
                    </p>
                  </div>
                </div>
              </section>
            );

          case "heading":
            return (
              <h2
                key={index}
                id={getSectionId(block.text || "", index)}
                className="scroll-mt-28 border-l-4 border-amber-base pl-4 text-2xl font-black leading-tight text-text-primary sm:text-3xl"
              >
                {block.text}
              </h2>
            );

          case "paragraph":
            return (
              <p
                key={index}
                className="text-base leading-8 text-text-secondary sm:text-lg"
              >
                {block.text}
              </p>
            );

          case "list":
            return (
              <div key={index} className="grid gap-3">
                {block.title && (
                  <h3 className="text-xl font-black text-text-primary">
                    {block.title}
                  </h3>
                )}

                {block.items?.map((item, itemIndex) => (
                  <div
                    key={`${getPlainText(item)}-${itemIndex}`}
                    className="flex gap-3 rounded-2xl border border-border-default bg-bg-base p-4"
                  >
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-base" />
                    <p className="text-sm leading-7 text-text-secondary">
                      {getPlainText(item)}
                    </p>
                  </div>
                ))}
              </div>
            );

          case "table": {
            const headers = block.headers || block.columns || [];

            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-border-default bg-white"
              >
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[680px]">
                    <thead className="bg-bg-surface">
                      <tr>
                        {headers.map((header) => (
                          <th
                            key={header}
                            className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.16em] text-amber-base"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {block.rows?.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className="border-t border-border-default"
                        >
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="px-5 py-4 text-sm leading-7 text-text-secondary"
                            >
                              {getPlainText(cell) || String(cell ?? "")}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }

          default:
            if (!block.text) return null;

            return (
              <p
                key={index}
                className="text-base leading-8 text-text-secondary sm:text-lg"
              >
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;

  const caseStudy = caseStudies.find((item) => item.slug === slug);

  if (!caseStudy) {
    return createMetadata({
      title: "Case Study Not Found | ClickMasters",
      description: "The requested blockchain case study could not be found.",
      path: `/case-studies/${slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: caseStudy.title,
    description: caseStudy.excerpt,
    path: `/case-studies/${caseStudy.slug || slug}`,
    image: caseStudy.image,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;

  const caseStudy = caseStudies.find((item) => item.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  const relatedCaseStudies = caseStudies
    .filter((item) => item.slug !== caseStudy.slug)
    .slice(0, 3);

  const articleHeadings = getArticleHeadings(caseStudy.content || []);

  const details = [
    {
      label: "Client",
      value: caseStudy.client,
      icon: Target,
    },
    {
      label: "Industry",
      value: caseStudy.industry,
      icon: Layers3,
    },
    {
      label: "Service",
      value: caseStudy.service,
      icon: Sparkles,
    },
    {
      label: "Timeline",
      value: caseStudy.duration,
      icon: Clock3,
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-amber-base/5 to-bg-base pb-24 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(100,116,139,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.055)_1px,transparent_1px)] bg-[size:68px_68px] opacity-70" />
        <div className="pointer-events-none absolute -left-72 -top-56 h-[46rem] w-[46rem] rounded-full bg-amber-base/[0.09] blur-[140px]" />
        <div className="pointer-events-none absolute -right-72 top-[32rem] h-[42rem] w-[42rem] rounded-full bg-emerald-base/[0.06] blur-[140px]" />

        <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
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
                href="/case-studies"
                className="shrink-0 transition-colors duration-300 hover:text-amber-base"
              >
                Case Studies
              </Link>

              <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />

              <span className="min-w-0 truncate font-bold text-text-primary">
                {caseStudy.title}
              </span>
            </div>
          </nav>

          <Link
            href="/case-studies"
            className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-text-secondary transition-colors hover:text-amber-base"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to case studies
          </Link>

          <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-amber-base">
                  <Sparkles className="h-4 w-4" />
                  {caseStudy.industry}
                </span>

                {caseStudy.tags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border-default bg-white/80 px-4 py-2 text-[10px] font-black text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="mt-7 max-w-5xl text-4xl font-black leading-[1.05] tracking-[-0.04em] text-text-primary sm:text-5xl lg:text-6xl">
                {caseStudy.title}
              </h1>

              <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-text-secondary sm:text-lg">
                {caseStudy.excerpt}
              </p>
            </div>

            <aside className="rounded-3xl border border-border-default bg-white/85 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div className="flex items-center gap-3 border-b border-border-default pb-5">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-emerald-base/20 bg-emerald-base/10 text-emerald-base">
                  <TrendingUp className="h-5 w-5" />
                </span>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-text-muted">
                    Primary Outcome
                  </p>
                  <p className="mt-1 text-sm font-black text-text-primary">
                    Measurable business impact
                  </p>
                </div>
              </div>

              <p className="mt-6 text-5xl font-black tracking-[-0.04em] text-text-primary">
                {caseStudy.result}
              </p>

              <p className="mt-2 text-sm font-bold text-text-secondary">
                {caseStudy.resultLabel}
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-amber-base px-5 py-3 text-sm font-black text-white shadow-[0_16px_40px_rgba(217,119,6,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-amber-light"
              >
                Start a Similar Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </section>

          <section className="mt-12 overflow-hidden rounded-[2rem] border border-border-default bg-white shadow-[0_30px_90px_rgba(15,23,42,0.10)]">
            <div className="relative aspect-[16/10] sm:aspect-[16/8]">
              <Image
                src={caseStudy.image}
                alt={caseStudy.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
            </div>

            <div className="grid gap-4 border-t border-border-default bg-white p-5 sm:grid-cols-2 lg:grid-cols-4 lg:p-6">
              {details.map((detail) => {
                const Icon = detail.icon;

                return (
                  <div
                    key={detail.label}
                    className="rounded-2xl border border-border-default bg-bg-base p-4"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-text-muted">
                      <Icon className="h-4 w-4 text-amber-base" />
                      {detail.label}
                    </div>

                    <p className="mt-2 text-sm font-black text-text-primary">
                      {detail.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="relative my-12 flex items-center justify-center sm:my-16">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-default to-amber-base/30" />
            <span className="mx-5 grid h-12 w-12 place-items-center rounded-2xl border border-amber-base/25 bg-bg-base text-amber-base">
              <FileText className="h-5 w-5" />
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border-default to-amber-base/30" />
          </div>

          <section className="grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
            <article className="min-w-0 rounded-[2rem] border border-border-default bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.07)] sm:p-8 lg:p-10">
              <div className="mb-8 border-b border-border-default pb-6">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-base">
                  Full Case Study
                </p>
                <h2 className="mt-3 text-3xl font-black text-text-primary">
                  Project breakdown
                </h2>
              </div>

              <ContentRenderer blocks={caseStudy.content || []} />
            </article>

            <aside className="min-w-0">
              <div className="space-y-5 xl:sticky xl:top-24">
                <div className="rounded-[1.5rem] border border-border-default bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-base">
                    Project Details
                  </p>

                  <div className="mt-5 space-y-3">
                    {details.map((detail) => {
                      const Icon = detail.icon;

                      return (
                        <div
                          key={detail.label}
                          className="flex items-center justify-between gap-4 rounded-2xl border border-border-default bg-bg-base p-4"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4 text-amber-base" />
                            <span className="text-xs font-bold text-text-secondary">
                              {detail.label}
                            </span>
                          </div>

                          <span className="text-right text-xs font-black text-text-primary">
                            {detail.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {articleHeadings.length > 0 && (
                  <div className="rounded-[1.5rem] border border-border-default bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-base">
                      In This Case Study
                    </p>

                    <nav className="mt-4 space-y-2" aria-label="Case study sections">
                      {articleHeadings.map((item, index) => (
                        <Link
                          key={`${item.id}-${index}`}
                          href={`#${item.id}`}
                          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-text-secondary transition-colors hover:bg-amber-base/10 hover:text-amber-base"
                        >
                          <span className="text-[10px] font-black text-text-muted">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="line-clamp-1">{item.label}</span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                )}

                <div className="rounded-[1.5rem] border border-amber-base/20 bg-amber-base/10 p-5">
                  <p className="text-lg font-black text-text-primary">
                    Need this kind of result?
                  </p>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">
                    Share your requirements and we will map the right blockchain approach.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-base px-5 py-3 text-sm font-black text-white transition-all hover:-translate-y-1 hover:bg-amber-light"
                  >
                    Book a Strategy Call
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </aside>
          </section>

          {relatedCaseStudies.length > 0 && (
            <section className="mt-16">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-amber-base">
                    <Sparkles className="h-4 w-4" />
                    Related Case Studies
                  </p>

                  <h2 className="mt-5 text-3xl font-black text-text-primary sm:text-4xl">
                    More blockchain results
                  </h2>
                </div>

                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 text-sm font-black text-text-secondary transition-colors hover:text-amber-base"
                >
                  View all case studies
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {relatedCaseStudies.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/case-studies/${item.slug}`}
                    className="group overflow-hidden rounded-2xl border border-border-default bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30"
                  >
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    <div className="p-5">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-base">
                        {item.industry}
                      </p>
                      <h3 className="mt-3 line-clamp-2 text-lg font-black leading-snug text-text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-text-secondary">
                        {item.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-16 overflow-hidden rounded-[2rem] border border-border-default bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-base">
                  Build With ClickMasters
                </p>
                <h2 className="mt-3 text-3xl font-black text-text-primary sm:text-4xl">
                  Ready to plan your blockchain project?
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-text-secondary">
                  We can help you scope the architecture, timeline, compliance needs, and launch plan.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-amber-base px-7 py-3 text-sm font-black text-white shadow-[0_16px_40px_rgba(217,119,6,0.22)] transition-all hover:-translate-y-1 hover:bg-amber-light"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" />
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
