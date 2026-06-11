"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from 'next/image';
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";

type Slide = { title: string; blurb: string; image?: string };

export default function CaseStudyCarousel({ slides }: { slides: Slide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const reduce = useReducedMotion();
  const autoplayDelay = 4000;
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const pausedRef = useRef(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
    // reset progress
    startRef.current = performance.now();
    setProgress(0);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  // autoplay using RAF for smooth progress and pause on hover
  useEffect(() => {
    if (!emblaApi || reduce) return;

    const loop = (now: number) => {
      if (pausedRef.current) {
        startRef.current = now;
        rafRef.current = requestAnimationFrame(loop);
        return;
      }
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const pct = Math.min(1, elapsed / autoplayDelay);
      setProgress(pct);
      if (pct >= 1) {
        emblaApi.scrollNext();
        startRef.current = now;
        setProgress(0);
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = null;
    };
  }, [emblaApi, reduce]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="embla" onMouseEnter={() => (pausedRef.current = true)} onMouseLeave={() => (pausedRef.current = false)}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((s, i) => (
            <div key={i} className="embla__slide">
              <article className="rounded-2xl border border-border bg-surface p-6">
                {s.image && (
                  <div className="rounded-md overflow-hidden">
                    <Image src={s.image} alt={s.title} width={800} height={420} className="w-full h-auto object-cover" />
                  </div>
                )}
                <h4 className="font-semibold mt-3">{s.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{s.blurb}</p>
                <div className="mt-4">
                  <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Talk to us</Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 w-8 rounded-full ${i === selected ? "bg-amber-base" : "bg-surface/40"}`}
          />
        ))}
      </div>

      {/* progress bar for current slide */}
      <div className="mt-2 h-1 w-full bg-surface/30 rounded-full overflow-hidden">
        <div className="h-1 bg-amber-base transition-all" style={{ width: `${progress * 100}%` }} />
      </div>

      <style jsx>{`
        .embla { overflow: hidden }
        .embla__viewport { overflow: hidden; width: 100% }
        .embla__container { display: flex; gap: 16px }
        .embla__slide { min-width: 320px; flex: 0 0 auto }
        @media (min-width: 768px) { .embla__slide { min-width: 420px } }
      `}</style>
    </div>
  );
}
