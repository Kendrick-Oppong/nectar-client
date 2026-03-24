import { COLORS } from "@/lib/constants/colors";
import { cn } from "@/lib/utils/classNames";
import React from "react";
import { ActivityIndicator, Pressable, PressableProps } from "react-native";

type Variant = "primary" | "outline" | "secondary" | "accent";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends PressableProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "lg",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: Readonly<ButtonProps>) {
  const base =
    "rounded-xl flex-row items-center justify-center active:opacity-70";

  const variants: Record<Variant, string> = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
    outline: "border-[1.1px] border-accent bg-transparent",
  };

  const sizes: Record<Size, string> = {
    sm: "px-2 py-2",
    md: "px-5 py-2",
    lg: "px-6 py-3",
  };

  return (
    <Pressable
      disabled={disabled || loading}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        disabled && "opacity-50",
        className
      )}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "outline" ? COLORS.primary : "white"}
        />
      ) : (
        children
      )}
    </Pressable>
  );
}
