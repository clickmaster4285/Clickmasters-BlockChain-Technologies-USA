import { Coins, Image as ImageIcon, Users, Rocket, Building2 } from "lucide-react";

const audiences = [
  { icon: Coins, title: "DeFi Protocols", desc: "Lending, borrowing, DEX aggregation — secure DeFi infrastructure built to scale TVL." },
  { icon: ImageIcon, title: "NFT Projects", desc: "PFP collections, gaming assets, marketplaces — minting, trading, royalty enforcement." },
  { icon: Users, title: "DAOs", desc: "Governance modules, treasury management, proposal systems and on-chain voting." },
  { icon: Rocket, title: "Web3 Startups", desc: "From idea to token launch — full-stack Web3 product development and growth." },
  { icon: Building2, title: "Enterprises", desc: "Private blockchains, supply chain, tokenization of real-world assets." },
];

export function Audience() {
  return (
    <section className="dark relative overflow-hidden py-24 text-foreground md:py-32" style={{ background: "#05050A" }}>
      <div className="bg-neon-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] animate-orb rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-[420px] w-[420px] animate-orb rounded-full bg-secondary/20 blur-3xl" style={{ animationDelay: "-5s" }} />

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#00E5FF]">/ Who we serve</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Built for the teams shaping <span className="text-gradient">Web3</span>
          </h2>
        </div>

        <div className="mt-14 -mx-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-5 md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-5">
            {audiences.map((a, idx) => (
              <article
                key={a.title}
                className="group relative w-[280px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/60 md:w-auto"
                style={{ animation: `fade-in 0.6s ${idx * 0.08}s ease-out both` }}
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/20 text-[#00E5FF]">
                  <a.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{a.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
