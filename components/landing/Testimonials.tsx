"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "They audited our DeFi protocol and found zero critical issues post-deploy. Best security team we've worked with in Web3.",
    name: "Marcus Chen",
    role: "Founder, Aurora Finance",
    initials: "MC",
    gradient: "linear-gradient(135deg, #D97706, #F59E0B)",
    category: "DeFi Protocol",
  },
  {
    quote: "Shipped our NFT marketplace in 12 weeks with cross-chain support. 10K+ daily users in the first month.",
    name: "Lina Park",
    role: "Product Lead, Stratos",
    initials: "LP",
    gradient: "linear-gradient(135deg, #64748B, #D97706)",
    category: "NFT Marketplace",
  },
  {
    quote: "Engineering quality is enterprise-grade. Our smart contracts have been processing $80M+ for 18 months with zero downtime.",
    name: "Jonas Weber",
    role: "CTO, Quorum DAO",
    initials: "JW",
    gradient: "linear-gradient(135deg, #F59E0B, #CBD5E1)",
    category: "DAO Infrastructure",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-bg-surface py-24 md:py-32">
      {/* Background texture */}
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[28rem] w-[28rem] animate-orb rounded-full bg-amber-glow blur-[100px]" />
      <div
        className="pointer-events-none absolute -right-32 bottom-10 h-[28rem] w-[28rem] animate-orb rounded-full bg-emerald-glow blur-[100px]"
        style={{ animationDelay: "-5s" }}
      />
      <div className="pointer-events-none absolute left-10 top-10 font-display text-[200px] leading-none text-silver-dim/40">
        &ldquo;
      </div>

      <div className="container relative mx-auto max-w-[85vw] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-glow/50 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-base">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
            Testimonials
          </div>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
            Founders and protocols trust us with{" "}
            <span className="text-gradient">mission-critical</span> infra
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-elevated p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-border/40 hover:shadow-soft"
            >
              <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
                {t.category}
              </span>
              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-base text-amber-base" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-text-primary/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold text-white shadow-lg"
                  style={{ background: t.gradient }}
                  aria-hidden="true"
                >
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-secondary">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
