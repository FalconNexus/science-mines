import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";
import { getGalleryImages } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about ScienceMines — our mission, vision, and innovation philosophy.",
};

export default async function AboutPage() {
  const galleryImages = await getGalleryImages();

  return <AboutContent galleryImages={galleryImages} />;
}
