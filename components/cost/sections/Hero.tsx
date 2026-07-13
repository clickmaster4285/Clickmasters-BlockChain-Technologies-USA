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
    <section className="relative w-full overflow-visible bg-gradient-to-b from-[var(--bg-base)] via-[var(--bg-surface)] to-[var(--bg-base)] pb-0">
      <div className="pointer-events-none absolute inset-0 -top-24 md:-top-28 bg-hex-light opacity-60" />
      <div className="pointer-events-none absolute -top-64 right-[-10%] h-[420px] w-[420px] rounded-full bg-[var(--amber-glow)] blur-3xl animate-orb" />
      <div className="pointer-events-none absolute top-1/3 left-[-14%] h-[360px] w-[360px] rounded-full bg-[var(--emerald-glow)] blur-3xl animate-orb animation-delay-2000" />

      <div className="site-container relative mx-auto px-4">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 max-w-4xl text-left">
            <RevealOnScroll effect="slide-left">
              <div className="mt-6 mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-amber)] bg-[var(--amber-glow)] px-4 py-1.5 text-xs font-mono uppercase tracking-[0.18em] text-[var(--amber-dim)]">
                {meta.primaryKeyword}
              </div>
            </RevealOnScroll>

            <RevealOnScroll effect="slide-left" delay={100}>
              <h1 className="text-balance font-display text-4xl font-bold leading-[1.08] text-[var(--text-primary)] md:text-5xl lg:text-6xl">
                {h1}
              </h1>
            </RevealOnScroll>

            {h2 && (
              <RevealOnScroll effect="slide-left" delay={200}>
                <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
                  {h2}
                </p>
              </RevealOnScroll>
            )}

            {lead && (
              <RevealOnScroll effect="slide-left" delay={300}>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
                  {lead}
                </p>
              </RevealOnScroll>
            )}

            <RevealOnScroll effect="pop-bounce" delay={400}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#book-a-call"
                  className="cta-btn group inline-flex items-center gap-2 rounded-full bg-[var(--amber-base)] px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
                >
                  Book a Free Strategy Call
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Image - taller, with floating blockchain graphics around it */}
          <div className="relative flex-1 lg:flex-none lg:w-[45%] py-6 md:py-10">
            <div className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/4.2] w-full overflow-hidden rounded-2xl shadow-2xl bg-[var(--bg-surface)]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--amber-glow)] via-transparent to-[var(--emerald-glow)] z-10" />
              <div className="absolute -inset-4 bg-gradient-to-r from-[var(--amber-glow)] via-transparent to-[var(--emerald-glow)] blur-3xl z-0 animate-pulse-slow" />

              {!imageError ? (
                <div className="relative w-full h-full z-10 overflow-hidden rounded-2xl">
                  <Image
                    src="/media/hero.jpg"
                    alt="Blockchain development illustration"
                    fill
                    className="object-cover scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, 45vw"
                    quality={90}
                    onError={() => setImageError(true)}
                    onLoad={() => console.log('Image loaded successfully')}
                  />
                  {/* animated shimmer sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center z-10 bg-gradient-to-br from-[var(--amber-glow)] to-[var(--emerald-glow)]">
                  <div className="text-center p-8">
                    <div className="text-8xl mb-4 animate-float">⛓️</div>
                    <p className="text-[var(--text-primary)] font-medium">Blockchain Development</p>
                    <p className="text-[var(--text-muted)] text-sm">Web3 Solutions</p>
                  </div>
                </div>
              )}

              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[var(--amber-glow)] via-transparent to-[var(--emerald-glow)] opacity-50 blur-sm z-0" />
            </div>

            {/* Floating professional icon badges — distributed across the whole image */}
            <div className="pointer-events-none absolute inset-0 z-20">
              {/* Block / cube — upper left area */}
              <div className="absolute left-[6%] top-[10%] animate-float-a">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-[var(--bg-surface)]/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber-base)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <path d="m3.3 7 8.7 5 8.7-5" />
                    <path d="M12 22V12" />
                  </svg>
                </div>
              </div>

              {/* Network / distributed nodes — upper right */}
              <div className="absolute right-[8%] top-[16%] animate-float-b">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-[var(--bg-surface)]/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-base,_#10b981)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <path d="M8.6 10.6 15.4 6.4M8.6 13.4l6.8 4.2" />
                  </svg>
                </div>
              </div>

              {/* Shield / security & compliance — mid left */}
              <div className="absolute left-[2%] top-1/2 -translate-y-1/2 animate-float-c">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-[var(--bg-surface)]/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--amber-base)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
              </div>

              {/* Smart contract / code doc — mid right */}
              <div className="absolute right-[3%] top-[46%] animate-float-d">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-[var(--bg-surface)]/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-base,_#10b981)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                    <path d="M14 2v6h6" />
                    <path d="m10 13-2 2 2 2M14 13l2 2-2 2" />
                  </svg>
                </div>
              </div>

              {/* Wallet — lower left */}
              <div className="absolute left-[14%] bottom-[8%] animate-float-e">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-[var(--bg-surface)]/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber-base)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5Z" />
                    <path d="M16 12h5" />
                    <circle cx="17" cy="12" r="1" fill="var(--amber-base)" />
                  </svg>
                </div>
              </div>

              {/* Chain / link — lower right */}
              <div className="absolute right-[16%] bottom-[6%] animate-float-f">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-[var(--bg-surface)]/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--emerald-base,_#10b981)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 17H7A5 5 0 0 1 7 7h2" />
                    <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                </div>
              </div>

              {/* Database / ledger — center-ish, subtle, largest float radius */}
              <div className="absolute left-1/2 top-[6%] -translate-x-1/2 animate-float-g">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[var(--bg-surface)]/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--amber-base)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
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

      {/* Trust Bar */}
      <div className="relative mt-16 w-full overflow-hidden border-t border-[var(--border-default)] bg-[var(--bg-surface)]/30 py-4 backdrop-blur-sm">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...trustItems, ...trustItems].map((item, index) => (
            <span key={index} className="flex items-center gap-3 px-4 text-sm text-[var(--text-secondary)] font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--amber-base)]/60" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 group flex h-14 w-14 items-center justify-center rounded-full bg-[var(--amber-base)] text-white shadow-glow transition-all duration-500 hover:scale-110 hover:shadow-glow-strong ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-20 scale-75 opacity-0"
        }`}
        aria-label="Scroll to top"
      >
        <svg className="h-6 w-6 transition-all duration-300 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
        <span className="absolute inset-0 rounded-full border-2 border-[var(--amber-base)]/30 animate-ping-slow" />
        <span className="absolute inset-0 rounded-full border-2 border-[var(--amber-base)]/20 animate-ping-slow animation-delay-1000" />
      </button>
    </section>
  );
}