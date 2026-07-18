"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronDown,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import ResourceCard from "./ResourceCard";

type ResourceItem = {
  id?: number | string;
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  badge?: string;
  image?: string;
  author?: string;
  date?: string;
  readTime?: string;
  format?: string;
  featured?: boolean;
  popular?: boolean;
  tags?: string[];
};

type ResourceLibraryProps = {
  resources?: ResourceItem[];
  categories?: string[];
  initialSearch?: string;
  initialCategory?: string;
  resourcesPerPage?: number;
};

type SortOption =
  | "latest"
  | "oldest"
  | "title-ascending"
  | "title-descending";

const sortOptions: Array<{
  label: string;
  value: SortOption;
}> = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
  { label: "Title A-Z", value: "title-ascending" },
  { label: "Title Z-A", value: "title-descending" },
];

function normalizeValue(value?: string) {
  return value?.trim().toLowerCase() || "";
}

function getResourceTimestamp(date?: string) {
  if (!date) return 0;

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return 0;
  }

  return parsedDate.getTime();
}

function getVisiblePageNumbers(
  currentPage: number,
  totalPages: number
) {
  const pageNumbers: Array<number | "ellipsis"> = [];

  if (totalPages <= 5) {
    for (let page = 1; page <= totalPages; page += 1) {
      pageNumbers.push(page);
    }

    return pageNumbers;
  }

  pageNumbers.push(1);

  if (currentPage > 3) {
    pageNumbers.push("ellipsis");
  }

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(
    totalPages - 1,
    currentPage + 1
  );

  for (
    let page = startPage;
    page <= endPage;
    page += 1
  ) {
    pageNumbers.push(page);
  }

  if (currentPage < totalPages - 2) {
    pageNumbers.push("ellipsis");
  }

  pageNumbers.push(totalPages);

  return pageNumbers;
}

export default function ResourceLibrary({
  resources = [],
  categories = [],
  initialSearch = "",
  initialCategory = "",
  resourcesPerPage = 9,
}: ResourceLibraryProps) {
  const [searchQuery, setSearchQuery] =
    useState(initialSearch);

  const [selectedCategory, setSelectedCategory] =
    useState(initialCategory || "All");

  const [sortBy, setSortBy] =
    useState<SortOption>("latest");

  const [currentPage, setCurrentPage] = useState(1);

  const availableCategories = useMemo(() => {
    if (categories.length > 0) {
      return Array.from(
        new Set(
          categories
            .map((category) => category.trim())
            .filter(Boolean)
        )
      );
    }

    return Array.from(
      new Set(
        resources
          .map((resource) => resource.category?.trim())
          .filter(
            (category): category is string =>
              Boolean(category)
          )
      )
    );
  }, [categories, resources]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();

    resources.forEach((resource) => {
      const category =
        resource.category?.trim() || "Resources";

      counts.set(
        category,
        (counts.get(category) || 0) + 1
      );
    });

    return counts;
  }, [resources]);

  const filteredResources = useMemo(() => {
    const normalizedSearch = normalizeValue(searchQuery);
    const normalizedCategory =
      normalizeValue(selectedCategory);

    const filtered = resources.filter((resource) => {
      const matchesCategory =
        selectedCategory === "All" ||
        normalizeValue(resource.category) ===
          normalizedCategory;

      if (!matchesCategory) return false;
      if (!normalizedSearch) return true;

      const searchableContent = [
        resource.title,
        resource.excerpt,
        resource.category,
        resource.author,
        resource.format,
        ...(resource.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableContent.includes(normalizedSearch);
    });

    return [...filtered].sort((first, second) => {
      if (sortBy === "oldest") {
        return (
          getResourceTimestamp(first.date) -
          getResourceTimestamp(second.date)
        );
      }

      if (sortBy === "title-ascending") {
        return first.title.localeCompare(second.title);
      }

      if (sortBy === "title-descending") {
        return second.title.localeCompare(first.title);
      }

      return (
        getResourceTimestamp(second.date) -
        getResourceTimestamp(first.date)
      );
    });
  }, [
    resources,
    searchQuery,
    selectedCategory,
    sortBy,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredResources.length / resourcesPerPage
    )
  );

  const paginatedResources = useMemo(() => {
    const startIndex =
      (currentPage - 1) * resourcesPerPage;

    return filteredResources.slice(
      startIndex,
      startIndex + resourcesPerPage
    );
  }, [
    currentPage,
    filteredResources,
    resourcesPerPage,
  ]);

  const visiblePageNumbers = getVisiblePageNumbers(
    currentPage,
    totalPages
  );

  const startResult =
    filteredResources.length === 0
      ? 0
      : (currentPage - 1) * resourcesPerPage + 1;

  const endResult = Math.min(
    currentPage * resourcesPerPage,
    filteredResources.length
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  function clearFilters() {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("latest");
    setCurrentPage(1);
  }

  function scrollToLibraryTop() {
    const libraryElement =
      document.getElementById("resource-library");

    if (!libraryElement) return;

    const top =
      libraryElement.getBoundingClientRect().top +
      window.scrollY -
      110;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }

  function changePage(page: number) {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
    scrollToLibraryTop();
  }

  return (
    <section
      id="resource-library"
      className="relative overflow-hidden bg-gradient-to-b from-bg-base via-surface/40 to-bg-base pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40"
    >
      <div className="pointer-events-none absolute left-[-10rem] top-[-6rem] h-[26rem] w-[26rem] rounded-full bg-amber-base/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10rem] top-72 h-[24rem] w-[24rem] rounded-full bg-emerald-base/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/[0.08] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-base">
              <BookOpen className="h-4 w-4" />
              Resource Articles
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight text-text-primary sm:text-5xl lg:text-6xl">
              Guides, checklists, and playbooks
            </h1>

            <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-silver sm:text-base">
              Browse practical blockchain resources written
              like focused articles, with clear takeaways and
              direct next steps.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-bg-base/75 px-5 py-4 shadow-soft backdrop-blur-xl">
            <p className="text-2xl font-black text-text-primary">
              {resources.length}
            </p>

            <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-silver">
              Total resources
            </p>
          </div>
        </div>

        <div className="mb-5 grid gap-3 rounded-[1.5rem] border border-white/10 bg-bg-base/80 p-3 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-4 lg:grid-cols-[minmax(0,1fr)_210px]">
          <label className="group relative min-w-0">
            <span className="sr-only">
              Search resources
            </span>

            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-silver transition-colors duration-300 group-focus-within:text-amber-base" />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search by topic, title, or keyword..."
              className="h-14 w-full rounded-[1rem] border border-white/10 bg-surface/80 pl-12 pr-12 text-sm font-semibold text-text-primary outline-none transition-all duration-300 placeholder:text-silver-mid focus:border-amber-base/35 focus:bg-bg-base focus:ring-4 focus:ring-amber-base/[0.08]"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-silver transition-all duration-300 hover:bg-amber-base/10 hover:text-amber-base"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </label>

          <label className="relative">
            <span className="sr-only">
              Sort resources
            </span>

            <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-base" />

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target.value as SortOption
                )
              }
              className="h-14 w-full appearance-none rounded-[1rem] border border-white/10 bg-surface/80 pl-11 pr-11 text-sm font-bold text-text-primary outline-none transition-all duration-300 focus:border-amber-base/35 focus:bg-bg-base focus:ring-4 focus:ring-amber-base/[0.08]"
            >
              {sortOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="bg-bg-base text-text-primary"
                >
                  {option.label}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-silver" />
          </label>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className={`rounded-full border px-4 py-2.5 text-xs font-black transition-all duration-300 ${
              selectedCategory === "All"
                ? "border-amber-base bg-amber-base text-[#101827]"
                : "border-white/10 bg-bg-base/70 text-silver hover:border-amber-base/30 hover:bg-amber-base/10 hover:text-amber-base"
            }`}
          >
            All ({resources.length})
          </button>

          {availableCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`rounded-full border px-4 py-2.5 text-xs font-black transition-all duration-300 ${
                selectedCategory === category
                  ? "border-amber-base bg-amber-base text-[#101827]"
                  : "border-white/10 bg-bg-base/70 text-silver hover:border-amber-base/30 hover:bg-amber-base/10 hover:text-amber-base"
              }`}
            >
              {category} (
              {categoryCounts.get(category) || 0})
            </button>
          ))}
        </div>

        <div className="mb-6 flex flex-col gap-3 border-y border-white/10 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold text-silver">
            Showing {startResult}-{endResult} of{" "}
            {filteredResources.length} resources
          </p>

          {(searchQuery ||
            selectedCategory !== "All" ||
            sortBy !== "latest") && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-bg-base/70 px-4 py-2 text-xs font-black text-silver transition-all duration-300 hover:border-amber-base/30 hover:bg-amber-base/10 hover:text-amber-base"
            >
              Clear filters
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {paginatedResources.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {paginatedResources.map(
                (resource, index) => (
                  <ResourceCard
                    key={resource.id || resource.slug}
                    item={resource}
                    index={index}
                  />
                )
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[1.3rem] border border-white/10 bg-bg-base/80 p-4 shadow-soft sm:flex-row sm:p-5">
                <button
                  type="button"
                  onClick={() =>
                    changePage(currentPage - 1)
                  }
                  disabled={currentPage === 1}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-surface px-5 py-3 text-xs font-black text-silver transition-all duration-300 hover:border-amber-base/25 hover:text-amber-base disabled:cursor-not-allowed disabled:opacity-35 sm:w-auto"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  Previous
                </button>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  {visiblePageNumbers.map(
                    (page, index) => {
                      if (page === "ellipsis") {
                        return (
                          <span
                            key={`ellipsis-${index}`}
                            className="grid h-10 w-8 place-items-center text-xs font-black text-silver"
                          >
                            ...
                          </span>
                        );
                      }

                      const isCurrent =
                        page === currentPage;

                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() =>
                            changePage(page)
                          }
                          aria-current={
                            isCurrent
                              ? "page"
                              : undefined
                          }
                          className={`grid h-10 w-10 place-items-center rounded-full text-xs font-black transition-all duration-300 ${
                            isCurrent
                              ? "bg-amber-base text-[#101827]"
                              : "border border-white/10 bg-surface text-silver hover:border-amber-base/25 hover:text-amber-base"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    changePage(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-surface px-5 py-3 text-xs font-black text-silver transition-all duration-300 hover:border-amber-base/25 hover:text-amber-base disabled:cursor-not-allowed disabled:opacity-35 sm:w-auto"
                >
                  Next
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-[1.5rem] border border-white/10 bg-bg-base/80 px-6 py-16 text-center shadow-soft">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/[0.08] text-amber-base">
              <Search className="h-7 w-7" />
            </div>

            <h3 className="mt-6 text-2xl font-black text-text-primary">
              No resources found
            </h3>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-silver">
              Try a broader keyword or reset the filters to
              view the complete resource library.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-base px-6 py-3 text-sm font-black text-[#101827] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Reset Filters
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
