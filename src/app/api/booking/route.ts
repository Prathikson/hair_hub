import { NextRequest, NextResponse } from "next/server";
import { createBooking, getBookings } from "@/lib/bookings";
import { createCalendarEvent, buildCalendarEvent } from "@/lib/google-calendar";
import { SERVICES, BARBERS } from "@/data/services";
import type { ApiResponse, Booking } from "@/types";

export async function GET(): Promise<NextResponse<ApiResponse<Booking[]>>> {
  try {
    const bookings = getBookings();
    return NextResponse.json({ success: true, data: bookings });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<Booking>>> {
  try {
    const body = await req.json() as {
      serviceId: string;
      barberId: string;
      date: string;
      timeSlot: string;
      clientName: string;
      clientEmail: string;
      clientPhone: string;
      notes?: string;
    };

    const { serviceId, barberId, date, timeSlot, clientName, clientEmail, clientPhone, notes } = body;

    // Validation
    if (!serviceId || !barberId || !date || !timeSlot || !clientName || !clientEmail || !clientPhone) {
      return NextResponse.json({ success: false, error: "All required fields must be provided" }, { status: 400 });
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(clientEmail)) {
      return NextResponse.json({ success: false, error: "Invalid email address" }, { status: 400 });
    }

    const service = SERVICES.find((s) => s.id === serviceId);
    const barber  = BARBERS.find((b) => b.id === barberId);

    if (!service) return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    if (!barber)  return NextResponse.json({ success: false, error: "Barber not found" }, { status: 404 });

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ success: false, error: "Invalid date" }, { status: 400 });
    }

    const booking = createBooking({
      serviceId,
      barberId,
      date: parsedDate,
      timeSlot,
      clientName,
      clientEmail,
      clientPhone,
      notes,
    });

    // Attempt Google Calendar (non-fatal)
    try {
      const calEvent = buildCalendarEvent({
        serviceName: service.name,
        barberName:  barber.name,
        clientName,
        clientEmail,
        date: parsedDate,
        timeSlot,
        duration: service.duration,
        notes,
      });
      const calResult = await createCalendarEvent(calEvent);
      (booking as Booking & { googleEventId?: string }).googleEventId = calResult.id;
    } catch (calErr) {
      console.warn("Google Calendar skipped:", calErr);
    }

    return NextResponse.json({ success: true, data: booking, message: "Booking confirmed!" }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to create booking" }, { status: 500 });
  }
}
