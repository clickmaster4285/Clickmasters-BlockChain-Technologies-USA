import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

type MetadataType = "website" | "article";

type CreateMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: MetadataType;
  keywords?: string[];
  noIndex?: boolean;
};

function normalizePath(path: string) {
  if (!path || path === "/") return "/";

  return path.startsWith("/") ? path : `/${path}`;
}

function absoluteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }

  return new URL(normalizePath(pathOrUrl), siteConfig.url).toString();
}

function titleWithBrand(title: string) {
  return title.toLowerCase().includes(siteConfig.name.toLowerCase())
    ? title
    : `${title} | ${siteConfig.name}`;
}

export function createMetadata({
  title,
  description,
  path = "/",
  image = siteConfig.logo,
  type = "website",
  keywords,
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const fullTitle = titleWithBrand(title);
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title: fullTitle,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      locale: "en_US",
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
