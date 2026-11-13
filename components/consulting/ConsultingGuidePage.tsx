import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, FileQuestion, Home } from "lucide-react";

import ConsultingEnquiryForm from "@/components/consulting/ConsultingEnquiryForm";
import SampleAssessment from "@/components/consulting/SampleAssessment";
import TrackedLink from "@/components/consulting/TrackedLink";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { consultingGuide as g } from "@/data/consulting";
import { faqPageSchema } from "@/lib/structured-data";

/**
 * /faqs/blockchain-development-consulting-enterprise — supporting buyer guide.
 * Section order follows the handoff spec (section 5, "FAQ section order").
 */
export default function ConsultingGuidePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-bg-base text-text-primary">
        <JsonLd
          data={[
            // Only questions and answers that are visible on this page.
            faqPageSchema(g.buyerFaqs),
          ]}
        />

        {/* 1. Hero and CTAs */}
        <section className="relative bg-gradient-to-b from-bg-base via-amber-base/5 to-bg-base pb-14 pt-28 sm:pt-32">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(100,116,139,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.055)_1px,transparent_1px)] bg-[size:70px_70px] opacity-60" />

          <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 overflow-hidden rounded-2xl border border-border-default bg-white/85 px-4 py-3 backdrop-blur-xl sm:px-5"
            >
              <div className="flex min-w-0 items-center gap-2 overflow-hidden text-xs font-semibold text-text-secondary sm:text-sm">
                <Link href="/" className="inline-flex shrink-0 items-center gap-2 transition hover:text-amber-base">
                  <Home className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Home</span>
                </Link>
                <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
                <Link href="/faqs" className="shrink-0 transition hover:text-amber-base">
                  FAQs
                </Link>
                <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
                <span className="min-w-0 truncate font-bold text-text-primary" aria-current="page">
                  {g.breadcrumb}
                </span>
              </div>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-base shadow-sm">
              <FileQuestion className="h-4 w-4" aria-hidden="true" />
              {g.eyebrow}
            </div>

            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-text-primary [overflow-wrap:anywhere] sm:text-5xl lg:text-6xl">
              {g.h1}
            </h1>

            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-text-secondary sm:text-lg">
              {g.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <TrackedLink
                ctaLocation="hero"
                href={g.primaryCta.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-base px-6 py-3 text-center text-sm font-black text-bg-base shadow-glow transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-base"
              >
                {g.primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>

              <Link
                href={g.secondaryCta.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-default bg-white px-6 py-3 text-center text-sm font-bold text-text-primary transition hover:border-amber-base/40 hover:text-amber-base"
              >
                {g.secondaryCta.label}
              </Link>

              <Link
                href={g.readGuide.href}
                className="inline-flex items-center justify-center gap-1 px-2 py-2 text-sm font-semibold text-text-secondary underline-offset-4 hover:text-amber-base hover:underline"
              >
                {g.readGuide.label}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <div id="faq-content" className="scroll-mt-32">
          {/* 2. Short direct answer */}
          <section className="bg-bg-base pb-12 pt-4">
            <div className="container mx-auto max-w-5xl px-4 sm:px-6">
              <div className="rounded-2xl border border-amber-base/20 bg-amber-base/10 p-6 sm:p-8">
                <h2 className="text-2xl font-black text-text-primary">{g.directAnswer.heading}</h2>
                {g.directAnswer.paragraphs.map((text) => (
                  <p key={text} className="mt-4 text-base leading-8 text-text-primary">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Five deliverables */}
          <section className="bg-bg-base py-12" aria-labelledby="deliverables-heading">
            <div className="container mx-auto max-w-5xl px-4 sm:px-6">
              <h2 id="deliverables-heading" className="border-l-4 border-amber-base pl-4 text-2xl font-black leading-tight text-text-primary sm:text-3xl">
                Five consulting deliverables
              </h2>
              <ol className="mt-6 grid gap-4 md:grid-cols-2">
                {g.deliverables.map((item, index) => (
                  <li
                    key={item.title}
                    className={`rounded-2xl border border-border-default bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.05)] ${
                      index === g.deliverables.length - 1 ? "md:col-span-2" : ""
                    }`}
                  >
                    <p className="text-xs font-black text-amber-base">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-lg font-black text-text-primary">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-text-secondary">{item.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* 4. Sample deliverable preview */}
          <section className="bg-bg-base py-12">
            <div className="container mx-auto max-w-5xl px-4 sm:px-6">
              <SampleAssessment variant="preview" id="sample-preview" />
            </div>
          </section>

          {/* 5. Buyer FAQ answers */}
          <section className="bg-bg-base py-12" aria-labelledby="buyer-faqs-heading">
            <div className="container mx-auto max-w-5xl px-4 sm:px-6">
              <h2 id="buyer-faqs-heading" className="border-l-4 border-amber-base pl-4 text-2xl font-black leading-tight text-text-primary sm:text-3xl">
                Buyer questions
              </h2>
              <div className="mt-6 space-y-4">
                {g.buyerFaqs.map((item) => (
                  <article
                    key={item.question}
                    className="rounded-2xl border border-border-default bg-white p-5 sm:p-6"
                  >
                    <h3 className="text-lg font-black text-text-primary">{item.question}</h3>
                    <p className="mt-3 text-base leading-8 text-text-secondary">{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* 6. Enquiry section (id="contact") */}
        <ConsultingEnquiryForm formId="consulting_faq_enquiry" />

        {/* 7. Relevant resources */}
        <section className="border-t border-border-default bg-bg-base py-16 sm:py-20" aria-labelledby="resources-heading">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id="resources-heading" className="text-3xl font-black tracking-tight text-text-primary">
                  Relevant resources
                </h2>
              </div>
              <Link
                href={g.secondaryCta.href}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-default bg-white px-5 py-2 text-sm font-bold text-text-primary transition hover:border-amber-base/40 hover:text-amber-base"
              >
                {g.secondaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {g.resources.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-border-default bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-amber-base/40"
                >
                  <h3 className="text-lg font-black leading-7 text-text-primary transition group-hover:text-amber-base">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">{item.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-amber-base">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Read guide
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
