"use client";
// components/cms/CmsFaqList.tsx — the site's FAQ accordion for CMS faq sections.
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CmsFaqList({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-0"
      className="w-full"
    >
      {items.map((f, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-border">
          <AccordionTrigger className="px-2 text-left text-base font-semibold text-text-primary transition-colors hover:text-amber-base md:text-lg">
            {f.question}
          </AccordionTrigger>
          <AccordionContent className="whitespace-pre-line px-2 pb-4 text-sm leading-relaxed text-text-secondary">
            {f.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
