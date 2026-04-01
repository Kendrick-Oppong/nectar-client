import { create } from "zustand";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_KEYS } from "@/lib/constants/auth-keys";
import type { AuthState } from "@/types/auth";
import { api } from "../api/axios";
import { API_ENDPOINTS } from "../constants/api-endpoints";

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isHydrated: false,

  setCredentials: async ({ user, accessToken, refreshToken }) => {
    // Save tokens securely
    const promises: Promise<void>[] = [];
    if (accessToken)
      promises.push(
        SecureStore.setItemAsync(AUTH_KEYS.ACCESS_TOKEN, accessToken),
      );
    if (refreshToken)
      promises.push(
        SecureStore.setItemAsync(AUTH_KEYS.REFRESH_TOKEN, refreshToken),
      );
    if (user)
      promises.push(AsyncStorage.setItem(AUTH_KEYS.USER, JSON.stringify(user)));

    await Promise.all(promises);

    set({ user, accessToken, refreshToken, isAuthenticated: true });
  },

  updateUser: async (updatedUser) => {
    const { user } = get();
    if (user) {
      const newUser = { ...user, ...updatedUser };
      set({ user: newUser });
      await AsyncStorage.setItem(AUTH_KEYS.USER, JSON.stringify(newUser));
    }
  },

  clearCredentials: async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(AUTH_KEYS.ACCESS_TOKEN),
      SecureStore.deleteItemAsync(AUTH_KEYS.REFRESH_TOKEN),
      AsyncStorage.removeItem(AUTH_KEYS.USER),
    ]);

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  hydrate: async () => {
    try {
      const [accessToken, refreshToken, userStr] = await Promise.all([
        SecureStore.getItemAsync(AUTH_KEYS.ACCESS_TOKEN),
        SecureStore.getItemAsync(AUTH_KEYS.REFRESH_TOKEN),
        AsyncStorage.getItem(AUTH_KEYS.USER),
      ]);

      if (accessToken && refreshToken && userStr) {
        // Restore cached user immediately for fast initial render
        const cachedUser = JSON.parse(userStr);
        set({
          user: cachedUser,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isHydrated: true,
        });

        // Then sync fresh user data from the server in the background
        try {
          const { data: freshUser } = await api.get(API_ENDPOINTS.AUTH.ME);
          if (freshUser) {
            const newUser = { ...cachedUser, ...freshUser };
            set({ user: newUser });
            await AsyncStorage.setItem(AUTH_KEYS.USER, JSON.stringify(newUser));
          }
        } catch {
          // If fetching fresh data fails (offline, etc.), the cached user is still valid
          console.warn("Could not sync user data from server, using cached.");
        }
      } else {
        set({ isHydrated: true });
      }
    } catch (e) {
      console.error("Hydration Error:", e);
      set({ isHydrated: true });
    }
  },
}));
