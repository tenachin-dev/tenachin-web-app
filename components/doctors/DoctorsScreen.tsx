"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useDoctors } from "@/hooks/useDoctors";

export default function DoctorsScreen() {
  const { doctors, loading, error } = useDoctors();

  const [search, setSearch] = useState("");

  // Filter doctors from Firebase data
  const filteredDoctors = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return doctors;
    }

    return doctors.filter((doctor) => {
      return (
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query) ||
        doctor.email.toLowerCase().includes(query)
      );
    });
  }, [doctors, search]);


 
// ============================================================
// LOADING SKELETON
// ============================================================

if (loading) {
  return (
    <section className="px-5 pb-8 pt-5">
      {/* Header Skeleton */}
      <div className="mb-5">
        <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />

        <div className="mt-2 h-8 w-44 animate-pulse rounded-lg bg-slate-200" />

        <div className="mt-3 h-4 w-64 max-w-full animate-pulse rounded bg-slate-200" />
      </div>

      {/* Search Skeleton */}
      <div className="mb-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="h-5 w-5 animate-pulse rounded-full bg-slate-200" />

        <div className="h-4 flex-1 animate-pulse rounded bg-slate-100" />
      </div>

      {/* Section Header Skeleton */}
      <div className="mb-3 flex items-center justify-between">
        <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

        <div className="h-3 w-14 animate-pulse rounded bg-slate-100" />
      </div>

      {/* Doctor Card Skeletons */}
      <div className="space-y-3">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
          >
            {/* Top */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="h-14 w-14 shrink-0 animate-pulse rounded-2xl bg-slate-200" />

              {/* Doctor Info */}
              <div className="min-w-0 flex-1">
                <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />

                <div className="mt-2 h-3 w-24 animate-pulse rounded bg-slate-100" />

                <div className="mt-3 flex items-center gap-3">
                  <div className="h-3 w-12 animate-pulse rounded bg-slate-100" />

                  <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
                </div>
              </div>

              {/* Arrow */}
              <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-slate-100" />
            </div>

            {/* Bottom */}
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-slate-200" />

                <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
              </div>

              <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <section className="px-5 pb-8 pt-5">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="w-full rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
              !
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              Unable to load doctors
            </h2>

            <p className="mt-2 text-sm leading-5 text-red-500">
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ============================================================
  // MAIN CONTENT
  //
  // IMPORTANT:
  // This component does NOT scroll.
  //
  // Home.tsx owns the only scroll container.
  // ============================================================

  return (
    <section className="px-5 pb-8 pt-5">
      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="mb-5">
        <p className="text-sm font-medium text-blue-600">
          Find healthcare
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          Find a Doctor
        </h1>

        <p className="mt-2 text-sm leading-5 text-slate-500">
          Choose a doctor and book an available appointment.
        </p>
      </div>

      {/* ========================================================
          SEARCH
      ======================================================== */}

      <div className="mb-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
        {/* Search Icon */}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5 shrink-0 text-slate-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z"
          />
        </svg>

        {/* Search Input */}

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search doctors or specialties..."
          className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />

        {/* Clear */}

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-500 transition hover:bg-slate-200"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* ========================================================
          SECTION HEADER
      ======================================================== */}

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-900">
          {search ? "Search results" : "Available doctors"}
        </h2>

        <span className="text-xs text-slate-400">
          {filteredDoctors.length}{" "}
          {filteredDoctors.length === 1 ? "doctor" : "doctors"}
        </span>
      </div>

      {/* ========================================================
          DOCTORS
          
          NO overflow-y-auto HERE.
          NO fixed height HERE.
          NO flex-1 HERE.
          
          Home.tsx handles scrolling.
      ======================================================== */}

      {filteredDoctors.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
            🔍
          </div>

          <h2 className="mt-4 font-semibold text-slate-900">
            No doctors found
          </h2>

          <p className="mt-2 text-sm leading-5 text-slate-500">
            Try searching with a different doctor name or specialty.
          </p>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDoctors.map((doctor) => (
            <Link
              key={doctor.id}
              href={`/doctors/${doctor.id}`}
              className="block rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition hover:ring-blue-200 active:scale-[0.99]"
            >
              {/* ==================================================
                  TOP
              ================================================== */}

              <div className="flex items-center gap-4">
                {/* Doctor Avatar */}

                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-blue-50 text-2xl">
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "👨‍⚕️"
                  )}
                </div>

                {/* Doctor Info */}

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold text-slate-900">
                    {doctor.name}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-blue-600">
                    {doctor.specialty}
                  </p>

                  <div className="mt-2 flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-slate-500">
                      <span className="text-yellow-500">
                        ★
                      </span>

                      {doctor.rating.toFixed(1)}
                    </span>

                    <span className="text-slate-400">
                      {doctor.experience} years
                    </span>
                  </div>
                </div>

                {/* Arrow */}

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                  →
                </div>
              </div>

              {/* ==================================================
                  BOTTOM INFORMATION
              ================================================== */}

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                {/* Availability */}

                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      doctor.available
                        ? "bg-green-500"
                        : "bg-slate-300"
                    }`}
                  />

                  <span
                    className={`text-xs font-medium ${
                      doctor.available
                        ? "text-green-600"
                        : "text-slate-400"
                    }`}
                  >
                    {doctor.available
                      ? "Available"
                      : "Currently unavailable"}
                  </span>
                </div>

                {/* Fee */}

                <span className="text-xs font-bold text-slate-700">
                  {doctor.consultationFee} ETB
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
