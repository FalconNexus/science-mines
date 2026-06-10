"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { HeroBackground } from "@/components/home/HeroBackground";
import { HERO_STATS, SITE } from "@/lib/constants";

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-fade", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.2,
      });
    }, contentRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <HeroBackground />

      <div
        ref={contentRef}
        className="relative z-10 container-wide px-6 pt-28 pb-8 text-center max-w-5xl mx-auto flex-1 flex flex-col justify-center"
      >
        <div className="hero-fade inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-xs text-primary uppercase tracking-widest mx-auto">
          <Sparkles size={14} />
          Innovation Lab · Estd. for the Future
        </div>

        <h1 className="hero-fade font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight mb-8">
          Where ideas become{" "}
          <span className="gradient-text">reality.</span>
        </h1>

        <p className="hero-fade text-muted text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-6">
          {SITE.description}
        </p>

        <p className="hero-fade text-primary text-sm font-medium tracking-[0.2em] uppercase mb-10">
          Learn · Build · Print · Innovate
        </p>

        <div className="hero-fade flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-black font-semibold hover:bg-secondary transition-all shadow-[0_0_40px_rgba(255,122,0,0.25)]"
          >
            Book a Workshop
            <ArrowRight size={18} />
          </Link>
          <a
            href="#innovation-lab"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-foreground hover:border-primary/40 transition-all"
          >
            <MapPin size={18} className="text-primary" />
            Visit The Lab
          </a>
        </div>

        <a
          href="#programs"
          className="hero-fade inline-flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors mx-auto"
        >
          Explore Programs <ArrowRight size={14} />
        </a>
      </div>

      <div className="relative z-10 container-wide px-6 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {HERO_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="text-center p-4 rounded-2xl border border-border bg-black/40 backdrop-blur-sm"
            >
              <p className="font-display text-2xl md:text-3xl font-bold gradient-text">
                {stat.value}
              </p>
              <p className="text-xs text-muted uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
