"use client";

import {
  Boxes,
  Building2,
  Gamepad2,
  Landmark,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";

// Illustrative project scenarios — NOT customer testimonials. They describe the
// kinds of engagements we take on and must not be presented as client reviews
// (no names, ratings or Review schema). Replace with genuine, consented client
// testimonials only when the client has approved the wording and attribution.
const scenarios: {
  title: string;
  sector: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}[] = [
  {
    title: "DeFi lending protocol",
    sector: "DeFi startup",
    description:
      "Scoping lending and liquidation contracts, reviewing them internally before any mainnet deployment, and reporting progress to the founders every week.",
    icon: Landmark,
    gradient: "linear-gradient(135deg, #D97706, #F59E0B)",
  },
  {
    title: "Real estate tokenization",
    sector: "Fractional ownership platform",
    description:
      "Mapping investor-eligibility and transfer-restriction requirements into the contract design early, and preparing the codebase for an independent security audit.",
    icon: Building2,
    gradient: "linear-gradient(135deg, #64748B, #D97706)",
  },
  {
    title: "Supply chain traceability",
    sector: "Supply chain technology",
    description:
      "Documenting the architecture up front, running weekly demos and explaining each technical trade-off so the client team understands what is built and why.",
    icon: Boxes,
    gradient: "linear-gradient(135deg, #F59E0B, #CBD5E1)",
  },
  {
    title: "NFT gaming marketplace",
    sector: "Gaming studio",
    description:
      "Building gasless minting and on-chain royalty enforcement designed for marketplace scale, with the same support team continuing after launch.",
    icon: Gamepad2,
    gradient: "linear-gradient(135deg, #D97706, #64748B)",
  },
  {
    title: "On-chain logistics ledger",
    sector: "Logistics operator",
    description:
      "Connecting an existing shipment-tracking system to an on-chain ledger through an integration layer, without replacing the software the team already runs.",
    icon: Truck,
    gradient: "linear-gradient(135deg, #64748B, #10B981)",
  },
  {
    title: "Web3 wallet",
    sector: "Wallet startup",
    description:
      "Putting every contract through security review before mainnet and setting out the trade-offs plainly, so product decisions are made with the risks in view.",
    icon: ShieldCheck,
    gradient: "linear-gradient(135deg, #10B981, #D97706)",
  },
];

export function Testimonials() {
  return (
    <section
      id="example-engagements"
      className="relative overflow-hidden bg-bg-surface py-24 md:py-32"
    >
      {/* Background texture */}
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[28rem] w-[28rem] animate-orb rounded-full bg-amber-glow blur-[100px]" />
      <div
        className="pointer-events-none absolute -right-32 bottom-10 h-[28rem] w-[28rem] animate-orb rounded-full bg-emerald-glow blur-[100px]"
        style={{ animationDelay: "-5s" }}
      />

      <div className="site-container relative px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-glow/50 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-base">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
            Illustrative Scenarios
          </div>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
            Example Engagements
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            Illustrative examples of the projects we take on and how we run
            them. They are not customer reviews or testimonials.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                className="flex flex-col rounded-2xl border border-border bg-elevated p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-border/40 hover:shadow-soft"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-base">
                  Example scenario
                </span>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-text-primary/80">
                  {s.description}
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white shadow-lg"
                    style={{ background: s.gradient }}
                    aria-hidden="true"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary">
                      {s.title}
                    </h3>
                    <p className="text-xs text-text-secondary">{s.sector}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
