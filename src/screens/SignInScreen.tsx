import { Image, KeyboardAvoidingView, Platform, Pressable, StatusBar, Text, TouchableOpacity, View } from "react-native"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "../theme/ThemeProvider"
import "../../global.css"
import { FloatingLabelInput } from "react-native-floating-label-input"
import type { RootStack } from "../../App"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import GradientBackground from "../components/GradientBackground"
import FloatingElement from "../components/FloatingElement"
import { useState, useContext } from "react"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"
import { validatePin } from "../util/Validation"
import { signIn } from "../api/UserService"
import { AuthContext } from "../components/AuthProvider"

type SignInProps = NativeStackNavigationProp<RootStack, "SignInScreen">

export default function SignInScreen() {
  const navigation = useNavigation<SignInProps>()
  const { applied } = useTheme()
  const logo = applied === "dark" ? require("../../assets/logoWhite.png") : require("../../assets/logoBlue.png")
  const auth = useContext(AuthContext)

  const [emailOrPhone, setEmailOrPhone] = useState("")
  const [pin, setPin] = useState("")
  const [isPressed, setIsPressed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    // Basic validation
    if (!emailOrPhone.trim()) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Please enter your email or phone number",
      })
      return
    }

    const validPin = validatePin(pin)
    if (validPin) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: validPin,
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await signIn(emailOrPhone, pin)

      if (response.status === true) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Signed in successfully!",
        })

        if (auth && response.id) {
          await auth.signIn(String(response.id))
          // Navigation happens automatically via App.tsx conditional rendering
        }
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: response.message || "Invalid credentials",
        })
      }
    } catch (error) {
      console.error("Sign in error:", error)
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "An error occurred. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground />

      <FloatingElement size={100} color="rgba(59, 130, 246, 0.5)" top={50} left={20} delay={0} />
      <FloatingElement size={80} color="rgba(255, 255, 255, 0.2)" top={150} left={300} delay={500} />
      <FloatingElement size={60} color="rgba(59, 130, 246, 0.5)" top={400} left={50} delay={1000} />
      <FloatingElement size={90} color="rgba(255, 255, 255, 0.2)" top={600} left={280} delay={1500} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 40 : 40}
        className="flex-1 items-center"
      >
        <SafeAreaView className="p-5 justify-center items-center flex-1">
          <StatusBar hidden={true} />

          <Animated.View entering={FadeInUp.duration(800).delay(200)}>
            <Image source={logo} className="h-40 w-36" />
          </Animated.View>

          <Animated.View className="w-full justify-start items-start mt-4" entering={FadeInUp.duration(800).delay(400)}>
            <Text className="font-bold text-white text-2xl">Welcome Back!</Text>
            <Text className="text-white text-base mt-2 opacity-90">Sign in to continue your conversations</Text>
          </Animated.View>

          <Animated.View
            className="self-stretch mt-6"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: 24,
              padding: 24,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.3)",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.1,
              shadowRadius: 16,
              elevation: 8,
            }}
            entering={FadeInUp.duration(800).delay(600)}
          >
            <View className="w-full mb-4">
              <FloatingLabelInput
                label={"Email or Phone Number"}
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                customLabelStyles={{
                  colorFocused: "#60A5FA",
                  colorBlurred: "#D1D5DB",
                  fontSizeFocused: 12,
                  fontSizeBlurred: 16,
                }}
                labelStyles={{
                  color: "#D1D5DB",
                }}
                inputStyles={{
                  color: "#FFFFFF",
                  fontSize: 16,
                  paddingVertical: 12,
                }}
                containerStyles={{
                  borderBottomWidth: 2,
                  borderBottomColor: "rgba(255, 255, 255, 0.4)",
                  paddingVertical: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 8,
                  paddingHorizontal: 12,
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="w-full mb-2">
              <FloatingLabelInput
                label={"4-Digit PIN"}
                value={pin}
                onChangeText={(text) => {
                  // Only allow digits and max 4 characters
                  const numericText = text.replace(/[^0-9]/g, "")
                  if (numericText.length <= 4) {
                    setPin(numericText)
                  }
                }}
                customLabelStyles={{
                  colorFocused: "#60A5FA",
                  colorBlurred: "#D1D5DB",
                  fontSizeFocused: 12,
                  fontSizeBlurred: 16,
                }}
                labelStyles={{
                  color: "#D1D5DB",
                }}
                inputStyles={{
                  color: "#FFFFFF",
                  fontSize: 24,
                  paddingVertical: 12,
                  letterSpacing: 12,
                  textAlign: "center",
                }}
                containerStyles={{
                  borderBottomWidth: 2,
                  borderBottomColor: "rgba(255, 255, 255, 0.4)",
                  paddingVertical: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 8,
                  paddingHorizontal: 12,
                }}
                keyboardType="numeric"
                maxLength={4}
                isPassword
              />
            </View>

            <TouchableOpacity
              className="self-end mt-2"
              onPress={() => {
                Toast.show({
                  type: ALERT_TYPE.INFO,
                  title: "Info",
                  textBody: "Forgot PIN feature coming soon!",
                })
              }}
            >
              <Text className="text-white text-sm opacity-80">Forgot PIN?</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View className="mt-8 w-full" entering={FadeInDown.duration(800).delay(800)}>
            <Pressable
              style={{
                backgroundColor: isPressed ? "rgba(96, 165, 250, 0.8)" : "#60A5FA",
                height: 56,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 16,
                width: 370,
                alignSelf: "center",
                borderWidth: 2,
                borderColor: "rgba(255, 255, 255, 0.3)",
                shadowColor: "#60A5FA",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 16,
                elevation: 8,
                transform: [{ scale: isPressed ? 0.97 : 1 }],
                opacity: isLoading ? 0.6 : 1,
              }}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={handleSignIn}
              disabled={isLoading}
            >
              <Text className="text-white font-bold text-2xl">{isLoading ? "Signing In..." : "Sign In"}</Text>
            </Pressable>
          </Animated.View>

          <Animated.View
            className="flex-row items-center justify-center mt-6"
            entering={FadeInDown.duration(800).delay(1000)}
          >
            <Text className="text-white text-base opacity-80">Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
              <Text className="text-white font-bold text-base" style={{ color: "#60A5FA" }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  )
}
