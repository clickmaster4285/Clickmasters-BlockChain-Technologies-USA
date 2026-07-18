import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import CaseStudyCard, {
  CaseStudyCardItem,
} from "@/components/case-studies/CaseStudyCard";

type RelatedCaseStudiesProps = {
  caseStudies: CaseStudyCardItem[];
  title?: string;
  highlightedText?: string;
  description?: string;
  viewAllHref?: string;
};

export default function RelatedCaseStudies({
  caseStudies,
  title = "More work built around",
  highlightedText = "measurable impact.",
  description = "Explore more client stories across strategy, design, acquisition, conversion, and long-term growth.",
  viewAllHref = "/case-studies",
}: RelatedCaseStudiesProps) {
  if (caseStudies.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#07101d] py-24 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-amber-400/[0.045] blur-[140px]" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-500/[0.04] blur-[140px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:92px_92px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
              <Sparkles className="h-4 w-4" />
              Related Case Studies
            </div>

            <h2 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              {title}{" "}
              <span className="text-amber-400">
                {highlightedText}
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-sm font-medium leading-7 text-[#8f9caf] sm:text-base">
              {description}
            </p>
          </div>

          <Link
            href={viewAllHref}
            className="group inline-flex min-h-12 items-center justify-center gap-3 self-start rounded-full border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-sm font-black text-[#c5cfdd] transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/25 hover:bg-amber-400/[0.06] hover:text-amber-400 lg:self-auto"
          >
            View All Case Studies

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3 lg:mt-16">
          {caseStudies.slice(0, 3).map((caseStudy, index) => (
            <CaseStudyCard
              key={caseStudy.id ?? caseStudy.slug}
              item={caseStudy}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}