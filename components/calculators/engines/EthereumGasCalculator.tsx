"use client";

import { useMemo, useState } from "react";

type EthereumGasCalculatorProps = {
  title?: string;
};

type TransactionPreset = {
  id: string;
  label: string;
  gasLimit: number;
  description: string;
};

type SpeedPreset = {
  id: string;
  label: string;
  priorityFee: number;
  description: string;
};

const transactionPresets: TransactionPreset[] = [
  {
    id: "eth-transfer",
    label: "ETH Transfer",
    gasLimit: 21000,
    description: "Standard transfer between Ethereum addresses.",
  },
  {
    id: "erc20-transfer",
    label: "ERC-20 Transfer",
    gasLimit: 65000,
    description: "Estimated token transfer through an ERC-20 contract.",
  },
  {
    id: "token-approval",
    label: "Token Approval",
    gasLimit: 50000,
    description: "Approval transaction before interacting with a protocol.",
  },
  {
    id: "uniswap-swap",
    label: "DEX Token Swap",
    gasLimit: 180000,
    description: "Estimated decentralized exchange token swap.",
  },
  {
    id: "nft-mint",
    label: "NFT Mint",
    gasLimit: 150000,
    description: "Estimated smart-contract interaction for minting an NFT.",
  },
  {
    id: "contract-deployment",
    label: "Contract Deployment",
    gasLimit: 1200000,
    description: "General estimate for deploying a medium-sized contract.",
  },
  {
    id: "custom",
    label: "Custom Transaction",
    gasLimit: 100000,
    description: "Enter your own estimated gas limit.",
  },
];

const speedPresets: SpeedPreset[] = [
  {
    id: "slow",
    label: "Slow",
    priorityFee: 0.5,
    description: "Lower tip with potentially slower confirmation.",
  },
  {
    id: "standard",
    label: "Standard",
    priorityFee: 1.5,
    description: "Balanced fee for normal confirmation conditions.",
  },
  {
    id: "fast",
    label: "Fast",
    priorityFee: 3,
    description: "Higher tip for faster transaction inclusion.",
  },
  {
    id: "urgent",
    label: "Urgent",
    priorityFee: 6,
    description: "Aggressive tip for time-sensitive transactions.",
  },
  {
    id: "custom",
    label: "Custom",
    priorityFee: 2,
    description: "Enter a custom maximum priority fee.",
  },
];

export default function EthereumGasCalculator({
  title = "Ethereum Gas Calculator",
}: EthereumGasCalculatorProps) {
  const [transactionType, setTransactionType] = useState("eth-transfer");

  const [speed, setSpeed] = useState("standard");

  const [gasLimit, setGasLimit] = useState("21000");

  const [baseFee, setBaseFee] = useState("18");

  const [priorityFee, setPriorityFee] = useState("1.5");

  const [maxFeePerGas, setMaxFeePerGas] = useState("37.5");

  const [ethPrice, setEthPrice] = useState("3200");

  const [transactionCount, setTransactionCount] = useState("1");

  const [includeSafetyBuffer, setIncludeSafetyBuffer] = useState(true);

  const selectedTransaction =
    transactionPresets.find((preset) => preset.id === transactionType) ??
    transactionPresets[0];

  const selectedSpeed =
    speedPresets.find((preset) => preset.id === speed) ?? speedPresets[1];

  const result = useMemo(() => {
    const parsedGasLimit = parseNonNegativeNumber(gasLimit);

    const parsedBaseFee = parseNonNegativeNumber(baseFee);

    const parsedPriorityFee = parseNonNegativeNumber(priorityFee);

    const parsedMaxFee = parseNonNegativeNumber(maxFeePerGas);

    const parsedEthPrice = parseNonNegativeNumber(ethPrice);

    const parsedTransactionCount = parseNonNegativeNumber(transactionCount);

    const safetyMultiplier = includeSafetyBuffer ? 1.1 : 1;

    const estimatedGasUsed = parsedGasLimit * safetyMultiplier;

    const likelyGasPrice = Math.min(
      parsedMaxFee,
      parsedBaseFee + parsedPriorityFee,
    );

    const maximumGasPrice = parsedMaxFee;

    const likelyFeeEth = (estimatedGasUsed * likelyGasPrice) / 1_000_000_000;

    const maximumFeeEth = (estimatedGasUsed * maximumGasPrice) / 1_000_000_000;

    const likelyFeeUsd = likelyFeeEth * parsedEthPrice;

    const maximumFeeUsd = maximumFeeEth * parsedEthPrice;

    const totalLikelyFeeEth = likelyFeeEth * parsedTransactionCount;

    const totalMaximumFeeEth = maximumFeeEth * parsedTransactionCount;

    const totalLikelyFeeUsd = likelyFeeUsd * parsedTransactionCount;

    const totalMaximumFeeUsd = maximumFeeUsd * parsedTransactionCount;

    const burnedFeeEth = (estimatedGasUsed * parsedBaseFee) / 1_000_000_000;

    const validatorTipEth =
      (estimatedGasUsed *
        Math.min(
          parsedPriorityFee,
          Math.max(parsedMaxFee - parsedBaseFee, 0),
        )) /
      1_000_000_000;

    const unusedFeePerGas = Math.max(parsedMaxFee - likelyGasPrice, 0);

    return {
      parsedGasLimit,
      parsedBaseFee,
      parsedPriorityFee,
      parsedMaxFee,
      parsedEthPrice,
      parsedTransactionCount,
      estimatedGasUsed,
      likelyGasPrice,
      maximumGasPrice,
      likelyFeeEth,
      maximumFeeEth,
      likelyFeeUsd,
      maximumFeeUsd,
      totalLikelyFeeEth,
      totalMaximumFeeEth,
      totalLikelyFeeUsd,
      totalMaximumFeeUsd,
      burnedFeeEth,
      validatorTipEth,
      unusedFeePerGas,
      safetyMultiplier,
    };
  }, [
    gasLimit,
    baseFee,
    priorityFee,
    maxFeePerGas,
    ethPrice,
    transactionCount,
    includeSafetyBuffer,
  ]);

  const hasValidInputs =
    result.parsedGasLimit > 0 &&
    result.parsedEthPrice >= 0 &&
    result.parsedTransactionCount > 0 &&
    result.parsedMaxFee >= 0;

  function handleTransactionChange(value: string) {
    const preset = transactionPresets.find((item) => item.id === value);

    if (!preset) {
      return;
    }

    setTransactionType(value);
    setGasLimit(String(preset.gasLimit));
  }

  function handleSpeedChange(value: string) {
    const preset = speedPresets.find((item) => item.id === value);

    if (!preset) {
      return;
    }

    setSpeed(value);
    setPriorityFee(String(preset.priorityFee));

    const currentBaseFee = parseNonNegativeNumber(baseFee);

    const recommendedMaxFee = currentBaseFee * 2 + preset.priorityFee;

    setMaxFeePerGas(formatInputNumber(recommendedMaxFee));
  }

  function handleBaseFeeChange(value: string) {
    setBaseFee(value);

    const parsedBaseFee = parseNonNegativeNumber(value);

    const parsedPriorityFee = parseNonNegativeNumber(priorityFee);

    setMaxFeePerGas(formatInputNumber(parsedBaseFee * 2 + parsedPriorityFee));
  }

  function handlePriorityFeeChange(value: string) {
    setPriorityFee(value);
    setSpeed("custom");
  }

  function handleReset() {
    setTransactionType("eth-transfer");
    setSpeed("standard");
    setGasLimit("21000");
    setBaseFee("18");
    setPriorityFee("1.5");
    setMaxFeePerGas("37.5");
    setEthPrice("3200");
    setTransactionCount("1");
    setIncludeSafetyBuffer(true);
  }

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/10 bg-slate-950 text-white shadow-[0_24px_90px_rgba(0,0,0,0.22)]">
      <CalculatorHeader title={title} onReset={handleReset} />

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.88fr)]">
        <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="grid gap-6 sm:grid-cols-2">
            <SelectField
              id="ethereum-transaction-type"
              label="Transaction type"
              value={transactionType}
              onChange={handleTransactionChange}
              options={transactionPresets.map((preset) => ({
                value: preset.id,
                label: preset.label,
              }))}
              helpText={selectedTransaction.description}
            />

            <SelectField
              id="transaction-speed"
              label="Transaction speed"
              value={speed}
              onChange={handleSpeedChange}
              options={speedPresets.map((preset) => ({
                value: preset.id,
                label: preset.label,
              }))}
              helpText={selectedSpeed.description}
            />

            <NumberField
              id="ethereum-gas-limit"
              label="Gas limit"
              value={gasLimit}
              onChange={setGasLimit}
              suffix="Gas"
              min={0}
              step={1000}
              helpText="Estimated maximum gas units required."
            />

            <NumberField
              id="ethereum-base-fee"
              label="Current base fee"
              value={baseFee}
              onChange={handleBaseFeeChange}
              suffix="Gwei"
              min={0}
              step={0.1}
              helpText="Minimum protocol fee determined by network demand."
            />

            <NumberField
              id="ethereum-priority-fee"
              label="Priority fee"
              value={priorityFee}
              onChange={handlePriorityFeeChange}
              suffix="Gwei"
              min={0}
              step={0.1}
              helpText="Optional validator tip added to the base fee."
            />

            <NumberField
              id="ethereum-max-fee"
              label="Maximum fee per gas"
              value={maxFeePerGas}
              onChange={setMaxFeePerGas}
              suffix="Gwei"
              min={0}
              step={0.1}
              helpText="Maximum total price you authorize per gas unit."
            />

            <NumberField
              id="ethereum-price"
              label="ETH market price"
              value={ethPrice}
              onChange={setEthPrice}
              prefix="$"
              min={0}
              step={0.01}
              helpText="Used to convert the fee estimate into USD."
            />

            <NumberField
              id="ethereum-transaction-count"
              label="Transaction count"
              value={transactionCount}
              onChange={setTransactionCount}
              suffix="Tx"
              min={1}
              step={1}
              helpText="Estimate one transaction or a transaction batch."
            />
          </div>

          <SafetyBufferToggle
            checked={includeSafetyBuffer}
            onChange={setIncludeSafetyBuffer}
          />

          <Eip1559Explanation />
        </div>

        <EthereumGasResults result={result} hasValidInputs={hasValidInputs} />
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
          EIP-1559 fee estimator
        </span>

        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
          {title}
        </h3>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] px-5 py-2 text-sm font-medium text-white/60 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-base/50"
      >
        Reset values
      </button>
    </div>
  );
}

/* =========================================================
   Fields
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
          } ${suffix ? "pr-20" : "pr-4"}`}
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
   Safety Buffer
========================================================= */

function SafetyBufferToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="mt-8 flex items-start justify-between gap-5 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <div>
        <label
          htmlFor="ethereum-safety-buffer"
          className="text-sm font-semibold text-white/70"
        >
          Include 10% gas safety buffer
        </label>

        <p className="mt-2 max-w-xl text-xs leading-5 text-white/35">
          Adds a small execution buffer to the estimated gas used. Unused gas is
          not charged by Ethereum.
        </p>
      </div>

      <button
        id="ethereum-safety-buffer"
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative mt-1 h-7 w-12 shrink-0 rounded-full border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-base/50 ${
          checked
            ? "border-amber-base/40 bg-amber-base/25"
            : "border-white/10 bg-white/[0.06]"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full transition ${
            checked ? "left-6 bg-emerald-300" : "left-1 bg-white/40"
          }`}
        />
      </button>
    </div>
  );
}

/* =========================================================
   Results
========================================================= */

function EthereumGasResults({
  result,
  hasValidInputs,
}: {
  result: {
    parsedGasLimit: number;
    parsedBaseFee: number;
    parsedPriorityFee: number;
    parsedMaxFee: number;
    parsedEthPrice: number;
    parsedTransactionCount: number;
    estimatedGasUsed: number;
    likelyGasPrice: number;
    maximumGasPrice: number;
    likelyFeeEth: number;
    maximumFeeEth: number;
    likelyFeeUsd: number;
    maximumFeeUsd: number;
    totalLikelyFeeEth: number;
    totalMaximumFeeEth: number;
    totalLikelyFeeUsd: number;
    totalMaximumFeeUsd: number;
    burnedFeeEth: number;
    validatorTipEth: number;
    unusedFeePerGas: number;
    safetyMultiplier: number;
  };
  hasValidInputs: boolean;
}) {
  return (
    <aside className="relative overflow-hidden bg-amber-base/[0.06] p-6 sm:p-8">
      <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-64 w-64 rounded-full bg-amber-base/10 blur-[90px]" />

      <div className="relative">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
          Estimated fee
        </span>

        <p className="mt-3 text-sm leading-7 text-white/45">
          Likely and maximum costs based on EIP-1559 fee settings.
        </p>

        {hasValidInputs ? (
          <>
            <div className="mt-8 rounded-[24px] border border-amber-base/20 bg-amber-base/[0.10] p-6">
              <p className="text-sm text-white/45">
                Likely total transaction cost
              </p>

              <p className="mt-3 break-words text-4xl font-semibold tracking-[-0.045em] text-amber-300 sm:text-5xl">
                {formatCurrency(result.totalLikelyFeeUsd)}
              </p>

              <p className="mt-3 text-sm font-medium text-white/60">
                {formatEth(result.totalLikelyFeeEth)} ETH for{" "}
                {formatNumber(result.parsedTransactionCount, 0)} transaction
                {result.parsedTransactionCount === 1 ? "" : "s"}
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <ResultCard
                label="Likely cost per transaction"
                value={formatCurrency(result.likelyFeeUsd)}
                detail={`${formatEth(result.likelyFeeEth)} ETH`}
              />

              <ResultCard
                label="Maximum authorized cost"
                value={formatCurrency(result.totalMaximumFeeUsd)}
                detail={`${formatEth(result.totalMaximumFeeEth)} ETH total`}
              />

              <ResultCard
                label="Likely gas price"
                value={`${formatNumber(result.likelyGasPrice, 2)} Gwei`}
                detail="Base fee plus effective priority fee"
              />

              <ResultCard
                label="Maximum gas price"
                value={`${formatNumber(result.maximumGasPrice, 2)} Gwei`}
                detail="Maximum authorized per gas unit"
              />

              <ResultCard
                label="Estimated gas used"
                value={formatNumber(result.estimatedGasUsed, 0)}
                detail={
                  result.safetyMultiplier > 1
                    ? "Includes 10% safety buffer"
                    : "No safety buffer applied"
                }
              />

              <ResultCard
                label="Unused fee allowance"
                value={`${formatNumber(result.unusedFeePerGas, 2)} Gwei`}
                detail="Not charged when the actual fee is lower"
              />
            </div>

            <FeeComposition result={result} />

            <FeeRiskIndicator
              baseFee={result.parsedBaseFee}
              maxFee={result.parsedMaxFee}
              priorityFee={result.parsedPriorityFee}
            />
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
   Fee Composition
========================================================= */

function FeeComposition({
  result,
}: {
  result: {
    burnedFeeEth: number;
    validatorTipEth: number;
    likelyFeeEth: number;
    parsedEthPrice: number;
  };
}) {
  const totalFee = Math.max(result.likelyFeeEth, 0.000000001);

  const burnedShare = clamp((result.burnedFeeEth / totalFee) * 100, 0, 100);

  const tipShare = clamp((result.validatorTipEth / totalFee) * 100, 0, 100);

  return (
    <div className="mt-6 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white/65">Fee composition</p>

          <p className="mt-1 text-xs text-white/35">
            Estimated fee for one transaction
          </p>
        </div>

        <span className="text-xs font-semibold text-amber-300">EIP-1559</span>
      </div>

      <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full bg-amber-base"
          style={{
            width: `${burnedShare}%`,
          }}
        />

        <div
          className="h-full bg-cyan-300"
          style={{
            width: `${tipShare}%`,
          }}
        />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <LegendItem
          label="Base fee burned"
          value={`${formatEth(result.burnedFeeEth)} ETH`}
          detail={formatCurrency(result.burnedFeeEth * result.parsedEthPrice)}
          markerClassName="bg-amber-base"
        />

        <LegendItem
          label="Validator priority fee"
          value={`${formatEth(result.validatorTipEth)} ETH`}
          detail={formatCurrency(
            result.validatorTipEth * result.parsedEthPrice,
          )}
          markerClassName="bg-cyan-300"
        />
      </div>
    </div>
  );
}

function LegendItem({
  label,
  value,
  detail,
  markerClassName,
}: {
  label: string;
  value: string;
  detail: string;
  markerClassName: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${markerClassName}`}
      />

      <div>
        <p className="text-xs text-white/35">{label}</p>

        <p className="mt-1 text-sm font-semibold text-white/70">{value}</p>

        <p className="mt-1 text-xs text-white/30">{detail}</p>
      </div>
    </div>
  );
}

/* =========================================================
   Risk Indicator
========================================================= */

function FeeRiskIndicator({
  baseFee,
  maxFee,
  priorityFee,
}: {
  baseFee: number;
  maxFee: number;
  priorityFee: number;
}) {
  const recommendedMinimum = baseFee + priorityFee;

  const ratio = recommendedMinimum > 0 ? maxFee / recommendedMinimum : 1;

  const status = getFeeConfigurationStatus(ratio);

  return (
    <div className="mt-6 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-white/65">Fee configuration</p>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full bg-amber-base transition-[width] duration-500"
          style={{
            width: `${status.progress}%`,
          }}
        />
      </div>

      <p className="mt-3 text-xs leading-5 text-white/35">
        {status.description}
      </p>
    </div>
  );
}

/* =========================================================
   Explanation
========================================================= */

function Eip1559Explanation() {
  return (
    <div className="mt-8 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">
        EIP-1559 formula
      </p>

      <code className="mt-3 block overflow-x-auto whitespace-nowrap text-sm leading-7 text-white/60">
        Gas used × min(max fee, base fee + priority fee)
      </code>

      <p className="mt-3 text-xs leading-5 text-white/35">
        The base fee is burned. The priority fee is paid to the validator. Any
        unused difference between the maximum fee and actual fee is not charged.
      </p>
    </div>
  );
}

/* =========================================================
   Invalid State
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
        Gas limit and transaction count must be greater than zero. Fee values
        and ETH price cannot be negative.
      </p>
    </div>
  );
}

/* =========================================================
   Utilities
========================================================= */

function parseNonNegativeNumber(value: string): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return parsed;
}

function formatInputNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return "0";
  }

  return String(Math.round(value * 100) / 100);
}

function formatCurrency(value: number): string {
  const safeValue = Number.isFinite(value) ? value : 0;

  const maximumFractionDigits = Math.abs(safeValue) < 0.01 ? 6 : 2;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits,
  }).format(safeValue);
}

function formatEth(value: number): string {
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

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

function getFeeConfigurationStatus(ratio: number): {
  label: string;
  progress: number;
  description: string;
  className: string;
} {
  if (ratio < 1) {
    return {
      label: "Too low",
      progress: 20,
      description:
        "The maximum fee is below the current base fee plus priority fee. The transaction may not be accepted.",
      className: "border-rose-300/20 bg-rose-300/[0.08] text-rose-200",
    };
  }

  if (ratio < 1.2) {
    return {
      label: "Tight",
      progress: 45,
      description:
        "The fee configuration may work, but it provides limited protection against a sudden base-fee increase.",
      className: "border-amber-300/20 bg-amber-300/[0.08] text-amber-200",
    };
  }

  if (ratio < 2.5) {
    return {
      label: "Balanced",
      progress: 70,
      description:
        "The maximum fee provides a reasonable buffer while unused fee allowance remains uncharged.",
      className: "border-emerald-300/20 bg-emerald-300/[0.08] text-amber-200",
    };
  }

  return {
    label: "Large buffer",
    progress: 100,
    description:
      "The authorized maximum fee is much higher than the likely fee. Ethereum only charges the actual amount used.",
    className: "border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200",
  };
}
