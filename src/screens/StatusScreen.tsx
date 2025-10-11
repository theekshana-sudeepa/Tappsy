"use client"
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"
import GradientBackground from "../components/GradientBackground"

export default function StatusScreen() {
  const { applied } = useTheme()
  const isDark = applied === "dark"

  // Theme-aware colors
  const primaryText = isDark ? "#F9FAFB" : "#1F2937"
  const secondaryText = isDark ? "#E5E7EB" : "#6B7280"
  const tertiaryText = isDark ? "#D1D5DB" : "#9CA3AF"
  const glassBackground = isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)"
  const glassBorder = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.4)"

  const statuses = [
    {
      id: 1,
      name: "John Doe",
      time: "Today, 10:30 AM",
      image: "https://i.pravatar.cc/150?img=1",
      viewed: false,
    },
    {
      id: 2,
      name: "Jane Smith",
      time: "Today, 9:15 AM",
      image: "https://i.pravatar.cc/150?img=2",
      viewed: true,
    },
    {
      id: 3,
      name: "Mike Johnson",
      time: "Yesterday, 11:45 PM",
      image: "https://i.pravatar.cc/150?img=3",
      viewed: false,
    },
    {
      id: 4,
      name: "Sarah Williams",
      time: "Yesterday, 8:20 PM",
      image: "https://i.pravatar.cc/150?img=4",
      viewed: true,
    },
  ]

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {/* Header */}
          <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }}>
            <Text style={{ fontSize: 32, fontWeight: "bold", color: primaryText }}>Status</Text>
          </View>

          {/* My Status */}
          <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: glassBackground,
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: glassBorder,
              }}
            >
              <View style={{ position: "relative" }}>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: isDark ? "#374151" : "#E5E7EB",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="person" size={30} color={secondaryText} />
                </View>
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: "#60A5FA",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: isDark ? "#000" : "#FFF",
                  }}
                >
                  <Ionicons name="add" size={16} color="#FFF" />
                </View>
              </View>
              <View style={{ marginLeft: 16, flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: "600", color: primaryText }}>My Status</Text>
                <Text style={{ fontSize: 14, color: secondaryText, marginTop: 2 }}>Tap to add status update</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Recent Updates */}
          <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: tertiaryText, marginBottom: 15 }}>
              Recent updates
            </Text>

            {statuses.map((status) => (
              <TouchableOpacity
                key={status.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: glassBackground,
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: glassBorder,
                }}
              >
                <View
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    borderWidth: 3,
                    borderColor: status.viewed ? tertiaryText : "#60A5FA",
                    padding: 2,
                  }}
                >
                  <Image source={{ uri: status.image }} style={{ width: "100%", height: "100%", borderRadius: 27 }} />
                </View>
                <View style={{ marginLeft: 16, flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: "600", color: primaryText }}>{status.name}</Text>
                  <Text style={{ fontSize: 14, color: secondaryText, marginTop: 2 }}>{status.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}
