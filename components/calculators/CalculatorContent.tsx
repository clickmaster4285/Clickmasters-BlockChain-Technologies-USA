import {
  CheckCircle2,
  Code2,
  Lightbulb,
  ListChecks,
  Table2,
} from "lucide-react";

import type {
  CalculatorContentBlock,
  CodeBlock,
  FeaturedAnswerBlock,
  HeadingBlock,
  ListBlock,
  ParagraphBlock,
  TableBlock,
} from "@/lib/calculators";

type CalculatorContentProps = {
  content: CalculatorContentBlock[];
};

export default function CalculatorContent({ content }: CalculatorContentProps) {
  if (content.length === 0) {
    return null;
  }

  return (
    <article
      aria-label="Resource content"
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-surface/80 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.12)] sm:p-6 md:p-10"
    >
      <div className="mb-8 flex items-center gap-3 border-b border-white/10 pb-6">
        <span className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
          <ListChecks className="h-5 w-5" />
        </span>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-base">
            Resource Notes
          </p>

          <h2 className="mt-1 text-xl font-black text-text-primary sm:text-2xl">
            Use, understand, and apply the model
          </h2>
        </div>
      </div>

      <div className="space-y-8">
        {content.map((block, index) => (
          <CalculatorContentBlockRenderer
            key={createBlockKey(block, index)}
            block={block}
            index={index}
          />
        ))}
      </div>
    </article>
  );
}

/* =========================================================
   Main Block Renderer
========================================================= */

function CalculatorContentBlockRenderer({
  block,
  index,
}: {
  block: CalculatorContentBlock;
  index: number;
}) {
  switch (block.type) {
    case "featuredAnswer":
      return <FeaturedAnswer block={block} index={index} />;

    case "heading":
      return <ContentHeading block={block} index={index} />;

    case "paragraph":
      return <ContentParagraph block={block} />;

    case "table":
      return <ContentTable block={block} index={index} />;

    case "list":
      return <ContentList block={block} />;

    case "code":
      return <ContentCode block={block} index={index} />;

    default:
      return null;
  }
}

/* =========================================================
   Featured Answer
========================================================= */

function FeaturedAnswer({
  block,
  index,
}: {
  block: FeaturedAnswerBlock;
  index: number;
}) {
  return (
    <section
      aria-labelledby={`featured-answer-${index}`}
      className="relative overflow-hidden rounded-3xl border border-amber-base/20 bg-amber-base/10 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:p-8"
    >
      <div className="pointer-events-none absolute right-[-90px] top-[-100px] h-56 w-56 rounded-full bg-amber-base/10 blur-[80px]" />

      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-sm font-black text-amber-base">
            <Lightbulb className="h-5 w-5" />
          </span>

          <p
            id={`featured-answer-${index}`}
            className="text-xs font-black uppercase tracking-[0.18em] text-amber-base"
          >
            Key takeaway
          </p>
        </div>

        <p className="mt-5 text-base leading-8 text-silver-light sm:text-lg sm:leading-9">
          {block.text}
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   Heading
========================================================= */

function ContentHeading({
  block,
  index,
}: {
  block: HeadingBlock;
  index: number;
}) {
  const level = getHeadingLevel(block.text);
  const id = createHeadingId(block.text, index);

  if (level === 3) {
    return (
      <h3
        id={id}
        className="scroll-mt-28 border-l-4 border-amber-base pl-4 pt-1 text-2xl font-black leading-tight text-text-primary sm:text-3xl"
      >
        {block.text}
      </h3>
    );
  }

  return (
    <h2
      id={id}
      className="scroll-mt-28 pt-5 text-3xl font-black leading-tight text-text-primary first:pt-0 sm:text-4xl"
    >
      {block.text}
    </h2>
  );
}

/* =========================================================
   Paragraph
========================================================= */

function ContentParagraph({ block }: { block: ParagraphBlock }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-bg-base/55 p-5 transition-all duration-300 hover:border-amber-base/20 sm:p-6">
      <p className="whitespace-pre-line text-[15px] leading-8 text-silver sm:text-base">
        {block.text}
      </p>
    </div>
  );
}

/* =========================================================
   Lists
========================================================= */

function ContentList({ block }: { block: ListBlock }) {
  if (block.items.length === 0) {
    return null;
  }

  return (
    <ul className="grid gap-4">
      {block.items.map((item, index) => {
        const checklistItem = getChecklistItem(item);

        return (
          <li
            key={`${item}-${index}`}
            className="group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-bg-base/45 p-[1px] transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-base/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
          >
            <div className="relative flex items-start gap-4 rounded-[calc(1.4rem-1px)] bg-gradient-to-br from-bg-base via-bg-base to-surface/60 px-5 py-4">
              <span
                className={
                  checklistItem.isChecklist
                    ? getChecklistIconClasses(checklistItem.checked)
                    : "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-amber-base transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 group-hover:bg-amber-base group-hover:text-bg-base"
                }
                aria-hidden="true"
              >
                {checklistItem.isChecklist ? (
                  checklistItem.checked ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    ""
                  )
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
              </span>

              <span className="text-sm leading-7 text-silver transition-colors duration-300 group-hover:text-silver-light sm:text-[15px]">
                {checklistItem.text}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* =========================================================
   Tables
========================================================= */

function ContentTable({ block, index }: { block: TableBlock; index: number }) {
  if (block.headers.length === 0 || block.rows.length === 0) {
    return null;
  }

  const caption = getTableCaption(block, index);

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-bg-base/70 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-amber-base/10 via-white/[0.03] to-transparent px-5 py-4 sm:px-6">
        <Table2 className="h-5 w-5 text-amber-base" />
        <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
          Reference Table
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <caption className="sr-only">{caption}</caption>

          <thead>
            <tr className="border-b border-white/10 bg-surface/80">
              {block.headers.map((header, headerIndex) => (
                <th
                  key={`${header}-${headerIndex}`}
                  scope="col"
                  className="min-w-[150px] px-5 py-4 text-xs font-black uppercase tracking-[0.12em] text-amber-base sm:px-6"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr
                key={`row-${rowIndex}`}
                className="border-b border-white/[0.07] transition-colors last:border-0 hover:bg-amber-base/[0.045]"
              >
                {block.headers.map((_, cellIndex) => {
                  const cell = row[cellIndex] ?? "—";

                  const isFirstColumn = cellIndex === 0;

                  return (
                    <td
                      key={`cell-${rowIndex}-${cellIndex}`}
                      className={
                        isFirstColumn
                          ? "px-5 py-4 text-sm font-bold leading-6 text-text-primary sm:px-6"
                          : "px-5 py-4 text-sm leading-6 text-silver sm:px-6"
                      }
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================
   Code
========================================================= */

function ContentCode({ block, index }: { block: CodeBlock; index: number }) {
  const language = detectCodeLanguage(block.text);

  return (
    <section
      aria-labelledby={`code-block-${index}`}
      className="overflow-hidden rounded-3xl border border-slate-900/10 bg-slate-950 shadow-[0_18px_60px_rgba(0,0,0,0.16)]"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>

        <span
          id={`code-block-${index}`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-300"
        >
          <Code2 className="h-3.5 w-3.5" />
          {language}
        </span>
      </div>

      <div className="overflow-x-auto">
        <pre className="min-w-max p-5 text-sm leading-7 text-slate-100/80 sm:p-6">
          <code>{block.text}</code>
        </pre>
      </div>
    </section>
  );
}

/* =========================================================
   Helpers
========================================================= */

function createBlockKey(block: CalculatorContentBlock, index: number): string {
  switch (block.type) {
    case "featuredAnswer":
    case "heading":
    case "paragraph":
    case "code":
      return `${block.type}-${index}-${block.text.slice(0, 40)}`;

    case "list":
      return `${block.type}-${index}-${block.items[0] ?? "items"}`;

    case "table":
      return `${block.type}-${index}-${block.headers[0] ?? "table"}`;

    default:
      return `content-${index}`;
  }
}

function createHeadingId(text: string, index: number): string {
  const normalized = text
    .toLowerCase()
    .replace(/['"`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized ? `${normalized}-${index}` : `section-${index}`;
}

function getHeadingLevel(text: string): 2 | 3 {
  const normalized = text.trim().toLowerCase();

  const secondaryPatterns = [
    /^method\s+\d+/,
    /^pattern\s+\d+/,
    /^\d+\./,
    /^part\s+\d+/,
    /:$/,
    /^supply schedule$/,
    /^demand drivers$/,
    /^sink mechanisms$/,
    /^high gas impact operations/,
    /^gas-efficient patterns/,
  ];

  const isSecondary = secondaryPatterns.some((pattern) =>
    pattern.test(normalized),
  );

  return isSecondary ? 3 : 2;
}

function getTableCaption(block: TableBlock, index: number): string {
  const firstHeader = block.headers[0] || "Data";

  return `${firstHeader} comparison table ${index + 1}`;
}

function detectCodeLanguage(code: string): string {
  const normalized = code.toLowerCase();

  if (
    normalized.includes("def ") ||
    normalized.includes("return {") ||
    normalized.includes("float =")
  ) {
    return "Python";
  }

  if (normalized.includes("import ") && normalized.includes(".sol")) {
    return "Solidity";
  }

  if (normalized.includes("forge ") || normalized.includes("slither ")) {
    return "Terminal";
  }

  if (normalized.includes("function ") || normalized.includes("const ")) {
    return "JavaScript";
  }

  return "Code";
}

function getChecklistItem(item: string): {
  text: string;
  isChecklist: boolean;
  checked: boolean;
} {
  const uncheckedPattern = /^\[\s*\]\s*/;

  const checkedPattern = /^\[\s*[xX✓]\s*\]\s*/;

  if (checkedPattern.test(item)) {
    return {
      text: item.replace(checkedPattern, ""),
      isChecklist: true,
      checked: true,
    };
  }

  if (uncheckedPattern.test(item)) {
    return {
      text: item.replace(uncheckedPattern, ""),
      isChecklist: true,
      checked: false,
    };
  }

  return {
    text: item,
    isChecklist: false,
    checked: false,
  };
}

function getChecklistIconClasses(checked: boolean): string {
  if (checked) {
    return "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-amber-base/30 bg-amber-base/15 text-amber-base transition-all duration-500";
  }

  return "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/[0.025]";
}
