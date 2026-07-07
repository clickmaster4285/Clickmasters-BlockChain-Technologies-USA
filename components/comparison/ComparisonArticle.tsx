import { CheckCircle2, Code2, HelpCircle, Layers3 } from "lucide-react";
import ComparisonCTA from "./ComparisonCTA";
import { getComparisonCta } from "@/lib/comparison";

function renderTable(columns: string[], rows: any[][], key: string) {
  if (!rows?.length) return null;

  return (
    <div key={key} className="my-10 w-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#090A0C] font-mono shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
  <div className="overflow-x-auto">
    <table className="w-full min-w-[760px] border-collapse text-left">
      <thead>
        {/* Sleek solid slate header row */}
        <tr className="border-b border-white/[0.08] bg-[#0E1013]">
          {columns.map((cell) => (
            <th
              key={cell}
              className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[#475569] antialiased"
            >
              {cell}
            </th>
          ))}
        </tr>
      </thead>

      {/* Network ledger styling */}
      <tbody className="divide-y divide-white/[0.03]">
        {rows.map((row, rowIndex) => (
          <tr 
            key={rowIndex} 
            /* Smooth background transition with modern subtle cyber flash on hover */
            className="group/row transition-all duration-200 ease-out hover:bg-white/[0.02]"
          >
            {row.map((cell, cellIndex) => (
              <td
                key={`${rowIndex}-${cellIndex}`}
                // Minimal inner cell border for block architecture
                className="border-r border-white/[0.015] last:border-0 px-6 py-4 text-[12px] font-medium tracking-tight antialiased"
              >
                {cellIndex === 0 ? (
                  /* Main Block/Item entity with advanced animated glowing node */
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-2 w-2 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full rounded-sm bg-amber-base/30 opacity-0 transition-all duration-300 group-hover/row:scale-[2.5] group-hover/row:opacity-100 group-hover/row:animate-ping" />
                      <span className="relative h-1.5 w-1.5 rounded-sm bg-amber-base shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all duration-200 group-hover/row:bg-amber-base" />
                    </div>
                    <span className="font-bold text-[#E2E8F0] group-hover/row:text-amber-base transition-colors duration-200">
                      {cell}
                    </span>
                  </div>
                ) : (
                  /* Ultra-clean secondary node data values */
                  <span className="text-[#94A3B8] transition-colors duration-200 group-hover/row:text-[#F1F5F9]">
                    {cell}
                  </span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}

function renderContent(blocks: any[]) {
  if (!Array.isArray(blocks)) return null;

  return blocks.map((block, index) => {
    if (!block || typeof block !== "object") return null;

    switch (block.type) {
      case "featuredAnswer":
        return (
          <div
            key={`featured-${index}`}
            className="my-8 rounded-3xl border border-amber-base/20 bg-amber-base/10 p-8 text-lg font-semibold leading-8 text-text-primary"
          >
            {block.text}
          </div>
        );
      case "heading":
        return (
          <h2
            key={`heading-${index}`}
            className="mt-12 text-3xl font-black leading-tight text-text-primary md:text-4xl"
          >
            {block.text}
          </h2>
        );
      case "paragraph":
        return (
          <p key={`paragraph-${index}`} className="my-5 text-base leading-8 text-silver md:text-lg">
            {block.text}
          </p>
        );
      case "list":
        return (
          <ul key={`list-${index}`} className="my-8 grid gap-3 list-inside text-sm leading-7 text-silver md:text-base">
            {(block.items || []).map((item: string, itemIndex: number) => (
              <li key={`${itemIndex}-${item}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                {item}
              </li>
            ))}
          </ul>
        );
      case "table":
        return renderTable(block.columns || [], block.rows || [], `table-${index}`);
      default:
        return (
          <p key={`default-${index}`} className="my-5 text-base leading-8 text-silver md:text-lg">
            {block.text || ""}
          </p>
        );
    }
  });
}

export default function ComparisonArticle({
  article,
  showFaq = false,
  showBottomCta = false,
}: {
  article: any;
  showFaq?: boolean;
  showBottomCta?: boolean;
}) {
  const cta = getComparisonCta(article);
  return (
    <article className="space-y-10">
      <ComparisonCTA
        compact
        cta={cta}
        title="Need a quick expert recommendation?"
        description="Get a practical recommendation before you spend weeks choosing the wrong blockchain architecture."
      />

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-surface/80">
        <div className="border-b border-white/10 bg-white/[0.03] px-6 py-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-base">
            Complete Comparison
          </p>
        </div>

        <div id="article" className="p-6 md:p-10">
          {renderContent(article.content)}
        </div>
      </div>

      {showFaq && article.faqs?.length > 0 && (
        <div className="rounded-[2rem] border border-white/10 bg-surface/80 p-6 md:p-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-base/10 text-amber-base">
              <HelpCircle className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-base">
                Questions
              </p>
              <h2 className="text-3xl font-black">FAQ</h2>
            </div>
          </div>

          <div className="space-y-4">
            {article.faqs.map((item: any) => (
              <div
                key={item.question}
                className="rounded-2xl border border-white/10 bg-bg-base/50 p-5 transition-colors hover:border-amber-base/25"
              >
                <h3 className="font-bold text-text-primary">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-silver">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showBottomCta && (() => {
  // Yahan dummy data define kiya taake TypeScript error khatam ho jaye
  // 1. Add this fallback object right before the return statement:
    // Use this correct structure right before the return statement:
  const bottomCta = {
    text: "Contact Us",
    href: "/contact",
    primary: true
  };

  return (
    <ComparisonCTA
      cta={bottomCta}
      title="Ready to make the right technical decision?"
      description="We can help you choose the right chain, architecture, smart contract strategy, and launch plan."
    />
  );


})()}

    </article>
  );
}
