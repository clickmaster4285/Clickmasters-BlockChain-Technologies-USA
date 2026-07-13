"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type RevealEffect =
  | "slide-left"
  | "slide-up"
  | "flip-in"
  | "blast-in"
  | "pop-bounce"
  | "float-rise"
  | "fade-up"
  | "unfold";

export default function RevealOnScroll({
  children,
  effect = "slide-left",
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  effect?: RevealEffect;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span";
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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Map effects to Tailwind classes
  const getEffectClasses = () => {
    const base = "transition-all duration-700";
    const hidden = {
      "slide-left": "opacity-0 -translate-x-10",
      "slide-up": "opacity-0 translate-y-10",
      "flip-in": "opacity-0 perspective-600 rotate-y-30 scale-90",
      "blast-in": "opacity-0 scale-90 blur-sm",
      "pop-bounce": "opacity-0 scale-75",
      "float-rise": "opacity-0 translate-y-8",
      "fade-up": "opacity-0 translate-y-5",
      "unfold": "opacity-0 scale-x-90 scale-y-95 origin-left",
    };
    const visible = {
      "slide-left": "opacity-100 translate-x-0",
      "slide-up": "opacity-100 translate-y-0",
      "flip-in": "opacity-100 rotate-y-0 scale-100",
      "blast-in": "opacity-100 scale-100 blur-0",
      "pop-bounce": "opacity-100 scale-100",
      "float-rise": "opacity-100 translate-y-0",
      "fade-up": "opacity-100 translate-y-0",
      "unfold": "opacity-100 scale-x-100 scale-y-100",
    };

    return `${base} ${!visible ? hidden[effect] : visible[effect]}`;
  };

  const Component = Tag as any;

  return (
    <Component
      ref={ref}
      className={`${getEffectClasses()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}