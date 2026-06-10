import { Smartphone, Link2, Server, Cloud, ShieldCheck } from "lucide-react";

type TechItem = { name: string; slug: string; color: string };
type Category = {
  label: string;
  icon: typeof Smartphone;
  accent: string;
  items: TechItem[];
};

const categories: Category[] = [
  {
    label: "Mobile",
    icon: Smartphone,
    accent: "#2563EB",
    items: [
      { name: "React Native", slug: "react", color: "61DAFB" },
      { name: "Flutter", slug: "flutter", color: "02569B" },
      { name: "Expo", slug: "expo", color: "FFFFFF" },
      { name: "Swift", slug: "swift", color: "F05138" },
      { name: "Kotlin", slug: "kotlin", color: "7F52FF" },
    ],
  },
  {
    label: "Blockchain",
    icon: Link2,
    accent: "#7C3AED",
    items: [
      { name: "Solidity", slug: "solidity", color: "363636" },
      { name: "Ethereum", slug: "ethereum", color: "3C3C3D" },
      { name: "Polygon", slug: "polygon", color: "7B3FE4" },
      { name: "Solana", slug: "solana", color: "9945FF" },
      { name: "Ethers.js", slug: "ethers", color: "2535A0" },
      { name: "Hardhat", slug: "hardhat", color: "FFF100" },
    ],
  },
  {
    label: "Backend",
    icon: Server,
    accent: "#06B6D4",
    items: [
      { name: "Node.js", slug: "nodedotjs", color: "5FA04E" },
      { name: "NestJS", slug: "nestjs", color: "E0234E" },
      { name: "GraphQL", slug: "graphql", color: "E10098" },
      { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
      { name: "Redis", slug: "redis", color: "FF4438" },
      { name: "IPFS", slug: "ipfs", color: "65C2CB" },
    ],
  },
  {
    label: "Cloud & DevOps",
    icon: Cloud,
    accent: "#EC4899",
    items: [
      { name: "AWS", slug: "amazonwebservices", color: "FF9900" },
      { name: "Docker", slug: "docker", color: "2496ED" },
      { name: "GitHub Actions", slug: "githubactions", color: "2088FF" },
      { name: "Firebase", slug: "firebase", color: "DD2C00" },
      { name: "Vercel", slug: "vercel", color: "FFFFFF" },
    ],
  },
];

const marqueeRow = [
  "Solidity",
  "React Native",
  "Ethereum",
  "Polygon",
  "Hardhat",
  "IPFS",
  "Node.js",
  "GraphQL",
  "AWS",
  "Docker",
  "Solana",
  "Flutter",
  "Ethers.js",
  "PostgreSQL",
  "Firebase",
];

export function TechStack() {
  return (
    <section
      id="tech-stack"
      className="dark relative overflow-hidden border-y border-white/5 py-24 md:py-32 text-foreground"
      style={{ background: "#050B18" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(37,99,235,0.06), transparent 70%)",
        }}
      />

      <div className="container relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#06B6D4]">Under the Hood</p>
          <h2 className="mt-4 font-bold tracking-tight text-white" style={{ fontSize: "clamp(2.25rem, 4vw, 3.5rem)", lineHeight: 1.05 }}>
            Battle-Tested <span className="text-gradient">Stack.</span>
          </h2>
          <p className="mt-5 text-base text-[#94A3B8] md:text-lg">
            Every tool chosen for performance, security, and scale.
          </p>
        </div>

        {/* Categories grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, ci) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.label}
                className="flex flex-col gap-4"
                style={{ animation: `tech-in 0.6s ${ci * 0.1}s ease-out both` }}
              >
                <div
                  className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2"
                  style={{
                    background: "rgba(37,99,235,0.12)",
                    borderColor: "rgba(37,99,235,0.3)",
                  }}
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: cat.accent }} />
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: "#93C5FD" }}
                  >
                    {cat.label}
                  </span>
                </div>
                <ul className="space-y-2">
                  {cat.items.map((item, ii) => (
                    <li
                      key={item.name}
                      className="group flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm transition-all hover:-translate-y-0.5"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        borderColor: "rgba(255,255,255,0.06)",
                        color: "#E2E8F0",
                        animation: `tech-in 0.4s ${ci * 0.1 + ii * 0.04}s ease-out both`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(6,182,212,0.4)";
                        e.currentTarget.style.background = "rgba(6,182,212,0.06)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                      }}
                    >
                      <span
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-lg"
                        style={{
                          background: `${cat.accent}18`,
                          border: `1px solid ${cat.accent}33`,
                        }}
                      >
                        <img
                          src={`https://cdn.simpleicons.org/${item.slug}/${item.color}`}
                          alt=""
                          loading="lazy"
                          className="h-4 w-4"
                        />
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Marquee */}
        <div className="mt-16 space-y-3" aria-hidden="true">
          <Marquee items={marqueeRow} reverse={false} />
          <Marquee items={[...marqueeRow].reverse()} reverse={true} />
        </div>

        {/* Trust line */}
        <div className="mt-12 flex items-center justify-center gap-2 text-center">
          <ShieldCheck className="h-4 w-4" style={{ color: "#06B6D4" }} />
          <p className="text-sm font-medium text-[#64748B]">
            All blockchain code undergoes third-party security audits before deployment.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes tech-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { #tech-stack * { animation: none !important; transition: none !important; } }
      `}</style>
    </section>
  );
}

function Marquee({ items, reverse }: { items: string[]; reverse: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="group relative overflow-hidden"
      style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}
    >
      <div
        className={`flex w-max gap-8 whitespace-nowrap ${reverse ? "animate-marquee-right" : "animate-marquee-left"}`}
        style={{
          animationDuration: "40s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
      >
        {doubled.map((t, i) => (
          <span
            key={i}
            className="text-xs font-semibold uppercase tracking-[0.1em] text-[#334155]"
          >
            {t} <span className="ml-8 text-[#1E293B]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
