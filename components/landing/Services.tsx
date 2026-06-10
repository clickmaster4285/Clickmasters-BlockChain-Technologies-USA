"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { blockchainServices } from "@/data/blockchain-services";
import Image from "next/image";
const servicesBg = "/media/services-bg.jpeg";

const accentMap = {
  primary: "text-primary bg-primary/10",
  secondary: "text-secondary bg-secondary/10",
  tertiary: "text-tertiary bg-tertiary/10",
  success: "text-success bg-success/10",
} as const;

export function Services() {
  function onTilt(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateY(-4px)`;
  }
  function onLeave(e: React.MouseEvent<HTMLElement>) {
    e.currentTarget.style.transform = "";
  }
  return (
    <section id="services" className="dark relative overflow-hidden bg-bg-elevated py-24 text-foreground md:py-32">
      <Image src={servicesBg} alt="" aria-hidden="true" fill className="pointer-events-none object-cover opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-bg-elevated/80 via-bg-elevated/70 to-bg-elevated/90" />
      <div className="bg-hex pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 animate-orb rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 animate-orb rounded-full bg-secondary/20 blur-3xl" style={{ animationDelay: "-7s" }} />
      <div className="container relative mx-auto max-w-[85vw] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">Services</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Full-spectrum <span className="text-gradient">blockchain engineering</span>
          </h2>
          <p className="mt-4 text-lg text-white/65">
            From protocol design to mainnet launch — we build the decentralized infrastructure powering the next financial internet.
          </p>
        </div>
        <div id="solutions" className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blockchainServices.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.slug}
                onMouseMove={onTilt}
                onMouseLeave={onLeave}
                className="tilt-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-all duration-300 hover:border-primary/60 hover:shadow-glow"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/25 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${accentMap[s.accent]}`}>
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-white/65">{s.fullDescription}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono text-[11px] text-white/70">
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-amber-base opacity-0 transition-opacity group-hover:opacity-100"
                >
                  Discuss project <ArrowUpRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
