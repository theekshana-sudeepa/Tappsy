import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Pressable, Text, TouchableOpacity, View, StatusBar, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { RootStack } from "../../App"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { Feather, Ionicons } from "@expo/vector-icons"
import CountryPicker, { type Country, type CountryCode } from "react-native-country-picker-modal"
import { validateCountryCode, validateFirstName, validateLastName, validatePhoneNo } from "../util/Validation"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"
import { useSendNewContact } from "../socket/UseSendNewContact"
import { useTheme } from "../theme/ThemeProvider"

type NewContactScreenProp = NativeStackNavigationProp<RootStack, "NewContactScreen">

export default function NewContactScreen() {
  const { applied } = useTheme()
  const isDark = applied === "dark"

  // Tappsy Theme Palette (WhatsApp Structure + Tappsy Theme)
  const tappsyBlue = "#0084FF"
  const tappsyCyan = "#00C2FF"
  const bg = isDark ? "#0F172A" : "#FFFFFF"
  const headerBg = isDark ? "#0F172A" : "#FFFFFF"
  const primaryText = isDark ? "#F8FAFC" : "#0F172A"
  const secondaryText = isDark ? "#94A3B8" : "#64748B"
  const inputBorder = isDark ? "#1E293B" : "#F1F5F9"
  const iconColor = isDark ? "#94A3B8" : "#64748B"
  const inputBg = isDark ? "#1E293B" : "#F1F5F9"

  const navigation = useNavigation<NewContactScreenProp>()

  const [countryCode, setCountryCode] = useState<CountryCode>("LK")
  const [country, setCountry] = useState<Country | null>(null)
  const [show, setShow] = useState<boolean>(false)
  const [callingCode, setCallingCode] = useState("+94")
  const [firstName, setFirstName] = useState("Shenali")
  const [lastName, setLastName] = useState("Fernando")
  const [phoneNo, setPhoneNo] = useState("772345678")

  const newContact = useSendNewContact()
  const sendNewContact = newContact.sendNewContact

  const handleSave = () => {
    const firstNameValid = validateFirstName(firstName)
    const lastNameValid = validateLastName(lastName)
    const countryCodeValid = validateCountryCode(callingCode)
    const phoneNoValid = validatePhoneNo(phoneNo)

    if (firstNameValid) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: firstNameValid,
      })
    } else if (lastNameValid) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: lastNameValid,
      })
    } else if (countryCodeValid) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: countryCodeValid,
      })
    } else if (phoneNoValid) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: phoneNoValid,
      })
    } else {
      sendNewContact({
        id: 0,
        firstName: firstName,
        lastName: lastName,
        countryCode: callingCode,
        contactNo: phoneNo,
        createdAt: "",
        updatedAt: "",
        status: "",
      })

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Contact saved successfully",
      })
      navigation.goBack()
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "left"]}>
        {/* WhatsApp Top Navigation Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 12,
            paddingVertical: 12,
            backgroundColor: headerBg,
            borderBottomWidth: 1,
            borderBottomColor: inputBorder,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ padding: 6, marginRight: 12 }}
            >
              <Ionicons name="arrow-back" size={24} color={isDark ? "#E9EDEF" : "#111B21"} />
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: "700", color: primaryText }}>
              New contact
            </Text>
          </View>

          <TouchableOpacity onPress={handleSave} style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
            <Text style={{ fontSize: 16, fontWeight: "700", color: isDark ? "#38BDF8" : tappsyBlue }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          {/* First Name Input */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            <Feather name="user" size={22} color={iconColor} style={{ marginRight: 20 }} />
            <View style={{ flex: 1, borderBottomWidth: 1.5, borderBottomColor: isDark ? "#38BDF8" : tappsyBlue, paddingBottom: 4 }}>
              <Text style={{ fontSize: 12, color: isDark ? "#38BDF8" : tappsyBlue, fontWeight: "600" }}>First name</Text>
              <TextInput
                style={{ fontSize: 16, color: primaryText, fontWeight: "500", marginTop: 4 }}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First name"
                placeholderTextColor={secondaryText}
              />
            </View>
          </View>

          {/* Last Name Input */}
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
            <View style={{ width: 22, marginRight: 20 }} />
            <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: inputBorder, paddingBottom: 4 }}>
              <TextInput
                style={{ fontSize: 16, color: primaryText, fontWeight: "500" }}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last name"
                placeholderTextColor={secondaryText}
              />
            </View>
          </View>

          {/* Phone Input with Country Code */}
          <View style={{ flexDirection: "row", alignItems: "flex-start", marginBottom: 20 }}>
            <Feather name="phone" size={22} color={iconColor} style={{ marginRight: 20, marginTop: 14 }} />
            <View style={{ flex: 1 }}>
              {/* Country dropdown */}
              <Pressable
                onPress={() => setShow(true)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderBottomColor: inputBorder,
                  paddingVertical: 8,
                  marginBottom: 12,
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
                <Feather name="chevron-down" size={16} color={secondaryText} />
              </Pressable>

              {/* Phone number */}
              <View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: inputBorder, paddingBottom: 6 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: primaryText, marginRight: 10 }}>
                  {country ? `+${country.callingCode}` : callingCode}
                </Text>
                <TextInput
                  inputMode="tel"
                  style={{ flex: 1, fontSize: 16, color: primaryText, fontWeight: "500" }}
                  value={phoneNo}
                  onChangeText={setPhoneNo}
                  placeholder="Phone"
                  placeholderTextColor={secondaryText}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}
