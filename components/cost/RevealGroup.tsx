"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wrap a list/table/grid of items that should cascade in together
 * (each child using --row-i or --item-i for its own stagger delay,
 * via the .reveal-row / .reveal-checklist-item CSS classes).
 */
export default function RevealGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal-group ${visible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}
