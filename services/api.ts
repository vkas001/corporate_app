import { clearAuth, getAuth } from "@/utils/auth";
import axios from "axios";
import { router } from "expo-router";

const API_BASE_URL =
  (process.env.EXPO_PUBLIC_API_BASE_URL as string | undefined) ??
  "https://eggadmin.aanshtech.com.np/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Attach JWT token to every request
api.interceptors.request.use(
  async (config) => {
    const auth = await getAuth();

    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Global response & error handler
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Network / timeout error
    if (!error.response) {
      return Promise.reject({
        message: "Network error. Please check your connection.",
      });
    }

    const { status, data } = error.response;

    // Unauthorized / token expired
    if (status === 401) {
      await clearAuth();
      router.replace("/(auth)/sign-in");
      return Promise.reject({ message: "Session expired" });
    }

    // Forbidden
    if (status === 403) {
      return Promise.reject({ message: "Permission denied" });
    }

    // Laravel validation error
    if (status === 422 && data?.errors) {
      const firstError = Object.values(data.errors)[0] as string[];
      return Promise.reject({ message: firstError[0], status, data });
    }

    // Default error
    const message =
      data?.message ||
      (status >= 500
        ? `Server error (${status}). Please try again.`
        : `Request failed (${status}).`);

    return Promise.reject({ message, status, data });
  }
);

export default api;
