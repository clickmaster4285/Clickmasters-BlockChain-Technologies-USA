import { Building2, Coins, HeartPulse, Image as ImageIcon, ShoppingBag, Truck } from "lucide-react";

const audiences = [
  { icon: Coins, title: "Finance & DeFi", desc: "Lending platforms, decentralized exchanges, and asset management tools built with security and transaction integrity as top priorities." },
  { icon: Building2, title: "Real Estate", desc: "Tokenization of property assets and fractional ownership platforms that make investment access simpler and more transparent." },
  { icon: Truck, title: "Supply Chain & Logistics", desc: "Traceability and verification systems that give every party in a supply chain a shared, tamper-resistant source of truth." },
  { icon: HeartPulse, title: "Healthcare", desc: "Secure, permissioned data-sharing systems that keep sensitive patient information under the right access controls." },
  { icon: ImageIcon, title: "Gaming & NFTs", desc: "In-game assets, marketplaces, and reward systems built on token standards that support real ownership and trading." },
  { icon: ShoppingBag, title: "Retail & E-commerce", desc: "Loyalty programs, provenance verification, and payment infrastructure that bring blockchain technology into everyday transactions." },
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
            Industries We Serve
          </div>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
            Blockchain implementation services shaped around{" "}
            <span className="text-gradient">real industry use cases</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            Our blockchain implementation services are shaped around how different industries
            actually use this technology:
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
