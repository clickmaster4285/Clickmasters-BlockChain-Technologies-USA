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

export default function ToolContent({
  item,
  cta,
}: {
  item: any;
  cta: any;
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

          {blocks.map((block: any, index: number) => {
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
                  <h3
                    key={index}
                    className="text-xl font-black leading-tight text-text-primary sm:text-2xl"
                  >
                    {block.text}
                  </h3>
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

            <h3 className="mt-1 text-xl font-black text-text-primary sm:text-2xl">
              {block.title}
            </h3>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {(block.items || []).map(
          (listItem: any, itemIndex: number) => {
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
                className="group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-bg-base/45 p-[1px] transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-base/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
              >
                {/* Hover gradient border */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-amber-base/50 via-transparent to-amber-base/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative overflow-hidden rounded-[calc(1.4rem-1px)] bg-gradient-to-br from-bg-base via-bg-base to-surface/60 p-5 sm:p-6">
                  {/* Moving glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-amber-base/0 blur-3xl transition-all duration-700 group-hover:bg-amber-base/15 group-hover:scale-125" />

                  <div className="relative flex items-start gap-4">
                    {/* Number */}
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-sm font-black text-amber-base transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 group-hover:border-amber-base group-hover:bg-amber-base group-hover:text-bg-base group-hover:shadow-[0_12px_35px_rgba(245,158,11,0.2)]">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      {itemTitle && (
                        <h4 className="text-base font-black text-text-primary transition-colors duration-300 group-hover:text-amber-base sm:text-lg">
                          {itemTitle}
                        </h4>
                      )}

                      <p
                        className={`text-sm leading-7 text-silver transition-colors duration-300 group-hover:text-silver-light md:text-base ${
                          itemTitle ? "mt-2" : ""
                        }`}
                      >
                        {itemDescription}
                      </p>
                    </div>

                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-amber-base opacity-60 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100" />
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );

              case "list":
  return (
    <section key={index} className="relative">
      {block.title && (
        <div className="mb-6 flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#334155] bg-[#172033] text-amber-base shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
            <ListChecks className="h-6 w-6" />
          </span>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
              Key Details
            </p>

            <h3 className="mt-1 text-xl font-black text-white sm:text-2xl">
              {block.title}
            </h3>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {(block.items || []).map(
          (listItem: any, itemIndex: number) => {
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
                className="group relative overflow-hidden rounded-[1.5rem] border border-[#273449] bg-[#101827] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#f59e0b]/50 hover:shadow-[0_24px_65px_rgba(0,0,0,0.4)]"
              >
                {/* Subtle hover glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#3b82f6]/0 blur-3xl transition-all duration-700 group-hover:bg-[#3b82f6]/10" />

                <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-amber-base/0 blur-3xl transition-all duration-700 group-hover:bg-amber-base/8" />

                {/* Hover top line */}
                <div className="pointer-events-none absolute inset-x-8 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-amber-base to-transparent transition-transform duration-700 group-hover:scale-x-100" />

                <div className="relative flex items-start gap-4 p-5 sm:p-6">
                  {/* Number */}
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#334155] bg-[#182235] text-sm font-black text-[#fbbf24] transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 group-hover:border-amber-base group-hover:bg-amber-base group-hover:text-[#111827] group-hover:shadow-[0_12px_30px_rgba(245,158,11,0.22)]">
                    {String(itemIndex + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex-1">
                    {itemTitle && (
                      <h4 className="text-base font-black text-white transition-colors duration-300 group-hover:text-[#fbbf24] sm:text-lg">
                        {itemTitle}
                      </h4>
                    )}

                    <p
                      className={`text-sm leading-7 text-[#aab6c8] transition-colors duration-300 group-hover:text-[#d7deea] md:text-base ${
                        itemTitle ? "mt-2" : ""
                      }`}
                    >
                      {itemDescription}
                    </p>
                  </div>

                  <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#334155] bg-[#172033] text-[#94a3b8] transition-all duration-300 group-hover:border-amber-base group-hover:bg-amber-base group-hover:text-[#111827]">
                    <CheckCircle2 className="h-4 w-4" />
                  </span>
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

            <h3 className="mt-1 text-xl font-black text-white sm:text-2xl">
              {block.title}
            </h3>
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
              (row: any[], rowIndex: number) => (
                <tr
                  key={rowIndex}
                  className={`group transition-all duration-300 hover:bg-[#172033] ${
                    rowIndex % 2 === 0
                      ? "bg-[#101827]"
                      : "bg-[#131c2c]"
                  }`}
                >
                  {row.map((cell: any, cellIndex: number) => (
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
          (row: any[], rowIndex: number) => (
            <article
              key={rowIndex}
              className="group relative overflow-hidden rounded-[1.4rem] border border-[#273449] bg-[#101827] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/40 hover:shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
            >
              <div className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-amber-base/0 blur-3xl transition-all duration-500 group-hover:bg-amber-base/10" />

              <div className="relative space-y-4">
                {row.map((cell: any, cellIndex: number) => {
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
                      <h3 className="mt-3 text-xl font-black text-text-primary">
                        {block.title}
                      </h3>
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