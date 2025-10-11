import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import ChatsScreen from "../screens/ChatsScreen"
import StatusScreen from "../screens/StatusScreen"
import CallsScreen from "../screens/CallsScreen"
import { Ionicons } from "@expo/vector-icons"
import { BlurView } from "expo-blur"
import { Platform } from "react-native"
import { useTheme } from "../theme/ThemeProvider"

const Tabs = createBottomTabNavigator()

export default function HomeTabs() {
  const { applied } = useTheme()
  const isDark = applied === "dark"

  const tabBarBg = isDark
    ? Platform.OS === "ios"
      ? "rgba(0, 0, 0, 0.8)"
      : "rgba(0, 0, 0, 0.95)"
    : Platform.OS === "ios"
      ? "rgba(255, 255, 255, 0.8)"
      : "rgba(255, 255, 255, 0.95)"

  const inactiveTintColor = isDark ? "#D1D5DB" : "#6B7280"
  const borderColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)"

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName = "chatbubble-ellipses"
          if (route.name === "Chats") iconName = "chatbubble-ellipses"
          else if (route.name === "Status") iconName = "time"
          else if (route.name === "Calls") iconName = "call"
          return <Ionicons name={iconName as any} size={28} color={color} />
        },
        tabBarLabelStyle: { fontSize: 16, fontWeight: "600" },
        tabBarActiveTintColor: "#60A5FA",
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarStyle: {
          position: "absolute",
          height: 80,
          paddingTop: 8,
          backgroundColor: tabBarBg,
          borderTopWidth: 1,
          borderTopColor: borderColor,
          elevation: 0,
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={isDark ? 60 : 80}
              tint={isDark ? "dark" : "light"}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          ) : null,
      })}
    >
      <Tabs.Screen name="Chats" component={ChatsScreen} options={{ headerShown: false }} />
      <Tabs.Screen name="Status" component={StatusScreen}  options={{ headerShown: false }} />
      <Tabs.Screen name="Calls" component={CallsScreen} options={{ headerShown: false }} />
    </Tabs.Navigator>
  )
}
