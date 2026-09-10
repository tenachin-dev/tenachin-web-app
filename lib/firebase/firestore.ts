
import { collection } from "firebase/firestore";

import { db } from "./config";

// ================================
// FIRESTORE COLLECTIONS
// ================================

export const doctorsCollection = collection(db, "doctors");

export const patientsCollection = collection(db, "patients");

export const appointmentsCollection = collection(db, "appointments");

export const usersCollection = collection(db, "users");

export const messagesCollection = collection(db, "messages");

export const slotsCollection = collection(db, "slots");
