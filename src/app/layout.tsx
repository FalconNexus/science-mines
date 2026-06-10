import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import { GoogleAnalytics } from "@/components/providers/GoogleAnalytics";
import { SITE } from "@/lib/constants";
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

export const metadata: Metadata = {
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
