import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

import { AUTH_KEYS } from "@/lib/constants/auth-keys";
import type { AuthState } from "@/types/auth";

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isHydrated: false,

  setCredentials: async ({ user, accessToken, refreshToken }) => {
    // Save tokens securely
    if (accessToken)
      await SecureStore.setItemAsync(AUTH_KEYS.ACCESS_TOKEN, accessToken);
    if (refreshToken)
      await SecureStore.setItemAsync(AUTH_KEYS.REFRESH_TOKEN, refreshToken);
    await SecureStore.setItemAsync(AUTH_KEYS.USER, JSON.stringify(user));

    set({ user, accessToken, refreshToken, isAuthenticated: true });
  },

  updateUser: async (updatedUser) => {
    const { user } = get();
    if (user) {
      const newUser = { ...user, ...updatedUser };
      set({ user: newUser });
      await SecureStore.setItemAsync(AUTH_KEYS.USER, JSON.stringify(newUser));
    }
  },

  clearCredentials: async () => {
    await SecureStore.deleteItemAsync(AUTH_KEYS.ACCESS_TOKEN);
    await SecureStore.deleteItemAsync(AUTH_KEYS.REFRESH_TOKEN);
    await SecureStore.deleteItemAsync(AUTH_KEYS.USER);

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  hydrate: async () => {
    try {
      const accessToken = await SecureStore.getItemAsync(
        AUTH_KEYS.ACCESS_TOKEN,
      );
      const refreshToken = await SecureStore.getItemAsync(
        AUTH_KEYS.REFRESH_TOKEN,
      );
      const userStr = await SecureStore.getItemAsync(AUTH_KEYS.USER);

      if (accessToken && refreshToken && userStr) {
        // We directly restore the cached user profile to prevent Auth Guard routing issues
        const user = JSON.parse(userStr);
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isHydrated: true,
        });
      } else {
        set({ isHydrated: true });
      }
    } catch (e) {
      console.error("Hydration Error:", e);
      set({ isHydrated: true });
    }
  },
}));
