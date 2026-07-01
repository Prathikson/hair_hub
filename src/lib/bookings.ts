import type { Booking } from "@/types";

// In-memory store (replace with DB in production)
const bookingsStore = new Map<string, Booking>();

export function getBookings(): Booking[] {
  return Array.from(bookingsStore.values());
}

export function getBookingById(id: string): Booking | undefined {
  return bookingsStore.get(id);
}

export function createBooking(data: Omit<Booking, "id" | "createdAt" | "status">): Booking {
  const id = `HHH-${Date.now().toString(36).toUpperCase()}`;
  const booking: Booking = {
    ...data,
    id,
    status: "confirmed",
    createdAt: new Date(),
  };
  bookingsStore.set(id, booking);
  return booking;
}

export function getBookedSlots(barberId: string, date: Date): string[] {
  const dateStr = date.toISOString().split("T")[0];
  return Array.from(bookingsStore.values())
    .filter((b) =>
      b.barberId === barberId &&
      new Date(b.date).toISOString().split("T")[0] === dateStr &&
      b.status !== "cancelled"
    )
    .map((b) => b.timeSlot);
}

export function cancelBooking(id: string): boolean {
  const booking = bookingsStore.get(id);
  if (!booking) return false;
  bookingsStore.set(id, { ...booking, status: "cancelled" });
  return true;
}
