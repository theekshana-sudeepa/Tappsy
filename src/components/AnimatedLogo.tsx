import { useEffect } from "react"
import { Image, type ImageSourcePropType } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated"

interface AnimatedLogoProps {
  source: ImageSourcePropType
}

export default function AnimatedLogo({ source }: AnimatedLogoProps) {
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.5)

  useEffect(() => {
    opacity.value = withDelay(300, withTiming(1, { duration: 1000 }))
    scale.value = withDelay(300, withSpring(1, { damping: 10, stiffness: 100 }))
  }, [opacity, scale])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    }
  })

  return (
    <Animated.View style={animatedStyle}>
      <Image source={source} style={{ height: 180, width: 220 }} />
    </Animated.View>
  )
}
