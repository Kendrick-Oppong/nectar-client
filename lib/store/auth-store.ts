import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

export interface User {
  id: string;
  email: string;
  name?: string | null;
  avatarUrl?: string | null;
  phone?: string | null;
  isProfileComplete: boolean;
  selectedZoneId?: string | null;
  selectedAreaId?: string | null;
}

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

    set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
  },

  hydrate: async () => {
    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      if (accessToken && refreshToken) {
        // Technically, you might want to fetch the user profile here,
        // or wait for a silent refresh or user endpoint.
        // For now, we just restore tokens. The app can fetch /users/me later.
        set({ accessToken, refreshToken, isAuthenticated: true, isHydrated: true });
      } else {
        set({ isHydrated: true });
      }
    } catch (e) {
      console.error("Hydration Error:", e);
      set({ isHydrated: true });
    }
  },
}));
