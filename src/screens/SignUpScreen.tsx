import { Image, KeyboardAvoidingView, Platform, Pressable, StatusBar, Text, TextInput, View } from "react-native";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider";
import "../../global.css";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { useState } from "react";
import { RootStack } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import { validateFirstName, validateLastName } from "../util/Validation";



type SignUpProps = NativeStackNavigationProp<RootStack, "SignUpScreen">


export default function SignUpScreen() {

    const navigation = useNavigation<SignUpProps>();
    const { applied } = useTheme();
    const logo = applied === "dark" ? require("../../assets/logoWhite.png") : require("../../assets/logoBlue.png");

    const { userData, setUserData } = useUserRegistration();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");



    return (



        <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'android' ? 40 : 40}
            className="flex-1 items-center dark:bg-slate-950"
        >
            <SafeAreaView className="p-5 justify-center items-center">
                <StatusBar hidden={true} />
                <Image source={logo} className="h-40 w-36" />
                <View className="w-full justify-start items-start">
                    <Text className="font-bold text-slate-500 dark:text-slate-100">
                        Create Your Account & Start The Conversation TODAY

                    </Text>
                </View>
                <View className="self-stretch">
                    <View className="w-full my-3">
                        <FloatingLabelInput
                            label={"Enter Your First Name"}
                            value={userData.firstName}
                            onChangeText={(text) => {
                                setUserData((previous) => ({
                                    ...previous,
                                    firstName: text,
                                }));

                            }}

                        />
                    </View>
                    <View className="w-full my-3">
                        <FloatingLabelInput
                            label={"Enter Your Last Name"}
                            value={userData.lastName}
                            onChangeText={(text) => {
                                setUserData((previous) => ({
                                    ...previous,
                                    lastName: text,
                                }));

                            }}
                        />
                    </View>

                </View>
            </SafeAreaView>
            <View className="mt-1 w-full px-5">
                <Pressable className="bg-sky-600 h-14 justify-center items-center rounded-full"
                    onPress={() => {
                        let validFirstName = validateFirstName(userData.firstName);
                        let validLastName = validateLastName(userData.lastName);
                        if (validFirstName) {
                            Toast.show({
                                type: ALERT_TYPE.WARNING,
                                title: "Warning",
                                textBody: validFirstName,
                            });
                        } else if (validLastName) {
                            Toast.show({
                                type: ALERT_TYPE.WARNING,
                                title: "Warning",
                                textBody: validLastName,
                            });
                        } else {
                            navigation.navigate("ContactScreen");
                        }
                    }}
                >
                    <Text className="text-slate-100 dark:text-slate-100 font-bold text-2xl">
                        Next
                    </Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>



    );
}