"use client";

import type { CostSection } from "@/lib/cost-type";
import type { CSSProperties } from "react";
import { parseCostContent, cleanInlineMarks } from "@/lib/parse-cost-content";
import SectionShell from "@/components/cost/SectionShell";
import RevealOnScroll from "@/components/cost/RevealOnScroll";
import RevealGroup from "@/components/cost/RevealGroup";
import { useState } from "react";

/**
 * Comparison section — Modern split layout with animated cards
 */
export default function ComparisonSection({
  section,
  index,
}: {
  section: CostSection;
  index: number;
}) {
  const parsed = parseCostContent(section.content, section.bullets ?? []);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Colors for different card styles
  const cardStyles = [
    { 
      bg: "from-amber-500 to-amber-600", 
      glow: "shadow-amber-500/20",
      border: "border-amber-200",
      text: "text-amber-600",
      label: "Best Value",
      lightBg: "bg-amber-50"
    },
    { 
      bg: "from-emerald-500 to-emerald-600", 
      glow: "shadow-emerald-500/20",
      border: "border-emerald-200",
      text: "text-emerald-600",
      label: "Most Popular",
      lightBg: "bg-emerald-50"
    },
    { 
      bg: "from-purple-500 to-purple-600", 
      glow: "shadow-purple-500/20",
      border: "border-purple-200",
      text: "text-purple-600",
      label: "Enterprise",
      lightBg: "bg-purple-50"
    },
  ];

  // Helper function to clean pipe symbols and convert to bullet points
  const cleanCardContent = (text: string) => {
    // Remove pipe symbols and split into array
    const parts = text.split('|').map(p => p.trim()).filter(p => p.length > 0);
    return parts;
  };

  // Parse the table data into meaningful comparison items
  const getComparisonItems = () => {
    if (!parsed.table || !parsed.table.rows) return [];
    
    return parsed.table.rows.map(row => {
      const feature = row[0] || "";
      const values = row.slice(1).map(v => v.trim());
      return { feature, values };
    });
  };

  const comparisonItems = getComparisonItems();

  return (
    <SectionShell 
      tone="elevated" 
      eyebrow={`0${index}`} 
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50"
    >
      {/* Animated background - Light and airy */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-amber-100/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-emerald-100/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-100/10 blur-3xl" />
        
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        {/* Floating particles */}
        <div className="absolute top-[15%] left-[8%] h-2 w-2 rounded-full bg-amber-300/30 animate-float" />
        <div className="absolute top-[30%] right-[12%] h-3 w-3 rounded-full bg-emerald-300/20 animate-float animation-delay-1000" />
        <div className="absolute bottom-[25%] left-[20%] h-2.5 w-2.5 rounded-full bg-purple-300/20 animate-float animation-delay-2000" />
        <div className="absolute top-[70%] right-[18%] h-2 w-2 rounded-full bg-amber-300/30 animate-float animation-delay-1500" />
      </div>

      <div className="w-full">
        {/* Header Section - Left aligned */}
        <div className="mb-12 text-left">
          {parsed.h2 && (
            <RevealOnScroll effect="blast-in">
              <div className="inline-block">
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-transparent" />
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600">
                    Compare Options
                  </span>
                </div>
                <h2 className="text-balance font-display text-3xl font-bold text-slate-800 md:text-4xl lg:text-5xl">
                  {parsed.h2}
                </h2>
              </div>
            </RevealOnScroll>
          )}
          
          {parsed.intro && (
            <RevealOnScroll effect="slide-up" delay={90}>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">
                {cleanInlineMarks(parsed.intro)}
              </p>
            </RevealOnScroll>
          )}
        </div>

        {/* Comparison Cards - Left aligned grid with bullet points */}
        {parsed.labelBlocks.length > 0 && (
          <div className="relative mt-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {parsed.labelBlocks.map((item, i) => {
                const isHovered = hoveredCard === i;
                const style = cardStyles[i % cardStyles.length];
                
                // Clean the label - remove pipe symbols
                const cleanLabel = item.label.replace(/\|/g, '').trim();
                
                // Clean the description - split by pipes into bullet points
                const bulletPoints = cleanCardContent(item.description);
                
                return (
                  <RevealOnScroll 
                    key={i} 
                    effect="pop-bounce" 
                    delay={i * 100}
                  >
                    <div 
                      className="relative h-full"
                      onMouseEnter={() => setHoveredCard(i)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Card glow */}
                      <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${style.bg} opacity-0 blur-xl transition-opacity duration-500 ${
                        isHovered ? "opacity-20" : "opacity-0"
                      }`} />
                      
                      <div className={`relative h-full rounded-2xl border ${style.border} ${style.lightBg} backdrop-blur-sm p-6 transition-all duration-500 ${
                        isHovered 
                          ? `-translate-y-2 shadow-2xl shadow-${style.bg}` 
                          : "hover:-translate-y-1 shadow-sm hover:shadow-xl"
                      }`}>
                        {/* Label badge */}
                        <div className={`absolute -top-3 right-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white bg-gradient-to-r ${style.bg}`}>
                          {style.label}
                        </div>
                        
                        {/* Icon */}
                        <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${style.bg} text-2xl text-white shadow-lg`}>
                          {i === 0 ? "⚡" : i === 1 ? "🔥" : "🏢"}
                        </div>
                        
                        {/* Title */}
                        <h3 className={`font-display text-xl font-bold text-slate-800`}>
                          {cleanInlineMarks(cleanLabel)}
                        </h3>
                        
                        {/* Description with bullet points */}
                        <div className="mt-3">
                          {bulletPoints.length > 1 ? (
                            <ul className="space-y-1.5">
                              {bulletPoints.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                                  <span>{cleanInlineMarks(point)}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm leading-relaxed text-slate-600 transition-colors duration-300">
                              {cleanInlineMarks(bulletPoints[0] || item.description)}
                            </p>
                          )}
                        </div>
                        
                        {/* Feature tags */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {["✓ Best in class", "✓ Premium support", "✓ Enterprise grade"].slice(0, i + 2).map((tag, idx) => (
                            <span key={idx} className="text-xs text-slate-500 bg-white/60 px-2.5 py-1 rounded-full border border-slate-200">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Animated border line */}
                        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${style.bg} transition-all duration-700 ${
                          isHovered ? "w-full" : "w-0"
                        }`} />
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        )}

        {/* Comparison Table - Left aligned */}
        {comparisonItems.length > 0 && (
          <RevealGroup className="mt-12 relative">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-lg">
              <div className="relative overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-gradient-to-r from-amber-50 to-emerald-50">
                      <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-700 pl-8 text-left">
                        Component
                      </th>
                      {parsed.table?.headers.slice(1).map((h, i) => (
                        <th key={i} className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-700 text-left">
                          {cleanInlineMarks(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonItems.map((item, ri) => {
                      const isTotal = item.feature.toLowerCase().includes('total');
                      const isTimeline = item.feature.toLowerCase().includes('timeline');
                      
                      return (
                        <tr
                          key={ri}
                          className={`reveal-row border-t border-slate-100 transition-all duration-300 ${
                            isTotal 
                              ? "bg-amber-50/50 hover:bg-amber-50" 
                              : isTimeline
                              ? "bg-emerald-50/30 hover:bg-emerald-50"
                              : "hover:bg-slate-50"
                          }`}
                          style={{ 
                            "--row-i": ri,
                            transitionDelay: `${ri * 50}ms`
                          } as CSSProperties}
                        >
                          <td className={`px-6 py-4 pl-8 font-medium text-left ${
                            isTotal ? "text-amber-700" : isTimeline ? "text-emerald-700" : "text-slate-700"
                          }`}>
                            {isTotal && <span className="mr-2">💰</span>}
                            {isTimeline && <span className="mr-2">⏱️</span>}
                            {cleanInlineMarks(item.feature)}
                          </td>
                          
                          {item.values.map((value, ci) => {
                            const isPrice = /\$/.test(value);
                            const isHighlight = value.includes('Best') || value.includes('Popular');
                            const isEmpty = !value || value === '-' || value === '—';
                            
                            return (
                              <td
                                key={ci}
                                className={`px-6 py-4 text-left transition-all duration-300 ${
                                  isPrice
                                    ? "font-mono text-[13px] font-semibold text-amber-600"
                                    : isHighlight
                                    ? "text-emerald-600 font-medium"
                                    : isTotal
                                    ? "font-semibold text-amber-700"
                                    : isTimeline
                                    ? "text-emerald-700 font-medium"
                                    : "text-slate-600"
                                }`}
                              >
                                {isEmpty ? (
                                  <span className="text-slate-300">—</span>
                                ) : (
                                  <span className="flex items-center gap-2">
                                    {isHighlight && (
                                      <span className="text-emerald-500">✦</span>
                                    )}
                                    {isPrice && (
                                      <span className="text-amber-500">$</span>
                                    )}
                                    {cleanInlineMarks(value)}
                                    {isPrice && (
                                      <span className="ml-1 text-[10px] text-emerald-500">↗</span>
                                    )}
                                  </span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table footer */}
              <div className="border-t border-slate-200 bg-slate-50/50 px-6 py-3">
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Best value
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Most popular
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                    Enterprise
                  </span>
                  <span className="ml-auto text-xs text-slate-500">
                    * All prices in USD • Updated for 2025
                  </span>
                </div>
              </div>
            </div>
          </RevealGroup>
        )}

        {/* Bottom CTA - Left aligned */}
        <RevealOnScroll effect="pop-bounce" delay={300}>
          <div className="mt-12">
            <div className="inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white/80 px-6 py-3 backdrop-blur-sm shadow-sm">
              <span className="text-sm text-slate-600">
                Need help choosing?
              </span>
              <a 
                href="#book-a-call" 
                className="group inline-flex items-center gap-2 text-sm font-semibold text-amber-600 transition-all duration-300 hover:text-amber-700"
              >
                Book a free consultation
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </SectionShell>
  );
}