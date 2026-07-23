// components/process/ProcessFAQ.tsx

import {
  CircleHelp,
  Plus,
} from "lucide-react";

import type { ProcessFAQ as ProcessFAQType } from "@/lib/process";

/* =========================================================
   Types
========================================================= */

type ProcessFAQProps = {
  faqs: ProcessFAQType[];
  title?: string;
  description?: string;
  className?: string;
};

/* =========================================================
   Component
========================================================= */

export default function ProcessFAQ({
  faqs,
  title = "Frequently Asked Questions",
  description = "Common questions about this process, implementation, security, cost, and production requirements.",
  className = "",
}: ProcessFAQProps) {
  if (faqs.length === 0) {
    return null;
  }

  return (
    <section
      className={[
        "relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-surface p-6 sm:p-8 lg:p-10",
        className,
      ].join(" ")}
    >
      {/* Background Glow */}

      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-base/[0.08] blur-[90px]" />

      <div className="relative">
        {/* Heading */}

        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/[0.06] px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-amber-base">
            <CircleHelp className="h-4 w-4" />

            FAQ
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-[-0.035em] text-text-primary sm:text-4xl">
            {title}
          </h2>

          <p className="mt-4 text-sm leading-7 text-silver sm:text-base">
            {description}
          </p>
        </div>

        {/* FAQ Items */}

        <div className="mt-9 space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={`${faq.question}-${index}`}
              className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-base/50 transition-all duration-300 open:border-amber-base/25 open:bg-amber-base/[0.035]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 sm:px-6">
                <span className="pr-4 text-sm font-black leading-6 text-text-primary transition-colors duration-300 group-open:text-amber-base sm:text-base">
                  {faq.question}
                </span>

                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-amber-base transition-all duration-300 group-open:rotate-45 group-open:border-amber-base/30 group-open:bg-amber-base/[0.08]">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>

              <div className="border-t border-white/[0.07] px-5 py-5 sm:px-6">
                <p className="text-sm leading-7 text-silver sm:text-[15px]">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}