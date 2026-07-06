"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 1.2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "instant" : "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={[
        "fixed bottom-24 right-5 z-40",
        "grid h-10 w-10 place-items-center rounded-full",
        "border border-amber-border bg-bg-elevated/80 text-amber-base backdrop-blur-lg",
        "shadow-lg transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-glow hover:bg-amber-glow",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-base focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <ArrowUp className="h-4 w-4" strokeWidth={2} />
    </button>
  );
}
