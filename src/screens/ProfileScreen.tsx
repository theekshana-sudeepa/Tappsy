import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Image, Text, TouchableOpacity, View, Alert, ScrollView } from "react-native"
import type { RootStack } from "../../App"
import { useNavigation } from "@react-navigation/native"
import { useContext, useLayoutEffect, useState } from "react"
import { useTheme } from "../theme/ThemeProvider"
import { SafeAreaView } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { AuthContext } from "../components/AuthProvider"
import { useUserProfile } from "../socket/UseUserProfile"
import { uploadProfileImage } from "../api/UserService"
import GradientBackground from "../components/GradientBackground"
import FloatingElement from "../components/FloatingElement"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"

type ProfileScreenProp = NativeStackNavigationProp<RootStack, "ProfileScreen">
export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenProp>()
  const { applied } = useTheme()
  const userProfile = useUserProfile()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "My Profile",
      headerTransparent: true,
      headerBlurEffect: "light",
      headerStyle: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
      headerTintColor: "#1F2937",
      headerTitleStyle: {
        color: "#1F2937",
        fontWeight: "600",
      },
    })
  }, [navigation, applied])

  const [image, setImage] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const auth = useContext(AuthContext)

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })
      if (!result.canceled) {
        setImage(result.assets[0].uri)
        setUploading(true)
        await uploadProfileImage(String(auth ? auth.userId : 0), result.assets[0].uri)
        setUploading(false)
        Alert.alert("Success", "Profile image updated successfully!")
      }
    } catch (error) {
      setUploading(false)
      Alert.alert("Error", "Failed to upload profile image. Please try again.")
    }
  }

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => {
          // Add logout logic here
          navigation.navigate("SplashScreen")
        },
      },
    ])
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: "transparent" }}>
      <GradientBackground />

      <FloatingElement size={120} color="rgba(59, 130, 246, 0.5)" top={50} left={-30} delay={0} />
      <FloatingElement size={80} color="rgba(255, 255, 255, 0.2)" top={150} left={280} delay={500} />
      <FloatingElement size={100} color="rgba(59, 130, 246, 0.5)" top={400} left={-20} delay={1000} />
      <FloatingElement size={90} color="rgba(255, 255, 255, 0.2)" top={600} left={250} delay={1500} />

      <ScrollView className="flex-1 mt-20 w-full px-5" showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.duration(800).delay(200)} className="items-center">
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 100,
              padding: 8,
              borderWidth: 2,
              borderColor: "rgba(96, 165, 250, 0.4)",
              shadowColor: "#60A5FA",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            {image ? (
              <Image className="w-40 h-40 rounded-full" source={{ uri: image }} />
            ) : (
              <Image className="w-40 h-40 rounded-full" source={{ uri: userProfile?.profileImage }} />
            )}
            {uploading && (
              <View
                className="absolute inset-0 rounded-full justify-center items-center"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <Text style={{ color: "#FFFFFF", fontSize: 12 }}>Uploading...</Text>
              </View>
            )}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(800).delay(400)} className="my-4">
          <TouchableOpacity
            className="justify-center items-center h-12"
            onPress={pickImage}
            disabled={uploading}
            style={{
              backgroundColor: "rgba(96, 165, 250, 0.15)",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "rgba(96, 165, 250, 0.3)",
              opacity: uploading ? 0.5 : 1,
            }}
          >
            <Text className="font-bold text-lg" style={{ color: "#60A5FA" }}>
              {uploading ? "Uploading..." : "Edit Profile"}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(800).delay(600)}
          className="justify-start flex-col gap-y-2 my-3 p-4 rounded-2xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.4)",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View className="flex-row gap-x-3 items-center">
            <Feather name="user" size={24} color="#1F2937" />
            <Text className="font-bold text-lg" style={{ color: "#1F2937" }}>
              Name
            </Text>
          </View>
          <Text className="font-semibold text-base ml-9" style={{ color: "#374151" }}>
            {userProfile?.firstName} {userProfile?.lastName}
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(800).delay(800)}
          className="justify-start flex-col gap-y-2 my-3 p-4 rounded-2xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.4)",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View className="flex-row gap-x-3 items-center">
            <Feather name="phone" size={24} color="#1F2937" />
            <Text className="font-bold text-lg" style={{ color: "#1F2937" }}>
              Phone
            </Text>
          </View>
          <Text className="font-semibold text-base ml-9" style={{ color: "#374151" }}>
            {userProfile?.countryCode} {userProfile?.contactNo}
          </Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(800).delay(1000)}
          className="justify-start flex-col gap-y-2 my-3 p-4 rounded-2xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.4)",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View className="flex-row gap-x-3 items-center">
            <Feather name="hash" size={24} color="#1F2937" />
            <Text className="font-bold text-lg" style={{ color: "#1F2937" }}>
              User ID
            </Text>
          </View>
          <Text className="font-semibold text-base ml-9" style={{ color: "#374151" }}>
            {auth?.userId || "N/A"}
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(800).delay(1200)} className="my-4 gap-y-3">
          <TouchableOpacity
            className="flex-row items-center justify-between p-4 rounded-2xl"
            onPress={() => navigation.navigate("SettingScreen")}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.4)",
            }}
          >
            <View className="flex-row items-center gap-x-3">
              <Feather name="settings" size={24} color="#1F2937" />
              <Text className="font-bold text-lg" style={{ color: "#1F2937" }}>
                Settings
              </Text>
            </View>
            <Feather name="chevron-right" size={24} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center justify-between p-4 rounded-2xl"
            onPress={handleLogout}
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              borderWidth: 1,
              borderColor: "rgba(239, 68, 68, 0.3)",
            }}
          >
            <View className="flex-row items-center gap-x-3">
              <Feather name="log-out" size={24} color="#EF4444" />
              <Text className="font-bold text-lg" style={{ color: "#EF4444" }}>
                Log Out
              </Text>
            </View>
            <Feather name="chevron-right" size={24} color="#EF4444" />
          </TouchableOpacity>
        </Animated.View>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  )
}
