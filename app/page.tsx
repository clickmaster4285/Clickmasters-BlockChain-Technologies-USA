import { CinematicEntry } from "@/components/landing/CinematicEntry";
import { Navbar } from "@/components/landing/Navbar";
import { ScrollProgress } from "@/components/landing/ScrollProgress";
import { CursorGlow } from "@/components/landing/CursorGlow";
import { Hero } from "@/components/landing/Hero";
import { TrustedMarquee } from "@/components/landing/TrustedMarquee";
import { ProductionIntro } from "@/components/landing/ProductionIntro";
import { Services } from "@/components/landing/Services";
import { Dominate } from "@/components/landing/Dominate";
import { Benefits } from "@/components/landing/Benefits";
import { WhyChooseAgency } from "@/components/landing/WhyChooseAgency";
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
import { BackToTop } from "@/components/landing/BackToTop";
import { createMetadata } from "@/config/metadata";

const heroVideo = "/media/hero-bg.mp4";
const heroSide = "/media/cta-bg.png";

export const metadata = createMetadata({
  title: "Blockchain Development Company in US | Clickmasters",
  description:
    "Clickmasters is a blockchain development company offering custom blockchain development services, smart contracts, DApps, and Web3 solutions for U.S. businesses.",
  path: "/",
  image: heroSide,
});

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
        <Reveal><ProductionIntro /></Reveal>
        <Reveal><Services /></Reveal>
        <Reveal><Dominate /></Reveal>
        <Reveal><Benefits /></Reveal>
        <Reveal><WhyChooseAgency /></Reveal>
        <Reveal><Audience /></Reveal>
        <Reveal><Portfolio /></Reveal>
        <Reveal><Process /></Reveal>
        <Reveal><Comparison /></Reveal>
        <Reveal><Testimonials /></Reveal>
        <Reveal><TechStack /></Reveal>
        <Reveal><Awards /></Reveal>
        <Reveal><FAQ /></Reveal>
        <Reveal><FinalCTA /></Reveal>
      </main>
      <Footer />
      <WhatsAppFAB />
      <BackToTop />
    </div>
  );
}
