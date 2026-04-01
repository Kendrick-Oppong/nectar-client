import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Modal,
  FlatList,
} from "react-native";
import { MapPin, X } from "lucide-react-native";
import ScreenContainer from "@/components/ui/ScreenContainer";
import Button from "@/components/ui/Button";
import { useZones } from "@/lib/api/queries/location";
import { useUpdateLocation } from "@/hooks/useLocationMutations";
import { COLORS } from "@/lib/constants/colors";
import Select from "@/components/ui/Select";
import { Zone, Area } from "@/types/location";

export default function SelectLocationScreen() {
  const { data: zones, isLoading: isLoadingZones } = useZones();
  const { mutate: updateLocation, isPending: isUpdating } = useUpdateLocation();
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  console.log(zones);
  // Modal State
  const [isZoneModalVisible, setZoneModalVisible] = useState(false);
  const [isAreaModalVisible, setAreaModalVisible] = useState(false);

  const availableAreas = useMemo(() => {
    return selectedZone?.areas || [];
  }, [selectedZone]);

  const handleSubmit = () => {
    if (selectedZone && selectedArea) {
      updateLocation({
        zoneId: selectedZone.id,
        areaId: selectedArea.id,
      });
    }
  };

  if (isLoadingZones) {
    return (
      <ScreenContainer>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer pointerEvents={isUpdating ? "none" : "auto"}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mt-6 mb-10">
          <View className="bg-gray-100 p-8 rounded-[50px] mb-8">
            <MapPin size={80} color={COLORS.primary} strokeWidth={1.5} />
          </View>

          <Text className="text-[26px] font-bai-semibold text-gray-900 mb-4 text-center">
            Select Your Location
          </Text>
          <Text className="text-sm font-bai-medium text-gray-500 text-center leading-relaxed">
            Switch on your location to stay in tune with what&apos;s happening
            in your area
          </Text>
        </View>

        <View className="flex-1">
          <Select
            label="Your Zone"
            placeholder="Select a zone"
            value={selectedZone?.name || ""}
            onPress={() => setZoneModalVisible(true)}
          />

          <Select
            label="Your Area"
            placeholder="Select your area"
            value={selectedArea?.name || ""}
            disabled={!selectedZone}
            onPress={() => {
              if (selectedZone) {
                setAreaModalVisible(true);
              } else {
                setZoneModalVisible(true);
              }
            }}
          />

          <View className="mt-auto pt-10">
            <Button
              onPress={handleSubmit}
              disabled={!selectedZone || !selectedArea || isUpdating}
              className="w-full"
            >
              {isUpdating ? (
                <View className="flex-row justify-center items-center gap-2">
                  <ActivityIndicator color={COLORS.white} size={18} />
                  <Text className="font-bai-regular text-white text-base">
                    Submitting
                  </Text>
                </View>
              ) : (
                <Text className="font-bai-semibold text-white text-base">
                  Submit
                </Text>
              )}
            </Button>
          </View>
        </View>
      </ScrollView>

      {/* Zone Selection Modal */}
      <Modal
        visible={isZoneModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setZoneModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-[20px] p-4 max-h-[70%]">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-lg font-bai-bold text-gray-900">
                Select Zone
              </Text>
              <Pressable
                onPress={() => setZoneModalVisible(false)}
                className="bg-gray-100 p-2 rounded-full"
              >
                <X size={18} color={COLORS.black} />
              </Pressable>
            </View>
            <FlatList
              data={zones}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    setSelectedZone(item);
                    setSelectedArea(null);
                    setZoneModalVisible(false);
                  }}
                  className={`py-4 border-b border-gray-100 flex-row justify-between items-center ${
                    selectedZone?.id === item.id
                      ? "bg-primary/5 px-2 rounded-lg"
                      : ""
                  }`}
                >
                  <Text
                    className={`text-base font-bai-medium ${
                      selectedZone?.id === item.id
                        ? "text-primary"
                        : "text-gray-900"
                    }`}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Area Selection Modal */}
      <Modal
        visible={isAreaModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAreaModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-[20px] p-4 max-h-[70%]">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-lg font-bai-bold text-gray-900">
                Select Area
              </Text>
              <Pressable
                onPress={() => setAreaModalVisible(false)}
                className="bg-gray-100 p-2 rounded-full"
              >
                <X size={18} color={COLORS.black} />
              </Pressable>
            </View>
            <FlatList
              data={availableAreas}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    setSelectedArea(item);
                    setAreaModalVisible(false);
                  }}
                  className={`py-4 border-b border-gray-100 flex-row justify-between items-center ${
                    selectedArea?.id === item.id
                      ? "bg-primary/5 px-4 rounded-xl"
                      : ""
                  }`}
                >
                  <Text
                    className={`text-base font-bai-medium ${
                      selectedArea?.id === item.id
                        ? "text-primary"
                        : "text-gray-900"
                    }`}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
}
