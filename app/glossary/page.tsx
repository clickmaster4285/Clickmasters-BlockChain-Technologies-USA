import Link from "next/link";
import Image from "next/image";



import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import GlossaryCard from "@/components/glossary/GlossaryCard";
import {
  getAvailableGlossaryLetters,
  getGlossaryCards,
} from "@/lib/glossary";

const PER_PAGE = 9;

export default async function GlossaryPage({
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string;
    letter?: string;
    search?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;

  const requestedPage = Number(resolvedSearchParams?.page || 1);
  const selectedLetter = (
    resolvedSearchParams?.letter || "ALL"
  ).toUpperCase();
  const searchQuery = resolvedSearchParams?.search?.trim() || "";

  const allTerms = getGlossaryCards();
  const availableLetters = getAvailableGlossaryLetters();

  const filteredTerms = allTerms.filter((item: any) => {
    const matchesLetter =
      selectedLetter === "ALL" ||
      item.letter === selectedLetter;

    const normalizedSearch = searchQuery.toLowerCase();

    const matchesSearch =
      !normalizedSearch ||
      item.title
        ?.toLowerCase()
        .includes(normalizedSearch) ||
      item.term
        ?.toLowerCase()
        .includes(normalizedSearch) ||
      item.definition
        ?.toLowerCase()
        .includes(normalizedSearch) ||
      item.category
        ?.toLowerCase()
        .includes(normalizedSearch);

    return matchesLetter && matchesSearch;
  });

  const totalPages = Math.max(
    Math.ceil(filteredTerms.length / PER_PAGE),
    1
  );

  const safeCurrentPage = Math.min(
    Math.max(requestedPage, 1),
    totalPages
  );

  const start = (safeCurrentPage - 1) * PER_PAGE;
  const visibleTerms = filteredTerms.slice(
    start,
    start + PER_PAGE
  );

  function createPageHref(page: number) {
    const params = new URLSearchParams();

    params.set("page", String(page));

    if (selectedLetter !== "ALL") {
      params.set("letter", selectedLetter);
    }

    if (searchQuery) {
      params.set("search", searchQuery);
    }

    return `/glossary?${params.toString()}#terms`;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-surface/40 to-bg-base pb-24 pt-32">
        <div className="pointer-events-none absolute left-[-12rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-amber-base/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-10rem] top-60 h-[26rem] w-[26rem] rounded-full bg-amber-base/10 blur-3xl" />

        <section className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-bg-base/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:rounded-[2.5rem] md:p-10">
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-amber-base/80 to-transparent" />
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-base/15 blur-3xl" />

            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-amber-base">
                  <BookOpen className="h-4 w-4" />
                  Blockchain Glossary
                </div>

                <h1 className="mt-6 max-w-4xl font-display text-4xl font-black leading-tight tracking-tight text-text-primary md:text-6xl">
                  Understand Blockchain and Web3 Terms Clearly
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-8 text-silver md:text-lg">
                  Explore simple definitions, practical examples, technical
                  explanations, and real-world uses of blockchain, crypto,
                  Web3, DeFi, smart-contract, and enterprise terminology.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href="#terms"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-base px-6 py-3 text-sm font-black text-bg-base shadow-glow transition-transform hover:-translate-y-1 sm:w-auto"
                  >
                    Explore Terms
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-silver transition-colors hover:border-amber-base/30 hover:text-amber-base sm:w-auto"
                  >
                    Ask an Expert
                  </Link>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      value: allTerms.length,
                      label: "Glossary Terms",
                    },
                    {
                      value: availableLetters.length,
                      label: "Active Letters",
                    },
                    {
                      value: "Simple",
                      label: "Explanations",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="font-display text-2xl font-black text-amber-base">
                        {stat.value}
                      </div>

                      <div className="mt-1 text-xs font-medium text-silver">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

           {/* Right hero image */}
<div className="relative flex items-center justify-center lg:justify-end">
  <div className="relative w-full max-w-[560px]">
    {/* Soft glow behind image */}
    <div className="pointer-events-none absolute inset-x-12 inset-y-10 rounded-full bg-amber-base/15 blur-3xl" />

    {/* Main image area */}
    <div className="relative aspect-[4/3] w-full overflow-hidden">
      <Image
        src="/media/glossary-hero.png"
        alt="Blockchain and Web3 glossary illustration"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 45vw"
        className="animate-glossary-float object-contain object-center drop-shadow-[0_30px_70px_rgba(0,0,0,0.45)]"
      />
    </div>

    {/* Floating top label */}
    <div className="absolute left-2 top-6 rounded-2xl border border-white/10 bg-bg-base/75 px-4 py-3 shadow-xl backdrop-blur-xl sm:left-6">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-base">
        Blockchain Terms
      </p>

      <p className="mt-1 text-sm font-bold text-text-primary">
        Simple explanations
      </p>
    </div>

    {/* Floating bottom label */}
    <div className="absolute bottom-5 right-2 rounded-2xl border border-white/10 bg-bg-base/75 px-4 py-3 shadow-xl backdrop-blur-xl sm:right-6">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-base">
        Developer Ready
      </p>

      <p className="mt-1 text-sm font-bold text-text-primary">
        Practical definitions
      </p>
    </div>
  </div>
</div>
            </div>
          </div>

          {/* Search and filters */}
          <section id="terms" className="mt-16">
       

            {/* Heading */}
            <div className="mb-8 mt-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                  Glossary Library
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                  {selectedLetter === "ALL"
                    ? "All Blockchain Terms"
                    : `Terms Starting with “${selectedLetter}”`}
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-6 text-silver">
                Showing {visibleTerms.length} of{" "}
                {filteredTerms.length} matching terms.
              </p>
            </div>

            {/* Cards */}
            {visibleTerms.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visibleTerms.map(
                  (item: any, index: number) => (
                    <GlossaryCard
                      key={item.slug}
                      item={item}
                      index={start + index}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-white/10 bg-surface/80 p-10 text-center md:p-16">
                <BookOpen className="mx-auto h-12 w-12 text-amber-base" />

                <h3 className="mt-5 text-2xl font-black text-text-primary">
                  No glossary terms found
                </h3>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-silver">
                  Try another search phrase or choose a different letter from
                  the alphabet filter.
                </p>

                <Link
                  href="/glossary#terms"
                  className="mt-6 inline-flex rounded-full bg-amber-base px-6 py-3 text-sm font-black text-bg-base"
                >
                  View All Terms
                </Link>
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
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-surface px-5 text-sm font-bold text-silver transition-all hover:border-amber-base/40 hover:text-amber-base"
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
                      className={`grid h-11 w-11 place-items-center rounded-full border text-sm font-black transition-all ${
                        isActive
                          ? "border-amber-base bg-amber-base text-bg-base shadow-glow"
                          : "border-white/10 bg-surface text-silver hover:border-amber-base/40 hover:text-amber-base"
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
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-amber-base px-5 text-sm font-black text-bg-base transition-transform hover:-translate-y-0.5"
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