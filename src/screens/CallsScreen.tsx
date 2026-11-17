"use client"
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"

export default function CallsScreen() {
  const { applied } = useTheme()
  const isDark = applied === "dark"

  // Tappsy Theme Palette (WhatsApp Structure + Tappsy Theme)
  const tappsyBlue = "#0084FF"
  const tappsyCyan = "#00C2FF"
  const bg = isDark ? "#0F172A" : "#FFFFFF"
  const headerBg = isDark ? "#0F172A" : "#FFFFFF"
  const primaryText = isDark ? "#F8FAFC" : "#0F172A"
  const secondaryText = isDark ? "#94A3B8" : "#64748B"
  const sectionHeader = isDark ? "#94A3B8" : "#64748B"
  const iconColor = isDark ? "#94A3B8" : "#64748B"
  const missedRed = "#EF4444"

  const callRecords = [
    {
      id: 1,
      name: "Shenali Fernando",
      type: "incoming",
      media: "video",
      time: "Today, 10:30 AM",
      missed: false,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
    },
    {
      id: 2,
      name: "Kaveen Perera",
      type: "outgoing",
      media: "audio",
      time: "Today, 9:15 AM",
      missed: false,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
    },
    {
      id: 3,
      name: "Sanduni Wickramasinghe",
      type: "incoming",
      media: "audio",
      time: "Yesterday, 11:45 PM",
      missed: true,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200",
    },
    {
      id: 4,
      name: "Thisal Mendis",
      type: "outgoing",
      media: "video",
      time: "Yesterday, 8:20 PM",
      missed: false,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    },
    {
      id: 5,
      name: "Rashmi Senaratne",
      type: "incoming",
      media: "audio",
      time: "Oct 24, 6:10 PM",
      missed: true,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200",
    },
    {
      id: 6,
      name: "Dinuka Bandara",
      type: "incoming",
      media: "audio",
      time: "Oct 23, 2:15 PM",
      missed: false,
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200",
    },
  ]

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "left"]}>
        {/* WhatsApp Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: headerBg,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "800",
              color: primaryText,
              letterSpacing: -0.5,
            }}
          >
            Calls
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 18 }}>
            <TouchableOpacity>
              <Ionicons name="search" size={21} color={iconColor} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={20} color={iconColor} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Recent Section Header */}
          <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 6 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                color: sectionHeader,
              }}
            >
              Recent
            </Text>
          </View>

          {/* Calls List */}
          {callRecords.map((call) => (
            <TouchableOpacity
              key={call.id}
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 12,
              }}
            >
              <Image
                source={{ uri: call.avatar }}
                style={{ width: 50, height: 50, borderRadius: 25 }}
              />

              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: call.missed ? missedRed : primaryText,
                  }}
                >
                  {call.name}
                </Text>

                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}>
                  {call.missed ? (
                    <Feather name="arrow-down-left" size={14} color={missedRed} style={{ marginRight: 6 }} />
                  ) : call.type === "incoming" ? (
                    <Feather name="arrow-down-left" size={14} color={tappsyBlue} style={{ marginRight: 6 }} />
                  ) : (
                    <Feather name="arrow-up-right" size={14} color={tappsyBlue} style={{ marginRight: 6 }} />
                  )}

                  <Text style={{ fontSize: 13, color: secondaryText }}>
                    {call.time}
                  </Text>
                </View>
              </View>

              {/* Call Action Icon */}
              <TouchableOpacity style={{ padding: 8 }}>
                <Ionicons
                  name={call.media === "video" ? "videocam" : "call"}
                  size={22}
                  color={isDark ? "#38BDF8" : tappsyBlue}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tappsy Blue Call FAB */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={{
            position: "absolute",
            bottom: 85,
            right: 20,
            width: 56,
            height: 56,
            borderRadius: 16,
            backgroundColor: tappsyBlue,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: tappsyBlue,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.35,
            shadowRadius: 6,
            elevation: 6,
          }}
        >
          <MaterialCommunityIcons name="phone-plus" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}
