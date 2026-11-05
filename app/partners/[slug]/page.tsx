// app/partners/[slug]/page.tsx

import type { Metadata } from "next";

import { notFound } from "next/navigation";

import PartnerDetailPage from "@/components/partners/PartnerDetailPage";
import RelatedLinks from "@/components/RelatedLinks";
import { createMetadata } from "@/config/metadata";

import {
  getPartnerBySlug,
  getPartnerSlugs,
  getRelatedPartners,
} from "@/lib/partner";

/* =========================================================
   Types
========================================================= */

type PartnerPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================================================
   Static Parameters
========================================================= */

export function generateStaticParams() {
  return getPartnerSlugs().map((slug) => ({
    slug,
  }));
}

/* =========================================================
   Dynamic Metadata
========================================================= */

export async function generateMetadata({
  params,
}: PartnerPageProps): Promise<Metadata> {
  const { slug } = await params;

  const partner = getPartnerBySlug(slug);

  if (!partner) {
    return {
      title: "Partner Not Found | ClickMasters",

      description:
        "The requested blockchain technology partner page could not be found.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageTitle =
    partner.hero?.title || partner.title;

  const pageDescription =
    partner.hero?.description ||
    partner.excerpt;

  const canonicalUrl = `/partners/${partner.slug}`;

  const image =
    partner.hero?.image || partner.image;

  return createMetadata({
    title: pageTitle,
    description: pageDescription,
    path: canonicalUrl,
    image,
    type: "article",
    publishedTime: partner.date || undefined,
    authors: partner.author ? [partner.author] : undefined,
  });
}

/* =========================================================
   Page
========================================================= */

export default async function PartnerPage({
  params,
}: PartnerPageProps) {
  const { slug } = await params;

  const partner = getPartnerBySlug(slug);

  if (!partner) {
    notFound();
  }

  const relatedPartners =
    getRelatedPartners(partner.slug, 3);

  return (
    <PartnerDetailPage
      partner={partner}
      relatedPartners={relatedPartners}
      relatedLinks={
        <RelatedLinks type="partners" slug={partner.slug} />
      }
    />
  );
}