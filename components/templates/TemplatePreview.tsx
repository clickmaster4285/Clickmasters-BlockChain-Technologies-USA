"use client";

import { useState } from "react";
import {
  Check,
  ChevronRight,
  Copy,
  FileText,
  Layers3,
  Sparkles,
} from "lucide-react";

type PreviewSection = {
  title?: string;
  heading?: string;
  description?: string;
  text?: string;
  items?: Array<
    | string
    | {
        title?: string;
        description?: string;
        text?: string;
      }
  >;
};

export default function TemplatePreview({
  item,
}: {
  item: any;
}) {
  const [copied, setCopied] = useState(false);

  const previewSections: PreviewSection[] =
    item?.preview ||
    item?.sections ||
    item?.content?.filter(
      (block: any) =>
        block?.type === "heading" ||
        block?.type === "paragraph" ||
        block?.type === "list"
    ) ||
    [];

  const previewText = previewSections
    .map((section: PreviewSection) => {
      const title =
        section.title ||
        section.heading ||
        section.text ||
        "";

      const description =
        section.description || "";

      const items = Array.isArray(section.items)
        ? section.items
            .map((entry) =>
              typeof entry === "string"
                ? entry
                : `${entry.title || ""} ${
                    entry.description ||
                    entry.text ||
                    ""
                  }`
            )
            .join("\n")
        : "";

      return [title, description, items]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n\n");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        previewText ||
          item?.excerpt ||
          item?.description ||
          item?.title ||
          "Blockchain template"
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      id="template"
      className="group/preview relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1524] shadow-[0_30px_100px_rgba(0,0,0,0.42)] md:rounded-[2.5rem]"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.016)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.016)_1px,transparent_1px)] bg-[size:34px_34px] opacity-40" />

      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-base/12 blur-[90px] transition-transform duration-1000 group-hover/preview:scale-110" />

      <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-blue-500/8 blur-[90px]" />

      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-amber-base/80 to-transparent" />

      {/* Header */}
      <div className="relative flex flex-col gap-5 border-b border-white/10 bg-white/[0.025] px-5 py-6 sm:px-7 md:flex-row md:items-center md:justify-between md:px-9">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
            <FileText className="h-6 w-6" />
          </span>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
              Live Preview
            </p>

            <h2 className="mt-1 text-2xl font-black text-white md:text-3xl">
              Template Structure
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-black transition-all duration-300 ${
            copied
              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
              : "border-white/10 bg-white/[0.04] text-[#d7deea] hover:-translate-y-0.5 hover:border-amber-base/30 hover:bg-amber-base/[0.06] hover:text-amber-base"
          }`}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Structure
            </>
          )}
        </button>
      </div>

      <div className="relative grid gap-8 p-5 sm:p-7 md:p-9 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* Left navigation */}
        <aside className="space-y-3">
          <div className="mb-4 flex items-center gap-3">
            <Layers3 className="h-5 w-5 text-amber-base" />

            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#91a0b6]">
              Included Sections
            </p>
          </div>

          {(previewSections.length
            ? previewSections
            : [
                { title: "Project Overview" },
                { title: "Requirements" },
                { title: "Execution Plan" },
                { title: "Risks & Assumptions" },
              ]
          )
            .slice(0, 8)
            .map((section: PreviewSection, index: number) => {
              const label =
                section.title ||
                section.heading ||
                section.text ||
                `Section ${index + 1}`;

              return (
                <a
                  key={`${label}-${index}`}
                  href={`#template-section-${index}`}
                  className="group/item flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-base/30 hover:bg-amber-base/[0.05]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-base/10 text-[10px] font-black text-amber-base transition-all duration-300 group-hover/item:bg-amber-base group-hover/item:text-[#101827]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="truncate text-sm font-bold text-[#c8d1df] transition-colors group-hover/item:text-amber-base">
                      {label}
                    </span>
                  </div>

                  <ChevronRight className="h-4 w-4 shrink-0 text-[#68778e] transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:text-amber-base" />
                </a>
              );
            })}
        </aside>

        {/* Main document preview */}
        <div className="relative">
          <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-amber-base/5 blur-2xl opacity-0 transition-opacity duration-500 group-hover/preview:opacity-100" />

          <article className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-gradient-to-br from-[#142036] to-[#0f1828] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.3)] sm:p-7 md:p-9">
            {/* Document top */}
            <div className="flex flex-col gap-4 border-b border-white/10 pb-7 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-amber-base">
                  <Sparkles className="h-3.5 w-3.5" />
                  Professional Template
                </div>

                <h3 className="mt-4 max-w-2xl text-2xl font-black leading-tight text-white md:text-3xl">
                  {item?.title || "Blockchain Project Template"}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#aab6c8]">
                  {item?.excerpt ||
                    item?.description ||
                    item?.hero?.description ||
                    "A structured template for planning, documenting, and executing blockchain initiatives."}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#7f8da3]">
                  Format
                </p>

                <p className="mt-1 text-sm font-black text-amber-base">
                  {item?.format ||
                    item?.fileType ||
                    "Document"}
                </p>
              </div>
            </div>

            {/* Sections */}
            <div className="mt-8 space-y-5">
              {(previewSections.length
                ? previewSections
                : [
                    {
                      title: "Project Overview",
                      description:
                        "Define the project background, objectives, users, and intended outcomes.",
                    },
                    {
                      title: "Requirements",
                      description:
                        "Document functional, technical, security, and compliance requirements.",
                    },
                    {
                      title: "Execution Plan",
                      description:
                        "Outline milestones, owners, dependencies, timelines, and delivery stages.",
                    },
                    {
                      title: "Risks & Assumptions",
                      description:
                        "Record major technical risks, business assumptions, and mitigation actions.",
                    },
                  ]
              ).map(
                (
                  section: PreviewSection,
                  index: number
                ) => {
                  const title =
                    section.title ||
                    section.heading ||
                    `Section ${index + 1}`;

                  const description =
                    section.description ||
                    section.text;

                  return (
                    <section
                      id={`template-section-${index}`}
                      key={`${title}-${index}`}
                      className="group/section relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#101a2b] p-5 transition-all duration-400 hover:-translate-y-1 hover:border-amber-base/30 hover:shadow-[0_18px_55px_rgba(0,0,0,0.28)] sm:p-6"
                    >
                      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-amber-base/0 blur-3xl transition-all duration-500 group-hover/section:bg-amber-base/10" />

                      <div className="relative">
                        <div className="flex items-start gap-4">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-xs font-black text-amber-base transition-all duration-400 group-hover/section:rotate-3 group-hover/section:bg-amber-base group-hover/section:text-[#101827]">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className="min-w-0 flex-1">
                            <h4 className="text-lg font-black text-white transition-colors group-hover/section:text-amber-base">
                              {title}
                            </h4>

                            {description && (
                              <p className="mt-3 text-sm leading-7 text-[#aab6c8]">
                                {description}
                              </p>
                            )}

                            {Array.isArray(section.items) &&
                              section.items.length > 0 && (
                                <div className="mt-4 grid gap-3">
                                  {section.items.map(
                                    (entry, itemIndex) => {
                                      const itemTitle =
                                        typeof entry === "string"
                                          ? entry
                                          : entry.title ||
                                            entry.text ||
                                            `Item ${itemIndex + 1}`;

                                      const itemDescription =
                                        typeof entry === "string"
                                          ? null
                                          : entry.description;

                                      return (
                                        <div
                                          key={`${itemTitle}-${itemIndex}`}
                                          className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
                                        >
                                          <p className="text-sm font-bold text-[#d7deea]">
                                            {itemTitle}
                                          </p>

                                          {itemDescription && (
                                            <p className="mt-2 text-xs leading-6 text-[#91a0b6]">
                                              {itemDescription}
                                            </p>
                                          )}
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </section>
                  );
                }
              )}
            </div>

            {/* Document footer */}
            <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-[#7f8da3] sm:flex-row sm:items-center sm:justify-between">
              <span>
                Ready to customize for your project.
              </span>

              <span className="font-black text-amber-base">
                ClickMasters Template
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}