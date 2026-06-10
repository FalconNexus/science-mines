"use client";

import { useEffect, useState } from "react";
import { getMinBookingDate, type SlotAvailability } from "@/lib/slots";
import { cn } from "@/lib/utils";

interface SlotPickerProps {
  date: string;
  onDateChange: (date: string) => void;
  selectedHour: number | null;
  onSelectHour: (hour: number) => void;
}

export function SlotPicker({
  date,
  onDateChange,
  selectedHour,
  onSelectHour,
}: SlotPickerProps) {
  const [slots, setSlots] = useState<SlotAvailability[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!date) return;

    let cancelled = false;
    setLoading(true);
    setError("");

    fetch(`/api/bookings/slots?date=${date}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load slots");
        if (!cancelled) setSlots(data.slots ?? []);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [date]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-muted mb-2">Select Date</label>
        <input
          type="date"
          min={getMinBookingDate()}
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl bg-black border border-border text-foreground focus:outline-none focus:border-primary/50"
        />
      </div>

      <div>
        <label className="block text-sm text-muted mb-2">
          Time Slot <span className="text-xs">(11 AM – 7 PM, 1 hr each)</span>
        </label>

        {loading ? (
          <p className="text-sm text-muted py-4">Loading available slots…</p>
        ) : error ? (
          <p className="text-sm text-red-400 py-2">{error}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {slots.map((slot) => (
              <button
                key={slot.hour}
                type="button"
                disabled={slot.full}
                onClick={() => onSelectHour(slot.hour)}
                className={cn(
                  "px-3 py-3 rounded-xl border text-left transition-all text-sm",
                  slot.full
                    ? "border-border/50 text-muted/50 cursor-not-allowed line-through"
                    : selectedHour === slot.hour
                      ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/30"
                      : "border-border hover:border-primary/30 text-foreground"
                )}
              >
                <span className="block font-medium">{slot.range}</span>
                <span className="block text-xs mt-0.5 opacity-70">
                  {slot.full ? "Full" : `${slot.remaining} spots left`}
                </span>
              </button>
            ))}
          </div>
        )}

        {selectedHour === null && !loading && slots.length > 0 && (
          <p className="text-xs text-muted mt-2">Pick a time slot to continue.</p>
        )}
      </div>
    </div>
  );
}
