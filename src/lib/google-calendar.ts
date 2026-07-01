import { addMinutes, format } from "date-fns";
import type { CalendarEvent } from "@/types";

const CALENDAR_API_BASE = "https://www.googleapis.com/calendar/v3";
const TIME_ZONE = "America/Edmonton";

async function getAccessToken(): Promise<string> {
  const clientId     = process.env.GOOGLE_CLIENT_ID ?? "";
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? "";
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN ?? "";

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Google Calendar credentials not configured");
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id:     clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type:    "refresh_token",
    }),
  });

  if (!res.ok) throw new Error("Failed to refresh Google access token");
  const data = await res.json() as { access_token: string };
  return data.access_token;
}

export async function createCalendarEvent(
  event: CalendarEvent
): Promise<{ id: string; htmlLink: string }> {
  const token = await getAccessToken();
  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? "primary";

  const res = await fetch(
    `${CALENDAR_API_BASE}/calendars/${encodeURIComponent(calendarId)}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Google Calendar API error: ${err}`);
  }

  return res.json() as Promise<{ id: string; htmlLink: string }>;
}

export async function deleteCalendarEvent(eventId: string): Promise<void> {
  const token = await getAccessToken();
  const calendarId = process.env.GOOGLE_CALENDAR_ID ?? "primary";

  await fetch(
    `${CALENDAR_API_BASE}/calendars/${encodeURIComponent(calendarId)}/events/${eventId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}

export function buildCalendarEvent({
  serviceName,
  barberName,
  clientName,
  clientEmail,
  date,
  timeSlot,
  duration,
  notes,
}: {
  serviceName: string;
  barberName:  string;
  clientName:  string;
  clientEmail: string;
  date:        Date;
  timeSlot:    string;
  duration:    number;
  notes?:      string;
}): CalendarEvent {
  const [hour, minute] = timeSlot.split(":").map(Number);
  const startDate = new Date(date);
  startDate.setHours(hour, minute, 0, 0);
  const endDate = addMinutes(startDate, duration);

  return {
    summary: `${serviceName} — ${clientName}`,
    description: [
      `Service: ${serviceName}`,
      `Barber: ${barberName}`,
      `Client: ${clientName}`,
      `Email: ${clientEmail}`,
      notes ? `Notes: ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
    start: { dateTime: startDate.toISOString(), timeZone: TIME_ZONE },
    end:   { dateTime: endDate.toISOString(), timeZone: TIME_ZONE },
    attendees: [{ email: clientEmail, displayName: clientName }],
  };
}
