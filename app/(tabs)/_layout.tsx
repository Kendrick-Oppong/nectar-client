import { COLORS } from "@/lib/constants/colors";
import { Tabs } from "expo-router";
import {
  ShoppingBag,
  Search,
  ShoppingCart,
  Heart,
  User,
} from "lucide-react-native";
import { useCSSVariable } from "uniwind";

export default function TabsLayout() {
  const fontFamily = useCSSVariable("--font-bai-medium") ?? "";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.icon,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: COLORS.accent,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: String(fontFamily),
        },
      }}
    >
      <Tabs.Screen
        name="shop/index"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, size, focused }) => (
            <ShoppingBag
              color={color}
              size={size}
              strokeWidth={focused ? 1.8 : 1.2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore/index"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size, focused }) => (
            <Search
              color={color}
              size={size}
              strokeWidth={focused ? 1.8 : 1.2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart/index"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size, focused }) => (
            <ShoppingCart
              color={color}
              size={size}
              strokeWidth={focused ? 1.8 : 1.2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favourite/index"
        options={{
          title: "Favourite",
          tabBarIcon: ({ color, size, focused }) => (
            <Heart
              color={color}
              size={size}
              strokeWidth={focused ? 1.8 : 1.2}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account/index"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size, focused }) => (
            <User color={color} size={size} strokeWidth={focused ? 1.8 : 1.2} />
          ),
        }}
      />

      {/* Hide sub-routes from tab bar */}
      <Tabs.Screen name="shop/[categoryId]" options={{ href: null }} />
      <Tabs.Screen name="shop/product/[id]" options={{ href: null }} />
      <Tabs.Screen name="explore/search" options={{ href: null }} />
      <Tabs.Screen name="account/orders" options={{ href: null }} />
      <Tabs.Screen name="account/order/[id]" options={{ href: null }} />
      <Tabs.Screen name="account/addresses" options={{ href: null }} />
      <Tabs.Screen name="account/payment-methods" options={{ href: null }} />
      <Tabs.Screen name="account/promo-codes" options={{ href: null }} />
      <Tabs.Screen name="account/notifications" options={{ href: null }} />
    </Tabs>
  );
}
