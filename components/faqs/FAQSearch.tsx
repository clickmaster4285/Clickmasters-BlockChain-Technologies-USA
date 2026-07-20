"use client";

import { Search, X } from "lucide-react";

interface FAQSearchProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export default function FAQSearch({
  value,
  onChange,
  resultCount,
}: FAQSearchProps) {
  const hasSearchQuery = value.trim().length > 0;

  return (
    <div className="w-full">
      <div className="relative">
        <label htmlFor="faq-search" className="sr-only">
          Search FAQ cards
        </label>

        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted"
        />

        <input
          id="faq-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search DeFi, NFT, exchange..."
          autoComplete="off"
          className="h-12 w-full rounded-xl border border-border-default bg-white pl-12 pr-12 text-sm font-medium text-text-primary outline-none transition placeholder:text-text-muted hover:border-amber-base/30 focus:border-amber-base focus:ring-4 focus:ring-amber-base/10"
        />

        {hasSearchQuery ? (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear FAQ search"
            className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-text-muted transition hover:bg-bg-surface hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-base"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <p className="mt-2 px-1 text-xs font-medium text-text-muted">
        {hasSearchQuery
          ? `${resultCount} ${resultCount === 1 ? "card" : "cards"} found`
          : "Search across all FAQ hubs"}
      </p>
    </div>
  );
}
