"use client";

import { useEffect, useMemo, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";

import { auth, db } from "@/lib/firebase/config";

type Booking = {
  id: string;
  appointmentId?: string;
  doctorId: string;
  patientId: string;
  doctorName: string;
  patientName?: string;
  patientEmail?: string;
  date: string;
  time: string;
  consultationFee: number;
  status: string;
  meetingId: string;
};

type MeetingState =
  | "not_ready"
  | "waiting"
  | "live"
  | "ended";

const MEETING_DURATION_MINUTES = 25;

export default function BookingDetailPage() {
  const router = useRouter();
  const params = useParams();

  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [now, setNow] = useState(new Date());

  // ============================================================
  // LOAD BOOKING
  // ============================================================

  useEffect(() => {
    const loadBooking = async () => {
      try {
        setLoading(true);
        setError("");

        const user = auth.currentUser;

        if (!user) {
          setError("Please login again.");
          return;
        }

        const bookingRef = doc(db, "appointments", bookingId);
        const snapshot = await getDoc(bookingRef);

        if (!snapshot.exists()) {
          setError("Booking not found.");
          return;
        }

        const data = snapshot.data();

        if (data.patientId !== user.uid) {
          setError("You don't have access to this booking.");
          return;
        }

        setBooking({
          id: snapshot.id,
          appointmentId: data.appointmentId ?? snapshot.id,
          doctorId: data.doctorId ?? "",
          patientId: data.patientId ?? "",
          doctorName: data.doctorName ?? "Doctor",
          patientName: data.patientName ?? "",
          patientEmail: data.patientEmail ?? "",
          date: data.date ?? "",
          time: data.time ?? "",
          consultationFee: Number(data.consultationFee ?? 0),
          status: data.status ?? "pending",
          meetingId: data.meetingId ?? "",
        });
      } catch (err) {
        console.error(err);
        setError("Unable to load booking details.");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      loadBooking();
    }
  }, [bookingId]);

  // ============================================================
  // LIVE CLOCK
  // ============================================================

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ============================================================
  // FORMAT DATE
  // ============================================================

  const formatDate = (date: string) => {
    if (!date) return "Not available";

    const parsed = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // ============================================================
  // FORMAT TIME
  // ============================================================

  const formatTime = (time: string) => {
    if (!time) return "Not available";

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

  // ============================================================
  // MEETING START
  // ============================================================

  const meetingStart = useMemo(() => {
    if (!booking?.date || !booking?.time) {
      return null;
    }

    const startTime = booking.time.split("-")[0];

    if (!startTime) {
      return null;
    }

    const [hours, minutes] = startTime.split(":").map(Number);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return null;
    }

    const start = new Date(`${booking.date}T00:00:00`);

    start.setHours(hours, minutes, 0, 0);

    return start;
  }, [booking]);

  // ============================================================
  // MEETING END
  // ============================================================

  const meetingEnd = useMemo(() => {
    if (!meetingStart) {
      return null;
    }

    return new Date(
      meetingStart.getTime() +
        MEETING_DURATION_MINUTES * 60 * 1000
    );
  }, [meetingStart]);

  // ============================================================
  // MEETING STATE
  // ============================================================

  const meetingState = useMemo<MeetingState>(() => {
    if (!booking) {
      return "not_ready";
    }

    if (booking.status.toLowerCase() !== "confirmed") {
      return "not_ready";
    }

    if (!booking.meetingId) {
      return "not_ready";
    }

    if (!meetingStart || !meetingEnd) {
      return "not_ready";
    }

    if (now < meetingStart) {
      return "waiting";
    }

    if (now >= meetingStart && now < meetingEnd) {
      return "live";
    }

    return "ended";
  }, [booking, meetingStart, meetingEnd, now]);

  // ============================================================
  // COUNTDOWN
  // ============================================================

  const getCountdown = () => {
    if (!meetingStart || !meetingEnd) {
      return "";
    }

    if (meetingState === "live") {
      const remaining =
        meetingEnd.getTime() - now.getTime();

      const totalSeconds = Math.max(
        0,
        Math.floor(remaining / 1000)
      );

      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      return `Ends in ${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }

    if (meetingState === "ended") {
      return "Meeting ended";
    }

    const difference =
      meetingStart.getTime() - now.getTime();

    if (difference <= 0) {
      return "Starting now";
    }

    const totalSeconds = Math.floor(difference / 1000);

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `Starts in ${hours}h ${minutes}m ${seconds}s`;
    }

    if (minutes > 0) {
      return `Starts in ${minutes}m ${seconds}s`;
    }

    return `Starts in ${seconds}s`;
  };

  // ============================================================
  // JOIN JITSI
  // ============================================================

  const joinMeeting = () => {
    if (!booking?.meetingId) {
      return;
    }

    if (meetingState !== "live") {
      return;
    }

    router.push(
      `/meeting/${encodeURIComponent(booking.meetingId)}`
    );
  };

  // ============================================================
  // STATUS STYLE
  // ============================================================

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

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <main className="h-dvh overflow-hidden bg-slate-100 sm:px-4 sm:py-6">
        <div className="mx-auto flex h-full w-full max-w-[430px] flex-col overflow-hidden bg-slate-50 shadow-xl sm:rounded-[2rem]">
          <div className="flex-1 overflow-hidden p-5">
            <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200" />

            <div className="mt-8 h-8 w-48 animate-pulse rounded bg-slate-200" />

            <div className="mt-6 h-48 animate-pulse rounded-3xl bg-slate-200" />

            <div className="mt-4 h-52 animate-pulse rounded-3xl bg-slate-200" />
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error || !booking) {
    return (
      <main className="h-dvh overflow-hidden bg-slate-100 sm:px-4 sm:py-6">
        <div className="mx-auto flex h-full w-full max-w-[430px] items-center justify-center overflow-hidden bg-slate-50 px-6 shadow-xl sm:rounded-[2rem]">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-xl">
              !
            </div>

            <h2 className="mt-4 text-lg font-bold text-slate-900">
              Booking not found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {error || "This booking could not be found."}
            </p>

            <button
              onClick={() => router.back()}
              className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <main className="h-dvh overflow-hidden bg-slate-100 sm:px-4 sm:py-6">
      <div className="mx-auto flex h-full w-full max-w-[430px] flex-col overflow-hidden bg-slate-50 shadow-xl sm:rounded-[2rem]">

        {/* ======================================================
            HEADER - FIXED
        ====================================================== */}

        <header className="flex shrink-0 items-center gap-3 border-b border-slate-100 bg-white px-5 py-4">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-700"
            aria-label="Go back"
          >
            ←
          </button>

          <div className="min-w-0">
            <h1 className="text-base font-bold text-slate-900">
              Booking Details
            </h1>

            <p className="text-[11px] text-slate-400">
              Appointment information
            </p>
          </div>
        </header>

        {/* ======================================================
            SCROLLABLE CONTENT ONLY
        ====================================================== */}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 pt-5">

          {/* STATUS */}

          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400">
              Appointment status
            </p>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${getStatusStyle(
                booking.status
              )}`}
            >
              {booking.status}
            </span>
          </div>

          {/* DOCTOR */}

          <div className="mt-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                👨‍⚕️
              </div>

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Doctor
                </p>

                <h2 className="mt-1 truncate text-lg font-bold text-slate-900">
                  {booking.doctorName}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Medical consultation
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                router.push(`/doctors/${booking.doctorId}`)
              }
              className="mt-4 w-full rounded-xl bg-slate-50 py-2.5 text-xs font-semibold text-blue-600"
            >
              View Doctor Profile
            </button>
          </div>

          {/* APPOINTMENT INFORMATION */}

          <div className="mt-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              Appointment Information
            </h3>

            <div className="mt-4 space-y-4">
              <InfoRow
                icon="📅"
                label="Date"
                value={formatDate(booking.date)}
              />

              <InfoRow
                icon="🕐"
                label="Start Time"
                value={formatTime(booking.time)}
              />

              <InfoRow
                icon="⏱️"
                label="Meeting Duration"
                value={`${MEETING_DURATION_MINUTES} minutes`}
              />

              <InfoRow
                icon="💰"
                label="Consultation Fee"
                value={`${booking.consultationFee.toLocaleString()} ETB`}
              />

              <InfoRow
                icon="🆔"
                label="Booking ID"
                value={booking.id}
              />
            </div>
          </div>

          {/* CONFIRMED MEETING */}

          {booking.status.toLowerCase() === "confirmed" && (
            <div
              className={`mt-4 rounded-3xl p-5 ${
                meetingState === "live"
                  ? "bg-blue-600 text-white"
                  : meetingState === "ended"
                    ? "bg-slate-100 text-slate-600"
                    : "bg-blue-50 text-slate-900"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    meetingState === "live"
                      ? "bg-white/15"
                      : "bg-blue-100"
                  }`}
                >
                  📹
                </div>

                <div className="min-w-0 flex-1">
                  <h3
                    className={`font-bold ${
                      meetingState === "live"
                        ? "text-white"
                        : "text-slate-900"
                    }`}
                  >
                    {meetingState === "live"
                      ? "Video consultation is live"
                      : meetingState === "ended"
                        ? "Video consultation ended"
                        : "Your appointment is confirmed"}
                  </h3>

                  <p
                    className={`mt-1 text-xs leading-5 ${
                      meetingState === "live"
                        ? "text-blue-100"
                        : "text-slate-500"
                    }`}
                  >
                    {meetingState === "live"
                      ? "You and your doctor can join the Jitsi video call now."
                      : meetingState === "ended"
                        ? "The 25-minute consultation window has ended."
                        : "The video call will become available at the exact appointment time."}
                  </p>
                </div>
              </div>

              {/* MEETING TIMER */}

              <div
                className={`mt-4 rounded-2xl px-4 py-4 ${
                  meetingState === "live"
                    ? "bg-white/10"
                    : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p
                      className={`text-[10px] font-medium uppercase tracking-wide ${
                        meetingState === "live"
                          ? "text-blue-100"
                          : "text-slate-400"
                      }`}
                    >
                      Meeting
                    </p>

                    <p
                      className={`mt-1 text-sm font-bold ${
                        meetingState === "live"
                          ? "text-white"
                          : "text-slate-900"
                      }`}
                    >
                      25 minute consultation
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p
                      className={`text-lg font-bold ${
                        meetingState === "live"
                          ? "text-white"
                          : "text-blue-600"
                      }`}
                    >
                      {getCountdown()}
                    </p>
                  </div>
                </div>
              </div>

              {/* JOIN */}

              <button
                onClick={joinMeeting}
                disabled={meetingState !== "live"}
                className={`mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold transition ${
                  meetingState === "live"
                    ? "bg-white text-blue-600 shadow-sm active:scale-[0.98]"
                    : "cursor-not-allowed bg-slate-200 text-slate-400"
                }`}
              >
                {meetingState === "waiting" && (
                  <>
                    <span>⏳</span>
                    Waiting for Appointment
                  </>
                )}

                {meetingState === "live" && (
                  <>
                    <span>📹</span>
                    Join Doctor Video Call
                  </>
                )}

                {meetingState === "ended" && (
                  <>
                    <span>✓</span>
                    Meeting Ended
                  </>
                )}

                {meetingState === "not_ready" && (
                  <>
                    <span>⏳</span>
                    Meeting Not Available
                  </>
                )}
              </button>

              {booking.meetingId && (
                <p
                  className={`mt-3 text-center text-[10px] ${
                    meetingState === "live"
                      ? "text-blue-100"
                      : "text-slate-400"
                  }`}
                >
                  Meeting ID: {booking.meetingId}
                </p>
              )}
            </div>
          )}

          {/* PENDING */}

          {booking.status.toLowerCase() === "pending" && (
            <div className="mt-4 rounded-3xl bg-amber-50 p-5">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                  ⏳
                </div>

                <div>
                  <h3 className="font-bold text-amber-900">
                    Waiting for confirmation
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-amber-700">
                    Your appointment request has been sent to
                    the doctor. The video call will become
                    available after the doctor confirms your
                    appointment.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* COMPLETED */}

          {booking.status.toLowerCase() === "completed" && (
            <div className="mt-4 rounded-3xl bg-blue-50 p-5">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                  ✓
                </div>

                <div>
                  <h3 className="font-bold text-blue-900">
                    Consultation completed
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-blue-700">
                    This appointment and its 25-minute
                    consultation have been completed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CANCELLED */}

          {booking.status.toLowerCase() === "cancelled" && (
            <div className="mt-4 rounded-3xl bg-red-50 p-5">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100">
                  ×
                </div>

                <div>
                  <h3 className="font-bold text-red-900">
                    Appointment cancelled
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-red-700">
                    This appointment is no longer active and
                    the video consultation cannot be joined.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PATIENT INFORMATION */}

          <div className="mt-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              Patient Information
            </h3>

            <div className="mt-4 space-y-4">
              {booking.patientName && (
                <InfoRow
                  icon="👤"
                  label="Patient"
                  value={booking.patientName}
                />
              )}

              {booking.patientEmail && (
                <InfoRow
                  icon="✉️"
                  label="Email"
                  value={booking.patientEmail}
                />
              )}
            </div>
          </div>

          {/* Extra bottom space inside scroll area */}
          <div className="h-4" />
        </div>

        {/* ======================================================
            BOTTOM - FIXED INSIDE MOBILE FRAME
        ====================================================== */}

        <div className="shrink-0 border-t border-slate-100 bg-white p-4">
          <button
            onClick={() => router.back()}
            className="w-full rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-700"
          >
            Back to My Bookings
          </button>
        </div>
      </div>
    </main>
  );
}

// ============================================================
// INFO ROW
// ============================================================

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}
