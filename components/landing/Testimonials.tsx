import { Star } from "lucide-react";
import Image from "next/image";
const testimonialsBg = "/media/testimonials-bg.jpg";

const testimonials = [
  {
    quote: "They audited our DeFi protocol and found zero critical issues post-deploy. Best security team we've worked with in Web3.",
    name: "Marcus Chen",
    role: "Founder, Aurora Finance",
    initials: "MC",
    gradient: "linear-gradient(135deg, #F59E0B, #FCD34D)",
    category: "DeFi Protocol",
  },
  {
    quote: "Shipped our NFT marketplace in 12 weeks with cross-chain support. 10K+ daily users in the first month.",
    name: "Lina Park",
    role: "Product Lead, Stratos",
    initials: "LP",
    gradient: "linear-gradient(135deg, #94A3B8, #F59E0B)",
    category: "NFT Marketplace",
  },
  {
    quote: "Engineering quality is enterprise-grade. Our smart contracts have been processing $80M+ for 18 months with zero downtime.",
    name: "Jonas Weber",
    role: "CTO, Quorum DAO",
    initials: "JW",
    gradient: "linear-gradient(135deg, #FCD34D, #CBD5E1)",
    category: "DAO Infrastructure",
  },
];

export function Testimonials() {
  return (
    <section className="dark relative overflow-hidden bg-bg-surface py-24 text-foreground md:py-32">
      <Image src={testimonialsBg} alt="" aria-hidden="true" fill className="pointer-events-none object-cover opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-bg-surface/90 via-bg-surface/80 to-bg-surface/95" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-105 w-105 animate-orb rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-105 w-105 animate-orb rounded-full bg-secondary/25 blur-3xl" style={{ animationDelay: "-5s" }} />
      <div className="pointer-events-none absolute left-10 top-10 font-display text-[220px] leading-none text-white/4">"</div>
      <div className="container relative mx-auto max-w-[85vw] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">Testimonials</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Founders and protocols trust us with <span className="text-gradient">mission-critical</span> infra
          </h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex flex-col rounded-2xl border border-white/10 bg-white/4 p-7 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/60">
              <span className="inline-flex w-fit items-center rounded-full border border-amber-border bg-amber-glow px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-amber-base">
                {t.category}
              </span>
              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-base text-amber-base" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-white/85">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold text-white shadow-lg"
                  style={{ background: t.gradient }}
                  aria-hidden="true"
                >
                  {t.initials}
                </span>
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-white/60">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
