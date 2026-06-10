"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { BlockchainNetwork } from "./BlockchainNetwork";
import { VideoWithFallback } from "@/components/media/VideoWithFallback";
import Image from "next/image";
const heroVideo = "/media/hero-bg.mp4";
const heroSide = "/media/cta-bg.png";

const ROTATING = ["DeFi protocols", "NFT marketplaces", "DAOs", "Crypto wallets", "L2 chains"];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <section
      id="top"
      className="dark relative overflow-hidden bg-bg-base pt-32 pb-20 text-foreground md:pt-40 md:pb-28"
    >
      <VideoWithFallback
        src={heroVideo}
        fallbackImage={heroSide}
        className="absolute inset-0 h-full w-full"
        opacityClassName="opacity-70 max-md:opacity-40"
        ariaLabel="Animated blockchain grid background"
      />
      {/* Readability scrim — stronger on mobile */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-bg-base/80 via-bg-base/70 to-bg-base md:from-bg-base/70 md:via-bg-base/60" />
      <div className="bg-neon-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)] hidden md:block" />
      <div className="pointer-events-none absolute -top-32 left-1/4 h-[420px] w-[420px] animate-orb rounded-full bg-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-10 h-[380px] w-[380px] animate-orb rounded-full bg-secondary/25 blur-3xl" style={{ animationDelay: "-6s" }} />
      <div className="container mx-auto grid max-w-[85vw] gap-12 px-6 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-white/70 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            Securing $100M+ on-chain value
          </div>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl">
            Building the <span className="text-gradient">Decentralized</span> Future — One Block at a Time
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/70 md:text-xl">
            We engineer secure smart contracts, scalable DApps and Web3 infrastructure for{" "}
            <span key={i} className="inline-block animate-fade-in font-semibold text-amber-base">
              {ROTATING[i]}
            </span>
            .
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Launch Your DApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              Audit Smart Contract
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-base fill-amber-base" />
              <span><span className="font-semibold text-white">4.9</span> on Clutch</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" />
              <span><span className="font-semibold text-white">50+</span> Smart Contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-amber-light" />
              <span><span className="font-semibold text-white">$100M+</span> Secured</span>
            </div>
          </div>
        </div>
        <div className="relative">
          {/* Layered cinematic right-panel composition */}
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-bg-elevated shadow-soft md:min-h-[560px]">
            {/* Layer 0: blockchain grid video (atmosphere) */}
            <VideoWithFallback
              src={heroVideo}
              fallbackImage={heroSide}
              preload="metadata"
              className="absolute inset-0 h-full w-full hidden md:block"
              opacityClassName="opacity-35"
              ariaLabel=""
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 h-full w-full hidden md:block"
              style={{ filter: "hue-rotate(10deg) saturate(1.2)", mixBlendMode: "normal" }}
            />

            {/* Layer 1: cta-bg.png lit by the video underneath via screen blend */}
            <Image
              src={heroSide}
              alt="ClickMasters blockchain DApp visual"
              fill
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="object-cover md:object-contain"
              style={{ objectPosition: "center right", opacity: 0.92, mixBlendMode: "screen" }}
            />

            {/* Layer 2: pulsing radial glow for depth */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-glow animate-float-slow"
            />

            {/* Layer 3: left-edge fade into the text column (desktop only) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/5 bg-linear-to-r from-bg-elevated to-transparent md:block"
            />

            {/* Layer 4: bottom fade */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-bg-elevated to-transparent"
            />

            {/* Mobile readability scrim */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-bg-elevated/50 md:hidden"
            />

            <BlockchainNetwork className="absolute inset-0 h-full w-full mix-blend-screen opacity-40" />

            <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-[10px] uppercase tracking-widest text-white/80">
              <span>node://mainnet</span>
              <span>block #19,482,113</span>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft backdrop-blur md:block">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">Gas avg</p>
            <p className="mt-1 text-lg font-bold text-white">18 gwei <span className="text-xs font-medium text-success">↓ 12%</span></p>
          </div>
          <div className="absolute -top-6 -right-6 hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft backdrop-blur md:block">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/60">TVL secured</p>
            <p className="mt-1 text-lg font-bold text-gradient">$104.2M</p>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40">
        <div className="flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-widest">
          <span>Scroll</span>
          <span className="h-8 w-px animate-pulse bg-white/40" />
        </div>
      </div>
    </section>
  );
}
