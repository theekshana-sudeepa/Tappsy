import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StatusBar,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { RootStack } from "../../App"
import { useLayoutEffect, useState, useRef } from "react"
import { Ionicons, Feather, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons"
import { useSingleChat } from "../socket/UseSingleChat"
import type { Chat } from "../socket/Chat"
import { formatChatTime } from "../util/DateFormatter"
import { useSendChat } from "../socket/UseSendChat"
import { useTheme } from "../theme/ThemeProvider"

type SingleChatScreenProps = NativeStackScreenProps<RootStack, "SingleChatScreen">

export default function SingleChatScreen({ route, navigation }: SingleChatScreenProps) {
  const { applied } = useTheme()
  const isDark = applied === "dark"

  // Tappsy Chat Palette (WhatsApp Structure + Tappsy Theme)
  const tappsyBlue = "#0084FF"
  const tappsyCyan = "#00C2FF"
  const chatBg = isDark ? "#0B1120" : "#F1F5F9"
  const headerBg = isDark ? "#0F172A" : "#FFFFFF"
  const primaryText = isDark ? "#F8FAFC" : "#0F172A"
  const secondaryText = isDark ? "#94A3B8" : "#64748B"
  const iconColor = isDark ? "#94A3B8" : "#64748B"
  const inputBg = isDark ? "#1E293B" : "#FFFFFF"
  const msgInBg = isDark ? "#1E293B" : "#FFFFFF"
  const msgOutBg = isDark ? "#0284C7" : "#E0F2FE"
  const checkBlue = isDark ? "#38BDF8" : "#0284C7"

  const { chatId, friendName, profileImage } = route.params
  const singleChat = useSingleChat(chatId)

  const fallbackMessages: Chat[] = [
    {
      id: 1,
      friendId: chatId,
      friendName: friendName,
      friendFirstName: friendName.split(" ")[0],
      lastMessage: "Hey! How's the Tappsy mobile project coming along?",
      lastTimeStamp: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
      unreadCount: 0,
      profileImage: profileImage,
      from: { id: chatId, firstName: friendName.split(" ")[0], lastName: "", countryCode: "+1", contactNo: "", createdAt: "", updatedAt: "", status: "ONLINE" },
      to: { id: 1, firstName: "Me", lastName: "", countryCode: "+94", contactNo: "", createdAt: "", updatedAt: "", status: "ONLINE" },
      createdAt: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
      updatedAt: "",
      status: "ONLINE",
      message: "Hey! How's the Tappsy mobile project coming along?"
    },
    {
      id: 2,
      friendId: chatId,
      friendName: friendName,
      friendFirstName: friendName.split(" ")[0],
      lastMessage: "Almost done! I just configured the Tappsy brand theme with super clean modern UI! 🚀",
      lastTimeStamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
      unreadCount: 0,
      profileImage: profileImage,
      from: { id: 1, firstName: "Me", lastName: "", countryCode: "+94", contactNo: "", createdAt: "", updatedAt: "", status: "ONLINE" },
      to: { id: chatId, firstName: friendName.split(" ")[0], lastName: "", countryCode: "+1", contactNo: "", createdAt: "", updatedAt: "", status: "ONLINE" },
      createdAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
      updatedAt: "",
      status: "ONLINE",
      message: "Almost done! I just configured the Tappsy brand theme with super clean modern UI! 🚀"
    },
    {
      id: 3,
      friendId: chatId,
      friendName: friendName,
      friendFirstName: friendName.split(" ")[0],
      lastMessage: "Awesome! The double blue checkmarks and speech bubbles look incredible with Tappsy blue. ✨",
      lastTimeStamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      unreadCount: 0,
      profileImage: profileImage,
      from: { id: chatId, firstName: friendName.split(" ")[0], lastName: "", countryCode: "+1", contactNo: "", createdAt: "", updatedAt: "", status: "ONLINE" },
      to: { id: 1, firstName: "Me", lastName: "", countryCode: "+94", contactNo: "", createdAt: "", updatedAt: "", status: "ONLINE" },
      createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      updatedAt: "",
      status: "ONLINE",
      message: "Awesome! The double blue checkmarks and speech bubbles look incredible with Tappsy blue. ✨"
    }
  ]

  const messages = singleChat.messages.length > 0 ? singleChat.messages : fallbackMessages
  const sendMessage = useSendChat()
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    sendMessage(chatId, input)
    setInput("")
  }

  return (
    <View style={{ flex: 1, backgroundColor: chatBg }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "bottom", "left"]}>
        {/* WhatsApp Chat Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 8,
            paddingVertical: 8,
            backgroundColor: headerBg,
            borderBottomWidth: 1,
            borderBottomColor: isDark ? "#222D34" : "#E9EDEF",
          }}
        >
          {/* Back button + Avatar + Name */}
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <TouchableOpacity
              style={{ padding: 6, marginRight: 2 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={iconColor} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              onPress={() => navigation.navigate("ProfileScreen")}
            >
              <Image
                source={{ uri: profileImage }}
                style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
              />
              <View>
                <Text
                  style={{ fontSize: 16, fontWeight: "700", color: primaryText }}
                  numberOfLines={1}
                >
                  {friendName}
                </Text>
                <Text style={{ fontSize: 12, color: isDark ? "#38BDF8" : tappsyBlue, fontWeight: "600" }}>
                  online
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Action Icons */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16, paddingRight: 6 }}>
            <TouchableOpacity>
              <Ionicons name="videocam" size={22} color={iconColor} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="call" size={20} color={iconColor} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="ellipsis-vertical" size={20} color={iconColor} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages List */}
        <View style={{ flex: 1, paddingHorizontal: 12, paddingTop: 10 }}>
          {/* Date pill */}
          <View style={{ alignItems: "center", marginBottom: 12 }}>
            <View
              style={{
                backgroundColor: isDark ? "#182229" : "#E1F2FB",
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: "700",
                  color: isDark ? "#8696A0" : "#54656F",
                  textTransform: "uppercase",
                }}
              >
                Today
              </Text>
            </View>
          </View>

          <FlatList
            data={messages}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item, index }) => {
              const isMe = item.from.id !== chatId
              return (
                <View
                  style={{
                    alignSelf: isMe ? "flex-end" : "flex-start",
                    maxWidth: "80%",
                    marginBottom: 8,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: isMe ? msgOutBg : msgInBg,
                      borderRadius: 12,
                      borderTopRightRadius: isMe ? 2 : 12,
                      borderTopLeftRadius: isMe ? 12 : 2,
                      paddingHorizontal: 12,
                      paddingTop: 8,
                      paddingBottom: 6,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      shadowRadius: 2,
                      elevation: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: primaryText,
                        lineHeight: 20,
                        fontWeight: "400",
                      }}
                    >
                      {item.message}
                    </Text>

                    {/* Timestamp & Ticks */}
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        marginTop: 4,
                        gap: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          color: secondaryText,
                          fontWeight: "500",
                        }}
                      >
                        {formatChatTime(item.createdAt)}
                      </Text>
                      {isMe && (
                        <Ionicons
                          name="checkmark-done"
                          size={16}
                          color={checkBlue}
                        />
                      )}
                    </View>
                  </View>

                  {/* Reaction badge on received message */}
                  {!isMe && index === 2 && (
                    <View
                      style={{
                        position: "absolute",
                        bottom: -8,
                        left: 10,
                        backgroundColor: isDark ? "#202C33" : "#FFFFFF",
                        borderRadius: 12,
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderWidth: 1,
                        borderColor: isDark ? "#222D34" : "#E9EDEF",
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.1,
                        shadowRadius: 2,
                        elevation: 2,
                      }}
                    >
                      <Text style={{ fontSize: 11 }}>❤️ 1</Text>
                    </View>
                  )}
                </View>
              )
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* WhatsApp Bottom Input Bar */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 8,
              paddingVertical: 6,
              gap: 6,
            }}
          >
            {/* Pill Container */}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: inputBg,
                borderRadius: 24,
                paddingHorizontal: 12,
                height: 48,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.12,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <TouchableOpacity style={{ padding: 4, marginRight: 4 }}>
                <Ionicons name="happy-outline" size={24} color={secondaryText} />
              </TouchableOpacity>

              <TextInput
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: primaryText,
                  fontWeight: "400",
                  paddingVertical: 8,
                }}
                placeholder="Message"
                placeholderTextColor={secondaryText}
                value={input}
                onChangeText={setInput}
              />

              <TouchableOpacity style={{ padding: 4, marginRight: 6 }}>
                <Ionicons name="attach" size={24} color={secondaryText} />
              </TouchableOpacity>

              <TouchableOpacity style={{ padding: 4 }}>
                <Feather name="camera" size={20} color={secondaryText} />
              </TouchableOpacity>
            </View>

            {/* Circular Tappsy Blue Send / Mic FAB */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSend}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: tappsyBlue,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: tappsyBlue,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.35,
                shadowRadius: 4,
                elevation: 4,
              }}
            >
              <Ionicons
                name={input.length > 0 ? "send" : "mic"}
                size={22}
                color="#FFFFFF"
                style={{ marginLeft: input.length > 0 ? 3 : 0 }}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}
