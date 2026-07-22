// app/industries/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import industriesData from "@/data/industries";
import IndustryDetailPage from "@/components/industries/IndustryDetailPage";

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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const industry = industries.find(
    (item) => item.slug === slug,
  );

  if (!industry) {
    return {
      title: "Industry Not Found",
    };
  }

  return {
    title: industry.title,
    description: industry.excerpt,
    alternates: {
      canonical: `/industries/${industry.slug}`,
    },
    openGraph: {
      title: industry.title,
      description: industry.excerpt,
      type: "article",
      images: [
        {
          url: industry.image,
          alt: industry.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: industry.title,
      description: industry.excerpt,
      images: [industry.image],
    },
  };
}

export default async function IndustrySlugPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const industry = industries.find(
    (item) => item.slug === slug,
  );

  if (!industry) {
    notFound();
  }

  const relatedIndustries = industries
    .filter(
      (item) =>
        item.slug !== industry.slug &&
        item.category === industry.category,
    )
    .slice(0, 3);

  const fallbackRelated = industries
    .filter((item) => item.slug !== industry.slug)
    .slice(0, 3);

  return (
    <IndustryDetailPage
      industry={industry}
      relatedIndustries={
        relatedIndustries.length > 0
          ? relatedIndustries
          : fallbackRelated
      }
    />
  );
}