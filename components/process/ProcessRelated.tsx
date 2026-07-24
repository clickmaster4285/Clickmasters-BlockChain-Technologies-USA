// components/process/ProcessRelated.tsx

import Link from "next/link";

import {
  ArrowRight,
  BookOpen,
} from "lucide-react";

import ProcessCard from "@/components/process/ProcessCard";

import type { ProcessCardData } from "@/lib/process";

/* =========================================================
   Types
========================================================= */

type ProcessRelatedProps = {
  processes: ProcessCardData[];
  title?: string;
  description?: string;
  className?: string;
};

/* =========================================================
   Component
========================================================= */

export default function ProcessRelated({
  processes,
  title = "Related Process Guides",
  description = "Continue exploring technical processes, architecture decisions, security practices, and implementation requirements.",
  className = "",
}: ProcessRelatedProps) {
  if (processes.length === 0) {
    return null;
  }

  return (
    <section
      className={[
        "relative overflow-hidden border-y border-white/[0.07] bg-surface/35 px-5 py-20 sm:px-8 lg:px-12 lg:py-28",
        className,
      ].join(" ")}
    >
      {/* Background */}

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(225,157,45,0.08),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(255,255,255,0.03),transparent_28%)]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",

          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}

        <div className="flex flex-col justify-between gap-7 border-b border-white/[0.08] pb-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/[0.06] px-4 py-2 text-[11px] font-black uppercase tracking-[0.17em] text-amber-base">
              <BookOpen className="h-4 w-4" />

              Continue Learning
            </span>

            <h2 className="mt-5 text-3xl font-black tracking-[-0.035em] text-text-primary sm:text-4xl lg:text-5xl">
              {title}
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-silver sm:text-base">
              {description}
            </p>
          </div>

          <Link
            href="/process"
            className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.025] px-5 text-sm font-black text-text-primary transition-all duration-300 hover:border-amber-base/40 hover:bg-amber-base/[0.07] hover:text-amber-base"
          >
            View All Guides

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Cards */}

        <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {processes.map((process) => (
            <ProcessCard
              key={process.slug}
              process={process}
            />
          ))}
        </div>
      </div>
    </section>
  );
}