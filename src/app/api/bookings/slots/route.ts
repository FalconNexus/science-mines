import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { buildSlotAvailability } from "@/lib/slots";
import { isMissingTableError } from "@/lib/branding";

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Valid date required (YYYY-MM-DD)" }, { status: 400 });
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  const { data, error } = await supabase
    .from("slot_bookings")
    .select("slot_hour")
    .eq("booking_date", date)
    .neq("status", "cancelled");

  if (error) {
    if (isMissingTableError(error.message)) {
      return NextResponse.json({
        slots: buildSlotAvailability({}),
        migrationRequired: true,
      });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const counts: Record<number, number> = {};
  for (const row of data ?? []) {
    counts[row.slot_hour] = (counts[row.slot_hour] ?? 0) + 1;
  }

  return NextResponse.json({ slots: buildSlotAvailability(counts) });
}
