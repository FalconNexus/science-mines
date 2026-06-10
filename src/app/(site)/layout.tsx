import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { AnalyticsTracker } from "@/components/providers/AnalyticsTracker";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <AnalyticsTracker />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
