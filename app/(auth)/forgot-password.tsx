import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import ScreenContainer from "@/components/ui/ScreenContainer";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const isEmailValid = email.includes("@") && email.includes(".");

  const handleSendCode = () => {
    // TODO: Implement react-query useForgotPasswordMutation
    console.log("Request reset for:", email);
    // On success, navigate to reset-password and pass email as a URL parameter
    router.push({
      pathname: "/(auth)/reset-password",
      params: { email },
    });
  };

  return (
    <ScreenContainer>
      <View className="px-5 mt-2 mb-6">
        <BackButton />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center mb-10 mt-6">
            <Image
              source={require("@/assets/images/logo.png")}
              style={{ width: 45, height: 55 }}
              contentFit="contain"
            />
          </View>

          <View className="px-5 mb-10">
            <Text className="text-[26px] font-baiSemiBold text-gray-900 mb-2">
              Forgot Password
            </Text>
            <Text className="text-base font-baiMedium text-gray-500 mb-10">
              Enter your email address to receive a 6-digit security code.
            </Text>

            <Input
              label="Email"
              placeholder="imshuvo97@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              isSuccess={isEmailValid}
            />

            <Button
              onPress={handleSendCode}
              className="w-full mt-6"
              disabled={!email}
            >
              <Text className="font-baiSemiBold text-white text-[18px]">
                Send Code
              </Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
