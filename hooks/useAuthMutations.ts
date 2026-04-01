import { useMutation } from "@tanstack/react-query";
import { authMutationsApi } from "@/lib/api/mutations/auth";
import { useAuthStore } from "@/lib/store/auth-store";
import Toast from "react-native-toast-message";

import { useRouter } from "expo-router";
import { LoginFormData, RegisterFormData } from "@/lib/validators/auth";

export function useLogin() {
  const { setCredentials } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginFormData) => authMutationsApi.login(data),
    onSuccess: async (data) => {
      await setCredentials({
        user: data.user,
        accessToken: data.tokens.accessToken,
        refreshToken: data.tokens.refreshToken,
      });

      Toast.show({
        type: "success",
        text1: "Welcome back! 👋",
        text2: "You have successfully logged in.",
      });

      const { user } = useAuthStore.getState();
      if (user && !user.isProfileComplete) {
        router.replace("/(onboarding)/select-location");
      } else {
        router.replace("/(tabs)/shop");
      }
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: err.message,
      });
    },
  });
}

export function useRegister() {
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterFormData) => authMutationsApi.register(data),
    onSuccess: async (data) => {
      await setCredentials({
        user: data.user,
        accessToken: data.tokens.accessToken,
        refreshToken: data.tokens.refreshToken,
      });

      Toast.show({
        type: "success",
        text1: "Account Created! 🎉",
        text2: "Let's finish setting up your profile.",
      });

      router.replace("/(onboarding)/select-location");
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: err.message,
      });
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
