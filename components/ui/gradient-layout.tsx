import React from "react";
import { View } from "react-native";
import { cn } from "@/lib/utils/classNames";

interface AuthGradientLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function AuthGradientLayout({
  children,
  className,
}: AuthGradientLayoutProps) {
  return (
    <View
      className={cn(
        // Full screen gradient
        "flex-1 bg-linear-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#E0F2FE]",
        "p-4",
        className,
      )}
    >
      {children}
    </View>
  );
}
