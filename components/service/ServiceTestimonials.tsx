"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  testimonials: { quote: string; by: string }[];
}

export default function ServiceTestimonials({ testimonials }: Props) {
  const reduce = useReducedMotion();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">What clients say</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <motion.blockquote
            key={t.by}
            initial={reduce ? {} : { opacity: 0, y: 12 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl border border-border bg-surface p-6 relative"
          >
            {/* Decorative quote mark */}
            <span className="absolute top-3 right-4 text-5xl font-display text-amber-base/10 leading-none select-none" aria-hidden="true">"</span>
            <p className="text-sm text-silver-base leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
            <footer className="mt-4 text-sm font-medium text-amber-base not-italic">— {t.by}</footer>
          </motion.blockquote>
        ))}
      </div>
    </div>
  );
}
