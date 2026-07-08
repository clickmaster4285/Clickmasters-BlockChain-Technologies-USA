import { Coins, Image as ImageIcon, Users, Rocket, Building2 } from "lucide-react";

const audiences = [
  { icon: Coins, title: "DeFi Protocols", desc: "Lending, borrowing, DEX aggregation - secure DeFi infrastructure built to scale TVL." },
  { icon: ImageIcon, title: "NFT Projects", desc: "PFP collections, gaming assets, marketplaces - minting, trading, royalty enforcement." },
  { icon: Users, title: "DAOs", desc: "Governance modules, treasury management, proposal systems and on-chain voting." },
  { icon: Rocket, title: "Web3 Startups", desc: "From idea to token launch - full-stack Web3 product development and growth." },
  { icon: Building2, title: "Enterprises", desc: "Private blockchains, supply chain, tokenization of real-world assets." },
];

export function Audience() {
  return (
    <section className="relative overflow-hidden bg-bg-base py-24 md:py-32">
      {/* Background texture */}
      <div className="bg-neon-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] animate-orb rounded-full bg-amber-glow blur-[100px]" />
      <div
        className="pointer-events-none absolute -right-40 bottom-10 h-[28rem] w-[28rem] animate-orb rounded-full bg-emerald-glow blur-[100px]"
        style={{ animationDelay: "-5s" }}
      />

      <div className="site-container relative px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-glow/50 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-base">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
            Who we serve
          </div>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
            Built for the teams shaping <span className="text-gradient">Web3</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
          {audiences.map((a) => (
            <article
              key={a.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-border/40 hover:shadow-soft"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-glow opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-amber-glow text-amber-base">
                <a.icon className="h-5 w-5" />
              </span>
              <h3 className="relative mt-4 text-lg font-semibold text-text-primary">{a.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-text-secondary">{a.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
