import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import ListicleHero from "@/components/listicles/ListicleHero";
import ListicleContent from "@/components/listicles/ListicleContent";
import ListicleFAQ from "@/components/listicles/ListicleFAQ";
import ListicleCTA from "@/components/listicles/ListicleCTA";
import ListicleSidebar from "@/components/listicles/ListicleSidebar";
import {
  estimateListicleReadTime,
  getAllListicles,
  getListicleBySlug,
  getListicleCta,
  getRelatedListicles,
} from "@/lib/listicles";

export async function generateStaticParams() {
  return getAllListicles().map((item: any) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getListicleBySlug(slug);

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

export default async function SingleListiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item = getListicleBySlug(slug);

  if (!item) return notFound();

  const readTime = estimateListicleReadTime(item);
  const related = getRelatedListicles(slug, 4);
  const cta = getListicleCta(item);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-surface/40 to-bg-base pt-32 pb-24">
        <div className="pointer-events-none absolute left-[-14rem] top-[-10rem] h-[32rem] w-[32rem] rounded-full bg-amber-base/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-12rem] top-80 h-[28rem] w-[28rem] rounded-full bg-amber-base/10 blur-3xl" />

        <section className="container relative mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-silver">
            <Link href="/" className="hover:text-amber-base">
              Home
            </Link>
            <span>/</span>
            <Link href="/listicles" className="hover:text-amber-base">
              Listicles
            </Link>
            <span>/</span>
            <span className="text-silver-light">{item.title}</span>
          </nav>

          <ListicleHero item={item} readTime={readTime} />

          <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <ListicleContent item={item} cta={cta} />

            <ListicleSidebar
              item={item}
              related={related}
              readTime={readTime}
            />
          </section>

          <ListicleFAQ item={item} />

          <div className="mt-6">
            <ListicleCTA
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