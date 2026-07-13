"use client";

import type { CostSection } from "@/lib/cost-type";
import type { CSSProperties } from "react";
import { parseCostContent, cleanInlineMarks } from "@/lib/parse-cost-content";
import SectionShell from "@/components/cost/SectionShell";
import RevealOnScroll from "@/components/cost/RevealOnScroll";
import RevealGroup from "@/components/cost/RevealGroup";
import { useState, useMemo } from "react";

/**
 * Pricing table section — animation identity: UNFOLD + ROW CASCADE
 * The header fans open from the left edge; table rows sweep in one after
 * another like dealt cards, each carrying its own --row-i stagger delay.
 */
export default function PricingTableSection({
  section,
  index,
}: {
  section: CostSection;
  index: number;
}) {
  const parsed = parseCostContent(section.content, section.bullets ?? []);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // Check if table exists and has data
  const hasTable = parsed.table && parsed.table.headers && parsed.table.headers.length > 0;

  // Filter out empty columns and rows
  const filteredTable = useMemo(() => {
    if (!parsed.table || !parsed.table.headers || parsed.table.headers.length === 0) {
      return null;
    }

    // Find which columns have data (not empty)
    const columnHasData = parsed.table.headers.map((_, colIndex) => {
      return parsed.table!.rows.some(row => {
        const cell = row[colIndex];
        return cell && cell.trim() !== '' && cell.trim() !== '-' && cell.trim() !== '—';
      });
    });

    // Filter headers and rows to only include columns with data
    const filteredHeaders = parsed.table.headers.filter((_, colIndex) => columnHasData[colIndex]);
    
    const filteredRows = parsed.table.rows.map(row => {
      return row.filter((_, colIndex) => columnHasData[colIndex]);
    });

    // Filter out rows that are completely empty after column filtering
    const nonEmptyRows = filteredRows.filter(row => 
      row.some(cell => cell && cell.trim() !== '' && cell.trim() !== '-' && cell.trim() !== '—')
    );

    if (filteredHeaders.length === 0 || nonEmptyRows.length === 0) {
      return null;
    }

    return {
      headers: filteredHeaders,
      rows: nonEmptyRows,
    };
  }, [parsed.table]);

  const hasAdditionalInfo = (parsed.plainBullets && parsed.plainBullets.length > 0) || 
                           (parsed.labelBlocks && parsed.labelBlocks.length > 0);

  // Parse additional info items for better display
  const getAdditionalInfoItems = () => {
    const items = [
      ...(parsed.labelBlocks || []).map((b) => ({
        label: b.label,
        description: b.description,
      })),
      ...(parsed.plainBullets || []).map((b) => ({
        label: "Feature",
        description: b,
      })),
    ];
    return items;
  };

  const additionalItems = getAdditionalInfoItems();

  return (
    <SectionShell 
      tone="surface" 
      eyebrow="" 
      className="bg-gradient-to-b from-slate-100 via-white to-slate-50"
    >
      {/* Animated background elements - Only background changed */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200/10 blur-3xl" />
        
        {/* Cross dots pattern */}
        <div className="absolute inset-0 bg-cross-dots opacity-20" />
        
        {/* Floating particles */}
        <div className="absolute top-[15%] left-[8%] h-2 w-2 rounded-full bg-amber-400/30 animate-float" />
        <div className="absolute top-[25%] right-[12%] h-3 w-3 rounded-full bg-emerald-400/20 animate-float animation-delay-1000" />
        <div className="absolute bottom-[30%] left-[20%] h-2.5 w-2.5 rounded-full bg-purple-400/20 animate-float animation-delay-2000" />
        <div className="absolute top-[70%] right-[18%] h-2 w-2 rounded-full bg-amber-400/30 animate-float animation-delay-1500" />
      </div>

      <div className="w-full">
        {/* Header Section with Eyebrow */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            {/* Eyebrow with number */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-600 font-semibold">
                {`0${index + 1} · Pricing`}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-amber-400/30 to-transparent" />
            </div>
            
            {parsed.h2 && (
              <RevealOnScroll effect="unfold">
                <div className="flex items-center gap-3">
                  <span className="h-10 w-1 rounded-full bg-gradient-to-b from-amber-500 to-amber-400" />
                  <h2 className="text-balance font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
                    {parsed.h2}
                  </h2>
                </div>
              </RevealOnScroll>
            )}
            {parsed.intro && (
              <RevealOnScroll effect="slide-left" delay={100}>
                <p className="max-w-3xl text-pretty text-sm leading-relaxed text-slate-600 md:text-base">
                  {cleanInlineMarks(parsed.intro)}
                </p>
              </RevealOnScroll>
            )}
          </div>
          
          {/* Optional filter/badge */}
          <RevealOnScroll effect="pop-bounce" delay={150}>
            <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/80 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-medium text-amber-600">2025 Pricing</span>
            </div>
          </RevealOnScroll>
        </div>

        {/* Table Section - with filtered data (unchanged) */}
        {filteredTable && filteredTable.headers.length > 0 && (
          <RevealGroup className="relative overflow-hidden rounded-2xl border border-border-default bg-bg-surface/30 backdrop-blur-sm shadow-2xl">
            {/* Table header gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-base/5 via-transparent to-emerald-base/5 opacity-50" />
            
            {/* Decorative corner elements */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-amber-base/5 blur-2xl" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-emerald-base/5 blur-2xl" />

            <div className="relative overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="relative bg-gradient-to-r from-amber-base/95 via-amber-base to-amber-base/95">
                    {filteredTable.headers.map((h, i) => (
                      <th 
                        key={i} 
                        className={`relative whitespace-nowrap px-4 py-4 font-display text-xs font-semibold uppercase tracking-wider text-white ${
                          i === 0 ? "pl-6" : ""
                        } ${i === filteredTable.headers.length - 1 ? "pr-6" : ""}`}
                      >
                        <span className="flex items-center gap-2">
                          {cleanInlineMarks(h)}
                          {i === filteredTable.headers.length - 1 && (
                            <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-[8px] font-bold uppercase">
                              USD
                            </span>
                          )}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredTable.rows.map((row, ri) => {
                    const isHovered = hoveredRow === ri;
                    return (
                      <tr
                        key={ri}
                        className={`reveal-row relative border-t border-border-default transition-all duration-300 ${
                          ri % 2 === 0 ? "bg-bg-surface/30" : "bg-bg-base/30"
                        } ${
                          isHovered 
                            ? "bg-gradient-to-r from-amber-glow/20 via-transparent to-emerald-glow/20 scale-[1.01]" 
                            : "hover:bg-amber-glow/10"
                        }`}
                        style={{ 
                          "--row-i": ri,
                          transitionDelay: `${ri * 50}ms`
                        } as CSSProperties}
                        onMouseEnter={() => setHoveredRow(ri)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        {row.map((cell, ci) => {
                          // Check if this cell contains a number (for pricing)
                          const isPrice = /\$/.test(cell);
                          const isTimeline = /weeks|month|day|hour/i.test(cell);
                          
                          return (
                            <td
                              key={ci}
                              className={`px-4 py-4 transition-all duration-300 ${
                                ci === 0
                                  ? "font-medium text-text-primary"
                                  : isPrice
                                  ? "font-mono text-[13px] font-semibold text-amber-base"
                                  : isTimeline
                                  ? "font-mono text-[13px] text-emerald-base"
                                  : "font-mono text-[13px] text-text-secondary"
                              } ${isHovered && ci === 0 ? "text-amber-base" : ""}`}
                            >
                              <span className={`flex items-center gap-2 ${
                                isHovered && ci === 0 ? "translate-x-1" : ""
                              }`}>
                                {ci === 0 && (
                                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-mono font-semibold transition-all duration-300 ${
                                    isHovered 
                                      ? "bg-amber-base text-white shadow-glow" 
                                      : "bg-bg-elevated text-text-muted"
                                  }`}>
                                    {String(ri + 1).padStart(2, "0")}
                                  </span>
                                )}
                                {cleanInlineMarks(cell)}
                                {ci === row.length - 1 && isPrice && (
                                  <span className="ml-1 text-[10px] text-emerald-base">↗</span>
                                )}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table footer with summary */}
            {filteredTable.rows.length > 0 && (
              <div className="relative border-t border-border-default bg-bg-surface/50 px-6 py-3">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-base" />
                      Best value
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
                      Most popular
                    </span>
                  </div>
                  <div className="text-xs text-text-muted">
                    * All prices in USD • Updated for 2025
                  </div>
                </div>
              </div>
            )}
          </RevealGroup>
        )}

        {/* Fallback when no table data */}
        {!filteredTable && (
          <div className="rounded-2xl border border-border-default bg-bg-surface/30 p-8 text-center backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <span className="text-4xl">📊</span>
              <p className="text-text-secondary">Pricing information coming soon...</p>
              <p className="text-xs text-text-muted">Check back later for detailed pricing</p>
            </div>
          </div>
        )}

        {/* Additional Info - Redesigned with cards (unchanged) */}
        {hasAdditionalInfo && additionalItems.length > 0 && (
          <RevealOnScroll effect="slide-left" delay={150}>
            <div className="group relative mt-8 overflow-hidden rounded-2xl border border-border-amber/30 bg-gradient-to-br from-amber-glow/5 via-transparent to-emerald-glow/5 p-6 backdrop-blur-sm transition-all duration-500 hover:border-border-amber hover:shadow-glow">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-base/5 via-transparent to-emerald-base/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              
              <div className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-glow/20">
                    <span className="text-lg">💡</span>
                  </div>
                  <h4 className="text-sm font-semibold text-amber-base">Key Insights</h4>
                </div>
                
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {additionalItems.map((item, idx) => {
                    const featureMatch = item.description.match(/^([^:]+):\s*\+?\$([\d,]+)–?\$?([\d,]+)?/);
                    const featureName = featureMatch ? featureMatch[1].trim() : item.label;
                    const priceLow = featureMatch ? featureMatch[2] : null;
                    const priceHigh = featureMatch ? featureMatch[3] : null;
                    
                    if (!priceLow) {
                      return (
                        <div 
                          key={idx}
                          className="flex items-start gap-2 rounded-lg border border-border-default/50 bg-bg-surface/30 px-4 py-3 transition-all duration-300 hover:border-amber-base/20 hover:bg-amber-glow/5"
                        >
                          <span className="mt-0.5 text-amber-base">✦</span>
                          <span className="text-sm text-text-secondary">{item.description}</span>
                        </div>
                      );
                    }
                    
                    return (
                      <div 
                        key={idx}
                        className="group/feature relative overflow-hidden rounded-lg border border-border-default/50 bg-bg-surface/30 px-4 py-3 transition-all duration-300 hover:border-amber-base/30 hover:bg-amber-glow/10 hover:shadow-glow-sm"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-base/5 via-transparent to-emerald-base/5 opacity-0 transition-opacity duration-500 group-hover/feature:opacity-100" />
                        
                        <div className="relative flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <span className="text-sm font-medium text-text-primary">
                              {featureName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="whitespace-nowrap font-mono text-sm font-semibold text-amber-base">
                              ${priceLow}
                              {priceHigh && ` – $${priceHigh}`}
                            </span>
                            {!priceHigh && (
                              <span className="text-xs text-emerald-base">+</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-amber-base to-amber-light transition-all duration-500 group-hover/feature:w-full" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </SectionShell>
  );
}