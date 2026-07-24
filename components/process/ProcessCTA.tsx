// components/process/ProcessCTA.tsx

import Link from "next/link";

import {
  ArrowRight,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

import type { ProcessCTA as ProcessCTAType } from "@/lib/process";

/* =========================================================
   Types
========================================================= */

type ProcessCTAProps = {
  cta: ProcessCTAType;
  className?: string;
};

/* =========================================================
   Component
========================================================= */

export default function ProcessCTA({
  cta,
  className = "",
}: ProcessCTAProps) {
  return (
    <section
      className={[
        "relative isolate overflow-hidden rounded-[2.25rem] border border-amber-base/25 bg-surface px-6 py-10 sm:px-9 sm:py-12 lg:px-12 lg:py-14",
        className,
      ].join(" ")}
    >
      {/* Background */}

      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(225,157,45,0.18),transparent_32%),radial-gradient(circle_at_90%_80%,rgba(225,157,45,0.08),transparent_28%)]" />

      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",

          backgroundSize: "48px 48px",
        }}
      />

      <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full border border-amber-base/[0.1]" />

      <div className="pointer-events-none absolute -bottom-24 -left-24 -z-10 h-64 w-64 rounded-full bg-amber-base/[0.08] blur-[80px]" />

      {/* Content */}

      <div className="flex flex-col items-start justify-between gap-9 lg:flex-row lg:items-center">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/25 bg-amber-base/[0.08] px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-amber-base">
            <Sparkles className="h-4 w-4" />

            Start Your Project
          </span>

          <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.035em] text-text-primary sm:text-4xl lg:text-5xl">
            {cta.title}
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-silver sm:text-base">
            {cta.description}
          </p>
        </div>

        {/* Buttons */}

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col">
          <Link
            href={cta.primaryLink}
            className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-amber-base px-6 text-sm font-black text-bg-base transition-all duration-300 hover:-translate-y-1 hover:bg-amber-light hover:shadow-[0_18px_50px_rgba(225,157,45,0.25)]"
          >
            <MessageSquareText className="h-4 w-4" />

            {cta.primaryText}

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href={cta.secondaryLink}
            className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.025] px-6 text-sm font-black text-text-primary transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/40 hover:bg-amber-base/[0.07] hover:text-amber-base"
          >
            {cta.secondaryText}

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}