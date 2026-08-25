import { BadgeCheck, FileCheck2, ShieldCheck, UsersRound, Workflow } from "lucide-react";

const reasons = [
  {
    icon: Workflow,
    title: "Engineering-first culture",
    text: "Our team is made up of blockchain engineers and architects, not generalist developers picking up Solidity for a single project.",
  },
  {
    icon: ShieldCheck,
    title: "Security is a process, not an add-on",
    text: "Independent-style code review and testing are part of every build, not an optional upsell at the end.",
  },
  {
    icon: FileCheck2,
    title: "Clear, fixed-price scoping",
    text: "After discovery, you get a defined scope and price - no open-ended hourly billing on core deliverables.",
  },
  {
    icon: UsersRound,
    title: "One accountable team",
    text: "You work with the same project lead from discovery through launch and post-launch support.",
  },
  {
    icon: BadgeCheck,
    title: "Built for U.S. business needs",
    text: "As a blockchain development company in the USA, we're familiar with the operational and reporting expectations U.S. clients work under.",
  },
];

export function WhyChooseAgency() {
  return (
    <section className="relative overflow-hidden bg-bg-base py-24 md:py-32">
      <div className="bg-neon-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-amber-glow blur-[120px]" />

      <div className="site-container relative px-6">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-glow/50 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-base">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
              Why Choose Clickmasters
            </div>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
              Why Choose Clickmasters as Your{" "}
              <span className="text-gradient">Blockchain Development Agency</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">
              There's no shortage of agencies claiming blockchain expertise. Here's what actually
              sets Clickmasters apart as a blockchain development agency:
            </p>
          </div>

          <div className="space-y-4">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <article
                  key={reason.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-border/40 hover:shadow-soft md:p-6"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-amber-glow opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-emerald-border/40 bg-emerald-glow text-emerald-base">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-[11px] font-semibold text-text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-lg font-semibold text-text-primary md:text-xl">
                          {reason.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {reason.text}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
