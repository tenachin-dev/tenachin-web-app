"use client";

import {
  EmailIcon,
  ErrorMessage,
  GoogleIcon,
  PhoneIcon,
  LoadingSpinner,
} from "./AuthUI";

interface LoginMethodSelectorProps {
  error: string;
  googleLoading: boolean;

  onEmail: () => void;
  onPhone: () => void;
  onGoogle: () => void;
}

export default function LoginMethodSelector({
  error,
  googleLoading,
  onEmail,
  onPhone,
  onGoogle,
}: LoginMethodSelectorProps) {
  return (
    <>
      {/* Welcome */}
      <div className="mb-8">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
          <div className="text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.125-.952M15 19.128v-.003c0-1.113-.285-2.683-1.064-3.64M15 19.128v.003a9.38 9.38 0 0 1-2.625.372m0 0c-.27 0-.537-.01-.8-.033m.8.033a9.38 9.38 0 0 1-2.625-.372M12.375 19.5a9.38 9.38 0 0 1-2.625-.372m0 0C8.687 18.183 7.5 16.553 7.5 14.625m2.25 4.503c-.263-.023-.53-.033-.8-.033m.8.033a9.38 9.38 0 0 0 2.625-.372M7.5 14.625A4.125 4.125 0 0 1 11.625 10.5h.75A4.125 4.125 0 0 1 16.5 14.625M7.5 14.625c0 1.928 1.187 3.558 2.25 4.503M16.5 14.625c0 1.928-1.187 3.558-2.25 4.503M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1-7.5 0Z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Welcome back
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Sign in to manage your appointments
          and connect with your doctor.
        </p>
      </div>

      {/* Email */}
      <button
        type="button"
        onClick={onEmail}
        className="flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99]"
      >
        <EmailIcon />

        Continue with Email
      </button>

      {/* Phone */}
      <button
        type="button"
        onClick={onPhone}
        className="mt-3 flex h-13 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-[0.99]"
      >
        <PhoneIcon />

        Continue with Phone
      </button>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />

        <span className="text-xs font-medium text-slate-400">
          OR
        </span>

        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={onGoogle}
        disabled={googleLoading}
        className="flex h-13 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {googleLoading ? (
          <>
            <LoadingSpinner dark />
            Signing in...
          </>
        ) : (
          <>
            <GoogleIcon />
            Continue with Google
          </>
        )}
      </button>

      {error && <ErrorMessage message={error} />}
    </>
  );
}