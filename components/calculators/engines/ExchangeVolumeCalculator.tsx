"use client";

import { useMemo, useState } from "react";

type ExchangeVolumeCalculatorProps = {
  title?: string;
};

type TradingPairPreset = {
  id: string;
  label: string;
  averageTradeSize: number;
  makerFee: number;
  takerFee: number;
};

type VolumeResult = {
  dailyVolume: number;
  monthlyVolume: number;
  annualVolume: number;
  tradesPerDay: number;
  averageTradeSize: number;
  makerShare: number;
  takerShare: number;
  makerVolume: number;
  takerVolume: number;
  makerRevenueDaily: number;
  takerRevenueDaily: number;
  grossRevenueDaily: number;
  grossRevenueMonthly: number;
  grossRevenueAnnual: number;
  rebatesDaily: number;
  netRevenueDaily: number;
  netRevenueMonthly: number;
  netRevenueAnnual: number;
  effectiveFeeRate: number;
  averageRevenuePerTrade: number;
};

const tradingPairPresets: TradingPairPreset[] = [
  {
    id: "btc-usd",
    label: "BTC / USD",
    averageTradeSize: 2500,
    makerFee: 0.1,
    takerFee: 0.2,
  },
  {
    id: "eth-usd",
    label: "ETH / USD",
    averageTradeSize: 1200,
    makerFee: 0.1,
    takerFee: 0.2,
  },
  {
    id: "stablecoin",
    label: "Stablecoin Pair",
    averageTradeSize: 5000,
    makerFee: 0.04,
    takerFee: 0.08,
  },
  {
    id: "altcoin",
    label: "Altcoin Pair",
    averageTradeSize: 600,
    makerFee: 0.15,
    takerFee: 0.25,
  },
  {
    id: "institutional",
    label: "Institutional Market",
    averageTradeSize: 25000,
    makerFee: 0.02,
    takerFee: 0.05,
  },
  {
    id: "custom",
    label: "Custom Pair",
    averageTradeSize: 1000,
    makerFee: 0.1,
    takerFee: 0.2,
  },
];

export default function ExchangeVolumeCalculator({
  title = "Exchange Volume Calculator",
}: ExchangeVolumeCalculatorProps) {
  const [pairId, setPairId] = useState("btc-usd");

  const [tradesPerDay, setTradesPerDay] = useState("5000");

  const [averageTradeSize, setAverageTradeSize] = useState("2500");

  const [makerShare, setMakerShare] = useState("45");

  const [makerFee, setMakerFee] = useState("0.1");

  const [takerFee, setTakerFee] = useState("0.2");

  const [makerRebate, setMakerRebate] = useState("0");

  const [uptime, setUptime] = useState("99.9");

  const result = useMemo<VolumeResult>(() => {
    const parsedTradesPerDay = parseNonNegativeNumber(tradesPerDay);

    const parsedAverageTradeSize = parseNonNegativeNumber(averageTradeSize);

    const parsedMakerShare = clamp(parseNonNegativeNumber(makerShare), 0, 100);

    const parsedTakerShare = 100 - parsedMakerShare;

    const parsedMakerFee = parseNonNegativeNumber(makerFee);

    const parsedTakerFee = parseNonNegativeNumber(takerFee);

    const parsedMakerRebate = parseNonNegativeNumber(makerRebate);

    const parsedUptime = clamp(parseNonNegativeNumber(uptime), 0, 100);

    const uptimeMultiplier = parsedUptime / 100;

    const dailyVolume =
      parsedTradesPerDay * parsedAverageTradeSize * uptimeMultiplier;

    const monthlyVolume = dailyVolume * 30;

    const annualVolume = dailyVolume * 365;

    const makerVolume = dailyVolume * (parsedMakerShare / 100);

    const takerVolume = dailyVolume * (parsedTakerShare / 100);

    const makerRevenueDaily = makerVolume * (parsedMakerFee / 100);

    const takerRevenueDaily = takerVolume * (parsedTakerFee / 100);

    const grossRevenueDaily = makerRevenueDaily + takerRevenueDaily;

    const rebatesDaily = makerVolume * (parsedMakerRebate / 100);

    const netRevenueDaily = Math.max(grossRevenueDaily - rebatesDaily, 0);

    const grossRevenueMonthly = grossRevenueDaily * 30;

    const grossRevenueAnnual = grossRevenueDaily * 365;

    const netRevenueMonthly = netRevenueDaily * 30;

    const netRevenueAnnual = netRevenueDaily * 365;

    const effectiveFeeRate =
      dailyVolume > 0 ? (netRevenueDaily / dailyVolume) * 100 : 0;

    const averageRevenuePerTrade =
      parsedTradesPerDay > 0 ? netRevenueDaily / parsedTradesPerDay : 0;

    return {
      dailyVolume,
      monthlyVolume,
      annualVolume,
      tradesPerDay: parsedTradesPerDay,
      averageTradeSize: parsedAverageTradeSize,
      makerShare: parsedMakerShare,
      takerShare: parsedTakerShare,
      makerVolume,
      takerVolume,
      makerRevenueDaily,
      takerRevenueDaily,
      grossRevenueDaily,
      grossRevenueMonthly,
      grossRevenueAnnual,
      rebatesDaily,
      netRevenueDaily,
      netRevenueMonthly,
      netRevenueAnnual,
      effectiveFeeRate,
      averageRevenuePerTrade,
    };
  }, [
    tradesPerDay,
    averageTradeSize,
    makerShare,
    makerFee,
    takerFee,
    makerRebate,
    uptime,
  ]);

  const hasValidInputs = result.tradesPerDay > 0 && result.averageTradeSize > 0;

  function handlePairChange(value: string) {
    const preset = tradingPairPresets.find((item) => item.id === value);

    if (!preset) {
      return;
    }

    setPairId(value);
    setAverageTradeSize(String(preset.averageTradeSize));
    setMakerFee(String(preset.makerFee));
    setTakerFee(String(preset.takerFee));
  }

  function handleReset() {
    setPairId("btc-usd");
    setTradesPerDay("5000");
    setAverageTradeSize("2500");
    setMakerShare("45");
    setMakerFee("0.1");
    setTakerFee("0.2");
    setMakerRebate("0");
    setUptime("99.9");
  }

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/10 bg-slate-950 text-white shadow-[0_24px_90px_rgba(0,0,0,0.22)]">
      <CalculatorHeader title={title} onReset={handleReset} />

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.88fr)]">
        <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="grid gap-6 sm:grid-cols-2">
            <SelectField
              id="exchange-pair"
              label="Trading pair profile"
              value={pairId}
              onChange={handlePairChange}
              options={tradingPairPresets.map((preset) => ({
                value: preset.id,
                label: preset.label,
              }))}
              helpText="Applies typical trade-size and fee assumptions."
            />

            <NumberField
              id="trades-per-day"
              label="Trades per day"
              value={tradesPerDay}
              onChange={setTradesPerDay}
              suffix="Trades"
              min={0}
              step={1}
              helpText="Average number of completed trades each day."
            />

            <NumberField
              id="average-trade-size"
              label="Average trade size"
              value={averageTradeSize}
              onChange={setAverageTradeSize}
              prefix="$"
              min={0}
              step={100}
              helpText="Average notional value of each trade."
            />

            <NumberField
              id="maker-share"
              label="Maker volume share"
              value={makerShare}
              onChange={setMakerShare}
              suffix="%"
              min={0}
              max={100}
              step={1}
              helpText="Remaining volume is treated as taker volume."
            />

            <NumberField
              id="maker-fee"
              label="Maker fee"
              value={makerFee}
              onChange={setMakerFee}
              suffix="%"
              min={0}
              step={0.01}
              helpText="Fee charged on maker-side volume."
            />

            <NumberField
              id="taker-fee"
              label="Taker fee"
              value={takerFee}
              onChange={setTakerFee}
              suffix="%"
              min={0}
              step={0.01}
              helpText="Fee charged on taker-side volume."
            />

            <NumberField
              id="maker-rebate"
              label="Maker rebate"
              value={makerRebate}
              onChange={setMakerRebate}
              suffix="%"
              min={0}
              step={0.01}
              helpText="Optional rebate paid back on maker volume."
            />

            <NumberField
              id="exchange-uptime"
              label="Trading uptime"
              value={uptime}
              onChange={setUptime}
              suffix="%"
              min={0}
              max={100}
              step={0.1}
              helpText="Adjusts volume for downtime or maintenance."
            />
          </div>

          <VolumePresets
            onSelect={(preset) => {
              setTradesPerDay(String(preset.trades));
              setAverageTradeSize(String(preset.averageTradeSize));
              setMakerShare(String(preset.makerShare));
            }}
          />

          <FormulaNote />
        </div>

        <ExchangeResults result={result} hasValidInputs={hasValidInputs} />
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
          Exchange revenue model
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

/* =========================================================
   Volume Presets
========================================================= */

function VolumePresets({
  onSelect,
}: {
  onSelect: (preset: {
    trades: number;
    averageTradeSize: number;
    makerShare: number;
  }) => void;
}) {
  const presets = [
    {
      label: "Early stage",
      trades: 500,
      averageTradeSize: 750,
      makerShare: 35,
    },
    {
      label: "Growth",
      trades: 5000,
      averageTradeSize: 2500,
      makerShare: 45,
    },
    {
      label: "High volume",
      trades: 50000,
      averageTradeSize: 5000,
      makerShare: 55,
    },
  ];

  return (
    <div className="mt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
        Quick volume scenarios
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

function ExchangeResults({
  result,
  hasValidInputs,
}: {
  result: VolumeResult;
  hasValidInputs: boolean;
}) {
  return (
    <aside className="relative overflow-hidden bg-amber-base/[0.06] p-6 sm:p-8">
      <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-64 w-64 rounded-full bg-amber-base/10 blur-[90px]" />

      <div className="relative">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
          Estimated performance
        </span>

        <p className="mt-3 text-sm leading-7 text-white/45">
          Projected trading volume and fee revenue based on the entered activity
          profile.
        </p>

        {hasValidInputs ? (
          <>
            <div className="mt-8 rounded-[24px] border border-amber-base/20 bg-amber-base/[0.10] p-6">
              <p className="text-sm text-white/45">Estimated daily volume</p>

              <p className="mt-3 break-words text-4xl font-semibold tracking-[-0.045em] text-amber-300 sm:text-5xl">
                {formatCompactCurrency(result.dailyVolume)}
              </p>

              <p className="mt-3 text-sm font-medium text-white/60">
                {formatNumber(result.tradesPerDay, 0)} trades at an average of{" "}
                {formatCurrency(result.averageTradeSize)}
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <ResultCard
                label="Monthly volume"
                value={formatCompactCurrency(result.monthlyVolume)}
                detail="30-day estimate"
              />

              <ResultCard
                label="Annual volume"
                value={formatCompactCurrency(result.annualVolume)}
                detail="365-day estimate"
              />

              <ResultCard
                label="Net daily revenue"
                value={formatCurrency(result.netRevenueDaily)}
                detail="After maker rebates"
              />

              <ResultCard
                label="Net monthly revenue"
                value={formatCompactCurrency(result.netRevenueMonthly)}
                detail="30-day fee revenue"
              />

              <ResultCard
                label="Net annual revenue"
                value={formatCompactCurrency(result.netRevenueAnnual)}
                detail="365-day fee revenue"
              />

              <ResultCard
                label="Revenue per trade"
                value={formatCurrency(result.averageRevenuePerTrade)}
                detail="Average net revenue"
              />
            </div>

            <VolumeComposition result={result} />

            <RevenueBreakdown result={result} />

            <EfficiencyIndicator
              effectiveFeeRate={result.effectiveFeeRate}
              rebatesDaily={result.rebatesDaily}
              grossRevenueDaily={result.grossRevenueDaily}
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
   Volume Composition
========================================================= */

function VolumeComposition({ result }: { result: VolumeResult }) {
  return (
    <div className="mt-6 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white/65">
            Daily volume composition
          </p>

          <p className="mt-1 text-xs text-white/35">
            Maker versus taker activity
          </p>
        </div>

        <span className="text-xs font-semibold text-amber-300">
          {formatCompactCurrency(result.dailyVolume)}
        </span>
      </div>

      <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full bg-amber-base"
          style={{
            width: `${result.makerShare}%`,
          }}
        />

        <div
          className="h-full bg-cyan-300"
          style={{
            width: `${result.takerShare}%`,
          }}
        />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <LegendItem
          label="Maker volume"
          value={formatCompactCurrency(result.makerVolume)}
          detail={`${formatNumber(result.makerShare, 1)}% of daily volume`}
          markerClassName="bg-amber-base"
        />

        <LegendItem
          label="Taker volume"
          value={formatCompactCurrency(result.takerVolume)}
          detail={`${formatNumber(result.takerShare, 1)}% of daily volume`}
          markerClassName="bg-cyan-300"
        />
      </div>
    </div>
  );
}

/* =========================================================
   Revenue Breakdown
========================================================= */

function RevenueBreakdown({ result }: { result: VolumeResult }) {
  return (
    <div className="mt-6 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <p className="text-sm font-medium text-white/65">
        Daily revenue breakdown
      </p>

      <div className="mt-5 space-y-4">
        <RevenueRow
          label="Maker fee revenue"
          value={result.makerRevenueDaily}
          total={result.grossRevenueDaily}
        />

        <RevenueRow
          label="Taker fee revenue"
          value={result.takerRevenueDaily}
          total={result.grossRevenueDaily}
        />

        <RevenueRow
          label="Maker rebates"
          value={result.rebatesDaily}
          total={result.grossRevenueDaily}
          negative
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
        <span className="text-sm text-white/50">Net daily revenue</span>

        <span className="text-lg font-semibold text-amber-300">
          {formatCurrency(result.netRevenueDaily)}
        </span>
      </div>
    </div>
  );
}

function RevenueRow({
  label,
  value,
  total,
  negative = false,
}: {
  label: string;
  value: number;
  total: number;
  negative?: boolean;
}) {
  const percentage = total > 0 ? clamp((value / total) * 100, 0, 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs text-white/40">{label}</span>

        <span
          className={`text-sm font-semibold ${
            negative ? "text-rose-300" : "text-white/70"
          }`}
        >
          {negative ? "-" : ""}
          {formatCurrency(value)}
        </span>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className={`h-full rounded-full ${
            negative ? "bg-rose-300" : "bg-amber-base"
          }`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   Efficiency Indicator
========================================================= */

function EfficiencyIndicator({
  effectiveFeeRate,
  rebatesDaily,
  grossRevenueDaily,
}: {
  effectiveFeeRate: number;
  rebatesDaily: number;
  grossRevenueDaily: number;
}) {
  const rebateRatio =
    grossRevenueDaily > 0 ? (rebatesDaily / grossRevenueDaily) * 100 : 0;

  const status = getRevenueStatus(effectiveFeeRate, rebateRatio);

  return (
    <div className="mt-6 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-white/65">Revenue efficiency</p>

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

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <Metric
          label="Effective fee rate"
          value={`${formatNumber(effectiveFeeRate, 4)}%`}
        />

        <Metric
          label="Rebate share"
          value={`${formatNumber(rebateRatio, 2)}%`}
        />
      </div>

      <p className="mt-4 text-xs leading-5 text-white/35">
        {status.description}
      </p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
      <p className="text-xs text-white/35">{label}</p>

      <p className="mt-1 text-sm font-semibold text-white/70">{value}</p>
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
   Formula
========================================================= */

function FormulaNote() {
  return (
    <div className="mt-8 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">
        Calculation model
      </p>

      <code className="mt-3 block overflow-x-auto whitespace-nowrap text-sm leading-7 text-white/60">
        Daily volume = Trades × Average trade size × Uptime
      </code>

      <code className="mt-2 block overflow-x-auto whitespace-nowrap text-sm leading-7 text-white/60">
        Net revenue = Maker fees + Taker fees − Maker rebates
      </code>

      <p className="mt-3 text-xs leading-5 text-white/35">
        Results exclude listing fees, withdrawal fees, spreads, subscription
        revenue, custody revenue, payment-processing costs, liquidity
        incentives, taxes, and operational expenses.
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
        Enter valid exchange data
      </h4>

      <p className="mt-3 text-sm leading-7 text-white/50">
        Trades per day and average trade size must be greater than zero. Fee,
        rebate, share, and uptime values cannot be negative.
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

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
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

function formatCompactCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatNumber(value: number, maximumFractionDigits = 2): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(Number.isFinite(value) ? value : 0);
}

function getRevenueStatus(
  effectiveFeeRate: number,
  rebateRatio: number,
): {
  label: string;
  progress: number;
  description: string;
  className: string;
} {
  if (rebateRatio >= 75) {
    return {
      label: "Rebate heavy",
      progress: 25,
      description:
        "Maker rebates consume a large share of gross fee revenue. Review whether the incentive level is sustainable.",
      className: "border-rose-300/20 bg-rose-300/[0.08] text-rose-200",
    };
  }

  if (effectiveFeeRate < 0.03) {
    return {
      label: "Low margin",
      progress: 40,
      description:
        "The effective fee rate is relatively low. High trading volume may be required to cover operating costs.",
      className: "border-amber-300/20 bg-amber-300/[0.08] text-amber-200",
    };
  }

  if (effectiveFeeRate < 0.15) {
    return {
      label: "Balanced",
      progress: 70,
      description:
        "The fee mix provides a balanced exchange-revenue profile without excessive effective pricing.",
      className: "border-emerald-300/20 bg-emerald-300/[0.08] text-amber-200",
    };
  }

  return {
    label: "High margin",
    progress: 100,
    description:
      "The effective fee rate is high. Consider how pricing may affect competitiveness and trader retention.",
    className: "border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200",
  };
}
