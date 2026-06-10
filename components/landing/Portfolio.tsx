import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
const portfolioBg = "/media/portfolio-bg.jpeg";

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
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  success: "bg-success",
} as const;

export function Portfolio() {
  return (
    <section id="work" className="dark relative overflow-hidden bg-bg-base py-24 text-foreground md:py-32">
      <Image src={portfolioBg} alt="" aria-hidden="true" fill className="pointer-events-none object-cover opacity-55" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-bg-base/90 via-bg-base/75 to-bg-base/95" />
      <div className="bg-neon-grid pointer-events-none absolute inset-0 opacity-40 mask-[radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-120 w-120 -translate-x-1/2 animate-orb rounded-full bg-secondary/20 blur-3xl" />
      <div className="container relative mx-auto max-w-[85vw] px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">Selected work</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-white md:text-5xl">
              Protocols and products shipped to <span className="text-gradient">production</span>
            </h2>
          </div>
          <Link href="#contact" className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-amber-base">
            See more case studies <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/4 p-8 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${dotMap[p.accent as keyof typeof dotMap]}`} />
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-white/70">
                  {p.category}
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-white/65">{p.description}</p>
              <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
                {p.metrics.map((m) => (
                  <div key={m.k}>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-white/55">{m.k}</dt>
                    <dd className="mt-1 text-lg font-bold text-amber-base">{m.v}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
