import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authRequestFailed,
  authRequestFinished,
  authRequestStarted,
  authStateChanged,
  clearAuthError,
} from "../store/authSlice";
import {
  createAccountWithEmail,
  signInWithEmail,
  signInWithGoogle,
  signOutOfFirebase,
  subscribeToAuthState,
} from "../services/firebase";

function getAuthErrorMessage(error) {
  const code = error?.code ?? "";

  if (code.includes("invalid-credential")) return "Email or password is incorrect.";
  if (code.includes("email-already-registered")) return "This email is already registered. Please login instead.";
  if (code.includes("email-already-in-use")) return "This email already has a BlinkChat account.";
  if (code.includes("operation-not-allowed")) return "This sign-in provider is disabled in Firebase. Enable Email/Password or Google in Firebase Console > Authentication > Sign-in method.";
  if (code.includes("popup-closed-by-user")) return "Google sign-in was closed before it finished.";
  if (code.includes("account-exists-with-different-credential")) return "This email already uses another sign-in method.";
  if (code.includes("weak-password")) return "Password should be at least 6 characters.";
  if (code.includes("invalid-email")) return "Enter a valid email address.";
  if (code.includes("network-request-failed")) return "Network error. Check your connection and try again.";

  return error?.message ?? "Authentication failed. Please try again.";
}

export function useFirebaseAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      dispatch(authStateChanged(user));
    });

    return unsubscribe;
  }, [dispatch]);

  const signIn = useCallback(
    async ({ email, password }) => {
      dispatch(authRequestStarted());

      try {
        await signInWithEmail({ email, password });
        dispatch(authRequestFinished());
      } catch (error) {
        dispatch(authRequestFailed(getAuthErrorMessage(error)));
      }
    },
    [dispatch]
  );

  const createAccount = useCallback(
    async ({ displayName, email, password }) => {
      dispatch(authRequestStarted());

      try {
        await createAccountWithEmail({ displayName, email, password });
        dispatch(authRequestFinished());
      } catch (error) {
        dispatch(authRequestFailed(getAuthErrorMessage(error)));
      }
    },
    [dispatch]
  );

  const signInGoogle = useCallback(async () => {
    dispatch(authRequestStarted());

    try {
      await signInWithGoogle();
      dispatch(authRequestFinished());
    } catch (error) {
      dispatch(authRequestFailed(getAuthErrorMessage(error)));
    }
  }, [dispatch]);

  const signOut = useCallback(async () => {
    dispatch(authRequestStarted());

    try {
      await signOutOfFirebase();
      dispatch(authRequestFinished());
    } catch (error) {
      dispatch(authRequestFailed(getAuthErrorMessage(error)));
    }
  }, [dispatch]);

  return {
    ...auth,
    actions: {
      clearError: () => dispatch(clearAuthError()),
      createAccount,
      signIn,
      signInGoogle,
      signOut,
    },
    signedIn: Boolean(auth.user),
  };
}
