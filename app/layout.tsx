import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";

import { SmoothScroll } from "@/components/landing/SmoothScroll";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import { createMetadata } from "@/config/metadata";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import "./styles.css";

const { alternates: _rootCanonical, ...rootMetadata } = createMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
});

export const metadata: Metadata = {
  ...rootMetadata,
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  verification: {
    google: "OTGeetIUGUb8E8ejJ8bHzYUfGlYl6SlUGa6-FdtJ82E",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <BreadcrumbJsonLd />
        <ViewTransitions>
          <Providers>
            <SmoothScroll />
            {children}
          </Providers>
        </ViewTransitions>
      </body>
    </html>
  );
}
