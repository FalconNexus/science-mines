"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import type { GalleryImage } from "@/types/database";

const TIMELINE = [
  { year: "2020", event: "ScienceMines founded as a maker space." },
  { year: "2021", event: "Launched robotics and electronics programs." },
  { year: "2022", event: "Added AI systems and 3D printing lab." },
  { year: "2023", event: "Expanded to full innovation lab model." },
  { year: "2024", event: "500+ projects built by our community." },
  { year: "2025", event: "Premium lab experience for all innovators." },
];

interface AboutContentProps {
  galleryImages: GalleryImage[];
}

export function AboutContent({ galleryImages }: AboutContentProps) {
  return (
    <div className="pt-24">
      <HeroSection />

      <section className="section-padding bg-surface">
        <div className="container-wide px-6 grid md:grid-cols-2 gap-16">
          <AnimatedBlock>
            <p className="text-primary text-sm uppercase tracking-widest mb-4">
              Mission
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Empower Every Innovator
            </h2>
            <p className="text-muted leading-relaxed text-lg">
              To provide a world-class innovation environment where anyone —
              students, educators, hobbyists, and professionals — can learn by
              building, experiment without limits, and turn bold ideas into
              working technology.
            </p>
          </AnimatedBlock>

          <AnimatedBlock delay={0.2}>
            <p className="text-primary text-sm uppercase tracking-widest mb-4">
              Vision
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              The Future of Making
            </h2>
            <p className="text-muted leading-relaxed text-lg">
              To become the leading innovation lab in the region — a place
              recognized not for lectures, but for the robots, prototypes, and
              products that emerge from our benches every day.
            </p>
          </AnimatedBlock>
        </div>
      </section>

      <section className="section-padding bg-black">
        <div className="container-wide px-6">
          <AnimatedBlock className="text-center mb-16">
            <p className="text-primary text-sm uppercase tracking-widest mb-4">
              Why Us
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Why ScienceMines?
            </h2>
          </AnimatedBlock>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Hands-On First",
                text: "Every session is built around doing — soldering, coding, printing, and testing real hardware.",
              },
              {
                title: "Industry-Grade Tools",
                text: "Access professional robotics workstations, AI systems, and 3D printers — not toy kits.",
              },
              {
                title: "Community of Builders",
                text: "Join a network of innovators who share knowledge, collaborate, and push boundaries together.",
              },
            ].map((item, i) => (
              <AnimatedBlock key={item.title} delay={i * 0.15}>
                <div className="p-8 rounded-2xl border border-border h-full">
                  <div className="w-10 h-1 bg-primary rounded-full mb-6" />
                  <h3 className="font-display text-xl font-bold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{item.text}</p>
                </div>
              </AnimatedBlock>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-wide px-6 max-w-4xl mx-auto text-center">
          <AnimatedBlock>
            <p className="text-primary text-sm uppercase tracking-widest mb-4">
              Philosophy
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-8">
              Innovation Philosophy
            </h2>
            <blockquote className="text-2xl md:text-3xl font-light text-muted leading-relaxed italic">
              &ldquo;We don&apos;t teach technology — we build it. Every circuit
              soldered, every line of code written, every layer printed is a
              step toward something real.&rdquo;
            </blockquote>
          </AnimatedBlock>
        </div>
      </section>

      {galleryImages.length > 0 && (
        <section className="section-padding bg-black">
          <div className="container-wide px-6">
            <AnimatedBlock className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-5xl font-bold">
                Lab Showcase
              </h2>
            </AnimatedBlock>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((img, i) => (
                <AnimatedBlock key={img.id} delay={i * 0.1}>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border">
                    <Image
                      src={img.image_url}
                      alt={img.alt_text || "Lab"}
                      fill
                      className="object-cover"
                    />
                  </div>
                </AnimatedBlock>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-surface">
        <div className="container-wide px-6 max-w-3xl mx-auto">
          <AnimatedBlock className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold">
              Our Journey
            </h2>
          </AnimatedBlock>
          <div className="space-y-8">
            {TIMELINE.map((item, i) => (
              <AnimatedBlock key={item.year} delay={i * 0.1}>
                <div className="flex gap-6 items-start">
                  <span className="font-display text-2xl font-bold text-primary shrink-0 w-16">
                    {item.year}
                  </span>
                  <div className="flex-1 pb-8 border-b border-border">
                    <p className="text-muted text-lg">{item.event}</p>
                  </div>
                </div>
              </AnimatedBlock>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-black">
        <AnimatedBlock className="container-wide px-6 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Ready to Build?
          </h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
            Visit our innovation lab or book a free demo class today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/booking" size="lg">
              Book Now
            </Button>
            <Button href="/#contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </AnimatedBlock>
      </section>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.1)_0%,transparent_70%)]" />
      <div className="container-wide px-6 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-primary text-sm uppercase tracking-widest mb-6"
        >
          About {SITE.name}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-5xl md:text-7xl font-bold mb-6"
        >
          Where Technology
          <br />
          <span className="gradient-text">Is Built</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted text-lg max-w-2xl mx-auto"
        >
          Not a coaching institute. An innovation lab where ideas become
          reality through hands-on creation.
        </motion.p>
      </div>
    </section>
  );
}

function AnimatedBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
