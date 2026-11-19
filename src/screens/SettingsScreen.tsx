import { Text, TouchableOpacity, View, ScrollView, Image, StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { type ThemeOption, useTheme } from "../theme/ThemeProvider"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RootStack } from "../../App"
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { useUserProfile } from "../socket/UseUserProfile"

const options: ThemeOption[] = ["light", "dark", "system"]
type SettingScreenProp = NativeStackNavigationProp<RootStack, "SettingScreen">

export default function SettingScreen() {
  const { preference, applied, setPreference } = useTheme()
  const navigation = useNavigation<SettingScreenProp>()
  const userProfile = useUserProfile()
  const displayName = userProfile
    ? `${userProfile.firstName} ${userProfile.lastName}`.trim()
    : "Alex Morgan"
  const isDark = applied === "dark"

  // Tappsy Theme Palette (WhatsApp Structure + Tappsy Theme)
  const tappsyBlue = "#0084FF"
  const tappsyCyan = "#00C2FF"
  const bg = isDark ? "#0F172A" : "#FFFFFF"
  const headerBg = isDark ? "#0F172A" : "#FFFFFF"
  const primaryText = isDark ? "#F8FAFC" : "#0F172A"
  const secondaryText = isDark ? "#94A3B8" : "#64748B"
  const iconColor = isDark ? "#94A3B8" : "#64748B"
  const dividerColor = isDark ? "#1E293B" : "#F1F5F9"
  const rowActiveBg = isDark ? "#1E293B" : "#F1F5F9"

  const handleThemePress = async (option: ThemeOption) => {
    await setPreference(option)
  }

  const SettingRow = ({
    icon,
    title,
    subtitle,
    onPress,
  }: {
    icon: any
    title: string
    subtitle: string
    onPress?: () => void
  }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
      }}
      onPress={onPress}
    >
      <View style={{ width: 36, alignItems: "center", marginRight: 16 }}>
        <Feather name={icon} size={22} color={iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "500", color: primaryText }}>{title}</Text>
        <Text style={{ fontSize: 13, color: secondaryText, marginTop: 2 }}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  )

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
            Settings
          </Text>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header Summary */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: dividerColor,
            }}
            onPress={() => navigation.navigate("ProfileScreen")}
          >
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" }}
              style={{ width: 60, height: 60, borderRadius: 30 }}
            />
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={{ fontSize: 18, fontWeight: "700", color: primaryText }}>
                {displayName}
              </Text>
              <Text style={{ fontSize: 14, color: secondaryText, marginTop: 2 }} numberOfLines={1}>
                Crafting real-time mobile experiences 🚀
              </Text>
            </View>
            <TouchableOpacity style={{ padding: 8 }}>
              <Ionicons name="qr-code-outline" size={24} color={isDark ? "#38BDF8" : tappsyBlue} />
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Theme Selector Section */}
          <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
              <Feather name="moon" size={20} color={iconColor} style={{ marginRight: 16 }} />
              <Text style={{ fontSize: 16, fontWeight: "700", color: primaryText }}>
                Theme Appearance
              </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 10, marginLeft: 36 }}>
              {options.map((option) => {
                const isSelected = preference === option
                return (
                  <TouchableOpacity
                    key={option}
                    onPress={() => handleThemePress(option)}
                    style={{
                      flex: 1,
                      paddingVertical: 8,
                      borderRadius: 18,
                      alignItems: "center",
                      backgroundColor: isSelected ? (isDark ? "#0C4A6E" : "#E0F2FE") : rowActiveBg,
                      borderWidth: isSelected ? 1.5 : 1,
                      borderColor: isSelected ? (isDark ? "#38BDF8" : tappsyBlue) : "transparent",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: isSelected ? "700" : "500",
                        color: isSelected ? (isDark ? "#38BDF8" : tappsyBlue) : secondaryText,
                        textTransform: "capitalize",
                      }}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>

          <View style={{ height: 1, backgroundColor: dividerColor, marginVertical: 6 }} />

          {/* WhatsApp Settings Rows */}
          <SettingRow
            icon="key"
            title="Account"
            subtitle="Security notifications, change number"
          />
          <SettingRow
            icon="lock"
            title="Privacy"
            subtitle="Block contacts, disappearing messages"
          />
          <SettingRow
            icon="smile"
            title="Avatar"
            subtitle="Create, edit, profile photo"
            onPress={() => navigation.navigate("AvatarScreen")}
          />
          <SettingRow
            icon="message-circle"
            title="Chats"
            subtitle="Theme, wallpapers, chat history"
          />
          <SettingRow
            icon="bell"
            title="Notifications"
            subtitle="Message, group & call tones"
          />
          <SettingRow
            icon="help-circle"
            title="Help"
            subtitle="Help center, contact us, privacy policy"
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}
