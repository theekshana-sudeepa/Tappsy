import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Image, Text, TouchableOpacity, View, ScrollView, StatusBar } from "react-native"
import type { RootStack } from "../../App"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../theme/ThemeProvider"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { useState } from "react"
import { useUserProfile } from "../socket/UseUserProfile"

type ProfileScreenProp = NativeStackNavigationProp<RootStack, "ProfileScreen">

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenProp>()
  const { applied } = useTheme()
  const isDark = applied === "dark"

  // Tappsy Color Palette (WhatsApp Structure + Tappsy Theme)
  const tappsyBlue = "#0084FF"
  const tappsyCyan = "#00C2FF"
  const bg = isDark ? "#0F172A" : "#FFFFFF"
  const headerBg = isDark ? "#0F172A" : "#FFFFFF"
  const primaryText = isDark ? "#F8FAFC" : "#0F172A"
  const secondaryText = isDark ? "#94A3B8" : "#64748B"
  const iconColor = isDark ? "#94A3B8" : "#64748B"
  const dividerColor = isDark ? "#1E293B" : "#F1F5F9"

  const userProfile = useUserProfile()
  const [image] = useState<string>("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400")
  const displayName = userProfile
    ? `${userProfile.firstName} ${userProfile.lastName}`.trim()
    : "Alex Morgan"
  const displayPhone = userProfile
    ? `${userProfile.countryCode} ${userProfile.contactNo}`.trim()
    : "+94 77 000 0000"

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "left"]}>
        {/* WhatsApp Top Navigation Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 12,
            backgroundColor: headerBg,
            borderBottomWidth: 1,
            borderBottomColor: dividerColor,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 6, marginRight: 16 }}
          >
            <Ionicons name="arrow-back" size={24} color={isDark ? "#E9EDEF" : "#111B21"} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "700", color: primaryText }}>
            Profile
          </Text>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Centered Large Profile Photo with Camera Badge */}
          <View style={{ alignItems: "center", paddingVertical: 28 }}>
            <View style={{ position: "relative" }}>
              <Image
                source={{ uri: image }}
                style={{ width: 140, height: 140, borderRadius: 70 }}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 2,
                  right: 4,
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: tappsyBlue,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 3,
                  borderColor: bg,
                  shadowColor: tappsyBlue,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.35,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <Ionicons name="camera" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Name Row */}
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: dividerColor,
            }}
          >
            <Feather name="user" size={20} color={iconColor} style={{ marginTop: 2, marginRight: 20 }} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: 13, color: secondaryText, fontWeight: "500" }}>Name</Text>
                <TouchableOpacity>
                  <MaterialCommunityIcons name="pencil" size={18} color={isDark ? "#38BDF8" : tappsyBlue} />
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 16, fontWeight: "700", color: primaryText, marginTop: 4 }}>
                {displayName}
              </Text>
              <Text style={{ fontSize: 12, color: secondaryText, marginTop: 6, lineHeight: 17 }}>
                This is not your username or pin. This name will be visible to your Tappsy contacts.
              </Text>
            </View>
          </View>

          {/* About Row */}
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: dividerColor,
            }}
          >
            <Feather name="info" size={20} color={iconColor} style={{ marginTop: 2, marginRight: 20 }} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: 13, color: secondaryText, fontWeight: "500" }}>About</Text>
                <TouchableOpacity>
                  <MaterialCommunityIcons name="pencil" size={18} color={isDark ? "#38BDF8" : tappsyBlue} />
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 15, fontWeight: "500", color: primaryText, marginTop: 4 }}>
                Crafting real-time mobile messaging with React Native & WebSockets 🚀
              </Text>
            </View>
          </View>

          {/* Phone Row */}
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: dividerColor,
            }}
          >
            <Feather name="phone" size={20} color={iconColor} style={{ marginTop: 2, marginRight: 20 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, color: secondaryText, fontWeight: "500" }}>Phone</Text>
              <Text style={{ fontSize: 15, fontWeight: "600", color: primaryText, marginTop: 4 }}>
                {displayPhone}
              </Text>
            </View>
          </View>

          {/* Settings & Preferences Link */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              paddingVertical: 16,
            }}
            onPress={() => navigation.navigate("SettingScreen")}
          >
            <Feather name="settings" size={20} color={iconColor} style={{ marginRight: 20 }} />
            <Text style={{ fontSize: 16, fontWeight: "600", color: primaryText, flex: 1 }}>
              Settings & Themes
            </Text>
            <Feather name="chevron-right" size={18} color={secondaryText} />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}
