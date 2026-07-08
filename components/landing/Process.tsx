"use client";

import { useEffect, useRef, useState } from "react";
import { Rocket, Map, Wand2, Cog, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Rocket,
    title: "S - Scope & Discovery",
    desc: "We learn your market, user base, and regulatory constraints. Deliverable: Discovery Document with technical scope and cost estimate.",
    duration: "~1 week",
  },
  {
    icon: Map,
    title: "P - Plan & Architecture",
    desc: "We map the tech stack, chain selection rationale, data flow diagrams, and UX wireframes. Deliverable: Architecture Decision Record (ADR).",
    duration: "~2 weeks",
  },
  {
    icon: Wand2,
    title: "E - Engineer & Prototype",
    desc: "High-fidelity Figma prototypes, smart contract stubs, and API schemas. Deliverable: Interactive prototype + contract interface specs.",
    duration: "~2 weeks",
  },
  {
    icon: Cog,
    title: "C - Code & Integrate",
    desc: "Full-stack development: mobile app + smart contracts + backend. Weekly demo builds. Deliverable: Staging environment with CI/CD.",
    duration: "~4-8 weeks",
  },
  {
    icon: Sparkles,
    title: "BUILD-HARDEN - Audit & Launch",
    desc: "Third-party security audit, formal verification, App Store deployment, post-launch monitoring. Deliverable: Audited contracts + production deployment.",
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
      className="relative overflow-hidden bg-bg-elevated py-24 md:py-32"
    >
      {/* Star field */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <StarField />
      </div>
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[26rem] w-[26rem] rounded-full bg-amber-glow blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[26rem] w-[26rem] rounded-full bg-amber-glow blur-[100px]" />

      <div className="site-container relative px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-glow/50 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-base">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
            Our Process
          </div>
          <h2 className="mt-5 font-bold tracking-tight text-text-primary" style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", lineHeight: 1.05 }}>
            Your App's Journey to the <span className="text-gradient">Stars</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
            From discovery to mainnet - our SPEC-BUILD-HARDEN methodology across 5 phases.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Spine */}
          <div
            aria-hidden="true"
            className="absolute left-6 top-0 h-full w-0.5 -translate-x-1/2 overflow-hidden bg-border md:left-1/2"
          >
            <div
              className="h-full w-full origin-top bg-linear-to-b from-amber-base via-amber-light to-silver-light"
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
                  {/* Milestone dot */}
                  <div className="relative md:col-span-2 md:flex md:justify-center">
                    <span
                      aria-hidden="true"
                      className="absolute left-6 top-6 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
                    >
                      <span className="block h-3 w-3 rounded-full bg-amber-base shadow-[0_0_0_4px_rgba(217,119,6,0.25),0_0_20px_rgba(217,119,6,0.35)]" />
                    </span>
                  </div>

                  <div
                    className={`relative col-start-2 ${right ? "md:col-start-2 md:pl-12" : "md:col-start-1 md:pr-12"}`}
                    style={{
                      animation: `journey-in 0.7s ${i * 0.1}s ease-out both`,
                    }}
                  >
                    <article className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-soft md:p-8">
                      {/* Ghosted step number */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-2 -top-6 font-bold leading-none text-silver-dim/50"
                        style={{ fontSize: "8rem" }}
                      >
                        0{i + 1}
                      </span>

                      <div className="grid h-12 w-12 place-items-center rounded-xl border border-amber-border bg-amber-glow text-amber-base">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="mt-4 text-xl font-bold tracking-tight text-text-primary md:text-2xl">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary md:text-[0.9375rem]">
                        {s.desc}
                      </p>
                      <span className="mt-4 inline-block rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs font-medium text-text-muted">
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
        <circle key={i} cx={d.x} cy={d.y} r={d.s * 0.08} fill="#64748B" opacity={d.o * 0.6} />
      ))}
    </svg>
  );
}
