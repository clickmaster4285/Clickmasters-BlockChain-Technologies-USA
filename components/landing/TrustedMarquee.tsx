"use client";

const LOGOS = [
  { name: "Ethereum", slug: "ethereum", color: "3C3C3D" },
  { name: "Solana", slug: "solana", color: "9945FF" },
  { name: "Polygon", slug: "polygon", color: "7B3FE4" },
  { name: "Avalanche", slug: "avalanche", color: "E84142" },
  { name: "Chainlink", slug: "chainlink", color: "375BD2" },
  { name: "Polkadot", slug: "polkadot", color: "E6007A" },
  { name: "Cardano", slug: "cardano", color: "0033AD" },
  { name: "Arbitrum", slug: "arbitrum", color: "28A0F0" },
  { name: "Optimism", slug: "optimism", color: "FF0420" },
  { name: "Base", slug: "base", color: "0052FF" },
  { name: "Uniswap", slug: "uniswap", color: "FF007A" },
  { name: "Aave", slug: "aave", color: "B6509E" },
  { name: "Lido", slug: "lido", color: "00A3FF" },
  { name: "OpenSea", slug: "opensea", color: "2081E2" },
  { name: "MetaMask", slug: "metamask", color: "F6851B" },
  { name: "Ledger", slug: "ledger", color: "000000" },
  { name: "Coinbase", slug: "coinbase", color: "0052FF" },
  { name: "Binance", slug: "binance", color: "F0B90B" },
  { name: "Near", slug: "near", color: "000000" },
  { name: "Aptos", slug: "aptos", color: "FFFFFF" },
  { name: "Sui", slug: "sui", color: "4DA2FF" },
  { name: "The Graph", slug: "thegraph", color: "674C9A" },
  { name: "ZKsync", slug: "zksync", color: "8C8DFC" },
  { name: "Starknet", slug: "starknet", color: "070C2A" },
  { name: "IPFS", slug: "ipfs", color: "65C2CB" },
];

function LogoCloud({ reverse }: { reverse?: boolean }) {
  const items = [...LOGOS, ...LOGOS];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex w-max items-center gap-14 py-2 ${
          reverse ? "animate-marquee-right" : "animate-marquee-left"
        } hover:[animation-play-state:paused]`}
        style={{ animationDuration: "25s" }}
      >
        {items.map((logo, i) => (
          <div
            key={`${logo.slug}-${i}`}
            className="flex h-10 w-28 shrink-0 items-center justify-center"
          >
            <img
              src={`https://cdn.simpleicons.org/${logo.slug}/${logo.color}/a0aec0`}
              alt={logo.name}
              className="h-9 w-auto transition-all duration-500 hover:scale-110"
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

      <div className="container relative mx-auto max-w-[85vw] px-6">
        <div className="mx-auto mb-10 max-w-lg text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">
            Trusted Across the Ecosystem
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
