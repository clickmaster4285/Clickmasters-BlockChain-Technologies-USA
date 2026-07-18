import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Code2,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import ToolCard from "@/components/tools/ToolCard";
import { createMetadata } from "@/config/metadata";
import { getPageHref } from "@/lib/pagination";

import {
  getToolCards,
  getToolCategories,
} from "@/lib/tools";

const PER_PAGE = 9;

const heroFeatures = [
  {
    icon: BarChart3,
    title: "Smart Analysis",
    description: "Make informed technical and business decisions.",
  },
  {
    icon: ShieldCheck,
    title: "Security Focused",
    description: "Evaluate risks before production deployment.",
  },
  {
    icon: Zap,
    title: "Faster Planning",
    description: "Turn complex planning into practical results.",
  },
];

type ToolsPageProps = {
  searchParams?: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
};

function getRequestedPage(page?: string) {
  const parsedPage = Number(page || 1);
  return Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
}

export async function generateMetadata({
  searchParams,
}: ToolsPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = getRequestedPage(resolvedSearchParams?.page);

  return createMetadata({
    title: "Blockchain Tools",
    description:
      "Use focused blockchain calculators, security frameworks, architecture planners, and technical decision tools built for founders, developers, and enterprise teams.",
    path: getPageHref("/tools", currentPage),
  });
}

export default async function ToolsPage({
  searchParams,
}: ToolsPageProps) {
  const resolvedSearchParams = await searchParams;

  const requestedPage = Number(resolvedSearchParams?.page || 1);
  const selectedCategory = resolvedSearchParams?.category || "All";
  const searchQuery = resolvedSearchParams?.search?.trim() || "";

  const allTools = getToolCards();
  const categories = getToolCategories();

  const filteredTools = allTools.filter((item: any) => {
    const matchesCategory =
      selectedCategory.toLowerCase() === "all" ||
      item.category?.toLowerCase() === selectedCategory.toLowerCase();

    const normalizedSearch = searchQuery.toLowerCase();

    const matchesSearch =
      !normalizedSearch ||
      item.title?.toLowerCase().includes(normalizedSearch) ||
      item.excerpt?.toLowerCase().includes(normalizedSearch) ||
      item.category?.toLowerCase().includes(normalizedSearch) ||
      item.tags?.some((tag: any) =>
        String(tag).toLowerCase().includes(normalizedSearch)
      );

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.max(
    Math.ceil(filteredTools.length / PER_PAGE),
    1
  );

  const safeCurrentPage = Math.min(
    Math.max(requestedPage, 1),
    totalPages
  );

  const start = (safeCurrentPage - 1) * PER_PAGE;

  const visibleTools = filteredTools.slice(
    start,
    start + PER_PAGE
  );

  function createPageHref(page: number) {
    return getPageHref("/tools", page, {
      category:
        selectedCategory.toLowerCase() !== "all"
          ? selectedCategory
          : undefined,
      search: searchQuery || undefined,
    });
  }

  function createCategoryHref(category: string) {
    const params = new URLSearchParams();

    if (category.toLowerCase() !== "all") {
      params.set("category", category);
    }

    if (searchQuery) {
      params.set("search", searchQuery);
    }

    const query = params.toString();

    return query ? `/tools?${query}` : "/tools";
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-surface/30 to-bg-base pb-24 pt-32">
        {/* Page background effects */}
        <div className="pointer-events-none absolute left-[-14rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-amber-base/10 blur-[110px]" />

        <div className="pointer-events-none absolute right-[-12rem] top-[34rem] h-[30rem] w-[30rem] rounded-full bg-amber-base/10 blur-[110px]" />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />

        <section className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          {/* Premium hero */}
          <section className="group/hero relative overflow-hidden rounded-[2rem] border border-white/10 bg-bg-base/75 p-6 shadow-[0_40px_140px_rgba(0,0,0,0.48)] backdrop-blur-2xl md:rounded-[2.75rem] md:p-10 lg:p-14">
            {/* Hero decorative effects */}
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-amber-base to-transparent" />

            <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-amber-base/15 blur-[100px] transition-transform duration-1000 group-hover/hero:scale-110" />

            <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[24rem] w-[24rem] rounded-full bg-amber-base/5 blur-[100px]" />

            <div className="pointer-events-none absolute inset-0 opacity-30">
              <div className="absolute left-[8%] top-[14%] h-1.5 w-1.5 animate-tools-particle rounded-full bg-amber-base" />
              <div className="absolute left-[44%] top-[10%] h-1 w-1 animate-tools-particle-delayed rounded-full bg-amber-base" />
              <div className="absolute right-[15%] top-[24%] h-1.5 w-1.5 animate-tools-particle rounded-full bg-amber-base" />
              <div className="absolute bottom-[16%] left-[42%] h-1 w-1 animate-tools-particle-delayed rounded-full bg-amber-base" />
            </div>

            <div className="relative grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
              {/* Left content */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/25 bg-amber-base/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-amber-base shadow-[0_0_30px_rgba(245,158,11,0.08)]">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  Blockchain Utility Hub
                </div>

                <h1 className="mt-7 max-w-4xl font-display text-4xl font-black leading-[1.05] tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl">
                  Build smarter with{" "}
                  <span className="relative inline-block text-amber-base">
                    practical tools
                    <span className="absolute -bottom-2 left-0 h-[3px] w-full origin-left animate-tools-line rounded-full bg-gradient-to-r from-amber-base to-transparent" />
                  </span>
                </h1>

                <p className="mt-7 max-w-2xl text-base leading-8 text-silver md:text-lg">
                  Use focused blockchain calculators, security frameworks,
                  architecture planners, and technical decision tools built for
                  founders, developers, and enterprise teams.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href="#tools-grid"
                    className="group/button inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-base px-7 py-3.5 text-sm font-black text-bg-base shadow-[0_15px_45px_rgba(245,158,11,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(245,158,11,0.3)] sm:w-auto"
                  >
                    Explore Tools
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                  </a>

                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-silver backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30 hover:bg-amber-base/5 hover:text-amber-base sm:w-auto"
                  >
                    Request a Custom Tool
                  </Link>
                </div>

                {/* Feature cards */}
                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  {heroFeatures.map((feature, index) => {
                    const Icon = feature.icon;

                    return (
                      <div
                        key={feature.title}
                        className="group/feature relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-base/30 hover:bg-amber-base/[0.06]"
                      >
                        <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-amber-base/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover/feature:opacity-100" />

                        <div className="relative">
                          <div className="flex items-center justify-between">
                            <span className="grid h-10 w-10 place-items-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-amber-base transition-transform duration-500 group-hover/feature:rotate-6 group-hover/feature:scale-110">
                              <Icon className="h-5 w-5" />
                            </span>

                            <span className="text-[10px] font-black text-silver/40">
                              0{index + 1}
                            </span>
                          </div>

                          <h3 className="mt-4 text-sm font-black text-text-primary">
                            {feature.title}
                          </h3>

                          <p className="mt-2 text-xs leading-5 text-silver">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right visual */}
              <div className="relative flex min-h-[420px] items-center justify-center">
                <div className="pointer-events-none absolute h-[26rem] w-[26rem] rounded-full bg-amber-base/10 blur-[90px]" />

                {/* Rotating rings */}
                <div className="pointer-events-none absolute h-[350px] w-[350px] animate-tools-orbit rounded-full border border-amber-base/15" />

                <div className="pointer-events-none absolute h-[285px] w-[285px] animate-tools-orbit-reverse rounded-full border border-dashed border-white/10" />

                <div className="pointer-events-none absolute h-[210px] w-[210px] animate-tools-orbit rounded-full border border-amber-base/10 [animation-duration:14s]" />

                {/* Orbiting icons */}
                <span className="absolute left-[8%] top-[24%] grid h-12 w-12 animate-tools-float-small place-items-center rounded-2xl border border-white/10 bg-bg-base/80 text-amber-base shadow-xl backdrop-blur-xl">
                  <Code2 className="h-5 w-5" />
                </span>

                <span className="absolute right-[4%] top-[20%] grid h-12 w-12 animate-tools-float-delayed place-items-center rounded-2xl border border-white/10 bg-bg-base/80 text-amber-base shadow-xl backdrop-blur-xl">
                  <ShieldCheck className="h-5 w-5" />
                </span>

                <span className="absolute bottom-[12%] left-[14%] grid h-12 w-12 animate-tools-float-delayed place-items-center rounded-2xl border border-white/10 bg-bg-base/80 text-amber-base shadow-xl backdrop-blur-xl">
                  <Boxes className="h-5 w-5" />
                </span>

                {/* Image */}
                <div className="relative z-10 w-full max-w-[300px]">
                  <div className="relative aspect-square w-full">
                    <Image
                      src="/media/tools-hero.png"
                      alt="Blockchain tools and analytics illustration"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="animate-tools-main-float object-contain object-center drop-shadow-[0_35px_90px_rgba(0,0,0,0.55)]"
                    />
                  </div>
                </div>

                {/* Floating stats */}
                <div className="absolute bottom-3 right-0 z-20 rounded-2xl border border-white/10 bg-bg-base/75 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:right-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-base">
                    Available Now
                  </p>

                  <p className="mt-1 text-sm font-bold text-text-primary">
                    {allTools.length} practical tools
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Search and filters */}
          <section id="tools-grid" className="scroll-mt-28 pt-16">

            {/* Section heading */}
            <div className="mb-9 mt-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-amber-base">
                  <span className="h-px w-8 bg-amber-base" />
                  Tool Library
                </div>

                <h2 className="mt-4 text-3xl font-black tracking-tight text-text-primary md:text-5xl">
                  {selectedCategory.toLowerCase() === "all"
                    ? "Explore All Blockchain Tools"
                    : `${selectedCategory} Tools`}
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-7 text-silver">
                Showing {visibleTools.length} of {filteredTools.length} matching
                tools.
              </p>
            </div>

            {/* Cards */}
            {visibleTools.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visibleTools.map((item: any, index: number) => (
                  <ToolCard
                    key={item.slug}
                    item={item}
                    index={start + index}
                  />
                ))}
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface/80 p-10 text-center md:p-16">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-base/10 blur-3xl" />

                <div className="relative">
                  <span className="mx-auto grid h-20 w-20 place-items-center rounded-3xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
                    <Wrench className="h-9 w-9" />
                  </span>

                  <h3 className="mt-6 text-2xl font-black text-text-primary">
                    No tools found
                  </h3>

                  <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-silver">
                    Try another search phrase or select a different tool
                    category.
                  </p>

                  <Link
                    href="/tools"
                    className="mt-7 inline-flex rounded-full bg-amber-base px-7 py-3 text-sm font-black text-bg-base"
                  >
                    View All Tools
                  </Link>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
                {safeCurrentPage > 1 ? (
                  <Link
                    href={createPageHref(safeCurrentPage - 1)}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-surface px-5 text-sm font-bold text-silver transition-all hover:-translate-y-0.5 hover:border-amber-base/40 hover:text-amber-base"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Link>
                ) : (
                  <span className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-5 text-sm font-bold text-silver/40">
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </span>
                )}

                {Array.from({
                  length: Math.min(3, totalPages),
                }).map((_, index) => {
                  const paginationStart =
                    safeCurrentPage >= totalPages - 1
                      ? Math.max(totalPages - 2, 1)
                      : safeCurrentPage;

                  const pageNumber = paginationStart + index;

                  if (pageNumber > totalPages) return null;

                  const isActive =
                    pageNumber === safeCurrentPage;

                  return (
                    <Link
                      key={pageNumber}
                      href={createPageHref(pageNumber)}
                      className={`grid h-11 w-11 place-items-center rounded-full border text-sm font-black transition-all duration-300 ${
                        isActive
                          ? "border-amber-base bg-amber-base text-bg-base shadow-glow"
                          : "border-white/10 bg-surface text-silver hover:-translate-y-0.5 hover:border-amber-base/40 hover:text-amber-base"
                      }`}
                    >
                      {pageNumber}
                    </Link>
                  );
                })}

                {safeCurrentPage < totalPages ? (
                  <Link
                    href={createPageHref(safeCurrentPage + 1)}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-amber-base px-5 text-sm font-black text-bg-base transition-all hover:-translate-y-0.5 hover:shadow-glow"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-full bg-amber-base/30 px-5 text-sm font-black text-bg-base/50">
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </span>
                )}
              </div>
            )}
          </section>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
