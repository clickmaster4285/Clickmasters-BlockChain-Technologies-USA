import { Check, X } from "lucide-react";

const rows = [
  { criteria: "Security audits", us: "Formal verification + 3rd party", them: "Basic testing only" },
  { criteria: "Gas optimization", us: "Assembly-level optimization", them: "Often overlooked" },
  { criteria: "Multi-chain support", us: "10+ chains, EVM + non-EVM", them: "1-2 chains" },
  { criteria: "Post-launch monitoring", us: "24/7 on-chain alerting", them: "Limited support" },
  { criteria: "Tokenomics consulting", us: "In-house economists", them: "Outsourced or absent" },
  { criteria: "Smart contract standards", us: "ERC-20/721/1155/4337/6551", them: "Basic ERC-20 only" },
  { criteria: "NDA before first call", us: "Yes - mandatory", them: "Rarely offered upfront" },
  { criteria: "Fixed-price quoting", us: "After discovery phase", them: "Hourly or undefined scope" },
];

export function Comparison() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-bg-surface py-24 md:py-28">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-30" />
      <div className="container relative mx-auto max-w-[85vw] px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-glow/50 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-base">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
            Why ClickMasters
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
            Built for the long game, not the launch
          </h2>
        </div>

        <div className="mt-14 overflow-hidden rounded-xl border border-border bg-bg-base">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] text-sm">
            {/* Header row */}
            <div className="border-r border-border bg-bg-elevated px-5 py-3.5 font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Criteria
            </div>
            <div className="border-r border-border bg-amber-glow/30 px-5 py-3.5 text-center font-display text-sm font-semibold text-amber-base">
              ClickMasters
            </div>
            <div className="bg-bg-elevated px-5 py-3.5 text-center font-display text-sm font-semibold text-text-muted">
              Generic agencies
            </div>

            {/* Data rows */}
            {rows.map((r, i) => (
              <div key={r.criteria} className="contents">
                <div className={`border-r border-border px-5 py-4 text-sm font-medium text-text-primary ${i % 2 ? "bg-bg-surface/50" : ""}`}>
                  {r.criteria}
                </div>
                <div className={`border-r border-border px-5 py-4 text-sm text-text-primary ${i % 2 ? "bg-amber-glow/20" : "bg-amber-glow/10"}`}>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-emerald-base" />
                    <span>{r.us}</span>
                  </div>
                </div>
                <div className={`px-5 py-4 text-sm text-text-muted ${i % 2 ? "bg-bg-surface/50" : ""}`}>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4 shrink-0 text-silver-dim" />
                    <span>{r.them}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
