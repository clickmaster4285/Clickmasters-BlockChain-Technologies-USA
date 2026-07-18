"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Code2,
  FileSearch,
  GraduationCap,
  Layers3,
  Lightbulb,
  LineChart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type ResourceCategoriesProps = {
  categories?: string[];
  resources?: Array<{
    category?: string;
  }>;
};

const categoryVisuals = [
  {
    icon: BookOpen,
    label: "Guides",
    accent: "amber",
    description:
      "Step-by-step resources created for practical implementation.",
  },
  {
    icon: LineChart,
    label: "Research",
    accent: "blue",
    description:
      "Market analysis, trends, reports, and strategic insights.",
  },
  {
    icon: GraduationCap,
    label: "Learning",
    accent: "purple",
    description:
      "Structured knowledge for teams, founders, and professionals.",
  },
  {
    icon: BriefcaseBusiness,
    label: "Business",
    accent: "emerald",
    description:
      "Frameworks for strategy, operations, growth, and execution.",
  },
  {
    icon: Code2,
    label: "Development",
    accent: "cyan",
    description:
      "Technical explanations, engineering practices, and architecture.",
  },
  {
    icon: ShieldCheck,
    label: "Security",
    accent: "rose",
    description:
      "Security principles, audits, risk guidance, and best practices.",
  },
  {
    icon: Building2,
    label: "Enterprise",
    accent: "orange",
    description:
      "Resources for large-scale adoption and organizational planning.",
  },
  {
    icon: Lightbulb,
    label: "Insights",
    accent: "yellow",
    description:
      "Expert perspectives and actionable technology insights.",
  },
];

function getCategoryVisual(category: string, index: number) {
  const normalized = category.toLowerCase();

  if (
    normalized.includes("guide") ||
    normalized.includes("article")
  ) {
    return categoryVisuals[0];
  }

  if (
    normalized.includes("research") ||
    normalized.includes("report") ||
    normalized.includes("market")
  ) {
    return categoryVisuals[1];
  }

  if (
    normalized.includes("learn") ||
    normalized.includes("education") ||
    normalized.includes("course")
  ) {
    return categoryVisuals[2];
  }

  if (
    normalized.includes("business") ||
    normalized.includes("strategy")
  ) {
    return categoryVisuals[3];
  }

  if (
    normalized.includes("develop") ||
    normalized.includes("technical") ||
    normalized.includes("engineering")
  ) {
    return categoryVisuals[4];
  }

  if (
    normalized.includes("security") ||
    normalized.includes("audit")
  ) {
    return categoryVisuals[5];
  }

  if (
    normalized.includes("enterprise") ||
    normalized.includes("company")
  ) {
    return categoryVisuals[6];
  }

  return categoryVisuals[index % categoryVisuals.length];
}

function getAccentClasses(accent: string) {
  const accents: Record<
    string,
    {
      icon: string;
      glow: string;
      border: string;
      text: string;
      number: string;
    }
  > = {
    amber: {
      icon: "border-amber-400/20 bg-amber-400/10 text-amber-300",
      glow: "bg-amber-400/10",
      border: "group-hover:border-amber-400/30",
      text: "group-hover:text-amber-300",
      number: "text-amber-400/20",
    },

    blue: {
      icon: "border-blue-400/20 bg-blue-400/10 text-blue-300",
      glow: "bg-blue-400/10",
      border: "group-hover:border-blue-400/30",
      text: "group-hover:text-blue-300",
      number: "text-blue-400/20",
    },

    purple: {
      icon: "border-purple-400/20 bg-purple-400/10 text-purple-300",
      glow: "bg-purple-400/10",
      border: "group-hover:border-purple-400/30",
      text: "group-hover:text-purple-300",
      number: "text-purple-400/20",
    },

    emerald: {
      icon: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
      glow: "bg-emerald-400/10",
      border: "group-hover:border-emerald-400/30",
      text: "group-hover:text-emerald-300",
      number: "text-emerald-400/20",
    },

    cyan: {
      icon: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
      glow: "bg-cyan-400/10",
      border: "group-hover:border-cyan-400/30",
      text: "group-hover:text-cyan-300",
      number: "text-cyan-400/20",
    },

    rose: {
      icon: "border-rose-400/20 bg-rose-400/10 text-rose-300",
      glow: "bg-rose-400/10",
      border: "group-hover:border-rose-400/30",
      text: "group-hover:text-rose-300",
      number: "text-rose-400/20",
    },

    orange: {
      icon: "border-orange-400/20 bg-orange-400/10 text-orange-300",
      glow: "bg-orange-400/10",
      border: "group-hover:border-orange-400/30",
      text: "group-hover:text-orange-300",
      number: "text-orange-400/20",
    },

    yellow: {
      icon: "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",
      glow: "bg-yellow-400/10",
      border: "group-hover:border-yellow-400/30",
      text: "group-hover:text-yellow-300",
      number: "text-yellow-400/20",
    },
  };

  return accents[accent] || accents.amber;
}

export default function ResourceCategories({
  categories = [],
  resources = [],
}: ResourceCategoriesProps) {
  if (!categories.length) return null;

  const visibleCategories = categories.slice(0, 8);

  return (
    <section className="relative overflow-hidden bg-[#0b1422] py-20 sm:py-24 lg:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.014)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.014)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]" />

        <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-blue-500/[0.05] blur-[130px]" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-amber-400/[0.05] blur-[130px]" />

        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025]" />
      </div>

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-4xl text-center sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#a7b2c3]">
            <Layers3 className="h-4 w-4 text-amber-base" />
            Explore by Category
          </div>

          <h2 className="mt-6 text-3xl font-black leading-tight tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
            Find exactly what you need,
            <span className="text-amber-base">
              {" "}
              faster
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-7 text-[#8d9aae] sm:text-base">
            Browse the resource library by topic and jump
            directly into practical guides, reports,
            insights, and learning materials.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleCategories.map((category, index) => {
            const visual = getCategoryVisual(
              category,
              index
            );

            const colors = getAccentClasses(
              visual.accent
            );

            const Icon = visual.icon;

            const count = resources.filter(
              (resource) =>
                resource.category === category
            ).length;

            return (
              <Link
                key={category}
                href={`/resources?category=${encodeURIComponent(
                  category
                )}`}
                className={`animate-resource-category-reveal group relative min-h-[290px] overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#101b2c]/75 p-5 opacity-0 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-[#122033] sm:p-6 ${colors.border}`}
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
              >
                {/* Moving hover glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div
                    className={`absolute -right-16 -top-16 h-44 w-44 rounded-full blur-[65px] ${colors.glow}`}
                  />

                  <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-white/[0.025] blur-[55px]" />
                </div>

                {/* Top shine */}
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                {/* Large number */}
                <span
                  className={`pointer-events-none absolute -right-2 top-1 text-[5.7rem] font-black leading-none tracking-[-0.08em] transition-transform duration-700 group-hover:-translate-x-2 group-hover:translate-y-2 ${colors.number}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`grid h-13 w-13 place-items-center rounded-2xl border transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 ${colors.icon}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <span className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.025] text-[#77859a] transition-all duration-400 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-white/15 group-hover:bg-white/[0.06] group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="mt-auto pt-14">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#68768b]">
                        {count || "Explore"} resources
                      </span>

                      <span className="h-1 w-1 rounded-full bg-[#445268]" />

                      <Sparkles className="h-3 w-3 text-amber-base/70" />
                    </div>

                    <h3
                      className={`text-xl font-black tracking-[-0.025em] text-white transition-colors duration-300 ${colors.text}`}
                    >
                      {category}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-[#8391a6]">
                      {visual.description}
                    </p>

                    <div className="mt-6 flex items-center gap-3 text-xs font-black text-[#a7b2c1]">
                      Browse category

                      <span className="h-px w-7 bg-white/15 transition-all duration-500 group-hover:w-12 group-hover:bg-amber-base/50" />

                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom discovery bar */}
        <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-[#0e1929]/75 p-5 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
                <FileSearch className="h-5 w-5" />
              </span>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-base">
                  Not sure where to start?
                </p>

                <p className="mt-1 text-sm font-bold text-[#cbd5e1] sm:text-base">
                  Browse the complete resource library.
                </p>
              </div>
            </div>

            <Link
              href="/resources"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-sm font-black text-[#c6d0de] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-base/30 hover:bg-amber-base/[0.08] hover:text-amber-base sm:w-auto"
            >
              View All Resources

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}