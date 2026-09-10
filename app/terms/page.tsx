
"use client";

import { useRouter } from "next/navigation";

export default function TermsPage() {
  const router = useRouter();

  return (
    <main className="h-dvh overflow-hidden bg-slate-100 sm:px-4 sm:py-6">
      <div className="mx-auto flex h-full w-full max-w-[430px] flex-col overflow-hidden bg-slate-50 shadow-xl sm:rounded-[2rem] sm:ring-1 sm:ring-slate-200">
        {/* Header */}
        <header className="flex shrink-0 items-center gap-3 border-b border-slate-100 bg-white px-5 py-4">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700"
            aria-label="Go back"
          >
            ←
          </button>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              Terms & Conditions
            </h1>
            <p className="text-xs text-slate-500">
              Tenachin Healthcare
            </p>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">
          <div className="space-y-6 pb-6">
            <section>
              <h2 className="text-base font-bold text-slate-900">
                1. Acceptance of Terms
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                By accessing or using Tenachin, you agree to these Terms &
                Conditions. If you do not agree with these terms, please do
                not use the application.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                2. About Tenachin
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tenachin is a healthcare platform that helps patients discover
                doctors, schedule appointments, and participate in online
                consultations.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                3. Medical Services
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tenachin provides a platform for connecting patients with
                healthcare professionals. Tenachin does not replace emergency
                medical services or provide emergency care.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                If you are experiencing a medical emergency, contact your
                local emergency service or visit the nearest emergency
                facility.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                4. Appointments
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Patients may request appointments with available doctors.
                Appointment requests may require confirmation before the
                consultation is scheduled.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Appointment times are based on the availability displayed in
                the application. Users are responsible for providing accurate
                appointment information.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                5. Video Consultations
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Confirmed appointments may include an online video
                consultation. Video consultations are intended for the
                scheduled appointment period.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Users should ensure they have a stable internet connection,
                working microphone, and camera when required.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                6. User Responsibilities
              </h2>

              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                <li>Provide accurate account and appointment information.</li>
                <li>Keep your login credentials secure.</li>
                <li>Use the platform only for lawful purposes.</li>
                <li>Respect healthcare professionals and other users.</li>
                <li>Do not attempt to misuse or disrupt the platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                7. Account Security
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                You are responsible for maintaining the security of your
                account. If you believe your account has been accessed without
                authorization, contact Tenachin as soon as possible.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                8. Availability
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We aim to keep Tenachin available and reliable, but we cannot
                guarantee uninterrupted service. The application may
                occasionally be unavailable because of maintenance, updates,
                network problems, or circumstances outside our control.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                9. Changes to These Terms
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We may update these Terms & Conditions when necessary. Updated
                terms will be made available through the application.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                10. Contact
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                If you have questions about these Terms & Conditions, please
                contact the Tenachin support team.
              </p>
            </section>

            <div className="rounded-2xl bg-slate-100 p-4">
              <p className="text-xs leading-5 text-slate-500">
                Last updated: September 3, 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
