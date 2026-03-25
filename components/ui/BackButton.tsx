import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { cn } from "@/lib/utils/classNames"; // Assuming you have a cn utility, or fallback to class names
import { COLORS } from "@/lib/constants/colors";

interface BackButtonProps {
  onPress?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
  iconColor?: string;
}

export function BackButton({
  onPress,
  className = "",
  style,
  iconColor = COLORS.primary,
}: Readonly<BackButtonProps>) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={cn("-ml-1", className)}
      style={style}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <ArrowLeft size={25} color={iconColor} />
    </TouchableOpacity>
  );
}
