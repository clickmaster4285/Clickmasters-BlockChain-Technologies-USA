import type { Metadata } from "next";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import ResourceLibrary from "@/components/resources/ResourceLibrary";
import ResourceCTA from "@/components/resources/ResourceCTA";

import {
  getAllResources,
  getResourceCards,
  getResourceCategories,
} from "@/lib/resources";

export const metadata: Metadata = {
  title:
    "Resources | Guides, Research and Practical Insights | ClickMasters",

  description:
    "Explore practical guides, reports, strategic frameworks, technical resources, and expert insights from ClickMasters.",

  alternates: {
    canonical: "/resources",
  },

  openGraph: {
    title: "ClickMasters Resources",
    description:
      "Explore practical guides, research, frameworks, and expert insights.",
    url: "/resources",
    siteName: "ClickMasters",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ClickMasters Resources",
    description:
      "Explore practical resources, reports, and strategic insights.",
  },
};

type ResourcesPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
};

export default async function ResourcesPage({
  searchParams,
}: ResourcesPageProps) {
  const params = await searchParams;

  const initialSearch =
    typeof params.search === "string"
      ? params.search
      : "";

  const initialCategory =
    typeof params.category === "string"
      ? params.category
      : "";

  const allResources = getAllResources();
  const resourceCards = getResourceCards(allResources);
  const categories =
    getResourceCategories(allResources);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="overflow-hidden bg-gradient-to-b from-bg-base via-surface/40 to-bg-base">
        <ResourceLibrary
          resources={resourceCards}
          categories={categories}
          initialSearch={initialSearch}
          initialCategory={initialCategory}
          resourcesPerPage={9}
        />

        <ResourceCTA />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
