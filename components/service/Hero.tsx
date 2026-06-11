"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { Service } from "@/data/services";

export default function Hero({ service }: { service: Service }) {
  const reduce = useReducedMotion();
  const waveFast = reduce ? "" : "animate-wave-fast";
  const waveMid = reduce ? "" : "animate-wave";
  const waveSlow = reduce ? "" : "animate-wave-slow";

  return (
    <motion.header
      initial={reduce ? {} : { opacity: 0, y: 8 }}
      animate={reduce ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="rounded-3xl overflow-hidden p-8 shadow-glow bg-gradient-to-r from-surface/80 via-bg-base to-amber-base/60"
    >
      <div className="md:flex md:items-center md:justify-between gap-8">
        <div className="md:w-1/2">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{service.hero.eyebrow}</p>
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">{service.hero.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">{service.hero.blurb}</p>

          <div className="mt-6 flex flex-wrap gap-3 items-center">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-amber-base px-6 py-3 text-sm font-semibold text-bg-base shadow-md">Get a quote</Link>
            {service.caseStudy ? (
              <a href="#case-studies" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm">See case study</a>
            ) : (
              <Link href="/service" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm">Browse services</Link>
            )}
          </div>

          <div className="mt-6 flex gap-4 text-sm text-muted-foreground" aria-hidden>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">50+</span>
              <span className="text-xs">Contracts shipped</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">$100M+</span>
              <span className="text-xs">Secured on-chain</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">Enterprise</span>
              <span className="text-xs">Ready</span>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center md:justify-end items-center">
          <div className="w-full max-w-lg">
            <svg viewBox="0 0 900 420" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="var(--amber-base)" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="var(--surface)" stopOpacity="0.04" />
                </linearGradient>
              </defs>

              <g className={waveSlow}>
                <path d="M0 160 C 150 80, 300 240, 450 160 C 600 80, 750 240, 900 160 L900 420 L0 420 Z" fill="url(#g1)" />
              </g>

              <g className={waveMid}>
                <path d="M0 140 C 120 60, 240 200, 360 140 C 480 80, 600 200, 720 140 C 840 80, 900 140, 900 140 L900 420 L0 420 Z" fill="var(--amber-base)" opacity="0.12" />
              </g>

              <g className={waveFast}>
                <path d="M0 120 C 100 40, 200 160, 300 120 C 400 80, 500 160, 600 120 C 700 80, 800 160, 900 120 L900 420 L0 420 Z" fill="var(--amber-base)" opacity="0.08" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
