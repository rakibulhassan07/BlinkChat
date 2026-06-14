import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

export const analyticsPromise = isSupported().then((supported) =>
  supported ? getAnalytics(firebaseApp) : null
);

export function subscribeToAuthState(callback) {
  return onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithEmail({ email, password }) {
  const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
  return result.user;
}

export async function createAccountWithEmail({ displayName, email, password }) {
  const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);

  if (displayName) {
    await updateProfile(result.user, { displayName });
  }

  return result.user;
}

export function signOutOfFirebase() {
  return signOut(firebaseAuth);
}
