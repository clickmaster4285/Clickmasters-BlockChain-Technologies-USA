"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

export default function ToolFAQ({ item }: { item: any }) {
  const faqs: FAQItem[] = item?.faqs || item?.faq || [];
  const [activeIndex, setActiveIndex] = useState<number | null>(
    faqs.length ? 0 : null
  );

  if (!faqs.length) return null;

  return (
    <section className="mt-10 rounded-[2rem] border border-amber-base/20 bg-[#111827] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.3)] sm:p-7 md:p-9">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-base text-bg-base">
            <HelpCircle className="h-5 w-5" />
          </span>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-base">
              FAQ
            </p>

            <h2 className="mt-1 text-2xl font-black text-white md:text-3xl">
              Common Questions
            </h2>
          </div>
        </div>

        <span className="rounded-full bg-amber-base/10 px-4 py-2 text-sm font-black text-amber-base">
          {faqs.length}
        </span>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={`${faq.question}-${index}`}
              className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                isOpen
                  ? "border-amber-base bg-amber-base/10"
                  : "border-white/10 bg-[#0b1220] hover:border-amber-base/40"
              }`}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveIndex(isOpen ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-black ${
                      isOpen
                        ? "bg-amber-base text-bg-base"
                        : "bg-white/5 text-amber-base"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3
                    className={`text-sm font-bold leading-6 sm:text-base ${
                      isOpen
                        ? "text-amber-base"
                        : "text-white"
                    }`}
                  >
                    {faq.question}
                  </h3>
                </div>

                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                    isOpen
                      ? "rotate-180 bg-amber-base text-bg-base"
                      : "bg-white/5 text-silver"
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="border-t border-white/10 px-5 py-5 pl-[4.75rem] text-sm leading-7 text-slate-300">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}