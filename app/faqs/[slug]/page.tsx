import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Code2,
  FileQuestion,
  Home,
  Sparkles,
} from "lucide-react";

import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { createMetadata } from "@/config/metadata";
import type { FAQContentBlock, FAQItem } from "@/lib/faqs";
import {
  getAllFAQs,
  getFAQBySlug,
  getRelatedFAQs,
} from "@/lib/faqs";

interface FAQDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getAllFAQs().map((faq) => ({
    slug: faq.slug,
  }));
}

export async function generateMetadata({
  params,
}: FAQDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const faq = getFAQBySlug(slug);

  if (!faq) {
    return createMetadata({
      title: "FAQ Not Found",
      description:
        "The frequently asked question you requested could not be found.",
      path: `/faqs/${slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: faq.title,
    description: faq.excerpt,
    path: `/faqs/${faq.slug}`,
    type: "article",
  });
}

export default async function FAQDetailPage({
  params,
}: FAQDetailPageProps) {
  const { slug } = await params;
  const faq = getFAQBySlug(slug);

  if (!faq) {
    notFound();
  }

  const relatedFAQs = getRelatedFAQs(faq.slug, faq.category, 3);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity:
      faq.faqs.length > 0
        ? faq.faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          }))
        : [
            {
              "@type": "Question",
              name: faq.title,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.excerpt,
              },
            },
          ],
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-bg-base text-text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />

        <section className="relative bg-gradient-to-b from-bg-base via-amber-base/5 to-bg-base pb-14 pt-28 sm:pt-32">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(100,116,139,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.055)_1px,transparent_1px)] bg-[size:70px_70px] opacity-60" />
          <div className="pointer-events-none absolute -left-72 -top-56 h-[46rem] w-[46rem] rounded-full bg-amber-base/[0.09] blur-[140px]" />

          <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 overflow-hidden rounded-2xl border border-border-default bg-white/85 px-4 py-3 backdrop-blur-xl sm:px-5"
            >
              <div className="flex min-w-0 items-center gap-2 overflow-hidden text-xs font-semibold text-text-secondary sm:text-sm">
                <Link
                  href="/"
                  className="inline-flex shrink-0 items-center gap-2 transition hover:text-amber-base"
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">Home</span>
                </Link>

                <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />

                <Link
                  href="/faqs"
                  className="shrink-0 transition hover:text-amber-base"
                >
                  FAQs
                </Link>

                <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />

                <span className="min-w-0 truncate font-bold text-text-primary">
                  {faq.title}
                </span>
              </div>
            </nav>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-base shadow-sm">
                <FileQuestion className="h-4 w-4" />
                {faq.hero?.badge || faq.category}
              </div>

              <h1 className="mt-7 max-w-5xl text-4xl font-black leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
                {faq.hero?.title || faq.title}
              </h1>

              <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-text-secondary sm:text-lg">
                {faq.hero?.description || faq.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {faq.credibility.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-border-default bg-white px-4 py-2 text-xs font-black text-text-secondary"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-base" />
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="#faq-content"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-amber-base px-6 text-sm font-black text-bg-base shadow-glow transition hover:-translate-y-0.5"
                >
                  Read answer
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/faqs"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border-default bg-white px-6 text-sm font-bold text-text-primary transition hover:border-amber-base/40 hover:text-amber-base"
                >
                  <ArrowLeft className="h-4 w-4" />
                  All FAQs
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="faq-content"
          className="bg-bg-base py-16 sm:py-20 lg:py-24"
        >
          <div className="container mx-auto max-w-5xl px-4 sm:px-6">
            <article className="overflow-hidden rounded-2xl border border-border-default bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
              <div className="border-b border-border-default bg-bg-surface px-5 py-4 sm:px-7">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                  Detailed answer
                </p>
              </div>

              <div className="space-y-7 p-5 sm:p-7 lg:p-9">
                {faq.content.map((block, index) => (
                  <ContentBlockRenderer
                    key={`${faq.slug}-${index}`}
                    block={block}
                  />
                ))}

                {faq.faqs.length > 0 ? (
                  <NestedFAQs items={faq.faqs} />
                ) : null}
              </div>
            </article>
          </div>
        </section>

        <section className="border-t border-border-default bg-bg-base py-16 sm:py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                  Continue exploring
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-text-primary">
                  Related FAQ hubs
                </h2>
              </div>

              <Link
                href="/faqs"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border-default bg-white px-5 text-sm font-bold text-text-primary transition hover:border-amber-base/40 hover:text-amber-base"
              >
                View all FAQs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {relatedFAQs.map((relatedFAQ) => (
                <RelatedFAQCard
                  key={relatedFAQ.slug}
                  faq={relatedFAQ}
                />
              ))}
            </div>
          </div>
        </section>

        <FAQDetailCTA faq={faq} />
      </main>

      <Footer />
    </>
  );
}

function ContentBlockRenderer({
  block,
}: {
  block: FAQContentBlock;
}) {
  switch (block.type) {
    case "featuredAnswer":
      return (
        <div className="rounded-2xl border border-amber-base/20 bg-amber-base/10 p-5 sm:p-6">
          <div className="flex gap-4">
            <Sparkles className="mt-1 h-5 w-5 shrink-0 text-amber-base" />
            <p className="text-base font-semibold leading-8 text-text-primary">
              {block.text}
            </p>
          </div>
        </div>
      );

    case "heading":
      return (
        <h2 className="border-l-4 border-amber-base pl-4 text-2xl font-black leading-tight text-text-primary sm:text-3xl">
          {block.text}
        </h2>
      );

    case "paragraph":
      return (
        <p className="text-base leading-8 text-text-secondary sm:text-lg">
          {block.text}
        </p>
      );

    case "list":
      return (
        <div className="grid gap-3">
          {block.items?.map((item) => (
            <div
              key={item}
              className="flex gap-3 rounded-xl border border-border-default bg-bg-base p-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-base" />
              <p className="text-sm font-medium leading-7 text-text-secondary">
                {item}
              </p>
            </div>
          ))}
        </div>
      );

    case "table":
      return (
        <div className="overflow-hidden rounded-2xl border border-border-default">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px]">
              <thead className="bg-bg-surface">
                <tr>
                  {block.headers?.map((header) => (
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
                        key={`${rowIndex}-${cellIndex}`}
                        className="px-5 py-4 text-sm font-medium leading-6 text-text-secondary"
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

    case "code":
      return (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-amber-base">
            <Code2 className="h-4 w-4" />
            Relevant code
          </div>

          <pre className="max-h-[620px] overflow-auto p-4 text-xs leading-6 text-slate-200 sm:p-5 sm:text-sm">
            <code>{block.text}</code>
          </pre>
        </div>
      );
  }
}

function NestedFAQs({
  items,
}: {
  items: FAQItem["faqs"];
}) {
  return (
    <section className="rounded-2xl border border-border-default bg-bg-base p-5">
      <h2 className="text-2xl font-black tracking-tight text-text-primary">
        Additional questions
      </h2>

      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div
            key={item.question}
            className="rounded-xl border border-border-default bg-white p-4"
          >
            <h3 className="font-black text-text-primary">
              {item.question}
            </h3>
            <p className="mt-2 text-sm leading-7 text-text-secondary">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RelatedFAQCard({ faq }: { faq: FAQItem }) {
  return (
    <Link
      href={`/faqs/${faq.slug}`}
      className="group rounded-2xl border border-border-default bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-amber-base/40 hover:shadow-[0_28px_80px_rgba(15,23,42,0.12)]"
    >
      <span className="rounded-full bg-amber-base/10 px-3 py-1 text-xs font-black text-amber-base">
        {faq.category}
      </span>

      <h3 className="mt-4 line-clamp-3 text-lg font-black leading-7 text-text-primary transition group-hover:text-amber-base">
        {faq.title}
      </h3>

      <p className="mt-3 line-clamp-3 text-sm leading-7 text-text-secondary">
        {faq.excerpt}
      </p>

      <div className="mt-5 inline-flex items-center gap-2 text-sm font-black text-amber-base">
        Read guide
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function FAQDetailCTA({ faq }: { faq: FAQItem }) {
  return (
    <section className="bg-bg-base px-4 pb-20 sm:px-6 sm:pb-24">
      <div className="container mx-auto max-w-7xl">
        <div className="rounded-2xl border border-border-default bg-text-primary p-6 text-white sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                {faq.cta?.title || "Need a custom answer?"}
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight">
                {faq.cta?.description ||
                  "Discuss your specific blockchain project with our team."}
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-amber-base px-6 text-sm font-black text-bg-base transition hover:-translate-y-0.5"
              >
                {faq.cta?.primaryText || "Book a Free Strategy Call"}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/service"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-bold text-white transition hover:border-amber-base/40 hover:text-amber-base"
              >
                {faq.cta?.secondaryText || "Explore Our Services"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
