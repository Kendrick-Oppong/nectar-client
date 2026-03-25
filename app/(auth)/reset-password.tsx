import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import ScreenContainer from "@/components/ui/ScreenContainer";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams();

  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = () => {
    // TODO: Implement react-query useResetPasswordMutation
    console.log("Resetting password for:", email, "with code:", code);
    // On success, router.replace("/(auth)/login");
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
              Reset Password
            </Text>
            <Text className="text-base font-baiMedium text-gray-500 mb-10">
              Enter the 6-digit code sent to your email and your new password.
            </Text>

            <Input
              label="6-Digit Code"
              placeholder="e.g. 123456"
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
            />

            <Input
              label="New Password"
              placeholder="••••••••"
              value={newPassword}
              onChangeText={setNewPassword}
              isPassword
            />

            <Button
              onPress={handleReset}
              className="w-full mt-6"
              disabled={code.length !== 6 || newPassword.length < 6}
            >
              <Text className="font-baiSemiBold text-white text-[18px]">
                Reset Password
              </Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
