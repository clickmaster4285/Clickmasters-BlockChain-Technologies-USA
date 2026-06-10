import { createFileRoute } from "@tanstack/react-router";
import { CinematicEntry } from "@/components/landing/CinematicEntry";
import { Navbar } from "@/components/landing/Navbar";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { CursorGlow } from "@/components/landing/CursorGlow";
import { Hero } from "@/components/landing/Hero";
import { TrustedMarquee } from "@/components/landing/TrustedMarquee";
import { Services } from "@/components/landing/Services";
import { Dominate } from "@/components/landing/Dominate";
import { Portfolio } from "@/components/landing/Portfolio";
import { Process } from "@/components/landing/Process";
import { Comparison } from "@/components/landing/Comparison";
import { Testimonials } from "@/components/landing/Testimonials";
import { TechStack } from "@/components/landing/TechStack";
import { Awards } from "@/components/landing/Awards";
import { Audience } from "@/components/landing/Audience";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { Reveal } from "@/components/landing/Reveal";
import { WhatsAppFAB } from "@/components/landing/WhatsAppFAB";
import heroVideo from "@/assets/media/hero-bg.mp4.asset.json";
import heroSide from "@/assets/media/cta-bg.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClickMasters — Blockchain & Web3 Development Company" },
      { name: "description", content: "Premium blockchain & Web3 development agency. Smart contracts, DApps, NFT marketplaces, and crypto wallets — engineered with enterprise-grade security." },
      { property: "og:title", content: "ClickMasters — Blockchain & Web3 Development" },
      { property: "og:description", content: "Securing $100M+ on-chain. Smart contracts, DApps, wallets and NFT marketplaces built by senior Web3 engineers." },
      { property: "og:image", content: heroSide.url },
      { name: "twitter:image", content: heroSide.url },
    ],
    links: [
      // LCP: hero side image
      { rel: "preload", as: "image", href: heroSide.url, fetchpriority: "high" },
      // Hero background video — start fetching ASAP
      { rel: "preload", as: "video", href: heroVideo.url, type: "video/mp4" },
    ],
  }),
  component: Index,
});


function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CinematicEntry />
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <TrustedMarquee />
        <Reveal><Services /></Reveal>
        <Reveal><Dominate /></Reveal>
        <Reveal><Portfolio /></Reveal>
        <Reveal><Process /></Reveal>
        <Reveal><Comparison /></Reveal>
        <Reveal><Audience /></Reveal>
        <Reveal><Testimonials /></Reveal>
        <Reveal><TechStack /></Reveal>
        <Reveal><Awards /></Reveal>
        <Reveal><FAQ /></Reveal>
        <Reveal><FinalCTA /></Reveal>
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
