
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

import { auth } from "@/lib/firebase/config";

type ProfileScreenProps = {
  onBookings?: () => void;
  onDoctors?: () => void;
};

export default function ProfileScreen({
  onBookings,
  onDoctors,
}: ProfileScreenProps) {
  const router = useRouter();

  const user = auth.currentUser;

  const [showPasswordForm, setShowPasswordForm] =
    useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [changingPassword, setChangingPassword] =
    useState(false);

  const [passwordMessage, setPasswordMessage] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  const [showLogoutDialog, setShowLogoutDialog] =
    useState(false);

  const [loggingOut, setLoggingOut] =
    useState(false);

  // ============================================================
  // USER INFORMATION
  // ============================================================

  const email = user?.email ?? "No email available";

  const displayName =
    user?.displayName ||
    email.split("@")[0] ||
    "Patient";

  const initial =
    displayName.charAt(0).toUpperCase();

  // ============================================================
  // CHANGE PASSWORD
  // ============================================================

  const handleChangePassword = async () => {
    setPasswordError("");
    setPasswordMessage("");

    if (!user?.email) {
      setPasswordError(
        "Unable to identify your account."
      );
      return;
    }

    if (!currentPassword) {
      setPasswordError(
        "Please enter your current password."
      );
      return;
    }

    if (!newPassword) {
      setPasswordError(
        "Please enter a new password."
      );
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError(
        "New password must be at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(
        "New passwords do not match."
      );
      return;
    }

    try {
      setChangingPassword(true);

      const credential =
        EmailAuthProvider.credential(
          user.email,
          currentPassword
        );

      await reauthenticateWithCredential(
        user,
        credential
      );

      await updatePassword(user, newPassword);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setPasswordMessage(
        "Your password has been changed successfully."
      );

      setTimeout(() => {
        setShowPasswordForm(false);
        setPasswordMessage("");
      }, 2000);
    } catch (error: any) {
      console.error(error);

      if (
        error?.code ===
        "auth/invalid-credential"
      ) {
        setPasswordError(
          "Your current password is incorrect."
        );
      } else if (
        error?.code ===
        "auth/too-many-requests"
      ) {
        setPasswordError(
          "Too many attempts. Please try again later."
        );
      } else {
        setPasswordError(
          "Unable to change your password. Please try again."
        );
      }
    } finally {
      setChangingPassword(false);
    }
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await auth.signOut();

      router.replace("/login");
    } catch (error) {
      console.error(error);
      setLoggingOut(false);
    }
  };

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div className="px-5 pb-8 pt-5">

      {/* ========================================================
          PROFILE HEADER
      ======================================================== */}

      <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">

        <div className="flex items-center gap-4">

          {/* Avatar */}

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white">
            {initial}
          </div>

          {/* User */}

          <div className="min-w-0 flex-1">

            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
              Patient
            </p>

            <h2 className="mt-1 truncate text-lg font-bold text-slate-900">
              {displayName}
            </h2>

            <p className="mt-1 truncate text-xs text-slate-500">
              {email}
            </p>

          </div>

        </div>

        {/* Email */}

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white">
            ✉️
          </div>

          <div className="min-w-0">

            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Email address
            </p>

            <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">
              {email}
            </p>

          </div>

        </div>

      </div>

      {/* ========================================================
          ACCOUNT
      ======================================================== */}

      <section className="mt-6">

        <h3 className="mb-3 text-sm font-bold text-slate-900">
          Account
        </h3>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">

          {/* Change Password */}

          <button
            onClick={() =>
              setShowPasswordForm(
                !showPasswordForm
              )
            }
            className="flex w-full items-center gap-3 border-b border-slate-100 px-4 py-4 text-left transition hover:bg-slate-50"
          >

            <SettingIcon
              icon="🔐"
              background="bg-blue-50"
            />

            <div className="min-w-0 flex-1">

              <p className="text-sm font-semibold text-slate-800">
                Change Password
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                Update your account password
              </p>

            </div>

            <span className="text-slate-300">
              {showPasswordForm
                ? "⌃"
                : "›"}
            </span>

          </button>

          {/* Password Form */}

          {showPasswordForm && (
            <div className="border-b border-slate-100 bg-slate-50 p-4">

              <PasswordInput
                label="Current password"
                value={currentPassword}
                onChange={setCurrentPassword}
              />

              <div className="mt-3">
                <PasswordInput
                  label="New password"
                  value={newPassword}
                  onChange={setNewPassword}
                />
              </div>

              <div className="mt-3">
                <PasswordInput
                  label="Confirm new password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                />
              </div>

              {/* Error */}

              {passwordError && (
                <div className="mt-3 rounded-xl bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600">
                  {passwordError}
                </div>
              )}

              {/* Success */}

              {passwordMessage && (
                <div className="mt-3 rounded-xl bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-600">
                  {passwordMessage}
                </div>
              )}

              <button
                onClick={handleChangePassword}
                disabled={changingPassword}
                className="mt-4 flex h-11 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {changingPassword
                  ? "Changing password..."
                  : "Change Password"}
              </button>

            </div>
          )}

          {/* My Bookings */}

          <button
            onClick={onBookings}
            className="flex w-full items-center gap-3 border-b border-slate-100 px-4 py-4 text-left transition hover:bg-slate-50"
          >

            <SettingIcon
              icon="📅"
              background="bg-emerald-50"
            />

            <div className="min-w-0 flex-1">

              <p className="text-sm font-semibold text-slate-800">
                My Bookings
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                View your appointments
              </p>

            </div>

            <span className="text-lg text-slate-300">
              ›
            </span>

          </button>

          {/* Find Doctor */}

          <button
            onClick={onDoctors}
            className="flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-slate-50"
          >

            <SettingIcon
              icon="🩺"
              background="bg-violet-50"
            />

            <div className="min-w-0 flex-1">

              <p className="text-sm font-semibold text-slate-800">
                Find a Doctor
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                Browse doctors and specialties
              </p>

            </div>

            <span className="text-lg text-slate-300">
              ›
            </span>

          </button>

        </div>

      </section>

      {/* ========================================================
          PREFERENCES
      ======================================================== */}

      <section className="mt-6">

        <h3 className="mb-3 text-sm font-bold text-slate-900">
          Preferences
        </h3>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">

          {/* Notifications */}

          <button
            className="flex w-full items-center gap-3 border-b border-slate-100 px-4 py-4 text-left"
          >

            <SettingIcon
              icon="🔔"
              background="bg-amber-50"
            />

            <div className="min-w-0 flex-1">

              <p className="text-sm font-semibold text-slate-800">
                Notifications
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                Appointment and consultation updates
              </p>

            </div>

            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
              ON
            </span>

          </button>

          {/* Language */}

          <button
            className="flex w-full items-center gap-3 border-b border-slate-100 px-4 py-4 text-left"
          >

            <SettingIcon
              icon="🌐"
              background="bg-blue-50"
            />

            <div className="min-w-0 flex-1">

              <p className="text-sm font-semibold text-slate-800">
                Language
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                Choose your preferred language
              </p>

            </div>

            <span className="text-xs font-semibold text-slate-500">
              English
            </span>

          </button>

          {/* Security */}

          <button
            className="flex w-full items-center gap-3 px-4 py-4 text-left"
          >

            <SettingIcon
              icon="🛡️"
              background="bg-emerald-50"
            />

            <div className="min-w-0 flex-1">

              <p className="text-sm font-semibold text-slate-800">
                Security
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                Keep your account secure
              </p>

            </div>

            <span className="text-lg text-slate-300">
              ›
            </span>

          </button>

        </div>

      </section>

      {/* ========================================================
          INFORMATION
      ======================================================== */}

      <section className="mt-6">

        <h3 className="mb-3 text-sm font-bold text-slate-900">
          Information
        </h3>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">

          {/* Terms */}

          <button
            onClick={() =>
              router.push("/terms")
            }
            className="flex w-full items-center gap-3 border-b border-slate-100 px-4 py-4 text-left transition hover:bg-slate-50"
          >

            <SettingIcon
              icon="📄"
              background="bg-slate-100"
            />

            <div className="min-w-0 flex-1">

              <p className="text-sm font-semibold text-slate-800">
                Terms & Conditions
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                Read our terms of service
              </p>

            </div>

            <span className="text-lg text-slate-300">
              ›
            </span>

          </button>

          {/* Privacy */}

          <button
            onClick={() =>
              router.push("/privacy")
            }
            className="flex w-full items-center gap-3 border-b border-slate-100 px-4 py-4 text-left transition hover:bg-slate-50"
          >

            <SettingIcon
              icon="🔒"
              background="bg-slate-100"
            />

            <div className="min-w-0 flex-1">

              <p className="text-sm font-semibold text-slate-800">
                Privacy Policy
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                Learn how we protect your information
              </p>

            </div>

            <span className="text-lg text-slate-300">
              ›
            </span>

          </button>

          {/* About */}

          <button
            onClick={() =>
              router.push("/about")
            }
            className="flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-slate-50"
          >

            <SettingIcon
              icon="ℹ️"
              background="bg-blue-50"
            />

            <div className="min-w-0 flex-1">

              <p className="text-sm font-semibold text-slate-800">
                About Tenachin
              </p>

              <p className="mt-0.5 text-xs text-slate-400">
                Learn more about Tenachin
              </p>

            </div>

            <span className="text-lg text-slate-300">
              ›
            </span>

          </button>

        </div>

      </section>

      {/* ========================================================
          LOGOUT
      ======================================================== */}

      <section className="mt-6">

        <button
          onClick={() =>
            setShowLogoutDialog(true)
          }
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 py-4 text-sm font-bold text-red-600 transition hover:bg-red-100 active:scale-[0.98]"
        >
          <span>🚪</span>
          Sign Out
        </button>

      </section>

      {/* ========================================================
          APP VERSION
      ======================================================== */}

      <div className="pb-4 pt-6 text-center">

        <p className="text-[10px] font-medium text-slate-400">
          Tenachin Patient Care
        </p>

        <p className="mt-1 text-[10px] text-slate-300">
          Version 1.0.0
        </p>

      </div>

      {/* ========================================================
          LOGOUT DIALOG
      ======================================================== */}

      {showLogoutDialog && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 px-4 pb-4 backdrop-blur-sm">

          <div className="w-full max-w-[400px] rounded-3xl bg-white p-5 shadow-2xl">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-xl">
              🚪
            </div>

            <h3 className="mt-4 text-center text-lg font-bold text-slate-900">
              Sign out?
            </h3>

            <p className="mt-2 text-center text-sm leading-5 text-slate-500">
              Are you sure you want to sign out of your
              Tenachin account?
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">

              <button
                onClick={() =>
                  setShowLogoutDialog(false)
                }
                disabled={loggingOut}
                className="rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="rounded-xl bg-red-600 py-3 text-sm font-bold text-white disabled:opacity-60"
              >
                {loggingOut
                  ? "Signing out..."
                  : "Sign Out"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* ============================================================
   SETTING ICON
============================================================ */

function SettingIcon({
  icon,
  background,
}: {
  icon: string;
  background: string;
}) {
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${background}`}
    >
      {icon}
    </div>
  );
}

/* ============================================================
   PASSWORD INPUT
============================================================ */

function PasswordInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>

      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
      </label>

      <input
        type="password"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="••••••••"
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

    </div>
  );
}
