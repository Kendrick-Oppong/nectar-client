import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/auth-store";
import Toast from "react-native-toast-message";
import "../global.css";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "BaiJamjuree-Regular": require("../assets/fonts/BaiJamjuree-Regular.ttf"),
    "BaiJamjuree-Light": require("../assets/fonts/BaiJamjuree-Light.ttf"),
    "BaiJamjuree-Medium": require("../assets/fonts/BaiJamjuree-Medium.ttf"),
    "BaiJamjuree-SemiBold": require("../assets/fonts/BaiJamjuree-SemiBold.ttf"),
    "BaiJamjuree-Italic": require("../assets/fonts/BaiJamjuree-Italic.ttf"),
    "BaiJamjuree-Bold": require("../assets/fonts/BaiJamjuree-Bold.ttf"),
  });

  const { isHydrated, isAuthenticated, user } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  // 1. Hydrate the authentication state from SecureStore
  useEffect(() => {
    if (!isHydrated) {
      useAuthStore
        .getState()
        .hydrate()
        .finally(() => {
          if (loaded || error) {
            SplashScreen.hideAsync();
          }
        });
    } else if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error, isHydrated]);

  // 2. Auth Guard Logic
  useEffect(() => {
    // Wait until hydration implies auth state is known, and fonts are loaded
    if (!isHydrated || !loaded) return;

    const currentSegment = (segments as string[])[0];
    const inAuthGroup = currentSegment === "(auth)";
    const isIndex = !currentSegment || currentSegment === "index";

    if (!isAuthenticated) {
      // If NOT logged in, restrict to 'index' or '(auth)' group
      if (!inAuthGroup && !isIndex) {
        router.replace("/(auth)/login");
      }
      return;
    }

    // User IS logged in
    if (user && !user.isProfileComplete) {
      // MUST complete profile via location setup
      if (segments.join("/") !== "(auth)/location") {
        router.replace("/(auth)/location");
      }
      return;
    }

    // Profile is complete!
    // Prevent accessing auth screens or index when already logged in
    if (inAuthGroup || isIndex) {
      router.replace("/(tabs)/explore");
    }
  }, [isAuthenticated, isHydrated, loaded, segments, user, router]);

  if (!loaded && !error) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" animated />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="order-accepted" />
        </Stack>
        <Toast />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
