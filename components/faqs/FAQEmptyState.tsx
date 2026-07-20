"use client";

import { SearchX } from "lucide-react";

interface FAQEmptyStateProps {
  query: string;
  onReset: () => void;
}

export default function FAQEmptyState({
  query,
  onReset,
}: FAQEmptyStateProps) {
  return (
    <div className="rounded-2xl border border-border-default bg-white px-6 py-14 text-center shadow-[0_18px_55px_rgba(15,23,42,0.06)] sm:px-10">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
        <SearchX className="h-7 w-7" />
      </div>

      <h2 className="mt-6 text-2xl font-black tracking-tight text-text-primary">
        No matching FAQ cards
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-text-secondary">
        {query.trim()
          ? `No FAQ cards matched "${query.trim()}". Try a shorter keyword or reset the filters.`
          : "No FAQ cards are available in this category. Choose another category or reset the filters."}
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-amber-base px-5 text-sm font-black text-bg-base transition hover:-translate-y-0.5"
      >
        Reset filters
      </button>
    </div>
  );
}
