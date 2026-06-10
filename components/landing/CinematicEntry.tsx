"use client";

import { useEffect, useState } from "react";
import { Hexagon } from "lucide-react";
const introVideo = "/media/intro.mp4";

export function CinematicEntry() {
  const [stage, setStage] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("cm-intro-played")) {
      setDone(true);
      return;
    }
    const timers = [
      setTimeout(() => setStage(1), 300),
      setTimeout(() => setStage(2), 800),
      setTimeout(() => setStage(3), 1500),
      setTimeout(() => setStage(4), 1800),
      setTimeout(() => setStage(5), 2500),
      setTimeout(() => setStage(6), 3000),
      setTimeout(() => {
        sessionStorage.setItem("cm-intro-played", "1");
        setDone(true);
      }, 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500" style={{ opacity: stage >= 6 ? 0 : 1, pointerEvents: stage >= 6 ? "none" : "auto" }}>
      <video
        src={introVideo}
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-background/60" />
      <div className="bg-grid absolute inset-0 opacity-40" />
      {/* expanding rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {stage >= 6 && (
          <>
            <span className="absolute h-40 w-40 rounded-full border-2 border-primary animate-pulse-ring" />
            <span className="absolute h-40 w-40 rounded-full border-2 border-secondary animate-pulse-ring" style={{ animationDelay: "0.4s" }} />
          </>
        )}
      </div>
      <div className="relative flex flex-col items-center gap-4 px-6 text-center">
        <p className={`font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground transition-all duration-500 ${stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
          Welcome to
        </p>
        <div className={`transition-all duration-700 ${stage >= 2 ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-50"}`}>
          <div className="rounded-2xl bg-primary/10 p-4 shadow-glow">
            <Hexagon className="h-12 w-12 text-primary" strokeWidth={1.5} />
          </div>
        </div>
        <h1 className={`text-5xl font-bold tracking-tight transition-all duration-700 md:text-7xl ${stage >= 3 ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
          <span className="text-gradient">CLICKMASTERS</span>
        </h1>
        <p className={`font-mono text-sm tracking-[0.3em] text-secondary transition-all duration-500 md:text-base ${stage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          BLOCKCHAIN &amp; WEB3
        </p>
        <p className={`mt-2 text-sm text-muted-foreground transition-opacity duration-700 md:text-base ${stage >= 5 ? "opacity-100" : "opacity-0"}`}>
          Where decentralization begins — beyond the code, beyond the chain.
        </p>
      </div>
    </div>
  );
}