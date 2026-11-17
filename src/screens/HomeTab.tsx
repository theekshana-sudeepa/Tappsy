import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ChatsScreen from "../screens/HomeScreen"
import StatusScreen from "../screens/StatusScreen"
import CallsScreen from "../screens/CallsScreen"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import { View, Text } from "react-native"

const Tabs = createBottomTabNavigator()

export default function HomeTabs({ route }: any) {
  const initialTab = route?.params?.initialTab || "Chats"
  const { applied } = useTheme()
  const isDark = applied === "dark"

  // Tappsy Tab Bar Colors (WhatsApp Layout + Tappsy Theme)
  const tabBarBg = isDark ? "#0F172A" : "#FFFFFF"
  const activeColor = isDark ? "#38BDF8" : "#0084FF"
  const inactiveColor = isDark ? "#94A3B8" : "#64748B"
  const borderColor = isDark ? "#1E293B" : "#F1F5F9"

  return (
    <Tabs.Navigator
      initialRouteName={initialTab}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          if (route.name === "Chats") {
            return (
              <View style={{ position: "relative" }}>
                <MaterialCommunityIcons
                  name={focused ? "chat" : "chat-outline"}
                  size={24}
                  color={color}
                />
                <View
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -6,
                    backgroundColor: "#0084FF",
                    minWidth: 14,
                    height: 14,
                    borderRadius: 7,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 2,
                  }}
                >
                  <Text style={{ color: "#FFFFFF", fontSize: 9, fontWeight: "700" }}>3</Text>
                </View>
              </View>
            )
          } else if (route.name === "Updates") {
            return (
              <View style={{ position: "relative" }}>
                <Ionicons
                  name={focused ? "disc" : "disc-outline"}
                  size={24}
                  color={color}
                />
                <View
                  style={{
                    position: "absolute",
                    top: 1,
                    right: 1,
                    width: 7,
                    height: 7,
                    borderRadius: 3.5,
                    backgroundColor: "#0084FF",
                  }}
                />
              </View>
            )
          } else if (route.name === "Calls") {
            return (
              <Ionicons
                name={focused ? "call" : "call-outline"}
                size={23}
                color={color}
              />
            )
          }
          return <Ionicons name="chatbubbles" size={24} color={color} />
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "700", marginTop: 2 },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          position: "absolute",
          height: 76,
          paddingTop: 8,
          paddingBottom: 16,
          backgroundColor: tabBarBg,
          borderTopWidth: 1,
          borderTopColor: borderColor,
          elevation: 8,
        },
      })}
    >
      <Tabs.Screen name="Chats" component={ChatsScreen} options={{ headerShown: false }} />
      <Tabs.Screen name="Updates" component={StatusScreen} options={{ headerShown: false }} />
      <Tabs.Screen name="Calls" component={CallsScreen} options={{ headerShown: false }} />
    </Tabs.Navigator>
  )
}
