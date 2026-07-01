import { NextRequest, NextResponse } from "next/server";
import { getBookingById, cancelBooking } from "@/lib/bookings";
import type { ApiResponse, Booking } from "@/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<Booking>>> {
  const { id } = await params;
  const booking = getBookingById(id);
  if (!booking) return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: booking });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ApiResponse<null>>> {
  const { id } = await params;
  const ok = cancelBooking(id);
  if (!ok) return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: null, message: "Booking cancelled" });
}
