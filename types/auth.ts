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

export interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}


export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean; // Tells us whether we have finished checking SecureStore on app load

  // Actions
  setCredentials: (args: {
    user: User;
    accessToken: string;
    refreshToken: string;
  }) => Promise<void>;
  updateUser: (user: Partial<User>) => void;
  clearCredentials: () => Promise<void>;
  hydrate: () => Promise<void>;
}
