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
import { Ionicons } from "@expo/vector-icons"
import { useSingleChat } from "../socket/UseSingleChat"
import type { Chat } from "../socket/Chat"
import { formatChatTime } from "../util/DateFormatter"
import { useSendChat } from "../socket/UseSendChat"
import GradientBackground from "../components/GradientBackground"
import FloatingElement from "../components/FloatingElement"
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated"
import { useTheme } from "../theme/ThemeProvider"

type SingleChatScreenProps = NativeStackScreenProps<RootStack, "SingleChatScreen">

export default function SingleChatScreen({ route, navigation }: SingleChatScreenProps) {
  const { applied } = useTheme()
  const isDark = applied === "dark"

  // Theme-aware colors
  const primaryText = isDark ? "#F9FAFB" : "#1F2937"
  const secondaryText = isDark ? "#E5E7EB" : "#6B7280"
  const tertiaryText = isDark ? "#D1D5DB" : "#9CA3AF"
  const iconColor = isDark ? "#F9FAFB" : "#1F2937"
  const glassBackground = isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0)"
  const glassBorder = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)"
  const inputBackground = isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)"
  const messageBgUser = isDark ? "rgba(59, 130, 246, 0.6)" : "rgba(59, 130, 246, 0.5)"
  const messageBgReceiver = isDark ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.2)"

  const { chatId, friendName, lastSeenTime, profileImage } = route.params

  const singleChat = useSingleChat(chatId)
  const messages = singleChat.messages
  const friend = singleChat.friend
  const sendMessage = useSendChat()

  const [input, setInput] = useState("")
  const flatListRef = useRef<FlatList>(null)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerBlurEffect: "light",
      title: "",
      headerStyle: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
      headerTintColor: iconColor,
      headerLeft: () => (
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            className="justify-center items-center"
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Ionicons name="arrow-back-sharp" size={24} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity
            className="h-12 w-12 rounded-full justify-center items-center"
            style={{
              borderWidth: 2,
              borderColor: "rgba(96, 165, 250, 0.5)",
            }}
          >
            <Image source={{ uri: profileImage }} className="h-12 w-12 rounded-full" />
          </TouchableOpacity>

          <View className="space-y-1">
            <Text className="font-bold text-lg" style={{ color: primaryText }}>
              {friend ? friend.firstName + " " + friend.lastName : friendName}
            </Text>
            <Text className="italic text-xs font-semibold" style={{ color: secondaryText }}>
              {friend?.status === "ONLINE"
                ? "Online"
                : `Last Seen ${formatChatTime(friend?.updatedAt?.toString() ?? "")}`}
            </Text>
          </View>
        </View>
      ),

      headerRight: () => (
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color={iconColor} />
        </TouchableOpacity>
      ),
    })
  }, [navigation, friend, primaryText, secondaryText, iconColor])

  const renderItem = ({ item, index }: { item: Chat; index: number }) => {
    const isMe = item.from.id !== chatId
    return (
      <Animated.View
        entering={FadeInUp.delay(index * 50).springify()}
        className={`my-1 px-3 py-2 max-w-[75%] ${
          isMe
            ? "self-end rounded-tl-xl rounded-bl-xl rounded-br-xl"
            : "rounded-tr-xl rounded-bl-xl rounded-br-xl self-start"
        }`}
        style={{
          backgroundColor: isMe ? messageBgUser : messageBgReceiver,
          borderWidth: 1,
          borderColor: isMe ? "rgba(96, 165, 250, 0.3)" : glassBorder,
          shadowColor: isMe ? "#60A5FA" : "#FFFFFF",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Text className="text-base" style={{ color: primaryText }}>
          {item.message}
        </Text>
        <View className="flex-row justify-end items-center mt-1">
          <Text className="italic text-xs me-2" style={{ color: secondaryText }}>
            {formatChatTime(item.createdAt)}
          </Text>
          {isMe && (
            <Ionicons
              name={
                item.status === "READ"
                  ? "checkmark-done-sharp"
                  : item.status === "DELIVERED"
                    ? "checkmark-done-sharp"
                    : "checkmark"
              }
              size={16}
              color={item.status === "READ" ? "#60A5FA" : secondaryText}
            />
          )}
        </View>
      </Animated.View>
    )
  }

  const handleSendChat = () => {
    if (!input.trim()) {
      return
    }
    sendMessage(chatId, input)
    setInput("")
    // Scroll to bottom after sending
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
    }, 100)
  }

  const renderEmptyState = () => (
    <Animated.View entering={FadeInUp.springify()} className="flex-1 justify-center items-center px-8">
      <View
        className="p-8 rounded-3xl items-center"
        style={{
          backgroundColor: glassBackground,
          borderWidth: 1,
          borderColor: glassBorder,
        }}
      >
        <Ionicons name="chatbubbles-outline" size={64} color="#60A5FA" />
        <Text className="text-lg font-bold mt-4 text-center" style={{ color: primaryText }}>
          No messages yet
        </Text>
        <Text className="text-sm mt-2 text-center" style={{ color: secondaryText }}>
          Start the conversation by sending a message
        </Text>
      </View>
    </Animated.View>
  )

  return (
    <SafeAreaView className="flex-1" edges={["right", "bottom", "left"]}>
      <StatusBar hidden={false} barStyle={isDark ? "light-content" : "dark-content"} />

      <GradientBackground />
      <FloatingElement size={120} color="rgba(59, 130, 246, 0.15)" top={100} left={-30} />
      <FloatingElement size={80} color="rgba(255, 255, 255, 0.2)" top={200} left={280} delay={200} />
      <FloatingElement size={100} color="rgba(59, 130, 246, 0.1)" top={400} left={50} delay={400} />

      <KeyboardAvoidingView className="flex-1 mt-20" behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          className="px-3 flex-1"
          inverted
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />

        <Animated.View
          entering={FadeInDown.springify()}
          className="flex-row items-end p-3 gap-2"
          style={{
            backgroundColor: glassBackground,
            borderTopWidth: 1,
            borderTopColor: glassBorder,
          }}
        >
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            multiline
            placeholder="Type a message"
            placeholderTextColor={tertiaryText}
            className="flex-1 min-h-12 max-h-32 h-auto px-4 py-3 rounded-3xl text-base"
            style={{
              backgroundColor: inputBackground,
              borderWidth: 1,
              borderColor: glassBorder,
              color: primaryText,
            }}
          />
          <TouchableOpacity
            onPress={handleSendChat}
            className="w-12 h-12 items-center justify-center rounded-full"
            style={{
              backgroundColor: "rgba(74, 222, 128, 0.95)",
              borderWidth: 1,
              borderColor: glassBorder,
              shadowColor: "#4ADE80",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Ionicons name="send" size={20} color={primaryText} />
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
