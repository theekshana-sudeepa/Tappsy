import { useEffect } from "react"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated"

interface FloatingElementProps {
  size: number
  color: string
  top: number
  left: number
  delay?: number
}

export default function FloatingElement({ size, color, top, left, delay = 0 }: FloatingElementProps) {
  const translateY = useSharedValue(0)
  const opacity = useSharedValue(0)

  useEffect(() => {
    // Fade in animation
    opacity.value = withTiming(0.6, { duration: 1000 })

    // Floating animation
    translateY.value = withRepeat(
      withSequence(withTiming(-20, { duration: 2000 + delay }), withTiming(0, { duration: 2000 + delay })),
      -1,
      true,
    )
  }, [delay, opacity, translateY])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    }
  })

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          top,
          left,
        },
        animatedStyle,
      ]}
    />
  )
}
