export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL!;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
    RESEND_VERIFICATION_EMAIL: "/auth/resend-verification-email",
    CHANGE_PASSWORD: "/auth/change-password",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh",
    ME: "/auth/me",
  },
  LOCATIONS: {
    GET_ZONES: "/locations/zones",
    UPDATE_PROFILE: "/locations/profile",
  },
};
