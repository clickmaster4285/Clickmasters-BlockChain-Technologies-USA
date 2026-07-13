"use client";

import { useState } from "react";
import type { CostFAQItem } from "@/lib/cost-type";
import RevealOnScroll from "@/components/cost/RevealOnScroll";

/**
 * FAQ — animation identity: UNFOLD
 * Each row fans open from the left as it enters view; the +/- glyph keeps
 * its own rotate transition on click, independent of the scroll reveal.
 */
export default function FAQAccordion({ faq }: { faq: CostFAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-bg-base to-bg-elevated py-16 md:py-24">
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 bg-hex-light opacity-30" />
      
      {/* Floating orbs */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-amber-glow/20 blur-3xl animate-orb" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-[400px] w-[400px] rounded-full bg-emerald-glow/15 blur-3xl animate-orb animation-delay-2000" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-glow/10 blur-3xl animate-orb animation-delay-4000" />

      {/* Floating geometric shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[8%] top-[10%] h-16 w-16 animate-float rounded-lg border border-amber-base/20 bg-amber-glow/10 backdrop-blur-sm">
          <div className="flex h-full items-center justify-center text-2xl text-amber-base/40">✦</div>
        </div>
        <div className="absolute right-[15%] top-[35%] h-12 w-12 animate-float animation-delay-1000 rounded-full border border-emerald-base/20 bg-emerald-glow/10 backdrop-blur-sm">
          <div className="flex h-full items-center justify-center text-lg text-emerald-base/40">◈</div>
        </div>
        <div className="absolute right-[5%] top-[60%] h-20 w-20 animate-float animation-delay-2000 rounded-2xl border border-amber-base/20 bg-amber-glow/10 backdrop-blur-sm">
          <div className="flex h-full items-center justify-center text-3xl text-amber-base/40">◆</div>
        </div>
        <div className="absolute right-[20%] top-[75%] h-10 w-10 animate-float animation-delay-1500 rounded-full border border-purple-base/20 bg-purple-glow/10 backdrop-blur-sm">
          <div className="flex h-full items-center justify-center text-sm text-purple-base/40">●</div>
        </div>
        <div className="absolute right-[12%] top-[90%] h-14 w-14 animate-float animation-delay-2500 rounded-lg border border-emerald-base/20 bg-emerald-glow/10 backdrop-blur-sm">
          <div className="flex h-full items-center justify-center text-xl text-emerald-base/40">▣</div>
        </div>
      </div>

      {/* Animated dashed lines */}
      <div className="pointer-events-none absolute right-[3%] top-[15%] hidden h-[70%] w-px bg-gradient-to-b from-transparent via-amber-base/20 to-transparent xl:block" />
      <div className="pointer-events-none absolute right-[10%] top-[25%] hidden h-[50%] w-px bg-gradient-to-b from-transparent via-emerald-base/15 to-transparent xl:block" />

      <div className="site-container relative mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left side - FAQ content */}
          <div className="lg:col-span-3">
            <RevealOnScroll effect="slide-left">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-amber-base">
                <span className="h-px w-8 bg-amber-base/60" />
                FAQ
              </div>
              <h2 className="font-display text-2xl font-semibold text-text-primary md:text-3xl lg:text-4xl">
                Common questions about{" "}
                <span className="bg-gradient-to-r from-amber-base to-amber-light bg-clip-text text-transparent">
                  blockchain development
                </span>
              </h2>
              <p className="mt-3 max-w-md text-sm text-text-secondary">
                Everything you need to know before starting your blockchain project
              </p>
            </RevealOnScroll>

            <div className="mt-10 divide-y divide-border-default overflow-hidden rounded-2xl border border-border-default bg-bg-surface/60 backdrop-blur-sm">
              {faq.map((item, i) => {
                const isOpen = open === i;
                return (
                  <RevealOnScroll key={i} effect="unfold" delay={i * 60}>
                    <div className="transition-all hover:bg-bg-elevated/30">
                      <button
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-all hover:pl-8"
                        aria-expanded={isOpen}
                      >
                        <span className="flex items-center gap-3 text-sm font-medium text-text-primary md:text-base">
                          <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                            isOpen 
                              ? "bg-amber-base text-white" 
                              : "bg-bg-elevated text-text-muted"
                          }`}>
                            {i + 1}
                          </span>
                          {item.question}
                        </span>
                        <span
                          className={`shrink-0 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                            isOpen 
                              ? "bg-amber-base/10 text-amber-base rotate-45" 
                              : "bg-bg-elevated text-text-muted hover:bg-amber-base/5"
                          }`}
                        >
                          <svg 
                            className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-0" : ""}`}
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </span>
                      </button>
                      <div
                        className="grid transition-all duration-300 ease-out"
                        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <p className="px-6 pb-5 text-left text-sm leading-relaxed text-text-secondary md:px-6 md:pb-6">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>

          {/* Right side - Animated graphics */}
          <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-center">
            <div className="relative">
              {/* Central animated icon */}
              <div className="relative flex h-72 w-72 items-center justify-center">
                {/* Pulsing ring */}
                <div className="absolute h-full w-full animate-ping-slow rounded-full border-2 border-amber-base/20" />
                <div className="absolute h-[90%] w-[90%] animate-ping-slow animation-delay-1000 rounded-full border-2 border-emerald-base/15" />
                <div className="absolute h-[80%] w-[80%] animate-ping-slow animation-delay-2000 rounded-full border-2 border-purple-base/15" />
                
                {/* Center icon */}
                <div className="relative flex h-40 w-40 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-base/10 to-emerald-base/10 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-5xl animate-float">⛓️</div>
                    <p className="mt-2 text-xs font-semibold text-text-muted">Blockchain</p>
                  </div>
                </div>
              </div>

              {/* Floating labels */}
              <div className="absolute -right-16 top-0 animate-float animation-delay-1000">
                <div className="rounded-full border border-border-default bg-bg-surface/80 px-4 py-2 text-xs backdrop-blur-sm">
                  <span className="text-amber-base">✦</span> Smart Contracts
                </div>
              </div>
              <div className="absolute -left-16 top-1/3 animate-float animation-delay-1500">
                <div className="rounded-full border border-border-default bg-bg-surface/80 px-4 py-2 text-xs backdrop-blur-sm">
                  <span className="text-emerald-base">◈</span> DeFi
                </div>
              </div>
              <div className="absolute -right-20 bottom-0 animate-float animation-delay-2000">
                <div className="rounded-full border border-border-default bg-bg-surface/80 px-4 py-2 text-xs backdrop-blur-sm">
                  <span className="text-purple-base">◆</span> NFTs
                </div>
              </div>
              <div className="absolute -left-12 bottom-1/3 animate-float animation-delay-2500">
                <div className="rounded-full border border-border-default bg-bg-surface/80 px-4 py-2 text-xs backdrop-blur-sm">
                  <span className="text-amber-base">▣</span> Web3
                </div>
              </div>

              {/* Connecting lines */}
              <svg className="absolute inset-0 h-full w-full">
                <circle cx="144" cy="144" r="100" fill="none" stroke="url(#grad)" strokeWidth="1" strokeDasharray="4 4" />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}