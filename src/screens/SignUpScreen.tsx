import { Image, KeyboardAvoidingView, Platform, Pressable, StatusBar, Text, TextInput, View } from "react-native"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from "../theme/ThemeProvider"
import type { RootStack } from "../../App"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"
import { useUserRegistration } from "../components/UserContext"
import { validateFirstName, validateLastName } from "../util/Validation"
import { useState } from "react"
import { Ionicons } from "@expo/vector-icons"

type SignUpProps = NativeStackNavigationProp<RootStack, "SignUpScreen">

export default function SignUpScreen() {
  const navigation = useNavigation<SignUpProps>()
  const { applied } = useTheme()
  const isDark = applied === "dark"

  // Tappsy Palette (WhatsApp Structure + Tappsy Theme)
  const tappsyBlue = "#0084FF"
  const tappsyCyan = "#00C2FF"
  const bg = isDark ? "#0F172A" : "#FFFFFF"
  const primaryText = isDark ? "#F8FAFC" : "#0F172A"
  const secondaryText = isDark ? "#94A3B8" : "#64748B"
  const lineBlue = isDark ? "#38BDF8" : tappsyBlue

  const { userData, setUserData } = useUserRegistration()
  const [firstName, setFirstName] = useState(userData.firstName || "")
  const [lastName, setLastName] = useState(userData.lastName || "")

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : "height"}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 24,
            paddingVertical: 24,
          }}
        >
          {/* Centered Tappsy Hero Icon & Welcome */}
          <View style={{ width: "100%", alignItems: "center", paddingTop: 40 }}>
            {/* Tappsy Hero Circle Icon */}
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: tappsyBlue,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 28,
                shadowColor: tappsyBlue,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.35,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <Ionicons name="chatbubbles" size={50} color="#FFFFFF" />
            </View>

            <Text style={{ fontSize: 26, fontWeight: "800", color: primaryText, marginBottom: 10 }}>
              Welcome to Tappsy
            </Text>

            <Text
              style={{
                fontSize: 13,
                color: secondaryText,
                textAlign: "center",
                lineHeight: 19,
                paddingHorizontal: 20,
              }}
            >
              Read our <Text style={{ color: isDark ? "#38BDF8" : tappsyBlue, fontWeight: "600" }}>Privacy Policy</Text>. Tap "Agree and continue" to accept the <Text style={{ color: isDark ? "#38BDF8" : tappsyBlue, fontWeight: "600" }}>Terms of Service</Text>.
            </Text>

            {/* Profile Info Form Inputs */}
            <View style={{ width: "100%", maxWidth: 300, marginTop: 36 }}>
              <View style={{ borderBottomWidth: 1.5, borderBottomColor: lineBlue, paddingBottom: 6, marginBottom: 20 }}>
                <Text style={{ fontSize: 12, color: lineBlue, fontWeight: "600" }}>First Name</Text>
                <TextInput
                  style={{ fontSize: 16, color: primaryText, fontWeight: "600", marginTop: 4 }}
                  value={firstName}
                  onChangeText={(text) => {
                    setFirstName(text)
                    setUserData((prev) => ({ ...prev, firstName: text }))
                  }}
                  placeholder="First Name"
                  placeholderTextColor={secondaryText}
                />
              </View>

              <View style={{ borderBottomWidth: 1.5, borderBottomColor: lineBlue, paddingBottom: 6 }}>
                <Text style={{ fontSize: 12, color: lineBlue, fontWeight: "600" }}>Last Name</Text>
                <TextInput
                  style={{ fontSize: 16, color: primaryText, fontWeight: "600", marginTop: 4 }}
                  value={lastName}
                  onChangeText={(text) => {
                    setLastName(text)
                    setUserData((prev) => ({ ...prev, lastName: text }))
                  }}
                  placeholder="Last Name"
                  placeholderTextColor={secondaryText}
                />
              </View>
            </View>
          </View>

          {/* Bottom Actions */}
          <View style={{ width: "100%", maxWidth: 300, alignItems: "center", paddingBottom: 20 }}>
            <Pressable
              style={{
                backgroundColor: tappsyBlue,
                height: 48,
                borderRadius: 24,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: tappsyBlue,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.35,
                shadowRadius: 4,
                elevation: 4,
                marginBottom: 16,
              }}
              onPress={() => {
                const validFirstName = validateFirstName(firstName)
                const validLastName = validateLastName(lastName)
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
              <Text style={{ fontSize: 15, fontWeight: "700", color: "#FFFFFF" }}>
                Agree and continue
              </Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("SignInScreen")}>
              <Text style={{ fontSize: 14, color: isDark ? "#38BDF8" : tappsyBlue, fontWeight: "600" }}>
                Already registered? Sign In
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}
