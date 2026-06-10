"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { NAV_LINKS, PAGE_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface NavbarProps {
  logoUrl?: string | null;
}

export function Navbar({ logoUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "glass py-3" : "bg-transparent py-5"
        )}
      >
        <div className="container-wide flex items-center justify-between px-6">
          <BrandLogo logoUrl={logoUrl} size="md" />

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            {PAGE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/booking"
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-black text-sm font-semibold hover:bg-secondary transition-colors"
            >
              Book Workshop
            </Link>
          </div>

          <button
            className="lg:hidden p-2.5 rounded-xl border border-border text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl pt-28 px-8 lg:hidden"
          >
            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-display font-medium text-foreground"
                >
                  {link.label}
                </a>
              ))}
              {PAGE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-display font-medium text-muted"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="mt-4 inline-flex items-center justify-center px-6 py-4 rounded-2xl bg-primary text-black text-lg font-semibold"
              >
                Book Workshop
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
