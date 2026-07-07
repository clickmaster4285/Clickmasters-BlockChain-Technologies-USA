import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

export default function HowToCard({
  item,
  index,
}: {
  item: any;
  index: number;
}) {
  return (
    <Link
      href={`/howto/${item.slug}`}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface/80 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-2 hover:border-amber-base/40"
    >
      <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-amber-base/10 blur-3xl" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-base/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-amber-base">
            <BookOpen className="h-3.5 w-3.5" />
            {item.badge || "Guide"}
          </span>

          <span className="text-xs text-silver">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="min-h-[78px] text-xl font-black leading-tight text-text-primary transition-colors group-hover:text-amber-base">
          {item.title}
        </h3>

        <p className="mt-4 min-h-[96px] text-sm leading-6 text-silver">
          {item.excerpt}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {item.category && (
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-silver">
              {item.category}
            </span>
          )}

          {item.readTime && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-xs text-silver">
              <Clock className="h-3.5 w-3.5 text-amber-base" />
              {item.readTime}
            </span>
          )}
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-amber-base">
          Read step-by-step guide
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}