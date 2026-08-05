"use client";

import { useMemo, useState } from "react";

type DefiYieldCalculatorProps = {
  title?: string;
};

type CompoundingFrequency = {
  id: string;
  label: string;
  periodsPerYear: number;
};

type ProjectionPoint = {
  year: number;
  balance: number;
  profit: number;
  contributions: number;
};

const compoundingFrequencies: CompoundingFrequency[] = [
  {
    id: "daily",
    label: "Daily",
    periodsPerYear: 365,
  },
  {
    id: "weekly",
    label: "Weekly",
    periodsPerYear: 52,
  },
  {
    id: "monthly",
    label: "Monthly",
    periodsPerYear: 12,
  },
  {
    id: "quarterly",
    label: "Quarterly",
    periodsPerYear: 4,
  },
  {
    id: "annually",
    label: "Annually",
    periodsPerYear: 1,
  },
];

export default function DefiYieldCalculator({
  title = "DeFi Yield Calculator",
}: DefiYieldCalculatorProps) {
  const [initialDeposit, setInitialDeposit] = useState("10000");

  const [annualRate, setAnnualRate] = useState("8");

  const [durationYears, setDurationYears] = useState("3");

  const [monthlyContribution, setMonthlyContribution] = useState("0");

  const [protocolFee, setProtocolFee] = useState("0");

  const [tokenPriceChange, setTokenPriceChange] = useState("0");

  const [compoundingId, setCompoundingId] = useState("daily");

  const selectedFrequency =
    compoundingFrequencies.find(
      (frequency) => frequency.id === compoundingId,
    ) ?? compoundingFrequencies[0];

  const result = useMemo(() => {
    const deposit = parseNonNegativeNumber(initialDeposit);

    const rate = parseNonNegativeNumber(annualRate);

    const years = parseNonNegativeNumber(durationYears);

    const contribution = parseNonNegativeNumber(monthlyContribution);

    const fee = clamp(parseNonNegativeNumber(protocolFee), 0, 100);

    const priceChange = parseSignedNumber(tokenPriceChange);

    const periodsPerYear = selectedFrequency.periodsPerYear;

    const grossRateDecimal = rate / 100;

    const netAnnualRate = grossRateDecimal * (1 - fee / 100);

    const totalCompoundingPeriods = Math.round(years * periodsPerYear);

    const periodicRate =
      periodsPerYear > 0 ? netAnnualRate / periodsPerYear : 0;

    const contributionPerPeriod =
      periodsPerYear > 0 ? (contribution * 12) / periodsPerYear : 0;

    let balance = deposit;

    for (let period = 0; period < totalCompoundingPeriods; period += 1) {
      balance = balance * (1 + periodicRate) + contributionPerPeriod;
    }

    const totalContributions = deposit + contribution * 12 * years;

    const yieldProfit = Math.max(balance - totalContributions, 0);

    const tokenMultiplier = Math.max(0, 1 + priceChange / 100);

    const adjustedFinalValue = balance * tokenMultiplier;

    const tokenImpact = adjustedFinalValue - balance;

    const adjustedProfit = adjustedFinalValue - totalContributions;

    const effectiveApy =
      periodsPerYear > 0
        ? (Math.pow(1 + netAnnualRate / periodsPerYear, periodsPerYear) - 1) *
          100
        : 0;

    const grossAnnualYield = deposit * grossRateDecimal;

    const estimatedAnnualFee = grossAnnualYield * (fee / 100);

    const projection = buildProjection({
      deposit,
      contribution,
      years,
      netAnnualRate,
      periodsPerYear,
      tokenMultiplier,
    });

    return {
      deposit,
      rate,
      years,
      contribution,
      fee,
      priceChange,
      balance,
      totalContributions,
      yieldProfit,
      adjustedFinalValue,
      tokenImpact,
      adjustedProfit,
      effectiveApy,
      estimatedAnnualFee,
      projection,
    };
  }, [
    initialDeposit,
    annualRate,
    durationYears,
    monthlyContribution,
    protocolFee,
    tokenPriceChange,
    selectedFrequency,
  ]);

  function handleReset() {
    setInitialDeposit("10000");
    setAnnualRate("8");
    setDurationYears("3");
    setMonthlyContribution("0");
    setProtocolFee("0");
    setTokenPriceChange("0");
    setCompoundingId("daily");
  }

  const hasValidInputs =
    result.deposit >= 0 && result.rate >= 0 && result.years > 0;

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/10 bg-slate-950 text-white shadow-[0_24px_90px_rgba(0,0,0,0.22)]">
      <CalculatorHeader title={title} onReset={handleReset} />

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.88fr)]">
        <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="grid gap-6 sm:grid-cols-2">
            <NumberField
              id="initial-deposit"
              label="Initial deposit"
              value={initialDeposit}
              onChange={setInitialDeposit}
              prefix="$"
              min={0}
              step={100}
              helpText="Starting value supplied to the protocol."
            />

            <NumberField
              id="annual-rate"
              label="Advertised annual rate"
              value={annualRate}
              onChange={setAnnualRate}
              suffix="%"
              min={0}
              step={0.1}
              helpText="Enter the protocol's projected APR."
            />

            <NumberField
              id="investment-duration"
              label="Investment duration"
              value={durationYears}
              onChange={setDurationYears}
              suffix="Years"
              min={0.1}
              step={0.1}
              helpText="How long funds remain deposited."
            />

            <NumberField
              id="monthly-contribution"
              label="Monthly contribution"
              value={monthlyContribution}
              onChange={setMonthlyContribution}
              prefix="$"
              min={0}
              step={25}
              helpText="Optional recurring capital contribution."
            />

            <SelectField
              id="compounding-frequency"
              label="Compounding frequency"
              value={compoundingId}
              onChange={setCompoundingId}
              options={compoundingFrequencies.map((frequency) => ({
                value: frequency.id,
                label: frequency.label,
              }))}
              helpText="How often earned yield is reinvested."
            />

            <NumberField
              id="protocol-fee"
              label="Protocol fee on yield"
              value={protocolFee}
              onChange={setProtocolFee}
              suffix="%"
              min={0}
              max={100}
              step={0.1}
              helpText="Fee deducted from generated yield."
            />

            <div className="sm:col-span-2">
              <NumberField
                id="token-price-change"
                label="Estimated token price change"
                value={tokenPriceChange}
                onChange={setTokenPriceChange}
                suffix="%"
                step={1}
                helpText="Optional scenario for appreciation or depreciation of the deposited asset."
              />
            </div>
          </div>

          <ScenarioPresets
            onSelect={(preset) => {
              setAnnualRate(String(preset.annualRate));
              setProtocolFee(String(preset.protocolFee));
              setTokenPriceChange(String(preset.priceChange));
            }}
          />

          <FormulaNote />
        </div>

        <YieldResults
          result={result}
          hasValidInputs={hasValidInputs}
          compoundingLabel={selectedFrequency.label}
        />
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
          Yield projection tool
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
   Form Fields
========================================================= */

function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  min,
  max,
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
  max?: number;
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
          max={max}
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

/* =========================================================
   Scenario Presets
========================================================= */

function ScenarioPresets({
  onSelect,
}: {
  onSelect: (preset: {
    annualRate: number;
    protocolFee: number;
    priceChange: number;
  }) => void;
}) {
  const presets = [
    {
      label: "Conservative",
      annualRate: 4,
      protocolFee: 5,
      priceChange: -5,
    },
    {
      label: "Balanced",
      annualRate: 8,
      protocolFee: 3,
      priceChange: 0,
    },
    {
      label: "Optimistic",
      annualRate: 15,
      protocolFee: 2,
      priceChange: 10,
    },
  ];

  return (
    <div className="mt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
        Quick scenarios
      </p>

      <div className="mt-3 flex flex-wrap gap-3">
        {presets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => onSelect(preset)}
            className="rounded-full border border-white/10 bg-slate-950 text-white shadow-[0_24px_90px_rgba(0,0,0,0.22)] px-4 py-2 text-xs font-semibold text-white/55 transition hover:border-amber-base/30 hover:bg-amber-base/[0.10] hover:text-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-base/50"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   Results
========================================================= */

function YieldResults({
  result,
  hasValidInputs,
  compoundingLabel,
}: {
  result: {
    deposit: number;
    rate: number;
    years: number;
    contribution: number;
    fee: number;
    priceChange: number;
    balance: number;
    totalContributions: number;
    yieldProfit: number;
    adjustedFinalValue: number;
    tokenImpact: number;
    adjustedProfit: number;
    effectiveApy: number;
    estimatedAnnualFee: number;
    projection: ProjectionPoint[];
  };
  hasValidInputs: boolean;
  compoundingLabel: string;
}) {
  return (
    <aside className="relative overflow-hidden bg-amber-base/[0.06] p-6 sm:p-8">
      <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-64 w-64 rounded-full bg-amber-base/10 blur-[90px]" />

      <div className="relative">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
          Estimated outcome
        </span>

        <p className="mt-3 text-sm leading-7 text-white/45">
          Projection based on your rate, compounding schedule, fees, and token
          price scenario.
        </p>

        {hasValidInputs ? (
          <>
            <div className="mt-8 rounded-[24px] border border-amber-base/20 bg-amber-base/[0.10] p-6">
              <p className="text-sm text-white/45">Projected final value</p>

              <p className="mt-3 break-words text-4xl font-semibold tracking-[-0.045em] text-amber-300 sm:text-5xl">
                {formatCurrency(result.adjustedFinalValue)}
              </p>

              <p
                className={`mt-3 text-sm font-medium ${
                  result.adjustedProfit >= 0
                    ? "text-amber-200/75"
                    : "text-rose-300/80"
                }`}
              >
                {formatSignedCurrency(result.adjustedProfit)} versus contributed
                capital
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <ResultCard
                label="Yield earned"
                value={formatCurrency(result.yieldProfit)}
                detail="Before token price adjustment"
              />

              <ResultCard
                label="Effective APY"
                value={`${formatNumber(result.effectiveApy, 2)}%`}
                detail={`${compoundingLabel} compounding`}
              />

              <ResultCard
                label="Capital contributed"
                value={formatCurrency(result.totalContributions)}
                detail="Deposit plus recurring additions"
              />

              <ResultCard
                label="Token price impact"
                value={formatSignedCurrency(result.tokenImpact)}
                detail={`${formatSignedPercent(
                  result.priceChange,
                )} price scenario`}
                valueClassName={
                  result.tokenImpact >= 0 ? "text-amber-200" : "text-rose-300"
                }
              />

              <ResultCard
                label="Protocol fee estimate"
                value={formatCurrency(result.estimatedAnnualFee)}
                detail={`${formatNumber(result.fee, 2)}% of gross annual yield`}
              />

              <ResultCard
                label="Base compounded balance"
                value={formatCurrency(result.balance)}
                detail="Before asset price movement"
              />
            </div>

            <YieldBreakdown result={result} />

            <ProjectionChart projection={result.projection} />
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
  valueClassName = "text-white/80",
}: {
  label: string;
  value: string;
  detail: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.025] p-4">
      <p className="text-xs uppercase tracking-[0.12em] text-white/35">
        {label}
      </p>

      <p className={`mt-2 break-words text-lg font-semibold ${valueClassName}`}>
        {value}
      </p>

      <p className="mt-1 text-xs leading-5 text-white/35">{detail}</p>
    </div>
  );
}

/* =========================================================
   Yield Breakdown
========================================================= */

function YieldBreakdown({
  result,
}: {
  result: {
    totalContributions: number;
    yieldProfit: number;
    tokenImpact: number;
    adjustedFinalValue: number;
  };
}) {
  const total = Math.max(Math.abs(result.adjustedFinalValue), 1);

  const contributionShare = clamp(
    (result.totalContributions / total) * 100,
    0,
    100,
  );

  const yieldShare = clamp((result.yieldProfit / total) * 100, 0, 100);

  const positiveTokenShare = clamp(
    (Math.max(result.tokenImpact, 0) / total) * 100,
    0,
    100,
  );

  return (
    <div className="mt-6 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-white/65">
          Final value composition
        </p>

        <span className="text-xs text-white/35">Scenario estimate</span>
      </div>

      <div
        className="mt-4 flex h-3 overflow-hidden rounded-full bg-white/[0.07]"
        aria-label="Final value composition"
      >
        <div
          className="h-full bg-white/30"
          style={{
            width: `${contributionShare}%`,
          }}
          title="Contributed capital"
        />

        <div
          className="h-full bg-amber-base"
          style={{
            width: `${yieldShare}%`,
          }}
          title="Yield earned"
        />

        <div
          className="h-full bg-cyan-300"
          style={{
            width: `${positiveTokenShare}%`,
          }}
          title="Positive token impact"
        />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        <LegendItem
          label="Contributions"
          value={formatCurrency(result.totalContributions)}
          markerClassName="bg-white/40"
        />

        <LegendItem
          label="Yield"
          value={formatCurrency(result.yieldProfit)}
          markerClassName="bg-amber-base"
        />

        <LegendItem
          label="Token impact"
          value={formatSignedCurrency(result.tokenImpact)}
          markerClassName={
            result.tokenImpact >= 0 ? "bg-cyan-300" : "bg-rose-300"
          }
        />
      </div>
    </div>
  );
}

function LegendItem({
  label,
  value,
  markerClassName,
}: {
  label: string;
  value: string;
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
      </div>
    </div>
  );
}

/* =========================================================
   Projection Chart
========================================================= */

function ProjectionChart({ projection }: { projection: ProjectionPoint[] }) {
  if (projection.length < 2) {
    return null;
  }

  const maxBalance = Math.max(...projection.map((point) => point.balance), 1);

  const chartWidth = 560;
  const chartHeight = 180;
  const paddingX = 12;
  const paddingY = 16;

  const points = projection
    .map((point, index) => {
      const x =
        paddingX +
        (index / Math.max(projection.length - 1, 1)) *
          (chartWidth - paddingX * 2);

      const y =
        chartHeight -
        paddingY -
        (point.balance / maxBalance) * (chartHeight - paddingY * 2);

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="mt-6 overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white/65">Growth projection</p>

          <p className="mt-1 text-xs text-white/35">
            Estimated portfolio value over time
          </p>
        </div>

        <span className="text-xs font-semibold text-amber-300">
          {projection.length - 1} years
        </span>
      </div>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          role="img"
          aria-label="Projected DeFi portfolio growth chart"
          className="h-auto min-w-[460px] overflow-visible"
        >
          <defs>
            <linearGradient id="defi-yield-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />

              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75].map((position) => {
            const y = chartHeight * position;

            return (
              <line
                key={position}
                x1="0"
                x2={chartWidth}
                y1={y}
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.08"
                strokeDasharray="4 6"
              />
            );
          })}

          <polygon
            points={`${paddingX},${chartHeight - paddingY} ${points} ${
              chartWidth - paddingX
            },${chartHeight - paddingY}`}
            fill="url(#defi-yield-area)"
            className="text-amber-400"
          />

          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-400"
          />

          {projection.map((point, index) => {
            const x =
              paddingX +
              (index / Math.max(projection.length - 1, 1)) *
                (chartWidth - paddingX * 2);

            const y =
              chartHeight -
              paddingY -
              (point.balance / maxBalance) * (chartHeight - paddingY * 2);

            return (
              <circle
                key={point.year}
                cx={x}
                cy={y}
                r="4"
                fill="currentColor"
                className="text-amber-300"
                aria-label={`Year ${point.year}: ${formatCurrency(
                  point.balance,
                )}`}
              />
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex justify-between gap-4 text-xs text-white/35">
        <span>Year {projection[0].year}</span>

        <span>Year {projection[projection.length - 1].year}</span>
      </div>
    </div>
  );
}

/* =========================================================
   Formula
========================================================= */

function FormulaNote() {
  return (
    <div className="mt-8 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">
        Calculation model
      </p>

      <code className="mt-3 block overflow-x-auto whitespace-nowrap text-sm leading-7 text-white/60">
        Balance × (1 + net rate ÷ periods) + recurring contribution
      </code>

      <p className="mt-3 text-xs leading-5 text-white/35">
        Results are estimates only. DeFi returns, token prices, protocol fees,
        liquidity, impermanent loss, smart-contract risk, and reward emissions
        can change significantly.
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
        The investment duration must be greater than zero. Deposits, rates,
        contributions, and fees cannot be negative.
      </p>
    </div>
  );
}

/* =========================================================
   Projection Logic
========================================================= */

function buildProjection({
  deposit,
  contribution,
  years,
  netAnnualRate,
  periodsPerYear,
  tokenMultiplier,
}: {
  deposit: number;
  contribution: number;
  years: number;
  netAnnualRate: number;
  periodsPerYear: number;
  tokenMultiplier: number;
}): ProjectionPoint[] {
  const wholeYears = Math.max(Math.ceil(years), 1);

  const points: ProjectionPoint[] = [
    {
      year: 0,
      balance: deposit,
      profit: 0,
      contributions: deposit,
    },
  ];

  let balance = deposit;
  let contributed = deposit;

  const periodicRate = periodsPerYear > 0 ? netAnnualRate / periodsPerYear : 0;

  const contributionPerPeriod =
    periodsPerYear > 0 ? (contribution * 12) / periodsPerYear : 0;

  const totalPeriods = Math.max(Math.round(years * periodsPerYear), 1);

  for (let period = 1; period <= totalPeriods; period += 1) {
    balance = balance * (1 + periodicRate) + contributionPerPeriod;

    contributed += contributionPerPeriod;

    const yearPosition = period / periodsPerYear;

    const isFullYear = period % periodsPerYear === 0;

    const isFinalPeriod = period === totalPeriods;

    if (isFullYear || isFinalPeriod) {
      const displayedYear = Math.min(Math.ceil(yearPosition), wholeYears);

      const adjustedBalance = balance * tokenMultiplier;

      const existingIndex = points.findIndex(
        (point) => point.year === displayedYear,
      );

      const point: ProjectionPoint = {
        year: displayedYear,
        balance: adjustedBalance,
        profit: adjustedBalance - contributed,
        contributions: contributed,
      };

      if (existingIndex >= 0) {
        points[existingIndex] = point;
      } else {
        points.push(point);
      }
    }
  }

  return points;
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

function parseSignedNumber(value: string): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return 0;
  }

  return parsed;
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

function formatCurrency(value: number): string {
  const safeValue = Number.isFinite(value) ? value : 0;

  const maximumFractionDigits = Math.abs(safeValue) < 1 ? 4 : 2;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits,
  }).format(safeValue);
}

function formatSignedCurrency(value: number): string {
  const safeValue = Number.isFinite(value) ? value : 0;

  const absoluteValue = formatCurrency(Math.abs(safeValue));

  if (safeValue > 0) {
    return `+${absoluteValue}`;
  }

  if (safeValue < 0) {
    return `-${absoluteValue}`;
  }

  return absoluteValue;
}

function formatNumber(value: number, maximumFractionDigits = 2): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatSignedPercent(value: number): string {
  const safeValue = Number.isFinite(value) ? value : 0;

  if (safeValue > 0) {
    return `+${formatNumber(safeValue, 2)}%`;
  }

  return `${formatNumber(safeValue, 2)}%`;
}
