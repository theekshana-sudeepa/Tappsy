import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View, TextInput, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSingleChat } from "../socket/UseSingleChat";
import { Chat } from "../socket/Chat";
import { formatChatTime } from "../util/DateFormatter";
import { useSendChat } from "../socket/UseSendChat";



type Message = {
    id: number;
    text: string;
    sender: "me" | "friend";
    time: string;
    status?: "sent" | "delivered" | "read";
};


type SingleChatScreenProps = NativeStackScreenProps<
    RootStack,
    "SingleChatScreen"
>;

export default function SingleChatScreen({
    route,
    navigation,
}: SingleChatScreenProps) {

    const { chatId, friendName, lastSeenTime, profileImage } = route.params;

    const singleChat = useSingleChat(chatId); //chatId == friendId

    const messages = singleChat.messages;

    const friend = singleChat.friend;

    const sendMessage = useSendChat();

    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({

            title: "",
            headerLeft: () => (

                <View className="flex-row items-center gap-2">
                    <TouchableOpacity className="justify-center items-center" onPress={() => {
                        navigation.goBack();
                    }}>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="h-14 w-14 rounded-full border-1 border-gray-500 justify-center items-center"
                    >
                        <Image
                            source={{ uri: profileImage }}
                            className="h-14 w-14 rounded-full"
                        />
                    </TouchableOpacity>

                    <View className="space-y-2 ">
                        <Text className="font-bold text-2xl">
                           {friend ? friend. firstName + " " + friend. lastName : friendName}
                        </Text>
                        <Text className="italic text-xs font-bold [text-gray-500">
                            {friend?.status === "ONLINE"
                                ? "Online"
                                : `Last Seen ${formatChatTime(
                                    friend?.updatedAt?.toString() ?? ""
                                )}`}
                        </Text>
                    </View>
                </View>
            ),

            headerRight: () => (
                <TouchableOpacity>
                    <Ionicons name="ellipsis-vertical" size={24} color="black" />
                </TouchableOpacity>
            ),

        });


    }, [navigation, friend]);

    const renderItem = ({ item }: { item: Chat }) => {
        const isMe = item.from.id !== chatId;
        return (
            <View
                className={`my-1 px-3 py-2 max-w-[75%] ${isMe ? 'bg-green-900 self-end rounded-tl-xl rounded-bl-xl rounded-br-xl'
                    : 'rounded-tr-xl rounded-bl-xl rounded-br-xl bg-gray-700 self-start'
                    }`}
            >
                <Text className="text-white text-base">
                    {item.message}
                </Text>
                <View className="flex-row justify-end items-center mt-1">
                    <Text className={`text-white italic text-xs me-2`}>{formatChatTime(item.createdAt)}</Text>
                    {isMe && (
                        <Ionicons
                            name={
                                item.status === "READ"
                                    ? "checkmark-done-sharp"
                                    : item.status === "DELIVERED"
                                        ? "checkmark-done-sharp"
                                        : "checkmark"
                            }
                            size={20}
                            color={item.status === "READ" ? "#0284c7" : "#9ca3af"}

                        />
                    )}
                </View>

            </View>);

    };


    const handleSendChat = () => {

        if (!input.trim()) {
            return;

        }
        sendMessage(chatId, input);
        setInput("");
    }


    return (
        <SafeAreaView
            className="flex-1 bg-red-50"
            edges={["right", "bottom", "left"]}
        >
            <StatusBar hidden={false} />
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <FlatList
                    data={messages}
                    renderItem={renderItem}
                    className="px-3 flex-1"
                    inverted
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={{ paddingBottom: 60 }}
                />

                <View className="flex-row items-end p-2 bg-white bottom-0 right-0">
                    <TextInput
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        multiline
                        placeholder="Type a message"
                        className="flex-1 min-h-14 max-h-32 h-auto px-5 py-2 bg-gray-200 rounded-3xl text-base"
                    />
                    <TouchableOpacity
                        onPress={handleSendChat}
                        className="bg-green-600 w-14 h-14 items-center justify-center rounded-full">
                        <Ionicons name="send" size={24} color="white" />
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>


    );


}