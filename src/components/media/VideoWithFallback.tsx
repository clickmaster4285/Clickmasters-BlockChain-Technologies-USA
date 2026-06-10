import { useEffect, useRef, useState } from "react";

interface VideoWithFallbackProps {
  src: string;
  fallbackImage: string;
  className?: string;
  preload?: "auto" | "metadata" | "none";
  /** mix-blend-mode utility class, e.g. "mix-blend-screen" */
  blendClassName?: string;
  /** Tailwind opacity utility, e.g. "opacity-70" */
  opacityClassName?: string;
  ariaLabel?: string;
  /** When true, defer loading the video source until it scrolls into view */
  lazy?: boolean;
}

/**
 * Autoplaying, muted, looping background video with a static image fallback.
 * - Shows the fallback image immediately as a poster (no blank flash).
 * - Swaps to a static <img> if the video fails to load or autoplay is blocked.
 * - When `lazy` is true, defers network load until the element is near the viewport.
 */
export function VideoWithFallback({
  src,
  fallbackImage,
  className = "",
  preload = "metadata",
  blendClassName = "",
  opacityClassName = "opacity-100",
  ariaLabel,
  lazy = false,
}: VideoWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [activeSrc, setActiveSrc] = useState<string | undefined>(lazy ? undefined : src);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Lazy-load: only set src when the video is near the viewport
  useEffect(() => {
    if (!lazy) return;
    const v = videoRef.current;
    if (!v) return;
    if (typeof IntersectionObserver === "undefined") {
      setActiveSrc(src);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSrc(src);
          obs.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, [lazy, src]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !activeSrc) return;
    const tryPlay = () => v.play().catch(() => setHasError(true));
    if (v.readyState >= 3) tryPlay();
    else v.addEventListener("canplay", tryPlay, { once: true });
    return () => v.removeEventListener("canplay", tryPlay);
  }, [activeSrc]);

  if (hasError) {
    return (
      <img
        src={fallbackImage}
        alt={ariaLabel ?? ""}
        aria-hidden={ariaLabel ? undefined : true}
        loading="lazy"
        decoding="async"
        className={`pointer-events-none object-cover ${opacityClassName} ${blendClassName} ${className}`}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={activeSrc}
      poster={fallbackImage}
      autoPlay
      loop
      muted
      playsInline
      preload={preload}
      onError={() => setHasError(true)}
      aria-label={ariaLabel}
      className={`pointer-events-none object-cover ${opacityClassName} ${blendClassName} ${className}`}
    />
  );
}
