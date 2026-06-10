import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ShieldCheck, Sparkles, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ClickMasters — Blockchain & Web3 Agency" },
      { name: "description", content: "Founded in 2021, ClickMasters has shipped 50+ Web3 projects and secured $100M+ on-chain. Meet the team behind decentralized infrastructure." },
      { property: "og:title", content: "About ClickMasters — Blockchain & Web3 Agency" },
      { property: "og:description", content: "50+ Web3 projects, $100M+ secured on-chain. Our mission: secure, scalable, decentralized infrastructure." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24">
        <section className="container mx-auto max-w-5xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ About</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
            About <span className="text-gradient">ClickMasters Web3</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Founded in 2021, ClickMasters is a blockchain and Web3 development agency engineering
            secure smart contracts, scalable DApps, and decentralized infrastructure for protocols,
            DAOs and enterprises worldwide.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { icon: Sparkles, k: "50+", v: "Smart Contracts" },
              { icon: ShieldCheck, k: "$100M+", v: "Secured on-chain" },
              { icon: Users, k: "4.9★", v: "Client Rating" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border border-border bg-surface p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
                <p className="mt-5 text-3xl font-bold">{s.k}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-3xl border border-border bg-surface p-8 md:p-12">
            <h2 className="text-3xl font-bold tracking-tight">Our mission</h2>
            <p className="mt-4 text-muted-foreground">
              Build secure, scalable, decentralized infrastructure that founders trust with
              mission-critical capital. We blend formal verification, gas-level optimization,
              and senior engineering judgment to ship contracts that hold up in production.
            </p>
          </div>

          <div className="mt-10">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Work with us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
