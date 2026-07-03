"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

/* ── Shared IntersectionObserver singleton ── */

const observers = new Map<string, IntersectionObserver>();
const observedCallbacks = new Map<Element, { cb: () => void; margin: string }>();

function getObserver(rootMargin: string): IntersectionObserver {
  if (!observers.has(rootMargin)) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const data = observedCallbacks.get(entry.target);
            if (data) {
              data.cb();
              observer.unobserve(entry.target);
              observedCallbacks.delete(entry.target);
            }
          }
        });
      },
      { rootMargin, threshold: 0 },
    );
    observers.set(rootMargin, observer);
  }
  return observers.get(rootMargin)!;
}

function useSharedInView(ref: React.RefObject<Element | null>, margin: string): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = getObserver(margin);
    observedCallbacks.set(el, { cb: () => setInView(true), margin });
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      observedCallbacks.delete(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return inView;
}

/* ── Reveal (single section fade-in) ── */

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 40 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useSharedInView(ref, "-80px");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger (container + item) ── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function StaggerContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useSharedInView(ref, "-50px");

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

/* ── RevealText (clip-path reveal) ── */

export function RevealText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useSharedInView(ref, "-80px");

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
      animate={inView ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
