import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Layers3,
  ShieldCheck,
} from "lucide-react";

import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import BackToTop from "@/components/ui/BackToTop";
import { createMetadata } from "@/config/metadata";
import { technologies } from "@/data/technologies";

type TechnologyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return technologies.map((technology) => ({
    slug: technology.slug,
  }));
}

export async function generateMetadata({
  params,
}: TechnologyPageProps) {
  const { slug } = await params;

  const technology = technologies.find(
    (item) => item.slug === slug,
  );

  if (!technology) {
    return createMetadata({
      title: "Technology Not Found",
      description:
        "The requested blockchain technology page could not be found.",
      path: `/technologies/${slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: `${technology.name} Development Services`,
    description: technology.description,
    path: `/technologies/${technology.slug}`,
    type: "article",
  });
}

export default async function TechnologyDetailPage({
  params,
}: TechnologyPageProps) {
  const { slug } = await params;

  const technology = technologies.find(
    (item) => item.slug === slug,
  );

  if (!technology) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Navbar />

      <main className="overflow-hidden bg-bg-base">
        <section className="relative isolate overflow-hidden border-b border-white/[0.07] pb-16 pt-32 lg:pb-24 lg:pt-40">
          <div className="pointer-events-none absolute inset-0 -z-30 bg-bg-base" />

          <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(225,157,45,0.14),transparent_32%),radial-gradient(circle_at_90%_25%,rgba(255,255,255,0.04),transparent_28%)]" />

          <div
            className="pointer-events-none absolute inset-0 -z-20 opacity-[0.11]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 90%)",
            }}
          />

          <div className="site-container relative px-6">
            <nav
              aria-label="Breadcrumb"
              className="mb-10 flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-silver"
            >
              <Link
                href="/"
                className="transition-colors duration-300 hover:text-amber-base"
              >
                Home
              </Link>

              <ChevronRight className="h-3.5 w-3.5 text-amber-base" />

              <Link
                href="/technologies"
                className="transition-colors duration-300 hover:text-amber-base"
              >
                Technologies
              </Link>

              <ChevronRight className="h-3.5 w-3.5 text-amber-base" />

              <span
                aria-current="page"
                className="max-w-[240px] truncate text-text-primary sm:max-w-md"
              >
                {technology.name}
              </span>
            </nav>

            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] lg:gap-16">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/25 bg-amber-base/[0.08] px-4 py-2 text-[11px] font-black uppercase tracking-[0.17em] text-amber-base">
                  <BadgeCheck className="h-4 w-4" />
                  {technology.eyebrow}
                </div>

                <h1 className="mt-7 max-w-5xl text-4xl font-black leading-[1.08] tracking-[-0.045em] text-text-primary sm:text-5xl lg:text-[4.2rem]">
                  {technology.title}
                </h1>

                <p className="mt-7 max-w-3xl text-base leading-8 text-silver sm:text-lg">
                  {technology.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {technology.highlights.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3"
                    >
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-base">
                        {item.label}
                      </p>

                      <p className="mt-1 text-sm font-bold text-text-primary">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="relative overflow-hidden rounded-[2rem] border border-white/[0.1] bg-surface p-7 shadow-[0_30px_100px_rgba(0,0,0,0.20)]">
                <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-base/[0.12] blur-3xl" />

                <div className="relative">
                  <div className="flex items-start justify-between gap-5">
                    <span className="grid h-20 w-20 place-items-center rounded-[1.5rem] border border-amber-base/25 bg-amber-base/[0.08] text-lg font-black tracking-[0.16em] text-amber-base">
                      {technology.shortName}
                    </span>

                    <span className="rounded-full border border-amber-base/20 bg-amber-base/[0.06] px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-amber-base">
                      {technology.category}
                    </span>
                  </div>

                  <h2 className="mt-8 text-2xl font-black tracking-[-0.025em] text-text-primary">
                    Technology profile
                  </h2>

                  <div className="mt-6 space-y-3">
                    {technology.capabilities.slice(0, 4).map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm leading-6 text-silver"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-base" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="site-container relative grid gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <article className="rounded-[2rem] border border-white/[0.08] bg-surface/70 p-6 sm:p-8 lg:p-10">
              <SectionHeader
                eyebrow="Technology Overview"
                title={`What is ${technology.name}?`}
              />

              <div className="mt-7 space-y-5">
                {technology.overview.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[15px] leading-8 text-silver sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <SectionHeader
                eyebrow="Capabilities"
                title={`What we build with ${technology.name}`}
                className="mt-12 border-t border-white/[0.08] pt-10"
              />

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {technology.capabilities.map((capability, index) => (
                  <div
                    key={capability}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5"
                  >
                    <span className="text-sm font-black text-amber-base">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="mt-4 text-sm font-medium leading-7 text-silver">
                      {capability}
                    </p>
                  </div>
                ))}
              </div>

              <SectionHeader
                eyebrow="Use Cases"
                title={`Where ${technology.name} creates value`}
                className="mt-12 border-t border-white/[0.08] pt-10"
              />

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {technology.useCases.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/[0.08] bg-surface p-6"
                  >
                    <h3 className="text-xl font-black tracking-[-0.02em] text-text-primary">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-silver">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>

              <SectionHeader
                eyebrow="Implementation"
                title={`How we implement ${technology.name}`}
                className="mt-12 border-t border-white/[0.08] pt-10"
              />

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {technology.process.map((item, index) => (
                  <article
                    key={item.title}
                    className="grid gap-5 rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] p-5 sm:grid-cols-[auto_1fr]"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-amber-base/25 bg-amber-base/[0.08] text-sm font-black text-amber-base">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3 className="text-lg font-black text-text-primary">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-silver">
                        {item.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <SectionHeader
                eyebrow="Security"
                title="Security at every implementation layer"
                className="mt-12 border-t border-white/[0.08] pt-10"
              />

              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {technology.security.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/[0.08] bg-surface p-6"
                  >
                    <h3 className="flex items-center gap-3 text-lg font-black text-text-primary">
                      <ShieldCheck className="h-5 w-5 text-amber-base" />
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-silver">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </article>

            <aside className="space-y-5 lg:sticky lg:top-28">
              <div className="rounded-[1.5rem] border border-white/[0.08] bg-surface p-6">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-amber-base">
                  Why We Use It
                </p>

                <div className="mt-5 space-y-4">
                  {technology.whyWeUseIt.map((item) => (
                    <div key={item.title}>
                      <h2 className="text-sm font-black text-text-primary">
                        {item.title}
                      </h2>

                      <p className="mt-2 text-sm leading-7 text-silver">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/[0.08] bg-surface p-6">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-amber-base">
                  Key Strengths
                </p>

                <div className="mt-5 space-y-3">
                  {technology.strengths.slice(0, 5).map((strength) => (
                    <div
                      key={strength}
                      className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm leading-6 text-silver"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-base" />
                      <span>{strength}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="pb-12 lg:pb-16">
          <div className="site-container relative space-y-8 px-6">
            {technology.faqs.length > 0 && (
              <div className="rounded-[2rem] border border-white/[0.08] bg-surface/70 p-6 sm:p-8 lg:p-10">
                <SectionHeader
                  eyebrow="Frequently Asked Questions"
                  title={`${technology.name} development FAQs`}
                />

                <div className="mt-8 space-y-4">
                  {technology.faqs.map((faq) => (
                    <details
                      key={faq.question}
                      className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-4 open:bg-white/[0.04]"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-5">
                        <span className="text-base font-black text-text-primary">
                          {faq.question}
                        </span>

                        <span className="shrink-0 text-xl font-black text-amber-base transition group-open:rotate-45">
                          +
                        </span>
                      </summary>

                      <p className="mt-4 max-w-3xl text-sm leading-7 text-silver">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            <div className="relative overflow-hidden rounded-[2.25rem] border border-amber-base/25 bg-surface px-6 py-10 sm:px-9 sm:py-12 lg:px-12 lg:py-14">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(225,157,45,0.18),transparent_35%),radial-gradient(circle_at_90%_70%,rgba(225,157,45,0.08),transparent_30%)]" />

              <div className="relative flex flex-col items-start justify-between gap-9 lg:flex-row lg:items-center">
                <div className="max-w-3xl">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                    Start your project
                  </p>

                  <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.035em] text-text-primary sm:text-4xl lg:text-5xl">
                    Build your next product with {technology.name}
                  </h2>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-silver sm:text-base">
                    Work with experienced blockchain engineers to define the
                    right architecture, implementation plan, security strategy,
                    and production deployment for your product.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-xl bg-amber-base px-6 text-sm font-black text-bg-base transition-all duration-300 hover:-translate-y-1 hover:bg-amber-light hover:shadow-[0_18px_50px_rgba(225,157,45,0.25)]"
                >
                  Book a free strategy call
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.07] py-12 lg:py-16">
          <div className="site-container relative px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <RelatedPanel
                eyebrow="Related Technologies"
                title="Explore connected technologies"
                items={technology.relatedTechnologies}
                action="Explore"
              />

              <RelatedPanel
                eyebrow="Related Services"
                title="Services built around this stack"
                items={technology.relatedServices}
                action="View service"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  className = "",
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-text-primary sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function RelatedPanel({
  eyebrow,
  title,
  items,
  action,
}: {
  eyebrow: string;
  title: string;
  items: Array<{
    href: string;
    title: string;
  }>;
  action: string;
}) {
  return (
    <div className="rounded-[2rem] border border-white/[0.08] bg-surface/70 p-6 sm:p-8">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-text-primary">
        {title}
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-300 hover:border-amber-base/35 hover:bg-amber-base/[0.06]"
          >
            <span className="text-sm font-black text-text-primary transition-colors duration-300 group-hover:text-amber-base">
              {item.title}
            </span>

            <span className="mt-3 inline-flex items-center gap-2 text-xs font-black text-amber-base">
              {action}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
