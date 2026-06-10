import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { AnalyticsTracker } from "@/components/providers/AnalyticsTracker";
import { getSiteSettings } from "@/lib/data";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <SmoothScroll>
      <AnalyticsTracker />
      <Navbar logoUrl={settings.logo_url} />
      <main>{children}</main>
      <Footer logoUrl={settings.logo_url} />
    </SmoothScroll>
  );
}
