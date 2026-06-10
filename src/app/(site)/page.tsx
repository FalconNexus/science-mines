import { Hero } from "@/components/home/Hero";
import { PillarsSection } from "@/components/home/PillarsSection";
import { TechAreas } from "@/components/home/TechAreas";
import { InnovationLab } from "@/components/home/InnovationLab";
import { ProgramsSection } from "@/components/home/ProgramsSection";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { SchoolPartnerships } from "@/components/home/SchoolPartnerships";
import { ProductsPreview } from "@/components/home/ProductsPreview";
import { Contact } from "@/components/home/Contact";
import { getGalleryImages, getProducts, getCourses } from "@/lib/data";

export default async function HomePage() {
  const [galleryImages, products, courses] = await Promise.all([
    getGalleryImages(),
    getProducts(12),
    getCourses(),
  ]);

  return (
    <>
      <Hero />
      <PillarsSection />
      <TechAreas />
      <InnovationLab images={galleryImages} />
      <ProgramsSection courses={courses} />
      <ProjectsShowcase />
      <SchoolPartnerships />
      <ProductsPreview products={products} />
      <Contact />
    </>
  );
}
