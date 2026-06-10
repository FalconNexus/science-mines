export const SLOT_HOURS = [11, 12, 13, 14, 15, 16, 17, 18] as const;
export const MAX_BOOKINGS_PER_SLOT = 10;

export type SlotHour = (typeof SLOT_HOURS)[number];
export type SlotBookingType = "demo" | "workshop" | "course";

export function formatSlotHour(hour: number): string {
  if (hour === 12) return "12:00 PM";
  if (hour < 12) return `${hour}:00 AM`;
  return `${hour - 12}:00 PM`;
}

export function formatSlotRange(hour: number): string {
  const end = hour + 1;
  const fmt = (h: number) => {
    if (h === 12) return "12 PM";
    if (h < 12) return `${h} AM`;
    return `${h - 12} PM`;
  };
  return `${fmt(hour)} – ${fmt(end)}`;
}

export function getMinBookingDate(): string {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

export interface SlotAvailability {
  hour: number;
  label: string;
  range: string;
  booked: number;
  remaining: number;
  full: boolean;
}

export function buildSlotAvailability(
  counts: Record<number, number>
): SlotAvailability[] {
  return SLOT_HOURS.map((hour) => {
    const booked = counts[hour] ?? 0;
    const remaining = Math.max(0, MAX_BOOKINGS_PER_SLOT - booked);
    return {
      hour,
      label: formatSlotHour(hour),
      range: formatSlotRange(hour),
      booked,
      remaining,
      full: booked >= MAX_BOOKINGS_PER_SLOT,
    };
  });
}
