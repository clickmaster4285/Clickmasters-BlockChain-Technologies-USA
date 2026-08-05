"use client";

import { useMemo, useState } from "react";

type BlockchainGasCalculatorProps = {
  title?: string;
};

type NetworkPreset = {
  id: string;
  label: string;
  symbol: string;
  gasPrice: number;
  nativeTokenPrice: number;
};

type TransactionPreset = {
  id: string;
  label: string;
  gasLimit: number;
};

const networkPresets: NetworkPreset[] = [
  {
    id: "ethereum",
    label: "Ethereum",
    symbol: "ETH",
    gasPrice: 20,
    nativeTokenPrice: 3200,
  },
  {
    id: "polygon",
    label: "Polygon",
    symbol: "POL",
    gasPrice: 35,
    nativeTokenPrice: 0.45,
  },
  {
    id: "bnb-chain",
    label: "BNB Chain",
    symbol: "BNB",
    gasPrice: 3,
    nativeTokenPrice: 620,
  },
  {
    id: "avalanche",
    label: "Avalanche",
    symbol: "AVAX",
    gasPrice: 25,
    nativeTokenPrice: 38,
  },
  {
    id: "custom",
    label: "Custom Network",
    symbol: "TOKEN",
    gasPrice: 10,
    nativeTokenPrice: 1,
  },
];

const transactionPresets: TransactionPreset[] = [
  {
    id: "native-transfer",
    label: "Native Token Transfer",
    gasLimit: 21000,
  },
  {
    id: "erc20-transfer",
    label: "Token Transfer",
    gasLimit: 65000,
  },
  {
    id: "nft-mint",
    label: "NFT Mint",
    gasLimit: 150000,
  },
  {
    id: "token-swap",
    label: "DEX Token Swap",
    gasLimit: 180000,
  },
  {
    id: "contract-deployment",
    label: "Contract Deployment",
    gasLimit: 1200000,
  },
  {
    id: "custom",
    label: "Custom Transaction",
    gasLimit: 100000,
  },
];

export default function BlockchainGasCalculator({
  title = "Blockchain Gas Calculator",
}: BlockchainGasCalculatorProps) {
  const [networkId, setNetworkId] = useState("ethereum");

  const [transactionId, setTransactionId] = useState("native-transfer");

  const [gasLimit, setGasLimit] = useState("21000");

  const [gasPrice, setGasPrice] = useState("20");

  const [nativeTokenPrice, setNativeTokenPrice] = useState("3200");

  const [transactionCount, setTransactionCount] = useState("1");

  const selectedNetwork =
    networkPresets.find((network) => network.id === networkId) ??
    networkPresets[0];

  const result = useMemo(() => {
    const parsedGasLimit = parsePositiveNumber(gasLimit);

    const parsedGasPrice = parsePositiveNumber(gasPrice);

    const parsedTokenPrice = parsePositiveNumber(nativeTokenPrice);

    const parsedTransactionCount = parsePositiveNumber(transactionCount);

    const feePerTransactionNative =
      (parsedGasLimit * parsedGasPrice) / 1_000_000_000;

    const feePerTransactionUsd = feePerTransactionNative * parsedTokenPrice;

    const totalNative = feePerTransactionNative * parsedTransactionCount;

    const totalUsd = feePerTransactionUsd * parsedTransactionCount;

    return {
      parsedGasLimit,
      parsedGasPrice,
      parsedTokenPrice,
      parsedTransactionCount,
      feePerTransactionNative,
      feePerTransactionUsd,
      totalNative,
      totalUsd,
    };
  }, [gasLimit, gasPrice, nativeTokenPrice, transactionCount]);

  function handleNetworkChange(value: string) {
    const network = networkPresets.find((item) => item.id === value);

    if (!network) {
      return;
    }

    setNetworkId(value);
    setGasPrice(String(network.gasPrice));
    setNativeTokenPrice(String(network.nativeTokenPrice));
  }

  function handleTransactionChange(value: string) {
    const transaction = transactionPresets.find((item) => item.id === value);

    if (!transaction) {
      return;
    }

    setTransactionId(value);
    setGasLimit(String(transaction.gasLimit));
  }

  function handleReset() {
    setNetworkId("ethereum");
    setTransactionId("native-transfer");
    setGasLimit("21000");
    setGasPrice("20");
    setNativeTokenPrice("3200");
    setTransactionCount("1");
  }

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/10 bg-slate-950 text-white shadow-[0_24px_90px_rgba(0,0,0,0.22)]">
      <CalculatorHeader title={title} onReset={handleReset} />

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.82fr)]">
        <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="grid gap-6 sm:grid-cols-2">
            <SelectField
              id="blockchain-network"
              label="Blockchain network"
              value={networkId}
              onChange={handleNetworkChange}
              helpText="Choose a preset or use custom values."
              options={networkPresets.map((network) => ({
                value: network.id,
                label: network.label,
              }))}
            />

            <SelectField
              id="transaction-type"
              label="Transaction type"
              value={transactionId}
              onChange={handleTransactionChange}
              helpText="Applies an estimated gas limit."
              options={transactionPresets.map((transaction) => ({
                value: transaction.id,
                label: transaction.label,
              }))}
            />

            <NumberField
              id="gas-limit"
              label="Gas limit"
              value={gasLimit}
              onChange={setGasLimit}
              suffix="Gas"
              min={0}
              step={1000}
              helpText="Maximum computation units available."
            />

            <NumberField
              id="gas-price"
              label="Gas price"
              value={gasPrice}
              onChange={setGasPrice}
              suffix="Gwei"
              min={0}
              step={0.1}
              helpText="Network price paid per gas unit."
            />

            <NumberField
              id="native-token-price"
              label={`${selectedNetwork.symbol} price`}
              value={nativeTokenPrice}
              onChange={setNativeTokenPrice}
              prefix="$"
              min={0}
              step={0.01}
              helpText="Current native token market price."
            />

            <NumberField
              id="transaction-count"
              label="Number of transactions"
              value={transactionCount}
              onChange={setTransactionCount}
              suffix="Tx"
              min={1}
              step={1}
              helpText="Estimate one or multiple transactions."
            />
          </div>

          <FormulaNote symbol={selectedNetwork.symbol} />
        </div>

        <GasResults symbol={selectedNetwork.symbol} result={result} />
      </div>
    </div>
  );
}

/* =========================================================
   Header
========================================================= */

function CalculatorHeader({
  title,
  onReset,
}: {
  title: string;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col gap-5 border-b border-white/10 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
          Gas cost estimator
        </span>

        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
          {title}
        </h3>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] px-5 py-2 text-sm font-medium text-white/60 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
      >
        Reset values
      </button>
    </div>
  );
}

/* =========================================================
   Form Controls
========================================================= */

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  helpText,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
  }>;
  helpText?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-white/75">
        {label}
      </label>

      <div className="relative mt-2">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-12 w-full appearance-none rounded-xl border border-white/10 bg-[#0a1711] px-4 pr-10 text-sm text-white outline-none transition focus:border-amber-base/50 focus:ring-2 focus:ring-amber-base/15"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/40"
        >
          ▼
        </span>
      </div>

      {helpText && (
        <p className="mt-2 text-xs leading-5 text-white/35">{helpText}</p>
      )}
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  min,
  step,
  helpText,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  step?: number;
  helpText?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-white/75">
        {label}
      </label>

      <div className="relative mt-2">
        {prefix && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-white/40">
            {prefix}
          </span>
        )}

        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          step={step}
          onChange={(event) => onChange(event.target.value)}
          className={`min-h-12 w-full rounded-xl border border-white/10 bg-[#0a1711] py-3 text-sm text-white outline-none transition focus:border-amber-base/50 focus:ring-2 focus:ring-amber-base/15 ${
            prefix ? "pl-8" : "pl-4"
          } ${suffix ? "pr-16" : "pr-4"}`}
        />

        {suffix && (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium uppercase tracking-[0.08em] text-white/35">
            {suffix}
          </span>
        )}
      </div>

      {helpText && (
        <p className="mt-2 text-xs leading-5 text-white/35">{helpText}</p>
      )}
    </div>
  );
}

/* =========================================================
   Results
========================================================= */

function GasResults({
  symbol,
  result,
}: {
  symbol: string;
  result: {
    parsedGasLimit: number;
    parsedGasPrice: number;
    parsedTokenPrice: number;
    parsedTransactionCount: number;
    feePerTransactionNative: number;
    feePerTransactionUsd: number;
    totalNative: number;
    totalUsd: number;
  };
}) {
  const validInputs =
    result.parsedGasLimit > 0 &&
    result.parsedGasPrice >= 0 &&
    result.parsedTokenPrice >= 0 &&
    result.parsedTransactionCount > 0;

  return (
    <aside className="relative overflow-hidden bg-amber-base/[0.06] p-6 sm:p-8">
      <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-64 w-64 rounded-full bg-amber-base/10 blur-[90px]" />

      <div className="relative">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
          Estimated result
        </span>

        <p className="mt-3 text-sm leading-7 text-white/45">
          Estimated cost based on the current values entered.
        </p>

        {validInputs ? (
          <>
            <div className="mt-8 rounded-[24px] border border-amber-base/20 bg-amber-base/[0.10] p-6">
              <p className="text-sm text-white/45">Total transaction cost</p>

              <p className="mt-3 break-words text-4xl font-semibold tracking-[-0.045em] text-amber-300 sm:text-5xl">
                {formatUsd(result.totalUsd)}
              </p>

              <p className="mt-3 text-sm font-medium text-white/60">
                {formatNativeToken(result.totalNative)} {symbol}
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <ResultCard
                label="Cost per transaction"
                value={formatUsd(result.feePerTransactionUsd)}
                detail={`${formatNativeToken(
                  result.feePerTransactionNative,
                )} ${symbol}`}
              />

              <ResultCard
                label="Transaction count"
                value={formatNumber(result.parsedTransactionCount, 0)}
                detail="Estimated operations"
              />

              <ResultCard
                label="Gas required"
                value={formatNumber(
                  result.parsedGasLimit * result.parsedTransactionCount,
                  0,
                )}
                detail="Total gas units"
              />

              <ResultCard
                label="Applied gas price"
                value={`${formatNumber(result.parsedGasPrice, 2)} Gwei`}
                detail={`${formatUsd(result.parsedTokenPrice)} per ${symbol}`}
              />
            </div>

            <CostIndicator totalUsd={result.totalUsd} />
          </>
        ) : (
          <InvalidResult />
        )}
      </div>
    </aside>
  );
}

function ResultCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.025] p-4">
      <p className="text-xs uppercase tracking-[0.12em] text-white/35">
        {label}
      </p>

      <p className="mt-2 break-words text-lg font-semibold text-white/80">
        {value}
      </p>

      <p className="mt-1 text-xs leading-5 text-white/35">{detail}</p>
    </div>
  );
}

/* =========================================================
   Cost Indicator
========================================================= */

function CostIndicator({ totalUsd }: { totalUsd: number }) {
  const level = getCostLevel(totalUsd);

  return (
    <div className="mt-6 rounded-[18px] border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-white/65">Estimated fee level</p>

        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-amber-300">
          {level.label}
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full bg-amber-base transition-[width] duration-500"
          style={{
            width: `${level.progress}%`,
          }}
        />
      </div>

      <p className="mt-3 text-xs leading-5 text-white/35">
        {level.description}
      </p>
    </div>
  );
}

/* =========================================================
   Formula
========================================================= */

function FormulaNote({ symbol }: { symbol: string }) {
  return (
    <div className="mt-8 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">
        Calculation formula
      </p>

      <code className="mt-3 block overflow-x-auto whitespace-nowrap text-sm leading-7 text-white/60">
        Gas limit × Gas price ÷ 1,000,000,000 × {symbol} price × Transactions
      </code>

      <p className="mt-3 text-xs leading-5 text-white/35">
        This calculator uses a user-provided gas price and token value. It does
        not fetch live network data.
      </p>
    </div>
  );
}

/* =========================================================
   Empty / Invalid State
========================================================= */

function InvalidResult() {
  return (
    <div className="mt-8 rounded-[24px] border border-amber-300/20 bg-amber-300/[0.05] p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/[0.08] font-semibold text-amber-200">
        !
      </span>

      <h4 className="mt-5 text-xl font-semibold text-white">
        Enter valid values
      </h4>

      <p className="mt-3 text-sm leading-7 text-white/50">
        Gas limit and transaction count must be greater than zero. Prices cannot
        be negative.
      </p>
    </div>
  );
}

/* =========================================================
   Utilities
========================================================= */

function parsePositiveNumber(value: string): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return parsed;
}

function formatUsd(value: number): string {
  const maximumFractionDigits = Math.abs(value) < 0.01 ? 6 : 2;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatNativeToken(value: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 9,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatNumber(value: number, maximumFractionDigits = 2): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(Number.isFinite(value) ? value : 0);
}

function getCostLevel(totalUsd: number): {
  label: string;
  progress: number;
  description: string;
} {
  if (totalUsd < 1) {
    return {
      label: "Very low",
      progress: 20,
      description:
        "Estimated cost is below $1 for the selected transaction count.",
    };
  }

  if (totalUsd < 10) {
    return {
      label: "Low",
      progress: 40,
      description:
        "Estimated cost is relatively low for most blockchain operations.",
    };
  }

  if (totalUsd < 50) {
    return {
      label: "Moderate",
      progress: 60,
      description:
        "Review gas conditions before processing a large transaction batch.",
    };
  }

  if (totalUsd < 200) {
    return {
      label: "High",
      progress: 80,
      description:
        "Consider waiting for lower network demand or optimizing contract execution.",
    };
  }

  return {
    label: "Very high",
    progress: 100,
    description:
      "The estimated fee is high. Review the gas limit, price, and transaction count.",
  };
}
