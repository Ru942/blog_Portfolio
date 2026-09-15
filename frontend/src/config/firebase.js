// ─────────────────────────────────────────────────────────────────────────────
// src/config/firebase.js
//
// HOW TO SET UP:
//   1. Go to https://console.firebase.google.com
//   2. Create a project (or open an existing one)
//   3. Project Settings → General → Your apps → Add app → Web (</>)
//   4. Copy the firebaseConfig object shown and paste your values below
//   5. In Firebase Console → Authentication → Sign-in method → Enable "Email/Password"
//   6. In Firebase Console → Firestore Database → Create database (start in test mode)
// ─────────────────────────────────────────────────────────────────────────────

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZtwNAXdwBV7hW41XzAngmSlqGlTt68WM",
  authDomain: "portfolio-8eacf.firebaseapp.com",
  projectId: "portfolio-8eacf",
  storageBucket: "portfolio-8eacf.firebasestorage.app",
  messagingSenderId: "863372201507",
  appId: "1:863372201507:web:5b6602548506eae3826b96",
  measurementId: "G-HZRQBLF0GF",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);       // Firebase Auth
export const db   = getFirestore(app);  // Firestore (blog posts)

export default app;
