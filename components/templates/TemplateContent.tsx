import {
  CheckCircle2,
  Code2,
  FileText,
  Info,
  Lightbulb,
  ListChecks,
  Quote,
  Sparkles,
} from "lucide-react";

import TemplatePreview from "./TemplatePreview";

export default function TemplateContent({
  item,
}: {
  item: any;
}) {
  const blocks = item?.content || [];

  return (
    <article className="min-w-0 space-y-10">
      {/* Interactive preview */}
      <TemplatePreview item={item} />

      {/* Main template guide */}
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1524] shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.014)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.014)_1px,transparent_1px)] bg-[size:36px_36px] opacity-40" />

        <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-amber-base/10 blur-[90px]" />

        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-amber-base/80 to-transparent" />

        {/* Header */}
        <div className="relative border-b border-white/10 bg-white/[0.025] px-5 py-6 sm:px-7 md:px-9">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
              <FileText className="h-6 w-6" />
            </span>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
                Template Guide
              </p>

              <h2 className="mt-1 text-2xl font-black text-white md:text-3xl">
                How to use this template
              </h2>
            </div>
          </div>
        </div>

        <div className="relative space-y-9 p-4 sm:p-6 md:p-9">
          {/* Intro card */}
          {(item?.excerpt ||
            item?.description ||
            item?.hero?.description) && (
            <div className="rounded-[1.5rem] border border-amber-base/20 bg-gradient-to-br from-amber-base/10 to-transparent p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
                  <Lightbulb className="h-5 w-5" />
                </span>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-base">
                    Template Overview
                  </p>

                  <p className="mt-3 text-sm leading-7 text-[#b7c2d2] md:text-base md:leading-8">
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
              case "summary":
                return (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-[1.5rem] border border-amber-base/25 bg-amber-base/[0.07] p-5 sm:p-6"
                  >
                    <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-amber-base/10 blur-3xl" />

                    <div className="relative flex items-start gap-4">
                      <Sparkles className="mt-1 h-6 w-6 shrink-0 text-amber-base" />

                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-base">
                          Key Summary
                        </p>

                        <p className="mt-3 text-sm leading-7 text-[#c7d0dd] md:text-base md:leading-8">
                          {block.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );

              case "heading":
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4"
                  >
                    <span className="mt-1 h-10 w-1 shrink-0 rounded-full bg-gradient-to-b from-amber-base to-amber-base/10" />

                    <h2 className="text-2xl font-black leading-tight text-white sm:text-3xl">
                      {block.text}
                    </h2>
                  </div>
                );

              case "subheading":
                return (
                  <h3
                    key={index}
                    className="text-xl font-black leading-tight text-white sm:text-2xl"
                  >
                    {block.text}
                  </h3>
                );

              case "paragraph":
                return (
                  <p
                    key={index}
                    className="text-sm leading-7 text-[#aab6c8] md:text-base md:leading-8"
                  >
                    {block.text}
                  </p>
                );

              case "info":
              case "note":
                return (
                  <div
                    key={index}
                    className="rounded-[1.4rem] border border-blue-400/20 bg-blue-400/[0.06] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
                        <Info className="h-5 w-5" />
                      </span>

                      <p className="text-sm leading-7 text-[#c0cbda] md:text-base">
                        {block.text}
                      </p>
                    </div>
                  </div>
                );

              case "quote":
                return (
                  <blockquote
                    key={index}
                    className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#121d30] p-6"
                  >
                    <Quote className="h-8 w-8 text-amber-base" />

                    <p className="mt-4 text-base italic leading-8 text-[#c7d0dd]">
                      {block.text}
                    </p>
                  </blockquote>
                );

              case "list":
                return (
                  <section key={index}>
                    {block.title && (
                      <div className="mb-6 flex items-center gap-4">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
                          <ListChecks className="h-6 w-6" />
                        </span>

                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
                            Included Details
                          </p>

                          <h3 className="mt-1 text-xl font-black text-white sm:text-2xl">
                            {block.title}
                          </h3>
                        </div>
                      </div>
                    )}

                    <div className="grid gap-4">
                      {(block.items || []).map(
                        (entry: any, itemIndex: number) => {
                          const title =
                            typeof entry === "string"
                              ? null
                              : entry?.title;

                          const description =
                            typeof entry === "string"
                              ? entry
                              : entry?.description ||
                                entry?.text ||
                                entry?.title;

                          return (
                            <div
                              key={`${description}-${itemIndex}`}
                              className="group relative overflow-hidden rounded-[1.4rem] border border-[#273449] bg-[#101827] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-amber-base/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.34)] sm:p-6"
                            >
                              <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-amber-base/0 blur-3xl transition-all duration-500 group-hover:bg-amber-base/10" />

                              <div className="relative flex items-start gap-4">
                                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#334155] bg-[#182235] text-xs font-black text-amber-base transition-all duration-400 group-hover:rotate-3 group-hover:border-amber-base group-hover:bg-amber-base group-hover:text-[#101827]">
                                  {String(itemIndex + 1).padStart(2, "0")}
                                </span>

                                <div className="min-w-0 flex-1">
                                  {title && (
                                    <h4 className="font-black text-white transition-colors group-hover:text-amber-base">
                                      {title}
                                    </h4>
                                  )}

                                  <p
                                    className={`text-sm leading-7 text-[#aab6c8] ${
                                      title ? "mt-2" : ""
                                    }`}
                                  >
                                    {description}
                                  </p>
                                </div>

                                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-amber-base" />
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </section>
                );

              case "steps":
                return (
                  <section key={index}>
                    {block.title && (
                      <div className="mb-7 flex items-center gap-4">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
                          <ListChecks className="h-6 w-6" />
                        </span>

                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
                            Step by Step
                          </p>

                          <h3 className="mt-1 text-xl font-black text-white sm:text-2xl">
                            {block.title}
                          </h3>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      {(block.items || []).map(
                        (step: any, stepIndex: number) => (
                          <div
                            key={stepIndex}
                            className="group relative overflow-hidden rounded-[1.5rem] border border-[#273449] bg-[#101827] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-amber-base/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.34)] sm:p-6"
                          >
                            <div className="relative flex items-start gap-4">
                              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#334155] bg-[#182235] text-sm font-black text-amber-base transition-all duration-400 group-hover:rotate-3 group-hover:border-amber-base group-hover:bg-amber-base group-hover:text-[#101827]">
                                {String(stepIndex + 1).padStart(2, "0")}
                              </span>

                              <div>
                                <h4 className="text-lg font-black text-white transition-colors group-hover:text-amber-base">
                                  {step.title ||
                                    `Step ${stepIndex + 1}`}
                                </h4>

                                <p className="mt-3 text-sm leading-7 text-[#aab6c8] md:text-base">
                                  {step.description ||
                                    step.text}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </section>
                );

              case "table":
                return (
                  <section key={index}>
                    {block.title && (
                      <h3 className="mb-5 text-xl font-black text-white sm:text-2xl">
                        {block.title}
                      </h3>
                    )}

                    {/* Desktop table */}
                    <div className="hidden overflow-hidden rounded-[1.5rem] border border-[#273449] bg-[#101827] md:block">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-[#182235]">
                            {(block.columns || []).map(
                              (
                                column: string,
                                columnIndex: number
                              ) => (
                                <th
                                  key={`${column}-${columnIndex}`}
                                  className="border-b border-[#334155] px-5 py-4 text-left text-xs font-black uppercase tracking-[0.15em] text-amber-base"
                                >
                                  {column}
                                </th>
                              )
                            )}
                          </tr>
                        </thead>

                        <tbody>
                          {(block.rows || []).map(
                            (
                              row: any[],
                              rowIndex: number
                            ) => (
                              <tr
                                key={rowIndex}
                                className="border-b border-[#273449] transition-colors hover:bg-[#172033]"
                              >
                                {row.map(
                                  (
                                    cell: any,
                                    cellIndex: number
                                  ) => (
                                    <td
                                      key={cellIndex}
                                      className={`px-5 py-4 text-sm leading-7 ${
                                        cellIndex === 0
                                          ? "font-bold text-white"
                                          : "text-[#aab6c8]"
                                      }`}
                                    >
                                      {String(cell)}
                                    </td>
                                  )
                                )}
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="grid gap-4 md:hidden">
                      {(block.rows || []).map(
                        (
                          row: any[],
                          rowIndex: number
                        ) => (
                          <article
                            key={rowIndex}
                            className="rounded-[1.4rem] border border-[#273449] bg-[#101827] p-5"
                          >
                            <div className="space-y-3">
                              {row.map(
                                (
                                  cell: any,
                                  cellIndex: number
                                ) => (
                                  <div
                                    key={cellIndex}
                                    className="rounded-xl border border-white/10 bg-[#151f31] p-4"
                                  >
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-base">
                                      {block.columns?.[
                                        cellIndex
                                      ] ||
                                        `Field ${
                                          cellIndex + 1
                                        }`}
                                    </p>

                                    <p className="mt-2 text-sm leading-7 text-[#d0d8e4]">
                                      {String(cell)}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </article>
                        )
                      )}
                    </div>
                  </section>
                );

              case "code":
              case "codeBlock":
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#080d16]"
                  >
                    <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.035] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                      <Code2 className="h-4 w-4" />
                      {block.title || "Template Example"}
                    </div>

                    <pre className="max-w-full overflow-x-auto p-5 text-xs leading-6 text-[#c5cfdd] sm:text-sm">
                      <code>
                        {block.code || block.text}
                      </code>
                    </pre>
                  </div>
                );

              case "example":
                return (
                  <div
                    key={index}
                    className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-[#152238] to-[#101827] p-6"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-base">
                      Example
                    </p>

                    {block.title && (
                      <h3 className="mt-3 text-xl font-black text-white">
                        {block.title}
                      </h3>
                    )}

                    <p className="mt-3 text-sm leading-7 text-[#aab6c8] md:text-base">
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
                    className="text-sm leading-7 text-[#aab6c8] md:text-base md:leading-8"
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