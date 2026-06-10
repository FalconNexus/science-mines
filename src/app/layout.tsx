import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { GoogleAnalytics } from "@/components/providers/GoogleAnalytics";
import { DynamicFavicon } from "@/components/brand/DynamicFavicon";
import { SITE } from "@/lib/constants";
import { getSiteSettings } from "@/lib/data";
import { getFaviconHref } from "@/lib/branding";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const favicon = getFaviconHref(settings);

  return {
    title: {
      default: `${SITE.name} — Innovation Lab for Robotics, AI & 3D Printing`,
      template: `%s | ${SITE.name}`,
    },
    description: SITE.description,
    keywords: [
      "innovation lab",
      "robotics",
      "artificial intelligence",
      "3D printing",
      "electronics",
      "IoT",
      "STEM",
    ],
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const favicon = getFaviconHref(settings);

  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <DynamicFavicon href={favicon} />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
