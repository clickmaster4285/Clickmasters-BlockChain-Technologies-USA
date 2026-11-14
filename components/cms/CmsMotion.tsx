"use client";
// components/cms/CmsMotion.tsx
// settings.motion for CMS sections: fade-up | fade-in | slide-in | slide-left |
// slide-right | zoom | none. Plays once when scrolled into view. With
// prefers-reduced-motion only the opacity fade runs (MotionConfig "user").
import { MotionConfig, motion } from "framer-motion";
import type { ReactNode } from "react";

const VARIANTS: Record<
  string,
  { opacity: number; x?: number; y?: number; scale?: number }
> = {
  "fade-up": { opacity: 0, y: 28 },
  "fade-in": { opacity: 0 },
  fade: { opacity: 0 },
  "slide-in": { opacity: 0, x: -40 },
  "slide-left": { opacity: 0, x: -40 },
  "slide-right": { opacity: 0, x: 40 },
  "slide-up": { opacity: 0, y: 48 },
  zoom: { opacity: 0, scale: 0.94 },
  "zoom-in": { opacity: 0, scale: 0.94 },
};

export default function CmsMotion({
  motion: kind,
  children,
}: {
  motion: string;
  children: ReactNode;
}) {
  const from = VARIANTS[kind];
  if (!from) return <>{children}</>;
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={from}
        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
