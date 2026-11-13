import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";

import { SmoothScroll } from "@/components/landing/SmoothScroll";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/structured-data";
import { createMetadata } from "@/config/metadata";
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import ErpPageEdits from "@/components/cms/ErpPageEdits";
import { CmsNavigationProvider, type NavLink } from "@/components/cms/CmsNavigation";
import { safeHref } from "@/components/cms/cmsContent";
import { getCmsSite, type CmsNavItem } from "@/lib/cms/cms";
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

// ERP nav items → safe links (unsafe URLs become plain labels).
function toNavLinks(items: CmsNavItem[]): NavLink[] {
  return items.map((i) => ({
    id: i.id,
    label: i.label,
    url: safeHref(i.url),
    target: i.target,
    children: toNavLinks(i.children),
  }));
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ERP header/footer navigation (cached 60s; null when the ERP is down).
  const site = await getCmsSite();
  const nav = site
    ? { header: toNavLinks(site.navigation.header), footer: toNavLinks(site.navigation.footer) }
    : null;

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        {/* Applies ERP page edits; must stay before the page tree (see the component). */}
        <ErpPageEdits />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <BreadcrumbJsonLd />
        <ViewTransitions>
          <Providers>
            <CmsNavigationProvider nav={nav}>
              <SmoothScroll />
              {children}
            </CmsNavigationProvider>
          </Providers>
        </ViewTransitions>
      </body>
    </html>
  );
}
