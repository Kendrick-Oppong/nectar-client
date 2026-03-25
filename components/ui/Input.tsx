import React, { useState } from "react";
import { TextInput, View, Text, TextInputProps, Pressable } from "react-native";
import { Eye, EyeOff, Check } from "lucide-react-native";
import { cn } from "@/lib/utils/classNames";
import { COLORS } from "@/lib/constants/colors";

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
  isSuccess?: boolean;
  containerClassName?: string;
}

export function Input({
  label,
  error,
  isPassword = false,
  isSuccess = false,
  containerClassName,
  className,
  ...props
}: Readonly<InputProps>) {
  const [isSecure, setIsSecure] = useState(isPassword);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={cn("mb-5", containerClassName)}>
      <Text className="text-gray-500 font-bai-medium text-sm mb-1">
        {label}
      </Text>

      <View
        className={cn(
          "flex-row items-center border-b pb-2",
          isFocused ? "border-primary" : "border-gray-200",
          error && "border-red-500",
        )}
      >
        <TextInput
          className={cn(
            "flex-1 font-bai-medium text-base min-h-10 p-0",
            className,
          )}
          secureTextEntry={isSecure}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          placeholderTextColor={COLORS.icon}
          {...props}
        />

        {isPassword && (
          <Pressable onPress={() => setIsSecure(!isSecure)} className="p-2">
            {isSecure ? (
              <EyeOff size={20} color={COLORS.icon} />
            ) : (
              <Eye size={20} color={COLORS.icon} />
            )}
          </Pressable>
        )}

        {!isPassword && isSuccess && (
          <View className="p-2">
            <Check size={20} color={COLORS.primary} />
          </View>
        )}
      </View>

      {error ? (
        <Text className="text-red-500 font-bai-regular text-xs mt-1">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
