import type { CostItem } from "@/lib/cost-type";
import HeroSection from "@/components/cost/sections/Hero";
import PricingTableSection from "@/components/cost/sections/PricingTable";
import ComparisonSection from "@/components/cost/sections/Comparison";
import FeatureGridSection from "@/components/cost/sections/FeatureGrid";
import CaseStudySection from "@/components/cost/sections/CaseStudy";
import ChecklistSection, { isChecklistSection } from "@/components/cost/sections/CheckList";
import GenericSection from "@/components/cost/sections/Generic";

function getLabels(content: string): string[] {
  return Array.from(content.matchAll(/\*\*([^*][^*]*?)\*(?!\*)/g))
    .map((m) => m[1].trim())
    .filter((l) => !/^H[12]:/.test(l) && !/^\[BUTTON/.test(l));
}

function hasTable(content: string): boolean {
  return (content.match(/^\s*\|.*\|\s*$/gm)?.length ?? 0) >= 2;
}

export default function SectionRenderer({ cost }: { cost: CostItem }) {
  return (
    <>
      {cost.sections.map((section, index) => {
        const heading = section.heading.toUpperCase();

        if (index === 0 || heading === "ABOVE THE FOLD") {
          return <HeroSection key={index} section={section} meta={cost.meta} />;
        }

        if (heading.includes("CASE STUDY")) {
          return <CaseStudySection key={index} section={section} index={index} />;
        }

        const labels = getLabels(section.content);
        const tablePresent = hasTable(section.content);

        if (isChecklistSection(labels)) {
          return <ChecklistSection key={index} section={section} index={index} />;
        }

        if (tablePresent && labels.length >= 2) {
          return <ComparisonSection key={index} section={section} index={index} />;
        }

        if (tablePresent) {
          return <PricingTableSection key={index} section={section} index={index} />;
        }

        if (labels.length >= 3) {
          return <FeatureGridSection key={index} section={section} index={index} />;
        }

        return <GenericSection key={index} section={section} index={index} />;
      })}
    </>
  );
}
