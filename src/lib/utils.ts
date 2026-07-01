import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, addMinutes, setHours, setMinutes, isBefore, startOfDay, addDays } from "date-fns";
import type { TimeSlot } from "@/types";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function generateTimeSlots(
  date: Date,
  openHour = 9,
  closeHour = 19,
  intervalMinutes = 30,
  bookedSlots: string[] = []
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const now = new Date();
  let current = setHours(setMinutes(startOfDay(date), 0), openHour);
  const end = setHours(setMinutes(startOfDay(date), 0), closeHour);

  while (isBefore(current, end)) {
    const timeStr = format(current, "HH:mm");
    const isPast = isBefore(addMinutes(current, -15), now) &&
      startOfDay(date).getTime() === startOfDay(now).getTime();

    slots.push({
      time: timeStr,
      available: !isPast && !bookedSlots.includes(timeStr),
      bookingId: bookedSlots.includes(timeStr) ? "booked" : undefined,
    });
    current = addMinutes(current, intervalMinutes);
  }
  return slots;
}

export function getMinBookingDate(): Date {
  return addDays(new Date(), 1);
}

export function getMaxBookingDate(): Date {
  return addDays(new Date(), 60);
}

export function formatDateDisplay(date: Date): string {
  return format(date, "EEEE, MMMM d, yyyy");
}

export function generateBookingId(): string {
  return `HHH-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
