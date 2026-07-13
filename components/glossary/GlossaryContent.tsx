import {
  CheckCircle2,
  Code2,
  Info,
  Lightbulb,
  ListChecks,
  Quote,
} from "lucide-react";
import GlossaryCTA from "./GlossaryCTA";

export default function GlossaryContent({
  item,
  cta,
}: {
  item: any;
  cta: any;
}) {
  const blocks = item?.content || [];

  return (
    <article className="space-y-10">
      <GlossaryCTA
        compact
        cta={cta}
        title="Need help applying this concept?"
        description="Talk with our experts and understand how this term fits your product, architecture, or Web3 strategy."
      />

      <section
        id="definition"
        className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface/80 md:rounded-[2rem]"
      >
        <div className="border-b border-white/10 bg-white/[0.03] px-5 py-5 sm:px-6 md:px-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-base">
            Complete Definition
          </p>
        </div>

        <div className="space-y-7 p-4 sm:p-6 md:p-10">
          {(item?.definition || item?.excerpt) && (
            <div className="rounded-3xl border border-amber-base/20 bg-amber-base/10 p-6 md:p-7">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-amber-base/10 text-amber-base">
                  <Lightbulb className="h-5 w-5" />
                </span>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                    Simple Definition
                  </p>

                  <p className="mt-3 text-base leading-8 text-silver md:text-lg">
                    {item.definition || item.excerpt}
                  </p>
                </div>
              </div>
            </div>
          )}

          {blocks.map((block: any, index: number) => {
            switch (block.type) {
              case "featuredAnswer":
              case "definition":
                return (
                  <div
                    key={index}
                    className="rounded-3xl border border-amber-base/20 bg-amber-base/10 p-6 md:p-7"
                  >
                    <div className="flex items-start gap-4">
                      <Lightbulb className="mt-1 h-6 w-6 shrink-0 text-amber-base" />

                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                          Key Definition
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
                  <div key={index}>
                    {block.title && (
                      <h3 className="mb-5 flex items-center gap-3 text-xl font-black text-text-primary sm:text-2xl">
                        <ListChecks className="h-6 w-6 shrink-0 text-amber-base" />
                        {block.title}
                      </h3>
                    )}

                    <div className="grid gap-4">
                      {(block.items || []).map(
                        (listItem: any, itemIndex: number) => {
                          const title =
                            typeof listItem === "string"
                              ? null
                              : listItem?.title;

                          const description =
                            typeof listItem === "string"
                              ? listItem
                              : listItem?.description ||
                                listItem?.text ||
                                listItem?.title;

                          return (
                            <div
                              key={`${description}-${itemIndex}`}
                              className="flex gap-4 rounded-2xl border border-white/10 bg-bg-base/40 p-5"
                            >
                              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-amber-base" />

                              <div>
                                {title && (
                                  <h4 className="font-black text-text-primary">
                                    {title}
                                  </h4>
                                )}

                                <p
                                  className={`text-sm leading-7 text-silver ${
                                    title ? "mt-2" : ""
                                  }`}
                                >
                                  {description}
                                </p>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                );

              case "steps":
                return (
                  <div key={index}>
                    {block.title && (
                      <h3 className="mb-6 flex items-center gap-3 text-xl font-black text-text-primary sm:text-2xl">
                        <ListChecks className="h-6 w-6 text-amber-base" />
                        {block.title}
                      </h3>
                    )}

                    <div className="space-y-5">
                      {(block.items || []).map(
                        (step: any, stepIndex: number) => (
                          <div
                            key={stepIndex}
                            className="rounded-3xl border border-white/10 bg-bg-base/40 p-5 sm:p-6"
                          >
                            <div className="flex items-start gap-4">
                              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-base font-black text-bg-base">
                                {stepIndex + 1}
                              </span>

                              <div>
                                <h4 className="text-lg font-black text-text-primary">
                                  {step.title ||
                                    `Step ${stepIndex + 1}`}
                                </h4>

                                <p className="mt-3 text-sm leading-7 text-silver md:text-base">
                                  {step.description ||
                                    step.text}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                );

              case "table":
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-3xl border border-white/10"
                  >
                    {block.title && (
                      <div className="border-b border-white/10 bg-white/[0.03] px-5 py-4">
                        <h3 className="font-black text-text-primary">
                          {block.title}
                        </h3>
                      </div>
                    )}

                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[680px]">
                        <thead className="bg-white/[0.03]">
                          <tr>
                            {(block.columns || []).map(
                              (column: string) => (
                                <th
                                  key={column}
                                  className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.18em] text-amber-base"
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
                                className="border-t border-white/10"
                              >
                                {row.map(
                                  (
                                    cell: any,
                                    cellIndex: number
                                  ) => (
                                    <td
                                      key={cellIndex}
                                      className="px-5 py-4 text-sm leading-6 text-silver"
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
                  </div>
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

      <GlossaryCTA cta={cta} />
    </article>
  );
}