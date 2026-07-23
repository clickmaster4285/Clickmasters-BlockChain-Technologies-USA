// app/locations/[slug]/page.tsx

import type { Metadata } from "next";

import { notFound } from "next/navigation";

import LocationDetailPage from "@/components/locations/LocationDetailPage";

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
    "/media/blockchain.png";

  return {
    title: `${pageTitle} | ClickMasters`,

    description: pageDescription,

    alternates: {
      canonical: canonicalPath,
    },

    openGraph: {
      title: `${pageTitle} | ClickMasters`,

      description: pageDescription,

      url: canonicalPath,

      type: "article",

      images: [
        {
          url: socialImage,

          alt: pageTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: `${pageTitle} | ClickMasters`,

      description: pageDescription,

      images: [socialImage],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
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
    />
  );
}