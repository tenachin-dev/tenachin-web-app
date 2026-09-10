"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/navigation";

import { auth, db } from "@/lib/firebase/config";

type Booking = {
  id: string;
  doctorName: string;
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
  consultationFee: number;
  status: string;
  meetingId: string;
  createdAt?: unknown;
};

export default function BookingsScreen() {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const user = auth.currentUser;

        if (!user) {
          setError("Please login again.");
          return;
        }

        const bookingsQuery = query(
          collection(db, "appointments"),
          where("patientId", "==", user.uid)
        );

        const snapshot = await getDocs(bookingsQuery);

        const data: Booking[] = snapshot.docs.map((doc) => {
          const item = doc.data();

          return {
            id: doc.id,
            doctorName: item.doctorName ?? "Doctor",
            doctorId: item.doctorId ?? "",
            patientId: item.patientId ?? "",
            date: item.date ?? "",
            time: item.time ?? "",
            consultationFee: Number(item.consultationFee ?? 0),
            status: item.status ?? "pending",
            meetingId: item.meetingId ?? "",
            createdAt: item.createdAt,
          };
        });

        data.sort((a, b) => {
          return `${b.date} ${b.time}`.localeCompare(
            `${a.date} ${a.time}`
          );
        });

        setBookings(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load your bookings.");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const formatDate = (date: string) => {
    if (!date) return "Date not available";

    const parsed = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (time: string) => {
    if (!time) return "Time not available";

    const startTime = time.split("-")[0];

    const [hours, minutes] = startTime.split(":").map(Number);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return time;
    }

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-50 text-emerald-700";

      case "completed":
        return "bg-blue-50 text-blue-700";

      case "cancelled":
        return "bg-red-50 text-red-700";

      default:
        return "bg-amber-50 text-amber-700";
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 p-5 pb-28">
        <div>
          <div className="h-7 w-40 animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-4 w-56 animate-pulse rounded bg-slate-100" />
        </div>

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-2xl bg-white p-4 shadow-sm"
          >
            <div className="flex gap-3">
              <div className="h-12 w-12 animate-pulse rounded-xl bg-slate-200" />

              <div className="flex-1">
                <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
                <div className="mt-2 h-3 w-24 animate-pulse rounded bg-slate-100" />
              </div>
            </div>

            <div className="mt-4 h-12 animate-pulse rounded-xl bg-slate-100" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[500px] items-center justify-center p-5">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-xl">
            !
          </div>

          <h2 className="mt-4 font-semibold text-slate-900">
            Something went wrong
          </h2>

          <p className="mt-1 text-sm text-slate-500">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="p-5 pb-28">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-slate-900">
          My Bookings
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          View and manage your appointments
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-3xl bg-white px-6 py-12 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
            📅
          </div>

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            No bookings yet
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            You haven't booked an appointment with a doctor yet.
          </p>

          <button
            onClick={() => router.push("/")}
            className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Find a Doctor
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <button
              key={booking.id}
              onClick={() =>
                router.push(`/bookings/${booking.id}`)
              }
              className="w-full rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-100 transition active:scale-[0.99] hover:ring-blue-100"
            >
              {/* Doctor */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg">
                  👨‍⚕️
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-slate-900">
                    {booking.doctorName}
                  </h3>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Doctor appointment
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${getStatusStyle(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>

              {/* Date / Time */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-slate-50 px-3 py-2.5">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                    Date
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-700">
                    {formatDate(booking.date)}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 px-3 py-2.5">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                    Time
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-700">
                    {formatTime(booking.time)}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm font-bold text-slate-900">
                  {booking.consultationFee.toLocaleString()} ETB
                </p>

                <span className="text-xs font-semibold text-blue-600">
                  View details →
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
