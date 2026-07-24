// components/partners/PartnerPagination.tsx

import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  MoreHorizontal,
} from "lucide-react";

/* =========================================================
   Types
========================================================= */

type PartnerPaginationProps = {
  currentPage: number;
  totalPages: number;
};

/* =========================================================
   Helpers
========================================================= */

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
    return [
      1,
      2,
      3,
      4,
      5,
      "ellipsis",
      totalPages,
    ];
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

function createPageHref(page: number): string {
  return page === 1
    ? "/partners"
    : `/partners?page=${page}`;
}

/* =========================================================
   Component
========================================================= */

export default function PartnerPagination({
  currentPage,
  totalPages,
}: PartnerPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(
    currentPage,
    totalPages,
  );

  return (
    <nav
      aria-label="Partners pagination"
      className="mt-14 flex flex-col items-center gap-5"
    >
      <p className="text-xs font-semibold text-silver">
        Page{" "}
        <span className="font-black text-text-primary">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-black text-text-primary">
          {totalPages}
        </span>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* Previous Button */}

        {currentPage > 1 ? (
          <Link
            href={createPageHref(currentPage - 1)}
            aria-label="Go to previous partners page"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-surface px-5 text-xs font-black text-text-primary transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/35 hover:bg-amber-base/[0.07] hover:text-amber-base"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />

            <span className="hidden sm:inline">
              Previous
            </span>
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex h-11 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/[0.05] bg-surface/40 px-5 text-xs font-black text-silver/40"
          >
            <ArrowLeft className="h-4 w-4" />

            <span className="hidden sm:inline">
              Previous
            </span>
          </span>
        )}

        {/* Page Numbers */}

        {visiblePages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                aria-hidden="true"
                className="grid h-11 w-11 place-items-center text-silver"
              >
                <MoreHorizontal className="h-5 w-5" />
              </span>
            );
          }

          const isActive =
            page === currentPage;

          return (
            <Link
              key={page}
              href={createPageHref(page)}
              aria-label={`Go to partners page ${page}`}
              aria-current={
                isActive ? "page" : undefined
              }
              className={[
                "relative grid h-11 min-w-11 place-items-center overflow-hidden rounded-full border px-3 text-xs font-black transition-all duration-300",
                isActive
                  ? "border-amber-base bg-amber-base text-bg-base shadow-[0_0_28px_rgba(225,157,45,0.25)]"
                  : "border-white/[0.09] bg-surface text-silver hover:-translate-y-1 hover:border-amber-base/35 hover:bg-amber-base/[0.07] hover:text-amber-base",
              ].join(" ")}
            >
              {isActive && (
                <span className="absolute inset-0 animate-pulse rounded-full bg-white/[0.08]" />
              )}

              <span className="relative">
                {page}
              </span>
            </Link>
          );
        })}

        {/* Next Button */}

        {currentPage < totalPages ? (
          <Link
            href={createPageHref(currentPage + 1)}
            aria-label="Go to next partners page"
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/[0.09] bg-surface px-5 text-xs font-black text-text-primary transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/35 hover:bg-amber-base/[0.07] hover:text-amber-base"
          >
            <span className="hidden sm:inline">
              Next
            </span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex h-11 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/[0.05] bg-surface/40 px-5 text-xs font-black text-silver/40"
          >
            <span className="hidden sm:inline">
              Next
            </span>

            <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </div>
    </nav>
  );
}