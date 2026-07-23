// components/process/ProcessPagination.tsx

import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  MoreHorizontal,
} from "lucide-react";

/* =========================================================
   Types
========================================================= */

type ProcessPaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  className?: string;
};

type PaginationItem =
  | number
  | "start-ellipsis"
  | "end-ellipsis";

/* =========================================================
   Helpers
========================================================= */

function createPageHref(
  basePath: string,
  page: number,  
): string {
  if (page <= 1) {
    return basePath;
  }

  return `${basePath}?page=${page}`;
}

function createPaginationItems(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
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
      "end-ellipsis",
      totalPages,
    ];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "start-ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "start-ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "end-ellipsis",
    totalPages,
  ];
}

/* =========================================================
   Component
========================================================= */

export default function ProcessPagination({
  currentPage,
  totalPages,
  basePath = "/process",
  className = "",
}: ProcessPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const safeCurrentPage = Math.min(
    Math.max(currentPage, 1),
    totalPages,
  );

  const paginationItems =
    createPaginationItems(
      safeCurrentPage,
      totalPages,
    );

  const hasPreviousPage =
    safeCurrentPage > 1;

  const hasNextPage =
    safeCurrentPage < totalPages;

  return (
    <nav
      aria-label="Process pagination"
      className={[
        "flex flex-col items-center justify-between gap-5 rounded-[1.75rem] border border-white/[0.08] bg-surface/80 p-4 backdrop-blur-xl sm:flex-row sm:p-5",
        className,
      ].join(" ")}
    >
      {/* Previous */}

      {hasPreviousPage ? (
        <Link
          href={createPageHref(
            basePath,
            safeCurrentPage - 1,
          )}
          rel="prev"
          aria-label="Go to previous page"
          className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 text-sm font-bold text-text-primary transition-all duration-300 hover:border-amber-base/40 hover:bg-amber-base/[0.08] hover:text-amber-base sm:w-auto"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />

          Previous
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex min-h-11 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.015] px-4 text-sm font-bold text-silver/40 sm:w-auto"
        >
          <ArrowLeft className="h-4 w-4" />

          Previous
        </span>
      )}

      {/* Page Numbers */}

      <div className="flex flex-wrap items-center justify-center gap-2">
        {paginationItems.map(
          (item, index) => {
            if (
              item === "start-ellipsis" ||
              item === "end-ellipsis"
            ) {
              return (
                <span
                  key={`${item}-${index}`}
                  aria-hidden="true"
                  className="grid h-10 w-10 place-items-center text-silver/60"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </span>
              );
            }

            const isActive =
              item === safeCurrentPage;

            if (isActive) {
              return (
                <span
                  key={item}
                  aria-current="page"
                  className="grid h-10 min-w-10 place-items-center rounded-xl border border-amber-base bg-amber-base px-3 text-sm font-black text-bg-base shadow-[0_10px_30px_rgba(225,157,45,0.2)]"
                >
                  {item}
                </span>
              );
            }

            return (
              <Link
                key={item}
                href={createPageHref(
                  basePath,
                  item,
                )}
                aria-label={`Go to page ${item}`}
                className="grid h-10 min-w-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.02] px-3 text-sm font-bold text-silver transition-all duration-300 hover:border-amber-base/40 hover:bg-amber-base/[0.08] hover:text-amber-base"
              >
                {item}
              </Link>
            );
          },
        )}
      </div>

      {/* Next */}

      {hasNextPage ? (
        <Link
          href={createPageHref(
            basePath,
            safeCurrentPage + 1,
          )}
          rel="next"
          aria-label="Go to next page"
          className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-4 text-sm font-bold text-text-primary transition-all duration-300 hover:border-amber-base/40 hover:bg-amber-base/[0.08] hover:text-amber-base sm:w-auto"
        >
          Next

          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex min-h-11 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.015] px-4 text-sm font-bold text-silver/40 sm:w-auto"
        >
          Next

          <ArrowRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}