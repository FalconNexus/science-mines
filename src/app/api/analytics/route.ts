import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ success: true });
    }

    const { error } = await supabase.from("analytics_events").insert({
      event_type: body.event_type,
      page_path: body.page_path,
      visitor_id: body.visitor_id,
      referrer: body.referrer,
      user_agent: request.headers.get("user-agent"),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
