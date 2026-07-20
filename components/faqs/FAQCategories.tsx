"use client";

import { Boxes, BriefcaseBusiness, FileQuestion, FolderOpen } from "lucide-react";

import type { FAQCategoryItem } from "@/lib/faqs";

interface FAQCategoriesProps {
  categories: FAQCategoryItem[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  categoryCounts: Record<string, number>;
}

export default function FAQCategories({
  categories,
  activeCategory,
  onCategoryChange,
  categoryCounts,
}: FAQCategoriesProps) {
  return (
    <div
      className="space-y-2"
      aria-label="Filter FAQ cards by category"
    >
      {categories.map((category) => {
        const isActive = activeCategory === category.slug;
        const count = categoryCounts[category.slug] || 0;

        return (
          <button
            key={category.slug}
            type="button"
            onClick={() => onCategoryChange(category.slug)}
            aria-pressed={isActive}
            className={[
              "group flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-base",
              isActive
                ? "border-amber-base/40 bg-amber-base/10 text-text-primary"
                : "border-border-default bg-white text-text-secondary hover:border-amber-base/30 hover:text-text-primary",
            ].join(" ")}
          >
            <span
              className={[
                "grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition",
                isActive
                  ? "border-amber-base/30 bg-white text-amber-base"
                  : "border-border-default bg-bg-base text-text-muted group-hover:text-amber-base",
              ].join(" ")}
              aria-hidden="true"
            >
              <CategoryIcon category={category.slug} />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-black">
                {category.label}
              </span>
              <span className="mt-0.5 line-clamp-1 block text-xs text-text-muted">
                {category.description}
              </span>
            </span>

            <span
              className={[
                "grid min-w-8 place-items-center rounded-full px-2 py-1 text-xs font-black",
                isActive
                  ? "bg-white text-amber-base"
                  : "bg-bg-surface text-text-muted",
              ].join(" ")}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function CategoryIcon({ category }: { category: string }) {
  if (category === "all") return <Boxes className="h-4 w-4" />;
  if (category === "FAQ") return <FileQuestion className="h-4 w-4" />;
  if (category === "Services") {
    return <BriefcaseBusiness className="h-4 w-4" />;
  }

  return <FolderOpen className="h-4 w-4" />;
}
