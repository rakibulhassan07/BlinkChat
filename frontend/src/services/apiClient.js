import axios from "axios";
import { firebaseAuth } from "./firebase";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api",
  timeout: 12000,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await firebaseAuth.currentUser?.getIdToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
