// app/industries/[slug]/page.tsx

import { createPageMetadata } from "@/lib/cms/page-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import industriesData from "@/data/industries";
import IndustryDetailPage from "@/components/industries/IndustryDetailPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/structured-data";
import RelatedLinks from "@/components/RelatedLinks";
import { createMetadata } from "@/config/metadata";

type ContentBlock =
  | {
      type: "featuredAnswer";
      text: string;
    }
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    }
  | {
      type: "code";
      text: string;
    };

export type IndustryData = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  credibility: string[];
  content: ContentBlock[];
  faqs: {
    question: string;
    answer: string;
  }[];
  cta: {
    title: string;
    description: string;
    primaryText: string;
    secondaryText: string;
  };
};

const industries = industriesData as IndustryData[];

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return industries.map((industry) => ({
    slug: industry.slug,
  }));
}

// Every industry page is generated above. Unknown slugs must return a real
// 404: with loading.tsx streaming, a notFound() at request time would otherwise
// be sent as a soft 404 (HTTP 200 + noindex).
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const industry = industries.find((item) => item.slug === slug);

  if (!industry) {
    return {
      title: "Industry Not Found",
    };
  }

  return createPageMetadata({
    title: industry.title,
    description: industry.excerpt,
    path: `/industries/${industry.slug}`,
    image: industry.image,
    type: "article",
  });
}

export default async function IndustrySlugPage({ params }: PageProps) {
  const { slug } = await params;

  const industry = industries.find((item) => item.slug === slug);

  if (!industry) {
    notFound();
  }

  const relatedIndustries = industries
    .filter(
      (item) =>
        item.slug !== industry.slug && item.category === industry.category,
    )
    .slice(0, 3);

  const fallbackRelated = industries
    .filter((item) => item.slug !== industry.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={faqPageSchema(industry.faqs)} />
      <IndustryDetailPage
        industry={industry}
        relatedIndustries={
          relatedIndustries.length > 0 ? relatedIndustries : fallbackRelated
        }
        relatedLinks={<RelatedLinks type="industries" slug={industry.slug} />}
      />
    </>
  );
}
