import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
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
export const authPersistencePromise = setPersistence(firebaseAuth, browserLocalPersistence);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const analyticsPromise = isSupported().then((supported) =>
  supported ? getAnalytics(firebaseApp) : null
);

export function subscribeToAuthState(callback) {
  let unsubscribe = () => {};
  let active = true;

  authPersistencePromise.then(() => {
    if (!active) return;
    unsubscribe = onAuthStateChanged(firebaseAuth, callback);
  });

  return () => {
    active = false;
    unsubscribe();
  };
}

export async function signInWithEmail({ email, password }) {
  await authPersistencePromise;
  const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
  return result.user;
}

export async function signInWithGoogle() {
  await authPersistencePromise;
  const result = await signInWithPopup(firebaseAuth, googleProvider);
  return result.user;
}

export async function createAccountWithEmail({ displayName, email, password }) {
  await authPersistencePromise;
  const normalizedEmail = email.trim().toLowerCase();
  const existingMethods = await fetchSignInMethodsForEmail(firebaseAuth, normalizedEmail);

  if (existingMethods.length > 0) {
    const error = new Error("This email is already registered. Please login instead.");
    error.code = "auth/email-already-registered";
    throw error;
  }

  const result = await createUserWithEmailAndPassword(firebaseAuth, normalizedEmail, password);

  if (displayName) {
    await updateProfile(result.user, { displayName });
  }

  return result.user;
}

export function signOutOfFirebase() {
  return authPersistencePromise.then(() => signOut(firebaseAuth));
}
