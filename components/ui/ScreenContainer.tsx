import { cn } from "@/lib/utils/classNames";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

const StyledSafeAreaView = withUniwind(SafeAreaView);

interface ScreenContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScreenContainer({
  children,
  className,
}: Readonly<ScreenContainerProps>) {
  return (
    <StyledSafeAreaView className={cn("flex-1 bg-white p-4", className)}>
      {children}
    </StyledSafeAreaView>
  );
}
