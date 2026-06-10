import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { MAX_BOOKINGS_PER_SLOT, SLOT_HOURS } from "@/lib/slots";
import { isMissingTableError } from "@/lib/branding";
import type { SlotBookingType } from "@/types/database";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 }
      );
    }

    const bookingDate = body.booking_date as string;
    const slotHour = Number(body.slot_hour);
    const bookingType = body.booking_type as SlotBookingType;
    const name = (body.name as string)?.trim();
    const phone = (body.phone as string)?.trim();
    const email = (body.email as string)?.trim();

    if (!bookingDate || !/^\d{4}-\d{2}-\d{2}$/.test(bookingDate)) {
      return NextResponse.json({ error: "Valid booking date required" }, { status: 400 });
    }
    if (!SLOT_HOURS.includes(slotHour as (typeof SLOT_HOURS)[number])) {
      return NextResponse.json({ error: "Invalid time slot" }, { status: 400 });
    }
    if (!["demo", "workshop", "course"].includes(bookingType)) {
      return NextResponse.json({ error: "Invalid booking type" }, { status: 400 });
    }
    if (!name || !phone || !email) {
      return NextResponse.json({ error: "Name, phone, and email are required" }, { status: 400 });
    }

    const { count, error: countError } = await supabase
      .from("slot_bookings")
      .select("*", { count: "exact", head: true })
      .eq("booking_date", bookingDate)
      .eq("slot_hour", slotHour)
      .neq("status", "cancelled");

    if (countError) {
      if (isMissingTableError(countError.message)) {
        return NextResponse.json(
          {
            error:
              "Slot booking is not set up yet. Please run the database migration (see supabase/migrations/004_slot_bookings_and_settings.sql).",
          },
          { status: 503 }
        );
      }
      return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    if ((count ?? 0) >= MAX_BOOKINGS_PER_SLOT) {
      return NextResponse.json(
        { error: "This slot is full. Please choose another time." },
        { status: 409 }
      );
    }

    const { error } = await supabase.from("slot_bookings").insert({
      booking_date: bookingDate,
      slot_hour: slotHour,
      booking_type: bookingType,
      course_id: body.course_id || null,
      course_title: body.course_title || null,
      course_interested: body.course_interested || null,
      name,
      phone,
      email,
    });

    if (error) {
      if (isMissingTableError(error.message)) {
        return NextResponse.json(
          { error: "Slot booking table not found. Run database migration first." },
          { status: 503 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await supabase.from("analytics_events").insert({
      event_type: "conversion",
      page_path: "/booking",
      metadata: { type: "slot_booking", booking_type: bookingType },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
