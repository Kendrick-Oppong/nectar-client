import { cn } from "@/lib/utils/classNames";
import React from "react";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

const StyledSafeAreaView = withUniwind(SafeAreaView);

interface ScreenContainerProps extends SafeAreaViewProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScreenContainer({
  children,
  className,
  ...props
}: Readonly<ScreenContainerProps>) {
  return (
    <StyledSafeAreaView
      {...props}
      className={cn("flex-1 bg-white p-4", className)}
    >
      {children}
    </StyledSafeAreaView>
  );
}
