import { redirect } from "next/navigation";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import ResourceLibrary from "@/components/resources/ResourceLibrary";
import ResourceCTA from "@/components/resources/ResourceCTA";
import { createMetadata } from "@/config/metadata";
import { getPageHref, resolveListingCategory } from "@/lib/pagination";

import {
  getAllResources,
  getResourceCards,
  getResourceCategories,
} from "@/lib/resources";

type ResourcesPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
};

export async function generateMetadata({
  searchParams,
}: ResourcesPageProps) {
  const params = await searchParams;
  const categories = getResourceCategories(getAllResources());
  const selectedCategory = resolveListingCategory(
    categories,
    typeof params?.category === "string" ? params.category : "",
    "",
  );
  const title = selectedCategory
    ? `${selectedCategory} Blockchain Resources`
    : "Blockchain Resources";
  const description = selectedCategory
    ? `Explore blockchain ${selectedCategory.toLowerCase()} resources, with practical guidance for evaluating requirements, implementation choices, and project risks.`
    : "Explore practical blockchain guides, reports, strategic frameworks, technical resources, and project planning insights.";

  return createMetadata({
    title,
    description,
    path: getPageHref("/resources", 1, {
      search: typeof params?.search === "string" ? params.search : undefined,
      category: selectedCategory || undefined,
    }),
  });
}

export default async function ResourcesPage({
  searchParams,
}: ResourcesPageProps) {
  const params = await searchParams;
  const requestedPage = Number(params.page || "1");

  if (Number.isInteger(requestedPage) && requestedPage > 1) {
    redirect(
      getPageHref("/resources", 1, {
        search: typeof params.search === "string" ? params.search : undefined,
        category:
          typeof params.category === "string" ? params.category : undefined,
      }),
    );
  }

  const initialSearch =
    typeof params.search === "string"
      ? params.search
      : "";

  const allResources = getAllResources();
  const resourceCards = getResourceCards(allResources);
  const categories =
    getResourceCategories(allResources);
  const initialCategory = resolveListingCategory(
    categories,
    typeof params.category === "string" ? params.category : "",
    "",
  );

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
