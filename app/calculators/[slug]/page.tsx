import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BackToTop from "@/components/ui/BackToTop";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import {
  getCalculatorBySlug,
  getCalculatorEngineType,
  getCalculatorMetadata,
  getCalculatorResourceType,
  getCalculatorSchemas,
  getCalculatorStaticParams,
  getRelatedCalculators,
} from "@/lib/calculators";

import CalculatorContent from "@/components/calculators/CalculatorContent";
import CalculatorCta from "@/components/calculators/CalculatorCta";
import CalculatorEngineRenderer from "@/components/calculators/CalculatorEngineRenderer";
import CalculatorFaq from "@/components/calculators/CalculatorFaq";
import CalculatorHero from "@/components/calculators/CalculatorHero";
import CalculatorRelated from "@/components/calculators/CalculatorRelated";

type CalculatorPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================================================
   Static Routes
========================================================= */

export function generateStaticParams() {
  return getCalculatorStaticParams();
}

/* =========================================================
   Dynamic Metadata
========================================================= */

export async function generateMetadata({
  params,
}: CalculatorPageProps): Promise<Metadata> {
  const { slug } = await params;

  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    return {
      title: "Calculator Not Found",
      description: "The requested blockchain calculator could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return getCalculatorMetadata(calculator);
}

/* =========================================================
   Calculator Detail Page
========================================================= */

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const { slug } = await params;

  const calculator = getCalculatorBySlug(slug);

  if (!calculator) {
    notFound();
  }

  const relatedCalculators = getRelatedCalculators(calculator.slug);

  const resourceType = getCalculatorResourceType(calculator.slug);

  const isInteractive = getCalculatorEngineType(calculator.slug) !== null;

  const schemas = getCalculatorSchemas(calculator);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.articleSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />

      {schemas.faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemas.faqSchema),
          }}
        />
      )}

      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-surface/35 to-bg-base pb-24 pt-32">
        <PageBackground />

        <section className="site-container relative px-6">
          <CalculatorHero
            calculator={calculator}
            resourceType={resourceType}
            isInteractive={isInteractive}
          />

          <div className="mt-10">
            {isInteractive && (
              <section
                aria-label={`${calculator.title} interactive calculator`}
                id="calculator"
                className="-mt-2 scroll-mt-28 pb-6 sm:pb-10"
              >
                <CalculatorEngineRenderer calculator={calculator} />
              </section>
            )}

            <div
              id="resource-content"
              className={
                isInteractive ? "mt-14 scroll-mt-28 sm:mt-16" : "scroll-mt-28"
              }
            >
              <CalculatorContent content={calculator.content} />
            </div>

            {calculator.faqs.length > 0 && (
              <div className="mt-14 sm:mt-16">
                <CalculatorFaq
                  title={`${calculator.title} FAQs`}
                  faqs={calculator.faqs}
                />
              </div>
            )}

            {relatedCalculators.length > 0 && (
              <div className="mt-14 sm:mt-16">
                <CalculatorRelated calculators={relatedCalculators} />
              </div>
            )}

            <div className="pt-14 sm:pt-16">
              <CalculatorCta cta={calculator.cta} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

/* =========================================================
   Background Effects
========================================================= */

function PageBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute left-[-14rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-amber-base/10 blur-[110px]" />

      <div className="absolute right-[-12rem] top-[30rem] h-[30rem] w-[30rem] rounded-full bg-amber-base/10 blur-[110px]" />

      <div className="absolute left-1/2 top-[78rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-emerald-base/5 blur-[110px]" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
    </div>
  );
}
