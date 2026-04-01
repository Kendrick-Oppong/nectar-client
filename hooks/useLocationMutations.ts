import { useMutation } from "@tanstack/react-query";
import { locationMutationsApi } from "@/lib/api/mutations/location";
import { UpdateLocationData } from "@/types/location";
import { useAuthStore } from "@/lib/store/auth-store";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export function useUpdateLocation() {
  const { updateUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (locationData: UpdateLocationData) =>
      locationMutationsApi.updateProfile(locationData),
    onSuccess: async (data) => {
      // Data returned from server contains updated user fields
      await updateUser(data);

      Toast.show({
        type: "success",
        text1: "Location Set!",
        text2: "Your profile is now complete.",
      });

      router.replace("/(tabs)/explore");
    },
    onError: (err) => {
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: err.message,
      });
    },
  });
}
