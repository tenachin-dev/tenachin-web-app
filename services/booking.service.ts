import api from "@/lib/api/client";

import type { Appointment ,DoctorSlots} from "@/types/booking";

export async function getMyBookings(): Promise<Appointment[]> {
  const response = await api.get("/bookings");

  return response.data;
}

export async function getBooking(
  bookingId: string
): Promise<Appointment> {
  const response = await api.get(
    `/bookings/${bookingId}`
  );

  return response.data;
}

export async function createBooking(
  booking: Omit<
    Appointment,
    "id" | "createdAt" | "updatedAt"
  >
): Promise<Appointment> {
  const response = await api.post(
    "/bookings",
    booking
  );

  return response.data;
}
// Get available slots for one doctor
export async function getSlots(
  doctorId: string
): Promise<DoctorSlots[]> {
  const response = await api.get(
    `/doctors/${doctorId}/slots`
  );

  return response.data;
}

export async function cancelBooking(
  bookingId: string
): Promise<Appointment> {
  const response = await api.patch(
    `/bookings/${bookingId}/cancel`
  );

  return response.data;
}