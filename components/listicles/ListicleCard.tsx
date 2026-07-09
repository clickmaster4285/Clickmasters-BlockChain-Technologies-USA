import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Star,
} from "lucide-react";

export default function ListicleCard({
  item,
  index,
}: {
  item: any;
  index: number;
}) {
  return (
    <Link
      href={`/listicles/${item.slug}`}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-surface/80 p-6 shadow-[0_20px_70px_rgba(0,0,0,.25)] transition-all duration-300 hover:-translate-y-2 hover:border-amber-base/40"
    >
      {/* Glow */}
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-base/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col">
        {/* Top */}

        <div className="mb-5 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-base/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-amber-base">
            <Star className="h-3.5 w-3.5" />
            {item.badge || "Top Picks"}
          </span>

          <span className="text-xs font-bold text-silver">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}

        <h3 className="min-h-[82px] text-2xl font-black leading-tight text-text-primary transition-colors duration-300 group-hover:text-amber-base">
          {item.title}
        </h3>

        {/* Description */}

        <p className="mt-4 min-h-[100px] text-sm leading-7 text-silver">
          {item.excerpt}
        </p>

        {/* Meta */}

        <div className="mt-5 flex flex-wrap gap-2">
          {item.category && (
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-silver">
              {item.category}
            </span>
          )}

          {item.readTime && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-silver">
              <Clock className="h-3.5 w-3.5 text-amber-base" />
              {item.readTime}
            </span>
          )}

          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-silver">
            <BookOpen className="h-3.5 w-3.5 text-amber-base" />
            Curated
          </span>
        </div>

        {/* Bottom */}

        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-sm font-bold text-amber-base">
            View Full List
          </span>

          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:border-amber-base/40 group-hover:bg-amber-base group-hover:text-bg-base">
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}