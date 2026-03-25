import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ChevronDown, MapPin } from "lucide-react-native";
import ScreenContainer from "@/components/ui/ScreenContainer";
import Button from "@/components/ui/Button";
import { BackButton } from "@/components/ui/BackButton";

export default function SelectLocationScreen() {
  const router = useRouter();
  const [zone, setZone] = useState("");
  const [area, setArea] = useState("");

  const handleSubmit = () => {
    // TODO: Mutation to update profile with selected zone and area, setting isProfileComplete = true
    console.log("Location set to:", zone, area);
    // On success: router.replace("/(tabs)");
  };

  return (
    <ScreenContainer>
      <View className="px-5 mt-2 mb-4">
        <BackButton />
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mt-10 mb-10 px-10">
          <View className="bg-gray-100 p-8 rounded-[40px] mb-8">
            {/* Using a lucide MapPin as placeholder for the map illustration */}
            <MapPin size={100} color="#6B7280" strokeWidth={1.5} />
          </View>

          <Text className="text-[26px] font-baiSemiBold text-gray-900 mb-4 text-center">
            Select Your Location
          </Text>
          <Text className="text-base font-baiMedium text-gray-500 text-center leading-relaxed">
            Switch on your location to stay in tune with what&apos;s happening
            in your area
          </Text>
        </View>

        <View className="px-6 flex-1 justify-center">
          <View className="mb-8">
            <Text className="text-gray-500 font-baiMedium text-sm mb-2">
              Your Zone
            </Text>
            <Pressable className="flex-row items-center justify-between border-b border-gray-200 pb-3">
              <Text className="font-baiMedium text-base text-gray-900">
                {zone || "Banasree"}
              </Text>
              <ChevronDown size={20} color="#A1A1A1" />
            </Pressable>
          </View>

          <View className="mb-10">
            <Text className="text-gray-500 font-baiMedium text-sm mb-2">
              Your Area
            </Text>
            <Pressable className="flex-row items-center justify-between border-b border-gray-200 pb-3">
              <Text className="font-baiMedium text-base text-gray-400">
                {area || "Types of your area"}
              </Text>
              <ChevronDown size={20} color="#A1A1A1" />
            </Pressable>
          </View>

          <Button onPress={handleSubmit} className="w-full mt-auto">
            <Text className="font-baiSemiBold text-white text-[18px]">
              Submit
            </Text>
          </Button>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
