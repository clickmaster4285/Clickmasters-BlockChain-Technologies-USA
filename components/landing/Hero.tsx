"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { BlockchainNetwork } from "./BlockchainNetwork";
import { HeroBlockchainVisual } from "./HeroBlockchainVisual";

const heroBgPng = "/media/hero-bg.png";
const walletMock = "/media/wallet-mock.jpeg";

const ROTATING = ["DeFi protocols", "NFT marketplaces", "DAOs", "Crypto wallets", "L2 chains"];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-bg-base pt-28 pb-16 md:pt-36 md:pb-24">
      {/* ── Layer 1: Background textures ── */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30 mask-[radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-40" />

      {/* ── Layer 2: Atmospheric orbs ── */}
      <div className="pointer-events-none absolute -top-48 left-1/4 h-[40rem] w-[40rem] animate-orb rounded-full bg-amber-glow blur-[120px]" />
      <div
        className="pointer-events-none absolute -bottom-48 right-1/4 h-[35rem] w-[35rem] animate-orb rounded-full bg-emerald-glow blur-[100px]"
        style={{ animationDelay: "-7s", animationDirection: "reverse" }}
      />

      {/* ── Layer 3: Hero beam (diagonal accent light) ── */}
      <div className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] origin-top-right rotate-12 bg-linear-to-l from-primary/[0.04] to-transparent blur-3xl" />

      <div className="container relative mx-auto max-w-[85vw] px-6">
        <div className="grid items-center gap-14 md:grid-cols-[1.3fr_1fr] lg:gap-20">
          {/* ══════════════ LEFT: Content ══════════════ */}
          <div>
            {/* Premium badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-border/60 bg-emerald-glow/50 px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-emerald-base">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-base opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-base" />
              </span>
              NDA before the first call
            </div>

            {/* Headline */}
            <h1 className="mt-7 text-5xl font-bold leading-[1.06] tracking-tight text-text-primary md:text-6xl lg:text-7xl">
              <span className="block">1,000+ Blockchain</span>
              <span className="block text-gradient">Projects Since 2014</span>
            </h1>

            {/* Subtext with rotating badge */}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
              We engineer SEC-grade smart contracts, production DApps and Web3 infrastructure for{" "}
              <span
                key={i}
                className="inline-flex animate-fade-in items-center rounded-full bg-amber-glow/70 px-2.5 py-0.5 font-semibold text-amber-base"
              >
                {ROTATING[i]}
              </span>
              . Enterprise security, zero jargon.
            </p>

            {/* CTA — Button-in-button architecture */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex h-12 items-center gap-3 rounded-full bg-primary pl-6 pr-1.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(217,119,6,0.35)] active:scale-[0.98]"
              >
                <span>Book a Strategy Call</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-light/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-105">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                href="/service"
                className="group inline-flex h-12 items-center gap-2 rounded-full border border-border bg-surface px-6 text-sm font-medium text-text-secondary transition-all duration-300 hover:border-amber-border/50 hover:text-text-primary active:scale-[0.98]"
              >
                View Services
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Trust metrics */}
            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
              {[
                { icon: Star, value: "4.9", label: "Clutch Rating", color: "text-amber-base" },
                { icon: ShieldCheck, value: "50+", label: "Smart Contracts", color: "text-emerald-base" },
                { icon: TrendingUp, value: "$100M+", label: "On-Chain Value", color: "text-amber-base" },
                { value: "1,000+", label: "Projects Live", color: "text-amber-base", noIcon: true },
              ].map((m) => (
                <div
                  key={m.label}
                  className="flex items-center gap-3 bg-bg-base p-4 transition-colors hover:bg-surface"
                >
                  {m.icon && !m.noIcon ? (
                    <m.icon className={`h-5 w-5 shrink-0 ${m.color}`} />
                  ) : (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-glow">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
                    </span>
                  )}
                  <div>
                    <p className={`text-lg font-bold leading-none tracking-tight text-text-primary ${m.color}`}>
                      {m.value}
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-text-muted">
                      {m.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════ RIGHT: Web3 Command Center ══════════════ */}
          <div className="relative">
            {/* Outer shell (double-bezel) */}
            <div className="rounded-2xl bg-bg-elevated p-1.5 shadow-soft ring-1 ring-black/[0.03]">
              {/* Inner core */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[calc(1rem-0.375rem)] bg-linear-to-br from-amber-glow via-bg-surface to-bg-elevated md:aspect-[4/5]">
                {/* Background photo */}
                <Image
                  src={heroBgPng}
                  alt=""
                  fill
                  className="object-cover opacity-80"
                  sizes="(max-width: 768px) 85vw, 40vw"
                />

                {/* Animated blockchain network */}
                <BlockchainNetwork className="absolute inset-0 h-full w-full opacity-35" />

                {/* Gradient veil */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-bg-surface/60 via-transparent to-transparent" />

                <HeroBlockchainVisual />

                {/* Floating wallet mockup */}
                <div className="pointer-events-none absolute right-5 top-22 z-20 h-28 w-22 md:h-32 md:w-26">
                  <Image
                    src={walletMock}
                    alt=""
                    fill
                    className="rounded-lg object-cover shadow-soft ring-1 ring-black/[0.06]"
                    sizes="120px"
                  />
                </div>

                {/* Dashboard content */}
                <div className="pointer-events-none absolute inset-0 z-20 flex flex-col p-5">
                  {/* Top bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-base opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-base" />
                      </span>
                      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-emerald-base">
                        Live mainnet
                      </span>
                    </div>
                    <div className="rounded-md border border-amber-border/40 bg-amber-glow/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-amber-base">
                      Secured
                    </div>
                  </div>

                  {/* Center: Hero metric */}
                  <div className="mt-auto mb-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary-foreground">
                      Total Value Locked
                    </p>
                    <p className="mt-1 text-3xl font-bold tracking-tight text-gradient md:text-4xl">
                      $104.2M
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-light px-2 py-1 font-mono text-xs font-medium text-primary-foreground">
                        <TrendingUp className="h-3 w-3" />
                        +12.4% this quarter
                      </span>
                      <span className="font-mono text-[10px] text-primary-foreground">
                        audited by CertiK
                      </span>
                    </div>
                  </div>

                  {/* Bottom: Mini metrics grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Avg Gas", value: "18 gwei", change: "-12%", up: false },
                      { label: "Block Height", value: "19.4M", change: "+2.1K", up: true },
                      { label: "Active Wallets", value: "847K", change: "+8.3%", up: true },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg border border-border bg-bg-surface/70 p-2.5 backdrop-blur"
                      >
                        <p className="font-mono text-sm uppercase tracking-[0.15em] text-text-primary">
                          {m.label}
                        </p>
                        <p className="mt-0.5 text-sm font-bold tracking-tight text-text-primary">
                          {m.value}
                        </p>
                        <span
                          className={`font-mono text-[9px] font-medium ${
                            m.up ? "text-emerald-base" : "text-amber-base"
                          }`}
                        >
                          {m.change}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtle edge highlight */}
                <div className="pointer-events-none absolute inset-0 rounded-[calc(1rem-0.375rem)] ring-1 ring-white/[0.04] ring-inset" />
              </div>
            </div>

            {/* Decorative terminal tag */}
            <div className="mt-3 flex items-center justify-between px-1 font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
              <span>node://mainnet.ethereum</span>
              <span>block #19,482,113</span>
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="pointer-events-none mx-auto mt-16 flex w-20 items-center gap-2 md:mt-20">
          <span className="h-px flex-1 bg-linear-to-r from-transparent to-border" />
          <span className="h-1.5 w-1.5 rotate-45 border border-border" />
          <span className="h-px flex-1 bg-linear-to-l from-transparent to-border" />
        </div>
      </div>
    </section>
  );
}
