"use client"
import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import { useTheme } from "../theme/ThemeProvider"

export default function StatusScreen() {
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
  const dividerColor = isDark ? "#1E293B" : "#F1F5F9"

  const myAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"

  const recentStatuses = [
    {
      id: 1,
      name: "Shenali Fernando",
      time: "14 minutes ago",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
    },
    {
      id: 2,
      name: "Kaveen Perera",
      time: "42 minutes ago",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
    },
    {
      id: 3,
      name: "Sanduni Wickramasinghe",
      time: "Today, 10:15 AM",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200",
    },
  ]

  const viewedStatuses = [
    {
      id: 4,
      name: "Thisal Mendis",
      time: "Yesterday, 8:40 PM",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    },
    {
      id: 5,
      name: "Rashmi Senaratne",
      time: "Yesterday, 6:15 PM",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200",
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
            Updates
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
          {/* Status Section Title */}
          <View style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 6 }}>
            <Text style={{ fontSize: 18, fontWeight: "800", color: primaryText }}>
              Status
            </Text>
          </View>

          {/* My Status Item */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
          >
            <View style={{ position: "relative" }}>
              <Image
                source={{ uri: myAvatar }}
                style={{ width: 54, height: 54, borderRadius: 27 }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: -1,
                  right: -1,
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: tappsyBlue,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: bg,
                }}
              >
                <Ionicons name="add" size={16} color="#FFFFFF" />
              </View>
            </View>

            <View style={{ marginLeft: 16, flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "700", color: primaryText }}>
                My status
              </Text>
              <Text style={{ fontSize: 13, color: secondaryText, marginTop: 2 }}>
                Tap to add status update
              </Text>
            </View>
          </TouchableOpacity>

          {/* Recent Updates Header */}
          <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: sectionHeader,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Recent updates
            </Text>
          </View>

          {/* Recent Updates List with Tappsy Cyan/Blue Story Rings */}
          {recentStatuses.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  padding: 2.5,
                  borderWidth: 2.5,
                  borderColor: isDark ? "#38BDF8" : tappsyBlue,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: "100%", height: "100%", borderRadius: 24 }}
                />
              </View>

              <View style={{ marginLeft: 16, flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: primaryText }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 13, color: secondaryText, marginTop: 2 }}>
                  {item.time}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Viewed Updates Header */}
          <View style={{ paddingHorizontal: 16, paddingTop: 18, paddingBottom: 8 }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: sectionHeader,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Viewed updates
            </Text>
          </View>

          {/* Viewed Updates List with Muted Grey Rings */}
          {viewedStatuses.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  padding: 2,
                  borderWidth: 1.5,
                  borderColor: isDark ? "#374248" : "#8696A0",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{ width: "100%", height: "100%", borderRadius: 24 }}
                />
              </View>

              <View style={{ marginLeft: 16, flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: primaryText }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 13, color: secondaryText, marginTop: 2 }}>
                  {item.time}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* WhatsApp Double Floating Action Buttons (Pencil + Camera) */}
        <View
          style={{
            position: "absolute",
            bottom: 85,
            right: 20,
            alignItems: "center",
            gap: 14,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.85}
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              backgroundColor: isDark ? "#202C33" : "#F0F2F5",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 4,
            }}
          >
            <MaterialCommunityIcons name="pencil" size={20} color={isDark ? "#94A3B8" : "#64748B"} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={{
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
            <Ionicons name="camera" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}
