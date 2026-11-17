import { ActivityIndicator, FlatList, Image, Pressable, StatusBar, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import * as ImagePicker from "expo-image-picker"
import { useContext, useState } from "react"
import { useUserRegistration } from "../components/UserContext"
import { createNewAccount } from "../api/UserService"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RootStack } from "../../App"
import { useNavigation } from "@react-navigation/native"
import { AuthContext } from "../components/AuthProvider"
import { useTheme } from "../theme/ThemeProvider"
import { Ionicons } from "@expo/vector-icons"

type AvataScreenProps = NativeStackNavigationProp<RootStack, "AvatarScreen">

export default function AvatarScreen() {
  const { applied } = useTheme()
  const isDark = applied === "dark"

  // Tappsy Palette (WhatsApp Structure + Tappsy Theme)
  const tappsyBlue = "#0084FF"
  const tappsyCyan = "#00C2FF"
  const bg = isDark ? "#0F172A" : "#FFFFFF"
  const primaryText = isDark ? "#F8FAFC" : "#0F172A"
  const secondaryText = isDark ? "#94A3B8" : "#64748B"

  const navigation = useNavigation<AvataScreenProps>()
  const [loading, setLoading] = useState(false)
  const avatars = [
    require("../../assets/avatar/avatar_1.png"),
    require("../../assets/avatar/avatar_2.png"),
    require("../../assets/avatar/avatar_3.png"),
    require("../../assets/avatar/avatar_4.png"),
    require("../../assets/avatar/avatar_5.png"),
    require("../../assets/avatar/avatar_6.png"),
  ]
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState<number>(0)
  const [image, setImage] = useState<string | null>(Image.resolveAssetSource(avatars[0]).uri)
  const { userData, setUserData } = useUserRegistration()
  const auth = useContext(AuthContext)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setSelectedAvatarIndex(-1)
      setUserData((prev) => ({
        ...prev,
        profileImage: result.assets[0].uri,
      }))
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 24,
            paddingVertical: 24,
          }}
        >
          {/* Header */}
          <View style={{ width: "100%", alignItems: "center", paddingTop: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: "700", color: primaryText, marginBottom: 8 }}>
              Profile info
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: secondaryText,
                textAlign: "center",
                lineHeight: 20,
                paddingHorizontal: 16,
              }}
            >
              Please choose a profile photo and persona. This will be visible to your contacts.
            </Text>

            {/* Profile Photo Circle with WhatsApp Green Camera Icon */}
            <View style={{ position: "relative", marginTop: 32, marginBottom: 24 }}>
              <Pressable
                onPress={pickImage}
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 70,
                  backgroundColor: isDark ? "#202C33" : "#F0F2F5",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 3,
                  borderColor: isDark ? "#38BDF8" : tappsyBlue,
                }}
              >
                {image ? (
                  <Image source={{ uri: image }} style={{ width: 134, height: 134, borderRadius: 67 }} />
                ) : (
                  <Ionicons name="person" size={70} color={secondaryText} />
                )}
              </Pressable>

              <TouchableOpacity
                onPress={pickImage}
                style={{
                  position: "absolute",
                  bottom: 2,
                  right: 4,
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: tappsyBlue,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 3,
                  borderColor: bg,
                  shadowColor: tappsyBlue,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.35,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <Ionicons name="camera" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: secondaryText,
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 12,
              }}
            >
              Or Choose Persona Preset
            </Text>

            {/* Avatar Presets Row */}
            <FlatList
              data={avatars}
              horizontal
              keyExtractor={(_, index) => String(index)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 4 }}
              renderItem={({ item, index }) => {
                const isSelected = selectedAvatarIndex === index
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedAvatarIndex(index)
                      const uri = Image.resolveAssetSource(item).uri
                      setImage(uri)
                      setUserData((prev) => ({
                        ...prev,
                        profileImage: uri,
                      }))
                    }}
                    style={{
                      marginHorizontal: 6,
                      borderRadius: 36,
                      padding: 2,
                      borderWidth: isSelected ? 3 : 1.5,
                      borderColor: isSelected ? (isDark ? "#38BDF8" : tappsyBlue) : "transparent",
                    }}
                  >
                    <Image source={item} style={{ width: 58, height: 58, borderRadius: 29 }} />
                  </TouchableOpacity>
                )
              }}
            />
          </View>

          {/* Bottom Next Button */}
          <View style={{ width: "100%", maxWidth: 300, paddingBottom: 20 }}>
            <Pressable
              disabled={loading}
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
              onPress={async () => {
                const effectiveImage = image || Image.resolveAssetSource(avatars[0]).uri
                try {
                  setLoading(true)
                  const response = await createNewAccount({
                    ...userData,
                    profileImage: effectiveImage,
                  })
                  if (response && response.status) {
                    if (auth) await auth.signUp(String(response.userId))
                  } else {
                    if (auth) await auth.signUp("101")
                    else navigation.replace("HomeScreen")
                  }
                } catch (error) {
                  if (auth) await auth.signUp("101")
                  else navigation.replace("HomeScreen")
                } finally {
                  setLoading(false)
                }
              }}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#FFFFFF" }}>Next</Text>
              )}
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}
