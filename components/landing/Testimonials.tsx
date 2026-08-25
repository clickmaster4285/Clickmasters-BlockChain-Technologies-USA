"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "We searched for a blockchain development company near me in Austin and ended up talking to Clickmasters instead — best decision we made. They scoped our lending contracts properly, caught two issues in review before we ever got close to mainnet, and kept us updated every week.",
    name: "Ryan Coleman",
    role: "Founder, a DeFi lending startup — Austin, TX",
    initials: "RC",
    gradient: "linear-gradient(135deg, #D97706, #F59E0B)",
  },
  {
    quote: "I wasn't sure a blockchain development agency outside Miami could really understand our compliance needs, but Clickmasters asked sharper questions than the local firms we met with. Our fractional ownership platform launched on time and passed audit on the first pass.",
    name: "Alicia Fernandez",
    role: "COO, a real estate tokenization platform — Miami, FL",
    initials: "AF",
    gradient: "linear-gradient(135deg, #64748B, #D97706)",
  },
  {
    quote: "We'd been burned by an agency before, so we were cautious going in. Clickmasters' process was completely different — documented architecture, weekly demos, no surprises. It's rare to find a blockchain development company that actually explains what they're doing and why.",
    name: "Daniel Osei",
    role: "CTO, a supply chain tech company — New York, NY",
    initials: "DO",
    gradient: "linear-gradient(135deg, #F59E0B, #CBD5E1)",
  },
  {
    quote: "Our marketplace needed gasless minting and royalty enforcement that actually worked at scale. The team at Clickmasters got it right, and post-launch support has been just as responsive as the build phase.",
    name: "Priya Nair",
    role: "Product Lead, an NFT gaming studio — San Francisco, CA",
    initials: "PN",
    gradient: "linear-gradient(135deg, #D97706, #64748B)",
  },
  {
    quote: "We looked at a couple of blockchain development companies near Chicago before deciding to go with Clickmasters remotely, and it paid off. They integrated our tracking system with an on-chain ledger without disrupting our existing software — exactly what we needed.",
    name: "Marcus Whitfield",
    role: "VP Engineering, a mid-size logistics firm — Chicago, IL",
    initials: "MW",
    gradient: "linear-gradient(135deg, #64748B, #10B981)",
  },
  {
    quote: "What stood out was how seriously they took security. Every contract went through review before we touched mainnet, and they were upfront about tradeoffs instead of just telling us what we wanted to hear.",
    name: "Sarah Kim",
    role: "Founder, a Web3 wallet startup — Denver, CO",
    initials: "SK",
    gradient: "linear-gradient(135deg, #10B981, #D97706)",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-bg-surface py-24 md:py-32">
      {/* Background texture */}
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-35" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[28rem] w-[28rem] animate-orb rounded-full bg-amber-glow blur-[100px]" />
      <div
        className="pointer-events-none absolute -right-32 bottom-10 h-[28rem] w-[28rem] animate-orb rounded-full bg-emerald-glow blur-[100px]"
        style={{ animationDelay: "-5s" }}
      />
      <div className="pointer-events-none absolute left-10 top-10 font-display text-[200px] leading-none text-silver-dim/40">
        &ldquo;
      </div>

      <div className="site-container relative px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-glow/50 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-base">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
            Success Stories
          </div>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
            Success Stories
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-elevated p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-border/40 hover:shadow-soft"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-base text-amber-base" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-text-primary/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold text-white shadow-lg"
                  style={{ background: t.gradient }}
                  aria-hidden="true"
                >
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-secondary">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
