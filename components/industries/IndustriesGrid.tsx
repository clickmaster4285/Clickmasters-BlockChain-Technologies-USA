import IndustryCard from "@/components/industries/IndustryCard";
import type { IndustryCardData } from "@/lib/industry";

interface IndustriesGridProps {
  industries: IndustryCardData[];
}

export default function IndustriesGrid({
  industries,
}: IndustriesGridProps) {
  return (
    <section
      id="industries-grid"
      className="relative overflow-hidden bg-[#050a0f] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-180px] top-24 h-[420px] w-[420px] rounded-full bg-cyan-400/[0.06] blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-20 right-[-200px] h-[480px] w-[480px] rounded-full bg-blue-500/[0.06] blur-[150px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Industry expertise
            </span>

            <h2 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Blockchain solutions designed for{" "}
              <span className="bg-gradient-to-r from-cyan-200 to-blue-400 bg-clip-text text-transparent">
                real-world industries.
              </span>
            </h2>
          </div>

          <div className="lg:pb-2">
            <p className="max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Explore how blockchain can improve settlement,
              traceability, compliance, ownership, automation and
              coordination across industries where trust and
              verifiable data are essential.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-slate-300">
                {industries.length} industry solutions
              </span>

              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-slate-300">
                Enterprise architecture
              </span>

              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-slate-300">
                Compliance-aware delivery
              </span>
            </div>
          </div>
        </div>

        {industries.length > 0 ? (
          <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 lg:mt-16 xl:grid-cols-3">
            {industries.map((industry, index) => (
              <IndustryCard
                key={industry.slug}
                industry={industry}
                priority={index < 3}
              />
            ))}
          </div>
        ) : (
          <div className="mt-14 rounded-[28px] border border-white/[0.08] bg-white/[0.025] px-6 py-16 text-center">
            <h3 className="text-2xl font-semibold text-white">
              No industries available
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400">
              Industry content has not been added yet. Please check
              the industry data source.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
