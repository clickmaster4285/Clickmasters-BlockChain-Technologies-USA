"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

export default function StickyCTA({ label = "Schedule call" }: { label?: string }) {
  const reduce = useReducedMotion();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <motion.div
      initial={reduce ? {} : { opacity: 0, y: 8 }}
      animate={reduce ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-border bg-surface p-6 sticky top-32 relative"
    >
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="absolute top-3 right-3 p-1 rounded-full text-silver-mid hover:text-foreground hover:bg-white/5 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
      <h4 className="font-semibold">Quick estimate</h4>
      <p className="mt-2 text-sm text-silver-base">Small module: 2–4 weeks · Medium: 6–10 weeks · Large: 10+ weeks</p>
      <div className="mt-4">
        <Link href="/contact" aria-label="Schedule a call" className="inline-flex w-full justify-center items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground cta-btn">{label}</Link>
      </div>
    </motion.div>
  );
}
