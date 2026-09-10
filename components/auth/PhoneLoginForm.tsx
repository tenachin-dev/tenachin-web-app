"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  BackButton,
  ErrorMessage,
  LoadingSpinner,
  PhoneIcon,
} from "./AuthUI";

interface PhoneLoginFormProps {
  error: string;
  phoneLoading: boolean;
  otpLoading: boolean;

  onSendOtp: (
    phoneNumber: string,
    onSuccess: () => void
  ) => void;

  onVerifyOtp: (
    otp: string,
    onSuccess: () => void
  ) => void;

  onBack: () => void;
}

export default function PhoneLoginForm({
  error,
  phoneLoading,
  otpLoading,
  onSendOtp,
  onVerifyOtp,
  onBack,
}: PhoneLoginFormProps) {
  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  const handleSendOtp = () => {
    onSendOtp(phoneNumber, () => {
      setOtpSent(true);
      setOtp("");
    });
  };

  const handleVerifyOtp = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    onVerifyOtp(otp, () => {
      // Login success is handled by parent.
    });
  };

  const resetPhone = () => {
    setOtpSent(false);
    setOtp("");
    setPhoneNumber("");
  };

  return (
    <>
      <BackButton
        onClick={() => {
          resetPhone();
          onBack();
        }}
      />

      {!otpSent ? (
        <>
          <div className="mb-7">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <PhoneIcon />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Sign in with phone
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Enter your phone number and we'll
              send you a verification code.
            </p>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Phone number
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                <PhoneIcon />
              </span>

              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(event) =>
                  setPhoneNumber(
                    event.target.value
                  )
                }
                placeholder="+251912345678"
                autoComplete="tel"
                inputMode="tel"
                className="h-13 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              Use international format, for
              example +251912345678.
            </p>
          </div>

          {error && (
            <ErrorMessage message={error} />
          )}

          <button
            type="button"
            onClick={handleSendOtp}
            disabled={phoneLoading}
            className="mt-6 flex h-13 w-full items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {phoneLoading ? (
              <>
                <LoadingSpinner />
                <span className="ml-2">
                  Sending code...
                </span>
              </>
            ) : (
              "Send verification code"
            )}
          </button>

          {/* Firebase reCAPTCHA */}
          <div
            id="recaptcha-container"
            className="mt-4 flex justify-center"
          />
        </>
      ) : (
        <>
          <div className="mb-7">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <PhoneIcon />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              Verify your phone
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              We sent a 6-digit verification
              code to{" "}
              <span className="font-semibold text-slate-700">
                {phoneNumber}
              </span>
            </p>
          </div>

          <form onSubmit={handleVerifyOtp}>
            <label
              htmlFor="otp"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Verification code
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(event) =>
                setOtp(
                  event.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
              placeholder="000000"
              className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-center text-2xl font-bold tracking-[0.45em] text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />

            {error && (
              <ErrorMessage message={error} />
            )}

            <button
              type="submit"
              disabled={
                otpLoading ||
                otp.length !== 6
              }
              className="mt-6 flex h-13 w-full items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {otpLoading ? (
                <>
                  <LoadingSpinner />

                  <span className="ml-2">
                    Verifying...
                  </span>
                </>
              ) : (
                "Verify and continue"
              )}
            </button>

            <button
              type="button"
              onClick={resetPhone}
              className="mt-4 w-full text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Use another phone number
            </button>
          </form>
        </>
      )}
    </>
  );
}