"use client";

import { useState } from "react";
import { addDoc } from "firebase/firestore";
import { doctorsCollection } from "../lib/firebase/firestore";

const doctors = [
  {
    name: "Dr. Abebe Kebede",
    email: "abebe@example.com",
    profile: "Experienced medical doctor providing general consultation.",
    specialization: "General Medicine",
    consultationFee: 500,
    rating: 4.8,
    experience: 10,
    isAvailable: true,
  },
  {
    name: "Dr. Hana Tesfaye",
    email: "hana@example.com",
    profile: "Specialist focused on family and internal medicine.",
    specialization: "Internal Medicine",
    consultationFee: 700,
    rating: 4.9,
    experience: 8,
    isAvailable: true,
  },
  {
    name: "Dr. Samuel Bekele",
    email: "samuel@example.com",
    profile: "Experienced pediatric doctor caring for children.",
    specialization: "Pediatrics",
    consultationFee: 600,
    rating: 4.7,
    experience: 7,
    isAvailable: true,
  },
  {
    name: "Dr. Meron Alemu",
    email: "meron@example.com",
    profile: "Specialist providing women's health consultation.",
    specialization: "Gynecology",
    consultationFee: 800,
    rating: 4.9,
    experience: 12,
    isAvailable: false,
  },
  {
    name: "Dr. Dawit Girma",
    email: "dawit@example.com",
    profile: "Specialist in skin and dermatological conditions.",
    specialization: "Dermatology",
    consultationFee: 750,
    rating: 4.6,
    experience: 6,
    isAvailable: true,
  },
];

export default function DoctorsPage() {
  const [loading, setLoading] = useState(false);

  const uploadDoctors = async () => {
    setLoading(true);

    try {
      for (const doctor of doctors) {
        await addDoc(doctorsCollection, {
          ...doctor,
          createdAt: new Date(),
        });
      }

      alert("5 doctors saved to Firebase successfully!");
    } catch (error) {
      console.error("Error saving doctors:", error);
      alert("Failed to save doctors.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>Doctors</h1>

      <p>Save the 5 doctors to Firebase Firestore.</p>

      <button
        onClick={uploadDoctors}
        disabled={loading}
        style={{
          padding: "12px 24px",
          marginTop: "20px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Saving..." : "Upload Doctors"}
      </button>
    </main>
  );
}
