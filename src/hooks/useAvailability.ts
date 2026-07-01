"use client";
import { useState, useEffect } from "react";
import type { TimeSlot } from "@/types";

export function useAvailability(barberId: string | null, date: Date | null) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!barberId || !date) { setSlots([]); return; }

    const controller = new AbortController();
    const dateStr = date.toISOString().split("T")[0];

    setLoading(true);
    setError(null);

    fetch(`/api/calendar/availability?date=${dateStr}&barberId=${barberId}`, {
      signal: controller.signal,
    })
      .then((r) => r.json() as Promise<{ success: boolean; data?: { slots: TimeSlot[] }; error?: string }>)
      .then((json) => {
        if (json.success && json.data) setSlots(json.data.slots);
        else setError(json.error ?? "Failed to load availability");
      })
      .catch((e: Error) => {
        if (e.name !== "AbortError") setError("Network error");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [barberId, date]);

  return { slots, loading, error };
}
