import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { SafeAreaView } from "react-native-safe-area-context"
import type { RootStack } from "../../App"
import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { FlatList, Image, Text, TextInput, TouchableOpacity, View, StatusBar } from "react-native"
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import type { User } from "../socket/Chat"
import { useUserList } from "../socket/UseUserList"
import { useTheme } from "../theme/ThemeProvider"

type NewChatScreenProp = NativeStackNavigationProp<RootStack, "NewChatScreen">

export default function NewChatScreen() {
  const { applied } = useTheme()
  const isDark = applied === "dark"

  // Tappsy Palette (WhatsApp Structure + Tappsy Theme)
  const tappsyBlue = "#0084FF"
  const tappsyCyan = "#00C2FF"
  const bg = isDark ? "#0F172A" : "#FFFFFF"
  const headerBg = isDark ? "#0F172A" : "#FFFFFF"
  const primaryText = isDark ? "#F8FAFC" : "#0F172A"
  const secondaryText = isDark ? "#94A3B8" : "#64748B"
  const iconColor = isDark ? "#94A3B8" : "#64748B"
  const searchBg = isDark ? "#1E293B" : "#F1F5F9"
  const dividerColor = isDark ? "#1E293B" : "#F1F5F9"

  const navigation = useNavigation<NewChatScreenProp>()
  const [search, setSearch] = useState("")
  const users = useUserList()

  const fallbackUsers: User[] = [
    {
      id: 101,
      firstName: "Shenali",
      lastName: "Fernando",
      countryCode: "+94",
      contactNo: "77 234 5678",
      createdAt: "",
      updatedAt: "Hey there! I am using Tappsy.",
      status: "ACTIVE",
      profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
    },
    {
      id: 102,
      firstName: "Kaveen",
      lastName: "Perera",
      countryCode: "+94",
      contactNo: "71 890 1234",
      createdAt: "",
      updatedAt: "Available • Real-time low latency ⚡",
      status: "ACTIVE",
      profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
    },
    {
      id: 103,
      firstName: "Sanduni",
      lastName: "Wickramasinghe",
      countryCode: "+94",
      contactNo: "76 345 6789",
      createdAt: "",
      updatedAt: "At work • Coding with React Native",
      status: "ACTIVE",
      profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200",
    },
    {
      id: 104,
      firstName: "Thisal",
      lastName: "Mendis",
      countryCode: "+94",
      contactNo: "70 456 7890",
      createdAt: "",
      updatedAt: "Battery about to die 🪫",
      status: "ACTIVE",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    },
    {
      id: 105,
      firstName: "Rashmi",
      lastName: "Senaratne",
      countryCode: "+94",
      contactNo: "75 567 8901",
      createdAt: "",
      updatedAt: "Can't talk, Tappsy only",
      status: "ACTIVE",
      profileImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200",
    },
    {
      id: 106,
      firstName: "Dinuka",
      lastName: "Bandara",
      countryCode: "+94",
      contactNo: "78 678 9012",
      createdAt: "",
      updatedAt: "Busy 🚀",
      status: "ACTIVE",
      profileImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200",
    },
  ]

  const activeUserList = users.length > 0 ? users : fallbackUsers

  const filteredUsers = activeUserList
    .filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
      return (
        fullName.includes(search.toLowerCase()) ||
        user.contactNo.includes(search)
      )
    })
    .sort((a, b) => a.firstName.localeCompare(b.firstName))

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "left"]}>
        {/* WhatsApp Top Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 12,
            paddingVertical: 10,
            backgroundColor: headerBg,
            borderBottomWidth: 1,
            borderBottomColor: dividerColor,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ padding: 6, marginRight: 12 }}
            >
              <Ionicons name="arrow-back" size={24} color={isDark ? "#E9EDEF" : "#111B21"} />
            </TouchableOpacity>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "700", color: primaryText }}>
                Select contact
              </Text>
              <Text style={{ fontSize: 12, color: secondaryText }}>
                {activeUserList.length} contacts
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 18, paddingRight: 6 }}>
            <TouchableOpacity>
              <Ionicons name="search" size={21} color={iconColor} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={20} color={iconColor} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View>
              {/* WhatsApp Quick Actions: New Group | New Contact | New Community */}
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: tappsyBlue,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 16,
                  }}
                >
                  <MaterialCommunityIcons name="account-group" size={24} color="#FFFFFF" />
                </View>
                <Text style={{ fontSize: 16, fontWeight: "600", color: primaryText }}>
                  New group
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                }}
                onPress={() => navigation.navigate("NewContactScreen")}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: tappsyBlue,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 16,
                  }}
                >
                  <MaterialCommunityIcons name="account-plus" size={24} color="#FFFFFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: "600", color: primaryText }}>
                    New contact
                  </Text>
                </View>
                <TouchableOpacity style={{ padding: 6 }}>
                  <Ionicons name="qr-code-outline" size={22} color={secondaryText} />
                </TouchableOpacity>
              </TouchableOpacity>

              {/* Section Subhead: Contacts on Tappsy */}
              <View style={{ paddingHorizontal: 16, paddingTop: 14, paddingBottom: 6 }}>
                <Text style={{ fontSize: 13, fontWeight: "700", color: secondaryText }}>
                  Contacts on Tappsy
                </Text>
              </View>
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}
              onPress={() => {
                navigation.replace("SingleChatScreen", {
                  chatId: item.id,
                  friendName: `${item.firstName} ${item.lastName}`,
                  lastSeenTime: item.updatedAt,
                  profileImage: item.profileImage
                    ? item.profileImage
                    : `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`,
                })
              }}
            >
              <Image
                source={{ uri: item.profileImage }}
                style={{ width: 46, height: 46, borderRadius: 23, marginRight: 16 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: primaryText }}>
                  {item.firstName} {item.lastName}
                </Text>
                <Text
                  style={{ fontSize: 13, color: secondaryText, marginTop: 2 }}
                  numberOfLines={1}
                >
                  {item.updatedAt}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </View>
  )
}
