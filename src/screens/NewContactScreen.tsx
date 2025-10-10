import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Pressable, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { RootStack } from "../../App"
import { useLayoutEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
import { FloatingLabelInput } from "react-native-floating-label-input"
import CountryPicker, { type Country, type CountryCode } from "react-native-country-picker-modal"
import { validateCountryCode, validateFirstName, validateLastName, validatePhoneNo } from "../util/Validation"
import { ALERT_TYPE, Toast } from "react-native-alert-notification"
import { useSendNewContact } from "../socket/UseSendNewContact"
import GradientBackground from "../components/GradientBackground"
import FloatingElement from "../components/FloatingElement"
import Animated, { FadeInDown } from "react-native-reanimated"
import { useTheme } from "../theme/ThemeProvider"

type NewContactScreenProp = NativeStackNavigationProp<RootStack, "NewContactScreen">

export default function NewContactScreen() {
  const { applied } = useTheme() // Fixed theme property name from appliedTheme to applied
  const isDark = applied === "dark"

  // Theme-aware colors
  const primaryText = isDark ? "#F9FAFB" : "#1F2937"
  const secondaryText = isDark ? "#E5E7EB" : "#6B7280"
  const iconColor = isDark ? "#F9FAFB" : "#1F2937"
  const glassBackground = isDark ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.85)"
  const glassBorder = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)"
  const inputColor = isDark ? "#F9FAFB" : "#1F2937"
  const labelColor = isDark ? "#D1D5DB" : "#6B7280"
  const focusColor = "#60A5FA"

  const navigation = useNavigation<NewContactScreenProp>()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerTransparent: true,
      headerBlurEffect: "light",
      headerStyle: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
      headerTintColor: iconColor,
      headerLeft: () => (
        <View className="items-center flex-row gap-x-2">
          <TouchableOpacity
            className="justify-center items-center"
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Ionicons name="arrow-back-sharp" size={24} color={iconColor} />
          </TouchableOpacity>
          <View className="flex-col">
            <Text className="text-lg font-bold" style={{ color: primaryText }}>
              New Contact
            </Text>
          </View>
        </View>
      ),
      headerRight: () => <View></View>,
    })
  }, [navigation, primaryText, iconColor])

  const [countryCode, setCountryCode] = useState<CountryCode>("LK")
  const [country, setCountry] = useState<Country | null>(null)
  const [show, setShow] = useState<boolean>(false)
  const [callingCode, setCallingCode] = useState("+94")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNo, setPhoneNo] = useState("")

  const newContact = useSendNewContact()
  const sendNewContact = newContact.sendNewContact

  const sendData = () => {
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

    setFirstName("")
    setLastName("")
    setCallingCode("+94")
    setPhoneNo("")
  }

  return (
    <SafeAreaView className="flex-1 mt-10" edges={["right", "bottom", "left"]}>
      <GradientBackground />
      <FloatingElement size={120} top={100} left={-40} color="rgba(59, 130, 246, 0.5)" />
      <FloatingElement size={80} top={300} left={280} color="rgba(255, 255, 255, 0.2)" />
      <FloatingElement size={100} top={500} left={30} color="rgba(59, 130, 246, 0.5)" />

      <Animated.View entering={FadeInDown.delay(200).springify()} className="flex-1 px-5 mt-24">
        <View
          className="p-6 rounded-3xl"
          style={{
            backgroundColor: glassBackground,
            borderWidth: 1,
            borderColor: glassBorder,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 5,
          }}
        >
          {/* First Name Input */}
          <Animated.View
            entering={FadeInDown.delay(300).springify()}
            className="flex-row items-center gap-x-3 h-14 mb-4"
          >
            <FontAwesome name="user" size={24} color={iconColor} />
            <View className="flex-1 h-14">
              <FloatingLabelInput
                label="First Name"
                value={firstName}
                onChangeText={(text) => setFirstName(text)}
                customLabelStyles={{
                  colorFocused: focusColor,
                  colorBlurred: labelColor,
                }}
                labelStyles={{ color: labelColor }}
                inputStyles={{ color: inputColor }}
              />
            </View>
          </Animated.View>

          {/* Last Name Input */}
          <Animated.View
            entering={FadeInDown.delay(350).springify()}
            className="flex-row items-center gap-x-3 h-14 mb-4"
          >
            <FontAwesome name="user" size={24} color={iconColor} />
            <View className="flex-1 h-14">
              <FloatingLabelInput
                label="Last Name"
                value={lastName}
                onChangeText={(text) => setLastName(text)}
                customLabelStyles={{
                  colorFocused: focusColor,
                  colorBlurred: labelColor,
                }}
                labelStyles={{ color: labelColor }}
                inputStyles={{ color: inputColor }}
              />
            </View>
          </Animated.View>

          {/* Country Picker */}
          <Animated.View
            entering={FadeInDown.delay(400).springify()}
            className="justify-center items-center flex-row h-14 mb-4"
            style={{
              borderBottomWidth: 2,
              borderBottomColor: focusColor,
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
            <AntDesign name="caret-down" size={18} color={iconColor} style={{ marginTop: 5 }} />
          </Animated.View>

          {/* Phone Number Input */}
          <Animated.View
            entering={FadeInDown.delay(450).springify()}
            className="flex-row items-center gap-x-3 h-14 mb-6"
          >
            <FontAwesome name="phone" size={24} color={iconColor} />
            <View className="h-14 items-center justify-center px-2 w-28 max-w-28">
              <FloatingLabelInput
                label=""
                editable={false}
                value={country ? `+${country.callingCode}` : callingCode}
                onChangeText={(text) => {
                  setCallingCode(text)
                }}
                inputStyles={{ color: inputColor }}
              />
            </View>
            <View className="flex-1 h-14">
              <FloatingLabelInput
                label="Mobile"
                inputMode="tel"
                value={phoneNo}
                onChangeText={(text) => setPhoneNo(text)}
                customLabelStyles={{
                  colorFocused: focusColor,
                  colorBlurred: labelColor,
                }}
                labelStyles={{ color: labelColor }}
                inputStyles={{ color: inputColor }}
              />
            </View>
          </Animated.View>

          {/* Save Button */}
          <Animated.View entering={FadeInDown.delay(500).springify()}>
            <Pressable
              className="h-14 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: "rgba(74, 222, 128, 0.95)",
                borderWidth: 1,
                borderColor: glassBorder,
                shadowColor: "#4ADE80",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 6,
              }}
              onPress={() => {
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
                  sendData()
                }
              }}
            >
              <Text className="font-bold text-lg text-white">Save Contact</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
    </SafeAreaView>
  )
}
