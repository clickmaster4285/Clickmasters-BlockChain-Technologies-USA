"use client";

import type { CostSection, CostMeta } from "@/lib/cost-type";
import { cleanInlineMarks } from "@/lib/parse-cost-content";
import RevealOnScroll from "@/components/cost/RevealOnScroll";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroSection({
  section,
  meta,
}: {
  section: CostSection;
  meta: CostMeta;
}) {
  const h1 = section.content.match(/#{1,3}\s*H1:\s*(.+)/)?.[1]?.trim() ?? meta.title;
  const h2 = section.content.match(/\*\*H2:\s*([\s\S]+?)\*\n/)?.[1]?.trim();

  const bullets = section.bullets ?? [];
  const lead = bullets[0];
  const ctaSub = bullets[bullets.length - 1]?.startsWith("*")
    ? cleanInlineMarks(bullets[bullets.length - 1])
    : null;

  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);

  const trustItems = [
    "Web3 development since 2014",
    "1,000+ blockchain projects across finance, real estate, gaming, and enterprise",
    "Full-stack delivery: smart contracts, indexing, API, front-end, wallet integration",
    "US regulatory compliance architecture on every regulated build"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[var(--bg-base)] via-[var(--bg-surface)] to-[var(--bg-base)] pb-0">
      {/* Background Effects - Adjusted for mobile */}
      <div className="pointer-events-none absolute inset-0 -top-16 md:-top-24 bg-hex-light opacity-40 md:opacity-60" />
      <div className="pointer-events-none absolute -top-32 md:-top-64 right-[-15%] md:right-[-10%] h-[280px] w-[280px] md:h-[420px] md:w-[420px] rounded-full bg-[var(--amber-glow)] blur-3xl animate-orb" />
      <div className="pointer-events-none absolute top-1/3 left-[-20%] md:left-[-14%] h-[240px] w-[240px] md:h-[360px] md:w-[360px] rounded-full bg-[var(--emerald-glow)] blur-3xl animate-orb animation-delay-2000" />

      <div className="site-container relative mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-8 md:gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 max-w-4xl text-left order-2 lg:order-1">
            <RevealOnScroll effect="slide-left">
              <div className="mt-4 md:mt-6 mb-4 md:mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-amber)] bg-[var(--amber-glow)] px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] md:tracking-[0.18em] text-[var(--amber-dim)]">
                {meta.primaryKeyword}
              </div>
            </RevealOnScroll>

            <RevealOnScroll effect="slide-left" delay={100}>
              <h1 className="text-balance font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] text-[var(--text-primary)]">
                {h1}
              </h1>
            </RevealOnScroll>

            {h2 && (
              <RevealOnScroll effect="slide-left" delay={200}>
                <p className="mt-4 md:mt-6 max-w-2xl text-pretty text-sm md:text-base lg:text-lg leading-relaxed text-[var(--text-secondary)]">
                  {h2}
                </p>
              </RevealOnScroll>
            )}

            {lead && (
              <RevealOnScroll effect="slide-left" delay={300}>
                <p className="mt-3 md:mt-4 max-w-2xl text-xs md:text-sm leading-relaxed text-[var(--text-muted)]">
                  {lead}
                </p>
              </RevealOnScroll>
            )}

            <RevealOnScroll effect="pop-bounce" delay={400}>
              <div className="mt-6 md:mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#book-a-call"
                  className="cta-btn group inline-flex items-center gap-2 rounded-full bg-[var(--amber-base)] px-5 py-3 md:px-7 md:py-3.5 text-xs md:text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
                >
                  Book a Free Strategy Call
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Image - Mobile Responsive */}
          <div className="relative flex-1 lg:flex-none lg:w-[45%] py-4 md:py-6 lg:py-10 order-1 lg:order-2">
            <div className="relative aspect-[4/3] sm:aspect-[4/3.5] md:aspect-[4/5] lg:aspect-[4/4.2] w-full overflow-hidden rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl bg-[var(--bg-surface)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--amber-glow)] via-transparent to-[var(--emerald-glow)] z-10" />
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-[var(--amber-glow)] via-transparent to-[var(--emerald-glow)] blur-2xl md:blur-3xl z-0 animate-pulse-slow" />

              {!imageError ? (
                <div className="relative w-full h-full z-10 overflow-hidden rounded-xl md:rounded-2xl">
                  <Image
                    src="/media/hero.jpg"
                    alt="Blockchain development illustration"
                    fill
                    className="object-cover scale-105"
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"
                    quality={85}
                    onError={() => setImageError(true)}
                    onLoad={() => console.log('Image loaded successfully')}
                  />
                  {/* animated shimmer sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center z-10 bg-gradient-to-br from-[var(--amber-glow)] to-[var(--emerald-glow)]">
                  <div className="text-center p-4 md:p-8">
                    <div className="text-5xl md:text-8xl mb-3 md:mb-4 animate-float">⛓️</div>
                    <p className="text-[var(--text-primary)] font-medium text-sm md:text-base">Blockchain Development</p>
                    <p className="text-[var(--text-muted)] text-xs md:text-sm">Web3 Solutions</p>
                  </div>
                </div>
              )}

              <div className="absolute -inset-0.5 rounded-xl md:rounded-2xl bg-gradient-to-r from-[var(--amber-glow)] via-transparent to-[var(--emerald-glow)] opacity-50 blur-sm z-0" />
            </div>

            {/* Floating professional icon badges — mobile optimized */}
            <div className="pointer-events-none absolute inset-0 z-20">
              {/* Hide some icons on mobile, show fewer */}
              {/* Block / cube — upper left */}
              <div className="absolute left-[2%] sm:left-[4%] md:left-[6%] top-[6%] sm:top-[8%] md:top-[10%] animate-float-a hidden xs:block">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-11 md:w-11 items-center justify-center rounded-lg md:rounded-xl border border-white/20 bg-[var(--bg-surface)]/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--amber-base)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px] md:w-[22px] md:h-[22px]">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <path d="m3.3 7 8.7 5 8.7-5" />
                    <path d="M12 22V12" />
                  </svg>
                </div>
              </div>

              {/* Network / distributed nodes — upper right */}
              <div className="absolute right-[2%] sm:right-[4%] md:right-[8%] top-[10%] sm:top-[12%] md:top-[16%] animate-float-b hidden xs:block">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-11 md:w-11 items-center justify-center rounded-lg md:rounded-xl border border-white/20 bg-[var(--bg-surface)]/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-base,_#10b981)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px] md:w-[22px] md:h-[22px]">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <path d="M8.6 10.6 15.4 6.4M8.6 13.4l6.8 4.2" />
                  </svg>
                </div>
              </div>

              {/* Shield / security & compliance — mid left - Hidden on very small screens */}
              <div className="absolute left-[1%] md:left-[2%] top-1/2 -translate-y-1/2 animate-float-c hidden sm:block">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-lg md:rounded-xl border border-white/20 bg-[var(--bg-surface)]/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--amber-base)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px]">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
              </div>

              {/* Smart contract / code doc — mid right */}
              <div className="absolute right-[2%] sm:right-[3%] top-[42%] sm:top-[44%] md:top-[46%] animate-float-d hidden sm:block">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-11 md:w-11 items-center justify-center rounded-lg md:rounded-xl border border-white/20 bg-[var(--bg-surface)]/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-base,_#10b981)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px] md:w-[22px] md:h-[22px]">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                    <path d="M14 2v6h6" />
                    <path d="m10 13-2 2 2 2M14 13l2 2-2 2" />
                  </svg>
                </div>
              </div>

              {/* Wallet — lower left - Hidden on very small screens */}
              <div className="absolute left-[6%] sm:left-[10%] md:left-[14%] bottom-[4%] sm:bottom-[6%] md:bottom-[8%] animate-float-e hidden sm:block">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-11 md:w-11 items-center justify-center rounded-lg md:rounded-xl border border-white/20 bg-[var(--bg-surface)]/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--amber-base)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px] md:w-[22px] md:h-[22px]">
                    <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5Z" />
                    <path d="M16 12h5" />
                    <circle cx="17" cy="12" r="1" fill="var(--amber-base)" />
                  </svg>
                </div>
              </div>

              {/* Chain / link — lower right */}
              <div className="absolute right-[6%] sm:right-[10%] md:right-[16%] bottom-[4%] sm:bottom-[5%] md:bottom-[6%] animate-float-f hidden sm:block">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 md:h-11 md:w-11 items-center justify-center rounded-lg md:rounded-xl border border-white/20 bg-[var(--bg-surface)]/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-base,_#10b981)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[18px] sm:h-[18px] md:w-[22px] md:h-[22px]">
                    <path d="M9 17H7A5 5 0 0 1 7 7h2" />
                    <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                </div>
              </div>

              {/* Database / ledger — center-ish - Smaller on mobile */}
              <div className="absolute left-1/2 top-[4%] sm:top-[5%] md:top-[6%] -translate-x-1/2 animate-float-g hidden xs:block">
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-white/20 bg-[var(--bg-surface)]/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--amber-base)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="sm:w-[16px] sm:h-[16px] md:w-[20px] md:h-[20px]">
                    <ellipse cx="12" cy="5" rx="8" ry="3" />
                    <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
                    <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar - Mobile responsive - FIXED overflow */}
      <div className="relative mt-8 md:mt-16 w-full overflow-hidden border-t border-[var(--border-default)] bg-[var(--bg-surface)]/30 py-3 md:py-4 backdrop-blur-sm">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...trustItems, ...trustItems].map((item, index) => (
            <span key={index} className="flex items-center gap-2 md:gap-3 px-3 md:px-4 text-[10px] md:text-sm text-[var(--text-secondary)] font-medium shrink-0">
              <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-[var(--amber-base)]/60 shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll to Top Button - Mobile responsive */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 group flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[var(--amber-base)] text-white shadow-glow transition-all duration-500 hover:scale-110 hover:shadow-glow-strong ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-20 scale-75 opacity-0"
        }`}
        aria-label="Scroll to top"
      >
        <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 transition-all duration-300 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
        <span className="absolute inset-0 rounded-full border-2 border-[var(--amber-base)]/30 animate-ping-slow" />
        <span className="absolute inset-0 rounded-full border-2 border-[var(--amber-base)]/20 animate-ping-slow animation-delay-1000" />
      </button>
    </section>
  );
}