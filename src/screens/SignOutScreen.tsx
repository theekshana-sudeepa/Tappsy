import { useEffect, useContext } from "react"
import { View, Text, ActivityIndicator } from "react-native"
import { AuthContext } from "../components/AuthProvider"
import { useNavigation } from "@react-navigation/native"

export default function SignOutScreen() {
  const auth = useContext(AuthContext)
  const navigation = useNavigation()

  useEffect(() => {
    const handleSignOut = async () => {
      if (auth) {
        await auth.signOut()
      }
      // Navigation will be handled automatically by App.tsx based on auth state
    }

    handleSignOut()
  }, [auth])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1F2937" }}>
      <ActivityIndicator size="large" color="#60A5FA" />
      <Text style={{ color: "#F9FAFB", marginTop: 16, fontSize: 16 }}>Signing out...</Text>
    </View>
  )
}
