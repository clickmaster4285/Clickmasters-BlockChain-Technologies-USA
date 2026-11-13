import { createPageMetadata } from "@/lib/cms/page-metadata";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { createMetadata } from "@/config/metadata";
import { notFound } from "next/navigation";
import { costs, getCostBySlug } from "@/data/costs";
import Breadcrumb from "@/components/cost/BreadCrumb";
import SectionRenderer from "@/components/cost/SectionRenderer";
import FAQAccordion from "@/components/cost/FAQ";
import CTABand from "@/components/cost/CTABand";
import RelatedLinks from "@/components/RelatedLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return costs.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cost = getCostBySlug(slug);
  if (!cost) return {};

  return createPageMetadata({
    title: cost.meta.title,
    description:
      cost.sections[0]?.bullets?.[0] ||
      cost.meta.primaryKeyword ||
      cost.meta.title,
    keywords: [cost.meta.primaryKeyword, ...cost.meta.secondaryKeywords],
    path: `/cost/${cost.slug}`,
    type: "article",
  });
}

export default async function CostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cost = getCostBySlug(slug);
  if (!cost) notFound();

  const title = cost.meta.title.split("|")[0].trim();

  return (
    <>
      <div className="relative bg-bg-base">
        <Navbar />
        <JsonLd
          data={faqPageSchema(cost.faq)}
        />
        <div className="pt-20 md:pt-24">
          <Breadcrumb title={title} />
        </div>
        <main className="relative w-full" style={{ viewTransitionName: `cost-card-${cost.slug}` }}>
          <SectionRenderer cost={cost} />
          <FAQAccordion faq={cost.faq} />
          <CTABand ctas={cost.ctas} title={title} />
          <RelatedLinks type="cost" slug={slug} />
        </main>
        <Footer />
      </div>
    </>
  );
}
