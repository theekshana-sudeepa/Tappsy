import { Feather } from "@expo/vector-icons"
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
import { useTheme } from "../theme/ThemeProvider"

type ContactProps = NativeStackNavigationProp<RootStack, "ContactScreen">

export default function ContactScreen() {
  const navigation = useNavigation<ContactProps>()
  const { applied } = useTheme()
  const isDark = applied === "dark"

  // Tappsy Palette (WhatsApp Structure + Tappsy Theme)
  const tappsyBlue = "#0084FF"
  const tappsyCyan = "#00C2FF"
  const bg = isDark ? "#0F172A" : "#FFFFFF"
  const primaryText = isDark ? "#F8FAFC" : "#0F172A"
  const secondaryText = isDark ? "#94A3B8" : "#64748B"
  const inputBorder = isDark ? "#1E293B" : "#F1F5F9"
  const lineBlue = isDark ? "#38BDF8" : tappsyBlue

  const [countryCode, setCountryCode] = useState<CountryCode>("LK")
  const [country, setCountry] = useState<Country | null>(null)
  const [show, setShow] = useState<boolean>(false)

  const { setUserData } = useUserRegistration()

  const [callingCode] = useState("+94")
  const [phoneNo, setPhoneNo] = useState("")
  const [pin, setPin] = useState("")

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : "height"}
          style={{ flex: 1, alignItems: "center", justifyContent: "space-between", paddingHorizontal: 24, paddingVertical: 20 }}
        >
          {/* Top Title & Tappsy Description */}
          <View style={{ width: "100%", alignItems: "center", paddingTop: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "700", color: primaryText, marginBottom: 12 }}>
              Enter your phone number
            </Text>
            <Text style={{ fontSize: 14, color: secondaryText, textAlign: "center", lineHeight: 20, paddingHorizontal: 16 }}>
              Tappsy will need to verify your phone number. Carrier SMS charges may apply.
            </Text>

            {/* Country Selector with Tappsy Blue Underline */}
            <View style={{ width: "100%", maxWidth: 300, marginTop: 28 }}>
              <Pressable
                onPress={() => setShow(true)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomWidth: 1.5,
                  borderBottomColor: lineBlue,
                  paddingBottom: 8,
                }}
              >
                <CountryPicker
                  countryCode={countryCode}
                  withFilter
                  withFlag
                  withCountryNameButton
                  withCallingCode
                  visible={show}
                  onClose={() => setShow(false)}
                  onSelect={(c) => {
                    setCountryCode(c.cca2)
                    setCountry(c)
                    setShow(false)
                  }}
                />
                <Feather name="chevron-down" size={16} color={secondaryText} style={{ marginLeft: 6 }} />
              </Pressable>

              {/* Phone Row */}
              <View style={{ flexDirection: "row", marginTop: 14, gap: 12 }}>
                <View
                  style={{
                    width: 70,
                    borderBottomWidth: 1.5,
                    borderBottomColor: lineBlue,
                    paddingBottom: 6,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 17, fontWeight: "600", color: primaryText }}>
                    {country ? `+${country.callingCode}` : callingCode}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    borderBottomWidth: 1.5,
                    borderBottomColor: lineBlue,
                    paddingBottom: 6,
                  }}
                >
                  <TextInput
                    inputMode="tel"
                    style={{ fontSize: 17, fontWeight: "600", color: primaryText }}
                    placeholder="77 000 0000"
                    placeholderTextColor={secondaryText}
                    value={phoneNo}
                    onChangeText={setPhoneNo}
                  />
                </View>
              </View>

              {/* 4-Digit Security PIN */}
              <View style={{ marginTop: 24, alignItems: "center" }}>
                <Text style={{ fontSize: 13, color: secondaryText, marginBottom: 8, fontWeight: "500" }}>
                  Enter 4-Digit Security PIN
                </Text>
                <View
                  style={{
                    width: 140,
                    borderBottomWidth: 1.5,
                    borderBottomColor: lineBlue,
                    paddingBottom: 6,
                  }}
                >
                  <TextInput
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                    style={{
                      fontSize: 22,
                      fontWeight: "700",
                      color: primaryText,
                      textAlign: "center",
                      letterSpacing: 14,
                    }}
                    value={pin}
                    onChangeText={(text) => setPin(text.replace(/[^0-9]/g, ""))}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Bottom Tappsy Blue Action Button */}
          <View style={{ width: "100%", maxWidth: 300, paddingBottom: 20 }}>
            <Pressable
              style={{
                backgroundColor: tappsyBlue,
                height: 48,
                borderRadius: 24,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: tappsyBlue,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.35,
                shadowRadius: 4,
                elevation: 4,
              }}
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
              <Text style={{ fontSize: 16, fontWeight: "700", color: "#FFFFFF" }}>
                Next
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}
