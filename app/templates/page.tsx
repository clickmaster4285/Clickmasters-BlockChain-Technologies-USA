import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileCheck2,
  FileText,
  Layers3,
  Search,
  Sparkles,
  WandSparkles,
} from "lucide-react";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import TemplateCard from "@/components/templates/TemplateCard";

import {
  getFeaturedTemplates,
  getTemplateCards,
  getTemplateCategories,
} from "@/lib/templates";

const PER_PAGE = 9;

const heroBenefits = [
  {
    icon: FileCheck2,
    title: "Ready to use",
    description: "Start with a clear professional structure.",
  },
  {
    icon: Layers3,
    title: "Fully structured",
    description: "Every essential section is already organized.",
  },
  {
    icon: WandSparkles,
    title: "Easy to customize",
    description: "Adapt each template to your project requirements.",
  },
];

export default async function TemplatesPage({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;

  const requestedPage = Math.max(
    Number(resolvedSearchParams?.page || 1),
    1
  );

  const selectedCategory =
    resolvedSearchParams?.category?.trim() || "All";

  const searchQuery =
    resolvedSearchParams?.search?.trim() || "";

  const allTemplates = getTemplateCards();
  const categories = getTemplateCategories();
  const featuredTemplates = getFeaturedTemplates(3);

  const normalizedSearch = searchQuery.toLowerCase();

  const filteredTemplates = allTemplates.filter((item: any) => {
    const matchesCategory =
      selectedCategory.toLowerCase() === "all" ||
      item.category?.toLowerCase() ===
        selectedCategory.toLowerCase();

    const matchesSearch =
      !normalizedSearch ||
      item.title?.toLowerCase().includes(normalizedSearch) ||
      item.excerpt?.toLowerCase().includes(normalizedSearch) ||
      item.category?.toLowerCase().includes(normalizedSearch) ||
      item.format?.toLowerCase().includes(normalizedSearch) ||
      item.tags?.some((tag: any) =>
        String(tag).toLowerCase().includes(normalizedSearch)
      );

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.max(
    Math.ceil(filteredTemplates.length / PER_PAGE),
    1
  );

  const safeCurrentPage = Math.min(
    requestedPage,
    totalPages
  );

  const start = (safeCurrentPage - 1) * PER_PAGE;

  const visibleTemplates = filteredTemplates.slice(
    start,
    start + PER_PAGE
  );

  function createPageHref(page: number) {
    const params = new URLSearchParams();

    params.set("page", String(page));

    if (selectedCategory.toLowerCase() !== "all") {
      params.set("category", selectedCategory);
    }

    if (searchQuery) {
      params.set("search", searchQuery);
    }

    return `/templates?${params.toString()}#template-library`;
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

    return query
      ? `/templates?${query}#template-library`
      : "/templates#template-library";
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-[#111a2a] to-bg-base pb-14 pt-22">
        {/* Page background */}
        <div className="pointer-events-none absolute left-[-15rem] top-[-12rem] h-[38rem] w-[38rem] rounded-full bg-amber-base/10 blur-[120px]" />

        <div className="pointer-events-none absolute right-[-15rem] top-[42rem] h-[34rem] w-[34rem] rounded-full bg-blue-500/8 blur-[120px]" />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.014)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.014)_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />

        <section className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          {/* Hero */}
          <section className="group/hero relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1524]/90 p-6 shadow-[0_42px_140px_rgba(0,0,0,0.3)] backdrop-blur-2xl md:rounded-[2.8rem] md:p-10 lg:p-14">
            <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-amber-base to-transparent" />

            <div className="pointer-events-none absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-amber-base/15 blur-[110px] transition-transform duration-1000 group-hover/hero:scale-110" />

            <div className="pointer-events-none absolute -bottom-36 left-[25%] h-[26rem] w-[26rem] rounded-full bg-blue-500/8 blur-[100px]" />

            {/* Particles */}
            <span className="pointer-events-none absolute left-[8%] top-[16%] h-1.5 w-1.5 animate-template-particle rounded-full bg-amber-base" />

            <span className="pointer-events-none absolute right-[12%] top-[20%] h-1 w-1 animate-template-particle-delayed rounded-full bg-blue-300" />

            <span className="pointer-events-none absolute bottom-[15%] left-[45%] h-1.5 w-1.5 animate-template-particle rounded-full bg-amber-base" />

            <div className="relative grid items-center gap-14 lg:grid-cols-[1.06fr_0.94fr]">
              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/25 bg-amber-base/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.23em] text-amber-base">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  Blockchain Template Library
                </div>

                <h1 className="mt-7 max-w-4xl font-display text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Plan faster with{" "}
                  <span className="relative inline-block text-amber-base">
                    professional templates
                    <span className="absolute -bottom-2 left-0 h-[3px] w-full origin-left animate-tools-line rounded-full bg-gradient-to-r from-amber-base to-transparent" />
                  </span>
                </h1>

                <p className="mt-7 max-w-2xl text-base leading-8 text-[#aab6c8] md:text-lg">
                  Use practical templates for blockchain planning, project
                  documentation, technical architecture, security, tokenomics,
                  proposals, and enterprise delivery.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href="#template-library"
                    className="group/button inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-base px-7 py-3.5 text-sm font-black text-[#101827] shadow-[0_10px_36px_rgba(245,158,11,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_45px_rgba(245,158,11,0.32)] sm:w-auto"
                  >
                    Explore Templates

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                  </a>

                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-bold text-[#d7deea] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30 hover:bg-amber-base/[0.05] hover:text-amber-base sm:w-auto"
                  >
                    Request Custom Template
                  </Link>
                </div>

                {/* Benefits */}
                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  {heroBenefits.map((benefit, index) => {
                    const Icon = benefit.icon;

                    return (
                      <div
                        key={benefit.title}
                        className="group/benefit relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-base/30 hover:bg-amber-base/[0.05]"
                      >
                        <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-amber-base/0 blur-2xl transition-colors duration-500 group-hover/benefit:bg-amber-base/10" />

                        <div className="relative">
                          <div className="flex items-center justify-between">
                            <span className="grid h-10 w-10 place-items-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-amber-base transition-all duration-500 group-hover/benefit:rotate-6 group-hover/benefit:scale-110 group-hover/benefit:bg-amber-base group-hover/benefit:text-[#101827]">
                              <Icon className="h-5 w-5" />
                            </span>

                            <span className="text-[10px] font-black text-[#68758a]">
                              0{index + 1}
                            </span>
                          </div>

                          <h3 className="mt-4 text-sm font-black text-white">
                            {benefit.title}
                          </h3>

                          <p className="mt-2 text-xs leading-5 text-[#91a0b6]">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right animated document visual */}
              <div className="relative flex min-h-[470px] items-center justify-center">
                <div className="pointer-events-none absolute h-[27rem] w-[27rem] rounded-full bg-amber-base/10 blur-[100px]" />

                <div className="pointer-events-none absolute h-[370px] w-[370px] animate-template-ring rounded-full border border-amber-base/15" />

                <div className="pointer-events-none absolute h-[295px] w-[295px] animate-template-ring-reverse rounded-full border border-dashed border-white/10" />

                {/* Floating chips */}
                <div className="absolute left-0 top-[20%] z-20 animate-template-paper-one rounded-2xl border border-white/10 bg-[#101827]/85 px-4 py-3 shadow-xl backdrop-blur-xl sm:left-5">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-base">
                    Structured
                  </p>

                  <p className="mt-1 text-sm font-bold text-white">
                    Ready to customize
                  </p>
                </div>

                <div className="absolute bottom-[14%] right-0 z-20 animate-template-paper-two rounded-2xl border border-white/10 bg-[#101827]/85 px-4 py-3 shadow-xl backdrop-blur-xl sm:right-4">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-base">
                    Professional
                  </p>

                  <p className="mt-1 text-sm font-bold text-white">
                    Built for teams
                  </p>
                </div>

                {/* Document stack */}
                <div className="relative h-[370px] w-[300px]">
                  <div className="absolute left-0 top-7 h-[315px] w-[235px] -rotate-12 rounded-[1.7rem] border border-white/10 bg-[#121e31] shadow-[0_15px_50px_rgba(0,0,0,0.36)] transition-transform duration-700 group-hover/hero:-translate-x-3 group-hover/hero:-rotate-[16deg]">
                    <div className="space-y-4 p-6 opacity-50">
                      <div className="h-3 w-20 rounded-full bg-blue-400/30" />
                      <div className="h-2 w-full rounded-full bg-white/10" />
                      <div className="h-2 w-5/6 rounded-full bg-white/10" />
                      <div className="h-2 w-3/5 rounded-full bg-white/10" />
                    </div>
                  </div>

                  <div className="absolute right-0 top-8 h-[315px] w-[235px] rotate-12 rounded-[1.7rem] border border-white/10 bg-[#17243a] shadow-[0_15px_20px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover/hero:translate-x-3 group-hover/hero:rotate-[16deg]">
                    <div className="space-y-4 p-6 opacity-50">
                      <div className="h-3 w-24 rounded-full bg-amber-base/30" />
                      <div className="h-2 w-full rounded-full bg-white/10" />
                      <div className="grid grid-cols-2 gap-3 pt-3">
                        <div className="h-14 rounded-xl bg-white/5" />
                        <div className="h-14 rounded-xl bg-white/5" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-1/2 top-0 z-10 h-[350px] w-[250px] -translate-x-1/2 animate-template-main-paper overflow-hidden rounded-[1.9rem] border border-amber-base/30 bg-gradient-to-br from-[#192842] to-[#0f1828] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
                        <FileText className="h-6 w-6" />
                      </span>

                      <span className="rounded-full border border-amber-base/20 bg-amber-base/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.17em] text-amber-base">
                        Template
                      </span>
                    </div>

                    <h3 className="mt-7 text-2xl font-black leading-tight text-white">
                      Project-ready documentation
                    </h3>

                    <div className="mt-6 space-y-3">
                      <div className="h-2.5 w-full rounded-full bg-white/15" />
                      <div className="h-2.5 w-5/6 rounded-full bg-white/10" />
                      <div className="h-2.5 w-3/4 rounded-full bg-white/10" />
                    </div>

                    <div className="mt-7 space-y-3">
                      {[
                        "Project Overview",
                        "Technical Requirements",
                        "Delivery Roadmap",
                      ].map((label, index) => (
                        <div
                          key={label}
                          className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3"
                        >
                          <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-base/10 text-[10px] font-black text-amber-base">
                            0{index + 1}
                          </span>

                          <span className="text-xs font-bold text-[#c8d1df]">
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="text-xs font-black text-amber-base">
                        ClickMasters
                      </span>

                      <FileCheck2 className="h-4 w-4 text-amber-base" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured */}
          {featuredTemplates.length > 0 && (
            <section className="mt-20">
              <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-amber-base">
                    <span className="h-px w-8 bg-amber-base" />
                    Featured Templates
                  </div>

                  <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
                    Start with our top templates
                  </h2>
                </div>

                <p className="max-w-xl text-sm leading-7 text-[#94a3b8]">
                  Professionally structured templates for the most common
                  blockchain planning and documentation workflows.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {featuredTemplates.map(
                  (item: any, index: number) => (
                    <TemplateCard
                      key={item.slug}
                      item={item}
                      index={index}
                    />
                  )
                )}
              </div>
            </section>
          )}

          {/* Library */}
          <section
            id="template-library"
            className="scroll-mt-28 pt-20"
          >
            {/* Filters */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#101827]/90 p-5 shadow-[0_15px_40px_rgba(0,0,0,0.27)] backdrop-blur-xl md:p-7">
              <div className="pointer-events-none absolute -right-24 -top-24 h-60 w-60 rounded-full bg-amber-base/10 blur-[80px]" />

              <div className="relative">
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.23em] text-amber-base">
                      Template Finder
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-white">
                      Find the right project structure
                    </h2>
                  </div>

                  <p className="text-sm text-[#94a3b8]">
                    {filteredTemplates.length} matching templates
                  </p>
                </div>

                <form
                  action="/templates"
                  method="GET"
                  className="flex flex-col gap-3 md:flex-row"
                >
                  {selectedCategory.toLowerCase() !== "all" && (
                    <input
                      type="hidden"
                      name="category"
                      value={selectedCategory}
                    />
                  )}

                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-base" />

                    <input
                      type="search"
                      name="search"
                      defaultValue={searchQuery}
                      placeholder="Search planning, tokenomics, security templates..."
                      className="h-13 w-full rounded-full border border-white/10 bg-[#0b1320] pl-12 pr-5 text-sm text-white outline-none transition-all placeholder:text-[#64748b] focus:border-amber-base/40 focus:shadow-[0_0_0_4px_rgba(245,158,11,0.06)]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-amber-base px-8 text-sm font-black text-[#101827] transition-all hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(245,158,11,0.22)]"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </button>

                  {(searchQuery ||
                    selectedCategory.toLowerCase() !== "all") && (
                    <Link
                      href="/templates#template-library"
                      className="inline-flex h-13 items-center justify-center rounded-full border border-white/10 px-7 text-sm font-bold text-[#aab6c8] transition-all hover:border-amber-base/30 hover:text-amber-base"
                    >
                      Clear
                    </Link>
                  )}
                </form>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["All", ...categories].map((category) => {
                    const isActive =
                      selectedCategory.toLowerCase() ===
                      category.toLowerCase();

                    return (
                      <Link
                        key={category}
                        href={createCategoryHref(category)}
                        className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-xs font-black transition-all duration-300 ${
                          isActive
                            ? "border-amber-base bg-amber-base text-[#101827] shadow-[0_10px_30px_rgba(245,158,11,0.2)]"
                            : "border-white/10 bg-[#151f31] text-[#aab6c8] hover:-translate-y-0.5 hover:border-amber-base/30 hover:bg-amber-base/[0.05] hover:text-amber-base"
                        }`}
                      >
                        {category === "All" ? (
                          <Sparkles className="h-3.5 w-3.5" />
                        ) : (
                          <FileText className="h-3.5 w-3.5" />
                        )}

                        {category}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-9 mt-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-amber-base">
                  <span className="h-px w-8 bg-amber-base" />
                  Template Library
                </div>

                <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-5xl">
                  {selectedCategory.toLowerCase() === "all"
                    ? "Explore All Templates"
                    : `${selectedCategory} Templates`}
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-7 text-[#94a3b8]">
                Showing {visibleTemplates.length} of{" "}
                {filteredTemplates.length} matching templates.
              </p>
            </div>

            {/* Cards */}
            {visibleTemplates.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visibleTemplates.map(
                  (item: any, index: number) => (
                    <TemplateCard
                      key={item.slug}
                      item={item}
                      index={start + index}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#101827] p-10 text-center md:p-16">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-base/10 blur-[80px]" />

                <div className="relative">
                  <span className="mx-auto grid h-20 w-20 place-items-center rounded-3xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
                    <FileText className="h-9 w-9" />
                  </span>

                  <h3 className="mt-6 text-2xl font-black text-white">
                    No templates found
                  </h3>

                  <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#94a3b8]">
                    Try another search phrase or choose a different template
                    category.
                  </p>

                  <Link
                    href="/templates#template-library"
                    className="mt-7 inline-flex rounded-full bg-amber-base px-7 py-3 text-sm font-black text-[#101827]"
                  >
                    View All Templates
                  </Link>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
                {safeCurrentPage > 1 ? (
                  <Link
                    href={createPageHref(
                      safeCurrentPage - 1
                    )}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-[#101827] px-5 text-sm font-bold text-[#aab6c8] transition-all hover:-translate-y-0.5 hover:border-amber-base/40 hover:text-amber-base"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Link>
                ) : (
                  <span className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-5 text-sm font-bold text-[#64748b]">
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

                  const pageNumber =
                    paginationStart + index;

                  if (pageNumber > totalPages) {
                    return null;
                  }

                  const isActive =
                    pageNumber === safeCurrentPage;

                  return (
                    <Link
                      key={pageNumber}
                      href={createPageHref(pageNumber)}
                      className={`grid h-11 w-11 place-items-center rounded-full border text-sm font-black transition-all duration-300 ${
                        isActive
                          ? "border-amber-base bg-amber-base text-[#101827] shadow-[0_5px_10px_rgba(245,158,11,0.22)]"
                          : "border-white/10 bg-[#101827] text-[#aab6c8] hover:-translate-y-0.5 hover:border-amber-base/40 hover:text-amber-base"
                      }`}
                    >
                      {pageNumber}
                    </Link>
                  );
                })}

                {safeCurrentPage < totalPages ? (
                  <Link
                    href={createPageHref(
                      safeCurrentPage + 1
                    )}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-amber-base px-5 text-sm font-black text-[#101827] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(245,158,11,0.22)]"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-full bg-amber-base/25 px-5 text-sm font-black text-[#64748b]">
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