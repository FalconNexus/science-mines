"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { BookingPromoSection } from "@/components/booking/BookingPromoSection";
import { SlotPicker } from "@/components/booking/SlotPicker";
import { getMinBookingDate, formatSlotRange } from "@/lib/slots";

export function BookYourSlotSection() {
  const [date, setDate] = useState(getMinBookingDate());
  const [slotHour, setSlotHour] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (slotHour === null) {
      setError("Please select a time slot.");
      return;
    }

    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/bookings/slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_date: date,
          slot_hour: slotHour,
          booking_type: "workshop",
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          course_interested: formData.get("purpose"),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      setSuccess(true);
      setSlotHour(null);
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <BookingPromoSection
      id="slots"
      variant="black"
      label="Hands-On Workshop"
      title="Book a Lab Workshop"
      subtitle="Reserve your 1-hour slot and build something real — robots, circuits, 3D prints, and more."
      badge="Most Popular · 11 AM – 7 PM"
      perks={[
        "1-hour dedicated lab time",
        "Expert mentor support",
        "Use pro tools & kits",
        "Take your project home",
      ]}
    >
      {success ? (
        <div className="text-center py-8">
          <p className="text-primary font-semibold text-lg mb-2">Workshop Booked!</p>
          <p className="text-muted text-sm">
            We&apos;ll confirm your session and get you building soon.
          </p>
          <Button variant="outline" className="mt-6" onClick={() => setSuccess(false)}>
            Book Another
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <SlotPicker
            date={date}
            onDateChange={(d) => {
              setDate(d);
              setSlotHour(null);
            }}
            selectedHour={slotHour}
            onSelectHour={setSlotHour}
          />

          {slotHour !== null && (
            <p className="text-sm text-primary">
              Selected: {date} · {formatSlotRange(slotHour)}
            </p>
          )}

          <Input name="name" label="Name" required />
          <Input name="phone" label="Phone" required />
          <Input name="email" label="Email" type="email" required />
          <Input
            name="purpose"
            label="What do you want to build?"
            required
            placeholder="e.g. Robot arm, IoT project, 3D design"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}
          <Button type="submit" disabled={loading || slotHour === null} className="w-full">
            {loading ? "Booking…" : "Book Workshop Slot"}
          </Button>
        </form>
      )}
    </BookingPromoSection>
  );
}
