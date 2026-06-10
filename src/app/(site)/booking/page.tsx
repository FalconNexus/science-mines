import type { Metadata } from "next";
import { CourseBookingSection } from "@/components/booking/CourseBookingSection";
import { DemoClassSection } from "@/components/booking/DemoClassSection";
import { BookYourSlotSection } from "@/components/booking/BookYourSlotSection";
import { PrintRequestSection } from "@/components/booking/PrintRequestSection";
import { LabAccessSection } from "@/components/booking/LabAccessSection";
import { ProductsSection } from "@/components/booking/ProductsSection";
import { BookingNav } from "@/components/booking/BookingNav";
import { getCourses, getProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Booking",
  description: "Book courses, demo classes, 3D printing, lab access, and order products.",
};

export default async function BookingPage() {
  const [courses, products] = await Promise.all([
    getCourses(),
    getProducts(),
  ]);

  return (
    <div className="pt-24">
      <div className="section-padding !pb-12 bg-black">
        <div className="container-wide px-6 text-center">
          <p className="text-primary text-sm uppercase tracking-widest mb-4">
            Book & Order
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Start Building
          </h1>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Start with a free demo or book a hands-on workshop — then explore
            courses, 3D printing, lab access, and products.
          </p>
        </div>
      </div>

      <BookingNav />

      <DemoClassSection />
      <BookYourSlotSection />
      <CourseBookingSection courses={courses} />
      <PrintRequestSection />
      <LabAccessSection />
      <ProductsSection products={products} />
    </div>
  );
}
