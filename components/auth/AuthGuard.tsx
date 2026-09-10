"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // ============================================================
  // LOADING SCREEN
  // ============================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center justify-center">
          {/* ================================================== */}
          {/* MEDICAL + VIDEO MEETING ICON */}
          {/* ================================================== */}

          <div className="relative flex h-24 w-24 items-center justify-center">
            {/* Soft pulse */}
            <div className="absolute inset-0 animate-ping rounded-full bg-blue-100 opacity-50" />

            {/* Rotating ring */}
            <div className="absolute inset-1 animate-spin rounded-full border-[3px] border-transparent border-t-blue-600 border-r-cyan-400" />

            {/* Main icon container */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-xl shadow-blue-600/25">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                className="h-9 w-9 text-white"
                aria-hidden="true"
              >
                {/* Video meeting frame */}
                <rect
                  x="5"
                  y="11"
                  width="27"
                  height="26"
                  rx="5"
                  stroke="currentColor"
                  strokeWidth="3"
                />

                {/* Camera / meeting shape */}
                <path
                  d="M32 20L42 15V33L32 28V20Z"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />

                {/* Medical cross */}
                <path
                  d="M18.5 17V31M11.5 24H25.5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* ================================================== */}
          {/* BRAND */}
          {/* ================================================== */}

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
            Tenachin
          </h1>

          {/* ================================================== */}
          {/* LOADING DOTS */}
          {/* ================================================== */}

          <div className="mt-4 flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600"
              style={{ animationDelay: "0ms" }}
            />

            <span
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600"
              style={{ animationDelay: "150ms" }}
            />

            <span
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600"
              style={{ animationDelay: "300ms" }}
            />
          </div>

          {/* ================================================== */}
          {/* LOADING TEXT */}
          {/* ================================================== */}

          <p className="mt-3 text-sm text-slate-400">
            Connecting you to Tenachin...
          </p>
        </div>
      </main>
    );
  }

  // ============================================================
  // NOT AUTHENTICATED
  // ============================================================

  if (!user) {
    return null;
  }

  // ============================================================
  // AUTHENTICATED
  // ============================================================

  return <>{children}</>;
}