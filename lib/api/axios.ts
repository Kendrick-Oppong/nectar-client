import axios, { InternalAxiosRequestConfig, isAxiosError } from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/constants/api-endpoints";
import { useAuthStore } from "@/lib/store/auth-store";

// Track refreshing state
let isRefreshing = false;

interface FailedRequest {
  resolve: (token: string | null) => void;
  reject: (error: Error) => void;
}

let failedQueue: FailedRequest[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach interceptor for Request (to add Bearer token)
api.interceptors.request.use((config) => {
  // 1. Get the latest access token from Zustand
  const { accessToken } = useAuthStore.getState();

  // 2. If it exists, attach it to the Authorization header
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// Attach interceptor for Response (Handle 401 & Refresh Token logic)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // We cast the config to include our custom '_retry' flag
    // This prevents infinite loops if the refresh token endpoint itself returns a 401
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If it's a generic network error (no response), just reject
    if (!isAxiosError(error) || !error.response) {
      return Promise.reject(error);
    }

    const { status } = error.response;

    // Handle 401 Unauthorized (Token is likely expired)
    if (status === 401 && !originalRequest._retry) {
      // Don't refresh if we are already trying to login or refresh via these specific routes
      if (
        originalRequest.url === API_ENDPOINTS.AUTH.LOGIN ||
        originalRequest.url === API_ENDPOINTS.AUTH.REFRESH_TOKEN
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // Mark this request so we don't try to refresh it again if it fails
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { refreshToken } = useAuthStore.getState();

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Attempt to get a new pair of tokens using the refresh token
        const response = await axios.post(
          `${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
          {
            refreshToken,
          },
        );

        const {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          user,
        } = response.data;

        if (newAccessToken && newRefreshToken) {
          // Update store securely
          const { setCredentials } = useAuthStore.getState();
          await setCredentials(user, newAccessToken, newRefreshToken);

          // Process queued requests
          processQueue(null, newAccessToken);

          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        const errorToProcess =
          refreshError instanceof Error
            ? refreshError
            : new Error(String(refreshError));
        processQueue(errorToProcess, null);

        // Final fallback: Clear credentials and redirect
        const { clearCredentials } = useAuthStore.getState();
        await clearCredentials();

        // In React Native, routing is decoupled from window.location.
        // Expo Router's useRouter() can't be safely called outside components.
        // A common pattern is having an Auth Guard component listen to `isAuthenticated` and redirect.

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Default error handling for other statuses
    const message = error.response?.data?.message || error.message;
    return Promise.reject(new Error(message));
  },
);
