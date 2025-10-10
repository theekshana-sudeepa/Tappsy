import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { SafeAreaView } from "react-native-safe-area-context"
import type { RootStack } from "../../App"
import { useNavigation } from "@react-navigation/native"
import { useLayoutEffect, useState } from "react"
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Feather, Ionicons } from "@expo/vector-icons"
import type { User } from "../socket/Chat"
import { useUserList } from "../socket/UseUserList"
import GradientBackground from "../components/GradientBackground"
import FloatingElement from "../components/FloatingElement"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"
import { useTheme } from "../theme/ThemeProvider"

type NewChatScreenProp = NativeStackNavigationProp<RootStack, "NewChatScreen">

export default function NewChatScreen() {
  const { applied } = useTheme()
  const isDark = applied === "dark"

  // Theme-aware colors
  const primaryText = isDark ? "#F9FAFB" : "#1F2937"
  const secondaryText = isDark ? "#E5E7EB" : "#6B7280"
  const tertiaryText = isDark ? "#D1D5DB" : "#9CA3AF"
  const iconColor = isDark ? "#F9FAFB" : "#1F2937"
  const glassBackground = isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.7)"
  const glassBorder = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)"

  const navigation = useNavigation<NewChatScreenProp>()
  const [search, setSearch] = useState("")
  const users = useUserList()

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
              Select Contact
            </Text>
            <Text className="text-sm font-bold" style={{ color: secondaryText }}>
              {users.length} Contacts
            </Text>
          </View>
        </View>
      ),
      headerRight: () => <View></View>,
    })
  }, [navigation, users, primaryText, secondaryText, iconColor])

  const renderItem = ({ item, index }: { item: User; index: number }) => (
    <Animated.View entering={FadeInUp.delay(index * 50).springify()}>
      <TouchableOpacity
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
        <View
          className="justify-start items-center gap-x-3 px-3 py-3 flex-row mx-2 mt-2 rounded-2xl"
          style={{
            backgroundColor: glassBackground,
            borderWidth: 1,
            borderColor: glassBorder,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <View>
            <View
              className="h-14 w-14 rounded-full border-2 justify-center items-center"
              style={{ borderColor: "rgba(96, 165, 250, 0.3)" }}
            >
              {item.profileImage ? (
                <Image source={{ uri: item.profileImage }} className="h-14 w-14 rounded-full" />
              ) : (
                <Image
                  source={{
                    uri: `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`,
                  }}
                  className="h-14 w-14 rounded-full"
                />
              )}
            </View>
          </View>

          <View className="flex-col gap-y-1 flex-1">
            <Text className="font-bold text-lg" style={{ color: primaryText }}>
              {item.firstName} {item.lastName}
            </Text>
            <Text className="text-sm italic" style={{ color: secondaryText }}>
              {item.status === "ACTIVE" ? "Already in Friend List; Message Now" : "Hey there! I am using ChatApp"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )

  const filterdUsers = [...users]
    .filter((user) => {
      return (
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.contactNo.includes(search)
      )
    })
    .sort((a, b) => a.firstName.localeCompare(b.firstName))

  return (
    <SafeAreaView className="flex-1" edges={["right", "bottom", "left"]}>
      <GradientBackground />

      <FloatingElement size={120} color="rgba(59, 130, 246, 0.5)" top={100} left={-30} delay={0} />
      <FloatingElement size={80} color="rgba(255, 255, 255, 0.2)" top={200} left={280} delay={500} />
      <FloatingElement size={100} color="rgba(59, 130, 246, 0.5)" top={500} left={-20} delay={1000} />
      <FloatingElement size={90} color="rgba(255, 255, 255, 0.2)" top={700} left={250} delay={1500} />

      <View className="flex-1" style={{ marginTop: 120 }}>
        <Animated.View entering={FadeInDown.delay(100).springify()} className="mx-3 mb-3">
          <View
            className="items-center flex-row px-4 h-14 rounded-3xl"
            style={{
              backgroundColor: glassBackground,
              borderWidth: 1,
              borderColor: glassBorder,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
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
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).springify()} className="px-3 mb-3">
          <View
            className="rounded-2xl py-2"
            style={{
              backgroundColor: glassBackground,
              borderWidth: 1,
              borderColor: glassBorder,
              borderBottomWidth: 2,
              borderBottomColor: "rgba(74, 222, 128, 0.5)",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <TouchableOpacity
              className="justify-start gap-x-3 flex-row items-center h-14 px-3"
              onPress={() => navigation.navigate("NewContactScreen")}
            >
              <View
                className="items-center justify-center w-12 h-12 rounded-full"
                style={{
                  backgroundColor: "rgba(74, 222, 128, 0.8)",
                  shadowColor: "#4ADE80",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.3,
                  shadowRadius: 6,
                  elevation: 4,
                }}
              >
                <Feather name="user-plus" size={24} color={primaryText} />
              </View>
              <Text className="text-lg font-bold" style={{ color: primaryText }}>
                New Contact
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View className="flex-1">
          <FlatList
            data={filterdUsers}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
