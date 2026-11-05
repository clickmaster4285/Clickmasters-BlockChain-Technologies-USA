// app/locations/[slug]/page.tsx

import type { Metadata } from "next";

import { notFound } from "next/navigation";

import LocationDetailPage from "@/components/locations/LocationDetailPage";
import RelatedLinks from "@/components/RelatedLinks";
import { createMetadata } from "@/config/metadata";

import {
  getLocationBySlug,
  getLocationSlugs,
  getRelatedLocations,
} from "@/lib/location";

/* =========================================================
   Types
========================================================= */

type LocationSlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/* =========================================================
   Static Params
========================================================= */

export function generateStaticParams() {
  return getLocationSlugs().map((slug) => ({
    slug,
  }));
}

/* =========================================================
   Dynamic Metadata
========================================================= */

export async function generateMetadata({
  params,
}: LocationSlugPageProps): Promise<Metadata> {
  const { slug } = await params;

  const location = getLocationBySlug(slug);

  if (!location) {
    return {
      title: "Location Not Found | ClickMasters",

      description:
        "The requested blockchain development location page could not be found.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageTitle =
    location.title ||
    "Blockchain Development Services";

  const pageDescription =
    location.excerpt ||
    `Explore blockchain development services, enterprise solutions, technical expertise, and regional delivery capabilities in ${
      location.city ||
      location.country ||
      location.region ||
      "this location"
    }.`;

  const canonicalPath = `/locations/${location.slug}`;

  const socialImage =
    location.hero?.image ||
    location.image ||
    "/media/blockchain.webp";

  return createMetadata({
    title: pageTitle,
    description: pageDescription,
    path: canonicalPath,
    image: socialImage,
    type: "article",
  });
}

/* =========================================================
   Page
========================================================= */

export default async function LocationSlugPage({
  params,
}: LocationSlugPageProps) {
  const { slug } = await params;

  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const relatedLocations = getRelatedLocations(
    location.slug,
    3,
  );

  return (
    <LocationDetailPage
      location={location}
      relatedLocations={relatedLocations}
      relatedLinks={
        <RelatedLinks type="locations" slug={location.slug} />
      }
    />
  );
}