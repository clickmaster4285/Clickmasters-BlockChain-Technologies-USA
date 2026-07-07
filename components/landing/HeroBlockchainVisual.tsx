"use client";

import { Blocks, Cpu, LockKeyhole, WalletCards } from "lucide-react";
import type { CSSProperties } from "react";

const orbitIcons = [Blocks, LockKeyhole, Cpu, WalletCards];

export function HeroBlockchainVisual() {
  return (
    <div className="pointer-events-none absolute inset-x-4 top-[18%] z-10 flex justify-center md:top-[20%]">
      <div className="hero-chain-scene" aria-hidden="true">
        <div className="hero-chain-orbit hero-chain-orbit-a">
          {orbitIcons.map((Icon, index) => (
            <span
              key={index}
              className="hero-chain-orbit-node"
              style={{ "--node-index": index } as CSSProperties}
            >
              <Icon className="h-4 w-4" strokeWidth={2.2} />
            </span>
          ))}
        </div>

        <div className="hero-chain-orbit hero-chain-orbit-b">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <span
              key={index}
              className="hero-chain-satellite"
              style={{ "--node-index": index } as CSSProperties}
            />
          ))}
        </div>

        <div className="hero-chain-cube" role="presentation">
          <span className="hero-chain-face hero-chain-face-front">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span className="hero-chain-face hero-chain-face-back">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span className="hero-chain-face hero-chain-face-right" />
          <span className="hero-chain-face hero-chain-face-left" />
          <span className="hero-chain-face hero-chain-face-top" />
          <span className="hero-chain-face hero-chain-face-bottom" />
        </div>
      </div>
    </div>
  );
}
