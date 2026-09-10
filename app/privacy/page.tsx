
"use client";

import { useRouter } from "next/navigation";

export default function PrivacyPage() {
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
              Privacy Policy
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
                1. Introduction
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your privacy is important to us. This Privacy Policy explains
                how Tenachin collects, uses, stores, and protects information
                when you use our healthcare platform.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                2. Information We Collect
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Depending on how you use Tenachin, we may collect information
                such as:
              </p>

              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                <li>Email address and account information.</li>
                <li>Doctor and appointment information.</li>
                <li>Appointment dates and consultation times.</li>
                <li>Information required to provide the application service.</li>
                <li>Technical information required to operate and secure the platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                3. How We Use Your Information
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                We may use collected information to:
              </p>

              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                <li>Create and manage your account.</li>
                <li>Process and manage appointments.</li>
                <li>Connect patients with healthcare professionals.</li>
                <li>Provide online consultations.</li>
                <li>Send important service-related notifications.</li>
                <li>Maintain and improve the platform.</li>
                <li>Protect the security and integrity of our services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                4. Firebase Services
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tenachin uses Firebase services for functionality such as
                authentication and data storage. Information handled by these
                services is processed according to the applicable Firebase
                service terms and security practices.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                5. Appointment Information
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Appointment information may include the selected doctor,
                appointment date, appointment time, consultation status, and
                information required to provide the consultation service.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                6. Video Consultations
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tenachin may use third-party video communication technology to
                provide online consultations. Camera and microphone access are
                used only when required for the video consultation and when
                permitted by the user.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                7. Information Sharing
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We do not sell your personal information. Information may be
                shared with healthcare professionals when necessary to provide
                requested healthcare services and appointments, or with
                service providers that help us operate the platform.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                8. Data Security
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We take reasonable measures to protect information from
                unauthorized access, alteration, disclosure, or destruction.
                However, no internet-based service can guarantee complete
                security.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                9. Data Retention
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We retain information for as long as reasonably necessary to
                provide our services, maintain records, meet legal
                requirements, resolve disputes, and protect our legitimate
                interests.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                10. Your Rights
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Depending on applicable law, you may have rights relating to
                your personal information, including requesting access,
                correction, or deletion of certain information.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                11. Children's Privacy
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tenachin is not intended for children to create accounts
                independently. Where healthcare services involve a minor,
                account and service use should be managed by an appropriate
                parent, guardian, or authorized person.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                12. Changes to This Policy
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We may update this Privacy Policy from time to time. Any
                updated version will be made available through the
                application.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900">
                13. Contact Us
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                If you have questions or concerns about this Privacy Policy or
                how your information is handled, please contact the Tenachin
                support team.
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
