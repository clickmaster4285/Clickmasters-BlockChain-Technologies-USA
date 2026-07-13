"use client";

import type { CostSection } from "@/lib/cost-type";
import type { CSSProperties } from "react";
import { cleanInlineMarks } from "@/lib/parse-cost-content";
import SectionShell from "@/components/cost/SectionShell";
import RevealOnScroll from "@/components/cost/RevealOnScroll";
import RevealGroup from "@/components/cost/RevealGroup";
import { useState } from "react";

interface Group {
  label: string;
  items: string[];
  isList: boolean;
}

function groupBullets(labels: string[], bullets: string[]): Group[] {
  const groups: Group[] = labels.map((label) => ({ label, items: [], isList: false }));
  let labelIndex = 0;
  let mode: "closed" | "single" | "list" = "closed";

  const looksLikeListFragment = (b: string) =>
    b.length < 90 && (/\$[\d,]/.test(b) || /^[A-Za-z0-9 .()×+/-]{2,60}:\s?\$?/.test(b));

  for (const raw of bullets) {
    const isDash = /^-\s+/.test(raw);
    const text = raw.replace(/^-\s+/, "");

    if (isDash) {
      if (groups[labelIndex]?.items.length) labelIndex = Math.min(labelIndex + 1, groups.length - 1);
      groups[labelIndex]?.items.push(text);
      groups[labelIndex].isList = true;
      mode = "list";
      continue;
    }

    if (mode === "list" && looksLikeListFragment(text)) {
      groups[labelIndex]?.items.push(text);
      continue;
    }

    if (groups[labelIndex]?.items.length) labelIndex = Math.min(labelIndex + 1, groups.length - 1);
    groups[labelIndex]?.items.push(text);
    mode = "single";
  }

  return groups.filter((g) => g.items.length > 0);
}

/**
 * Case study — animation identity: SLIDE-LEFT TIMELINE + DRAWING RAIL
 * Each milestone slides in from the left; the connecting vertical rail
 * scales open from the top down as the group enters view.
 */
export default function CaseStudySection({
  section,
  index,
}: {
  section: CostSection;
  index: number;
}) {
  const h2 = section.content.match(/#{1,3}\s*H2:\s*(.+)/)?.[1]?.trim();
  const labels = Array.from(section.content.matchAll(/\*\*([^*][^*]*?)\*(?!\*)/g))
    .map((m) => m[1].trim())
    .filter((l) => !/^H[12]:/.test(l));

  const groups = groupBullets(labels, section.bullets ?? []);
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);

  // Remove "Case Study" from h2 if it starts with it
  const cleanH2 = h2 ? h2.replace(/^Case\s*Study\s*/i, '').trim() : '';

  return (
    <SectionShell 
      tone="surface" 
      eyebrow={`0${index} · Case Study`} 
      className="relative overflow-hidden bg-gradient-to-b from-bg-base via-bg-surface/30 to-bg-base"
    >
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-amber-glow/10 blur-3xl animate-orb" />
        <div className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-emerald-glow/10 blur-3xl animate-orb animation-delay-2000" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-glow/5 blur-3xl animate-orb animation-delay-4000" />
        
        {/* Hex grid pattern */}
        <div className="absolute inset-0 bg-hex-light opacity-20" />
        
        {/* Floating particles */}
        <div className="absolute top-[10%] left-[5%] h-2 w-2 rounded-full bg-amber-base/30 animate-float" />
        <div className="absolute top-[30%] right-[10%] h-3 w-3 rounded-full bg-emerald-base/20 animate-float animation-delay-1000" />
        <div className="absolute bottom-[20%] left-[15%] h-2.5 w-2.5 rounded-full bg-amber-base/25 animate-float animation-delay-2000" />
        <div className="absolute top-[60%] right-[20%] h-2 w-2 rounded-full bg-emerald-base/20 animate-float animation-delay-1500" />
        <div className="absolute bottom-[30%] right-[5%] h-1.5 w-1.5 rounded-full bg-amber-base/30 animate-float animation-delay-2500" />
      </div>

      <div className="w-full">
        {/* Header Section - Only ONE heading with cleaned h2 */}
        {cleanH2 && (
          <RevealOnScroll effect="blast-in">
            <div className="relative mb-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-1 rounded-full bg-gradient-to-b from-amber-base to-amber-light" />
                <div>
                  <h2 className="text-balance font-display text-3xl font-semibold text-text-primary md:text-4xl lg:text-5xl">
                    {cleanInlineMarks(cleanH2)}
                  </h2>
                </div>
              </div>
              
              {/* Decorative glow behind header */}
              <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-amber-base/5 blur-2xl" />
            </div>
          </RevealOnScroll>
        )}

        {/* Timeline Cards */}
        <RevealGroup className="relative mt-8 space-y-6">
          {groups.map((g, i) => {
            const isHovered = hoveredGroup === i;
            return (
              <div 
                key={i} 
                className={`group relative transition-all duration-500 ${
                  isHovered ? "scale-[1.02]" : "scale-100"
                }`}
                onMouseEnter={() => setHoveredGroup(i)}
                onMouseLeave={() => setHoveredGroup(null)}
              >
                {/* Glow effect on hover */}
                <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-base/10 via-emerald-base/10 to-amber-base/10 opacity-0 blur-xl transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : ""
                }`} />
                
                <div className="relative flex gap-6 pb-8 last:pb-0">
                  {/* Timeline connector */}
                  <div className="flex flex-col items-center">
                    <div className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                      isHovered 
                        ? "bg-gradient-to-br from-amber-base to-amber-light shadow-glow scale-110" 
                        : "bg-gradient-to-br from-amber-base/20 to-amber-light/10 border-2 border-amber-base/30"
                    }`}>
                      <span className={`font-display text-sm font-bold transition-all duration-500 ${
                        isHovered ? "text-white" : "text-amber-base"
                      }`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      
                      {/* Pulsing ring */}
                      {isHovered && (
                        <span className="absolute inset-0 rounded-full border-2 border-amber-base/30 animate-ping-slow" />
                      )}
                    </div>
                    
                    {i < groups.length - 1 && (
                      <div className={`timeline-rail relative mt-1 w-0.5 flex-1 transition-all duration-500 ${
                        isHovered ? "bg-gradient-to-b from-amber-base to-emerald-base" : "bg-border-hover"
                      }`}>
                        {/* Animated progress dot */}
                        <div className={`absolute left-1/2 -translate-x-1/2 h-2 w-2 rounded-full transition-all duration-500 ${
                          isHovered ? "bg-amber-base shadow-glow" : "bg-border-hover"
                        }`} />
                      </div>
                    )}
                  </div>

                  {/* Content Card */}
                  <div
                    className={`reveal-row flex-1 pt-1 transition-all duration-500 ${
                      isHovered ? "translate-x-2" : "translate-x-0"
                    }`}
                    style={{ "--row-i": i } as CSSProperties}
                  >
                    <div className={`relative overflow-hidden rounded-xl border transition-all duration-500 ${
                      isHovered 
                        ? "border-amber-base/30 bg-gradient-to-br from-amber-glow/10 via-transparent to-emerald-glow/10 shadow-glow" 
                        : "border-border-default bg-bg-surface/50 hover:border-border-hover"
                    }`}>
                      {/* Animated gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-r from-amber-base/5 via-transparent to-emerald-base/5 transition-opacity duration-500 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`} />
                      
                      <div className="relative p-5 md:p-6">
                        {/* Header with label */}
                        <div className="flex items-center justify-between">
                          <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-emerald-dim">
                            <span className="text-lg">✦</span>
                            {cleanInlineMarks(g.label.replace(/:$/, ""))}
                          </h3>
                          {g.isList && (
                            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-all duration-300 ${
                              isHovered 
                                ? "bg-amber-base/20 text-amber-base" 
                                : "bg-bg-elevated text-text-muted"
                            }`}>
                              {g.items.length} items
                            </span>
                          )}
                        </div>

                        {g.isList ? (
                          <div className="mt-3 space-y-2">
                            {g.items.map((it, j) => {
                              const isTotal = /^\*\*.*Total.*\*\*$/.test(it) || /^total:/i.test(it);
                              const parts = it.split(":");
                              const label = parts[0]?.trim() || "";
                              const value = parts.slice(1).join(":").trim() || "";
                              const isPrice = /\$/.test(value);
                              
                              return (
                                <div
                                  key={j}
                                  className={`group/item flex items-start justify-between gap-4 rounded-lg px-3 py-2.5 transition-all duration-300 ${
                                    isTotal
                                      ? "bg-gradient-to-r from-amber-base/10 to-amber-light/5 border border-amber-base/20"
                                      : isHovered 
                                        ? "bg-bg-surface/50 hover:bg-amber-glow/5" 
                                        : "bg-bg-surface/30"
                                  } ${isHovered ? "hover:translate-x-1" : ""}`}
                                >
                                  <span className={`flex-1 text-sm ${
                                    isTotal 
                                      ? "font-semibold text-text-primary" 
                                      : "text-text-secondary"
                                  }`}>
                                    {cleanInlineMarks(label)}
                                  </span>
                                  {value && (
                                    <span className={`whitespace-nowrap font-mono text-sm font-semibold transition-all duration-300 ${
                                      isPrice 
                                        ? "text-amber-base" 
                                        : isTotal
                                        ? "text-text-primary"
                                        : "text-text-secondary"
                                    }`}>
                                      {cleanInlineMarks(value)}
                                      {isPrice && !isTotal && (
                                        <span className="ml-1 text-[10px] text-emerald-base">↗</span>
                                      )}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className={`mt-3 text-sm leading-relaxed transition-all duration-300 ${
                            isHovered ? "text-text-primary" : "text-text-secondary"
                          }`}>
                            {cleanInlineMarks(g.items.join(" "))}
                          </p>
                        )}
                        
                        {/* Animated bottom bar */}
                        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-base via-amber-light to-emerald-base transition-all duration-700 ${
                          isHovered ? "w-full" : "w-0"
                        }`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </RevealGroup>

        {/* Bottom CTA */}
        <RevealOnScroll effect="pop-bounce" delay={300}>
          <div className="mt-12 flex justify-center">
            <div className="group relative overflow-hidden rounded-2xl border border-border-amber/30 bg-gradient-to-br from-amber-glow/10 via-transparent to-emerald-glow/5 px-8 py-5 text-center backdrop-blur-sm transition-all duration-500 hover:border-border-amber hover:shadow-glow">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-base/5 via-transparent to-emerald-base/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="relative">
                <p className="text-sm text-text-secondary">
                  Ready to start your project?{" "}
                  <a href="#book-a-call" className="font-medium text-amber-base transition-all duration-300 hover:underline hover:text-amber-light">
                    Book a free consultation
                  </a>
                </p>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-amber-base/60" />
                  <span className="text-xs text-text-muted">Get a tailored timeline and budget</span>
                  <span className="h-1 w-1 rounded-full bg-amber-base/60" />
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </SectionShell>
  );
}