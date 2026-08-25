import { Code2, ShieldCheck, Workflow } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    label: "Clear architecture",
  },
  {
    icon: ShieldCheck,
    label: "Tested code",
  },
  {
    icon: Workflow,
    label: "Reliable delivery",
  },
];

export function ProductionIntro() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-bg-surface py-20 md:py-28">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-25" />
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-amber-glow blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-emerald-glow blur-[110px]" />

      <div className="site-container relative px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-glow/50 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-base">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
              Production-ready blockchain solutions
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
              A Blockchain Development Company Built for{" "}
              <span className="text-gradient">Production</span>
            </h2>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 shadow-soft md:p-8">
            <p className="text-base leading-relaxed text-text-secondary md:text-lg">
              Clickmasters is a blockchain development company focused on building secure,
              scalable, and production-ready blockchain solutions. We help startups and
              enterprises with blockchain development services across Ethereum, EVM-compatible
              chains, Solana, and enterprise ledger frameworks.
            </p>
            <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">
              As a full-service blockchain solutions company in the USA, we combine clear
              architecture, tested code, security reviews, and reliable communication to deliver
              blockchain technology solutions built for real business needs-not short-term demos.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 rounded-xl border border-border bg-bg-base px-3 py-3"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-amber-base" />
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
