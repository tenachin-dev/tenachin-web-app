"use client";

import {
  FormEvent,
  useState,
} from "react";
import Link from "next/link";

import {
  BackButton,
  EmailIcon,
  ErrorMessage,
  LoadingSpinner,
  LockIcon,
} from "./AuthUI";

interface EmailLoginFormProps {
  error: string;
  loading: boolean;

  onSubmit: (
    event: FormEvent<HTMLFormElement>
  ) => void;

  onBack: () => void;
}

export default function EmailLoginForm({
  error,
  loading,
  onSubmit,
  onBack,
}: EmailLoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <>
      <BackButton onClick={onBack} />

      <div className="mb-7">
        <h2 className="text-2xl font-bold text-slate-900">
          Sign in with email
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Enter your email and password to
          continue.
        </p>
      </div>

      <form
        onSubmit={(event) => {
          onSubmit(event);
        }}
        className="space-y-5"
      >
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Email address
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
              <EmailIcon />
            </span>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="patient@example.com"
              autoComplete="email"
              required
              className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700"
            >
              Password
            </label>

            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
              <LockIcon />
            </span>

            <input
              id="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-16 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (value) => !value
                )
              }
              className="absolute inset-y-0 right-3 flex items-center px-2 text-xs font-semibold text-slate-400 hover:text-slate-600"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword
                ? "Hide"
                : "Show"}
            </button>
          </div>
        </div>

        {error && (
          <ErrorMessage message={error} />
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex h-13 w-full items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <LoadingSpinner />
              <span className="ml-2">
                Signing in...
              </span>
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </>
  );
}