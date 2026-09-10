"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser } = useAuth();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const goToPasswordStep = () => {
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerUser(email, password);

      router.push("/");
    } catch (error: any) {
      console.error(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          setError(
            "An account already exists with this email."
          );
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email.");
          break;

        case "auth/weak-password":
          setError("Password is too weak.");
          break;

        default:
          setError(
            "Unable to create account. Please try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-dvh overflow-hidden bg-slate-100 sm:px-4 sm:py-6">
      {/* Same Mobile App Frame as Home/Login */}
      <div className="mx-auto flex h-full w-full max-w-[430px] flex-col overflow-hidden bg-white shadow-xl sm:rounded-[2rem] sm:ring-1 sm:ring-slate-200">

        {/* Header */}
        <header className="shrink-0 border-b border-slate-100 bg-white px-5 pb-4 pt-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              T
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Tenachin
              </h1>

              <p className="text-[10px] text-slate-400">
                Patient Care
              </p>
            </div>
          </Link>
        </header>

        {/* Progress */}
        <div className="shrink-0 bg-white px-5 pb-2 pt-5">
          <div className="flex items-center gap-2">
            <div
              className={`h-1.5 flex-1 rounded-full transition ${
                step >= 1
                  ? "bg-blue-600"
                  : "bg-slate-200"
              }`}
            />

            <div
              className={`h-1.5 flex-1 rounded-full transition ${
                step >= 2
                  ? "bg-blue-600"
                  : "bg-slate-200"
              }`}
            />

            <div
              className={`h-1.5 flex-1 rounded-full transition ${
                step >= 3
                  ? "bg-blue-600"
                  : "bg-slate-200"
              }`}
            />
          </div>

          <div className="mt-2 flex justify-between text-[11px] font-medium text-slate-400">
            <span
              className={
                step >= 1 ? "text-blue-600" : ""
              }
            >
              Account
            </span>

            <span
              className={
                step >= 2 ? "text-blue-600" : ""
              }
            >
              Security
            </span>

            <span
              className={
                step >= 3 ? "text-blue-600" : ""
              }
            >
              Finish
            </span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="flex min-h-full flex-col px-5 pb-8 pt-7 sm:px-8">

            {/* =========================
                STEP 1
            ========================== */}
            {step === 1 && (
              <div className="flex min-h-full flex-col">
                <div className="mb-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-7 w-7 text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
                      />
                    </svg>
                  </div>

                  <p className="mb-1 text-sm font-semibold text-blue-600">
                    Step 1 of 3
                  </p>

                  <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                    Create your account
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Start by entering your email address.
                  </p>
                </div>

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
                          d="M21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615A2.25 2.25 0 0 1 2.25 6.993V6.75"
                        />
                      </svg>
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

                {error && (
                  <ErrorMessage message={error} />
                )}

                {/* Bottom Actions */}
                <div className="mt-auto pt-8">
                  <button
                    type="button"
                    onClick={goToPasswordStep}
                    className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.99]"
                  >
                    Continue

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9 5 7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* =========================
                STEP 2
            ========================== */}
            {step === 2 && (
              <form
                onSubmit={handleSubmit}
                className="flex min-h-full flex-col"
              >
                <div className="mb-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-7 w-7 text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V7.125a4.125 4.125 0 0 0-8.25 0V10.5m-1.5 0h11.25A2.25 2.25 0 0 1 20.25 12.75v6A2.25 2.25 0 0 1 18 21H6a2.25 2.25 0 0 1-2.25-2.25v-6A2.25 2.25 0 0 1 6 10.5Z"
                      />
                    </svg>
                  </div>

                  <p className="mb-1 text-sm font-semibold text-blue-600">
                    Step 2 of 3
                  </p>

                  <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                    Secure your account
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Create a strong password for your
                    Tenachin account.
                  </p>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <PasswordInput
                    id="password"
                    value={password}
                    onChange={setPassword}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    placeholder="Create a password"
                  />
                </div>

                {/* Password Strength */}
                <div className="mt-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((item) => {
                      const strength =
                        password.length >= 12
                          ? 4
                          : password.length >= 10
                          ? 3
                          : password.length >= 6
                          ? 2
                          : password.length > 0
                          ? 1
                          : 0;

                      return (
                        <div
                          key={item}
                          className={`h-1 flex-1 rounded-full ${
                            item <= strength
                              ? "bg-blue-500"
                              : "bg-slate-200"
                          }`}
                        />
                      );
                    })}
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Use at least 6 characters.
                  </p>
                </div>

                {/* Confirm Password */}
                <div className="mt-5">
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Confirm password
                  </label>

                  <PasswordInput
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    showPassword={showConfirmPassword}
                    setShowPassword={
                      setShowConfirmPassword
                    }
                    placeholder="Confirm your password"
                  />
                </div>

                {error && (
                  <ErrorMessage message={error} />
                )}

                {/* Bottom Actions */}
                <div className="mt-auto pt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex h-13 w-full items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create account

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="ml-2 h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9 5 7 7-7 7"
                          />
                        </svg>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setStep(1);
                    }}
                    className="mt-3 flex h-11 w-full items-center justify-center text-sm font-medium text-slate-500 transition hover:text-slate-700"
                  >
                    ← Back
                  </button>
                </div>
              </form>
            )}

            {/* Login Link */}
            <div className="mt-8 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-500">
                Already have a patient account?
              </p>

              <Link
                href="/login"
                className="mt-2 inline-block text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                Sign in
              </Link>
            </div>

            {/* Security */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3 5.25 6v5.25c0 4.35 2.775 8.4 6.75 9.75 3.975-1.35 6.75-5.4 6.75-9.75V6L12 3Z"
                />
              </svg>

              <span>
                Your information is securely protected
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================
   Password Input
========================= */

function PasswordInput({
  id,
  value,
  onChange,
  showPassword,
  setShowPassword,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
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
            d="M16.5 10.5V7.125a4.125 4.125 0 0 0-8.25 0V10.5m-1.5 0h11.25A2.25 2.25 0 0 1 20.25 12.75v6A2.25 2.25 0 0 1 18 21H6a2.25 2.25 0 0 1-2.25-2.25v-6A2.25 2.25 0 0 1 6 10.5Z"
          />
        </svg>
      </span>

      <input
        id={id}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        required
        className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
      />

      <button
        type="button"
        onClick={() =>
          setShowPassword(!showPassword)
        }
        className="absolute inset-y-0 right-3 flex items-center px-2 text-slate-400 transition hover:text-slate-600"
        aria-label={
          showPassword
            ? "Hide password"
            : "Show password"
        }
      >
        {showPassword ? (
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
              d="M3.98 8.223A10.477 10.477 0 0 0 1.5 12c1.5 4.5 5.625 7.5 10.5 7.5 1.635 0 3.177-.373 4.55-1.037M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.875 0 9 3 10.5 7.5a10.48 10.48 0 0 1-4.046 5.272M6.228 6.228 3 3m3.228 3.228 3.294 3.294m7.25 7.25L21 21m-4.228-4.228-3.294-3.294m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243L9.235 9.235"
            />
          </svg>
        ) : (
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
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.644C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.01 9.964 7.178.074.21.074.434 0 .644C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.01-9.964-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

/* =========================
   Error Message
========================= */

function ErrorMessage({
  message,
}: {
  message: string;
}) {
  return (
    <div
      role="alert"
      className="mt-4 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
    >
      <span className="mt-0.5 font-bold">!</span>

      <p>{message}</p>
    </div>
  );
}
