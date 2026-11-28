import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import RelatedLinks from "@/components/RelatedLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  faqPageSchema,
  serviceSchema,
} from "@/lib/structured-data";
import type { Block, ContentPageData, Inline } from "@/data/content-pages";
import type { ContentType } from "@/lib/related-links";

import { Blocks, CtaButtons, Figure, Inlines } from "./Blocks";
import TableOfContents from "./TableOfContents";

const plain = (nodes: Inline[]): string =>
  nodes.map((n) => ("v" in n ? n.v : plain(n.c))).join("");

/** Shortens long H2s for the table of contents ("A: B" → "A"). */
const tocLabel = (title: string) => {
  const short = title.split(/:\s|\s—\s/)[0];
  return short.length > 12 ? short : title;
};

function Hero({ page }: { page: ContentPageData }) {
  const blocks = page.hero.blocks.filter((b) => b.t !== "quote");
  const firstP = blocks.findIndex((b) => b.t === "p");
  const crumbs = [...page.breadcrumb, { name: page.navLabel, path: page.path }];

  return (
    <section className="relative overflow-hidden bg-[#0a1020] pb-16 pt-32 text-white lg:pb-20 lg:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-amber-500/20 blur-[120px]"
      />
      <div className="site-container relative grid items-center gap-12 px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-400">
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  {i < crumbs.length - 1 ? (
                    <Link
                      href={c.path}
                      className="transition-colors hover:text-amber-light"
                    >
                      {c.name}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-slate-200">
                      {c.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          <p className="inline-flex items-center gap-2 rounded-full border border-amber-light/30 bg-amber-light/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-amber-light">
            <span
              className="h-1.5 w-1.5 rounded-full bg-amber-light"
              aria-hidden="true"
            />
            {page.kicker}
          </p>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl xl:text-[3.4rem]">
            <Inlines nodes={page.title} />
          </h1>

          <div className="mt-6 space-y-4 [&_li_a]:text-amber-light [&_p_a]:text-amber-light [&_p_a:hover]:text-amber-200 [&_strong]:text-white">
            {blocks.map((b, i) => {
              if (b.t === "p") {
                const isNote = b.c.length === 1 && b.c[0].t === "i";
                return (
                  <p
                    key={i}
                    className={
                      i === firstP
                        ? "text-lg leading-8 text-slate-200"
                        : isNote
                          ? "text-sm text-slate-400"
                          : "leading-7 text-slate-300"
                    }
                  >
                    <Inlines nodes={b.c} />
                  </p>
                );
              }
              if (b.t === "ul") {
                return (
                  <ul key={i} className="grid gap-3 pt-2">
                    {b.items.map((it, j) => (
                      <li
                        key={j}
                        className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 text-[15px] leading-6 text-slate-300"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-amber-light"
                          aria-hidden="true"
                        />
                        <span>
                          <Inlines nodes={it.c} />
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (b.t === "cta") {
                return (
                  <div key={i} className="pt-3">
                    <CtaButtons links={b.links} dark />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-amber-400/25 via-transparent to-sky-400/10 blur-xl"
          />
          <div className="relative [&_figure]:my-0 [&_figure]:border-white/10">
            <Figure block={page.hero.image} priority />
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection({
  page,
  id,
  title,
}: {
  page: ContentPageData;
  id: string;
  title: Inline[];
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-slate-200 pt-12">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
        FAQ
      </p>
      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-text-primary md:text-4xl">
        <Inlines nodes={title} />
      </h2>
      <div className="mt-8 space-y-3">
        {page.faq.map((f, i) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors open:border-amber-base/40"
            {...(i === 0 ? { open: true } : {})}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-semibold leading-6 text-text-primary md:text-lg">
                {f.q}
              </h3>
              <ChevronDown
                className="h-5 w-5 shrink-0 text-amber-600 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <div className="border-t border-slate-100 px-5 pb-2 [&>*:first-child]:mt-4">
              <Blocks blocks={f.a} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function RelatedSection({ id, blocks }: { id: string; blocks: Block[] }) {
  const groups: {
    heading?: string;
    links: { label: string; href: string }[];
  }[] = [];
  for (const b of blocks) {
    if (b.t === "h") groups.push({ heading: plain(b.c), links: [] });
    if (b.t === "ul") {
      if (!groups.length) groups.push({ links: [] });
      for (const it of b.items) {
        const a = it.c.find((n) => n.t === "a");
        if (a && a.t === "a")
          groups[groups.length - 1].links.push({
            label: plain(a.c),
            href: a.href,
          });
      }
    }
  }
  return (
    <section id={id} className="scroll-mt-28 border-t border-slate-200 pt-12">
      {groups.map((g, gi) => (
        <div key={gi} className={gi ? "mt-10" : ""}>
          <h2 className="text-2xl font-extrabold tracking-tight text-text-primary">
            {g.heading ?? "Related services and guides"}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {g.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex h-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-text-primary shadow-sm transition-colors hover:border-amber-base/50 hover:text-amber-800"
                >
                  {l.label}
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-silver-base group-hover:text-amber-600"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

function ClosingCta({
  id,
  title,
  blocks,
}: {
  id: string;
  title: Inline[];
  blocks: Block[];
}) {
  return (
    <section
      id={id}
      className="relative scroll-mt-28 overflow-hidden rounded-[2rem] bg-[#0a1020] px-6 py-12 text-white md:px-14 md:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-amber-500/20 blur-[110px]"
      />
      <div className="relative max-w-3xl [&_li_a]:text-amber-light [&_p_a]:text-amber-light [&_strong]:text-white [&_li]:text-slate-300 [&_p]:text-slate-300">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-light">
          Next step
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          <Inlines nodes={title} />
        </h2>
        {blocks.map((b, i) =>
          b.t === "cta" ? (
            <div key={i} className="mt-8 flex flex-wrap items-center gap-4">
              <CtaButtons links={b.links} dark />
              {b.rest.length > 0 && (
                <p className="text-sm">
                  <Inlines nodes={b.rest} />
                </p>
              )}
            </div>
          ) : (
            <Blocks key={i} blocks={[b]} />
          ),
        )}
      </div>
    </section>
  );
}

export default function ContentPage({
  page,
  relatedType,
  relatedSlug,
}: {
  page: ContentPageData;
  relatedType: ContentType;
  relatedSlug: string;
}) {
  const main = page.sections.filter((s) => !s.kind);
  const faq = page.sections.find((s) => s.kind === "faq");
  const cta = page.sections.find((s) => s.kind === "cta");
  const related = page.sections.filter((s) => s.kind === "related");
  const glance = page.hero.blocks.find((b) => b.t === "quote");

  const toc = [
    ...main.map((s) => ({ id: s.id, label: tocLabel(plain(s.title)) })),
    ...(faq ? [{ id: faq.id, label: "FAQ" }] : []),
  ];

  const crumbs = [...page.breadcrumb, { name: page.navLabel, path: page.path }];

  return (
    <div className="min-h-screen bg-[#fafafa] text-text-primary">
      <Navbar />
      <JsonLd
        data={[
          serviceSchema({
            name: page.titleText,
            description: page.meta.description,
            path: page.path,
            serviceType: page.kicker,
            image: page.ogImage?.src ?? page.hero.image.src,
          }),
          breadcrumbSchema(crumbs),
          faqPageSchema(
            page.faq.map((f) => ({ question: f.q, answer: f.text })),
          ),
        ]}
      />

      <main>
        <Hero page={page} />

        <div className="site-container px-6 py-14 lg:py-20">
          {glance && glance.t === "quote" && (
            <aside className="mb-14 rounded-3xl border border-amber-base/25 bg-gradient-to-br from-amber-50 via-white to-white p-6 shadow-sm md:p-8 [&>*:first-child]:mt-0">
              <Blocks blocks={glance.blocks} />
            </aside>
          )}

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_250px] xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0 w-full">
              <details className="mb-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:hidden">
                <summary className="cursor-pointer text-sm font-bold uppercase tracking-[0.14em] text-amber-700">
                  On this page
                </summary>
                <ol className="mt-3 space-y-1.5 text-sm">
                  {toc.map((t, i) => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className="text-text-secondary hover:text-amber-700"
                      >
                        {String(i + 1).padStart(2, "0")} · {t.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>

              <article className="space-y-14">
                {main.map((s, i) => (
                  <section
                    key={s.id}
                    id={s.id}
                    className={`scroll-mt-28 ${i ? "border-t border-slate-200 pt-12" : ""}`}
                  >
                    <p className="font-mono text-xs font-semibold text-amber-600">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-text-primary md:text-[2.15rem]">
                      <Inlines nodes={s.title} />
                    </h2>
                    <div className="[&>*:first-child]:mt-5">
                      <Blocks blocks={s.blocks} />
                    </div>
                  </section>
                ))}

                {faq && (
                  <FaqSection page={page} id={faq.id} title={faq.title} />
                )}
              </article>
            </div>

            <aside className="hidden self-stretch lg:block">
              <div className="sticky top-24 z-20">
                <TableOfContents items={toc} />
              </div>
            </aside>
          </div>

          {cta && (
            <div className="mt-20">
              <ClosingCta id={cta.id} title={cta.title} blocks={cta.blocks} />
            </div>
          )}

          {related.map((r) => (
            <div key={r.id} className="mt-14">
              <RelatedSection id={r.id} blocks={r.blocks} />
            </div>
          ))}
        </div>

        {related.length === 0 && (
          <RelatedLinks type={relatedType} slug={relatedSlug} />
        )}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
