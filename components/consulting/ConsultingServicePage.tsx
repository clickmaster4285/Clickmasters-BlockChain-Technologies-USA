import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

import ConsultingEnquiryForm from "@/components/consulting/ConsultingEnquiryForm";
import SampleAssessment from "@/components/consulting/SampleAssessment";
import TrackedLink from "@/components/consulting/TrackedLink";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import BackToTop from "@/components/ui/BackToTop";
import {
  CONSULTING_SERVICE_PATH,
  consultingService as c,
} from "@/data/consulting";
import { faqPageSchema, serviceSchema } from "@/lib/structured-data";

function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow && (
        <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="mt-3 text-3xl font-black tracking-tight text-text-primary sm:text-4xl"
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-base leading-8 text-text-secondary">{intro}</p>
      )}
    </div>
  );
}

/**
 * /service/blockchain-consulting — commercial landing page.
 * Section order follows the handoff spec (section 5, "Service page section
 * specification"). Section 6, "Adviser and evidence", is intentionally
 * omitted until a verified adviser profile and approved work samples exist.
 */
export default function ConsultingServicePage({ image }: { image?: string }) {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Navbar />
      <JsonLd
        data={[
          serviceSchema({
            name: c.metaTitle,
            description: c.metaDescription,
            path: CONSULTING_SERVICE_PATH,
            serviceType: "Blockchain consulting",
            image,
          }),
          faqPageSchema(c.questions),
        ]}
      />

      <main className="overflow-hidden">
        {/* 1. Hero */}
        <section className="relative bg-gradient-to-b from-bg-base via-amber-base/5 to-bg-base pb-16 pt-28 sm:pt-32">
          <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 text-sm text-text-secondary"
            >
              <Link href="/" className="hover:text-amber-base">
                Home
              </Link>
              <ChevronRight
                className="h-4 w-4 text-text-muted"
                aria-hidden="true"
              />
              <Link href="/service" className="hover:text-amber-base">
                Services
              </Link>
              <ChevronRight
                className="h-4 w-4 text-text-muted"
                aria-hidden="true"
              />
              <span
                className="font-semibold text-text-primary"
                aria-current="page"
              >
                {c.breadcrumb}
              </span>
            </nav>

            <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
              {c.eyebrow}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.08] tracking-tight [overflow-wrap:anywhere] sm:text-5xl lg:text-6xl">
              {c.h1}
            </h1>
            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-text-secondary sm:text-lg">
              {c.intro}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                ctaLocation="hero"
                href={c.primaryCta.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-base px-6 py-3 text-center text-sm font-black text-bg-base shadow-glow transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-base"
              >
                {c.primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <Link
                href={c.secondaryCta.href}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border-default bg-white px-6 py-3 text-center text-sm font-bold text-text-primary transition hover:border-amber-base/40 hover:text-amber-base"
              >
                {c.secondaryCta.label}
              </Link>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-text-secondary">
              {c.supportingLine}
            </p>
          </div>
        </section>

        {/* 2. Which decision do you need to make? */}
        <section className="py-14 sm:py-16" aria-labelledby="decisions-heading">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              id="decisions-heading"
              title="Which decision do you need to make?"
            />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {c.decisions.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="group flex flex-col rounded-2xl border border-border-default bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:border-amber-base/40"
                >
                  <h3 className="text-lg font-black text-text-primary group-hover:text-amber-base">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-text-secondary">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-amber-base">
                    See the deliverable
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 3. What you receive */}
        <section
          className="py-14 sm:py-16"
          aria-labelledby="deliverables-heading"
        >
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              id="deliverables-heading"
              title="What you receive"
            />
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {c.deliverables.map((item) => (
                <article
                  key={item.id}
                  id={item.id}
                  className="scroll-mt-32 rounded-2xl border border-border-default bg-white p-5 target:border-amber-base target:ring-2 target:ring-amber-base/30"
                >
                  <CheckCircle2
                    className="h-5 w-5 text-emerald-base"
                    aria-hidden="true"
                  />
                  <h3 className="mt-3 text-lg font-black text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-text-secondary">
              Implementation is not part of a consulting engagement. If you want
              development support afterwards, it is scoped as a separate option.
            </p>
          </div>
        </section>

        {/* 4. Sample assessment */}
        <section className="py-14 sm:py-16">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6">
            <SampleAssessment variant="full" id="sample-assessment" />
          </div>
        </section>

        {/* 5. How an engagement works */}
        <section
          className="py-14 sm:py-16"
          aria-labelledby="engagement-heading"
        >
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading
              id="engagement-heading"
              title="How an engagement works"
            />
            <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {c.engagementSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-border-default bg-white p-5"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-amber-base/10 text-sm font-black text-amber-base">
                    {index + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-black text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6. Adviser and evidence — omitted until verified (see component docs). */}

        {/* 7. Scope and fees */}
        <section className="py-14 sm:py-16" aria-labelledby="fees-heading">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <div className="rounded-2xl border border-border-default bg-white p-6 sm:p-8">
              <SectionHeading
                id="fees-heading"
                title="Scope and fees"
                intro="Fees depend on the scope of the engagement and are agreed after the requirements discussion. The main factors are:"
              />
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {c.feeDrivers.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-border-default bg-bg-base p-4 text-sm font-medium leading-6 text-text-secondary"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-base"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 8. Questions before engaging */}
        <section className="py-14 sm:py-16" aria-labelledby="questions-heading">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6">
            <SectionHeading
              id="questions-heading"
              title="Questions before engaging"
            />
            <div className="mt-8 space-y-4">
              {c.questions.map((item) => (
                <article
                  key={item.question}
                  className="rounded-2xl border border-border-default bg-white p-5 sm:p-6"
                >
                  <h3 className="text-lg font-black text-text-primary">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-base leading-8 text-text-secondary">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Enquiry */}
        <ConsultingEnquiryForm formId="consulting_service_enquiry" />

        {/* 10. Supporting guide */}
        <section
          className="border-t border-border-default py-16 sm:py-20"
          aria-labelledby="guide-heading"
        >
          <div className="container mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading id="guide-heading" title="Supporting guide" />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {c.resources.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-2xl border border-border-default bg-white p-5 shadow-[0_18px_55px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-amber-base/40"
                >
                  <h3 className="text-lg font-black leading-7 text-text-primary group-hover:text-amber-base">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-amber-base">
                    Read guide
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
