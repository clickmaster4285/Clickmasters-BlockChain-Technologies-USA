import Link from "next/link";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Aurora Lending Protocol",
    category: "DeFi",
    description: "Decentralized lending platform with cross-chain collateral. $50M TVL within 60 days of launch.",
    metrics: [{ k: "TVL", v: "$50M" }, { k: "Chains", v: "4" }, { k: "Audits", v: "3" }],
    accent: "primary",
  },
  {
    title: "Stratos NFT Marketplace",
    category: "NFT",
    description: "Multi-chain NFT marketplace with gasless minting and on-chain royalty enforcement.",
    metrics: [{ k: "NFTs minted", v: "1M+" }, { k: "Daily users", v: "10K+" }, { k: "Volume", v: "$8M" }],
    accent: "tertiary",
  },
  {
    title: "Nexus Wallet",
    category: "Wallet",
    description: "Non-custodial mobile wallet with hardware integration across 8 EVM and non-EVM chains.",
    metrics: [{ k: "Downloads", v: "500K+" }, { k: "Chains", v: "8" }, { k: "Rating", v: "4.8★" }],
    accent: "secondary",
  },
  {
    title: "Quorum DAO Platform",
    category: "DAO",
    description: "Modular governance suite powering token-weighted voting and treasury management for 50+ DAOs.",
    metrics: [{ k: "DAOs", v: "50+" }, { k: "Proposals", v: "1.2K" }, { k: "Treasury", v: "$80M" }],
    accent: "success",
  },
];

const dotMap = {
  primary: "bg-amber-base",
  secondary: "bg-emerald-base",
  tertiary: "bg-silver-base",
  success: "bg-emerald-base",
} as const;

export function Portfolio() {
  return (
    <section id="work" className="relative overflow-hidden bg-bg-base py-24 md:py-32">
      {/* Background texture */}
      <div className="bg-neon-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[30rem] w-[30rem] -translate-x-1/2 animate-orb rounded-full bg-emerald-glow blur-[120px]" />

      <div className="container relative mx-auto max-w-[85vw] px-6">
        {/* Section header with CTA */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-glow/50 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-base">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
              Selected Work
            </div>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
              Protocols and products shipped to{" "}
              <span className="text-gradient">production</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs font-semibold text-amber-base transition-all hover:border-amber-border/50 hover:bg-amber-glow/30"
          >
            Book a Strategy Call <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Projects grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-border/40 hover:shadow-soft"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-glow opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                {/* Category badge */}
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${dotMap[p.accent as keyof typeof dotMap]}`} />
                  <span className="rounded-full bg-bg-elevated px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    {p.category}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-semibold text-text-primary md:text-2xl">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{p.description}</p>

                {/* Metrics */}
                <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-5">
                  {p.metrics.map((m) => (
                    <div key={m.k}>
                      <dt className="font-mono text-[9px] uppercase tracking-widest text-text-muted">{m.k}</dt>
                      <dd className="mt-1 text-lg font-bold tracking-tight text-amber-base">{m.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
