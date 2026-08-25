import {
  Clock3,
  CircleDollarSign,
  GitBranch,
  LifeBuoy,
  Scale,
  ShieldCheck,
} from "lucide-react";

const benefits = [
  {
    icon: Clock3,
    title: "Faster time to production",
    text: "A team that builds blockchain applications every day moves through architecture, development, and testing faster than a generalist team learning as they go.",
  },
  {
    icon: ShieldCheck,
    title: "Security built in from day one",
    text: "Every smart contract and integration is reviewed against known vulnerability patterns before launch, reducing the risk of costly exploits after launch.",
  },
  {
    icon: CircleDollarSign,
    title: "Lower long-term cost",
    text: "Getting the architecture right early avoids expensive rewrites later - our blockchain development solutions are built to scale with your product, not against it.",
  },
  {
    icon: GitBranch,
    title: "Multi-chain flexibility",
    text: "Whether your users are on Ethereum, Polygon, Solana, or another network, our blockchain technology services are built with portability in mind.",
  },
  {
    icon: Scale,
    title: "Compliance-aware engineering",
    text: "For regulated industries, we design blockchain solutions with audit trails, data handling, and access control that align with your legal requirements.",
  },
  {
    icon: LifeBuoy,
    title: "Support after launch",
    text: "Blockchain products need monitoring and maintenance like any other software. We stay involved after launch, not just through opening day.",
  },
];

export function Benefits() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-bg-elevated py-24 md:py-32">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -left-32 top-16 h-[28rem] w-[28rem] animate-orb rounded-full bg-amber-glow blur-[110px]" />
      <div
        className="pointer-events-none absolute -right-32 bottom-16 h-[28rem] w-[28rem] animate-orb rounded-full bg-emerald-glow blur-[110px]"
        style={{ animationDelay: "-6s" }}
      />

      <div className="site-container relative px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-glow/50 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-base">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
            Client Benefits
          </div>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
            Benefits of Working With a Dedicated{" "}
            <span className="text-gradient">Blockchain Development Company</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            Partnering with a specialized blockchain development company changes what's
            possible for your project. Here's what clients consistently get from working
            with Clickmasters:
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <article
                key={benefit.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-border/40 hover:shadow-soft"
              >
                <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-amber-glow opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-amber-border/40 bg-amber-glow text-amber-base">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-xs font-semibold text-text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-text-primary">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {benefit.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
