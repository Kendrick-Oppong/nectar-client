import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function CategoryScreen() {
  const { categoryId } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Category: {categoryId}</Text>
    </View>
  );
}
