"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Breadcrumb({ title }: { title: string }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  const getPageNameFromSlug = () => {
    if (!pathname) return title;
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    
    return lastSegment
      ?.split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") || title;
  };

  const pageName = getPageNameFromSlug();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <nav className="site-container mx-auto px-4 pt-4 pb-2">
      <ol className={`flex flex-wrap items-center gap-2 text-xs transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}>
        {/* Home with icon - Slide animation */}
        <li className="flex items-center gap-2">
          <Link 
            href="/" 
            className="group flex items-center gap-1.5 text-[var(--text-muted)] transition-all duration-300 hover:text-[var(--amber-base)]"
          >
            <svg 
              className="h-3.5 w-3.5 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="font-medium">Home</span>
          </Link>
        </li>

        {/* Separator with pulse animation */}
        <li className="flex items-center">
          <span className="text-[var(--text-muted)]/30 animate-pulse">›</span>
        </li>

        {/* Cost Guides with underline animation */}
        <li className="flex items-center">
          <Link 
            href="/cost" 
            className="group relative text-[var(--text-muted)] transition-all duration-300 hover:text-[var(--amber-base)]"
          >
            Cost Guides
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--amber-base)] transition-all duration-300 group-hover:w-full" />
          </Link>
        </li>

        {/* Separator */}
        <li className="flex items-center">
          <span className="text-[var(--text-muted)]/30">›</span>
        </li>

        {/* Current page with scale and glow animation */}
        <li className="flex items-center">
          <span 
            className="relative flex items-center gap-2 rounded-full bg-[var(--amber-glow)] px-3 py-1 font-medium text-[var(--amber-base)] shadow-glow animate-pulse"
            aria-current="page"
          >
            {/* Glowing dot */}
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--amber-base)]/60 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--amber-base)]" />
            </span>
            
            {pageName}
          </span>
        </li>
      </ol>
    </nav>
  );
}