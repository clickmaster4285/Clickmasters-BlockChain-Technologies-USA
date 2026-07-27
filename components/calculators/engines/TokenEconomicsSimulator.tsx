"use client";

import { useMemo, useState } from "react";

type TokenEconomicsSimulatorProps = {
  title?: string;
};

type TokenPreset = {
  id: string;
  label: string;
  totalSupply: number;
  circulatingSupply: number;
  tokenPrice: number;
  annualInflationRate: number;
  stakingParticipation: number;
  stakingRewardRate: number;
};

type TokenEconomicsResult = {
  totalSupply: number;
  circulatingSupply: number;
  tokenPrice: number;
  annualInflationRate: number;
  annualBurnRate: number;
  stakingParticipation: number;
  stakingRewardRate: number;
  treasuryAllocation: number;
  teamAllocation: number;
  investorAllocation: number;
  communityAllocation: number;
  simulationYears: number;
  marketCap: number;
  fullyDilutedValuation: number;
  circulatingRatio: number;
  annualMintedTokens: number;
  annualBurnedTokens: number;
  netAnnualSupplyChange: number;
  stakedTokens: number;
  annualStakingRewards: number;
  effectiveStakingYield: number;
  remainingUnallocatedSupply: number;
  projectedFinalSupply: number;
  projectedFinalCirculatingSupply: number;
  projectedFinalMarketCap: number;
  projectedTokenPrice: number;
  inflationDilution: number;
  allocationTotal: number;
  projections: TokenProjection[];
};

type TokenProjection = {
  year: number;
  totalSupply: number;
  circulatingSupply: number;
  tokenPrice: number;
  marketCap: number;
  stakedTokens: number;
  mintedTokens: number;
  burnedTokens: number;
};

const tokenPresets: TokenPreset[] = [
  {
    id: "fixed-supply",
    label: "Fixed-Supply Token",
    totalSupply: 1000000000,
    circulatingSupply: 350000000,
    tokenPrice: 0.5,
    annualInflationRate: 0,
    stakingParticipation: 20,
    stakingRewardRate: 4,
  },
  {
    id: "utility-token",
    label: "Utility Token",
    totalSupply: 500000000,
    circulatingSupply: 125000000,
    tokenPrice: 1.2,
    annualInflationRate: 3,
    stakingParticipation: 30,
    stakingRewardRate: 7,
  },
  {
    id: "governance-token",
    label: "Governance Token",
    totalSupply: 100000000,
    circulatingSupply: 45000000,
    tokenPrice: 8,
    annualInflationRate: 2,
    stakingParticipation: 45,
    stakingRewardRate: 6,
  },
  {
    id: "gaming-token",
    label: "Gaming Economy",
    totalSupply: 10000000000,
    circulatingSupply: 1800000000,
    tokenPrice: 0.08,
    annualInflationRate: 8,
    stakingParticipation: 15,
    stakingRewardRate: 12,
  },
  {
    id: "custom",
    label: "Custom Token",
    totalSupply: 1000000000,
    circulatingSupply: 250000000,
    tokenPrice: 1,
    annualInflationRate: 4,
    stakingParticipation: 25,
    stakingRewardRate: 8,
  },
];

export default function TokenEconomicsSimulator({
  title = "Token Economics Simulator",
}: TokenEconomicsSimulatorProps) {
  const [tokenPresetId, setTokenPresetId] = useState("utility-token");

  const [totalSupply, setTotalSupply] = useState("500000000");

  const [circulatingSupply, setCirculatingSupply] = useState("125000000");

  const [tokenPrice, setTokenPrice] = useState("1.2");

  const [annualInflationRate, setAnnualInflationRate] = useState("3");

  const [annualBurnRate, setAnnualBurnRate] = useState("1");

  const [stakingParticipation, setStakingParticipation] = useState("30");

  const [stakingRewardRate, setStakingRewardRate] = useState("7");

  const [treasuryAllocation, setTreasuryAllocation] = useState("20");

  const [teamAllocation, setTeamAllocation] = useState("15");

  const [investorAllocation, setInvestorAllocation] = useState("20");

  const [communityAllocation, setCommunityAllocation] = useState("35");

  const [simulationYears, setSimulationYears] = useState("5");

  const [annualDemandGrowth, setAnnualDemandGrowth] = useState("12");

  const result = useMemo<TokenEconomicsResult>(() => {
    const parsedTotalSupply = parseNonNegativeNumber(totalSupply);

    const parsedCirculatingSupply = Math.min(
      parseNonNegativeNumber(circulatingSupply),
      parsedTotalSupply,
    );

    const parsedTokenPrice = parseNonNegativeNumber(tokenPrice);

    const parsedAnnualInflationRate = clamp(
      parseNonNegativeNumber(annualInflationRate),
      0,
      100,
    );

    const parsedAnnualBurnRate = clamp(
      parseNonNegativeNumber(annualBurnRate),
      0,
      100,
    );

    const parsedStakingParticipation = clamp(
      parseNonNegativeNumber(stakingParticipation),
      0,
      100,
    );

    const parsedStakingRewardRate = clamp(
      parseNonNegativeNumber(stakingRewardRate),
      0,
      100,
    );

    const parsedTreasuryAllocation = clamp(
      parseNonNegativeNumber(treasuryAllocation),
      0,
      100,
    );

    const parsedTeamAllocation = clamp(
      parseNonNegativeNumber(teamAllocation),
      0,
      100,
    );

    const parsedInvestorAllocation = clamp(
      parseNonNegativeNumber(investorAllocation),
      0,
      100,
    );

    const parsedCommunityAllocation = clamp(
      parseNonNegativeNumber(communityAllocation),
      0,
      100,
    );

    const parsedSimulationYears = Math.max(
      Math.floor(parseNonNegativeNumber(simulationYears)),
      0,
    );

    const parsedAnnualDemandGrowth = parseSignedNumber(annualDemandGrowth);

    const marketCap = parsedCirculatingSupply * parsedTokenPrice;

    const fullyDilutedValuation = parsedTotalSupply * parsedTokenPrice;

    const circulatingRatio =
      parsedTotalSupply > 0
        ? (parsedCirculatingSupply / parsedTotalSupply) * 100
        : 0;

    const annualMintedTokens =
      parsedTotalSupply * (parsedAnnualInflationRate / 100);

    const annualBurnedTokens =
      parsedCirculatingSupply * (parsedAnnualBurnRate / 100);

    const netAnnualSupplyChange = annualMintedTokens - annualBurnedTokens;

    const stakedTokens =
      parsedCirculatingSupply * (parsedStakingParticipation / 100);

    const annualStakingRewards = stakedTokens * (parsedStakingRewardRate / 100);

    const effectiveStakingYield =
      parsedCirculatingSupply > 0
        ? (annualStakingRewards / parsedCirculatingSupply) * 100
        : 0;

    const allocationTotal =
      parsedTreasuryAllocation +
      parsedTeamAllocation +
      parsedInvestorAllocation +
      parsedCommunityAllocation;

    const remainingUnallocatedSupply = Math.max(100 - allocationTotal, 0);

    const projections = buildTokenProjections({
      initialTotalSupply: parsedTotalSupply,
      initialCirculatingSupply: parsedCirculatingSupply,
      initialTokenPrice: parsedTokenPrice,
      inflationRate: parsedAnnualInflationRate,
      burnRate: parsedAnnualBurnRate,
      stakingParticipation: parsedStakingParticipation,
      stakingRewardRate: parsedStakingRewardRate,
      annualDemandGrowth: parsedAnnualDemandGrowth,
      years: parsedSimulationYears,
    });

    const finalProjection = projections[projections.length - 1];

    const projectedFinalSupply =
      finalProjection?.totalSupply ?? parsedTotalSupply;

    const projectedFinalCirculatingSupply =
      finalProjection?.circulatingSupply ?? parsedCirculatingSupply;

    const projectedFinalMarketCap = finalProjection?.marketCap ?? marketCap;

    const projectedTokenPrice = finalProjection?.tokenPrice ?? parsedTokenPrice;

    const inflationDilution =
      parsedTotalSupply > 0
        ? ((projectedFinalSupply - parsedTotalSupply) / parsedTotalSupply) * 100
        : 0;

    return {
      totalSupply: parsedTotalSupply,
      circulatingSupply: parsedCirculatingSupply,
      tokenPrice: parsedTokenPrice,
      annualInflationRate: parsedAnnualInflationRate,
      annualBurnRate: parsedAnnualBurnRate,
      stakingParticipation: parsedStakingParticipation,
      stakingRewardRate: parsedStakingRewardRate,
      treasuryAllocation: parsedTreasuryAllocation,
      teamAllocation: parsedTeamAllocation,
      investorAllocation: parsedInvestorAllocation,
      communityAllocation: parsedCommunityAllocation,
      simulationYears: parsedSimulationYears,
      marketCap,
      fullyDilutedValuation,
      circulatingRatio,
      annualMintedTokens,
      annualBurnedTokens,
      netAnnualSupplyChange,
      stakedTokens,
      annualStakingRewards,
      effectiveStakingYield,
      remainingUnallocatedSupply,
      projectedFinalSupply,
      projectedFinalCirculatingSupply,
      projectedFinalMarketCap,
      projectedTokenPrice,
      inflationDilution,
      allocationTotal,
      projections,
    };
  }, [
    totalSupply,
    circulatingSupply,
    tokenPrice,
    annualInflationRate,
    annualBurnRate,
    stakingParticipation,
    stakingRewardRate,
    treasuryAllocation,
    teamAllocation,
    investorAllocation,
    communityAllocation,
    simulationYears,
    annualDemandGrowth,
  ]);

  const hasValidInputs =
    result.totalSupply > 0 &&
    result.circulatingSupply > 0 &&
    result.circulatingSupply <= result.totalSupply &&
    result.tokenPrice >= 0 &&
    result.simulationYears > 0;

  function handlePresetChange(value: string) {
    const preset = tokenPresets.find((item) => item.id === value);

    if (!preset) {
      return;
    }

    setTokenPresetId(value);
    setTotalSupply(String(preset.totalSupply));
    setCirculatingSupply(String(preset.circulatingSupply));
    setTokenPrice(String(preset.tokenPrice));
    setAnnualInflationRate(String(preset.annualInflationRate));
    setStakingParticipation(String(preset.stakingParticipation));
    setStakingRewardRate(String(preset.stakingRewardRate));
  }

  function handleReset() {
    setTokenPresetId("utility-token");
    setTotalSupply("500000000");
    setCirculatingSupply("125000000");
    setTokenPrice("1.2");
    setAnnualInflationRate("3");
    setAnnualBurnRate("1");
    setStakingParticipation("30");
    setStakingRewardRate("7");
    setTreasuryAllocation("20");
    setTeamAllocation("15");
    setInvestorAllocation("20");
    setCommunityAllocation("35");
    setSimulationYears("5");
    setAnnualDemandGrowth("12");
  }

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/10 bg-slate-950 text-white shadow-[0_24px_90px_rgba(0,0,0,0.22)]">
      <CalculatorHeader title={title} onReset={handleReset} />

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.92fr)]">
        <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <SelectField
                id="token-model-preset"
                label="Token model"
                value={tokenPresetId}
                onChange={handlePresetChange}
                options={tokenPresets.map((preset) => ({
                  value: preset.id,
                  label: preset.label,
                }))}
                helpText="Loads representative supply, price, inflation, and staking assumptions."
              />
            </div>

            <NumberField
              id="token-total-supply"
              label="Total token supply"
              value={totalSupply}
              onChange={setTotalSupply}
              suffix="Tokens"
              min={0}
              step={1000000}
              helpText="Current maximum or issued supply used by the model."
            />

            <NumberField
              id="token-circulating-supply"
              label="Circulating supply"
              value={circulatingSupply}
              onChange={setCirculatingSupply}
              suffix="Tokens"
              min={0}
              step={1000000}
              helpText="Tokens currently available in the market."
            />

            <NumberField
              id="token-current-price"
              label="Current token price"
              value={tokenPrice}
              onChange={setTokenPrice}
              prefix="$"
              min={0}
              step={0.01}
              helpText="Current market price per token."
            />

            <NumberField
              id="token-simulation-years"
              label="Simulation period"
              value={simulationYears}
              onChange={setSimulationYears}
              suffix="Years"
              min={1}
              step={1}
              helpText="Number of years included in the projection."
            />

            <NumberField
              id="token-inflation-rate"
              label="Annual inflation rate"
              value={annualInflationRate}
              onChange={setAnnualInflationRate}
              suffix="%"
              min={0}
              max={100}
              step={0.1}
              helpText="New supply minted each year as a percentage of total supply."
            />

            <NumberField
              id="token-burn-rate"
              label="Annual burn rate"
              value={annualBurnRate}
              onChange={setAnnualBurnRate}
              suffix="%"
              min={0}
              max={100}
              step={0.1}
              helpText="Circulating tokens permanently removed each year."
            />

            <NumberField
              id="token-staking-participation"
              label="Staking participation"
              value={stakingParticipation}
              onChange={setStakingParticipation}
              suffix="%"
              min={0}
              max={100}
              step={1}
              helpText="Share of circulating supply committed to staking."
            />

            <NumberField
              id="token-staking-reward"
              label="Staking reward rate"
              value={stakingRewardRate}
              onChange={setStakingRewardRate}
              suffix="%"
              min={0}
              max={100}
              step={0.1}
              helpText="Annual reward rate paid on staked tokens."
            />

            <div className="sm:col-span-2">
              <NumberField
                id="token-demand-growth"
                label="Annual demand growth assumption"
                value={annualDemandGrowth}
                onChange={setAnnualDemandGrowth}
                suffix="%"
                step={1}
                helpText="Used to model market-cap growth and implied future token price."
              />
            </div>
          </div>

          <AllocationInputs
            treasuryAllocation={treasuryAllocation}
            teamAllocation={teamAllocation}
            investorAllocation={investorAllocation}
            communityAllocation={communityAllocation}
            onTreasuryChange={setTreasuryAllocation}
            onTeamChange={setTeamAllocation}
            onInvestorChange={setInvestorAllocation}
            onCommunityChange={setCommunityAllocation}
            allocationTotal={result.allocationTotal}
          />

          <ScenarioPresets
            onSelect={(preset) => {
              setAnnualInflationRate(String(preset.inflationRate));
              setAnnualBurnRate(String(preset.burnRate));
              setAnnualDemandGrowth(String(preset.demandGrowth));
            }}
          />

          <FormulaNote />
        </div>

        <TokenEconomicsResults
          result={result}
          hasValidInputs={hasValidInputs}
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
          Token supply modeling
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
          } ${suffix ? "pr-24" : "pr-4"}`}
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
   Allocations
========================================================= */

function AllocationInputs({
  treasuryAllocation,
  teamAllocation,
  investorAllocation,
  communityAllocation,
  onTreasuryChange,
  onTeamChange,
  onInvestorChange,
  onCommunityChange,
  allocationTotal,
}: {
  treasuryAllocation: string;
  teamAllocation: string;
  investorAllocation: string;
  communityAllocation: string;
  onTreasuryChange: (value: string) => void;
  onTeamChange: (value: string) => void;
  onInvestorChange: (value: string) => void;
  onCommunityChange: (value: string) => void;
  allocationTotal: number;
}) {
  const isOverAllocated = allocationTotal > 100;

  return (
    <div className="mt-8 rounded-[22px] border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white/75">
            Token allocation
          </p>

          <p className="mt-1 text-xs text-white/35">
            Define the initial supply distribution.
          </p>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            isOverAllocated
              ? "border-rose-300/20 bg-rose-300/[0.08] text-rose-200"
              : "border-emerald-300/20 bg-emerald-300/[0.08] text-amber-200"
          }`}
        >
          {formatNumber(allocationTotal, 1)}% allocated
        </span>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <NumberField
          id="treasury-allocation"
          label="Treasury"
          value={treasuryAllocation}
          onChange={onTreasuryChange}
          suffix="%"
          min={0}
          max={100}
          step={1}
        />

        <NumberField
          id="team-allocation"
          label="Team"
          value={teamAllocation}
          onChange={onTeamChange}
          suffix="%"
          min={0}
          max={100}
          step={1}
        />

        <NumberField
          id="investor-allocation"
          label="Investors"
          value={investorAllocation}
          onChange={onInvestorChange}
          suffix="%"
          min={0}
          max={100}
          step={1}
        />

        <NumberField
          id="community-allocation"
          label="Community"
          value={communityAllocation}
          onChange={onCommunityChange}
          suffix="%"
          min={0}
          max={100}
          step={1}
        />
      </div>

      {isOverAllocated && (
        <p className="mt-4 text-xs leading-5 text-rose-300/80">
          Allocation exceeds 100%. Reduce one or more categories before using
          the distribution analysis.
        </p>
      )}
    </div>
  );
}

/* =========================================================
   Presets
========================================================= */

function ScenarioPresets({
  onSelect,
}: {
  onSelect: (preset: {
    inflationRate: number;
    burnRate: number;
    demandGrowth: number;
  }) => void;
}) {
  const presets = [
    {
      label: "Deflationary",
      inflationRate: 1,
      burnRate: 3,
      demandGrowth: 15,
    },
    {
      label: "Balanced",
      inflationRate: 3,
      burnRate: 1,
      demandGrowth: 12,
    },
    {
      label: "High emission",
      inflationRate: 10,
      burnRate: 0.5,
      demandGrowth: 8,
    },
  ];

  return (
    <div className="mt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
        Supply scenarios
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

function TokenEconomicsResults({
  result,
  hasValidInputs,
}: {
  result: TokenEconomicsResult;
  hasValidInputs: boolean;
}) {
  const allocationValid = result.allocationTotal <= 100;

  return (
    <aside className="relative overflow-hidden bg-amber-base/[0.06] p-6 sm:p-8">
      <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-64 w-64 rounded-full bg-amber-base/10 blur-[90px]" />

      <div className="relative">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
          Token economy projection
        </span>

        <p className="mt-3 text-sm leading-7 text-white/45">
          Simulated supply, valuation, staking, and dilution outcomes.
        </p>

        {hasValidInputs ? (
          <>
            <div className="mt-8 rounded-[24px] border border-amber-base/20 bg-amber-base/[0.10] p-6">
              <p className="text-sm text-white/45">
                Projected token price after {result.simulationYears} year
                {result.simulationYears === 1 ? "" : "s"}
              </p>

              <p
                className={`mt-3 break-words text-4xl font-semibold tracking-[-0.045em] sm:text-5xl ${
                  result.projectedTokenPrice >= result.tokenPrice
                    ? "text-amber-300"
                    : "text-rose-300"
                }`}
              >
                {formatCurrency(result.projectedTokenPrice)}
              </p>

              <p
                className={`mt-3 text-sm font-medium ${
                  result.projectedTokenPrice >= result.tokenPrice
                    ? "text-amber-200/75"
                    : "text-rose-300/80"
                }`}
              >
                {formatSignedPercentage(
                  calculatePercentageChange(
                    result.tokenPrice,
                    result.projectedTokenPrice,
                  ),
                )}{" "}
                implied price change
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <ResultCard
                label="Current market cap"
                value={formatCompactCurrency(result.marketCap)}
                detail="Price multiplied by circulating supply"
              />

              <ResultCard
                label="Fully diluted valuation"
                value={formatCompactCurrency(result.fullyDilutedValuation)}
                detail="Price multiplied by total supply"
              />

              <ResultCard
                label="Projected market cap"
                value={formatCompactCurrency(result.projectedFinalMarketCap)}
                detail={`${result.simulationYears}-year demand scenario`}
              />

              <ResultCard
                label="Projected total supply"
                value={formatCompactNumber(result.projectedFinalSupply)}
                detail={`${formatSignedPercentage(
                  result.inflationDilution,
                )} cumulative supply change`}
              />

              <ResultCard
                label="Annual staking rewards"
                value={formatCompactNumber(result.annualStakingRewards)}
                detail={`${formatNumber(
                  result.stakingRewardRate,
                  2,
                )}% reward on staked supply`}
              />

              <ResultCard
                label="Effective issuance yield"
                value={`${formatNumber(result.effectiveStakingYield, 2)}%`}
                detail="Rewards relative to circulating supply"
              />
            </div>

            <SupplyFlow result={result} />

            <AllocationBreakdown result={result} isValid={allocationValid} />

            <TokenHealthIndicator
              inflationRate={result.annualInflationRate}
              burnRate={result.annualBurnRate}
              circulatingRatio={result.circulatingRatio}
              allocationValid={allocationValid}
            />

            <ProjectionChart projections={result.projections} />

            <ProjectionTable projections={result.projections} />
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
   Supply Flow
========================================================= */

function SupplyFlow({ result }: { result: TokenEconomicsResult }) {
  const maximumFlow = Math.max(
    result.annualMintedTokens,
    result.annualBurnedTokens,
    1,
  );

  const mintedWidth = (result.annualMintedTokens / maximumFlow) * 100;

  const burnedWidth = (result.annualBurnedTokens / maximumFlow) * 100;

  return (
    <div className="mt-6 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white/65">
            Annual supply flow
          </p>

          <p className="mt-1 text-xs text-white/35">
            New issuance versus token burns
          </p>
        </div>

        <span
          className={`text-xs font-semibold ${
            result.netAnnualSupplyChange <= 0
              ? "text-amber-300"
              : "text-amber-200"
          }`}
        >
          {result.netAnnualSupplyChange <= 0
            ? "Net deflationary"
            : "Net inflationary"}
        </span>
      </div>

      <div className="mt-5 space-y-5">
        <FlowRow
          label="Tokens minted"
          value={result.annualMintedTokens}
          width={mintedWidth}
          barClassName="bg-amber-300"
        />

        <FlowRow
          label="Tokens burned"
          value={result.annualBurnedTokens}
          width={burnedWidth}
          barClassName="bg-amber-base"
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
        <span className="text-sm text-white/50">Net annual supply change</span>

        <span
          className={`text-lg font-semibold ${
            result.netAnnualSupplyChange <= 0
              ? "text-amber-300"
              : "text-amber-200"
          }`}
        >
          {formatSignedCompactNumber(result.netAnnualSupplyChange)}
        </span>
      </div>
    </div>
  );
}

function FlowRow({
  label,
  value,
  width,
  barClassName,
}: {
  label: string;
  value: number;
  width: number;
  barClassName: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs text-white/40">{label}</span>

        <span className="text-sm font-semibold text-white/70">
          {formatCompactNumber(value)}
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className={`h-full rounded-full ${barClassName}`}
          style={{
            width: `${clamp(width, 0, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   Allocation Breakdown
========================================================= */

function AllocationBreakdown({
  result,
  isValid,
}: {
  result: TokenEconomicsResult;
  isValid: boolean;
}) {
  const allocations = [
    {
      label: "Treasury",
      value: result.treasuryAllocation,
      className: "bg-amber-base",
    },
    {
      label: "Team",
      value: result.teamAllocation,
      className: "bg-cyan-300",
    },
    {
      label: "Investors",
      value: result.investorAllocation,
      className: "bg-violet-300",
    },
    {
      label: "Community",
      value: result.communityAllocation,
      className: "bg-amber-300",
    },
    {
      label: "Unallocated",
      value: result.remainingUnallocatedSupply,
      className: "bg-white/25",
    },
  ];

  return (
    <div className="mt-6 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white/65">
            Allocation distribution
          </p>

          <p className="mt-1 text-xs text-white/35">
            Percentage of total token supply
          </p>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            isValid
              ? "border-emerald-300/20 bg-emerald-300/[0.08] text-amber-200"
              : "border-rose-300/20 bg-rose-300/[0.08] text-rose-200"
          }`}
        >
          {isValid ? "Valid" : "Over allocated"}
        </span>
      </div>

      <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-white/[0.07]">
        {allocations.map(
          (allocation) =>
            allocation.value > 0 && (
              <div
                key={allocation.label}
                className={`h-full ${allocation.className}`}
                style={{
                  width: `${clamp(allocation.value, 0, 100)}%`,
                }}
              />
            ),
        )}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {allocations.map((allocation) => (
          <LegendItem
            key={allocation.label}
            label={allocation.label}
            value={`${formatNumber(allocation.value, 1)}%`}
            detail={formatCompactNumber(
              result.totalSupply * (allocation.value / 100),
            )}
            markerClassName={allocation.className}
          />
        ))}
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

        <p className="mt-1 text-xs text-white/30">{detail} tokens</p>
      </div>
    </div>
  );
}

/* =========================================================
   Health Indicator
========================================================= */

function TokenHealthIndicator({
  inflationRate,
  burnRate,
  circulatingRatio,
  allocationValid,
}: {
  inflationRate: number;
  burnRate: number;
  circulatingRatio: number;
  allocationValid: boolean;
}) {
  const status = getTokenHealthStatus({
    inflationRate,
    burnRate,
    circulatingRatio,
    allocationValid,
  });

  return (
    <div className="mt-6 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-white/65">Token model health</p>

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
   Projection Chart
========================================================= */

function ProjectionChart({ projections }: { projections: TokenProjection[] }) {
  if (projections.length < 2) {
    return null;
  }

  const width = 560;
  const height = 190;
  const paddingX = 14;
  const paddingY = 18;

  const maxPrice = Math.max(
    ...projections.map((projection) => projection.tokenPrice),
    1,
  );

  const points = projections
    .map((projection, index) => {
      const x =
        paddingX +
        (index / Math.max(projections.length - 1, 1)) * (width - paddingX * 2);

      const y =
        height -
        paddingY -
        (projection.tokenPrice / maxPrice) * (height - paddingY * 2);

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="mt-6 overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white/65">
            Implied token price
          </p>

          <p className="mt-1 text-xs text-white/35">
            Demand-growth model adjusted for supply
          </p>
        </div>

        <span className="text-xs font-semibold text-amber-300">
          {formatCurrency(projections[projections.length - 1].tokenPrice)}
        </span>
      </div>

      <div className="mt-5 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Projected token price chart"
          className="h-auto min-w-[460px] overflow-visible"
        >
          <defs>
            <linearGradient id="token-price-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />

              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75].map((position) => {
            const y = height * position;

            return (
              <line
                key={position}
                x1="0"
                x2={width}
                y1={y}
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.08"
                strokeDasharray="4 6"
              />
            );
          })}

          <polygon
            points={`${paddingX},${height - paddingY} ${points} ${
              width - paddingX
            },${height - paddingY}`}
            fill="url(#token-price-area)"
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

          {projections.map((projection, index) => {
            const x =
              paddingX +
              (index / Math.max(projections.length - 1, 1)) *
                (width - paddingX * 2);

            const y =
              height -
              paddingY -
              (projection.tokenPrice / maxPrice) * (height - paddingY * 2);

            return (
              <circle
                key={projection.year}
                cx={x}
                cy={y}
                r="4"
                fill="currentColor"
                className="text-amber-300"
                aria-label={`Year ${projection.year}: ${formatCurrency(
                  projection.tokenPrice,
                )}`}
              />
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex justify-between text-xs text-white/35">
        <span>Year 0</span>

        <span>Year {projections[projections.length - 1].year}</span>
      </div>
    </div>
  );
}

/* =========================================================
   Projection Table
========================================================= */

function ProjectionTable({ projections }: { projections: TokenProjection[] }) {
  return (
    <div className="mt-6 overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.025]">
      <div className="border-b border-white/[0.08] px-5 py-4">
        <p className="text-sm font-medium text-white/65">
          Annual token projection
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/[0.07] text-xs uppercase tracking-[0.1em] text-white/35">
              <th className="px-5 py-4 font-medium">Year</th>

              <th className="px-5 py-4 font-medium">Total supply</th>

              <th className="px-5 py-4 font-medium">Circulating</th>

              <th className="px-5 py-4 font-medium">Token price</th>

              <th className="px-5 py-4 text-right font-medium">Market cap</th>
            </tr>
          </thead>

          <tbody>
            {projections.map((projection) => (
              <tr
                key={projection.year}
                className="border-b border-white/[0.05] last:border-b-0"
              >
                <td className="px-5 py-4 text-sm font-medium text-white/70">
                  {projection.year === 0
                    ? "Current"
                    : `Year ${projection.year}`}
                </td>

                <td className="px-5 py-4 text-sm text-white/50">
                  {formatCompactNumber(projection.totalSupply)}
                </td>

                <td className="px-5 py-4 text-sm text-white/50">
                  {formatCompactNumber(projection.circulatingSupply)}
                </td>

                <td className="px-5 py-4 text-sm font-medium text-amber-300">
                  {formatCurrency(projection.tokenPrice)}
                </td>

                <td className="px-5 py-4 text-right text-sm font-semibold text-white/70">
                  {formatCompactCurrency(projection.marketCap)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
        Simulation model
      </p>

      <code className="mt-3 block overflow-x-auto whitespace-nowrap text-sm leading-7 text-white/60">
        Future price = Projected market cap ÷ Projected circulating supply
      </code>

      <code className="mt-2 block overflow-x-auto whitespace-nowrap text-sm leading-7 text-white/60">
        Net supply change = Minted tokens − Burned tokens
      </code>

      <p className="mt-3 text-xs leading-5 text-white/35">
        This model is a scenario simulator, not a token-price forecast. Actual
        valuation depends on liquidity, utility, adoption, vesting, regulation,
        market sentiment, exchange access, and execution quality.
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
        Enter valid token data
      </h4>

      <p className="mt-3 text-sm leading-7 text-white/50">
        Total supply, circulating supply, and simulation period must be greater
        than zero. Circulating supply cannot exceed total supply.
      </p>
    </div>
  );
}

/* =========================================================
   Projection Logic
========================================================= */

function buildTokenProjections({
  initialTotalSupply,
  initialCirculatingSupply,
  initialTokenPrice,
  inflationRate,
  burnRate,
  stakingParticipation,
  stakingRewardRate,
  annualDemandGrowth,
  years,
}: {
  initialTotalSupply: number;
  initialCirculatingSupply: number;
  initialTokenPrice: number;
  inflationRate: number;
  burnRate: number;
  stakingParticipation: number;
  stakingRewardRate: number;
  annualDemandGrowth: number;
  years: number;
}): TokenProjection[] {
  const projections: TokenProjection[] = [];

  let totalSupply = initialTotalSupply;

  let circulatingSupply = initialCirculatingSupply;

  let marketCap = initialCirculatingSupply * initialTokenPrice;

  projections.push({
    year: 0,
    totalSupply,
    circulatingSupply,
    tokenPrice: initialTokenPrice,
    marketCap,
    stakedTokens: circulatingSupply * (stakingParticipation / 100),
    mintedTokens: 0,
    burnedTokens: 0,
  });

  for (let year = 1; year <= years; year += 1) {
    const mintedTokens = totalSupply * (inflationRate / 100);

    const burnedTokens = circulatingSupply * (burnRate / 100);

    const stakedTokens = circulatingSupply * (stakingParticipation / 100);

    const stakingRewards = stakedTokens * (stakingRewardRate / 100);

    totalSupply = Math.max(totalSupply + mintedTokens - burnedTokens, 0);

    circulatingSupply = Math.max(
      Math.min(
        circulatingSupply + mintedTokens + stakingRewards - burnedTokens,
        totalSupply,
      ),
      0,
    );

    marketCap = Math.max(marketCap * (1 + annualDemandGrowth / 100), 0);

    const projectedTokenPrice =
      circulatingSupply > 0 ? marketCap / circulatingSupply : 0;

    projections.push({
      year,
      totalSupply,
      circulatingSupply,
      tokenPrice: projectedTokenPrice,
      marketCap,
      stakedTokens: circulatingSupply * (stakingParticipation / 100),
      mintedTokens,
      burnedTokens,
    });
  }

  return projections;
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

  return Number.isFinite(parsed) ? parsed : 0;
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(Math.max(value, minimum), maximum);
}

function calculatePercentageChange(
  initialValue: number,
  finalValue: number,
): number {
  if (initialValue === 0) {
    return 0;
  }

  return ((finalValue - initialValue) / initialValue) * 100;
}

function formatCurrency(value: number): string {
  const safeValue = Number.isFinite(value) ? value : 0;

  const maximumFractionDigits = Math.abs(safeValue) < 1 ? 6 : 2;

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

function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatSignedCompactNumber(value: number): string {
  const safeValue = Number.isFinite(value) ? value : 0;

  const formattedValue = formatCompactNumber(Math.abs(safeValue));

  if (safeValue > 0) {
    return `+${formattedValue}`;
  }

  if (safeValue < 0) {
    return `-${formattedValue}`;
  }

  return formattedValue;
}

function formatNumber(value: number, maximumFractionDigits = 2): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(Number.isFinite(value) ? value : 0);
}

function formatSignedPercentage(value: number): string {
  const safeValue = Number.isFinite(value) ? value : 0;

  if (safeValue > 0) {
    return `+${formatNumber(safeValue, 2)}%`;
  }

  return `${formatNumber(safeValue, 2)}%`;
}

function getTokenHealthStatus({
  inflationRate,
  burnRate,
  circulatingRatio,
  allocationValid,
}: {
  inflationRate: number;
  burnRate: number;
  circulatingRatio: number;
  allocationValid: boolean;
}): {
  label: string;
  progress: number;
  description: string;
  className: string;
} {
  if (!allocationValid) {
    return {
      label: "Invalid allocation",
      progress: 15,
      description:
        "Token allocations exceed 100%. The distribution model must be corrected before evaluation.",
      className: "border-rose-300/20 bg-rose-300/[0.08] text-rose-200",
    };
  }

  if (inflationRate >= 15 && burnRate < 2) {
    return {
      label: "High dilution",
      progress: 25,
      description:
        "High token issuance with limited burns may create significant long-term dilution pressure.",
      className: "border-rose-300/20 bg-rose-300/[0.08] text-rose-200",
    };
  }

  if (circulatingRatio < 20 && inflationRate > burnRate) {
    return {
      label: "Unlock risk",
      progress: 40,
      description:
        "A low circulating ratio combined with net inflation may create future supply-overhang risk.",
      className: "border-amber-300/20 bg-amber-300/[0.08] text-amber-200",
    };
  }

  if (inflationRate <= 6 && circulatingRatio >= 30) {
    return {
      label: "Balanced",
      progress: 70,
      description:
        "The modeled supply structure has moderate issuance and a meaningful share already circulating.",
      className: "border-emerald-300/20 bg-emerald-300/[0.08] text-amber-200",
    };
  }

  if (burnRate >= inflationRate && circulatingRatio >= 40) {
    return {
      label: "Deflationary",
      progress: 100,
      description:
        "Modeled token burns offset or exceed annual issuance while a substantial supply share is circulating.",
      className: "border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200",
    };
  }

  return {
    label: "Moderate risk",
    progress: 55,
    description:
      "The token model is workable, but issuance, unlocks, staking emissions, and allocation concentration should be monitored.",
    className: "border-amber-300/20 bg-amber-300/[0.08] text-amber-200",
  };
}
