import dynamic from "next/dynamic";

import {
  getCalculatorEngineType,
  type CalculatorData,
  type CalculatorEngineType,
} from "@/lib/calculators";

/* =========================================================
   Lazy-loaded Calculator Engines
========================================================= */

const BlockchainGasCalculator = dynamic(
  () => import("./engines/BlockchainGasCalculator"),
  {
    loading: CalculatorEngineLoading,
  },
);

const DefiYieldCalculator = dynamic(
  () => import("./engines/DefiYieldCalculator"),
  {
    loading: CalculatorEngineLoading,
  },
);

const NFTRarityCalculator = dynamic(
  () => import("./engines/NFTRarityCalculator"),
  {
    loading: CalculatorEngineLoading,
  },
);

const ExchangeVolumeCalculator = dynamic(
  () => import("./engines/ExchangeVolumeCalculator"),
  {
    loading: CalculatorEngineLoading,
  },
);

const EthereumGasCalculator = dynamic(
  () => import("./engines/EthereumGasCalculator"),
  {
    loading: CalculatorEngineLoading,
  },
);

const SupplyChainROICalculator = dynamic(
  () => import("./engines/SupplyChainROICalculator"),
  {
    loading: CalculatorEngineLoading,
  },
);

const TokenEconomicsSimulator = dynamic(
  () => import("./engines/TokenEconomicsSimulator"),
  {
    loading: CalculatorEngineLoading,
  },
);

/* =========================================================
   Props
========================================================= */

type CalculatorEngineRendererProps = {
  calculator: CalculatorData;
};

/* =========================================================
   Main Renderer
========================================================= */

export default function CalculatorEngineRenderer({
  calculator,
}: CalculatorEngineRendererProps) {
  const engineType = getCalculatorEngineType(calculator.slug);

  if (!engineType) {
    return <UnsupportedCalculatorEngine title={calculator.title} />;
  }

  return renderCalculatorEngine(engineType, calculator.title);
}

/* =========================================================
   Engine Resolver
========================================================= */

function renderCalculatorEngine(
  engineType: NonNullable<CalculatorEngineType>,
  title: string,
) {
  switch (engineType) {
    case "blockchain-gas":
      return <BlockchainGasCalculator title={title} />;

    case "defi-yield":
      return <DefiYieldCalculator title={title} />;

    case "nft-rarity":
      return <NFTRarityCalculator title={title} />;

    case "exchange-volume":
      return <ExchangeVolumeCalculator title={title} />;

    case "ethereum-gas":
      return <EthereumGasCalculator title={title} />;

    case "supply-chain-roi":
      return <SupplyChainROICalculator title={title} />;

    case "token-economics":
      return <TokenEconomicsSimulator title={title} />;
  }
}

/* =========================================================
   Loading State
========================================================= */

function CalculatorEngineLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading calculator"
      className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 text-white shadow-[0_24px_90px_rgba(0,0,0,0.22)]"
    >
      <div className="border-b border-white/10 px-6 py-6 sm:px-8">
        <div className="h-4 w-32 animate-pulse rounded-full bg-white/10" />

        <div className="mt-4 h-8 w-64 max-w-full animate-pulse rounded-lg bg-white/10" />

        <div className="mt-4 h-4 w-full max-w-xl animate-pulse rounded-full bg-white/[0.07]" />
      </div>

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
        <div className="space-y-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-3 w-28 animate-pulse rounded-full bg-white/10" />

              <div className="h-12 animate-pulse rounded-xl bg-white/[0.06]" />
            </div>
          ))}
        </div>

        <div className="min-h-[320px] animate-pulse rounded-[24px] bg-white/[0.05]" />
      </div>
    </div>
  );
}

/* =========================================================
   Unsupported State
========================================================= */

function UnsupportedCalculatorEngine({ title }: { title: string }) {
  return (
    <div className="rounded-[2rem] border border-amber-400/20 bg-amber-400/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-lg font-black text-amber-300">
          !
        </span>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">
            Calculator unavailable
          </p>

          <h3 className="mt-3 text-2xl font-black text-white">{title}</h3>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            The interactive engine for this resource has not been configured.
            Check the calculator slug and confirm that its engine component
            exists.
          </p>
        </div>
      </div>
    </div>
  );
}
