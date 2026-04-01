import React from "react";
import { View, Text, Pressable } from "react-native";
import { ChevronDown } from "lucide-react-native";
import { COLORS } from "@/lib/constants/colors";

interface SelectProps {
  readonly label: string;
  readonly value: string;
  readonly placeholder: string;
  readonly onPress: () => void;
  readonly error?: string;
  readonly disabled?: boolean;
}

export default function Select({
  label,
  value,
  placeholder,
  onPress,
  error,
  disabled,
}: SelectProps) {
  return (
    <View className="mb-6">
      <Text className="text-gray-500 font-bai-medium text-xs mb-1">
        {label}
      </Text>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        className={`flex-row items-center justify-between border-b border-gray-200 pb-3 ${
          disabled ? "opacity-50" : ""
        }`}
      >
        <Text
          className={`font-bai-medium text-base ${
            value ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {value || placeholder}
        </Text>
        <ChevronDown size={20} color={COLORS.icon} />
      </Pressable>
      {!!error && (
        <Text className="text-xs text-red-500 mt-1 font-bai-regular">
          {error}
        </Text>
      )}
    </View>
  );
}
