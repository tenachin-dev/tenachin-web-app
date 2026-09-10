// "use client";

// import AuthGuard from "@/components/auth/AuthGuard";
// import DoctorsScreen from "@/components/doctors/DoctorsScreen";
// import ProfileScreen from "@/components/profile/ProfileScreen";
// import BookingsScreen from "../app/bookings/page";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// type Tab = "home" | "doctors" | "bookings" | "profile";

// export default function Home() {
//   const searchParams = useSearchParams();

//   const [activeTab, setActiveTab] = useState<Tab>("home");

//   // ============================================================
//   // READ TAB FROM URL
//   // ============================================================

//   useEffect(() => {
//     const tab = searchParams.get("tab");

//     if (
//       tab === "home" ||
//       tab === "doctors" ||
//       tab === "bookings" ||
//       tab === "profile"
//     ) {
//       setActiveTab(tab);
//     }
//   }, [searchParams]);

//   return (
//     <AuthGuard>
//       {/* ============================================================
//           FULL DEVICE VIEWPORT
//       ============================================================ */}

//       <main className="h-dvh overflow-hidden bg-slate-100 sm:px-4 sm:py-6">

//         {/* ============================================================
//             MOBILE APP FRAME
//         ============================================================ */}

//         <div className="mx-auto flex h-full w-full max-w-[430px] flex-col overflow-hidden bg-slate-50 shadow-xl sm:rounded-[2rem] sm:ring-1 sm:ring-slate-200">

//           {/* ========================================================
//               HEADER
//           ======================================================== */}

//           <header className="shrink-0 border-b border-slate-100 bg-white px-5 pb-4 pt-6">

//             <div className="flex items-center justify-between">

//               {/* Logo / Home */}

//               <button
//                 onClick={() => setActiveTab("home")}
//                 className="flex items-center gap-2.5"
//               >
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
//                   T
//                 </div>

//                 <div className="text-left">
//                   <h1 className="text-lg font-bold text-slate-900">
//                     Tenachin
//                   </h1>

//                   <p className="text-[10px] text-slate-400">
//                     Patient Care
//                   </p>
//                 </div>
//               </button>

//               {/* Notification */}

//               <button
//                 className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-600 transition hover:bg-slate-100"
//                 aria-label="Notifications"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.8"
//                   className="h-5 w-5"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9a6 6 0 1 0-12 0v.75a8.967 8.967 0 0 1-2.31 6.022c1.83.68 3.65 1.12 5.453 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
//                   />
//                 </svg>

//                 <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-blue-600" />
//               </button>

//             </div>
//           </header>

//           {/* ========================================================
//               SCROLLABLE CONTENT
//           ======================================================== */}

//           <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">

//             {/* HOME */}

//             {activeTab === "home" && (
//               <HomeContent
//                 onDoctors={() => setActiveTab("doctors")}
//                 onBookings={() => setActiveTab("bookings")}
//                 onProfile={() => setActiveTab("profile")}
//               />
//             )}

//             {/* DOCTORS */}

//             {activeTab === "doctors" && (
//               <DoctorsScreen />
//             )}

//             {/* BOOKINGS */}

//             {activeTab === "bookings" && (
//               <BookingsScreen />
//             )}

//             {/* PROFILE */}

//             {activeTab === "profile" && (
//               <ProfileScreen
//                 onDoctors={() => setActiveTab("doctors")}
//                 onBookings={() => setActiveTab("bookings")}
//               />
//             )}

//           </div>

//           {/* ========================================================
//               BOTTOM NAVIGATION
//           ======================================================== */}

//           <nav className="shrink-0 border-t border-slate-100 bg-white/95 px-3 backdrop-blur">

//             <div className="flex h-[76px] items-center justify-around">

//               <BottomNavItem
//                 label="Home"
//                 active={activeTab === "home"}
//                 onClick={() => setActiveTab("home")}
//                 icon="⌂"
//               />

//               <BottomNavItem
//                 label="Doctors"
//                 active={activeTab === "doctors"}
//                 onClick={() => setActiveTab("doctors")}
//                 icon="♙"
//               />

//               <BottomNavItem
//                 label="Bookings"
//                 active={activeTab === "bookings"}
//                 onClick={() => setActiveTab("bookings")}
//                 icon="▣"
//               />

//               <BottomNavItem
//                 label="Profile"
//                 active={activeTab === "profile"}
//                 onClick={() => setActiveTab("profile")}
//                 icon="●"
//               />

//             </div>

//           </nav>

//         </div>
//       </main>
//     </AuthGuard>
//   );
// }

// /* ============================================================
//    HOME CONTENT
// ============================================================ */

// function HomeContent({
//   onDoctors,
//   onBookings,
//   onProfile,
// }: {
//   onDoctors: () => void;
//   onBookings: () => void;
//   onProfile: () => void;
// }) {
//   return (
//     <div className="px-5 pb-8 pt-5">

//       <div className="mb-6">
//         <p className="text-sm text-slate-500">
//           Good morning 👋
//         </p>

//         <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
//           How can we help you?
//         </h2>
//       </div>

//       <button
//         onClick={onDoctors}
//         className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-left shadow-sm transition hover:border-blue-200 active:scale-[0.99]"
//       >
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50">
//           🔎
//         </div>

//         <div className="min-w-0 flex-1">
//           <p className="text-sm font-medium text-slate-700">
//             Find a doctor
//           </p>

//           <p className="truncate text-xs text-slate-400">
//             Search doctors and specialties
//           </p>
//         </div>

//         <span className="shrink-0 text-slate-300">
//           →
//         </span>
//       </button>

//       <section className="mt-6">
//         <h3 className="mb-3 text-sm font-bold text-slate-900">
//           Quick actions
//         </h3>

//         <div className="grid grid-cols-3 gap-3">

//           <button
//             onClick={onDoctors}
//             className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-100 transition active:scale-95"
//           >
//             <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
//               👨‍⚕️
//             </div>

//             <p className="mt-3 text-xs font-semibold text-slate-700">
//               Doctors
//             </p>
//           </button>

//           <button
//             onClick={onBookings}
//             className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-100 transition hover:ring-blue-200 active:scale-95"
//           >
//             <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
//               📅
//             </div>

//             <p className="mt-3 text-xs font-semibold text-slate-700">
//               Bookings
//             </p>
//           </button>

//           <button
//             onClick={onProfile}
//             className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-100 transition hover:ring-violet-200 active:scale-95"
//           >
//             <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-xl">
//               👤
//             </div>

//             <p className="mt-3 text-xs font-semibold text-slate-700">
//               Profile
//             </p>
//           </button>

//         </div>
//       </section>

//       <section className="mt-7">
//         <h3 className="mb-3 text-sm font-bold text-slate-900">
//           Upcoming appointment
//         </h3>

//         <div className="rounded-2xl bg-blue-600 p-5 text-white shadow-sm">

//           <p className="text-xs text-blue-100">
//             Next appointment
//           </p>

//           <h4 className="mt-1 text-lg font-bold">
//             No upcoming appointment
//           </h4>

//           <p className="mt-2 text-xs leading-5 text-blue-100">
//             Book an appointment with a doctor to see it here.
//           </p>

//           <button
//             onClick={onDoctors}
//             className="mt-5 flex h-11 w-full items-center justify-center rounded-xl bg-white text-sm font-bold text-blue-600 transition active:scale-[0.98]"
//           >
//             Find a doctor
//           </button>

//         </div>
//       </section>

//     </div>
//   );
// }

// /* ============================================================
//    BOTTOM NAV ITEM
// ============================================================ */

// function BottomNavItem({
//   label,
//   icon,
//   active,
//   onClick,
// }: {
//   label: string;
//   icon: string;
//   active: boolean;
//   onClick: () => void;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex min-w-[64px] flex-col items-center gap-1 rounded-xl px-3 py-2 transition ${
//         active
//           ? "text-blue-600"
//           : "text-slate-400 hover:text-slate-600"
//       }`}
//     >
//       <span className="text-lg">
//         {icon}
//       </span>

//       <span className="text-[10px] font-semibold">
//         {label}
//       </span>
//     </button>
//   );
// }  


"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import DoctorsScreen from "@/components/doctors/DoctorsScreen";
import ProfileScreen from "@/components/profile/ProfileScreen";
import BookingsScreen from "../app/bookings/page";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type Tab = "home" | "doctors" | "bookings" | "profile";

/* ============================================================
   PAGE
============================================================ */

export default function Home() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <HomeContent />
    </Suspense>
  );
}

/* ============================================================
   MAIN HOME COMPONENT
   useSearchParams() is safely inside Suspense
============================================================ */

function HomeContent() {
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<Tab>("home");

  /* ============================================================
     READ TAB FROM URL
  ============================================================ */

  useEffect(() => {
    const tab = searchParams.get("tab");

    if (
      tab === "home" ||
      tab === "doctors" ||
      tab === "bookings" ||
      tab === "profile"
    ) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <AuthGuard>
      {/* ============================================================
          FULL DEVICE VIEWPORT
      ============================================================ */}

      <main className="h-dvh overflow-hidden bg-slate-100 sm:px-4 sm:py-6">
        {/* ========================================================
            MOBILE APP FRAME
        ======================================================== */}

        <div className="mx-auto flex h-full w-full max-w-[430px] flex-col overflow-hidden bg-slate-50 shadow-xl sm:rounded-[2rem] sm:ring-1 sm:ring-slate-200">

          {/* ========================================================
              HEADER
          ======================================================== */}

          <header className="shrink-0 border-b border-slate-100 bg-white px-5 pb-4 pt-6">
            <div className="flex items-center justify-between">

              {/* Logo / Home */}

              <button
                onClick={() => setActiveTab("home")}
                className="flex items-center gap-2.5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                  T
                </div>

                <div className="text-left">
                  <h1 className="text-lg font-bold text-slate-900">
                    Tenachin
                  </h1>

                  <p className="text-[10px] text-slate-400">
                    Patient Care
                  </p>
                </div>
              </button>

              {/* Notification */}

              <button
                className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-600 transition hover:bg-slate-100"
                aria-label="Notifications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9a6 6 0 1 0-12 0v.75a8.967 8.967 0 0 1-2.31 6.022c1.83.68 3.65 1.12 5.453 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>

                <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-blue-600" />
              </button>
            </div>
          </header>

          {/* ========================================================
              SCROLLABLE CONTENT
          ======================================================== */}

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">

            {/* HOME */}

            {activeTab === "home" && (
              <HomeTabContent
                onDoctors={() => setActiveTab("doctors")}
                onBookings={() => setActiveTab("bookings")}
                onProfile={() => setActiveTab("profile")}
              />
            )}

            {/* DOCTORS */}

            {activeTab === "doctors" && <DoctorsScreen />}

            {/* BOOKINGS */}

            {activeTab === "bookings" && <BookingsScreen />}

            {/* PROFILE */}

            {activeTab === "profile" && (
              <ProfileScreen
                onDoctors={() => setActiveTab("doctors")}
                onBookings={() => setActiveTab("bookings")}
              />
            )}
          </div>

          {/* ========================================================
              BOTTOM NAVIGATION
          ======================================================== */}

          <nav className="shrink-0 border-t border-slate-100 bg-white/95 px-3 backdrop-blur">
            <div className="flex h-[76px] items-center justify-around">

              <BottomNavItem
                label="Home"
                active={activeTab === "home"}
                onClick={() => setActiveTab("home")}
                icon="⌂"
              />

              <BottomNavItem
                label="Doctors"
                active={activeTab === "doctors"}
                onClick={() => setActiveTab("doctors")}
                icon="♙"
              />

              <BottomNavItem
                label="Bookings"
                active={activeTab === "bookings"}
                onClick={() => setActiveTab("bookings")}
                icon="▣"
              />

              <BottomNavItem
                label="Profile"
                active={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
                icon="●"
              />
            </div>
          </nav>
        </div>
      </main>
    </AuthGuard>
  );
}

/* ============================================================
   HOME TAB CONTENT
============================================================ */

function HomeTabContent({
  onDoctors,
  onBookings,
  onProfile,
}: {
  onDoctors: () => void;
  onBookings: () => void;
  onProfile: () => void;
}) {
  return (
    <div className="px-5 pb-8 pt-5">

      <div className="mb-6">
        <p className="text-sm text-slate-500">
          Good morning 👋
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          How can we help you?
        </h2>
      </div>

      <button
        onClick={onDoctors}
        className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-left shadow-sm transition hover:border-blue-200 active:scale-[0.99]"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50">
          🔎
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-700">
            Find a doctor
          </p>

          <p className="truncate text-xs text-slate-400">
            Search doctors and specialties
          </p>
        </div>

        <span className="shrink-0 text-slate-300">
          →
        </span>
      </button>

      <section className="mt-6">
        <h3 className="mb-3 text-sm font-bold text-slate-900">
          Quick actions
        </h3>

        <div className="grid grid-cols-3 gap-3">

          <button
            onClick={onDoctors}
            className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-100 transition active:scale-95"
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
              👨‍⚕️
            </div>

            <p className="mt-3 text-xs font-semibold text-slate-700">
              Doctors
            </p>
          </button>

          <button
            onClick={onBookings}
            className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-100 transition hover:ring-blue-200 active:scale-95"
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
              📅
            </div>

            <p className="mt-3 text-xs font-semibold text-slate-700">
              Bookings
            </p>
          </button>

          <button
            onClick={onProfile}
            className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-100 transition hover:ring-violet-200 active:scale-95"
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-xl">
              👤
            </div>

            <p className="mt-3 text-xs font-semibold text-slate-700">
              Profile
            </p>
          </button>

        </div>
      </section>

      <section className="mt-7">
        <h3 className="mb-3 text-sm font-bold text-slate-900">
          Upcoming appointment
        </h3>

        <div className="rounded-2xl bg-blue-600 p-5 text-white shadow-sm">

          <p className="text-xs text-blue-100">
            Next appointment
          </p>

          <h4 className="mt-1 text-lg font-bold">
            No upcoming appointment
          </h4>

          <p className="mt-2 text-xs leading-5 text-blue-100">
            Book an appointment with a doctor to see it here.
          </p>

          <button
            onClick={onDoctors}
            className="mt-5 flex h-11 w-full items-center justify-center rounded-xl bg-white text-sm font-bold text-blue-600 transition active:scale-[0.98]"
          >
            Find a doctor
          </button>

        </div>
      </section>
    </div>
  );
}

/* ============================================================
   BOTTOM NAV ITEM
============================================================ */

function BottomNavItem({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex min-w-[64px] flex-col items-center gap-1 rounded-xl px-3 py-2 transition ${
        active
          ? "text-blue-600"
          : "text-slate-400 hover:text-slate-600"
      }`}
    >
      <span className="text-lg">
        {icon}
      </span>

      <span className="text-[10px] font-semibold">
        {label}
      </span>
    </button>
  );
}

/* ============================================================
   LOADING
============================================================ */

function HomeLoading() {
  return (
    <main className="flex h-dvh items-center justify-center bg-slate-100">
      <div className="text-sm text-slate-500">
        Loading...
      </div>
    </main>
  );
}

