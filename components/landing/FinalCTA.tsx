import { Mail, Phone, MessageCircle } from "lucide-react";
import { VideoWithFallback } from "@/components/media/VideoWithFallback";
const ctaVideo = "/media/cta.mp4";
const ctaPoster = "/media/cta-bg.png";

export function FinalCTA() {
  return (
    <section id="contact" className="dark relative overflow-hidden bg-gradient-to-br from-amber-dim via-amber-base to-amber-light py-24 text-foreground md:py-32">
      <VideoWithFallback
        src={ctaVideo}
        fallbackImage={ctaPoster}
        preload="none"
        lazy
        className="absolute inset-0 h-full w-full"
        opacityClassName="opacity-40"
        blendClassName="mix-blend-screen"
        ariaLabel="Wallet connection pulse"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-dim/60 via-transparent to-amber-base/70" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute bottom-0 h-2 w-2 animate-rise rounded-full bg-white/40"
            style={{
              left: `${(i * 53) % 100}%`,
              animationDuration: `${8 + (i % 5) * 2}s`,
              animationDelay: `${(i % 7) * -1.5}s`,
            }}
          />
        ))}
      </div>
      <div className="container relative mx-auto max-w-4xl px-6 text-center">
        <p className="font-serif text-4xl italic text-white/80 md:text-5xl" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
          build the future on-chain
        </p>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-bg-base md:text-6xl">
          LET'S BUILD YOUR BLOCKCHAIN PROJECT
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
          Tell us about your protocol, product or DAO. Our engineers will reply within 24 hours with a scoped plan.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:sale@clickmastersblockchaindevelopmentcompany.com"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-amber-base shadow-glow transition-transform hover:-translate-y-0.5"
          >
            <Mail className="h-4 w-4" /> Email us
          </a>
          <a
            href="tel:+13252024074"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            <Phone className="h-4 w-4" /> +1 325 202 4074
          </a>
          <a
            href="https://wa.me/13252024074"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
