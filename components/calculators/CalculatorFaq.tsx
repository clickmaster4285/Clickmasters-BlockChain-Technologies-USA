"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";

import type { CalculatorFaq as CalculatorFaqItem } from "@/lib/calculators";

type CalculatorFaqProps = {
  faqs: CalculatorFaqItem[];
  title?: string;
};

export default function CalculatorFaq({
  faqs,
  title = "Frequently Asked Questions",
}: CalculatorFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="calculator-faq-title"
      className="border-t border-white/10 pt-14 sm:pt-16"
    >
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-amber-base">
          <span className="h-px w-8 bg-amber-base" />
          Common questions
        </span>

        <h2
          id="calculator-faq-title"
          className="mt-4 text-3xl font-black tracking-tight text-text-primary sm:text-4xl"
        >
          {title}
        </h2>

        <p className="mt-4 text-base leading-8 text-silver">
          Review the most common questions about this calculator, simulator, or
          blockchain planning resource.
        </p>
      </div>

      <div className="mt-10 space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const triggerId = `faq-trigger-${index}`;
          const panelId = `faq-panel-${index}`;

          return (
            <article
              key={`${faq.question}-${index}`}
              className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface/80 shadow-[0_14px_45px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30 hover:bg-bg-base"
            >
              <h3>
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6 sm:py-6"
                >
                  <span className="flex min-w-0 items-start gap-3 text-base font-black leading-7 text-text-primary sm:text-lg">
                    <HelpCircle className="mt-1 h-5 w-5 shrink-0 text-amber-base" />
                    <span>{faq.question}</span>
                  </span>

                  <span
                    aria-hidden="true"
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-lg transition duration-300 ${
                      isOpen
                        ? "rotate-45 border-amber-base/30 bg-amber-base/10 text-amber-base"
                        : "border-white/10 bg-white/[0.035] text-silver"
                    }`}
                  >
                    +
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                hidden={!isOpen}
                className="border-t border-white/[0.07] bg-bg-base/45 px-5 py-5 sm:px-6 sm:py-6"
              >
                <p className="whitespace-pre-line text-sm leading-8 text-silver sm:text-base">
                  {faq.answer}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
