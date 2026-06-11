"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  items: { question: string; answer: string }[];
}

export default function ServiceFAQ({ items }: Props) {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Frequently asked questions</h2>
      <div className="space-y-3">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={item.question}
              initial={reduce ? {} : { opacity: 0, y: 8 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-xl border border-border bg-surface overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex items-center justify-between w-full p-5 text-left hover:bg-white/[0.02] transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-medium pr-4">{item.question}</span>
                <ChevronDown className={`h-4 w-4 flex-shrink-0 text-amber-base transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-48" : "max-h-0"}`}
              >
                <p className="px-5 pb-5 text-sm text-silver-base leading-relaxed">{item.answer}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
