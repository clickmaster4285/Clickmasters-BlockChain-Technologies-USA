"use client";

import type { CostCTAItem } from "@/lib/cost-type";
import RevealOnScroll from "@/components/cost/RevealOnScroll";
import { useState } from "react";

export default function CTABand({ ctas, title }: { ctas: CostCTAItem[]; title: string }) {
  const primary = ctas.find((c) => c.primary) ?? ctas[0];
  const secondary = ctas.find((c) => !c.primary);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="book-a-call" className="relative w-full overflow-hidden bg-gradient-to-br from-bg-elevated via-bg-base to-bg-elevated py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-neon-grid opacity-70" />
      <div className="pointer-events-none absolute -left-20 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-amber-glow/30 blur-3xl animate-orb" />
      <div className="pointer-events-none absolute -right-20 bottom-1/2 h-[500px] w-[500px] translate-y-1/2 rounded-full bg-emerald-glow/20 blur-3xl animate-orb animation-delay-2000" />

      <div className="site-container relative mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <RevealOnScroll effect="blast-in">
            <div className="flex flex-col justify-center">
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border-amber bg-amber-glow px-4 py-1.5 text-xs font-mono uppercase tracking-[0.18em] text-amber-dim">
                Ready to Build
              </div>
              
              <h2 className="text-balance font-display text-3xl font-semibold text-text-primary md:text-4xl lg:text-5xl">
                Get a scoped estimate for{" "}
                <span className="bg-gradient-to-r from-amber-base to-amber-light bg-clip-text text-transparent">
                  {title.replace(/ Cost.*$/i, "").toLowerCase()}
                </span>
              </h2>
              
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-text-secondary md:text-base">
                A 30-minute call is enough to give you a real, fixed-scope number — not a range pulled from a price table.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                {primary && (
                  <a
                    href={primary.href}
                    className="cta-btn animate-glow-pulse group inline-flex items-center gap-2 rounded-full bg-amber-base px-8 py-4 text-sm font-semibold text-white shadow-glow transition-all hover:scale-105 hover:shadow-glow-strong"
                  >
                    {primary.text}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                )}
                {secondary && (
                  <a
                    href={secondary.href}
                    className="cta-btn link-underline group inline-flex items-center gap-2 rounded-full border border-border-hover px-8 py-4 text-sm font-semibold text-text-primary transition-all hover:border-amber-base hover:bg-amber-glow/10"
                  >
                    {secondary.text}
                  </a>
                )}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll effect="slide-left" delay={200}>
            <div className="relative">
              <div className="relative rounded-2xl border border-border-default bg-white/5 backdrop-blur-xl p-6 shadow-2xl md:p-8">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-base/20 via-emerald-base/20 to-amber-base/20 opacity-50 blur-sm" />
                
                <div className="relative">
                  <h3 className="mb-6 text-xl font-semibold text-text-primary">
                    Request a Web3 Development Proposal
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="group">
                      <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-text-secondary">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-border-default bg-bg-base/50 px-4 py-3 text-sm text-text-primary transition-all placeholder:text-text-muted focus:border-amber-base focus:outline-none focus:ring-2 focus:ring-amber-base/20"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="group">
                      <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-text-secondary">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-border-default bg-bg-base/50 px-4 py-3 text-sm text-text-primary transition-all placeholder:text-text-muted focus:border-amber-base focus:outline-none focus:ring-2 focus:ring-amber-base/20"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div className="group">
                      <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-text-secondary">
                        Project Type
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full rounded-lg border border-border-default bg-bg-base/50 px-4 py-3 text-sm text-text-primary transition-all placeholder:text-text-muted focus:border-amber-base focus:outline-none focus:ring-2 focus:ring-amber-base/20"
                        placeholder="Tell us about your blockchain project..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-amber-base to-amber-light px-6 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-glow"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitted ? (
                          <>
                            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Get Your Estimate
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform group-hover:translate-x-full" />
                    </button>
                    
                    <p className="text-center text-xs text-text-muted">
                      No spam. Unsubscribe anytime.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}