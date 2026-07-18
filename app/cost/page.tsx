import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { createMetadata } from "@/config/metadata";
import { getCostCards } from "@/data/costs";
import CostCard from "@/components/cost/CostCard";
import RevealOnScroll from "@/components/cost/RevealOnScroll";

export const metadata = createMetadata({
  title: "Blockchain Development Cost Guides | Clickmasters",
  description:
    "Real 2025 pricing for smart contracts, DeFi, NFTs, crypto exchanges, wallets, tokenization, and enterprise blockchain projects — broken down by scope, phase, and audit cost.",
  path: "/cost",
});

export default function CostIndexPage() {
  const cards = getCostCards();

  return (
    <>
      <Navbar />
      <main className="relative w-full bg-bg-base">
        <section className="relative overflow-hidden pb-16 pt-28 md:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-hex-light opacity-50" />
          <div className="pointer-events-none absolute -top-32 left-[10%] h-[420px] w-[520px] rounded-full bg-amber-glow blur-3xl animate-orb" />
          <div className="pointer-events-none absolute top-1/4 right-[6%] h-[300px] w-[300px] rounded-full bg-emerald-glow blur-3xl animate-orb animation-delay-2000" />

          <div className="site-container relative mx-auto px-4">
            <div className="max-w-2xl text-left">
              <RevealOnScroll effect="pop-bounce">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-amber bg-amber-glow px-4 py-1.5 text-xs font-mono uppercase tracking-[0.18em] text-amber-dim">
                  Pricing, not guesswork
                </div>
              </RevealOnScroll>
              <RevealOnScroll effect="blast-in">
                <h1 className="text-balance font-display text-4xl font-semibold leading-[1.08] text-text-primary md:text-6xl">
                  What blockchain projects actually cost
                </h1>
              </RevealOnScroll>
              <RevealOnScroll effect="slide-left" delay={140}>
                <p className="mt-5 text-pretty text-base leading-relaxed text-text-secondary md:text-lg">
                  Real ranges from 1,000+ delivered projects — smart contracts, DeFi,
                  NFTs, exchanges, wallets, tokenization, and more. Pick a category
                  below for the full breakdown.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <section className="site-container relative mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, i) => (
              <CostCard key={card.slug} card={card} index={i} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
