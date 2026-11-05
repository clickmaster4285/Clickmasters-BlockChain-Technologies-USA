"use client";

import { homeFaqs } from "@/data/home-faqs";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/structured-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = homeFaqs;

export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden border-y border-border bg-bg-surface py-24 md:py-28">
      {/* FAQPage JSON-LD is built here (from the same data as the visible FAQs)
          so it is server-rendered into the HTML without also being copied into
          the page's RSC payload. */}
      <JsonLd data={faqPageSchema(homeFaqs)} />
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-30" />
      <div className="site-container relative px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-glow/50 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-base">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
            FAQ
          </div>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
            Straight answers to the questions we hear most often from clients evaluating a
            blockchain development company.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="px-2 text-left text-base font-semibold text-text-primary transition-colors hover:text-amber-base md:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="px-2 pb-4 text-sm leading-relaxed text-text-secondary">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
