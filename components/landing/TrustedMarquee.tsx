"use client";

import Image from "next/image";

const row1 = [
  { name: "Ethereum", slug: "ethereum", color: "3C3C3D" },
  { name: "Solana", slug: "solana", color: "9945FF" },
  { name: "Polygon", slug: "polygon", color: "7B3FE4" },
  { name: "Avalanche", slug: "avalanche", color: "E84142" },
  { name: "Chainlink", slug: "chainlink", color: "375BD2" },
  { name: "Polkadot", slug: "polkadot", color: "E6007A" },
  { name: "Cardano", slug: "cardano", color: "0033AD" },
];

const row2 = [
  { name: "Uniswap", slug: "uniswap", color: "FF007A" },
  { name: "OpenSea", slug: "opensea", color: "2081E2" },
  { name: "MetaMask", slug: "metamask", color: "F6851B" },
  { name: "Ledger", slug: "ledger", color: "000000" },
  { name: "Coinbase", slug: "coinbase", color: "0052FF" },
  { name: "Binance", slug: "binance", color: "F0B90B" },
  { name: "IPFS", slug: "ipfs", color: "65C2CB" },
];

function LogoStrip({ logos, direction }: { logos: typeof row1; direction: "left" | "right" }) {
  const items = [...logos, ...logos];
  return (
    <div className="group relative overflow-hidden">
      <div className={`flex w-max gap-16 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"} [animation-play-state:running] group-hover:[animation-play-state:paused]`}>
        {items.map((logo, i) => (
          <div key={`${logo.slug}-${i}`} className="flex h-12 w-32 shrink-0 items-center justify-center">
            <Image
              src={`https://cdn.simpleicons.org/${logo.slug}/9CA3AF`}
              data-color={logo.color}
              alt={logo.name}
              width={64}
              height={28}
              className="h-7 w-auto opacity-80 grayscale transition-all duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLImageElement).src = `https://cdn.simpleicons.org/${logo.slug}/${logo.color}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLImageElement).src = `https://cdn.simpleicons.org/${logo.slug}/9CA3AF`;
              }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-background to-transparent" />
    </div>
  );
}

export function TrustedMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-bg-surface py-12">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-50" />
      <div className="container relative mx-auto max-w-[85vw] px-6">
        <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Trusted across the Web3 ecosystem
        </p>
        <div className="space-y-6">
          <LogoStrip logos={row1} direction="left" />
          <LogoStrip logos={row2} direction="right" />
        </div>
      </div>
    </section>
  );
}
