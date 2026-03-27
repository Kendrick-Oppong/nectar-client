import { View, Text } from "react-native";
import { Image } from "expo-image";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1">
      {/* Background Image */}
      <Image
        source={require("../assets/images/onboarding.png")}
        contentFit="cover"
        className="absolute inset-0 w-full h-full"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        priority="high"
      />

      {/* Overlay */}
      <View className="flex-1 justify-end bg-black/30">
        <View className="px-6 pb-10 items-center">
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text className="text-white mt-6 font-bai-semibold text-3xl text-center mb-2">
            Welcome to Nectar
          </Text>

          <Text className="text-gray-200 text-center font-bai-regular mb-6">
            Your one-stop shop for all your grocery needs
          </Text>

          <Button
            className="w-full"
            onPress={() => router.push("/(auth)/login")}
          >
            <Text className="text-white font-bai-semibold">Get Started</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
