import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

    const { error } = await supabase.from("print_requests").insert({
      name: body.name,
      phone: body.phone,
      email: body.email,
      description: body.description,
      file_url: body.file_url,
      file_name: body.file_name,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await supabase.from("analytics_events").insert({
      event_type: "conversion",
      page_path: "/booking",
      metadata: { type: "print_request" },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
