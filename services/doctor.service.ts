
import api from "@/lib/api/client";
import type { Doctor } from "@/types/doctor";

export async function getDoctors(): Promise<Doctor[]> {
  const response = await api.get("/doctors");

  return response.data;
}

export async function getDoctor(
  doctorId: string
): Promise<Doctor> {
  const response = await api.get(
    `/doctors/${doctorId}`
  );

  return response.data;
}
