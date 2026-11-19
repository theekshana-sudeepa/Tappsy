import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { FlatList, Image, Modal, Pressable, Text, TextInput, TouchableOpacity, View, StatusBar } from "react-native"
import type { RootStack } from "../../App"
import { SafeAreaView } from "react-native-safe-area-context"
import { useContext, useState } from "react"
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import { useChatList } from "../socket/UseChatList"
import { formatChatTime } from "../util/DateFormatter"
import { AuthContext } from "../components/AuthProvider"
import GradientBackground from "../components/GradientBackground"
import { useTheme } from "../theme/ThemeProvider"
import React from "react"

type HomeScreenProps = NativeStackNavigationProp<RootStack, "HomeScreen">

export default function ChatsScreen() {
  const { applied } = useTheme()
  const isDark = applied === "dark"

  // Tappsy Brand Palette (WhatsApp Structure + Tappsy Theme)
  const tappsyBlue = "#0084FF"
  const tappsyCyan = "#00C2FF"
  const bg = isDark ? "#0F172A" : "#FFFFFF"
  const headerBg = isDark ? "#0F172A" : "#FFFFFF"
  const primaryText = isDark ? "#F8FAFC" : "#0F172A"
  const secondaryText = isDark ? "#94A3B8" : "#64748B"
  const searchBg = isDark ? "#1E293B" : "#F1F5F9"
  const dividerColor = isDark ? "#1E293B" : "#F1F5F9"
  const pillActiveBg = isDark ? "#0C4A6E" : "#E0F2FE"
  const pillActiveText = isDark ? "#38BDF8" : "#0284C7"
  const pillInactiveBg = isDark ? "#1E293B" : "#F1F5F9"
  const pillInactiveText = isDark ? "#94A3B8" : "#64748B"
  const iconColor = isDark ? "#94A3B8" : "#64748B"

  const navigation = useNavigation<HomeScreenProps>()
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "favorites" | "groups">("all")
  const chatList = useChatList()
  const [isModalVisible, setModalVisible] = useState(false)
  const auth = useContext(AuthContext)

  const fallbackChats = [
    {
      id: 1,
      friendId: 101,
      friendName: "Shenali Fernando",
      friendFirstName: "Shenali",
      lastMessage: "Hey! Did you check out the new design system? ✨",
      lastTimeStamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
      unreadCount: 2,
      profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      from: { id: 101, firstName: "Shenali", lastName: "Fernando", countryCode: "+94", contactNo: "772345678", createdAt: "", updatedAt: "", status: "ONLINE" },
      to: { id: 1, firstName: "Alex", lastName: "Morgan", countryCode: "+94", contactNo: "770000000", createdAt: "", updatedAt: "", status: "ONLINE" },
      createdAt: "",
      updatedAt: "",
      status: "ONLINE",
      message: "Hey! Did you check out the new design system? ✨"
    },
    {
      id: 2,
      friendId: 102,
      friendName: "Kaveen Perera",
      friendFirstName: "Kaveen",
      lastMessage: "The WebSocket latency is super low 🚀",
      lastTimeStamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
      unreadCount: 0,
      profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
      from: { id: 102, firstName: "Kaveen", lastName: "Perera", countryCode: "+94", contactNo: "718901234", createdAt: "", updatedAt: "", status: "ONLINE" },
      to: { id: 1, firstName: "Alex", lastName: "Morgan", countryCode: "+94", contactNo: "770000000", createdAt: "", updatedAt: "", status: "ONLINE" },
      createdAt: "",
      updatedAt: "",
      status: "ONLINE",
      message: "The WebSocket latency is super low 🚀"
    },
    {
      id: 3,
      friendId: 103,
      friendName: "Sanduni Wickramasinghe",
      friendFirstName: "Sanduni",
      lastMessage: "Let's review the release checklist tomorrow!",
      lastTimeStamp: new Date(Date.now() - 1000 * 60 * 75).toISOString(),
      unreadCount: 1,
      profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
      from: { id: 103, firstName: "Sanduni", lastName: "Wickramasinghe", countryCode: "+94", contactNo: "764567890", createdAt: "", updatedAt: "", status: "ONLINE" },
      to: { id: 1, firstName: "Alex", lastName: "Morgan", countryCode: "+94", contactNo: "770000000", createdAt: "", updatedAt: "", status: "ONLINE" },
      createdAt: "",
      updatedAt: "",
      status: "ONLINE",
      message: "Let's review the release checklist tomorrow!"
    },
    {
      id: 4,
      friendId: 104,
      friendName: "Thisal Mendis",
      friendFirstName: "Thisal",
      lastMessage: "The UI styling looks super crisp.",
      lastTimeStamp: new Date(Date.now() - 1000 * 60 * 210).toISOString(),
      unreadCount: 0,
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      from: { id: 104, firstName: "Thisal", lastName: "Mendis", countryCode: "+94", contactNo: "703456789", createdAt: "", updatedAt: "", status: "ONLINE" },
      to: { id: 1, firstName: "Alex", lastName: "Morgan", countryCode: "+94", contactNo: "770000000", createdAt: "", updatedAt: "", status: "ONLINE" },
      createdAt: "",
      updatedAt: "",
      status: "ONLINE",
      message: "The UI styling looks super crisp."
    },
    {
      id: 5,
      friendId: 105,
      friendName: "Rashmi Senaratne",
      friendFirstName: "Rashmi",
      lastMessage: "See you at the design sync tomorrow 👍",
      lastTimeStamp: new Date(Date.now() - 1000 * 60 * 480).toISOString(),
      unreadCount: 0,
      profileImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      from: { id: 105, firstName: "Rashmi", lastName: "Senaratne", countryCode: "+94", contactNo: "789012345", createdAt: "", updatedAt: "", status: "ONLINE" },
      to: { id: 1, firstName: "Alex", lastName: "Morgan", countryCode: "+94", contactNo: "770000000", createdAt: "", updatedAt: "", status: "ONLINE" },
      createdAt: "",
      updatedAt: "",
      status: "ONLINE",
      message: "See you at the design sync tomorrow 👍"
    },
    {
      id: 6,
      friendId: 106,
      friendName: "Dinuka Bandara",
      friendFirstName: "Dinuka",
      lastMessage: "Thanks for sharing the GitHub repository link!",
      lastTimeStamp: new Date(Date.now() - 1000 * 60 * 1440).toISOString(),
      unreadCount: 0,
      profileImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
      from: { id: 106, firstName: "Dinuka", lastName: "Bandara", countryCode: "+94", contactNo: "756789012", createdAt: "", updatedAt: "", status: "ONLINE" },
      to: { id: 1, firstName: "Alex", lastName: "Morgan", countryCode: "+94", contactNo: "770000000", createdAt: "", updatedAt: "", status: "ONLINE" },
      createdAt: "",
      updatedAt: "",
      status: "ONLINE",
      message: "Thanks for sharing the GitHub repository link!"
    }
  ]

  const activeChats = chatList.length > 0 ? chatList : fallbackChats

  const filteredChats = [...activeChats]
    .filter((chat) => {
      if (activeTab === "unread") return chat.unreadCount > 0
      return true
    })
    .filter((chat) => {
      return (
        chat.friendName.toLowerCase().includes(search.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(search.toLowerCase())
      )
    })
    .sort((a, b) => new Date(b.lastTimeStamp).getTime() - new Date(a.lastTimeStamp).getTime())

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: bg,
      }}
      onPress={() => {
        navigation.navigate("SingleChatScreen", {
          chatId: item.friendId,
          friendName: item.friendName,
          lastSeenTime: formatChatTime(item.lastTimeStamp),
          profileImage: item.profileImage
            ? item.profileImage
            : `https://ui-avatars.com/api/?name=${item.friendName.replace("", "+")}&background=random`,
        })
      }}
    >
      {/* Avatar with Online Indicator */}
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: item.profileImage }}
          style={{ width: 52, height: 52, borderRadius: 26 }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 1,
            right: 1,
            width: 13,
            height: 13,
            borderRadius: 6.5,
            backgroundColor: "#25D366",
            borderWidth: 2,
            borderColor: bg,
          }}
        />
      </View>

      {/* Main Chat Info */}
      <View style={{ flex: 1, marginLeft: 15, justifyContent: "center" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
          <Text
            style={{ fontSize: 16, fontWeight: "700", color: primaryText }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.friendName}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: item.unreadCount > 0 ? "700" : "500",
              color: item.unreadCount > 0 ? tappsyBlue : secondaryText,
            }}
          >
            {formatChatTime(item.lastTimeStamp)}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1, marginRight: 8 }}>
            {item.unreadCount === 0 && (
              <Ionicons
                name="checkmark-done"
                size={16}
                color={tappsyBlue}
                style={{ marginRight: 4 }}
              />
            )}
            <Text
              style={{
                fontSize: 14,
                color: item.unreadCount > 0 ? primaryText : secondaryText,
                fontWeight: item.unreadCount > 0 ? "600" : "400",
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.lastMessage}
            </Text>
          </View>

          {item.unreadCount > 0 && (
            <View
              style={{
                backgroundColor: tappsyBlue,
                minWidth: 20,
                height: 20,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 5,
              }}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 11, fontWeight: "700" }}>
                {item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <GradientBackground />

      <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "left"]}>
        {/* Tappsy Top Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: headerBg,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "800",
              color: isDark ? "#38BDF8" : tappsyBlue,
              letterSpacing: -0.5,
            }}
          >
            Tappsy
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 18 }}>
            <TouchableOpacity onPress={() => {}}>
              <Feather name="camera" size={20} color={iconColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("NewChatScreen")}>
              <Ionicons name="search" size={21} color={iconColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name="ellipsis-vertical" size={20} color={iconColor} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tappsy Search Bar */}
        <View style={{ paddingHorizontal: 16, marginBottom: 8, marginTop: 4 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: searchBg,
              borderRadius: 24,
              paddingHorizontal: 14,
              height: 44,
            }}
          >
            <Ionicons name="search" size={18} color={secondaryText} style={{ marginRight: 8 }} />
            <TextInput
              style={{ flex: 1, fontSize: 15, color: primaryText, fontWeight: "400" }}
              placeholder="Search chats & messages"
              placeholderTextColor={secondaryText}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* Filter Pills: All | Unread | Favorites | Groups */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 16,
            marginBottom: 10,
            gap: 8,
          }}
        >
          {(
            [
              { key: "all", label: "All" },
              { key: "unread", label: "Unread" },
              { key: "favorites", label: "Favorites" },
              { key: "groups", label: "Groups" },
            ] as const
          ).map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  borderRadius: 18,
                  backgroundColor: isActive ? pillActiveBg : pillInactiveBg,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "600",
                    color: isActive ? pillActiveText : pillInactiveText,
                  }}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {/* Chats List */}
        <FlatList
          data={filteredChats}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 100 }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 0.5,
                backgroundColor: dividerColor,
                marginLeft: 82,
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
        />

        {/* Tappsy Blue FAB (Start New Chat) */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={{
            position: "absolute",
            bottom: 85,
            right: 20,
            width: 56,
            height: 56,
            borderRadius: 16,
            backgroundColor: tappsyBlue,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: tappsyBlue,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.35,
            shadowRadius: 6,
            elevation: 6,
          }}
          onPress={() => navigation.navigate("NewChatScreen")}
        >
          <MaterialCommunityIcons name="message-text" size={26} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Context Menu Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable
            style={{ flex: 1, backgroundColor: "transparent" }}
            onPress={() => setModalVisible(false)}
          >
            <View style={{ alignItems: "flex-end", paddingRight: 16, paddingTop: 45 }}>
              <View
                style={{
                  backgroundColor: isDark ? "#233138" : "#FFFFFF",
                  borderRadius: 8,
                  width: 190,
                  paddingVertical: 8,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.25,
                  shadowRadius: 8,
                  elevation: 8,
                }}
              >
                <TouchableOpacity
                  style={{ paddingVertical: 12, paddingHorizontal: 16 }}
                  onPress={() => {
                    navigation.navigate("SettingScreen")
                    setModalVisible(false)
                  }}
                >
                  <Text style={{ fontSize: 15, color: primaryText }}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingVertical: 12, paddingHorizontal: 16 }}
                  onPress={() => {
                    navigation.navigate("ProfileScreen")
                    setModalVisible(false)
                  }}
                >
                  <Text style={{ fontSize: 15, color: primaryText }}>My Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ paddingVertical: 12, paddingHorizontal: 16 }}
                  onPress={() => {
                    if (auth) auth.signOut()
                    setModalVisible(false)
                  }}
                >
                  <Text style={{ fontSize: 15, color: "#EF4444" }}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </View>
  )
}
