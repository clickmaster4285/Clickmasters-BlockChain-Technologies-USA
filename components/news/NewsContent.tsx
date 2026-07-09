import {
  CheckCircle2,
  Code2,
  Lightbulb,
  ListChecks,
  Quote,
} from "lucide-react";
import NewsCTA from "./NewsCTA";

export default function NewsContent({
  item,
  cta,
}: {
  item: any;
  cta: any;
}) {
  const blocks = item.content || [];

  return (
    <article className="space-y-10">
      <NewsCTA
        compact
        cta={cta}
        title="Need help understanding this update?"
        description="Talk with our experts and understand how this blockchain news affects your roadmap."
      />

      <section
        id="news"
        className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface/80 md:rounded-[2rem]"
      >
        <div className="border-b border-white/10 bg-white/[0.03] px-6 py-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-base">
            Full Story
          </p>
        </div>

        <div className="space-y-7 p-4 sm:p-6 md:p-10">
          {blocks.map((block: any, index: number) => {
            switch (block.type) {
              case "featuredAnswer":
                return (
                  <div
                    key={index}
                    className="rounded-3xl border border-amber-base/20 bg-amber-base/10 p-6 md:p-7"
                  >
                    <div className="flex items-start gap-4">
                      <Lightbulb className="mt-1 h-6 w-6 shrink-0 text-amber-base" />

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-base">
                          Key Insight
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

              case "paragraph":
                return (
                  <p
                    key={index}
                    className="text-base leading-8 text-silver md:text-lg"
                  >
                    {block.text}
                  </p>
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
                      <h3 className="mb-5 flex items-center gap-3 text-2xl font-black">
                        <ListChecks className="h-6 w-6 text-amber-base" />
                        {block.title}
                      </h3>
                    )}

                    <div className="grid gap-4">
                      {block.items.map((listItem: string, i: number) => (
                        <div
                          key={`${listItem}-${i}`}
                          className="flex gap-4 rounded-2xl border border-white/10 bg-bg-base/40 p-5"
                        >
                          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-amber-base" />

                          <p className="text-sm leading-7 text-silver">
                            {listItem}
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
                            <tr key={r} className="border-t border-white/10">
                              {row.map((cell, c) => (
                                <td
                                  key={c}
                                  className="px-5 py-4 text-sm leading-6 text-silver"
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

                    <pre className="max-w-full overflow-x-auto p-4 text-xs leading-6 text-silver sm:p-6 sm:text-sm">
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

    </article>
  );
}