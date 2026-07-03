"use client";

import { ArrowRight, Mail, Phone, MessageCircle } from "lucide-react";
import { VideoWithFallback } from "@/components/media/VideoWithFallback";

const ctaVideo = "/media/cta.mp4";
const ctaPoster = "/media/cta-bg.png";

export function FinalCTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-linear-to-br from-amber-dim via-amber-base to-amber-light py-24 md:py-32">
      {/* Background video */}
      <VideoWithFallback
        src={ctaVideo}
        fallbackImage={ctaPoster}
        preload="none"
        lazy
        className="absolute inset-0 h-full w-full"
        opacityClassName="opacity-30"
        ariaLabel="Animated background"
      />
      {/* Gradient overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-amber-dim/50 via-amber-base/40 to-amber-light/50" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-15" />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute bottom-0 h-2 w-2 animate-rise rounded-full bg-white/30"
            style={{
              left: `${(i * 53) % 100}%`,
              animationDuration: `${8 + (i % 5) * 2}s`,
              animationDelay: `${(i % 7) * -1.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto max-w-[85vw] px-6 text-center">
        <p className="font-display text-3xl italic tracking-tight md:text-4xl" style={{ color: "rgba(255,255,255,0.8)" }}>
          build the future on-chain
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          Start Your Blockchain Project
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: "rgba(255,255,255,0.8)" }}>
          Tell us about your protocol, product or DAO. Our engineers will reply within 24 hours with a scoped plan.
        </p>
        <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
          Mutual NDA signed before the first call. Fixed-price quotes after discovery.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:sale@clickmastersblockchaindevelopmentcompany.com"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-amber-dim shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]"
          >
            <Mail className="h-4 w-4" /> Email us
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="tel:+13252024074"
            className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            style={{
              borderColor: "rgba(255,255,255,0.3)",
              background: "rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)" }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)" }}
          >
            <Phone className="h-4 w-4" /> +1 325 202 4074
          </a>
          <a
            href="https://wa.me/13252024074"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
