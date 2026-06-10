"use client";

import { useEffect, useRef, useState } from "react";
import { Rocket, Map, Wand2, Cog, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Rocket,
    title: "Discovery Call",
    desc: "We learn your vision, market, and goals. No jargon, just clarity.",
    duration: "~1 week",
  },
  {
    icon: Map,
    title: "Strategy & Architecture",
    desc: "We map the tech stack, blockchain layer, and UX wireframes.",
    duration: "~2 weeks",
  },
  {
    icon: Wand2,
    title: "Design & Prototype",
    desc: "High-fidelity Figma prototypes with your brand baked in.",
    duration: "~2 weeks",
  },
  {
    icon: Cog,
    title: "Build & Integrate",
    desc: "Full-stack development: mobile app + smart contracts + backend.",
    duration: "~4-8 weeks",
  },
  {
    icon: Sparkles,
    title: "Launch & Scale",
    desc: "App Store deployment, smart contract audit, growth support.",
    duration: "Ongoing",
  },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const passed = Math.min(Math.max(vh - rect.top, 0), total);
      setProgress(Math.min(1, passed / total));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="dark relative overflow-hidden bg-bg-elevated py-24 text-foreground md:py-32"
    >
      {/* star field */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <StarField />
      </div>
      <div className="pointer-events-none absolute -left-32 top-1/4 h-100 w-100 rounded-full bg-amber-glow opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-100 w-100 rounded-full bg-amber-glow opacity-25 blur-3xl" />

      <div className="container relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-base">Our Process</p>
          <h2 className="mt-4 font-bold tracking-tight text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", lineHeight: 1.05 }}>
            Your App's Journey to the <span className="text-gradient">Stars.</span>
          </h2>
          <p className="mt-5 text-base text-silver-base md:text-lg">
            From first call to App Store launch — a proven 5-phase mission.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Spine (desktop: centered, mobile: left) */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-6 h-full w-0.5 -translate-x-1/2 overflow-hidden md:left-1/2 bg-white/6"
          >
            <div
              className="origin-top h-full w-full bg-linear-to-b from-amber-base via-amber-light to-silver-light"
              style={{
                transform: `scaleY(${progress})`,
                transformOrigin: "top",
                transition: "transform 100ms linear",
              }}
            />
          </div>

          <ol className="list-none space-y-10 p-0 md:space-y-16">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const right = i % 2 === 1;
              return (
                <li
                  key={s.title}
                  className="relative grid grid-cols-[3rem_1fr] gap-4 md:grid-cols-2 md:gap-0"
                >
                  {/* milestone dot */}
                  <div className="relative md:col-span-2 md:flex md:justify-center">
                    <span
                      aria-hidden="true"
                      className="absolute left-6 top-6 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                    >
                      <span
                        className="block h-3 w-3 rounded-full bg-amber-base"
                        style={{
                          boxShadow: "0 0 0 4px rgba(245,158,11,0.2), 0 0 20px rgba(245,158,11,0.6)",
                        }}
                      />
                    </span>
                  </div>

                  <div className={`relative ${right ? "md:col-start-2 md:pl-12" : "md:col-start-1 md:pr-12"} col-start-2`}
                    style={{
                      animation: `journey-in 0.7s ${i * 0.1}s ease-out both`,
                      animationFillMode: "both",
                    }}
                  >
                    <article
                      className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/3 p-7 backdrop-blur md:p-8"
                    >
                      {/* ghosted step number */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-2 -top-6 font-bold leading-none text-white/4"
                        style={{ fontSize: "8rem" }}
                      >
                        0{i + 1}
                      </span>

                      <div
                        className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-glow text-amber-base"
                        style={{ border: "1px solid rgba(245,158,11,0.25)" }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="mt-4 text-xl font-bold tracking-tight text-white md:text-2xl">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-silver-base md:text-[0.9375rem]">
                        {s.desc}
                      </p>
                      <span
                        className="mt-4 inline-block rounded-full border border-amber-border bg-amber-glow px-3 py-1 text-xs font-medium text-silver-light"
                      >
                        {s.duration}
                      </span>
                    </article>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <style>{`
        @keyframes journey-in { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { #process * { animation: none !important; transition: none !important; } }
      `}</style>
    </section>
  );
}

function StarField() {
  const dots = Array.from({ length: 80 }, (_, i) => {
    const x = ((i * 9301 + 49297) % 233280) / 2332.8;
    const y = ((i * 1597 + 51749) % 233280) / 2332.8;
    const s = 0.5 + ((i * 7) % 15) / 10;
    const o = 0.2 + ((i * 13) % 60) / 100;
    return { x, y, s, o };
  });
  return (
    <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.s * 0.08} fill="white" opacity={d.o} />
      ))}
    </svg>
  );
}
