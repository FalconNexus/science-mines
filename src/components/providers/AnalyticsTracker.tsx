"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("sm_visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("sm_visitor_id", id);
  }
  return id;
}

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const visitorId = getVisitorId();
    const isFirstVisit = !sessionStorage.getItem("sm_session");

    if (isFirstVisit) {
      sessionStorage.setItem("sm_session", "1");
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_type: "visit",
          page_path: pathname,
          visitor_id: visitorId,
          referrer: document.referrer || null,
        }),
      }).catch(() => {});
    }

    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_type: "page_view",
        page_path: pathname,
        visitor_id: visitorId,
        referrer: document.referrer || null,
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
