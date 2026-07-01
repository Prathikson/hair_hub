import { NextRequest, NextResponse } from "next/server";
import { getBookedSlots } from "@/lib/bookings";
import { generateTimeSlots } from "@/lib/utils";
import type { ApiResponse, AvailabilityResponse } from "@/types";

export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse<AvailabilityResponse>>> {
  try {
    const { searchParams } = new URL(req.url);
    const dateStr  = searchParams.get("date");
    const barberId = searchParams.get("barberId");

    if (!dateStr || !barberId) {
      return NextResponse.json({ success: false, error: "date and barberId are required" }, { status: 400 });
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return NextResponse.json({ success: false, error: "Invalid date format" }, { status: 400 });
    }

    const day = date.getDay();
    if (day === 0) {
      return NextResponse.json({ success: true, data: { date: dateStr, slots: [] } });
    }

    const booked = getBookedSlots(barberId, date);
    const closeHour = day === 6 ? 17 : 19;
    const slots = generateTimeSlots(date, 9, closeHour, 30, booked);

    return NextResponse.json({ success: true, data: { date: dateStr, slots } });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to get availability" }, { status: 500 });
  }
}
