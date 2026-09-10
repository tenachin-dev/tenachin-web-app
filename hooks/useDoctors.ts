
"use client";

import { useCallback, useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { doctorsCollection } from "@/lib/firebase/firestore";

export interface Doctor {
  id: string;
  name: string;
  email: string;
  profile: string;
  specialty: string;
  consultationFee: number;
  rating: number;
  experience: number;
  available: boolean;
  image?: string;
}

interface UseDoctorsResult {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDoctors(): UseDoctorsResult {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const snapshot = await getDocs(doctorsCollection);

      const doctorsData: Doctor[] = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          name: data.name ?? "",
          email: data.email ?? "",
          profile: data.profile ?? "",
          specialty: data.specialization ?? "",
          consultationFee: data.consultationFee ?? 0,
          rating: data.rating ?? 0,
          experience: data.experience ?? 0,
          available: data.isAvailable ?? false,
          image: data.profileImage ?? "",
        };
      });

      setDoctors(doctorsData);
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
      setError("Failed to load doctors.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return {
    doctors,
    loading,
    error,
    refetch: fetchDoctors,
  };
}
