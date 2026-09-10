
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db, auth } from "@/lib/firebase/config";
import { appointmentsCollection } from "@/lib/firebase/firestore";

interface Doctor {
  id: string;
  name: string;
  email: string;
  profile: string;
  profileImage?: string;
  specialization: string;
  consultationFee: number;
  rating: number;
  experience: number;
  isAvailable: boolean;
}

interface DoctorSlots {
  doctorId: string;
  doctorName: string;
  monday?: string[];
  tuesday?: string[];
  wednesday?: string[];
  thursday?: string[];
  friday?: string[];
  saturday?: string[];
  sunday?: string[];
  slotDuration?: number;
}

interface Appointment {
  doctorId: string;
  patientId: string;
  date: string;
  time: string;
}

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatTime(time: string) {
  const [start] = time.split("-");

  const [hourString, minute] = start.split(":");

  const hour = Number(hourString);

  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minute} ${suffix}`;
}

function formatDateFull(dateString: string) {
  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function getHour(slot: string) {
  const [start] = slot.split("-");

  return Number(start.split(":")[0]);
}

export default function DoctorDetailPage() {
  const params = useParams();
  const router = useRouter();

  const doctorId = params.doctorId as string;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [doctorSlots, setDoctorSlots] =
    useState<DoctorSlots | null>(null);

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const [bookedSlots, setBookedSlots] = useState<Appointment[]>([]);

  // ============================================================
  // LOAD DOCTOR
  // ============================================================

  useEffect(() => {
    if (!doctorId) return;

    const loadDoctor = async () => {
      try {
        setLoading(true);

        const doctorRef = doc(db, "doctors", doctorId);

        const doctorSnapshot = await getDoc(doctorRef);

        if (!doctorSnapshot.exists()) {
          setDoctor(null);
          return;
        }

        const data = doctorSnapshot.data();

        setDoctor({
          id: doctorSnapshot.id,
          name: data.name ?? "",
          email: data.email ?? "",
          profile: data.profile ?? "",
          profileImage: data.profileImage ?? "",
          specialization: data.specialization ?? "",
          consultationFee: Number(
            data.consultationFee ?? 0
          ),
          rating: Number(data.rating ?? 0),
          experience: Number(data.experience ?? 0),
          isAvailable: data.isAvailable ?? false,
        });

        const slotsRef = doc(db, "slots", doctorId);

        const slotsSnapshot = await getDoc(slotsRef);

        if (slotsSnapshot.exists()) {
          setDoctorSlots(
            slotsSnapshot.data() as DoctorSlots
          );
        }
      } catch (error) {
        console.error("Failed to load doctor:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctor();
  }, [doctorId]);

  // ============================================================
  // NEXT 7 DAYS
  // ============================================================

  const availableDates = useMemo(() => {
    const dates: Date[] = [];

    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);

      date.setDate(today.getDate() + i);

      dates.push(date);
    }

    return dates;
  }, []);

  // ============================================================
  // DEFAULT DATE
  // ============================================================

  useEffect(() => {
    if (!selectedDate && availableDates.length > 0) {
      setSelectedDate(formatDate(availableDates[0]));
    }
  }, [availableDates, selectedDate]);

  // ============================================================
  // GET DAILY SLOTS
  // ============================================================

  const availableSlots = useMemo(() => {
    if (!doctorSlots || !selectedDate) {
      return [];
    }

    const date = new Date(`${selectedDate}T00:00:00`);

    const dayName =
      days[date.getDay()] as keyof DoctorSlots;

    const slots = doctorSlots[dayName];

    if (!Array.isArray(slots)) {
      return [];
    }

    return slots as string[];
  }, [doctorSlots, selectedDate]);

  // ============================================================
  // GROUP TIME SLOTS
  // ============================================================

  const morningSlots = useMemo(
    () =>
      availableSlots.filter((slot) => {
        const hour = getHour(slot);

        return hour < 12;
      }),
    [availableSlots]
  );

  const afternoonSlots = useMemo(
    () =>
      availableSlots.filter((slot) => {
        const hour = getHour(slot);

        return hour >= 12 && hour < 17;
      }),
    [availableSlots]
  );

  const eveningSlots = useMemo(
    () =>
      availableSlots.filter((slot) => {
        const hour = getHour(slot);

        return hour >= 17;
      }),
    [availableSlots]
  );

  // ============================================================
  // LOAD BOOKED SLOTS
  // ============================================================

  useEffect(() => {
    if (!doctorId || !selectedDate) return;

    const loadBookedSlots = async () => {
      try {
        const appointmentsQuery = query(
          collection(db, "appointments"),
          where("doctorId", "==", doctorId),
          where("date", "==", selectedDate)
        );

        const snapshot = await getDocs(
          appointmentsQuery
        );

        const appointments: Appointment[] =
          snapshot.docs.map((item) => {
            const data = item.data();

            return {
              doctorId: data.doctorId,
              patientId: data.patientId,
              date: data.date,
              time: data.time,
            };
          });

        setBookedSlots(appointments);

        if (
          selectedSlot &&
          appointments.some(
            (appointment) =>
              appointment.time === selectedSlot
          )
        ) {
          setSelectedSlot("");
        }
      } catch (error) {
        console.error(
          "Failed to load booked slots:",
          error
        );
      }
    };

    loadBookedSlots();
  }, [doctorId, selectedDate, selectedSlot]);

  // ============================================================
  // CHECK BOOKED
  // ============================================================

  const isSlotBooked = (slot: string) => {
    return bookedSlots.some(
      (appointment) => appointment.time === slot
    );
  };

  // ============================================================
  // BOOK
  // ============================================================

  const handleBooking_old = async () => {
    if (!doctor || !selectedDate || !selectedSlot) {
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      alert(
        "Please login before booking an appointment."
      );
      return;
    }

    if (isSlotBooked(selectedSlot)) {
      alert(
        "This time slot has already been booked."
      );
      return;
    }

    try {
      setBooking(true);

      await addDoc(appointmentsCollection, {
        doctorId: doctor.id,
        doctorName: doctor.name,

        patientId: user.uid,
        patientEmail: user.email ?? "",

        date: selectedDate,
        time: selectedSlot,

        consultationFee: doctor.consultationFee,

        status: "pending",

        meetingId: "",

        createdAt: serverTimestamp(),
      });

      setBookedSlots((previous) => [
        ...previous,
        {
          doctorId: doctor.id,
          patientId: user.uid,
          date: selectedDate,
          time: selectedSlot,
        },
      ]);

      setSelectedSlot("");

      alert("Appointment booked successfully!");
    } catch (error) {
      console.error("Booking failed:", error);

      alert(
        "Failed to book appointment. Please try again."
      );
    } finally {
      setBooking(false);
    }
  };
  
// ============================================================
// BOOK
// ============================================================


// ============================================================
// BOOK
// ============================================================

const handleBooking = async () => {
  if (!doctor || !selectedDate || !selectedSlot) {
    return;
  }

  const user = auth.currentUser;

  if (!user) {
    alert("Please login before booking an appointment.");
    router.push("/login");
    return;
  }

  if (isSlotBooked(selectedSlot)) {
    alert("This time slot has already been booked.");
    return;
  }

  try {
    setBooking(true);

    // ----------------------------------------------------------
    // CREATE APPOINTMENT
    // ----------------------------------------------------------

    const appointmentRef = await addDoc(
      appointmentsCollection,
      {
        doctorId: doctor.id,
        doctorName: doctor.name,

        patientId: user.uid,
        patientEmail: user.email ?? "",

        date: selectedDate,
        time: selectedSlot,

        consultationFee: doctor.consultationFee,

        status: "pending",

        meetingId: "",

        createdAt: serverTimestamp(),
      }
    );

    console.log(
      "Appointment created:",
      appointmentRef.id
    );

    // ----------------------------------------------------------
    // GO BACK TO HOME
    // AND AUTOMATICALLY SELECT BOOKINGS TAB
    // ----------------------------------------------------------

    router.push(
      `/?tab=bookings&bookingId=${appointmentRef.id}`
    );

  } catch (error) {
    console.error("Booking failed:", error);

    alert(
      "Failed to book appointment. Please try again."
    );
  } finally {
    setBooking(false);
  }
};


  
// ============================================================
// LOADING SKELETON
// ============================================================

if (loading) {
  return (
    <main className="h-dvh overflow-hidden bg-slate-100 sm:px-4 sm:py-6">
      <div className="mx-auto flex h-full w-full max-w-[430px] flex-col overflow-hidden bg-slate-50 shadow-xl sm:rounded-[2rem] sm:ring-1 sm:ring-slate-200">

        {/* ====================================================
            HEADER SKELETON
        ==================================================== */}

        <header className="flex h-[60px] shrink-0 items-center gap-3 border-b border-slate-100 bg-white px-4">
          <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200" />

          <div className="min-w-0 flex-1">
            <div className="h-2.5 w-20 animate-pulse rounded bg-slate-100" />

            <div className="mt-1.5 h-4 w-36 animate-pulse rounded bg-slate-200" />
          </div>
        </header>

        {/* ====================================================
            SCROLLABLE SKELETON CONTENT
        ==================================================== */}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="px-4 pb-5 pt-3">

            {/* ==================================================
                DOCTOR CARD SKELETON
            ================================================== */}

            <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
              {/* Blue header */}
              <div className="bg-slate-200 px-4 py-4">
                <div className="flex items-center gap-3">

                  {/* Avatar */}
                  <div className="h-16 w-16 shrink-0 animate-pulse rounded-2xl bg-slate-300" />

                  {/* Doctor info */}
                  <div className="min-w-0 flex-1">
                    <div className="h-4 w-36 animate-pulse rounded bg-slate-300" />

                    <div className="mt-2 h-3 w-28 animate-pulse rounded bg-slate-300" />

                    <div className="mt-3 flex gap-2">
                      <div className="h-5 w-14 animate-pulse rounded-full bg-slate-300" />

                      <div className="h-4 w-24 animate-pulse rounded bg-slate-300" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Fee / availability */}
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="h-2.5 w-24 animate-pulse rounded bg-slate-100" />

                  <div className="mt-2 h-5 w-20 animate-pulse rounded bg-slate-200" />
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-slate-200" />

                  <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            </section>

            {/* ==================================================
                DATE SKELETON
            ================================================== */}

            <section className="mt-5">
              <div className="mb-2.5 flex items-center justify-between">
                <div>
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

                  <div className="mt-2 h-2.5 w-20 animate-pulse rounded bg-slate-100" />
                </div>

                <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
              </div>

              {/* Date cards */}
              <div className="-mx-4 overflow-hidden px-4 pb-1">
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                      key={item}
                      className="h-[62px] min-w-[58px] shrink-0 animate-pulse rounded-2xl border border-slate-100 bg-white"
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* ==================================================
                TIME SKELETON
            ================================================== */}

            <section className="mt-5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

                  <div className="mt-2 h-2.5 w-32 animate-pulse rounded bg-slate-100" />
                </div>

                <div className="h-5 w-16 animate-pulse rounded-full bg-slate-100" />
              </div>

              {/* Morning */}
              <div className="mb-4">
                <div className="mb-2 h-3 w-20 animate-pulse rounded bg-slate-200" />

                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                      key={item}
                      className="h-10 animate-pulse rounded-xl border border-slate-100 bg-white"
                    />
                  ))}
                </div>
              </div>

              {/* Afternoon */}
              <div className="mb-4">
                <div className="mb-2 h-3 w-24 animate-pulse rounded bg-slate-200" />

                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                      key={item}
                      className="h-10 animate-pulse rounded-xl border border-slate-100 bg-white"
                    />
                  ))}
                </div>
              </div>

              {/* Evening */}
              <div>
                <div className="mb-2 h-3 w-20 animate-pulse rounded bg-slate-200" />

                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-10 animate-pulse rounded-xl border border-slate-100 bg-white"
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ====================================================
            BOOKING BAR SKELETON
        ==================================================== */}

        <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)]">
          <div className="flex items-center gap-3">

            <div className="min-w-0 flex-1">
              <div className="h-2.5 w-20 animate-pulse rounded bg-slate-100" />

              <div className="mt-2 h-5 w-20 animate-pulse rounded bg-slate-200" />
            </div>

            <div className="h-12 w-36 animate-pulse rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
    </main>
  );
}


  // ============================================================
  // NOT FOUND
  // ============================================================

  if (!doctor) {
    return (
      <main className="h-dvh overflow-hidden bg-slate-100 sm:px-4 sm:py-6">
        <div className="mx-auto flex h-full w-full max-w-[430px] flex-col items-center justify-center overflow-hidden bg-white px-6 shadow-xl sm:rounded-[2rem] sm:ring-1 sm:ring-slate-200">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
              👨‍⚕️
            </div>

            <h1 className="mt-4 text-lg font-bold text-slate-900">
              Doctor not found
            </h1>

            <p className="mt-1 text-xs text-slate-500">
              We couldn't find this doctor.
            </p>

            <button
              type="button"
              onClick={() => router.back()}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition active:scale-95"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // TIME GROUP
  // ============================================================

  const TimeGroup = ({
    title,
    icon,
    slots,
  }: {
    title: string;
    icon: string;
    slots: string[];
  }) => {
    if (slots.length === 0) return null;

    return (
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-1.5">
          <span className="text-xs">{icon}</span>

          <span className="text-[11px] font-bold text-slate-600">
            {title}
          </span>

          <span className="text-[10px] text-slate-400">
            {slots.length}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {slots.map((slot) => {
            const booked = isSlotBooked(slot);
            const selected = selectedSlot === slot;

            return (
              <button
                key={slot}
                type="button"
                disabled={booked}
                onClick={() => setSelectedSlot(slot)}
                className={`relative h-10 rounded-xl border text-[11px] font-semibold transition-all active:scale-95 ${
                  booked
                    ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
                    : selected
                      ? "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-200"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {formatTime(slot)}

                {booked && (
                  <span className="absolute inset-x-0 bottom-0.5 text-[7px] font-normal text-slate-300">
                    Booked
                  </span>
                )}

                {selected && (
                  <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-[8px] text-blue-600">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <main className="h-dvh overflow-hidden bg-slate-100 sm:px-4 sm:py-6">
      {/* ======================================================
          CONSTANT MOBILE FRAME
      ======================================================= */}

      <div className="mx-auto flex h-full w-full max-w-[430px] flex-col overflow-hidden bg-slate-50 shadow-xl sm:rounded-[2rem] sm:ring-1 sm:ring-slate-200">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <header className="z-40 flex h-[60px] shrink-0 items-center gap-3 border-b border-slate-100 bg-white px-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-base text-slate-700 transition active:scale-90"
            aria-label="Go back"
          >
            ←
          </button>

          <div className="min-w-0">
            <p className="text-[9px] font-medium uppercase tracking-wider text-slate-400">
              Appointment
            </p>

            <h1 className="truncate text-sm font-bold text-slate-900">
              {doctor.name}
            </h1>
          </div>
        </header>

        {/* ====================================================
            SCROLLABLE CONTENT
        ==================================================== */}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="px-4 pb-5 pt-3">

            {/* Doctor Card */}
            <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
              <div className="bg-gradient-to-br from-blue-600 to-blue-500 px-4 py-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-white/20 bg-white/10 text-2xl">
                    {doctor.profileImage ? (
                      <img
                        src={doctor.profileImage}
                        alt={doctor.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      "👨‍⚕️"
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-base font-bold">
                      {doctor.name}
                    </h2>

                    <p className="mt-0.5 truncate text-xs text-blue-100">
                      {doctor.specialization}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="rounded-full bg-white/15 px-2 py-1 text-[10px]">
                        ⭐ {doctor.rating.toFixed(1)}
                      </span>

                      <span className="text-[10px] text-blue-100">
                        {doctor.experience} yrs experience
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-[9px] uppercase tracking-wide text-slate-400">
                    Consultation fee
                  </p>

                  <p className="mt-0.5 text-base font-bold text-slate-900">
                    {doctor.consultationFee} ETB
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      doctor.isAvailable
                        ? "bg-green-500"
                        : "bg-slate-300"
                    }`}
                  />

                  <span
                    className={`text-[10px] font-semibold ${
                      doctor.isAvailable
                        ? "text-green-600"
                        : "text-slate-400"
                    }`}
                  >
                    {doctor.isAvailable
                      ? "Available"
                      : "Schedule available"}
                  </span>
                </div>
              </div>
            </section>

            {/* Date */}
            <section className="mt-5">
              <div className="mb-2.5 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Choose date
                  </h2>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Select a day
                  </p>
                </div>

                <span className="text-[10px] text-slate-400">
                  Next 7 days
                </span>
              </div>

              <div className="-mx-4 overflow-x-auto px-4 pb-1 scrollbar-hide">
                <div className="flex gap-2">
                  {availableDates.map((date) => {
                    const value = formatDate(date);

                    const selected =
                      selectedDate === value;

                    const dayName =
                      days[
                        date.getDay()
                      ] as keyof DoctorSlots;

                    const hasSlots =
                      doctorSlots &&
                      Array.isArray(
                        doctorSlots[dayName]
                      ) &&
                      (
                        doctorSlots[
                          dayName
                        ] as string[]
                      ).length > 0;

                    const isToday =
                      value === formatDate(new Date());

                    return (
                      <button
                        key={value}
                        type="button"
                        disabled={!hasSlots}
                        onClick={() => {
                          setSelectedDate(value);
                          setSelectedSlot("");
                        }}
                        className={`relative flex h-[62px] min-w-[58px] shrink-0 flex-col items-center justify-center rounded-2xl border transition-all active:scale-95 ${
                          selected
                            ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-100"
                            : hasSlots
                              ? "border-slate-200 bg-white text-slate-700"
                              : "border-slate-100 bg-slate-50 text-slate-300"
                        }`}
                      >
                        {isToday && (
                          <span
                            className={`absolute right-1.5 top-1 h-1.5 w-1.5 rounded-full ${
                              selected
                                ? "bg-white"
                                : "bg-blue-500"
                            }`}
                          />
                        )}

                        <span className="text-[9px] font-medium">
                          {date.toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                            }
                          )}
                        </span>

                        <span className="mt-0.5 text-base font-bold">
                          {date.getDate()}
                        </span>

                        <span className="text-[8px]">
                          {date.toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                            }
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Time */}
            <section className="mt-5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Choose time
                  </h2>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    {selectedDate
                      ? formatDateFull(selectedDate)
                      : "Select a date"}
                  </p>
                </div>

                <div className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-medium text-slate-500">
                  {availableSlots.length} slots
                </div>
              </div>

              {availableSlots.length === 0 ? (
                <div className="rounded-2xl bg-white px-5 py-7 text-center ring-1 ring-slate-100">
                  <div className="text-2xl">🕐</div>

                  <p className="mt-2 text-xs font-bold text-slate-800">
                    No available times
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    Try another date.
                  </p>
                </div>
              ) : (
                <div>
                  <TimeGroup
                    title="Morning"
                    icon="☀️"
                    slots={morningSlots}
                  />

                  <TimeGroup
                    title="Afternoon"
                    icon="🌤️"
                    slots={afternoonSlots}
                  />

                  <TimeGroup
                    title="Evening"
                    icon="🌙"
                    slots={eveningSlots}
                  />
                </div>
              )}
            </section>

            {/* Selected Appointment */}
            {selectedSlot && (
              <section className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 px-3.5 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-sm shadow-sm">
                    ✓
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-semibold uppercase tracking-wide text-blue-500">
                      Selected appointment
                    </p>

                    <p className="mt-0.5 truncate text-xs font-bold text-slate-900">
                      {formatDateFull(selectedDate)}
                    </p>

                    <p className="text-[10px] text-slate-500">
                      {formatTime(selectedSlot)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[9px] text-slate-400">
                      Fee
                    </p>

                    <p className="text-xs font-bold text-slate-900">
                      {doctor.consultationFee} ETB
                    </p>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* ====================================================
            BOOKING BAR
            INSIDE THE MOBILE FRAME
        ==================================================== */}

        <div className="shrink-0 border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[9px] uppercase tracking-wide text-slate-400">
                Consultation
              </p>

              <p className="mt-0.5 text-base font-bold text-slate-900">
                {doctor.consultationFee} ETB
              </p>
            </div>

            <button
              type="button"
              onClick={handleBooking}
              disabled={
                booking ||
                !selectedDate ||
                !selectedSlot
              }
              className="rounded-2xl bg-blue-600 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 active:scale-[0.97] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              {booking
                ? "Booking..."
                : selectedSlot
                  ? "Book appointment"
                  : "Select a time"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}