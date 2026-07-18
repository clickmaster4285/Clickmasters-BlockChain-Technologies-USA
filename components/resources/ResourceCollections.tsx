"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookMarked,
  BookOpen,
  Boxes,
  FileText,
  GraduationCap,
  Layers3,
  Sparkles,
} from "lucide-react";

type ResourceItem = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  readTime?: string;
  image?: string;
};

type ResourceCollection = {
  id?: string | number;
  title: string;
  description?: string;
  category?: string;
  href?: string;
  icon?: string;
  resources?: ResourceItem[];
};

type ResourceCollectionsProps = {
  collections?: ResourceCollection[];
  resources?: ResourceItem[];
};

const defaultCollections = [
  {
    title: "Blockchain Fundamentals",
    description:
      "Build a strong foundation with practical resources covering blockchain concepts, architecture, networks, and real-world use cases.",
    category: "Learning Collection",
    icon: "book",
  },
  {
    title: "Business Strategy",
    description:
      "Explore decision-making frameworks, adoption strategies, market insights, and implementation guidance for modern businesses.",
    category: "Strategy Collection",
    icon: "briefcase",
  },
  {
    title: "Technical Development",
    description:
      "Learn development workflows, smart contracts, security practices, infrastructure, and scalable blockchain architecture.",
    category: "Developer Collection",
    icon: "layers",
  },
];

function getCollectionIcon(icon?: string) {
  switch (icon) {
    case "book":
      return BookOpen;

    case "education":
      return GraduationCap;

    case "layers":
      return Layers3;

    case "boxes":
      return Boxes;

    default:
      return BookMarked;
  }
}

function buildCollectionsFromResources(
  resources: ResourceItem[]
): ResourceCollection[] {
  const categoryMap = new Map<string, ResourceItem[]>();

  resources.forEach((resource) => {
    const category =
      resource.category?.trim() || "General Resources";

    if (!categoryMap.has(category)) {
      categoryMap.set(category, []);
    }

    categoryMap.get(category)?.push(resource);
  });

  const generatedCollections = Array.from(
    categoryMap.entries()
  )
    .slice(0, 3)
    .map(([category, items], index) => ({
      id: category,
      title: category,
      category: "Curated Collection",
      description:
        index === 0
          ? "A focused collection of practical resources selected to help you understand the topic and move toward confident execution."
          : index === 1
            ? "Explore relevant insights, guides, and frameworks organized into one easy-to-follow resource collection."
            : "Discover carefully selected resources designed to provide clarity, practical knowledge, and actionable next steps.",
      href: `/resources?category=${encodeURIComponent(
        category
      )}`,
      icon:
        index === 0
          ? "book"
          : index === 1
            ? "layers"
            : "boxes",
      resources: items.slice(0, 4),
    }));

  return generatedCollections;
}

export default function ResourceCollections({
  collections = [],
  resources = [],
}: ResourceCollectionsProps) {
  const generatedCollections =
    collections.length > 0
      ? collections
      : buildCollectionsFromResources(resources);

  const visibleCollections =
    generatedCollections.length > 0
      ? generatedCollections.slice(0, 3)
      : defaultCollections.map(
          (collection, index) => ({
            ...collection,
            id: index + 1,
            href: "/resources",
            resources: [],
          })
        );

  return (
    <section className="relative overflow-hidden bg-[#08111f] py-20 sm:py-24 lg:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(59,130,246,0.07),transparent_30%),radial-gradient(circle_at_82%_75%,rgba(245,158,11,0.08),transparent_28%)]" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="absolute left-[8%] top-[14%] h-56 w-56 rounded-full border border-white/[0.025]" />

        <div className="absolute bottom-[8%] right-[5%] h-72 w-72 rounded-full border border-amber-base/[0.04]" />

        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.025] blur-[130px]" />
      </div>

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/[0.06] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">
              <BookMarked className="h-4 w-4" />
              Curated Collections
            </div>

            <h2 className="mt-6 text-3xl font-black leading-tight tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Structured resources for
              <span className="text-amber-base">
                {" "}
                deeper learning
              </span>
            </h2>
          </div>

          <div className="max-w-xl">
            <p className="text-sm font-medium leading-7 text-[#8f9db1] sm:text-base">
              Explore carefully grouped resources that help
              you move through a topic in a logical order,
              from foundational understanding to practical
              implementation.
            </p>

            <Link
              href="/resources"
              className="group mt-5 inline-flex items-center gap-3 text-sm font-black text-amber-base"
            >
              Browse complete library

              <span className="h-px w-8 bg-amber-base/40 transition-all duration-500 group-hover:w-14" />

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Collections */}
        <div className="grid gap-6 lg:grid-cols-3">
          {visibleCollections.map(
            (collection, index) => {
              const Icon = getCollectionIcon(
                collection.icon
              );

              const collectionResources =
                collection.resources || [];

              const collectionHref =
                collection.href || "/resources";

              return (
                <article
                  key={
                    collection.id ||
                    collection.title
                  }
                  className="animate-resource-collection-reveal group relative min-h-[570px] overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#0e1929]/85 opacity-0 shadow-[0_30px_90px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-base/25 hover:bg-[#101d30]"
                  style={{
                    animationDelay: `${index * 120}ms`,
                  }}
                >
                  {/* Hover glows */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber-base/[0.1] blur-[90px]" />

                    <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/[0.07] blur-[90px]" />
                  </div>

                  {/* Top shine */}
                  <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                  {/* Large collection number */}
                  <span className="pointer-events-none absolute -right-3 top-2 text-[7rem] font-black leading-none tracking-[-0.08em] text-white/[0.025] transition-transform duration-700 group-hover:-translate-x-3 group-hover:translate-y-3">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <div className="relative flex h-full flex-col p-6 sm:p-7">
                    {/* Top */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-13 w-13 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110">
                          <Icon className="h-5 w-5" />
                        </span>

                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-base">
                            {collection.category ||
                              "Resource Collection"}
                          </p>

                          <p className="mt-1 text-xs font-bold text-[#79879b]">
                            {collectionResources.length ||
                              "Multiple"}{" "}
                            resources
                          </p>
                        </div>
                      </div>

                      <Link
                        href={collectionHref}
                        aria-label={`Open ${collection.title}`}
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/[0.09] bg-white/[0.025] text-[#8290a4] transition-all duration-400 hover:-translate-y-1 hover:translate-x-1 hover:border-amber-base/30 hover:bg-amber-base hover:text-[#101827]"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>

                    {/* Title */}
                    <h3 className="mt-8 text-2xl font-black leading-tight tracking-[-0.035em] text-white transition-colors duration-300 group-hover:text-amber-50 sm:text-[1.7rem]">
                      {collection.title}
                    </h3>

                    {collection.description && (
                      <p className="mt-4 text-sm font-medium leading-7 text-[#8997ab]">
                        {collection.description}
                      </p>
                    )}

                    {/* Document stack */}
                    <div className="relative mt-8 h-[190px]">
                      <div className="absolute inset-x-5 top-8 h-[145px] rotate-[5deg] rounded-[1.4rem] border border-white/[0.055] bg-[#142238] transition-transform duration-700 group-hover:translate-x-4 group-hover:rotate-[8deg]" />

                      <div className="absolute inset-x-3 top-4 h-[150px] rotate-[-3deg] rounded-[1.4rem] border border-white/[0.07] bg-[#111e31] transition-transform duration-700 group-hover:-translate-x-3 group-hover:rotate-[-6deg]" />

                      <div className="absolute inset-x-0 top-0 h-[158px] overflow-hidden rounded-[1.4rem] border border-white/[0.09] bg-[#0d1828] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.3)] transition-transform duration-700 group-hover:-translate-y-2">
                        <div className="flex items-center justify-between">
                          <span className="grid h-9 w-9 place-items-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
                            <FileText className="h-4 w-4" />
                          </span>

                          <div className="flex gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
                            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                            <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
                          </div>
                        </div>

                        <div className="mt-5 space-y-3">
                          <div className="h-2.5 w-[74%] rounded-full bg-white/[0.12]" />
                          <div className="h-2 w-full rounded-full bg-white/[0.055]" />
                          <div className="h-2 w-[88%] rounded-full bg-white/[0.055]" />
                          <div className="h-2 w-[62%] rounded-full bg-white/[0.055]" />
                        </div>
                      </div>
                    </div>

                    {/* Resource list */}
                    <div className="mt-3 space-y-2.5">
                      {collectionResources.length > 0 ? (
                        collectionResources
                          .slice(0, 3)
                          .map(
                            (
                              resource,
                              resourceIndex
                            ) => (
                              <Link
                                key={resource.slug}
                                href={`/resources/${resource.slug}`}
                                className="group/item flex items-center gap-3 rounded-xl border border-white/[0.055] bg-white/[0.018] px-3.5 py-3 transition-all duration-300 hover:border-amber-base/20 hover:bg-amber-base/[0.045]"
                              >
                                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-[9px] font-black text-[#7b899e] transition-colors duration-300 group-hover/item:border-amber-base/20 group-hover/item:text-amber-base">
                                  {String(
                                    resourceIndex + 1
                                  ).padStart(2, "0")}
                                </span>

                                <span className="min-w-0 flex-1 truncate text-xs font-bold text-[#aab5c5] transition-colors duration-300 group-hover/item:text-white">
                                  {resource.title}
                                </span>

                                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#59677b] transition-all duration-300 group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5 group-hover/item:text-amber-base" />
                              </Link>
                            )
                          )
                      ) : (
                        <>
                          {[
                            "Foundational overview",
                            "Practical implementation",
                            "Expert recommendations",
                          ].map(
                            (
                              fallbackItem,
                              fallbackIndex
                            ) => (
                              <div
                                key={fallbackItem}
                                className="flex items-center gap-3 rounded-xl border border-white/[0.055] bg-white/[0.018] px-3.5 py-3"
                              >
                                <span className="grid h-7 w-7 place-items-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-[9px] font-black text-[#7b899e]">
                                  {String(
                                    fallbackIndex + 1
                                  ).padStart(2, "0")}
                                </span>

                                <span className="text-xs font-bold text-[#aab5c5]">
                                  {fallbackItem}
                                </span>
                              </div>
                            )
                          )}
                        </>
                      )}
                    </div>

                    {/* Bottom */}
                    <div className="mt-auto pt-7">
                      <div className="h-px bg-gradient-to-r from-white/[0.08] via-white/[0.035] to-transparent" />

                      <Link
                        href={collectionHref}
                        className="group/link mt-5 flex items-center justify-between gap-4"
                      >
                        <span className="inline-flex items-center gap-2 text-sm font-black text-amber-base">
                          Explore collection

                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                        </span>

                        <span className="h-px w-10 bg-amber-base/30 transition-all duration-500 group-hover/link:w-16" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            }
          )}
        </div>

        {/* Bottom banner */}
        <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0d1828]/85 p-6 backdrop-blur-xl sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-amber-base/[0.1] blur-[90px]" />

          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-blue-500/[0.07] blur-[80px]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl border border-blue-400/20 bg-blue-400/[0.08] text-blue-300">
                <Sparkles className="h-5 w-5" />
              </span>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">
                  Personalized Learning
                </p>

                <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
                  Build your own resource journey
                </h3>

                <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-[#8c99ac]">
                  Combine guides, reports, technical
                  resources, and strategic insights based on
                  your current goals and experience level.
                </p>
              </div>
            </div>

            <Link
              href="/resources"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-amber-base px-7 py-3.5 text-sm font-black text-[#101827] shadow-[0_16px_40px_rgba(245,158,11,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-[0_22px_48px_rgba(245,158,11,0.28)] lg:w-auto"
            >
              Explore All Resources

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}