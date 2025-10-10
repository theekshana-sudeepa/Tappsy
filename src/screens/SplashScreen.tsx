import { StatusBar, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import "../../global.css"
import { useEffect } from "react"
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import type { RootStack } from "../../App"
import { useTheme } from "../theme/ThemeProvider"
import { useWebSocketPing } from "../socket/UseWebSocketPing"
import GradientBackground from "../components/GradientBackground"
import FloatingElement from "../components/FloatingElement"
import AnimatedLogo from "../components/AnimatedLogo"
import GlassmorphicCard from "../components/GlassmorphicCard"

type Props = NativeStackNavigationProp<RootStack, "SplashScreen">

export default function SplashScreen() {
  const navigation = useNavigation<Props>()
  const footerOpacity = useSharedValue(0)

  useWebSocketPing(6000)

  useEffect(() => {
    footerOpacity.value = withDelay(800, withTiming(1, { duration: 1000 }))
    // const timer = setTimeout(() => {
    //   navigation.replace("SignUpScreen");
    // }, 3000);

    // return () => {
    //   clearTimeout(timer);
    // };
  }, [navigation, footerOpacity])

  const footerAnimatedStyle = useAnimatedStyle(() => {
    return { opacity: footerOpacity.value }
  })

  const { applied } = useTheme()

  const logo = applied === "dark" ? require("../../assets/logoWhite.png") : require("../../assets/logoBlue.png")

  return (
    <SafeAreaView style={{ flex: 1 }} className="items-center justify-center">
      <StatusBar hidden={true} />

      <GradientBackground />

      <FloatingElement size={120} color="rgba(96, 165, 250, 0.3)" top={100} left={30} delay={0} />
      <FloatingElement size={80} color="rgba(96, 165, 250, 0.2)" top={150} left={280} delay={500} />
      <FloatingElement size={100} color="rgba(255, 255, 255, 0.2)" top={500} left={50} delay={300} />
      <FloatingElement size={60} color="rgba(96, 165, 250, 0.25)" top={600} left={300} delay={700} />

      <View className="items-center justify-center">
        <AnimatedLogo source={logo} />
      </View>

      <Animated.View style={[footerAnimatedStyle, { position: "absolute", bottom: 40 }]}>
        <GlassmorphicCard>
          <View className="flex-col items-center gap-1">
            <Text style={{ color: "#FFFFFF" }} className="text-xs font-semibold tracking-wide">
              POWERED BY: {process.env.EXPO_PUBLIC_APP_OWNER}
            </Text>

            <Text style={{ color: "#D1D5DB" }} className="text-xs">
              VERSION: {process.env.EXPO_PUBLIC_APP_VERSION}
            </Text>
          </View>
        </GlassmorphicCard>
      </Animated.View>
    </SafeAreaView>
  )
}
