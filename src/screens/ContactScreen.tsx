import { AntDesign, Ionicons } from "@expo/vector-icons"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useState } from "react"
import { Image, KeyboardAvoidingView, Platform, Pressable, StatusBar, Text, TextInput, View } from "react-native"
import CountryPicker, { type Country, type CountryCode } from "react-native-country-picker-modal"
import { SafeAreaView } from "react-native-safe-area-context"
import type { RootStack } from "../../App"
import { useNavigation } from "@react-navigation/native"
import { useUserRegistration } from "../components/UserContext"
import { validateCountryCode, validatePhoneNo } from "../util/Validation"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"
import GradientBackground from "../components/GradientBackground"
import FloatingElement from "../components/FloatingElement"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"
import { useTheme } from "../theme/ThemeProvider"

type ContactProps = NativeStackNavigationProp<RootStack, "ContactScreen">

export default function ContactScreen() {
  const navigation = useNavigation<ContactProps>()
  const { applied } = useTheme()
  const logo = applied === "dark" ? require("../../assets/logoWhite.png") : require("../../assets/logoBlue.png")

  const [countryCode, setCountryCode] = useState<CountryCode>("LK")
  const [country, setCountry] = useState<Country | null>(null)
  const [show, setShow] = useState<boolean>(false)

  const { userData, setUserData } = useUserRegistration()

  const [callingCode, setCallingCode] = useState("+94")
  const [phoneNo, setPhoneNo] = useState("")
  const [pin, setPin] = useState("")
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
            <Text className="font-bold text-white text-base">
              We Use Your Contacts To Help You Find Friends Who Are Already On The App. Your Contacts Stay Private.
            </Text>
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
            <Pressable
              onPress={() => setShow(true)}
              style={{
                borderBottomWidth: 2,
                borderBottomColor: "#60A5FA",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                height: 56,
                marginBottom: 16,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: 8,
                paddingHorizontal: 12,
              }}
            >
              <CountryPicker
                countryCode={countryCode}
                withFilter
                withFlag
                withCountryNameButton
                withCallingCode
                visible={show}
                onClose={() => {
                  setShow(false)
                }}
                onSelect={(c) => {
                  setCountryCode(c.cca2)
                  setCountry(c)
                  setShow(false)
                }}
              />

              <AntDesign name="caret-down" size={18} color="#FFFFFF" style={{ marginTop: 5 }} />
            </Pressable>

            <View className="flex flex-row justify-between">
              <TextInput
                inputMode="tel"
                style={{
                  height: 56,
                  fontSize: 16,
                  borderBottomWidth: 2,
                  borderBottomColor: "rgba(255, 255, 255, 0.4)",
                  width: "18%",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  color: "#FFFFFF",
                  fontWeight: "bold",
                }}
                placeholder="+94"
                placeholderTextColor="#D1D5DB"
                editable={false}
                value={country ? `+${country.callingCode}` : callingCode}
                onChangeText={(text) => {
                  setCallingCode(text)
                }}
              />
              <TextInput
                inputMode="tel"
                style={{
                  height: 56,
                  fontSize: 16,
                  borderBottomWidth: 2,
                  borderBottomColor: "rgba(255, 255, 255, 0.4)",
                  width: "78%",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  color: "#FFFFFF",
                  fontWeight: "bold",
                }}
                placeholder="Phone Number"
                placeholderTextColor="#D1D5DB"
                value={phoneNo}
                onChangeText={(text) => {
                  setPhoneNo(text)
                }}
              />
            </View>

            <View
              style={{
                height: 56,
                borderBottomWidth: 2,
                borderBottomColor: "rgba(255, 255, 255, 0.4)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: 8,
                paddingHorizontal: 12,
                marginTop: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextInput
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
                style={{
                  flex: 1,
                  fontSize: 24,
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  textAlign: "center",
                  letterSpacing: 16,
                }}
                placeholder="* * * *"
                placeholderTextColor="#D1D5DB"
                value={pin}
                onChangeText={(text) => {
                  // Only allow numeric input
                  const numericText = text.replace(/[^0-9]/g, "")
                  setPin(numericText)
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
                const validCountryCode = validateCountryCode(callingCode)
                const validPhoneNo = validatePhoneNo(phoneNo)

                if (validCountryCode) {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: validCountryCode,
                  })
                } else if (validPhoneNo) {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: validPhoneNo,
                  })
                } else if (!pin || pin.length !== 4) {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: "Please enter a 4-digit PIN",
                  })
                } else {
                  setUserData((previous) => ({
                    ...previous,
                    countryCode: country ? `+${country.callingCode}` : callingCode,
                    contactNo: phoneNo,
                    pinCode: pin,
                  }))
                  navigation.replace("AvatarScreen")
                }
              }}
            >
              <Text className="text-white font-bold text-2xl">Next</Text>
            </Pressable>
          </Animated.View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  )
}
