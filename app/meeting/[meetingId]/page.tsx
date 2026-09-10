
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const MEETING_DURATION_MINUTES = 25;

export default function MeetingPage() {
  const params = useParams();
  const router = useRouter();

  const meetingId = decodeURIComponent(
    params.meetingId as string
  );

  const [secondsLeft, setSecondsLeft] = useState(
    MEETING_DURATION_MINUTES * 60
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          clearInterval(timer);

          // Meeting finished.
          // Return to booking details.
          router.replace("/bookings");

          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <main className="min-h-screen bg-slate-950 px-0 sm:px-4 sm:py-6">
      <div className="mx-auto flex min-h-screen w-full max-w-[1100px] flex-col overflow-hidden bg-slate-900 text-white shadow-xl sm:min-h-[760px] sm:rounded-[2rem]">

        {/* Header */}

        <header className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-5 py-4">

          <div>
            <p className="text-xs text-slate-400">
              Tenachin Consultation
            </p>

            <h1 className="mt-1 text-sm font-bold">
              Doctor Video Consultation
            </h1>
          </div>

          <div className="rounded-xl bg-white/10 px-3 py-2 text-center">
            <p className="text-[9px] uppercase tracking-wide text-slate-400">
              Time remaining
            </p>

            <p className="mt-0.5 text-sm font-bold">
              {minutes}:{seconds
                .toString()
                .padStart(2, "0")}
            </p>
          </div>

        </header>

        {/* Jitsi */}

        <div className="relative flex-1 bg-black">

          <iframe
            title="Doctor Video Consultation"
            src={`https://meet.jit.si/${encodeURIComponent(
              meetingId
            )}`}
            allow="camera; microphone; fullscreen; display-capture; autoplay"
            className="h-full min-h-[600px] w-full border-0"
          />

        </div>

        {/* Footer */}

        <footer className="flex items-center justify-between gap-3 border-t border-white/10 bg-slate-900 px-5 py-4">

          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wide text-slate-500">
              Meeting ID
            </p>

            <p className="truncate text-xs font-medium text-slate-300">
              {meetingId}
            </p>
          </div>

          <button
            onClick={() => router.back()}
            className="shrink-0 rounded-xl bg-red-500 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-red-600"
          >
            Leave Meeting
          </button>

        </footer>

      </div>
    </main>
  );
}
