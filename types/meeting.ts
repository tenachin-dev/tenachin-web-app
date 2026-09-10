import { Timestamp } from "firebase/firestore";

export type MeetingStatus =
  | "waiting"
  | "active"
  | "completed"
  | "cancelled";

export interface Meeting {
  id: string;

  appointmentId: string;

  doctorId: string;
  doctorName: string;

  patientId: string;
  patientName?: string;
  patientEmail?: string;

  roomId: string;

  status: MeetingStatus;

  startedAt?: Timestamp;
  endedAt?: Timestamp;

  createdAt: Timestamp;
}