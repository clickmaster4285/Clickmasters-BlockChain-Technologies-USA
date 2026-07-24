// components/process/ProcessArticleContent.tsx

import {
  CheckCircle2,
  Copy,
  Lightbulb,
} from "lucide-react";

import type {
  ProcessContentBlock,
  ProcessHeadingBlock,
} from "@/lib/process";

/* =========================================================
   Types
========================================================= */

type ProcessArticleContentProps = {
  content: ProcessContentBlock[];
  className?: string;
};

/* =========================================================
   Helpers
========================================================= */

function createHeadingId(
  text: string,
): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getHeadingClasses(
  level: ProcessHeadingBlock["level"],
): string {
  switch (level) {
    case 3:
      return [
        "mt-9",
        "scroll-mt-32",
        "text-2xl",
        "font-black",
        "leading-tight",
        "tracking-[-0.025em]",
        "text-text-primary",
        "sm:text-3xl",
      ].join(" ");

    case 4:
      return [
        "mt-7",
        "scroll-mt-32",
        "text-xl",
        "font-black",
        "leading-tight",
        "tracking-[-0.02em]",
        "text-text-primary",
        "sm:text-2xl",
      ].join(" ");

    case 2:
    default:
      return [
        "mt-11",
        "scroll-mt-32",
        "border-t",
        "border-white/[0.08]",
        "pt-8",
        "text-3xl",
        "font-black",
        "leading-tight",
        "tracking-[-0.035em]",
        "text-text-primary",
        "sm:text-4xl",
      ].join(" ");
  }
}

/* =========================================================
   Featured Answer
========================================================= */

function FeaturedAnswer({
  text,
}: {
  text: string;
}) {
  return (
    <aside className="relative my-8 overflow-hidden rounded-[1.75rem] border border-amber-base/25 bg-amber-base/[0.055] p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-base/[0.12] blur-3xl" />

      <div className="relative flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-amber-base/25 bg-amber-base/[0.1] text-amber-base">
          <Lightbulb className="h-5 w-5" />
        </span>

        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-base">
            Featured Answer
          </p>

          <p className="mt-3 text-base font-medium leading-8 text-text-primary sm:text-lg">
            {text}
          </p>
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   Heading
========================================================= */

function ArticleHeading({
  block,
}: {
  block: ProcessHeadingBlock;
}) {
  const level = block.level ?? 2;
  const headingId = createHeadingId(
    block.text,
  );

  const classes =
    getHeadingClasses(level);

  if (level === 4) {
    return (
      <h4
        id={headingId}
        className={classes}
      >
        {block.text}
      </h4>
    );
  }

  if (level === 3) {
    return (
      <h3
        id={headingId}
        className={classes}
      >
        {block.text}
      </h3>
    );
  }

  return (
    <h2
      id={headingId}
      className={classes}
    >
      {block.text}
    </h2>
  );
}

/* =========================================================
   Paragraph
========================================================= */

function ArticleParagraph({
  text,
}: {
  text: string;
}) {
  return (
    <p className="mt-5 text-[15px] leading-8 text-silver sm:text-base sm:leading-8">
      {text}
    </p>
  );
}

/* =========================================================
   List
========================================================= */

function ArticleList({
  items,
}: {
  items: string[];
}) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5"
        >
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amber-base" />

          <span className="text-sm leading-7 text-silver sm:text-[15px]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* =========================================================
   Table
========================================================= */

function ArticleTable({
  headers,
  rows,
}: {
  headers?: string[];
  rows: string[][];
}) {
  const columnCount = Math.max(
    headers?.length ?? 0,
    ...rows.map((row) => row.length),
  );

  return (
    <div className="my-7 overflow-hidden rounded-[1.5rem] border border-white/[0.09] bg-surface">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          {headers &&
            headers.length > 0 && (
              <thead>
                <tr className="border-b border-white/[0.09] bg-amber-base/[0.07]">
                  {Array.from({
                    length: columnCount,
                  }).map((_, index) => (
                    <th
                      key={`header-${index}`}
                      scope="col"
                      className="min-w-[180px] px-5 py-4 text-[11px] font-black uppercase tracking-[0.14em] text-amber-base"
                    >
                      {headers[index] ??
                        ""}
                    </th>
                  ))}
                </tr>
              </thead>
            )}

          <tbody>
            {rows.map(
              (row, rowIndex) => (
                <tr
                  key={`row-${rowIndex}`}
                  className="border-b border-white/[0.07] last:border-b-0"
                >
                  {Array.from({
                    length: columnCount,
                  }).map(
                    (_, columnIndex) => (
                      <td
                        key={`cell-${rowIndex}-${columnIndex}`}
                        className="min-w-[180px] px-5 py-4 align-top text-sm leading-7 text-silver"
                      >
                        {row[columnIndex] ??
                          ""}
                      </td>
                    ),
                  )}
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================
   Code
========================================================= */

function ArticleCode({
  text,
  language,
}: {
  text: string;
  language?: string;
}) {
  return (
    <div className="my-9 overflow-hidden rounded-[1.5rem] border border-white/[0.1] bg-[#090b0f]">
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] bg-white/[0.025] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-base/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>

        <span className="text-[10px] font-black uppercase tracking-[0.16em] text-silver">
          {language || "Code"}
        </span>

        <span
          aria-hidden="true"
          className="text-silver/50"
        >
          <Copy className="h-4 w-4" />
        </span>
      </div>

      <div className="overflow-x-auto">
        <pre className="min-w-max p-5 text-sm leading-7 text-[#d6d9df] sm:p-6">
          <code>{text}</code>
        </pre>
      </div>
    </div>
  );
}

/* =========================================================
   Block Renderer
========================================================= */

function renderContentBlock(
  block: ProcessContentBlock,
  index: number,
) {
  switch (block.type) {
    case "featuredAnswer":
      return (
        <FeaturedAnswer
          key={`featured-answer-${index}`}
          text={block.text}
        />
      );

    case "heading":
      return (
        <ArticleHeading
          key={`heading-${block.text}-${index}`}
          block={block}
        />
      );

    case "paragraph":
      return (
        <ArticleParagraph
          key={`paragraph-${index}`}
          text={block.text}
        />
      );

    case "list":
      return (
        <ArticleList
          key={`list-${index}`}
          items={block.items}
        />
      );

    case "table":
      return (
        <ArticleTable
          key={`table-${index}`}
          headers={block.headers}
          rows={block.rows}
        />
      );

    case "code":
      return (
        <ArticleCode
          key={`code-${index}`}
          text={block.text}
          language={block.language}
        />
      );

    default:
      return null;
  }
}

/* =========================================================
   Main Component
========================================================= */

export default function ProcessArticleContent({
  content,
  className = "",
}: ProcessArticleContentProps) {
  if (content.length === 0) {
    return (
      <div
        className={[
          "rounded-[1.75rem] border border-white/[0.08] bg-surface p-7 text-center",
          className,
        ].join(" ")}
      >
        <h2 className="text-xl font-black text-text-primary">
          Content is being prepared
        </h2>

        <p className="mt-3 text-sm leading-7 text-silver">
          Detailed information for this
          process guide will be added soon.
        </p>
      </div>
    );
  }

  return (
    <article
      className={[
        "min-w-0",
        className,
      ].join(" ")}
    >
      {content.map(renderContentBlock)}
    </article>
  );
}
