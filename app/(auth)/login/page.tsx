"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

import LoginMethodSelector from "@/components/auth/LoginMethodSelector";
import EmailLoginForm from "@/components/auth/EmailLoginForm";
import PhoneLoginForm from "@/components/auth/PhoneLoginForm";

type LoginMethod =
  | "choose"
  | "email"
  | "phone";

export default function LoginPage() {
  const router = useRouter();

  const {
    loginUser,
    loginGoogle,
    sendPhoneOtp,
    verifyPhoneOtp,
  } = useAuth();

  const [method, setMethod] =
    useState<LoginMethod>("choose");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const [phoneLoading, setPhoneLoading] =
    useState(false);

  const [otpLoading, setOtpLoading] =
    useState(false);

  // =========================================================
  // EMAIL LOGIN
  // =========================================================

  const handleEmailLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(
      event.currentTarget
    );

    const email =
      String(formData.get("email") || "").trim();

    const password =
      String(formData.get("password") || "");

    try {
      await loginUser(email, password);

      router.push("/");
    } catch (error: any) {
      console.error(
        "Email login error:",
        error
      );

      switch (error?.code) {
        case "auth/invalid-credential":
          setError(
            "Invalid email or password."
          );
          break;

        case "auth/user-not-found":
          setError(
            "No account found with this email."
          );
          break;

        case "auth/wrong-password":
          setError(
            "Incorrect password."
          );
          break;

        case "auth/invalid-email":
          setError(
            "Please enter a valid email address."
          );
          break;

        case "auth/too-many-requests":
          setError(
            "Too many login attempts. Please try again later."
          );
          break;

        case "auth/user-disabled":
          setError(
            "This account has been disabled."
          );
          break;

        default:
          setError(
            "Unable to login. Please try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // GOOGLE LOGIN
  // =========================================================

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      await loginGoogle();

      router.push("/");
    } catch (error: any) {
      console.error(
        "Google login error:",
        error
      );

      switch (error?.code) {
        case "auth/popup-closed-by-user":
          setError(
            "Google sign-in was cancelled."
          );
          break;

        case "auth/popup-blocked":
          setError(
            "Google sign-in was blocked by your browser."
          );
          break;

        case "auth/account-exists-with-different-credential":
          setError(
            "An account already exists with this email using another sign-in method."
          );
          break;

        case "auth/network-request-failed":
          setError(
            "Network error. Please check your internet connection."
          );
          break;

        default:
          setError(
            "Unable to sign in with Google. Please try again."
          );
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  // =========================================================
  // SEND PHONE OTP
  // =========================================================

  const handleSendOtp = async (
    phoneNumber: string,
    onSuccess: () => void
  ) => {
    setError("");

    const phone = phoneNumber.trim();

    if (!phone) {
      setError(
        "Please enter your phone number."
      );
      return;
    }

    if (!phone.startsWith("+")) {
      setError(
        "Please use international format, for example +251912345678."
      );
      return;
    }

    setPhoneLoading(true);

    try {
      await sendPhoneOtp(phone);

      onSuccess();
    } catch (error: any) {
      console.error(
        "Send OTP error:",
        error
      );

      switch (error?.code) {
        case "auth/invalid-phone-number":
          setError(
            "Please enter a valid phone number."
          );
          break;

        case "auth/billing-not-enabled":
          setError(
            "Phone verification requires Firebase billing to be enabled. Please use a test phone number during development."
          );
          break;

        case "auth/too-many-requests":
          setError(
            "Too many OTP requests. Please try again later."
          );
          break;

        case "auth/quota-exceeded":
          setError(
            "SMS limit reached. Please try again later."
          );
          break;

        case "auth/captcha-check-failed":
          setError(
            "Security verification failed. Please try again."
          );
          break;

        case "auth/network-request-failed":
          setError(
            "Network error. Please check your internet connection."
          );
          break;

        default:
          setError(
            "Unable to send verification code. Please try again."
          );
      }
    } finally {
      setPhoneLoading(false);
    }
  };

  // =========================================================
  // VERIFY OTP
  // =========================================================

  const handleVerifyOtp = async (
    otp: string,
    onSuccess: () => void
  ) => {
    setError("");

    if (otp.length !== 6) {
      setError(
        "Please enter the 6-digit verification code."
      );
      return;
    }

    setOtpLoading(true);

    try {
      await verifyPhoneOtp(otp);

      onSuccess();

      router.push("/");
    } catch (error: any) {
      console.error(
        "Verify OTP error:",
        error
      );

      switch (error?.code) {
        case "auth/invalid-verification-code":
          setError(
            "Invalid verification code."
          );
          break;

        case "auth/code-expired":
          setError(
            "This verification code has expired. Please request a new code."
          );
          break;

        case "auth/session-expired":
          setError(
            "Your verification session expired. Please request a new code."
          );
          break;

        default:
          setError(
            "Unable to verify the code. Please try again."
          );
      }
    } finally {
      setOtpLoading(false);
    }
  };

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="h-dvh overflow-hidden bg-slate-100 sm:px-4 sm:py-6">
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

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="flex min-h-full flex-col px-5 pb-8 pt-7 sm:px-8">

            <div className="flex-1">

              {/* Choose */}
              {method === "choose" && (
                <LoginMethodSelector
                  error={error}
                  googleLoading={
                    googleLoading
                  }
                  onEmail={() => {
                    setError("");
                    setMethod("email");
                  }}
                  onPhone={() => {
                    setError("");
                    setMethod("phone");
                  }}
                  onGoogle={
                    handleGoogleLogin
                  }
                />
              )}

              {/* Email */}
              {method === "email" && (
                <EmailLoginForm
                  error={error}
                  loading={loading}
                  onSubmit={
                    handleEmailLogin
                  }
                  onBack={() => {
                    setError("");
                    setMethod("choose");
                  }}
                />
              )}

              {/* Phone */}
              {method === "phone" && (
                <PhoneLoginForm
                  error={error}
                  phoneLoading={
                    phoneLoading
                  }
                  otpLoading={
                    otpLoading
                  }
                  onSendOtp={
                    handleSendOtp
                  }
                  onVerifyOtp={
                    handleVerifyOtp
                  }
                  onBack={() => {
                    setError("");
                    setMethod("choose");
                  }}
                />
              )}

            </div>

            {/* Register */}
            <div className="mt-8 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-500">
                Don't have a patient account?
              </p>

              <Link
                href="/register"
                className="mt-2 inline-block text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                Create an account
              </Link>
            </div>

            {/* Security */}
            <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">
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
                Secure patient access
              </span>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}