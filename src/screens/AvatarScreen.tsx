import { ActivityIndicator, FlatList, Image, Pressable, StatusBar, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as ImagePicker from "expo-image-picker"
import { useContext, useState } from "react"
import { useUserRegistration } from "../components/UserContext"
import { validateProfileImage } from "../util/Validation"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"
import { createNewAccount } from "../api/UserService"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RootStack } from "../../App"
import { useNavigation } from "@react-navigation/native"
import { AuthContext } from "../components/AuthProvider"
import GradientBackground from "../components/GradientBackground"
import FloatingElement from "../components/FloatingElement"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"
import { useTheme } from "../theme/ThemeProvider"

type AvataScreenProps = NativeStackNavigationProp<RootStack, "AvatarScreen">

export default function AvatarScreen() {
  const { applied } = useTheme()
  const isDark = applied === "dark"

  // Theme-aware colors
  const primaryText = isDark ? "#F9FAFB" : "#1F2937"
  const secondaryText = isDark ? "#E5E7EB" : "#6B7280"
  const tertiaryText = isDark ? "#D1D5DB" : "#9CA3AF"
  const glassBackground = isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.15)"
  const glassBorder = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)"
  const borderDashed = isDark ? "rgba(200, 200, 200, 0.5)" : "rgba(107, 114, 128, 0.5)"

  const navigation = useNavigation<AvataScreenProps>()
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const { userData, setUserData } = useUserRegistration()
  const [isPressed, setIsPressed] = useState(false)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setUserData((previous) => ({
        ...previous,
        profileImage: result.assets[0].uri,
      }))
    }
  }

  const avatars = [
    require("../../assets/avatar/avatar_1.png"),
    require("../../assets/avatar/avatar_2.png"),
    require("../../assets/avatar/avatar_3.png"),
    require("../../assets/avatar/avatar_4.png"),
    require("../../assets/avatar/avatar_5.png"),
    require("../../assets/avatar/avatar_6.png"),
  ]

  const auth = useContext(AuthContext)

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground />

      <FloatingElement size={100} color="rgba(59, 130, 246, 0.5)" top={50} left={20} delay={0} />
      <FloatingElement size={80} color="rgba(255, 255, 255, 0.2)" top={150} left={300} delay={500} />
      <FloatingElement size={60} color="rgba(59, 130, 246, 0.5)" top={500} left={50} delay={1000} />
      <FloatingElement size={90} color="rgba(255, 255, 255, 0.2)" top={650} left={280} delay={1500} />

      <SafeAreaView className="flex-1">
        <StatusBar hidden={true} />
        <View className="flex-1 items-center px-5">
          <Animated.View entering={FadeInUp.duration(800).delay(200)}>
            <Image source={require("../../assets/logoBlue.png")} className="h-40 w-36" />
          </Animated.View>

          <Animated.View
            className="items-center w-full"
            style={{
              backgroundColor: glassBackground,
              borderRadius: 24,
              padding: 24,
              borderWidth: 1,
              borderColor: glassBorder,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.1,
              shadowRadius: 16,
              elevation: 8,
            }}
            entering={FadeInUp.duration(800).delay(400)}
          >
            <Text className="text-xl font-bold mb-4" style={{ color: primaryText }}>
              Choose A Profile Image
            </Text>

            <Pressable
              className="h-[120] w-[120] rounded-full items-center justify-center border-2 border-dashed mb-4"
              style={{
                backgroundColor: glassBackground,
                borderColor: borderDashed,
              }}
              onPress={pickImage}
            >
              {image ? (
                <Image source={{ uri: image }} className="h-[120] w-[120] rounded-full" />
              ) : (
                <View className="items-center">
                  <Text className="font-bold text-3xl" style={{ color: secondaryText }}>
                    +
                  </Text>
                  <Text className="font-bold text-base" style={{ color: secondaryText }}>
                    Add Image
                  </Text>
                </View>
              )}
            </Pressable>

            <Text className="text-lg my-3 font-bold" style={{ color: primaryText }}>
              Or Select An Avatar
            </Text>

            <FlatList
              data={avatars}
              horizontal
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setImage(Image.resolveAssetSource(item).uri)
                    setUserData((previous) => ({
                      ...previous,
                      profileImage: Image.resolveAssetSource(item).uri,
                    }))
                  }}
                >
                  <Image
                    source={item}
                    className="h-20 w-20 rounded-full mx-2"
                    style={{
                      borderWidth: 2,
                      borderColor: glassBorder,
                    }}
                  />
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              showsHorizontalScrollIndicator={false}
            />
          </Animated.View>

          <Animated.View className="mt-8 w-full" entering={FadeInDown.duration(800).delay(600)}>
            <Pressable
              disabled={loading}
              style={{
                backgroundColor: isPressed ? "rgba(96, 165, 250, 0.8)" : "#60A5FA",
                height: 56,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 16,
                width: "90%",
                alignSelf: "center",
                borderWidth: 2,
                borderColor: glassBorder,
                shadowColor: "#60A5FA",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 16,
                elevation: 8,
                transform: [{ scale: isPressed ? 0.97 : 1 }],
              }}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={async () => {
                const validProfile = validateProfileImage(
                  userData.profileImage ? { uri: userData.profileImage, type: "", fileSize: 0 } : null,
                )
                if (validProfile) {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: "Select A Profile Image Or An Avatar",
                  })
                } else {
                  try {
                    setLoading(true)
                    const response = await createNewAccount(userData)
                    console.log(response)
                    if (response.status) {
                      const id = response.userId
                      console.log(id)
                      if (auth) {
                        await auth.signUp(String(id))
                      }
                    } else {
                      Toast.show({
                        type: ALERT_TYPE.WARNING,
                        title: "Warning",
                        textBody: response.message,
                      })
                    }
                  } catch (error) {
                    console.log(error)
                  } finally {
                    setLoading(false)
                  }
                }
              }}
            >
              {loading ? (
                <ActivityIndicator size={"large"} color={"white"} />
              ) : (
                <Text className="font-bold text-xl text-white">Create Account</Text>
              )}
            </Pressable>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  )
}
