// components/industries/IndustryPagination.tsx

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  MoreHorizontal,
} from "lucide-react";

type IndustryPaginationProps = {
  currentPage: number;
  totalPages: number;
};

function getVisiblePages(
  currentPage: number,
  totalPages: number,
): Array<number | "ellipsis"> {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    totalPages,
  ];
}

export default function IndustryPagination({
  currentPage,
  totalPages,
}: IndustryPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(
    currentPage,
    totalPages,
  );

  const createPageLink = (page: number) => {
    return page === 1
      ? "/industries"
      : `/industries?page=${page}`;
  };

  return (
    <nav
      aria-label="Industries pagination"
      className="mt-14 flex flex-col items-center gap-5"
    >
      <p className="text-xs font-semibold text-silver">
        Page{" "}
        <span className="text-text-primary">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="text-text-primary">
          {totalPages}
        </span>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {currentPage > 1 ? (
          <Link
            href={createPageLink(currentPage - 1)}
            scroll
            aria-label="Previous page"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-surface px-5 text-xs font-black text-text-primary transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/35 hover:bg-amber-base/[0.07] hover:text-amber-base"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />

            <span className="hidden sm:inline">
              Previous
            </span>
          </Link>
        ) : (
          <span className="inline-flex h-11 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/[0.05] bg-surface/40 px-5 text-xs font-black text-silver/40">
            <ArrowLeft className="h-4 w-4" />

            <span className="hidden sm:inline">
              Previous
            </span>
          </span>
        )}

        {visiblePages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="grid h-11 w-11 place-items-center text-silver"
              >
                <MoreHorizontal className="h-5 w-5" />
              </span>
            );
          }

          const active = page === currentPage;

          return (
            <Link
              key={page}
              href={createPageLink(page)}
              scroll
              aria-label={`Go to page ${page}`}
              aria-current={active ? "page" : undefined}
              className={[
                "relative grid h-11 min-w-11 place-items-center overflow-hidden rounded-full border px-3 text-xs font-black transition-all duration-300",
                active
                  ? "border-amber-base bg-amber-base text-bg-base shadow-[0_0_28px_rgba(225,157,45,0.25)]"
                  : "border-white/[0.09] bg-surface text-silver hover:-translate-y-1 hover:border-amber-base/35 hover:bg-amber-base/[0.07] hover:text-amber-base",
              ].join(" ")}
            >
              {active && (
                <span className="absolute inset-0 animate-pulse rounded-full bg-white/[0.08]" />
              )}

              <span className="relative">{page}</span>
            </Link>
          );
        })}

        {currentPage < totalPages ? (
          <Link
            href={createPageLink(currentPage + 1)}
            scroll
            aria-label="Next page"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-surface px-5 text-xs font-black text-text-primary transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/35 hover:bg-amber-base/[0.07] hover:text-amber-base"
          >
            <span className="hidden sm:inline">Next</span>

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <span className="inline-flex h-11 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/[0.05] bg-surface/40 px-5 text-xs font-black text-silver/40">
            <span className="hidden sm:inline">Next</span>

            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </nav>
  );
}