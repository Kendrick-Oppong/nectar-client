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
  accessToken: string;
  refreshToken: string;
}
