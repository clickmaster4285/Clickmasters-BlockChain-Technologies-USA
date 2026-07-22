"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Blocks,
  CheckCircle2,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const heroStats = [
  {
    value: "1,000+",
    label: "Blockchain projects",
  },
  {
    value: "Since 2014",
    label: "Industry experience",
  },
  {
    value: "18+",
    label: "Industries served",
  },
];

const trustItems = [
  {
    icon: ShieldCheck,
    label: "Compliance-first architecture",
  },
  {
    icon: Network,
    label: "Enterprise-grade integrations",
  },
  {
    icon: CheckCircle2,
    label: "Independent security audits",
  },
];

export default function IndustriesHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const [mousePosition, setMousePosition] = useState({
    x: 50,
    y: 50,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => window.clearTimeout(timeout);
  }, []);

  function handleMouseMove(
    event: React.MouseEvent<HTMLElement>
  ) {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const bounds = section.getBoundingClientRect();

    const x =
      ((event.clientX - bounds.left) / bounds.width) * 100;

    const y =
      ((event.clientY - bounds.top) / bounds.height) * 100;

    setMousePosition({ x, y });
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative isolate overflow-hidden bg-[#03070b] px-5 pb-20 pt-32 text-white sm:px-8 sm:pb-24 sm:pt-36 lg:px-10 lg:pb-32 lg:pt-44"
    >
      {/* Mouse-follow ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70 transition-[background] duration-300"
        style={{
          background: `
            radial-gradient(
              700px circle at ${mousePosition.x}% ${mousePosition.y}%,
              rgba(34, 211, 238, 0.12),
              transparent 42%
            )
          `,
        }}
      />

      {/* Background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-260px] left-1/2 h-[500px] w-[850px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[160px]"
      />

      {/* Grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "linear-gradient(to bottom, black, transparent 90%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black, transparent 90%)",
        }}
      />

      {/* Decorative blockchain network */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[4%] top-[17%] hidden h-[430px] w-[430px] lg:block"
      >
        <div className="absolute inset-0 animate-[spin_35s_linear_infinite] rounded-full border border-cyan-300/10" />

        <div className="absolute inset-[56px] animate-[spin_24s_linear_infinite_reverse] rounded-full border border-blue-300/10" />

        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-cyan-300/20 bg-cyan-300/[0.06] shadow-[0_0_80px_rgba(34,211,238,0.18)] backdrop-blur-xl">
          <Blocks className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-cyan-200" />
        </div>

        <div className="absolute left-[8%] top-[42%] h-4 w-4 animate-pulse rounded-full border border-cyan-200/50 bg-cyan-300/20 shadow-[0_0_24px_rgba(34,211,238,0.65)]" />

        <div className="absolute right-[12%] top-[18%] h-3 w-3 animate-pulse rounded-full border border-blue-200/50 bg-blue-300/20 shadow-[0_0_20px_rgba(96,165,250,0.65)] [animation-delay:700ms]" />

        <div className="absolute bottom-[12%] right-[25%] h-5 w-5 animate-pulse rounded-full border border-emerald-200/40 bg-emerald-300/20 shadow-[0_0_24px_rgba(52,211,153,0.55)] [animation-delay:1400ms]" />

        <div className="absolute left-[28%] top-[8%] h-3 w-3 animate-pulse rounded-full bg-white/30 shadow-[0_0_18px_rgba(255,255,255,0.5)] [animation-delay:400ms]" />

        <svg
          viewBox="0 0 430 430"
          className="absolute inset-0 h-full w-full opacity-40"
        >
          <line
            x1="215"
            y1="215"
            x2="45"
            y2="195"
            stroke="url(#network-line)"
            strokeWidth="1"
          />

          <line
            x1="215"
            y1="215"
            x2="370"
            y2="85"
            stroke="url(#network-line)"
            strokeWidth="1"
          />

          <line
            x1="215"
            y1="215"
            x2="315"
            y2="365"
            stroke="url(#network-line)"
            strokeWidth="1"
          />

          <line
            x1="215"
            y1="215"
            x2="120"
            y2="45"
            stroke="url(#network-line)"
            strokeWidth="1"
          />

          <defs>
            <linearGradient
              id="network-line"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="rgba(34,211,238,0)"
              />

              <stop
                offset="50%"
                stopColor="rgba(103,232,249,0.8)"
              />

              <stop
                offset="100%"
                stopColor="rgba(96,165,250,0)"
              />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 backdrop-blur-xl">
              <Sparkles
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />

              Blockchain across industries
            </div>
          </div>

          {/* Heading */}
          <h1
            className={`mt-8 max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.05em] transition-all delay-100 duration-1000 sm:text-6xl md:text-7xl lg:text-[92px] ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            Built for the industries where{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                trust matters most.
              </span>

              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-1 h-3 bg-cyan-300/10 blur-xl"
              />
            </span>
          </h1>

          {/* Description */}
          <p
            className={`mt-8 max-w-3xl text-pretty text-base leading-8 text-slate-400 transition-all delay-200 duration-1000 sm:text-lg sm:leading-9 lg:text-xl ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            We design blockchain infrastructure for regulated,
            data-intensive and multi-party industries. From
            financial settlement to healthcare records, supply
            chain traceability and real-world asset tokenization,
            every system is engineered around measurable business
            outcomes.
          </p>

          {/* CTA buttons */}
          <div
            className={`mt-10 flex flex-col gap-4 transition-all delay-300 duration-1000 sm:flex-row sm:items-center ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <Link
              href="#industries-grid"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-cyan-300 px-7 text-sm font-semibold text-slate-950 shadow-[0_16px_50px_-18px_rgba(34,211,238,0.75)] transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-200 hover:shadow-[0_24px_60px_-18px_rgba(34,211,238,0.9)]"
            >
              Explore industries

              <ArrowDownRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/contact"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-7 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.08]"
            >
              Discuss your project

              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* Trust row */}
        <div
          className={`mt-14 grid max-w-4xl gap-4 transition-all delay-[400ms] duration-1000 sm:grid-cols-3 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 backdrop-blur-xl"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-300/10 bg-cyan-300/[0.06]">
                  <Icon
                    className="h-4 w-4 text-cyan-300"
                    aria-hidden="true"
                  />
                </div>

                <span className="text-xs font-medium leading-5 text-slate-300 sm:text-sm">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Statistics */}
        <div
          className={`relative mt-16 overflow-hidden rounded-[30px] border border-white/[0.08] bg-white/[0.025] p-1 backdrop-blur-2xl transition-all delay-500 duration-1000 sm:mt-20 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-cyan-300/[0.04] via-transparent to-blue-400/[0.04]"
          />

          <div className="relative grid divide-y divide-white/[0.07] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {heroStats.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden px-7 py-7 sm:px-8 sm:py-8 lg:px-10"
              >
                <div className="absolute inset-0 translate-y-full bg-gradient-to-t from-cyan-300/[0.06] to-transparent transition-transform duration-500 group-hover:translate-y-0" />

                <div className="relative">
                  <span className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                    {stat.value}
                  </span>

                  <p className="mt-2 text-sm text-slate-500">
                    {stat.label}
                  </p>
                </div>

                <span className="absolute right-5 top-5 text-xs font-medium text-white/10">
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050a0f] to-transparent"
      />
    </section>
  );
}