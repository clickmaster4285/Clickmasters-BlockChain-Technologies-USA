import Link from "next/link";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Aurora Lending Protocol",
    category: "DeFi",
    description: "Illustrative example of a decentralized lending platform with cross-chain collateral.",
    accent: "primary",
  },
  {
    title: "Stratos NFT Marketplace",
    category: "NFT",
    description: "Illustrative example of a multi-chain NFT marketplace with gasless minting and on-chain royalty enforcement.",
    accent: "tertiary",
  },
  {
    title: "Nexus Wallet",
    category: "Wallet",
    description: "Illustrative example of a non-custodial mobile wallet with hardware integration across EVM and non-EVM chains.",
    accent: "secondary",
  },
  {
    title: "Quorum DAO Platform",
    category: "DAO",
    description: "Illustrative example of a modular governance suite for token-weighted voting and treasury management.",
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

      <div className="site-container relative px-6">
        {/* Section header with CTA */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-glow/50 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-base">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
              Selected Work
            </div>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
              Illustrative blockchain product{" "}
              <span className="text-gradient">examples</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs font-semibold text-amber-base transition-all hover:border-amber-border/50 hover:bg-amber-glow/30"
          >
            Book a Strategy Call <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <p className="mt-8 text-sm text-text-muted">
          The projects below are illustrative examples, not verified client case studies.
        </p>

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

                <h2 className="mt-4 text-xl font-semibold text-text-primary md:text-2xl">{p.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{p.description}</p>

              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
