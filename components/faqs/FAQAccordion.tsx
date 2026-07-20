"use client";

import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import { useState } from "react";

import type { FAQItem } from "@/lib/faqs";

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({
  items,
}: FAQAccordionProps) {
  const [openFAQ, setOpenFAQ] = useState<string | null>(
    items[0]?.slug ?? null
  );

  return (
    <div className="space-y-4">
      {items.map((faq, index) => {
        const isOpen = openFAQ === faq.slug;
        const contentId = `faq-content-${faq.slug}`;

        return (
          <article
            key={faq.slug}
            className="overflow-hidden rounded-2xl border border-border-default bg-white"
          >
            <button
              type="button"
              onClick={() =>
                setOpenFAQ((current) =>
                  current === faq.slug ? null : faq.slug
                )
              }
              aria-expanded={isOpen}
              aria-controls={contentId}
              className="flex w-full items-start gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-base"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-base/10 text-sm font-black text-amber-base">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-base font-black leading-7 text-text-primary">
                  {faq.title}
                </span>
                <span className="mt-2 line-clamp-2 block text-sm leading-6 text-text-secondary">
                  {faq.excerpt}
                </span>
              </span>

              <span
                className={[
                  "grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border-default text-text-muted transition",
                  isOpen ? "rotate-45 text-amber-base" : "",
                ].join(" ")}
                aria-hidden="true"
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>

            <div
              id={contentId}
              className={[
                "grid transition-[grid-template-rows,opacity] duration-300",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              ].join(" ")}
            >
              <div className="overflow-hidden">
                <div className="border-t border-border-default p-5">
                  <p className="text-sm leading-7 text-text-secondary">
                    {faq.hero?.description || faq.excerpt}
                  </p>

                  <Link
                    href={`/faqs/${faq.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-black text-amber-base"
                  >
                    Read full guide
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
