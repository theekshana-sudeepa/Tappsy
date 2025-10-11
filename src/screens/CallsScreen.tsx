"use client"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import GradientBackground from "../components/GradientBackground"

export default function CallsScreen() {
  const { applied } = useTheme()
  const isDark = applied === "dark"

  // Theme-aware colors
  const primaryText = isDark ? "#F9FAFB" : "#1F2937"
  const secondaryText = isDark ? "#E5E7EB" : "#6B7280"
  const tertiaryText = isDark ? "#D1D5DB" : "#9CA3AF"
  const glassBackground = isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)"
  const glassBorder = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.4)"

  const calls = [
    {
      id: 1,
      name: "John Doe",
      type: "incoming",
      time: "Today, 10:30 AM",
      duration: "5:23",
      missed: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      type: "outgoing",
      time: "Today, 9:15 AM",
      duration: "12:45",
      missed: false,
    },
    {
      id: 3,
      name: "Mike Johnson",
      type: "incoming",
      time: "Yesterday, 11:45 PM",
      duration: "0:00",
      missed: true,
    },
    {
      id: 4,
      name: "Sarah Williams",
      type: "outgoing",
      time: "Yesterday, 8:20 PM",
      duration: "3:12",
      missed: false,
    },
    {
      id: 5,
      name: "David Brown",
      type: "incoming",
      time: "Yesterday, 6:10 PM",
      duration: "8:34",
      missed: false,
    },
  ]

  const getCallIcon = (type: string, missed: boolean): "call-outline" | "call" => {
    if (missed) return "call-outline"
    return type === "incoming" ? "call-outline" : "call"
  }

  const getCallIconColor = (type: string, missed: boolean) => {
    if (missed) return "#EF4444"
    return type === "incoming" ? "#10B981" : "#60A5FA"
  }

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {/* Header */}
          <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }}>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: primaryText }}>Calls</Text>
          </View>

          {/* Call History */}
          <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
            {calls.map((call) => (
              <View
                key={call.id}
                style={{
                  backgroundColor: glassBackground,
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: glassBorder,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: isDark ? "#374151" : "#E5E7EB",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="person" size={24} color={secondaryText} />
                  </View>

                  <View style={{ marginLeft: 16, flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: "600", color: primaryText }}>{call.name}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                      <Ionicons
                        name={getCallIcon(call.type, call.missed)}
                        size={14}
                        color={getCallIconColor(call.type, call.missed)}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: call.missed ? "#EF4444" : secondaryText,
                          marginLeft: 6,
                        }}
                      >
                        {call.time}
                      </Text>
                    </View>
                  </View>

                  <View style={{ alignItems: "flex-end" }}>
                    <TouchableOpacity
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: "#60A5FA",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="call" size={20} color="#FFF" />
                    </TouchableOpacity>
                    {!call.missed && (
                      <Text style={{ fontSize: 12, color: tertiaryText, marginTop: 4 }}>{call.duration}</Text>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}
