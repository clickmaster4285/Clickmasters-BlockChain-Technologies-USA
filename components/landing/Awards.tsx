const awards = [
  {
    title: "Top Blockchain Dev Company",
    body: "Clutch",
    year: "2024",
    icon: "🏆",
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.18), rgba(245,158,11,0.18))",
    border: "rgba(249,115,22,0.35)",
    accent: "#F59E0B",
  },
  {
    title: "Best DeFi Implementation",
    body: "Web3 Awards",
    year: "2024",
    icon: "⛓️",
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(6,182,212,0.18))",
    border: "rgba(59,130,246,0.35)",
    accent: "#06B6D4",
  },
  {
    title: "Most Secure Smart Contract",
    body: "Audit League",
    year: "2023",
    icon: "🛡️",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.18), rgba(20,184,166,0.18))",
    border: "rgba(16,185,129,0.35)",
    accent: "#10B981",
  },
  {
    title: "Rising Web3 Studio",
    body: "ProductHunt",
    year: "2023",
    icon: "🚀",
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.18), rgba(168,85,247,0.18))",
    border: "rgba(139,92,246,0.35)",
    accent: "#A855F7",
  },
];

export function Awards() {
  return (
    <section className="dark relative overflow-hidden py-24 text-foreground" style={{ background: "#0D1117" }}>
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 animate-sparkle rounded-full bg-white"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${(i % 6) * 0.4}s`,
            }}
          />
        ))}
      </div>
      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#00E5FF]">/ Recognition</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Awarded by the people who set the bar
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {awards.map((a) => (
            <div
              key={a.title}
              className="group relative overflow-hidden rounded-2xl border p-6 backdrop-blur transition-all hover:-translate-y-1"
              style={{ background: a.gradient, borderColor: a.border }}
            >
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-2xl backdrop-blur">
                  {a.icon}
                </span>
                <span
                  className="rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider"
                  style={{ borderColor: a.border, color: a.accent }}
                >
                  {a.year}
                </span>
              </div>
              <h3 className="mt-5 text-base font-bold leading-tight text-white">
                {a.title}
              </h3>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-white/60">
                by {a.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
