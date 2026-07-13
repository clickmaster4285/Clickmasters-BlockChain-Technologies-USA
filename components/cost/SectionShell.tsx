import { ReactNode } from "react";

type Tone = "base" | "surface" | "elevated";

const toneClass: Record<Tone, string> = {
  base: "bg-bg-base",
  surface: "bg-bg-surface",
  elevated: "bg-bg-elevated",
};

export default function SectionShell({
  children,
  tone = "base",
  className = "",
  eyebrow,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  eyebrow?: string;
}) {
  return (
    <section className={`relative w-full py-16 md:py-24 ${toneClass[tone]} ${className}`}>
      <div className="site-container mx-auto px-4">
        {eyebrow && (
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-amber-base">
            <span className="h-px w-6 bg-amber-base/60" />
            {eyebrow}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
