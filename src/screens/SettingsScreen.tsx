import { Text, TouchableOpacity, View, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { type ThemeOption, useTheme } from "../theme/ThemeProvider"
import { StatusBar } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useLayoutEffect } from "react"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RootStack } from "../../App"
import GradientBackground from "../components/GradientBackground"
import FloatingElement from "../components/FloatingElement"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"
import { Feather } from "@expo/vector-icons"

const options: ThemeOption[] = ["light", "dark", "system"]
type SettingScreenProp = NativeStackNavigationProp<RootStack, "SettingScreen">

export default function SettingScreen() {
  const { preference, applied, setPreference } = useTheme()
  const navigation = useNavigation<SettingScreenProp>()

  console.log("SettingScreen - Current theme:", applied, "Preference:", preference)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Settings",
      headerTransparent: true,
      headerBlurEffect: applied === "dark" ? "dark" : "light",
      headerStyle: {
        backgroundColor: applied === "dark" ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.1)",
      },
      headerTintColor: applied === "dark" ? "#FFFFFF" : "#1F2937",
      headerTitleStyle: {
        color: applied === "dark" ? "#FFFFFF" : "#1F2937",
        fontWeight: "600",
      },
    })
  }, [navigation, applied])

  const textColor = applied === "dark" ? "#FFFFFF" : "#1F2937"
  const secondaryTextColor = applied === "dark" ? "#D1D5DB" : "#374151"
  const tertiaryTextColor = applied === "dark" ? "#9CA3AF" : "#9CA3AF"
  const containerBg = applied === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)"
  const borderColor = applied === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.4)"

  const handleThemePress = async (option: ThemeOption) => {
    console.log("Theme button pressed:", option)
    await setPreference(option)
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "transparent",marginTop:17 }}>
      <StatusBar hidden={false} />

      <GradientBackground />

      <FloatingElement size={120} color="rgba(59, 130, 246, 0.5)" top={50} left={-30} delay={0} />
      <FloatingElement size={80} color="rgba(255, 255, 255, 0.2)" top={200} left={280} delay={500} />
      <FloatingElement size={100} color="rgba(59, 130, 246, 0.5)" top={450} left={-20} delay={1000} />
      <FloatingElement size={90} color="rgba(255, 255, 255, 0.2)" top={650} left={250} delay={1500} />

      <ScrollView className="flex-1 mt-10 px-5">
        <Animated.View
          entering={FadeInUp.duration(800).delay(200)}
          className="p-4 rounded-2xl mb-4"
          style={{
            backgroundColor: containerBg,
            borderWidth: 1,
            borderColor: borderColor,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View className="flex-row items-center gap-x-3 mb-3">
            <Feather name="sun" size={24} color={textColor} />
            <Text className="font-bold text-lg" style={{ color: textColor }}>
              App Theme
            </Text>
          </View>
          <View className="flex-row gap-x-3 flex-wrap">
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                className="py-2 px-5 rounded-full mb-2"
                style={{
                  backgroundColor: preference === option ? "#60A5FA" : containerBg,
                  borderWidth: 1,
                  borderColor: preference === option ? "#60A5FA" : "rgba(96, 165, 250, 0.3)",
                }}
                onPress={() => handleThemePress(option)}
              >
                <Text
                  className="text-center font-bold"
                  style={{ color: preference === option ? "#FFFFFF" : textColor }}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(800).delay(400)}
          className="p-4 rounded-2xl mb-4"
          style={{
            backgroundColor: containerBg,
            borderWidth: 1,
            borderColor: borderColor,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View className="flex-row items-center gap-x-3 mb-3">
            <Feather name="bell" size={24} color={textColor} />
            <Text className="font-bold text-lg" style={{ color: textColor }}>
              Notifications
            </Text>
          </View>
          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <Text className="font-semibold" style={{ color: secondaryTextColor }}>
              Push Notifications
            </Text>
            <Feather name="chevron-right" size={20} color={tertiaryTextColor} />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <Text className="font-semibold" style={{ color: secondaryTextColor }}>
              Message Notifications
            </Text>
            <Feather name="chevron-right" size={20} color={tertiaryTextColor} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(800).delay(600)}
          className="p-4 rounded-2xl mb-4"
          style={{
            backgroundColor: containerBg,
            borderWidth: 1,
            borderColor: borderColor,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View className="flex-row items-center gap-x-3 mb-3">
            <Feather name="lock" size={24} color={textColor} />
            <Text className="font-bold text-lg" style={{ color: textColor }}>
              Privacy & Security
            </Text>
          </View>
          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <Text className="font-semibold" style={{ color: secondaryTextColor }}>
              Blocked Users
            </Text>
            <Feather name="chevron-right" size={20} color={tertiaryTextColor} />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <Text className="font-semibold" style={{ color: secondaryTextColor }}>
              Privacy Settings
            </Text>
            <Feather name="chevron-right" size={20} color={tertiaryTextColor} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(800).delay(800)}
          className="p-4 rounded-2xl mb-4"
          style={{
            backgroundColor: containerBg,
            borderWidth: 1,
            borderColor: borderColor,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View className="flex-row items-center gap-x-3 mb-3">
            <Feather name="user" size={24} color={textColor} />
            <Text className="font-bold text-lg" style={{ color: textColor }}>
              Account
            </Text>
          </View>
          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <Text className="font-semibold" style={{ color: secondaryTextColor }}>
              Change Password
            </Text>
            <Feather name="chevron-right" size={20} color={tertiaryTextColor} />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <Text className="font-semibold" style={{ color: secondaryTextColor }}>
              Delete Account
            </Text>
            <Feather name="chevron-right" size={20} color={tertiaryTextColor} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(800).delay(1000)}
          className="p-4 rounded-2xl mb-6"
          style={{
            backgroundColor: containerBg,
            borderWidth: 1,
            borderColor: borderColor,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View className="flex-row items-center gap-x-3 mb-3">
            <Feather name="info" size={24} color={textColor} />
            <Text className="font-bold text-lg" style={{ color: textColor }}>
              About
            </Text>
          </View>
          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <Text className="font-semibold" style={{ color: secondaryTextColor }}>
              Help & Support
            </Text>
            <Feather name="chevron-right" size={20} color={tertiaryTextColor} />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <Text className="font-semibold" style={{ color: secondaryTextColor }}>
              Terms & Privacy Policy
            </Text>
            <Feather name="chevron-right" size={20} color={tertiaryTextColor} />
          </TouchableOpacity>
          <View className="py-3">
            <Text className="font-semibold" style={{ color: tertiaryTextColor }}>
              Version 1.0.0
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  )
}
