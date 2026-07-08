import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { getServiceBySlug, getAllServiceSlugs } from "@/data/services";
import Hero from "@/components/service/Hero";
import StickyCTA from "@/components/service/StickyCTA";
import CaseStudyCarousel from '@/components/service/CaseStudyCarousel';
import BackToTop from '@/components/ui/BackToTop';
import ServiceSection from '@/components/service/ServiceSection';
import ServiceTimeline from '@/components/service/ServiceTimeline';
import ServiceTestimonials from '@/components/service/ServiceTestimonials';
import ServiceFAQ from '@/components/service/ServiceFAQ';
import ServiceSidebar from '@/components/service/ServiceSidebar';

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const svc = getServiceBySlug(params.slug);
  if (!svc) return {};
  return {
    title: `${svc.title} — ClickMasters`,
    description: svc.description ?? svc.hero.blurb,
    openGraph: {
      title: `${svc.title} — ClickMasters`,
      description: svc.description ?? svc.hero.blurb,
    },
  };
}

export default async function ServicePage({ params }: { params: any }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return notFound();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24 bg-gradient-to-b from-surface/30 to-bg-base relative overflow-hidden">
        {/* Decorative SVG waves */}
        <svg className="pointer-events-none absolute -left-20 -top-10 opacity-70 animate-wave" width="840" height="420" viewBox="0 0 840 420" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M0 140 C 140 60, 280 220, 420 140 C 560 60, 700 220, 840 140 L840 420 L0 420 Z" fill="var(--amber-base)" opacity="0.12" />
        </svg>
        <svg className="pointer-events-none absolute right-8 top-40 opacity-40 animate-blob" width="360" height="220" viewBox="0 0 360 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M0 80 C 80 0, 160 160, 240 80 C 320 0, 360 160, 360 80 L360 220 L0 220 Z" fill="var(--amber-base)" opacity="0.06" />
        </svg>
        <section className="site-container px-6">
          {/* Breadcrumbs */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-silver-mid" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-amber-base transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/service" className="hover:text-amber-base transition-colors">Services</Link>
            <span aria-hidden="true">/</span>
            <span className="text-silver-base">{service.title}</span>
          </nav>

          <Hero service={service} />

          {/* Main content grid */}
          <section className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
              {/* Service Sections */}
              {service.sections.map((sec, idx) => (
                <ServiceSection key={sec.heading} section={sec} index={idx} />
              ))}

              {/* Technical deliverables */}
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold">Technical deliverables</h3>
                <ul className="mt-3 text-sm text-silver-base space-y-2">
                  <li className="flex items-start gap-2"><span className="text-amber-base mt-0.5">›</span> Auditable smart contract source code (verifiable)</li>
                  <li className="flex items-start gap-2"><span className="text-amber-base mt-0.5">›</span> Test suite with CI integration</li>
                  <li className="flex items-start gap-2"><span className="text-amber-base mt-0.5">›</span> Deployment scripts and infra as code</li>
                  <li className="flex items-start gap-2"><span className="text-amber-base mt-0.5">›</span> Monitoring dashboard and runbooks</li>
                </ul>
              </div>

              {/* Integrations */}
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold">Integrations</h3>
                <p className="mt-2 text-sm text-silver-base">Common integrations: The Graph, Alchemy/Infura, OpenZeppelin Defender, and popular wallet providers.</p>
              </div>

              {/* Case studies */}
              {service.caseStudy && (
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h3 className="text-lg font-semibold">Case studies</h3>
                  <div className="mt-3">
                    {/* @ts-ignore */}
                    <CaseStudyCarousel slides={[{ title: service.caseStudy.title, blurb: service.caseStudy.blurb, image: service.caseStudy.image }]} />
                  </div>
                </div>
              )}

              {/* Timeline */}
              <ServiceTimeline phases={service.timeline} />

              {/* Testimonials */}
              {service.testimonials && service.testimonials.length > 0 && (
                <ServiceTestimonials testimonials={service.testimonials} />
              )}

              {/* FAQ */}
              <ServiceFAQ items={service.faq} />
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <StickyCTA />
              <ServiceSidebar items={service.sidebar} />
            </aside>
          </section>

          {/* Bottom CTA */}
          <div className="mt-16 rounded-3xl p-10 md:p-14 bg-gradient-to-r from-amber-base via-amber-light to-surface text-bg-base text-center">
            <h3 className="text-3xl md:text-4xl font-bold">Ready to talk?</h3>
            <p className="mt-3 text-bg-base/80 max-w-xl mx-auto">Schedule a discovery call and receive a tailored scope and estimate. No commitment required.</p>
            <div className="mt-6">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-bg-base px-8 py-3.5 text-sm font-semibold text-amber-base shadow-glow hover:-translate-y-0.5 transition-transform">Contact us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
