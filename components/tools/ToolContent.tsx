import {
  CheckCircle2,
  Code2,
  Info,
  Lightbulb,
  ListChecks,
  Quote,
  Sparkles,
  Wrench,
} from "lucide-react";
import ToolCTA from "./ToolCTA";
import type { ContentBlock, ContentListEntry, ResolvedCta } from "@/lib/content-types";
import type { ToolData } from "@/lib/tools";

export default function ToolContent({
  item,
  cta,
}: {
  item: ToolData;
  cta: ResolvedCta;
}) {
  const blocks = item?.content || [];

  return (
    <article className="space-y-10">
      {/* Top CTA */}
      <ToolCTA
        compact
        cta={cta}
        title="Need help using this tool?"
        description="Talk with our experts and get practical guidance before applying the results to your blockchain project."
      />

      {/* Main content */}
      <section
        id="tool"
        className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface/80 shadow-[0_24px_80px_rgba(0,0,0,0.22)] md:rounded-[2rem]"
      >
        {/* Header */}
        <div className="relative border-b border-white/10 bg-gradient-to-r from-amber-base/10 via-white/[0.03] to-transparent px-5 py-5 sm:px-6 md:px-10">
          <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-base/10 blur-3xl" />

          <div className="relative flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
              <Wrench className="h-5 w-5" />
            </span>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-base">
                Tool Workspace
              </p>

              <h2 className="mt-1 text-xl font-black text-text-primary sm:text-2xl">
                Use, understand, and apply the results
              </h2>
            </div>
          </div>
        </div>

        <div className="space-y-8 p-4 sm:p-6 md:p-10">
          {/* Intro */}
          {(item?.excerpt ||
            item?.description ||
            item?.hero?.description) && (
            <div className="rounded-3xl border border-amber-base/20 bg-amber-base/10 p-6 md:p-7">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amber-base/10 text-amber-base">
                  <Lightbulb className="h-5 w-5" />
                </span>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                    Tool Overview
                  </p>

                  <p className="mt-3 text-base leading-8 text-silver md:text-lg">
                    {item.excerpt ||
                      item.description ||
                      item.hero?.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          {blocks.map((block: ContentBlock, index: number) => {
            switch (block.type) {
              case "featuredAnswer":
              case "result":
                return (
                  <div
                    key={index}
                    className="rounded-3xl border border-amber-base/20 bg-amber-base/10 p-6 md:p-7"
                  >
                    <div className="flex items-start gap-4">
                      <Sparkles className="mt-1 h-6 w-6 shrink-0 text-amber-base" />

                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                          Key Result
                        </p>

                        <p className="mt-3 text-base leading-8 text-silver md:text-lg">
                          {block.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );

              case "heading":
                return (
                  <h2
                    key={index}
                    className="border-l-4 border-amber-base pl-4 text-2xl font-black leading-tight text-text-primary sm:text-3xl"
                  >
                    {block.text}
                  </h2>
                );

              case "subheading":
                return (
                  <h2
                    key={index}
                    className="text-xl font-black leading-tight text-text-primary sm:text-2xl"
                  >
                    {block.text}
                  </h2>
                );

              case "paragraph":
                return (
                  <p
                    key={index}
                    className="text-base leading-8 text-silver md:text-lg"
                  >
                    {block.text}
                  </p>
                );

              case "note":
              case "info":
                return (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-bg-base/55 p-6"
                  >
                    <div className="flex items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-amber-base/10 text-amber-base">
                        <Info className="h-5 w-5" />
                      </span>

                      <p className="text-sm leading-7 text-silver md:text-base">
                        {block.text}
                      </p>
                    </div>
                  </div>
                );

              case "quote":
                return (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-bg-base/60 p-6 md:p-7"
                  >
                    <Quote className="mb-4 h-8 w-8 text-amber-base" />

                    <p className="text-base italic leading-8 text-silver md:text-lg">
                      {block.text}
                    </p>
                  </div>
                );

              case "list":
  return (
    <section key={index} className="relative">
      {block.title && (
        <div className="mb-6 flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base shadow-[0_12px_30px_rgba(245,158,11,0.08)]">
            <ListChecks className="h-6 w-6" />
          </span>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
              Key Details
            </p>

            <h2 className="mt-1 text-xl font-black text-text-primary sm:text-2xl">
              {block.title}
            </h2>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {(block.items || []).map(
          (listItem: ContentListEntry, itemIndex: number) => {
            const itemTitle =
              typeof listItem === "string"
                ? null
                : listItem?.title;

            const itemDescription =
              typeof listItem === "string"
                ? listItem
                : listItem?.description ||
                  listItem?.text ||
                  listItem?.title;

            return (
              <div
                key={`${itemDescription}-${itemIndex}`}
                className="checklist-card"
              >
                <div className="checklist-card__inner">
                  <div className="checklist-card__row">
                    <span className="checklist-card__num">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      {itemTitle && (
                        <h2 className="checklist-card__title">{itemTitle}</h2>
                      )}

                      <p className={`checklist-card__text${itemTitle ? " mt-2" : ""}`}>
                        {itemDescription}
                      </p>
                    </div>

                    <span className="checklist-card__check" aria-hidden="true" />
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );

              case "table":
  return (
    <section key={index} className="relative">
      {block.title && (
        <div className="mb-5 flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#334155] bg-[#172033] text-amber-base shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
            <ListChecks className="h-6 w-6" />
          </span>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
              Comparison Data
            </p>

            <h2 className="mt-1 text-xl font-black text-white sm:text-2xl">
              {block.title}
            </h2>
          </div>
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-[1.5rem] border border-[#273449] bg-[#101827] shadow-[0_24px_70px_rgba(0,0,0,0.28)] md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-[#182235] via-[#1b263a] to-[#182235]">
              {(block.columns || []).map(
                (column: string, columnIndex: number) => (
                  <th
                    key={`${column}-${columnIndex}`}
                    className="border-b border-[#334155] px-5 py-4 text-left text-xs font-black uppercase tracking-[0.16em] text-[#fbbf24]"
                  >
                    {column}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {(block.rows || []).map(
              (row: string[], rowIndex: number) => (
                <tr
                  key={rowIndex}
                  className={`group transition-all duration-300 hover:bg-[#172033] ${
                    rowIndex % 2 === 0
                      ? "bg-[#101827]"
                      : "bg-[#131c2c]"
                  }`}
                >
                  {row.map((cell: string, cellIndex: number) => (
                    <td
                      key={cellIndex}
                      className={`border-b border-[#273449] px-5 py-4 align-top text-sm leading-7 transition-colors duration-300 ${
                        cellIndex === 0
                          ? "font-bold text-white group-hover:text-[#fbbf24]"
                          : "text-[#aab6c8] group-hover:text-[#d7deea]"
                      }`}
                    >
                      {String(cell)}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile card layout */}
      <div className="grid gap-4 md:hidden">
        {(block.rows || []).map(
          (row: string[], rowIndex: number) => (
            <article
              key={rowIndex}
              className="group relative overflow-hidden rounded-[1.4rem] border border-[#273449] bg-[#101827] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/40 hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
            >
              <div className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-amber-base/0 blur-3xl transition-all duration-500 group-hover:bg-amber-base/10" />

              <div className="relative space-y-4">
                {row.map((cell: string, cellIndex: number) => {
                  const label =
                    block.columns?.[cellIndex] ||
                    `Field ${cellIndex + 1}`;

                  return (
                    <div
                      key={cellIndex}
                      className={`rounded-2xl border p-4 ${
                        cellIndex === 0
                          ? "border-amber-base/25 bg-amber-base/10"
                          : "border-white/10 bg-[#151f31]"
                      }`}
                    >
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-base">
                        {label}
                      </p>

                      <p
                        className={`mt-2 text-sm leading-7 ${
                          cellIndex === 0
                            ? "font-black text-white"
                            : "text-[#c2ccda]"
                        }`}
                      >
                        {String(cell)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );

              case "codeBlock":
              case "code":
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-bg-base"
                  >
                    <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                      <Code2 className="h-4 w-4" />
                      {block.title || "Example"}
                    </div>

                    <pre className="max-w-full overflow-x-auto p-4 text-xs leading-6 text-silver sm:p-6 sm:text-sm">
                      <code>{block.code || block.text}</code>
                    </pre>
                  </div>
                );

              case "example":
                return (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-amber-base/5 p-6"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                      Example
                    </p>

                    {block.title && (
                      <h2 className="mt-3 text-xl font-black text-text-primary">
                        {block.title}
                      </h2>
                    )}

                    <p className="mt-3 text-sm leading-7 text-silver md:text-base">
                      {block.text ||
                        block.description}
                    </p>
                  </div>
                );

              default:
                if (!block?.text) return null;

                return (
                  <p
                    key={index}
                    className="text-base leading-8 text-silver md:text-lg"
                  >
                    {block.text}
                  </p>
                );
            }
          })}
        </div>
      </section>

    </article>
  );
}