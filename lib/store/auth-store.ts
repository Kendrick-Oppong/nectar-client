import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

import type { User } from "@/types/auth";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean; // Tells us whether we have finished checking SecureStore on app load

  // Actions
  setCredentials: (user: User, accessToken: string, refreshToken: string) => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  clearCredentials: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isHydrated: false,

  setCredentials: async (user, accessToken, refreshToken) => {
    // Save tokens securely
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
    await SecureStore.setItemAsync("user", JSON.stringify(user));

    set({ user, accessToken, refreshToken, isAuthenticated: true });
  },

  updateUser: (updatedUser) => {
    const { user } = get();
    if (user) {
      set({ user: { ...user, ...updatedUser } });
    }
  },

  clearCredentials: async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("user");

    set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
  },

  hydrate: async () => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      const userStr = await SecureStore.getItemAsync("user");

      if (accessToken && refreshToken && userStr) {
        // We directly restore the cached user profile to prevent Auth Guard routing issues
        const user = JSON.parse(userStr);
        set({ user, accessToken, refreshToken, isAuthenticated: true, isHydrated: true });
      } else {
        set({ isHydrated: true });
      }
    } catch (e) {
      console.error("Hydration Error:", e);
      set({ isHydrated: true });
    }
  },
}));
