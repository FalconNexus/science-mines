"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Package,
  Image,
  MessageSquare,
  LogOut,
  ExternalLink,
  Palette,
} from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { adminLogout } from "@/lib/actions/admin-auth";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/gallery", label: "Lab Gallery", icon: Image },
  { href: "/admin/branding", label: "Branding", icon: Palette },
  { href: "/admin/contacts", label: "Contacts", icon: MessageSquare },
];

interface AdminSidebarProps {
  logoUrl?: string | null;
}

export function AdminSidebar({ logoUrl }: AdminSidebarProps) {
  const pathname = usePathname();

  async function handleLogout() {
    await adminLogout();
    window.location.href = "/admin/login";
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-surface border-r border-border flex flex-col z-40">
      <div className="p-6 border-b border-border">
        <BrandLogo logoUrl={logoUrl} size="sm" href="/admin" />
        <p className="text-xs text-muted mt-2">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted hover:text-foreground hover:bg-white/5"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-foreground hover:bg-white/5 transition-colors"
        >
          <ExternalLink size={18} />
          View Site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted hover:text-red-400 hover:bg-red-400/5 transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
