"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Clock3,
  TrendingUp,
} from "lucide-react";

export type CaseStudyCardItem = {
  id?: string | number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  client?: string;
  industry?: string;
  service?: string;
  duration?: string;
  result?: string;
  resultLabel?: string;
  featured?: boolean;
  tags?: string[];
};

type CaseStudyCardProps = {
  item: CaseStudyCardItem;
  index?: number;
  variant?: "default" | "wide" | "compact";
};

export default function CaseStudyCard({
  item,
  index = 0,
  variant = "default",
}: CaseStudyCardProps) {
  if (variant === "wide") {
    return (
      <Link
        href={`/case-studies/${item.slug}`}
        className="group relative block overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0e1929] shadow-[0_30px_90px_rgba(0,0,0,0.26)] transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/25 hover:shadow-[0_40px_110px_rgba(0,0,0,0.38)]"
      >
        <div className="grid min-h-[500px] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-[320px] overflow-hidden lg:min-h-full">
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority={item.featured}
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#07101c]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0e1929]/70" />

            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
              {item.industry && (
                <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-white backdrop-blur-xl">
                  {item.industry}
                </span>
              )}

              {item.featured && (
                <span className="rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-[#111827]">
                  Featured
                </span>
              )}
            </div>

            {item.result && (
              <div className="absolute bottom-5 left-5 rounded-[1.3rem] border border-white/15 bg-[#08111f]/80 p-4 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-2 text-emerald-300">
                  <TrendingUp className="h-4 w-4" />

                  <span className="text-[10px] font-black uppercase tracking-[0.14em]">
                    {item.resultLabel || "Growth Result"}
                  </span>
                </div>

                <p className="mt-2 text-2xl font-black text-white">
                  {item.result}
                </p>
              </div>
            )}
          </div>

          <div className="relative flex flex-col justify-center overflow-hidden p-6 sm:p-9 lg:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-400/[0.08] blur-[80px]" />

            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
                  {item.client || "Client Success Story"}
                </span>

                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.1] bg-white/[0.03] text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-amber-400/30 group-hover:bg-amber-400 group-hover:text-[#111827]">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <h3 className="mt-6 text-3xl font-black leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl">
                {item.title}
              </h3>

              <p className="mt-5 text-sm font-medium leading-7 text-[#8d9aae] sm:text-base">
                {item.excerpt}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {item.tags?.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[10px] font-bold text-[#9ca9ba]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/[0.07] pt-6">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.17em] text-[#667489]">
                    Service
                  </p>

                  <p className="mt-2 text-sm font-black text-white">
                    {item.service || "Digital Strategy"}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.17em] text-[#667489]">
                    Duration
                  </p>

                  <p className="mt-2 text-sm font-black text-white">
                    {item.duration || "12 Weeks"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/case-studies/${item.slug}`}
        className="group flex items-center gap-4 rounded-[1.4rem] border border-white/[0.07] bg-[#0e1929]/80 p-3 transition-all duration-400 hover:-translate-y-1 hover:border-amber-400/25 hover:bg-[#101d30]"
      >
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-[1rem]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="96px"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-black uppercase tracking-[0.15em] text-amber-400">
            {item.industry || "Case Study"}
          </p>

          <h3 className="mt-2 line-clamp-2 text-sm font-black leading-5 text-white">
            {item.title}
          </h3>

          {item.result && (
            <p className="mt-2 text-xs font-bold text-emerald-300">
              {item.resultLabel || "Result"}: {item.result}
            </p>
          )}
        </div>

        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/[0.08] text-[#8f9caf] transition-all duration-300 group-hover:border-amber-400/30 group-hover:bg-amber-400 group-hover:text-[#111827]">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/case-studies/${item.slug}`}
      style={{
        animationDelay: `${index * 90}ms`,
      }}
      className="group animate-case-study-card-reveal relative block overflow-hidden rounded-[1.8rem] border border-white/[0.08] bg-[#0d1828] shadow-[0_24px_75px_rgba(0,0,0,0.23)] transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/25 hover:shadow-[0_34px_95px_rgba(0,0,0,0.36)]"
    >
      <div className="relative aspect-[1.25/1] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          priority={item.featured}
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#08111f] via-[#08111f]/10 to-transparent" />

        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {item.industry && (
              <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-xl">
                {item.industry}
              </span>
            )}

            {item.featured && (
              <span className="rounded-full bg-amber-400 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-[#111827]">
                Featured
              </span>
            )}
          </div>

          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-black/20 text-white backdrop-blur-xl transition-all duration-500 group-hover:rotate-45 group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-[#111827]">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        {item.result && (
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <div className="rounded-[1.2rem] border border-white/10 bg-[#0a1422]/75 px-4 py-3 backdrop-blur-xl">
              <p className="text-[8px] font-black uppercase tracking-[0.15em] text-[#93a0b3]">
                {item.resultLabel || "Growth achieved"}
              </p>

              <p className="mt-1 text-xl font-black text-white">
                {item.result}
              </p>
            </div>

            <span className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300 backdrop-blur-xl">
              <BarChart3 className="h-4 w-4" />
            </span>
          </div>
        )}
      </div>

      <div className="relative p-5 sm:p-6">
        <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-amber-400/[0.06] blur-[70px]" />

        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-400">
              {item.client || "ClickMasters Project"}
            </p>

            {item.duration && (
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#738196]">
                <Clock3 className="h-3.5 w-3.5" />
                {item.duration}
              </div>
            )}
          </div>

          <h3 className="mt-4 text-xl font-black leading-[1.2] tracking-[-0.025em] text-white transition-colors duration-300 group-hover:text-amber-300 sm:text-2xl">
            {item.title}
          </h3>

          <p className="mt-4 line-clamp-3 text-sm font-medium leading-6 text-[#8592a6]">
            {item.excerpt}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[9px] font-bold text-[#8d9aae]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-5">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.16em] text-[#647287]">
                Service
              </p>

              <p className="mt-1 text-xs font-black text-[#c5cfdd]">
                {item.service || "Digital Strategy"}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-black text-white transition-colors duration-300 group-hover:text-amber-400">
              View project
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}