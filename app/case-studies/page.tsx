import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Clock3,
  Home,
  Layers3,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import BackToTop from "@/components/ui/BackToTop";
import { caseStudies } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Case Studies | ClickMasters",
  description:
    "Explore blockchain case studies from ClickMasters across DeFi, tokenization, supply chain, payments, smart contracts, and enterprise blockchain.",
};

type CaseStudiesPageProps = {
  searchParams?: Promise<{
    page?: string | string[];
  }>;
};

const cardsPerPage = 9;

function getPageHref(page: number) {
  return page <= 1 ? "/case-studies" : `/case-studies?page=${page}`;
}

function getCurrentPage(page?: string | string[]) {
  const rawPage = Array.isArray(page) ? page[0] : page;
  const parsedPage = Number.parseInt(rawPage || "1", 10);

  return Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
}

export default async function CaseStudiesPage({
  searchParams,
}: CaseStudiesPageProps) {
  const resolvedSearchParams = await searchParams;
  const requestedPage = getCurrentPage(resolvedSearchParams?.page);

  const featuredCaseStudy =
    caseStudies.find((caseStudy) => caseStudy.featured) ?? caseStudies[0];

  const remainingCaseStudies = featuredCaseStudy
    ? caseStudies.filter((caseStudy) => caseStudy.slug !== featuredCaseStudy.slug)
    : caseStudies;

  const totalPages = Math.max(
    1,
    Math.ceil(remainingCaseStudies.length / cardsPerPage)
  );
  const currentPage = Math.min(requestedPage, totalPages);
  const firstCardIndex = (currentPage - 1) * cardsPerPage;
  const paginatedCaseStudies = remainingCaseStudies.slice(
    firstCardIndex,
    firstCardIndex + cardsPerPage
  );
  const pageNumbers = Array.from(
    {
      length: totalPages,
    },
    (_, index) => index + 1
  );

  const stats = [
    {
      value: `${caseStudies.length}+`,
      label: "Documented case studies",
    },
    {
      value: "$48M",
      label: "Largest TVL result",
    },
    {
      value: "94%",
      label: "Cost reduction shown",
    },
    {
      value: "0",
      label: "Critical launch incidents",
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-amber-base/5 to-bg-base pb-24 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(100,116,139,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.055)_1px,transparent_1px)] bg-[size:68px_68px] opacity-70" />
        <div className="pointer-events-none absolute -left-72 -top-56 h-[46rem] w-[46rem] rounded-full bg-amber-base/[0.09] blur-[140px]" />
        <div className="pointer-events-none absolute -right-72 top-[34rem] h-[42rem] w-[42rem] rounded-full bg-emerald-base/[0.06] blur-[140px]" />

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

              <span className="min-w-0 truncate font-bold text-text-primary">
                Case Studies
              </span>
            </div>
          </nav>

          <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-amber-base">
                <Sparkles className="h-4 w-4" />
                Blockchain Case Studies
              </div>

              <h1 className="mt-7 max-w-5xl text-4xl font-black leading-[1.05] tracking-[-0.04em] text-text-primary sm:text-5xl lg:text-7xl">
                Real blockchain outcomes, shown project by project.
              </h1>

              <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-text-secondary sm:text-lg">
                Explore how ClickMasters designs and delivers DeFi protocols,
                tokenized assets, enterprise blockchain systems, payment rails,
                smart contracts, and Web3 product launches.
              </p>
            </div>

            <div className="rounded-3xl border border-border-default bg-white/85 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
              <div className="flex items-center gap-3 border-b border-border-default pb-5">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-emerald-base/20 bg-emerald-base/10 text-emerald-base">
                  <TrendingUp className="h-5 w-5" />
                </span>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-text-muted">
                    Selected Results
                  </p>
                  <p className="mt-1 text-sm font-black text-text-primary">
                    Commercial and technical impact
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border-default bg-bg-base p-4"
                  >
                    <p className="text-3xl font-black tracking-[-0.04em] text-text-primary">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-xs font-bold leading-5 text-text-secondary">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {featuredCaseStudy && (
            <section className="mt-12 overflow-hidden rounded-[2rem] border border-border-default bg-white shadow-[0_30px_90px_rgba(15,23,42,0.10)]">
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative min-h-[360px] overflow-hidden sm:min-h-[460px] lg:min-h-[560px]">
                  <Image
                    src={featuredCaseStudy.image}
                    alt={featuredCaseStudy.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />

                  <span className="absolute left-5 top-5 rounded-full bg-amber-base px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-[0_14px_30px_rgba(217,119,6,0.24)]">
                    Featured Case Study
                  </span>
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-base">
                    {featuredCaseStudy.industry}
                  </p>

                  <h2 className="mt-4 text-3xl font-black leading-tight text-text-primary sm:text-4xl lg:text-5xl">
                    {featuredCaseStudy.title}
                  </h2>

                  <p className="mt-5 text-base leading-8 text-text-secondary">
                    {featuredCaseStudy.excerpt}
                  </p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {[
                      {
                        label: "Result",
                        value: featuredCaseStudy.result,
                        icon: TrendingUp,
                      },
                      {
                        label: "Service",
                        value: featuredCaseStudy.service,
                        icon: Sparkles,
                      },
                      {
                        label: "Timeline",
                        value: featuredCaseStudy.duration,
                        icon: Clock3,
                      },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-border-default bg-bg-base p-4"
                        >
                          <div className="flex items-center gap-2 text-xs font-bold text-text-muted">
                            <Icon className="h-4 w-4 text-amber-base" />
                            {item.label}
                          </div>
                          <p className="mt-2 text-sm font-black text-text-primary">
                            {item.value}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <Link
                    href={`/case-studies/${featuredCaseStudy.slug}`}
                    className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 self-start rounded-full bg-amber-base px-7 py-3 text-sm font-black text-white shadow-[0_16px_40px_rgba(217,119,6,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-amber-light"
                  >
                    View Full Case Study
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          )}

          <section className="mt-16">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-amber-base">
                  <Layers3 className="h-4 w-4" />
                  Selected Work
                </p>

                <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight text-text-primary sm:text-5xl">
                  Browse blockchain case studies
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
                Each project includes the challenge, architecture, timeline, and measurable outcomes.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {paginatedCaseStudies.map((caseStudy) => (
                <Link
                  key={caseStudy.slug}
                  href={`/case-studies/${caseStudy.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border-default bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30 hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)]"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                    <div className="absolute inset-x-4 top-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-black text-text-primary backdrop-blur-xl">
                        {caseStudy.industry}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-base">
                        {caseStudy.service}
                      </p>

                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border-default text-text-secondary transition-all group-hover:border-amber-base/30 group-hover:bg-amber-base group-hover:text-white">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>

                    <h3 className="mt-4 line-clamp-2 text-xl font-black leading-snug text-text-primary">
                      {caseStudy.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-text-secondary">
                      {caseStudy.excerpt}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-4 border-t border-border-default pt-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-text-muted">
                          Result
                        </p>
                        <p className="mt-1 text-lg font-black text-text-primary">
                          {caseStudy.result}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-text-muted">
                          Timeline
                        </p>
                        <p className="mt-1 text-sm font-black text-text-primary">
                          {caseStudy.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                aria-label="Case studies pagination"
                className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border-default bg-white/85 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:flex-row"
              >
                <p className="text-sm font-bold text-text-secondary">
                  Showing {firstCardIndex + 1}-
                  {Math.min(
                    firstCardIndex + cardsPerPage,
                    remainingCaseStudies.length
                  )}{" "}
                  of {remainingCaseStudies.length} case studies
                </p>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Link
                    href={getPageHref(Math.max(1, currentPage - 1))}
                    aria-disabled={currentPage === 1}
                    className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition-all ${
                      currentPage === 1
                        ? "pointer-events-none border-border-default bg-bg-base text-text-muted opacity-60"
                        : "border-border-default bg-bg-base text-text-primary hover:border-amber-base/30 hover:text-amber-base"
                    }`}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Link>

                  {pageNumbers.map((page) => {
                    const isActive = page === currentPage;

                    return (
                      <Link
                        key={page}
                        href={getPageHref(page)}
                        aria-current={isActive ? "page" : undefined}
                        className={`grid h-10 w-10 place-items-center rounded-full border text-sm font-black transition-all ${
                          isActive
                            ? "border-amber-base bg-amber-base text-white shadow-[0_12px_30px_rgba(217,119,6,0.20)]"
                            : "border-border-default bg-bg-base text-text-primary hover:border-amber-base/30 hover:text-amber-base"
                        }`}
                      >
                        {page}
                      </Link>
                    );
                  })}

                  <Link
                    href={getPageHref(Math.min(totalPages, currentPage + 1))}
                    aria-disabled={currentPage === totalPages}
                    className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-black transition-all ${
                      currentPage === totalPages
                        ? "pointer-events-none border-border-default bg-bg-base text-text-muted opacity-60"
                        : "border-border-default bg-bg-base text-text-primary hover:border-amber-base/30 hover:text-amber-base"
                    }`}
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </nav>
            )}
          </section>

          <section className="mt-16 overflow-hidden rounded-[2rem] border border-border-default bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-amber-base">
                  <BadgeCheck className="h-4 w-4" />
                  Build With ClickMasters
                </p>

                <h2 className="mt-3 text-3xl font-black text-text-primary sm:text-4xl">
                  Ready to create the next case study?
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-8 text-text-secondary">
                  Tell us what you want to build and we will help scope the architecture, roadmap, compliance needs, and launch plan.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-amber-base px-7 py-3 text-sm font-black text-white shadow-[0_16px_40px_rgba(217,119,6,0.22)] transition-all hover:-translate-y-1 hover:bg-amber-light"
                >
                  Start Your Project
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/service"
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-border-default bg-bg-base px-7 py-3 text-sm font-black text-text-primary transition-all hover:-translate-y-1 hover:border-amber-base/30 hover:text-amber-base"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
