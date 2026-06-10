"use client";

import Image from "next/image";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      {/* Lab photo */}
      <Image
        src="/hero-lab.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center scale-105"
        sizes="100vw"
      />

      {/* Dark + brand tint overlays */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.18)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />

      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,122,0,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,122,0,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 45%, black 20%, transparent 75%)",
        }}
      />

      {/* Ambient orbs */}
      <div className="absolute top-[15%] left-[10%] w-72 h-72 rounded-full bg-primary/10 blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[8%] w-96 h-96 rounded-full bg-secondary/8 blur-[120px] animate-pulse-glow [animation-delay:1.5s]" />

      {/* HUD corners */}
      <div className="absolute top-24 left-6 md:left-12 w-16 h-16 border-l-2 border-t-2 border-primary/40 rounded-tl-sm" />
      <div className="absolute top-24 right-6 md:right-12 w-16 h-16 border-r-2 border-t-2 border-primary/40 rounded-tr-sm" />
      <div className="absolute bottom-32 left-6 md:left-12 w-16 h-16 border-l-2 border-b-2 border-primary/25 rounded-bl-sm" />
      <div className="absolute bottom-32 right-6 md:right-12 w-16 h-16 border-r-2 border-b-2 border-primary/25 rounded-br-sm" />

      {/* Horizon line */}
      <div className="absolute left-0 right-0 top-[58%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Scan sweep */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
        <div className="hero-scan absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000000_80%)]" />
    </div>
  );
}
