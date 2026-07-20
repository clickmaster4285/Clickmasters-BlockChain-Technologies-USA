// app/hire/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Clock3,
  Code2,
  HelpCircle,
  Quote,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import { createMetadata } from "@/config/metadata";

import {
  getHirePageBySlug,
  getHireStaticParams,
  getRelatedHirePages,
  type HireContentBlock,
} from "@/lib/hire";

type HireDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Creates static pages for every valid Hire slug.
 */
export function generateStaticParams() {
  return getHireStaticParams();
}

/**
 * Creates unique metadata for every Hire page.
 */
export async function generateMetadata({
  params,
}: HireDetailPageProps) {
  const { slug } = await params;
  const hirePage = getHirePageBySlug(slug);

  if (!hirePage) {
    return createMetadata({
      title: "Hire Page Not Found",
      description:
        "The requested blockchain hiring page could not be found.",
      path: `/hire/${slug}`,
    });
  }

  return createMetadata({
    title: hirePage.title,
    description:
      hirePage.excerpt ||
      hirePage.hero?.description ||
      `Hire experienced professionals for ${hirePage.title}.`,
    path: `/hire/${hirePage.slug}`,
  });
}

/**
 * Renders the different block types from data/hire.ts.
 */
function HireContentRenderer({
  blocks,
}: {
  blocks: HireContentBlock[];
}) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-7">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case "featuredAnswer":
            return (
              <aside
                key={key}
                className="relative overflow-hidden rounded-3xl border border-amber-base/20 bg-gradient-to-br from-amber-base/10 via-surface to-surface p-6 md:p-8"
              >
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-base/10 blur-3xl" />

                <div className="relative flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-base text-bg-base">
                    <Sparkles className="h-6 w-6" />
                  </span>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-base">
                      Quick Answer
                    </p>

                    <p className="mt-3 text-base font-medium leading-8 text-text-primary md:text-lg">
                      {block.text}
                    </p>
                  </div>
                </div>
              </aside>
            );

          case "heading":
            return (
              <h2
                key={key}
                className="scroll-mt-28 pt-4 font-display text-2xl font-black leading-tight tracking-tight text-text-primary md:text-4xl"
              >
                {block.text}
              </h2>
            );

          case "paragraph":
            return (
              <p
                key={key}
                className="text-base leading-8 text-silver"
              >
                {block.text}
              </p>
            );

          case "list":
            return (
              <ul
                key={key}
                className="grid gap-3 rounded-3xl border border-white/10 bg-surface/60 p-5 md:p-6"
              >
                {block.items?.map((item, itemIndex) => (
                  <li
                    key={`${item}-${itemIndex}`}
                    className="flex items-start gap-3 text-sm leading-7 text-silver md:text-base"
                  >
                    <span className="mt-1.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-base/10 text-amber-base">
                      <Check className="h-3 w-3" />
                    </span>

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case "table":
            return (
              <div
                key={key}
                className="overflow-hidden rounded-3xl border border-white/10 bg-surface/70"
              >
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-white/10 bg-amber-base/10">
                        {block.headers?.map((header) => (
                          <th
                            key={header}
                            className="px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-amber-base"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {block.rows?.map((row, rowIndex) => (
                        <tr
                          key={`row-${rowIndex}`}
                          className="border-b border-white/10 last:border-b-0"
                        >
                          {row.map((cell, cellIndex) => (
                            <td
                              key={`cell-${rowIndex}-${cellIndex}`}
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

          case "code":
            return (
              <div
                key={key}
                className="overflow-hidden rounded-3xl border border-white/10 bg-[#080b10]"
              >
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
                  <div className="flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  </div>

                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-silver">
                    <Code2 className="h-3.5 w-3.5 text-amber-base" />
                    Code example
                  </span>
                </div>

                <pre className="overflow-x-auto p-5 text-sm leading-7 text-text-primary">
                  <code>{block.text}</code>
                </pre>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

export default async function HireDetailPage({
  params,
}: HireDetailPageProps) {
  const { slug } = await params;

  const hirePage = getHirePageBySlug(slug);

  if (!hirePage) {
    notFound();
  }

  const relatedPages = getRelatedHirePages(
    hirePage.slug,
    3
  );
  const heroImage = hirePage.image;
  const heroSkills = hirePage.credibility.slice(
    0,
    3
  );

  const faqSchema =
    hirePage.faqs?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: hirePage.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: hirePage.title,
    description: hirePage.excerpt,
    serviceType: hirePage.title,
    provider: {
      "@type": "Organization",
      name: "ClickMasters Blockchain Technologies",
    },
    areaServed: "Worldwide",
    url: `/hire/${hirePage.slug}`,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-surface/30 to-bg-base pb-24 pt-32">
        <div className="pointer-events-none absolute left-[-14rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-amber-base/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-14rem] top-[32rem] h-[30rem] w-[30rem] rounded-full bg-amber-base/10 blur-3xl" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="site-container relative px-6">
          {/* Breadcrumb */}

          <nav
            aria-label="Breadcrumb"
            className="mb-7 flex flex-wrap items-center gap-2 text-sm text-silver"
          >
            <Link
              href="/"
              className="transition-colors hover:text-amber-base"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/hire"
              className="transition-colors hover:text-amber-base"
            >
              Hire
            </Link>

            <span>/</span>

            <span className="text-text-primary">
              {hirePage.title}
            </span>
          </nav>

          {/* Hero */}

          <section className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-bg-base/75 shadow-[0_35px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-amber-base/90 to-transparent" />
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-base/15 blur-3xl" />

            <div className="grid items-center gap-10 p-6 md:p-10 lg:grid-cols-[1.08fr_0.92fr] lg:p-14">
              <div className="relative z-10">
                <Link
                  href="/hire"
                  className="inline-flex items-center gap-2 text-sm font-bold text-silver transition-colors hover:text-amber-base"
                >
                  <ArrowLeft className="h-4 w-4" />
                  All hiring guides
                </Link>

                <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-base">
                  <Users className="h-4 w-4" />
                  {hirePage.hero?.badge || "Hire Blockchain Expert"}
                </div>

                <h1 className="mt-6 max-w-4xl font-display text-4xl font-black leading-[1.08] tracking-tight text-text-primary md:text-6xl">
                  {hirePage.hero?.title || hirePage.title}
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-silver md:text-lg">
                  {hirePage.hero?.description ||
                    hirePage.excerpt}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-amber-base px-6 py-3.5 text-sm font-bold text-bg-base shadow-glow transition-all hover:-translate-y-1"
                  >
                    Hire This Expert
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href="#hire-guide"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-silver transition-all hover:-translate-y-1 hover:border-amber-base/40 hover:text-amber-base"
                  >
                    Explore Hiring Guide
                  </a>
                </div>

                <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
                  <span className="inline-flex items-center gap-2 text-sm text-silver">
                    <Clock3 className="h-4 w-4 text-amber-base" />
                    {hirePage.readTime || "Hiring guide"}
                  </span>

                  <span className="inline-flex items-center gap-2 text-sm text-silver">
                    <BadgeCheck className="h-4 w-4 text-amber-base" />
                    Specialist reviewed
                  </span>

                  <span className="inline-flex items-center gap-2 text-sm text-silver">
                    <ShieldCheck className="h-4 w-4 text-amber-base" />
                    Security focused
                  </span>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[560px]">
                <div className="absolute -inset-5 rounded-[2.5rem] bg-amber-base/10 blur-3xl" />

                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-surface via-bg-base to-surface/80 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-base/80 to-transparent" />

                  <div className="relative aspect-[4/4.35] overflow-hidden rounded-[1.6rem]">
                    <Image
                      src={heroImage}
                      alt={hirePage.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover object-center opacity-85 transition-transform duration-[3500ms] hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-bg-base/55 via-transparent to-bg-base/20" />

                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-bg-base/80 px-4 py-2 text-xs font-bold text-text-primary backdrop-blur-xl">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-base opacity-60" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-base" />
                      </span>
                      Expert match ready
                    </div>

                    <div className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-2xl border border-amber-base/20 bg-bg-base/80 text-amber-base backdrop-blur-xl">
                      <Code2 className="h-6 w-6" />
                    </div>

                    <div className="absolute left-5 right-5 top-24 rounded-3xl border border-white/10 bg-bg-base/55 p-4 backdrop-blur-xl md:left-auto md:w-[260px]">
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                        Delivery Fit
                      </p>

                      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                          <p className="font-display text-xl font-black text-text-primary">
                            24–72h
                          </p>
                          <p className="mt-1 text-xs text-silver">
                            Expert match
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                          <p className="font-display text-xl font-black text-text-primary">
                            Secure
                          </p>
                          <p className="mt-1 text-xs text-silver">
                            Build review
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-white/10 bg-bg-base/80 p-5 backdrop-blur-xl">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-base">
                        Available Expertise
                      </p>

                      <p className="mt-2 text-lg font-black text-text-primary">
                        {hirePage.title}
                      </p>

                      {heroSkills.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {heroSkills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-silver"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Credibility strip */}

          {hirePage.credibility?.length > 0 && (
            <section className="mt-8 rounded-3xl border border-white/10 bg-surface/60 p-5 md:p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                <div className="shrink-0">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-base">
                    Core Expertise
                  </p>

                  <p className="mt-1 text-sm text-silver">
                    Relevant capabilities for this role
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 lg:border-l lg:border-white/10 lg:pl-6">
                  {hirePage.credibility.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-silver"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-amber-base" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Main content */}

          <section
            id="hire-guide"
            className="scroll-mt-28 pt-20"
          >
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
              <article className="min-w-0">
                <div className="mb-9">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                    Complete Hiring Guide
                  </p>

                  <h2 className="mt-3 text-3xl font-black tracking-tight text-text-primary md:text-5xl">
                    Everything You Need to Know
                  </h2>

                  <p className="mt-5 max-w-3xl text-base leading-8 text-silver">
                    {hirePage.excerpt}
                  </p>
                </div>

                <HireContentRenderer
                  blocks={hirePage.content}
                />
              </article>

              {/* Sticky sidebar */}

              <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
                <div className="relative overflow-hidden rounded-3xl border border-amber-base/20 bg-gradient-to-br from-amber-base/15 via-surface to-bg-base p-6">
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-base/15 blur-3xl" />

                  <div className="relative">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-base text-bg-base">
                      <Users className="h-6 w-6" />
                    </span>

                    <h3 className="mt-5 text-xl font-black text-text-primary">
                      Need this expertise?
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-silver">
                      Share your requirements and receive a
                      recommendation for the right developer or
                      delivery team.
                    </p>

                    <Link
                      href="/contact"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-base px-5 py-3 text-sm font-bold text-bg-base transition-transform hover:-translate-y-0.5"
                    >
                      Discuss Your Project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-surface/70 p-6">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                    Guide Information
                  </p>

                  <div className="mt-5 space-y-4">
                    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 text-sm">
                      <span className="text-silver">
                        Category
                      </span>

                      <span className="font-bold text-text-primary">
                        {hirePage.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 text-sm">
                      <span className="text-silver">
                        Reading time
                      </span>

                      <span className="font-bold text-text-primary">
                        {hirePage.readTime || "Guide"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 text-sm">
                      <span className="text-silver">
                        Author
                      </span>

                      <span className="text-right font-bold text-text-primary">
                        {hirePage.author || "ClickMasters"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-silver">
                        Updated
                      </span>

                      <span className="font-bold text-text-primary">
                        {hirePage.date || "Recently"}
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          {/* FAQs */}

          {hirePage.faqs?.length > 0 && (
            <section className="mt-24">
              <div className="mx-auto max-w-3xl text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-amber-base/10 text-amber-base">
                  <HelpCircle className="h-6 w-6" />
                </span>

                <p className="mt-5 font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                  Frequently Asked Questions
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-text-primary md:text-5xl">
                  Questions About Hiring
                </h2>
              </div>

              <div className="mx-auto mt-10 max-w-4xl space-y-4">
                {hirePage.faqs.map((faq, index) => (
                  <details
                    key={`${faq.question}-${index}`}
                    className="group rounded-3xl border border-white/10 bg-surface/70 p-6 open:border-amber-base/30"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left">
                      <span className="text-base font-black leading-7 text-text-primary md:text-lg">
                        {faq.question}
                      </span>

                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-base/10 text-amber-base transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>

                    <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-7 text-silver md:text-base">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Data-driven CTA */}

          {hirePage.cta && (
            <section className="mt-24">
              <div className="relative overflow-hidden rounded-[2.2rem] border border-amber-base/20 bg-gradient-to-r from-amber-base via-amber-light to-surface p-8 text-bg-base md:p-14">
                <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-bg-base/15 blur-3xl" />

                <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-bg-base/70">
                      Start Your Project
                    </p>

                    <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
                      {hirePage.cta.title}
                    </h2>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-bg-base/80 md:text-base">
                      {hirePage.cta.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 lg:flex-col">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-bg-base px-7 py-3.5 text-sm font-bold text-amber-base shadow-glow transition-transform hover:-translate-y-1"
                    >
                      {hirePage.cta.primaryText ||
                        "Hire an Expert"}
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    {hirePage.cta.secondaryText && (
                      <Link
                        href="/hire"
                        className="inline-flex items-center justify-center rounded-full border border-bg-base/20 bg-bg-base/10 px-7 py-3.5 text-sm font-bold text-bg-base transition-colors hover:bg-bg-base/20"
                      >
                        {hirePage.cta.secondaryText}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Related Hire pages */}

          {relatedPages.length > 0 && (
            <section className="mt-24">
              <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                    Related Expertise
                  </p>

                  <h2 className="mt-3 text-3xl font-black tracking-tight text-text-primary md:text-5xl">
                    Explore Related Developer Roles
                  </h2>
                </div>

                <Link
                  href="/hire"
                  className="inline-flex items-center gap-2 text-sm font-bold text-amber-base"
                >
                  View all roles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {relatedPages.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/hire/${item.slug}`}
                    className="group relative flex min-h-[310px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface/80 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-amber-base/40"
                  >
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-base/10 blur-3xl group-hover:bg-amber-base/20" />

                    <div className="relative flex h-full flex-col">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-base/10 text-amber-base">
                        <Code2 className="h-5 w-5" />
                      </span>

                      <h3 className="mt-6 text-xl font-black leading-tight text-text-primary transition-colors group-hover:text-amber-base">
                        {item.title}
                      </h3>

                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-silver">
                        {item.excerpt}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.credibility
                          ?.slice(0, 2)
                          .map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-silver"
                            >
                              {skill}
                            </span>
                          ))}
                      </div>

                      <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold text-amber-base">
                        View hiring guide
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back navigation */}

          <div className="mt-16 flex justify-center">
            <Link
              href="/hire"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface px-6 py-3 text-sm font-bold text-silver transition-colors hover:border-amber-base/40 hover:text-amber-base"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to All Hiring Guides
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
