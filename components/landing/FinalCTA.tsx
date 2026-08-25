"use client";

import { ArrowRight } from "lucide-react";
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

      <div className="site-container relative px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          Start Your Blockchain Project
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg" style={{ color: "rgba(255,255,255,0.8)" }}>
          Tell us about your product, protocol, or platform idea. Our team will respond with
          a scoped plan and honest read on timeline and cost — no pressure, no jargon.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-amber-dim shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]"
          >
            Book a Free Strategy Call
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
