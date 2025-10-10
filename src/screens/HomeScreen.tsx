import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { FlatList, Image, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native"
import type { RootStack } from "../../App"
import { SafeAreaView } from "react-native-safe-area-context"
import { useContext, useLayoutEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { useChatList } from "../socket/UseChatList"
import { formatChatTime } from "../util/DateFormatter"
import { AuthContext } from "../components/AuthProvider"
import GradientBackground from "../components/GradientBackground"
import FloatingElement from "../components/FloatingElement"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"
import { useTheme } from "../theme/ThemeProvider"
import React from "react"

type HomeScreenProps = NativeStackNavigationProp<RootStack, "HomeScreen">

export default function ChatsScreen() {
  const { applied } = useTheme()
  const isDark = applied === "dark"

  // Theme-aware colors
  const primaryText = isDark ? "#F9FAFB" : "#1F2937"
  const secondaryText = isDark ? "#E5E7EB" : "#6B7280"
  const tertiaryText = isDark ? "#D1D5DB" : "#9CA3AF"
  const iconColor = isDark ? "#F9FAFB" : "#1F2937"
  const glassBackground = isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)"
  const glassBorder = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.4)"
  const modalBackground = isDark ? "rgba(0, 0, 0, 0.75)" : "rgba(255, 255, 255, 0.75)"

  const navigation = useNavigation<HomeScreenProps>()
  const [search, setSearch] = useState("")
  const chatList = useChatList()
  const [isModalVisible, setModalVisible] = useState(false)
  const auth = useContext(AuthContext)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Tappsy",
      headerTitleStyle: { fontWeight: "bold", fontSize: 26, color: primaryText },
      headerTransparent: true,
      headerRight: () => (
        <View className="flex-row space-x-4">
          <TouchableOpacity className="me-3" onPress={() => navigation.navigate("NewChatScreen")}>
            <Ionicons name="chatbubble-ellipses-outline" size={30} color={iconColor} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="ellipsis-vertical" size={28} color={iconColor} />
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <Pressable
              className="flex-1 bg-transparent"
              onPress={() => {
                setModalVisible(false)
              }}
            >
              <Pressable
                onPress={(e) => {
                  e.stopPropagation()
                }}
              >
                <View className="justify-end items-end p-5">
                  <View
                    className="rounded-2xl w-60 p-4"
                    style={{
                      backgroundColor: modalBackground,
                      borderWidth: 1.5,
                      borderColor: glassBorder,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 8 },
                      shadowOpacity: 0.25,
                      shadowRadius: 16,
                      elevation: 10,
                      marginTop: 87,
                    }}
                  >
                    <TouchableOpacity
                      className="h-12 my-1 justify-center items-start border-b"
                      style={{ borderBottomColor: "rgba(96, 165, 250, 0.3)" }}
                      onPress={() => {
                        navigation.navigate("SettingScreen")
                        setModalVisible(false)
                      }}
                    >
                      <Text className="font-bold text-lg" style={{ color: primaryText }}>
                        Settings
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="h-12 my-1 justify-center items-start border-b"
                      style={{ borderBottomColor: "rgba(96, 165, 250, 0.3)" }}
                      onPress={() => {
                        navigation.navigate("ProfileScreen")
                        setModalVisible(false)
                      }}
                    >
                      <Text className="font-bold text-lg" style={{ color: primaryText }}>
                        My Profile
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="h-12 my-1 justify-center items-start"
                      onPress={() => {
                        if (auth) auth.signOut()
                      }}
                    >
                      <Text className="font-bold text-lg" style={{ color: "#DC2626" }}>
                        Log Out
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Pressable>
            </Pressable>
          </Modal>
        </View>
      ),
    })
  }, [navigation, isModalVisible, primaryText, iconColor, modalBackground, glassBorder])

  const filterdChats = [...chatList]
    .filter((chat) => {
      return (
        chat.friendName.toLowerCase().includes(search.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(search.toLowerCase())
      )
    })
    .sort((a, b) => new Date(b.lastTimeStamp).getTime() - new Date(a.lastTimeStamp).getTime())

  const renderItem = ({ item, index }: any) => (
    <Animated.View entering={FadeInUp.delay(index * 100).springify()}>
      <TouchableOpacity
        className="flex-row justify-center items-center py-2 px-3 my-1 rounded-2xl ml-2"
        style={{
          backgroundColor: glassBackground,
          borderWidth: 1,
          borderColor: glassBorder,
          width: "96%",
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
        <TouchableOpacity className="h-14 w-14 rounded-full border-1 border-gray-400 justify-center items-center">
          {item.profileImage ? (
            <Image source={{ uri: item.profileImage }} className="h-14 w-14 rounded-full" />
          ) : (
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${item.friendName.replace("", "+")}&background=random`,
              }}
              className="h-14 w-14 rounded-full"
            />
          )}
        </TouchableOpacity>
        <View className="flex-1 ms-3">
          <View className="flex-row justify-between">
            <Text className="font-bold text-xl" style={{ color: primaryText }} numberOfLines={1} ellipsizeMode="tail">
              {item.friendName}
            </Text>
            <Text className="font-bold text-xs" style={{ color: secondaryText }}>
              {formatChatTime(item.lastTimeStamp)}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="flex-1 text-base" style={{ color: tertiaryText }} numberOfLines={1} ellipsizeMode="tail">
              {item.lastMessage}
            </Text>
            {item.unreadCount > 0 && (
              <View className="rounded-full px-2 py-2 ms-2" style={{ backgroundColor: "#60A5FA" }}>
                <Text className="text-xs font-bold" style={{ color: "#FFFFFF" }}>
                  {item.unreadCount}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )

  return (
    <>
      <GradientBackground />
      <FloatingElement size={120} top={100} left={-40} color="rgba(59, 130, 246, 0.5)" />
      <FloatingElement size={80} top={200} left={300} color="rgba(255, 255, 255, 0.2)" />
      <FloatingElement size={100} top={500} left={20} color="rgba(59, 130, 246, 0.5)" />
      <FloatingElement size={90} top={700} left={280} color="rgba(255, 255, 255, 0.2)" />

      <SafeAreaView className="flex-1 p-0" edges={["right", "bottom", "left"]}>
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          className="items-center flex-row mx-2 rounded-3xl px-3 h-14"
          style={{
            backgroundColor: glassBackground,
            borderWidth: 1,
            borderColor: glassBorder,
            marginTop: 107,
          }}
        >
          <Ionicons name="search" size={20} color={secondaryText} />
          <TextInput
            className="flex-1 text-lg font-bold ps-2"
            placeholder="Search"
            placeholderTextColor={tertiaryText}
            style={{ color: primaryText }}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </Animated.View>

        <View className="mt-2 flex-1">
          <FlatList data={filterdChats} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 50 }} />
        </View>

        <Animated.View
          entering={FadeInUp.delay(400).springify()}
          className="absolute bottom-2 right-2 h-20 w-20 rounded-full"
          style={{
            backgroundColor: "rgba(59, 130, 246, 0.9)",
            borderWidth: 2,
            borderColor: glassBorder,
            shadowColor: "#60A5FA",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <TouchableOpacity
            className="h-20 w-20 rounded-full justify-center items-center"
            
          >
            <Ionicons name="chatbox-ellipses" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </>
  )
}
