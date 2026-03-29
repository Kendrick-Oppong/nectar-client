import React from "react";
import {
  BaseToast,
  ErrorToast,
  InfoToast,
  ToastConfig,
} from "react-native-toast-message";
import { COLORS } from "@/lib/constants/colors";

export const toastConfig: ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: COLORS.primary }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "normal",
        fontFamily: "BaiJamjuree-SemiBold",
        color: COLORS.primary,
      }}
      text2Style={{
        fontSize: 13,
        fontFamily: "BaiJamjuree-Regular",
        color: COLORS.textSub,
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: COLORS.error }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "normal",
        fontFamily: "BaiJamjuree-SemiBold",
        color: COLORS.error,
      }}
      text2Style={{
        fontSize: 13,
        fontFamily: "BaiJamjuree-Regular",
        color: COLORS.textSub,
      }}
    />
  ),
  info: (props) => (
    <InfoToast
      {...props}
      style={{ borderLeftColor: COLORS.info }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "normal",
        fontFamily: "BaiJamjuree-SemiBold",
        color: COLORS.info,
      }}
      text2Style={{
        fontSize: 13,
        fontFamily: "BaiJamjuree-Regular",
        color: COLORS.textSub,
      }}
    />
  ),
};
