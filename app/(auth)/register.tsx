import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ScreenContainer from "@/components/ui/ScreenContainer";
import Button from "@/components/ui/Button";
import { COLORS } from "@/lib/constants/colors";
import { RegisterFormData, registerSchema } from "@/lib/validators/auth";
import { Eye, EyeOff } from "lucide-react-native";
import { BackButton } from "@/components/ui/BackButton";

export default function RegisterScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const payload = {
      email: data.email,
      password: data.password,
      name: data.name,
    };

    console.log("Register payload:", payload);
    // TODO: API call
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      contentContainerStyle={{ flexGrow: 1 }}
      className="flex-1"
    >
      <ScreenContainer>
        <BackButton />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View className="mt-16 items-center mb-10">
            <Image
              source={require("@/assets/images/logo-secondary.png")}
              style={{ width: 50, height: 60 }}
              contentFit="contain"
            />
          </View>

          {/* Form Card */}
          <View>
            {/* Header */}
            <Text className="text-2xl font-bai-semibold text-gray-900 mb-1">
              Create a Nectar account
            </Text>
            <Text className="text-sm font-bai-regular text-gray-500 mb-6">
              Join us and start your journey
            </Text>

            {/* ── Name ── */}
            <View className="mb-4">
              <Text className="text-xs font-bai-medium text-gray-500 mb-1">
                Full Name
              </Text>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="John Doe"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    className={`rounded-xl px-4 py-3 text-gray-900 font-bai-regular ${
                      errors.name
                        ? "bg-red-50 border border-red-300"
                        : "bg-gray-100 border border-gray-200"
                    }`}
                    placeholderTextColor={COLORS.icon}
                  />
                )}
              />
              {errors.name && (
                <Text className="text-xs text-red-500 mt-1 font-bai-regular">
                  {errors.name.message}
                </Text>
              )}
            </View>

            {/* ── Email ── */}
            <View className="mb-4">
              <Text className="text-xs font-bai-medium text-gray-500 mb-1">
                Email
              </Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="example@email.com"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className={`rounded-xl px-4 py-3 text-gray-900 font-bai-regular ${
                      errors.email
                        ? "bg-red-50 border border-red-300"
                        : "bg-gray-100 border border-gray-200"
                    }`}
                    placeholderTextColor={COLORS.icon}
                  />
                )}
              />
              {errors.email && (
                <Text className="text-xs text-red-500 mt-1 font-bai-regular">
                  {errors.email.message}
                </Text>
              )}
            </View>

            {/* ── Password ── */}
            <View className="mb-6">
              <Text className="text-xs font-bai-medium text-gray-500 mb-1">
                Password
              </Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    className={`flex-row items-center rounded-xl px-4 ${
                      errors.password
                        ? "bg-red-50 border border-red-300"
                        : "bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <TextInput
                      placeholder="••••••••"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={!showPassword}
                      className="flex-1 py-3 text-gray-900 font-bai-regular"
                      placeholderTextColor={COLORS.icon}
                    />
                    <Pressable
                      onPress={() => setShowPassword((prev) => !prev)}
                      hitSlop={8}
                      className="pl-2"
                    >
                      {showPassword ? (
                        <EyeOff size={18} color={COLORS.icon} />
                      ) : (
                        <Eye size={18} color={COLORS.icon} />
                      )}
                    </Pressable>
                  </View>
                )}
              />
              {errors.password && (
                <Text className="text-xs text-red-500 mt-1 font-bai-regular">
                  {errors.password.message}
                </Text>
              )}
            </View>

            {/* Terms */}
            <Text className="text-xs font-bai-regular text-gray-500 leading-relaxed mb-6">
              By continuing you agree to our{" "}
              <Text className="text-primary font-bai-semibold">
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text className="text-primary font-bai-semibold">
                Privacy Policy
              </Text>
            </Text>

            {/* Submit */}
            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="w-full mb-2"
            >
              <Text className="font-bai-semibold text-white text-base">
                {isSubmitting ? "Creating account…" : "Create Account"}
              </Text>
            </Button>

            {/* Footer */}
            <View className="flex-row justify-center mt-6">
              <Text className="font-bai-regular text-gray-600 text-sm">
                Already have an account?{" "}
              </Text>
              <Pressable onPress={() => router.push("/(auth)/login")}>
                <Text className="text-primary font-bai-semibold text-sm">
                  Log In
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    </KeyboardAvoidingView>
  );
}
