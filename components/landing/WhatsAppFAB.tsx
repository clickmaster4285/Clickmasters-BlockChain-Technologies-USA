"use client";

import { useEffect, useRef, useState } from "react";

const WA_HREF =
  "https://wa.me/13252024074?text=Hi%20ClickMasters!%20I%27m%20interested%20in%20building%20a%20blockchain%20app.";
const SEEN_KEY = "cm_whatsapp_seen";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  );
}

export function WhatsAppFAB() {
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [autoExpandedOnce, setAutoExpandedOnce] = useState(false);
  const [scrollFaded, setScrollFaded] = useState(true); // hero region
  const [isMobile, setIsMobile] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [showDot, setShowDot] = useState(false);
  const collapseTimer = useRef<number | undefined>(undefined);
  const nudgeTimer = useRef<number | undefined>(undefined);

  // Initial mount: 3s delay, mobile check, notification dot
  useEffect(() => {
    const t = window.setTimeout(() => setMounted(true), 1500);
    const mql = window.matchMedia("(max-width: 768px)");
    const updateMobile = () => setIsMobile(mql.matches);
    updateMobile();
    mql.addEventListener?.("change", updateMobile);

    try {
      const seen = Number(localStorage.getItem(SEEN_KEY) ?? "0");
      if (seen < 2) {
        setShowDot(true);
        localStorage.setItem(SEEN_KEY, String(seen + 1));
      }
    } catch {
      /* ignore */
    }

    return () => {
      window.clearTimeout(t);
      mql.removeEventListener?.("change", updateMobile);
    };
  }, []);

  // Scroll watcher: auto-expand once past 30% of page; fade in hero region
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollFaded(y < window.innerHeight * 0.9);
      if (!autoExpandedOnce && y / max > 0.3) {
        setAutoExpandedOnce(true);
        setExpanded(true);
        window.clearTimeout(collapseTimer.current);
        collapseTimer.current = window.setTimeout(() => setExpanded(false), 4000);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(collapseTimer.current);
    };
  }, [autoExpandedOnce]);

  // Idle nudge after 30s without interaction
  useEffect(() => {
    const reset = () => {
      window.clearTimeout(nudgeTimer.current);
      nudgeTimer.current = window.setTimeout(() => {
        setNudge(true);
        window.setTimeout(() => setNudge(false), 700);
      }, 30000);
    };
    const events: (keyof DocumentEventMap)[] = ["mousemove", "scroll", "keydown", "touchstart"];
    events.forEach((e) => document.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      events.forEach((e) => document.removeEventListener(e, reset));
      window.clearTimeout(nudgeTimer.current);
    };
  }, []);

  if (!mounted) return null;

  const shownExpanded = isMobile || expanded;
  const baseOpacity = scrollFaded ? "opacity-60" : "opacity-100";
  const baseScale = scrollFaded ? "scale-90" : "scale-100";

  return (
    <a
      href={WA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      role="link"
      aria-label="Chat with ClickMasters on WhatsApp"
      onMouseEnter={() => {
        setExpanded(true);
        window.clearTimeout(collapseTimer.current);
      }}
      onMouseLeave={() => {
        if (!isMobile) {
          collapseTimer.current = window.setTimeout(() => setExpanded(false), 1200);
        }
      }}
      onClick={() => {
        try {
          localStorage.setItem(SEEN_KEY, "99");
        } catch {
          /* ignore */
        }
        setShowDot(false);
      }}
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0)",
      }}
      className={[
        "group fixed right-5 z-50 inline-flex items-center overflow-hidden",
        "rounded-full text-white shadow-[0_8px_32px_rgba(37,211,102,0.35)]",
        "transition-all duration-300 ease-out",
        "hover:shadow-[0_12px_40px_rgba(37,211,102,0.5)] hover:scale-105",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        baseOpacity,
        baseScale,
        nudge ? "animate-[wa-nudge_0.7s_ease-in-out]" : "",
        // mobile vs desktop bottom offset
        "bottom-5 md:bottom-8",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full"
        style={{
          background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
        }}
      />
      {/* pulsing ring (idle only) */}
      {!shownExpanded && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 rounded-full"
          style={{
            background: "rgba(37,211,102,0.5)",
            animation: "wa-ping 2s cubic-bezier(0,0,0.2,1) infinite",
          }}
        />
      )}

      <span
        className={[
          "flex items-center justify-center transition-all duration-300",
          shownExpanded ? "h-14 w-14 pl-1" : "h-14 w-14",
        ].join(" ")}
      >
        <WhatsAppIcon className={`h-6 w-6 transition-transform duration-300 ${expanded ? "rotate-[8deg]" : ""}`} />
      </span>

      <span
        className={[
          "flex flex-col justify-center overflow-hidden whitespace-nowrap pr-5 text-left transition-all duration-300",
          shownExpanded ? "max-w-45 opacity-100 translate-x-0" : "max-w-0 opacity-0 -translate-x-2",
        ].join(" ")}
        style={{ fontFamily: "var(--font-display)" }}
      >
        <span className="text-sm font-semibold leading-tight">Chat with us</span>
        <span className="text-[11px] leading-tight opacity-90">Usually replies in minutes</span>
      </span>

      {/* notification dot */}
      {showDot && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-[#EF4444] ring-2 ring-bg-base"
        />
      )}

      {/* desktop tooltip when collapsed */}
      {!shownExpanded && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-full mr-3 hidden translate-x-1 rounded-md bg-bg-elevated px-2.5 py-1.5 text-xs font-medium text-white opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100 md:block"
        >
          Chat with us →
        </span>
      )}

      <style>{`
        @keyframes wa-ping { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.6); opacity: 0; } }
        @keyframes wa-nudge {
          0%,100% { transform: translateY(0) rotate(0); }
          20% { transform: translateY(-8px) rotate(-3deg); }
          40% { transform: translateY(0) rotate(3deg); }
          60% { transform: translateY(-4px) rotate(-2deg); }
          80% { transform: translateY(0) rotate(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          a[aria-label="Chat with ClickMasters on WhatsApp"] { transition: opacity 0.2s !important; animation: none !important; }
          a[aria-label="Chat with ClickMasters on WhatsApp"] * { animation: none !important; }
        }
      `}</style>
    </a>
  );
}
