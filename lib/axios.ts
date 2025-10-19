// lib/axios.ts
import axios from "axios";
import { cookies } from "next/headers";
import toast from "react-hot-toast";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

// ===== Create axios instance =====
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ===== In-memory token store (for browser) =====
let accessToken: string | null = null;
let authContextCallback: ((token: string | null) => void) | null = null;

// Set access token (called from AuthContext after login/refresh)
export const setApiAccessToken = (token: string | null) => {
  accessToken = token;
};

// Get access token
export const getApiAccessToken = () => accessToken;

// Register callback for when token changes
export const setAuthContextCallback = (
  callback: (token: string | null) => void
) => {
  authContextCallback = callback;
};

// ===== Request Interceptor =====
api.interceptors.request.use(
  async (config) => {
    // Browser: use in-memory token
    if (typeof window !== "undefined" && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Server: read cookies directly (no in-memory token available here)
    if (typeof window === "undefined") {
      try {
        const cookieStore = await cookies();
        const token = cookieStore.get("access")?.value;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        // ignore if cookies() not available in some contexts
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ===== Response Interceptor =====
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Ask backend to refresh token (HttpOnly cookie is sent automatically)
        const res = await axios.post(
          `${API_BASE_URL}/dj-rest-auth/token/refresh/`,
          {},
          { withCredentials: true }
        );

        const { access, access_token } = res.data; // some backends return "access", others "access_token"
        const newAccess = access || access_token;

        // Save in memory (browser only)
        if (typeof window !== "undefined") {
          accessToken = newAccess;
          if (authContextCallback) {
            authContextCallback(newAccess);
          }
        }

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed → clear token + logout
        accessToken = null;
        if (authContextCallback) {
          authContextCallback(null);
        }

        if (typeof window !== "undefined") {
          localStorage.removeItem("user_data");
          if (!window.location.pathname.includes("/login")) {
            window.location.href = "/login";
          }
        }

        return Promise.reject(refreshError);
      }
    }

    // === Other error handling (browser only) ===
    if (typeof window !== "undefined") {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else if (error.response?.status === 404) {
        toast.error("Resource not found.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
