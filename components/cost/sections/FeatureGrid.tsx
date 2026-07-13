"use client";

import type { CostSection } from "@/lib/cost-type";
import { parseCostContent, cleanInlineMarks } from "@/lib/parse-cost-content";
import SectionShell from "@/components/cost/SectionShell";
import RevealOnScroll from "@/components/cost/RevealOnScroll";
import { useState } from "react";

/**
 * Feature/driver grid — animation identity: POP-BOUNCE
 * Cards spring into place with an overshoot bounce, staggered left-to-right,
 * top-to-bottom. Dotted-cross background distinguishes it from every other
 * card-grid section on the page.
 */
export default function FeatureGridSection({
  section,
  index,
}: {
  section: CostSection;
  index: number;
}) {
  const parsed = parseCostContent(section.content, section.bullets ?? []);
  const items = parsed.labelBlocks;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Colors for card accents
  const accentColors = [
    "from-amber-500/20 to-amber-400/5",
    "from-emerald-500/20 to-emerald-400/5",
    "from-purple-500/20 to-purple-400/5",
    "from-rose-500/20 to-rose-400/5",
    "from-blue-500/20 to-blue-400/5",
    "from-teal-500/20 to-teal-400/5",
  ];

  // Icons for each card
  const icons = ["⚡", "🔗", "🛡️", "📊", "🚀", "💎", "🎯", "🔮"];

  return (
    <SectionShell 
      tone="base" 
      eyebrow="" 
      className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50"
    >
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl animate-orb" />
        <div className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl animate-orb animation-delay-2000" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200/10 blur-3xl animate-orb animation-delay-4000" />
        
        {/* Cross dots pattern */}
        <div className="absolute inset-0 bg-cross-dots opacity-20" />
        
        {/* Floating particles */}
        <div className="absolute top-[15%] left-[8%] h-2 w-2 rounded-full bg-amber-400/30 animate-float" />
        <div className="absolute top-[25%] right-[12%] h-3 w-3 rounded-full bg-emerald-400/20 animate-float animation-delay-1000" />
        <div className="absolute bottom-[30%] left-[20%] h-2.5 w-2.5 rounded-full bg-purple-400/20 animate-float animation-delay-2000" />
        <div className="absolute top-[70%] right-[18%] h-2 w-2 rounded-full bg-amber-400/30 animate-float animation-delay-1500" />
      </div>

      <div className="w-full">
        {/* Header Section - Eyebrow styled like Case Study */}
        <div className="mb-10">
          {parsed.h2 && (
            <RevealOnScroll effect="blast-in">
              <div>
                {/* Eyebrow with number and label on same line like "05 · CASE STUDY" */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-semibold">
                    {`0${index + 1} · Features`}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-amber-400/30 to-transparent" />
                </div>
                {/* Larger and bolder heading */}
                <h2 className="text-balance font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
                  {parsed.h2}
                </h2>
              </div>
            </RevealOnScroll>
          )}
          
          {parsed.intro && (
            <RevealOnScroll effect="slide-left" delay={90}>
              <p className="mt-4 max-w-3xl text-pretty text-sm leading-relaxed text-slate-600 md:text-base">
                {cleanInlineMarks(parsed.intro)}
              </p>
            </RevealOnScroll>
          )}
        </div>

        {/* Feature Grid - 3 columns on desktop */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const isHovered = hoveredIndex === i;
            const accent = accentColors[i % accentColors.length];
            const icon = icons[i % icons.length];
            
            return (
              <RevealOnScroll 
                key={i} 
                effect="pop-bounce" 
                delay={i * 90}
              >
                <div 
                  className={`group relative h-full overflow-hidden rounded-2xl border transition-all duration-500 ${
                    isHovered 
                      ? "border-amber-400/40 bg-gradient-to-br from-amber-50/80 via-white to-emerald-50/60 shadow-glow -translate-y-2" 
                      : "border-slate-200 bg-white/70 hover:border-slate-300 hover:shadow-soft hover:-translate-y-1"
                  }`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Animated gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                  
                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/0 transition-all duration-500 group-hover:from-white/10 group-hover:to-transparent" />
                  
                  {/* Corner shine */}
                  <div className={`absolute -right-32 -top-32 h-64 w-64 rotate-45 bg-gradient-to-br from-amber-400/10 to-transparent transition-all duration-700 ${
                    isHovered ? "opacity-100 translate-x-8 translate-y-8" : "opacity-0"
                  }`} />
                  
                  <div className="relative p-6">
                    {/* Top section with number and icon */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${
                          isHovered 
                            ? "bg-gradient-to-br from-amber-500 to-amber-400 shadow-glow scale-110" 
                            : "bg-amber-50"
                        }`}>
                          <span className={`text-xl transition-all duration-500 ${
                            isHovered ? "scale-110" : "scale-100"
                          }`}>
                            {icon}
                          </span>
                          
                          {/* Pulsing ring on hover */}
                          {isHovered && (
                            <span className="absolute inset-0 rounded-xl border-2 border-amber-400/30 animate-ping-slow" />
                          )}
                        </div>
                        
                        <div>
                          <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-mono font-semibold transition-all duration-300 ${
                            isHovered 
                              ? "bg-amber-100 text-amber-600" 
                              : "bg-slate-100 text-slate-400"
                          }`}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                      
                      {/* Decorative dot pattern */}
                      <div className="flex gap-1">
                        <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                          isHovered ? "bg-amber-400" : "bg-slate-200"
                        }`} />
                        <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 delay-100 ${
                          isHovered ? "bg-amber-400/60" : "bg-slate-200"
                        }`} />
                        <span className={`h-1.5 w-1.5 rounded-full transition-all duration-300 delay-200 ${
                          isHovered ? "bg-amber-400/30" : "bg-slate-200"
                        }`} />
                      </div>
                    </div>

                    {/* Title - made bolder */}
                    <h3 className={`mt-4 font-display text-base font-bold transition-all duration-300 ${
                      isHovered ? "text-amber-600" : "text-slate-800"
                    }`}>
                      {cleanInlineMarks(item.label)}
                    </h3>

                    {/* Description */}
                    <p className={`mt-2 text-sm leading-relaxed transition-all duration-300 ${
                      isHovered ? "text-slate-700" : "text-slate-500"
                    }`}>
                      {cleanInlineMarks(item.description)}
                    </p>

                    {/* Animated progress bar */}
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500 transition-all duration-700 ${
                      isHovered ? "w-full" : "w-0"
                    }`} />

                    {/* Hover glow line - top */}
                    <div className={`absolute top-0 right-0 h-0.5 bg-gradient-to-l from-amber-400/30 to-transparent transition-all duration-700 ${
                      isHovered ? "w-1/2" : "w-0"
                    }`} />
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Bottom section with bullets */}
        {parsed.plainBullets && parsed.plainBullets.length > 0 && (
          <RevealOnScroll effect="slide-up" delay={200}>
            <div className="mt-10 rounded-2xl border border-slate-200/50 bg-white/50 p-6 backdrop-blur-sm">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {parsed.plainBullets.map((b, i) => (
                  <RevealOnScroll key={i} as="div" effect="slide-left" delay={i * 60 + 200}>
                    <div className="group/bullet flex items-start gap-3 rounded-lg px-3 py-2 transition-all duration-300 hover:bg-amber-50/50">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-500 transition-all duration-300 group-hover/bullet:scale-110">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-sm text-slate-600 transition-all duration-300 group-hover/bullet:text-slate-800">
                        {cleanInlineMarks(b)}
                      </span>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </SectionShell>
  );
}