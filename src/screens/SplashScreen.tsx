import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import CircleShape from "../components/CircleShape";
import { useEffect, useRef } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useTheme } from "../theme/ThemeProvider";
import { useWebSocketPing } from "../socket/UseWebSocketPing";



type Props = NativeStackNavigationProp<RootStack, "SplashScreen">;

export default function SplashScreen() {
    const navigation = useNavigation<Props>();
    const opacity = useSharedValue(0);

    useWebSocketPing(6000); // 1000 * 60 * 4

    useEffect(() => {

        opacity.value = withTiming(1, { duration: 3000 });
        // const timer = setTimeout(() => {
        //   navigation.replace("SignUpScreen");
        // }, 3000);

        // return () => {
        //   clearTimeout(timer);
        // };
    }, [navigation, opacity]);

    const animatedStyle = useAnimatedStyle(() => {
        return { opacity: opacity.value };
    });



    const { applied } = useTheme();

    const logo = applied === "dark" ?
        require("../../assets/logoWhite.png") : require("../../assets/logoBlue.png");

    return (

        <SafeAreaView className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950">
            <StatusBar hidden={true} />

            <CircleShape
                width={260}
                hieght={260}
                className="bg-blue-800"
                /* fillColor={"#1e40af"} */
                borderRadius={999}
                topValue={-100}
                leftValue={-100}
            />
            <CircleShape
                width={240}
                hieght={240}
                className="bg-blue-800"
                borderRadius={999}
                topValue={-120}
                leftValue={60}
            />


            <CircleShape
                width={220}
                hieght={220}
                className="bg-blue-800"
                borderRadius={999}
                topValue={-80}
                leftValue={120}
            />
            <CircleShape
                width={200}
                hieght={200}
                className="bg-blue-800"
                borderRadius={999}
                topValue={-110}
                leftValue={180}
            />
            <CircleShape
                width={180}
                hieght={180}
                className="bg-blue-800"
                borderRadius={999}
                topValue={-60}
                leftValue={220}
            />


            <CircleShape
                width={160}
                hieght={160}
                className="bg-blue-800"
                borderRadius={999}
                topValue={-90}
                leftValue={270}
            />
            <CircleShape
                width={140}
                hieght={140}
                className="bg-blue-800"
                borderRadius={999}
                topValue={-40}
                leftValue={300}
            />
            <CircleShape
                width={120}
                hieght={120}
                className="bg-blue-800"
                borderRadius={999}
                topValue={-70}
                leftValue={330}
            />
            <CircleShape
                width={100}
                hieght={100}
                className="bg-blue-800"
                borderRadius={999}
                topValue={-30}
                leftValue={360}
            />
            <CircleShape
                width={80}
                hieght={80}
                className="bg-blue-800"
                borderRadius={999}
                topValue={-50}
                leftValue={390}
            />
            <CircleShape
                width={60}
                hieght={60}
                className="bg-blue-800"
                borderRadius={999}
                topValue={-20}
                leftValue={420}
            />




            <Animated.View style={animatedStyle}>
                <Image
                    source={logo}
                    style={{ height: 180, width: 220 }}
                />
            </Animated.View>

            <Animated.View style={animatedStyle} className="absolute bottom-10">
                <View className="flex-1 flex-col justify-center items-center">

                    <Text className="text-xs font-bold text-gray-500 dark:text-slate-200">
                        POWERD BY: {process.env.EXPO_PUBLIC_APP_OWNER}</Text>

                    <Text className="text-xs font-bold text-gray-500  dark:text-slate-200">
                        VERSION: {process.env.EXPO_PUBLIC_APP_VERSION}</Text>

                </View>
            </Animated.View>





        </SafeAreaView>

    );
}