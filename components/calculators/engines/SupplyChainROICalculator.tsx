"use client";

import { useMemo, useState } from "react";

type SupplyChainROICalculatorProps = {
  title?: string;
};

type OrganizationPreset = {
  id: string;
  label: string;
  annualRevenue: number;
  annualShipments: number;
  currentLossRate: number;
  implementationCost: number;
  annualOperatingCost: number;
};

type SupplyChainROIResult = {
  annualRevenue: number;
  annualShipments: number;
  averageShipmentValue: number;
  currentLossRate: number;
  projectedLossReduction: number;
  processCostPerShipment: number;
  processCostReduction: number;
  inventoryValue: number;
  inventoryReduction: number;
  implementationCost: number;
  annualOperatingCost: number;
  analysisYears: number;
  currentAnnualLosses: number;
  recoveredLosses: number;
  annualProcessCost: number;
  processSavings: number;
  inventoryCapitalReleased: number;
  annualGrossBenefit: number;
  annualNetBenefit: number;
  totalGrossBenefit: number;
  totalOperatingCost: number;
  totalInvestment: number;
  totalNetBenefit: number;
  roiPercentage: number;
  paybackMonths: number | null;
  benefitCostRatio: number;
  netPresentValue: number;
  annualCashFlows: AnnualCashFlow[];
};

type AnnualCashFlow = {
  year: number;
  grossBenefit: number;
  operatingCost: number;
  netCashFlow: number;
  discountedCashFlow: number;
  cumulativeCashFlow: number;
};

const organizationPresets: OrganizationPreset[] = [
  {
    id: "small-distributor",
    label: "Small Distributor",
    annualRevenue: 5000000,
    annualShipments: 12000,
    currentLossRate: 2.5,
    implementationCost: 150000,
    annualOperatingCost: 45000,
  },
  {
    id: "mid-market-manufacturer",
    label: "Mid-Market Manufacturer",
    annualRevenue: 50000000,
    annualShipments: 75000,
    currentLossRate: 1.8,
    implementationCost: 650000,
    annualOperatingCost: 180000,
  },
  {
    id: "enterprise-network",
    label: "Enterprise Supply Network",
    annualRevenue: 500000000,
    annualShipments: 500000,
    currentLossRate: 1.2,
    implementationCost: 3500000,
    annualOperatingCost: 900000,
  },
  {
    id: "pharmaceutical",
    label: "Pharmaceutical Supply Chain",
    annualRevenue: 150000000,
    annualShipments: 140000,
    currentLossRate: 2.1,
    implementationCost: 1800000,
    annualOperatingCost: 480000,
  },
  {
    id: "custom",
    label: "Custom Organization",
    annualRevenue: 25000000,
    annualShipments: 50000,
    currentLossRate: 2,
    implementationCost: 500000,
    annualOperatingCost: 150000,
  },
];

export default function SupplyChainROICalculator({
  title = "Supply Chain ROI Calculator",
}: SupplyChainROICalculatorProps) {
  const [organizationId, setOrganizationId] = useState(
    "mid-market-manufacturer",
  );

  const [annualRevenue, setAnnualRevenue] = useState("50000000");

  const [annualShipments, setAnnualShipments] = useState("75000");

  const [currentLossRate, setCurrentLossRate] = useState("1.8");

  const [projectedLossReduction, setProjectedLossReduction] = useState("35");

  const [processCostPerShipment, setProcessCostPerShipment] = useState("18");

  const [processCostReduction, setProcessCostReduction] = useState("20");

  const [inventoryValue, setInventoryValue] = useState("8000000");

  const [inventoryReduction, setInventoryReduction] = useState("5");

  const [implementationCost, setImplementationCost] = useState("650000");

  const [annualOperatingCost, setAnnualOperatingCost] = useState("180000");

  const [analysisYears, setAnalysisYears] = useState("3");

  const [discountRate, setDiscountRate] = useState("8");

  const result = useMemo<SupplyChainROIResult>(() => {
    const parsedAnnualRevenue = parseNonNegativeNumber(annualRevenue);

    const parsedAnnualShipments = parseNonNegativeNumber(annualShipments);

    const parsedCurrentLossRate = clamp(
      parseNonNegativeNumber(currentLossRate),
      0,
      100,
    );

    const parsedProjectedLossReduction = clamp(
      parseNonNegativeNumber(projectedLossReduction),
      0,
      100,
    );

    const parsedProcessCostPerShipment = parseNonNegativeNumber(
      processCostPerShipment,
    );

    const parsedProcessCostReduction = clamp(
      parseNonNegativeNumber(processCostReduction),
      0,
      100,
    );

    const parsedInventoryValue = parseNonNegativeNumber(inventoryValue);

    const parsedInventoryReduction = clamp(
      parseNonNegativeNumber(inventoryReduction),
      0,
      100,
    );

    const parsedImplementationCost = parseNonNegativeNumber(implementationCost);

    const parsedAnnualOperatingCost =
      parseNonNegativeNumber(annualOperatingCost);

    const parsedAnalysisYears = Math.max(
      Math.floor(parseNonNegativeNumber(analysisYears)),
      0,
    );

    const parsedDiscountRate = parseNonNegativeNumber(discountRate);

    const averageShipmentValue =
      parsedAnnualShipments > 0
        ? parsedAnnualRevenue / parsedAnnualShipments
        : 0;

    const currentAnnualLosses =
      parsedAnnualRevenue * (parsedCurrentLossRate / 100);

    const recoveredLosses =
      currentAnnualLosses * (parsedProjectedLossReduction / 100);

    const annualProcessCost =
      parsedAnnualShipments * parsedProcessCostPerShipment;

    const processSavings =
      annualProcessCost * (parsedProcessCostReduction / 100);

    const inventoryCapitalReleased =
      parsedInventoryValue * (parsedInventoryReduction / 100);

    const annualGrossBenefit = recoveredLosses + processSavings;

    const annualNetBenefit = annualGrossBenefit - parsedAnnualOperatingCost;

    const totalGrossBenefit =
      annualGrossBenefit * parsedAnalysisYears + inventoryCapitalReleased;

    const totalOperatingCost = parsedAnnualOperatingCost * parsedAnalysisYears;

    const totalInvestment = parsedImplementationCost + totalOperatingCost;

    const totalNetBenefit = totalGrossBenefit - totalInvestment;

    const roiPercentage =
      totalInvestment > 0 ? (totalNetBenefit / totalInvestment) * 100 : 0;

    const paybackMonths = calculatePaybackMonths({
      implementationCost: parsedImplementationCost,
      annualNetBenefit,
      inventoryCapitalReleased,
    });

    const benefitCostRatio =
      totalInvestment > 0 ? totalGrossBenefit / totalInvestment : 0;

    const annualCashFlows = buildAnnualCashFlows({
      years: parsedAnalysisYears,
      implementationCost: parsedImplementationCost,
      annualGrossBenefit,
      annualOperatingCost: parsedAnnualOperatingCost,
      inventoryCapitalReleased,
      discountRate: parsedDiscountRate,
    });

    const netPresentValue = annualCashFlows.reduce(
      (total, cashFlow) => total + cashFlow.discountedCashFlow,
      0,
    );

    return {
      annualRevenue: parsedAnnualRevenue,
      annualShipments: parsedAnnualShipments,
      averageShipmentValue,
      currentLossRate: parsedCurrentLossRate,
      projectedLossReduction: parsedProjectedLossReduction,
      processCostPerShipment: parsedProcessCostPerShipment,
      processCostReduction: parsedProcessCostReduction,
      inventoryValue: parsedInventoryValue,
      inventoryReduction: parsedInventoryReduction,
      implementationCost: parsedImplementationCost,
      annualOperatingCost: parsedAnnualOperatingCost,
      analysisYears: parsedAnalysisYears,
      currentAnnualLosses,
      recoveredLosses,
      annualProcessCost,
      processSavings,
      inventoryCapitalReleased,
      annualGrossBenefit,
      annualNetBenefit,
      totalGrossBenefit,
      totalOperatingCost,
      totalInvestment,
      totalNetBenefit,
      roiPercentage,
      paybackMonths,
      benefitCostRatio,
      netPresentValue,
      annualCashFlows,
    };
  }, [
    annualRevenue,
    annualShipments,
    currentLossRate,
    projectedLossReduction,
    processCostPerShipment,
    processCostReduction,
    inventoryValue,
    inventoryReduction,
    implementationCost,
    annualOperatingCost,
    analysisYears,
    discountRate,
  ]);

  const hasValidInputs =
    result.annualRevenue > 0 &&
    result.annualShipments > 0 &&
    result.analysisYears > 0 &&
    result.implementationCost >= 0;

  function handleOrganizationChange(value: string) {
    const preset = organizationPresets.find((item) => item.id === value);

    if (!preset) {
      return;
    }

    setOrganizationId(value);
    setAnnualRevenue(String(preset.annualRevenue));
    setAnnualShipments(String(preset.annualShipments));
    setCurrentLossRate(String(preset.currentLossRate));
    setImplementationCost(String(preset.implementationCost));
    setAnnualOperatingCost(String(preset.annualOperatingCost));
  }

  function handleReset() {
    setOrganizationId("mid-market-manufacturer");
    setAnnualRevenue("50000000");
    setAnnualShipments("75000");
    setCurrentLossRate("1.8");
    setProjectedLossReduction("35");
    setProcessCostPerShipment("18");
    setProcessCostReduction("20");
    setInventoryValue("8000000");
    setInventoryReduction("5");
    setImplementationCost("650000");
    setAnnualOperatingCost("180000");
    setAnalysisYears("3");
    setDiscountRate("8");
  }

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/10 bg-slate-950 text-white shadow-[0_24px_90px_rgba(0,0,0,0.22)]">
      <CalculatorHeader title={title} onReset={handleReset} />

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(350px,0.9fr)]">
        <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <SelectField
                id="organization-profile"
                label="Organization profile"
                value={organizationId}
                onChange={handleOrganizationChange}
                options={organizationPresets.map((preset) => ({
                  value: preset.id,
                  label: preset.label,
                }))}
                helpText="Loads representative operating assumptions that you can customize."
              />
            </div>

            <NumberField
              id="annual-revenue"
              label="Annual supply-chain revenue"
              value={annualRevenue}
              onChange={setAnnualRevenue}
              prefix="$"
              min={0}
              step={100000}
              helpText="Revenue associated with the analyzed supply network."
            />

            <NumberField
              id="annual-shipments"
              label="Annual shipments"
              value={annualShipments}
              onChange={setAnnualShipments}
              suffix="Shipments"
              min={0}
              step={100}
              helpText="Completed orders, loads, or traceable shipment units."
            />

            <NumberField
              id="current-loss-rate"
              label="Current loss and error rate"
              value={currentLossRate}
              onChange={setCurrentLossRate}
              suffix="%"
              min={0}
              max={100}
              step={0.1}
              helpText="Revenue lost through fraud, damage, disputes, errors, or shrinkage."
            />

            <NumberField
              id="projected-loss-reduction"
              label="Projected loss reduction"
              value={projectedLossReduction}
              onChange={setProjectedLossReduction}
              suffix="%"
              min={0}
              max={100}
              step={1}
              helpText="Expected reduction in current annual losses."
            />

            <NumberField
              id="process-cost-per-shipment"
              label="Process cost per shipment"
              value={processCostPerShipment}
              onChange={setProcessCostPerShipment}
              prefix="$"
              min={0}
              step={0.5}
              helpText="Administrative, reconciliation, and verification cost per shipment."
            />

            <NumberField
              id="process-cost-reduction"
              label="Process cost reduction"
              value={processCostReduction}
              onChange={setProcessCostReduction}
              suffix="%"
              min={0}
              max={100}
              step={1}
              helpText="Expected efficiency improvement from automation and shared data."
            />

            <NumberField
              id="inventory-value"
              label="Average inventory value"
              value={inventoryValue}
              onChange={setInventoryValue}
              prefix="$"
              min={0}
              step={10000}
              helpText="Average capital tied up in inventory across the network."
            />

            <NumberField
              id="inventory-reduction"
              label="Inventory reduction"
              value={inventoryReduction}
              onChange={setInventoryReduction}
              suffix="%"
              min={0}
              max={100}
              step={0.5}
              helpText="Capital released through improved visibility and planning."
            />

            <NumberField
              id="implementation-cost"
              label="Initial implementation cost"
              value={implementationCost}
              onChange={setImplementationCost}
              prefix="$"
              min={0}
              step={10000}
              helpText="Software, integration, consulting, onboarding, and deployment."
            />

            <NumberField
              id="annual-operating-cost"
              label="Annual operating cost"
              value={annualOperatingCost}
              onChange={setAnnualOperatingCost}
              prefix="$"
              min={0}
              step={5000}
              helpText="Licensing, infrastructure, support, governance, and maintenance."
            />

            <NumberField
              id="analysis-years"
              label="Analysis period"
              value={analysisYears}
              onChange={setAnalysisYears}
              suffix="Years"
              min={1}
              step={1}
              helpText="Number of years included in the ROI calculation."
            />

            <NumberField
              id="discount-rate"
              label="Discount rate"
              value={discountRate}
              onChange={setDiscountRate}
              suffix="%"
              min={0}
              step={0.5}
              helpText="Used to calculate the net present value of future cash flows."
            />
          </div>

          <ImpactPresets
            onSelect={(preset) => {
              setProjectedLossReduction(String(preset.lossReduction));
              setProcessCostReduction(String(preset.processReduction));
              setInventoryReduction(String(preset.inventoryReduction));
            }}
          />

          <FormulaNote />
        </div>

        <SupplyChainROIResults
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
          Transformation business case
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
   Presets
========================================================= */

function ImpactPresets({
  onSelect,
}: {
  onSelect: (preset: {
    lossReduction: number;
    processReduction: number;
    inventoryReduction: number;
  }) => void;
}) {
  const presets = [
    {
      label: "Conservative",
      lossReduction: 15,
      processReduction: 10,
      inventoryReduction: 2,
    },
    {
      label: "Expected",
      lossReduction: 35,
      processReduction: 20,
      inventoryReduction: 5,
    },
    {
      label: "Transformational",
      lossReduction: 55,
      processReduction: 35,
      inventoryReduction: 10,
    },
  ];

  return (
    <div className="mt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
        Improvement scenarios
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

function SupplyChainROIResults({
  result,
  hasValidInputs,
}: {
  result: SupplyChainROIResult;
  hasValidInputs: boolean;
}) {
  return (
    <aside className="relative overflow-hidden bg-amber-base/[0.06] p-6 sm:p-8">
      <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-64 w-64 rounded-full bg-amber-base/10 blur-[90px]" />

      <div className="relative">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
          Estimated business impact
        </span>

        <p className="mt-3 text-sm leading-7 text-white/45">
          ROI projection based on loss recovery, process efficiency, inventory
          optimization, and project costs.
        </p>

        {hasValidInputs ? (
          <>
            <div className="mt-8 rounded-[24px] border border-amber-base/20 bg-amber-base/[0.10] p-6">
              <p className="text-sm text-white/45">
                Projected ROI over {result.analysisYears} year
                {result.analysisYears === 1 ? "" : "s"}
              </p>

              <p
                className={`mt-3 break-words text-4xl font-semibold tracking-[-0.045em] sm:text-5xl ${
                  result.roiPercentage >= 0 ? "text-amber-300" : "text-rose-300"
                }`}
              >
                {formatSignedPercentage(result.roiPercentage)}
              </p>

              <p
                className={`mt-3 text-sm font-medium ${
                  result.totalNetBenefit >= 0
                    ? "text-amber-200/75"
                    : "text-rose-300/80"
                }`}
              >
                {formatSignedCurrency(result.totalNetBenefit)} total net benefit
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <ResultCard
                label="Annual gross benefit"
                value={formatCurrency(result.annualGrossBenefit)}
                detail="Loss recovery plus process savings"
              />

              <ResultCard
                label="Annual net benefit"
                value={formatSignedCurrency(result.annualNetBenefit)}
                detail="After annual operating cost"
                valueClassName={
                  result.annualNetBenefit >= 0
                    ? "text-amber-200"
                    : "text-rose-300"
                }
              />

              <ResultCard
                label="Payback period"
                value={
                  result.paybackMonths === null
                    ? "Not reached"
                    : `${formatNumber(result.paybackMonths, 1)} months`
                }
                detail="Time to recover initial investment"
              />

              <ResultCard
                label="Benefit-cost ratio"
                value={`${formatNumber(result.benefitCostRatio, 2)}×`}
                detail="Total benefits divided by investment"
              />

              <ResultCard
                label="Net present value"
                value={formatSignedCurrency(result.netPresentValue)}
                detail="Discounted project cash flows"
                valueClassName={
                  result.netPresentValue >= 0
                    ? "text-amber-200"
                    : "text-rose-300"
                }
              />

              <ResultCard
                label="Average shipment value"
                value={formatCurrency(result.averageShipmentValue)}
                detail="Annual revenue divided by shipments"
              />
            </div>

            <BenefitBreakdown result={result} />

            <ROIIndicator
              roi={result.roiPercentage}
              paybackMonths={result.paybackMonths}
              benefitCostRatio={result.benefitCostRatio}
            />

            <CashFlowTable cashFlows={result.annualCashFlows} />
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
   Benefit Breakdown
========================================================= */

function BenefitBreakdown({ result }: { result: SupplyChainROIResult }) {
  const totalBenefit = Math.max(
    result.recoveredLosses +
      result.processSavings +
      result.inventoryCapitalReleased,
    1,
  );

  const lossRecoveryShare = clamp(
    (result.recoveredLosses / totalBenefit) * 100,
    0,
    100,
  );

  const processShare = clamp(
    (result.processSavings / totalBenefit) * 100,
    0,
    100,
  );

  const inventoryShare = clamp(
    (result.inventoryCapitalReleased / totalBenefit) * 100,
    0,
    100,
  );

  return (
    <div className="mt-6 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white/65">
            Benefit composition
          </p>

          <p className="mt-1 text-xs text-white/35">
            Primary sources of projected value
          </p>
        </div>

        <span className="text-xs font-semibold text-amber-300">
          Year-one impact
        </span>
      </div>

      <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full bg-amber-base"
          style={{
            width: `${lossRecoveryShare}%`,
          }}
        />

        <div
          className="h-full bg-cyan-300"
          style={{
            width: `${processShare}%`,
          }}
        />

        <div
          className="h-full bg-violet-300"
          style={{
            width: `${inventoryShare}%`,
          }}
        />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        <LegendItem
          label="Loss recovery"
          value={formatCurrency(result.recoveredLosses)}
          detail={`${formatNumber(
            result.projectedLossReduction,
            1,
          )}% reduction`}
          markerClassName="bg-amber-base"
        />

        <LegendItem
          label="Process savings"
          value={formatCurrency(result.processSavings)}
          detail={`${formatNumber(result.processCostReduction, 1)}% efficiency`}
          markerClassName="bg-cyan-300"
        />

        <LegendItem
          label="Inventory released"
          value={formatCurrency(result.inventoryCapitalReleased)}
          detail={`${formatNumber(result.inventoryReduction, 1)}% reduction`}
          markerClassName="bg-violet-300"
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
   ROI Indicator
========================================================= */

function ROIIndicator({
  roi,
  paybackMonths,
  benefitCostRatio,
}: {
  roi: number;
  paybackMonths: number | null;
  benefitCostRatio: number;
}) {
  const status = getROIStatus({
    roi,
    paybackMonths,
    benefitCostRatio,
  });

  return (
    <div className="mt-6 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-white/65">Investment outlook</p>

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
   Cash Flow Table
========================================================= */

function CashFlowTable({ cashFlows }: { cashFlows: AnnualCashFlow[] }) {
  if (cashFlows.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.025]">
      <div className="border-b border-white/[0.08] px-5 py-4">
        <p className="text-sm font-medium text-white/65">
          Project cash-flow projection
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/[0.07] text-xs uppercase tracking-[0.1em] text-white/35">
              <th className="px-5 py-4 font-medium">Year</th>

              <th className="px-5 py-4 font-medium">Gross benefit</th>

              <th className="px-5 py-4 font-medium">Operating cost</th>

              <th className="px-5 py-4 font-medium">Net cash flow</th>

              <th className="px-5 py-4 text-right font-medium">Cumulative</th>
            </tr>
          </thead>

          <tbody>
            {cashFlows.map((cashFlow) => (
              <tr
                key={cashFlow.year}
                className="border-b border-white/[0.05] last:border-b-0"
              >
                <td className="px-5 py-4 text-sm font-medium text-white/70">
                  {cashFlow.year === 0 ? "Initial" : `Year ${cashFlow.year}`}
                </td>

                <td className="px-5 py-4 text-sm text-white/50">
                  {formatCurrency(cashFlow.grossBenefit)}
                </td>

                <td className="px-5 py-4 text-sm text-rose-300/75">
                  {cashFlow.operatingCost > 0
                    ? `-${formatCurrency(cashFlow.operatingCost)}`
                    : "—"}
                </td>

                <td
                  className={`px-5 py-4 text-sm font-medium ${
                    cashFlow.netCashFlow >= 0
                      ? "text-amber-300"
                      : "text-rose-300"
                  }`}
                >
                  {formatSignedCurrency(cashFlow.netCashFlow)}
                </td>

                <td
                  className={`px-5 py-4 text-right text-sm font-semibold ${
                    cashFlow.cumulativeCashFlow >= 0
                      ? "text-amber-300"
                      : "text-rose-300"
                  }`}
                >
                  {formatSignedCurrency(cashFlow.cumulativeCashFlow)}
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
        ROI calculation
      </p>

      <code className="mt-3 block overflow-x-auto whitespace-nowrap text-sm leading-7 text-white/60">
        ROI = (Total benefits − Total investment) ÷ Total investment × 100
      </code>

      <p className="mt-3 text-xs leading-5 text-white/35">
        The model treats inventory reduction as a one-time release of working
        capital. It does not include taxes, financing costs, inflation,
        implementation delays, or benefits not entered above.
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
        Enter valid operating data
      </h4>

      <p className="mt-3 text-sm leading-7 text-white/50">
        Annual revenue, shipment volume, and analysis period must be greater
        than zero. Cost and improvement values cannot be negative.
      </p>
    </div>
  );
}

/* =========================================================
   Calculation Helpers
========================================================= */

function calculatePaybackMonths({
  implementationCost,
  annualNetBenefit,
  inventoryCapitalReleased,
}: {
  implementationCost: number;
  annualNetBenefit: number;
  inventoryCapitalReleased: number;
}): number | null {
  const remainingInvestment = implementationCost - inventoryCapitalReleased;

  if (remainingInvestment <= 0) {
    return 0;
  }

  if (annualNetBenefit <= 0) {
    return null;
  }

  return (remainingInvestment / annualNetBenefit) * 12;
}

function buildAnnualCashFlows({
  years,
  implementationCost,
  annualGrossBenefit,
  annualOperatingCost,
  inventoryCapitalReleased,
  discountRate,
}: {
  years: number;
  implementationCost: number;
  annualGrossBenefit: number;
  annualOperatingCost: number;
  inventoryCapitalReleased: number;
  discountRate: number;
}): AnnualCashFlow[] {
  if (years <= 0) {
    return [];
  }

  const cashFlows: AnnualCashFlow[] = [];
  let cumulativeCashFlow = -implementationCost;

  cashFlows.push({
    year: 0,
    grossBenefit: 0,
    operatingCost: 0,
    netCashFlow: -implementationCost,
    discountedCashFlow: -implementationCost,
    cumulativeCashFlow,
  });

  for (let year = 1; year <= years; year += 1) {
    const oneTimeInventoryBenefit = year === 1 ? inventoryCapitalReleased : 0;

    const grossBenefit = annualGrossBenefit + oneTimeInventoryBenefit;

    const netCashFlow = grossBenefit - annualOperatingCost;

    const discountFactor = Math.pow(1 + discountRate / 100, year);

    const discountedCashFlow =
      discountFactor > 0 ? netCashFlow / discountFactor : netCashFlow;

    cumulativeCashFlow += netCashFlow;

    cashFlows.push({
      year,
      grossBenefit,
      operatingCost: annualOperatingCost,
      netCashFlow,
      discountedCashFlow,
      cumulativeCashFlow,
    });
  }

  return cashFlows;
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

  const maximumFractionDigits = Math.abs(safeValue) < 1 ? 4 : 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(safeValue);
}

function formatSignedCurrency(value: number): string {
  const safeValue = Number.isFinite(value) ? value : 0;

  const formattedValue = formatCurrency(Math.abs(safeValue));

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
    return `+${formatNumber(safeValue, 1)}%`;
  }

  return `${formatNumber(safeValue, 1)}%`;
}

function getROIStatus({
  roi,
  paybackMonths,
  benefitCostRatio,
}: {
  roi: number;
  paybackMonths: number | null;
  benefitCostRatio: number;
}): {
  label: string;
  progress: number;
  description: string;
  className: string;
} {
  if (roi < 0 || benefitCostRatio < 1) {
    return {
      label: "Negative return",
      progress: 20,
      description:
        "Projected benefits do not recover the modeled implementation and operating costs.",
      className: "border-rose-300/20 bg-rose-300/[0.08] text-rose-200",
    };
  }

  if (paybackMonths === null || paybackMonths > 36 || roi < 25) {
    return {
      label: "Long payback",
      progress: 40,
      description:
        "The project produces a positive return, but the expected payback period or ROI remains modest.",
      className: "border-amber-300/20 bg-amber-300/[0.08] text-amber-200",
    };
  }

  if (roi < 100 || paybackMonths > 18) {
    return {
      label: "Viable",
      progress: 65,
      description:
        "The modeled project has a positive business case with a reasonable return and payback period.",
      className: "border-emerald-300/20 bg-emerald-300/[0.08] text-amber-200",
    };
  }

  if (roi < 250 || paybackMonths > 9) {
    return {
      label: "Strong return",
      progress: 85,
      description:
        "Projected benefits significantly exceed costs and the initial investment is recovered relatively quickly.",
      className: "border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200",
    };
  }

  return {
    label: "Transformational",
    progress: 100,
    description:
      "The modeled operational improvements create a substantial return with a rapid expected payback period.",
    className: "border-violet-300/20 bg-violet-300/[0.08] text-violet-200",
  };
}
