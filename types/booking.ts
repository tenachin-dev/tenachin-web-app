import { Timestamp } from "firebase/firestore";

// ============================================================
// APPOINTMENT STATUS
// ============================================================

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "rejected";

// ============================================================
// APPOINTMENT
// ============================================================

export interface Appointment {
  id: string;

  doctorId: string;
  doctorName: string;

  patientId: string;
  patientEmail: string;

  date: string;
  time: string;

  consultationFee: number;

  status: AppointmentStatus;

  meetingId: string;

  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

// ============================================================
// WEEKLY DOCTOR SLOTS
// ============================================================

export interface DoctorSlots {
  id: string;

  doctorId: string;
  doctorName: string;

  slotDuration: number;

  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];

  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}