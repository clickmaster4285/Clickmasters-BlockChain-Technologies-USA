"use client";

// Logos are self-hosted in /public/media/logos (sourced from Simple Icons).
// Brands that Simple Icons no longer distributes have been removed.
const LOGOS = [
  { name: "Ethereum", slug: "ethereum", color: "3C3C3D" },
  { name: "Solana", slug: "solana", color: "9945FF" },
  { name: "Polygon", slug: "polygon", color: "7B3FE4" },
  { name: "Chainlink", slug: "chainlink", color: "375BD2" },
  { name: "Polkadot", slug: "polkadot", color: "E6007A" },
  { name: "Cardano", slug: "cardano", color: "0033AD" },
  { name: "Optimism", slug: "optimism", color: "FF0420" },
  { name: "OpenSea", slug: "opensea", color: "2081E2" },
  { name: "Coinbase", slug: "coinbase", color: "0052FF" },
  { name: "Binance", slug: "binance", color: "F0B90B" },
  { name: "Near", slug: "near", color: "000000" },
  { name: "Sui", slug: "sui", color: "4DA2FF" },
  { name: "IPFS", slug: "ipfs", color: "65C2CB" },
];

function LogoCloud({ reverse }: { reverse?: boolean }) {
  const items = [...LOGOS, ...LOGOS];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`logo-cloud flex w-max items-center gap-14 py-2 ${
          reverse ? "animate-marquee-right" : "animate-marquee-left"
        } hover:[animation-play-state:paused]`}
        style={{ animationDuration: "25s" }}
      >
        {items.map((logo, i) => (
          <div key={`${logo.slug}-${i}`}>
            <img
              src={`/media/logos/${logo.slug}.svg`}
              alt={`${logo.name} logo`}
              width={36}
              height={36}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrustedMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-bg-surface py-16">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-30" />

      <div className="site-container relative px-6">
        <div className="mx-auto mb-10 max-w-lg text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
            Networks and protocols
          </p>
          <div className="mx-auto mt-2 h-px w-12 bg-linear-to-r from-transparent via-amber-base/40 to-transparent" />
        </div>
        <div className="space-y-6">
          <LogoCloud />
          <LogoCloud reverse />
        </div>
      </div>
    </section>
  );
}
