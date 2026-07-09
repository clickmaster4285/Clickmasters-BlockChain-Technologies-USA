import {
  CheckCircle2,
  Code2,
  Lightbulb,
  ListChecks,
  Quote,
} from "lucide-react";
import HowToCTA from "./HowToCTA";

export default function HowToContent({
  item,
  cta,
}: {
  item: any;
  cta: any;
}) {
  const blocks = item.content || [];

  return (
    <article className="space-y-8 overflow-x-hidden sm:space-y-10">

      {/* CTA #1 */}

      <HowToCTA
        compact
        cta={cta}
        title="Need help implementing this guide?"
        description="Talk with our blockchain experts before you start building."
      />

      {/* Content */}

      <section
        id="guide"
        className="overflow-hidden rounded-[2rem] border border-white/10 bg-surface/80"
      >
        <div className="border-b border-white/10 bg-white/[0.03] px-6 py-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-base">
            Complete Guide
          </p>
        </div>

        <div className="space-y-8 p-6 md:p-10">
          {blocks.map((block: any, index: number) => {
            switch (block.type) {
              case "featuredAnswer":
                return (
                  <div
                    key={index}
                    className="rounded-3xl border border-amber-base/20 bg-amber-base/10 p-5 sm:p-7"
                  >
                    <div className="flex items-start gap-4">
                      <Lightbulb className="mt-1 h-6 w-6 text-amber-base" />

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-base">
                          Quick Answer
                        </p>

                        <p className="mt-3 text-base leading-7 text-silver sm:text-lg sm:leading-8">
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
                    className="border-l-4 border-amber-base pl-4 text-2xl font-black sm:pl-5 sm:text-3xl"
                  >
                    {block.text}
                  </h2>
                );

              case "paragraph":
                return (
                  <p
                    key={index}
                    className="text-sm leading-7 text-silver sm:text-base sm:leading-8 md:text-lg"
                  >
                    {block.text}
                  </p>
                );

              case "quote":
                return (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-bg-base/60 p-5 sm:p-7"
                  >
                    <Quote className="mb-4 h-8 w-8 text-amber-base" />

                    <p className="text-base italic leading-7 text-silver sm:text-lg sm:leading-8">
                      {block.text}
                    </p>
                  </div>
                );

              case "list":
                return (
                  <div key={index}>
                    {block.title && (
                      <h3 className="mb-5 text-2xl font-black">
                        {block.title}
                      </h3>
                    )}

                    <div className="grid gap-4">
                      {block.items.map((item: string) => (
                        <div
                          key={item}
                          className="flex gap-3 rounded-2xl border border-white/10 bg-bg-base/40 p-4 sm:gap-4 sm:p-5"
                        >
                          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-amber-base" />

                          <p className="text-sm leading-7 break-words text-silver">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );

              case "steps":
                return (
                  <div key={index}>
                    <h3 className="mb-6 flex items-center gap-3 text-xl font-black sm:text-2xl">
                      <ListChecks className="text-amber-base" />
                      {block.title}
                    </h3>

                    <div className="space-y-5">
                      {block.items.map((step: any, i: number) => (
                        <div
                          key={i}
                          className="rounded-3xl border border-white/10 bg-bg-base/40 p-5 sm:p-6"
                        >
                          <div className="mb-4 flex items-center gap-4">
                            <div className="grid h-10 w-10 place-items-center rounded-full bg-amber-base font-bold text-bg-base">
                              {i + 1}
                            </div>

                            <h4 className="text-lg font-black">
                              {step.title}
                            </h4>
                          </div>

                          <p className="leading-7 break-words text-silver">
                            {step.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );

              case "table":
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-3xl border border-white/10"
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[700px]">
                        <thead className="bg-white/[0.03]">
                          <tr>
                            {block.columns.map((col: string) => (
                              <th
                                key={col}
                                className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.18em] text-amber-base"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>

                        <tbody>
                          {block.rows.map((row: any[], r: number) => (
                            <tr
                              key={r}
                              className="border-t border-white/10"
                            >
                              {row.map((cell, c) => (
                                <td
                                  key={c}
                                  className="px-5 py-4 text-sm text-silver"
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );

              case "codeBlock":
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-bg-base"
                  >
                    <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-amber-base">
                      <Code2 className="h-4 w-4" />
                      Example
                    </div>

                    <pre className="overflow-x-auto whitespace-pre-wrap break-words p-4 text-sm leading-7 text-silver sm:p-6">
                      <code>{block.code}</code>
                    </pre>
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      </section>

      {/* CTA #2 */}

    </article>
  );
}