"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  FileText,
  Layers3,
  Library,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";

type ResourceHeroProps = {
  totalResources?: number;
  totalCategories?: number;
  featuredCount?: number;
  categories?: string[];
};

const floatingResources = [
  {
    title: "Business Guides",
    icon: BookOpen,
    position:
      "left-[2%] top-[12%] sm:left-[5%] sm:top-[13%]",
    animation: "animate-resource-float-one",
  },
  {
    title: "Research Reports",
    icon: FileText,
    position:
      "right-[2%] top-[8%] sm:right-[5%] sm:top-[12%]",
    animation: "animate-resource-float-two",
  },
  {
    title: "Learning Paths",
    icon: Layers3,
    position:
      "bottom-[7%] left-[3%] sm:bottom-[11%] sm:left-[8%]",
    animation: "animate-resource-float-three",
  },
  {
    title: "Expert Insights",
    icon: Zap,
    position:
      "bottom-[4%] right-[3%] sm:bottom-[10%] sm:right-[7%]",
    animation: "animate-resource-float-four",
  },
];

export default function ResourceHero({
  totalResources = 0,
  totalCategories = 0,
  featuredCount = 0,
  categories = [],
}: ResourceHeroProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const visibleCategories = useMemo(
    () => categories.slice(0, 5),
    [categories]
  );

  function handleSearch(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      router.push("/resources");
      return;
    }

    router.push(
      `/resources?search=${encodeURIComponent(
        normalizedQuery
      )}`
    );
  }

  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#08111f] pb-20 pt-32 sm:pb-24 sm:pt-36 lg:min-h-[860px] lg:pb-28 lg:pt-40">
      {/* Layered background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(245,158,11,0.13),transparent_34%),radial-gradient(circle_at_12%_65%,rgba(59,130,246,0.09),transparent_30%),radial-gradient(circle_at_90%_58%,rgba(168,85,247,0.07),transparent_30%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_94%)]" />

        <div className="absolute left-1/2 top-[28%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full border border-amber-base/[0.08]" />

        <div className="absolute left-1/2 top-[28%] h-[29rem] w-[29rem] -translate-x-1/2 rounded-full border border-white/[0.035]" />

        <div className="absolute left-1/2 top-[28%] h-[20rem] w-[20rem] -translate-x-1/2 rounded-full border border-blue-400/[0.06]" />
      </div>

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-48 top-20 h-[32rem] w-[32rem] animate-resource-hero-glow-one rounded-full bg-amber-base/[0.09] blur-[130px]" />

      <div className="pointer-events-none absolute -right-52 top-52 h-[34rem] w-[34rem] animate-resource-hero-glow-two rounded-full bg-blue-500/[0.08] blur-[140px]" />

      {/* Floating resource cards */}
      <div className="pointer-events-none absolute inset-0 hidden xl:block">
        {floatingResources.map((resource) => {
          const Icon = resource.icon;

          return (
            <div
              key={resource.title}
              className={`absolute ${resource.position} ${resource.animation}`}
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101b2c]/75 px-4 py-3 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
                    <Icon className="h-4 w-4" />
                  </span>

                  <span className="text-xs font-black tracking-[-0.01em] text-white">
                    {resource.title}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orbit dots */}
      <div className="pointer-events-none absolute left-1/2 top-[28%] hidden h-[38rem] w-[38rem] -translate-x-1/2 animate-resource-orbit-spin lg:block">
        <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-amber-base shadow-[0_0_25px_rgba(245,158,11,0.8)]" />

        <span className="absolute bottom-[18%] left-[4%] h-2 w-2 rounded-full bg-blue-300 shadow-[0_0_20px_rgba(147,197,253,0.7)]" />

        <span className="absolute right-[6%] top-[25%] h-1.5 w-1.5 rounded-full bg-purple-300 shadow-[0_0_18px_rgba(216,180,254,0.7)]" />
      </div>

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          {/* Badge */}
          <div className="animate-resource-hero-reveal inline-flex items-center gap-2 rounded-full border border-amber-base/25 bg-amber-base/[0.08] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-amber-base opacity-0 backdrop-blur-xl sm:text-xs">
            <Sparkles className="h-4 w-4" />
            ClickMasters Resource Library
          </div>

          {/* Heading */}
          <h1 className="animate-resource-hero-reveal resource-hero-delay-one mt-7 max-w-5xl text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white opacity-0 sm:text-6xl lg:text-[5.6rem]">
            Practical knowledge for
            <span className="relative mx-3 inline-block text-amber-base">
              smarter
              <span className="absolute -bottom-2 left-0 h-[5px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-amber-base via-yellow-300 to-transparent animate-resource-underline" />
            </span>
            digital decisions
          </h1>

          {/* Description */}
          <p className="animate-resource-hero-reveal resource-hero-delay-two mt-7 max-w-3xl text-base font-medium leading-8 text-[#9aa8bd] opacity-0 sm:text-lg">
            Explore expert guides, strategic reports,
            practical frameworks, learning paths, and
            actionable insights created to help businesses
            understand technology and execute with clarity.
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="animate-resource-hero-reveal resource-hero-delay-three relative mt-9 w-full max-w-3xl opacity-0"
          >
            <div className="pointer-events-none absolute -inset-1 rounded-[1.8rem] bg-gradient-to-r from-amber-base/20 via-blue-500/10 to-purple-500/10 opacity-70 blur-xl transition-opacity duration-500" />

            <div className="relative flex flex-col gap-3 rounded-[1.65rem] border border-white/[0.1] bg-[#0d1828]/90 p-2.5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <Search className="h-5 w-5 shrink-0 text-amber-base" />

                <input
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  type="search"
                  placeholder="Search guides, reports, insights..."
                  aria-label="Search resources"
                  className="h-12 min-w-0 flex-1 bg-transparent text-sm font-semibold text-white outline-none placeholder:text-[#65748a] sm:text-base"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-[1.2rem] bg-amber-base px-6 text-sm font-black text-[#101827] shadow-[0_12px_35px_rgba(245,158,11,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-[0_18px_45px_rgba(245,158,11,0.3)]"
              >
                Search Library

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </form>

          {/* Categories */}
          {visibleCategories.length > 0 && (
            <div className="animate-resource-hero-reveal resource-hero-delay-four mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-2 opacity-0">
              <span className="mr-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#66758b]">
                Popular:
              </span>

              {visibleCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    router.push(
                      `/resources?category=${encodeURIComponent(
                        category
                      )}`
                    )
                  }
                  className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-2 text-[11px] font-bold text-[#9ca9bb] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-base/25 hover:bg-amber-base/[0.07] hover:text-amber-base"
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="animate-resource-hero-reveal resource-hero-delay-five mt-12 grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-[1.8rem] border border-white/[0.08] bg-[#0d1726]/60 opacity-0 backdrop-blur-xl sm:grid-cols-3">
            <div className="group relative flex items-center justify-center gap-4 border-b border-white/[0.07] px-6 py-6 sm:border-b-0 sm:border-r">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <Library className="h-5 w-5" />
              </span>

              <div className="text-left">
                <p className="text-2xl font-black text-white">
                  {totalResources}+
                </p>

                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#718096]">
                  Resources
                </p>
              </div>
            </div>

            <div className="group relative flex items-center justify-center gap-4 border-b border-white/[0.07] px-6 py-6 sm:border-b-0 sm:border-r">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-blue-400/20 bg-blue-400/[0.08] text-blue-300 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                <Boxes className="h-5 w-5" />
              </span>

              <div className="text-left">
                <p className="text-2xl font-black text-white">
                  {totalCategories}+
                </p>

                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#718096]">
                  Categories
                </p>
              </div>
            </div>

            <div className="group relative flex items-center justify-center gap-4 px-6 py-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-purple-400/20 bg-purple-400/[0.08] text-purple-300 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <Sparkles className="h-5 w-5" />
              </span>

              <div className="text-left">
                <p className="text-2xl font-black text-white">
                  {featuredCount}+
                </p>

                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#718096]">
                  Featured
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#08111f] to-transparent" />
    </section>
  );
}