import type { Metadata } from "next";

import FAQCTA from "@/components/faqs/FAQCTA";
import FAQHero from "@/components/faqs/FAQHero";
import FAQsClient from "@/components/faqs/FAQsClient";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import { createMetadata } from "@/config/metadata";
import { getAllFAQs } from "@/lib/faqs";
import { getPageHref, withPageContext } from "@/lib/pagination";

type FAQsPageProps = {
  searchParams?: Promise<{
    page?: string | string[];
  }>;
};

const CARDS_PER_PAGE = 12;

function getCurrentPage(page?: string | string[]) {
  const rawPage = Array.isArray(page) ? page[0] : page;
  const parsedPage = Number.parseInt(rawPage || "1", 10);

  return Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
}

export async function generateMetadata({
  searchParams,
}: FAQsPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const faqs = getAllFAQs();
  const totalPages = Math.max(
    Math.ceil(faqs.length / CARDS_PER_PAGE),
    1,
  );
  const currentPage = Math.min(
    getCurrentPage(resolvedSearchParams?.page),
    totalPages,
  );
  const metadata = withPageContext(
    "Blockchain FAQs",
    "Find answers about blockchain services, development workflows, project pricing, technology choices, delivery, maintenance, and support.",
    currentPage,
    totalPages,
  );

  return createMetadata({
    ...metadata,
    path: getPageHref("/faqs", currentPage),
  });
}

export default async function FAQsPage({
  searchParams,
}: FAQsPageProps) {
  const resolvedSearchParams = await searchParams;
  const faqs = getAllFAQs();
  const requestedPage = getCurrentPage(resolvedSearchParams?.page);
  const totalPages = Math.max(
    1,
    Math.ceil(faqs.length / CARDS_PER_PAGE)
  );
  const currentPage = Math.min(requestedPage, totalPages);
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const paginatedFAQs = faqs.slice(
    startIndex,
    startIndex + CARDS_PER_PAGE
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-bg-base text-text-primary">
        <FAQHero
          totalQuestions={faqs.length}
          pageContext={
            currentPage > 1
              ? `Page ${currentPage} of ${totalPages}`
              : undefined
          }
        />

        <FAQsClient
          items={paginatedFAQs}
          totalItems={faqs.length}
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
        />

        <FAQCTA />
      </main>

      <Footer />
    </>
  );
}
