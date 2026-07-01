"use client";
import { useState, useCallback } from "react";
import type { BookingFormData } from "@/types";

interface BookingState {
  step: number;
  data: Partial<BookingFormData>;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  bookingId: string | null;
}

const INITIAL: BookingState = {
  step: 1,
  data: {},
  isSubmitting: false,
  isSuccess: false,
  error: null,
  bookingId: null,
};

export function useBooking() {
  const [state, setState] = useState<BookingState>(INITIAL);

  const setStep = useCallback((step: number) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const updateData = useCallback((partial: Partial<BookingFormData>) => {
    setState((prev) => ({ ...prev, data: { ...prev.data, ...partial } }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => ({ ...prev, step: prev.step + 1 }));
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => ({ ...prev, step: Math.max(1, prev.step - 1) }));
  }, []);

  const submit = useCallback(async () => {
    setState((prev) => ({ ...prev, isSubmitting: true, error: null }));
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state.data),
      });
      const json = await res.json() as { success: boolean; data?: { id: string }; error?: string };
      if (!json.success) throw new Error(json.error ?? "Booking failed");
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        isSuccess: true,
        bookingId: json.data?.id ?? null,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        error: err instanceof Error ? err.message : "Booking failed",
      }));
    }
  }, [state.data]);

  const reset = useCallback(() => {
    setState(INITIAL);
  }, []);

  return { ...state, setStep, updateData, nextStep, prevStep, submit, reset };
}
