"use client";

import { useMemo, useState } from "react";
import { SearchX, Sparkles } from "lucide-react";

import CaseStudyCard, {
  CaseStudyCardItem,
} from "@/components/case-studies/CaseStudyCard";
import CaseStudyFilters, {
  CaseStudyFilterOption,
} from "@/components/case-studies/CaseStudyFilters";

type CaseStudiesGridProps = {
  caseStudies: CaseStudyCardItem[];
};

const industries: CaseStudyFilterOption[] = [
  {
    label: "All Industries",
    value: "all",
  },
  {
    label: "DeFi",
    value: "defi",
  },
  {
    label: "Real Estate",
    value: "real-estate",
  },
  {
    label: "Retail",
    value: "retail",
  },
  {
    label: "Financial Services",
    value: "financial-services",
  },
  {
    label: "Supply Chain",
    value: "supply-chain",
  },
  {
    label: "Healthcare",
    value: "healthcare",
  },
  {
    label: "GameFi",
    value: "gamefi",
  },
];

const services: CaseStudyFilterOption[] = [
  {
    label: "All Services",
    value: "all",
  },
  {
    label: "Protocol Development",
    value: "protocol-development",
  },
  {
    label: "Tokenization",
    value: "tokenization",
  },
  {
    label: "Enterprise Blockchain",
    value: "enterprise-blockchain",
  },
  {
    label: "Smart Contracts",
    value: "smart-contracts",
  },
  {
    label: "Payments",
    value: "payments",
  },
  {
    label: "NFT Development",
    value: "nft-development",
  },
];

function normalizeValue(value?: string) {
  return value
    ?.trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-");
}

export default function CaseStudiesGrid({
  caseStudies,
}: CaseStudiesGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndustry, setActiveIndustry] =
    useState("all");
  const [activeService, setActiveService] =
    useState("all");

  const filteredCaseStudies = useMemo(() => {
    const normalizedSearch = searchQuery
      .trim()
      .toLowerCase();

    return caseStudies.filter((caseStudy) => {
      const searchableText = [
        caseStudy.title,
        caseStudy.excerpt,
        caseStudy.client,
        caseStudy.industry,
        caseStudy.service,
        caseStudy.result,
        caseStudy.resultLabel,
        ...(caseStudy.tags ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableText.includes(normalizedSearch);

      const matchesIndustry =
        activeIndustry === "all" ||
        normalizeValue(caseStudy.industry) ===
          activeIndustry;

      const matchesService =
        activeService === "all" ||
        normalizeValue(caseStudy.service) === activeService;

      return (
        matchesSearch &&
        matchesIndustry &&
        matchesService
      );
    });
  }, [
    caseStudies,
    searchQuery,
    activeIndustry,
    activeService,
  ]);

  function resetFilters() {
    setSearchQuery("");
    setActiveIndustry("all");
    setActiveService("all");
  }

  return (
    <section
      id="case-studies-grid"
      className="relative overflow-hidden bg-[#07101d] py-24 sm:py-28 lg:py-36"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-32 h-96 w-96 rounded-full bg-amber-400/[0.04] blur-[140px]" />

        <div className="absolute bottom-20 right-0 h-96 w-96 rounded-full bg-blue-500/[0.04] blur-[140px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:92px_92px]" />
      </div>

      <div className="relative">
        {/* Heading */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
                <Sparkles className="h-4 w-4" />
                Selected Work
              </div>

              <h2 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                Explore the work behind{" "}
                <span className="text-amber-400">
                  measurable growth.
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-sm font-medium leading-7 text-[#8f9caf] sm:text-base">
              Browse client projects across different
              industries, services, and business objectives.
              Every case study shows the challenge, strategy,
              execution, and result.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-12 lg:mt-16">
          <CaseStudyFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeIndustry={activeIndustry}
            onIndustryChange={setActiveIndustry}
            activeService={activeService}
            onServiceChange={setActiveService}
            industries={industries}
            services={services}
            resultsCount={filteredCaseStudies.length}
            onReset={resetFilters}
          />
        </div>

        {/* Cards */}
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:mt-12">
          {filteredCaseStudies.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredCaseStudies.map(
                (caseStudy, index) => (
                  <CaseStudyCard
                    key={
                      caseStudy.id ??
                      caseStudy.slug
                    }
                    item={caseStudy}
                    index={index}
                  />
                )
              )}
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0c1727]/85 px-6 py-20 text-center shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-10">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/[0.06] blur-[100px]" />

              <div className="relative mx-auto max-w-lg">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-[1.4rem] border border-amber-400/20 bg-amber-400/[0.08] text-amber-400">
                  <SearchX className="h-7 w-7" />
                </span>

                <h3 className="mt-6 text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">
                  No matching case studies
                </h3>

                <p className="mt-4 text-sm font-medium leading-7 text-[#8592a6]">
                  We could not find a project matching your
                  current search and filters. Try another
                  keyword or reset the filters.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-amber-400 px-6 py-3 text-sm font-black text-[#111827] transition-all duration-300 hover:-translate-y-1 hover:bg-amber-300"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
