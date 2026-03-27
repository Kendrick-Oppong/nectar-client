import { useMutation } from "@tanstack/react-query";
import { authMutationsApi } from "@/lib/api/mutations/auth";
import type { LoginValues, RegisterValues } from "@/types/auth";
import { useAuthStore } from "@/lib/store/auth-store";

import { useRouter } from "expo-router";

export function useLogin() {
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginValues) => authMutationsApi.login(data),
    onSuccess: async (data) => {
      await setCredentials(data.user, data.accessToken, data.refreshToken);
      const { user } = useAuthStore.getState();
      if (user && !user.isProfileComplete) {
        router.replace("/(auth)/location");
      } else {
        router.replace("/(tabs)/explore");
      }
    },
    onError: (err) => {
      console.error("Login Error:", err.message);
      // Optional: Add a toast or alert here
    },
  });
}

export function useRegister() {
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterValues) => authMutationsApi.register(data),
    onSuccess: async (data) => {
      await setCredentials(data.user, data.accessToken, data.refreshToken);
      router.replace("/(auth)/location");
    },
    onError: (err) => {
      console.error("Register Error:", err.message);
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: { email: string }) =>
      authMutationsApi.forgotPassword(data),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: { token: string; password?: string }) =>
      authMutationsApi.resetPassword(data),
  });
}

export function useLogout() {
  const clearCredentials = useAuthStore((state) => state.clearCredentials);

  return useMutation({
    mutationFn: () => authMutationsApi.logout(),
    onSuccess: async () => {
      await clearCredentials();
    },
  });
}
