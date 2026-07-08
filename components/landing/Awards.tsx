"use client";

import { Trophy, Shield, Zap, ArrowUpRight } from "lucide-react";

const awards = [
  {
    title: "Top Blockchain Dev Company",
    body: "Clutch",
    year: "2024",
    icon: Trophy,
  },
  {
    title: "Best DeFi Implementation",
    body: "Web3 Awards",
    year: "2024",
    icon: Zap,
  },
  {
    title: "Most Secure Smart Contract",
    body: "Audit League",
    year: "2023",
    icon: Shield,
  },
  {
    title: "Rising Web3 Studio",
    body: "ProductHunt",
    year: "2023",
    icon: ArrowUpRight,
  },
];

export function Awards() {
  return (
    <section className="relative overflow-hidden bg-bg-base py-24">
      {/* Sparkle dots */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 animate-sparkle rounded-full bg-silver-base"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${(i % 6) * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="site-container relative px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-glow/50 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-base">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
            Recognition
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Awarded by the people who set the bar
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((a) => {
            const Icon = a.icon;
            return (
              <div
                key={a.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-border/40 hover:shadow-soft"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-glow opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber-glow text-amber-base">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-text-muted">
                    {a.year}
                  </span>
                </div>
                <h3 className="relative mt-5 text-base font-bold leading-tight text-text-primary">
                  {a.title}
                </h3>
                <p className="relative mt-1.5 font-mono text-[11px] uppercase tracking-wider text-text-secondary">
                  by {a.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
