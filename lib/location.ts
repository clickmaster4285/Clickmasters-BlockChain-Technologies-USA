// lib/location.ts

import locationsData from "@/data/locations";

/* =========================================================
   Location Content Types
========================================================= */

export type LocationContentBlock = {
  type:
    | "featuredAnswer"
    | "heading"
    | "paragraph"
    | "list"
    | "table"
    | "code";

  text?: string;

  level?: 2 | 3 | 4;

  items?: string[];

  headers?: string[];

  rows?: string[][];

  language?: string;
};

/* =========================================================
   FAQ Type
========================================================= */

export type LocationFAQ = {
  question: string;
  answer: string;
};

/* =========================================================
   CTA Type
========================================================= */

export type LocationCTA = {
  title: string;

  description: string;

  primaryText: string;

  primaryLink?: string;

  secondaryText?: string;

  secondaryLink?: string;
};

/* =========================================================
   Hero Type
========================================================= */

export type LocationHero = {
  badge?: string;

  title?: string;

  description?: string;

  image?: string;
};

/* =========================================================
   Complete Location Entry Type
========================================================= */

export type LocationEntry = {
  id: number | string;

  slug: string;

  title: string;

  excerpt: string;

  category?: string;

  country?: string;

  city?: string;

  region?: string;

  author?: string;

  date?: string;

  readTime?: string;

  image?: string;

  hero?: LocationHero;

  credibility?: string[];

  content?: LocationContentBlock[];

  faqs?: LocationFAQ[];

  cta?: LocationCTA;
};

const locationImageFallbacks = [
  "/media/hero.jpg",
  "/media/hero-bg.png",
  "/media/services-bg.jpeg",
  "/media/portfolio-bg.jpeg",
  "/media/dominate-bg.jpeg",
  "/media/cta-bg.png",
  "/media/testimonials-bg.jpg",
  "/media/blockchain.png",
];

const locationImageBySlug: Record<string, string> = {
  "blockchain-development-new-york": "/media/hero.jpg",
  "blockchain-development-san-francisco": "/media/portfolio-bg.jpeg",
  "blockchain-development-chicago": "/media/services-bg.jpeg",
  "blockchain-development-miami": "/media/cta-bg.png",
  "blockchain-development-austin": "/media/dominate-bg.jpeg",
  "blockchain-development-los-angeles": "/media/hero-bg.png",
  "blockchain-development-seattle": "/media/testimonials-bg.jpg",
  "blockchain-development-boston": "/media/blockchain.png",
  "blockchain-development-denver": "/media/services-bg.jpeg",
  "blockchain-development-phoenix": "/media/cta-bg.png",
  "blockchain-development-dallas": "/media/dominate-bg.jpeg",
  "blockchain-development-atlanta": "/media/portfolio-bg.jpeg",
  "blockchain-development-houston": "/media/hero.jpg",
  "blockchain-development-las-vegas": "/media/hero-bg.png",
  "blockchain-development-charlotte": "/media/services-bg.jpeg",
  "blockchain-development-nashville": "/media/testimonials-bg.jpg",
  "blockchain-development-portland": "/media/portfolio-bg.jpeg",
  "blockchain-development-detroit": "/media/dominate-bg.jpeg",
  "blockchain-development-indianapolis": "/media/blockchain.png",
  "blockchain-development-san-diego": "/media/cta-bg.png",
};

function getFallbackImage(slug: string) {
  const hash = slug
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0);

  return locationImageFallbacks[
    hash % locationImageFallbacks.length
  ];
}

function normalizeLocationImage(
  image: string | undefined,
  slug: string,
) {
  const mappedImage =
    locationImageBySlug[slug] || getFallbackImage(slug);

  const normalizedImage =
    typeof image === "string" ? image.trim() : "";

  if (!normalizedImage) {
    return mappedImage;
  }

  if (
    normalizedImage.startsWith("/assets/") &&
    normalizedImage.endsWith("-location.webp")
  ) {
    return mappedImage;
  }

  return normalizedImage;
}

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return Boolean(
    value &&
      typeof value === "object" &&
      !Array.isArray(value),
  );
}

function isLocationEntry(
  location: unknown,
): location is LocationEntry {
  if (!isRecord(location)) {
    return false;
  }

  return (
    typeof location.slug === "string" &&
    location.slug.trim().length > 0 &&
    typeof location.title === "string" &&
    location.title.trim().length > 0
  );
}

/* =========================================================
   Normalize Location Data
========================================================= */

const rawLocations: unknown[] = (
  Array.isArray(locationsData)
    ? locationsData
    : []
);

const normalizedLocations: LocationEntry[] = rawLocations
  .filter(isLocationEntry)
  .map((location) => ({
    ...location,

    slug: location.slug.trim(),

    title: location.title.trim(),

    excerpt:
      typeof location.excerpt === "string"
        ? location.excerpt.trim()
        : "",

    image: normalizeLocationImage(
      location.image,
      location.slug.trim(),
    ),

    credibility: Array.isArray(location.credibility)
      ? location.credibility.filter(
          (item): item is string =>
            typeof item === "string" &&
            item.trim().length > 0,
        )
      : [],

    content: Array.isArray(location.content)
      ? location.content
      : [],

    faqs: Array.isArray(location.faqs)
      ? location.faqs.filter(
          (faq): faq is LocationFAQ =>
            Boolean(
              faq &&
                typeof faq.question === "string" &&
                faq.question.trim().length > 0 &&
                typeof faq.answer === "string" &&
                faq.answer.trim().length > 0,
            ),
        )
      : [],
  }));

/* =========================================================
   Public Functions
========================================================= */

/**
 * Return all valid location entries.
 */
export function getLocations(): LocationEntry[] {
  return normalizedLocations;
}

/**
 * Alias for location cards used by the listing page.
 */
export function getLocationCards(): LocationEntry[] {
  return normalizedLocations;
}

/**
 * Find one location using its slug.
 */
export function getLocationBySlug(
  slug: string,
): LocationEntry | undefined {
  const normalizedSlug = decodeURIComponent(slug)
    .trim()
    .toLowerCase();

  return normalizedLocations.find(
    (location) =>
      location.slug.toLowerCase() === normalizedSlug,
  );
}

/**
 * Check whether a location slug exists.
 */
export function locationExists(slug: string): boolean {
  return Boolean(getLocationBySlug(slug));
}

/**
 * Return all slugs for generateStaticParams.
 */
export function getLocationSlugs(): string[] {
  return normalizedLocations.map(
    (location) => location.slug,
  );
}

/**
 * Return related locations.
 *
 * Priority:
 * 1. Same country
 * 2. Same region
 * 3. Same category
 * 4. Remaining locations
 */
export function getRelatedLocations(
  currentSlug: string,
  limit = 3,
): LocationEntry[] {
  const currentLocation =
    getLocationBySlug(currentSlug);

  if (!currentLocation) {
    return normalizedLocations.slice(0, limit);
  }

  return normalizedLocations
    .filter(
      (location) =>
        location.slug !== currentLocation.slug,
    )
    .map((location) => {
      let relevanceScore = 0;

      if (
        currentLocation.country &&
        location.country === currentLocation.country
      ) {
        relevanceScore += 4;
      }

      if (
        currentLocation.region &&
        location.region === currentLocation.region
      ) {
        relevanceScore += 3;
      }

      if (
        currentLocation.category &&
        location.category ===
          currentLocation.category
      ) {
        relevanceScore += 2;
      }

      return {
        location,
        relevanceScore,
      };
    })
    .sort(
      (first, second) =>
        second.relevanceScore -
        first.relevanceScore,
    )
    .slice(0, Math.max(0, limit))
    .map(({ location }) => location);
}

/**
 * Return the total number of locations.
 */
export function getLocationsCount(): number {
  return normalizedLocations.length;
}

/**
 * Return all unique countries.
 */
export function getLocationCountries(): string[] {
  return Array.from(
    new Set(
      normalizedLocations
        .map((location) => location.country)
        .filter(
          (country): country is string =>
            typeof country === "string" &&
            country.trim().length > 0,
        ),
    ),
  ).sort((first, second) =>
    first.localeCompare(second),
  );
}

/**
 * Return locations belonging to a country.
 */
export function getLocationsByCountry(
  country: string,
): LocationEntry[] {
  const normalizedCountry = country
    .trim()
    .toLowerCase();

  return normalizedLocations.filter(
    (location) =>
      location.country?.toLowerCase() ===
      normalizedCountry,
  );
}
