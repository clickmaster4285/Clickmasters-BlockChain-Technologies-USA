import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Newspaper } from "lucide-react";

export default function NewsCard({
  item,
  index,
  featured = false,
}: {
  item: any;
  index: number;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-surface/80 shadow-[0_20px_70px_rgba(0,0,0,.25)] transition-all duration-300 hover:-translate-y-2 hover:border-amber-base/40 ${
        featured ? "p-4 md:p-5" : "p-5"
      }`}
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-base/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col">
      <div className="mb-6 flex items-center justify-between">
  <span className="inline-flex items-center gap-2 rounded-full bg-amber-base/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-base">
    <Newspaper className="h-4 w-4" />
    {item.badge || item.category || "News"}
  </span>

  <span className="text-xs font-bold text-silver">
    #{index + 1}
  </span>
</div>

        <div className="mb-4 flex items-center justify-between gap-3 text-xs text-silver">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-amber-base" />
            {item.date || "Latest"}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5 text-amber-base" />
            {item.readTime || "News"}
          </span>
        </div>

        <h3
          className={`font-black leading-tight text-text-primary transition-colors duration-300 group-hover:text-amber-base ${
            featured ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          {item.title}
        </h3>

        <p className="mt-4 flex-1 text-sm leading-7 text-silver">
          {item.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
          <span className="text-sm font-bold text-amber-base">
            Read full story
          </span>

          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-300 group-hover:border-amber-base/40 group-hover:bg-amber-base group-hover:text-bg-base">
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}