import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "BaiJamjuree-Regular": require("../assets/fonts/BaiJamjuree-Regular.ttf"),
    "BaiJamjuree-Light": require("../assets/fonts/BaiJamjuree-Light.ttf"),
    "BaiJamjuree-Medium": require("../assets/fonts/BaiJamjuree-Medium.ttf"),
    "BaiJamjuree-SemiBold": require("../assets/fonts/BaiJamjuree-SemiBold.ttf"),
    "BaiJamjuree-Italic": require("../assets/fonts/BaiJamjuree-Italic.ttf"),
    "BaiJamjuree-Bold": require("../assets/fonts/BaiJamjuree-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" animated />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        {/* <Stack.Screen name="checkout" /> */}
        <Stack.Screen name="order-accepted" />
      </Stack>
    </SafeAreaProvider>
  );
}
