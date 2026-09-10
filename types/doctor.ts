import { Timestamp } from "firebase/firestore";

export interface Doctor {
  id: string;

  name: string;
  email: string;

  specialization: string;
  profile: string;

  experience: number;
  rating: number;

  consultationFee: number;

  isAvailable: boolean;

  createdAt: Timestamp;
  updatedAt?: Timestamp;
}