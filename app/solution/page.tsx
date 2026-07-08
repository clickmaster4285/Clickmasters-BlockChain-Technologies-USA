import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Box, Layers, Rocket } from "lucide-react";

export const metadata = {
  title: "Solution — ClickMasters",
  description: "Solutions: audited smart contracts, modular DApps, and production-ready Web3 infrastructure.",
};

export default function SolutionPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24">
        <section className="site-container px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Solution</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Production Web3 Solutions
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Turnkey blockchain products: formally-audited smart contracts, gas-optimized
            modules, and UX-focused dApps that scale. Designed for fast integration and low
            maintenance overhead.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Box,
                title: "Smart Contracts",
                desc: "Security-first contracts, formal verification, and upgradeable patterns.",
              },
              {
                icon: Layers,
                title: "Modular DApps",
                desc: "Composable frontends and backend services with audit trails and role-based access.",
              },
              {
                icon: Rocket,
                title: "Go-to-Market",
                desc: "Deployment, monitoring, and gas strategy to ship faster and save costs.",
              },
            ].map((c) => (
              <article key={c.title} className="rounded-2xl border border-border bg-surface p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-2xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                <Link
                  href="/contact"
                  className="mt-4 inline-block rounded-full bg-amber-base px-4 py-2 text-sm font-semibold text-bg-base"
                >
                  Talk to an expert
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-border bg-gradient-to-r from-surface to-bg-elevated p-8 md:p-12">
            <h2 className="text-3xl font-bold tracking-tight">Custom integrations</h2>
            <p className="mt-4 text-muted-foreground">
              Integrate wallet flows, on-chain indexing, and multisig governance with minimal
              friction. Delivered with docs, CI, and support handoff to your engineering team.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                Get a demo
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
