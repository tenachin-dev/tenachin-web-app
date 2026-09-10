
"use client";

import { useCallback, useEffect, useState } from "react";

import {
  getMyBookings,
} from "@/services/booking.service";

import type { Appointment } from "@/types/booking";

export function useBookings() {
  const [bookings, setBookings] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getMyBookings();

      setBookings(data);
    } catch (err) {
      console.error("Failed to load bookings:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load bookings."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return {
    bookings,
    loading,
    error,
    refetch: fetchBookings,
  };
}

