// src/context/AuthContext.js
//
// Wraps the entire app. Any component can call useAuth() to get:
//   currentUser  – the Firebase User object (or null when logged out)
//   loading      – true while Firebase is restoring the session on page load
//   signup(email, password)   – creates a new account
//   login(email, password)    – signs in
//   logout()                  – signs out

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase";

const googleProvider = new GoogleAuthProvider();

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading]         = useState(true); // true until Firebase resolves session

  // Register a new user
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Sign in an existing user
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Sign in with Google (popup)
  function signInWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  // Sign out
  function logout() {
    return signOut(auth);
  }

  // Subscribe to Firebase auth state changes (runs once on mount)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; // cleanup listener on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading, signup, login, signInWithGoogle, logout }}>
      {/* Don't render children until Firebase has resolved the auth state,
          otherwise protected routes flash before redirecting */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
