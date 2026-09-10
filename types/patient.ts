import { Timestamp } from "firebase/firestore";

export interface Patient {
  id: string;

  name: string;
  email: string;

  phoneNumber?: string;

  profileImage?: string;

  dateOfBirth?: string;
  gender?: "male" | "female" | "other";

  createdAt: Timestamp;
  updatedAt?: Timestamp;
}