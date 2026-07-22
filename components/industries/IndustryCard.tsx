import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";

import type { IndustryCardData } from "@/lib/industry";

interface IndustryCardProps {
  industry: IndustryCardData;
  priority?: boolean;
}

export default function IndustryCard({
  industry,
  priority = false,
}: IndustryCardProps) {
  return (
    <article className="group relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.035] transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-400/30 hover:bg-white/[0.055] hover:shadow-[0_24px_80px_-30px_rgba(34,211,238,0.35)]">
      <Link
        href={`/industries/${industry.slug}`}
        aria-label={`Explore ${industry.title}`}
        className="flex h-full flex-col"
      >
        <div className="relative h-[220px] overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/70 sm:h-[240px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(34,211,238,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.22) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="absolute -bottom-16 right-10 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex h-full items-center justify-center p-8">
            <div className="absolute h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />

            <div className="relative grid h-28 w-28 place-items-center rounded-[1.75rem] border border-white/15 bg-[#071018]/80 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.28)] backdrop-blur-xl transition-all duration-500 group-hover:rotate-3 group-hover:scale-105 group-hover:border-cyan-300/35 sm:h-32 sm:w-32">
              <Image
                src={industry.image}
                alt={industry.title}
                width={112}
                height={112}
                priority={priority}
                sizes="112px"
                className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#071018] via-[#071018]/15 to-transparent" />

          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
          </div>

          <div className="absolute left-5 top-5">
            <span className="inline-flex rounded-full border border-cyan-300/20 bg-[#071018]/75 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200 backdrop-blur-md">
              {industry.badge}
            </span>
          </div>

          <div className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:border-cyan-300/40 group-hover:bg-cyan-300 group-hover:text-slate-950">
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="mb-5 flex items-center gap-2 text-xs font-medium text-slate-400">
            <Clock3 className="h-4 w-4 text-cyan-300" aria-hidden="true" />
            <span>{industry.readTime}</span>
          </div>

          <h2 className="text-balance text-xl font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-cyan-100 sm:text-2xl">
            {industry.title}
          </h2>

          <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-400 sm:text-[15px]">
            {industry.excerpt}
          </p>

          <div className="mt-auto pt-7">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
              Explore industry
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-cyan-300 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
      </Link>
    </article>
  );
}
