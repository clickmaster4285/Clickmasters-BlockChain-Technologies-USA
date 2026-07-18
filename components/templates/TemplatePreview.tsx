"use client";

import { useState } from "react";
import { Check, Copy, FileText, Sparkles } from "lucide-react";

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

export default function TemplatePreview({ item }: { item: any }) {
  const [copied, setCopied] = useState(false);

  const itemTitle =
    item?.title || item?.meta?.title || "Blockchain Project Template";

  const sectionDescription = String(
    item?.sections?.[0]?.content || item?.sections?.[0]?.heading || "",
  )
    .replace(/[#*_`>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const itemDescription =
    item?.excerpt ||
    item?.description ||
    item?.hero?.description ||
    sectionDescription ||
    "A structured template for planning, documenting, and executing blockchain initiatives.";

  const rawPreviewSections: PreviewSection[] =
    item?.preview ||
    item?.content?.filter(
      (block: any) =>
        block?.type === "heading" ||
        block?.type === "paragraph" ||
        block?.type === "list",
    ) ||
    item?.sections ||
    [];

  const fallbackPreviewSections: PreviewSection[] = [
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
  ];

  const previewSections: PreviewSection[] =
    rawPreviewSections.length > 0
      ? rawPreviewSections.reduce(
          (sections: PreviewSection[], section: any) => {
            const title =
              section.title ||
              section.heading ||
              (section.type !== "paragraph" ? section.text : "");
            const text =
              section.description ||
              section.content ||
              (section.type === "paragraph" ? section.text : "") ||
              "";
            const isParagraphOnly =
              section.type === "paragraph" &&
              !section.title &&
              !section.heading;

            if (isParagraphOnly && sections.length > 0) {
              const previous = sections[sections.length - 1];
              previous.description = [previous.description, text]
                .filter(Boolean)
                .join(" ");

              return sections;
            }

            sections.push({
              title: title || `Section ${sections.length + 1}`,
              description: isParagraphOnly
                ? text
                : section.description || section.content,
              items: section.items,
            });

            return sections;
          },
          [],
        )
      : fallbackPreviewSections;

  const previewText = previewSections
    .map((section: PreviewSection) => {
      const title = section.title || section.heading || section.text || "";

      const description = section.description || "";

      const items = Array.isArray(section.items)
        ? section.items
            .map((entry) =>
              typeof entry === "string"
                ? entry
                : `${entry.title || ""} ${
                    entry.description || entry.text || ""
                  }`,
            )
            .join("\n")
        : "";

      return [title, description, items].filter(Boolean).join("\n");
    })
    .join("\n\n");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        previewText ||
          item?.excerpt ||
          item?.description ||
          itemTitle ||
          "Blockchain template",
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
      className="group/preview relative isolate overflow-hidden rounded-[2rem] border border-border-default bg-bg-surface/90 md:rounded-[2.5rem]"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(100,116,139,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.055)_1px,transparent_1px)] bg-[size:34px_34px] opacity-50" />

      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-base/12 blur-[90px] transition-transform duration-1000 group-hover/preview:scale-110" />

      <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-emerald-base/6 blur-[90px]" />

      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-amber-base/80 to-transparent" />

      {/* Header */}
      <div className="relative flex flex-col gap-5 border-b border-border-default bg-bg-base/55 px-5 py-6 sm:px-7 md:flex-row md:items-center md:justify-between md:px-9">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
            <FileText className="h-6 w-6" />
          </span>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
              Live Preview
            </p>

            <h2 className="mt-1 text-2xl font-black text-text-primary md:text-3xl">
              Template Structure
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-black transition-all duration-300 ${
            copied
              ? "border-emerald-base/30 bg-emerald-base/10 text-emerald-base"
              : "border-border-default bg-bg-base text-text-secondary hover:-translate-y-0.5 hover:border-amber-base/30 hover:bg-amber-base/[0.06] hover:text-amber-base"
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

      <div className="relative p-5 sm:p-7 md:p-9">
        {/* Main document preview */}
        <div className="relative mx-auto max-w-5xl">
          <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-amber-base/5 blur-2xl opacity-0 transition-opacity duration-500 group-hover/preview:opacity-100" />

          <article className="relative overflow-hidden rounded-[1.8rem] border border-border-default bg-gradient-to-br from-bg-base to-bg-surface p-5 sm:p-7 md:p-9">
            {/* Document top */}
            <div className="flex flex-col gap-4 border-b border-border-default pb-7 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-amber-base">
                  <Sparkles className="h-3.5 w-3.5" />
                  Professional Template
                </div>

                <h3 className="mt-4 max-w-2xl text-2xl font-black leading-tight text-text-primary md:text-3xl">
                  {itemTitle}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-text-secondary">
                  {itemDescription}
                </p>
              </div>

              <div className="rounded-2xl border border-border-default bg-bg-base px-4 py-3">
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-text-muted">
                  Format
                </p>

                <p className="mt-1 text-sm font-black text-amber-base">
                  {item?.format || item?.fileType || "Document"}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["Sections", previewSections.length || "Complete"],
                ["Format", item?.format || item?.fileType || "Document"],
                ["Status", "Ready to customize"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-border-default bg-bg-base px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-base/30"
                >
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-text-muted">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-black text-text-primary">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Sections */}
            <div className="mt-8 space-y-5">
              {previewSections.map((section: PreviewSection, index: number) => {
                const title =
                  section.title || section.heading || `Section ${index + 1}`;

                const description = section.description || section.text;

                return (
                  <section
                    id={`template-section-${index}`}
                    key={`${title}-${index}`}
                    className="group/section relative overflow-hidden rounded-[1.4rem] border border-border-default bg-bg-base p-5 transition-all duration-400 hover:-translate-y-1 hover:border-amber-base/30 hover:bg-amber-base/[0.04] sm:p-6"
                  >
                    <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-amber-base/0 blur-3xl transition-all duration-500 group-hover/section:bg-amber-base/10" />

                    <div className="relative">
                      <div className="flex items-start gap-4">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-xs font-black text-amber-base transition-all duration-400 group-hover/section:rotate-3 group-hover/section:bg-amber-base group-hover/section:text-[#101827]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="min-w-0 flex-1">
                          <h4 className="text-lg font-black text-text-primary transition-colors group-hover/section:text-amber-base">
                            {title}
                          </h4>

                          {description && (
                            <p className="mt-3 text-sm leading-7 text-text-secondary">
                              {description}
                            </p>
                          )}

                          {Array.isArray(section.items) &&
                            section.items.length > 0 && (
                              <div className="mt-4 grid gap-3">
                                {section.items.map((entry, itemIndex) => {
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
                                      className="rounded-xl border border-border-default bg-bg-surface p-4"
                                    >
                                      <p className="text-sm font-bold text-text-primary">
                                        {itemTitle}
                                      </p>

                                      {itemDescription && (
                                        <p className="mt-2 text-xs leading-6 text-text-secondary">
                                          {itemDescription}
                                        </p>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>

            {/* Document footer */}
            <div className="mt-8 flex flex-col gap-3 border-t border-border-default pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
              <span>Ready to customize for your project.</span>

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
