import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Order Detail: {id}</Text>
    </View>
  );
}
