import { ArrowRight } from "lucide-react";
import { Counter } from "./Counter";

const stats = [
  { value: 50, suffix: "+", label: "Apps Delivered" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 2, prefix: "$", suffix: "M+", label: "Revenue Generated" },
  { value: 4.9, suffix: "★", label: "Client Rating", decimals: 1 },
];

const techPills = [
  "React Native",
  "Flutter",
  "Solidity",
  "Web3.js",
  "Ethers.js",
  "Hardhat",
];

export function Dominate() {
  return (
    <section
      id="dominate"
      className="dark relative overflow-hidden border-y border-white/5 py-24 md:py-32 text-foreground"
      style={{ background: "#050B18" }}
    >
      {/* atmospheric orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl animate-orb"
        style={{ background: "rgba(37,99,235,0.35)" }} />
      <div className="pointer-events-none absolute -bottom-32 right-1/5 h-[460px] w-[460px] rounded-full opacity-30 blur-3xl animate-orb"
        style={{ background: "rgba(124,58,237,0.35)", animationDelay: "-6s" }} />
      <div className="bg-dots-light pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="container relative mx-auto max-w-7xl px-6">
        {/* Row 1 — header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#06B6D4]">
            Why Choose ClickMasters
          </p>
          <h2 className="mt-4 font-bold tracking-tight text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05 }}>
            Built to <span className="text-gradient">Dominate.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[520px] text-base text-[#94A3B8] md:text-lg">
            We don't just build apps. We build market leaders.
          </p>
        </div>

        {/* Row 2 — stat grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, idx) => (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-3xl border p-8 backdrop-blur transition-all hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.07)",
                animation: `dominate-rise 0.7s ${idx * 0.08}s ease-out both`,
              }}
            >
              <p
                className="font-bold tracking-tight"
                style={{
                  fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                  background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.15em] text-[#94A3B8]">
                {s.label}
              </p>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 bottom-0 h-[2px] rounded-full opacity-70"
                style={{ background: "linear-gradient(90deg, #2563EB, #06B6D4)" }}
              />
            </div>
          ))}
        </div>

        {/* Row 3 — proof strip */}
        <div className="mt-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#475569]">
            Trusted Technologies
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {techPills.map((t) => (
              <span
                key={t}
                className="rounded-full border px-4 py-2 text-sm font-medium transition-all hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                style={{
                  background: "rgba(37,99,235,0.1)",
                  borderColor: "rgba(37,99,235,0.3)",
                  color: "#93C5FD",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#06B6D4")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(37,99,235,0.3)")}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Row 4 — CTA banner */}
        <div
          className="mt-14 flex flex-col items-start gap-6 rounded-3xl border p-8 md:flex-row md:items-center md:justify-between md:p-10"
          style={{
            background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.15))",
            borderColor: "rgba(124,58,237,0.25)",
          }}
        >
          <div className="max-w-xl">
            <h3 className="text-2xl font-bold text-white md:text-3xl">
              Ready to dominate your market?
            </h3>
            <p className="mt-2 text-sm text-[#CBD5E1] md:text-base">
              Let's scope your blockchain app — free 30-min strategy call.
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(124,58,237,0.5)] md:w-auto"
            style={{ background: "linear-gradient(90deg, #2563EB, #7C3AED)" }}
          >
            Book Free Call
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes dominate-rise {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          #dominate * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
}
