// "use client";

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   type ReactNode,
// } from "react";

// import type { User } from "firebase/auth";

// import {
//   listenToAuthChanges,
//   login,
//   logout,
//   register,
// } from "@/lib/firebase/auth";

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;

//   loginUser: (
//     email: string,
//     password: string
//   ) => Promise<User>;

//   registerUser: (
//     email: string,
//     password: string
//   ) => Promise<User>;

//   logoutUser: () => Promise<void>;
// }

// const AuthContext = createContext<
//   AuthContextType | undefined
// >(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export function AuthProvider({
//   children,
// }: AuthProviderProps) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   /**
//    * Listen for Firebase authentication changes.
//    *
//    * This runs when:
//    * - User logs in
//    * - User registers
//    * - User logs out
//    * - Firebase restores an existing session
//    */
//   useEffect(() => {
//     const unsubscribe = listenToAuthChanges(
//       (currentUser) => {
//         setUser(currentUser);
//         setLoading(false);
//       }
//     );

//     return unsubscribe;
//   }, []);

//   /**
//    * Login patient
//    */
//   const loginUser = async (
//     email: string,
//     password: string
//   ) => {
//     return await login(email, password);
//   };

//   /**
//    * Register patient
//    */
//   const registerUser = async (
//     email: string,
//     password: string
//   ) => {
//     return await register(email, password);
//   };

//   /**
//    * Logout patient
//    */
//   const logoutUser = async () => {
//     await logout();
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         loginUser,
//         registerUser,
//         logoutUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// /**
//  * Access authentication anywhere in the app.
//  */
// export function useAuth(): AuthContextType {
//   const context = useContext(AuthContext);

//   if (context === undefined) {
//     throw new Error(
//       "useAuth must be used inside AuthProvider"
//     );
//   }

//   return context;
// }  

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type {
  User,
  ConfirmationResult,
} from "firebase/auth";

import {
  listenToAuthChanges,
  login,
  loginWithGoogle,
  sendPhoneOtp,
  verifyPhoneOtp,
  logout,
  register,
} from "@/lib/firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;

  // Email + Password
  loginUser: (
    email: string,
    password: string
  ) => Promise<User>;

  // Google
  loginGoogle: () => Promise<User>;

  // Phone + OTP
  sendPhoneOtp: (
    phoneNumber: string
  ) => Promise<ConfirmationResult>;

  verifyPhoneOtp: (
    verificationCode: string
  ) => Promise<User>;

  // Register
  registerUser: (
    email: string,
    password: string
  ) => Promise<User>;

  // Logout
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Listen for Firebase authentication changes.
   *
   * Runs when:
   * - User logs in
   * - User registers
   * - User logs out
   * - Firebase restores an existing session
   */
  useEffect(() => {
    const unsubscribe = listenToAuthChanges(
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  /**
   * Login with email and password
   */
  const loginUser = async (
    email: string,
    password: string
  ): Promise<User> => {
    return await login(email, password);
  };

  /**
   * Login with Google
   */
  const loginGoogle = async (): Promise<User> => {
    return await loginWithGoogle();
  };

  /**
   * Send OTP to phone number
   */
  const handleSendPhoneOtp = async (
    phoneNumber: string
  ): Promise<ConfirmationResult> => {
    return await sendPhoneOtp(phoneNumber);
  };

  /**
   * Verify phone OTP
   */
  const handleVerifyPhoneOtp = async (
    verificationCode: string
  ): Promise<User> => {
    return await verifyPhoneOtp(verificationCode);
  };

  /**
   * Register with email and password
   */
  const registerUser = async (
    email: string,
    password: string
  ): Promise<User> => {
    return await register(email, password);
  };

  /**
   * Logout
   */
  const logoutUser = async (): Promise<void> => {
    await logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,

        // Email
        loginUser,

        // Google
        loginGoogle,

        // Phone OTP
        sendPhoneOtp: handleSendPhoneOtp,
        verifyPhoneOtp: handleVerifyPhoneOtp,

        // Register
        registerUser,

        // Logout
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Access authentication anywhere in the app.
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}