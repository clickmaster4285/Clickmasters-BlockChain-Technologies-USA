import Link from "next/link";
import { ArrowRight, GitCompare } from "lucide-react";

export default function ComparisonHero({
  article,
  readTime,
}: {
  article: any;
  readTime: number;
}) {
  return (
    <section className="rounded-[2.5rem] border border-white/10 bg-surface/80 px-6 py-10 shadow-[0_30px_100px_rgba(0,0,0,0.22)] backdrop-blur-2xl md:px-12 md:py-14">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-base">
            <GitCompare className="h-4 w-4" />
            {article.hero?.badge || "Comparison"}
          </div>

          <div>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-text-primary md:text-5xl">
              {article.hero?.title || article.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-silver">
              {article.hero?.description || article.excerpt}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-base">Read time</p>
              <p className="mt-2 text-xl font-black text-text-primary">{readTime} min</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-base">Category</p>
              <p className="mt-2 text-xl font-black text-text-primary">{article.category || "Blockchain"}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-base">FAQ</p>
              <p className="mt-2 text-xl font-black text-text-primary">{article.faqs?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-amber-base/10 p-8">
          <div className="rounded-3xl bg-white/5 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-base">Quick summary</p>
            <p className="mt-4 text-sm leading-7 text-silver">{article.excerpt || article.hero?.description}</p>
          </div>

          <div className="mt-7 grid gap-4">
            <div className="rounded-3xl bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-base">Author</p>
              <p className="mt-3 text-lg font-semibold text-text-primary">{article.author || "ClickMasters Team"}</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-base">Published</p>
              <p className="mt-3 text-lg font-semibold text-text-primary">{article.date || "2025"}</p>
            </div>
          </div>

          <Link
            href="/contact"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-base px-5 py-3 text-sm font-bold text-bg-base transition-transform hover:-translate-y-0.5"
          >
            Book a Call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
