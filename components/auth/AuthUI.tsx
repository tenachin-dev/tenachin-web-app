"use client";

interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
    >
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
          d="m15 18-6-6 6-6"
        />
      </svg>

      Back
    </button>
  );
}

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({
  message,
}: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="mt-4 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="mt-0.5 h-5 w-5 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m0 3.75h.007v.008H12v-.008ZM10.29 3.86 2.82 17.25A1.875 1.875 0 0 0 4.45 20h15.1a1.875 1.875 0 0 0 1.63-2.75L13.71 3.86a1.875 1.875 0 0 0-3.42 0Z"
        />
      </svg>

      <p>{message}</p>
    </div>
  );
}

export function LoadingSpinner({
  dark = false,
}: {
  dark?: boolean;
}) {
  return (
    <span
      className={`h-5 w-5 animate-spin rounded-full border-2 ${
        dark
          ? "border-slate-300 border-t-blue-600"
          : "border-white/30 border-t-white"
      }`}
    />
  );
}

export function EmailIcon() {
  return (
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
  );
}

export function PhoneIcon() {
  return (
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
        d="M2.25 4.5A2.25 2.25 0 0 1 4.5 2.25h2.25A2.25 2.25 0 0 1 9 4.5v1.5a2.25 2.25 0 0 1-1.5 2.121l-.973.325a12.04 12.04 0 0 0 6.498 6.498l.325-.973A2.25 2.25 0 0 1 15.477 12h1.5a2.25 2.25 0 0 1 2.25 2.25V16.5a2.25 2.25 0 0 1-2.25 2.25h-.75C9.04 18.75 3.75 13.46 3.75 6.75V6A2.25 2.25 0 0 1 2.25 4.5Z"
      />
    </svg>
  );
}

export function LockIcon() {
  return (
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
  );
}

export function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.78-.07-1.53-.22-2.23H12v4.22h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.38Z"
      />

      <path
        fill="#34A853"
        d="M12 21.6c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.6Z"
      />

      <path
        fill="#FBBC05"
        d="M6.54 13.69A5.86 5.86 0 0 1 6.23 12c0-.59.1-1.16.31-1.69V7.78H3.3A9.76 9.76 0 0 0 2.25 12c0 1.57.38 3.06 1.05 4.22l3.24-2.53Z"
      />

      <path
        fill="#EA4335"
        d="M12 6.28c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.38 14.63 2.4 12 2.4a9.75 9.75 0 0 0-8.7 5.38l3.24 2.53C7.31 8 9.46 6.28 12 6.28Z"
      />
    </svg>
  );
}