import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { createMetadata } from "@/config/metadata";
import { services } from "@/data/services";
import ServiceCard from "@/components/service/ServiceCard";
import CaseStudyCarousel from '@/components/service/CaseStudyCarousel';
import { Process } from '@/components/landing/Process';
import BackToTop from '@/components/ui/BackToTop';

export const metadata = createMetadata({
  title: "Blockchain Development Services",
  description:
    "End-to-end blockchain engineering and product teams that ship secure, performant systems: smart contracts, indexers, wallets, and Web3 UX.",
  path: "/service",
});

export default function ServicesIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24 bg-background relative overflow-hidden">
        {/* Decorative SVG waves */}
        <svg className="pointer-events-none absolute -left-24 -top-16 opacity-60 animate-wave" width="720" height="360" viewBox="0 0 720 360" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M0 120 C 120 60, 240 180, 360 120 C 480 60, 600 180, 720 120 L720 360 L0 360 Z" fill="var(--amber-base)" opacity="0.12" />
        </svg>
        <svg className="pointer-events-none absolute right-0 top-36 opacity-45 animate-blob" width="420" height="220" viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M0 80 C 80 0, 160 160, 240 80 C 320 0, 400 160, 420 80 L420 220 L0 220 Z" fill="var(--amber-base)" opacity="0.08" />
        </svg>
        <section className="site-container px-6">
          {/* Hero */}
          <div className="rounded-3xl overflow-hidden p-8 shadow-glow bg-gradient-to-r from-surface/80 via-bg-base to-amber-base/60">
            <div className="md:flex md:items-center md:justify-between gap-8">
              <div className="md:w-1/2">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Services</p>
                <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">What we build — production-ready Web3 systems</h1>
                <p className="mt-4 text-lg text-silver-base max-w-xl">End-to-end blockchain engineering and product teams that ship secure, performant systems—smart contracts, indexers, and wallet UX designed for real users and real scale.</p>
                <div className="mt-6 flex flex-wrap gap-3 items-center">
                  <a href="/contact" className="inline-flex items-center gap-2 rounded-full bg-amber-base px-6 py-3 text-sm font-semibold text-bg-base shadow-md">Request a consult</a>
                  <a href="#services" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm">Browse services</a>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-6 text-sm">
                  <div className="flex flex-col items-center text-center p-4 rounded-2xl border border-border bg-surface/50">
                    <span className="text-3xl font-bold text-amber-base font-display">50+</span>
                    <span className="mt-1 text-xs text-silver-base">Contracts shipped</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-2xl border border-border bg-surface/50">
                    <span className="text-3xl font-bold text-amber-base font-display">$100M+</span>
                    <span className="mt-1 text-xs text-silver-base">Secured on-chain</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 rounded-2xl border border-border bg-surface/50">
                    <span className="text-3xl font-bold text-amber-base font-display">Enterprise</span>
                    <span className="mt-1 text-xs text-silver-base">Ready</span>
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
                    <g className="animate-wave-slow">
                      <path d="M0 160 C 150 80, 300 240, 450 160 C 600 80, 750 240, 900 160 L900 420 L0 420 Z" fill="url(#g1)" />
                    </g>
                    <g className="animate-wave">
                      <path d="M0 140 C 120 60, 240 200, 360 140 C 480 80, 600 200, 720 140 C 840 80, 900 140, 900 140 L900 420 L0 420 Z" fill="var(--amber-base)" opacity="0.12" />
                    </g>
                    <g className="animate-wave-fast">
                      <path d="M0 120 C 100 40, 200 160, 300 120 C 400 80, 500 160, 600 120 C 700 80, 800 160, 900 120 L900 420 L0 420 Z" fill="var(--amber-base)" opacity="0.08" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Service Cards */}
          <div id="services" className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>

          {/* Process Section */}
          <div className="mt-20">
            <Process />
          </div>

          {/* Case Studies - full width */}
          <section className="mt-20">
            <div className="text-center mb-8">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">Case Studies</p>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">Recent work</h2>
            </div>
            {/* @ts-ignore */}
            <CaseStudyCarousel slides={services.map(s => ({ title: s.title, blurb: s.short, image: s.caseStudy?.image }))} />
          </section>

          {/* Why Us */}
          <section className="mt-20 grid md:grid-cols-3 gap-6">
            {[
              { title: "Senior engineers", desc: "Every engineer on your project has 5+ years of production blockchain experience. No juniors, no hand-holding." },
              { title: "Security-first", desc: "Threat modeling, formal verification, and audit-ready delivery are baked into every phase — not bolted on at the end." },
              { title: "Production ops", desc: "We don't just ship code. We set up monitoring, alerting, runbooks, and handoff documentation for your team." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-surface p-6 card">
                <h4 className="font-semibold text-lg">{item.title}</h4>
                <p className="mt-3 text-sm text-silver-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </section>

          {/* CTA */}
          <section className="mt-20">
            <div className="rounded-3xl p-10 md:p-14 bg-gradient-to-r from-amber-base via-amber-light to-surface text-bg-base text-center">
              <h3 className="text-3xl md:text-4xl font-bold">Ready to launch?</h3>
              <p className="mt-3 text-bg-base/80 max-w-xl mx-auto">Get a detailed roadmap and fixed-scope estimate for your product. No commitment, no pressure.</p>
              <div className="mt-6">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-bg-base px-8 py-3.5 text-sm font-semibold text-amber-base shadow-glow hover:-translate-y-0.5 transition-transform">Request a proposal</Link>
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
