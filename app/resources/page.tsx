import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import ResourceLibrary from "@/components/resources/ResourceLibrary";
import ResourceCTA from "@/components/resources/ResourceCTA";
import { createMetadata } from "@/config/metadata";
import { getPageHref } from "@/lib/pagination";

import {
  getAllResources,
  getResourceCards,
  getResourceCategories,
} from "@/lib/resources";

type ResourcesPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: ResourcesPageProps) {
  const params = await searchParams;

  return createMetadata({
    title:
      "Resources | Guides, Research and Practical Insights | ClickMasters",
    description:
      "Explore practical guides, reports, strategic frameworks, technical resources, and expert insights from ClickMasters.",
    path: getPageHref("/resources", 1, {
      search: typeof params?.search === "string" ? params.search : undefined,
      category:
        typeof params?.category === "string" ? params.category : undefined,
    }),
  });
}

export default async function ResourcesPage({
  searchParams,
}: ResourcesPageProps) {
  const params = await searchParams;

  const initialSearch =
    typeof params.search === "string"
      ? params.search
      : "";

  const requestedCategory =
    typeof params.category === "string"
      ? params.category
      : "";

  const allResources = getAllResources();
  const resourceCards = getResourceCards(allResources);
  const categories =
    getResourceCategories(allResources);
  const initialCategory =
    categories.find(
      (category) =>
        category.toLowerCase() === requestedCategory.toLowerCase()
    ) || requestedCategory;

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
