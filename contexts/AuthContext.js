import React, { useContext, useEffect, useState, createContext } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  // Sign up function
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Logout function
  function logout() {
    return signOut(auth);
  }

  // Login function
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function changeEmail(email) {
    return updateEmail(auth.currentUser, email);
  }

  // Track user authentication and email verification status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(user);
      if (user) {
        await user.reload(); // Ensure we get the latest data
        setCurrentUser(user);
        setIsEmailVerified(user.emailVerified);
      } else {
        setCurrentUser(null);
        setIsEmailVerified(false);
      }
      setLoading(false); // Stop loading after user state is determined
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    isEmailVerified,
    signup,
    logout,
    login,
    loading,
    resetPassword, // Expose loading state to the app
    changeEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
