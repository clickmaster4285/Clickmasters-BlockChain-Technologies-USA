"use client";

import { useMemo, useState } from "react";

type NFTRarityCalculatorProps = {
  title?: string;
};

type TraitInput = {
  id: number;
  name: string;
  value: string;
  occurrenceCount: string;
};

type TraitResult = {
  id: number;
  name: string;
  value: string;
  occurrenceCount: number;
  rarityPercentage: number;
  rarityScore: number;
};

const defaultTraits: TraitInput[] = [
  {
    id: 1,
    name: "Background",
    value: "Gold",
    occurrenceCount: "250",
  },
  {
    id: 2,
    name: "Eyes",
    value: "Laser",
    occurrenceCount: "75",
  },
  {
    id: 3,
    name: "Headwear",
    value: "Crown",
    occurrenceCount: "40",
  },
];

export default function NFTRarityCalculator({
  title = "NFT Rarity Calculator",
}: NFTRarityCalculatorProps) {
  const [collectionSize, setCollectionSize] = useState("10000");

  const [traits, setTraits] = useState<TraitInput[]>(defaultTraits);

  const [includeTraitCountBonus, setIncludeTraitCountBonus] = useState(false);

  const [traitCountOccurrence, setTraitCountOccurrence] = useState("500");

  const result = useMemo(() => {
    const parsedCollectionSize = parsePositiveNumber(collectionSize);

    const calculatedTraits: TraitResult[] = traits.map((trait) => {
      const occurrenceCount = parseNonNegativeNumber(trait.occurrenceCount);

      const rarityPercentage =
        parsedCollectionSize > 0
          ? (occurrenceCount / parsedCollectionSize) * 100
          : 0;

      const rarityScore =
        occurrenceCount > 0 && parsedCollectionSize > 0
          ? parsedCollectionSize / occurrenceCount
          : 0;

      return {
        id: trait.id,
        name: trait.name.trim() || "Unnamed trait",
        value: trait.value.trim() || "Unknown value",
        occurrenceCount,
        rarityPercentage,
        rarityScore,
      };
    });

    const validTraits = calculatedTraits.filter(
      (trait) =>
        trait.occurrenceCount > 0 &&
        trait.occurrenceCount <= parsedCollectionSize,
    );

    const baseRarityScore = validTraits.reduce(
      (total, trait) => total + trait.rarityScore,
      0,
    );

    const parsedTraitCountOccurrence =
      parseNonNegativeNumber(traitCountOccurrence);

    const traitCountBonus =
      includeTraitCountBonus &&
      parsedTraitCountOccurrence > 0 &&
      parsedCollectionSize > 0
        ? parsedCollectionSize / parsedTraitCountOccurrence
        : 0;

    const totalRarityScore = baseRarityScore + traitCountBonus;

    const averageRarityPercentage =
      validTraits.length > 0
        ? validTraits.reduce(
            (total, trait) => total + trait.rarityPercentage,
            0,
          ) / validTraits.length
        : 0;

    const rarestTrait =
      validTraits.length > 0
        ? [...validTraits].sort(
            (first, second) => second.rarityScore - first.rarityScore,
          )[0]
        : null;

    const rarityLevel = getRarityLevel(
      averageRarityPercentage,
      totalRarityScore,
    );

    return {
      collectionSize: parsedCollectionSize,
      calculatedTraits,
      validTraits,
      baseRarityScore,
      traitCountBonus,
      totalRarityScore,
      averageRarityPercentage,
      rarestTrait,
      rarityLevel,
      parsedTraitCountOccurrence,
    };
  }, [collectionSize, traits, includeTraitCountBonus, traitCountOccurrence]);

  const hasValidInputs =
    result.collectionSize > 0 && result.validTraits.length > 0;

  function updateTrait(
    id: number,
    field: keyof Omit<TraitInput, "id">,
    value: string,
  ) {
    setTraits((currentTraits) =>
      currentTraits.map((trait) =>
        trait.id === id
          ? {
              ...trait,
              [field]: value,
            }
          : trait,
      ),
    );
  }

  function addTrait() {
    setTraits((currentTraits) => [
      ...currentTraits,
      {
        id: createTraitId(currentTraits),
        name: "",
        value: "",
        occurrenceCount: "",
      },
    ]);
  }

  function removeTrait(id: number) {
    setTraits((currentTraits) =>
      currentTraits.filter((trait) => trait.id !== id),
    );
  }

  function handleReset() {
    setCollectionSize("10000");
    setTraits(defaultTraits);
    setIncludeTraitCountBonus(false);
    setTraitCountOccurrence("500");
  }

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/10 bg-slate-950 text-white shadow-[0_24px_90px_rgba(0,0,0,0.22)]">
      <CalculatorHeader title={title} onReset={handleReset} />

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.85fr)]">
        <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <NumberField
            id="nft-collection-size"
            label="Collection size"
            value={collectionSize}
            onChange={setCollectionSize}
            suffix="NFTs"
            min={1}
            step={1}
            helpText="Total number of NFTs in the collection."
          />

          <div className="mt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-white/75">
                  NFT traits
                </p>

                <p className="mt-2 text-xs leading-5 text-white/35">
                  Add each trait and the number of NFTs containing that exact
                  value.
                </p>
              </div>

              <button
                type="button"
                onClick={addTrait}
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-amber-base/20 bg-amber-base/[0.10] px-5 py-2 text-sm font-semibold text-amber-300 transition hover:border-amber-base/35 hover:bg-amber-base/[0.16] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-base/50"
              >
                Add trait
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {traits.map((trait, index) => (
                <TraitRow
                  key={trait.id}
                  trait={trait}
                  index={index}
                  canRemove={traits.length > 1}
                  onChange={updateTrait}
                  onRemove={removeTrait}
                />
              ))}
            </div>
          </div>

          <TraitCountBonus
            checked={includeTraitCountBonus}
            occurrenceCount={traitCountOccurrence}
            onCheckedChange={setIncludeTraitCountBonus}
            onOccurrenceChange={setTraitCountOccurrence}
          />

          <FormulaNote />
        </div>

        <NFTRarityResults result={result} hasValidInputs={hasValidInputs} />
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
          Trait rarity analyzer
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
   Trait Inputs
========================================================= */

function TraitRow({
  trait,
  index,
  canRemove,
  onChange,
  onRemove,
}: {
  trait: TraitInput;
  index: number;
  canRemove: boolean;
  onChange: (
    id: number,
    field: keyof Omit<TraitInput, "id">,
    value: string,
  ) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-4 sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">
          Trait {index + 1}
        </p>

        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(trait.id)}
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white/40 transition hover:border-rose-300/30 hover:bg-rose-300/[0.06] hover:text-rose-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/40"
          >
            Remove
          </button>
        )}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <TextField
          id={`trait-name-${trait.id}`}
          label="Trait type"
          value={trait.name}
          onChange={(value) => onChange(trait.id, "name", value)}
          placeholder="e.g. Background"
        />

        <TextField
          id={`trait-value-${trait.id}`}
          label="Trait value"
          value={trait.value}
          onChange={(value) => onChange(trait.id, "value", value)}
          placeholder="e.g. Gold"
        />

        <div className="sm:col-span-2">
          <NumberField
            id={`trait-count-${trait.id}`}
            label="NFTs with this trait"
            value={trait.occurrenceCount}
            onChange={(value) => onChange(trait.id, "occurrenceCount", value)}
            suffix="NFTs"
            min={0}
            step={1}
            helpText="Count of NFTs containing this exact trait value."
          />
        </div>
      </div>
    </div>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-white/70">
        {label}
      </label>

      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-12 w-full rounded-xl border border-white/10 bg-[#0a1711] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-amber-base/50 focus:ring-2 focus:ring-amber-base/15"
      />
    </div>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  suffix,
  min,
  step,
  helpText,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
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
        <input
          id={id}
          type="number"
          inputMode="numeric"
          value={value}
          min={min}
          step={step}
          onChange={(event) => onChange(event.target.value)}
          className={`min-h-12 w-full rounded-xl border border-white/10 bg-[#0a1711] py-3 pl-4 text-sm text-white outline-none transition focus:border-amber-base/50 focus:ring-2 focus:ring-amber-base/15 ${
            suffix ? "pr-20" : "pr-4"
          }`}
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
   Trait Count Bonus
========================================================= */

function TraitCountBonus({
  checked,
  occurrenceCount,
  onCheckedChange,
  onOccurrenceChange,
}: {
  checked: boolean;
  occurrenceCount: string;
  onCheckedChange: (checked: boolean) => void;
  onOccurrenceChange: (value: string) => void;
}) {
  return (
    <div className="mt-8 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="flex items-start justify-between gap-5">
        <div>
          <label
            htmlFor="trait-count-bonus"
            className="text-sm font-semibold text-white/70"
          >
            Include trait-count rarity
          </label>

          <p className="mt-2 max-w-xl text-xs leading-5 text-white/35">
            Adds an optional rarity score based on how many NFTs have the same
            total number of traits.
          </p>
        </div>

        <button
          id="trait-count-bonus"
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onCheckedChange(!checked)}
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

      {checked && (
        <div className="mt-5 border-t border-white/[0.07] pt-5">
          <NumberField
            id="trait-count-occurrence"
            label="NFTs with the same trait count"
            value={occurrenceCount}
            onChange={onOccurrenceChange}
            suffix="NFTs"
            min={1}
            step={1}
            helpText="Number of NFTs sharing this NFT's total trait count."
          />
        </div>
      )}
    </div>
  );
}

/* =========================================================
   Results
========================================================= */

function NFTRarityResults({
  result,
  hasValidInputs,
}: {
  result: {
    collectionSize: number;
    calculatedTraits: TraitResult[];
    validTraits: TraitResult[];
    baseRarityScore: number;
    traitCountBonus: number;
    totalRarityScore: number;
    averageRarityPercentage: number;
    rarestTrait: TraitResult | null;
    rarityLevel: {
      label: string;
      description: string;
      progress: number;
      className: string;
    };
    parsedTraitCountOccurrence: number;
  };
  hasValidInputs: boolean;
}) {
  return (
    <aside className="relative overflow-hidden bg-amber-base/[0.06] p-6 sm:p-8">
      <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-64 w-64 rounded-full bg-amber-base/10 blur-[90px]" />

      <div className="relative">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
          Rarity result
        </span>

        <p className="mt-3 text-sm leading-7 text-white/45">
          Trait rarity is estimated using the statistical rarity-score method.
        </p>

        {hasValidInputs ? (
          <>
            <div className="mt-8 rounded-[24px] border border-amber-base/20 bg-amber-base/[0.10] p-6">
              <p className="text-sm text-white/45">Total rarity score</p>

              <p className="mt-3 break-words text-4xl font-semibold tracking-[-0.045em] text-amber-300 sm:text-5xl">
                {formatNumber(result.totalRarityScore, 2)}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${result.rarityLevel.className}`}
                >
                  {result.rarityLevel.label}
                </span>

                <span className="text-xs text-white/40">
                  Across {result.validTraits.length} valid trait
                  {result.validTraits.length === 1 ? "" : "s"}
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <ResultCard
                label="Base trait score"
                value={formatNumber(result.baseRarityScore, 2)}
                detail="Combined score from NFT traits"
              />

              <ResultCard
                label="Average trait frequency"
                value={`${formatNumber(result.averageRarityPercentage, 2)}%`}
                detail="Average percentage across traits"
              />

              <ResultCard
                label="Trait-count bonus"
                value={formatNumber(result.traitCountBonus, 2)}
                detail={
                  result.traitCountBonus > 0
                    ? "Included in the total score"
                    : "Not included"
                }
              />

              <ResultCard
                label="Collection size"
                value={formatNumber(result.collectionSize, 0)}
                detail="NFTs in the analyzed collection"
              />
            </div>

            {result.rarestTrait && (
              <RarestTraitCard trait={result.rarestTrait} />
            )}

            <RarityIndicator rarityLevel={result.rarityLevel} />

            <TraitBreakdownTable
              traits={result.calculatedTraits}
              collectionSize={result.collectionSize}
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
   Rarest Trait
========================================================= */

function RarestTraitCard({ trait }: { trait: TraitResult }) {
  return (
    <div className="mt-6 rounded-[20px] border border-cyan-300/15 bg-cyan-300/[0.04] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
        Rarest trait
      </p>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-white/40">{trait.name}</p>

          <p className="mt-1 text-xl font-semibold text-white">{trait.value}</p>
        </div>

        <div className="sm:text-right">
          <p className="text-2xl font-semibold text-cyan-200">
            {formatNumber(trait.rarityScore, 2)}
          </p>

          <p className="mt-1 text-xs text-white/35">
            {formatNumber(trait.rarityPercentage, 3)}% of collection
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Indicator
========================================================= */

function RarityIndicator({
  rarityLevel,
}: {
  rarityLevel: {
    label: string;
    description: string;
    progress: number;
    className: string;
  };
}) {
  return (
    <div className="mt-6 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-white/65">
          Relative rarity estimate
        </p>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${rarityLevel.className}`}
        >
          {rarityLevel.label}
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full bg-amber-base transition-[width] duration-500"
          style={{
            width: `${rarityLevel.progress}%`,
          }}
        />
      </div>

      <p className="mt-3 text-xs leading-5 text-white/35">
        {rarityLevel.description}
      </p>
    </div>
  );
}

/* =========================================================
   Breakdown Table
========================================================= */

function TraitBreakdownTable({
  traits,
  collectionSize,
}: {
  traits: TraitResult[];
  collectionSize: number;
}) {
  return (
    <div className="mt-6 overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.025]">
      <div className="border-b border-white/[0.08] px-5 py-4">
        <p className="text-sm font-medium text-white/65">
          Trait score breakdown
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[620px] w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-white/[0.07] text-xs uppercase tracking-[0.1em] text-white/35">
              <th className="px-5 py-4 font-medium">Trait</th>

              <th className="px-5 py-4 font-medium">Occurrences</th>

              <th className="px-5 py-4 font-medium">Frequency</th>

              <th className="px-5 py-4 text-right font-medium">Score</th>
            </tr>
          </thead>

          <tbody>
            {traits.map((trait) => {
              const isValid =
                trait.occurrenceCount > 0 &&
                trait.occurrenceCount <= collectionSize;

              return (
                <tr
                  key={trait.id}
                  className="border-b border-white/[0.05] last:border-b-0"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-white/75">
                      {trait.name}
                    </p>

                    <p className="mt-1 text-xs text-white/35">{trait.value}</p>
                  </td>

                  <td className="px-5 py-4 text-sm text-white/55">
                    {formatNumber(trait.occurrenceCount, 0)}
                  </td>

                  <td className="px-5 py-4 text-sm text-white/55">
                    {isValid
                      ? `${formatNumber(trait.rarityPercentage, 3)}%`
                      : "Invalid"}
                  </td>

                  <td className="px-5 py-4 text-right text-sm font-semibold text-amber-300">
                    {isValid ? formatNumber(trait.rarityScore, 2) : "—"}
                  </td>
                </tr>
              );
            })}
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
        Statistical rarity formula
      </p>

      <code className="mt-3 block overflow-x-auto whitespace-nowrap text-sm leading-7 text-white/60">
        Trait score = Collection size ÷ Trait occurrences
      </code>

      <p className="mt-3 text-xs leading-5 text-white/35">
        Total rarity score is the sum of all individual trait scores. Different
        NFT marketplaces may use different ranking systems, normalization
        methods, or metadata rules.
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
        Add valid trait data
      </h4>

      <p className="mt-3 text-sm leading-7 text-white/50">
        Collection size must be greater than zero. Each included trait must
        occur at least once and cannot exceed the collection size.
      </p>
    </div>
  );
}

/* =========================================================
   Utilities
========================================================= */

function parsePositiveNumber(value: string): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 0;
  }

  return parsed;
}

function parseNonNegativeNumber(value: string): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return 0;
  }

  return parsed;
}

function createTraitId(traits: TraitInput[]): number {
  return Math.max(0, ...traits.map((trait) => trait.id)) + 1;
}

function formatNumber(value: number, maximumFractionDigits = 2): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(Number.isFinite(value) ? value : 0);
}

function getRarityLevel(
  averageFrequency: number,
  totalScore: number,
): {
  label: string;
  description: string;
  progress: number;
  className: string;
} {
  if (averageFrequency <= 1 || totalScore >= 300) {
    return {
      label: "Mythic",
      progress: 100,
      description:
        "The entered traits are exceptionally uncommon relative to the collection size.",
      className: "border-violet-300/20 bg-violet-300/[0.08] text-violet-200",
    };
  }

  if (averageFrequency <= 3 || totalScore >= 150) {
    return {
      label: "Legendary",
      progress: 85,
      description: "The NFT contains multiple highly uncommon trait values.",
      className: "border-amber-300/20 bg-amber-300/[0.08] text-amber-200",
    };
  }

  if (averageFrequency <= 8 || totalScore >= 75) {
    return {
      label: "Rare",
      progress: 65,
      description:
        "The NFT appears less common than a typical item in the collection.",
      className: "border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200",
    };
  }

  if (averageFrequency <= 20 || totalScore >= 35) {
    return {
      label: "Uncommon",
      progress: 45,
      description:
        "The NFT has some less-common traits but is not among the rarest items.",
      className: "border-emerald-300/20 bg-emerald-300/[0.08] text-amber-200",
    };
  }

  return {
    label: "Common",
    progress: 25,
    description: "Most entered traits occur frequently within the collection.",
    className: "border-white/15 bg-white/[0.05] text-white/60",
  };
}
