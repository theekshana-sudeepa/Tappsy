import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, Image, Modal, Pressable, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStack } from "../../App";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useLayoutEffect, useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useChatList } from "../socket/UseChatList";
import { formatChatTime } from "../util/DateFormatter";
import { AuthContext } from "../components/AuthProvider";


const chats = [
    {
        id: 1,
        name: "Mr Beast",
        lastMessage: "Hello, Rug",
        time: "07:07 PM",
        unread: 1000,
        profile: require("../../assets/avatar/avatar_1.png"),

    },
    {
        id: 2,
        name: "Faze Rug",
        lastMessage: "Hello, Beast",
        time: "07:20 PM",
        unread: 500,
        profile: require("../../assets/avatar/avatar_2.png"),
    },
    {
        id: 3,
        name: "Sarah Grace",
        lastMessage: "Hello, Mr Whose The Boss",
        time: "08:07 PM",
        unread: 450,
        profile: require("../../assets/avatar/avatar_3.png"),
    },
    {
        id: 4,
        name: "Mr Whose The Boss",
        lastMessage: "Hello, Sarah",
        time: "08:07 PM",
        unread: 800,
        profile: require("../../assets/avatar/avatar_4.png"),
    },
    {
        id: 5,
        name: "Billie Eilish",
        lastMessage: "Hello, Drake",
        time: "08:07 PM",
        unread: 700,
        profile: require("../../assets/avatar/avatar_5.png"),
    },
    {
        id: 6,
        name: "Billie Eilish",
        lastMessage: "Hello, Drake",
        time: "08:07 PM",
        unread: 700,
        profile: require("../../assets/avatar/avatar_5.png"),
    },
    {
        id: 7,
        name: "Billie Eilish",
        lastMessage: "Hello, Drake",
        time: "08:07 PM",
        unread: 700,
        profile: require("../../assets/avatar/avatar_5.png"),
    },
    {
        id: 8,
        name: "Billie Eilish",
        lastMessage: "Hello, Drake",
        time: "08:07 PM",
        unread: 700,
        profile: require("../../assets/avatar/avatar_5.png"),
    },
    {
        id: 9,
        name: "Billie Eilish",
        lastMessage: "Hello, Drake",
        time: "08:07 PM",
        unread: 700,
        profile: require("../../assets/avatar/avatar_5.png"),
    },
    {
        id: 10,
        name: "Billie Eilish",
        lastMessage: "Hello, Drake",
        time: "08:07 PM",
        unread: 700,
        profile: require("../../assets/avatar/avatar_5.png"),
    },
    {
        id: 11,
        name: "Billie Eilish",
        lastMessage: "Hello, Drake",
        time: "08:07 PM",
        unread: 700,
        profile: require("../../assets/avatar/avatar_5.png"),
    },
    {
        id: 12,
        name: "Billie Eilish",
        lastMessage: "Hello, Drake",
        time: "08:07 PM",
        unread: 700,
        profile: require("../../assets/avatar/avatar_5.png"),
    },



];


type HomeScreenProps = NativeStackNavigationProp<RootStack, "HomeScreen">;



export default function HomeScreen() {

    const navigation = useNavigation<HomeScreenProps>();

    const [search, setSearch] = useState("");

    const chatList = useChatList();

    const [isModalVisible, setModalVisible] = useState(false);

    const auth = useContext(AuthContext);



    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat App",
            headerTitleStyle: { fontWeight: 'bold', fontSize: 26 },
            headerRight: () => (
                <View className="flex-row space-x-4">
                    <TouchableOpacity className="me-3">
                        <Ionicons name="camera" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Ionicons name="ellipsis-vertical" size={28} color="black" />
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
                                setModalVisible(false); // modal close when press outside
                            }}
                        >
                            <Pressable
                                onPress={(e) => {
                                    e.stopPropagation(); // prevent modal close inside of the modal
                                }}
                            >
                                {/*  root modal view */}
                                <View className="justify-end items-end p-5">
                                    {/*  content view */}
                                    <View className="bg-white rounded-xl w-60 p-3" style={{
                                        shadowColor: "#000",
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                    }}>
                                        <TouchableOpacity className="h-12 my-2 justify-center items-start border-b-2 border-b-gray-500"
                                            onPress={() => {
                                                navigation.navigate("SettingScreen");
                                                setModalVisible(false);

                                            }}
                                        >
                                            <Text className="font-bold text-lg">
                                                Settings
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className="h-12 my-2 justify-center items-start border-b-2 border-b-gray-500"
                                            onPress={() => {
                                                navigation.navigate("ProfileScreen");
                                                setModalVisible(false);

                                            }}
                                        >
                                            <Text className="font-bold text-lg">
                                                My Profile
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            className="h-12 my-2 justify-center items-start border-b-2 border-b-gray-500"
                                            onPress={() => {
                                                if (auth) auth.signOut();
                                            }}
                                        >
                                            <Text className="font-bold text-lg">Log Out</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Pressable>

                        </Pressable>
                    </Modal>
                </View>
            )

        });
    }, [navigation, isModalVisible]);


    const filterdChats = [...chatList].filter((chat) => {
        return (
            chat.friendName.toLowerCase().includes(search.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(search.toLowerCase())
        );
    })
        .sort(
            (a, b) =>
                new Date(b.lastTimeStamp).getTime() -
                new Date(a.lastTimeStamp).getTime()

        );


    const renderItem = ({ item }: any) => (
        <TouchableOpacity className="flex-row items-center py-2 px-3 bg-gray-200 my-1 rounded-full"
            onPress={() => {
                navigation.navigate("SingleChatScreen", {
                    chatId: item.friendId,
                    friendName: item.friendName,
                    lastSeenTime: formatChatTime(item.lastTimeStamp),
                    profileImage: item.profileImage
                        ? item.profileImage
                        : `https://ui-avatars.com/api/?name=${item.friendName.replace(
                            "",
                            "+"
                        )}&background=random`,
                });
            }}


        >

            <TouchableOpacity
                className="h-14 w-14 rounded-full border-1 border-gray-500 justify-center items-center"
            >
                {item.profileImage ? (
                    <Image
                        source={{ uri: item.profileImage }}
                        className="h-14 w-14 rounded-full"
                    />
                ) : (
                    <Image
                        source={{
                            uri:
                                `https://ui-avatars.com/api/?name=${item.friendName.replace(
                                    "",
                                    "+"
                                )}&background=random`,
                        }}



                        className="h-14 w-14 rounded-full"
                    /*  source={{
                 uri:
                     `https://ui-avatars.com/api/?name=${item.friendName.split(" ")[0]
                     }+${item.friendName.split(" ")[1]}&background=random`,
             }}
             className="h-14 w-14 rounded-full" */
                    />


                )}
            </TouchableOpacity>
            <View className="flex-1 ms-3">
                <View className="flex-row justify-between">
                    <Text className="font-bold text-xl text-slate-700"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item.friendName}
                    </Text>
                    <Text className="font-bold text-xs text-gray-500">
                        {formatChatTime(item.lastTimeStamp)}
                    </Text>
                </View>
                <View className="flex-row justify-between items-center">
                    <Text
                        className="Otext-gray-500 flex-1 text-base"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item.lastMessage}
                    </Text>
                    {item.unreadCount > 0 && (
                        <View className="bg-green-500 rounded-full px-2 py-2 ms-2">
                            <Text className="text-slate-50 text-xs font-bold">
                                {item.unreadCount}
                            </Text>
                        </View>
                    )}

                </View>
            </View>
        </TouchableOpacity>
    );



    return (
        <SafeAreaView className="flex-1 p-0" edges={['right', 'bottom', 'left']}>
            {/* <StatusBar hidden={false} /> */}
            <View className="items-center flex-row mx-2 border-2 border-gray-600 rounded-3xl px-3 h-14 mt-3">
                <Ionicons name="search" size={20} color="gray"
                    value={search}

                />
                <TextInput className="flex-1 text-lg font-bold ps-2" placeholder="Search"
                    onChangeText={(text) => setSearch(text)}
                />
            </View>
            <View className="mt-2">
                <FlatList data={filterdChats}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 50 }}
                />
            </View>

            <View className="absolute bg-green-300 bottom-2 right-2 h-15 w-20 rounded-3xl">
                <TouchableOpacity className="h-20 w-20 rounded-3xl justify-center items-center"
                    onPress={() => navigation.navigate("NewChatScreen")}
                >
                    <Ionicons name="chatbox-ellipses" size={28} color="black" />
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );

}