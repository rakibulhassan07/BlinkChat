import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: "",
  initialized: false,
  loading: false,
  user: null,
};

function toAuthUser(user) {
  if (!user) return null;

  return {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    uid: user.uid,
  };
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authRequestStarted(state) {
      state.error = "";
      state.loading = true;
    },
    authRequestFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    authRequestFinished(state) {
      state.loading = false;
    },
    authStateChanged(state, action) {
      state.initialized = true;
      state.loading = false;
      state.user = toAuthUser(action.payload);
    },
    clearAuthError(state) {
      state.error = "";
    },
  },
});

export const {
  authRequestFailed,
  authRequestFinished,
  authRequestStarted,
  authStateChanged,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;
