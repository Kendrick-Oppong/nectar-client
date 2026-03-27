import { api } from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/constants/api-endpoints";
import { LoginFormData, RegisterFormData } from "@/lib/validators/auth";
import { AuthResponse } from "@/types/auth";

export const authMutationsApi = {
  login: async (data: LoginFormData) => {
    const response = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      data,
    );
    return response.data;
  },

  register: async (data: RegisterFormData) => {
    const response = await api.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      data,
    );
    return response.data;
  },

  forgotPassword: async (data: { email: string }) => {
    const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
    return response.data;
  },

  resetPassword: async (data: { token: string; password?: string }) => {
    const response = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },
};
