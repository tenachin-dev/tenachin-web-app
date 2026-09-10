

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  type User,
  type ConfirmationResult,
} from "firebase/auth";

import { auth } from "./config";

// ============================================================================
// REGISTER
// ============================================================================

export const register = async (
  email: string,
  password: string
): Promise<User> => {
  const result = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  return result.user;
};

// ============================================================================
// LOGIN WITH EMAIL + PASSWORD
// ============================================================================

export const login = async (
  email: string,
  password: string
): Promise<User> => {
  const result = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return result.user;
};

// ============================================================================
// LOGIN WITH GOOGLE
// ============================================================================

export const loginWithGoogle = async (): Promise<User> => {
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account",
  });

  const result = await signInWithPopup(
    auth,
    provider
  );

  return result.user;
};

// ============================================================================
// PHONE OTP
// ============================================================================

// Stores the current phone verification session.
let phoneConfirmation: ConfirmationResult | null = null;

// Stores the reCAPTCHA verifier.
let recaptchaVerifier: RecaptchaVerifier | null = null;

// ============================================================================
// SEND PHONE OTP
// ============================================================================



export const sendPhoneOtp = async (
  phoneNumber: string
): Promise<ConfirmationResult> => {
  if (typeof window === "undefined") {
    throw new Error(
      "Phone authentication can only run in the browser."
    );
  }

  const container = document.getElementById(
    "recaptcha-container"
  );

  if (!container) {
    throw new Error(
      "reCAPTCHA container not found."
    );
  }

  try {
    // Create verifier only once.
    // if (!recaptchaVerifier) {
    //   recaptchaVerifier = new RecaptchaVerifier(
    //     auth,
    //     "recaptcha-container",
    //     {
    //       size: "invisible",
    //     }
    //   );
    // }  
    if (!recaptchaVerifier) {
  recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
      size: "normal",
      callback: () => {
        console.log("reCAPTCHA solved");
      },
      "expired-callback": () => {
        console.log("reCAPTCHA expired");
      },
    }
  );
}

await recaptchaVerifier.render();


    // Firebase will render/use the verifier.
    phoneConfirmation =
      await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );

    return phoneConfirmation;
  } catch (error) {
    // Clean up failed verifier.
    if (recaptchaVerifier) {
      try {
        recaptchaVerifier.clear();
      } catch {
        // Ignore cleanup error.
      }

      recaptchaVerifier = null;
    }

    throw error;
  }
};

// ============================================================================
// VERIFY PHONE OTP
// ============================================================================

export const verifyPhoneOtp = async (
  verificationCode: string
): Promise<User> => {
  if (!phoneConfirmation) {
    throw new Error(
      "Please request a verification code first."
    );
  }

  const result =
    await phoneConfirmation.confirm(
      verificationCode
    );

  // Clear the confirmation after successful login.
  phoneConfirmation = null;

  return result.user;
};

// ============================================================================
// LOGOUT
// ============================================================================

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

// ============================================================================
// LISTEN FOR AUTHENTICATION CHANGES
// ============================================================================

export const listenToAuthChanges = (
  callback: (user: User | null) => void
) => {
  return onAuthStateChanged(
    auth,
    callback
  );
};