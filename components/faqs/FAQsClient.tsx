import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Code2,
  FileQuestion,
} from "lucide-react";

import type { FAQItem } from "@/lib/faqs";
import { getPageHref } from "@/lib/pagination";

interface FAQsClientProps {
  items: FAQItem[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  startIndex: number;
}

export default function FAQsClient({
  items,
  totalItems,
  currentPage,
  totalPages,
  startIndex,
}: FAQsClientProps) {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <section
      id="faq-browser"
      className="relative bg-bg-base py-16 sm:py-20 lg:py-24"
      aria-labelledby="faq-browser-title"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-3 border-b border-border-default pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black text-amber-base">
              FAQ cards
            </p>

            <h2
              id="faq-browser-title"
              className="mt-1 text-2xl font-black tracking-tight text-text-primary sm:text-3xl"
            >
              Showing {items.length} of {totalItems} FAQ hubs
            </h2>
          </div>

          <p className="max-w-xl text-sm font-medium leading-6 text-text-secondary">
            Open any card to view the full relevant guide, including tables,
            lists, and technical code blocks where available.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((faq, index) => (
            <FAQCard
              key={faq.slug}
              faq={faq}
              index={startIndex + index}
            />
          ))}
        </div>

        {totalPages > 1 ? (
          <nav
            className="mt-14 flex flex-wrap items-center justify-center gap-3"
            aria-label="FAQ pagination"
          >
            {currentPage > 1 ? (
              <Link
                href={getPageHref("/faqs", currentPage - 1)}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border-default bg-white px-5 text-sm font-black text-text-secondary transition hover:border-amber-base/40 hover:text-amber-base"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            ) : (
              <span className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-full border border-border-default bg-bg-surface px-5 text-sm font-black text-text-muted">
                <ArrowLeft className="h-4 w-4" />
                Back
              </span>
            )}

            {pageNumbers.map((pageNumber) => {
              const isActive = pageNumber === currentPage;

              return (
                <Link
                  key={pageNumber}
                  href={getPageHref("/faqs", pageNumber)}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "grid h-11 w-11 place-items-center rounded-full border text-sm font-black transition",
                    isActive
                      ? "border-amber-base bg-amber-base text-bg-base shadow-glow"
                      : "border-border-default bg-white text-text-secondary hover:border-amber-base/40 hover:text-amber-base",
                  ].join(" ")}
                >
                  {pageNumber}
                </Link>
              );
            })}

            {currentPage < totalPages ? (
              <Link
                href={getPageHref("/faqs", currentPage + 1)}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-amber-base px-5 text-sm font-black text-bg-base transition hover:-translate-y-0.5"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <span className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-full border border-border-default bg-bg-surface px-5 text-sm font-black text-text-muted">
                Next
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </nav>
        ) : null}
      </div>
    </section>
  );
}

function FAQCard({
  faq,
  index,
}: {
  faq: FAQItem;
  index: number;
}) {
  const codeBlocks = faq.content.filter(
    (block) => block.type === "code"
  ).length;
  const questions = faq.content.filter((block) =>
    block.text?.startsWith("Q")
  ).length;

  return (
    <Link
      href={`/faqs/${faq.slug}`}
      className="group flex min-h-[340px] flex-col overflow-hidden rounded-2xl border border-border-default bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-amber-base/40 hover:shadow-[0_28px_80px_rgba(15,23,42,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-base"
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-bg-surface via-white to-amber-base/10 p-5">
        <div className="flex items-start justify-between gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-base/20 bg-white text-amber-base shadow-sm">
            {codeBlocks > 0 ? (
              <Code2 className="h-5 w-5" />
            ) : questions > 0 ? (
              <FileQuestion className="h-5 w-5" />
            ) : (
              <BookOpen className="h-5 w-5" />
            )}
          </span>

          <span className="rounded-full border border-border-default bg-white/80 px-3 py-1 text-xs font-black text-text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-amber-base/10 px-3 py-1 text-xs font-black text-amber-base">
            {faq.category}
          </span>

          <span className="rounded-full bg-emerald-base/10 px-3 py-1 text-xs font-black text-emerald-base">
            {faq.readTime}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-3 text-xl font-black leading-7 tracking-tight text-text-primary transition group-hover:text-amber-base">
          {faq.hero?.title || faq.title}
        </h3>

        <p className="mt-4 line-clamp-4 text-sm font-medium leading-7 text-text-secondary">
          {faq.excerpt || faq.hero?.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border-default pt-5">
          <CardMetric
            label="Sections"
            value={faq.content.length}
          />
          <CardMetric
            label={codeBlocks === 1 ? "Code block" : "Code blocks"}
            value={codeBlocks}
          />
        </div>

        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="text-sm font-black text-amber-base">
            View details
          </span>

          <span className="grid h-10 w-10 place-items-center rounded-full bg-bg-surface text-text-primary transition group-hover:bg-amber-base group-hover:text-bg-base">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function CardMetric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-border-default bg-bg-base p-3">
      <p className="text-lg font-black text-text-primary">{value}</p>
      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-text-muted">
        {label}
      </p>
    </div>
  );
}
