import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ListChecks, Star } from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import ListicleCard from "@/components/listicles/ListicleCard";
import { getListicleCards } from "@/lib/listicles";
import Image from "next/image";

const PER_PAGE = 9;

export default async function ListiclesPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Math.max(Number(resolvedSearchParams?.page || 1), 1);

  const allLists = getListicleCards();
  const totalPages = Math.max(Math.ceil(allLists.length / PER_PAGE), 1);
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const start = (safeCurrentPage - 1) * PER_PAGE;
  const lists = allLists.slice(start, start + PER_PAGE);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-surface/40 to-bg-base pt-32 pb-24">
        <div className="pointer-events-none absolute left-[-12rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-amber-base/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-10rem] top-60 h-[26rem] w-[26rem] rounded-full bg-amber-base/10 blur-3xl" />

        <section className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-bg-base/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:rounded-[2.5rem] md:p-10">
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-amber-base/80 to-transparent" />
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-base/15 blur-3xl" />

            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-base">
                  <ListChecks className="h-4 w-4" />
                  Curated Web3 Lists
                </div>

                <h1 className="mt-6 max-w-3xl font-display text-4xl font-black leading-tight tracking-tight text-text-primary md:text-6xl">
                  Smart Lists for Better Blockchain Decisions
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-silver">
                  Explore curated rankings, expert picks, useful tools, practical
                  recommendations, and Web3 ideas selected for founders,
                  developers, and enterprise teams.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <a
                    href="#listicles"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-base px-6 py-3 text-sm font-bold text-bg-base shadow-glow transition-transform hover:-translate-y-1 sm:w-auto"
                  >
                    Browse Lists
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-silver transition-colors hover:border-amber-base/30 hover:text-amber-base sm:w-auto"
                  >
                    Ask an Expert
                  </Link>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {[
                    { value: allLists.length, label: "Curated Lists" },
                    { value: "Expert", label: "Recommendations" },
                    { value: "2026", label: "Updated Picks" },
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

            <div className="relative flex justify-center lg:justify-end">
  <div className="relative w-full max-w-xl">
    <div className="absolute inset-6 rounded-full bg-amber-base/15 blur-3xl" />

    <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
      <Image
        src="/media/listicles-hero.webp"
        alt="Curated blockchain listicles"
        fill
        priority
        className="animate-float object-contain object-center drop-shadow-[0_30px_80px_rgba(0,0,0,0.45)] transition-transform duration-[3500ms] ease-out hover:scale-105"
      />
    </div>

    <div className="absolute left-4 top-4 rounded-2xl border border-white/10 bg-bg-base/70 px-4 py-3 backdrop-blur-xl">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-base">
        Curated Picks
      </p>
      <p className="mt-1 text-sm font-bold text-text-primary">
        Expert selected lists
      </p>
    </div>

    <div className="absolute bottom-4 right-4 rounded-2xl border border-white/10 bg-bg-base/70 px-4 py-3 backdrop-blur-xl">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-base">
        Updated
      </p>
      <p className="mt-1 text-sm font-bold text-text-primary">
        2026 insights
      </p>
    </div>
  </div>
</div>
            </div>
          </div>

          {/* Cards */}
          <section id="listicles" className="mt-20">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                  Listicle Library
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                  Latest Curated Lists
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-6 text-silver">
                Showing {lists.length} of {allLists.length} curated guides.
                Open any card to explore the full list.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {lists.map((item: any, index: number) => (
                <ListicleCard
                  key={item.slug}
                  item={item}
                  index={start + index}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
                {safeCurrentPage > 1 ? (
                  <Link
                    href={`/listicles?page=${safeCurrentPage - 1}#listicles`}
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

                {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => {
                  const startPage =
                    safeCurrentPage >= totalPages - 1
                      ? Math.max(totalPages - 2, 1)
                      : safeCurrentPage;

                  const pageNumber = startPage + i;
                  const isActive = pageNumber === safeCurrentPage;

                  if (pageNumber > totalPages) return null;

                  return (
                    <Link
                      key={pageNumber}
                      href={`/listicles?page=${pageNumber}#listicles`}
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
                    href={`/listicles?page=${safeCurrentPage + 1}#listicles`}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-amber-base px-5 text-sm font-bold text-bg-base transition-transform hover:-translate-y-0.5"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-full bg-amber-base/30 px-5 text-sm font-bold text-bg-base/50">
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