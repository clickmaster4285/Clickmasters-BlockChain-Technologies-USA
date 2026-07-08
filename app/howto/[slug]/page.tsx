import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import HowToHero from "@/components/howto/HowToHero";
import HowToContent from "@/components/howto/HowToContent";
import HowToFAQ from "@/components/howto/HowToFAQ";
import HowToCTA from "@/components/howto/HowToCTA";
import HowToSidebar from "@/components/howto/HowToSidebar";
import {
  estimateHowToReadTime,
  getAllHowTos,
  getHowToBySlug,
  getHowToCta,
  getRelatedHowTos,
} from "@/lib/howto";

export async function generateStaticParams() {
  return getAllHowTos().map((item: any) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getHowToBySlug(slug);

  if (!item) return {};

  return {
    title: `${item.title} — ClickMasters`,
    description: item.excerpt || item.hero?.description || item.title,
    openGraph: {
      title: `${item.title} — ClickMasters`,
      description: item.excerpt || item.hero?.description || item.title,
    },
  };
}

export default async function SingleHowToPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item = getHowToBySlug(slug);

  if (!item) return notFound();

  const readTime = estimateHowToReadTime(item);
  const related = getRelatedHowTos(slug, 4);
  const cta = getHowToCta(item);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-surface/40 to-bg-base pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24">
        <div className="pointer-events-none absolute left-[-14rem] top-[-10rem] h-[32rem] w-[32rem] rounded-full bg-amber-base/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-12rem] top-80 h-[28rem] w-[28rem] rounded-full bg-amber-base/10 blur-3xl" />

        <section className="site-container relative px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-silver">
            <Link href="/" className="hover:text-amber-base">
              Home
            </Link>
            <span>/</span>
            <Link href="/howto" className="hover:text-amber-base">
              How-To Guides
            </Link>
            <span>/</span>
            <span className="text-silver-light">{item.title}</span>
          </nav>

          <HowToHero item={item} readTime={readTime} />

          <section className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px]">
            <HowToContent item={item} cta={cta} />

            <HowToSidebar
              item={item}
              related={related}
              readTime={readTime}
            />
          </section>

          <HowToFAQ item={item} />

          <div className="mt-6">
            <HowToCTA
              cta={cta}
              title={cta.title}
              description={cta.description}
            />
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}