import { createPageMetadata } from "@/lib/cms/page-metadata";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { createMetadata } from "@/config/metadata";
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
import RelatedLinks from "@/components/RelatedLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema, serviceSchema } from "@/lib/structured-data";
import ConsultingServicePage from "@/components/consulting/ConsultingServicePage";
import { consultingService } from "@/data/consulting";

const CONSULTING_SERVICE_SLUG = "blockchain-consulting";

const contentLibraryTopics = [
  {
    title: "Blockchain services",
    description:
      "Explore smart contract development, DeFi protocols, NFT systems, crypto wallets, exchanges, enterprise blockchain, and consulting.",
  },
  {
    title: "Industry applications",
    description:
      "See practical blockchain use cases and implementation patterns across healthcare, finance, supply chain, real estate, energy, manufacturing, and more.",
  },
  {
    title: "Technical deep dives",
    description:
      "Learn about Solidity patterns, DeFi design, tokenomics, zero-knowledge proofs, cross-chain interoperability, and Layer 2 development.",
  },
  {
    title: "Regulation and compliance",
    description:
      "Review considerations spanning US regulators, EU MiCA, healthcare privacy, and defense-sector requirements.",
  },
  {
    title: "Tools and practical resources",
    description:
      "Use planning guides, ROI calculators, deployment checklists, audit preparation material, developer resources, and glossaries.",
  },
];

function ContentLibraryPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="pb-24 pt-32">
        <div className="site-container px-6">
          <nav
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-600"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-amber-800">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/service" className="hover:text-amber-800">
              Services
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-slate-900">{title}</span>
          </nav>

          <header className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-14">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-800">
              Clickmasters resource library
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-6xl">
              Blockchain Content Library
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              Browse practical blockchain development guidance—from technical
              implementation and industry use cases to enterprise strategy,
              compliance, and project planning.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["Services", "blockchain development topics"],
                ["Guides", "technical and planning resources"],
                ["Tools", "calculators and checklists"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <p className="text-3xl font-extrabold text-slate-950">
                    {value}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-600">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </header>

          <section className="mt-14" aria-labelledby="coverage-heading">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-800">
                Explore the library
              </p>
              <h2
                id="coverage-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl"
              >
                One library, five essential areas
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Find clear starting points for evaluating blockchain
                opportunities, understanding implementation choices, and
                planning for real-world requirements.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {contentLibraryTopics.map((topic, index) => (
                <article
                  key={topic.title}
                  className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${
                    index === contentLibraryTopics.length - 1
                      ? "md:col-span-2"
                      : ""
                  }`}
                >
                  <p className="text-sm font-bold text-amber-800">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-slate-950">
                    {topic.title}
                  </h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    {topic.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-3xl bg-slate-900 px-8 py-10 text-white md:px-12 md:py-14">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-amber-300">
                Put the research into practice
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Planning a blockchain project?
              </h2>
              <p className="mt-4 leading-7 text-slate-200">
                Talk with Clickmasters about your goals, technical
                requirements, and next steps. We can help turn early research
                into a practical project plan.
              </p>
              <Link
                href="/contact"
                className="mt-7 inline-flex items-center justify-center rounded-full bg-amber-700 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-amber-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
              >
                Contact our team
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug: slug.split("/") }));
}

// Every service page is generated above. Unknown slugs must return a real 404:
// with loading.tsx streaming, a notFound() at request time would otherwise be
// sent as a soft 404 (HTTP 200 + noindex).
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const slug = (await params).slug.join("/");
  const svc = getServiceBySlug(slug);
  if (!svc) return {};

  if (slug === CONSULTING_SERVICE_SLUG) {
    return createPageMetadata({
      title: consultingService.metaTitle,
      description: consultingService.metaDescription,
      path: `/service/${slug}`,
      type: "article",
    });
  }

  return createPageMetadata({
    title: svc.title,
    description:
      slug === "resources/blockchain-content-library"
        ? "Browse blockchain development resources covering services, industry applications, technical guides, compliance, and practical tools."
        : svc.description ?? svc.hero.blurb,
    path: `/service/${slug}`,
    type: "article",
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const slug = (await params).slug.join("/");
  const service = getServiceBySlug(slug);
  if (!service) return notFound();
  if (slug === "resources/blockchain-content-library") {
    return <ContentLibraryPage title={service.title} />;
  }
  if (slug === CONSULTING_SERVICE_SLUG) {
    return <ConsultingServicePage image={service.image} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <JsonLd
        data={[
          serviceSchema({
            name: service.title,
            description: service.description ?? service.hero.blurb,
            path: `/service/${slug}`,
            serviceType: service.category,
            image: service.image,
          }),
          faqPageSchema(service.faq),
        ]}
      />
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
                <h2 className="text-lg font-semibold">Technical deliverables</h2>
                <ul className="mt-3 text-sm text-silver-base space-y-2">
                  <li className="flex items-start gap-2"><span className="text-amber-base mt-0.5">›</span> Auditable smart contract source code (verifiable)</li>
                  <li className="flex items-start gap-2"><span className="text-amber-base mt-0.5">›</span> Test suite with CI integration</li>
                  <li className="flex items-start gap-2"><span className="text-amber-base mt-0.5">›</span> Deployment scripts and infra as code</li>
                  <li className="flex items-start gap-2"><span className="text-amber-base mt-0.5">›</span> Monitoring dashboard and runbooks</li>
                </ul>
              </div>

              {/* Integrations */}
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="text-lg font-semibold">Integrations</h2>
                <p className="mt-2 text-sm text-silver-base">Common integrations: The Graph, Alchemy/Infura, OpenZeppelin Defender, and popular wallet providers.</p>
              </div>

              {/* Case studies */}
              {service.caseStudy && (
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h2 className="text-lg font-semibold">Case studies</h2>
                  <div className="mt-3">
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
            <h2 className="text-3xl md:text-4xl font-bold">Ready to talk?</h2>
            <p className="mt-3 text-bg-base/80 max-w-xl mx-auto">Schedule a discovery call and receive a tailored scope and estimate. No commitment required.</p>
            <div className="mt-6">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-bg-base px-8 py-3.5 text-sm font-semibold text-amber-base shadow-glow hover:-translate-y-0.5 transition-transform">Contact us</Link>
            </div>
          </div>
        </section>
        <RelatedLinks type="service" slug={slug} />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
