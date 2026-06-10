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

const heroVideo = "/media/hero-bg.mp4";
const heroSide = "/media/cta-bg.png";

export const metadata = {
  title: "ClickMasters — Blockchain & Web3 Development Company",
  description:
    "Premium blockchain & Web3 development agency. Smart contracts, DApps, NFT marketplaces, and crypto wallets — engineered with enterprise-grade security.",
  openGraph: {
    title: "ClickMasters — Blockchain & Web3 Development",
    description:
      "Securing $100M+ on-chain. Smart contracts, DApps, wallets and NFT marketplaces built by senior Web3 engineers.",
    images: [heroSide],
  },
  twitter: {
    images: [heroSide],
  },
  alternates: {
    types: {
      "application/json": [],
    },
  },
};

export default function Index() {
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
