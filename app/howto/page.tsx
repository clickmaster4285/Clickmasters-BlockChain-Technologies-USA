import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import HowToCard from "@/components/howto/HowToCard";
import { createMetadata } from "@/config/metadata";
import { getHowToCards } from "@/lib/howto";
import { getPageHref } from "@/lib/pagination";
import Link from "next/link";

const PER_PAGE = 12;

type HowToPageProps = {
  searchParams: Promise<{ page?: string }>;
};

function getRequestedPage(page?: string) {
  const parsedPage = Number(page || 1);
  return Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
}

export async function generateMetadata({
  searchParams,
}: HowToPageProps) {
  const { page } = await searchParams;
  const currentPage = getRequestedPage(page);

  return createMetadata({
    title: "How-To Guides",
    description:
      "Production-ready blockchain implementation guides for founders, developers, and enterprises.",
    path: getPageHref("/howto", currentPage),
  });
}

export default async function HowToPage({
  searchParams,
}: HowToPageProps) {
  const { page } = await searchParams;

  const currentPage = Number(page || 1);

  const allGuides = getHowToCards();

  const totalPages = Math.ceil(allGuides.length / PER_PAGE);

  const start = (currentPage - 1) * PER_PAGE;

  const guides = allGuides.slice(start, start + PER_PAGE);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-32 pb-24 overflow-hidden">

        {/* Hero */}

        <section className="site-container px-6">

          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-surface/80 p-10 md:p-14">

            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-base/10 blur-3xl" />

            <div className="grid items-center gap-12 lg:grid-cols-2">

              <div>

                <span className="rounded-full bg-amber-base/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-base">
                  How-To Guides
                </span>

                <h1 className="mt-6 text-5xl font-black leading-tight md:text-6xl">
                  Learn Blockchain
                  <br />
                  Step by Step
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-silver">
                  Production-ready implementation guides for founders,
                  developers and enterprises.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">

                  <Link
                    href="/contact"
                    className="rounded-full bg-amber-base px-7 py-3.5 font-bold text-bg-base"
                  >
                    Book Free Call
                  </Link>

                  <a
                    href="#guides"
                    className="rounded-full border border-white/10 px-7 py-3.5"
                  >
                    Browse Guides
                  </a>

                </div>

                <div className="mt-10 grid grid-cols-3 gap-4">

                  <div className="rounded-2xl border border-white/10 bg-bg-base/50 p-5 text-center">
                    <p className="text-3xl font-black text-amber-base">
                      {allGuides.length}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-silver">
                      Guides
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-bg-base/50 p-5 text-center">
                    <p className="text-3xl font-black text-amber-base">
                      100%
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-silver">
                      Practical
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-bg-base/50 p-5 text-center">
                    <p className="text-3xl font-black text-amber-base">
                      2026
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.16em] text-silver">
                      Updated
                    </p>
                  </div>

                </div>

              </div>

              {/* Image */}

            <div className="flex justify-center">
  {/* Replace later with your image */}
  <img
    src="/media/howto-hero.webp"
    alt="How To"
    className="w-full max-w-[320px] h-auto object-contain animate-float transition-all duration-500 ease-out hover:scale-105 hover:rotate-1 hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
  />
</div>


            </div>

          </div>

          {/* Cards */}

          <section id="guides" className="mt-20">

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {guides.map((guide, index) => (
                <HowToCard
                  key={guide.slug}
                  item={guide}
                  index={start + index}
                />
              ))}

            </div>

          </section>

          {/* Pagination */}

         {totalPages > 1 && (
  <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
    {currentPage > 1 ? (
      <Link
        href={getPageHref("/howto", currentPage - 1)}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-surface px-5 text-sm font-bold text-silver transition-all hover:border-amber-base/40 hover:text-amber-base"
      >
        Back
      </Link>
    ) : (
      <span className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-5 text-sm font-bold text-silver/40">
        Back
      </span>
    )}

    {Array.from({ length: Math.min(3, totalPages) }).map((_, i) => {
      const startPage =
        currentPage >= totalPages - 1
          ? Math.max(totalPages - 2, 1)
          : currentPage;

      const pageNumber = startPage + i;
      const isActive = pageNumber === currentPage;

      if (pageNumber > totalPages) return null;

      return (
        <Link
          key={pageNumber}
          href={getPageHref("/howto", pageNumber)}
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

    {currentPage < totalPages ? (
      <Link
        href={getPageHref("/howto", currentPage + 1)}
        className="inline-flex h-11 items-center gap-2 rounded-full bg-amber-base px-5 text-sm font-bold text-bg-base transition-transform hover:-translate-y-0.5"
      >
        Next
      </Link>
    ) : (
      <span className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-full bg-amber-base/30 px-5 text-sm font-bold text-bg-base/50">
        Next
      </span>
    )}
  </div>
)}

        </section>

      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
