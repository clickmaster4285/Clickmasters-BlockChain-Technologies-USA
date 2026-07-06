"use client";

import { ArrowRight } from "lucide-react";
import { Counter } from "./Counter";
import { StaggerContainer, StaggerItem } from "./Reveal";

const stats = [
  { value: 50, suffix: "+", label: "Apps Delivered" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 2, prefix: "$", suffix: "M+", label: "Revenue Driven" },
  { value: 4.9, suffix: "★", label: "Client Rating", decimals: 1 },
];

const techPills = [
  "React Native",
  "Flutter",
  "Solidity",
  "Web3.js",
  "Ethers.js",
  "Hardhat",
];

export function Dominate() {
  return (
    <section
      id="dominate"
      className="relative overflow-hidden border-y border-border bg-bg-surface py-24 md:py-32"
    >
      {/* Atmospheric orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-[30rem] w-[30rem] animate-orb rounded-full bg-amber-glow blur-[120px]" />
      <div
        className="pointer-events-none absolute -bottom-32 right-1/5 h-[32rem] w-[32rem] animate-orb rounded-full bg-emerald-glow blur-[120px]"
        style={{ animationDelay: "-6s" }}
      />
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="container relative mx-auto max-w-[85vw] px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-glow/50 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-base">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
            Why Choose ClickMasters
          </div>
          <h2 className="mt-5 font-bold tracking-tight text-text-primary" style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", lineHeight: 1.05 }}>
            Built to <span className="text-gradient">Dominate.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-text-secondary md:text-lg">
            4.9 star client rating across 50+ delivered Web3 apps with 98% retention.
          </p>
        </div>

        {/* Stats grid */}
        <StaggerContainer>
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <div className="group relative overflow-hidden bg-bg-base p-8 transition-colors hover:bg-surface">
                  {/* Top accent line */}
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-amber-base via-emerald-base to-amber-base opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative">
                    <p className="text-3xl font-bold tracking-tight text-gradient md:text-4xl">
                      <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                    </p>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.15em] text-text-muted">
                      {s.label}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        {/* Trusted Technologies strip */}
        <div className="mt-14 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
            Trusted Technologies
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {techPills.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-text-secondary transition-all hover:border-amber-border/50 hover:bg-amber-glow/30 hover:text-amber-base"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div className="mt-14 flex flex-col items-start gap-6 rounded-2xl border border-amber-border/40 bg-linear-to-br from-amber-glow via-emerald-glow/20 to-surface p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="max-w-xl">
            <h3 className="text-xl font-bold text-text-primary md:text-2xl">
              Ready to scope your blockchain project?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Free 30-min strategy call. NDA signed before the first meeting.
            </p>
          </div>
          <a
            href="/contact"
            className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(217,119,6,0.35)] md:w-auto"
          >
            Book a Strategy Call
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
