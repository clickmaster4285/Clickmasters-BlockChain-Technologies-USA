"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blockchainServices } from "@/data/blockchain-services";

const accentMap = {
  primary: "text-amber-base bg-amber-glow border-amber-border/40",
  secondary: "text-emerald-base bg-emerald-glow border-emerald-border/40",
  tertiary: "text-silver-light bg-silver-dim/20 border-silver-dim/30",
  success: "text-emerald-base bg-emerald-glow border-emerald-border/40",
} as const;

export function Services() {
  const featured = blockchainServices.slice(0, 2);
  const rest = blockchainServices.slice(2);

  return (
    <section id="services" className="relative overflow-hidden bg-bg-elevated py-24 md:py-32">
      {/* Background texture */}
      <div className="bg-hex pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[30rem] w-[30rem] animate-orb rounded-full bg-amber-glow blur-[100px]" />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] animate-orb rounded-full bg-emerald-glow blur-[100px]"
        style={{ animationDelay: "-7s" }}
      />

      <div className="site-container relative px-6">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-glow/50 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-base">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
            Services
          </div>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
            Full-spectrum{" "}
            <span className="text-gradient">blockchain engineering</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            From Solidity protocol design to mainnet launch — we build EVM-compatible
            infrastructure for DeFi, NFT, and DAO platforms.
          </p>
        </div>

        {/* Featured services - 2 columns */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {featured.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.slug}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-border/50 hover:shadow-soft md:p-8"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-glow opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl border ${accentMap[s.accent]}`}>
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary md:text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{s.fullDescription}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-bg-base/50 px-2.5 py-0.5 font-mono text-[11px] text-text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-amber-base opacity-0 transition-all group-hover:opacity-100 group-focus-visible:opacity-100"
                    tabIndex={-1}
                  >
                    Book a Strategy Call
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Rest of services - 3 columns */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.slug}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-border/40 hover:shadow-soft"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-amber-glow opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg border ${accentMap[s.accent]}`}>
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{s.fullDescription}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.technologies.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-bg-base/50 px-2 py-0.5 font-mono text-[10px] text-text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-base opacity-0 transition-all group-hover:opacity-100 group-focus-visible:opacity-100"
                    tabIndex={-1}
                  >
                    Book a Strategy Call
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
