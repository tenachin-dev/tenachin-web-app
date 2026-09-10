
"use client";

import { useCallback, useEffect, useState } from "react";
import { getSlots } from "@/services/booking.service";

import type { DoctorSlots } from "@/types/booking";

export function useSlots(doctorId: string | null) {
  const [slots, setSlots] = useState<DoctorSlots[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSlots = useCallback(async () => {
    if (!doctorId) {
      setSlots([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await getSlots(doctorId);

      setSlots(data);
    } catch (err) {
      console.error("Failed to load slots:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load appointment slots."
      );
    } finally {
      setLoading(false);
    }
  }, [doctorId]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  return {
    slots,
    loading,
    error,
    refetch: fetchSlots,
  };
}
