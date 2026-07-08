import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GitCompare,
  Layers3,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import { comparisons } from "@/data/comparisons";

const ITEMS_PER_PAGE = 12;

const comparisonCards =
  comparisons?.map((item: any) => ({
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt || item.description || "",
    parentSlug: item.slug,
    readTime: item.readTime,
  })) || [];

export default async function ComparisonPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Math.max(Number(resolvedSearchParams?.page || 1), 1);
  const totalPages = Math.max(
    Math.ceil(comparisonCards.length / ITEMS_PER_PAGE),
    1
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedCards = comparisonCards.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-surface/40 to-bg-base pt-32 pb-24">
        <div className="pointer-events-none absolute left-[-12rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-amber-base/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-10rem] top-60 h-[26rem] w-[26rem] rounded-full bg-amber-base/10 blur-3xl" />

        <section className="site-container relative px-6">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-bg-base/70 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-10">
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-amber-base/80 to-transparent" />
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-base/15 blur-3xl" />

            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-base">
                  <GitCompare className="h-4 w-4" />
                  Blockchain Comparisons
                </div>

                <h1 className="mt-6 max-w-3xl font-display text-4xl font-black leading-tight tracking-tight text-text-primary md:text-6xl">
                  Compare Blockchain Choices Before You Build
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-silver">
                  Expert side-by-side comparisons for smart contracts, chains,
                  exchanges, DeFi, enterprise systems, and Web3 architecture.
                  Make better technical decisions with clear frameworks.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="#comparisons"
                    className="inline-flex items-center gap-2 rounded-full bg-amber-base px-6 py-3 text-sm font-bold text-bg-base shadow-glow transition-transform hover:-translate-y-1"
                  >
                    Explore Comparisons
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-silver transition-colors hover:border-amber-base/30 hover:text-amber-base"
                  >
                    Talk to an Expert
                  </Link>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {[
                    { value: "50+", label: "Decision Guides" },
                    { value: "2025", label: "Updated Insights" },
                    { value: "Expert", label: "Technical Review" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="font-display text-2xl font-black text-amber-base">
                        {item.value}
                      </div>
                      <div className="mt-1 text-xs font-medium text-silver">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

           <div className="relative">
  <div className="relative aspect-[3/3] overflow-hidden rounded-[2rem]">
    <Image
      src="/media/blockchain.png"
      alt="Blockchain comparison visual"
      fill
      priority
      className="object-cover object-center transition-transform duration-[3500ms] ease-out hover:scale-120"
    />
  </div>
</div>
            </div>
          </div>

          <section className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Layers3,
                title: "Architecture Clarity",
                desc: "Understand which blockchain model, chain, or platform fits your product.",
              },
              {
                icon: BarChart3,
                title: "Practical Tradeoffs",
                desc: "Compare cost, timeline, security, scalability, and engineering complexity.",
              },
              {
                icon: Sparkles,
                title: "Founder Friendly",
                desc: "Clear recommendations without unnecessary technical noise.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-surface/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-base/10 text-amber-base">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-silver">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </section>

          <section id="comparisons" className="mt-20">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                  Comparison Library
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                  Latest Web3 Comparisons
                </h2>
              </div>

              <p className="max-w-xl text-sm leading-6 text-silver">
                Showing {paginatedCards.length} of {comparisonCards.length}{" "}
                comparison guides. Browse expert-written decision guides and
                open the full article.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {paginatedCards.map((item: any, index: number) => (
                <Link
                  key={`${item.slug}-${index}`}
                  href={`/comparison/${item.slug}`}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface/80 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-2 hover:border-amber-base/40"
                >
                  <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-amber-base/10 blur-3xl" />

                  <div className="relative">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="rounded-full bg-amber-base/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-amber-base">
                        Comparison
                      </span>
                      <span className="text-xs text-silver">
                        {String(
                          (safeCurrentPage - 1) * ITEMS_PER_PAGE + index + 1
                        ).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="min-h-[72px] text-xl font-black leading-tight text-text-primary transition-colors group-hover:text-amber-base">
                      {item.title}
                    </h3>

                    <p className="mt-4 min-h-[96px] text-sm leading-6 text-silver">
                      {item.excerpt}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-silver">
                        {item.readTime || "Guide"}
                      </span>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-silver">
                        FAQ included
                      </span>
                    </div>

                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-amber-base">
                      Read full comparison
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

    <div className="mt-12 flex flex-wrap items-center justify-center gap-3">

  {/* BACK */}

  {safeCurrentPage > 1 ? (
    <Link
      href={`/comparison?page=${safeCurrentPage - 1}#comparisons`}
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

  {/* PAGE NUMBERS */}

  {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => {
    const startPage =
      safeCurrentPage >= totalPages - 1
        ? Math.max(totalPages - 2, 1)
        : safeCurrentPage;

    const page = startPage + i;
    const isActive = page === safeCurrentPage;

    if (page > totalPages) return null;

    return (
      <Link
        key={page}
        href={`/comparison?page=${page}#comparisons`}
        className={`grid h-11 w-11 place-items-center rounded-full border text-sm font-black transition-all ${
          isActive
            ? "border-amber-base bg-amber-base text-bg-base shadow-glow"
            : "border-white/10 bg-surface text-silver hover:border-amber-base/40 hover:text-amber-base"
        }`}
      >
        {page}
      </Link>
    );
  })}

  {/* NEXT */}

  {safeCurrentPage < totalPages ? (
    <Link
      href={`/comparison?page=${safeCurrentPage + 1}#comparisons`}
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
          </section>

          <section className="mt-20">
            <div className="overflow-hidden rounded-[2rem] border border-amber-base/20 bg-gradient-to-r from-amber-base via-amber-light to-surface p-10 text-center text-bg-base md:p-14">
              <h3 className="text-3xl font-black md:text-5xl">
                Need help choosing the right blockchain stack?
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-bg-base/80">
                Get a technical recommendation based on your product, budget,
                timeline, compliance needs, and scale requirements.
              </p>
              <Link
                href="/contact"
                className="mt-7 inline-flex rounded-full bg-bg-base px-8 py-3.5 text-sm font-bold text-amber-base shadow-glow transition-transform hover:-translate-y-1"
              >
                Book a Free Strategy Call
              </Link>
            </div>
          </section>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}