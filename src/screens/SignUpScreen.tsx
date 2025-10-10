import { Image, KeyboardAvoidingView, Platform, Pressable, StatusBar, Text, View } from "react-native"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "../theme/ThemeProvider"
import "../../global.css"
import { FloatingLabelInput } from "react-native-floating-label-input"
import type { RootStack } from "../../App"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { useUserRegistration } from "../components/UserContext"
import { validateFirstName, validateLastName } from "../util/Validation"
import GradientBackground from "../components/GradientBackground"
import FloatingElement from "../components/FloatingElement"
import { useState } from "react"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"

type SignUpProps = NativeStackNavigationProp<RootStack, "SignUpScreen">

export default function SignUpScreen() {
  const navigation = useNavigation<SignUpProps>()
  const { applied } = useTheme()
  const logo = applied === "dark" ? require("../../assets/logoWhite.png") : require("../../assets/logoBlue.png")

  const { userData, setUserData } = useUserRegistration()
  const [isPressed, setIsPressed] = useState(false)

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
            <Text className="font-bold text-white text-lg">Create Your Account & Start The Conversation TODAY</Text>
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
                label={"Enter Your First Name"}
                value={userData.firstName}
                onChangeText={(text) => {
                  setUserData((previous) => ({
                    ...previous,
                    firstName: text,
                  }))
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
              />
            </View>

            <View className="w-full">
              <FloatingLabelInput
                label={"Enter Your Last Name"}
                value={userData.lastName}
                onChangeText={(text) => {
                  setUserData((previous) => ({
                    ...previous,
                    lastName: text,
                  }))
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
              />
            </View>
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
              }}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={() => {
                const validFirstName = validateFirstName(userData.firstName)
                const validLastName = validateLastName(userData.lastName)
                if (validFirstName) {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: validFirstName,
                  })
                } else if (validLastName) {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: validLastName,
                  })
                } else {
                  navigation.navigate("ContactScreen")
                }
              }}
            >
              <Text className="text-white font-bold text-2xl">Next</Text>
            </Pressable>
          </Animated.View>

          <Animated.View className="mt-6 w-full items-center" entering={FadeInDown.duration(800).delay(1000)}>
            <Pressable onPress={() => navigation.navigate("SignInScreen")}>
              <Text
                style={{
                  color: applied === "dark" ? "#E5E7EB" : "#FFFFFF",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                Already have an account?{" "}
                <Text
                  style={{
                    color: "#60A5FA",
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                  }}
                >
                  Sign In
                </Text>
              </Text>
            </Pressable>
          </Animated.View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  )
}
