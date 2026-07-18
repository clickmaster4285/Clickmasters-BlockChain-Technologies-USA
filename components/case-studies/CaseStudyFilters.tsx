"use client";

import { Filter, RotateCcw, Search, SlidersHorizontal } from "lucide-react";

export type CaseStudyFilterOption = {
  label: string;
  value: string;
};

type CaseStudyFiltersProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;

  activeIndustry: string;
  onIndustryChange: (value: string) => void;

  activeService: string;
  onServiceChange: (value: string) => void;

  industries: CaseStudyFilterOption[];
  services: CaseStudyFilterOption[];

  resultsCount?: number;
  onReset?: () => void;
};

export default function CaseStudyFilters({
  searchQuery,
  onSearchChange,
  activeIndustry,
  onIndustryChange,
  activeService,
  onServiceChange,
  industries,
  services,
  resultsCount = 0,
  onReset,
}: CaseStudyFiltersProps) {
  const hasActiveFilters =
    searchQuery.length > 0 ||
    activeIndustry !== "all" ||
    activeService !== "all";

  return (
    <section className="relative bg-[#07101d]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0c1727]/90 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-5 lg:p-6">
          <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-400/[0.07] blur-[80px]" />

          <div className="relative">
            <div className="mb-5 flex flex-col gap-4 border-b border-white/[0.07] pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-400/20 bg-amber-400/[0.08] text-amber-400">
                  <SlidersHorizontal className="h-5 w-5" />
                </span>

                <div>
                  <p className="text-sm font-black text-white">
                    Explore our work
                  </p>

                  <p className="mt-1 text-xs font-medium text-[#77859a]">
                    Filter case studies by industry or service
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[#8896aa]">
                  {resultsCount}{" "}
                  {resultsCount === 1 ? "Project" : "Projects"}
                </span>

                {hasActiveFilters && onReset && (
                  <button
                    type="button"
                    onClick={onReset}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#9aa7b9] transition-all duration-300 hover:border-amber-400/25 hover:bg-amber-400/[0.07] hover:text-amber-400"
                  >
                    <RotateCcw className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-45" />
                    Reset
                  </button>
                )}
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-[1fr_0.72fr_0.72fr]">
              {/* Search */}
              <label className="group relative block">
                <span className="sr-only">Search case studies</span>

                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667489] transition-colors duration-300 group-focus-within:text-amber-400" />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    onSearchChange(event.target.value)
                  }
                  placeholder="Search by client, title, or keyword..."
                  className="h-14 w-full rounded-[1.1rem] border border-white/[0.08] bg-[#091321] pl-11 pr-4 text-sm font-semibold text-white outline-none transition-all duration-300 placeholder:text-[#59677b] hover:border-white/[0.13] focus:border-amber-400/30 focus:ring-4 focus:ring-amber-400/[0.06]"
                />
              </label>

              {/* Industry */}
              <div className="relative">
                <Filter className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#667489]" />

                <select
                  value={activeIndustry}
                  onChange={(event) =>
                    onIndustryChange(event.target.value)
                  }
                  aria-label="Filter by industry"
                  className="h-14 w-full appearance-none rounded-[1.1rem] border border-white/[0.08] bg-[#091321] pl-11 pr-10 text-sm font-bold text-white outline-none transition-all duration-300 hover:border-white/[0.13] focus:border-amber-400/30 focus:ring-4 focus:ring-amber-400/[0.06]"
                >
                  {industries.map((industry) => (
                    <option
                      key={industry.value}
                      value={industry.value}
                      className="bg-[#091321] text-white"
                    >
                      {industry.label}
                    </option>
                  ))}
                </select>

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-[#667489]">
                  ▼
                </span>
              </div>

              {/* Service */}
              <div className="relative">
                <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#667489]" />

                <select
                  value={activeService}
                  onChange={(event) =>
                    onServiceChange(event.target.value)
                  }
                  aria-label="Filter by service"
                  className="h-14 w-full appearance-none rounded-[1.1rem] border border-white/[0.08] bg-[#091321] pl-11 pr-10 text-sm font-bold text-white outline-none transition-all duration-300 hover:border-white/[0.13] focus:border-amber-400/30 focus:ring-4 focus:ring-amber-400/[0.06]"
                >
                  {services.map((service) => (
                    <option
                      key={service.value}
                      value={service.value}
                      className="bg-[#091321] text-white"
                    >
                      {service.label}
                    </option>
                  ))}
                </select>

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-[#667489]">
                  ▼
                </span>
              </div>
            </div>

            {/* Quick industry buttons */}
            <div className="mt-5 flex flex-wrap gap-2">
              {industries.slice(0, 7).map((industry) => {
                const isActive =
                  activeIndustry === industry.value;

                return (
                  <button
                    key={industry.value}
                    type="button"
                    onClick={() =>
                      onIndustryChange(industry.value)
                    }
                    className={`rounded-full border px-4 py-2 text-[10px] font-black transition-all duration-300 ${
                      isActive
                        ? "border-amber-400 bg-amber-400 text-[#111827] shadow-[0_12px_30px_rgba(245,158,11,0.18)]"
                        : "border-white/[0.08] bg-white/[0.025] text-[#8492a6] hover:border-amber-400/20 hover:bg-amber-400/[0.06] hover:text-amber-400"
                    }`}
                  >
                    {industry.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}