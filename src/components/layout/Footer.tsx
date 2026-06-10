import Link from "next/link";
import { NAV_LINKS, PAGE_LINKS, SITE } from "@/lib/constants";
import { generateWhatsAppContactUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-wide px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-display font-bold text-black text-sm">
                SM
              </div>
              <span className="font-display text-xl font-bold">
                <span>{SITE.brandScience}</span>
                <span className="text-primary">{SITE.brandMines}</span>
              </span>
            </div>
            <p className="text-muted max-w-md leading-relaxed mb-4">
              {SITE.description}
            </p>
            <p className="text-sm text-primary font-medium tracking-wide">
              Innovation Lab · Learn · Build · Print · Innovate
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {PAGE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li>{SITE.email}</li>
              <li>{SITE.phone}</li>
              <li>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  View on Maps
                </a>
              </li>
              <li>
                <a
                  href={generateWhatsAppContactUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="hover:text-foreground transition-colors"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted">
          <p>© {new Date().getFullYear()} {SITE.name} — All systems online</p>
        </div>
      </div>
    </footer>
  );
}
