"use client";

import Link from "next/link";
import { useDoctors } from "@/hooks/useDoctors";

export default function DoctorsPage() {
  const { doctors, loading, error } = useDoctors();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="mt-4 text-sm text-slate-500">
            Loading doctors...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">
            Unable to load doctors
          </h1>

          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600"
          >
            Tenachin
          </Link>

          <nav className="flex items-center gap-5 text-sm font-medium">
            <Link
              href="/"
              className="text-slate-600 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              href="/bookings"
              className="text-slate-600 hover:text-blue-600"
            >
              My Bookings
            </Link>

            <Link
              href="/profile"
              className="text-slate-600 hover:text-blue-600"
            >
              Profile
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Find a Doctor xyz
          </h1>

          <p className="mt-2 text-slate-500">
            Choose a doctor and book an available appointment.
          </p>
        </div>

        {doctors.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <h2 className="text-lg font-semibold text-slate-900">
              No doctors available
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              There are currently no doctors available.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <Link
                key={doctor.id}
                href={`/doctors/${doctor.id}`}
                className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl">
                    👨‍⚕️
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      {doctor.name}
                    </h2>

                    <p className="text-sm text-blue-600">
                      {doctor.specialty}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm text-slate-500">
                  View doctor details and available appointment
                  slots.
                </p>

                <div className="mt-5 text-sm font-semibold text-blue-600">
                  View Doctor →
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}