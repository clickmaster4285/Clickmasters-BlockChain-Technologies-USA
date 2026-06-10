import { Check, X } from "lucide-react";

const rows = [
  { criteria: "Security audits", us: "Formal verification + 3rd party", them: "Basic testing only" },
  { criteria: "Gas optimization", us: "Assembly-level optimization", them: "Often overlooked" },
  { criteria: "Multi-chain support", us: "10+ chains, EVM + non-EVM", them: "1–2 chains" },
  { criteria: "Post-launch monitoring", us: "24/7 on-chain alerting", them: "Limited support" },
  { criteria: "Tokenomics consulting", us: "In-house economists", them: "Outsourced or absent" },
];

export function Comparison() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-bg-surface py-24">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-40" />
      <div className="container relative mx-auto max-w-5xl px-6">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ Why ClickMasters</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
            Built for the long game, not the launch
          </h2>
        </div>
        <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-background">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] text-sm">
            <div className="bg-surface px-6 py-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Criteria</div>
            <div className="bg-accent px-6 py-4 text-center font-display text-base font-semibold text-primary">
              ClickMasters
            </div>
            <div className="bg-surface px-6 py-4 text-center font-display text-base font-semibold text-muted-foreground">
              Generic agencies
            </div>
            {rows.map((r, i) => (
              <div key={r.criteria} className={`contents`}>
                <div className={`px-6 py-5 font-medium text-foreground ${i % 2 ? "bg-surface/40" : ""}`}>{r.criteria}</div>
                <div className={`flex items-center justify-center gap-2 px-6 py-5 text-sm text-foreground ${i % 2 ? "bg-accent/60" : "bg-accent/40"}`}>
                  <Check className="h-4 w-4 shrink-0 text-success" />
                  <span>{r.us}</span>
                </div>
                <div className={`flex items-center justify-center gap-2 px-6 py-5 text-sm text-muted-foreground ${i % 2 ? "bg-surface/40" : ""}`}>
                  <X className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span>{r.them}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
